<template>
  <div class="chart" ref="chartBarLine" style="width:100%;height:100%;"></div>
</template>

<script>
export default {
  props: {
    chartData_1: {
      type: Array,
      default: () => []
    },
    chartData_2: {
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
      let mychart = this.$echarts.init(this.$refs.chartBarLine);
      let colors = [
        {
          type: "linear",
          x: 0,
          x2: 0,
          y: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(0,0,0,0)"
            },
            {
              offset: 1,
              color: "#22F4F1"
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
              color: "rgba(0,0,0,0)"
            },
            {
              offset: 1,
              color: "#FEE12A"
            }
          ]
        }
      ];

      let option = {
        title: [
          {
            text: "水压水深动态监测",
            textStyle: {
              color: "#858eb4",
              fontSize: 15
            },
            top: 10,
            left: 10
          }
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: `{b}<br/>
                    {a0}: {c0}<br/>
                    {a1}: {c1}`
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "20%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          // data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月"],
          data: this.chartData_1.map(item => item.name),
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: "#7e97ac"
            }
          },
          axisLabel: {
            color: "#a8b0d0",
            fontSize: 14,
            interval: 0
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#4E83B0",
              opacity: 0.3
            }
          }
        },
        yAxis: [
          {
            type: "value",
            name: "",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#7e97ac"
              }
            },
            axisLabel: {
              color: "#a8b0d0",
              fontSize: 12
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#4E83B0",
                opacity: 0.3,
                type: "dashed"
              }
            }
          },
          {
            type: "value",
            name: "",
            axisLabel: {
              color: "#a8b0d0",
              fontSize: 12
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#7e97ac"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#4E83B0",
                opacity: 0.3
              }
            }
          }
        ],
        legend: {
          data: [
            {
              name: "水压监测(Mpa)",
              textStyle: { color: "#858eb4" },
              itemStyle: {
                color: "#22F4F1"
              }
            },
            {
              name: "水深(m)",
              textStyle: { color: "#858eb4" },
              itemStyle: {
                color: "#FEE12A"
              }
            }
          ],
          right: 30,
          top: 10,
          icon: "rect",
          itemWidth: 10,
          itemHeight: 10
        },
        series: [
          {
            name: "水压监测(Mpa)",
            // data: [2000, 2100, 1900, 1800, 2000, 2200, 2500, 2200, 2000],
            data: this.chartData_1.map(item => item.num),
            type: "line",
            yAxisIndex: 1,
            showSymbol: false,
            areaStyle: {
              opacity: 0.7,
              color: colors[0]
            },
            lineStyle: {
              color: "#22F4F1",
              width: 3
            }
          },
          {
            name: "水深(m)",
            // data: [100, 120, 110, 90, 80, 100, 120, 100, 98],
            data: this.chartData_2.map(item => item.num),
            type: "line",
            showSymbol: false,
            areaStyle: {
              opacity: 0.7,
              color: colors[1]
            },
            lineStyle: {
              color: "#FEE12A",
              width: 3
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
.chart {
  position: relative;
  // top: -10px;
}
</style>
