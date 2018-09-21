var   $dt_seniorlist = $('#dt_seniorlist'),
      $btn_seniorsearch = document.getElementById('btn_seniorsearch');
      function load_senior(url,frm_data){
        var dt_seniorlist = $dt_seniorlist.DataTable({
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
          'scrollY': '45vh',
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
          },
           {
            'text': '',
            'titleAttr': 'Refresh',
            'className': 'fa fa-refresh',
            action: function(e, dt, node, config) {
              load_data();
              dt_seniorperbrgy.ajax.reload();
            }
          },
          {
           'text': '',
           'titleAttr': 'Mark as deceased',
           'className': 'fa fa-tag',
           action: function(e, dt, node, config) {
             markDeceased();
           }
         }
        ],
          fnInitComplete: function(oSettings, json) {
            $('.alert-info .glyphicon-remove').trigger("click");
          }
        });
      }

        $dt_seniorlist.on( 'click', 'tr', function () {
            if ($(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }else {
                // notify('Processing', 'Please wait..', 'info', 9999999);
                $('#dt_seniorlist tbody tr').removeClass('selected');
                $(this).toggleClass('selected');
            }
        });

function markDeceased(){

  var id = $('#dt_seniorlist tbody').find('.selected').data('masterid');

  if($('#dt_seniorlist tbody tr').hasClass('selected')){

    $('#mdl_markDeceased').modal({
        backdrop: 'static',
        keyboard: false
    });

    var masterid = document.getElementById('masterid');
    var btn_savedeceaseddate = document.getElementById('btn_savedeceaseddate');
    var btn_closeMD = document.getElementById('btn_closeMD');
        masterid.value = id;
        $('#deceaseddate').addClass('fdate');
          $(".fdate").inputmask("9999-99-99", { "placeholder": "yyyy-mm-dd"});


  }else{
    alert('aaa');
  }

}

function close_modal($mdl){
  $($mdl).modal('toggle');
}



  $( document ).ready(function() {
    var frm_data = $('#frm_filter_senior').serializeObject();
    var url = base_url + "admin/get_seniorlist";
    load_senior(url,frm_data);

    $btn_seniorsearch.onclick = function(){
      var frm_data = $('#frm_filter_senior').serializeObject();
      var url = base_url + "admin/get_seniorlist";
       $dt_seniorlist.dataTable().fnClearTable();
       $dt_seniorlist.dataTable().fnDestroy();
       load_senior(url,frm_data);
    }

    btn_savedeceaseddate.onclick = function(){
      var arr = $("#frm_markDeceased").serializeObject();
          postAjax(base_url + 'osca/ajax_markdeceased/', arr,
             function(data) {
                $('.alert-info .glyphicon-remove').trigger("click");
                $('.alert-warning .glyphicon-remove').trigger("click");
               if (data.status == "yes") {
                 notify('Success!', data.content, 'success', 3000);
                 // close_modal_scpresident();
                 // dt_senioragegroup.ajax.reload();
               } else {
                 notify('Failed!', data.content, 'danger', 3000);
               }
             }
           );
    }

    btn_closeMD.onclick = function(){
        close_modal('#mdl_markDeceased');

    }
  });
