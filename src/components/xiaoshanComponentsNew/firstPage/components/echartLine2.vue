<template>
  <div ref="echartsRight" style="width:100%;height:100%;"></div>
</template>

<script>
let mTime;
export default {
  props: {
    chartData_1: {
      type: Array,
      required: true
    },
    chartData_2: {
      type: Array,
      required: true
    },
    chartData_3: {
      type: Array,
      required: true
    },
    chartData_4: {
      type: Array,
      required: true
    },
    legendText: {
      type: Array,
      default: () => ["市级以上文保单位（点）", "国保博物馆"]
    },
    logo: {
      type: String | Number,
      required: true,
      default: ""
    },
    firstColor: {
      type: String,
      default: "#0291FF"
    },
    secondColor: {
      type: String,
      default: "#F88C41"
    },
    thirdColor: {
      type: String,
      default: "#0291FF"
    },
    forthColor: {
      type: String,
      default: "#F88C41"
    }
  },
  data() {
    return {
      legendData: [],
      color: [
        "#F88C41",
        "#1671F6",
        "#F2BB23",
        "#1FEEDC",
        "#EF609E",
        "#FD9C57",
        "#73ddff",
        "#73acff",
        "#fdd56a",
        "#fdb36a",
        "#fd866a",
        "#ACF3A5"
      ]
    };
  },
  watch: {
    logo() {
      this.initchart();
    }
  },
  mounted() {
    this.initchart();
  },
  methods: {
    initchart() {
      let colors = [
        {
          type: "linear",
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: this.firstColor
            },
            {
              offset: 1,
              color: "rgba(0,0,0,0)"
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: this.secondColor
            },
            {
              offset: 1,
              color: "rgba(0,0,0,0)"
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: this.thirdColor
            },
            {
              offset: 1,
              color: "rgba(0,0,0,0)"
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: this.forthColor
            },
            {
              offset: 1,
              color: "rgba(0,0,0,0)"
            }
          ]
        }
      ];
      let mychart = this.$echarts.init(this.$refs.echartsRight);
      let option = {
        colors: this.color,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          backgroundColor: "rgba(0,0,0,0.7)"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "18%",
          containLabel: true
        },
        legend: {
          data: [
            {
              name: this.legendText[0],
              textStyle: { color: "#fff" }
            },
            {
              name: this.legendText[1],
              textStyle: { color: "#fff" }
            },
            {
              name: this.legendText[2],
              textStyle: { color: "#fff" }
            },
            {
              name: this.legendText[3],
              textStyle: { color: "#fff" }
            }
          ],
          left: "right",
          icon: "circle",
          itemWidth: 10
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.chartData_1.map(item => item.name),
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.6)"
            }
          },
          axisLabel: {
            color: "#fff",
            fontSize: 12
            // interval: 0,
          }
        },
        yAxis: {
          type: "value",
          splitNumber: 3,
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.6)"
            }
          },
          axisLabel: {
            color: "#fff",
            fontSize: 12
          },
          splitLine: {
            lineStyle: {
              color: "#4E83B0",
              opacity: 0.3
            }
          }
        },
        series: [
          {
            name: this.legendText[0],
            data: this.chartData_1.map(item => item.value),
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 2,
            color: this.firstColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.9,
              color: colors[0]
            },
            lineStyle: {
              color: this.firstColor,
              width: 3
            },
            itemStyle: {
              color: this.firstColor
            }
          },
          {
            name: this.legendText[1],
            data: this.chartData_2.map(item => item.value),
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 2,
            color: this.secondColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.8,
              color: colors[1]
            },
            lineStyle: {
              color: this.secondColor,
              width: 3
            },
            itemStyle: {
              color: this.secondColor
            }
          },
          {
            name: this.legendText[2],
            data: this.chartData_3.map(item => item.value),
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 2,
            color: this.thirdColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.8,
              color: colors[2]
            },
            lineStyle: {
              color: this.thirdColor,
              width: 3
            },
            itemStyle: {
              color: this.thirdColor
            }
          },
          {
            name: this.legendText[3],
            data: this.chartData_4.map(item => item.value),
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 2,
            color: this.forthColor, // 控制图例的图形颜色
            areaStyle: {
              opacity: 0.8,
              color: colors[3]
            },
            lineStyle: {
              color: this.forthColor,
              width: 3
            },
            itemStyle: {
              color: this.forthColor
            }
          }
        ]
      };

      mychart.setOption(option);
      window.addEventListener("resize", () => {
        // console.log("窗口尺寸");
        mychart.resize();
      });

      var index = 0; //播放所在下标
      let length = this.chartData_1.length - 1;
      setTimeout(() => {
        clearInterval(mTime);
        mTime = setInterval(function() {
          mychart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: index
          });
          index++;
          if (index > length) {
            index = 0;
          }
        }, 5000);
      }, 4500);
    }
  }
};
</script>

<style scoped></style>
