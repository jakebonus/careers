
$( document ).ready(function() {

  $("#frm_ctcindividual").formValidation({
    framework: "bootstrap",
    icon: null,
    fields: {
      fname: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          },
          notEmpty: {
            message: ''
          }
        }
      },
      mname: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      lname: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },birthdate: {
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
      birthplace: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      citizenship: {
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
      city: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      province: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      gender: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      civilstatus: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      occupation: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
      salaryper: {
        validators: {
          regexp: {
            regexp: /^[0-9a-zA-ZÑñ .,-]+$/i
          },
          stringLength: {
            max: 30
          }
        }
      },
    }
   })
   .on('success.form.fv', function(e) {

   
    save_clientdetails();
    return false;
   }).on('err.field.fv', function(e, data) {
   
   });

var _id = document.getElementById('id'),
    _fname = document.getElementById('fname'),
    _mname = document.getElementById('mname'),
    _lname = document.getElementById('lname'),
    _tin = document.getElementById('tin'),
    _housenum = document.getElementById('housenum'),
    _brgy = document.getElementById('brgy'),
    _city = document.getElementById('city'),
    _province = document.getElementById('province'),
    _gender = document.getElementById('gender'),
    _civilstatus = document.getElementById('civilstatus'),
    _citizenship = document.getElementById('citizenship'),
    _birthdate = document.getElementById('birthdate'),
    _birthplace = document.getElementById('birthplace'),
    _occupation = document.getElementById('occupation'),
    _salary = document.getElementById('salary'),

    _height = document.getElementById('height'),
    _weight = document.getElementById('weight'),
    _icrno = document.getElementById('icrno'),

    _mobilenum = document.getElementById('mobilenum');


    
// var _btn_saveinfo = document.getElementById('btn_saveinfo');
// _btn_saveinfo.onclick = function(){
//   save_clientdetails();
// }

var _btn_print = document.getElementById('btn_print');

_btn_print.onclick = function(){

  _id = document.getElementById('id').value;

  if(_id.length > 0 ){
    print(_id);
  }else{
    return false;
  }

 
}


var $dt_clientlist = $('#dt_clientlist');

$dt_clientlist.DataTable({
  'dom': '<"wrapper"Bfit>',
  'scrollY': '70vh',
  "bInfo" : false,
  'searching': false,
  'scrollX': true,
  'scrollCollapse': true,
  'paging': false,
  'buttons': [
]
});

function clientlist(data){
  $dt_clientlist.dataTable().fnClearTable();
  $dt_clientlist.dataTable().fnDestroy();
  var dt_clientlist = $dt_clientlist.DataTable({
    'ajax': {
        "type": "GET",
        "url": base_url + 'admin/ajax_get_clientlist',
        "data": data,
        "dataSrc": ""
      },
      fnCreatedRow: function(nRow, data, iDisplayIndex) {
         $(nRow).attr('data-c_id', data.c_id);
       },
       
      'columns': [
        { "data": "c_refnum" },
        // { "data": "name" },
        { "data": function(data, type, row, meta) {
            
            return'<img src="https://localhost/cedula/build/images/logo.png">'+data.name;
          }
        },
        { "data": "c_citizenship" },
        { "data": "c_civilstatus" },
        { "data": "c_birthdate" },
        { "data": "age" },
        { "data": "age" },
      ],
      'dom': '<"wrapper"Bfit>',
      'scrollY': '70vh',
      "bInfo" : false,
      'searching': false,
      'scrollX': true,
      'scrollCollapse': true,
      'paging': false,
      'buttons': [
        {
          extend: 'csvHtml5',
          text: 'Excel',
          exportOptions: {
            stripHtml: false,
            modifier: {
                page: 'current'
            }
        }
      }
    ],
      fnInitComplete: function(oSettings, json) {
        $('.alert-info .glyphicon-remove').trigger("click");
      }
  });
}


  $('#dt_clientlist').on('click','tr', function() {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');

      $('#frm_ctcindividual')[0].reset();
      $('#frm_ctcindividual #id').val('');
      var penalty = document.getElementById('_penalty').innerHTML / 100;

      interest = (Number(60) * Number(penalty)).toFixed(2);

      document.getElementById('_bygross').innerHTML = 55000.00;
      document.getElementById('_subtotal').innerHTML = 60000.00;
      document.getElementById('_interest').innerHTML = interest;
      document.getElementById('_total').innerHTML = 60 + Number(interest);

    }else{
      $('#dt_clientlist tbody tr').removeClass('selected');
      $(this).toggleClass('selected');
      
      var id = $(this).data('c_id');

      $('#frm_ctcindividual #id').val(id);

      // promise getJSON
      getJSON(base_url + 'admin/get_clientdetails_forform?id=' + id).then(function(data) {

        _fname.value = data[0].c_fname;
        _mname.value = data[0].c_mname;
        _lname.value = data[0].c_lname;
        _tin.value =data[0].c_tin;
        _housenum.value =data[0].c_housenum;
        _brgy.value =data[0].c_brgy;
        _city.value =data[0].c_city;
        _province.value =data[0].c_province;
        _gender.value =data[0].c_gender;
        _civilstatus.value =data[0].c_civilstatus;
        _citizenship.value =data[0].c_citizenship;
        _birthdate.value =data[0].c_birthdate;
        _birthplace.value =data[0].c_birthplace;
        _occupation.value =data[0].c_occupation;
        _salary.value =data[0].c_annualsalary;

        _height.value =data[0].c_height;
        _weight.value =data[0].c_weight;
        _icrno.value =data[0].c_icrno;
        
        _mobilenum.value =data[0].c_mobilenum;

        var sal =  _salary.value.replace("₱ ", "").replace(",","").replace(",","").replace(",","");
    
        if(sal > 5000000){
          sal = 5000000;
        }else if(sal < 55000){
    
        }

        var gross = null,
        subtotal = null,
        basic = 5,
        penalty = document.getElementById('_penalty').innerHTML / 100,
        interest = null,
        total = null;
    
    
    gross = (sal * 0.001).toFixed(2);
    subtotal = (Number(gross) + Number(basic)).toFixed(2);
    interest = (Number(subtotal) * Number(penalty)).toFixed(2);
    total =  (Number(subtotal) + Number(interest)).toFixed(2);

    console.log("penalty " + penalty);
    console.log("gross " + gross);
    console.log("subtotal " + subtotal);
    console.log("interest " + interest);
    console.log("total " + total);

    document.getElementById('_bygross').innerHTML = gross;
    document.getElementById('_subtotal').innerHTML = subtotal;
    document.getElementById('_interest').innerHTML = interest;
    document.getElementById('_total').innerHTML = total;



      }, function(status) {
        alert('Something went wrong.');
      });
      
      // getJSON(base_url + 'admin/convert_number?id=' + id).then(function(data) {

      // }, function(status) {
      //   alert('Something went wrong.');
      // });

    }

  });


  function save_clientdetails(){
      $is_processing =  $('body .ui-pnotify > .alert-info').length;
      if($is_processing == 0){
        var arr = $("#frm_ctcindividual").serializeObject();
            notify('Processing', 'Please wait..', 'info', 999999);
            postAjax(base_url + 'admin/saveinfo/', arr,
            function(data) {

              if (data.status == "yes") {
                $('.ui-pnotify .alert-info').remove();
                $('.ui-pnotify .alert-warning').remove();
                notify('Success!', data.content, 'success', 3000);
                
                print(data.c_id);
                return false;
              } else {
                $('.ui-pnotify .alert-info').remove();
                $('.ui-pnotify .alert-warning').remove();
                notify('Failed!', data.content, 'danger', 3000);
                return false;
              }
            }
            
          );
        }
        return false;

  }

  function print(id){

    console.log(id);

    $('#printLayout').modal('show');

    var     $_fname = document.getElementById('_fname'),
            $_mname = document.getElementById('_mname'),
            $_lname = document.getElementById('_lname'),
            $_tin = document.getElementById('_tin'),
            $_fulladd = document.getElementById('_fulladd'),
            $_gender = document.getElementById('_gender'),
            $_civilstatus = document.getElementById('_civilstatus'),
            $_citizenship = document.getElementById('_citizenship'),
            $_birthdate = document.getElementById('_birthdate'),
            $_birthplace = document.getElementById('_birthplace'),

            $_occupation = document.getElementById('_occupation'),
            $_occupation2 = document.getElementById('_occupation2'),

            $modal_title = document.getElementById('modal_title'),

            $_height= document.getElementById('_height'),
            $_weight = document.getElementById('_weight'),
            $_icrno = document.getElementById('_icrno'),

            $_salary = document.getElementById('_salary'),
            $_mobilenum = document.getElementById('_mobilenum'),

            $_penalty = document.getElementById('_penalty'),
            $_inwords = document.getElementById('_inwords'),
            $_bygross = document.getElementById('_bygross');


            // for computation
            var $brgross = 0,
                $interest = 0,
                $subtotal = 0,
                $total = 0,
                $basic = document.getElementById('_basic').innerHTML,
                $penalty = document.getElementById('_penalty').innerHTML / 100;

                var _$total= null;
            // for saving
            var t_basic = document.getElementById('t_basic'),
             t_brgross = document.getElementById('t_brgross'),
             t_subtotal = document.getElementById('t_subtotal'),
             t_penalty = document.getElementById('t_penalty'),
             t_interest = document.getElementById('t_interest'),
             t_total = document.getElementById('t_total');
            

             // for printing
             var basic = document.getElementById('basic'),
             brgross = document.getElementById('brgross'),
             subtotal = document.getElementById('subtotal'),
             interest = document.getElementById('interest'),
             total = document.getElementById('total');
             c_id = document.getElementById('c_id');

             document.getElementById('ctcpreffix').value = localStorage.getItem('ctcpreffix');
             document.getElementById('ctcnum').value = localStorage.getItem('ctcnum');



    getJSON(base_url + 'admin/get_clientdetails_forprinting?id=' + id).then(function(data) {

      var $annualsalary = 0.00;

              $_fname.innerHTML = data[0].c_fname;
              $_mname.innerHTML = data[0].c_mname;
              $_lname.innerHTML = data[0].c_lname;
              $modal_title.innerHTML = '<center>'+data[0].c_fname +' '+data[0].c_mname+' '+data[0].c_lname+'</center>';
              $_tin.innerHTML =data[0].c_tin;
              $_fulladd.innerHTML =data[0].fulladd;
              $_gender.innerHTML =data[0].c_gender;
              $_civilstatus.innerHTML =data[0].c_civilstatus;
              $_citizenship.innerHTML =data[0].c_citizenship;
              $_birthdate.innerHTML =data[0].c_birthdate;
              $_birthplace.innerHTML =data[0].c_birthplace;

              if(data[0].c_occupation == "UNEMPLOYED" || data[0].c_occupation == "unemployed"){
                $_occupation.innerHTML =data[0].c_occupation;
              }else{
                $_occupation2.innerHTML =data[0].c_occupation;
              }
              

              $_salary.innerHTML=data[0].c_annualsalary;

              $_height.innerHTML=data[0].c_height;
              $_weight.innerHTML=data[0].c_weight;
              $_icrno.innerHTML=data[0].c_icrno;

              if(data[0].c_annualsalary > 5000000.00){
                $annualsalary = 5000000.00;
              }else{
                $annualsalary = data[0].c_annualsalary;
              }

              $brgross = $annualsalary * 0.001;
              $subtotal = Number($brgross) + Number($basic);
              $interest = $subtotal * $penalty;
              $total = Number($subtotal) + Number($interest);

              c_id.value = id; 
              t_basic.value = $basic; 
              t_brgross.value = $brgross.toFixed(2);
              t_subtotal.value = $subtotal.toFixed(2);
              t_penalty.value = $penalty.toFixed(2);
              t_interest.value = $interest.toFixed(2);
              t_total.value = $total.toFixed(2);

              basic.innerHTML = $basic;
              brgross.innerHTML = $brgross.toFixed(2);
              subtotal.innerHTML = $subtotal.toFixed(2);
              interest.innerHTML = $interest.toFixed(2);
              total.innerHTML =  $total.toFixed(2);

              getJSON(base_url + 'admin/to_convert?total=' +  $total.toFixed(2)).then(function(data) {
        
                _inwords.innerHTML = data.inwords;
          
              }, function(status) {
                alert('Something went wrong.');
              });

    }, function(status) {
      alert('Something went wrong.');
    });





    return false;
  }

  var _printcedula = document.getElementById('printcedula');

  _printcedula.onclick = function(){
    savetransaction();
  }

  $('#frm_trasaction').on('submit', function(){
    savetransaction();
  });

  function savetransaction(){
    var ctcpreffix = document.getElementById('ctcpreffix').value,
           ctcnum = document.getElementById('ctcnum').value;
    if(ctcpreffix.length == 7 && ctcnum.length == 8){

      localStorage.setItem('ctcpreffix', ctcpreffix);
      localStorage.setItem('ctcnum', Number(ctcnum)+1);

      $is_processing =  $('body .ui-pnotify > .alert-info').length;
      if($is_processing == 0){
        var arr = $("#frm_trasaction").serializeObject();
            notify('Processing', 'Please wait..', 'info', 999999);
            postAjax(base_url + 'admin/savetransaction/', arr,
            function(data) {

              if (data.status == "yes") {
                $('.ui-pnotify .alert-info').remove();
                $('.ui-pnotify .alert-warning').remove();
                notify('Success!', data.content, 'success', 3000);
                // $('#frm_ctcindividual')[0].reset();
                printContent('cedula');
                $('#printLayout').modal('hide');
                dt_clientlist.ajax.reload();
                // print(data.c_id);

              } else {
                $('.ui-pnotify .alert-info').remove();
                $('.ui-pnotify .alert-warning').remove();
                notify('Failed!', data.content, 'danger', 3000);
              }
            }
          );
        }

    }else{
      notify('Failed!', 'Please check CTC Number', 'danger', 3000);
    }
    return false;
  }


  var btn_ftr = document.getElementById('btn_ftr');
  btn_ftr.onclick = function(){
    clientlist($('#frm_ftr').serializeObject());
  }


  
  // var salary = document.getElementById('salary');

  //   salary.onchange = function(e){
  //     compute();
  //   }
    $('#frm_ctcindividual #salary').on('keyup', function(){

      compute();
    });

  function compute(){

    var sal =  document.getElementById('salary').value.replace("₱ ", "").replace(",","").replace(",","").replace(",","");
    
    if(sal > 5000000){
      sal = 5000000;
    }else if(sal < 55000){

    }

    var gross = null,
        subtotal = null,
        basic = 5,
        penalty = document.getElementById('_penalty').innerHTML / 100,
        interest = null,
        total = null;
    
    
    gross = (sal * 0.001).toFixed(2);
    subtotal = (Number(gross) + Number(basic)).toFixed(2);
    interest = (Number(subtotal) * Number(penalty)).toFixed(2);
    total =  (Number(subtotal) + Number(interest)).toFixed(2);

    console.log("penalty " + penalty);
    console.log("gross " + gross);
    console.log("subtotal " + subtotal);
    console.log("interest " + interest);
    console.log("total " + total);

    document.getElementById('_bygross').innerHTML = gross;
    document.getElementById('_subtotal').innerHTML = subtotal;
    document.getElementById('_interest').innerHTML = interest;
    document.getElementById('_total').innerHTML = total;

  
  }

  $('#printLayout').on('hidden.bs.modal', function () {

    $('#dt_clientlist tbody tr').removeClass('selected');
    $('#frm_ctcindividual #id').val('');



    document.getElementById('_fname').innerHTML = '';
    document.getElementById('_mname').innerHTML = '';
    document.getElementById('_lname').innerHTML = '';
    document.getElementById('modal_title').innerHTML = '';
    document.getElementById('_tin').innerHTML ='';
    document.getElementById('_fulladd').innerHTML ='';
    document.getElementById('_gender').innerHTML ='';
    document.getElementById('_civilstatus').innerHTML ='';
    document.getElementById('_citizenship').innerHTML ='';
    document.getElementById('_birthdate').innerHTML ='';
    document.getElementById('_birthplace').innerHTML ='';

    document.getElementById('_occupation2').innerHTML ='';
    document.getElementById('_occupation').innerHTML ='';
  

    document.getElementById('_salary').innerHTML='';

    document.getElementById('_height').innerHTML='';
    document.getElementById('_weight').innerHTML='';
    document.getElementById('_icrno').innerHTML='';



    basic.innerHTML ='';
    brgross.innerHTML = '';
    subtotal.innerHTML = '';
    interest.innerHTML = '';
    total.innerHTML = '';
  })

});