<template>
  <div class="container">
    <div class="v2">
      <Box :height="'392px'" :bgSrc="require('../../../assets/imgBoxBg/zb-box2-bg.png')">
        <div class="part-1">
          <Title :text="'AI智保'"></Title>
          <div class="tj">
            <div class="item" v-for="(item, index) in tj_1" :key="index">
              <img :src="item.imgSrc" alt="" />
              <div class="info">
                <span>{{ item.name }}</span>
                <span>{{ item.num }}</span>
              </div>
            </div>
          </div>
          <div class="aizb-table">
            <Table
              :tableData="tableData_aizb"
              :tableColumns="tableColumn_aizb"
              :isStripe="true"
              :headTextColor="'#c2966d'"
              :headHeight="`${35 / 192}rem`"
              :headBgColor="'rgba(227,168,111, 0.2)'"
              :rowHeight="`${34 / 192}rem`"
              :rowTextColor="'#a8b0d0'"
            >
              <template slot="status" slot-scope="scope">
                <span
                  :style="{
                    color: scope.row.status !== '在线' ? '#FD341E' : '#a8b0d0',
                    fontSize: '14px',
                  }"
                  >{{ scope.row.status !== '在线' ? '离线' : '在线' }}</span
                >
              </template>
              <template slot="content" slot-scope="scope">
                <span
                  :style="{
                    color: scope.row.content !== '正常' ? '#ffc231' : '#a8b0d0',
                    fontSize: '14px',
                  }"
                  >{{ scope.row.content }}</span
                >
              </template>
              <template slot="detail" slot-scope="scope">
                <div class="btn">
                  查看
                </div>
              </template>
            </Table>
          </div>
        </div>
      </Box>
      <Box :height="'542px'" :bgSrc="require('../../../assets/imgBoxBg/zb-box2-bg.png')">
        <div class="part-2">
          <Title :text="'水况监测'"> </Title>
          <div class="tj">
            <div class="item" v-for="(item, index) in tj_2" :key="index">
              <img :src="item.imgSrc" alt="" />
              <div class="info">
                <span>{{ item.name }}</span>
                <span>{{ item.num }}</span>
              </div>
            </div>
          </div>
          <div class="chart-box">
            <div class="chart">
              <LeftChartV2 :chartData="gauge_tj[0]" :max="10000" :logo="logo_3" />
            </div>
            <div class="chart">
              <LeftChartV2 :chartData="gauge_tj[1]" :title="'水位实时监测(m)'" :unit="'m'" :logo="logo_3" />
            </div>
          </div>
          <div class="chart">
            <LeftChartLine :chartData_1="lineData_1_v2" :chartData_2="lineData_2_v2" :logo="logo_1" />
          </div>
        </div>
      </Box>
    </div>

    <!-- 二级页面 -->
    <AIGZ
      :isShow="isShow_aigz"
      @close="
        () => {
          this.isShow_aigz = false;
        }
      "
    />
    <AIYJ
      :isShow="isShow_aiyj"
      @close="
        () => {
          this.isShow_aiyj = false;
        }
      "
    />
    <JMZK :isShow="jmzkBoxShow" @close="jmzkBoxHidden" />
  </div>
</template>

<script>
import Box from '../components/box';
import Title from '../components/title';

import { get_aigz_data, get_aiyj_data, get_aizb_data, get_skjc_data } from '../../../api/xsApi3';
import { wbd_list2, wbd_list3 } from '../../../api/xsApi';
import { eventBus } from '@/main';
import LeftChartLine from './components/leftChartLine';
import Table from './components/table';
import LeftChartMin from './components/leftChartMin';
import LineChart from './components/echartLine4';
import LeftChartV1 from './components/leftChartV1';
import LeftChartV2 from './components/leftChartV2';

import JMZK from '../../xiaoshanComponentsNew/firstPage/topBox/jmzk.vue';

// 二级页面
import AIGZ from './secondPage/aigz';
import AIYJ from './secondPage/aiyj';
import ZBZStaticData from '../../ZBZStaticData.json';

export default {
  components: {
    JMZK,
    Box,
    Title,
    LeftChartLine,
    Table,
    LeftChartMin,
    LineChart,
    LeftChartV1,
    LeftChartV2,
    AIGZ,
    AIYJ,
  },
  data() {
    return {
      isShowV2: false,
      // v1
      rate_tj: [79, 64],
      logo_2: '1',
      tj_data: [
        {
          name: '烟感',
          num: '2',
          rate: '69',
          imgSrc: require('../../../assets/img4/yangan_icon.png'),
        },
        {
          name: '水压',
          num: '2',
          rate: '89',
          imgSrc: require('../../../assets/img4/shuibiao_icon.png'),
        },
        {
          name: '监控',
          num: '2',
          rate: '67',
          imgSrc: require('../../../assets/img4/jiankong_icon.png'),
        },
        {
          name: '电压',
          num: '2',
          rate: '80',
          imgSrc: require('../../../assets/img4/dianya_icon.png'),
        },
      ],
      currentSelect: '0', // ai预警下拉框
      selectOPtion: [
        {
          value: '0',
          label: '全部',
        },
        {
          value: '1',
          label: '烟感',
        },
        {
          value: '2',
          label: '水压',
        },
        {
          value: '3',
          label: '监控',
        },
        {
          value: '4',
          label: '电压',
        },
      ],
      isShow_aigz: false,

      currentIndex: -1,
      listData: [
        {
          task: '智能感知预警',
          createTime: '2022-10-12',
          content: '巡查员上报：文物损坏',
        },
        {
          task: '智能感知预警',
          createTime: '2022-10-12',
          content: '巡查员上报：文物损坏',
        },
        {
          task: '智能感知预警',
          createTime: '2022-10-12',
          content: '巡查员上报：文物损坏',
        },
        {
          task: '智能感知预警',
          createTime: '2022-10-12',
          content: '巡查员上报：文物损坏',
        },
        {
          task: '智能感知预警',
          createTime: '2022-10-12',
          content: '巡查员上报：文物损坏',
        },
        {
          task: '智能感知预警',
          createTime: '2022-10-12',
          content: '巡查员上报：文物损坏',
        },
      ],
      lineData_1: [
        {
          name: '益农镇',
          value: '10',
        },
        {
          name: '北干街道',
          value: '30',
        },
        {
          name: '进化镇',
          value: '20',
        },
        {
          name: '楼塔镇',
          value: '35',
        },
        {
          name: '新塘街道',
          value: '24',
        },
        {
          name: '瓜沥镇',
          value: '30',
        },
      ],
      lineData_2: [
        {
          name: '益农镇',
          value: '30',
        },
        {
          name: '北干街道',
          value: '20',
        },
        {
          name: '进化镇',
          value: '35',
        },
        {
          name: '楼塔镇',
          value: '24',
        },
        {
          name: '新塘街道',
          value: '30',
        },
        {
          name: '瓜沥镇',
          value: '10',
        },
      ],
      lineData_3: [
        {
          name: '益农镇',
          value: '20',
        },
        {
          name: '北干街道',
          value: '35',
        },
        {
          name: '进化镇',
          value: '24',
        },
        {
          name: '楼塔镇',
          value: '30',
        },
        {
          name: '新塘街道',
          value: '10',
        },
        {
          name: '瓜沥镇',
          value: '22',
        },
      ],
      lineData_4: [
        {
          name: '益农镇',
          value: '14',
        },
        {
          name: '北干街道',
          value: '24',
        },
        {
          name: '进化镇',
          value: '10',
        },
        {
          name: '楼塔镇',
          value: '16',
        },
        {
          name: '新塘街道',
          value: '9',
        },
        {
          name: '瓜沥镇',
          value: '20',
        },
      ],
      logo: '1',
      isShow_aiyj: false,

      // v2
      tj_1: [
        {
          name: '烟感总数',
          num: '20',
          imgSrc: require('../../../assets/img4/yangan.png'),
        },
        {
          name: '设备在线',
          num: '20',
          imgSrc: require('../../../assets/img4/zaixian.png'),
        },
      ],
      tableColumn_aizb: [
        {
          name: '设备',
          props: 'task',
        },
        {
          name: '位置',
          props: 'local',
        },
        {
          name: '状态',
          props: 'status',
          withSlot: true,
        },
        {
          name: '事件',
          props: 'content',
          withSlot: true,
        },
        {
          name: '时间',
          props: 'createTime',
          flex: 1.2,
          format: row => {
            return row.createTime.split(' ')[0];
          },
        },

        {
          name: '详情',
          props: 'detail',
          withSlot: true,
        },
      ],
      tableData_aizb: [
        {
          task: '烟感1',
          local: '入口',
          status: '0',
          content: '浓度过高',
          createTime: '2022-10-12',
        },
      ],
      tj_2: [
        {
          name: '水压传感器总数',
          num: '20',
          imgSrc: require('../../../assets/img4/shuiya.png'),
        },
        {
          name: '设备在线',
          num: '20',
          imgSrc: require('../../../assets/img4/shebeizaixian.png'),
        },
      ],
      gauge_tj: [3000, 20],
      logo_3: '1',
      lineData_1_v2: [],
      lineData_2_v2: [],
      logo_1: '1',
      jmzkBoxShow: false,
    };
  },
  created() {
    eventBus.$on('data_back', () => {});
    // eventBus.$on('isShow_ZBZ_V2',(boolean)=>{
    //   console.log('v2',boolean)
    //   this.isShowV2 = boolean
    // })
  },
  mounted() {
    // let routerParams = this.$route.params;
    // this.isShowV2 = routerParams.isShowV2;

    // this.getAIGZ_data();
    // this.getAIYJ_data(1, 100);
    this.getAIZB_data(1, 100);
    this.getSKJC_data();

    this.fetchHugeData();
  },
  methods: {
    jmzkBoxHidden() {
      this.jmzkBoxShow = false;
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
        Promise.all([p1, p2]).then(res => {
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
    // ai感知
    getAIGZ_data() {
      get_aigz_data().then(res => {
        let data = res.data.data;
        this.rate_tj[0] = data[0].reportNum1;
        this.rate_tj[1] = data[1].reportNum1;
        this.logo_2 += '1';

        this.tj_data[0].num = data[2].reportNum1;
        this.tj_data[0].rate = data[2].reportNum2;
        this.tj_data[1].num = data[3].reportNum1;
        this.tj_data[1].rate = data[3].reportNum2;
        this.tj_data[2].num = data[4].reportNum1;
        this.tj_data[2].rate = data[4].reportNum2;
        this.tj_data[3].num = data[5].reportNum1;
        this.tj_data[3].rate = data[5].reportNum2;
      });
    },
    // 标题点击
    aigz_title_click() {
      // 展示全部设备点位
      let arr = ZBZStaticData;
      eventBus.$emit('devicePoi', arr);
    },
    aigz_Click() {
      //   this.isShow_aigz = true;
      this.jmzkBoxShow = true;
    },
    // 统计点击事件
    deviceTj_click(item) {
      // 根据设备类别撒点
      let arr = [];
      switch (item.name) {
        case '烟感':
          arr = [
            {
              type: 'yangan',
              poi: '120.3049,29.9541',
            },
            {
              type: 'yangan',
              poi: '120.3040,29.9801',
            },
          ];
          break;
        case '水压':
          arr = [
            {
              type: 'shuiya',
              poi: '120.274,30.0628',
            },
            {
              type: 'shuiya',
              poi: '120.309,30.0638',
            },
            {
              poi: '120.16,30.04',
              type: 'shuiya',
            },
            {
              poi: '120.22,30.04',
              type: 'shuiya',
            },
            {
              poi: '120.2429,29.9759',
              type: 'shuiya',
            },

            {
              type: 'shuiya',
              poi: '120.18,30.04',
            },
            {
              type: 'shuiya',
              poi: '120.23,30.06',
            },
            {
              poi: '120.28,29.96',
              type: 'shuiya',
            },
            {
              poi: '120.18,30.03',
              type: 'shuiya',
            },
            {
              poi: '120.31,29.98',
              type: 'shuiya',
            },
          ];
          break;
        case '监控':
          arr = [
            {
              type: 'jiankong',
              poi: '120.2835,29.9769',
            },
            {
              type: 'jiankong',
              poi: '120.32,29.94',
            },
          ];
          break;
        case '电压':
          arr = [
            {
              type: 'dianya',
              poi: '120.305,29.9544',
            },
            {
              type: 'dianya',
              poi: '120.300,29.9994',
            },
            {
              type: 'dianya',
              poi: '120.30,30.07',
            },
            {
              type: 'dianya',
              poi: '120.16,30.05',
            },

            {
              type: 'dianya',
              poi: '120.24,30.04',
            },
            {
              type: 'dianya',
              poi: '120.18,29.95',
            },
            {
              type: 'dianya',
              poi: '120.12,29.96',
            },
            {
              type: 'dianya',
              poi: '120.26,30.11',
            },
            {
              type: 'dianya',
              poi: '120.28,30.08',
            },
            {
              type: 'dianya',
              poi: '120.23,29.98',
            },
          ];
          break;
        default:
          break;
      }
      eventBus.$emit('devicePoi', arr);
    },
    // ai预警
    getAIYJ_data(pageNum, pageSize) {
      get_aiyj_data(pageNum, pageSize).then(res => {
        this.lineData_1 = [];
        this.lineData_2 = [];
        this.lineData_3 = [];
        this.lineData_4 = [];

        this.listData = res.data.data.list1.list;
        let data = res.data.data.list2;
        data.map(item => {
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
          this.lineData_1.push(obj1);
          this.lineData_2.push(obj2);
          this.lineData_3.push(obj3);
          this.lineData_4.push(obj4);
          this.logo += '1';
        });
      });
    },
    aiyj_Click() {
      this.isShow_aiyj = true;
    },
    aiyj_type_change(val) {
      this.currentSelect = val;
    },
    itemClick(index) {
      if (index == this.currentIndex) {
        this.currentIndex = -1;
      } else {
        this.currentIndex = index;
      }
    },
    // AI智保
    getAIZB_data(pageNum, pageSize) {
      get_aizb_data(pageNum, pageSize).then(res => {
        let detail = res.data.data.detail;
        this.tj_1[0].num = detail.reportNum1;
        this.tj_1[1].num = detail.reportNum2;
        this.tableData_aizb = res.data.data.list.list;
      });
    },
    // 水矿监测
    getSKJC_data() {
      get_skjc_data().then(res => {
        let detail = res.data.data.detail;
        let list = res.data.data.list;
        this.tj_2[0].num = detail.reportNum1;
        this.tj_2[1].num = detail.reportNum2;
        this.gauge_tj[0] = detail.reportNum3;
        this.gauge_tj[1] = detail.reportNum4;
        this.logo_3 += '1';

        list.map(item => {
          let obj1 = {
            name: item.reportType + '月',
            num: item.reportNum1,
          };
          let obj2 = {
            name: item.reportType + '月',
            num: item.reportNum2,
          };
          this.lineData_1_v2.push(obj1);
          this.lineData_2_v2.push(obj2);
          this.logo_1 += '1';
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 97%;
  .v1 {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .part-1 {
      width: 100%;
      height: 220px;
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
        height: 118px;
        overflow: hidden;
        display: flex;
        margin: 5px 0 10px 0;
        .chart {
          width: 50%;
          height: 120px;
        }
      }
      .tj {
        width: 100%;
        height: 140px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-between;
        .item {
          width: 50%;
          height: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          .img {
            width: 70px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .chart {
              width: 100%;
              height: 40px;
              position: relative;
              img {
                position: absolute;
                left: 51%;
                top: 60%;
                transform: translate(-50%, -50%);
              }
            }
            span {
              font-size: 16px;
              color: #fff;
            }
          }
          .info {
            width: 130px;
            height: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            box-sizing: border-box;
            padding-left: 10px;
            background: linear-gradient(to right, #19427fad, #19427f00);
            .row1 {
              margin-bottom: 5px;
              span:nth-child(1) {
                font-size: 16px;
                color: #bac3e8;
              }
              span:nth-child(2) {
                font-size: 16px;
                color: #fff;
              }
            }
            .row2 {
              span:nth-child(1) {
                font-size: 16px;
                color: #bac3e8;
              }
              span:nth-child(2) {
                font-size: 16px;
                color: #38c1d4;
              }
            }
          }
        }
      }
    }

    .part-2 {
      .btn-box {
        display: flex;
        align-items: center;
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
      }
      .list {
        width: 100%;
        height: 320px;
        margin-bottom: 15px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        .item {
          width: 445px;
          min-height: 52;
          margin: 2px 0;
          box-sizing: border-box;
          // background-color: #6f90fe37;
          // border-bottom: 2px solid #6f90fe;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .info-box {
            width: 100%;
            height: 52px;
            background-color: #6f90fe37;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .name {
              width: 127px;
              height: 30px;
              background: url('../../../assets/img4/tag-r.png') no-repeat center;
              background-size: 100% 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: PingFangSC-Regular;
              font-size: 16px;
              font-weight: normal;
              font-style: italic;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #ffd1d1;
            }
            .info {
              width: 200px;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              span:nth-child(1) {
                font-family: SourceHanSansCN-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #a8b0d0;
              }
              span:nth-child(2) {
                font-family: SourceHanSansCN-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
            }
            .btn {
              width: 72px;
              height: 30px;
              background: url('../../../assets/img4/more-btn.png') no-repeat center;
              background-size: 100% 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              z-index: 5;
              span {
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #a8b0d0;
                margin-right: 2px;
              }
              img {
                width: 14px;
                height: 7px;
                transform: rotateZ(-180deg);
              }
              .open {
                transform: rotateZ(0deg);
              }
            }
          }
          .time-line {
            width: 100%;
            height: 280px;
            // background: red;
            .el-timeline {
              margin-top: 30px;
              padding-left: 5px;
              .el-timeline-item {
                height: 85px;
                .content {
                  width: 410px;
                  height: 100px;
                  position: relative;
                  top: -20px;
                  .system {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-bottom: 10px;
                    width: 410px;
                    justify-content: space-between;

                    span:nth-child(1) {
                      font-family: MicrosoftYaHei;
                      font-size: 16px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #ffe6e1;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 227px;
                      height: 34px;
                      border-radius: 17px;
                      border: 1px solid #9672bb;
                      background-color: #9672bb1c;
                    }
                    span:nth-child(2) {
                      font-family: DINPro-Medium;
                      font-size: 18px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #a8b0d0;
                      margin-left: 10px;
                    }
                  }
                  .qzzx {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-bottom: 10px;
                    width: 410px;
                    justify-content: space-between;

                    span:nth-child(1) {
                      font-family: MicrosoftYaHei;
                      font-size: 16px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #ffe6e1;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 100px;
                      height: 34px;
                      border-radius: 17px;
                      border: 1px solid #9672bb;
                      background-color: #9672bb1c;
                    }
                    span:nth-child(2) {
                      font-family: DINPro-Medium;
                      font-size: 18px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #a8b0d0;
                      margin-left: 10px;
                    }
                  }
                  .street {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-bottom: 10px;
                    width: 410px;
                    justify-content: space-between;

                    span:nth-child(1) {
                      font-family: MicrosoftYaHei;
                      font-size: 16px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #ffe6e1;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 100px;
                      height: 34px;
                      border-radius: 17px;
                      border: 1px solid #9672bb;
                      background-color: #9672bb1c;
                    }
                    span:nth-child(2) {
                      font-family: DINPro-Medium;
                      font-size: 18px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #a8b0d0;
                      margin-left: 10px;
                    }
                  }
                  .info {
                    font-family: MicrosoftYaHei;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #a8b0d0;
                  }
                }
              }
            }
          }
        }
      }
      .chart {
        width: 100%;
        height: 175px;
      }
    }
  }
  .v2 {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .part-1 {
      .tj {
        width: 100%;
        height: 77px;
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .item {
          width: 206px;
          height: 100%;
          background: url('../../../assets/img4/lansebeijing.png') no-repeat right;
          background-size: auto 100%;
          display: flex;
          img {
            width: 71px;
            height: 100%;
          }
          .info {
            width: 120px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-left: 10px;
            span:nth-child(1) {
              font-size: 16px;
              color: #a8b0d0;
            }
            span:nth-child(2) {
              font-size: 20px;
              color: #ffffff;
            }
          }
        }
      }
      .aizb-table {
        width: 100%;
        height: 220px;
        .btn {
          width: 50px;
          height: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          border: 1px solid #6aade5;
          box-shadow: inset #6aade5 0 0 10px;
          color: #6aade5;
          font-size: 14px;
        }
      }
    }
    .part-2 {
      .tj {
        width: 100%;
        height: 77px;
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .item {
          width: 206px;
          height: 100%;
          background: url('../../../assets/img4/lvsebeijing.png') no-repeat right;
          background-size: auto 100%;
          display: flex;
          img {
            width: 71px;
            height: 100%;
          }
          .info {
            width: 120px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-left: 10px;
            span:nth-child(1) {
              font-size: 16px;
              color: #a8b0d0;
            }
            span:nth-child(2) {
              font-size: 20px;
              color: #ffffff;
            }
          }
        }
      }
      .chart-box {
        width: 100%;
        height: 150px;
        overflow: hidden;
        display: flex;
        margin: 15px 0 10px 0;
        .chart {
          width: 50%;
          height: 120px;
        }
      }
      .chart {
        width: 100%;
        height: 200px;
        // margin-top: 10px;
      }
    }
  }
}
</style>
