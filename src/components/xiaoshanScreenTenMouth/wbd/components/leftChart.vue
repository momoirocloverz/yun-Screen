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
    color: {
      type: Array,
      default: () => ['#1F68E2', '#00E9CB', '#31B9FF', '#44DA84', '#747DF8'],
    },
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
      let option = {
        color: that.color,
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        tooltip: {
          trigger: 'item',
          borderColor: 'rgba(0,0,0,0.7)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff',
          },
        },
        series: [
          {
            name: '文物类别',
            type: 'pie',
            radius: [25, 95],
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
      mychart.on('click', function(param) {
        console.log('饼图点击', param)
        that.$emit('pieClick', param)
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
