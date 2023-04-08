<template>
  <div
    ref="echartsRight"
    style="width:100%;height:100%;"
  ></div>
</template>

<script>
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
  },
  methods: {
    initchart() {
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
        },
        grid: {
          left: '3%',
          right: '9%',
          bottom: '3%',
          top: '18%',
          containLabel: true,
        },
        legend: {
          data: [
            {
              name: this.legendText[0],
              textStyle: { color: this.firstColor },
            },
            {
              name: this.legendText[1],
              textStyle: { color: this.secondColor },
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
              color: '#4E83B0',
            },
          },
          axisLabel: {
            color: '#5995C7',
            fontSize: 16,
            interval: 0,
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#4E83B0',
            },
          },
          axisLabel: {
            color: '#4E83B0',
          },
          splitLine: {
            lineStyle: {
              color: '#4E83B0',
              opacity: 0.3,
            },
          },
        },
        series: [
          {
            name: this.legendText[0],
            data: this.chartData_1.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            color: this.firstColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.9,
              color: colors[0],
            },
            lineStyle: {
              color: this.firstColor,
            },
            itemStyle: {
              color: this.firstColor,
            },
          },
          {
            name: this.legendText[1],
            data: this.chartData_2.map((item) => item.value),
            type: 'line',
            smooth: true,
            symbol: 'circle',
            color: this.secondColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.8,
              color: colors[1],
            },
            lineStyle: {
              color: this.secondColor,
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

      var index = 0; //播放所在下标
      let length = this.chartData_1.length-1
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
      },2000)
			

    },
  },
}
</script>

<style scoped></style>
