$(function() {
  $('#frm_profile').formValidation({
      framework: "bootstrap",
      button: {
        selector: '#btn_profile',
        disabled: 'disabled'
      },
      icon: null,
      fields: {
        password: {
          validators: {
            notEmpty: {
              message: 'The password is required'
            },
            stringLength: {
              min: 6,
              max: 30
            },
            regexp: {
              regexp: /^[a-zA-Z0-9]+$/
            }
          }
        },
        password2: {
          validators: {
            identical: {
              field: 'password',
              message: 'The password and its confirm are not the same'
            }
          }
        }
      }
    })
    .on('success.form.fv', function(e) {
      e.preventDefault();
      var $form = $(e.target),
        fv = $form.data('formValidation');
      $.ajax({
        dataType: 'json',
        type: 'post',
        url: base_url + "account/update_password",
        data: $('#frm_profile').serialize() + "&isSubmit=" + 1,
        beforeSend: function() {
          notify('Processing', 'Please wait..', 'info');
          $('#btn_profile').attr('disabled', 'disabled');
        },
        success: function(data) {
          if (data.status == "yes") {
            $('.alert-info .glyphicon-remove').trigger("click");
            $('#btn_profile').removeAttr('disabled');
            $('#frm_profile')[0].reset();
            notify('Success!', data.content, 'success');
          } else {
            $('.alert-info .glyphicon-remove').trigger("click");
            $('#btn_profile').removeAttr('disabled');
            $('#frm_profile')[0].reset();
            notify('Failed!', data.content, '');
          }
          $("#frm_profile").data('formValidation').resetForm();
        },
        error: function(jqXHR, exception) {
          $('.alert-info .glyphicon-remove').trigger("click");
          $('#btn_profile').removeAttr('disabled');
          $('#frm_profile')[0].reset();
          notify('Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost.', 'error');
        }
      });
    });

  function notify(title, content, type) {
    new PNotify({
      title: title,
      text: content,
      styling: 'bootstrap3',
      type: type,
      delay: 2000
    });
  }

});



// $(function() {
//     $('#frm_profile').parsley().on('field:validated', function() {
//             var ok = $('.parsley-error').length === 0;
//             $('.bs-callout-info').toggleClass('hidden', !ok);
//             $('.bs-callout-warning').toggleClass('hidden', ok);
//         })
//         .on('form:submit', function() {

//             $.ajax({
//                 dataType: 'json',
//                 type: 'post',
//                 url: base_url + "account/update_password",
//                 data: $('#frm_profile').serialize() + "&isSubmit=" + 1,
//                 beforeSend: function() {
//                     $('#btn_profile').attr('disabled', 'disabled');
//                 },
//                 success: function(data) {
//                     if (data.status == "yes") {
//                         $('#btn_profile').removeAttr('disabled');
//                         $('#frm_profile')[0].reset();
//                         notify('Success!', data.content, 'success');
//                     } else {
//                         $('#btn_profile').removeAttr('disabled');
//                         $('#frm_profile')[0].reset();
//                         notify('Failed!', data.content, '');
//                     }
//                 },
//                 error: function(jqXHR, exception) {
//                     $('#btn_profile').removeAttr('disabled');
//                     $('#frm_profile')[0].reset();
//                     notify('Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost.', 'error');
//                 }
//             });
//             return false;
//         });


//     function notify(title, content, type) {
//         new PNotify({
//             title: title,
//             text: content,
//             styling: 'bootstrap3',
//             type: type,
//             delay: 2000
//         });
//     }

// });
