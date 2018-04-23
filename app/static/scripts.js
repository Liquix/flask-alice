$('#addLineButton').click(function() {
  //alert( $('#textInputBox').val() );
  var $div = $("<div>", {"class": "a", "text": $('#textInputBox').val()});
  $('#displayContainer').append($div);
  document.getElementById('textInputBox').value = "";
});
