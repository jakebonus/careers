
let __oa_id = localStorage.getItem('oa_id');


$(document).ready(function () {



  if (__oa_id != null) {

    // document.getElementById('oa_password').removeAttribute('required');
    // document.getElementById('oa_password_confirm').removeAttribute('required');
    $("#upic").css("display", "inline");
    $("#uresume").css("display", "inline");
    $("#utor").css("display", "inline");
    $("#udiploma").css("display", "inline");
    $("#ueligibility").css("display", "inline");
    fill_info();
  } else {
    $("#upic").css("display", "none");
    $("#uresume").css("display", "none");
    $("#utor").css("display", "none");
    $("#udiploma").css("display", "none");
    $("#ueligibility").css("display", "none");
    formDefault();
    load_dt_vacant(0);
  }

  function fill_info() {

    document.getElementById('oa_password').value = "password";
    document.getElementById('oa_password_confirm').value = "password";

    let txt_oa_email = document.getElementById('oa_email');
    let txt_oa_fname = document.getElementById('oa_fname');
    let txt_oa_mname = document.getElementById('oa_mname');
    let txt_oa_lname = document.getElementById('oa_lname');
    let txt_oa_extname = document.getElementById('oa_extname');
    let txt_oa_course = document.getElementById('oa_course');
    let txt_oa_school = document.getElementById('oa_school');
    let txt_oa_educremarks = document.getElementById('oa_educremarks');
    let txt_oa_postgraduate = document.getElementById('oa_postgraduate');
    let txt_oa_postgraduateremarks = document.getElementById('oa_postgraduateremarks');
    let txt_oa_eligibility = document.getElementById('oa_eligibility');
    let txt_oa_eligremarks = document.getElementById('oa_eligremarks');
    let txt_oa_bdate = document.getElementById('oa_bdate');
    let txt_oa_gender = document.getElementById('oa_gender');
    let txt_oa_mobile = document.getElementById('oa_mobile');
    let txt_oa_pdesire = document.getElementById('oa_pdesire');
    let txt_oa_street = document.getElementById('oa_street');
    let txt_oa_brgy = document.getElementById('oa_brgy');
    let txt_oa_city = document.getElementById('oa_city');
    let txt_oa_province = document.getElementById('oa_province');
    let txt_oa_recwork = document.getElementById('oa_recwork');
    let txt_oa_rectraining = document.getElementById('oa_rectraining');
    let txt_oa_skills = document.getElementById('oa_skills');
    let txt_oa_awards = document.getElementById('oa_awards');

    let upic = document.getElementById('upic');
    let uresume = document.getElementById('uresume');
    let utor = document.getElementById('utor');
    let udiploma = document.getElementById('udiploma');
    let ueligibility = document.getElementById('ueligibility');

    let picLink = document.querySelector('a [href="https://localhost/careersv2/images/1644/pic.jpg"]');


    notify('Processing', 'Please wait..', 'info', 999999);
    getJSON(base_url + 'application/get_applicant_details?oa_id=' + __oa_id).then(function (data) {
      // console.log(data);
      $('.ui-pnotify .alert-info').remove();
      $('.ui-pnotify .alert-warning').remove();

      txt_oa_email.value = data[0].oa_email;
      txt_oa_fname.value = data[0].oa_fname;
      txt_oa_mname.value = data[0].oa_mname;
      txt_oa_lname.value = data[0].oa_lname;
      txt_oa_extname.value = data[0].oa_extname;
      txt_oa_course.value = data[0].oa_course;
      txt_oa_school.value = data[0].oa_school;
      txt_oa_educremarks.value = data[0].oa_educremarks;
      txt_oa_postgraduate.value = data[0].oa_postgraduate;
      txt_oa_postgraduateremarks.value = data[0].oa_postgraduateremarks;

      $('#oa_eligibility').val(data[0].oa_eligibility).trigger('change');
      txt_oa_bdate.value = data[0].oa_bdate;
      txt_oa_gender.value = data[0].oa_gender;
      txt_oa_mobile.value = data[0].oa_mobile;
      txt_oa_street.value = data[0].oa_street;
      var pdesire = '';
      pdesire = data[0].oa_pdesire;
      $('#oa_province').val(data[0].oa_province).trigger('change');
      setTimeout(function () {
        $('#oa_city').val(data[0].oa_city).trigger('change');
        if (data[0].oa_city == '3') {
          setTimeout(function () {
            $('#oa_brgy').val(data[0].oa_brgy).trigger('change');
          }, 1000);
        } else {
          txt_oa_brgy.value = data[0].oa_brgy;
        }
      }, 1000);

      txt_oa_recwork.value = data[0].oa_recwork;
      txt_oa_rectraining.value = data[0].oa_rectraining;
      txt_oa_skills.value = data[0].oa_skills;
      txt_oa_awards.value = data[0].oa_awards;


      upic.href = base_url + 'images/' + __oa_id + '/' + data[0].oa_pic;



      uresume.href = base_url + 'images/' + __oa_id + '/' + data[0].oa_resume;
      utor.href = base_url + 'images/' + __oa_id + '/' + data[0].oa_tor;
      udiploma.href = base_url + 'images/' + __oa_id + '/' + data[0].oa_diploma;
      ueligibility.href = base_url + 'images/' + __oa_id + '/' + data[0].oa_eligcert;

      if (pdesire == '' || pdesire == 0 || pdesire == null) {
        load_dt_vacant(0);
      } else {
        load_dt_vacant(pdesire);
      }


    }
      , function (status) {
        alert('Something went wrong.');
      });
  }



  $(document).on('change', 'input[type=checkbox]', function (e) {
    e.preventDefault();
    if ($('input[type=checkbox]:checked').length > 5) {
      $(this).prop('checked', false);
      new PNotify({
        title: 'Warning',
        text: 'You are only allowed to choose maximum of 5 position.',
        type: 'error',
        styling: 'bootstrap3'
      });
    }
  });


  $("#frm_personalinfo").formValidation({
    framework: "bootstrap",
    icon: null,
    fields: {
      oa_email: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-@]+$/i
          },
          stringLength: {
            max: 30
          },
          notEmpty: {
            message: ''
          }
        }
      },
      oa_password: {
        validators: {
          stringLength: {
            max: 30
          },
          notEmpty: {
            message: 'Max length is 30'
          }
        }
      },
      oa_password_confirm: {
        validators: {
          stringLength: {
            max: 30
          },
          notEmpty: {
            message: 'Max length is 30'
          }
        }
      },
      oa_fname: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 40
          },
          notEmpty: {
            message: ''
          }
        }
      },
      oa_mname: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 40
          }
        }
      },
      oa_lname: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 40
          }
        }
      },
      oa_extname: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ /.,-]+$/i
          },
          stringLength: {
            max: 10
          }
        }
      },
      oa_bdate: {
        validators: {
          date: {
            format: 'YYYY-MM-DD',
            message: ''
          },
          notEmpty: {
            message: ''
          }
        }
      },
      oa_mobile: {
        validators: {
          regexp: {
            regexp: /^[0-9-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      oa_gender: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      brgy: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      oa_eligibility: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ ()/.,-]+$/i
          },
          stringLength: {
            max: 100
          }
        }
      },
      oa_province: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      oa_city: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 50
          }
        }
      },
      oa_brgy: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      oa_street: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ /.,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      oa_school: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ /.,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      oa_course: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ ()/.,-]+$/i
          },
          stringLength: {
            max: 100
          }
        }
      },
      oa_educremarks: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ /.,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      oa_postgraduate: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ /.,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      oa_postgraduateremarks: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ /.,-]+$/i
          },
          stringLength: {
            max: 100
          }
        }
      },
      oa_recwork: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ /'.,-]+$/i
          },
          stringLength: {
            max: 100
          }
        }
      },
      oa_rectraining: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ /'.,-]+$/i
          },
          stringLength: {
            max: 100
          }
        }
      },
      oa_skills: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ /'.,-]+$/i
          }
        }
      },
      oa_awards: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ /'.,-]+$/i
          }
        }
      },
    }
  })
    .on('success.form.fv', function (e) {


      saveinfo();
      return false;
    }).on('err.field.fv', function (e, data) {

    });

});

let email = document.getElementById('oa_email');
email.onfocusout = function (e) {

  e.preventDefault();

  if (__oa_id == null || __oa_id == '') {
    if (email.value.length > 0) {

      notify('Processing', 'Please wait..', 'info', 999999);
      getJSON(base_url + 'application/checkemail?email=' + email.value).then(function (data) {
        // console.log(data);
        $('.ui-pnotify .alert-info').remove();
        $('.ui-pnotify .alert-warning').remove();
        if (data.status == 'yes') {



          notify('Success!', data.content, 'danger', 3000);

          setTimeout(function () {
            window.location.href = base_url + 'account/login';
          }, 4000);

        } else {

          // formDefault();
          let frm_personalinfo = document.getElementById("frm_personalinfo");

          let elements = frm_personalinfo.elements;
          for (let i = 0, len = elements.length; i < len; ++i) {

            elements[i].disabled = false;

          }
          notify('Success!', data.content, 'success', 3000);
        }
      }
        , function (status) {
          alert('Something went wrong.');
        });

    }
  }

}

let pic = document.getElementById('pic');
pic.onchange = function () {
  let alt = '#ppic';
  readUrl(this, alt);
}

let tor = document.getElementById('tor');
tor.onchange = function () {
  let alt = '#ptor';
  readUrl(this, alt);
}

let resume = document.getElementById('resume');
resume.onchange = function () {
  // let alt = '#presume';
  // readUrl(this,alt);
  let resumeSize = resume.files[0].size / 1024 / 1024;

  if (resumeSize > 2.0) {
    resume.value = '';
    notify('Failed!', "Your file size exceeds the 2.0 MB limit, Please upload a file not greater than  2.0 MB in size. <br /> Thank you!", 'warning', 3000);
    return false;

  } else {

    pdffile = document.getElementById("resume").files[0];
    pdffile_url = URL.createObjectURL(pdffile);
    $('#presume').attr('src', pdffile_url);
  }
}

let diploma = document.getElementById('diploma');
diploma.onchange = function () {
  let alt = '#pdiploma';
  readUrl(this, alt);
}

let eligibility = document.getElementById('eligibility');
eligibility.onchange = function () {
  let alt = '#peligibility';
  readUrl(this, alt);
}

function readUrl(input, alt) {
  // body...

  let inputSize = input.files[0].size / 1024 / 1024;

  if (inputSize > 2.0) {
    input.value = '';
    notify('Failed!', "Your file size exceeds the 2.0 MB limit, Please upload a file not greater than  2.0 MB in size. <br /> Thank you!", 'warning', 3000);
    return false;

  } else {

    var reader = new FileReader();

    reader.onload = function (e) {
      $(alt).attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }



}

function saveinfo() {

  var pic = document.getElementById("pic");


  if (!checkImage(pic)) {
    notify('Failed!', "Picture invalid file type! Please select 'docx','doc' or 'pdf' file format. Thank you! <br/>", 'warning', 3000);
    return false;
  }


  var resume = document.getElementById("resume");

  if (!checkDocx(resume)) {
    notify('Failed!', "Resume invalid file type! Please select 'docx','doc' or 'pdf' file format. Thank you! <br/>", 'warning', 3000);
    return false;
  }


  var tor = document.getElementById("tor");

  if (!checkImage(tor)) {
    notify('Failed!', "T.O.R invalid file type! Please select 'jpeg','jpg' or 'png' file format. Thank you! <br/>", 'warning', 3000);
    return false;
  }


  var diploma = document.getElementById("diploma");


  if (!checkImage(diploma)) {
    notify('Failed!', "Diploma invalid file type! Please select 'jpeg','jpg' or 'png' file format. Thank you! <br/>", 'warning', 3000);
    return false;
  }



  var eligibility = document.getElementById("eligibility");


  if (!checkImage(eligibility)) {
    notify('Failed!', "Eligibility Certificate invalid file type! Please select 'jpeg','jpg' or 'png' file format. Thank you! <br/>", 'warning', 3000);
    return false;
  }



  let p1 = $('oa_password_confirm').val();
  let p2 = $('oa_password').val();

  if (p1 != p2) {
    notify('Failed!', 'Password didnot match!', 'warning', 3000);
    return false;
  }


  let checkValues = $('input[name=v_id]:checked').map(function () {
    return $(this).val();
  }).get();

  let oa_course = $("#oa_course").val();

  $is_processing = $('body .ui-pnotify > .alert-info').length;

  if ($is_processing == 0) {
    var data = new FormData($('#frm_personalinfo')[0]);
    data.append('oa_id', __oa_id);
    data.append('checkValues', checkValues);
    $.ajax({
      url: base_url + 'application/saveinfo/',
      type: 'POST',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      xhr: function () {
        var myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) {
          myXhr.upload.addEventListener('progress', function (e) {
            notify('Processing...', 'Please wait a moment...', 'info', 99999);
          }, false);
        }
        return myXhr;
      },
      success: function (data) {
        var x = JSON.parse(data);
        $('.alert-info .glyphicon-remove').trigger("click");
        if (x.status == 'yes') {
          notify('Success!', x.content, 'success', 3000);
          localStorage.removeItem('oa_id');
          setTimeout(function () {
            // alert("Hello"); 
            window.location.href = base_url + 'account/login';
          }, 3000);
        } else {
          notify('Failed!', x.content, 'danger', 3000);
        }
      }
    });

  }
  return false;
}

let oa_province = document.getElementById('oa_province');
getJSON(base_url + 'province.txt').then(function (data) {

  for (var i = 0; i < data.length; i++) {
    let option = document.createElement('option');
    option.value = data[i].p_id;
    option.innerHTML = data[i].p_name;
    oa_province.add(option);
  }
}
  , function (status) {
    alert('Something went wrong.');
  });

// $('#dt_vacant').dataTable();

// populate courses
let oa_course = document.getElementById('oa_course');
getJSON(base_url + 'courses.txt').then(function (data) {

  for (var i = 0; i < data.length; i++) {

    let option = document.createElement('option');
    option.value = data[i].c_name;
    option.innerHTML = data[i].c_name;
    oa_course.add(option);

  }
}
  , function (status) {
    alert('Something went wrong.');
  });


var $dt_vacant = $('#dt_vacant');

function load_dt_vacant(x) {
  var dt_vacant = $dt_vacant.DataTable({
    'ajax': {
      "type": "GET",
      "url": base_url + 'application/get_vacancies',
      "dataSrc": ""
    },


    'columns': [
      {
        "data": function (data, type, row, meta) {

          if ('VACANT' == data.v_desc) {
            return '<input type="checkbox" id="v_id" name="v_id" value="' + data.v_id + '"> <strong> ' + data.v_position + '</strong><span style="color: green;font-size: 12px;font-weight: 700;"> ' + data.v_desc + '</span>';
          } else {
            return '<input type="checkbox" id="v_id" name="v_id" value="' + data.v_id + '" > ' + data.v_position;
          }

        }
      },

    ],
    'dom': '<"wrapper"Bfit>',
    'scrollY': '50vh',
    "bInfo": false,
    'searching': false,
    'scrollX': true,
    'scrollCollapse': true,
    'paging': false,
    'buttons': [
    ],
    fnInitComplete: function (oSettings, json) {
      if (x != 0) {
        var temp = new Array();
        temp = x.split(",");
        for (i = 0; i < temp.length; i++) {
          $("input[name=v_id][value='" + temp[i] + "']").map(function () {
            $(this).prop('checked', true);
          }).get();
        }
      }
    }

  });
}



function get_city() {

  let oa_city = document.getElementById('oa_city');
  oa_city.innerHTML = "<option> - Choose - </option>";

  getJSON(base_url + 'application/get_city?p_id=' + oa_province.value).then(function (data) {

    for (var i = 0; i < data.length; i++) {

      let option = document.createElement('option');
      option.value = data[i].c_id;
      option.innerHTML = data[i].c_name;
      oa_city.add(option);

    }

  }
    , function (status) {
      alert('Something went wrong.');
    });

}


function get_brgy() {

  let divbrgy = document.getElementById('brgy');

  if (oa_city.value == 3) {

    var oa_brgy = document.getElementById('oa_brgy');

    if (oa_brgy.nodeName != 'SELECT') {

      divbrgy.innerHTML = '<select class="form-control" id="oa_brgy" name="oa_brgy"></select>';

    }

    // redeclare
    var oa_brgy = document.getElementById('oa_brgy');

    oa_brgy.classList.add('select2_single', 'input-sm');

    $(".select2_single").select2({
      placeholder: "- Choose -",
      allowClear: true
    });

    oa_brgy.innerHTML = "<option> - Choose - </option>";

    getJSON(base_url + 'application/get_brgy?c_id=' + oa_city.value).then(function (data) {

      for (var i = 0; i < data.length; i++) {

        let option = document.createElement('option');
        option.value = data[i].b_id;
        option.innerHTML = data[i].b_name;
        oa_brgy.add(option);

      }

    }
      , function (status) {
        alert('Something went wrong.');
      });
  } else {

    divbrgy.innerHTML = '<input type="text" class="form-control input-sm" id="oa_brgy" name="oa_brgy">';
  }


}

function checkDocx(resume) {

  var resumeValidTypes = ["docx", "doc", "pdf"];

  let res = false;

  if (resume.value.length > 0) {
    var r = new String(resume.value);
    let rExtension = r.split('.').pop();
    res = resumeValidTypes.includes(rExtension);

    if (res == true) {
      return true;
    } else {
      return false;
    }

  }
  return true;

}


function checkImage(file) {

  var validTypes = ["jpeg", "jpg", "png"];
  var msg = '';

  let foo = false;

  if (file.value.length > 0) {
    // alert(file.value.length);
    var f = new String(file.value);
    let fExt = f.split('.').pop();
    foo = validTypes.includes(fExt);

    return foo;
    // if(foo == true){
    //   return true;
    // }else{
    //   return false;
    // }

  }
  return true;

}

// function checkDiploma(diploma) {

//   var dipValidTypes = ["jpeg","jpg","png"];
//   var msg = '';

//   let dip = false;

//   if(diploma.value.length > 0){
//       var d = new String(diploma.value);
//       // let fileExtension = x.slice((x.lastIndexOf(".") - 1 >>> 0) + 2);
//       let dExtension = d.split('.').pop();
//       dip = dipValidTypes.includes(dExtension);

//       if(dip == true){
//         msg = 'Valid file type!';
//       }else{
//         msg = "Invalid file type! Please select 'jpeg','jpg' or 'png' file format. Thank you! <br/>";
//       }

//   }else{
//       msg += "Please upload your resume in 'jpeg','jpg' or 'png' format. Thank you! <br/>";
//   }

// }


// function checkEligibility(eligibility) {

//   var eligValidTypes = ["jpeg","jpg","png"];
//   var msg = '';

//   let elig = false;

//   if(eligibility.value.length > 0){
//       var e = new String(eligibility.value);
//       // let fileExtension = x.slice((x.lastIndexOf(".") - 1 >>> 0) + 2);
//       let eExtension = e.split('.').pop();
//       elig = eligValidTypes.includes(eExtension);

//       if(elig == true){
//         msg = 'Valid file type!';
//       }else{
//         msg = "Invalid file type! Please select 'jpeg','jpg' or 'png' file format. Thank you! <br/>";
//       }

//   }else{
//       msg += "Please upload your resume in 'jpeg','jpg' or 'png' format. Thank you! <br/>";
//   }

// }

function formDefault() {
  let frm_personalinfo = document.getElementById("frm_personalinfo");

  let elements = frm_personalinfo.elements;

  if (__oa_id == null || __oa_id == '') {


    for (let i = 0, len = elements.length; i < len; ++i) {

      elements[i].disabled = true;

    }

    let email = document.getElementById('oa_email');
    email.disabled = false;
  }
}

function logout() {
  localStorage.removeItem('oa_id');
}




