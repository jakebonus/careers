var   $dt_seniorlist = $('#dt_seniorlist'),
      $serviceid = $('#serviceid'),
      $dt_serviceavailed = $('#dt_serviceavailed'),
      $fullname = $('#fullname'),
      // $ftr_gender = $('#ftr_gender'),
      // $ftr_brgy = $('#ftr_brgy'),
      // $ftr_agefrom = $('#ftr_agefrom'),
      // $ftr_ageto = $('#ftr_ageto'),
      // $ftr_idno = $('#ftr_idno'),
      $btn_tagseniorservice = document.getElementById('btn_tagseniorservice'),
      $btn_seniorsearch = document.getElementById('btn_seniorsearch');
      // $dt_seniorserviceslist = $('#dt_seniorserviceslist');
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

        $dt_seniorlist.on( 'click', 'tr', function () {
            if ($(this).hasClass('selected') ) {
                $(this).removeClass('selected');
                $('#frm_seniorservices #masterid').val('');
                $('#frm_seniorservices #fullname').val('');
                $('#frm_seniorservices #idno').val('');
                $('#frm_seniorservices #age').val('');
            }else {
                notify('Processing', 'Please wait..', 'info', 9999999);
                $('#dt_seniorlist tbody tr').removeClass('selected');
                $(this).toggleClass('selected');
                $('#frm_seniorservices #masterid').val($(this).data('masterid'));
                $('#frm_seniorservices #fullname').val($(this).data('fullname'));
                $('#frm_seniorservices #idno').val($(this).data('idno'));
                $('#frm_seniorservices #age').val($(this).data('age'));
                var masterid = $(this).data('masterid');
                $dt_serviceavailed.dataTable().fnClearTable();
                $dt_serviceavailed.dataTable().fnDestroy();
                var url = base_url + "admin/get_serviceavailed/" +masterid;
                get_serviceavailed(url);
            }
        });

        // $dt_serviceavailed.DataTable({
        //   'ajax': {
        //     "url": base_url + "admin/get_serviceavailed/" + 0,
        //     "dataSrc": ""
        //   },
        //   fnCreatedRow: function(nRow, data, iDisplayIndex) {
        //      $(nRow).attr('data-said', data.said);
        //      $(nRow).attr('data-dateavailed', data.dateavailed);
        //    },
        //   'columns': [
        //       { "data": "fullname" },
        //       { "data": "sector" },
        //     { "data": "service" },
        //     { "data": "dateavailed" },
        //   ],
        //   'dom': '<"wrapper"Bfit>',
        //   'order': [
        //     [0, "desc"]
        //   ],
        //   "columnDefs": [
        //    {
        //        "targets": [0],
        //        "visible": false
        //    }
        //   ],
        //   'scrollY': '52vh',
        //   'scrollX': true,
        //   'scrollCollapse': true,
        //   'paging': false,
        //   'buttons': [
        //     {
        //     'text': '',
        //     'extend': 'excelHtml5',
        //     'titleAttr': 'Export Excel',
        //     'className': 'fa fa-download',
        //     customize: function(xlsx) {
        //       var sheet = xlsx.xl.worksheets['sheet1.xml'];
        //       $('row c[r^="C"]', sheet).attr('s', '0');
        //     }
        //   }, {
        //     'text': '',
        //     'extend': 'print',
        //     'titleAttr': 'Print',
        //     'className': 'fa fa-print',
        //     'exportOptions': {
        //       'columns': ':visible'
        //     },
        //   }, {
        //     'text': '',
        //     'titleAttr': 'Refresh',
        //     'className': 'fa fa-refresh',
        //     action: function(e, dt, node, config) {
        //       load_data();
        //       dt_seniorperbrgy.ajax.reload();
        //     }
        //   }
        // ],
        //   fnInitComplete: function(oSettings, json) {
        //     $('.alert-info .glyphicon-remove').trigger("click");
        //   }
        // });

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
            'scrollY': '43vh',
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

        getAjax(base_url + 'admin/get_sernior_service', function(data) {
            var data = JSON.parse(data);
            $.each(data, function(key, value) {
              $serviceid.append( $('<option value="' + value.serviceID + '">' + value.description + '</option>') );
             });
        });

        $btn_tagseniorservice.onclick = function(){
            var id = $("#frm_seniorservices #masterid").val();
          if(id.length > 0){
              $is_processing =  $('body .ui-pnotify > .alert-info').length;
            if($is_processing == 0){
              var arr = $("#frm_seniorservices").serializeObject();
                  notify('Processing', 'Please wait..', 'info', 999999);
                  postAjax(base_url + 'admin/save_serviceavailed/', arr,
                  function(data) {
                    if (data.status == "yes") {
                      notify('Success!', data.content, 'success', 3000);
                      $('.ui-pnotify .alert-info').remove();
                      $dt_serviceavailed.dataTable().fnClearTable();
                      $dt_serviceavailed.dataTable().fnDestroy();
                      var url = base_url + "admin/get_serviceavailed/" +id;
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



  $( document ).ready(function() {
    var frm_data = $('#frm_filter_senior').serializeObject();
    var url = base_url + "admin/get_seniorlist";
    load_senior(url,frm_data);

    var service_url = base_url + "admin/get_serviceavailed/" + 0;
    get_serviceavailed(service_url);

    $btn_seniorsearch.onclick = function(){
      var frm_data = $('#frm_filter_senior').serializeObject();
      var url = base_url + "admin/get_seniorlist";
      console.log(frm_data);
       $dt_seniorlist.dataTable().fnClearTable();
       $dt_seniorlist.dataTable().fnDestroy();
       load_senior(url,frm_data);
    }
  });
