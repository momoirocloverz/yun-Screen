<template>
  <div class="echart" style="width:100%;height:100%;">
    <div ref="echartsRight" style="width:100%;height:100%;"></div>
  </div>
</template>

<script>
let mTime;
export default {
  props: {
    chartData: {
      type: Array,
      required: true
    },
    legendText: {
      type: Array,
      default: () => []
    },
    logo: {
      type: String | Number,
      default: ""
    },
    firstColor: {
      type: String,
      default: "#49acff"
    }
  },
  data() {
    return {};
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
      let that = this;
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
        }
      ];
      let mychart = this.$echarts.init(this.$refs.echartsRight);
      let option = {
        tooltip: {
          // show: false,
          trigger: "axis",
          showContent: false,
          triggerOn: "mousemove",
          axisPointer: {
            type: "line"
          }
          // backgroundColor: "rgba(0,0,0,0.7)"
        },
        grid: {
          left: "1%",
          right: "5%",
          bottom: "3%",
          top: "18%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.chartData.map(item => item.name),
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: "#7e97ac"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "#4E83B0",
              opacity: 0.3
            }
          },
          axisLabel: {
            color: "#80aadf",
            fontSize: 13
          }
        },
        yAxis: {
          name: "事件上报趋势（件）",

          nameTextStyle: {
            align: "left"
          },
          type: "value",
          splitNumber: 3,
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.6)"
            }
          },
          axisLabel: {
            color: "#80aadf",
            fontSize: 13
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
            name: "",
            data: this.chartData.map(item => item.num),
            type: "line",
            smooth: false,
            symbol:
              "image://http://223.65.209.139:8888/wswl-newscreen/static/images/culturalSave/dot1.png",
            symbolSize: 1,
            color: "#fff", // 控制图例的图形颜色
            areaStyle: {
              opacity: 1,
              color: colors[0]
            },
            lineStyle: {
              color: this.firstColor,
              width: 2
            },
            itemStyle: {
              color: "#1962b4"
            }
          }
        ]
      };

      mychart.setOption(option);
      window.addEventListener("resize", () => {
        // console.log("窗口尺寸");
        mychart.resize();
      });

      // var index = 0; //播放所在下标
      // let length = this.chartData.length - 1;
      // setTimeout(() => {
      //   clearInterval(mTime);
      //   mTime = setInterval(function() {
      //     mychart.dispatchAction({
      //       type: "showTip",
      //       seriesIndex: 0,
      //       dataIndex: index
      //     });
      //     index++;
      //     if (index > length) {
      //       index = 0;
      //     }
      //   }, 5000);
      // }, 4000);
    }
  }
};
</script>

<style scoped lang="less">
.echart {
  position: relative;
}
</style>
