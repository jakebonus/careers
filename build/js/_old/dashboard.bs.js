$(function() {
  var d = new Date();
  var strDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();

  function getAjax(url, graph_id, grap_title) {
    var r5 = new Array,
      r55 = new Array,
      r5h = 170;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);

        for (i = 0; i < myArr.length; i++) {
          r5.push(myArr[i].m_name);
          r5h = r5h + 20;
        }
        for (i = 0; i < myArr.length; i++)
          r55.push(Number(myArr[i].pcsper_set_x_qty));

        Highcharts.chart(graph_id, {
          chart: {
            type: 'bar',
            events: {
              load: function() {
                var chart = this;
                chart.setSize(null, r5h, false);
              }
            }
          },
          title: {
            text: grap_title
          },
          subtitle: {
            text: 'as of ' + strDate
          },
          xAxis: {
            categories: r5,
            title: {
              text: null
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: '[p c s]',
              align: 'high'
            },
            labels: {
              overflow: 'justify'
            }
          },
          tooltip: {
            valueSuffix: ' pcs'
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true
              }
            }
          },
          credits: {
            enabled: false
          },
          series: [
            {
              name: '[PCS]',
              data: r55
            }
          ]
        });

      }
    }
    xhr.send();

  }

  getAjax(base_url + "dashboard/ajax_get_rhu/?location=BS%205%20-%20SAN%20AGUSTIN", 'graph_bs5', 'BS 5 - SAN AGUSTIN - Current Balance');
  getAjax(base_url + "dashboard/ajax_get_rhu/?location=BS%204%20-%20SAN%20NICOLAS", 'graph_bs4', 'BS 4 - SAN NICOLAS - Current Balance');
  getAjax(base_url + "dashboard/ajax_get_rhu/?location=BS%203%20-%20SAN%20JOSE", 'graph_bs3', 'BS 3 - SAN JOSE - Current Balance');
  getAjax(base_url + "dashboard/ajax_get_rhu/?location=BS%202%20-%20NORTHVILLE", 'graph_bs2', 'BS 2 - NORTHVILLE - Current Balance');
  getAjax(base_url + "dashboard/ajax_get_rhu/?location=BS%201%20-%20SINDALAN", 'graph_bs1', 'BS 1 - SINDALAN - Current Balance');

  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    $('#graph_bs5').highcharts().reflow();
    $('#graph_bs4').highcharts().reflow();
    $('#graph_bs3').highcharts().reflow();
    $('#graph_bs2').highcharts().reflow();
    $('#graph_bs1').highcharts().reflow();
  });
});



// var oReq = new XMLHttpRequest();
// oReq.open("GET", "https://cityofsanfernando.gov.ph/hris/employee/ajax_get_account", true);
// oReq.onloadstart = function () { notify('Processing', 'Please wait..', 'info', 9999999); };
// oReq.onload  = function () { $('.alert-info .glyphicon-remove').trigger("click"); };
// oReq.onerror = function () { console.log("** An error occurred during the transaction"); };
// oReq.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var myarr = JSON.parse(this.responseText);
//   console.log(myarr);
//   }
// }
// oReq.send();
