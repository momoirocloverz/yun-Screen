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
    chartData_4: {
      type: Array,
      required: true,
    },
    chartData_5: {
      type: Array,
      required: true,
    },
    chartData_6: {
      type: Array,
      required: true,
    },
    legendText: {
      type: Array,
      default: () => [
        '巡查上报',
        '智能感知',
        '气象预警',
        '行为监测',
        '稽查督查',
        '其他',
      ],
    },
    logo: {
      type: String | Number,
      default: '',
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
      let mychart = this.$echarts.init(this.$refs.echartsRight)
      let colors = [
        '#fce149',
        '#de7f29',
        '#4ee095',
        '#42afd8',
        '#4f5ed0',
        '#9a62bd',
      ]
      let option = {
        colors: colors,
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
            {
              name: this.legendText[3],
              textStyle: { color: '#fff' },
            },
            {
              name: this.legendText[4],
              textStyle: { color: '#fff' },
            },
            {
              name: this.legendText[5],
              textStyle: { color: '#fff' },
            },
          ],
          left: 'right',
          icon: 'rect',
          itemWidth: 6,
          itemHeight: 6,
          // right: 50
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
          name: '',
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
            type: 'line',
            smooth: true,
            symbolSize: 1,
            lineStyle: {
              color: colors[0],
              width: 1,
            },
            itemStyle: {
              color: colors[0],
            },
          },
          {
            name: this.legendText[1],
            data: this.chartData_2.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbolSize: 1,
            lineStyle: {
              color: colors[1],
              width: 1,
            },
            itemStyle: {
              color: colors[1],
            },
          },
          {
            name: this.legendText[2],
            data: this.chartData_3.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbolSize: 1,
            lineStyle: {
              color: colors[2],
              width: 1,
            },
            itemStyle: {
              color: colors[2],
            },
          },
          {
            name: this.legendText[3],
            data: this.chartData_4.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbolSize: 1,
            lineStyle: {
              color: colors[3],
              width: 1,
            },
            itemStyle: {
              color: colors[3],
            },
          },
          {
            name: this.legendText[4],
            data: this.chartData_5.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbolSize: 1,
            lineStyle: {
              color: colors[4],
              width: 1,
            },
            itemStyle: {
              color: colors[4],
            },
          },
          {
            name: this.legendText[5],
            data: this.chartData_6.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbolSize: 1,
            lineStyle: {
              color: colors[5],
              width: 1,
            },
            itemStyle: {
              color: colors[5],
            },
          },
        ],
      }

      mychart.setOption(option)
      window.addEventListener('resize', () => {
        // console.log('窗口尺寸')
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

      // var index = 0; //播放所在下标
      // let length = this.chartData_1.length - 1;
      // setTimeout(() => {
      //   clearInterval(mTime);
      //   mTime = setInterval(function() {
      //     mychart.dispatchAction({
      //       type: "showTip",
      //       seriesIndex: 0,
      //       dataIndex: index
      //     });
      //     index++;
      //     if (index > length) {
      //       index = 0;
      //     }
      //   }, 5000);
      // }, 4000);
    },
  },
}
</script>

<style scoped></style>
