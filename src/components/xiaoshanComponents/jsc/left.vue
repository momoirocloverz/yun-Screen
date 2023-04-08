<template>
  <div class="box">
    <TitleBox
      :title="'文物安全责任落实情况'"
    />
      <div class="pie">
        <HeighChart
          :dataitems="chartData_1"
          :logo="logo_1"
        />
      </div>

    <TitleBox
      :title="'安全责任书签订率'"
    />
      <div class="first-bar">
        <BarChart
          :chartData="chartData_2"
          :logo="logo_2"
          :rightColor="'#3f2ebc'"
          :leftColor="'#6251df'"
          :headColor="'#7f6aff'"
          :endColor="'#6855f4'"
        />
      </div>

    <TitleBox
      :title="'隐患排查率'"
    />
      <div class="line">
        <LineChart
          :chartData_1="chartData_3_1"
          :chartData_2="chartData_3_2"
          :firstColor="'#8fbfff'"
          :secondColor="'#31dd8a'"
          :logo="logo_3"
        />
      </div>

    <TitleBox
      :title="'安全档案建档率'"
    />
      <div class="second-bar">
        <BarChart2D
          :chartData="chartData_4"
          :logo="logo_4"
          :startColor="'#FF3E8B'"
          :endColor="'#FF85C9'"
          :backgroundColor="'rgba(182,134,82,0.2)'"
        />
      </div>
  </div>
</template>

<script>
// import TitleBox from '../publicComponents/titleBox'
import TitleBox from '../publicComponents/titleBoxNew'

import HeighChart from './components/highchart'
import BarChart from './components/echartBar3D'
import LineChart from './components/echartLine'
import BarChart2D from './components/echartBar2D'
export default {
  name: '',
  components: { TitleBox, HeighChart, BarChart, LineChart, BarChart2D },
  data() {
    return {
      chartData_1: [
        {
          name: '已落实',
          y: 20,
          sliced: true,
          selected: true,
        },
        {
          name: '未落实',
          y: 80,
          sliced: true,
          selected: true,
        },
      ],
      logo_1: '1',
      chartData_2: [
        {
          name: '瓜沥镇',
          value: '25',
        },
        {
          name: '新塘街道',
          value: '36',
        },
        {
          name: '进化镇',
          value: '20',
        },
        {
          name: '河上镇',
          value: '50',
        },
        {
          name: '所前镇',
          value: '60',
        },
      ],

      logo_2: '1',
      chartData_3_1: [
        {
          name: '务本堂',
          value: '18',
        },
        {
          name: '许家南大房',
          value: '25',
        },
        {
          name: '朱凤标故居',
          value: '26',
        },
        {
          name: '汤寿潜故居',
          value: '23',
        },
      ],
      chartData_3_2: [
        {
          name: '务本堂',
          value: '22',
        },
        {
          name: '许家南大房',
          value: '23',
        },
        {
          name: '朱凤标故居',
          value: '35',
        },
        {
          name: '汤寿潜故居',
          value: '18',
        },
      ],
      logo_3: '1',
      chartData_4: [
        {
          name: '务本堂',
          value: '20',
        },
        {
          name: '许家南大房',
          value: '25',
        },
        {
          name: '朱凤标故居',
          value: '35',
        },
        {
          name: '汤寿潜故居',
          value: '26',
        },
      ],
      logo_4: '1',
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  // background: red;
  .pie{
    width: 100%;
    height: 140px;
    margin-bottom: 8px;
  }
  .first-bar{
    width: 100%;
    height: 21%;
    margin-bottom: 8px;
  }
  .line{
    width: 100%;
    height: 21%;
    margin-bottom: 8px;
  }
  .second-bar {
    width: 100%;
    height: 20%;
  }
}
</style>
