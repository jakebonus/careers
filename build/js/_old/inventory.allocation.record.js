$(function() {
  $(window).on("blur focus", function(a) {
    var t = $(this).data("prevType");
    if (t != a.type) switch (a.type) {
      case "focus":
        otable.ajax.reload()
    }
    $(this).data("prevType", a.type)
  });

  notify('Processing', 'Please wait..', 'info', 999999);

  function get_json(url,textid_option,textid){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myarr = JSON.parse(this.responseText);
        $(textid_option).detach();
        $(textid).append('<option value="">ALL</option>');
        for (i = 0; i < myarr.length; i++) {
            $(textid).append("<option value='" + myarr[i].value + "'>" + myarr[i].value + "</option>");
        }
        $(textid).prop("disabled", false);
      }
    }
    xhr.send();
  }

  get_json(base_url + "inventory/ajax_get_risno?str=A-", "#col0_filter option", "#col0_filter");
  get_json(base_url + "inventory/ajax_get_location?str=A-", "#col1_filter option, #col2_filter option", "#col1_filter, #col2_filter");
  get_json(base_url + "inventory/ajax_get_fund?str=A-", "#col3_filter option", "#col3_filter");
  get_json(base_url + "inventory/ajax_get_program?str=A-", "#col4_filter option", "#col4_filter");

  $("select#col0_filter").select2({
    placeholder: "Select RIS NO",
    allowClear: true
  });

  var sdata = null;

  var otable = $('#dt_dispense_record').DataTable({
    "ajax": {
      "url": base_url + "inventory/ajax_record_allocation",
      "dataSrc": ""
    },
    "columns": [{
        "data": "tr_rs_no"
      },
      {
        "data": "SOURCE"
      },
      {
        "data": "DESTINATION"
      },
      {
        "data": "tr_funding"
      },
      {
        "data": "tr_program"
      }
    ],
    'fnCreatedRow': function(nRow, data, iDisplayIndex) {
      $(nRow).attr('data-tr_location', data.SOURCE);
      $(nRow).attr('data-tr_funding', data.tr_funding);
      $(nRow).attr('data-tr_program', data.tr_program);
      $(nRow).attr('data-tr_destination', data.DESTINATION);
      $(nRow).attr('data-tr_receivedby', data.RECEIVED_BY);
      $(nRow).attr('data-tr_allocateby', data.ALLOCATE_BY);
      $(nRow).attr('data-tr_date', data.tr_date);
      $(nRow).attr('data-tr_rs_no', data.tr_rs_no);
    },
    dom: '<"wrapper"Bfit>',
    'info': false,
    'order': [
      [0, "desc"]
    ],
    'scrollY': 400,
    'scrollX': true,
    'scrollCollapse': true,
    'paging': false,
    buttons: [{
        extend: 'excelHtml5',
        customize: function(xlsx) {
          var sheet = xlsx.xl.worksheets['sheet1.xml'];
          $('row c[r^="C"]', sheet).attr('s', '2');
        }
      },
      {
        extend: 'print',
        exportOptions: {
          columns: ':visible'
        },
      },
    ],
    order: [
      [0, "desc"]
    ],
    deferRender: true,
    scrollY: 400,
    scrollCollapse: true,
    scroller: true,
    scrollX: true,
    initComplete: function() {
      $('.alert-info .glyphicon-remove').trigger("click");
    }
  });

  //PRINT PREVIEW
  $('#dt_dispense_record tbody').on('click', 'tr', function() {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      otable.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }

    // if ($(this).data('tr_rs_no')) {
    var attr = $(this).attr('data-tr_rs_no');
    if ($('body .ui-pnotify > .alert-info').length == 0) {
      if (typeof attr !== typeof undefined && attr !== false) {
        $("#tbl_print_preview tbody").empty();
        $("#mdl-print-draft .modal-body p:eq(0)").text($(this).data('tr_location'));
        $("#mdl-print-draft .modal-body p:eq(1)").text($(this).data('tr_funding'));
        $("#mdl-print-draft .modal-body p:eq(2)").text($(this).data('tr_program'));
        $("#mdl-print-draft .modal-body p:eq(3)").text($(this).data('tr_destination'));
        $("#mdl-print-draft .modal-body p:eq(4)").text($(this).data('tr_receivedby'));
        $("#mdl-print-draft .modal-body p:eq(5)").text($(this).data('tr_allocateby'));
        $("#mdl-print-draft .modal-body p:eq(6)").text($(this).data('tr_date'));
        $("#mdl-print-draft .modal-body p:eq(7)").text($(this).data('tr_rs_no'));

        var data = {
          tr_rs_no: $(this).data('tr_rs_no'),
          tr_location: $(this).data('tr_location')
        };

        $.ajax({
          dataType: 'json',
          type: 'GET',
          url: base_url + "inventory/ajax_search_record",
          data: data,
          beforeSend: function() {
            notify('Processing', 'Please wait..', 'info', 999999);
          },
          success: function(data) {
            $('.alert-info .glyphicon-remove').trigger("click");
            sdata = data;
            $.each(data, function(index, item) {
              $("#tbl_print_preview tbody").append('<tr>' +
                '<td>' + item.m_name + ' [' + item.tr_lot_no + ']</td>' +
                '<td>' + item.tr_rs_no + '</td>' +
                '<td>' + item.tr_pcsper_set + ' [' + item.tr_unit + ']</td>' +
                '<td class="text-right">' + item.tr_qty + '</td>' +
                '</tr>');
            });
            $('#mdl-print-draft').modal('show');
          },
          error: function(jqXHR, exception, errorThrown) {
            notify('Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost.', 'error', 1500);
          }
        });
      }
    }
    return false;
  });

  //PRINT
  $("body").delegate("#btn_record_print", "click", function() {
    $("#tbl-print tr.print").empty();

    $.each(sdata, function(index, item) {
      $('#tbl-print tr.title').after("<tr class='print'>" +
        "<td style='color:" + item.remarks + "'>&nbsp; " + item.tr_expiration_date + "</td>" +
        "<td colspan='2'> &nbsp;" + item.m_name + " [" + item.tr_lot_no + "]" + "</td>" +
        "<td>&nbsp; " + item.tr_pcsper_set + " [" + item.tr_unit + "]</td>" +
        "<td class='text-right'>" + item.tr_qty + "&nbsp;</td>" +
        "<td colspan='2'></td>" +
        "</tr>");
    });

    $("#tbl-print span.source").text($("#mdl-print-draft .modal-body p:eq(0)").text());
    $("#tbl-print span.destination").text($("#mdl-print-draft .modal-body p:eq(3)").text());
    $("#tbl-print span.date").text($("#mdl-print-draft .modal-body p:eq(6)").text());
    $("#tbl-print span.tr_allocateby").text($("#mdl-print-draft .modal-body p:eq(5)").text());
    $("#tbl-print .p_risno").text($("#mdl-print-draft .modal-body p:eq(7)").text());
    $("#tbl-print span.tr_recvby").text($("#mdl-print-draft .modal-body p:eq(4)").text());
    $('#mdl-recordprint').modal('show');
  });

  $('.column_filter').on('keyup click change', function() {
    filterColumn($(this).parents('div').attr('data-column'));
  });

  function filterColumn(i) {
    $('#dt_dispense_record').DataTable().column(i).search($('#col' + i + '_filter').val()).draw();
  }

  $("body").delegate("#btn_cancel", "click", function() {
    $("#frm_sdispense").data('formValidation').resetForm();
    $("#frm_sdispense")[0].reset();
    $("#print-report, ._print").addClass("hidden");
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

  $("body").delegate("a._refresh", "click", function() {
    otable.ajax.reload();
    $("#col0_filter, .filter select").val(null).trigger("change");
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
