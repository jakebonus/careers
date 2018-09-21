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

  getAjax(base_url + "dashboard/ajax_get_rhu/?location=HEMS", 'graph_hems', 'HEMS - Current Balance');
  getAjax(base_url + "dashboard/ajax_get_rhu/?location=EHSD", 'graph_ehsd', 'EHSD - Current Balance');
  getAjax(base_url + "dashboard/ajax_get_rhu/?location=SOCIAL+HYGIENE", 'graph_social', 'SOCIAL HYGIENE - Current Balance');
  getAjax(base_url + "dashboard/ajax_get_rhu/?location=ABTC", 'graph_abtc', 'ABTC - Current Balance');
  getAjax(base_url + "dashboard/ajax_get_rhu/?location=ALASAS+STORAGE", 'graph_alasas', 'ALASAS STORAGE - Current Balance');
  getAjax(base_url + "dashboard/ajax_get_rhu/?location=NORTHVILLE+STORAGE", 'graph_northville', 'NORTHVILLE STORAGE - Current Balance');
  getAjax(base_url + "dashboard/ajax_get_rhu/?location=CITY+COLLEGE", 'graph_citycollege', 'CITY COLLEGE - Current Balance');

  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    $('#graph_hems').highcharts().reflow();
    $('#graph_ehsd').highcharts().reflow();
    $('#graph_social').highcharts().reflow();
    $('#graph_abtc').highcharts().reflow();
    $('#graph_alasas').highcharts().reflow();
    $('#graph_northville').highcharts().reflow();
    $('#graph_citycollege').highcharts().reflow();
  });
});
