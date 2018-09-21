$(function() {
  var d = new Date();
  var strDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
  var t0 = new Array,
    t00 = new Array,
    r = 170;;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", base_url + "dashboard/ajax_get_rhu", true);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);

      for (var i = 0; i < myArr.length; i++) {
        t0.push(myArr[i].m_name);
        r = r + 20;
      }
      for (var i = 0; i < myArr.length; i++)
        t00.push(Number(myArr[i].pcsper_set_x_qty));

      Highcharts.chart('container', {
        chart: {
          type: 'bar',
          events: {
            load: function() {
              var chart = this;
              chart.setSize(null, r, false);
            }
          }
        },
        title: {
          text: 'Current Balance'
        },
        subtitle: {
          text: 'as of ' + strDate
        },
        xAxis: {
          categories: t0,
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
        // legend: {
        //     layout: 'vertical',
        //     align: 'right',
        //     verticalAlign: 'top',
        //     x: -40,
        //     y: 80,
        //     floating: true,
        //     borderWidth: 1,
        //     backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        //     shadow: true
        // },
        credits: {
          enabled: false
        },
        series: [
          {
            name: '[PCS]',
            data: t00
          }
        ]
      });
    }
  }
  xhr.send();

  // $.getJSON(base_url + "dashboard/ajax_get_rhu", function(a) {
  //   for (i = 0; i < a.length; i++) {
  //     t0.push(a[i].m_name);
  //       r = r + 20;
  //   }
  //   for (i = 0; i < a.length; i++) t00.push(Number(a[i].pcsper_set_x_qty));
  //
  //   Highcharts.chart('container', {
  //     chart: {
  //       type: 'bar',
  //       events: {
  //         load: function() {
  //           var chart = this;
  //           chart.setSize(null, r, false);
  //         }
  //       }
  //     },
  //     title: {
  //       text: 'Current Balance'
  //     },
  //     subtitle: {
  //       text: 'as of ' + strDate
  //     },
  //     xAxis: {
  //       categories: t0,
  //       title: {
  //         text: null
  //       }
  //     },
  //     yAxis: {
  //       min: 0,
  //       title: {
  //         text: '[p c s]',
  //         align: 'high'
  //       },
  //       labels: {
  //         overflow: 'justify'
  //       }
  //     },
  //     tooltip: {
  //       valueSuffix: ' pcs'
  //     },
  //     plotOptions: {
  //       bar: {
  //         dataLabels: {
  //           enabled: true
  //         }
  //       }
  //     },
  //     // legend: {
  //     //     layout: 'vertical',
  //     //     align: 'right',
  //     //     verticalAlign: 'top',
  //     //     x: -40,
  //     //     y: 80,
  //     //     floating: true,
  //     //     borderWidth: 1,
  //     //     backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
  //     //     shadow: true
  //     // },
  //     credits: {
  //       enabled: false
  //     },
  //     series: [{
  //       name: '[PCS]',
  //       data: t00
  //     }]
  //   })
  //
  // });
});
