$(function() {
  $('.input-daterange').datepicker({
    todayBtn: "linked",
    format: 'yyyy-mm-dd',
  });

  function get_json(url,textid_option,textid,option){
    var html = '',
        xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myarr = JSON.parse(this.responseText);
        $(textid_option).detach();
        html +='<option value="">ALL</option>';

        if (option == 1) {
          html +='<option value="N/A">N/A</option>';
        }

        for (i = 0; i < myarr.length; i++) {
            html +="<option value='" + myarr[i].value + "'>" + myarr[i].value + "</option>";
        }
        $(textid).html(html);
        $(textid).prop("disabled", false);
      }
    }
    xhr.send();
  }

  get_json(base_url + "admin/ajax_get_tr_location", "#tr_location option", "#tr_location", 0);
  get_json(base_url + "admin/ajax_get_tr_funding", "#tr_funding option", "#tr_funding", 0);
  get_json(base_url + "admin/ajax_get_program", "#tr_program option", "#tr_program", 1);

});

function notify(title, content, type) {
  $('.form-group').removeClass('has-success');
  new PNotify({
    title: title,
    text: content,
    styling: 'bootstrap3',
    type: type,
    delay: 1500
  });
}

function printContent(el) {
  var divToPrint = document.getElementById(el);
  newWin = window.open("");
  newWin.document.write('<html><head><style>.dataTables_scrollHeadInner{width:100%!important}#report-dt,.dataTables_scrollBody,.dataTables_scrollHead{width:auto!important;height:auto!important;overflow:visible!important}table{width:100%;border-collapse:collapse}b,strong{font-weight:700}table td,table th{border:1px solid #000;text-align:left}tr.group{background-color:#f3f3f3;margin-top:10px;padding-top:10px}.img-logo{position:absolute;left:calc(50% - 220px);top:4px}.th-head{position:relative;padding:10px 0}#print-report .p_risno{position:absolute;right:6px;top:3px}#print-report p,#print-report strong{margin-bottom:0!important;line-height:1}table.dataTable.compact thead td,table.dataTable.compact thead th{padding:4px 17px 4px 4px;background-color:#526069;border:1px solid #000;color:#fff}#print-report .heading{display:block}.text-right{ text-align: right; }</style>');
  newWin.document.write('</head><body onload="window.print()">');
  newWin.document.write(divToPrint.outerHTML);
  newWin.document.write('</body>');
  newWin.document.write('</html>');
  newWin.print();
  newWin.close();
}
