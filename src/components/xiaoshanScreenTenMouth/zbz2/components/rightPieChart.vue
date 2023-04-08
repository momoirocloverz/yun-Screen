<template>
  <div class="pie" ref="echartsGauge" style="width:100%;height:100%;"></div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => [
        "#0cd8d6",
        "#ff7675",
        "#14b0ff",
        "#0d91fe",
        "#0380ff",
        "#f5ba45"
      ]
    },
    legendText: Array,
    seriesName: {
      type: String,
      default: "部门"
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
      let option = {
        color: this.colors,
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: this.legendText.map((item, index) => {
            return {
              name: item,
              textStyle: { color: "#a8b0d0" },
              itemStyle: {
                color: this.colors[index]
              }
            };
          }),
          top: "center",
          right: "2%",
          orient: "vertical",
          icon: "rect",
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          itemWidth: 10,
          itemHeight: 10
        },
        series: [
          {
            name: this.seriesName,
            type: "pie",
            radius: ["45%", "65%"],
            center: ["40%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 0,
              borderColor: "#162051",
              borderWidth: 2
            },
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: this.chartData.map(item => {
              return {
                name: item.name,
                value: item.num
              };
            })
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
.pie {
  position: relative;
  z-index: 1;
}
</style>
