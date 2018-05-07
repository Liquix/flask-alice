var reportSubstance, reportDosage, reportDosagelabel, reportSource;

var reportList = [];
var currentReport;
var selectedReportID = -1; // may be unnecessary with currentReport?
var selectedReportLines = [];


var dialog = $('#newReportPopup').dialog({
  autoOpen: false,
  height: "auto",
  width: 300,
  modal: true,
  closeText: "",
  closeOnEscape: true,
  buttons: [
      {
        text: "Create Report",
        "class": 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only createReportBtnClass',
        click: addNewReport
      },
      {
        text: '\u2716',
        "class": 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only cancelReportBtnClass',
        click: function(){
          dialog.dialog("close");
        }
      }
  ],
  close: function() {
    $('#newReportForm')[0].reset();
  }
});

var form = dialog.find("form").on("submit", function(event){
  event.preventDefault();
  addNewReport();
  dialog.dialog("close");
});

// Need to add it to sidebar and reportList as well!
function addNewReport()
{
  reportSubstance = $('#substanceNameField').val();
  reportDosage = $('#dosageField').val();
  reportDosagelabel = $('#dosagelabelField').val();
  reportSource = $('#sourceField').val();
  roaVal = $('#roaField').val();
  //console.log('Creating a new report on ' + reportSubstance + ' (' + reportDosage + reportDosagelabel + ') [Sourced from ' + reportSource + ']!');
  $.getJSON($SCRIPT_ROOT + '/_new_report', {substance: reportSubstance, dosage: reportDosage, dosagelabel: reportDosagelabel, roa: roaVal, source: reportSource}, function(data){

    reportList.push(data.result);
    var newReport = data.result;

    selectedReportID = data.result.id;

    // This should be wrapped in a function which is passed a Report object - reused in loadAllReports()
    var $div = $("<li>", {"class": "sidebarReport", "id": data.result.id, text: newReport.substance + " - " + newReport.dosage + newReport.dosage_label});
    var $cls = $("<span>", {"class": "closeReportBtn", text: "x"});
    $div.append($cls);
    $('#sidebarExperienceList').append($div);
  });

  dialog.dialog("close");
}

// Add report line when '+' button is clicked
$('#addLineButton').click(function() {
  //alert( $('#textInputBox').val() );
  addNewLine();
});

// Open new report dialog when New Experience is clicked
$('#newExperienceButton').click(function() {
  dialog.dialog("open");
});

// Switch currentReport & populate selectedReportLines when a report summary on the sidebar is clicked
$(document).on('click', '.sidebarReport', function() {
  // Toggle input area
  if($('#inputContainer').css('display') === 'none')    $('#inputContainer').css('display', 'inline');
  //else                                                  $('#inputContainer').css('display', 'none');

  // Do not send a duplicate request if the report has already been selected
  //if(this.id == currentReport.id) return;

  selectedReportID = this.id;

  // currentReport = (search reportList for reportList[i].id = selectedReportID)
    $.getJSON($SCRIPT_ROOT + '/_get_report_lines', {reportid: selectedReportID}, function(data){
      selectedReportLines = data.result;

      $('#displayContainer').empty();

      var i;
      for(i = 0; i < selectedReportLines.length; i++)
      {
        var $div = $("<div>", {"class": "reportLine", text: timestampStringToEST(selectedReportLines[i].timestamp) + ' - ' + selectedReportLines[i].linetext});
        $('#displayContainer').append($div);
      }
    });
});

// Delete report when its close button is clicked
$(document).on('click', '.closeReportBtn', function(e) {
  e.stopPropagation();
  toDeleteReportID = $(this).parent()[0].id;
  parentDiv = $(this).parent()[0];

  $.getJSON($SCRIPT_ROOT + '/_delete_report', {reportid: toDeleteReportID}, function(data){
    console.log(data.result);
    $(parentDiv).remove();
    var i;
    for(i = 0; i < reportList.length; i++){
      if(reportList[i].id == toDeleteReportID)  reportList.splice(i, 1);
    }
    $('#displayContainer').empty();
    $('#inputContainer').css('display', 'none');
  });
});

// Load reports from MySQL db into reportList[]
function loadAllReports(){
  var i;
  $.getJSON($SCRIPT_ROOT + '/_get_all_reports', {}, function(data){
    for (i = 0; i < data.result.length; i++ ){
      reportList.push(data.result[i]);
      var $div = $("<li>", {"class": "sidebarReport", "id": data.result[i].id, text: reportList[i].substance + " - " + reportList[i].dosage + reportList[i].dosage_label});
      var $cls = $("<span>", {"class": "closeReportBtn", text: "x"});
      $div.append($cls);
      $('#sidebarExperienceList').append($div);
    }
  });
}

function addNewLine(){
  if($('#textInputBox').val() == ""){
    return;
  }

  $.getJSON($SCRIPT_ROOT + '/_write_report_line', {linetext: $('#textInputBox').val(), reportid: selectedReportID}, function(data){
    var $div = $("<div>", {"class": "reportLine", "text": timestampStringToEST(data.result.timestamp) + ' - ' + data.result.linetext});
    $('#displayContainer').append($div);
  });
  document.getElementById('textInputBox').value = "";
}

$("#textInputBox").keydown(function(e){
if (e.keyCode == 13 && !e.shiftKey)
{
  e.preventDefault();

  addNewLine();

  return false;
  }
});

function timestampStringToEST(timestampString) {
  rawTime = timestampString.slice(-12, -7);
  if(rawTime.substr(0, 1) == "0")   rawTime = rawTime.slice(1);

  hourInt = Number(rawTime.substr(0, 2));
  if(hourInt > 12) {
    hourInt -= 12;
    rawTime = rawTime.replace(rawTime.substr(0, 2), hourInt.toString());
    rawTime += 'PM';
  }
  else {
    rawTime += 'AM';
  }
  return rawTime;
}

// entrypoint
loadAllReports();
