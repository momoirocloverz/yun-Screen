<template>
  <div ref="echartsRight" style="width: 100%; height: 100%"></div>
</template>
<script>
import { eventBus } from '@/main';
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    logo: {
      type: Number,
      default: 1,
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
      this.initchart();
    },
  },
  mounted() {
    this.initchart();
  },
  beforeDestroy() {
    clearInterval(this.timer6);
  },
  methods: {
    initchart() {
      let myChart = this.$echarts.init(this.$refs.echartsRight);
      var option = {
        color: ['#FC8C82', '#39C2AC', '#E2B463', '#3D82E8'],
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: '风险隐患',
            type: 'pie',
            radius: ['65%', '90%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 1,
              borderColor: '#011835',
              borderWidth: 2,
            },
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove',
              axisPointer: {
                type: 'shadow',
              },
              borderColor: 'rgba(0,0,0,0.7)',
              backgroundColor: 'rgba(0,0,0,0.7)',
              textStyle: {
                color: '#fff',
              },
              confine: true,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
                // formatter: '{b}\n{d}%',
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
            labelLine: {
              show: false,
            },
            data: this.data,
          },
        ],
      };
      option && myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
      if (this.timer6) {
        clearInterval(this.timer6);
      }
      this.timer6 = setInterval(() => {
        if (this.pos > 0) {
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.pos - 1,
          });
        } else {
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: 3,
          });
        }
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.pos,
        });
        this.pos++;
        if (this.pos > 3) {
          this.pos = 0;
        }
        eventBus.$emit('yxzsMasterLeftPie', this.pos);
      }, 3000);
    },
  },
};
</script>

<style scoped></style>
