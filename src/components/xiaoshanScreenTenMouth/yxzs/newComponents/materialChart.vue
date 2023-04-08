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
          left: '0',
          right: '4%',
          bottom: '0',
          top: '15%',
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
        },
        series: [
          {
            data: this.data.map((ele) => {
              return ele.value;
            }),
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(48,117,142,0.8)',
                },
                {
                  offset: 1,
                  color: 'rgba(24,42,90,0.5)',
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
                  color: 'rgba(50,128,147,0.3)',
                },
              ]),
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
