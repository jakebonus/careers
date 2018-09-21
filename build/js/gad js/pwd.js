var   $dt_pwdlist = $('#dt_pwdlist'),
      $serviceid = $('#serviceid'),
      $dt_serviceavailed = $('#dt_serviceavailed'),
      $fullname = $('#fullname'),
      $btn_tagpwdservice = document.getElementById('btn_tagpwdservice'),
      $btn_pwdsearch = document.getElementById('btn_pwdsearch'),
      $vps_url = "http://198.38.93.165/fernandino/",
      $modal_printid = document.getElementById("modal_printid");

      function load_pwd(url,frm_data){
        var dt_pwdlist = $dt_pwdlist.DataTable({
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
              $dt_pwdlist.ajax.reload();
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
              { "data": "remarks" },
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
                $dt_serviceavailed.ajax.reload();
              }
            }
          ],
            fnInitComplete: function(oSettings, json) {
//                $('.ui-pnotify .alert-info').remove();
                 $('.alert-info .glyphicon-remove').trigger("click");
            }
          });
        }

        getAjax(base_url + 'admin/get_pwd_service', function(data) {
            var data = JSON.parse(data);
            $.each(data, function(key, value) {
              $serviceid.append( $('<option value="' + value.serviceID + '">' + value.description + '</option>') );
             });
        });



  $( document ).ready(function() {
    var frm_data = $('#frm_filter_pwds').serializeObject();
    var pwd_url = base_url + "admin/get_pwdlist";
    load_pwd(pwd_url,frm_data);
    var service_url = base_url + "admin/get_serviceavailed/" + 0;
    get_serviceavailed(service_url);
    $btn_pwdsearch.onclick = function(){
      var frm_data = $('#frm_filter_pwds').serializeObject();
      var pwd_url = base_url + "admin/get_pwdlist";
       $dt_pwdlist.dataTable().fnClearTable();
       $dt_pwdlist.dataTable().fnDestroy();
       load_pwd(pwd_url,frm_data);
    }

    $dt_pwdlist.on( 'click', 'tr', function () {
        if ($(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            $('#frm_pwdservices #masterid').val('');
            $('#frm_pwdservices #fullname').val('');
            $('#frm_pwdservices #idno').val('');
            $('#frm_pwdservices #age').val('');
        }else {
            notify('Processing', 'Please wait..', 'info', 9999999);
            $('#dt_pwdlist tbody tr').removeClass('selected');
            $(this).toggleClass('selected');
            $('#frm_pwdservices #masterid').val($(this).data('masterid'));
            $('#frm_pwdservices #fullname').val($(this).data('fullname'));
            $('#frm_pwdservices #idno').val($(this).data('idno'));
            $('#frm_pwdservices #age').val($(this).data('age'));
            var masterid = $(this).data('masterid');
            var url = base_url + "admin/get_serviceavailed/" +masterid;
            $dt_serviceavailed.dataTable().fnClearTable();
            $dt_serviceavailed.dataTable().fnDestroy();
            get_serviceavailed(url);
        }
    });

    $btn_tagpwdservice.onclick = function(){
        var id = $("#frm_pwdservices #masterid").val();
        var serviceid = $("#frm_pwdservices #serviceid").val();
      if(id.length > 0){
          $is_processing =  $('body .ui-pnotify > .alert-info').length;
        if($is_processing == 0){
          var arr = $("#frm_pwdservices").serializeObject();
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
                  if(serviceid == '128'){
                    pwdid();
                  }
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

  function pwdid(){
    var   mdl_idno = document.getElementById('mdl_idno'),
          mdl_pwdnum = document.getElementById('mdl_pwdnum'),
          mdl_fullname = document.getElementById('mdl_fullname'),
          mdl_disabilitytype = document.getElementById('mdl_disabilitytype'),
          mdl_birthdate = document.getElementById('mdl_birthdate'),
          mdl_address = document.getElementById('mdl_address'),
          mdl_bloodtype = document.getElementById('mdl_bloodtype'),
          mdl_contactname = document.getElementById('mdl_contactname'),
          mdl_contactno = document.getElementById('mdl_contactno'),
          mdl_tc_name = document.getElementById('mdl_tc_name'),
          mdl_tc_tin = document.getElementById('mdl_tc_tin'),
          mdl_tc_contactnum = document.getElementById('mdl_tc_contactnum');
          mdl_gender = document.getElementById('mdl_gender');
          mdl_image = document.getElementById('mdl_image');
          mdl_signature = document.getElementById('mdl_signature');
    var frm_data = $("#frm_pwdservices").serializeObject();
    $('#modal_printid').modal('show');
    postAjax(base_url + 'admin/ajax_get_fernandino_info/', frm_data,
    function(data) {
            mdl_idno.innerHTML = data.idno;
            mdl_pwdnum.innerHTML = data.pwdnum;
            mdl_fullname.innerHTML = data.fullname;
            mdl_disabilitytype.innerHTML = data.disabilitytype;
            mdl_birthdate.innerHTML = data.birthdate;
            mdl_address.innerHTML = data.address;
            mdl_bloodtype.innerHTML = data.bloodtype;
            mdl_contactname.innerHTML = data.contactname;
            mdl_contactno.innerHTML = data.contactno;
            mdl_tc_name.innerHTML = data.tc_name;
            mdl_tc_tin.innerHTML = data.tc_tin;
            mdl_tc_contactnum.innerHTML = data.tc_contactnum;
            mdl_gender.innerHTML = data.gender;
            mdl_image.src = $vps_url + 'pictures/' + data.idno + '.jpg';
            mdl_signature.src = $vps_url + 'signatures/' + data.idno + '.jpg';
          }
        );
  }

  function errorimg(){
    mdl_image = document.getElementById('mdl_image');
      mdl_image.src = base_url + 'pictures/no-image.jpg';
  }
  function errorsig(){
    mdl_signature = document.getElementById('mdl_signature');
      mdl_signature.src = base_url + 'signatures/no-image.jpg';
  }
