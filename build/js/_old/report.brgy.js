$(function() {

  $('#frm-brgyreport').formValidation({
      framework: "bootstrap",
      button: {
        selector: '#btn_search',
        disabled: 'disabled'
      },
      icon: null,
    })
    .on('success.form.fv', function(e) {
      e.preventDefault();
      var $form = $(e.target),
        fv = $form.data('formValidation');

      var url = base_url + "report/ajax_get_brgy_report",
        data = $("#frm-brgyreport").serializeObject();
      etable(url, data);
      $form.data('formValidation').disableSubmitButtons(false);
      return false;
    });

  function etable(url, data) {
    notify('Processing', 'Please wait..', 'info', 999999);
    $("#print-report .heading p:eq(0) span").text($('#tr_location').val());
    $("#print-report .heading p:eq(1) span").text($('#tr_funding').val());
    $("#print-report .heading p:eq(2) span").text($('#tr_program').val());
    $("#print-report .heading p:eq(3) span:eq(0)").text($('#start').val());
    $("#print-report .heading p:eq(3) span:eq(1)").text($('#end').val());

    $("#print-report, ._print").removeClass("hidden");
    var f = $("#tr_format").val();
    $('#dt_brgyreport').dataTable().fnClearTable();
    $('#dt_brgyreport').dataTable().fnDestroy();
    var otable = $('#dt_brgyreport').DataTable({
      'ajax': {
        "type": "GET",
        "url": url,
        "data": data,
        "dataSrc": ""
      },
      'columns': [{
          "data": function(data) {
            return data.m_name + ' [' + data.m_pcsper_set + ']s';
          }
        },
        {
          "data": "ALASAS"
        },
        {
          "data": "BALITI"
        },
        {
          "data": "BULAON"
        },
        {
          "data": "CALULUT"
        },
        {
          "data": "DELA_PAZ_NORTE"
        },
        {
          "data": "DELA_PAZ_SUR"
        },
        {
          "data": "DEL_CARMEN"
        },
        {
          "data": "DEL_PILAR"
        },
        {
          "data": "DEL_ROSARIO"
        },
        {
          "data": "DOLORES"
        },
        {
          "data": "JULIANA"
        },
        {
          "data": "LARA"
        },
        {
          "data": "LOURDES"
        },
        {
          "data": "MAIMPIS"
        },
        {
          "data": "MAGLIMAN"
        },
        {
          "data": "MALINO"
        },
        {
          "data": "MALPITIC"
        },
        {
          "data": "PANDARAS"
        },
        {
          "data": "PANIPUAN"
        },
        {
          "data": "PULONG_BULO"
        },
        {
          "data": "QUEBIAWAN"
        },
        {
          "data": "SAGUIN"
        },
        {
          "data": "SAN_AGUSTIN"
        },
        {
          "data": "SAN_FELIPE"
        },
        {
          "data": "SAN_ISIDRO"
        },
        {
          "data": "SAN_JOSE"
        },
        {
          "data": "SAN_JUAN"
        },
        {
          "data": "SAN_NICOLAS"
        },
        {
          "data": "SAN_PEDRO_CUTUD"
        },
        {
          "data": "SANTA_LUCIA"
        },
        {
          "data": "SANTA_TERESITA"
        },
        {
          "data": "SANTO_NINO"
        },
        {
          "data": "SANTO_ROSARIO"
        },
        {
          "data": "SINDALAN"
        },
        {
          "data": "TELABASTAGAN"
        }
        // { "data": function(data) {
        //    return '<font color="' + data.remarks + '">' + data.tr_expiration_date + '</font';
        //    }
        // },
      ],
      'dom': '<"wrapper"fit>',
      'bFilter': false,
      "ordering": false,
      'info': false,
      // 'order': [[0, "desc"]],
      'scrollX': true,
      'buttons': [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      'columnDefs': [
        // { "visible": false, "targets": [1,2,3,4,5] }
        // { "visible": false, "targets": [1,2,3,4,5] }
      ],
      'order': [
        [0, 'asc']
      ],
      // 'displayLength': 125,
      // 'drawCallback': function ( settings ) {
      //     var api = this.api();
      //     var rows = api.rows( {page:'current'} ).nodes();
      //     var last=null;

      //     api.column(0, {page:'current'} ).data().each( function ( group, i ) {
      //         if ( last !== group ) {
      //             $(rows).eq( i ).before(
      //                 '<tr class="group"><td colspan="7">'+group+'</td></tr>'
      //             );

      //             last = group;
      //         }
      //     } );

      // },
      fnInitComplete: function(oSettings, json) {
        $('.alert-info .glyphicon-remove').trigger("click");
      }
    });
  }

  $("body").delegate("#btn_ecancel", "click", function() {
    $("#frm-brgyreport").data('formValidation').resetForm();
    $("#frm-brgyreport")[0].reset();
    $("#print-report, ._print").addClass("hidden");
  });

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

  function get_format(str) {
    var txt = 4;
    if (str == 0 || str == 'a') {
      txt = 4;
    } else if (str == 1 || str == 'b') {
      txt = 3;
    }
    return txt;
  }

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

});

function print_Content(el) {
  var divToPrint = document.getElementById(el);
  newWin = window.open("");
  newWin.document.write('<html><head><style>.dataTables_scrollBody tbody tr td:nth-child(odd){background-color:#f5f5f5}.dataTables_scrollHeadInner{width:100%!important}#report-dt,.dataTables_scrollBody,.dataTables_scrollHead{width:auto!important;height:auto!important;overflow:visible!important}table{width:100%;border-collapse:collapse}b,strong{font-weight:700}table td,table th{border:1px solid #000;text-align:left}tr.group{background-color:#d8d8d8;margin-top:10px;padding-top:10px}.img-logo{position:absolute;left:calc(50% - 220px);top:4px}.th-head{position:relative;padding:10px 0}#print-report .p_risno{position:absolute;right:6px;top:3px}#print-report p,#print-report strong{margin-bottom:0!important;line-height:1}table.dataTable.compact thead td,table.dataTable.compact thead th{padding:4px 17px 4px 4px;background-color:#526069;border:1px solid #000;color:#fff}#print-report .heading{display:block}thead th{position:relative}.rotate90 {font-size:11px;font-family:Sans-serif;position:absolute;left:-80px;top:35px;width:200px;-webkit-transform:rotateZ(-90deg);transform:rotateZ(-90deg)}.dataTables_scrollBody thead th div{display:none}table.dataTable.compact thead td,table.dataTable.compact thead th{padding:4px 17px 4px 4px;background-color:#7d909c;border:1px solid #000;color:#fff}.dataTables_scrollHeadInner thead tr th:nth-child(odd){background-color:#526069}tbody tr td,thead tr th {min-width:20px!important} tbody tr.odd td:nth-of-type(1),thead tr th:nth-of-type(1) {min-width:300px!important}</style>');
  newWin.document.write('</head><body onload="window.print()">');
  newWin.document.write(divToPrint.outerHTML);
  newWin.document.write('</body>');
  newWin.document.write('</html>');
  newWin.print();
  newWin.close();
}
