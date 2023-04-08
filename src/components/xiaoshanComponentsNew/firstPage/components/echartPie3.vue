<template>
  <div
    class="box-pie"
    style="width:100%;height:100%;position:relative;"
  >
    <div
      ref="echartsPie"
      style="width:100%;height:100%;"
    ></div>
    <div
      ref="echartsPie2"
      style="width:100%;height:100%;position:absolute;top:0;left:0;"
    ></div>
  </div>

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
      this.initchart2()
    },
  },
  mounted() {
    this.legendData = this.chartData.map((item) => {
      return `${item.name}:${item.num}`
    })
    this.initchart()
    this.initchart2()
  },
  methods: {
    initchart() {
      let mychart = this.$echarts.init(this.$refs.echartsPie)
      let option = {
        color: ['rgba(15,58,90,0.9)'],
        // tooltip: {
        //   trigger: 'item',
        //   axisPointer: {
        //     type: 'shadow',
        //   },
        // },
        grid: {
          left: '3%',
          right: '9%',
          bottom: '3%',
          top: '5%',
          containLabel: true,
        },
        series: [
          {
            name: '文物智治',
            type: 'pie',
            radius: ['90%', '50%'],
            center: ['40%', '50%'],
            itemStyle: {
              borderRadius: 100,
              borderColor: '#011835',
              borderWidth: 5,
            },
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
    initchart2() {
      let mychart = this.$echarts.init(this.$refs.echartsPie2)
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
        series: [
          {
            name: '文物智治',
            type: 'pie',
            radius: ['90%', '70%'],
            center: ['40%', '50%'],
            itemStyle: {
              borderRadius: 100,
              borderColor: '#011835',
              borderWidth: 5,
            },
            data: this.chartData.map((item) => {
              item.value = item.num * 1
              return item
            }),
            label: {
              show: false,
            },
            // emphasis: {
            //   itemStyle: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)',
            //   },
            // },
          },
        ],
      }
      // mychart.on('click', (params) => {
      //   this.$emit('pieClick', params)
      // })
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
      }, 3000)
    },
  },
}
</script>

<style scoped></style>
