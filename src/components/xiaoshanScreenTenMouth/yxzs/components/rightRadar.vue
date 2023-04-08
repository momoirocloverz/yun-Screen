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
          confine: true,
        },
        radar: {
          // shape: 'circle',
          indicator: this.chartData.map((item) => {
            return {
              name: item.name,
              max: item.max,
            }
          }),

          radius: 60,
          startAngle: 120,
          splitNumber: 4,
          axisName: {
            color: '#8e97b7',
            fontSize: 12,
            formatter: function(value, indicator) {
              if (value.length > 4) {
                if (value.length == 6) {
                  let str1 = value.substr(0, 3)
                  let str2 = value.substr(3)
                  return [str1, str2].join('\n')
                } else {
                  let str1 = value.substr(0, 4)
                  let str2 = value.substr(4)
                  return [str1, str2].join('\n')
                }
              } else {
                return value
              }
            },
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
            symbolSize: 2,
            itemStyle: {
              color: '#ffac28',
            },
            lineStyle: {
              color: '#ffac28',
            },
            data: [
              {
                value: this.chartData.map((item) => item.num * 1),
                // value: [42, 3, 20, 35, 50, 18],
                name: '火灾隐患',
                areaStyle: {
                  color: '#ffac2888',
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
