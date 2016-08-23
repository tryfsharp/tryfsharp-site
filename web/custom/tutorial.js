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
    switchSection(currentSection + 1);
}
function switchSection(index) {
  // Switch the selected section UI
  $(".tutorial .section").hide();
  $("#section_" + index).show();
  $("#ref_section_" + index).addClass("selected");
  $("#ref_section_" + currentSection).removeClass("selected");
  $("#ref_section_" + index + " i").addClass("fa-arrow-circle-right").removeClass("fa-circle")
  $("#ref_section_" + currentSection + " i").removeClass("fa-arrow-circle-right").addClass("fa-circle");
  currentSection = index;
  
  // 

  var sec = sections[currentSection];
  if (sec.demo != "") currentEditor.appendCode(sec.demo);
  if (sec.test != "") currentEditor.setTestCode(sec.test, proceedToNextSection);
  return false;
}
