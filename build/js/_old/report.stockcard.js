$(function() {
  var $medicine = $('#medicine'),
      $frm_stockcard = $('#frm_stockcard');

  $medicine.select2({
    placeholder: "Select Medicine",
    // allowClear: true
  });

  function get_json(url,textid_option,textid,option){
    var html = '',
        xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myarr = JSON.parse(this.responseText);
        $(textid_option).detach();
        html +='<option value="">- - -</option>';

        if (option == 1) {
          html +="<option value='N/A'>N/A</option>";
        }

        for (i = 0; i < myarr.length; i++) {
            html +="<option value='" + myarr[i].value + "'>" + myarr[i].value + "</option>";
        }
        $(textid).html(html);
        $(textid).prop("disabled", false);
      }
    }
    xhr.send();
  }

  get_json(base_url + "admin/ajax_get_tr_funding", "#str_funding option", "#str_funding", 0);
  get_json(base_url + "admin/ajax_get_program", "#str_program option", "#str_program", 1);

  var html = '',
      xhr = new XMLHttpRequest();
  xhr.open("GET", base_url + "report/ajax_get_medicine_stockcard", true);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myarr = JSON.parse(this.responseText);
      $("#medicine option").detach();
      html +='<option value="">- - -</option>';

      for (i = 0; i < myarr.length; i++) {
        html +="<option value='" + myarr[i].m_id + "'>" + myarr[i].m_name + "</option>";
      }
      $medicine.html(html);
      $medicine.prop("disabled", false);
    }
  }
  xhr.send();

  $frm_stockcard.formValidation({
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

      var url = base_url + "report/ajax_get_stockcard",
        data = $frm_stockcard.serializeObject();
      etable(url, data);
      $form.data('formValidation').disableSubmitButtons(false);
      return false;
    });

  function etable(url, data) {
    notify('Processing', 'Please wait..', 'info', 999999);
    $("#print-report .heading p:eq(0) span").text($('#medicine option:selected').text());
    $("#print-report .heading p:eq(1) span").text($('#str_funding').val());
    $("#print-report .heading p:eq(2) span").text($('#str_program').val());
    $("#print-report .heading p:eq(3) span:eq(0)").text($('#tr_location').val());

    $("#print-report, ._print").removeClass("hidden");
    var f = $("#tr_format").val();
    $('#dt_stockcard').dataTable().fnClearTable();
    $('#dt_stockcard').dataTable().fnDestroy();
    var otable = $('#dt_stockcard').DataTable({
      'ajax': {
        "type": "GET",
        "url": url,
        "data": data,
        "dataSrc": ""
      },
      'columns': [{
          "data": "tr_date"
        },
        {
          "data": "TRAN"
        },
        {
          "data": "tr_rs_no"
        },
        {
          "data": "RELEASED_BY"
        },
        {
          "data": "RECIEVED_BY"
        },
        {
          "data": function(data) {
            return '<div class="text-right">' + data.IN + '</div>';
          }
        },
        {
          "data": function(data) {
            return '<div class="text-right">' + data.OUT + '</div>';
          }
        },
        {
          "data": function(data) {
            return '<div class="text-right">' + data.BALANCE + '</div>';
          }
        }
      ],
      'dom': '<"wrapper"fit>',
      'bFilter': false,
      "ordering": false,
      'info': false,
      'scrollX': true,
      'paging': false,
      'scrollY': 500,
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

  $("body").delegate("#btn_scancel", "click", function() {
    $("#medicine").val(null).trigger("change");
    $frm_stockcard.data('formValidation').resetForm();
    $frm_stockcard[0].reset();
    $("#print-report, ._print").addClass("hidden");
  });

  // function get_txt_pcs(str1,str) {
  //     var txt = '', txt2 = '';
  //     if (str1 > 0) { txt2 = 'and'; }

  //     if (str > 1) {
  //         txt = txt2 + ' ' + str + ' PCS';
  //     } else {
  //         if (str > 0) { txt = txt2 + ' ' + str + ' PC'; }
  //     }
  //     return txt;
  // }

  // function get_txt_box(str,str1) {
  //     var txt = '';
  //     if (str > 1) {
  //         txt = str + ' ' + str1 + 'ES';
  //     } else {
  //         if (str > 0) { txt = str + ' ' + str1; }
  //     }
  //     return txt;
  // }

  // function get_format(str) {
  //     var txt = 4;
  //     if (str == 0 || str == 'a') {
  //         txt = 4;
  //     } else if (str == 1 || str == 'b'){
  //         txt = 3;
  //     }
  //     return txt;
  // }

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
