<template>
  <div
    ref="echartsGauge"
    style="width:100%;height:100%;"
  ></div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let mychart = this.$echarts.init(this.$refs.echartsGauge)
      let option = {
        tooltip: {
          formatter: '{a} : {c}Mpa',
        },
        series: [
          {
            name: '水压',
            type: 'gauge',
            center: ['48.5%', '50.5%'],
            detail: {
              formatter: '(Mpa)',
              color: '#fff',
              offsetCenter: [0, 180],
            },
            pointer: {
              length: '50%',
              width: 5,
              offsetCenter: [0, 0],
            },
            max: 2.5,
            axisLine: {
              lineStyle: {
                color: [[1, '#0361CA']],
                width: 3,
              },
            },
            splitLine: {
              length: 5,
              lineStyle: {
                color: '#0361CA',
                width: 3,
              },
            },
            axisTick: {
              lineStyle: {
                color: '#0361CA',
                width: 1,
              },
            },
            axisLabel: {
              color: '#fff',
            },
            data: [
              {
                value: this.chartData,
                name: '',
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

