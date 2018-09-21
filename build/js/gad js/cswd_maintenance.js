var   $dt_services    = $('#dt_services'),
      $sector         = document.getElementById('sector'),
      $description    = document.getElementById('description'),
      $serviceID      = $('#serviceID'),
      $moredetails    = $('#moredetails'),
      $btn_reset      = document.getElementById('btn_reset'),
      $btn_save       = document.getElementById('btn_save'),
      $btn_remove     = document.getElementById('btn_remove');

function load_services(url,frm_data){
  $dt_services.DataTable({
    'ajax': {
      "type": "GET",
      "url": url,
      "data": frm_data,
      "dataSrc": ""
    },
    fnCreatedRow: function(nRow, data, iDisplayIndex) {
       $(nRow).attr('data-serviceid', data.serviceID);
       $(nRow).attr('data-sector', data.sector);
       $(nRow).attr('data-description', data.description);
       $(nRow).attr('data-moredetails', data.moredetails);
     },
    'columns': [
      { "data": "sector" },
      { "data": "description" },
    ],
    'dom': '<"wrapper"Bfit>',
    'order': [
      [0, "desc"]
    ],
    'scrollY': '33vh',
    'scrollX': true,
    'scrollCollapse': true,
    'paging': false,
    'buttons': [
      {
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
        // load_data();
        // dt_seniorperbrgy.ajax.reload();
      }
    }
  ],
    fnInitComplete: function(oSettings, json) {
      $('.ui-pnotify .alert-info').remove();
    }
  });
}

function save_service(){
      $is_processing =  $('body .ui-pnotify > .alert-info').length;
    if($is_processing == 0){
      var frm_service = $("#frm_service").serializeObject();
          notify('Processing', 'Please wait..', 'info', 999999);
          postAjax(base_url + 'maintenance/ajax_save/', frm_service,

          function(data) {
            if (data.status == "yes") {
                  notify('Success!', data.content, 'success', 3000);
                  $('.ui-pnotify .alert-info').remove();
              var frm_service = $('#frm_service').serializeObject();
              var services_url = base_url + "maintenance/get_cswd_services";
                  $dt_services.dataTable().fnClearTable();
                  $dt_services.dataTable().fnDestroy();
                  load_services(services_url,frm_service);
                  reset_form();
            } else {
              notify('Failed!', data.content, 'danger', 3000);
            }
          }
        );
      }

  return false;
}

function reset_form(){
  $('#frm_service')[0].reset();
}

$( document ).ready(function() {
    var frm_service = $('#frm_service').serializeObject();
    var services_url = base_url + "maintenance/get_cswd_services";
    load_services(services_url,frm_service);

    $dt_services.on( 'click', 'tr', function () {
        if ($(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            $('#frm_service #serviceID').val('');
            $('#frm_service #description').val('');
            $('#frm_service #moredetails').val('');
            $('#frm_service #sector').val('');
        }else {
            // notify('Processing', 'Please wait..', 'info', 9999999);
            $('#dt_services tbody tr').removeClass('selected');
            $(this).toggleClass('selected');
            $('#frm_service #serviceID').val($(this).data('serviceid'));
            $('#frm_service #description').val($(this).data('description'));
            $('#frm_service #moredetails').val($(this).data('moredetails'));
            $('#frm_service #sector').val($(this).data('sector'));
        }
    });

    $btn_save.onclick = function(){
      if($sector.value == '' || $sector.value == null  || $sector.value == 'N/A' ){
        $sector.focus();
        return false;
      }
      if($description.value == '' || $description.value == null  || $description.value == 'N/A' ){
        $description.focus();
        return false;
      }
        save_service();
    }

    $btn_reset.onclick = function(){
        reset_form();
    }
});
