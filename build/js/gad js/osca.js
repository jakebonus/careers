var   $dt_seniorperbrgy = $('#dt_seniorperbrgy'),

      $dt_senioragegroup = $('#dt_senioragegroup'),
      $btn_scpressave = $('#btn_scpressave');

        var dt_seniorperbrgy = $dt_seniorperbrgy.DataTable({
          'ajax': {
            "type": "GET",
            "url": base_url + "report/get_brgyserniorsbygender",
            // "data": data,
            "dataSrc": ""
          },
          'columns': [
            { "data": "brgyname" },
            { "data": "male" },
            { "data": "female" },
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
              dt_seniorperbrgy.ajax.reload();
            }
          }
        ],
          fnInitComplete: function(oSettings, json) {
            $('.alert-info .glyphicon-remove').trigger("click");
          }
        });


        var dt_senioragegroup = $dt_senioragegroup.DataTable({
          'ajax': {
            "type": "GET",
            "url": base_url + "report/get_count_cenior_by_agebracket",
            "dataSrc": ""
          },
          fnCreatedRow: function(nRow, data, iDisplayIndex) {
             $(nRow).attr('data-brgyid', data.brgyid);
             $(nRow).attr('data-brgyname', data.brgyname);
           },
          'columns': [
            { "data": "brgyname"},
            { "data": "scpresident"},
            { "data": "group1male"},
            { "data": "group1female"},
            { "data": "group2male"},
            { "data": "group2female"},
            { "data": "group3male"},
            { "data": "group3female"},
            { "data": "group4male"},
            { "data": "group4female"},
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
            'titleAttr': 'Update President',
            'className': 'fa fa-tag',
            action: function(e, dt, node, config) {
              updatepresident();
            }
          },
            {
            'text': '',
            'extend': 'excelHtml5',
            'titleAttr': 'Export Excel',
            'className': 'fa fa-download',
            customize: function(xlsx) {
              var sheet = xlsx.xl.worksheets['sheet1.xml'];
              $('row c[r^="C"]', sheet).attr('s', '0');
            }
          },
          {
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
              dt_senioragegroup.ajax.reload();
            }
          }
        ],
          fnInitComplete: function(oSettings, json) {
            $('.alert-info .glyphicon-remove').trigger("click");
          }
        });


$dt_senioragegroup.on( 'click', 'tr', function () {
    if ($(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }else {
        $('#dt_senioragegroup tbody tr').removeClass('selected');
        $(this).toggleClass('selected');
    }
});

function updatepresident(){
    var brgyid = $('#dt_senioragegroup tbody').find('.selected').data('brgyid'),
        brgyname = $('#dt_senioragegroup tbody').find('.selected').data('brgyname'),
        mdl_seniorcitizen = document.getElementById('mdl_seniorcitizen'),
        mdl_brgyname = document.getElementById('mdl_brgyname'),
        btn_scpressave = document.getElementById('btn_scpressave'),
        btn_close = document.getElementById('btn_close'),
        mdl_brgyid = document.getElementById('mdl_brgyid');

    if($('#dt_senioragegroup tbody tr').hasClass('selected')){
      $('#modal_scpresident').modal({
        backdrop: 'static',
        keyboard: false  // to prevent closing with Esc button (if you want this too)
      });
      mdl_brgyname.innerHTML = brgyname;
      mdl_brgyid.value = brgyid;

      var options = {
        url: base_url + "report/get_seniors/"+brgyid,
        getValue: "fullname",
        requestDelay: 500,
        list: {
          match: {
                enabled: true
                },
          onSelectItemEvent: function() {
               var value = $("#mdl_seniorcitizen").getSelectedItemData().masterid;
                  $("#mdl_masterid").val(value).trigger("change");
               },
          showAnimation: {
            type: "fade", //normal|slide|fade
            time: 400,
            callback: function() {}
          },
          hideAnimation: {
            type: "slide", //normal|slide|fade
            time: 400,
            callback: function() {}
          }
      }
      };
      $('#mdl_seniorcitizen').easyAutocomplete(options);
    }else{
      notify('Failed!', 'Please choose barangay', 'danger', 3000);
      return false;
    }
}

btn_scpressave.onclick = function(){
  var $is_processing  = $('body').find('.alert-info').length;
  var mdl_masterid   = document.getElementById('mdl_masterid');
  if(mdl_masterid.value.length > 0){
    if($is_processing == 0){
      notify('Processing', 'Please wait..', 'info', 9999999);
    var arr = $("#frm_scpresident").serializeObject();
        postAjax(base_url + 'report/ajax_tag_scpresident/', arr,
           function(data) {
              $('.alert-info .glyphicon-remove').trigger("click");
              $('.alert-warning .glyphicon-remove').trigger("click");
             if (data.status == "yes") {
               notify('Success!', data.content, 'success', 3000);
               close_modal_scpresident();
               dt_senioragegroup.ajax.reload();
             } else {
               notify('Failed!', data.content, 'danger', 3000);
             }
           }
         );
    }
  }else{
    notify('Failed!', 'Please select Senior Citizen President!', 'danger', 3000);
    return false;
  }
}

btn_close.onclick = function(){
  close_modal_scpresident();
}

function close_modal_scpresident(){
  $("#frm_scpresident")[0].reset();
  $('#modal_scpresident').modal('hide');
}
