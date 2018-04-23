$('#addLineButton').click(function() {
  //alert( $('#textInputBox').val() );
  var $div = $("<div>", {"class": "reportLine", "text": $('#textInputBox').val()});
  $('#displayContainer').append($div);
  document.getElementById('textInputBox').value = "";
});
