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
      required: true,
      default: '',
    },
    color: {
      type: Array,
      default: () => [
        '#FF7E2E',
        '#F4C600',
        '#1EDFFF',
        '#50A6DF',
        '#BCD8FF',
        '#1671F6',
        '#F2BB23',
      ],
    },
  },
  data() {
    return {}
  },
  watch: {
    logo() {
      this.legendData = this.chartData.map((item) => {
        return `${item.name}:${item.num}`
      })
      this.initchart()
    },
  },
  mounted() {
    this.legendData = this.chartData.map((item) => {
      return `${item.name}:${item.num}`
    })
    this.initchart()
  },
  methods: {
    initchart() {
      let mychart = this.$echarts.init(this.$refs.echartsPie)
      let option = {
        color: this.color,
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
          backgroundColor:'rgba(0,0,0,0.7)'
        },
        grid: {
          left: '3%',
          right: '9%',
          bottom: '3%',
          top: '5%',
          containLabel: true,
        },
        // legend: {
        //   orient: 'vertical',
        //   right: 60,
        //   top: 20,
        //   bottom: 20,
        //   data: this.legendData.map((item) => {
        //     console.log('123',item)
        //     return {
        //       name: item,
        //       icon: 'rect',
        //       textStyle: {
        //         color: '#fff',
        //       },
        //     }
        //   }),
        // },
        series: [
          {
            name: '文物隐患占比',
            type: 'pie',
            radius: '85%',
            center: ['30%', '50%'],
            data: this.chartData.map((item) => {
              item.value = item.num * 1
              return item
            }),
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
