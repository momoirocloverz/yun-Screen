<template>
  <div class="container globalFireFoxScrollBar">
    <!-- <Box
      :height="'309px'"
      :bgSrc="require('../../../assets/imgBoxBg/yx-box5-bg.png')"
    >
      <div class="part-1">
        <Title :text="'风险预报'">
          <div class="btn-tab">
            <div
              :class="['btn', currentTab == '1' ? 'btn-act' : '']"
              @click="fxyb_tab_Click('1')"
            >
              明日
            </div>
            <div
              :class="['btn', currentTab == '2' ? 'btn-act' : '']"
              @click="fxyb_tab_Click('2')"
            >
              7日
            </div>
          </div>
        </Title>
        <div class="chart-box">
          <div class="chart">
            <rightChart :chartData="pieData" :logo="logo_1" :color="colors" />
            <span class="center-text">气象</span>
          </div>
          <div class="legend">
            <div class="head">
              <span>气象</span>
              <span>风险量</span>
            </div>
            <div
              class="item"
              v-for="(item, index) in pieData"
              :key="index"
              @click="fxyb_Click(item.name)"
            >
              <img :src="item.iconImg" alt="" srcset="" />
              <span class="name">{{ item.name }}</span>
              <span class="rate">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </Box> -->
    <Box :height="'309px'" :bgSrc="require('../../../assets/imgBoxBg/yx-box5-bg.png')">
      <div class="part-1">
        <Title :text="'风险分类'">
          <div class="btn" @click="fxfl_Click">查看详情</div>
        </Title>
        <div class="chart-box">
          <div class="pie">
            <img src="../../../assets/img4/huan.png" alt="" />
            <HeighChart :dataitems="chartData_3_1" :logo="logo_3" :colors="chartColor" />
          </div>
          <div class="legend">
            <div
              class="item"
              v-for="(item, index) in chartData_3_1"
              :key="index"
              :style="{
                background: `url(${item.bgImg}) no-repeat center`,
                'background-size': '100% 100%',
              }"
              @click="legendClick_1(item)"
            >
              <span class="icon" :style="{ background: chartColor[index] }"></span>
              <span :class="['name', currentLegend_1 === item.name ? 'name-active' : '']">{{ item.name }}</span>
              <!-- <span :class="['rate', currentLegend_1 === item.name ? 'name-active' : '']">{{ (parseFloat((item.num * 1) / totalNUm) * 100).toFixed(1) }}%</span> -->
              <span :class="['rate', currentLegend_1 === item.name ? 'name-active' : '']">{{ item.num }}</span>
              <!-- <img
                  v-if="item.num * 1 - 10 < 0 && index !== 0"
                  src="../../../assets/img3/g-arrow-up.png"
                  alt=""
                  srcset=""
                />
                <img
                  v-else
                  src="../../../assets/img3/r-arrow-up.png"
                  alt=""
                  srcset=""
                /> -->
            </div>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'309px'" :bgSrc="require('../../../assets/imgBoxBg/yx-box6-bg.png')">
      <div class="part-2">
        <Title :text="secondDynamicTitle">
          <!-- <div class="btn" @click="hzyh_Click">查看详情</div> -->
        </Title>
        <div class="chart-box">
          <div class="chart">
            <RightRadar :chartData="radarData" :logo="logo_2" />
          </div>
          <div class="legend">
            <div class="item" v-for="(item, index) in radarCopyData" :key="index" @click="legendClick(item.name)">
              <img :src="item.iconImg" alt="" srcset="" />
              <span class="name">{{ item.name }}</span>
              <!-- <span class="rate">{{ parseFloat((item.num * 100) / (item.max * 1)).toFixed(1) }}%</span> -->
              <span class="rate">{{ item.num }}</span>
            </div>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'306px'" :bgSrc="require('../../../assets/imgBoxBg/yx-box3-bg.png')">
      <div class="part-3">
        <Title :text="'风险详情'">
          <div class="btn-tab">
            <div style="width: 80px; height: 25px">
              <el-select v-model="currentSelect" size="mini" placeholder="" style="width: 80px" @change="select_change">
                <el-option
                  v-for="item in [
                    { label: '镇街', value: '1' },
                    { label: '文保单位', value: '2' },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div @click="btnClick('1')" :class="['btn', 'btn-list', currentBtn == '1' ? 'act-btn' : '']"></div>
            <div @click="btnClick('2')" :class="['btn', 'btn-line', currentBtn == '2' ? 'act-btn' : '']"></div>
          </div>
        </Title>
        <div class="info-tab">
          <span class="left">{{ currentSelect == '1' ? '镇街' : '文保单位' }}</span>
          <div class="tab">
            <span @click="timeTabClick('1')" :class="[currentTime == '1' ? 'act-time' : '']">日</span>
            <span @click="timeTabClick('2')" :class="[currentTime == '2' ? 'act-time' : '']">周</span>
            <span @click="timeTabClick('3')" :class="[currentTime == '3' ? 'act-time' : '']">月</span>
          </div>
        </div>
        <div v-if="currentBtn == '2'" class="chart">
          <LineChart :chartData_1="lineData_1" :chartData_2="lineData_2" :chartData_3="lineData_3" :chartData_4="lineData_4" :chartData_5="lineData_5" :chartData_6="lineData_6" :logo="logo" />
        </div>
        <div v-if="currentBtn == '1'" class="list">
          <vue-seamless-scroll :data="listData" class="auto-scorll-table" :class-option="optionSingleHeight">
            <div :class="['item', index == 0 ? 'first-row' : '']" v-for="(item, index) in listData" :key="index">
              <div class="index" :style="{ color: index < 3 ? '#e26636' : '#1bdaff' }">NO.{{ index + 1 }}</div>
              <div class="name">{{ item.name }}</div>
              <Process :outWidth="`${220 / 192}rem`" :outHeight="`${7 / 192}rem`" :maxNum="listData[0].value * 1 + 20" :currentNum="item.value * 1" :index="index" />
              <div class="num">{{ item.value }}</div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </Box>

    <!-- 二级页面 -->
    <FXFL
      :isShow="isShow_fxfl"
      @close="
        () => {
          this.isShow_fxfl = false;
        }
      "
    />
  </div>
</template>

<script>
import Box from '../components/box';
import Title from '../components/title';
import Process from '../components/process';

import countTo from 'vue-count-to';

import { get_yhfx } from '../../../api/xsApi2';
import { get_fxyb_data, get_hzyh_data, get_fxfx_data } from '../../../api/xsApi3';
import Table from './components/table';
import rightChart from './components/rightPie';
import PieChart from './components/rightChart';
import HeighChart from './components/highchart';
import RightRadar from './components/rightRadar';
import LineChart from './components/echartLine6';

import FXFL from './secondPage/fxfl';
import { eventBus } from '@/main';

let timer;
let pieColor = ['#3bbfe5', '#f5a75a', '#5af5a7'];
export default {
  components: {
    countTo,
    Box,
    Title,
    Table,
    PieChart,
    HeighChart,
    rightChart,
    RightRadar,
    LineChart,
    Process,

    FXFL,
  },
  data() {
    return {
      // part1
      currentLegend_1: '',
      chartData_3_1: [
        {
          name: '火灾隐患风险',
          num: '15',
          bgImg: require('../../../assets/img4/f-bg1.png'),
        },
        {
          name: '盗掘盗窃风险',
          num: '9',
          bgImg: require('../../../assets/img4/f-bg2.png'),
        },
        {
          name: '法人违法风险',
          num: '10',
          bgImg: require('../../../assets/img4/f-bg3.png'),
        },
        {
          name: '自然灾害风险',
          num: '15',
          bgImg: require('../../../assets/img4/f-bg4.png'),
        },
        // {
        //   name: '其他',
        //   num: '12',
        //   bgImg: require('../../../assets/img4/f-bg5.png'),
        // },
      ],
      totalNUm: 0,
      chartColor: ['#39c3ae', '#519ed9', '#e4b462', '#fd8c83', '#30dafd'],
      logo_3: '1',

      // part2
      secondDynamicTitle: '火灾隐患',
      currentLegend_2: '',
      radarData: [
        {
          name: '用火安全隐患',
          num: '15',
          max: '400',
          iconImg: require('../../../assets/img4/fire-icon1.png'),
        },
        {
          name: '电器安全隐患',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon2.png'),
        },
        {
          name: '设施安全隐患',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon3.png'),
        },
        {
          name: '消防安全管理问题',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon4.png'),
        },
        {
          name: '危险物品安全隐患',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon5.png'),
        },
        {
          name: '燃香烧纸隐患',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon6.png'),
        },
        {
          name: '其他隐患 ',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon7.png'),
        },
      ],
      radarCopyData: [
        {
          name: '用火安全隐患',
          num: '15',
          max: '400',
          iconImg: require('../../../assets/img4/fire-icon1.png'),
        },
        {
          name: '电器安全隐患',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon2.png'),
        },
        {
          name: '设施安全隐患',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon3.png'),
        },
        {
          name: '消防安全管理问题',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon4.png'),
        },
        {
          name: '危险物品安全隐患',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon5.png'),
        },
        {
          name: '燃香烧纸隐患',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon6.png'),
        },
        {
          name: '其他隐患 ',
          num: '15',
          max: '200',
          iconImg: require('../../../assets/img4/fire-icon7.png'),
        },
      ],
      logo_2: '1',

      // part3
      currentSelect: '1',
      currentBtn: '1',
      currentTime: '1',
      lineData_1: [
        {
          name: '进化镇',
          value: '11',
        },
        {
          name: '进化镇',
          value: '16',
        },
        {
          name: '进化镇',
          value: '11',
        },
        {
          name: '进化镇',
          value: '15',
        },
      ],
      lineData_2: [
        {
          name: '进化镇',
          value: '12',
        },
        {
          name: '进化镇',
          value: '12',
        },
        {
          name: '进化镇',
          value: '12',
        },
        {
          name: '进化镇',
          value: '12',
        },
      ],
      lineData_3: [
        {
          name: '进化镇',
          value: '10',
        },
        {
          name: '进化镇',
          value: '13',
        },
        {
          name: '进化镇',
          value: '16',
        },
        {
          name: '进化镇',
          value: '13',
        },
      ],
      lineData_4: [
        {
          name: '进化镇',
          value: '10',
        },
        {
          name: '进化镇',
          value: '14',
        },
        {
          name: '进化镇',
          value: '12',
        },
        {
          name: '进化镇',
          value: '9',
        },
      ],
      lineData_5: [
        {
          name: '进化镇',
          value: '9',
        },
        {
          name: '进化镇',
          value: '12',
        },
        {
          name: '进化镇',
          value: '15',
        },
        {
          name: '进化镇',
          value: '11',
        },
      ],
      lineData_6: [
        {
          name: '进化镇',
          value: '16',
        },
        {
          name: '进化镇',
          value: '13',
        },
        {
          name: '进化镇',
          value: '16',
        },
        {
          name: '进化镇',
          value: '13',
        },
      ],
      listData: [],
      logo: '1',

      // 二级页面
      isShow_fxfl: false,
      isShow_hzyh: false,
    };
  },
  computed: {
    optionSingleHeight() {
      return {
        singleHeight: 45, // 这里要变成你的一行表格的高度 可以审查元素
      };
    },
  },
  mounted() {
    this.get_fxfl(0, 0, '1'); // 风险分类
    this.getHZYH_data();
    this.getFXFX_data(this.currentSelect); // 风险分析

    timer = setInterval(() => {
      this.get_fxfl(0, 0, '1'); // 风险分类
      this.getHZYH_data();
      this.getFXFX_data(this.currentSelect); // 风险分析
    }, 10000);
  },
  beforeDestroy() {
    clearInterval(timer);
  },
  methods: {
    // 风险分类
    get_fxfl(level, name, rqlx) {
      get_yhfx(level, name, rqlx).then((res) => {
        // console.log('风险分类', res)
        let list = res.data.data;
        this.chartData_3_1[0].num = list.reportNum1;
        this.chartData_3_1[1].num = list.reportNum2;
        this.chartData_3_1[2].num = list.reportNum3;
        this.chartData_3_1[3].num = list.reportNum4;
        // this.chartData_3_1[4].num = list.reportNum5;

        this.getSum();
        this.logo_3 += '1';
      });
    },
    getSum() {
      let sum = 0;
      this.chartData_3_1.map((item) => {
        sum += item.num * 1;
      });
      this.totalNUm = sum;
    },
    fxfl_Click() {
      this.isShow_fxfl = true;
    },
    legendClick(item) {
      //   console.log('item', item);
    },
    // 点击图例，展示具体数据
    legendClick_1(item) {
      this.currentLegend_1 = item.name;
      let riskType = '';
      switch (this.currentLegend_1) {
        case '火灾隐患风险':
          riskType = '1';
          this.secondDynamicTitle = '火灾隐患';
          break;
        case '盗掘盗窃风险':
          riskType = '4';
          this.secondDynamicTitle = '盗掘盗窃';
          break;
        case '法人违法风险':
          riskType = '3';
          this.secondDynamicTitle = '法人违法';
          break;
        case '自然灾害风险':
          riskType = '2';
          this.secondDynamicTitle = '自然灾害';
          break;
        case '其他':
          riskType = '';
          this.secondDynamicTitle = '其他';
          break;
        default:
          break;
      }
      eventBus.$emit('drawPointByRiskType', riskType);
    },
    // 火灾隐患
    getHZYH_data() {
      get_hzyh_data().then((res) => {
        let data = res.data.data;
        this.radarData[0].num = data[0].reportNum1;
        this.radarData[0].max = +data[0].reportNum1 + 30;
        this.radarData[1].num = data[1].reportNum1;
        this.radarData[1].max = +data[1].reportNum1 + 30;
        this.radarData[2].num = data[2].reportNum1;
        this.radarData[2].max = +data[2].reportNum1 + 30;
        this.radarData[3].num = data[3].reportNum1;
        this.radarData[3].max = +data[3].reportNum1 + 30;
        this.radarData[4].num = data[4].reportNum1;
        this.radarData[4].max = +data[4].reportNum1 + 30;
        this.radarData[5].num = data[5].reportNum1;
        this.radarData[5].max = +data[5].reportNum1 + 30;
        this.radarData[6].num = data[6].reportNum1;
        this.radarData[6].max = +data[6].reportNum1 + 30;
        this.radarCopyData[0].num = data[0].reportNum1;
        this.radarCopyData[1].num = data[1].reportNum1;
        this.radarCopyData[2].num = data[2].reportNum1;
        this.radarCopyData[3].num = data[3].reportNum1;
        this.radarCopyData[4].num = data[4].reportNum1;
        this.radarCopyData[5].num = data[5].reportNum1;
        this.radarCopyData[6].num = data[6].reportNum1;

        this.radarCopyData.forEach((ele) => {
          ele.max = +data[0].reportNum1 + +data[1].reportNum1 + +data[2].reportNum1 + +data[3].reportNum1 + +data[4].reportNum1 + +data[5].reportNum1 + +data[6].reportNum1;
        });

        this.logo_2 += '1';
      });
    },
    hzyh_Click() {
      this.isShow_hzyh = true;
    },
    // 点击图例，展示具体数据
    legendClick_2(item) {
      this.currentLegend_2 = item.name;
      // eventBus.$emit('drawPointByRiskType')
    },

    // part3 风险分析
    getFXFX_data(type) {
      get_fxfx_data().then((res) => {
        this.lineData_1 = [];
        this.lineData_2 = [];
        this.lineData_3 = [];
        this.lineData_4 = [];
        this.lineData_5 = [];
        this.lineData_6 = [];
        this.listData = [];
        let list = [];
        if (type == '1') {
          // 镇街
          list = res.data.data.zj;
        } else if (type == '2') {
          // 文保单位
          list = res.data.data.wbdw;
        }
        list.map((item) => {
          let sumObj = {
            name: item.reportType,
            value: item.reportNum1 * 1 + item.reportNum2 * 1 + item.reportNum3 * 1 + item.reportNum4 * 1 + item.reportNum5 * 1 + item.reportNum6 * 1,
          };
          let obj1 = {
            name: item.reportType,
            value: item.reportNum1,
          };
          let obj2 = {
            name: item.reportType,
            value: item.reportNum2,
          };
          let obj3 = {
            name: item.reportType,
            value: item.reportNum3,
          };
          let obj4 = {
            name: item.reportType,
            value: item.reportNum4,
          };
          let obj5 = {
            name: item.reportType,
            value: item.reportNum5,
          };
          let obj6 = {
            name: item.reportType,
            value: item.reportNum6,
          };
          this.lineData_1.push(obj1);
          this.lineData_2.push(obj2);
          this.lineData_3.push(obj3);
          this.lineData_4.push(obj4);
          this.lineData_5.push(obj5);
          this.lineData_6.push(obj6);
          this.listData.push(sumObj);
          this.logo += '1';
        });
        // this.listData = this.listData.reverse()
        this.listData = this.selectSort(this.listData, 'value');
      });
    },
    select_change(val) {
      this.currentSelect = val;
      this.getFXFX_data(this.currentSelect);
    },
    // 切换展示方式
    btnClick(value) {
      this.currentBtn = value;
      // this.getFXFX_data(this.currentBtn);
    },
    timeTabClick(value) {
      this.currentTime = value;
    },
    // 数组排序
    selectSort(arr, prop) {
      for (let i = 0; i < arr.length - 1; i++) {
        let index = i;
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j][prop] * 1 > arr[index][prop] * 1) {
            index = j;
          }
        }
        [arr[i], arr[index]] = [arr[index], arr[i]];
      }
      return arr;
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes circleRoatation {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.container {
  width: 100%;
  height: 97%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-x: visible;

  .part-1 {
    .btn {
      width: 80px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border: 1px solid #8ba4fe;
      background: #34478c;
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #8ba4fe;
      cursor: pointer;
    }
    .chart-box {
      width: 100%;
      height: 251px;
      position: relative;
      .pie {
        width: 50%;
        height: 100%;
        position: relative;
        img {
          width: 85%;
          height: auto;
          position: absolute;
          top: 50%;
          left: 50%;
          animation: circleRoatation 15s linear infinite;
        }
      }
      .legend {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        height: auto;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .item {
          width: 100%;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding-left: 30px;
          margin: 5px 0;
          .icon {
            display: inline-block;
            width: 10px;
            height: 10px;
            // border-radius: 2px;
            margin-right: 5px;
          }
          // .name {
          //   display: inline-block;
          //   font-family: PingFangSC-Regular;
          //   font-size: 14px;
          //   font-weight: normal;
          //   font-stretch: normal;
          //   letter-spacing: 1px;
          //   color: #bac2e2;
          //   width: 105px;
          // }
          // .rate {
          //   display: inline-block;
          //   width: 55px;
          //   font-family: PingFangSC-Regular;
          //   font-size: 16px;
          //   font-weight: normal;
          //   font-stretch: normal;
          //   letter-spacing: 1px;
          //   color: #a8b0d0;
          // }
          .name {
            display: inline-block;
            width: 115px;
            font-family: SourceHanSansCN-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #bac2e2;
            margin: 0 10px;
          }
          .rate {
            font-family: DINPro-Medium;
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            color: #fff;
          }
          .name-active {
            // opacity: 1;
            // font-size: 16px;
          }
          // img {
          //   width: 10px;
          //   height: 12px;
          //   margin-top: 15px;
          // }
        }
      }
    }
  }
  .part-2 {
    .btn {
      width: 80px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border: 1px solid #8ba4fe;
      background: #34478c;
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #8ba4fe;
      cursor: pointer;
    }
    .chart-box {
      display: flex;
      .chart {
        width: 52%;
        height: 250px;
      }
      .legend {
        width: 48%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        box-sizing: border-box;
        padding-left: 20px;
        margin-bottom: 10px;
        .item {
          width: 201px;
          height: 30px;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 2px dashed rgba(201, 205, 214, 0.2);
          margin-top: 5px;
          cursor: pointer;
          img {
            width: 18px;
            height: 18px;
          }
          .name {
            display: inline-block;
            width: 115px;
            font-family: SourceHanSansCN-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #bac2e2;
            margin: 0 10px;
          }
          .rate {
            font-family: DINPro-Medium;
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            color: #fff;
          }
        }
      }
    }
  }
  .part-3 {
    .btn-tab {
      height: 26px;
      width: 145px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        width: 26px;
        height: 100%;
        background: url('../../../assets/img4/tab-nomal.png') no-repeat center;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: SourceHanSansCN-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #bfc8d7;
        opacity: 0.5;
        cursor: pointer;
      }
      .btn-list {
        background: url('../../../assets/img4/list-icon.png') no-repeat center;
        background-size: 100% 100%;
      }
      .btn-line {
        background: url('../../../assets/img4/line-icon.png') no-repeat center;
        background-size: 100% 100%;
      }
      .act-btn {
        opacity: 1;
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .info-tab {
      width: 100%;
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        font-family: SourceHanSansCN-Medium;
        font-size: 18px;
        font-weight: 900;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #d1d6df;
        text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
        background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .tab {
        width: 144px;
        height: 17px;
        display: flex;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 100%;
          font-family: AdobeHeitiStd-Regular;
          font-size: 16px;
          font-weight: 900;
          font-style: italic;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #d1d6df75;
          cursor: pointer;
        }
        .act-time {
          color: #ffffff;
          background: linear-gradient(to right, #2ebef700, #2ebef7, #2ebef700);
        }
      }
    }
    .chart {
      width: 100%;
      height: 205px;
    }
    .list {
      width: 100%;
      height: 205px;
      overflow: hidden;
      .auto-scorll-table {
        .item {
          width: 100%;
          display: flex;
          height: 40px;
          align-items: center;
          margin: 0 10px;
          box-sizing: border-box;
          padding: 0 5px;
          margin-bottom: 5px;
          &:nth-child(2n-1) {
            background: linear-gradient(to right, #253066, #25306600);
          }
          .index {
            width: 45px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 14px;
            font-weight: 900;
            font-stretch: normal;
            letter-spacing: 1px;
          }
          .name {
            width: 100px;
            font-family: SourceHanSansCN-Medium;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #b5c1d1;
            margin-left: 15px;
          }
          .num {
            font-family: DINPro-Medium;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #ffffff;
            margin-left: 15px;
          }
        }
      }
    }
  }
}
</style>
