/**
 * Resize function without multiple trigger
 *
 * Usage:
 * $(window).smartresize(function(){
 *     // code here
 * });
 */
(function($, sr) {
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function(func, threshold, execAsap) {
    var timeout;

    return function debounced() {
      var obj = this,
        args = arguments;

      function delayed() {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null;
      }

      if (timeout)
        clearTimeout(timeout);
      else if (execAsap)
        func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 100);
    };
  };

  // smartresize
  jQuery.fn[sr] = function(fn) {
    return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
  };

})(jQuery, 'smartresize');
/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
  $BODY = $('body'),
  $MENU_TOGGLE = $('#menu_toggle'),
  $SIDEBAR_MENU = $('#sidebar-menu'),
  $SIDEBAR_FOOTER = $('.sidebar-footer'),
  $LEFT_COL = $('.left_col'),
  $RIGHT_COL = $('.right_col'),
  $NAV_MENU = $('.nav_menu'),
  $FOOTER = $('footer');

// Sidebar
$(document).ready(function() {
  // TODO: This is some kind of easy fix, maybe we can improve this
  var setContentHeight = function() {
    // reset height
    $RIGHT_COL.css('min-height', $(window).height());

    // var bodyHeight = $BODY.outerHeight(),
    //     footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
    //     leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
    //     contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // // normalize content
    // contentHeight -= $NAV_MENU.height() + footerHeight;

    // $RIGHT_COL.css('min-height', contentHeight);
  };

  $SIDEBAR_MENU.find('a').on('click', function(ev) {
    var $li = $(this).parent();

    if ($li.is('.active')) {
      $li.removeClass('active active-sm');
      $('ul:first', $li).slideUp(function() {
        setContentHeight();
      });
    } else {
      // prevent closing menu if we are on child menu
      if (!$li.parent().is('.child_menu')) {
        $SIDEBAR_MENU.find('li').removeClass('active active-sm');
        $SIDEBAR_MENU.find('li ul').slideUp();
      }

      $li.addClass('active');

      $('ul:first', $li).slideDown(function() {
        setContentHeight();
      });
    }
  });

  // toggle small or large menu
  $MENU_TOGGLE.on('click', function() {
    if ($BODY.hasClass('nav-md')) {
      $SIDEBAR_MENU.find('li.active ul').hide();
      $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
    } else {
      $SIDEBAR_MENU.find('li.active-sm ul').show();
      $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
    }

    $BODY.toggleClass('nav-md nav-sm');

    setContentHeight();
  });

  // check active menu
  $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

  $SIDEBAR_MENU.find('a').filter(function() {
    return this.href == CURRENT_URL;
  }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
    setContentHeight();
  }).parent().addClass('active');

  // recompute content when resizing
  $(window).smartresize(function() {
    setContentHeight();
  });

  setContentHeight();

  // fixed sidebar
  if ($.fn.mCustomScrollbar) {
    $('.menu_fixed').mCustomScrollbar({
      autoHideScrollbar: true,
      theme: 'minimal',
      mouseWheel: {
        preventDefault: true
      }
    });
  }
});
// /Sidebar

// Panel toolbox
$(document).ready(function() {
  $('.collapse-link').on('click', function() {
    var $BOX_PANEL = $(this).closest('.x_panel'),
      $ICON = $(this).find('i'),
      $BOX_CONTENT = $BOX_PANEL.find('.x_content');

    // fix for some div with hardcoded fix class
    if ($BOX_PANEL.attr('style')) {
      $BOX_CONTENT.slideToggle(200, function() {
        $BOX_PANEL.removeAttr('style');
      });
    } else {
      $BOX_CONTENT.slideToggle(200);
      $BOX_PANEL.css('height', 'auto');
    }

    $ICON.toggleClass('fa-chevron-up fa-chevron-down');
  });

  $('.close-link').click(function() {
    var $BOX_PANEL = $(this).closest('.x_panel');

    $BOX_PANEL.remove();
  });
});

// Tooltip
$(document).ready(function() {
  // $('[data-toggle="tooltip"]').tooltip({
  //   container: 'body'
  // });
  $(".fdate").inputmask("9999-99-99", {
    "placeholder": "yyyy-mm-dd"
  });
});

//Popup logout
// $(document).userTimeout({
//   logouturl: base_url + 'account/logout',
//   session: 300000,
//   notify: true,
//   force: 20000,
// });

// NProgress
function notify(title, content, type, delay) {
  new PNotify({
    title: title,
    text: content,
    styling: 'bootstrap3',
    type: type,
    delay: delay
  });
}
if (typeof NProgress != 'undefined') {
  $(document).ready(function() {
    NProgress.start();
  });

  $(window).load(function() {
    NProgress.done();
  });
}

//GET BALANCE
$(document).ready(function() {

  //FORM OBJECT
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

});

function postAjax(url, data, success) {
  var params = typeof data == 'string' ? data : Object.keys(data).map(
                function(k) {
                  return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
                }
              ).join('&');

  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open('POST', url, true);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      success(JSON.parse(xhr.responseText));
      
    }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Content-Type','multipart/form-data');

  xhr.send(params);
  return xhr;
}

// function postAjaxWithFile(url, data, success) {
//   var params = typeof data == 'string' ? data : Object.keys(data).map(
//                 function(k) {
//                   return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
//                 }
//               ).join('&');

//   var form = $('#frm_personalinfo');
//   var file = document.getElementById('pic');
//   var data = new FormData();

//   for(var i = 0; i < file.files.length; i++){
//      data.append('file[]', file.files[i]);
//   }
       

//   var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");



//   xhr.open('POST', url,true);
//   xhr.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       success(JSON.parse(xhr.responseText));
      
//     }
//   };
//   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//   xhr.setRequestHeader('Content-Type','multipart/form-data');

//   xhr.send(data);
//   return xhr;
// }

 // function uploadFile(url, data, success){  
 //         var filesToBeUploaded = document.getElementById("pic");  
 //         var file = filesToBeUploaded.files[0];  
 //         var xhrObj = new XMLHttpRequest();  
 //         xhrObj.upload.addEventListener("loadstart", loadStartFunction, false);  
 //         xhrObj.upload.addEventListener("progress", progressFunction, false);  
 //         xhrObj.upload.addEventListener("load", transferCompleteFunction, false);  
 //         xhrObj.open("POST", "upload.cfm", true);  
 //         xhrObj.setRequestHeader("Content-type", file.type);  
 //         xhrObj.setRequestHeader("X_FILE_NAME", file.name);  
 //         xhrObj.send(file);  
 // } 

function getAjax(url, success) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      success(xhr.responseText);
    }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send();
  return xhr;
}

var isDate_ = function(input) {
  var status = false;
  if (!input || input.length <= 0) {
    status = false;
  } else {
    var result = new Date(input);
    if (result == 'Invalid Date') {
      status = false;
    } else {
      status = true;
    }
  }
  return status;
}

function getAge(fromdate, todate){
  if(isDate_(fromdate)) {
    if(todate) todate= new Date(todate);
    else todate= new Date();

    var aa, age= [], fromdate= new Date(fromdate),
    y= [todate.getFullYear(), fromdate.getFullYear()],
    ydiff= y[0]-y[1],
    m= [todate.getMonth(), fromdate.getMonth()],
    mdiff= m[0]-m[1],
    d= [todate.getDate(), fromdate.getDate()],
    ddiff= d[0]-d[1];

    if(mdiff < 0 || (mdiff=== 0 && ddiff<0))--ydiff;
    if(mdiff<0) mdiff+= 12;
    if(ddiff<0){
        fromdate.setMonth(m[1]+1, 0);
        ddiff= fromdate.getDate()-d[1]+d[0];
        --mdiff;
    }
    if(ydiff> 0) age.push(ydiff+ ''+(ydiff> 1? ' -':' - '));
    // if(ydiff> 0) age.push(ydiff+ ' year'+(ydiff> 1? 's -':' - '));
    if(mdiff> 0) age.push(mdiff+ ' month'+(mdiff> 1? 's -':' - '));
    if(ddiff> 0) age.push(ddiff+ ' day'+(ddiff> 1? 's - ':' - '));
    if(age.length>1) age.splice(age.length-1,0,' and ');

    aa = age.join('').split('-');
    return aa[0];
  }
}

var getJSON = function(url) {
return new Promise(function(resolve, reject) {
var xhr = new XMLHttpRequest();
xhr.open('get', url, true);
xhr.responseType = 'json';
xhr.onload = function() {
var status = xhr.status;
if (status == 200) {
resolve(xhr.response);
} else {
reject(status);
}
};
xhr.send();
});
};

// promise getJSON
// var getJSON = function(url) {
//   return new Promise(function(resolve, reject) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('get', url, true);
//   xhr.responseType = 'json';
//   xhr.onload = function() {
//   var status = xhr.status;
//   if (status == 200) {
//   resolve(xhr.response);
//   } else {
//   reject(status);
//   }
//   };
//   xhr.send();
//   });
// };


function printContent(el) {
  var data = document.getElementById(el).innerHTML,
      popupWindow = window.open('');
      popupWindow.document.write('<HTML>\n<HEAD>\n');
      popupWindow.document.write('<TITLE></TITLE>\n');
      popupWindow.document.write('<URL></URL>\n');
      // popupWindow.document.write("<link href='https://cityofsanfernando.gov.ph/cedula/build/css/cedulalayout.css?v=1.0.11' rel='stylesheet' type='text/css' />\n");
      popupWindow.document.write("<link href='https://localhost/cedula/build/css/cedulalayout.css?v=1.0.1' rel='stylesheet' type='text/css' />\n");
      popupWindow.document.write('<script>\n');
      popupWindow.document.write('function print_win(){\n');
      popupWindow.document.write('\nwindow.print(true,1,1);\n');
      popupWindow.document.write('\nwindow.close();\n');
      popupWindow.document.write('}\n');
      popupWindow.document.write('<\/script>\n');
      popupWindow.document.write('</HEAD>\n');
      popupWindow.document.write('<BODY onload="print_win()">\n');
      popupWindow.document.write(data);
      popupWindow.document.write('</BODY>\n');
      popupWindow.document.write('</HTML>\n');
      popupWindow.document.close();
 }