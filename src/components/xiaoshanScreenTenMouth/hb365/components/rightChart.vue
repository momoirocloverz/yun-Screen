<template>
  <div
    ref="echartsBar"
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
    logo: {
      type: String | Number,
      required: true,
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
      let mychart = this.$echarts.init(this.$refs.echartsBar)
      let option = {
        color: ['#ec6769', '#f9c762', '#93ca78'],
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
        legend: {
          textStyle: { color: '#858eb4' },
          right: 30,
          icon: 'rect',
          itemWidth: 10,
          itemHeight: 10,
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: this.chartData_1.map((item) => item.name),
          // data: [
          //   "进化镇",
          //   "益农镇",
          //   "瓜沥镇",
          //   "南阳街道",
          //   "新塘街道",
          //   "楼塔镇"
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
        yAxis: {
          type: 'value',
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
            name: '未达标',
            stack: 'xx',
            barWidth: 10,
            data: this.chartData_1.map((item) => item.num),
            // data: [12, 20, 15, 8, 7, 11],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(56,81,150, 0.2)',
            },
          },
          {
            name: '合格',
            stack: 'xx',
            data: this.chartData_2.map((item) => item.num),
            // data: [12, 20, 15, 8, 7, 11],
            type: 'bar',
          },
          {
            name: '优秀',
            stack: 'xx',
            data: this.chartData_3.map((item) => item.num),
            // data: [12, 20, 15, 8, 7, 11],
            type: 'bar',
          },
        ],
      }
      mychart.on('click', (params) => {
        this.$emit('pieClick', params)
      })
      mychart.setOption(option)
      window.addEventListener('resize', () => {
        mychart.resize()
      })

      // var index = 0; //播放所在下标
      // let length = this.chartData.length - 1;
      // clearInterval(mTime);
      // mTime = setInterval(function() {
      //   mychart.dispatchAction({
      //     type: "showTip",
      //     seriesIndex: 0,
      //     dataIndex: index
      //   });
      //   index++;
      //   // console.log('length2',length)
      //   if (index > length) {
      //     index = 0;
      //   }
      // }, 5000);

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
