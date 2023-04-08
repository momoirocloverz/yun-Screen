<template>
  <div class="box">
    <TitleBox
      :title="'文物安全管理员受训率'"
    />
      <div class="first-bar">
        <BarChart2D
          :chartData="chartData_1"
          :logo="logo_1"
          :startColor="'#FFF559'"
          :endColor="'#FFF998'"
          :backgroundColor="'rgba(182,134,82,0.2)'"
        />
      </div>

    <TitleBox
      :title="'自查表'"
    />
      <div class="line">
        <LineChart
          :chartData_1="chartData_2_1"
          :chartData_2="chartData_2_2"
          :logo="logo_2"
          :firstColor="'#f19c9f'"
          :secondColor="'#00e4ff'"
          :legendText="['文物安全责任落实情况', '文物博物馆单位安全情况']"
        />
      </div>

    <TitleBox
      :title="'大整治先进事迹'"
    />
      <div class="info">
        <div class="imgBox"> 
          <img
            src="../../../assets/demo.png"
            alt=""
            srcset=""
          />
        </div>
        <div class="text">
          务本堂，坐北朝南（南偏西21度），北靠翠山湾，面临欢潭溪，东接欢潭老街的街道，西挨省级文物保护务本堂，坐北朝南（南偏西21度），北靠翠山湾，面临欢潭溪，东接欢潭老街的街道，西挨省级文物保护
        </div>
      </div>

    <TitleBox
      :title="'大整治工作进度'"
    />
      <div class="second-bar">
        <BarChart
          :chartData="chartData_3"
          :logo="logo_3"
          :rightColor="'#fbc292'"
          :leftColor="'#f06e91'"
          :headColor="'#ffdaba'"
          :endColor="'#ff93b0'"
        />
      </div>
  </div>
</template>

<script>
// import TitleBox from '../publicComponents/titleBox'
import TitleBox from '../publicComponents/titleBoxNew'

import LineChart from './components/echartLine'
import BarChart2D from './components/echartBar2D'
import BarChart from './components/echartBar3D'
export default {
  name: '',
  components: { TitleBox, LineChart, BarChart2D, BarChart },
  data() {
    return {
      chartData_1: [
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
      logo_1: '1',
      chartData_2_1: [
        {
          name: '务本堂',
          value: '25',
        },
        {
          name: '许家南大房',
          value: '20',
        },
        {
          name: '朱凤标故居',
          value: '30',
        },
        {
          name: '汤寿潜故居',
          value: '26',
        },
      ],
      chartData_2_2: [
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
          value: '22',
        },
      ],
      logo_2: '1',
      chartData_3: [
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
      logo_3: '1',
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  // padding-left: 35px;
  // background: red;
  .first-bar{
    width: 100%;
    height: 20%;
  }
  .line{
    width: 100%;
    height: 20%;
  }
  .info{
    width: 100%;
    height: 20%;
  }
  .second-bar {
    width: 100%;
    height: 20%;
  }
  .info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .imgBox {
      width: 145px;
      height: 122px;
      display: flex;
      justify-content: center;
      align-items: center;
      background:url("../../../assets/img2/img-box3.png") no-repeat center;
      background-size: 100%;
      img{
        width:130px;
        height:100px
      }
    }
    .text {
      width: calc(100% - 185px);
      height: 122px;
      text-align: justify;
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      text-indent: 36px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 24px;
      letter-spacing: 0px;
      color: #c1e8ff;

      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;
    }
  }
}
</style>
