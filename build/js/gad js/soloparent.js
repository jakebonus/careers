var   $dt_soloparentlist = $('#dt_soloparentlist'),
      $serviceid = $('#serviceid'),
      $dt_serviceavailed = $('#dt_serviceavailed'),
      $fullname = $('#fullname'),
      $btn_tagsoloparentservice = document.getElementById('btn_tagsoloparentservice'),
      $btn_soloparentsearch = document.getElementById('btn_soloparentsearch');

      function load_soloparent(url,frm_data){
        var dt_soloparentlist = $dt_soloparentlist.DataTable({
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
            { "data": "birthdate" },
            { "data": "civilstatus" },
            { "data": "Lot/Blk" },
            { "data": "Street" },
            { "data": "Subdivision" },
            { "data": "Purok" },
            { "data": "Barangay" },
            { "data": "soloparentnum" },
            { "data": "spreason" }
          ],
          'dom': '<"wrapper"Bfit>',
          'order': [
            [0, "desc"]
          ],
          "columnDefs": [
           {
               "targets": [3,4,5,6,7,8,10,11],
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
          }
        ],
          fnInitComplete: function(oSettings, json) {
            $('.alert-info .glyphicon-remove').trigger("click");
          }
        });
      }

        function get_serviceavailed(url){

          $dt_serviceavailed.DataTable({
            'ajax': {
              "url": url,
              "dataSrc": ""
            },
            fnCreatedRow: function(nRow, data, iDisplayIndex) {
               $(nRow).attr('data-said', data.said);
               $(nRow).attr('data-dateavailed', data.dateavailed);
             },
            'columns': [
              { "data": "fullname" },
              { "data": "sector" },
              { "data": "service" },
              { "data": "dateavailed" },
            ],
            'dom': '<"wrapper"Bfit>',
            'order': [
              [0, "desc"]
            ],
            "columnDefs": [
             {
                 "targets": [0],
                 "visible": false
             }
            ],
            'scrollY': '42vh',
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
              // $('.alert-info .glyphicon-remove').trigger("click");
                $('.ui-pnotify .alert-info').remove();
            }
          });
        }

        getAjax(base_url + 'admin/get_soloparent_service', function(data) {
            var data = JSON.parse(data);
            $.each(data, function(key, value) {
              $serviceid.append( $('<option value="' + value.serviceID + '">' + value.description + '</option>') );
             });
        });



  $( document ).ready(function() {
    var frm_data = $('#frm_filter_soloparent').serializeObject();
    var soloparent_url = base_url + "admin/get_soloparentlist";
    load_soloparent(soloparent_url,frm_data);

    var service_url = base_url + "admin/get_serviceavailed/" + 0;
    get_serviceavailed(service_url);


    $btn_soloparentsearch.onclick = function(){
      var frm_data = $('#frm_filter_pwds').serializeObject();
      var soloparent_url = base_url + "admin/get_soloparentlist";
       $dt_soloparentlist.dataTable().fnClearTable();
       $dt_soloparentlist.dataTable().fnDestroy();
       load_soloparent(soloparent_url,frm_data);
    }

    $dt_soloparentlist.on( 'click', 'tr', function () {
        if ($(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            $('#frm_soloparentservices #masterid').val('');
            $('#frm_soloparentservices #fullname').val('');
            $('#frm_soloparentservices #idno').val('');
            $('#frm_soloparentservices #age').val('');
        }else {

            notify('Processing', 'Please wait..', 'info', 9999999);
            $('#dt_soloparentlist tbody tr').removeClass('selected');
            $(this).toggleClass('selected');
            $('#frm_soloparentservices #masterid').val($(this).data('masterid'));
            $('#frm_soloparentservices #fullname').val($(this).data('fullname'));
            $('#frm_soloparentservices #idno').val($(this).data('idno'));
            $('#frm_soloparentservices #age').val($(this).data('age'));
            var masterid = $(this).data('masterid');
            var url = base_url + "admin/get_serviceavailed/" +masterid;
            $dt_serviceavailed.dataTable().fnClearTable();
            $dt_serviceavailed.dataTable().fnDestroy();
            get_serviceavailed(url);
        }
    });

    $btn_tagsoloparentservice.onclick = function(){
        var id = $("#frm_soloparentservices #masterid").val();
      if(id.length > 0){
          $is_processing =  $('body .ui-pnotify > .alert-info').length;
        if($is_processing == 0){
          var arr = $("#frm_soloparentservices").serializeObject();
              notify('Processing', 'Please wait..', 'info', 999999);
              postAjax(base_url + 'admin/save_serviceavailed/', arr,
              function(data) {
                if (data.status == "yes") {
                  notify('Success!', data.content, 'success', 3000);
                  $('.ui-pnotify .alert-info').remove();
                  var url = base_url + "admin/get_serviceavailed/" +id;
                  $dt_serviceavailed.dataTable().fnClearTable();
                  $dt_serviceavailed.dataTable().fnDestroy();
                  get_serviceavailed(url);
                } else {
                  notify('Failed!', data.content, 'danger', 3000);
                }
              }
            );
          }
      }
      return false;
    }
  });
