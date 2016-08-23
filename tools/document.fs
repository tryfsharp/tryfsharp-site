module TryFSharp.Document

open Fake
open System
open System.IO
open System.Collections.Generic

open FSharp.Literate
open FSharp.Markdown
open FSharp.Markdown.Html

open TryFSharp.Helpers

// --------------------------------------------------------------------------------------
// Helper functions for dealing with Markdown - for extracting tutorial properties etc.
// --------------------------------------------------------------------------------------

let private createFormattingContext writer = 
  { Writer = writer
    Links = dict []
    Newline = "\n"
    LineBreak = ignore
    WrapCodeSnippets = false
    GenerateHeaderAnchors = true
    UniqueNameGenerator = new UniqueNameGenerator()
    ParagraphIndent = ignore }

let private formatSpans spans = 
  let sb = Text.StringBuilder()
  ( use wr = new StringWriter(sb)
    let fc = createFormattingContext wr
    Html.formatSpans fc spans )
  sb.ToString()

let private formatPlainSpans spans = 
  let sb = Text.StringBuilder()
  let rec loop spans = 
    for span in spans do
      match span with
      | DirectLink(body=body) -> loop body
      | Literal(text=t) -> sb.Append(t) |> ignore
      | _ -> failwithf "Unsupported span: %A" span
  loop spans
  sb.ToString()

let private (|ColonSeparatedSpans|_|) spans =
  let rec loop before spans = 
    match spans with
    | Literal(text=s)::rest when s.Contains(":") ->
        let s1, s2 = s.Substring(0, s.IndexOf(':')).Trim(), s.Substring(s.IndexOf(':')+1)
        let before = List.rev before
        let before = if String.IsNullOrWhiteSpace(s1) then before else Literal(s1, None)::before
        let rest = if String.IsNullOrWhiteSpace(s2) then rest else Literal(s2, None)::rest
        Some(before, rest)
    | [] -> None
    | x::xs -> loop (x::before) xs
  loop [] spans

let private readProperty = function
  | [Span(body=ColonSeparatedSpans(before, after))] ->
      match formatPlainSpans before with
      | "description" -> "description", formatSpans after
      | s -> s, (formatPlainSpans after).Trim()
  | p -> failwithf "Failed to read property: %A" p

let private (|Properties|) = function
  | ListBlock(kind=MarkdownListKind.Unordered; items=props)::rest ->
      props |> List.map readProperty |> dict, rest
  | rest -> dict [], rest

let private (|Sections|) pars =
  let rec loop acc currentTitle currentPars = function
    | Heading(size=2; body=title)::pars when List.isEmpty currentTitle -> loop acc title [] pars
    | Heading(size=2; body=title)::pars -> loop ((currentTitle, List.rev currentPars)::acc) title [] pars
    | p::pars when List.isEmpty currentTitle -> failwith "Expected level-2 heading to start a section!"
    | p::pars -> loop acc currentTitle (p::currentPars) pars
    | [] -> List.rev ((currentTitle, List.rev currentPars)::acc)
  loop [] [] [] pars
   
// --------------------------------------------------------------------------------------
// Document parsing
// --------------------------------------------------------------------------------------

let private readMetadata (pars:MarkdownParagraphs) = 
  match pars with
  | Heading(size=1; body=title)::Properties(props, Sections secs) -> title, props, secs
  | f -> failwithf "No metadata: %A" f

let private tryFind k (props:IDictionary<string, string>) = 
  if props.ContainsKey k then Some(props.[k]) else None

let private parseDocument (cfg:SiteConfig) (file:string) =
  let document = Markdown.Parse(File.ReadAllText file)
  let title, props, secs = readMetadata document.Paragraphs
  
  let parseSection index (title, sec) = 
    let special = set [ "solution"; "test"; "demo" ]
    let (|SpecialCode|_|) = function CodeBlock(code=c; language=l) when special.Contains l -> Some(l, c) | _ -> None
    let codes = sec |> Seq.choose (function SpecialCode(l, c) -> Some(l, c) | _ -> None) |> dict
    let content = sec |> List.choose (function SpecialCode _ -> None | p -> Some p)
    let tryFindCode k = if codes.ContainsKey k then codes.[k] else ""
    { Section.Title = formatPlainSpans title
      Index = index
      Content = Markdown.WriteHtml(MarkdownDocument(content, document.DefinedLinks))
      Demo = tryFindCode "demo"
      Solution = tryFindCode "solution"
      Test = tryFindCode "test" }

  { Tutorial.Title = formatSpans title
    Description = defaultArg (tryFind "description" props) ""
    Image = defaultArg (tryFind "image" props) ""
    Url = (Path.ChangeExtension(file.Substring(cfg.Tutorials.Length), "").TrimEnd('.')).Replace('\\', '/')  + "/"
    CurrentSection = 0
    Sections = secs |> Seq.mapi parseSection |> Array.ofSeq }    

let parseTutorial (cfg:SiteConfig) (inf:string) =
  let cached = Path.ChangeExtension(cfg.Cache </> inf.Substring(cfg.Tutorials.Length+1), ".json")
  if not (sourceChanged inf cached) then 
    Json.fromJson (File.ReadAllText cached)
  else
    printfn "Parsing tutorial file: %s" (inf.Replace(cfg.Tutorials, ""))
    let doc = parseDocument cfg inf
    ensureDirectory (Path.GetDirectoryName cached)
    File.WriteAllText(cached, Json.toJson doc)
    doc