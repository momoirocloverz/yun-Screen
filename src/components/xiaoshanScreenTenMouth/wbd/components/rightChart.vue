<template>
  <div
    ref="echartsPie"
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
      default: '',
    },
  },
  data() {
    return {
      color: [
        '#FF7E2E',
        '#F4C600',
        '#1EDFFF',
        '#50A6DF',
        '#BCD8FF',

        '#1671F6',
        '#F2BB23',
        '#1FEEDC',
        '#EF609E',
        '#FD9C57',
        '#73ddff',
        '#73acff',
        '#fdd56a',
        '#fdb36a',
        '#fd866a',
        '#ACF3A5',
      ],
    }
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
      let mychart = this.$echarts.init(this.$refs.echartsPie)
      let option = {
        color: this.color,
        // title: {
        //   text: ["{a|资金}", "{b|来源}"].join("\n"),
        //   left: "35%",
        //   top: "40%",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 16,
        //     fontWeight: 300,
        //     rich: {
        //       a: {
        //         fontSize: 18,
        //         fontFamily: "Microsoft YaHei",
        //         color: "#eceff4",
        //         fontWeight: 500
        //       },
        //       b: {
        //         fontSize: 18,
        //         fontFamily: "Microsoft YaHei",
        //         color: "#eceff4",
        //         fontWeight: 500
        //       }
        //     }
        //   }
        // },
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
        grid: {
          left: '3%',
          right: '9%',
          bottom: '3%',
          top: '5%',
          containLabel: true,
        },
        series: [
          {
            name: '资金来源',
            type: 'pie',
            radius: ['60%', '90%'],
            center: ['50%', '50%'],
            data: this.chartData,
            label: {
              show: false,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      mychart.on('click', (params) => {
        this.$emit('pieClick', params)
      })
      mychart.setOption(option)
      window.addEventListener('resize', () => {
        mychart.resize()
      })

      var index = 0 //播放所在下标
      let length = this.chartData.length - 1
      clearInterval(mTime)
      mTime = setInterval(function() {
        mychart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index,
        })
        index++
        // console.log('length2',length)
        if (index > length) {
          index = 0
        }
      }, 5000)
    },
  },
}
</script>

<style scoped></style>
