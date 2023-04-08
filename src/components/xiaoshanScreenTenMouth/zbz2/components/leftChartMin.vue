<template>
  <div
    class="gauge"
    ref="echartsGauge"
    style="width:100%;height:150%;"
  ></div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: [Number,String],
      default: 0,
    },
    title: {
      type: String,
      default: '事件完成统计',
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
      let that = this
      let mychart = this.$echarts.init(this.$refs.echartsGauge)
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
              color: '#29A4DD',
            },
            {
              offset: 1,
              color: '#52EDFF',
            },
          ],
        },
      ]
      let option = {
        series: [
          {
            type: 'gauge',
            min: 0,
            center: ['50%', '40%'],
            progress: {
              show: true,
              overlap: false,
              clip: false,
            },
            axisLine: {
              lineStyle: {
                width: 3,
                color: [[1, 'rgba(104,115,188,0.2)']],
              },
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: that.chartData * 1,
                name: '水压实时监测',
                title: {
                  show: false,
                },
                itemStyle: {
                  color: color[0],
                },
              },
            ],
          },
        ],
      }

      mychart.setOption(option)
      window.addEventListener('resize', () => {
        mychart.resize()
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
