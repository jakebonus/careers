$(function() {
  var $medicine = $("#medicine"),
      $unit = $("select#unit"),
      $frm_in = $('#frm_in'),
      $body = $("body"),
      $tbl_medicine = $("#tbl_medicine"),
      $tr_lot_no = $("#tr_lot_no");
      $unit = $("#unit"),
      $tr_qty = $("#tr_qty"),
      $tr_expiration_date = $("#tr_expiration_date"),
      $form_group_add =$('.form-group-add'),
      $tbl_medicine = $('#tbl_medicine');

  $("#tr_date, #tr_expiration_date").inputmask("9999-99-99", {
    "placeholder": "yyyy-mm-dd"
  });

  $tr_lot_no.on('keyup', function(e) {
    if ($(this).val().toUpperCase() == 'N/A') {
      $tr_expiration_date.prop('disabled', true);
    } else {
      $tr_expiration_date.prop('disabled', false);
    }
  });


  //GET MEDICINE
  var html = '',
      xhr = new XMLHttpRequest();
  xhr.open("GET", base_url + "inventory/ajax_get_medicine", true);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myarr = JSON.parse(this.responseText);
      $("#medicine option").detach();
      html +='<option value="">- - -</option>';

      for (i = 0; i < myarr.length; i++) {
          html +="<option value=" + myarr[i].m_id + " data-m_name='" + myarr[i].m_name + "' data-set=" + myarr[i].m_set + " data-pcsper_set=" + myarr[i].m_pcsper_set + ">" + myarr[i].m_name + "</option>";
      }
      $medicine.html(html);
      $medicine.prop("disabled", false);
    }
  }
  xhr.send();

  $medicine.change(function() {
    $tr_lot_no.val("");
    var selected = $(this).find('option:selected'),
        a = selected.data('set'),
        b = selected.data('pcsper_set'),
        html_unit = '';
    $("select#unit option").detach();
    html_unit +='<option value="">- - -</option>';
    html_unit +='<option value="' + b + '" data-val="' + a + ' [' + b + ']" data-unit="' + a + '">' + a + ' [' + b + ']</option>';

    if (b != 1) {
      html_unit +='<option value="1" data-val="PC [1]" data-unit="PC">PC [1]</option>';
    }
    $unit.html(html_unit);
  });

  //ADD
  $frm_in.formValidation({
      framework: "bootstrap",
      icon: null,
      fields: {
        tr_by: {
          validators: {
            regexp: {
              regexp: /^[0-9a-zA-Z .,-]+$/i,
            }
          }
        },
        tr_si_no: {
          validators: {
            regexp: {
              regexp: /^[0-9a-zA-Z-.]+$/i,
            }
          }
        },
        tr_lot_no: {
          validators: {
            regexp: {
              regexp: /^[0-9a-zA-Z-/]+$/i,
            },
            stringLength: {
              max: 20
            },
          }
        },
        tr_dr_no: {
          validators: {
            regexp: {
              regexp: /^[0-9a-zA-Z-.]+$/i,
            }
          }
        },
        tr_supplier: {
          validators: {
            regexp: {
              regexp: /^[0-9a-zA-Z .,-]+$/i,
            }
          }
        },
        tr_qty: {
          validators: {
            integer: {
              message: 'The value is not number'
            }
          }
        },
        tr_expiration_date: {
          validators: {
            date: {
              format: 'YYYY-MM-DD',
              message: 'The value is not a valid date'
            }
          }
        },
        tr_date: {
          validators: {
            date: {
              format: 'YYYY-MM-DD',
              message: 'The value is not a valid date'
            }
          }
        }
      }
    })
    .on('success.form.fv', function(e,fdata) {
      // if ($tbl_medicine.hasClass("display-none")) {
      // alert($('.tbl-medicine-container #tbl_medicine tbody > tr .m-delete').length);
      if ($('.tbl-medicine-container #tbl_medicine tbody > tr .m-delete').length == 0) {
        notify('Required *', 'Please add medicine', '', 1500);
        return false;
      }

      e.preventDefault();
      var $form = $(e.target),
        $button = $form.data('formValidation').getSubmitButton();

      switch ($button.attr('id')) {
        case 'btn_frm_in':
          $("#mdl-save-draft .btn-close").trigger("click");

          var i_tr_rs_no = "",
            d = new Date(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            yy = d.getFullYear().toString().substr(2, 2)
          d = 'I-' + yy + "" + mm;
          var get_data = {
            format: d
          };

          $.ajax({
            dataType: 'json',
            type: 'GET',
            url: base_url + "inventory/ajax_search_risno",
            data: get_data,
            beforeSend: function() {
              notify('Processing', 'Please wait..', 'info', 999999);
            },
            success: function(data) {
              $('.alert-info .glyphicon-remove').trigger("click");
              if (data.status == "no") {
                i_tr_rs_no = d + '-0001';
              } else {
                i_tr_rs_no = d + '-' + data[0].series;
              }

              $.ajax({
                dataType: 'json',
                type: 'post',
                url: base_url + "inventory/ajax_savein",
                data: $frm_in.serialize() + '&tr_rs_no=' + i_tr_rs_no,
                beforeSend: function() {
                  notify('Processing', 'Please wait..', 'info', 90000);
                },
                success: function(data) {
                  $('.alert-info .glyphicon-remove').trigger("click");
                  if (data.status == "yes") {
                    notify('Success!', data.content, 'success', 1500);
                    refresh();
                  } else {
                    notify('Failed!', data.content, '', 3000);
                    refresh();
                  }
                },
                error: function(jqXHR, exception, errorThrown) {
                  if (jqXHR.responseText.indexOf('1062') != -1) {
                    notify('Duplicate entry!', 'This medicine is already exists!, Please check.', 'error', 2000);
                  } else {
                    notify('Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost.', 'error', 1500);
                  }
                  refresh();
                }
              });

            },
            error: function(jqXHR, exception, errorThrown) {
              $('.alert-info .glyphicon-remove').trigger("click");
              notify('Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost.', 'error', 1500);
              refresh();
            }
          });

          break;
        case 'draftButton':
          $("#mdl-save-draft .modal-body p:eq(0)").text($("#tr_location").val());
          $("#mdl-save-draft .modal-body p:eq(1)").text($("#tr_funding").val());
          $("#mdl-save-draft .modal-body p:eq(2)").text($("#tr_program").val());
          // $("#mdl-save-draft .modal-body p:eq(2)").text($('#tr_program').find('option:selected').text());
          $("#mdl-save-draft .modal-body p:eq(3)").text($("#tr_si_no").val());
          $("#mdl-save-draft .modal-body p:eq(4)").text($("#tr_dr_no").val());
          $("#mdl-save-draft .modal-body p:eq(5)").text($("#tr_supplier").val());
          $("#mdl-save-draft .modal-body p:eq(6)").text($("#tr_by").val());
          $("#mdl-save-draft .modal-body p:eq(7)").text($("#tr_date").val());

          $("#mdl-save-draft .draft-table").empty();
          $tbl_medicine.clone().appendTo("#mdl-save-draft .modal-body .draft-table");
          $(".draft-table #tbl_medicine input").removeAttr("name");
          $(".draft-table #tbl_medicine input").removeAttr("id");
          $form.data('formValidation').disableSubmitButtons(false);
          $('#mdl-save-draft').modal('show');
          break;
      }
      return false;
    });

  //ADD MEDICINE
  $body.delegate("#btn_add_medicine", "click", function() {
    if ($medicine.val() == '' || $medicine.val() == null) {
      notify('Required *', 'Please select medicine', '', 1500);
      $medicine.focus();
      return false;
    }
    if ($tr_lot_no.val() == '') {
      notify('Required *', 'Please select lot no', '', 1500);
      $tr_lot_no.focus();
      return false;
    }
    if ($unit.val() == '') {
      notify('Required *', 'Please select package', '', 1500);
      $unit.focus();
      return false;
    }
    if ($tr_qty.val() == '' || $form_group_add.hasClass("has-error")) {
      notify('Required *', 'Please input qty', '', 1500);
      $tr_qty.focus();
      return false;
    }
    $tbl_medicine.removeClass('display-none');

    var mselected = $medicine.find('option:selected');
    var m1 = mselected.data('m_name');

    var uselected = $unit.find('option:selected');
    var u1 = uselected.data('val');
    var u2 = uselected.data('unit');
    var u3 = uselected.val();

    var table = document.getElementById('tbl_medicine');
    var rowLength = table.rows.length;

    for(var i=0; i<rowLength; i+=1) {
      // var row = table.rows[i];
      if( $("#tbl_medicine input[name='vmedicine[]']").length ) {
        var vmedicine = $("input[name='vmedicine[]']").map(function(){return $(this).val();}).get();
        var vlotno = $("input[name='vlotno[]']").map(function(){return $(this).val();}).get();
        var vexpdate = $("input[name='vexpdate[]']").map(function(){return $(this).val();}).get();
        var vunit = $("input[name='vunit[]']").map(function(){return $(this).val();}).get();
        var vqty = $("input[name='vqty[]']").map(function(){return $(this).val();}).get();

        if(jQuery.inArray($medicine.val(), vmedicine) != -1 && jQuery.inArray($tr_lot_no.val(), vlotno) != -1 && jQuery.inArray($tr_expiration_date.val(), vexpdate) != -1 && jQuery.inArray(u2, vunit) != -1 && jQuery.inArray($tr_qty.val(), vqty) != -1) {

          if ($('body .ui-pnotify > .alert-danger').length == 0) {
            notify('Duplicate entry!', 'You have entered medicine that already exists. Please check!', 'error', 2500);
          }
          return false;
        }
      }
    }

    var newTr = $('<tr>' +
      '<td class="m-delete text-center"><a class="close-link"><i class="fa fa-close"></i></a></td>' +
      '<td><input type="hidden" name="vmedicine[]" value="' + $medicine.val() + '"/>' + m1 + '</td>' +
      '<td><input type="hidden" name="vlotno[]" value="' + $tr_lot_no.val() + '"/>' + $tr_lot_no.val() + '</td>' +
      '<td><input type="hidden" name="vexpdate[]" value="' + $tr_expiration_date.val() + '" />' + $tr_expiration_date.val() + '</td>' +
      '<td><input type="hidden" name="vunit[]" value="' + u2 + '"/><input type="hidden" name="vpcsper_set[]" value="' + u3 + '"/>' + u1 + '</td>' +
      '<td class="text-right"><input type="hidden" name="vqty[]" value="' + $tr_qty.val() + '"/>' + $tr_qty.val() + '</td>' +
      '</tr>');
    $tbl_medicine.append(newTr);
    $form_group_add.removeClass('has-success');
    $form_group_add.removeClass('has-error');
    $tr_qty.val('');
    $unit.val('').trigger("change");
  });

  $body.delegate(".m-delete", "click", function() {
    $(this).parent().remove();
  });

  $body.delegate("#btn_cancel", "click", function() {
    refresh();
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

  function refresh() {
    $medicine.val(null).trigger("change");
    $frm_in.data('formValidation').resetForm();
    $frm_in[0].reset();
    $tbl_medicine.addClass("display-none");
    $("#tbl_medicine tbody").detach();
    $("select#unit option").detach();
    $unit.append('<option value="">- - -</option>');
  }

});
