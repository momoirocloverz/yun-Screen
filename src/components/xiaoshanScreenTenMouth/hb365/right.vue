<template>
  <div class="hb365RightCon globalFireFoxScrollBar">
    <Box :height="'261px'" :bgSrc="require('../../../assets/imgBoxBg/h-box3-bg.png')">
      <div class="part-1">
        <Title :text="'考核监督'" @textClick="khjd_title_click">
          <div class="detailBtn" @click="khjd_Click">详情<i class="el-icon-arrow-right"></i></div>
        </Title>
        <!-- <div class="chart">
          <RightChartBar
            :chartData_1="barData_1"
            :chartData_2="barData_2"
            :chartData_3="barData_3"
            :logo="logo_1"
          />
        </div> -->
        <div class="khjd" v-if="false">
          <div class="top-3">
            <div class="item" v-for="(item, index) in top3List" :key="index">
              <div class="name">{{ item.name }}</div>
              <img :src="item.imgSrc" alt="" srcset="" />
              <div class="num">{{ item.num }}分</div>
            </div>
          </div>
          <div class="list">
            <div class="t-head">
              <span>姓名</span>
              <span>分数</span>
            </div>
            <div class="t-body globalFireFoxScrollBar">
              <div class="row" v-for="(item, index) in khjdList" :key="index">
                <span>{{ item.name }}</span>
                <span>{{ item.num }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="khjd-v2">
          <div class="head">
            <span>排名</span>
            <span>分数</span>
          </div>
          <div class="row-box globalFireFoxScrollBar">
            <vue-seamless-scroll :data="khjdList" class="auto-scorll-table" :class-option="optionSingleHeight">
              <div class="row" v-for="(item, index) in khjdList" :key="index">
                <div class="col-1">
                  <span class="index">
                    <span v-show="index >= 3">
                      {{ index + 1 }}
                    </span>
                  </span>
                  <span class="name">{{ item.userName }}</span>
                </div>
                <div class="col-2">
                  <div class="process" :style="{ width: `${item.khfz * 1}%` }"></div>
                </div>
                <div class="col-3">{{ item.khfz }}</div>
              </div>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'363px'" :bgSrc="require('../../../assets/imgBoxBg/h-box4-bg.png')">
      <div class="part-2">
        <Title :text="'护保达人'" @textClick="hbdr_title_click">
          <!-- <div
            class="btn"
            @click="hbdr_Click"
          >查看详情</div> -->
        </Title>
        <div class="rank-list globalFireFoxScrollBar">
          <div class="item" v-for="(item, index) in rankList" :key="index">
            <div class="info">
              <div :class="['index', index < 3 ? 'y-index' : 'b-index']">
                <span class="text">{{ index + 1 }}</span>
              </div>
              <span class="name">{{ item.name | formatName }}</span>
              <span class="street">{{ item.streetName }}</span>
              <span class="type">{{ item.type }}</span>
              <div class="integral">
                <span>护保积分：</span>
                <span :style="{ color: index < 3 ? '#f5a75a' : '#4eaaff' }">{{ item.integral }}</span>
              </div>
            </div>
            <div :class="['process-box', index < 3 ? 'y-bg' : 'b-bg']">
              <Process :outWidth="`100%`" :outHeight="`${4 / 192}rem`" :maxNum="100" :currentNum="item.integral * 1" :index="index" />
            </div>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'293px'" :bgSrc="require('../../../assets/imgBoxBg/h-box5-bg.png')">
      <div class="part-3">
        <Title :text="'教育培训'">
          <!-- <div class="btn" @click="jypx_Click">查看详情</div> -->
          <div class="detailBtn" @click="jypx_Click">详情<i class="el-icon-arrow-right"></i></div>
        </Title>
        <div class="chart">
          <div class="bar">
            <RightBottomBar :chartData="barData_4" :logo="logo_2" />
          </div>
          <div class="radar">
            <RightRadar :chartData="radarData" :logo="logo_3" />
          </div>
        </div>
      </div>
    </Box>
    <KHDC
      :isShow="isShow_khdc"
      @close="
        () => {
          this.isShow_khdc = false;
        }
      "
    />
    <JYPX
      :isShow="isShow_jypx"
      @close="
        () => {
          this.isShow_jypx = false;
        }
      "
    />
  </div>
</template>
<script>
import { eventBus } from '@/main';
import Box from '../components/box';
import Title from '../components/title';
import { get_khjd_data, get_hbdr_data, get_jypx_data, get_khjd_detail, xSDPHBDWControllerHbdrTJ, xSDPHBDWControllerJypxTJ } from '../../../api/xsApi3';
import Table from './components/table';
import Process from './components/process';
import RightChartBar from './components/rightChart';
import RightBottomBar from './components/rightBottomBar';
import RightRadar from './components/rightRadar';
// 二级页面
import KHDC from './secondPage/khdc.vue';
import JYPX from './secondPage/jypx.vue';
export default {
  components: {
    Box,
    Title,
    Table,
    RightChartBar,
    Process,
    RightBottomBar,
    RightRadar,
    KHDC,
    JYPX,
  },
  data() {
    return {
      // part1
      barData_1: [],
      barData_2: [],
      barData_3: [],
      logo_1: '1',
      isShow_khdc: false,
      top3List: [
        {
          name: '田欢乐',
          imgSrc: require('../../../assets/img4/yinpai.png'),
          num: '92',
        },
        {
          name: '贾旭明',
          imgSrc: require('../../../assets/img4/jinpai.png'),
          num: '96',
        },
        {
          name: '张康',
          imgSrc: require('../../../assets/img4/tongpai.png'),
          num: '90',
        },
      ],
      khjdList: [
        {
          userName: '李子璇',
          khfz: '89',
        },
        {
          userName: '张晓晨',
          khfz: '80',
        },
        {
          userName: '李子璇',
          khfz: '75',
        },
        {
          userName: '张晓晨',
          khfz: '70',
        },
        {
          userName: '李子璇',
          khfz: '68',
        },
        {
          userName: '张晓晨',
          khfz: '68',
        },
      ],
      // part2
      rankList: [
        {
          name: '钟汪明',
          streetName: '',
          type: '护保员',
          integral: '97',
        },
        {
          name: '覃宸语',
          streetName: '',
          type: '志愿者',
          integral: '95',
        },
        {
          name: '陶就莲',
          streetName: '',
          type: '其他',
          integral: '94',
        },
        {
          name: '龙云君',
          streetName: '',
          type: '志愿者',
          integral: '92',
        },
        {
          name: '胡芷浦',
          streetName: '',
          type: '志愿者',
          integral: '91',
        },
      ],
      // part3
      barData_4: [
        {
          name: '单位参考率',
          num: 98,
        },
        {
          name: '人员参考率',
          num: 97,
        },
        {
          name: '人员合格率',
          num: 68,
        },
      ],
      logo_2: '1',
      radarData: [
        {
          name: '扑救初起火灾',
          max: 50,
          num: 23,
        },
        {
          name: '消防报警',
          max: 50,
          num: 17,
        },
        {
          name: '逃生自救',
          max: 50,
          num: 29,
        },
        {
          name: '检查消除火灾隐患',
          max: 50,
          num: 44,
        },
        {
          name: '组织疏散',
          max: 50,
          num: 31,
        },
        {
          name: '宣传培训',
          max: 50,
          num: 38,
        },
      ],
      logo_3: '1',
      isShow_jypx: false,
      optionSingleHeight: {
        singleHeight: 40,
      },
    };
  },
  filters: {
    formatName(val) {
      if (val.length >= 3) {
        return val.substr(0, 1) + ' * ' + val.substr(2);
      } else if (val.length == 2) {
        return val.substr(0, 1) + ' * ';
      }
    },
  },
  mounted() {
    this.getKHJD_data(); // 考核监督
    this.getHBDR_data(); // 护宝达人
    this.getJYPX_data(); // 教育培训
    // this.fetchHBDWControllerHbdrTJ();
    // this.fetchHBDWControllerJypxTJ();
  },
  methods: {
    fetchHBDWControllerJypxTJ() {
      xSDPHBDWControllerJypxTJ({}).then((res) => {
        console.log(res);
      });
    },
    fetchHBDWControllerHbdrTJ() {
      xSDPHBDWControllerHbdrTJ({}).then((res) => {
        console.log(res);
      });
    },
    // 考核监督
    getKHJD_data() {
      let params = {
        currentPage: 1,
        pageSize: 10,
      };
      get_khjd_detail(params).then((res) => {
        this.khjdList = res.data.data.list;
      });
      // get_khjd_data().then((res) => {
      //   let list = res.data.data
      //   list.map((item) => {
      //     let obj_1 = {
      //       name: item.reportType,
      //       num: item.reportNum3,
      //     }
      //     let obj_2 = {
      //       name: item.reportType,
      //       num: item.reportNum2,
      //     }
      //     let obj_3 = {
      //       name: item.reportType,
      //       num: item.reportNum1,
      //     }
      //     this.barData_1.push(obj_1)
      //     this.barData_2.push(obj_2)
      //     this.barData_3.push(obj_3)
      //     this.logo_1 += '1'
      //   })
      // })
    },
    // 考核监督标题点击
    khjd_title_click() {
      let poiArr = [
        {
          poi: '120.3275,30.1209',
          type: 'yingji',
        },
        {
          poi: '120.3109,29.9501',
          type: 'zhiyuanzhe',
        },
        {
          poi: '120.329,30.235',
          type: 'wenwuxunjian',
        },
        {
          poi: '120.275,30.1609',
          type: 'yingji',
        },
        {
          poi: '120.2410,29.9765',
          type: 'zhiyuanzhe',
        },
        {
          poi: '120.3046,29.985',
          type: 'wenwuxunjian',
        },
        {
          poi: '120.3016,29.9974',
          type: 'dangyuan',
        },
      ];
      if (this.$route.name == 'hb365') {
        eventBus.$emit('peoplePoi', poiArr, 'people');
      } else if (this.$route.name == 'hb365Copy') {
        this.$store.commit('setHb365CopyPartData', poiArr);
      }
    },
    khjd_Click() {
      this.isShow_khdc = true;
    },
    // 护宝达人
    getHBDR_data() {
      //   let temp = [
      //     {
      //       id: '13bde602f81316ba7df68782809e4b71',
      //       name: '钟汪明',
      //       userName: '钟汪明',
      //       roleName: '文保员',
      //       phone: '13967141828',
      //       pointName: '纱帽山窑址',
      //       jd: null,
      //       jf: '97',
      //     },
      //     {
      //       id: '7f42c13b72d70ec8df78b1d4e8efefb5',
      //       userName: '覃宸语',
      //       name: '覃宸语',
      //       roleName: '志愿者',
      //       phone: '13415189356',
      //       pointName: null,
      //       jd: null,
      //       jf: '95',
      //     },
      //     {
      //       id: '9a9e18b5dd39132d76e7692dc045db56',
      //       userName: '陶就莲',
      //       name: '陶就莲',
      //       roleName: '其他',
      //       phone: '13922569589',
      //       pointName: null,
      //       jd: null,
      //       jf: '94',
      //     },
      //     {
      //       id: '9e2a4a100a25dd7c2beb167a5ecaca9a',
      //       userName: '龙云君',
      //       name: '龙云君',
      //       roleName: '志愿者',
      //       phone: '13978917664',
      //       pointName: null,
      //       jd: null,
      //       jf: '92',
      //     },
      //     {
      //       id: '31a0d70ef934631f7db70b37d363c11a',
      //       userName: '胡芷浦',
      //       roleName: '志愿者',
      //       name: '胡芷浦',
      //       phone: '13628948955',
      //       pointName: null,
      //       jd: null,
      //       jf: '91',
      //     },
      //   ];
      //   this.rankList = temp;
      /*    get_hbdr_data(1, 5).then((res) => {
        this.rankList = [];
        let list = res.data.data.list;
        console.log(list);
        list.map((item) => {
          let obj = {
            name: item.userName,
            streetName: '',
            type: item.roleName && item.roleName == '文保员' ? '护保员' : item.roleName,
            integral: item.jf,
          };
            this.rankList.push(obj);
        });
      }); */
    },
    // 护宝达人标题点击
    hbdr_title_click() {
      let poiArr = [
        {
          poi: '120.3275,30.1209',
          type: 'wenwuxunjian',
        },
        {
          poi: '120.3016,29.9974',
          type: 'zhiyuanzhe',
        },
        {
          poi: '120.329,30.235',
          type: 'wenwuxunjian',
        },
        {
          poi: '120.275,30.1609',
          type: 'qita',
        },
        {
          poi: '120.3046,29.985',
          type: 'zhiyuanzhe',
        },
      ];
      if (this.$route.name == 'hb365') {
        eventBus.$emit('peoplePoi', poiArr, 'people');
      } else if (this.$route.name == 'hb365Copy') {
        this.$store.commit('setHb365CopyPartData', poiArr);
      }
    },
    hbdr_Click() {},
    // 教育培训
    getJYPX_data() {
      get_jypx_data().then((res) => {
        this.radarData = [];
        let detail = res.data.data.detail;
        let list = res.data.data.list;
        this.barData_4[0].num = detail.reportNum1;
        this.barData_4[1].num = detail.reportNum2;
        this.barData_4[2].num = detail.reportNum3;
        this.logo_2 += '1';
        list.map((item) => {
          let obj = {
            name: item.reportType,
            max: 50,
            num: item.reportNum1,
          };
          this.radarData.push(obj);
        });
        this.logo_3 += '1';
      });
    },
    jypx_Click() {
      this.isShow_jypx = true;
    },
  },
};
</script>
<style lang="less" scoped>
.hb365RightCon {
  width: 100%;
  height: 97%;
  overflow: auto;
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
      margin-left: 8px;
    }
    // .chart {
    //   width: 100%;
    //   height: 200px;
    // }
    .khjd {
      width: 100%;
      height: 190px;
      display: flex;
      margin-left: 5px;
      .top-3 {
        width: 299px;
        height: 100%;
        background: url('../../../assets/img4/jiangtai.png') no-repeat bottom;
        background-size: 100% auto;
        position: relative;
        .item {
          width: 86px;
          height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          &:nth-child(1) {
            top: 50px;
            left: 5px;
          }
          &:nth-child(2) {
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
          }
          &:nth-child(3) {
            top: 50px;
            right: 5px;
          }
          .name {
            width: 100%;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url('../../../assets/img4/mingzibeijing.png') no-repeat center;
            background-size: 100% 100%;
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 2px;
            color: #ffffff;
          }
          img {
            width: 51px;
            height: 62px;
          }
          .num {
            background-size: 100% 100%;
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 2px;
            color: #ffffff;
          }
        }
      }
      .list {
        width: 130px;
        height: 170px;
        margin-top: 20px;
        margin-left: 20px;
        .t-head {
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          padding-left: 15px;
          background: rgba(227, 168, 111, 0.2);
          span {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: 14px;
            color: #c2966d;
          }
        }
        .t-body {
          width: 100%;
          height: 140px;
          overflow: auto;
          // display: flex;
          // flex-direction: column;
          .row {
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding-left: 15px;
            background: rgba(111, 175, 227, 0.2);
            margin-top: 2px;
            span {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              font-size: 14px;
              color: #a8b0d0;
            }
          }
        }
      }
    }
    .khjd-v2 {
      width: 100%;
      height: 190px;
      box-sizing: border-box;
      padding: 0 10px;
      .head {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-family: SourceHanSansCN-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 2px;
          color: #a2a9cb;
        }
        span:nth-child(2) {
          margin-right: 5px;
        }
      }
      .row-box {
        width: 100%;
        height: calc(100% - 30px);
        overflow: auto;
        .row {
          width: 100%;
          height: 34px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          .col-1 {
            width: 90px;
            height: 100%;
            background: url('../../../assets/img4/putong.png') no-repeat center;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            box-sizing: border-box;
            // padding-left: 35px;
            .index {
              width: 26px;
              height: 34px;
              margin-right: 7px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: SourceHanSansCN-Regular;
              font-size: 15px;
              font-style: italic;
              font-weight: normal;
              font-stretch: normal;
              color: rgba(255, 255, 255, 0.856);
            }
            .name {
              font-family: SourceHanSansCN-Regular;
              font-size: 16px;
              width: 53px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              letter-spacing: 1px;
              color: rgba(255, 255, 255, 0.856);
            }
          }
          .col-2 {
            width: 280px;
            height: 25px;
            background: #253066;
            box-sizing: border-box;
            padding: 0 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .process {
              height: 5px;
              background: linear-gradient(to right, #51d4e000, #51d4e0);
            }
          }
          .col-3 {
            width: 50px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #253066;
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 2px;
            color: rgba(255, 255, 255, 0.959);
          }
          &:nth-child(1) {
            .col-1 {
              background: url('../../../assets/img4/1.png') no-repeat center;
              background-size: 100% 100%;
            }
          }
          &:nth-child(2) {
            .col-1 {
              background: url('../../../assets/img4/2.png') no-repeat center;
              background-size: 100% 100%;
            }
          }
          &:nth-child(3) {
            .col-1 {
              background: url('../../../assets/img4/3.png') no-repeat center;
              background-size: 100% 100%;
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
      margin-left: 8px;
    }
    .rank-list {
      width: 100%;
      height: 290px;
      overflow: auto;
      box-sizing: border-box;
      padding: 0 10px;
      .item {
        width: 100%;
        height: 72px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .info {
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .index {
            width: 24px;
            height: 26px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            .text {
              font-family: ArialMT;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #ffffff;
              // background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
              // -webkit-background-clip: text;
              // -webkit-text-fill-color: transparent;
            }
          }
          .y-index {
            background: url('../../../assets/img4/biaoqian1.png') no-repeat center;
            background-size: 100%;
            .text {
              color: #ffe8d0;
            }
          }
          .b-index {
            background: url('../../../assets/img4/biaoqian2.png') no-repeat center;
            background-size: 100%;
            .text {
              color: #7bcaff;
            }
          }
          .name {
            display: inline-block;
            // width: 60px;
            width: 100px;
            font-family: SourceHanSansCN-Medium;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #eceff4;
          }
          .street {
            display: inline-block;
            width: 57px;
            font-family: SourceHanSansCN-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 2px;
            color: #a8b0d0;
            margin-left: 25px;
            margin-right: 10px;
          }
          .type {
            display: inline-block;
            width: 110px;
            font-family: SourceHanSansCN-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 2px;
            color: #a8b0d0;
            margin-right: 20px;
          }
          .integral {
            width: 121px;
            display: flex;
            justify-content: space-between;
            span:nth-child(1) {
              font-family: SourceHanSansCN-Bold;
              font-size: 16px;
              letter-spacing: 1px;
              color: #a8b0d0;
              width: 85px;
            }
            span:nth-child(2) {
              font-family: MicrosoftYaHei-Bold;
              font-size: 18px;
              letter-spacing: 1px;
              color: #f5a75a;
            }
          }
        }
        .process-box {
          width: 100%;
          height: 25px;
          box-sizing: border-box;
          padding: 0 10px;
          display: flex;
          align-items: center;
        }
        .y-bg {
          background: rgba(252, 170, 28, 0.13);
        }
        .b-bg {
          background: rgba(52, 195, 255, 0.13);
        }
      }
    }
  }
  .part-3 {
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
      margin-left: 8px;
    }
    .chart {
      width: 100%;
      height: 220px;
      display: flex;
      .bar {
        width: 43%;
        height: 100%;
        box-sizing: border-box;
        border-right: 1px solid rgba(15, 89, 146, 0.5);
      }
      .radar {
        width: 57%;
        height: 100%;
      }
    }
  }
}
.detailBtn {
  width: 70px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #8ba4fe;
  background: #34478c;
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  letter-spacing: 1px;
  color: #8ba4fe;
  cursor: pointer;
  .el-icon-arrow-right {
    width: 6px;
  }
}
</style>
