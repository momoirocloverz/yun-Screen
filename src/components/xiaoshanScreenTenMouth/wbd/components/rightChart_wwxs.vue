<template>
  <div
    class="gauge"
    ref="echartsGauge"
    style="width:100%;height:100%;"
  ></div>
</template>

<script>
export default {
  props: {
    chartData: {
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
      let mychart = this.$echarts.init(this.$refs.echartsGauge)
      let option = {
        color: ['#3bbfe5', '#f5a75a', '#5af5a7'],
        tooltip: {
          trigger: 'item',
          formatter: `{a}<br/>
                    {b}: {c}个`,
          borderColor: 'rgba(0,0,0,0.7)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff',
          },
        },
        series: [
          {
            name: '文物修缮',
            type: 'pie',
            radius: ['70%', '90%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              show: false,
            },
            data: this.chartData.map((item) => {
              return {
                name: item.name,
                value: item.num * 1,
              }
            }),
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

<style lang="less" scoped>
.gauge {
  position: relative;
}
</style>
