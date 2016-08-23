namespace TryFSharp
open System

type SiteConfig = 
  { /// Specifies folder with DotLiquid templates
    Layouts : string
    /// This is where the output files are put
    Output : string
    /// Cache parsed Markdown for faster refresh when templates cahnge
    Cache : string 

    /// Source directory with MD tutorials
    Tutorials : string
    /// Source directory with static files
    Static : string }


/// Single section of a tutorial
type Section = 
  { Title : string 
    Index : int
    Content : string
    /// Append this when the section is loaded
    Demo : string
    /// Append this when "Show solution" is clicked
    Solution : string
    /// Run this to test if the user passed
    Test : string }


/// Info about tutorial and individual sections in it
type Tutorial = 
  { Title : string
    Description : string
    Url : string
    Image : string
    CurrentSection : int
    Sections : Section[] }

/// Collection of all tutorials for the home page
type Tutorials =
  { Tutorials : Tutorial[] }