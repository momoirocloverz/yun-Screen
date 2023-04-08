<template>
  <div class="container globalFireFoxScrollBar">
    <Box :height="'250px'" :bgSrc="require('../../../assets/imgBoxBg/x-box1-bg.png')">
      <div class="part part-1">
        <Title :text="'文保等级'" @textClick="wbdjBack">
          <div class="detailBtn" @click="wbdj_Click">详情<i class="el-icon-arrow-right"></i></div>
        </Title>
        <div class="wwgk">
          <div class="item" v-for="(item, index) in wwgk_data" :key="index" @click="wwgk_click(item, index)">
            <img :src="currentIndex_wbdj === index ? item.active_imgSrc : item.imgSrc" alt="" srcset="" />
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div class="num">
                <span>{{ item.num }}</span>
                <span>处</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'327px'" :bgSrc="require('../../../assets/imgBoxBg/x-box2-bg.png')">
      <div class="part part-2">
        <Title :text="'文保类别'" @click.native="resetMap">
          <div class="detailBtn" @click="wblb_Click">详情<i class="el-icon-arrow-right"></i></div>
        </Title>
        <div class="chart-box">
          <div class="chart">
            <img src="../../../assets/img4/huan.png" alt="" />
            <LeftChart :chartData="pieData" :logo="logo_1" :color="colors" @pieClick="wblb_pie_click" />
          </div>
          <div class="legend">
            <div
              class="item"
              v-for="(item, index) in pieData"
              :key="index"
              :style="{
                background: `url(${item.bgImg}) no-repeat center`,
                'background-size': '100% 100%',
              }"
              @click="legendClick(item.name)"
            >
              <span class="point" :style="{ background: colors[index] }"></span>
              <span class="name">{{ item.name }}</span>
              <!-- <span class="rate">{{ parseFloat((item.value * 100) / 566).toFixed(2) }}%</span> -->
              <span class="rate">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'309px'" :bgSrc="require('../../../assets/imgBoxBg/x-box3-bg.png')">
      <div class="part part-3">
        <Title :text="'文物分布'" @click.native="resetMap">
          <!-- <div style="width:80px;height:25px;">
            <el-select v-model="currentSelect" size="mini" placeholder="" style="width:80px;" @change="wwfb_type_change">
              <el-option v-for="item in selectOPtion" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div> -->
        </Title>
        <div class="chart">
          <LeftChartBar :chartData_1="lineData_1" :chartData_2="lineData_2" :chartData_3="lineData_3" :logo="logo_2" />
        </div>
      </div>
    </Box>
    <!-- 二级页面 -->
    <WBDJ
      :isShow="isShow_wbdj"
      @close="
        () => {
          this.isShow_wbdj = false;
        }
      "
    />
  </div>
</template>
<script>
import Box from '../components/box';
import Title from '../components/title';
import { selectMuseumRelicInfoNumGroupLevell, wwgk } from '@/api/xsApi';
import { get_wblb_data, get_wwfb_data, selectMuseumRelicInfoNumGroupType, xsdpRelicNumsByStreet, wbjdTotal } from '../../../api/xsApi3';
import { wbd_list2, wbd_list3 } from '../../../api/xsApi';
import { eventBus } from '@/main';
import LeftChart from './components/leftChart';
import LeftChartBar from './components/echartBar3';
// 二级页面
import WBDJ from './secondPage/wbdj.vue';
import store from '@/store';
export default {
  components: { Box, Title, LeftChart, LeftChartBar, WBDJ },
  data() {
    return {
      currentIndex_wbdj: '-1',
      wwgk_data: [
        {
          name: '国保单位',
          id: '14da5819da904c4ab1d9d94a961ca27a',
          num: '3',
          imgSrc: require('../../../assets/img2/icon1-n.png'),
          active_imgSrc: require('../../../assets/img2/icon1-s.png'),
        },
        {
          name: '省保单位',
          id: 'cef2a80fbea6df89578ad5599b67b71f',
          num: '9',
          imgSrc: require('../../../assets/img2/icon2-n.png'),
          active_imgSrc: require('../../../assets/img2/icon2-s.png'),
        },
        {
          name: '市保单位',
          id: '2bf3be523de944ec3ee1ad832a7a2587',
          num: '65',
          imgSrc: require('../../../assets/img2/icon3-n.png'),
          active_imgSrc: require('../../../assets/img2/icon3-s.png'),
        },
        {
          name: '市级文保点',
          id: 'b16db07f34112b9b0fc6d2b54214e0aa',
          num: '134',
          imgSrc: require('../../../assets/img2/icon4-n.png'),
          active_imgSrc: require('../../../assets/img2/icon4-s.png'),
        },
        {
          name: '一般文物',
          id: 'ac38ee765b5e5155b8bb3eadc1b5aa8d',
          num: '357',
          imgSrc: require('../../../assets/img3/icon7-n.png'),
          active_imgSrc: require('../../../assets/img3/icon7-s.png'),
        },
      ],
      isShow_wbdj: false,
      // part2
      colors: ['#39c3ae', '#747df8', '#e1b266', '#519ed9', '#f59083'],
      pieData: [
        {
          value: 40,
          name: '古建筑',
          bgImg: require('../../../assets/img4/pie-f1.png'),
        },
        {
          value: 30,
          name: '近现代重要史迹及代表性建筑',
          bgImg: require('../../../assets/img4/pie-f2.png'),
        },
        {
          value: 38,
          name: '古遗址',
          bgImg: require('../../../assets/img4/pie-f3.png'),
        },
        {
          value: 32,
          name: '古墓葬',
          bgImg: require('../../../assets/img4/pie-f4.png'),
        },
        {
          value: 28,
          name: '碑刻',
          bgImg: require('../../../assets/img4/pie-f5.png'),
        },
      ],
      logo_1: 1,
      // part3
      lineData_1: [],
      lineData_2: [],
      lineData_3: [],
      logo_2: '1',
      currentSelect: '0',
      selectOPtion: [
        {
          value: '0',
          label: '全部',
        },
        {
          value: '1',
          label: '国保',
        },
        {
          value: '2',
          label: '省保',
        },
        {
          value: '3',
          label: '市保',
        },
      ],
    };
  },
  created() {
    eventBus.$on('data_back', () => {
      this.currentIndex_wbdj = '-1';
    });
    eventBus.$on('xbgInit', () => {
      this.currentIndex_wbdj = 1;
    });
  },
  mounted() {
    this.getWWGK_data('0', '0'); // 文保等级
    this.getWBLB_data(); // 文保类别
    // this.getWWFB_list(); // 文物分布
    this.fetchHugeData();
    // this.currentIndex_wbdj = 1
    // eventBus.$emit('drawPoiByRank', 'cef2a80fbea6df89578ad5599b67b71f')
    this.fetchRelicNumsByStreet();
  },
  methods: {
    fetchRelicNumsByStreet() {
      wbjdTotal().then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          this.lineData_1 = [];
          this.lineData_2 = [];
          this.lineData_3 = [];
          if (shorter) {
            let list = res.data.data;
            list.map((item) => {
              let obj_1 = {
                name: item.jd,
                value: +item.jdGuoBaoTotal,
              };
              let obj_2 = {
                name: item.jd,
                value: +item.jdShengBaoBaoTotal,
              };
              let obj_3 = {
                name: item.jd,
                value: +item.jdShiBaoTotal,
              };
              this.lineData_1.push(obj_1);
              this.lineData_2.push(obj_2);
              this.lineData_3.push(obj_3);
              this.logo_2 += '1';
            });
          }
        }
      });
      /*   xsdpRelicNumsByStreet({}).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          this.lineData_1 = [];
          this.lineData_2 = [];
          this.lineData_3 = [];
          let list = res.data.data;
          list.map((item) => {
            let obj_1 = {
              name: item.areaName,
              value: item.nationNums,
            };
            let obj_2 = {
              name: item.areaName,
              value: item.provincebNums,
            };
            let obj_3 = {
              name: item.areaName,
              value: item.cityNums,
            };
            this.lineData_1.push(obj_1);
            this.lineData_2.push(obj_2);
            this.lineData_3.push(obj_3);
          });
          this.logo_2 += '1';
        }
      }); */
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
    // 获取文保等级数据
    getWWGK_data(level, name) {
      /*   let params = {
        currentPage: 1,
        pageSize: 1,
        // rank: '14da5819da904c4ab1d9d94a961ca27a,cef2a80fbea6df89578ad5599b67b71f,2bf3be523de944ec3ee1ad832a7a2587,b16db07f34112b9b0fc6d2b54214e0aa,ac38ee765b5e5155b8bb3eadc1b5aa8d',
        rank: '14da5819da904c4ab1d9d94a961ca27a',
      };
      let p1 = wbd_list2(params);
      //   let p2 = wbd_list3(params);
      Promise.all([p1]).then((res) => {
        let arr1 = res[0].data.data.list;
        // let arr4 = res[1].data.data.list;
        // arr1.forEach((ele, index) => {
        //   ele.activation = arr4[index].activation;
        //   ele.lxdh = arr4[index].lxdh;
        //   ele.category = arr4[index].category;
        //   ele.maxLevel = arr4[index].maxLevel;
        //   ele.paths = arr4[index].paths;
        //   ele.rank = arr4[index].rank;
        //   ele.xcy = arr4[index].xcy;
        //   ele.yjbs = arr4[index].yjbs;
        // });
        //   this.$store.commit('setHugeListData', arr1);
        console.log(res[0].data.data.total);
      }); */

      wwgk({ level: '0', name: '0' }).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          if (shorter && shorter.length) {
            this.wwgk_data[0].num = shorter[0].reportNum1 || 0;
            this.wwgk_data[1].num = shorter[0].reportNum2 || 0;
            this.wwgk_data[2].num = shorter[0].reportNum3 || 0;
            this.wwgk_data[3].num = shorter[0].reportNum4 || 0;
            this.wwgk_data[4].num = shorter[0].reportNum7 || 0;
          }
        }
      });
      /* selectMuseumRelicInfoNumGroupLevell({}).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let track1 = res.data.data.find((ele) => {
            return ele.name == '国保单位';
          });
          let track2 = res.data.data.find((ele) => {
            return ele.name == '省保单位';
          });
          let track3 = res.data.data.find((ele) => {
            return ele.name == '市保单位';
          });
          let track4 = res.data.data.find((ele) => {
            return ele.name == '市级文保点';
          });
          let track5 = res.data.data.find((ele) => {
            return ele.name == '一般文物';
          });
          if (track1) {
            this.wwgk_data[0].num = track1.num;
          }
          if (track2) {
            this.wwgk_data[1].num = track2.num;
          }
          if (track3) {
            // this.wwgk_data[2].num = track3.num;
            this.wwgk_data[2].num = 65;
          }
          if (track4) {
            // this.wwgk_data[3].num = track4.num;
            this.wwgk_data[3].num = 134;
          }
          if (track5) {
            this.wwgk_data[4].num = track5.num;
          }
        }
      }); */
    },
    wwgk_click(item, index) {
      this.currentIndex_wbdj = index;
      if (this.$route.name == 'xbg') {
        eventBus.$emit('drawPoiByRank', item.id);
      } else if (this.$route.name == 'xbgCopy') {
        this.$store.commit('setXbgCopyRankLevel', item.id);
      }
    },
    wbdjBack() {
      this.currentIndex_wbdj = -1;
      if (this.$route.name == 'xbg') {
        eventBus.$emit('drawPoiByRanks', ['14da5819da904c4ab1d9d94a961ca27a', 'cef2a80fbea6df89578ad5599b67b71f', '2bf3be523de944ec3ee1ad832a7a2587']);
      } else if (this.$route.name == 'xbgCopy') {
        this.$store.commit('setXbgCopyRebootPoint', '');
      }
    },
    resetMap() {
      this.currentIndex_wbdj = -1;
      if (this.$route.name == 'xbg') {
        eventBus.$emit('drawPoiByRanks', ['14da5819da904c4ab1d9d94a961ca27a', 'cef2a80fbea6df89578ad5599b67b71f', '2bf3be523de944ec3ee1ad832a7a2587']);
      } else if (this.$route.name == 'xbgCopy') {
        this.$store.commit('setXbgCopyRebootPoint', '');
      }
    },
    wbdj_Click() {
      this.isShow_wbdj = true;
    },
    // 文保类别
    getWBLB_data() {
      selectMuseumRelicInfoNumGroupType({}).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          const shorter = res.data.data;
          let track1 = shorter.find((ele) => {
            return ele.name == '古建筑';
          });
          if (track1) {
            this.pieData[0].value = track1.num;
            this.pieData[0].ratio = track1.ratio;
          }
          let track2 = shorter.find((ele) => {
            return ele.name == '近现代重要史迹及代表性建筑';
          });
          if (track2) {
            this.pieData[1].value = track2.num;
            this.pieData[1].ratio = track2.ratio;
          }
          let track3 = shorter.find((ele) => {
            return ele.name == '古遗址';
          });
          if (track3) {
            this.pieData[2].value = track3.num;
            this.pieData[2].ratio = track3.ratio;
          }
          let track4 = shorter.find((ele) => {
            return ele.name == '古墓葬';
          });
          if (track4) {
            this.pieData[3].value = track4.num;
            this.pieData[3].ratio = track4.ratio;
          }
          let track5 = shorter.find((ele) => {
            return ele.name == '石窟寺及石刻';
          });
          if (track5) {
            this.pieData[4].value = track5.num;
            this.pieData[4].ratio = track5.ratio;
          }
          this.logo_1 += 1;
        }
      });
    },
    wblb_pie_click(params) {
      this.currentIndex_wbdj = '-1';
      if (this.$route.name == 'xbg') {
        eventBus.$emit('drawPoiByCategory', params.name);
      } else if (this.$route.name == 'xbgCopy') {
        this.$store.commit('setXbgCopyRankType', params.name);
      }
    },
    legendClick(name) {
      this.currentIndex_wbdj = '-1';
      if (this.$route.name == 'xbg') {
        eventBus.$emit('drawPoiByCategory', name);
      } else if (this.$route.name == 'xbgCopy') {
        this.$store.commit('setXbgCopyRankType', name);
      }
    },
    wblb_Click() {
      this.isShow_wbdj = true;
    },
    // 文物分布
    getWWFB_list() {
      get_wwfb_data().then((res) => {
        this.lineData_1 = [];
        this.lineData_2 = [];
        this.lineData_3 = [];
        let list = res.data.data;
        list.map((item) => {
          let obj_1 = {
            name: item.reportType,
            value: item.reportNum1,
          };
          let obj_2 = {
            name: item.reportType,
            value: item.reportNum2,
          };
          let obj_3 = {
            name: item.reportType,
            value: item.reportNum3,
          };
          this.lineData_1.push(obj_1);
          this.lineData_2.push(obj_2);
          this.lineData_3.push(obj_3);
        });
        this.logo_2 += '1';
      });
    },
    wwfb_type_change(val) {
      this.currentSelect = val;
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
  .part {
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
  }
  .part-1 {
    .wwgk {
      margin-top: 10px;
      width: 100%;
      height: 170px;
      display: flex;
      flex-wrap: wrap;
      margin-top: 30px;
      .item {
        width: 33%;
        height: 52px;
        display: flex;
        justify-content: flex-start;
        align-content: space-around;
        cursor: pointer;
        img {
          width: 52px;
          height: 52px;
          margin: 0 10px;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #a8b0d0;
          }
          .num {
            span:nth-child(1) {
              font-family: Arial-BoldMT;
              font-size: 30px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #fff;
            }
            span:nth-child(2) {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #98a9c5;
            }
          }
        }
      }
    }
  }
  .part-2 {
    .chart-box {
      display: flex;
      .chart {
        width: 50%;
        height: 250px;
        // background: url('../../../assets/img4/huan.png') no-repeat center;
        // background-position: 50% 50%;
        position: relative;
        img {
          width: 90%;
          height: auto;
          position: absolute;
          top: 50%;
          left: 50%;
          animation: circleRoatation 15s linear infinite;
        }
      }
      .legend {
        width: 50%;
        height: 220px;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        .item {
          width: 251px;
          height: 30px;
          box-sizing: border-box;
          padding-left: 30px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
          &:nth-child(2) {
            height: 40px;
          }
          .point {
            display: inline-block;
            width: 8px;
            height: 8px;
          }
          .name {
            display: inline-block;
            width: 85px;
            font-family: SourceHanSansCN-Regular;
            font-size: 12px;
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
            letter-spacing: 1px;
            color: #a8b0d0;
          }
        }
      }
    }
  }
  .part-3 {
    .chart {
      width: 100%;
      height: 250px;
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
