<template>
  <div
    ref="echartsRight"
    style="width:100%;height:100%;"
  ></div>
</template>

<script>
let mTime
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
    startColor: {
      type: String,
      default: 'rgba(0,0,0,0)',
    },
    middleColor: {
      type: String,
      default: '#ffea00',
    },
    endColor: {
      type: String,
      default: '#ff0e00',
    },
    backgroundColor: {
      type: String,
      default: 'rgba(0,100,255,0.15)',
    },
    maxNum: {
      type: Number,
      default: 30,
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
      const max = this.maxNum * 1 + 5
      console.log('max', max)
      let colors = [
        {
          type: 'linear',
          x: 1,
          x2: 0,
          y: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: this.endColor,
            },
            {
              offset: 0.5,
              color: this.middleColor,
            },
            {
              offset: 1,
              color: this.startColor,
            },
          ],
        },
        {
          type: 'linear',
          x: 1,
          x2: 0,
          y: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#fab9b7',
            },
            {
              offset: 1,
              color: 'rgba(124,40,37,0.1)',
            },
          ],
        },
      ]
      let mychart = this.$echarts.init(this.$refs.echartsRight)
      let barWidth = 10
      let option = {
        color: this.color,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          backgroundColor:'rgba(0,0,0,0.7)'
        },
        grid: {
          left: '3%',
          right: '9%',
          bottom: '3%',
          top: '5%',
          containLabel: true,
        },
        xAxis: [
          {
            show: false,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
            },
            axisLabel: {
              color: '#fff',
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#fff',
              },
            },
          },
        ],
        yAxis: [
          {
            name: '次数',
            type: 'category',
            data: this.chartData.map((item) => item.name),
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
            },
            axisLabel: {
              color: '#fff',
              fontSize: 16,
              interval: 0,
            },
          },
        ],
        series: [
          {
            name: '次数',
            type: 'bar',
            barWidth: barWidth,
            showBackground: true,
            data: this.chartData.map((item) => item.value * 1),
            z: 2,
            color: colors[0],
            labelLine: {
              show: false,
            },
            // label: {
            //   show: true,
            //   position: 'right',
            //   fontSize: 16,
            //   color: '#f55c57',
            //   fontWeight: 'bold',
            // },
            itemStyle: {
              borderColor: colors[1],
              borderWidth: 0,
            },
          },
          {
            //分隔
            type: 'pictorialBar',
            itemStyle: {
              color: '#011A36',
            },
            symbolRepeat: 'fixed',
            symbolMargin: 4,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [4, barWidth],
            symbolPosition: 'start',
            symbolOffset: [8, 0],
            data: this.chartData.map((item) => max),
            z: 3,
            animationEasing: 'elasticOut',
            tooltip: {
              show: false,
            },
          },
          {
            // 背景
            type: 'pictorialBar',
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '0',
            symbol: 'roundRect',
            symbolSize: [6, barWidth],
            itemStyle: {
              normal: {
                color: this.backgroundColor,
              },
            },
            data: this.chartData.map((item) => max),
            z: 0,
            animationEasing: 'elasticOut',
            tooltip: {
              show: false,
            },
          },
        ],
      }
      mychart.on('click', (params) => {
        this.$emit('barClick', params)
      })
      mychart.setOption(option)
      window.addEventListener('resize', () => {
        mychart.resize()
      })
      var index = 0 //播放所在下标
      let length = this.chartData.length - 1
      setTimeout(() => {
        clearInterval(mTime)
        mTime = setInterval(function() {
          mychart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index,
          })
          index++
          if (index > length) {
            index = 0
          }
        }, 5000)
      }, 4500)
    },
  },
}
</script>

<style scoped></style>
