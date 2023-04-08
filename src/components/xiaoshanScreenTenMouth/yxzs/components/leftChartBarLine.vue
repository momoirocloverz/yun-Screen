<template>
  <div
    class="chart"
    ref="chartBarLine"
    style="width:100%;height:100%;"
  ></div>
</template>

<script>
let mTime2
export default {
  props: {
    chartData_1: {
      type: Array,
      default: () => [],
    },
    chartData_2: {
      type: Array,
      default: () => [],
    },
    chartData_3: {
      type: Array,
      default: () => [],
    },
    logo: String,
  },
  data() {
    return {}
  },
  watch: {
    logo() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let mychart = this.$echarts.init(this.$refs.chartBarLine)
      let colors = [
        {
          type: 'linear',
          x: 0,
          x2: 0,
          y: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0,0,0,0)',
            },
            {
              offset: 1,
              color: '#9cfff9',
            },
          ],
        },
        {
          type: 'linear',
          x: 0,
          x2: 0,
          y: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0,0,0,0)',
            },
            {
              offset: 1,
              color: '#3fa7ff',
            },
          ],
        },
      ]

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: `{b}<br/>
                    {a0}: {c0}%<br/>
                    {a1}: {c1}次<br/>
                    {a2}: {c2}次`,
          borderColor: 'rgba(0,0,0,0.7)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff',
          },
          confine: true,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '20%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: this.chartData_1.map((item) => item.name),
          // data: [
          //   "瓜沥镇",
          //   "进化镇",
          //   "楼塔镇",
          //   "南阳街道",
          //   "北干街道",
          //   "河上镇",
          //   "浦阳镇"
          // ],
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#7e97ac',
            },
          },
          axisLabel: {
            color: '#a8b0d0',
            fontSize: 14,
            interval: 0,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#4E83B0',
              opacity: 0.3,
            },
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '',
            splitNumber: 4,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#7e97ac',
              },
            },
            axisLabel: {
              color: '#a8b0d0',
              fontSize: 12,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#4E83B0',
                opacity: 0.3,
                type: 'dashed',
              },
            },
          },
          {
            type: 'value',
            name: '',
            splitNumber: 4,
            axisLabel: {
              formatter: '{value} %',
              color: '#a8b0d0',
              fontSize: 12,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#7e97ac',
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#4E83B0',
                opacity: 0.3,
              },
            },
          },
        ],
        legend: {
          data: [
            {
              name: '同比涨跌率',
              textStyle: { color: '#858eb4' },
              itemStyle: {
                color: '#FEF284',
              },
            },
            {
              name: '本月',
              textStyle: { color: '#858eb4' },
              itemStyle: {
                color: '#9cfff9',
              },
            },
            {
              name: '上月',
              textStyle: { color: '#858eb4' },
              itemStyle: {
                color: '#3fa7ff',
              },
            },
          ],
          right: 30,
          icon: 'rect',
          itemWidth: 10,
          itemHeight: 10,
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
            name: '同比涨跌率',
            data: this.chartData_3.map((item) => item.value),
            // data: [2, 6, 8, 3, 5, 9, 6],
            type: 'line',
            yAxisIndex: 1,
            showSymbol: false,
            lineStyle: {
              color: '#FEF284',
              width: 3,
            },
          },
          {
            name: '本月',
            data: this.chartData_1.map((item) => item.value),
            // data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barWidth: 10,
            color: colors[0],
          },
          {
            name: '上月',
            data: this.chartData_2.map((item) => item.value),
            // data: [130, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barWidth: 10,
            color: colors[1],
          },
        ],
      }

      mychart.setOption(option)
      window.addEventListener('resize', () => {
        mychart.resize()
      })

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

<style lang="less" scoped>
.chart {
  position: relative;
  // top: -10px;
}
</style>
