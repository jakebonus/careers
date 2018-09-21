var  $dt_soloparentperbrgy = $('#dt_soloparentperbrgy'),
    $dt_soloparentperyearissue = $('#dt_soloparentperyearissue'),
    $dt_soloparentbycause = $('#dt_soloparentbycause');


 var dt_soloparentperbrgy = $dt_soloparentperbrgy.DataTable({
          'ajax': {
            "type": "GET",
            "url": base_url + "admin/ajax_getSPPerBrgy",
            // "data": data,
            "dataSrc": ""
          },
          'columns': [
            { "data": "brgyname" },
            { "data": "male" },
            { "data": "female" },
            { "data": "total" },
          ],

          'dom': '<"wrapper"Bfit>',
          'order': [
            [0, "desc"]
          ],
          'scrollY': '50vh',
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
              dt_pwdperbrgy.ajax.reload();
            }
          }
        ],
          fnInitComplete: function(oSettings, json) {
            $('.alert-info .glyphicon-remove').trigger("click");
           
          }
        });

 var dt_soloparentperyearissue = $dt_soloparentperyearissue.DataTable({
          'ajax': {
            "type": "GET",
            "url": base_url + "admin/ajax_getSPYearIssue",
            // "data": data,
            "dataSrc": ""
          },
          'columns': [
            { "data": "yearissue" },
            { "data": "male" },
            { "data": "female" },
            { "data": "total" },
          ],

          'dom': '<"wrapper"Bfit>',
          'order': [
            [0, "desc"]
          ],
          'scrollY': '50vh',
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
              dt_pwdperbrgy.ajax.reload();
            }
          }
        ],
          fnInitComplete: function(oSettings, json) {
            $('.alert-info .glyphicon-remove').trigger("click");
           
          }
        });

 var dt_soloparentbycause = $dt_soloparentbycause.DataTable({
          'ajax': {
            "type": "GET",
            "url": base_url + "admin/ajax_getSPByCause",
            // "data": data,
            "dataSrc": ""
          },
          'columns': [
            { "data": "spreason" },
            { "data": "male" },
            { "data": "female" },
            { "data": "total" },
          ],

          'dom': '<"wrapper"Bfit>',
          'order': [
            [0, "desc"]
          ],
          'scrollY': '50vh',
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
              dt_pwdperbrgy.ajax.reload();
            }
          }
        ],
          fnInitComplete: function(oSettings, json) {
            $('.alert-info .glyphicon-remove').trigger("click");
           
          }
        });
