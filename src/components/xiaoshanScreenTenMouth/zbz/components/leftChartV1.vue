<template>
  <div
    class="gauge"
    ref="echartsGauge"
    style="width:100%;height:210%;"
  ></div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: [Number, String],
      default: 50,
    },
    title: {
      type: String,
      default: '水压实时监测(Mpa)',
    },
    color: {
      type: String,
      default: '#fff',
    },
    logo: String,
    max: {
      type: Number,
      default: 100,
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
        series: [
          {
            name: 'gauge',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: that.max,
            splitNumber: 1,
            radius: '65%',
            center: ['50%', '38%'],
            progress: {
              show: true,
              overlap: false,
              clip: false,
            },
            axisLine: {
              lineStyle: {
                width: 20,
                color: [[1, 'rgba(104,115,188,0.2)']],
              },
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 15,
              offsetCenter: [0, '-50%'],
              itemStyle: {
                color: that.color,
              },
            },
            axisTick: {
              splitNumber: 35,
              distance: -27,
              length: 2,
              lineStyle: {
                color: that.color,
                width: 4,
              },
            },
            splitLine: {
              show: false,
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4,
              },
            },
            axisLabel: {
              distance: that.max > 100 ? -40 : -30,
              fontSize: 14,
              color: '#A9B1D8',
            },
            detail: {
              valueAnimation: true,
              color: 'auto',
              offsetCenter: [0, '-10%'],
              formatter: function(value) {
                return `{value|${value.toFixed(0)}%}`
              },
              rich: {
                value: {
                  fontSize: 20,
                  fontWeight: 'bolder',
                  color: '#fff',
                },
                // unit: {
                //   fontSize: 15,
                //   color: "#999",
                //   padding: [10, 0, 0, 5]
                // }
              },
            },
            data: [
              {
                value: that.chartData,
                name: `— ${that.title} —`,
                title: {
                  offsetCenter: ['0%', '30%'],
                  color: '#AAB3D3',
                },
                itemStyle: {
                  color: that.color,
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

<style lang="less" scoped>
.gauge {
  position: relative;
  top: -10px;
}
</style>
