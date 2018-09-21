var   dt_pwdmasterlist = $('#dt_pwdmasterlist'),
 
      btn_pwdsearch = document.getElementById('btn_pwdsearch');
      
      function load_pwd(url,frm_data){
          var $rowcounter = 0;
        var dt_pwdlist = dt_pwdmasterlist.DataTable({
          'ajax': {
            "type": "GET",
            "url": url,
            "data": frm_data,
            "dataSrc": ""
          },

          'columns': [
//            { "data": "rowcounter" },
            { "data": function(data, type, row, meta) {
                return $rowcounter = $rowcounter + 1;
                }
            },
            { "data": "pwdnum" },
            { "data": "Barangay" },
            { "data": "address" },
            { "data": "lname" },
            { "data": "fname" },
            { "data": "mname" },
            { "data": "Sex" },
            { "data": "birthdate" },
            { "data": "Age" },
            { "data": "civilstatus" },
            { "data": "disabilitytype" },
            { "data": "disabilitydesc" },
            { "data": "educname" },
            { "data": "occupation" },
            { "data": "contactname" },
            { "data": "contactrel" },
            { "data": "contactno" },
             { "data": function(data, type, row, meta) {
                return '';
                }
            },
             { "data": function(data, type, row, meta) {
                     if(data.year == '1900'){
                         return 'N/A';
                     }else{
                         return data.year;
                     }
                
                }
            },
            
            { "data": "renew" },
            { "data": "philhealthnum" },
          ],
          'dom': '<"wrapper"Bfit>',
          'order': [
            [0, "desc"]
          ],
          "columnDefs": [
           {
               "targets": [],
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
              dt_pwdmasterlist.ajax.reload();
            }
          }
        ],
          fnInitComplete: function(oSettings, json) {
            $('.alert-info .glyphicon-remove').trigger("click");
          }
        });
      }




  $( document ).ready(function() {
      
    var frm_data = $('#frm_filter_pwds').serializeObject();
    var pwd_url = base_url + "admin/get_pwdlist";
    load_pwd(pwd_url,frm_data);
    
    
    btn_pwdsearch.onclick = function(){
      var frm_data = $('#frm_filter_pwds').serializeObject();
      
      var pwd_url = base_url + "admin/get_pwdlist";
       dt_pwdmasterlist.dataTable().fnClearTable();
       dt_pwdmasterlist.dataTable().fnDestroy();
       load_pwd(pwd_url,frm_data);
    }



  });


