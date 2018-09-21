$(function() {
  var box = 0,
    boxpc = 0,
    pc = 0;
  $("#tr_date").inputmask("9999-99-99", {
    "placeholder": "yyyy-mm-dd"
  });

  $('select#tr_location, select#tr_funding, select#tr_program').change(function() {
    if ($("select#tr_location").val() != "" && $("select#tr_funding").val() != "") {
      get_medicine();
    } else {
      reset();
    }
  });

  $('#medicine').change(function() {
    if ($("select#tr_location").val() != "" && $("select#tr_funding").val() != "" && $("#medicine").val() != "") {
      get_lotno();
    } else {
      reset();
    }
  });

  $('select#tr_lot_no').change(function() {
    if ($("select#tr_location").val() != "" && $("select#tr_funding").val() != "" && $("#medicine").val() != "" && $("#tr_lot_no").val() != "") {
      reset();
      search_medicine();
    }
    if ($("#tr_lot_no").val() == "") {
      $('#unit, #tr_qty').prop("disabled", false);
      $("select#unit option").detach();
      $("#unit").append('<option value="">- - -</option>');
      $('#unit, #tr_qty').prop("disabled", true);
      $("span.remarks").html('');
    }
  });

  $('#tr_location').change(function() {
    // $("#tr_destination option").removeAttr('disabled');
    // var selected = $(this).find('option:selected');
    //   if (selected.val() == '') {
    //     $("#tr_destination option").removeAttr('disabled');
    //   } else {
    //     $("#tr_destination option[value='"+selected.val()+"']").attr('disabled', 'disabled');
    //   }

    $("select#tr_destination option").detach();
    $("#tr_destination").append('<option value="">- - -</option>');
    $("#tr_destination").append('<option value="ABTC">ABTC</option>');
    $("#tr_destination").append('<option value="ALASAS STORAGE">ALASAS STORAGE</option>');
    $("#tr_destination").append('<option value="BS 1 - SINDALAN">BS 1 - SINDALAN</option>');
    $("#tr_destination").append('<option value="BS 2 - NORTHVILLE">BS 2 - NORTHVILLE</option>');
    $("#tr_destination").append('<option value="BS 3 - SAN JOSE">BS 3 - SAN JOSE</option>');
    $("#tr_destination").append('<option value="BS 4 - SAN NICOLAS">BS 4 - SAN NICOLAS</option>');
    $("#tr_destination").append('<option value="BS 5 - SAN AGUSTIN">BS 5 - SAN AGUSTIN</option>');
    $("#tr_destination").append('<option value="CHO MAIN">CHO MAIN</option>');
    $("#tr_destination").append('<option value="CITY COLLEGE">CITY COLLEGE</option>');
    $("#tr_destination").append('<option value="NORTHVILLE STORAGE">NORTHVILLE STORAGE</option>');
    $("#tr_destination").append('<option value="RHU 1">RHU 1</option>');
    $("#tr_destination").append('<option value="RHU 2">RHU 2</option>');
    $("#tr_destination").append('<option value="RHU 3">RHU 3</option>');
    $("#tr_destination").append('<option value="RHU 4">RHU 4</option>');
    $("#tr_destination").append('<option value="RHU 5">RHU 5</option>');
    $("#tr_destination").append('<option value="HEMS">HEMS</option>');
    $("#tr_destination").append('<option value="EHSD">EHSD</option>');
    $("#tr_destination").append('<option value="SOCIAL HYGIENE">SOCIAL HYGIENE</option>');
    var selected = $("select#tr_location").find('option:selected');
    $("#tr_destination option[value='" + selected.val() + "']").remove();
  });

  $('#tr_qty').focusout(function() {
    if (Number($(this).val()) == "") {
      $(this).val(0);
    }
  });

  function search_medicine() {
    console.log('search_medicine');

    $("#tr_qty").val(Number($("#tr_qty1").val()));
    reset();
    var data = {
      tr_location: $("#tr_location").val(),
      tr_funding: $("#tr_funding").val(),
      tr_lot_no: $("#tr_lot_no").val(),
      medicine: $("#medicine").val(),
      tr_program: $("#tr_program").val()
    };
    $.ajax({
      dataType: 'json',
      type: 'GET',
      url: base_url + "admin/ajax_search",
      data: data,
      beforeSend: function() {
        $('#unit, #tr_qty').prop("disabled", false);
        $("select#unit option").detach();
        $("#unit").append('<option value="">- - -</option>');
        $('#unit, #tr_qty').prop("disabled", true);
      },
      success: function(data) {
        if (data.status == "no") {} else {
          box = data[0].box;
          boxpc = data[0].pcs;
          pc = data[0].pcsper_set_x_qty;

          $("#tr_lot_no").attr("data-box", box);
          $('#unit').prop("disabled", false);
        }
      },
      error: function(jqXHR, exception, errorThrown) {
        notify('Search Medicine - Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost. ', 'error', 1500);
      }
    });
    return false;
  }

  //GET MEDICINE
  function get_medicine() {
    console.log('get_medicine');

    $("#tr_qty").val(Number($("#tr_qty1").val()));
    reset();
    var get_data = {
      tr_location: $("#tr_location").val(),
      tr_funding: $("#tr_funding").val(),
      tr_program: $("#tr_program").val(),
      medicine: ""
    };

    $.ajax({
      dataType: 'json',
      type: 'GET',
      url: base_url + "admin/ajax_search",
      data: get_data,
      beforeSend: function() {
        $("#medicine").append('<option value="">loading...</option>');
      },
      success: function(data) {
        $("#medicine option").detach();

        if (data.status == "no") {
          $("sup.r").text('No Available Stock');
          $("#mdl-popup .modal-body p:eq(0) span").text($("#tr_location").val());
          $("#mdl-popup .modal-body p:eq(1) span").text($("#tr_funding").val());
          $("#mdl-popup .modal-body p:eq(2) span").text($("#tr_program").val());
          $('#mdl-popup').modal('show');

          $("#tr_lot_no option, #unit option").detach();
          $("#tr_lot_no, #unit").append('<option value="">- - -</option>');
          $('#medicine, #tr_lot_no, #unit, #tr_qty').prop("disabled", true);
        } else {
          $("sup.r").text("");
          $('#medicine').prop("disabled", false);
          $.each(data, function(index, item) {
            if (item.pcsper_set_x_qty != 0) {
              $("#medicine").append("<option value=" + item.m_id + " data-m_name='" + item.m_name + "' data-tr_si_no='" + item.tr_si_no + "' data-tr_dr_no='" + item.tr_dr_no + "' data-tr_supplier='" + item.tr_supplier + "'>" + item.m_name + "</option>");
            }
          });
          $("#medicine").val(null).trigger("change");
        }
      },
      error: function(jqXHR, exception, errorThrown) {
        notify('Search Medicine - Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost. ', 'error', 1500);
      }
    });
    return false;
  }

  //GET LOT NO
  function get_lotno() {
    console.log('get_lotno');

    $("#tr_qty").val(Number($("#tr_qty1").val()));
    reset();
    var get_data = {
      tr_location: $("#tr_location").val(),
      tr_funding: $("#tr_funding").val(),
      medicine: $("#medicine").val(),
      tr_program: $("#tr_program").val(),
      tr_lot_no: ""
    };

    $.ajax({
      dataType: 'json',
      type: 'GET',
      url: base_url + "admin/ajax_search",
      data: get_data,
      beforeSend: function() {
        $("#tr_lot_no option").detach();
        $("#tr_lot_no").append('<option value="">loading...</option>');
        $('#tr_lot_no, #unit, #tr_qty').prop("disabled", true);
      },
      success: function(data) {
        if (data.status == "no") {
          $('#tr_qty').prop("disabled", true);
        } else {
          $('#tr_lot_no').prop("disabled", false);
          $("#tr_lot_no option").detach();
          $("#tr_lot_no").append('<option value="">- - -</option>');
          $("#tr_lot_no").prop("disabled", false);
          $.each(data, function(index, item) {
            if (item.pcsper_set_x_qty != 0) {

              var d = new Date(item.tr_expiration_date),
                curr_day = d.getDate(),
                curr_month = d.getMonth() + 1,
                curr_year = d.getFullYear(),
                year_2d = curr_year.toString().substring(2, 4);

              $("#tr_lot_no").append("<option value='" + item.tr_lot_no + "' data-m_name='" + item.m_name + "' data-m_set='" + item.m_set + "' data-pcsper_set=" + item.m_pcsper_set + " data-program='" + item.tr_program + "' data-expirationdate='" + item.tr_expiration_date + "' style='color:" + item.remarks + "'>" + item.tr_lot_no + " [" + curr_month + "." + curr_day + "." + year_2d + "]</option>");

              var n = $("input[name^='vlotno']").length, //v1.1.1
                vlotno = $("input[name^='vlotno']");
              for (i = 0; i < n; i++) {
                var a = vlotno.eq(i).attr('value');
                $("#tr_lot_no option[value='" + a + "']").remove();
              } //v1.1.1
            }
          });
        }
      },
      error: function(jqXHR, exception, errorThrown) {
        notify('Search LotNo. - Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost. ', 'error', 1500);
      }
    });
    return false;
  }

  $("select#unit").focus(function() {
    var selected = $('#tr_lot_no').find('option:selected');
    var a = selected.data('m_set'),
      b = selected.data('pcsper_set'),
      c = $("#tr_lot_no").attr("data-box");
    $("select#unit option").detach();
    if (selected.val() != "") {
      $("#unit").append('<option value="">- - -</option>');
      if (c != '0') {
        $("select#unit").append('<option value="' + b + '" data-val="' + a + ' [' + b + ']" data-unit="' + a + '">' + a + ' [' + b + ']</option>');
      }
      if (b != 1) {
        $("select#unit").append('<option value="1" data-val="PC [1]" data-unit="PC">PC [1]</option>');
      }
    }
  });

  $('select#unit').change(function() {
    $("#tr_qty1, #tr_qty").val('');
    var selected = $(this).find('option:selected'),
      a = selected.data('unit');
    if (selected.val() != '') {
      $('#tr_qty').prop("disabled", false);
      if (a == 'PC') {
        if (pc == '0') {
          $("#tr_qty1").val('0');
          $("span.remarks").html('0');
        } else {
          $("#tr_qty1").val(pc);
          $("span.remarks").html(' [' + pc + ' PC/s]');
        }
      } else {
        if (box == '0') {
          if (boxpc == '0') {
            $("#tr_qty1").val('0');
            $("span.remarks").html('0');
          } else {
            $("#tr_qty1").val(boxpc);
            $("span.remarks").html(' [' + boxpc + ' PC/s]');
          }
        } else {
          $("#tr_qty1").val(box);
          if (boxpc == '0') {
            $("span.remarks").html(' [' + box + ' ' + a + '/es ]');
          } else {
            $("span.remarks").html(' [' + box + ' ' + a + '/es & ' + boxpc + ' PC/s]');
          }
        }
      }
    } else {
      $("span.remarks").html('');
      $('#tr_qty').prop("disabled", true);
    }
  });

  //ADD
  $('#frm_allocation').formValidation({
      framework: "bootstrap",
      icon: null,
      fields: {
        tr_allocateby: {
          validators: {
            regexp: {
              regexp: /^[0-9a-zA-Z .,-]+$/i
            }
          }
        },
        tr_by: {
          validators: {
            regexp: {
              regexp: /^[0-9a-zA-Z .,-]+$/i
            }
          }
        },
        tr_rs_no: {
          validators: {
            regexp: {
              regexp: /^[0-9a-zA-Z .,-]+$/i
            }
          }
        },
        tr_qty: {
          validators: {
            lessThan: {
              value: 'tr_qty1',
              message: 'The value must be less than or equal to Qty [ - -]'
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
    .on('success.form.fv', function(e) {
      // if ($("#tbl_medicine").hasClass("display-none")) {
      if ($('.tbl-medicine-container #tbl_medicine tbody > tr .m-delete').length == 0) {
        notify('Required *', 'Please add medicine', '', 1500);
        return false;
      }

      e.preventDefault();
      var $form = $(e.target),
        $button = $form.data('formValidation').getSubmitButton();

      switch ($button.attr('id')) {
        case 'btn_frm_allocation':
          $('#tr_location, #tr_funding, #tr_program').prop("disabled", false);
          $("#mdl-save-draft .btn-close").trigger("click");

          var d = new Date(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            yy = d.getFullYear().toString().substr(2, 2)
          d = 'A-' + yy + "" + mm;
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
                $("#tr_rs_no").val(d + '-0001');
              } else {
                $("#tr_rs_no").val(d + '-' + data[0].series);
              }

              //save
              $.ajax({
                dataType: 'json',
                type: 'post',
                url: base_url + "inventory/ajax_saveallocation",
                data: $('#frm_allocation').serialize(),
                beforeSend: function() {
                  notify('Processing', 'Please wait..', 'info', 999999);
                },
                success: function(data) {
                  $('.alert-info .glyphicon-remove').trigger("click");
                  if (data.status == "yes") {
                    notify('Success!', data.content, 'success', 1500);
                    $('#mdl-print').modal('show');
                  } else {
                    notify('Failed!', data.content, '', 1500);
                    refresh();
                  }
                },
                error: function(jqXHR, exception, errorThrown) {
                  $('.alert-info .glyphicon-remove').trigger("click");
                  if (jqXHR.responseText.indexOf('1062') != -1) {
                    notify('Duplicate entry!', 'This medicine is already exists!, Please check.', 'error', 1500);
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
          $("#mdl-save-draft .modal-body p:eq(2)").text($('#tr_program').find('option:selected').text());
          $("#mdl-save-draft .modal-body p:eq(3)").text($("#tr_destination").val());
          $("#mdl-save-draft .modal-body p:eq(4)").text($("#tr_by").val());
          $("#mdl-save-draft .modal-body p:eq(5)").text($("#tr_allocateby").val());
          $("#mdl-save-draft .modal-body p:eq(6)").text($("#tr_date").val());
          $("#mdl-save-draft .modal-body p:eq(7)").text($("#tr_rs_no").val());

          $("#mdl-save-draft .draft-table").empty();
          $("#tbl_medicine").clone().appendTo("#mdl-save-draft .modal-body .draft-table");
          $(".draft-table #tbl_medicine input").removeAttr("name");
          $(".draft-table #tbl_medicine input").removeAttr("id");
          $form.data('formValidation').disableSubmitButtons(false);
          $('#mdl-save-draft').modal('show');
          break;
      }
      return false;
    });

  //ADD MEDICINE
  $("body").delegate("#btn_add_medicine", "click", function() {
    if ($('body .ui-pnotify > .alert-warning').length == 0) {
      if ($("select#medicine").val() == '' || $("select#medicine").val() == null) {
        notify('Required *', 'Please select medicine', '', 1500);
        $("select#medicine").focus();
        $form.data('formValidation').disableSubmitButtons(false);
        return false;
      }
      if ($("select#tr_lot_no").val() == '') {
        notify('Required *', 'Please select lot no.', '', 1500);
        $("select#tr_lot_no").focus();
        $form.data('formValidation').disableSubmitButtons(false);
        return false;
      }
      if ($("select#unit").val() == '') {
        notify('Required *', 'Please select package', '', 1500);
        $("select#unit").focus();
        $form.data('formValidation').disableSubmitButtons(false);
        return false;
      }
      if ($("#tr_qty").val() == '0' || $("#tr_qty").val() == '' || $(".form-group-add").hasClass("has-error")) {
        notify('Required *', 'Please check the qty', '', 1500);
        $("#tr_qty").focus();
        $form.data('formValidation').disableSubmitButtons(false);
        return false;
      }
      $('#tbl_medicine').removeClass('display-none');

      var mselected = $('select#medicine').find('option:selected'),
        m1 = mselected.data('m_name'),
        m_tr_si_no = mselected.data('tr_si_no'),
        m_tr_dr_no = mselected.data('tr_dr_no'),
        m_tr_supplier = mselected.data('tr_supplier');

      var lselected = $('select#tr_lot_no').find('option:selected'),
        l1 = lselected.val();

      var uselected = $('select#unit').find('option:selected'),
        u1 = uselected.data('val'),
        u2 = uselected.data('unit'),
        u3 = uselected.val(),
        qty = $("#tr_qty").val();

      var tselected = $("select#tr_lot_no").find('option:selected'),
        pr = tselected.data('program'),
        ex = tselected.data('expirationdate');

      $("#tr_qty1").val(Number($("#tr_qty1").val()) - Number(qty));

      var newTr = $('<tr>' +
        '<td class="m-delete text-center" data-qty="' + qty + '"><a class="close-link"><i class="fa fa-close"></i></a></td>' +
        '<td><input type="hidden" name="vmedicine[]" data-name="' + m1 + '" value="' + $("select#medicine").val() + '"/>' + m1 + '</td>' +
        '<td>' +
        '<input type="hidden" name="m_tr_si_no[]" value="' + m_tr_si_no + '"/>' +
        '<input type="hidden" name="m_tr_dr_no[]" value="' + m_tr_dr_no + '"/>' +
        '<input type="hidden" name="m_tr_supplier[]" value="' + m_tr_supplier + '"/>' +
        '<input type="hidden" name="vexpirationdate[]" value="' + ex + '"/>' +
        '<input type="hidden" name="vlotno[]" value="' + l1 + '"/>' + l1 + '</td>' +
        '<td><input type="hidden" name="vunit[]" value="' + u2 + '"/><input type="hidden" name="vpcsper_set[]" value="' + u3 + '"/>' + u1 + '</td>' +
        '<td class="text-right"><input type="hidden" name="vqty[]" value="' + qty + '"/>' + qty + '</td>' +
        '</tr>');
      $('#tbl_medicine').append(newTr);

      $("#unit").val('').trigger("change");
      $('.form-group-add').removeClass('has-success');
      $('.form-group-add').removeClass('has-error');
      $("#tr_qty").val('');
      $('#tr_location, #tr_funding, #tr_program').prop("disabled", true);
      $("#btn_cancel_trans").removeClass("hidden");
      $('#tr_lot_no').find('option:selected').remove(); //v1.1.1
    }
  });

  $("body").delegate(".m-delete", "click", function() {
    $("#tr_qty1").val(Number($(this).data('qty')) + Number($("#tr_qty1").val()));
    $(this).parent().remove();
    $("#medicine").val(null).trigger("change"); //v1.1.1
  });

  $("body").delegate("#btn_cancel_trans", "click", function() {
    $('#tr_location, #tr_funding, #tr_program').prop("disabled", false);
    $('#tr_location, #tr_funding').val("");
    $('#tr_program').val("N/A");
    $("#btn_cancel_trans").addClass("hidden");

    $("#frm_allocation").data('formValidation').resetForm();
    $('#medicine, #tr_lot_no, #unit, #tr_qty').prop("disabled", true);
    $("#tbl_medicine").addClass("display-none");
    $("#tbl_medicine tbody").detach();
    $("span.remarks").html('');
    reset();
  });

  $("body").delegate("#btn_cancel", "click", function() {
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
    $("#btn_cancel_trans").addClass("hidden");
    $('#tr_location, #tr_funding, #tr_program').prop("disabled", false);
    $("#frm_allocation").data('formValidation').resetForm();
    $("#frm_allocation")[0].reset();
    $('#medicine, #tr_lot_no, #unit, #tr_qty').prop("disabled", true);
    $("#tbl_medicine").addClass("display-none");
    $("#tbl_medicine tbody").detach();
    $("span.remarks").html('');
    reset();
  }

  function reset() {
    box = 0;
    boxpc = 0;
    pc = 0;
    $("#tr_qty, #unit, #tr_qty1").val("");
    $("span.remarks").html('');
  }

  //GET LOCATION FROM TR_TRANSACTION
  function get_json(url,textid_option,textid,option){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myarr = JSON.parse(this.responseText);
        $(textid_option).detach();

        if (option == 0) {
          $(textid).append('<option value="">ALL</option>');
        } else {
          $(textid).append("<option value='N/A'>N/A</option>");
        }

        for (i = 0; i < myarr.length; i++) {
            $(textid).append("<option value='" + myarr[i].value + "'>" + myarr[i].value + "</option>");
        }
        $(textid).prop("disabled", false);
      }
    }
    xhr.send();
  }

  get_json(base_url + "admin/ajax_get_tr_location", "#tr_location option", "#tr_location",0);
  get_json(base_url + "admin/ajax_get_tr_funding", "#tr_funding option", "#tr_funding",0);
  get_json(base_url + "admin/ajax_get_program", "#tr_program option", "#tr_program",1);

  //PRINT
  $("body").delegate("#btn_cancel_print", "click", function() {
    refresh();
  });

  $("body").delegate("#btn_print", "click", function() {
    $('.glyphicon-remove').trigger("click");
    $("span.source").text($("#tr_location").val());
    $("span.destination").text($("#tr_destination").val());

    var d = new Date($("#tr_date").val().split("-")),
      dd = d.getDate(),
      mm = d.getMonth() + 1,
      yy = d.getFullYear()
    d = mm + "/" + dd + "/" + yy;
    $("span.date").text(d);

    $("span.tr_by").text($("#tr_by").val());
    $("span.tr_allocateby").text($("#tr_allocateby").val());
    $("span.tr_recvby").text($("#tr_by").val());
    $("div.p_risno").text($("#tr_rs_no").val());

    var n = $("input[name^='vmedicine']").length,
      pvmedicine = $("input[name^='vmedicine']"),
      pvlotno = $("input[name^='vlotno']"),
      pvunit = $("input[name^='vunit']"),
      pvpcsper_set = $("input[name^='vpcsper_set']"),
      pvqty = $("input[name^='vqty']"),
      vexpirationdate = $("input[name^='vexpirationdate']");

    $("#tbl-print .t-detach").detach();
    for (i = 0; i < n; i++) {

      var d = new Date(vexpirationdate.eq(i).attr('value').split("-")),
        dd = d.getDate(),
        mm = d.getMonth() + 1,
        yy = d.getFullYear()
      d = mm + "/" + dd + "/" + yy;

      $('#tbl-print tr.title').after("<tr class='t-detach'>" +
        "<td>&nbsp; " + d + "</td>" +
        "<td colspan='2'> &nbsp;" + pvmedicine.eq(i).attr('data-name') + " [" + pvlotno.eq(i).attr('value') + "]" + "</td>" +
        "<td>&nbsp; " + pvpcsper_set.eq(i).attr('value') + " [" + pvunit.eq(i).attr('value') + "]</td>" +
        "<td class='text-right'>" + pvqty.eq(i).attr('value') + "&nbsp;</td>" +
        "<td colspan='2'></td>" +
        "</tr>");
    }
    $('#mdl-previewprint').modal('show');
    refresh();
  });

});

function printContent(el) {
  var divToPrint = document.getElementById(el);
  newWin = window.open("");
  newWin.document.write('<html><head><style>table{width:100%}b, strong {font-weight:700}table {border-collapse:collapse;}table td, table th{ border: 1px solid black; text-align:left;}tr.group{background-color: #d8d8d8;margin-top:10px;padding-top:10px} .img-logo {position:absolute;left:calc(50% - 200px);top:11px}.th-head{position:relative;padding:10px 0}p.p-version{position:absolute;top:0;right:3px;font-size:9px}.version{position:relative}.p_risno{position:absolute;right:6px;top:3px}.text-right{text-align:right}</style>');
  newWin.document.write('</head><body onload="window.print()">');
  newWin.document.write(divToPrint.outerHTML);
  newWin.document.write('</body>');
  newWin.document.write('</html>');
  newWin.print();
  newWin.close();
}


// var selected = $('#tr_lot_no').find('option:selected');


//  var n = $("input[name^='vmedicine']").length,
//  pvmedicine = $("input[name^='vmedicine']");

//  for(i=0; i < n; i++) {
//   pvmedicine.eq(i).attr('value')
//  }

//  get_medicine()

//  $("#medicine").val(null).trigger("change");


//  $("#tr_lot_no option, #unit option").detach();
//           $("#tr_lot_no, #unit").append('<option value="">- - -</option>');
//           $('#medicine, #tr_lot_no, #unit, #tr_qty').prop("disabled", true);
