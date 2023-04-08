<template>
  <div
    class="pie"
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
        color: ['#1F68E2', '#00E9CB', '#31B9FF', '#44DA84', '#747DF8'],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
          borderColor: 'rgba(0,0,0,0.7)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff',
          },
        },
        series: [
          {
            name: '巡查发现',
            type: 'pie',
            radius: [15, 65],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 0,
            },
            label: {
              show: false,
              formatter: [`{a|{b}}`, `{b|{d}%}`].join('\n'),
              rich: {
                a: {
                  color: '#a8b0d0',
                  fontSize: 14,
                },
                b: {
                  color: '#fff',
                  height: 20,
                  fontSize: 14,
                },
              },
            },
            data: this.chartData,
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
.pie {
  position: relative;
}
</style>
