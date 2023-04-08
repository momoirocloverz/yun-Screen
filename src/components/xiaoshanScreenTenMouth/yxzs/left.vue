<template>
  <div class="container">
    <Box :height="'382px'" :bgSrc="require('../../../assets/imgBoxBg/yx-box1-bg.png')">
      <div class="part-1">
        <Title :text="'安全指数'">
          <div class="btn" @click="aqzs_Click">查看详情</div>
        </Title>
        <div class="tj">
          <div
            class="item"
            :style="{
              background: `url(${item.bgImg}) no-repeat center`,
              'background-size': '100% 100%',
            }"
            v-for="(item, index) in part_1_tjList"
            :key="index"
            @click="part1_tj_click(item)"
          >
            <div class="col col-1">
              <span>{{ item.name }}</span>
              <!-- <span> -->
              <!-- {{ item.num }} -->
              <countTo :startVal="startVal" :endVal="item.num * 1" :duration="3000" :style="{ color: item.color }"></countTo>
              <!-- </span> -->
            </div>
            <div class="col col-2">
              <span>今日</span>
              <div class="change">
                <span
                  :style="{
                    color: item.changeNum <= 0 ? '#6ae2ac' : '#ea5757',
                  }"
                  >{{ Math.abs(item.changeNum) }}</span
                >
                <img v-if="item.changeNum <= 0" src="../../../assets/img3/g-arrow-up.png" alt="" srcset="" />
                <img v-else src="../../../assets/img3/r-arrow-up.png" alt="" srcset="" />
              </div>
            </div>
          </div>
        </div>
        <div class="chart-box">
          <div class="chart">
            <LineAndBarChart
              :chartData_1="lineData_1_1"
              :chartData_2="lineData_1_2"
              :chartData_3="lineData_1_3"
              :chartData_4="lineData_1_4"
              :chartData_5="lineData_1_5"
              :chartData_6="lineData_1_6"
              :chartData_7="barData_g"
              :chartData_8="barData_z"
              :chartData_9="barData_d"
              :logo="logo_1"
            />
            <!-- <div class="legend">
              <div
                class="item"
                v-for="(item, index) in legendData"
                :key="index"
              >
                <span class="point" :style="{ background: item.color }"></span>
                <span class="name">{{ item.name }}</span>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'230px'" :bgSrc="require('../../../assets/imgBoxBg/yx-box2-bg.png')">
      <div class="part-2">
        <Title :text="'风险来源'">
          <div class="btn" @click="fxly_Click">查看详情</div>
        </Title>
        <!-- :style="{
              background: `url(${currentIndex == item.id ? item.actBgImg : item.bgImg}) no-repeat center`,
              'background-size': '100% 100%',
            }" -->
        <div class="fxyz">
          <div
            :class="['item', currentIndex == item.id ? 'active-item' : '']"
            v-for="(item, index) in fxyzList"
            :key="index"
            @click="fxyzClick(item, index)"
            :style="{
              backgroundImage: `url(${currentIndex == item.id ? item.actBgImg : item.bgImg})`,
            }"
          >
            <span>{{ item.name }}</span>
            <!-- <span>{{ item.num }}</span> -->
            <countTo :startVal="startVal" :endVal="item.num * 1" :duration="3000"></countTo>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'309px'" :bgSrc="require('../../../assets/imgBoxBg/yx-box5-bg.png')">
      <div class="part-3">
        <Title :text="part3_title">
          <!--  <div class="btn-tab">
            <div :class="['btn', currentTab == '1' ? 'btn-act' : '']" @click="fxyb_tab_Click('1')">
              明日
            </div>
            <div :class="['btn', currentTab == '2' ? 'btn-act' : '']" @click="fxyb_tab_Click('2')">
              7日
            </div>
          </div> -->
        </Title>
        <div class="chart-box">
          <div class="chart">
            <rightChart :chartData="pieData" :logo="logo" :color="colors" />
            <span class="center-text">{{ part3_Text }}</span>
          </div>
          <div class="legend">
            <div class="head">
              <span>{{ part3_Text }}</span>
              <span>风险量</span>
            </div>
            <div class="item" v-for="(item, index) in pieData" :key="index" @click="fxyb_Click(item.name)">
              <img :src="item.iconImg" alt="" srcset="" />
              <span class="name">{{ item.name }}</span>
              <span class="rate">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </Box>
    <AQZS
      :isShow="isShow_aqzs"
      @close="
        () => {
          this.isShow_aqzs = false;
        }
      "
    />
    <FXLY
      :isShow="isShow_fxly"
      :defaultSelected="selectedTab"
      @close="
        () => {
          this.isShow_fxly = false;
        }
      "
    />
    <FXLYItem
      :isShow="isShow_fxlyItem"
      :fxlyId="currentIndex"
      :defaultSelected="selectedTab"
      @close="
        () => {
          this.isShow_fxlyItem = false;
        }
      "
    />
    <FXYB
      :isShow="isShow_fxyb"
      :defaultSelected="selectedTab"
      :dynamicFXTitleYB="dynamicFXTitleYB"
      @close="
        () => {
          this.isShow_fxyb = false;
        }
      "
    />
  </div>
</template>
<script>
import { eventBus } from '@/main';
import Box from '../components/box';
import Title from '../components/title';
import Process from '../components/process';
import countTo from 'vue-count-to';
import { get_fxts, xSDPHBDUserList } from '../../../api/xsApi2';
import { controlscreenGetWeatherData, screenV3RiskData } from '../../../api/xsApi3';
import { wbd_list2, wbd_list3 } from '../../../api/xsApi';
import { get_fxyz_data, get_aqzs_data, get_fxyb_data } from '../../../api/xsApi3';
import LeftChart from './components/leftChart';
import LeftChartBarLine from './components/leftChartBarLine';
import rightChart from './components/rightPie';
import LineAndBarChart from './components/echartLine6AndBar3';
// import crisi from './crisisSource.json';
let timer;
export default {
  components: {
    countTo,
    Box,
    Title,
    LeftChart,
    LeftChartBarLine,
    rightChart,
    LineAndBarChart,
    Process,
    AQZS: () => import(/* webpackChunkName: "aqzs" */ './secondPage/aqzs'),
    FXLY: () => import(/* webpackChunkName: "fxly" */ './secondPage/fxly'),
    FXLYItem: () => import(/* webpackChunkName: "fxlyItem" */ './secondPage/fxlyItem'),
    FXYB: () => import(/* webpackChunkName: "fxyb" */ './secondPage/fxyb'),
  },
  data() {
    return {
      selectedTab: '',
      dynamicFXTitleYB: '',
      startVal: 0,
      // part1
      part_1_tjList: [
        {
          name: '高风险',
          num: '0',
          changeNum: '2',
          upOrDown: '1',
          bgImg: require('../../../assets/img4/gaofengxian.png'),
          color: '#ff4b4b',
        },
        {
          name: '中风险',
          num: '0',
          changeNum: '2',
          upOrDown: '1',
          bgImg: require('../../../assets/img4/zhongfengxian.png'),
          color: '#ffe082',
        },
        {
          name: '低风险',
          num: '0',
          changeNum: '2',
          upOrDown: '1',
          bgImg: require('../../../assets/img4/difengxian.png'),
          color: '#69fffd',
        },
      ],
      logo_1: '1',
      barData_g: [
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
      barData_z: [
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
      barData_d: [
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
      lineData_1_1: [
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
      lineData_1_2: [
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
      lineData_1_3: [
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
      lineData_1_4: [
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
      lineData_1_5: [
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
      lineData_1_6: [
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
      legendData: [
        {
          name: '高',
          color: '#ff6363',
        },
        {
          name: '中',
          color: '#ffc24b',
        },
        {
          name: '低',
          color: '#4bfffd',
        },
      ],
      // part2
      fxyzList: [
        {
          name: '巡查上报',
          num: '0',
          id: '1',
          bgImg: require('../../../assets/img4/source-box1.png'),
          actBgImg: require('../../../assets/img4/source-box1-s.png'),
        },
        {
          name: '智能感知',
          num: '0',
          id: '2',
          bgImg: require('../../../assets/img4/source-box2.png'),
          actBgImg: require('../../../assets/img4/source-box2-s.png'),
        },
        {
          name: '气象预警',
          num: '0',
          id: '3',
          bgImg: require('../../../assets/img4/source-box3.png'),
          actBgImg: require('../../../assets/img4/source-box3-s.png'),
        },
        {
          name: '行为监测',
          num: '0',
          id: '4',
          bgImg: require('../../../assets/img4/source-box4.png'),
          actBgImg: require('../../../assets/img4/source-box4-s.png'),
        },
        {
          name: '稽查督查',
          num: '0',
          id: '5',
          bgImg: require('../../../assets/img4/source-box5.png'),
          actBgImg: require('../../../assets/img4/source-box5-s.png'),
        },
        {
          name: '其他',
          num: '0',
          id: '6',
          bgImg: require('../../../assets/img4/source-box6.png'),
          actBgImg: require('../../../assets/img4/source-box6-s.png'),
        },
      ],
      currentIndex: '3',
      // part3
      colors: ['#14D5B7', '#2468CB', '#2F76DA', '#3B88E8', '#529EFD'],
      pieData: [
        {
          value: 20,
          name: '降雨',
          iconImg: require('../../../assets/img4/r-icon1@2x.png'),
        },
        {
          value: 10,
          name: '气温',
          iconImg: require('../../../assets/img4/r-icon2@2x.png'),
        },
        // {
        //   value: 10,
        //   name: '湿度',
        //   iconImg: require('../../../assets/img4/r-icon3@2x.png'),
        // },
        {
          value: 10,
          name: '雷电',
          iconImg: require('../../../assets/img4/r-icon5@2x.png'),
        },
        {
          value: 5,
          name: '风级',
          iconImg: require('../../../assets/img4/r-icon4@2x.png'),
        },
      ],
      part3_title: '气象预警',
      part3_Text: '气象',
      logo: '1',
      currentTab: '1',
      // 二级页面
      isShow_aqzs: false,
      isShow_fxly: false,
      isShow_fxlyItem: false,
      isShow_fxyb: false,
      currentWeatherData: {},
      firstArr2: [],
      firstArr1: [],
      firstArr3: [],
      firstArr4: [],
      firstArr5: [],
      secondArr1: [],
      secondArr2: [],
      secondArr3: [],
      secondArr4: [],
      secondArr5: [],
      weather1: [],
      weather2: [],
      weather3: [],
      weather4: [],
      fourthArr1: [],
      fourthArr2: [],
      fourthArr3: [],
      fourthArr4: [],
      fourthArr5: [],
      sixthArr1: [],
      sixthArr2: [],
      sixthArr3: [],
      sixthArr4: [],
      sixthArr5: [],
      globaltrack1: [],
      globaltrack2: [],
      globaltrack3: [],
      globaltrack4: [],
      globaltrack5: [],
      globaltrack6: [],
    };
  },
  mounted() {
    // xSDPHBDUserList({
    //     pageNum:1,
    //     pageSize:10
    // }).then(res => {
    //   console.log('res', res);
    // });
    this.fetchWeatherInfo();
    // this.get_fxts(0, 0, "1"); // 健康指数
    // this.getAQZS_data(); // 健康指数
    // this.getFXYB_data();
    this.fetchHugeData();
    timer = setInterval(() => {
      this.getAQZS_data(); // 健康指数
      this.getFXYZ_tj(); // 风险因子
      this.getFXYB_data();
      if (this.startVal == 0) {
        this.startVal = 0.1;
      } else {
        this.startVal = 0;
      }
    }, 8000);
  },
  beforeDestroy() {
    clearInterval(timer);
  },
  methods: {
    fetchWeatherInfo() {
      controlscreenGetWeatherData({}).then((res) => {
        if (res.data && res.data.code && res.data.code == 200) {
          let raw = res.data.data;
          if (raw) {
            let afterParse = JSON.parse(raw);
            // console.log('afterParse', afterParse);
            this.currentWeatherData = afterParse;
            this.getFXYZ_tj(); // 风险因子˝
            this.getAQZS_data(); // 健康指数
            this.getFXYB_data();
          }
        }
      });
      this.getAQZS_data(); // 健康指数
      this.getFXYB_data();
      //   this.getFXYZ_tj(); // 风险因子
    },
    fetchHugeData() {
      if (this.$store.state.hugeListData && this.$store.state.hugeListData.length) {
        //
      } else {
        let params = {
          currentPage: 1,
          pageSize: 600,
        };
        let p1 = wbd_list2(params);
        let p2 = wbd_list3(params);
        Promise.all([p1, p2]).then((res) => {
          let arr1 = res[0].data.data.list;
          let arr4 = res[1].data.data.list;
          arr1.forEach((ele, index) => {
            ele.activation = arr4[index].activation;
            ele.lxdh = arr4[index].lxdh;
            ele.category = arr4[index].category;
            ele.maxLevel = arr4[index].maxLevel;
            ele.paths = arr4[index].paths;
            ele.rank = arr4[index].rank;
            ele.xcy = arr4[index].xcy;
            ele.yjbs = arr4[index].yjbs;
          });
          this.$store.commit('setHugeListData', arr1);
        });
      }
    },
    // 健康指数--old
    get_fxts(level, name, rqlx) {
      get_fxts(level, name, rqlx).then((res) => {
        // console.log('健康指数', res)
        let detail = res.data.data.detail;
        let list = res.data.data.list;
        this.part_1_tjList[0].num = detail.reportNum1;
        this.part_1_tjList[1].num = detail.reportNum2;
        this.part_1_tjList[2].num = detail.reportNum3;
        // this.logo_1 += "1";
      });
    },
    aqzs_Click() {
      this.isShow_aqzs = true;
    },
    // 健康指数
    getAQZS_data() {
      get_aqzs_data().then((res) => {
        this.lineData_1_1 = [];
        this.lineData_1_2 = [];
        this.lineData_1_3 = [];
        this.lineData_1_4 = [];
        this.lineData_1_5 = [];
        this.lineData_1_6 = [];
        this.barData_g = [];
        this.barData_z = [];
        this.barData_d = [];
        let detail = res.data.data.detail;
        let list = res.data.data.list;
        // console.log('detail', detail);
        this.part_1_tjList[0].num = detail.reportNum1;
        this.part_1_tjList[1].num = detail.reportNum2;
        this.part_1_tjList[2].num = detail.reportNum3;
        this.part_1_tjList[0].changeNum = +detail.reportNum4;
        this.part_1_tjList[1].changeNum = +detail.reportNum5;
        this.part_1_tjList[2].changeNum = +detail.reportNum6;
        /*       this.part_1_tjList[0].upOrDown = detail.reportNum7;
        this.part_1_tjList[1].upOrDown = detail.reportNum8;
        this.part_1_tjList[2].upOrDown = detail.reportNum9; */
        list.map((item) => {
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
          let obj7 = {
            name: item.reportType,
            value: item.reportNum7,
          };
          let obj8 = {
            name: item.reportType,
            value: item.reportNum8,
          };
          let obj9 = {
            name: item.reportType,
            value: item.reportNum9,
          };
          this.lineData_1_1.push(obj1);
          this.lineData_1_2.push(obj2);
          this.lineData_1_3.push(obj3);
          this.lineData_1_4.push(obj4);
          this.lineData_1_5.push(obj5);
          this.lineData_1_6.push(obj6);
          this.barData_g.push(obj7);
          this.barData_z.push(obj8);
          this.barData_d.push(obj9);
          this.logo_1 += '1';
        });
      });
    },
    // 高中低风险统计点击，联动地图
    part1_tj_click(item) {
      let riskLevle = '';
      switch (item.name) {
        case '高风险':
          riskLevle = '1';
          break;
        case '中风险':
          riskLevle = '2';
          break;
        case '低风险':
          riskLevle = '3';
          break;
        default:
          break;
      }
      eventBus.$emit('drawPointByRiskLevel', riskLevle);
    },
    // 获取风险因子统计数据
    getFXYZ_tj() {
      this.fxyzList[5].num = 20;
      screenV3RiskData({}).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          let track1 = shorter.PatrolData;
          let track2 = shorter.actionData;
          let track3 = shorter.inspectData;
          let track4 = shorter.otherData;
          let track5 = shorter.perceptionData;
          let track6 = shorter.weatherData;
          this.globaltrack1 = track1;
          this.globaltrack2 = track2;
          this.globaltrack3 = track3;
          this.globaltrack4 = track4;
          this.globaltrack5 = track5;
          this.globaltrack6 = track6;
          if (track1) {
            let res1 = track1.reduce((acc, current) => {
              return acc + current.number;
            }, 0);
            this.fxyzList[0].num = res1;
          }
          if (track2) {
            let res2 = track2.reduce((acc, current) => {
              return acc + current.number;
            }, 0);
            this.fxyzList[3].num = res2;
          }
          if (track3) {
            let res3 = track3.reduce((acc, current) => {
              return acc + current.number;
            }, 0);
            this.fxyzList[4].num = res3;
          }
          if (track4) {
            //
          }
          if (track5) {
            let res5 = track5.reduce((acc, current) => {
              return acc + current.number;
            }, 0);
            this.fxyzList[1].num = res5;
          }
          if (track6) {
            let res6 = track6.reduce((acc, current) => {
              return acc + current.number;
            }, 0);
            this.fxyzList[2].num = res6;
          }
        }
      });
    },
    fxyzClick(item, index) {
      this.currentIndex = item.id;
      switch (this.currentIndex) {
        case '1':
          this.selectedTab = '巡查上报';
          break;
        case '2':
          this.selectedTab = '智能感知';
          break;
        case '3':
          this.selectedTab = '气象预警';
          break;
        case '4':
          this.selectedTab = '行为监测';
          break;
        case '5':
          this.selectedTab = '稽查督查';
          break;
        case '6':
          this.selectedTab = '其他';
          break;
      }
      // this.isShow_fxlyItem = true
      switch (index) {
        case 0:
          this.part3_title = '巡查上报';
          this.part3_Text = '巡查';
          this.pieData = [
            {
              value: 0,
              name: '安防',
              iconImg: require('../../../assets/img4/x-icon1.png'),
            },
            {
              value: 0,
              name: '消防',
              iconImg: require('../../../assets/img4/x-icon2.png'),
            },
            {
              value: 0,
              name: '周边',
              iconImg: require('../../../assets/img4/x-icon1.png'),
            },
            {
              value: 0,
              name: '本土',
              iconImg: require('../../../assets/img4/x-icon4.png'),
            },
            {
              value: 0,
              name: '其他',
              iconImg: require('../../../assets/img4/x-icon5.png'),
            },
          ];
          break;
        case 1:
          this.part3_title = '智能感知';
          this.part3_Text = 'AI';
          this.pieData = [
            {
              value: 0,
              name: '烟感',
              iconImg: require('../../../assets/img4/ai-icon1.png'),
            },
            {
              value: 0,
              name: '水压',
              iconImg: require('../../../assets/img4/ai-icon2.png'),
            },
            {
              value: 0,
              name: '水位',
              iconImg: require('../../../assets/img4/ai-icon3.png'),
            },
            {
              value: 0,
              name: '监控',
              iconImg: require('../../../assets/img4/ai-icon4.png'),
            },
            {
              value: 0,
              name: '电压',
              iconImg: require('../../../assets/img4/ai-icon5.png'),
            },
          ];
          break;
        case 2:
          this.part3_title = '气象预警';
          this.part3_Text = '气象';
          this.pieData = [
            {
              value: 0,
              name: '降雨',
              iconImg: require('../../../assets/img4/r-icon1@2x.png'),
            },
            {
              value: 0,
              name: '气温',
              iconImg: require('../../../assets/img4/r-icon2@2x.png'),
            },
            {
              value: 0,
              name: '雷电',
              iconImg: require('../../../assets/img4/r-icon4@2x.png'),
            },
            {
              value: 0,
              name: '风级',
              iconImg: require('../../../assets/img4/r-icon5@2x.png'),
            },
          ];
          break;
        case 3:
          this.part3_title = '行为监测';
          this.part3_Text = '行为';
          this.pieData = [
            {
              value: 0,
              name: '活动',
              iconImg: require('../../../assets/img4/xw-icon1.png'),
            },
            {
              value: 0,
              name: '人流',
              iconImg: require('../../../assets/img4/xw-icon2.png'),
            },
            {
              value: 0,
              name: '占道',
              iconImg: require('../../../assets/img4/xw-icon3.png'),
            },
            {
              value: 0,
              name: '越界',
              iconImg: require('../../../assets/img4/xw-icon4.png'),
            },
            {
              value: 0,
              name: '其他',
              iconImg: require('../../../assets/img4/xw-icon5.png'),
            },
          ];
          break;
        case 4:
          this.part3_title = '稽查督查';
          this.part3_Text = '稽查';
          this.pieData = [
            {
              value: 0,
              name: '城管',
              iconImg: require('../../../assets/img4/jc-icon1.png'),
            },
            {
              value: 0,
              name: '住建',
              iconImg: require('../../../assets/img4/jc-icon2.png'),
            },
            {
              value: 0,
              name: '消防',
              iconImg: require('../../../assets/img4/jc-icon3.png'),
            },
            {
              value: 0,
              name: '公安',
              iconImg: require('../../../assets/img4/jc-icon4.png'),
            },
            {
              value: 0,
              name: '其他',
              iconImg: require('../../../assets/img4/jc-icon5.png'),
            },
          ];
          break;
        case 5:
          // this.currentIndex = item.id
          this.isShow_fxlyItem = true;
          break;
        default:
          break;
      }
      this.getFXYB_data();
    },
    fxly_Click() {
      this.isShow_fxly = true;
      switch (this.currentIndex) {
        case '1':
          this.selectedTab = '巡查上报';
          break;
        case '2':
          this.selectedTab = '智能感知';
          break;
        case '3':
          this.selectedTab = '气象预警';
          break;
        case '4':
          this.selectedTab = '行为监测';
          break;
        case '5':
          this.selectedTab = '稽查督查';
          break;
        case '6':
          this.selectedTab = '其他';
          break;
      }
    },
    getFXYB_data() {
      switch (this.currentIndex) {
        case '1':
          const tag1 = this.globaltrack1.find((ele) => {
            return ele.name == '安防';
          });
          const tag2 = this.globaltrack1.find((ele) => {
            return ele.name == '消防';
          });
          const tag3 = this.globaltrack1.find((ele) => {
            return ele.name == '周边';
          });
          const tag4 = this.globaltrack1.find((ele) => {
            return ele.name == '本土';
          });
          const tag5 = this.globaltrack1.find((ele) => {
            return ele.name == '本体';
          });
          const tag6 = this.globaltrack1.find((ele) => {
            return !ele.name;
          });
          const tag7 = this.globaltrack1.find((ele) => {
            return ele.name == '其他';
          });
          this.pieData[0].value = (tag1 && tag1.number) || 0;
          this.pieData[1].value = (tag2 && tag2.number) || 0;
          this.pieData[2].value = (tag3 && tag3.number) || 0;
          this.pieData[3].value = (tag4 && tag4.number) + (tag5 && tag5.number) || 0;
          this.pieData[4].value = (tag6 && tag6.number) + (tag7 && tag7.number) || 0;
          break;
        case '2':
          const tag21 = this.globaltrack5.find((ele) => {
            return ele.name == '烟感';
          });
          this.pieData[0].value = (tag21 && tag21.number) || 0;
          this.pieData[1].value = 0;
          this.pieData[2].value = 0;
          this.pieData[3].value = 0;
          this.pieData[4].value = 0;
          break;
        case '3':
          const tag31 = this.globaltrack6.find((ele) => {
            return ele.name == '降雨';
          });
          const tag32 = this.globaltrack6.find((ele) => {
            return ele.name == '气温';
          });
          const tag33 = this.globaltrack6.find((ele) => {
            return ele.name == '雷电';
          });
          const tag34 = this.globaltrack6.find((ele) => {
            return ele.name == '风级';
          });
          this.pieData[0].value = (tag31 && tag31.number) || 0;
          this.pieData[1].value = (tag32 && tag32.number) || 0;
          this.pieData[2].value = (tag33 && tag33.number) || 0;
          this.pieData[3].value = (tag34 && tag34.number) || 0;
          break;
        case '4':
          const tag41 = this.globaltrack2.find((ele) => {
            return ele.name == '活动';
          });
          const tag42 = this.globaltrack2.find((ele) => {
            return ele.name == '人流';
          });
          const tag43 = this.globaltrack2.find((ele) => {
            return ele.name == '占道';
          });
          const tag44 = this.globaltrack2.find((ele) => {
            return ele.name == '越界';
          });
          const tag45 = this.globaltrack2.find((ele) => {
            return ele.name == '其他';
          });
          this.pieData[0].value = (tag41 && tag41.number) || 0;
          this.pieData[1].value = (tag42 && tag42.number) || 0;
          this.pieData[2].value = (tag43 && tag43.number) || 0;
          this.pieData[3].value = (tag44 && tag44.number) || 0;
          this.pieData[4].value = (tag45 && tag45.number) || 0;
          break;
        case '5':
          const tag51 = this.globaltrack3.find((ele) => {
            return ele.name == '其他';
          });
          this.pieData[0].value = this.sixthArr1.length;
          this.pieData[1].value = this.sixthArr2.length;
          this.pieData[2].value = this.sixthArr3.length;
          this.pieData[3].value = this.sixthArr4.length;
          this.pieData[4].value = (tag51 && tag51.number) || 0;
          break;
        case '6':
          break;
      }
      this.logo += '1';
    },
    fxyb_tab_Click(val) {
      this.currentTab = val;
      this.getFXYB_data();
    },
    fxyb_Click(legendName) {
      this.$store.commit('setTemporaryFXSourceYBList', []);
      this.isShow_fxyb = true;
      this.dynamicFXTitleYB = legendName;
      switch (this.currentIndex) {
        case '1':
          this.selectedTab = '巡查上报';
          break;
        case '2':
          this.selectedTab = '智能感知';
          break;
        case '3':
          this.selectedTab = '气象预警';
          break;
        case '4':
          this.selectedTab = '行为监测';
          break;
        case '5':
          this.selectedTab = '稽查督查';
          break;
        case '6':
          this.selectedTab = '其他';
          break;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 97%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
    .tj {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      .item {
        width: 145px;
        height: 100%;
        box-sizing: border-box;
        padding-left: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        .col {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .col-1 {
          span:nth-child(1) {
            font-family: SourceHanSansCN-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 22px;
            letter-spacing: 1px;
            color: #a8b0d0;
          }
          span:nth-child(2) {
            font-family: LCDDIGITALFONT;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 22px;
            letter-spacing: 1px;
            color: #ffffff;
          }
        }
        .col-2 {
          span {
            font-family: SourceHanSansCN-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 22px;
            letter-spacing: 1px;
            color: #a8b0d0;
          }
          .change {
            span {
              font-family: LCDDIGITALFONT;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 18px;
              letter-spacing: 0px;
              color: #ea5757;
            }
            img {
              width: 11px;
              height: 13px;
            }
          }
        }
      }
    }
    .chart-box {
      width: 100%;
      height: 245px;
      .chart {
        width: 100%;
        height: 100%;
        position: relative;
        .legend {
          right: 0;
          top: 50px;
          position: absolute;
          width: 85px;
          margin-left: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item {
            .point {
              display: inline-block;
              width: 7px;
              height: 7px;
            }
            .name {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 18px;
              letter-spacing: 3px;
              color: #858eb4;
            }
          }
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
    .fxyz {
      width: 100%;
      height: 150px;
      box-sizing: border-box;
      padding-left: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-around;
      margin: 5px 0;
      .item {
        width: 146px;
        height: 50px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        // background: url("../../../assets/img4/beijing2.png") no-repeat center;
        // background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        box-sizing: border-box;
        padding-left: 65px;
        cursor: pointer;
        span:nth-child(1) {
          font-family: AdobeHeitiStd-Regular;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 1px;
          color: #ffffff;
        }
        span:nth-child(2) {
          font-family: LCDDIGITALFONT;
          font-size: 22px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 1px;
          color: #ffffff;
        }
      }
      .active-item {
        // background: url("../../../assets/img4/beijing.png") no-repeat center;
        // background-size: 100% 100%;
        span:nth-child(2) {
          color: #ffca97;
        }
      }
    }
  }
  .part-3 {
    .btn-tab {
      height: 26px;
      width: 155px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        width: 73px;
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
        opacity: 0.8;
        cursor: pointer;
      }
      .btn-act {
        background: url('../../../assets/img4/tab-selected.png') no-repeat center;
        background-size: 100% 100%;
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .chart-box {
      display: flex;
      .chart {
        width: 50%;
        height: 250px;
        background: url('../../../assets/img4/rose-graph-bg.png') no-repeat center;
        background-position: 50% 50%;
        position: relative;
        .center-text {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          border: 4px solid #7fa0fa;
          border-radius: 50%;
          box-sizing: border-box;
          font-family: SourceHanSansCN-Bold;
          font-size: 14px;
          font-weight: 900;
          font-stretch: normal;
          letter-spacing: 0px;
          text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
          background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .legend {
        width: 50%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        box-sizing: border-box;
        padding-left: 20px;
        margin-bottom: 10px;
        .head {
          width: 176px;
          height: 30px;
          box-sizing: border-box;
          padding-left: 35px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background: url('../../../assets/img4/r-line.png') no-repeat bottom;
          background-size: 100% auto;
          span {
            font-family: SourceHanSansCN-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #a2aaca;
            &:nth-child(1) {
              display: inline-block;
              width: 85px;
            }
          }
        }
        .item {
          width: 176px;
          height: 30px;
          box-sizing: border-box;
          padding-left: 10px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background: url('../../../assets/img4/r-line.png') no-repeat bottom;
          background-size: 100% auto;
          margin-top: 5px;
          cursor: pointer;
          img {
            width: 18px;
            height: 18px;
          }
          .name {
            display: inline-block;
            width: 85px;
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
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
}
</style>
