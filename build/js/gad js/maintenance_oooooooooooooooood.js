var   $dt_services    = $('#dt_services'),
      $sector         = $('#sector'),
      $serviceID      = $('#serviceID'),
      $description    = $('#description'),
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
       $(nRow).attr('data-masterid', data.masterid);
       $(nRow).attr('data-idno', data.idNo);
       $(nRow).attr('data-fullname', data.fullname);
       $(nRow).attr('data-Age', data.Age);
     },
    'columns': [
      { "data": "fullname" },
      { "data": "Sex" },
      { "data": "Age" },
      { "data": "Lot/Blk" },
      { "data": "Street" },
      { "data": "Subdivision" },
      { "data": "Purok" },
      { "data": "Barangay" },
    ],
    'dom': '<"wrapper"Bfit>',
    'order': [
      [0, "desc"]
    ],
    "columnDefs": [
     {
         "targets": [3,4,5,6],
         "visible": false
     }
    ],
    'scrollY': '52vh',
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
        load_data();
        dt_seniorperbrgy.ajax.reload();
      }
    }
  ],
    fnInitComplete: function(oSettings, json) {
      $('.alert-info .glyphicon-remove').trigger("click");
    }
  });
}

$( document ).ready(function() {
    var frm_service = $('#frm_service').serializeObject();
    var pwd_url = base_url + "admin/get_cswd_services";
    load_services(load_services,frm_service);

});
