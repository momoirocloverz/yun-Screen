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
        color: ['#41c2ae', '#256cdf', '#37dcfb', '#7580f5', '#3bbafc'],
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: '预警指数',
            type: 'pie',
            radius: ['50%', '85%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 1,
              borderColor: '#011835',
              borderWidth: 2,
            },
            tooltip: {
              trigger: 'item',
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
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: 40,
            //     fontWeight: 'bold',
            //   },
            // },
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
            dataIndex: 4,
          });
        }
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.pos,
        });
        this.pos++;
        if (this.pos > 4) {
          this.pos = 0;
        }
        eventBus.$emit('yxzsDetailLeftPie', this.pos);
      }, 3000);
    },
  },
};
</script>

<style scoped></style>
