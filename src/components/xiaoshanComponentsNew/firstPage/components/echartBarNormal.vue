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
    endColor: {
      type: String,
      default: '#037BDE',
    },
    backgroundColor: {
      type: String,
      default: 'rgba(0,100,255,0.15)',
    },
    startColor_2: {
      type: String,
      default: 'rgba(0,0,0,0)',
    },
    endColor_2: {
      type: String,
      default: '#037BDE',
    },
    backgroundColor_2: {
      type: String,
      default: 'rgba(0,100,255,0.15)',
    },
  },
  data() {
    return {
      legendText: ['巡查次数', '上报案件'],
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
    fontSize(res) {
      let docEl = document.documentElement,
        clientWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth
      if (!clientWidth) return
      let fontSize = 100 * (clientWidth / 1920)
      return res * fontSize
    },
    initchart() {
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
              color: this.endColor_2,
            },
            {
              offset: 1,
              color: this.startColor_2,
            },
          ],
        },
        {
          type: 'linear',
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: this.endColor,
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
      let barWidth = 15
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
          left: '0.5%',
          right: '0.5%',
          bottom: '8%',
          top: '15%',
          containLabel: true,
        },
        legend: {
          data: [
            {
              name: this.legendText[0],
              icon: 'circle',
              itemWidth: 8,
              textStyle: { color: '#18a778' },
              itemStyle: {
                color: '#18a778',
              },
            },
            {
              name: this.legendText[1],
              icon: 'circle',
              itemWidth: 8,
              textStyle: { color: '#c65154' },
              itemStyle: {
                color: '#c65154',
              },
            },
          ],
          left: 'right',
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#4E83B0',
              },
            },
            axisLabel: {
              color: '#AFD7FF',
              fontSize: 14,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#4E83B0',
              },
            },
          },
        ],
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
              color: '#AFD7FF',
              fontSize: 18,
              interval: 0,
              // rotate:-5,
              verticalAlign: 'top',
            },
          },
        ],
        series: [
          {
            name: '巡查次数',
            type: 'bar',
            barWidth: barWidth,
            showBackground: true,
            data: this.chartData.map((item) => item.value),
            color: colors[0],
            backgroundStyle: {
              color: this.backgroundColor_2,
            },
            labelLine: {
              show: false,
            },
            // itemStyle: {
            //   borderColor: colors[1],
            //   borderWidth: 2
            // }
          },
          {
            name: '上报案件',
            type: 'bar',
            barWidth: barWidth,
            showBackground: true,
            data: this.chartData.map((item) => item.value2),
            color: colors[1],
            backgroundStyle: {
              color: this.backgroundColor,
            },
            labelLine: {
              show: false,
            },
            // itemStyle: {
            //   borderColor: colors[1],
            //   borderWidth: 2
            // }
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
      const length = this.chartData.length - 1
      setTimeout(() => {
        clearInterval(mTime)
        mTime = setInterval(function() {
          mychart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index,
          })
          index++
          // console.log('length',length)
          if (index > length) {
            index = 0
          }
        }, 5000)
      }, 2000)
    },
  },
}
</script>

<style scoped></style>
