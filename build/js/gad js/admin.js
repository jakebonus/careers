var $dt_masterlist = $('#dt_masterlist'),
  // $dt_serviceavailed = $('#dt_serviceavailed'),
  $dt_depende = $('#dt_depende'),
  txt_search = document.getElementById("txt_search"),
  txt_brgy = document.getElementById("txt_brgy"),
  btn_search = document.getElementById("btn_search"),
  btn_tag = $('#btn_tag'),
  gender = document.getElementById("gender"),
  sector = document.getElementById("sector"),
  masterid = document.getElementById("masterid"),
  // masterid = document.getElementById("masterid"),
  sectortag = document.getElementById("sectortag"),
  specify = document.getElementById("specify"),
  // $sectortag = $('#sectortag'),
  $otherinfo = document.getElementById('otherinfo'),
  $is_processing = '',
  $aval = '',
  $bval = '',
  $cval = '',
  txt_in = document.getElementById("txt_in"),
  frm_info = document.getElementById("frm_info");
// $dt_serviceavailed.DataTable();

sectortag.setAttribute('disabled', 'disabled');
specify.setAttribute('disabled', 'disabled');

function otable(url, data) {
  $dt_masterlist.dataTable().fnClearTable();
  $dt_masterlist.dataTable().fnDestroy();
  var otable = $dt_masterlist.DataTable({
    'ajax': {
      "type": "GET",
      "url": url,
      "data": data,
      "dataSrc": ""
    },
    fnCreatedRow: function (nRow, data, iDisplayIndex) {
      $(nRow).attr('data-masterid', data.masterid);
      $(nRow).attr('data-idno', data.idNo);
      $(nRow).attr('data-edad', data.edad);
      $(nRow).attr('data-fullname', data.fullname);
      $(nRow).attr('data-sectortag', data.sectortag);

      $(nRow).attr('data-pwdnum', data.pwdnum);
      $(nRow).attr('data-soloparentnum', data.soloparentnum);
      $(nRow).attr('data-sector', data.sector);
      $(nRow).attr('data-seniorctrlno', data.seniorctrlno);

    },
    'columns': [
      { "data": "idNo" },
      { "data": "lname" },
      { "data": "fname" },
      { "data": "mname" },
      { "data": "birthdate" },
      { "data": "edad" },
      { "data": "brgyname" }
    ],

    'dom': '<"wrapper"Bfit>',
    'order': [
      [0, "desc"]
    ],
    // 'searching': false,
    'info': false,
    'scrollY': '24vh',
    'scrollX': true,
    'scrollCollapse': true,
    'paging': false,
    'buttons': [
    ],
    fnInitComplete: function (oSettings, json) {
      $('.alert-info .glyphicon-remove').trigger("click");
    }
  });
}

$("#btn_reset").click(function () {
  $("#frm_search").reset();
});

$dt_depende.DataTable();
function get_depende(url) {
  $dt_depende.DataTable({
    'ajax': {
      "url": url,
      "dataSrc": ""
    },
    fnCreatedRow: function (nRow, data, iDisplayIndex) {
      // $(nRow).attr('data-id', data.id);
      $(nRow).attr('data-fullname', data.fullname);
      $(nRow).attr('data-details', data.details);
    },
    'columns': [
      { "data": "fullname" },
      { "data": "details" }
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
    'searching': false,
    'info': false,
    'scrollY': '35vh',
    'scrollX': true,
    'scrollCollapse': true,
    'paging': false,
    'buttons': [
    ],
    fnInitComplete: function (oSettings, json) {
      $('.ui-pnotify .alert-info').remove();
    }
  });
}


$(document).ready(function () {

  btn_search.onclick = function () {
    if (txt_in.value.length <= 0) {
      txt_in.focus();
    } else {
      notify('Processing', 'Please wait..', 'info', 9999999);
      var url = base_url + "admin/ajax_get_fernandino";
      var data = $("#frm_search").serializeObject();
      otable(url, data);
      return false;
    }
  };



  $dt_masterlist.on('click', 'tr', function () {
    $('#frm_info')[0].reset();
    $('#frm_otherinfo')[0].reset();
    $otherinfo.innerHTML = '';
    $dt_depende.dataTable().fnClearTable();
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      $('#frm_otherinfo #masterid').val('');
      $('#frm_info #fullname').val('');
      $('#frm_info #idNo').val('');
      $('#frm_info #age').val('');
      $('#frm_info #sector').val('');
      $('#frm_info #sel_sector').val('');
      $('#frm_info #pwdnum').val('');
      $('#frm_info #soloparentnum').val('');
      $('#frm_info #seniorctrlno').val('');
      sectortag.setAttribute('disabled', 'disabled');
      specify.setAttribute('disabled', 'disabled');
      $otherinfo.innerHTML = '';
    } else {
      $('#dt_masterlist tbody tr').removeClass('selected');
      $(this).toggleClass('selected');
      $('#frm_otherinfo #masterid').val($(this).data('masterid'));
      $('#frm_info #fullname').val($(this).data('fullname'));
      $('#frm_info #idNo').val($(this).data('idno'));
      $('#frm_info #age').val($(this).data('edad'));
      $('#frm_info #sel_sector').val($(this).data('sector'));

      $('#frm_info #pwdnum').val($(this).data('pwdnum'));
      $('#frm_info #soloparentnum').val($(this).data('soloparentnum'));
      $('#frm_info #seniorctrlno').val($(this).data('seniorctrlno'));

      sectortag.removeAttribute('disabled', 'disabled');
      specify.removeAttribute('disabled', 'disabled');

    }
  });




});

$(document).ready(function () {
  var pwd_option = '<option value="PSYCHOSOCIAL">PSYCHOSOCIAL</option><option value="MENTAL">MENTAL</option><option value="COMMUNICATION">COMMUNICATION</option><option value="CHRONIC ILLNESS">CHRONIC ILLNESS</option><option value="VISUAL">VISUAL</option><option value="ORTHOPEDIC">ORTHOPEDIC</option><option value="MULTIPLE">MULTIPLE</option>',
    solop_option = '<option value="ABANDONED">ABANDONED</option><option value="SEPARATED">SEPARATED</option><option value="ANNULLED">ANNULLED</option><option value="DEATH OF SPOUSE">DEATH OF SPOUSE</option><option value="SPOUSE DETAINED">SPOUSE DETAINED</option>';

  sectortag.onchange = function () {
    var infocontent = '',
      masterid = $('#frm_otherinfo #masterid').val(),
      sectortag = $('#frm_otherinfo #sectortag').val(),
      url = base_url + 'admin/ajax_depende/' + masterid + '/' + sectortag;
    $otherinfo.innerHTML = '';
    specify.innerHTML = '<option value=""> - - - </option>';
    switch (sectortag) {
      case 'PWD':
        specify.innerHTML += pwd_option;
        infocontent += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
        infocontent += '<label class="control-label">Member Since</label>';
        infocontent += '<input type="text" class="form-control input-sm fdate" id="pwdnumdate" name="pwdnumdate" required>';
        infocontent += '</div>';
        infocontent += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
        infocontent += '<label class="control-label">Disability Description</label>';
        infocontent += '<input type="text" class="form-control input-sm" id="disabilitydesc" name="disabilitydesc" required>';
        infocontent += '</div>';
        infocontent += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
        infocontent += '<label class="control-label">Tax Claimant:</label>';
        infocontent += '<input type="text" class="form-control input-sm" id="name" name="name" required>';
        infocontent += '</div>';
        infocontent += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
        infocontent += '<label class="control-label">TIN No:</label>';
        infocontent += '<input type="text" class="form-control input-sm" id="tin" name="tin" required>';
        infocontent += '</div>';
        infocontent += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
        infocontent += '<label class="control-label">Contact Number:</label>';
        infocontent += '<input type="text" class="form-control input-sm" id="contactnum" name="contactnum" required>';
        infocontent += '</div>';
        infocontent += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
        infocontent += '<hr><button type="button" class="btn btn-success input-sm col-xs-6" id="btn_tag" name="btn_tag"><i class="fa fa-save"></i> SAVE</button>';
        infocontent += '</div>';
        break;
      case 'SOLO PARENT':
        specify.innerHTML += solop_option;
        infocontent += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
        infocontent += '<label class="control-label">Member Since</label>';
        infocontent += '<input type="text" class="form-control input-sm fdate" id="soloparentnumdate" name="soloparentnumdate" required>';
        infocontent += '</div>';
        infocontent += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
        infocontent += '<label class="control-label">Name:</label>';
        infocontent += '<input type="text" class="form-control input-sm" id="name" name="name" required>';
        infocontent += '</div>';
        infocontent += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
        infocontent += '<label class="control-label">Birth Date:</label>';
        infocontent += '<input type="text" class="form-control input-sm fdate" id="bdate" name="bdate" required>';
        infocontent += '</div>';
        infocontent += '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
        infocontent += '<label class="control-label">Relationship:</label>';
        infocontent += '<select class="form-control input-sm" id="relation" name="relation"><option value=""> - - - </option><option value="SON"> SON</option><option value="DAUGHTER"> DAUGHTER</option></select>';
        infocontent += '</div>';
        infocontent += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
        infocontent += '<hr><button type="button" class="btn btn-success input-sm col-xs-6" id="btn_tag" name="btn_tag"><i class="fa fa-save"></i> SAVE</button>';
        infocontent += '</div>';
        break;
    }
    $("div#otherinfo").append(infocontent);
    $(".fdate").inputmask("9999-99-99", {
      "placeholder": "yyyy-mm-dd"
    });
    var btn_tag = document.getElementById('btn_tag'),
      url = base_url + 'admin/ajax_depende/' + masterid + '/' + sectortag;
    $dt_depende.dataTable().fnClearTable();
    $dt_depende.dataTable().fnDestroy();
    get_depende(url);
  }


  // ***************************************** //
  // btn_tag.onclick = function(){
  // $('#btn_tag').on('click', function(){

  $(document).on('click', '#btn_tag', function () {
    var masterid = $('#frm_otherinfo #masterid').val(),
      sectortag = $('#frm_otherinfo #sectortag').val(),
      specifyval = specify.value;

    switch (sectortag) {
      case 'SOLO PARENT':
        var $a = document.getElementById('name'),
          $b = document.getElementById('bdate'),
          $c = document.getElementById('relation'),


          b_date = document.getElementById('bdate'),

          bdate = b_date.value,
          age = '',
          present_date = new Date();
        age = calculateAge(bdate, present_date);
        if (age > 17) {
          $('.alert-warning .glyphicon-remove').trigger("click");
          notify('Failed!', 'Dependent(s) must be below 18 year old.', 'danger', 99999);
          b_date.focus();
          return false;
        }

        if ($a.value.length <= 0) {
          $('.alert-warning .glyphicon-remove').trigger("click");
          notify('Failed', 'Please fill out other information.  Thank you!', 'warning', 9999999);
          $a.focus();
          return false;
        } else if ($b.value.length <= 0) {
          $('.alert-warning .glyphicon-remove').trigger("click");
          notify('Failed', 'Please fill out other information. Thank you!', 'warning', 9999999);
          $b.focus();
          return false;
        } else if ($c.value.length <= 0) {
          $('.alert-warning .glyphicon-remove').trigger("click");
          notify('Failed', 'Please fill out other information. Thank you!', 'warning', 9999999);
          $c.focus();
          return false;
        }
        // else if($d.value.length <= 0 ){
        //   $('.alert-warning .glyphicon-remove').trigger("click");
        //   notify('Failed', 'Please fill out other information. Thank you!', 'warning', 9999999);
        //   $d.focus();
        //   return false;
        // }
        break;
      case 'PWD':
        var $a = document.getElementById('name'),
          $b = document.getElementById('tin'),
          $c = document.getElementById('contactnum'),
          $d = document.getElementById('disabilitydesc');

        if ($a.value.length <= 0) {
          $('.alert-warning .glyphicon-remove').trigger("click");
          notify('Failed', 'Please fill out other information.  Thank you!', 'warning', 9999999);
          $a.focus();
          return false;
        } else if ($b.value.length <= 0) {
          $('.alert-warning .glyphicon-remove').trigger("click");
          notify('Failed', 'Please fill out other information. Thank you!', 'warning', 9999999);
          $b.focus();
          return false;
        } else if ($c.value.length <= 0) {
          $('.alert-warning .glyphicon-remove').trigger("click");
          notify('Failed', 'Please fill out other information. Thank you!', 'warning', 9999999);
          $c.focus();
          return false;
        } else if ($d.value.length <= 0) {
          $('.alert-warning .glyphicon-remove').trigger("click");
          notify('Failed', 'Please fill out other information. Thank you!', 'warning', 9999999);
          $d.focus();
          return false;
        }


        break;
    }
    if (masterid.length > 0) {
      if (sectortag.length > 0 && specifyval.length > 0) {
        $is_processing = $('body').find('.alert-info').length;
        if ($is_processing == 0) {
          notify('Processing', 'Please wait..', 'info', 9999999);
          var arr = $("#frm_otherinfo").serializeObject();
          postAjax(base_url + 'admin/ajax_tag_fernandino/', arr,
            function (data) {
              $('.ui-pnotify .alert-info').remove();
              $('.alert-info .glyphicon-remove').trigger("click");
              $('.alert-warning .glyphicon-remove').trigger("click");
              $('.alert-info .glyphicon-remove').trigger("click");
              if (data.status == "yes") {
                $('#frm_info #pwdnum').val(data.pwdnum);
                $('#frm_info #soloparentnum').val(data.soloparentnum);
                $('#frm_info #sel_sector').val(data.sectortag);
                $('#frm_info #seniorctrlno').val(data.seniorctrlno);
                notify('Success!', data.content, 'success', 3000);
                var url = base_url + 'admin/ajax_depende/' + masterid + '/' + sectortag;
                $dt_depende.dataTable().fnClearTable();
                $dt_depende.dataTable().fnDestroy();
                get_depende(url);
              } else {
                notify('Failed!', data.content, 'danger', 3000);
              }
            }
          );
        }
      } else {
        notify('Failed!', 'Please choose sector to tag and reason', 'danger', 3000);
        specify.focus();
      }

    } else {
      notify('Failed!', 'Please choose fernandino', 'danger', 3000);
    }
    return false;
  });
  // };

  // $(document).on('blur','#b_date', function() {
  //   alert('b_date');
  //   var b_date = document.getElementById('b_date'),
  //       age = '',
  //       present_date = new Date();
  //   // r_bdate.focusout = function(){
  //     age = calculateAge(b_date.value, present_date);
  //   // }
  //   if(age > 17){
  //     btn_tag.setAttribute('disabled','disabled');
  //     notify('Failed!', 'Dependent(s) must be below 18 year old', 'danger', 3000);
  //   }else{
  //     btn_tag.removeAttribute('disabled','disabled');
  //   }
  // });


});

function calculateAge(bdate, present_date) {
  birthDate = new Date(bdate);
  otherDate = new Date(present_date);

  var years = (otherDate.getFullYear() - birthDate.getFullYear());

  if (otherDate.getMonth() < birthDate.getMonth() ||
    otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
    years--;
  }
  return years;
}
