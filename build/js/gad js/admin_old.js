$(function() {
    var   $dt_alltransaction = $('#dt_alltransaction'),
          txt_search = document.getElementById("txt_search"),
          txt_brgy = document.getElementById("txt_brgy"),
          btn_search = document.getElementById("btn_search"),
          gender = document.getElementById("gender"),
          sector = document.getElementById("sector"),
          txt_in = document.getElementById("txt_in");

          btn_search.onclick = function(){
            notify('Processing', 'Please wait..', 'info', 9999999);
            var url = base_url + "admin/ajax_get_fernandino";
            var data = $("#frm_search").serializeObject();
            otable(url, data);
            return false;
          };

  function otable(url, data) {
    $dt_alltransaction.dataTable().fnClearTable();
    $dt_alltransaction.dataTable().fnDestroy();
    var otable = $dt_alltransaction.DataTable({
      'ajax': {
        "type": "GET",
        "url": url,
        "data": data,
        "dataSrc": ""
      },
      fnCreatedRow: function(nRow, data, iDisplayIndex) {
         $(nRow).attr('data-masterid', data.masterid);
         $(nRow).attr('data-idno', data.idNo);
         $(nRow).attr('data-edad', data.edad);
         $(nRow).attr('data-fullname', data.fullname);
         $(nRow).attr('data-sector', data.sector);
       },
      'columns': [
        { "data": "idNo" },
        { "data": "lname" },
        { "data": "fname" },
        { "data": "mname" },
        { "data": "birthdate" },
        { "data": "brgyname" }
      ],

      'dom': '<"wrapper"Bfit>',
      'order': [
        [0, "desc"]
      ],
      'scrollY': '30vh',
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
          $('row c[r^="C"]', sheet).attr('s', '0');
        }
      }, {
        'text': '',
        'extend': 'print',
        'titleAttr': 'Print',
        'className': 'fa fa-print',
        'exportOptions': {
          'columns': ':visible'
        },
      }, {
        'text': '',
        'titleAttr': 'Refresh',
        'className': 'fa fa-refresh',
        action: function(e, dt, node, config) {
          load_data();
          otable.ajax.reload();
        }
      }],
      fnInitComplete: function(oSettings, json) {
        $('.alert-info .glyphicon-remove').trigger("click");
      }
    });
  }


  // $('#dt_alltransaction tbody').on( 'click', 'tr', function () {
  $dt_alltransaction.on( 'click', 'tr', function () {
      if ($(this).hasClass('selected') ) {
          $(this).removeClass('selected');
          $('#frm_info #masterid').val('');
          $('#frm_info #fullname').val('');
          $('#frm_info #idNo').val('');
          $('#frm_info #age').val('');
          $('#frm_info #sel_sector').val('');
      }else {
          $('#dt_alltransaction tbody tr').removeClass('selected');
          $(this).toggleClass('selected');
          $('#frm_info #masterid').val($(this).data('masterid'));
          $('#frm_info #fullname').val($(this).data('fullname'));
          $('#frm_info #idNo').val($(this).data('idno'));
          $('#frm_info #age').val($(this).data('edad'));
          $('#frm_info #sel_sector').val($(this).data('sector'));

      }
  });

  $("#btn_reset").click(function() {
    $("#frm_search").reset();
  });




  // GET LOCATION FROM TR_TRANSACTION
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
            html +="<option value='" + myarr[i].id + "'>" + myarr[i].name + "</option>";
        }
        $(textid).html(html);
        $(textid).prop("disabled", false);
      }
    }
    xhr.send();
  }

  function get_columndefs() {
    var txt = "";
    if ($("#tr_program").val() == "") {
      txt += "2,";
    }
    if ($("#tr_lot_no").val() == "") {
      txt += "1,";
    }
    txt = txt.split(",").map(Number);
    txt.splice($.inArray(0, txt), 1);
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
