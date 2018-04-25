var reportSubstance, reportDosage, reportDosagelabel, reportSource;

// WE NEED A ROA FIELD!!!

var dialog = $('#newReportPopup').dialog({
  autoOpen: false,
  height: 370,
  width: 300,
  modal: true,
  closeText: "",
  buttons: {
    "Create": addNewReport,
    Cancel: function() {
      dialog.dialog("close");
    }
  },
  close: function() {
    $('#newReportForm')[0].reset();
  }
});

var form = dialog.find("form").on("submit", function(event){
  event.preventDefault();
  addNewReport();
  dialog.dialog("close");
});

function addNewReport()
{
  reportSubstance = $('#substanceNameField').val();
  reportDosage = $('#dosageField').val();
  reportDosagelabel = $('#dosagelabelField').val();
  reportSource = $('#sourceField').val();
  console.log('Creating a new report on ' + reportSubstance + ' (' + reportDosage + reportDosagelabel + ') [Sourced from ' + reportSource + ']!');
  $.getJSON($SCRIPT_ROOT + '/_new_report', {substance: reportSubstance, dosage: reportDosage, dosagelabel: reportDosagelabel, source: reportSource}, function(data){ console.log(data.result); });
  dialog.dialog("close");
}

$('#addLineButton').click(function() {
  //alert( $('#textInputBox').val() );
  if($('#textInputBox').val() == ""){
    return;
  }
  var $div = $("<div>", {"class": "reportLine", "text": $('#textInputBox').val()});
  $('#displayContainer').append($div);
  $.getJSON($SCRIPT_ROOT + '/_test', {linetext: $('#textInputBox').val()}, function(data){ console.log(data.result); });
  document.getElementById('textInputBox').value = "";
});

$('#newExperienceButton').click(function() {
  $.getJSON($SCRIPT_ROOT + '/_new_report', {substance: 'LSD', dosage: 20, dosagelabel: 'ug', source: 'local'}, function(data){ console.log(data.result); });
  dialog.dialog("open");
});

$("#textInputBox").keydown(function(e){
if (e.keyCode == 13 && !e.shiftKey)
{
  // prevent default behavior
  e.preventDefault();
  var $div = $("<div>", {"class": "reportLine", "text": $('#textInputBox').val()});
  $('#displayContainer').append($div);
  document.getElementById('textInputBox').value = "";
  return false;
  }
});
