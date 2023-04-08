<template>
  <div
    id="highchart3D"
    style="width:100%;height:100%;"
  ></div>
</template>

<script>
import Highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(Highcharts)

let mytime

export default {
  props: {
    dataitems: {
      type: Array,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
      default: () => [
        '#FF7E2E',
        '#F4C600',
        '#1EDFFF',
        '#50A6DF',
        '#BCD8FF',
        '#1671F6',
        '#F2BB23',
      ],
    },
  },
  data() {
    return {}
  },
  watch: {
    logo() {
      this.initChart()
    },
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      // 创建渐变色
      Highcharts.getOptions().colors = Highcharts.map(this.colors, function(
        color
      ) {
        return {
          radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
          stops: [
            [0, color],
            [
              1,
              Highcharts.Color(color)
                .brighten(-0.1)
                .get('rgb'),
            ], // darken
          ],
        }
      })
      let that = this
      var chart = Highcharts.chart('highchart3D', {
        chart: {
          type: 'pie',
          backgroundColor: 'rgba(0,0,0,0)',
          // marginBottom: 90,
        },
        // colors: this.colors,
        credits: {
          enabled: false, //不显示右下角官网链接
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        tooltip: {
          headerFormat: `<div style='font-size:0.083rem;'>{point.key}</div><br/>`,
          backgroundColor:'rgba(0,0,0,0.7)',
          borderColor:'rgba(0,0,0,0.7)',
          style:{
            color:'#fff'
          }
        },
        plotOptions: {
          pie: {
            innerSize: 60,
            // depth: 40,
            borderColor:'#12335C',
            // events: {
            //   click: function(e) {
            //     console.log("饼图点击", e.point.options);
            //     that.$emit("leftLegendClick", e.point.options);
            //   }
            // }
          },
          series: {
            dataLabels: {
              enabled: false,
              softConnector: false,
              // 设置标签
              color: '#96d3ff',
              // padding: 0,
              style: {
                fontFamily: 'SourceHanSansCN-Regular',
                fontSize: 15,
                textOutline: 'none', //去除文字描边
              },
            },
            // linecap: 'butt',
          },
        },
        series: [
          {
            name: '数量',
            data: this.dataitems.map((item) => {
              return {
                name: item.name,
                y: item.num * 1,
                // sliced: true,
                // selected: true,
              }
            }),
            // data: this.dataitems,
          },
        ],
      })
      this.loop(chart)
    },
    // 循环
    loop(chart) {
      let activePoint = 0
      clearInterval(mytime)
      mytime=setInterval(function() {
        if (activePoint === chart.series[0].data.length) {
          activePoint = 0
        }
        chart.tooltip.refresh([chart.series[0].data[activePoint]])
        activePoint++
      }, 3000)
    },
  },
}
</script>

<style scoped lang="less">
#highchart3D {
  background: url('../../../../assets/img3/base.png') no-repeat;
  background-position: 49% 90%;
  background-size: 60%;
}
</style>
