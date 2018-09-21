$(function() {

  $('#frm-expreport').formValidation({
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

      var url = base_url + "report/ajax_get_exp_report",
        data = $("#frm-expreport").serializeObject();
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
    $('#dt_expreport').dataTable().fnClearTable();
    $('#dt_expreport').dataTable().fnDestroy();
    var otable = $('#dt_expreport').DataTable({
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
          "data": "tr_lot_no"
        },
        {
          "data": function(data) {
            return '<font color="' + data.remarks + '">' + data.tr_expiration_date + '</font>';
          }
        },
        // { "data": "tr_expiration_date" },

        {
          "data": function(data) {
            return data.pcsper_set_x_qty + ' PCS';
          }
        },
        {
          "data": function(data) {
            return get_txt_box(data.box, data.m_set) + ' ' + get_txt_pcs(data.box, data.pcs);
          }
        }
      ],
      'dom': '<"wrapper"fit>',
      'bFilter': false,
      "ordering": false,
      'info': false,
      'scrollX': true,
      'paging': false,
      'scrollY': 280,
      'scrollCollapse': true,
      'buttons': [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      'columnDefs': [
        // { "visible": false, "targets": [1,2,3,4,5] }
        // { "visible": false, "targets": [1,2,3,4,5] }
      ],
      //'order': [[ 0, 'asc' ]],
      // 'displayLength': 125,
      'drawCallback': function(settings) {
        var api = this.api();
        var rows = api.rows({
          page: 'current'
        }).nodes();
        var last = null;

        api.column(0, {
          page: 'current'
        }).data().each(function(group, i) {
          if (last !== group) {
            $(rows).eq(i).before(
              '<tr class="group"><td colspan="7">' + group + '</td></tr>'
            );

            last = group;
          }
        });

      },
      fnInitComplete: function(oSettings, json) {
        $('.alert-info .glyphicon-remove').trigger("click");
        $("tbody tr.odd td:nth-of-type(1), tbody tr.even td:nth-of-type(1)").text("");
      }
    });
  }

  $("body").delegate("#btn_ecancel", "click", function() {
    $("#frm-expreport").data('formValidation').resetForm();
    $("#frm-expreport")[0].reset();
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
