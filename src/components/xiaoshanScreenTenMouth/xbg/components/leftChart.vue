<template>
  <div class="pie" ref="echartsGauge" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    logo: Number,
    color: {
      type: Array,
      default: () => ['#1F68E2', '#00E9CB', '#31B9FF', '#44DA84', '#747DF8'],
    },
  },
  data() {
    return {
      timer6: null,
      pos: 0,
    };
  },
  watch: {
    logo() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let that = this;
      let mychart = this.$echarts.init(this.$refs.echartsGauge);
      let option = {
        color: that.color,
        tooltip: {
          trigger: 'item',
          borderColor: 'rgba(0,0,0,0.7)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff',
          },
          confine: true,
        },
        series: [
          {
            name: '文物类别',
            type: 'pie',
            avoidLabelOverlap: false,
            radius: [40, 85],
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
                formatter: ['{b|{b}}', '{a|{d}%}'].join('\n'),
                rich: {
                  b: {
                    fontSize: 14,
                    fontFamily: 'SourceHanSansCN-Regular',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    lineHeight: 27,
                  },
                  a: {
                    fontSize: 22,
                    fontFamily: 'DINPro-Medium',
                    fontWeight: 400,
                    color: '#ffffff',
                  },
                },
              },
            },
            data: this.chartData,
          },
        ],
      };

      mychart.setOption(option);
      window.addEventListener('resize', () => {
        mychart.resize();
      });
      mychart.on('click', function (param) {
        console.log('饼图点击', param);
        that.$emit('pieClick', param);
      });

      if (this.timer6) {
        clearInterval(this.timer6);
      }
      this.timer6 = setInterval(() => {
        if (this.pos > 0) {
          mychart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.pos - 1,
          });
        } else {
          mychart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: 4,
          });
        }
        mychart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.pos,
        });
        this.pos++;
        if (this.pos > 4) {
          this.pos = 0;
        }
      }, 3000);
    },
  },
};
</script>

<style lang="less" scoped>
.pie {
  position: relative;
}
</style>
