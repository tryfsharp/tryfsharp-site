module TryFSharp.Helpers

open System.IO

/// GIven `target` generated from `source`, returns
/// `true` if `target` needs to be regenerated
let sourceChanged source target = 
  if File.Exists target then 
    let sourceTime = File.GetLastWriteTime source
    let targetTime = File.GetLastWriteTime target
    sourceTime > targetTime 
  else true

/// Given `target` generated from multiple `sources`, 
/// returns `true` if the file needs to be regenarted
let sourceChangedSeq sources target = 
  if File.Exists target then 
    let sourceTime = sources |> Seq.map File.GetLastWriteTime |> Seq.max
    let targetTime = File.GetLastWriteTime target
    sourceTime > targetTime 
  else true

/// JSON serialization helpers
module Json = 
  let private serializer = Newtonsoft.Json.JsonSerializer.Create()

  /// Serializes value to JSON using Newtonsoft
  let toJson value =
    let sb = System.Text.StringBuilder()
    use tw = new System.IO.StringWriter(sb)
    serializer.Serialize(tw, value)
    sb.ToString()

  /// Deserializes value from JSON using Newtonsoft
  let fromJson<'R> str : 'R = 
    use tr = new System.IO.StringReader(str)
    serializer.Deserialize(tr, typeof<'R>) :?> 'R