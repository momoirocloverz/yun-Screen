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
        color: [
          "#0cd8d6",
          "#ff7675",
          "#14b0ff",
          "#0d91fe",
          "#0380ff",
          "#f5ba45"
        ],
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "AI感知",
            type: "pie",
            radius: ["70%", "90%"],
            center: ["50%", "35%"],
            avoidLabelOverlap: false,
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
                value: item.onLineNum
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
}
</style>
