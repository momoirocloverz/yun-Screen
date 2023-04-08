<template>
  <div
    ref="echartsRight"
    style="width: 1050px; height: 400px"
  ></div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    logo: {
      type: Number,
      default: 1,
    },
    unit: {
      type: String,
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
      let myChart = this.$echarts.init(this.$refs.echartsRight)
      var option
      option = {
        grid: {
          left: '1%',
          right: '4%',
          bottom: '0',
          top: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data.map((ele) => {
            return ele.date
          }),
          axisLine: {
            lineStyle: {
              color: '#96A4BA',
            },
          },
          axisLabel: {
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
          valueFormatter: (value) => value+this.unit,
          borderColor: 'rgba(0,0,0,0.7)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff',
          },
        },
        yAxis: {
          name: this.unit,
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#96A4BA',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#2D3966',
            },
          },
          axisLabel: {
            fontSize: 16,
          },
        },
        series: [
          {
            data: this.data.map((ele) => {
              return ele.value
            }),
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(43,78,146,0.8)',
                },
                {
                  offset: 1,
                  color: 'rgba(22,35,89,0.5)',
                },
              ]),
            },
            lineStyle: {
              width: 3,
              type: 'solid',
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255,255,255,0.9)',
                },
                {
                  offset: 1,
                  color: 'rgba(38,70,140,0.3)',
                },
              ]),
            },
          },
        ],
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
  },
}
</script>

<style scoped></style>
