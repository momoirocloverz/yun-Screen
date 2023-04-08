<template>
  <div class="hb365LeftCon globalFireFoxScrollBar">
    <Box :height="'406px'" :bgSrc="require('../../../assets/imgBoxBg/h-box1-bg.png')">
      <div class="part-1">
        <Title :text="'护保队伍'" @textClick="hbdw_title_click">
          <div class="detailBtn" @click="hbdw_Click">详情<i class="el-icon-arrow-right"></i></div>
        </Title>
        <div class="tj">
          <div :class="['item', currentSelect == index ? 'act-item' : '']" v-for="(item, index) in hbdw_tj" :key="index" @click="itemClick(item, index)">
            <span>{{ item.num }}</span>
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="hbdw-table">
          <Table
            :tableData="tableData_hbdw"
            :tableColumns="tableColumn_hbdw"
            :isStripe="true"
            :headTextColor="'#c2966d'"
            :headHeight="`${35 / 192}rem`"
            :headBgColor="'rgba(227,168,111, 0.2)'"
            :rowHeight="`${34 / 192}rem`"
            :rowTextColor="'#a8b0d0'"
          >
            <template slot="status" slot-scope="scope">
              <div v-if="scope.row.status == '2'" style="width: 100%; display: flex; align-items: center">
                <span style="margin-right: 5px; display: inline-block; flex: none; width: 6px; height: 6px; border-radius: 50%; background: #ffe082"> </span>
                <span style="color: #a8b0d0; fontsize: 16px">巡查中</span>
              </div>
              <div v-else-if="scope.row.status == '1'" style="width: 100%; display: flex; align-items: center">
                <span style="margin-right: 5px; display: inline-block; flex: none; width: 6px; height: 6px; border-radius: 50%; background: #99f17a"> </span>
                <span style="color: #a8b0d0; fontsize: 16px">在线</span>
              </div>
              <div v-else style="width: 100%; display: flex; align-items: center">
                <span style="margin-right: 5px; display: inline-block; flex: none; width: 6px; height: 6px; border-radius: 50%; background: #a8b0d0"> </span>
                <span style="color: #a8b0d0; fontsize: 16px">离线</span>
              </div>
            </template>
            <template slot="phone" slot-scope="scope">
              <img
                src="../../../assets/img4/hujiao.png"
                alt=""
                srcset=""
                :style="{
                  width: `${66 / 192}rem`,
                  height: `${28 / 192}rem`,
                  cursor: 'pointer',
                }"
              />
            </template>
            <template slot="peoplePoi" slot-scope="scope">
              <img
                src="../../../assets/img4/dingwei.png"
                alt=""
                srcset=""
                :style="{
                  width: `${66 / 192}rem`,
                  height: `${28 / 192}rem`,
                  cursor: 'pointer',
                }"
                @click="showPeoplePoi(scope.row)"
              />
            </template>
          </Table>
        </div>
        <div class="pagination">
          <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="7" layout="total,prev, pager, next" :total="total"> </el-pagination>
        </div>
      </div>
    </Box>
    <Box :height="'530px'" :bgSrc="require('../../../assets/imgBoxBg/h-box2-bg.png')">
      <div class="part-2">
        <Title :text="'巡查记录'">
          <div class="detailBtn" @click="qfqz_Click">详情<i class="el-icon-arrow-right"></i></div>
        </Title>
        <div class="title title-1">
          <span>巡查发现</span>
          <span>{{ tjNum[0] }}</span>
          <span>件</span>
        </div>
        <div class="chart-box">
          <div class="chart">
            <img src="../../../assets/img4/huan.png" alt="" />
            <LeftChart :logo="logo" :chartData="pieData" />
          </div>
          <div class="legend">
            <div class="item" v-for="(item, index) in pieData" :key="index">
              <span class="point" :style="{ background: item.color }"></span>
              <span class="name">{{ item.name }}</span>
              <span class="percent">{{ parseFloat((item.value * 100) / tjNum[0]).toFixed(1) }}%</span>
            </div>
          </div>
        </div>
        <div class="title title-2">
          <span>上报人员</span>
          <span>{{ tjNum[1] }}</span>
          <span>人</span>
        </div>
        <div class="chart-box-2">
          <div class="chart">
            <div class="aaa" v-for="(item, index) in circleData" :key="index">
              <canvas-circle
                :id="`circle1_${index}`"
                :innerColor="item.color"
                :radius="item.radius"
                :text="item.num"
                :percente="parseFloat((item.num * 100) / tjNum[1])"
                :logo="logo_circle"
              ></canvas-circle>
            </div>
          </div>
          <div class="legend">
            <div class="item" v-for="(item, index) in circleData" :key="index">
              <span class="point" :style="{ background: item.color }"></span>
              <span class="name">{{ item.name }}</span>
              <span class="percent">{{ parseFloat((item.num * 100) / tjNum[1]).toFixed(1) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </Box>
    <HBDW
      :isShow="isShow_hbdw"
      @close="
        () => {
          this.isShow_hbdw = false;
        }
      "
    />
    <QFQZ
      :isShow="isShow_qfqz"
      @close="
        () => {
          this.isShow_qfqz = false;
        }
      "
    />
  </div>
</template>
<script>
import Box from '../components/box';
import Title from '../components/title';
import { wbd_list2, wbd_list3 } from '../../../api/xsApi';
import { get_people_tj, get_people_list } from '../../../api/xsApi2';
import { get_qfqz_data, get_people_path_poi, xSDPHBDWControllerTopTJ, xSDPHBDWControllerUserList, xSDPHBDWControllerXcfxTJ, xSDPHBDWControllerSelectEventOrderPage } from '../../../api/xsApi3';
import { eventBus } from '@/main';
import Table from './components/table';
import LeftChart from './components/leftChart';
import canvasCircle from './components/circle.vue';
import HBDW from './secondPage/hbdw.vue';
import QFQZ from './secondPage/qfqz.vue';
import Static365Data from '../../365StaticData.json';
let poiArr = Static365Data;
export default {
  components: { Box, Title, LeftChart, Table, canvasCircle, HBDW, QFQZ },
  data() {
    return {
      currentSelect: 3,
      hbdw_tj: [
        // {
        //   id: '',
        //   name: '应急处置员',
        //   num: '59',
        // },
        // {
        //   id: '',
        //   name: '党员',
        //   num: '7',
        // },
        {
          id: '',
          name: '党员',
          num: '7',
        },
        {
          id: '',
          name: '应急处置员',
          num: '59',
        },
        {
          id: '',
          name: '志愿者',
          num: '13',
        },
        {
          id: '',
          name: '护保员',
          num: '37',
        },
        {
          id: '',
          name: '其他',
          num: '2',
        },
      ],
      tableColumn_hbdw: [
        {
          props: 'userName',
          name: '姓名',
          flex: 0.8,
          format: (row) => {
            if (row.userName.length >= 3) {
              return row.userName.substr(0, 1) + ' * ' + row.userName.substr(2);
            } else if (row.userName.length == 2) {
              return row.userName.substr(0, 1) + ' * ';
            }
          },
        },
        {
          props: 'pointName',
          name: '结对文物',
          format: (row) => {
            if (row.pointName && row.pointName.length > 6) {
              return row.pointName.substr(0, 5) + '...';
            } else {
              return row.pointName || '-';
            }
          },
        },
        // {
        //   props: "status", // 0 离线、 1 在线、 2 巡查中
        //   name: "护宝状态",
        //   withSlot: true
        // },
        {
          props: 'phone',
          name: '人员电话',
          format: (row) => {
            if (row.phone) {
              return row.phone.replace(row.phone.substr(3, 4), '****');
            } else {
              return '-';
            }
          },
          // withSlot: true
        },
        {
          props: 'peoplePoi',
          name: '人员位置',
          withSlot: true,
        },
      ],
      tableData_hbdw: [
        {
          userName: '田欢乐',
          pointName: '二桥书屋、务本堂',
          phone: '15382349877',
        },
        {
          userName: '肖某焕',
          pointName: '白龙寺',
          phone: '13858102808',
        },
        {
          userName: '俞某红',
          pointName: '通济桥',
          phone: '13867177315',
        },
        {
          userName: '沈某生',
          pointName: '锁秀桥',
          phone: '13023657562',
        },
        {
          userName: '董某军',
          pointName: '同泰当',
          phone: '15968108978',
        },
      ],
      pageSize: 5,
      currentPage: 1,
      total: 0,
      isShow_hbdw: false,
      // part2
      tjNum: [168, 239],
      pieData: [
        { value: 40, color: '#1F68E2', name: '安防' },
        { value: 38, color: '#00E9CB', name: '消防' },
        { value: 32, color: '#31B9FF', name: '使用情况' },
        { value: 30, color: '#44DA84', name: '本体隐患' },
        { value: 28, color: '#747DF8', name: '其他' },
      ],
      logo: '1',
      circleData: [
        {
          name: '巡防人员',
          num: '56',
          color: '#0080FF',
          radius: 80,
        },
        {
          name: '志愿者',
          num: '40',
          color: '#1EA6F4',
          radius: 65,
        },
        {
          name: '党员',
          num: '38',
          color: '#46FDFF',
          radius: 50,
        },
        {
          name: '群众',
          num: '59',
          color: '#36FFCC',
          radius: 35,
        },
        {
          name: '其他',
          num: '46',
          color: '#747DF8',
          radius: 20,
        },
      ],
      logo_circle: '1',
      isShow_qfqz: false,
    };
  },
  created() {
    eventBus.$on('data_back', () => {});
  },
  mounted() {
    this.getLeftList();
    this.getQFQZ_data();
    this.fetchHugeData();
    // this.fetchHBDWControllerTopTJ();
    // this.fetchHBDWControllerUserList();
    // this.fetchHBDWControllerXcfxTJ();
    // this.fetchHBDWControllerSelectEventOrderPage();
  },
  methods: {
    fetchHBDWControllerSelectEventOrderPage() {
      let params = {
        pageNum: 1,
        pageSize: 10,
      };
      xSDPHBDWControllerSelectEventOrderPage(params).then((res) => {
        console.log(res);
      });
    },
    fetchHBDWControllerXcfxTJ() {
      xSDPHBDWControllerXcfxTJ({}).then((res) => {
        console.log(res);
      });
    },
    fetchHBDWControllerUserList() {
      let params = {
        pageNum: 1,
        pageSize: 10,
      };
      xSDPHBDWControllerUserList(params).then((res) => {
        console.log(res);
      });
    },
    fetchHBDWControllerTopTJ() {
      xSDPHBDWControllerTopTJ({}).then((res) => {
        console.log(res);
      });
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
    getLeftList() {
      get_people_tj().then((res) => {
        // console.log('res.data', res.data.data);
        /* this.hbdw_tj[0].num = res.data.data[0].value;
        this.hbdw_tj[0].id = res.data.data[0].id;
        this.hbdw_tj[1].num = res.data.data[2].value;
        this.hbdw_tj[1].id = res.data.data[2].id; */
        this.hbdw_tj[0].num = res.data.data[2].value;
        this.hbdw_tj[0].id = res.data.data[2].id;
        this.hbdw_tj[1].num = res.data.data[0].value;
        this.hbdw_tj[1].id = res.data.data[0].id;
        this.hbdw_tj[2].num = res.data.data[3].value;
        this.hbdw_tj[2].id = res.data.data[3].id;
        this.hbdw_tj[3].num = res.data.data[1].value;
        this.hbdw_tj[3].id = res.data.data[1].id;
        this.hbdw_tj[4].num = res.data.data[4].value;
        this.hbdw_tj[4].id = res.data.data[4].id;
        // this.listData = res.data.data;
        this.getList(this.hbdw_tj[this.currentSelect].id);
      });
    },
    // 分页
    pageNumChange(val) {
      this.currentPage = val;
      this.getList(this.hbdw_tj[this.currentSelect].id);
    },
    // 统计点击
    itemClick(item, index) {
      this.currentPage = 1;
      this.currentSelect = index;
      this.getList(item.id);
      let arr;
      switch (index) {
        case 0:
          arr = poiArr.filter((item) => item.type == 'yingji');
          break;
        case 1:
          arr = poiArr.filter((item) => item.type == 'dangyuan');
          break;
        case 2:
          arr = poiArr.filter((item) => item.type == 'zhiyuanzhe');
          break;
        case 3:
          arr = poiArr.filter((item) => item.type == 'wenwuxunjian');
          break;
        case 4:
          arr = poiArr.filter((item) => item.type == 'qita');
          break;
        default:
          break;
      }
      if (this.$route.name == 'hb365') {
        eventBus.$emit('peoplePoi', arr, 'people');
      } else if (this.$route.name == 'hb365Copy') {
        this.$store.commit('setHb365CopyPartData', arr);
      }
    },
    // 获取具体列表
    getList(id) {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        roleId: id,
      };
      get_people_list(params).then((res) => {
        this.tableData_hbdw = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    // 护保队伍标题点击
    hbdw_title_click() {
      if (this.$route.name == 'hb365') {
        eventBus.$emit('peoplePoi', poiArr, 'people');
      } else if (this.$route.name == 'hb365Copy') {
        this.$store.commit('setHb365CopyPoints', '');
      }
    },
    hbdw_Click() {
      this.isShow_hbdw = true;
    },
    // 定位按钮
    showPeoplePoi(row) {
      let params = {
        endTime: '2022-11-06 00:00:00',
        idList: [row.userId],
        startTime: '2022-11-05 00:00:00',
      };
      get_people_path_poi(params).then((res) => {
        // console.log(
        //   "轨迹",
        //   res.data.data && res.data.data[0].patrollerLocusDTOList
        // );
        let poi = res.data.data.length > 0 && res.data.data[0].patrollerLocusDTOList;
        let poiArr = [];
        poi.length > 0 &&
          poi.map((item) => {
            poiArr.push(item.latitude, item.longitude);
          });
        // console.log('轨迹2', poiArr);
        if (poiArr.length >= 4) {
          eventBus.$emit('drawPeoplePath', poiArr, row);
        } else {
          this.$message.warning('该人员暂无轨迹动态');
        }
      });
    },
    // 群防群治
    getQFQZ_data() {
      get_qfqz_data().then((res) => {
        let detail = res.data.data.detail;
        this.tjNum[0] = detail.reportNum1;
        this.tjNum[1] = detail.reportNum2;
        let xcList = res.data.data.xcList;
        this.pieData[0].value = xcList[0].reportNum1;
        this.pieData[1].value = xcList[1].reportNum1;
        this.pieData[2].value = xcList[2].reportNum1;
        this.pieData[3].value = xcList[3].reportNum1;
        this.pieData[4].value = xcList[4].reportNum1;
        this.logo += '1';
        let ryList = res.data.data.ryList;
        this.circleData[0].num = ryList[0].reportNum1;
        this.circleData[1].num = ryList[1].reportNum1;
        this.circleData[2].num = ryList[2].reportNum1;
        this.circleData[3].num = ryList[3].reportNum1;
        this.circleData[4].num = ryList[4].reportNum1;
        this.logo_circle += '1';
      });
    },
    qfqz_Click() {
      this.isShow_qfqz = true;
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
.hb365LeftCon {
  width: 100%;
  height: 97%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .part-1 {
    .tj {
      width: 100%;
      height: 55px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0;
      .item {
        width: 70px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(107, 155, 233, 0.1);
        border: 1px solid rgba(2, 210, 254, 0.2);
        box-sizing: border-box;
        cursor: pointer;
        &:nth-child(2) {
          width: 97px;
        }
        &:nth-child(4) {
          width: 97px;
        }
        span:nth-child(1) {
          font-family: DINPro-Medium;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
        span:nth-child(2) {
          font-family: SourceHanSansCN-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #a8b0d0;
        }
      }
      .act-item {
        background: #be8d5970;
        border-color: #f8b46e;
      }
    }
    .hbdw-table {
      width: 100%;
      height: 210px;
    }
    .pagination {
      text-align: right;
    }
  }
  .part-2 {
    .title {
      width: 440px;
      height: 36px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;
      margin: 15px 0;
      span:nth-child(1) {
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #a8b0d0;
        margin-left: 17px;
      }
      span:nth-child(2) {
        margin: 0 20px;
        font-family: DINPro-Medium;
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #ffffff;
      }
      span:nth-child(3) {
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #a8b0d0;
      }
    }
    .title-1 {
      border-left: 2px solid #ffc000;
      background: linear-gradient(to right, #ffc00020, #ffc00000);
    }
    .title-2 {
      border-left: 2px solid #00b8ec;
      background: linear-gradient(to right, #00b8ec20, #00b8ec00);
    }
    .chart-box {
      width: 100%;
      height: 150px;
      display: flex;
      .chart {
        width: 60%;
        height: 100%;
        position: relative;
        // background: url('../../../assets/img4/huan.png') no-repeat center;
        // background-size: auto 100%;
        // background-position: 50% 50%;
        img {
          width: 58%;
          height: auto;
          position: absolute;
          top: 50%;
          left: 50%;
          animation: circleRoatation 15s linear infinite;
        }
      }
      .legend {
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        margin-left: 10px;
        .item {
          width: 100%;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .point {
            display: inline-block;
            width: 9px;
            height: 9px;
          }
          .name {
            display: inline-block;
            margin-left: 6px;
            width: 60px;
            font-family: SourceHanSansCN-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #9fa5ad;
          }
          .percent {
            font-family: DINPro-Medium;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
      }
    }
    .chart-box-2 {
      width: 100%;
      height: 150px;
      display: flex;
      .chart {
        width: 60%;
        height: 100%;
        position: relative;
        .aaa {
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translate(-50%, 50%);
          width: 100%;
          height: 100%;
        }
      }
      .legend {
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        margin-left: 10px;
        .item {
          width: 100%;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .point {
            display: inline-block;
            width: 9px;
            height: 9px;
          }
          .name {
            display: inline-block;
            margin-left: 6px;
            width: 60px;
            font-family: SourceHanSansCN-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #9fa5ad;
          }
          .percent {
            font-family: DINPro-Medium;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
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
