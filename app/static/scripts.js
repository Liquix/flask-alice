

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
