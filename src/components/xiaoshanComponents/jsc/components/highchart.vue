<template>
  <div
    id="highchart3D"
    style="width:100%;height:170%;"
  ></div>
</template>

<script>
import Highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(Highcharts)

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
  },
  data() {
    return {
      colors: [
         'rgba(255,181,75,0.8)',
        // '#22D967',
        '#007cff',
       

        // "#1FEEDC",
        // "#EF609E",
        // "#FD9C57",
        // "#73ddff",
        // "#73acff",
        // "#fdd56a",
        // "#fdb36a",
        // "#fd866a",
        // "#ACF3A5"
      ],
    }
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
      Highcharts.getOptions().colors = this.colors.map(function(color) {
        return {
          radialGradient: { cx: 0.6, cy: 0.9, r: 0.9 },
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
          options3d: {
            enabled: true,
            alpha: 70,
          },
          marginBottom: 40,
          // spacingTop: 0,
          // spacingBottom: 0,
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
          // style: {
          //   fontSize: 16,
          // },
        },
        plotOptions: {
          pie: {
            innerSize: 0,
            depth: 20,
            // events: {
            //   click: function(e) {
            //     console.log("饼图点击", e.point.options);
            //     that.$emit("leftLegendClick", e.point.options);
            //   }
            // }
          },
          series: {
            dataLabels: {
              enabled: true,
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
            // data: this.dataitems.map(item => {
            //   return [item.name, item.value * 1];
            // })
            data: this.dataitems,
          },
        ],
      })
    },
  },
}
</script>

<style scoped lang="less">
#highchart3D {
  background: url('../../../../assets/img/c-base.png') no-repeat;
  background-position: 50% 60%;
  background-size: 45%;
  position: relative;
  top: -38px;
}
</style>
