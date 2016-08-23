#r "System.Xml.Linq.dll"
#r "../packages/Newtonsoft.Json/lib/net45/Newtonsoft.Json.dll"
#r "../packages/Suave/lib/net40/Suave.dll"
#r "../packages/FAKE/tools/FakeLib.dll"
#r "../packages/DotLiquid/lib/NET45/DotLiquid.dll"
#load "../packages/FSharp.Formatting/FSharp.Formatting.fsx"
#load "domain.fs"
#load "helpers.fs"
#load "dotliquid.fs"
#load "document.fs"
#load "site.fs"
open Fake
open System
open System.IO
open TryFSharp
open Fake.Git.CommandHelper

// --------------------------------------------------------------------------------------
// Blog configuration
// --------------------------------------------------------------------------------------

let fullPath p = Path.GetFullPath(__SOURCE_DIRECTORY__ </> ".." </> p)

let config =
  { // Directory with DotLiquid templates 
    Layouts = fullPath "layouts"
    // Cache and output directory (can be outside of the repo)
    Cache = fullPath ".cache" 
    Output = fullPath ".output"
    // Source dirs with static files & tutorials
    Static = fullPath "web" 
    Tutorials = fullPath "tutorials" }

// --------------------------------------------------------------------------------------
// Generating and updating site
// --------------------------------------------------------------------------------------

DotLiquid.initialize config

// Keep all tutorials for rendering homepage
let mutable site = Site.readTutorials config

/// Update site - generate all output files if they need to be refreshed
let updateSite config changes =
  trace "Updating site"
  traceImportant "Copying static files"
  Site.copyFiles config changes
  traceImportant "Processing site source"
  if Site.processTutorials config changes then site <- Site.readTutorials config
    
  traceImportant "Processing special files"
  let specialFiles = 
    [ //"404.html", "404.html", site
      "index.html", "index.html", site ]
  for target, layout, model in specialFiles do
    DotLiquid.transform (config.Output </> target) (config.Layouts </> layout) model

// --------------------------------------------------------------------------------------
// Local Suave server for debugging
// --------------------------------------------------------------------------------------

open Suave
open Suave.Filters
open Suave.Operators
open Suave.WebSocket
open Suave.Sockets.Control

let port = 7103
let refreshEvent = new Event<unit>()

/// JavaScript to reload the site when page is updated
let wsRefresh = """
  <script language="javascript" type="text/javascript">
    function init() {
      try {
        websocket = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port + "/websocket");
        websocket.onmessage = function(evt) { location.reload(); };
      } catch (e) { /* silently ignore lack of websockets */ }
    }
    window.addEventListener("load", init, false);
  </script>"""

// All generated content is index files in directories. When serving
// them, we replace absolute links & inject websocket code for refresh
// Also insert link to local Bootstrap for no-wifi editting support!
let handleDir dir = 
  let html = File.ReadAllText(config.Output </> dir </> "index.html")
  html.Replace("</body", wsRefresh + "</body")
  |> Successful.OK

let noCache = 
  Writers.setHeader "Cache-Control" "no-cache, no-store, must-revalidate"
  >=> Writers.setHeader "Pragma" "no-cache"
  >=> Writers.setHeader "Expires" "0"

let app = 
  choose [
    path "/websocket" >=> handShake (fun ws ctx -> async {
      let msg = System.Text.Encoding.UTF8.GetBytes "refreshed"
      while true do
        do! refreshEvent.Publish |> Control.Async.AwaitEvent
        do! ws.send Text msg true |> Async.Ignore
      return Choice1Of2 () }) 
    noCache >=> path "/" >=> request (fun _ -> handleDir "")
    noCache >=> pathScan "/%s/" handleDir
    noCache >=> Files.browseHome ] 

let serverConfig =
  { Web.defaultConfig with
      homeFolder = Some config.Output
      logger = Logging.Loggers.saneDefaultsFor Logging.LogLevel.Warn
      bindings = [ HttpBinding.mkSimple HTTP "127.0.0.1" port ] }

let startServer () =
  let _, start = Web.startWebServerAsync serverConfig app
  let cts = new System.Threading.CancellationTokenSource()
  Async.Start(start, cts.Token)

// --------------------------------------------------------------------------------------
// FAKE build targets
// --------------------------------------------------------------------------------------

Target "run" (fun () ->
  updateSite config None
  let all = __SOURCE_DIRECTORY__ </> ".."  |> Path.GetFullPath
  use _watcher = 
    !! (all </> "**/*.*") 
    -- (all </> ".ionide.debug") 
    -- (all </> "packages" </> "**/*.*")
    -- (all </> "tools" </> "**/*.*")
    |> WatchChanges (fun e ->
      printfn "Changed files"
      for f in e do printfn " - %s" f.Name
      let changes = 
        if e |> Seq.exists (fun f -> f.FullPath.StartsWith(config.Layouts)) then None
        else Some (set [ for f in e -> f.FullPath ])
      try 
        updateSite config changes 
        refreshEvent.Trigger ()
        trace "Site updated successfully..."
      with e ->
        traceError "Updating site failed!"
        traceException e )
  
  startServer ()
  Diagnostics.Process.Start(sprintf "http://localhost:%d" port) |> ignore
  trace "Waiting for changes, press Enter to stop...."
  Console.ReadLine () |> ignore 
)

Target "publish" (fun () ->
  let tempOutDir = fullPath ".temp"
  CleanDir tempOutDir
  Git.Repository.cloneSingleBranch "" "https://github.com/tryfsharp/tryfsharp.github.io.git" "master" tempOutDir

  for dir in Directory.GetDirectories(tempOutDir) do
    if not (dir.EndsWith(".git")) then CleanDir dir; Directory.Delete dir
  for f in Directory.GetFiles(tempOutDir) do File.Delete f
  updateSite { config with Output = tempOutDir } None

  runGitCommand tempOutDir "add ." |> ignore
  runGitCommand tempOutDir (sprintf "commit -a -m \"Updating site (%s)\"" (DateTime.Now.ToString("f"))) |> ignore
  Git.Branches.push tempOutDir
)

RunTargetOrDefault "run"
