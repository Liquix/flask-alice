var reportSubstance, reportDosage, reportDosagelabel, reportSource;

var reportList = []

// WE NEED A ROA FIELD!!!

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
  $.getJSON($SCRIPT_ROOT + '/_new_report', {substance: reportSubstance, dosage: reportDosage, dosagelabel: reportDosagelabel, roa: roaVal, source: reportSource}, function(data){ console.log(data.result); });
  dialog.dialog("close");
}

$('#addLineButton').click(function() {
  //alert( $('#textInputBox').val() );
  addNewLine();
});

$('#newExperienceButton').click(function() {
  //$.getJSON($SCRIPT_ROOT + '/_new_report', {substance: 'LSD', dosage: 20, dosagelabel: 'ug', source: 'local'}, function(data){ console.log(data.result); });
  dialog.dialog("open");
});

// Load reports from MySQL db into reportList[]
function loadAllReports(){
  var i;
  $.getJSON($SCRIPT_ROOT + '/_get_all_reports', {}, function(data){
    for (i = 0; i < data.result.length; i++ ){
      reportList.push(data.result[i]);
      var $div = $("<li>", {"text": reportList[i].substance + " - " + reportList[i].dosage + reportList[i].dosage_label});
      $('#sidebarExperienceList').append($div);
    }
  });
}

function addNewLine(){
  if($('#textInputBox').val() == ""){
    return;
  }
  var $div = $("<div>", {"class": "reportLine", "text": $('#textInputBox').val()});
  $('#displayContainer').append($div);
  $.getJSON($SCRIPT_ROOT + '/_test', {linetext: $('#textInputBox').val()}, function(data){ console.log("GET return: " + data.result); });
  //loadAllReports();
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

// entrypoint
loadAllReports();
