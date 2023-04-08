<template>
  <div ref="echartsRight" style="width: 100%; height: 100%"></div>
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
  },
  data() {
    return {};
  },
  watch: {
    logo() {
      this.initchart();
    },
  },
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      let myChart = this.$echarts.init(this.$refs.echartsRight);
      var option;
      option = {
        grid: {
          left: '6%',
          right: '6%',
          bottom: '0',
          top: '0',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data.map((ele) => {
            return ele.date;
          }),
          axisLine: {
            lineStyle: {
              color: '#96A4BA',
            },
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
          borderColor: 'rgba(0,0,0,0.7)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff',
          },
        },
        yAxis: {
          //   type: 'value',
          //   axisLine: {
          //     lineStyle: {
          //       color: '#96A4BA',
          //     },
          //   },
          splitLine: {
            lineStyle: {
              color: '#2D3966',
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            data: this.data.map((ele) => {
              return ele.value;
            }),
            type: 'line',
            symbol: 'none',
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(23,32,81,0.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(142,62,86,0.8)',
                },
              ]),
            },
            lineStyle: {
              width: 2,
              type: 'solid',
              color: '#E9474C',
            },
          },
        ],
      };
      option && myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style scoped></style>
