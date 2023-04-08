<template>
  <div class="gauge" ref="echartsGauge" style="width:100%;height:210%;"></div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: [Number, String],
      default: 50
    },
    title: {
      type: String,
      default: "水压实时监测(Mpa)"
    },
    // unit: {
    //   type: String,
    //   default: "Mpa"
    // },
    logo: String,
    max: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {};
  },
  watch: {
    logo() {
        this.init();
    }
  },
  mounted() {
      this.init();
  },
  methods: {
    init() {
      let that = this;
      let mychart = this.$echarts.init(this.$refs.echartsGauge);

      let option = {
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: that.max,
            splitNumber: 4,
            radius: "65%",
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.3, "#EDBC44"],
                  [0.7, "#43FEFD"],
                  [1, "#FD7F69"]
                ]
              }
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "12%",
              width: 15,
              offsetCenter: [0, "-60%"],
              itemStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              distance: 5,
              length: 8,
              lineStyle: {
                color: "#425B96",
                width: 2
              }
            },
            splitLine: {
              show: false,
              distance: -30,
              length: 30,
              lineStyle: {
                color: "#fff",
                width: 4
              }
            },
            axisLabel: {
              distance: that.max > 100 ? -40 : -25,
              fontSize: 14,
              color: "#A9B1D8"
            },
            detail: {
              valueAnimation: true,
              color: "auto",
              offsetCenter: [0, "-10%"],
              formatter: function(value) {
                return `{value|${value.toFixed(0)}}`;
              },
              rich: {
                value: {
                  fontSize: 25,
                  fontWeight: "bolder",
                  color: "#45EFF4"
                }
                // unit: {
                //   fontSize: 15,
                //   color: "#999",
                //   padding: [10, 0, 0, 5]
                // }
              }
            },
            data: [
              {
                value: that.chartData,
                name: that.title,
                title: {
                  offsetCenter: ["0%", "30%"],
                  color: "#fff"
                }
              }
            ]
          }
        ]
      };

      mychart.setOption(option);
      window.addEventListener("resize", () => {
        mychart.resize();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.gauge {
  position: relative;
  top: -10px;
}
</style>
