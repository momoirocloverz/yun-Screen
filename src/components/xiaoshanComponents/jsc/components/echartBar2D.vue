<template>
  <div
    ref="echartsRight"
    style="width:100%;height:100%;"
  ></div>
</template>

<script>
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
    startColor: {
      type: String,
      default: 'rgba(0,0,0,0)',
    },
    endColor: {
      type: String,
      default: '#037BDE',
    },
    backgroundColor: {
      type: String,
      default: 'rgba(0,100,255,0.15)',
    },
  },
  data() {
    return {
      legendData: [],
      color: [
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
      let colors = [
        {
          type: 'linear',
          x: 1,
          x2: 0,
          y: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: this.endColor,
            },
            {
              offset: 1,
              color: this.startColor,
            },
          ],
        },
      ]
      let mychart = this.$echarts.init(this.$refs.echartsRight)
      let barWidth = 7
      let option = {
        color: this.color,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '5%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#4E83B0',
              },
            },
            axisLabel: {
              color: '#5995C7',
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#4E83B0',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'category',
            data: this.chartData.map((item) => item.name),
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: '#4E83B0',
              },
            },
            axisLabel: {
              color: '#5995C7',
              fontSize: 16,
              interval: 0,
            },
          },
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: barWidth,
            showBackground: true,
            data: this.chartData.map((item) => item.value),
            color: colors[0],
            backgroundStyle: {
              color: this.backgroundColor,
            },
            labelLine: {
              show: false,
            },
          },
        ],
      }

      mychart.setOption(option)
      window.addEventListener('resize', () => {
        // console.log('窗口尺寸')
        mychart.resize()
      })

      var index = 0; //播放所在下标
      let length = this.chartData.length-1
      setTimeout(()=>{
        var mTime = setInterval(function() {
          mychart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          });
          index++;
          if(index > length) {
            index = 0;
          }
        }, 5000)
      },2500)
			

    },
  },
}
</script>

<style scoped></style>
