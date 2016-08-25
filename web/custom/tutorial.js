var currentSection = -1;
var sections = [];
var currentEditor = null;

function registerEditor(ed) {
  currentEditor = ed;
}

function loadSections(secs) {
  sections = secs;
}

function proceedToNextSection() {
  if (currentSection + 1 < sections.length) 
    switchSection(currentSection + 1, true);
}
function switchSection(index, rewriteHistory) {
  if (index == currentSection) return false;
  
  // Switch the selected section UI
  $(".tutorial .section").hide();
  $("#section_" + index).show();
  $("#ref_section_" + index).addClass("selected");
  $("#ref_section_" + currentSection).removeClass("selected");
  $("#ref_section_" + index + " i").addClass("fa-arrow-circle-right").removeClass("fa-circle")
  $("#ref_section_" + currentSection + " i").removeClass("fa-arrow-circle-right").addClass("fa-circle");
  currentSection = index;
  var sec = sections[currentSection];
  
  // Manipulate the history!
  var stateObj = { index: currentSection };
  var url = $("link[rel=canonical]").attr("href").replace("http://tryfsharp.org", "") + currentSection + "/";
  document.title = sec.title + " - Try F#";
  history.pushState(stateObj, sec.title, url);

  // Set section code for the editor
  if (sec.demo != "") currentEditor.appendCode(sec.demo);
  if (sec.test != "") currentEditor.setTestCode(sec.test, proceedToNextSection);
  return false;
}

window.onpopstate = function(event) {
  if (event.state && event.state.index) switchSection(event.state.index, false);
}
