var   $dt_brgyorganization = $('#dt_brgyorganization'),
      $membername = document.getElementById('membername'),
      $frm_orgmember = document.getElementById("frm_orgmember"),
      $btn_saveorgmember = document.getElementById("btn_saveorgmember"),
      $frm_orgmemberelements = $frm_orgmember.elements,
      $designation = document.getElementById("designation"),
      $sector = document.getElementById("sector"),
      designations = [],
      // $sigledesignation = ["PRESIDENT","VICE-PRESIDENT","SECRETARY","TREASURER","AUDITOR"],
      $dt_orgmembers = $('#dt_orgmembers');

var dt_brgyorganization = $dt_brgyorganization.DataTable({
          'ajax': {
            "type": "GET",
            "url": base_url + "report/get_organization",
            "dataSrc": ""
          },
          fnCreatedRow: function(nRow, data, iDisplayIndex) {
             $(nRow).attr('data-id', data.id);
             $(nRow).attr('data-brgyid', data.brgyid);
           },
          'columns': [
            { "data": "brgyname" },
            { "data": "name" },
          ],
          'dom': '<"wrapper"Bfit>',
          'order': [
            [0, "desc"]
          ],
          'scrollY': '80vh',
          'scrollX': true,
          'scrollCollapse': true,
          'paging': false,
          'ordering': false,
          'buttons': [
            {
              'text': '',
              'titleAttr': 'Add new organization',
              'className': 'fa fa-plus input-sm',
              action: function(e, dt, node, config) {
                neworganization();
              }
            },
            {
            'text': '',
            'extend': 'excelHtml5',
            'titleAttr': 'Export Excel',
            'className': 'fa fa-download input-sm',
            customize: function(xlsx) {
              var sheet = xlsx.xl.worksheets['sheet1.xml'];
              $('row c[r^="C"]', sheet).attr('s', '0');
            }
          },
          // {
          //   'text': '',
          //   'extend': 'print',
          //   'titleAttr': 'Print',
          //   'className': 'fa fa-print',
          //   'exportOptions': {
          //     'columns': ':visible'
          //   },
          // },
          {
            'text': '',
            'titleAttr': 'Print',
            'className': 'fa fa-print input-sm',
            action: function(e, dt, node, config) {
              print_org();
            }
          },
          {
            'text': '',
            'titleAttr': 'Refresh',
            'className': 'fa fa-refresh input-sm',
            action: function(e, dt, node, config) {
              dt_brgyorganization.ajax.reload();
            }
          }
        ],
          fnInitComplete: function(oSettings, json) {
            $('.alert-info .glyphicon-remove').trigger("click");
          }
});


function neworganization(){
  $('#modal_organization').modal({
    backdrop: 'static',
    keyboard: false  // to prevent closing with Esc button (if you want this too)
  });
  var btn_close       = document.getElementById('btn_close'),
      btn_saveorg     = document.getElementById('btn_saveorg'),
      mdl_brgy        = document.getElementById('mdl_brgy'),
      mdl_name        = document.getElementById('mdl_name'),
      mdl_datefound   = document.getElementById('mdl_datefound');
      $('#mdl_datefound').addClass('fdate');
      $(".fdate").inputmask("9999-99-99", {
        "placeholder": "yyyy-mm-dd"
      });
}

btn_saveorg.onclick = function(){
  var $is_processing  = $('body').find('.alert-info').length;

  if(mdl_brgy.value.length <= 0 ){
    mdl_brgy.focus();
    return false;
  }
  if(mdl_name.value.length <= 0 ){
    mdl_name.focus();
    return false;
  }
  if(mdl_datefound.value.length <= 0 ){
    mdl_datefound.focus();
    return false;
  }
    if($is_processing == 0){
      notify('Processing', 'Please wait..', 'info', 9999999);
    var arr = $("#frm_organization").serializeObject();
        postAjax(base_url + 'report/ajax_save_organization/', arr,
           function(data) {
              $('.alert-info .glyphicon-remove').trigger("click");
              $('.alert-warning .glyphicon-remove').trigger("click");
             if (data.status == "yes") {
               notify('Success!', data.content, 'success', 3000);
               close_modal_organization();
               dt_brgyorganization.ajax.reload();
             } else {
               notify('Failed!', data.content, 'danger', 3000);
             }
           }
         );
    }
}

btn_close.onclick = function(){
  close_modal_organization();
}

function close_modal_organization(){
  $("#frm_organization")[0].reset();
  $('#modal_organization').modal('hide');
}

$dt_brgyorganization.on( 'click', 'tr', function () {
  designations = [];
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        $('#frm_orgmember')[0].reset();
        for (var i = 0, len = $frm_orgmemberelements.length; i < len; ++i) {
            $frm_orgmemberelements[i].disabled = true;
        }
        $dt_orgmembers.dataTable().fnClearTable();
        $dt_orgmembers.dataTable().fnDestroy();
        get_orgmembers(0);

    }else {
        $('#dt_brgyorganization tbody tr').removeClass('selected');
        $(this).toggleClass('selected');
        $('#frm_orgmember #orgid').val($(this).data('id'));
        $('#frm_orgmember #brgyid').val($(this).data('brgyid'));
        var brgyid = $(this).data('brgyid');
        get_fernandinos(brgyid);
        $dt_orgmembers.dataTable().fnClearTable();
        $dt_orgmembers.dataTable().fnDestroy();
        get_orgmembers($(this).data('id'));
        setTimeout(function(){
            if(designations.indexOf('PRESIDENT') >= 0){
                $designation.options[1].setAttribute("disabled", "disabled");
            }else{
                $designation.options[1].removeAttribute("disabled", "disabled");
            }
            if(designations.indexOf('VICE-PRESIDENT') >= 0){
                $designation.options[2].setAttribute("disabled", "disabled");
            }else{
                $designation.options[2].removeAttribute("disabled", "disabled");
            }
            if(designations.indexOf('SECRETARY') >= 0){
                $designation.options[3].setAttribute("disabled", "disabled");
            }else{
                $designation.options[3].removeAttribute("disabled", "disabled");
            }
            if(designations.indexOf('TREASURER') >= 0){
                $designation.options[4].setAttribute("disabled", "disabled");
            }else{
                $designation.options[4].removeAttribute("disabled", "disabled");
            }
            if(designations.indexOf('AUDITOR') >= 0){
                $designation.options[5].setAttribute("disabled", "disabled");
            }else{
                $designation.options[5].removeAttribute("disabled", "disabled");
            }
          }, 100);

    }
      $sector.setAttribute("disabled","disabled");
});

$designation.onchange = function(){
  if($designation.value == "COMMITTEES"){
      $sector.removeAttribute("disabled","disabled");
  }else{
      $sector.value = '';
      $sector.setAttribute("disabled","disabled");
  }
}

$dt_orgmembers.on( 'click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        $('#frm_orgmember #orgmemberid').val('');
        $('#frm_orgmember #masterid').val('');
        $('#frm_orgmember #membername').val('');
        $('#frm_orgmember #idno').val('');
        $('#frm_orgmember #designation').val('');
        $('#frm_orgmember #sector').val('');
        $('#frm_orgmember #seak').val('');
        $('#frm_orgmember #strainings').val('');
        $('#frm_orgmember #othertrainings').val('');
        $('#frm_orgmember #production').val('');
        $('#frm_orgmember #marketing').val('');
        $('#frm_orgmember #upto').val('');
    }else {
        $('#dt_orgmembers tbody tr').removeClass('selected');
        $(this).toggleClass('selected');
        $('#frm_orgmember #orgmemberid').val($(this).data('orgmemberid'));
        $('#frm_orgmember #masterid').val($(this).data('masterid'));
        $('#frm_orgmember #membername').val($(this).data('fullname'));
        $('#frm_orgmember #idno').val($(this).data('idno'));
        $('#frm_orgmember #designation').val($(this).data('designation'));
        $('#frm_orgmember #sector').val($(this).data('sector'));
        $('#frm_orgmember #seak').val($(this).data('seak'));
        $('#frm_orgmember #strainings').val($(this).data('strainings'));
        $('#frm_orgmember #othertrainings').val($(this).data('othertrainings'));
        $('#frm_orgmember #production').val($(this).data('production'));
        $('#frm_orgmember #marketing').val($(this).data('marketing'));
        if($(this).data('upto') == '1900-01-01'){
          $('#frm_orgmember #upto').val('');
        }else{
          $('#frm_orgmember #upto').val($(this).data('upto'));
        }

    }
});

function get_orgmembers(orgid){

  var dt_orgmembers = $dt_orgmembers.DataTable({
            'ajax': {
              "type": "GET",
              "url": base_url + "report/get_orgmembers/"+orgid,
              "dataSrc": ""
            },
            fnCreatedRow: function(nRow, data, iDisplayIndex) {
              designations.push(data.designation);
               $(nRow).attr('data-orgmemberid', data.orgmemberid);
               $(nRow).attr('data-masterid', data.masterid);
               $(nRow).attr('data-fullname', data.fullname);
               $(nRow).attr('data-idno', data.idNo);
               $(nRow).attr('data-designation', data.designation);
               $(nRow).attr('data-seak', data.seak);
               $(nRow).attr('data-sector', data.sector);
               $(nRow).attr('data-strainings', data.strainings);
               $(nRow).attr('data-othertrainings', data.othertrainings);
               $(nRow).attr('data-production', data.production);
               $(nRow).attr('data-marketing', data.marketing);
               $(nRow).attr('data-upto', data.upto);
             },
            'columns': [
              { "data": "fullname" },
              { "data": "designation" },
              { "data": "sector" },
              { "data": "seak" },
              { "data": "strainings" },
              { "data": "othertrainings" },
              { "data": "production" },
              { "data": "marketing" },
            ],
            'dom': '<"wrapper"Bfit>',
            'order': [
              [0, "desc"]
            ],
            'scrollY': '80vh',
            'scrollX': true,
            'scrollCollapse': true,
            'paging': false,
            'ordering': false,
            'buttons': [
              {
              'text': '',
              'extend': 'excelHtml5',
              'titleAttr': 'Export Excel',
              'className': 'fa fa-download input-sm',
              customize: function(xlsx) {
                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                $('row c[r^="C"]', sheet).attr('s', '0');
              }
            },
            // {
            //   'text': '',
            //   'extend': 'print',
            //   'titleAttr': 'Print',
            //   'className': 'fa fa-print',
            //   'exportOptions': {
            //     'columns': ':visible'
            //   },
            // },

            {
              'text': '',
              'titleAttr': 'Refresh',
              'className': 'fa fa-refresh input-sm',
              action: function(e, dt, node, config) {
                $dt_orgmembers.dataTable().fnClearTable();
                $dt_orgmembers.dataTable().fnDestroy();
                var orgid = $('#dt_brgyorganization tbody').find('.selected').data('id')
                get_orgmembers(orgid);
              }
            }
          ],
            fnInitComplete: function(oSettings, json) {
              $('.alert-info .glyphicon-remove').trigger("click");
            }
  });

}

function get_fernandinos(brgyid){
  var fernandino_name = {
    url: base_url + "report/get_fernandino/"+brgyid,
    getValue: "fullname",
    requestDelay: 500,
    list: {
      match: {
            enabled: true
            },
      onSelectItemEvent: function() {
           var id = $("#membername").getSelectedItemData().masterid;
              $("#masterid").val(id).trigger("change");

           var idno = $("#membername").getSelectedItemData().idNo;
              $("#idno").val(idno).trigger("change");
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

  var fernandino_idno = {
    url: base_url + "report/get_fernandino/"+brgyid,
    getValue: "idNo",
    requestDelay: 500,
    list: {
      match: {
            enabled: true
            },
      onSelectItemEvent: function() {
           var id = $("#idno").getSelectedItemData().masterid;
              $("#masterid").val(id).trigger("change");

           var fullname = $("#idno").getSelectedItemData().fullname;
              $("#membername").val(fullname).trigger("change");
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
    for (var i = 0, len = $frm_orgmemberelements.length; i < len; ++i) {
        $frm_orgmemberelements[i].disabled = false;
    }

    $('#membername').easyAutocomplete(fernandino_name);
    $('#idno').easyAutocomplete(fernandino_idno);
}


function disabled_frm_orgmember(){
  for (var i = 0, len = $frm_orgmemberelements.length; i < len; ++i) {
      $frm_orgmemberelements[i].disabled = true;
  }
}


btn_saveorgmember.onclick = function(){
  var $is_processing  = $('body').find('.alert-info').length,
      $membername  = document.getElementById('membername').value,
      $idno  = document.getElementById('idno').value,
      $designation  = document.getElementById('designation').value,
      $sector  = document.getElementById('sector').value,
      $seak  = document.getElementById('seak').value,
      $strainings  = document.getElementById('strainings').value,
      $othertrainings  = document.getElementById('othertrainings').value,
      $production  = document.getElementById('production').value,
      incomplete  = '',
      $marketing  = document.getElementById('marketing').value;

      if($designation == "COMMITTEES"){
        if($sector.length  == 0){
          incomplete = 1;
        }else{
          incomplete = 0;
        }
      }else{
        incomplete = 0;
      }
    if($membername.length == 0 ||
        $idno.length == 0 ||
        $designation.length == 0 ||
        $seak.length == 0 ||
        $strainings.length == 0 ||
        $othertrainings.length == 0 ||
        $production.length == 0 ||
        $marketing.length == 0 ||
        incomplete == 1){
              $('.alert-warning .glyphicon-remove').trigger("click");
              notify('Failed!', 'Please fill out all information.<br/> - Thank you!', 'danger', 3000);
              return false;
    }else{
      if($is_processing == 0){
        notify('Processing', 'Please wait..', 'info', 9999999);
      var arr = $("#frm_orgmember").serializeObject();
          postAjax(base_url + 'report/ajax_save_orgmembers/', arr,
             function(data) {
                $('.alert-info .glyphicon-remove').trigger("click");
                $('.alert-warning .glyphicon-remove').trigger("click");
               if (data.status == "yes") {
                 designations = [];
                 notify('Success!', data.content, 'success', 3000);
                 $dt_orgmembers.dataTable().fnClearTable();
                 $dt_orgmembers.dataTable().fnDestroy();
                 var orgid = $('#dt_brgyorganization tbody').find('.selected').data('id');
                 get_orgmembers(orgid);
                 $('#frm_orgmember #masterid').val('');
                 $('#frm_orgmember #membername').val('');
                 $('#frm_orgmember #idno').val('');
                 $('#frm_orgmember #designation').val('');
                 $('#frm_orgmember #sector').val('');
                 $('#frm_orgmember #seak').val('');
                 $('#frm_orgmember #strainings').val('');
                 $('#frm_orgmember #othertrainings').val('');
                 $('#frm_orgmember #production').val('');
                 $('#frm_orgmember #marketing').val('');
                 $('#frm_orgmember #upto').val('');
               } else {
                 notify('Failed!', data.content, 'danger', 3000);
               }
             }
           );
      }
    }
}

function print_org(){
  // alert($('#dt_brgyorganization tbody').find('.selected'));
  if($('#dt_brgyorganization tbody tr').hasClass('selected')){

    var z =  $('#dt_brgyorganization tbody').find('.selected').data('id');
    var x = base_url + 'report/print_organization?id='+'On5FEx2CmP'+ z + 'vce1Pph3d9';
    var win = window.open(x, '_blank');
    win.focus();
    // alert('true');
  }else{
    // alert('false');
  }
}

$( document ).ready(function() {
  disabled_frm_orgmember();
  get_orgmembers(0);
});
