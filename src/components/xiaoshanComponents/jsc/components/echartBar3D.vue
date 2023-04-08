<template>
  <div
    ref="echartsRight"
    style="width:100%;height:100%;"
  ></div>
</template>
ghtColor
<script>
export default {
  props: {
    chartData: {
      type: Array,
      required: true,
    },
    logo: {
      type: String | Number,
      required: true,
      default: '',
    },
    rightColor: {
      type: String,
      default: '#037BDE',
    },
    leftColor: {
      type: String,
      default: 'red',
    },
    headColor: {
      type: String,
      default: '#037BDE',
    },
    endColor:{
      type: String,
      default: '#037BDE',
    },
  },
  data() {
    return {
      legendData: [],
      color: [
        '#1671F6',
        '#F2BB23',
        '#1FEEDC',
        '#EF609E',
        '#FD9C57',
        '#73ddff',
        '#73acff',
        '#fdd56a',
        '#fdb36a',
        '#fd866a',
        '#ACF3A5',
      ],
    }
  },
  watch: {
    logo() {
      this.initchart()
    },
  },
  mounted() {
    this.initchart()
  },
  methods: {
    initchart() {
    //   console.log('窗口尺寸2')
      let colors = [
        {
          type: 'linear',
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: this.rightColor,
            },
            {
              offset: 1,
              color: this.leftColor,
            },
          ],
        },
      ]
      let mychart = this.$echarts.init(this.$refs.echartsRight)
      let barWidth = 25
      let option = {
        color: this.color,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '10%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.map((item) => item.name),
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: '#4E83B0',
              },
            },
            axisLabel: {
              color: '#5995C7',
              fontSize: 16,
              interval: 0,
            },
            splitLine: {
              show:true,
              lineStyle: {
                color: '#4E83B0',
                opacity: 0.3,
              },
            }
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#4E83B0',
              },
            },
            axisLabel: {
              color: '#4E83B0',
            },
            splitLine: {
              lineStyle: {
                color: '#4E83B0',
                opacity: 0.3,
              },
            },
          },
        ],
        series: [
          {
            z: 1,
            name: '数量',
            type: 'bar',
            barWidth: barWidth,
            data: this.chartData.map((item) => item.value),
            color: colors[0],
          },
          {
            z: 4,
            name: '项目',
            type: 'pictorialBar',
            data: this.chartData.map((item) => item.value),
            symbol: 'diamond',
            symbolOffset: ['0%', '50%'],
            symbolSize: [barWidth, 10],
            itemStyle: {
              normal: {
                color: this.endColor,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            z: 6,
            name: '项目',
            type: 'pictorialBar',
            data: this.chartData.map((item) => item.value),
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: ['0%', '-50%'],
            symbolSize: [barWidth, 10],
            itemStyle: {
              normal: {
                // color: "#00A2FF"
                color: this.headColor,
              },
            },
            tooltip: {
              show: false,
            },
          },
        ],
      }

      mychart.setOption(option)
      window.addEventListener('resize', () => {
        // console.log('窗口尺寸')
        mychart.resize()
      })

      var index = 0; //播放所在下标
      let length = this.chartData.length-1
      setTimeout(()=>{
        var mTime = setInterval(function() {
          mychart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          });
          index++;
          if(index > length) {
            index = 0;
          }
        }, 5000)
      },1500)
    },
  },
}
</script>

<style scoped></style>
