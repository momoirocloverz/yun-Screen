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
      let option = {
        tooltip: {
          borderColor: 'rgba(0,0,0,0.7)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff',
          },
        },
        radar: {
          // shape: 'circle',
          indicator: this.chartData.map((item) => {
            return {
              name: item.name,
              max: item.max,
            }
          }),
          // indicator: [
          //   { name: "扑救初起火灾", max: 65 },
          //   { name: "宣传培训", max: 16 },
          //   { name: "组织疏散", max: 30 },
          //   { name: "检查消除火灾隐患", max: 38 },
          //   { name: "逃生自救", max: 52 },
          //   { name: "消防报警", max: 25 }
          // ],
          radius: 60,
          startAngle: 120,
          splitNumber: 4,
          axisName: {
            color: '#8e97b7',
            fontSize: 12,
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#9fa5ad60',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#9fa5ad60',
            },
          },
        },
        series: [
          {
            name: '',
            type: 'radar',
            itemStyle: {
              color: '#44fdff',
            },
            lineStyle: {
              color: '#44fdff',
            },
            data: [
              {
                value: this.chartData.map((item) => item.num * 1),
                // value: [42, 3, 20, 35, 50, 18],
                name: '教育培训',
                areaStyle: {
                  color: '#44fdff88',
                },
              },
            ],
          },
        ],
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
