<template>
  <div class="echart" style="width:100%;height:100%;">
    <div ref="echartsRight" style="width:100%;height:100%;"></div>
    <div class="info">
      <span>{{ name }}预警次数</span>
      <span>{{ num }}</span>
    </div>
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
      default: "#f85e4e"
    }
  },
  data() {
    return {
      name: this.chartData[0].name,
      num: this.chartData[0].value
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
              color: "#1962b4"
            },
            {
              offset: 0.5,
              color: "#1962b480"
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
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(255, 255, 255, 0.23)"
            },
            {
              offset: 0.5,
              color: "#c4c8ff"
            },
            {
              offset: 1,
              color: "rgba(3, 0, 0, 0.23)"
            }
          ]
        }
      ];
      let mychart = this.$echarts.init(this.$refs.echartsRight);
      let option = {
        colors: this.color,
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
        // legend: {
        //   data: [
        //     {
        //       name: this.legendText[0],
        //       textStyle: { color: "#fff" }
        //     },
        //     {
        //       name: this.legendText[1],
        //       textStyle: { color: "#fff" }
        //     },
        //     {
        //       name: this.legendText[2],
        //       textStyle: { color: "#fff" }
        //     }
        //   ],
        //   left: "right",
        //   icon: "rect",
        //   itemWidth: 20,
        //   itemHeight: 10
        //   // right: 50
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.chartData.map(item => item.name),
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.6)"
            }
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
            // interval: 0,
          }
        },
        yAxis: {
          name: "",
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
            data: this.chartData.map(item => item.value),
            type: "line",
            smooth: true,
            symbol:
              "image://http://223.65.209.139:8888/wswl-newscreen/static/images/culturalSave/dot1.png",
            symbolSize: 10,
            color: "#fff", // 控制图例的图形颜色
            areaStyle: {
              opacity: 1,
              color: colors[0]
            },
            lineStyle: {
              color: colors[1],
              width: 3
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

      mychart.on("mouseover", function(params) {
        console.log("折现图", params.name, params.value);
        that.name = params.name;
        that.num = params.value;
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
  .info {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 183px;
    height: 26px;
    border-radius: 13px;
    background: linear-gradient(to right, rgba(3, 0, 0, 0.15), #254c8d);
    display: flex;
    justify-content: center;
    align-items: center;
    span:nth-child(1) {
      font-family: AlibabaPuHuiTi-Regular;
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #a0bbe7;
      margin-right: 8px;
    }
    span:nth-child(2) {
      font-family: YouSheBiaoTiHei;
      font-size: 20px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #dfeafb;
    }
  }
}
</style>
