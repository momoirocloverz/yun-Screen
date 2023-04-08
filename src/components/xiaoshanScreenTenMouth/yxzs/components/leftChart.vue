<template>
  <div class="gauge" ref="echartsGauge" style="width:100%;height:210%;"></div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Array,
      default: () => []
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
          x2: 0,
          y: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(229,63,40,0.1)"
            },
            {
              offset: 1,
              color: "#e53f28"
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          x2: 0,
          y: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(255,194,75,0.1)"
            },
            {
              offset: 1,
              color: "#ffc24b"
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(75,255,253,0.1)"
            },
            {
              offset: 1,
              color: "#4bfffd"
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(154,234,51,0.1)"
            },
            {
              offset: 1,
              color: "#9aea33"
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          x2: 0,
          y: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(123,241,255,0)"
            },
            {
              offset: 1,
              color: "rgba(123,241,255,0.3)"
            }
          ]
        }
      ];

      const gaugeData = [
        {
          value: this.chartData[0].num,
          name: "高风险",
          title: {
            offsetCenter: ["0%", "-30%"]
          },
          itemStyle: {
            color: color[0]
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "-20%"]
          }
        },
        {
          value: this.chartData[1].num,
          name: "Good",
          title: {
            offsetCenter: ["0%", "0%"]
          },
          itemStyle: {
            color: color[1]
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "10%"]
          }
        },
        {
          value: this.chartData[2].num,
          name: "Commonly",
          title: {
            offsetCenter: ["0%", "30%"]
          },
          itemStyle: {
            color: color[2]
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "40%"]
          }
        }
      ];
      let option = {
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 568,
            splitNumber: 4,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              // roundCap: true,
              clip: false,
              itemStyle: {
                // borderWidth: 1,
                // borderColor: '#464646'
              }
            },
            axisLine: {
              lineStyle: {
                width: 20,
                color: [[1, "rgba(104,115,188,0.2)"]]
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              color: "#b7bedc",
              fontSize: 14,
              distance: -40
            },
            data: gaugeData,
            title: {
              show: false,
              fontSize: 14
            },
            detail: {
              show: false
            }
          },
          {
            // 中间填充背景
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            radius: "64.5%",
            min: 0,
            max: 24,
            splitNumber: 2,
            pointer: {
              show: false,
              itemStyle: {
                color: "#fff"
              }
            },
            progress: {
              show: true,
              overlap: false,
              clip: false
            },
            axisLine: {
              lineStyle: {
                width: 67,
                color: [[1, color[4]]]
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              color: "#b7bedc",
              fontSize: 14,
              formatter: "{value}:00",
              distance: -45
            },
            data: [
              {
                value: 0,
                name: "Perfect",
                title: {
                  offsetCenter: ["0%", "-30%"]
                },
                itemStyle: {
                  color: color[4]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: ["0%", "-20%"]
                }
              }
            ],
            title: {
              show: false
            },
            detail: {
              show: false
            }
          },
          {
            // 时间
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            radius: "30%",
            min: 0,
            max: 24,
            splitNumber: 2,
            pointer: {
              show: true,
              itemStyle: {
                color: "#fff"
              }
            },
            progress: {
              show: true,
              overlap: false,
              clip: false
            },
            axisLine: {
              lineStyle: {
                width: 5,
                color: [[1, "rgba(104,115,188,0.2)"]]
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              color: "#b7bedc",
              fontSize: 14,
              formatter: "{value}:00",
              distance: -45
            },
            data: [
              {
                value: new Date().getHours(),
                name: "Perfect",
                title: {
                  offsetCenter: ["0%", "-30%"]
                },
                itemStyle: {
                  color: color[3]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: ["0%", "-20%"]
                }
              }
            ],
            title: {
              show: false
            },
            detail: {
              show: false
            }
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
