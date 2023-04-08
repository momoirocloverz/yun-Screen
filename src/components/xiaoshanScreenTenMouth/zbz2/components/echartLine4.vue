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
    legendText: {
      type: Array,
      default: () => ['智能感知', '气象灾害', '设施设备', '其他预警'],
    },
    logo: {
      type: String | Number,
      default: '',
    },
    firstColor: {
      type: String,
      default: '#ee9972',
    },
    secondColor: {
      type: String,
      default: '#fbdc6d',
    },
    thirdColor: {
      type: String,
      default: '#3ddcd1',
    },
    forthColor: {
      type: String,
      default: '#46c5f4',
    },
  },
  data() {
    return {
      mTime2: null,
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
              color: 'rgba(0,0,0,0)',
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
              color: 'rgba(0,0,0,0)',
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
              color: 'rgba(0,0,0,0)',
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
              color: this.forthColor,
            },
            {
              offset: 1,
              color: 'rgba(0,0,0,0)',
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
            {
              name: this.legendText[3],
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
            // interval: 0,
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
            type: 'line',
            smooth: true,
            symbol:
              'image://http://223.65.209.139:8888/wswl-newscreen/static/images/culturalSave/dot1.png',
            symbolSize: 14,
            color: this.firstColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.3,
              color: colors[0],
            },
            lineStyle: {
              color: this.firstColor,
              width: 1,
            },
            itemStyle: {
              color: this.firstColor,
            },
          },
          {
            name: this.legendText[1],
            data: this.chartData_2.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbol:
              'image://http://223.65.209.139:8888/wswl-newscreen/static/images/culturalSave/dot1.png',
            symbolSize: 14,
            color: this.secondColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.3,
              color: colors[1],
            },
            lineStyle: {
              color: this.secondColor,
              width: 1,
            },
            itemStyle: {
              color: this.secondColor,
            },
          },
          {
            name: this.legendText[2],
            data: this.chartData_3.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbol:
              'image://http://223.65.209.139:8888/wswl-newscreen/static/images/culturalSave/dot1.png',
            symbolSize: 14,
            color: this.thirdColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.3,
              color: colors[2],
            },
            lineStyle: {
              color: this.thirdColor,
              width: 1,
            },
            itemStyle: {
              color: this.thirdColor,
            },
          },
          {
            name: this.legendText[3],
            data: this.chartData_4.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbol:
              'image://http://223.65.209.139:8888/wswl-newscreen/static/images/culturalSave/dot1.png',
            symbolSize: 14,
            color: this.forthColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.3,
              color: colors[3],
            },
            lineStyle: {
              color: this.forthColor,
              width: 1,
            },
            itemStyle: {
              color: this.forthColor,
            },
          },
        ],
      }

      mychart.setOption(option)
      window.addEventListener('resize', () => {
        // console.log('窗口尺寸')
        mychart.resize()
      })

      clearInterval(this.mTime2)
      this.mTime2 = setInterval(function() {
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
