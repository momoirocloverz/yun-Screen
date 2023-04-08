<template>
  <div class="gauge" ref="echartsGauge" style="width:100%;height:210%;"></div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: [Number, String],
      default: 0
    },
    title: {
      type: String,
      default: "事件完成统计"
    },
    color: {
      type: String,
      default: "#4bfffd"
    },
    startColor: {
      type: String,
      default: "rgba(75,255,253,0.1)"
    },
    logo: String
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
      let mychart = this.$echarts.init(this.$refs.echartsGauge);
      let color = [
        {
          type: "linear",
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: this.startColor
            },
            {
              offset: 1,
              color: this.color
            }
          ]
        }
      ];
      let option = {
        series: [
          {
            // 时间
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            radius: "70%",
            min: 0,
            max: 100,
            splitNumber: 4,
            pointer: {
              show: true,
              length: "40%",
              width: 4,
              itemStyle: {
                color: "#fff",
                shadowColor: "#5979c2",
                shadowBlur: 20
              }
            },
            progress: {
              show: true,
              overlap: false,
              clip: false
            },
            axisLine: {
              lineStyle: {
                width: 10,
                color: [[1, "rgba(104,115,188,0.2)"]]
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#5979c2"
              }
            },
            axisLabel: {
              show: true,
              color: "#b7bedc",
              fontSize: 14,
              formatter: "{value}",
              distance: -35
            },
            // title: {
            //   show: false
            // },
            detail: {
              show: false
            },
            data: [
              {
                value: this.chartData,
                name: this.title,
                title: {
                  offsetCenter: ["0%", "30%"],
                  color: "#fff"
                },
                itemStyle: {
                  color: color[0]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: ["0%", "-20%"]
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
