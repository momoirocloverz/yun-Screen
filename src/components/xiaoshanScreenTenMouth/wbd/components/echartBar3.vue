<template>
  <div
    ref="echartsRight"
    style="width:100%;height:100%;"
  ></div>
</template>

<script>
let mTime
let mTime2
export default {
  props: {
    chartData_1: {
      type: Array,
      required: true,
    },
    chartData_2: {
      type: Array,
      required: true,
    },
    chartData_3: {
      type: Array,
      required: true,
    },
    legendText: {
      type: Array,
      // default: () => ["高风险", "中风险", "低风险"]
      default: () => ['国保', '省保', '市保'],
    },
    logo: {
      type: String | Number,
      required: true,
      default: '',
    },
    firstColor: {
      type: String,
      default: '#39c3ae',
    },
    secondColor: {
      type: String,
      default: '#3b6efe',
    },
    thirdColor: {
      type: String,
      default: '#ffcc00',
    },
  },
  data() {
    return {}
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
              color: this.firstColor,
            },
            {
              offset: 1,
              color: 'rgba(57,195,174,0.2)',
              // color: "rgba(0,0,0,0.6)"
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
              color: this.secondColor,
            },
            {
              offset: 1,
              color: 'rgba(59,110,254,0.2)',
              // color: "rgba(0,0,0,0.6)"
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
              color: this.thirdColor,
            },
            {
              offset: 1,
              color: 'rgba(255,204,0,0.2)',
              // color: "rgba(0,0,0,0.6)"
            },
          ],
        },
      ]
      let mychart = this.$echarts.init(this.$refs.echartsRight)
      let option = {
        colors: this.color,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          borderColor: 'rgba(0,0,0,0.7)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff',
          },
        },
        grid: {
          left: '1%',
          right: '5%',
          bottom: '3%',
          top: '18%',
          containLabel: true,
        },
        legend: {
          data: [
            {
              name: this.legendText[0],
              textStyle: { color: '#fff' },
            },
            {
              name: this.legendText[1],
              textStyle: { color: '#fff' },
            },
            {
              name: this.legendText[2],
              textStyle: { color: '#fff' },
            },
          ],
          left: 'right',
          icon: 'rect',
          itemWidth: 10,
          itemHeight: 10,
          top: 10,
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: this.chartData_1.map((item) => item.name),
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.6)',
            },
          },
          axisLabel: {
            color: '#858fb4',
            fontSize: 14,
            interval: 0,
          },
        },
        yAxis: {
          name: '数量/个',
          type: 'value',
          splitNumber: 3,
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.6)',
            },
          },
          axisLabel: {
            color: '#858fb4',
            fontSize: 14,
          },
          splitLine: {
            lineStyle: {
              color: '#4E83B0',
              opacity: 0.3,
            },
          },
        },
        dataZoom: [
          {
            xAxisIndex: 0, //这里是从X轴的0刻度开始
            show: false, //是否显示滑动条，不影响使用
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 5, // 一次性展示5个。
          },
        ],
        series: [
          {
            name: this.legendText[0],
            data: this.chartData_1.map((item) => item.value),
            barWidth: 8,
            showBackground: true,
            type: 'bar',
            itemStyle: {
              color: colors[0],
            },
          },
          {
            name: this.legendText[1],
            data: this.chartData_2.map((item) => item.value),
            barWidth: 8,
            showBackground: true,
            type: 'bar',
            itemStyle: {
              color: colors[1],
            },
          },
          {
            name: this.legendText[2],
            data: this.chartData_3.map((item) => item.value),
            barWidth: 8,
            showBackground: true,
            type: 'bar',
            itemStyle: {
              color: colors[2],
            },
          },
        ],
      }

      mychart.setOption(option)
      window.addEventListener('resize', () => {
        // console.log('窗口尺寸')
        mychart.resize()
      })

      var index = 0 //播放所在下标
      let length = this.chartData_1.length - 1
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
      }, 4000)

      clearInterval(mTime2)
      mTime2 = setInterval(function() {
        if (option.dataZoom[0].endValue == option.series[0].data.length) {
          option.dataZoom[0].endValue = 5
          option.dataZoom[0].startValue = 0
        } else {
          option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1
          option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1
        }
        mychart.setOption(option)
      }, 4000)
    },
  },
}
</script>

<style scoped></style>
