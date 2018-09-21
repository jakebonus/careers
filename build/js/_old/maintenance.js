$(function() {
  var pass = $('#txt-delpassword');

  var $dt_all_transaction = $('#dt_all_transaction'),
    $tr_lot_no = $("select#tr_lot_no"),
    $m_name = $("select#m_name"),
    del_tr_id = null;

  $('.input-daterange').datepicker({
    todayBtn: "linked",
    format: 'yyyy-mm-dd',
  });

  $tr_lot_no.select2({
    placeholder: "ALL",
    allowClear: true
  });
  $m_name.select2({
    placeholder: "ALL",
    allowClear: true
  });

  // $(window).on("blur focus", function(a) {
  //   var t = $(this).data("prevType");
  //   if (t != a.type) switch (a.type) {
  //     case "focus":
  //       load_data();
  //   }
  //   $(this).data("prevType", a.type)
  // });
  // load_data();

  // notify('Processing', 'Please wait..', 'info', 9999999);

  // function load_data() {
  //   $('select').val('');
  //   var url = base_url + "maintenance/ajax_get_all_transaction";
  //   var data = {
  //     tr_risno: '',
  //     m_name: '',
  //     tr_brgy: ''
  //   };
  //   otable(url, data);
  // }

  function otable(url, data) {
    $dt_all_transaction.dataTable().fnClearTable();
    $dt_all_transaction.dataTable().fnDestroy();
    var otable = $dt_all_transaction.DataTable({
      'ajax': {
        "type": "GET",
        "url": url,
        "data": data,
        "dataSrc": ""
      },
      'columns': [{
          "data": function(data) {
            return data.tr_id;
          }
        },
        {
          "data": function(data) {
            return data.tr_rs_no;
          }
        },
        {
          "data": function(data) {
            return data.m_name;
          }
        },
        {
          "data": function(data) {
            return data.tr_lot_no;
          }
        },
        {
          "data": function(data) {
            return data.t_package;
          }
        },
        {
          "data": function(data) {
            return data.tr_qty;
          }
        },
        {
          "data": function(data) {
            return data.tr_location;
          }
        },
        {
          "data": function(data) {
            return data.recvby;
          }
        },
        {
          "data": function(data) {
            return data.tr_brgy;
          }
        },
        {
          "data": function(data) {
            return data.addedby;
          }
        },
        {
          "data": function(data) {
            return data.addeddate;
          }
        }
      ],
      // 'columnDefs': [{
      //     'targets': get_columndefs(),
      //     'visible': false,
      //     'searchable': true,
      // }],
      // 'columnDefs': [{
      //   targets: [1],
      //   visible: false,
      //   searchable: true,
      // }, ],
      // 'fixedColumns': {
      //   leftColumns: 1
      //   // rightColumns: 8
      // },
      'dom': '<"wrapper"Bfit>',
      'info': false,
      'order': [
        [0, "desc"]
      ],
      'scrollY': 400,
      'scrollX': true,
      'scrollCollapse': true,
      'paging': false,
      'buttons': [{
        'text': '',
        'extend': 'excelHtml5',
        'titleAttr': 'Export Excel',
        'className': 'fa fa-download',
        customize: function(xlsx) {
          var sheet = xlsx.xl.worksheets['sheet1.xml'];
          $('row c[r^="C"]', sheet).attr('s', '2');
        }
      }, {
        'text': '',
        'extend': 'print',
        'titleAttr': 'Print',
        'className': 'fa fa-print',
        'exportOptions': {
          'columns': ':visible'
          // columns: [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14]
        },
      }],
      'fnCreatedRow': function(nRow, data, iDisplayIndex) {
        $(nRow).attr('data-tr_id', data.tr_id);
        $(nRow).attr('data-tr_lot_no', data.tr_lot_no);
        $(nRow).attr('data-m_name', data.m_name);
        $(nRow).attr('data-t_package', data.t_package);
        $(nRow).attr('data-tr_qty', data.tr_qty);
        $(nRow).attr('data-addedby', data.addedby);
        $(nRow).attr('data-addeddate', data.addeddate);
        $(nRow).attr('data-tr_brgy', data.tr_brgy);
        $(nRow).attr('data-tr_location', data.tr_location);
        $(nRow).attr('data-recvby', data.recvby);
        $(nRow).attr('data-tr_rs_no', data.tr_rs_no);
        $(nRow).attr('data-remarks', data.remarks);
      },
      fnInitComplete: function(oSettings, json) {
        $('.alert-info .glyphicon-remove').trigger("click");
      },
      fnRowCallback: function(nRow, aaData, iDisplayIndex) {
        $(nRow).addClass(aaData.remarks);
        return nRow;
      }
    });
  }

  $("#btn_reset").click(function() {
    $tr_lot_no.val(null).trigger("change");
    $("a.btn.fa-refresh").trigger("click");
  });
  $("#btn_search").click(function() {
    $('.alert-info .glyphicon-remove').trigger("click");
    notify('Processing', 'Please wait..', 'info', 9999999);
    var url = base_url + "maintenance/ajax_get_all_transaction";
    var data = $("#frm_search").serializeObject();
    $dt_all_transaction.removeClass('hidden');
    $(".no-record").addClass('hidden');
    otable(url, data);
    return false;
  });

  //MODAL
  $("body").delegate("#dt_all_transaction tbody tr", "click", function() {
    var h = "";
    del_tr_id = $(this).data('tr_id');
    $('#mdl-trans-del').modal('show');
    $('#btn_mdelete').attr('data-tr_id', del_tr_id);

    h += "<strong>Ris No:</strong> " + $(this).data('tr_rs_no') + " <br><br>" +
      "<strong>Medicine:<br></strong> " + $(this).data('m_name') + " <br><br>" +
      "<strong>Package: </strong> " + $(this).data('t_package') + " <br>" +
      "<strong>Qty: </strong> " + $(this).data('tr_qty') + " <br>" +
      "<strong>Lot no:</strong> " + $(this).data('tr_lot_no') + " <br>" +
      "<strong>Location:</strong> " + $(this).data('tr_location') + " <br>";
    if ($(this).data('remarks') == 'color-d') {
      h += "<strong>Received by:</strong> " + $(this).data('recvby') + " <br>" +
        "<strong>Barangay:</strong> " + $(this).data('tr_brgy') + " <br>";
    }

    h += "<strong>Added by:</strong> " + $(this).data('addedby') + " <br><br><strong>Added datetime:</strong> " + $(this).data('addeddate');

    $("#mdl-trans-del .modal-body p:eq(1)").html(h);
    $("#mdl-trans-del .modal-title").text("Delete - " + del_tr_id);
  });

  //DELETE
  $("body").delegate("#mdl-trans-del #btn_mdelete", "click", function() {

    if (pass.val() == '') {
      if ($('body .ui-pnotify > .alert-info').length == 0) {
        notify('Required', 'Please enter your password', 'info', 2000);
      }
      return false;
    }

    if (del_tr_id != null) {
      var data = {
        tr_id: del_tr_id,
        delpassword: pass.val()
      };

      $.ajax({
        dataType: 'json',
        type: 'post',
        url: base_url + "maintenance/ajax_tdelete",
        data: data,
        beforeSend: function() {
          notify('Please wait', 'Deleting.....', 'info', 999999);
        },
        success: function(data) {
          if (data.status == "yes") {
            $('.alert-info .glyphicon-remove').trigger("click");
            notify('Success!', data.content, 'success', 2000);
            $("#btn_search").trigger("click");
            del_tr_id = null;
            pass.val('');
            $('#mdl-trans-del').modal('hide');
          } else {
            $('.alert-info .glyphicon-remove').trigger("click");
            notify('Failed!', data.content, '', 2000);
            pass.val('');
          }
        },
        error: function(jqXHR, exception) {
          $('.alert-info .glyphicon-remove').trigger("click");
          del_tr_id = null;
          notify('Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost.', 'error', 5000);
          pass.val('');
          $('#mdl-trans-del').modal('hide');
        }
      });
    }
    return false;
  });

  $('select#tr_risno').change(function() {
    if ($(this).val() == "D-") {
      $('.lbl-brgy').removeClass("hidden");
    } else {
      $('.lbl-brgy').addClass("hidden");
    }
  });

  $("body").delegate("#btn_reset", "click", function() {
    $m_name.val(null).trigger("change");
    $("#start, #end, #tr_risno, #t_risno").val("");
    return false;
  });

  $('#mdl-trans-del').on('shown.bs.modal', function(){
    pass.val('').focus();
    $(document).on('keypress', '#txt-delpassword', function(event) {
      if (event.which == '13') {
        $("#btn_mdelete").trigger("click");
      }
    });
  });
  //FORM OBJECT
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  // GET LOCATION FROM TR_TRANSACTION
  function get_json(url, textid_option, textid, option) {
    var html = '',
      xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myarr = JSON.parse(this.responseText);
        $(textid_option).detach();
        html += '<option value="">ALL</option>';
        if (option == 1) {
          html += "<option value='N/A'>N/A</option>";
        }
        if (option == 3) {
          for (i = 0; i < myarr.length; i++) {
            html += "<option value='" + myarr[i].m_id + "'>" + myarr[i].m_name + "</option>";
          }
        } else {
          for (i = 0; i < myarr.length; i++) {
            html += "<option value='" + myarr[i].value + "'>" + myarr[i].value + "</option>";
          }
        }
        $(textid).html(html);
        $(textid).prop("disabled", false);
      }
    }
    xhr.send();
  }

  get_json(base_url + "report/ajax_get_medicine_stockcard", "#m_name option", "#m_name", 3);
  get_json(base_url + "maintenance/ajax_get_all_trans_brgy", "#tr_brgy option", "#tr_brgy", 0);

  function get_txt_pcs(str1, str) {
    var txt = '',
      txt2 = '';
    if (str1 > 0) {
      txt2 = 'and';
    }

    if (str > 1) {
      txt = txt2 + ' ' + str + ' PCS';
    } else {
      if (str > 0) {
        txt = txt2 + ' ' + str + ' PC';
      }
    }
    return txt;
  }

  function get_columndefs() {
    var txt = "";
    if ($("#tr_risno").val() == "D-") {
      txt += "2,";
    }
    if ($("#tr_lot_no").val() == "") {
      txt += "1,";
    }
    txt = txt.split(",").map(Number);
    txt.splice($.inArray(0, txt), 1);
    return txt;
  }

  function get_txt_box(str, str1) {
    var txt = '';
    if (str > 1) {
      txt = str + ' ' + str1 + 'ES';
    } else {
      if (str > 0) {
        txt = str + ' ' + str1;
      }
    }
    return txt;
  }

  function notify(title, content, type, delay) {
    new PNotify({
      title: title,
      text: content,
      styling: 'bootstrap3',
      type: type,
      delay: delay
    });
  }

});
