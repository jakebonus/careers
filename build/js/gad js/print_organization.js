// var URL='localhost/gad/report/print_organization?id=On5FEx2CmP2vce1Pph3d9';
var url = window.location.href;
var arr=url.split('/');//arr[0]='localhost'
                       //arr[1]='gad'
                       //arr[2]='report'
                       //arr[3]='print_organization?id=On5FEx2CmP2vce1Pph3d9'
var parameter=arr[arr.length-1].split('?'); //parameter[0]='print_organization'
                                            //parameter[1]='id=On5FEx2CmP2vce1Pph3d9'
var id=parameter[1].split('=')[1];          //p_value='10';

// alert(id);
// $.getJSON( base_url + "admin/ajax_get_organizationdetails?id="+id, function( data ) {
//   $.each( data, function( key, val ) {
//     // ftr_office.push( "<option value='" + val.code + "'>" + val.code + "</option>" );
//   });
//   // $("#ftr_office").append(ftr_office);
// });
var pres = document.getElementById('pres'),
    vpres = document.getElementById('vpres'),
    treas = document.getElementById('treas'),
    auditor = document.getElementById('auditor'),
    pleaders = document.getElementById('pleaders'),
    committees = document.getElementById('committees'),
    education = document.getElementById('education'),
    orginfo = document.getElementById('orginfo'),
    sec = document.getElementById('sec');
$(document).ready(function(){
  getAjax(base_url + 'report/ajax_get_orginfo?id='+id, function(data) {
    var z = JSON.parse(data);
    for (i = 0; i < z.length; i++) {
        orginfo.innerHTML += '('+z[i].brgyname+') '+z[i].name + ' Date GA: '+z[i].date + ' Total No. of Founding Members: '+ z[i].totmember;
        // alert('('+z[i].brgyname+') '+z[i].name + ' Date GA: '+z[i].date);
    }

  });
  getAjax(base_url + 'report/ajax_get_organizationdetails?id='+id, function(data) {
          var x = JSON.parse(data);
          var seak = '';
          var strainings = '';
          var othertrainings = '';
          var production = '';
          var marketing = '';
            for (i = 0; i < x.length; i++) {
                  if(x[i].designation == 'PRESIDENT'){
                    seak = '';
                    strainings = '';
                    othertrainings = '';
                    production = '';
                    marketing = '';
                   if(x[i].seak == 'YES'){
                       seak =  '<center><i class="fa fa-check"></i></center>';
                   }
                   if(x[i].strainings == 'YES'){
                       strainings =  '<center><i class="fa fa-check"></i></center>';
                   }
                   if(x[i].othertrainings == 'YES'){
                       othertrainings =  '<center><i class="fa fa-check"></i></center>';
                   }
                   if(x[i].production == 'YES'){
                       production =  '<center><i class="fa fa-check"></i></center>';
                   }
                   if(x[i].marketing == 'YES'){
                       marketing =  '<center><i class="fa fa-check"></i></center>';
                   }
                    pres.innerHTML += '<td></td>';
                    pres.innerHTML += '<td style="font-size:12px;"><small>PRES:</small>'+x[i].fullname+'</td>';
                    pres.innerHTML += '<td style="font-size:12px;">09066426404</td>';
                    pres.innerHTML += '<td style="font-size:12px;">'+seak+'</td>';
                    pres.innerHTML += '<td style="font-size:12px;">'+strainings+'</td>';
                    pres.innerHTML += '<td style="font-size:12px;">'+othertrainings+'</td>';
                    pres.innerHTML += '<td style="font-size:12px;">'+production+'</td>';
                    pres.innerHTML += '<td style="font-size:12px;">'+marketing+'</td>';
                  }
                  if(x[i].designation == 'VICE-PRESIDENT'){
                    seak = '';
                    strainings = '';
                    othertrainings = '';
                    production = '';
                    marketing = '';
                    if(x[i].seak == 'YES'){
                        seak =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].strainings == 'YES'){
                        strainings =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].othertrainings == 'YES'){
                        othertrainings =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].production == 'YES'){
                        production =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].marketing == 'YES'){
                        marketing =  '<center><i class="fa fa-check"></i></center>';
                    }
                    vpres.innerHTML += '<td></td>';
                    vpres.innerHTML += '<td style="font-size:12px;"><small>V-PRES:</small> '+x[i].fullname+'</td>';
                    vpres.innerHTML += '<td style="font-size:12px;">09066426404</td>';
                    vpres.innerHTML += '<td style="font-size:12px;">'+seak+'</td>';
                    vpres.innerHTML += '<td style="font-size:12px;">'+strainings+'</td>';
                    vpres.innerHTML += '<td style="font-size:12px;">'+othertrainings+'</td>';
                    vpres.innerHTML += '<td style="font-size:12px;">'+production+'</td>';
                    vpres.innerHTML += '<td style="font-size:12px;">'+marketing+'</td>';
                  }
                  if(x[i].designation == 'SECRETARY'){
                    seak = '';
                    strainings = '';
                    othertrainings = '';
                    production = '';
                    marketing = '';
                    if(x[i].seak == 'YES'){
                        seak =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].strainings == 'YES'){
                        strainings =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].othertrainings == 'YES'){
                        othertrainings =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].production == 'YES'){
                        production =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].marketing == 'YES'){
                        marketing =  '<center><i class="fa fa-check"></i></center>';
                    }
                    sec.innerHTML += '<td></td>';
                    sec.innerHTML += '<td style="font-size:12px;"><small>SEC:</small>'+x[i].fullname+'</td>';
                    sec.innerHTML += '<td style="font-size:12px;">09066426404</td>';
                    sec.innerHTML += '<td style="font-size:12px;">'+seak+'</td>';
                    sec.innerHTML += '<td style="font-size:12px;">'+strainings+'</td>';
                    sec.innerHTML += '<td style="font-size:12px;">'+othertrainings+'</td>';
                    sec.innerHTML += '<td style="font-size:12px;">'+production+'</td>';
                    sec.innerHTML += '<td style="font-size:12px;">'+marketing+'</td>';
                  }
                  if(x[i].designation == 'TREASURER'){
                    seak = '';
                    strainings = '';
                    othertrainings = '';
                    production = '';
                    marketing = '';
                    if(x[i].seak == 'YES'){
                        seak =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].strainings == 'YES'){
                        strainings =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].othertrainings == 'YES'){
                        othertrainings =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].production == 'YES'){
                        production =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].marketing == 'YES'){
                        marketing =  '<center><i class="fa fa-check"></i></center>';
                    }
                    treas.innerHTML += '<td></td>';
                    treas.innerHTML += '<td style="font-size:12px;"><small>TREAS:</small>'+x[i].fullname+'</td>';
                    treas.innerHTML += '<td style="font-size:12px;">09066426404</td>';
                    treas.innerHTML += '<td style="font-size:12px;">'+seak+'</td>';
                    treas.innerHTML += '<td style="font-size:12px;">'+strainings+'</td>';
                    treas.innerHTML += '<td style="font-size:12px;">'+othertrainings+'</td>';
                    treas.innerHTML += '<td style="font-size:12px;">'+production+'</td>';
                    treas.innerHTML += '<td style="font-size:12px;">'+marketing+'</td>';
                  }
                  if(x[i].designation == 'AUDITOR'){
                    seak = '';
                    strainings = '';
                    othertrainings = '';
                    production = '';
                    marketing = '';
                    if(x[i].seak == 'YES'){
                        seak =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].strainings == 'YES'){
                        strainings =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].othertrainings == 'YES'){
                        othertrainings =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].production == 'YES'){
                        production =  '<center><i class="fa fa-check"></i></center>';
                    }
                    if(x[i].marketing == 'YES'){
                        marketing =  '<center><i class="fa fa-check"></i></center>';
                    }
                    auditor.innerHTML += '<td></td>';
                    auditor.innerHTML += '<td style="font-size:12px;"><small>AUDITOR:</small>'+x[i].fullname+'</td>';
                    auditor.innerHTML += '<td style="font-size:12px;">09066426404</td>';
                    auditor.innerHTML += '<td style="font-size:12px;">'+seak+'</td>';
                    auditor.innerHTML += '<td style="font-size:12px;">'+strainings+'</td>';
                    auditor.innerHTML += '<td style="font-size:12px;">'+othertrainings+'</td>';
                    auditor.innerHTML += '<td style="font-size:12px;">'+production+'</td>';
                    auditor.innerHTML += '<td style="font-size:12px;">'+marketing+'</td>';
                  }
                  if(x[i].designation == 'PUROK LEADER'){
                    // insertAfter($('#pleaders'));
                     seak = '';
                     strainings = '';
                     othertrainings = '';
                     production = '';
                     marketing = '';
                     if(x[i].seak == 'YES'){
                         seak =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].strainings == 'YES'){
                         strainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].othertrainings == 'YES'){
                         othertrainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].production == 'YES'){
                         production =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].marketing == 'YES'){
                         marketing =  '<center><i class="fa fa-check"></i></center>';
                     }
                    var content = [];
                        content += '<tr><td></td>';
                        content += '<td style="font-size:12px;">'+x[i].fullname+'</td>';
                        content += '<td style="font-size:12px;">09066426404</td>';
                        content += '<td style="font-size:12px;">'+seak+'</td>';
                        content += '<td style="font-size:12px;">'+strainings+'</td>';
                        content += '<td style="font-size:12px;">'+othertrainings+'</td>';
                        content += '<td style="font-size:12px;">'+production+'</td>';
                        content += '<td style="font-size:12px;">'+marketing+'</td><tr>';
                    $( "#pleaders" ).after(content);
                  }

                  if(x[i].sector == 'EDUCATION'){
                    // insertAfter($('#pleaders'));
                     seak = '';
                     strainings = '';
                     othertrainings = '';
                     production = '';
                     marketing = '';
                     if(x[i].seak == 'YES'){
                         seak =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].strainings == 'YES'){
                         strainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].othertrainings == 'YES'){
                         othertrainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].production == 'YES'){
                         production =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].marketing == 'YES'){
                         marketing =  '<center><i class="fa fa-check"></i></center>';
                     }

                    var content = [];
                        content += '<tr><td></td>';
                        content += '<td>'+x[i].fullname+'</td>';
                        content += '<td>09066426404</td>';
                        content += '<td>'+seak+'</td>';
                        content += '<td>'+strainings+'</td>';
                        content += '<td>'+othertrainings+'</td>';
                        content += '<td>'+production+'</td>';
                        content += '<td>'+marketing+'</td><tr>';
                    $( "#committees" ).after(content);

                  }

                  if(x[i].sector == 'EDUCATION'){
                    // insertAfter($('#pleaders'));
                     seak = '';
                     strainings = '';
                     othertrainings = '';
                     production = '';
                     marketing = '';
                     if(x[i].seak == 'YES'){
                         seak =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].strainings == 'YES'){
                         strainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].othertrainings == 'YES'){
                         othertrainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].production == 'YES'){
                         production =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].marketing == 'YES'){
                         marketing =  '<center><i class="fa fa-check"></i></center>';
                     }

                    var content = [];
                        content += '<tr><td></td>';
                        content += '<td>'+x[i].fullname+'</td>';
                        content += '<td>09066426404</td>';
                        content += '<td>'+seak+'</td>';
                        content += '<td>'+strainings+'</td>';
                        content += '<td>'+othertrainings+'</td>';
                        content += '<td>'+production+'</td>';
                        content += '<td>'+marketing+'</td><tr>';
                    $( "#education" ).after(content);

                  }

                  if(x[i].sector == 'LIVELIHOOD'){
                    // insertAfter($('#pleaders'));
                     seak = '';
                     strainings = '';
                     othertrainings = '';
                     production = '';
                     marketing = '';
                     if(x[i].seak == 'YES'){
                         seak =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].strainings == 'YES'){
                         strainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].othertrainings == 'YES'){
                         othertrainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].production == 'YES'){
                         production =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].marketing == 'YES'){
                         marketing =  '<center><i class="fa fa-check"></i></center>';
                     }

                    var content = [];
                        content += '<tr><td></td>';
                        content += '<td>'+x[i].fullname+'</td>';
                        content += '<td>09066426404</td>';
                        content += '<td>'+seak+'</td>';
                        content += '<td>'+strainings+'</td>';
                        content += '<td>'+othertrainings+'</td>';
                        content += '<td>'+production+'</td>';
                        content += '<td>'+marketing+'</td><tr>';
                    $( "#livelihood" ).after(content);

                  }

                  if(x[i].sector == 'SOCIAL SERVICES'){
                    // insertAfter($('#pleaders'));
                     seak = '';
                     strainings = '';
                     othertrainings = '';
                     production = '';
                     marketing = '';
                     if(x[i].seak == 'YES'){
                         seak =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].strainings == 'YES'){
                         strainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].othertrainings == 'YES'){
                         othertrainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].production == 'YES'){
                         production =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].marketing == 'YES'){
                         marketing =  '<center><i class="fa fa-check"></i></center>';
                     }

                    var content = [];
                        content += '<tr><td></td>';
                        content += '<td>'+x[i].fullname+'</td>';
                        content += '<td>09066426404</td>';
                        content += '<td>'+seak+'</td>';
                        content += '<td>'+strainings+'</td>';
                        content += '<td>'+othertrainings+'</td>';
                        content += '<td>'+production+'</td>';
                        content += '<td>'+marketing+'</td><tr>';
                    $( "#socialservices" ).after(content);

                  }

                  if(x[i].sector == 'FINANCE'){
                    // insertAfter($('#pleaders'));
                     seak = '';
                     strainings = '';
                     othertrainings = '';
                     production = '';
                     marketing = '';
                     if(x[i].seak == 'YES'){
                         seak =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].strainings == 'YES'){
                         strainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].othertrainings == 'YES'){
                         othertrainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].production == 'YES'){
                         production =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].marketing == 'YES'){
                         marketing =  '<center><i class="fa fa-check"></i></center>';
                     }

                    var content = [];
                        content += '<tr style="font-size:12px;"><td></td>';
                        content += '<td>'+x[i].fullname+'</td>';
                        content += '<td>09066426404</td>';
                        content += '<td>'+seak+'</td>';
                        content += '<td>'+strainings+'</td>';
                        content += '<td>'+othertrainings+'</td>';
                        content += '<td>'+production+'</td>';
                        content += '<td>'+marketing+'</td><tr>';
                    $( "#finance" ).after(content);

                  }

                  if(x[i].designation == 'MEMBERS'){
                    // insertAfter($('#pleaders'));
                     seak = '';
                     strainings = '';
                     othertrainings = '';
                     production = '';
                     marketing = '';
                     if(x[i].seak == 'YES'){
                         seak =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].strainings == 'YES'){
                         strainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].othertrainings == 'YES'){
                         othertrainings =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].production == 'YES'){
                         production =  '<center><i class="fa fa-check"></i></center>';
                     }
                     if(x[i].marketing == 'YES'){
                         marketing =  '<center><i class="fa fa-check"></i></center>';
                     }

                    var content = [];
                        content += '<tr><td></td>';
                        content += '<td>'+x[i].fullname+'</td>';
                        content += '<td>09066426404</td>';
                        content += '<td>'+seak+'</td>';
                        content += '<td>'+strainings+'</td>';
                        content += '<td>'+othertrainings+'</td>';
                        content += '<td>'+production+'</td>';
                        content += '<td>'+marketing+'</td><tr>';
                    $( "#members" ).after(content);

                  }
              }
  });
});
