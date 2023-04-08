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
      let color = [
        {
          type: 'linear',
          x: 0,
          x2: 0,
          y: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#FCB23C',
            },
            {
              offset: 1,
              color: '#FDAD3C',
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
              color: '#5758AD',
            },
            {
              offset: 1,
              color: '#7676DD',
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
              color: '#0d4894',
            },
            {
              offset: 1,
              color: '#39aaea',
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
          formatter: '{b}: {c}%',
          borderColor: 'rgba(0,0,0,0.7)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff',
          },
          confine: true,
        },
        polar: {
          radius: [30, '80%'],
        },
        angleAxis: {
          max: 100,
          startAngle: -90,
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        radiusAxis: {
          type: 'category',
          data: this.chartData.map((item) => item.name),
          // data: ["单位参考率", "人员参考率", "人员合格率"],
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: {
          type: 'bar',
          data: this.chartData.map((item) => item.num),
          // data: [48, 77, 68],
          coordinateSystem: 'polar',
          showBackground: true,
          backgroundStyle: {
            color: '#0d489420',
          },
          itemStyle: {
            normal: {
              color: function(params) {
                // 给出颜色组
                var colorList = color
                return colorList[params.dataIndex % colorList.length]
              },
            },
          },
          label: {
            show: false,
          },
        },
      }

      mychart.setOption(option)
      window.addEventListener('resize', () => {
        // console.log('窗口尺寸')
        mychart.resize()
      })
    },
  },
}
</script>

<style scoped></style>
