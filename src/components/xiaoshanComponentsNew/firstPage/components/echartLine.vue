<template>
  <div
    id="echartsRight"
    ref="echartsRight"
    style="width:100%;height:100%;"
  ></div>
</template>

<script>
let mTime
let mTime2
export default {
  props: {
    chartData_1: {
      type: Array,
      required: true,
    },
    chartData_2: {
      type: Array,
      required: true,
    },
    legendText: {
      type: Array,
      default: () => ['市级以上文保单位（点）', '国保博物馆'],
    },
    logo: {
      type: String | Number,
      required: true,
      default: '',
    },
    firstColor: {
      type: String,
      default: '#0291FF',
    },
    secondColor: {
      type: String,
      default: '#F88C41',
    },
  },
  data() {
    return {
      legendData: [],
      color: [
        '#F88C41',
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
    document.getElementById('echartsRight').addEventListener('mouseover', (e) =>{
      clearInterval(mTime2)
      clearInterval(mTime)
    })
  },
  methods: {
    initchart() {
      let that = this
      let colors = [
        {
          type: 'linear',
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: this.firstColor,
            },
            {
              offset: 1,
              color: 'rgba(0,0,0,0)',
            },
          ],
        },
        {
          type: 'linear',
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: this.secondColor,
            },
            {
              offset: 1,
              color: 'rgba(0,0,0,0)',
            },
          ],
        },
      ]
      let mychart = this.$echarts.init(this.$refs.echartsRight)
      let option = {
        colors: this.color,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          backgroundColor:'rgba(0,0,0,0.7)'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '18%',
          containLabel: true,
        },
        legend: {
          data: [
            {
              name: this.legendText[0],
              textStyle: { color: '#fff' },
            },
            {
              name: this.legendText[1],
              textStyle: { color: '#fff' },
            },
          ],
          left: 'right',
          icon: 'circle',
          itemWidth: 10,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chartData_1.map((item) => item.name),
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.6)',
            },
          },
          axisLabel: {
            color: '#fff',
            fontSize: 12,
            // interval: 0,
          },
        },
        yAxis: {
          type: 'value',
          splitNumber: 3,
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.6)',
            },
          },
          axisLabel: {
            color: '#fff',
            fontSize: 12,
          },
          splitLine: {
            lineStyle: {
              color: '#4E83B0',
              opacity: 0.3,
            },
          },
        },
        dataZoom: [
          {
            xAxisIndex: 0, //这里是从X轴的0刻度开始
            show: false, //是否显示滑动条，不影响使用
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 5, // 一次性展示5个。
          },
        ],
        series: [
          {
            name: this.legendText[0],
            data: this.chartData_1.map((item) => item.value),
            type: 'line',
            smooth: true,
            // symbol: 'circle',
            symbol: 'image://http://223.65.209.139:8888/wswl-newscreen/static/images/culturalSave/dot1.png',
            symbolSize:18,
            color: this.firstColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.3,
              color: colors[0],
            },
            lineStyle: {
              color: this.firstColor,
              width: 3,
            },
            itemStyle: {
              color: this.firstColor,
            },
          },
          {
            name: this.legendText[1],
            data: this.chartData_2.map((item) => item.value),
            type: 'line',
            smooth: false,
            symbol: 'image://http://223.65.209.139:8888/wswl-newscreen/static/images/culturalSave/dot2.png',
            symbolSize:18,
            color: this.secondColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.3,
              color: colors[1],
            },
            lineStyle: {
              color: this.secondColor,
              width: 3,
            },
            itemStyle: {
              color: this.secondColor,
            },
          },
        ],
      }

      mychart.setOption(option)
      window.addEventListener('resize', () => {
        // console.log('窗口尺寸')
        mychart.resize()
      })

      clearInterval(mTime2)
      mTime2 = setInterval(function () {
        if (option.dataZoom[0].endValue == option.series[0].data.length) {
          option.dataZoom[0].endValue = 5;
          option.dataZoom[0].startValue = 0;
        } else {
          option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
          option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
        }
        mychart.setOption(option);
      }, 2000);

      var index = 0 //播放所在下标
      var length = this.chartData_1.length - 1
      // setTimeout(() => {
        clearInterval(mTime)
        mTime = setInterval(function() {
          mychart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index,
          })
          index++
          if (index > length) {
            index = 0
          }
        }, 2000)
      // }, 2000)

      document.getElementById('echartsRight').addEventListener('mouseleave', (e) =>{
        clearInterval(mTime2)
        mTime2 = setInterval(function () {
          if (option.dataZoom[0].endValue == option.series[0].data.length) {
            option.dataZoom[0].endValue = 5;
            option.dataZoom[0].startValue = 0;
          } else {
            option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
            option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
          }
          mychart.setOption(option);
        }, 2000);
        // mTime = setInterval(function() {
        //   mychart.dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: index,
        //   })
        //   index++
        //   if (index > length) {
        //     index = 0
        //   }
        // }, 2000)
      })

      mychart.on('click',  function(param) {
          console.log('折线图点击',param)
          that.$emit('clickLine',param)
      });  
    },
  },
}
</script>

<style scoped></style>
