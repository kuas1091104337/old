;$(function () {
  $('.UAcontact_numberReset, .UAcontact_emailReset, .UAcontact_nameReset').click(inputReset);
  function inputReset(){
    $(this).prev().val('');
  }
  var $UAform = $('#UAcontactForm')
  function getFormData() {
    var fieldTypes = ['input', 'select', 'textarea'], formData = {};
    fieldTypes.forEach(function(fieldType){
      $UAform.find($(fieldType)).each(function () {
        var field = $(this), name = field.attr('name'), value = field.val();
        formData[name] = value;
      })
    })
    return formData
  }
  $UAform.submit(function(e){
    e.preventDefault();
    var formData = getFormData(),
        emptyFields = Object.keys(formData).reduce(function (acc, field) {
          var value = formData[field];
          if (!value) acc.push(field);
          return acc
        }, [])
    if (emptyFields.length > 0) {
      var firstEmptyField = emptyFields[0],
          element = $('[name="' + firstEmptyField + '"]');
      element.focus();
      return;
    }
    //  send email
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbwj0SXWoV6QId7lZDAtlWSIrK70d9Hs4f3lTKDNLfA9vAfeha_2bjVyIA/exec',
      data: formData,
      success: function (response) {
        if (response == '成功') {
          $('.UAcontact_list_input, .UAcontact_listTextarea, .UAcontact_list_select').val('');
          alert('成功發送');
        }
      },
    });
  });
});
