var  $dt_pwdperbrgy = $('#dt_pwdperbrgy'),
      $dt_pwdbycivilstatus = $('#dt_pwdbycivilstatus'),
      $dt_pwdbydisabilitytype = $('#dt_pwdbydisabilitytype'),
      $dt_pwdbyagebracket = $('#dt_pwdbyagebracket'),
    $dt_pwdperyear = $('#dt_pwdperyear');


 var dt_pwdperbrgy = $dt_pwdperbrgy.DataTable({
          'ajax': {
            "type": "GET",
            "url": base_url + "report/get_brgypwdbygender",
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


 var dt_pwdperyear = $dt_pwdperyear.DataTable({
          'ajax': {
            "type": "GET",
            "url": base_url + "admin/ajax_getPWDYearIssue",
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

 var dt_pwdbycivilstatus = $dt_pwdbycivilstatus.DataTable({
          'ajax': {
            "type": "GET",
            "url": base_url + "admin/ajax_getPWDByCivilStatus",
            // "data": data,
            "dataSrc": ""
          },
          'columns': [
            { "data": "civilstatus" },
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



 var dt_pwdbydisabilitytype = $dt_pwdbydisabilitytype.DataTable({
          'ajax': {
            "type": "GET",
            "url": base_url + "admin/ajax_getPWDByDisabilityType",
            // "data": data,
            "dataSrc": ""
          },
          'columns': [
            { "data": "disabilitytype" },
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


 var dt_pwdbyagebracket = $dt_pwdbyagebracket.DataTable({
          'ajax': {
            "type": "GET",
            "url": base_url + "admin/ajax_getPWDByAgeBracket",
            // "data": data,
            "dataSrc": ""
          },
          'columns': [
            { "data": "10below" },
            { "data": "10-19" },
            { "data": "20-29" },
            { "data": "30-39" },
            { "data": "40-49" },
            { "data": "50-59" },
            { "data": "sc" },
            { "data": "sc" },
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