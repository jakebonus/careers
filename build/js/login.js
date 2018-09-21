
(function() {
  var $btn_signin = $("#btn_signin"),
      $a_username = $("#a_username"),
      $login_form = $("#login_form");

  $login_form.on("submit", function() {
    if ($('body .ui-pnotify > .alert-info').length == 0) {
      $.ajax({
        dataType: "json",
        type: "post",
        url: base_url + "account/ajax_signin",
        data: $login_form.serialize() + "&islogin=" + 1,
        beforeSend: function() {
          $(".glyphicon-remove").trigger("click");
          notify('Processing', 'Please wait..', "info", 99999);
          $btn_signin.attr("disabled", "disabled")
        },
        success: function(a) {
          $(".glyphicon-remove").trigger("click");
          if (a.status == "yes") {
            $btn_signin.removeAttr("disabled");
            notify('Success!', a.content, "success", 2000);
            $btn_signin.removeAttr("disabled");
            $login_form[0].reset();
            localStorage.setItem('oa_id', a.id);
            window.location.href = base_url + "application/"
          } else {
            $btn_signin.removeAttr("disabled");
            $login_form[0].reset();
            notify('Failed!', "<strong>Invalid Username and Password.</strong> Please try again.", "warning", 2000);
            $a_username.focus();
          }
        },
        error: function(xhr, exception) {
          $(".glyphicon-remove").trigger("click");
          if (xhr.status === 0) {
            notify("Something\'s not right..", "Not connected. Verify Network.", "error", 2000);
          } else if (xhr.status == 404) {
            notify("Something\'s not right..", "Requested page not found.", "error", 2000);
          } else if (xhr.status == 500) {
            notify("Something\'s not right..", "Server Communication Error.", "error", 2000);
          } else if (exception === 'parsererror') {
            notify("Something\'s not right..", "Request parsing failed.", "error", 2000);
          } else if (exception === 'timeout') {
            notify("Something\'s not right..", "Time out error.", "error", 2000);
          } else if (exception === 'abort') {
            notify("Something\'s not right..", "Request aborted by the server.", "error", 2000);
          } else {
            notify("Request aborted by the server.", 'Uncaught Error.\n' + xhr.responseText, "error", 2000);
          }

          $btn_signin.removeAttr("disabled");
          $login_form[0].reset();
        }
      });
      return false;
    }
  });

  function notify(title, content, type, delay) {
    new PNotify({
      title: title,
      text: content,
      styling: 'bootstrap3',
      type: type,
      delay: delay
    });
  }

})();
