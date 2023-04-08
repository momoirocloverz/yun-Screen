<template>
  <div class="container">
    <div class="v1">
      <Box :height="'424px'" :bgSrc="require('../../../assets/imgBoxBg/zbz-box3-bg.png')">
        <div class="part-1">
          <Title :text="'多跨协同'" @textClick="dkxt_title_click">
            <!-- <div class="btn" @click="dkxt_Click">查看详情</div> -->
            <div class="detailBtn" @click="dkxt_Click">详情<i class="el-icon-arrow-right"></i></div>
          </Title>
          <div class="chart-box">
            <div class="chart">
              <LeftChart :logo="logo_2" :chartData="dkxt_tj[0]" :title="'事件签收率'" />
            </div>
            <div class="chart">
              <LeftChart :logo="logo_2" :startColor="'rgba(85,255,205,0.1)'" :color="'#55FFCD'" :chartData="dkxt_tj[1]" :title="'事件完结率'" />
            </div>
          </div>
          <div class="pie">
            <div class="pie-echart">
              <img src="../../../assets/img4/guanghuan.png" alt="" />
              <EchartPie :chartData="chartData_1_1" :logo="logo_1" :color="chartColor" />
              <div class="center-out">
                <div class="center">
                  <div>{{ totalNum }}</div>
                  <div>事件总数</div>
                </div>
              </div>
            </div>
            <div class="legend">
              <div class="item-special" v-for="(item, index) in chartData_1_1" :key="index + 30" v-show="index == 0" @click="legendClick(item)">
                <div class="row1">
                  <span class="icon" :style="{ background: chartColor[index] }"></span>
                  <span class="name marginLeft5">{{ item.name }}</span>
                  <div class="num-box">
                    <span class="rate">{{ index === 0 ? percentData.ywtg : percentData.aqzg }}%</span>
                    <span class="num">{{ item.num }} </span>
                  </div>
                </div>
                <div class="row2">
                  <div class="line-box">
                    <span class="line"></span>
                  </div>
                  <span class="key key-1">公安</span>
                  <span class="value">{{ chartData_1_1[6].num }}</span>
                  <span class="key">消防</span>
                  <span class="value">{{ chartData_1_1[7].num }}</span>
                  <span class="key">住建</span>
                  <span class="value">{{ chartData_1_1[8].num }}</span>
                </div>
              </div>
              <div class="item-special" v-for="(item, index) in chartData_1_1" :key="index + 40" v-show="index == 1" @click="legendClick(item)">
                <div class="row1">
                  <span class="icon" :style="{ background: chartColor[index] }"></span>
                  <span class="name marginLeft5">{{ item.name }} </span>
                  <div class="num-box">
                    <span class="rate">{{ index === 0 ? percentData.ywtg : percentData.aqzg }}%</span>
                    <span class="num">{{ item.num }} </span>
                  </div>
                </div>
              </div>
              <div class="item" v-for="(item, index) in chartData_1_1" :key="index + 10" v-show="index !== 0 && index !== 1 && index !== 6 && index !== 7 && index !== 8" @click="legendClick(item)">
                <span class="icon" :style="{ background: chartColor[index] }"></span>
                <span class="name">{{ item.name }} </span>
                <span class="num">{{ item.num }}</span>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Box :height="'484px'" :bgSrc="require('../../../assets/imgBoxBg/zbz-box4-bg.png')">
        <div class="part-2">
          <Title :text="'事件中心'" @textClick="sjzx_title_click">
            <!-- <div class="btn" @click="sjzx_Click">查看详情</div> -->
            <div class="detailBtn" @click="sjzx_Click">详情<i class="el-icon-arrow-right"></i></div>
          </Title>
          <div class="list">
            <div class="item" v-for="(item, index) in listData" :key="index">
              <div class="info-box">
                <div class="name">
                  <span>
                    {{ item.task }}
                  </span>
                </div>
                <div class="info">
                  <span>{{ item.createTime }}</span>
                  <span>{{ item.content }}</span>
                </div>
                <div class="btn" @click="itemClick(index)">
                  <span>详情</span>
                  <img :class="[index == currentIndex ? 'open' : '']" src="../../../assets/img4/arrow.png" alt="" srcset="" />
                </div>
              </div>
              <div v-if="index == currentIndex" class="time-line">
                <el-timeline>
                  <el-timeline-item timestamp="" placement="top">
                    <div class="content">
                      <div class="hby">
                        <span>护保员</span>
                        <span>{{ item.time1 }} 09:04:21</span>
                      </div>
                      <span class="info"> {{ item.content.split('：')[1] }} </span>
                    </div>
                  </el-timeline-item>
                  <el-timeline-item timestamp="" placement="top">
                    <div class="content">
                      <div class="system">
                        <span>文物安全监测处置应用系统</span>
                        <span>{{ item.time1 }} 09:12:05</span>
                      </div>
                      <span class="info"> 任务接受 </span>
                    </div>
                  </el-timeline-item>
                  <!-- <el-timeline-item timestamp="" placement="top">
                    <div class="content">
                      <div class="qzzx">
                        <span>区智中心</span>
                        <span>22/10/12 09:12:29</span>
                      </div>
                      <span class="info"> 签收成功 </span>
                    </div>
                  </el-timeline-item> -->
                  <el-timeline-item timestamp="" placement="top">
                    <div class="content">
                      <div class="street">
                        <span>处置结果</span>
                        <span>{{ item.time1 }} 10:18:51</span>
                      </div>
                      <span class="info"> 提交整改反馈 </span>
                    </div>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </div>
          <div class="chart">
            <LineChart
              :legendText="['上报事件', '部门移交', '上级督办', '其他事项']"
              :chartData_1="lineData_1"
              :chartData_2="lineData_2"
              :chartData_3="lineData_3"
              :chartData_4="lineData_4"
              :logo="logo"
            />
          </div>
        </div>
      </Box>
    </div>
    <!-- <div class="v2" v-else>
      <Box :height="'620px'" :bgSrc="require('../../../assets/imgBoxBg/zbz-box7-bg.png')">
        <div class="part-1">
          <Title :text="'文保监控'"> </Title>
          <div class="camera-box">
            <div class="item" v-for="(item, index) in cameraList" :key="index">
              <div class="video">
                <div class="inner" v-if="true">
                  <VideoBox :index="index" :videoId="item.cameraId" :width="`${210 / 192}rem`" :height="`${151 / 192}rem`" :autoplay="false" />
                </div>
                <div class="inner" v-else>
                  <VideoBoxEasy :index="index" :videoId="item.cameraId" :width="'1.989583rem'" :height="'1.375rem'" :autoplay="true" />
                </div>
              </div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </Box>
      <Box :height="'295px'" :bgSrc="require('../../../assets/imgBoxBg/zbz-box8-bg.png')">
        <div class="part-2">
          <Title :text="'紧急事件处理信息表'">
            <div class="btn">查看详情</div>
          </Title>
          <div class="table-jjsj">
            <Table
              :tableData="tableData_jjsj"
              :tableColumns="tableColumn_jjsj"
              :isStripe="true"
              :headTextColor="'#5CF6F4'"
              :headHeight="`${35 / 192}rem`"
              :headBgColor="'#222E68'"
              :rowHeight="`${34 / 192}rem`"
              :rowTextColor="'#a8b0d0'"
            >
              <template slot="status" slot-scope="scope">
                <span
                  :style="{
                    color: scope.row.status == '处理中' ? '#ffc231' : '#a8b0d0',
                    fontSize: '14px',
                  }"
                  >{{ scope.row.status == '处理中' ? '处理中' : '已处理' }}</span
                >
              </template>
            </Table>
          </div>
        </div>
      </Box>
    </div> -->

    <!-- 二级页面 -->
    <YWTG
      :isShow="isShow_ywtg"
      @close="
        () => {
          this.isShow_ywtg = false;
        }
      "
    />
    <DKXT
      :isShow="isShow_dkxt"
      @close="
        () => {
          this.isShow_dkxt = false;
        }
      "
    />
    <SJZX
      :isShow="isShow_sjzx"
      @close="
        () => {
          this.isShow_sjzx = false;
        }
      "
    />
  </div>
</template>

<script>
import { eventBus } from '@/main';
import { get_wwzz, get_ywtg_num } from '../../../api/xsApi2';
import { get_sjzx_data, get_jjsjcl_data, get_dkxt_data } from '../../../api/xsApi3';

import Box from '../components/box';
import Title from '../components/title';

import Table from './components/table';
import LeftChart from './components/leftChart';
import EchartPie from './components/echartPie3';
import LineChart from './components/echartLine4';

import VideoBox from './components/videoBox';
import VideoBoxEasy from './components/videoPlayerBox';

// 二级页面
import YWTG from './secondPage/YwtgDetail';
import DKXT from './secondPage/dkxt';
import SJZX from './secondPage/sjzx';

export default {
  components: {
    Box,
    Title,
    Table,
    EchartPie,
    LeftChart,
    LineChart,
    VideoBox,
    VideoBoxEasy,
    YWTG,
    DKXT,
    SJZX,
  },
  data() {
    return {
      isShowV2: false,
      // v1
      // part1
      dkxt_tj: [],
      logo_2: '1',
      chartData_1_1: [
        {
          name: '一网统管',
          num: '15',
        },
        {
          name: '安全整改',
          num: '9',
        },
        {
          name: '上级督查',
          num: '10',
        },
        {
          name: '信访事件',
          num: '15',
        },
        {
          name: '例行检查',
          num: '13',
        },
        {
          name: '专项检查',
          num: '12',
        },
        {
          name: '公安',
          num: '0',
        },
        {
          name: '消防',
          num: '0',
        },
        {
          name: '住建',
          num: '0',
        },
      ],
      percentData: {
        ywtg: '',
        aqzg: '',
      },
      totalNum: 0,
      chartColor: ['#73C5FF', '#26D1FF', '#37FFCB', '#FF9F26', '#2A84FF', '#EBBE68'],
      logo_1: '1',
      isShow_ywtg: false,
      isShow_dkxt: false,
      // part2
      currentIndex: -1,
      listData: [
        {
          task: '上报事件',
          createTime: '2023-01-17',
          content: '巡查员上报：发现大功率取暖器',
          time1: '23/01/17',
        },
        {
          task: '上报事件',
          createTime: '2023-01-17',
          content: '巡查员上报：瓦片脱落',
          time1: '23/01/17',
        },
        {
          task: '上报事件',
          createTime: '2023-01-17',
          content: '巡查员上报：发现大功率取暖器',
          time1: '23/01/17',
        },
        {
          task: '上报事件',
          createTime: '2023-01-17',
          content: '巡查员上报：发现烟花爆竹',
          time1: '23/01/17',
        },

        {
          task: '上报事件',
          createTime: '2023-01-12',
          content: '巡查员上报：衙前老街屋面瓦片有脱落现象',
          time1: '23/01/12',
        },
        {
          task: '上报事件',
          createTime: '2023-01-12',
          content: '巡查员上报：同泰当房内放油煤气瓶和电饭煲等厨房用具',
          time1: '23/01/12',
        },
        {
          task: '上报事件',
          createTime: '2023-01-12',
          content: '巡查员上报：东蓍草庵消防水龙头前设置铁杆，妨碍消防接管出水',
          time1: '23/01/12',
        },
        {
          task: '上报事件',
          createTime: '2022-12-23',
          content: '巡查员上报：省保单位瓜沥南大房东侧两线范围内违规建墙',
          time1: '22/12/23',
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
      isShow_sjzx: false,

      // v2
      // part1
      cameraList: [
        {
          name: '务本堂',
          cameraId: '7dfebb7006864120b6d076c918cb0ab8',
        },
        {
          name: '务本堂离火监控',
          cameraId: '37bc9ca73d8c467a94c95576dfccd9d1',
        },
        {
          name: '务本堂红外',
          cameraId: '2702e2f4b87a46248a96f7bbafb10004',
        },
        {
          name: '务本堂',
          cameraId: '37bc9ca73d8c467a94c95576dfccd9d1',
        },
        {
          name: '务本堂',
          cameraId: '37bc9ca73d8c467a94c95576dfccd9d1',
        },
        {
          name: '务本堂',
          cameraId: '37bc9ca73d8c467a94c95576dfccd9d1',
        },
      ],
      // part2
      tableColumn_jjsj: [
        {
          name: '时间',
          props: 'createTime',
          flex: 1.8,
        },
        {
          name: '内容',
          props: 'type',
        },
        {
          name: '状态',
          props: 'status',
          withSlot: true,
        },
        {
          name: '处置人',
          props: 'content',
        },
      ],
      tableData_jjsj: [
        {
          createTime: '2022-10-12 10:12:58',
          type: '新塘街道',
          status: '0',
          content: '邱宇奇',
        },
      ],
    };
  },
  created() {
    // eventBus.$on('isShow_ZBZ_V2',(boolean)=>{
    //   this.isShowV2 = boolean
    // })
  },
  mounted() {
    // let routerParams = this.$route.params;
    // this.isShowV2 = routerParams.isShowV2;

    this.getDKXT_data();
    this.get_wwzz(0, 0, '1');
    this.get_ywtg_num();
    this.getSJZX_data(1, 100);
    // this.getJJSJ_list(1, 100);
  },
  methods: {
    // 多跨协同
    getDKXT_data() {
      get_dkxt_data().then((res) => {
        this.dkxt_tj[0] = res.data.data.reportNum1;
        this.dkxt_tj[1] = res.data.data.reportNum2;
        this.logo_2 += '1';
      });
    },
    get_wwzz(level, name, rqlx) {
      get_wwzz(level, name, rqlx).then((res) => {
        // console.log('多跨协同', res.data.data.list[0])
        let detail = res.data.data.detail;
        this.totalNum = detail.reportNum1;
        this.percentData.aqzg = detail.reportNum5;

        let list = res.data.data.list[0];
        this.chartData_1_1[1].num = list.reportNum2;
        this.chartData_1_1[2].num = list.reportNum3;
        this.chartData_1_1[3].num = list.reportNum4;
        this.chartData_1_1[4].num = list.reportNum5;
        this.chartData_1_1[5].num = list.reportNum6;
        this.logo_1 += '1';
      });
    },
    dkxt_Click() {
      this.isShow_dkxt = true;
    },
    // 单独获取一网统管统计数据
    get_ywtg_num() {
      get_ywtg_num('1').then((res) => {
        // console.log('统计数据', res.data.data);
        this.chartData_1_1[0].num = res.data.data.total;
        this.percentData.ywtg = parseFloat((res.data.data.finish == 0 ? res.data.data.total : res.data.data.finish) / res.data.data.total).toFixed(2) * 100;

        this.chartData_1_1[6].num = res.data.data.ga;
        this.chartData_1_1[7].num = res.data.data.xf;
        this.chartData_1_1[8].num = res.data.data.zj;
      });
    },
    // 多跨协同标题点击
    dkxt_title_click() {
      let poiArr = [
        {
          type: '公安',
          poi: '120.305,29.9544',
        },
        {
          type: '消防',
          poi: '120.300,29.9994',
        },
        {
          type: '住建',
          poi: '120.274,30.0628',
        },
        {
          type: '城管',
          poi: '120.302,29.9741',
        },

        {
          type: '公安',
          poi: '120.18,30.04',
        },
        {
          type: '消防',
          poi: '120.25,30.16',
        },
        {
          poi: '120.28,29.96',
          type: '城管',
        },
        {
          poi: '120.18,30.01',
          type: '住建',
        },
        {
          poi: '120.21,29.99',
          type: '消防',
        },
      ];
      eventBus.$emit('normalEventPoi', poiArr, 'dkxt');
    },
    // 多跨协同---图例点击
    legendClick(item) {
      switch (item.name) {
        case '一网统管':
          this.isShow_ywtg = true;
          break;
        // case "安全整改":
        //   this.eventTitle = "安全整改";
        //   this.isShow_aqzg = true;
        //   break;
        // case "例行检查":
        //   this.eventTitle = "例行检查";
        //   this.isShow_aqzg = true;
        //   break;
        default:
          break;
      }
    },
    // 事件中心
    getSJZX_data(pageNum, pageSize) {
      get_sjzx_data(pageNum, pageSize).then((res) => {
        this.lineData_1 = [];
        this.lineData_2 = [];
        this.lineData_3 = [];
        this.lineData_4 = [];

        // this.listData = res.data.data.list1.list;
        let data = res.data.data.list2;
        data.map((item) => {
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
    // 事件中心标题点击
    sjzx_title_click() {
      let poiArr = [
        {
          type: '上报事件',
          poi: '120.305,29.9544',
        },
        {
          type: '部门移交',
          poi: '120.300,29.9994',
        },
        {
          type: '上级督办',
          poi: '120.274,30.0628',
        },

        {
          type: '上报事件',
          poi: '120.18,29.95',
        },
        {
          type: '部门移交',
          poi: '120.12,29.96',
        },
        {
          type: '上级督办',
          poi: '120.26,30.11',
        },
        {
          type: '部门移交',
          poi: '120.28,30.08',
        },
      ];
      eventBus.$emit('normalEventPoi', poiArr, 'sjzx');
    },
    sjzx_Click() {
      this.isShow_sjzx = true;
    },
    itemClick(index) {
      if (index == this.currentIndex) {
        this.currentIndex = -1;
      } else {
        this.currentIndex = index;
      }
    },
    // 紧急事件处理信息表
    getJJSJ_list(pageNum, pageSize) {
      get_jjsjcl_data(pageNum, pageSize).then((res) => {
        this.tableData_jjsj = res.data.data.list;
      });
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
  .v1 {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .part-1 {
      height: 400px;
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
      .chart-box {
        width: 100%;
        height: 150px;
        overflow: hidden;
        display: flex;
        .chart {
          width: 50%;
          height: 120px;
        }
      }
      .pie {
        width: 100%;
        height: calc(100% - 200px);
        position: relative;
        .pie-echart {
          height: 100%;
          width: 40%;
          position: relative;
          img {
            width: 100%;
            height: auto;
            animation: circleRoatation 15s linear infinite;
            position: absolute;
            top: 50%;
            left: 50%;
          }
          .center-out {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 190px;
            height: 190px;
            // background: url('../../../assets/img4/guanghuan.png') no-repeat
            //   center;
            // background-size: 100% 100%;

            .center {
              width: 80px;
              height: 80px;
              background: url('../../../assets/img3/c-bg.png') no-repeat center;
              background-size: 100% 100%;
              box-sizing: border-box;
              padding-bottom: 24px;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              align-items: center;
              div:nth-child(1) {
                font-family: DINAlternate-Bold;
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 14px;
                letter-spacing: 1px;
                color: #ffffff;
                margin-bottom: 5px;
              }
              div:nth-child(2) {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                padding-top: 5px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 14px;
                letter-spacing: 0px;
                color: #ffffff;
                // margin-bottom: 10px;
                border-top: 1px solid;
                border-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)) 1;
              }
            }
          }
        }
        .legend {
          position: absolute;
          top: 25px;
          right: 10px;
          // height: 100%;
          box-sizing: border-box;
          width: 55%;
          padding-left: 2%;
          display: flex;
          flex-wrap: wrap;

          // border-left: 2px solid;
          // border-image: linear-gradient(
          //     to bottom,
          //     rgba(255, 255, 255, 0),
          //     rgba(255, 255, 255, 0.7),
          //     rgba(255, 255, 255, 0)
          //   )
          //   1;
          .item-special-1 {
            margin: 5px 0;
          }
          .item-special {
            width: calc(50% - 10px);
            cursor: pointer;
            margin-left: 10px;
            position: relative;
            margin-bottom: 30px;
            .row1 {
              width: 100%;
              .icon {
                display: inline-block;
                width: 13px;
                height: 12px;
              }
              .name {
                font-family: PingFangSC-Regular;
                font-size: 16px;
                font-weight: bold;
                font-stretch: normal;
                // line-height: 30px;
                letter-spacing: 0px;
                color: #b5c1d1;
              }
              .num-box {
                display: flex;
                width: 100%;
                height: 30px;
                background: linear-gradient(to right, #3e75a5, #3e75a500);
                justify-content: space-around;
                align-items: center;
                margin: 5px 0;
                .rate {
                  font-family: DINAlternate-Bold;
                  font-size: 16px;
                  font-weight: bold;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffe082;
                  margin-right: 10px;
                }
                .num {
                  font-family: DINAlternate-Bold;
                  font-size: 16px;
                  font-weight: bold;
                  letter-spacing: 0px;
                  color: #00dcff;
                }
              }
            }
            .row2 {
              display: flex;
              align-items: flex-end;
              height: 75px;
              width: 200%;
              position: absolute;
              top: 10px;
              left: -15px;
              .line-box {
                height: 100%;
                width: 15px;
                // background: red;
                box-sizing: border-box;
                padding: 0 0 3px 6px;
                .line {
                  display: block;
                  width: 6px;
                  height: 65px;
                  border: 1px solid #7bd7fe;
                  border-right: none;
                }
              }
              .key {
                font-family: AdobeHeitiStd-Regular;
                font-size: 16px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #b5c1d1;
                margin-left: 10px;
              }
              .key-1 {
                margin-left: 0;
              }
              .value {
                font-family: DINPro-Medium;
                font-size: 16px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #aef0ff;
                margin-left: 5px;
              }
            }
          }

          .item {
            width: 50%;
            height: 30px;
            display: flex;
            align-items: center;
            cursor: pointer;
            background: #1c3b64;
            .icon {
              display: inline-block;
              width: 10px;
              height: 9px;
              margin-left: 10px;
            }
            .name {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              font-weight: bold;
              font-stretch: normal;
              line-height: 30px;
              letter-spacing: 0px;
              color: #b5c1d1;
              margin: 0 6px;
            }
            .num {
              font-family: DINAlternate-Bold;
              font-size: 14px;
              font-weight: bold;
              font-stretch: normal;
              line-height: 49px;
              letter-spacing: 0px;
              color: #9fffe3;
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
      .list {
        width: 100%;
        height: 230px;
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
              width: 100px;
              height: 30px;
              box-sizing: border-box;
              border: 1px solid #5366b4;
              transform: skewX(-30deg);
              background: #2f3d7c;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-left: 5px;
              span {
                display: inline-block;
                transform: skewX(30deg);
                font-family: PingFangSC-Regular;
                font-size: 16px;
                font-weight: normal;
                font-style: italic;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #a2b0e9;
              }
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
                display: inline-block;
                width: 220px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            .btn {
              width: 72px;
              height: 30px;
              border: none;
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
                transform: rotateZ(0deg);
                transition: transform 200ms;
              }
              .open {
                transform: rotateZ(-180deg);
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
                  .hby {
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
      .camera-box {
        width: 100%;
        height: 550px;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        margin-top: 5px;
        .item {
          width: 50%;
          height: 33%;
          .video {
            width: 100%;
            height: calc(100% - 30px);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .name {
            width: 100%;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            color: #fff;
          }
        }
      }
    }
    .part-2 {
      width: 100%;
      height: 245px;
      .btn {
        width: 80px;
        height: 25px;
        background: #122050;
        border: 1px solid #6aade5;
        box-shadow: inset #6aade5 0 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #6aade5;
        font-size: 15px;
      }
    }
  }
}
.marginLeft5 {
  margin-left: 5px;
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
