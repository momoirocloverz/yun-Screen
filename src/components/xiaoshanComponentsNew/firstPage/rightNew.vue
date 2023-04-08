<template>
  <div class="box">
    <img src="../../../assets/img3/title-right.png" alt="" srcset="" />
    <TitleBox :title="'多跨协同'" :imgSrc="require('../../../assets/img3/icon5.png')">
      <div style="width:96px;height:29px;position: absolute;right: 10px;top: 15%;background:#0A2F5E;">
        <el-select v-model="currentSelect_1" size="mini" placeholder="月份" style="width:96px;" @change="dkxt_rq_change">
          <el-option v-for="item in selectOPtion_1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
    </TitleBox>
    <div class="first-echart">
      <div class="event">
        <div class="item">待办：{{ event_1.willDo }}</div>
        <div class="item">已办：{{ event_1.hasDone }}</div>
      </div>
      <div class="pie">
        <div class="pie-echart">
          <EchartPie :chartData="chartData_1_1" :logo="logo_1" :color="chartColor" />
          <div class="center">
            <div>{{ totalNum }}</div>
            <div>事件总数</div>
          </div>
        </div>
        <div class="legend">
          <div class="item-special" v-for="(item, index) in chartData_1_1" :key="index + 30" v-show="index == 0" @click="legendClick(item)">
            <div class="row1">
              <span class="icon" :style="{ background: chartColor[index] }"></span>
              <span class="name">{{ item.name }} </span>
              <span class="rate">{{ index === 0 ? percentData.ywtg : percentData.aqzg }}%</span>
              <span class="num">{{ item.num }} </span>
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
          <div class="item-special item-special-1" v-for="(item, index) in chartData_1_1" :key="index + 40" v-show="index == 1" @click="legendClick(item)">
            <div class="row1">
              <span class="icon" :style="{ background: chartColor[index] }"></span>
              <span class="name">{{ item.name }} </span>
              <span class="rate">{{ index === 0 ? percentData.ywtg : percentData.aqzg }}%</span>
              <span class="num">{{ item.num }} </span>
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

    <TitleBox :title="'预警处置'" :imgSrc="require('../../../assets/img3/icon6.png')">
      <div style="width:255px;height:29px;position: absolute;right: 10px;top: 15%;display:flex;justify-content:flex-end;align-items:center;">
        <el-select v-model="currentSelect_2" size="mini" placeholder="时间" style="width:96px;background:#0A2F5E;" @change="yjcz_rq_change">
          <el-option v-for="item in selectOPtion_1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
    </TitleBox>
    <div class="second-echart">
      <div class="top">
        <div class="left">
          <img src="../../../assets/img3/disk-icon.png" alt="" />
          <div class="info">
            <span>{{ part2_tj.total }}</span>
            <span>预警事件</span>
          </div>
        </div>
        <div class="right">
          <div class="row">
            <span>已响应</span>
            <div class="outSide">
              <div class="inside"></div>
            </div>
            <span>{{ part2_tj.hasAct }}</span>
          </div>
          <div class="row">
            <span>已处置</span>
            <div class="outSide">
              <div class="inside"></div>
            </div>
            <span>{{ part2_tj.hasHandle }}</span>
          </div>
        </div>
      </div>
      <!-- <div class="line">
        <EchartsLine
          :chartData_1="chartData_2_1"
          :chartData_2="chartData_2_2"
          :chartData_3="chartData_2_3"
          :chartData_4="chartData_2_4"
          :firstColor="'#2BD5F2'"
          :secondColor="'#3BCDB4'"
          :thirdColor="'#ECA976'"
          :forthColor="'#1EAAFB'"
          :legendText="['智能感知预警','设施设备预警','气象灾害预警','其他预警']"
          :logo="logo_2"
        />
      </div> -->
      <div class="yjcz_box">
        <img src="../../../assets/img3/img-icon.png" alt="" srcset="" />
        <img src="../../../assets/img3/m-circle.png" alt="" srcset="" />
        <div class="center">
          <span>{{ yjcz_info[4].value }}</span>
          <span>{{ yjcz_info[4].name }}</span>
        </div>
        <div class="item item-1">
          <span>{{ yjcz_info[0].value }}</span>
          <span>{{ yjcz_info[0].name }}</span>
        </div>
        <div class="item item-2">
          <span>{{ yjcz_info[1].value }}</span>
          <span>{{ yjcz_info[1].name }}</span>
        </div>
        <div class="item item-3">
          <span>{{ yjcz_info[2].value }}</span>
          <span>{{ yjcz_info[2].name }}</span>
        </div>
        <div class="item item-4">
          <span>{{ yjcz_info[3].value }}</span>
          <span>{{ yjcz_info[3].name }}</span>
        </div>
      </div>
      <!-- <ZNGZYJ 
        :isShow="isShow_zngzyj"
        :headText="headText_zngzyj"
        :rqlx ="currentSelect_2"
        @close="close_zngzyj"
      /> -->
    </div>

    <TitleBox :title="'事件动态'" :imgSrc="require('../../../assets/img3/icon7.png')">
      <div style="width:203px;height:29px;position: absolute;right: 10px;top: 20%;background:#0A2F5E;display:flex;justify-content:space-between;">
        <el-select v-model="currentSelect_3" size="mini" placeholder="" style="width:96px;">
          <el-option v-for="item in selectOPtion_2" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-select v-model="currentSelect_4" size="mini" placeholder="月份" style="width:96px;" @change="sjdt_rq_change">
          <el-option v-for="item in selectOPtion_1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
    </TitleBox>
    <div class="third-part">
      <div class="head">
        <span>任务</span>
        <span>处理人</span>
        <span>处理时间</span>
        <span>处理结果</span>
      </div>
      <div class="list-box" @mouseleave="itemMouseLeave">
        <div
          :class="['item', currentItemIndex === index ? 'active-item' : '']"
          v-for="(item, index) in warningData_2"
          :key="index + 20"
          @mouseenter="itemMouseOver(item)"
          @click="itemClick(item, index)"
        >
          <!-- <div class="left">
            <div class="title">
              <div class="item-r">{{item.title1}}</div>
              <div
                class="item-r"
                v-if="item.title2"
              >{{item.title2}}</div>
            </div>
            <div class="info">
              <div class="item-r">
                <span>{{item.key1}}：</span>
                <span>{{item.value1}}</span>
              </div>
              <div
                class="item-r"
                v-if="item.key2"
              >
                <span>{{item.key2}}：</span>
                <span>{{item.value2}}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="info">
              <span>{{item.eventType=='物防'?'到期时间':'处置时间'}}: </span>
              <span>{{item.deadLine}}天</span>
            </div>
            <div :class="['type',currentItemIndex===index?'active-type':'']">{{item.eventType}}</div>
          </div> -->
          <span>{{ item.title1 }}</span>
          <span>{{ item.value2 }}</span>
          <span>{{ item.deadLine }}</span>
          <span
            :style="{
              color: item.statusText == '已处理' ? '#36f4c5' : item.statusText == '未处理' ? '#ff8c8c' : '#ebbe68',
            }"
            >{{ item.statusText }}</span
          >
        </div>
      </div>
      <div class="pagination">
        <el-pagination small @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize2" :pager-count="5" layout="total, prev, pager, next" :total="warningTotal">
        </el-pagination>
      </div>
    </div>

    <BasicInfoBox :isShow="basicBoxShow" :basicData="basicData" :poiImgArr="poiImgArr" @close="basicBoxHidden" />
    <YwtgDetail :isShow="isShow_ywtg_detail" :taskList="taskList" :logo="logo_ywtg" @close="ywtg_detailClose" />
    <EventTable2 :isShow="isShow_aqzg" :title="eventTitle" @close="eventTableClose" />

    <EventDetail :isShow="isShow_eventDetail" :logo="logo_eventDetail" :date="date_eventDetail" :row="eventRow" @close="eventDetail_detailClose" />

    <YsydDetail :isShow="isShow_ysyd_detail" :row="ysyd_row" @close="ysyd_detail_close" />
    <div v-show="false">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TitleBox from '../publicComponents/titleBoxNew';
import VideoBox from '../publicComponents/videoBox';
import EchartPie from './components/echartPie3';
import EchartBar3D from './components/echartBar3D';
import EchartsLine from './components/echartLine3';

import BasicInfoBox from './components/basicInfoBox';
import YwtgDetail from '../../mapPublicComponents/YwtgDatail';
import EventTable2 from '../../mapPublicComponents/eventTable2';
import EventDetail from './components/eventDetail';
import YsydDetail from './components/ysyd_detail';
import ZNGZYJ from './components/zngzyj';

// api接口
import { wwgk, wbd_list, wbd_list2, ywtg_list } from '../../../api/xsApi';
import { get_wwzz, get_ywtg_num, get_yjcz, get_sjdt, get_qxDetail, get_instenceId } from '../../../api/xsApi2';

import { eventBus } from '../../../main';

export default {
  name: '',
  components: {
    TitleBox,
    VideoBox,
    BasicInfoBox,
    EchartPie,
    EchartBar3D,
    EchartsLine,
    YwtgDetail,
    EventTable2,
    EventDetail,
    YsydDetail,
    ZNGZYJ,
  },
  data() {
    return {
      selectOPtion_1: [
        {
          label: '近30日',
          value: '30',
        },
        {
          label: '近7日',
          value: '7',
        },
        {
          label: '当日',
          value: '1',
        },
      ],
      selectOPtion_2: [
        {
          label: '全部',
          value: '1',
        },
      ],
      // part1
      event_1: { willDo: 2, hasDone: 2 },
      currentSelect_1: '1',
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

      eventTitle: '',
      // 一网统管弹框配置
      taskList: [],
      isShow_ywtg_detail: false,
      logo_ywtg: '1',
      // 安全整改
      isShow_aqzg: false,

      // part2
      currentSelect_2: '1',
      part2_tj: {
        total: '',
        hasAct: '',
        hasHandle: '',
      },
      warningData: [
        {
          name: '高温预警',
          num: '1',
          unit: '次',
          imgSrc: '',
        },
        {
          name: '水压监测预警',
          num: '0',
          unit: '次',
          imgSrc: '',
        },
        {
          name: '智能气感预警',
          num: '0',
          unit: '次',
          imgSrc: '',
        },
      ],
      chartData_2_1: [
        {
          name: '7.3',
          value: '15',
        },
        {
          name: '7.4',
          value: '20',
        },
        {
          name: '7.5',
          value: '15',
        },
        {
          name: '7.6',
          value: '17',
        },
        {
          name: '7.7',
          value: '20',
        },
        {
          name: '7.8',
          value: '16',
        },
        {
          name: '7.9',
          value: '14',
        },
      ],
      chartData_2_2: [
        {
          name: '7.3',
          value: '12',
        },
        {
          name: '7.4',
          value: '13',
        },
        {
          name: '7.5',
          value: '10',
        },
        {
          name: '7.6',
          value: '15',
        },
        {
          name: '7.7',
          value: '14',
        },
        {
          name: '7.8',
          value: '12',
        },
        {
          name: '7.9',
          value: '13',
        },
      ],
      chartData_2_3: [
        {
          name: '7.3',
          value: '19',
        },
        {
          name: '7.4',
          value: '17',
        },
        {
          name: '7.5',
          value: '18',
        },
        {
          name: '7.6',
          value: '20',
        },
        {
          name: '7.7',
          value: '18',
        },
        {
          name: '7.8',
          value: '16',
        },
        {
          name: '7.9',
          value: '19',
        },
      ],
      chartData_2_4: [
        {
          name: '7.3',
          value: '12',
        },
        {
          name: '7.4',
          value: '15',
        },
        {
          name: '7.5',
          value: '22',
        },
        {
          name: '7.6',
          value: '20',
        },
        {
          name: '7.7',
          value: '17',
        },
        {
          name: '7.8',
          value: '19',
        },
        {
          name: '7.9',
          value: '22',
        },
      ],
      yjcz_info: [
        {
          name: '盗掘盗窃',
          value: '15',
        },
        {
          name: '法人违法',
          value: '14',
        },
        {
          name: '自然灾害',
          value: '10',
        },
        {
          name: '其他',
          value: '17',
        },
        {
          name: '火灾隐患',
          value: '2',
        },
      ],
      logo_2: '1',

      isShow_zngzyj: false,
      headText_zngzyj: '',

      // part3
      currentItemIndex: null,
      currentSelect_3: '1',
      currentSelect_4: '1',
      warningTotal: 0,
      warningData_2: [
        {
          left: {
            title: '灭火器到期预警',
            titleLeft: '',
            name_1: '检查地点',
            text_1: '务本堂',
            name_2: '检查人',
            text_2: '张德军',
          },
          right: {
            name: '到期时间',
            text: '5天',
            type: '人防',
          },
        },
      ],
      currentPage: 1,
      pageSize2: 5,

      basicBoxShow: false,
      basicData: {},
      poiImgArr: [],

      // 事件详情---气象
      isShow_eventDetail: false,
      logo_eventDetail: '1',
      date_eventDetail: '',
      eventRow: {},
      // 事件详情---例行检查
      isShow_ysyd_detail: false,
      ysyd_row: {},

      // 文物列表搜索条件
      pageNum: 1,
      pageSize: 10,
      rankId: '',
      fxlx: '',
      fxdj: '',
      jd: '',
      category: '',
    };
  },
  created() {
    eventBus.$on('showAllpoi', () => {
      this.get_wbdList_data_cluster(
        '2bf3be523de944ec3ee1ad832a7a2587',
        'b16db07f34112b9b0fc6d2b54214e0aa',
        '',
        '4', // 不聚合
      );
      this.get_wbdList_data('14da5819da904c4ab1d9d94a961ca27a', '', '1'); //国保
      this.get_wbdList_data('cef2a80fbea6df89578ad5599b67b71f', '', '2'); //省保
    });
    eventBus.$on('gotoStreet', msg => {
      this.pageSize = 10;
      this.jd = msg[1];
      if (msg[2]) {
        // this.get_wbdList_data('2bf3be523de944ec3ee1ad832a7a2587', '', '3') //市保
        // this.get_wbdList_data('b16db07f34112b9b0fc6d2b54214e0aa', '', '4') //市级文保点
        this.get_wbdList_data_cluster(
          '2bf3be523de944ec3ee1ad832a7a2587',
          'b16db07f34112b9b0fc6d2b54214e0aa',
          '',
          // '3' // 聚合
          '4', // 不聚合
        );
        this.get_wbdList_data('14da5819da904c4ab1d9d94a961ca27a', '', '1'); //国保
        this.get_wbdList_data('cef2a80fbea6df89578ad5599b67b71f', '', '2'); //省保
      }

      // 模拟数据
      if (msg[1] == '进化镇') {
        // 多跨协同
        this.totalNum = 17;
        this.event_1.willDo = 10;
        this.event_1.hasDone = 7;
        this.percentData.aqzg = 94;
        this.chartData_1_1[0].num = 6;
        this.chartData_1_1[1].num = 2;
        this.chartData_1_1[2].num = 1;
        this.chartData_1_1[3].num = 3;
        this.chartData_1_1[4].num = 2;
        this.chartData_1_1[5].num = 3;
        this.logo_1 += '1';
        this.percentData.ywtg = 50;
        this.chartData_1_1[6].num = 2;
        this.chartData_1_1[7].num = 1;
        this.chartData_1_1[8].num = 3;

        // 预警处置
        this.part2_tj.total = 15;
        this.part2_tj.hasAct = 6;
        this.part2_tj.hasHandle = 9;
        this.yjcz_info[0].value = 3;
        this.yjcz_info[1].value = 2;
        this.yjcz_info[2].value = 1;
        this.yjcz_info[3].value = 2;
        this.yjcz_info[4].value = 7;

        // 事件动态
        this.warningData_2 = this.warningData_2.splice(0, 3);
        this.warningTotal = 3;
      }
    });
    eventBus.$on('data_back', msg => {
      //   console.log("kkk1");
      this.pageSize = 10;
      this.pageNum = 1;
      this.jd = '';
      this.category = '';
      if (!msg[0]) {
        // console.log("kkk2");
        // this.get_wbdList_data_cluster(
        //   '2bf3be523de944ec3ee1ad832a7a2587',
        //   'b16db07f34112b9b0fc6d2b54214e0aa',
        //   '',
        //   // '3' // 聚合
        //   '4' // 不聚合
        // )
        // this.get_wbdList_data('14da5819da904c4ab1d9d94a961ca27a', '', '1') //国保
        // this.get_wbdList_data('cef2a80fbea6df89578ad5599b67b71f', '', '2') //省保

        // this.get_wbdList_data('0', '', '5') //初始化9个文保点
        this.get_all_wbdList_data('', '5');
      }

      // 萧山区层面
      this.get_wwzz(0, 0, this.currentSelect_1);
      this.get_ywtg_num();
      this.get_yjcz(0, 0, this.currentSelect_2);
    });
    // 左上按钮----筛选点位
    eventBus.$on('drawpoi', (msg1, msg2, msg3) => {
      //   console.log(msg1, msg2, msg3);
      this.category = msg1.join();
      this.jd = msg2.join();
      this.get_wbdList_data_cluster(
        '2bf3be523de944ec3ee1ad832a7a2587',
        'b16db07f34112b9b0fc6d2b54214e0aa',
        '',
        // '3' // 聚合
        '4', // 不聚合
      );
      this.get_wbdList_data('14da5819da904c4ab1d9d94a961ca27a', '', '1'); //国保
      this.get_wbdList_data('cef2a80fbea6df89578ad5599b67b71f', '', '2'); //省保
    });
    // 地图点位点击
    eventBus.$on('poiClick', msg => {
      let params = {
        pageSize: 10,
        currentPage: 1,
        publishName: msg.poiName,
      };
    //   console.log(msg, params);
      wbd_list(params).then(res => {
        this.basicData = res.data.data.list[0];
        this.basicBoxShow = true;
        if (msg.path) {
          this.poiImgArr = [...msg.path];
        } else {
          this.poiImgArr = [];
        }
      });
    });

    // 高温预警---事件动态搜索
    eventBus.$on('searchHotWarning', () => {
      this.get_sjdt(0, 0, '38', this.currentSelect_4);
    });
    eventBus.$on('searchNormalWarning', () => {
      this.get_sjdt(0, 0, '0', this.currentSelect_4);
    });
    // 更新数据
    eventBus.$on('updateApi', () => {
      this.get_yjcz(0, 0);
      this.get_sjdt(0, 0, '0', this.currentSelect_4);
    });
  },
  mounted() {
    this.get_wwzz(0, 0, this.currentSelect_1);
    this.get_ywtg_num();
    this.get_yjcz(0, 0, this.currentSelect_2);
    // this.get_sjdt(0, 0)

    // this.rankId = this.wwgk_data[this.currentIndex].id
    this.pageSize = 10;
    this.pageNum = 1;
    this.fxlx = '';
    this.fxdj = '';

    // this.get_wbdList_data_cluster(
    //   '2bf3be523de944ec3ee1ad832a7a2587',
    //   'b16db07f34112b9b0fc6d2b54214e0aa',
    //   'init',
    //   // '3' // 聚合
    //   '4' // 不聚合
    // )
    // this.get_wbdList_data('14da5819da904c4ab1d9d94a961ca27a', 'init', '1') //国保
    // this.get_wbdList_data('cef2a80fbea6df89578ad5599b67b71f', 'init', '2') //省保

    // this.get_wbdList_data('0', 'init', '5') //初始化9个文保点
    this.get_all_wbdList_data('init', '5');
  },
  methods: {
    getSum() {
      let sum = 0;
      this.chartData_1_1.map(item => {
        sum += item.num * 1;
      });
      this.totalNum = sum;
    },
    // 多跨协同
    get_wwzz(level, name, rqlx) {
      get_wwzz(level, name, rqlx).then(res => {
        // console.log("多跨协同", res.data.data.list[0]);
        let detail = res.data.data.detail;
        this.totalNum = detail.reportNum1;
        this.event_1.willDo = detail.reportNum2;
        this.event_1.hasDone = detail.reportNum3;
        // this.percentData.ywtg = detail.reportNum4
        this.percentData.aqzg = detail.reportNum5;

        let list = res.data.data.list[0];
        // this.chartData_1_1[0].num = list.reportNum1
        this.chartData_1_1[1].num = list.reportNum2;
        this.chartData_1_1[2].num = list.reportNum3;
        this.chartData_1_1[3].num = list.reportNum4;
        this.chartData_1_1[4].num = list.reportNum5;
        this.chartData_1_1[5].num = list.reportNum6;
        this.logo_1 += '1';
      });
    },
    // 单独获取一网统管统计数据
    get_ywtg_num() {
      get_ywtg_num(this.currentSelect_1).then(res => {
        // console.log("统计数据", res.data.data);
        this.chartData_1_1[0].num = res.data.data.total;
        this.percentData.ywtg = parseFloat(res.data.data.finish / res.data.data.total).toFixed(2) * 100;

        this.chartData_1_1[6].num = res.data.data.ga;
        this.chartData_1_1[7].num = res.data.data.xf;
        this.chartData_1_1[8].num = res.data.data.zj;
      });
    },
    dkxt_rq_change(val) {
      this.currentSelect_1 = val;
      this.get_wwzz(0, 0, this.currentSelect_1);
      this.get_ywtg_num();
    },

    // 预警处置
    get_yjcz(level, name, rqlx) {
      this.chartData_2_1 = [];
      this.chartData_2_2 = [];
      this.chartData_2_3 = [];
      this.chartData_2_4 = [];
      get_yjcz(level, name, rqlx).then(res => {
        // console.log('预警处置', res);
        let detail = res.data.data.detail;
        let list = res.data.data.list;

        this.part2_tj.total = detail.reportNum1;
        this.part2_tj.hasAct = detail.reportNum2;
        this.part2_tj.hasHandle = detail.reportNum3;

        this.yjcz_info[0].value = list[list.length - 1].reportNum1;
        this.yjcz_info[1].value = list[list.length - 1].reportNum2;
        this.yjcz_info[2].value = list[list.length - 1].reportNum3;
        this.yjcz_info[3].value = list[list.length - 1].reportNum4;
        this.yjcz_info[4].value = list[list.length - 1].reportNum5 ? list[list.length - 1].reportNum5 : '0';

        list.map(item => {
          let obj_1 = {
            name: item.reportItem,
            value: item.reportNum1,
          };
          let obj_2 = {
            name: item.reportItem,
            value: item.reportNum2,
          };
          let obj_3 = {
            name: item.reportItem,
            value: item.reportNum3,
          };
          let obj_4 = {
            name: item.reportItem,
            value: item.reportNum4,
          };
          this.chartData_2_1.push(obj_1);
          this.chartData_2_2.push(obj_2);
          this.chartData_2_3.push(obj_3);
          this.chartData_2_4.push(obj_4);
        });
        this.logo_2 += '1';
      });
    },
    yjcz_rq_change(val) {
      this.currentSelect_2 = val;
      this.get_yjcz(0, 0, this.currentSelect_2);
    },

    // 打开预警处置弹框详情
    // zngnyj_click(val){
    //   switch (val) {
    //     case '1':
    //       this.headText_zngzyj = '智能感知预警'
    //       break;
    //     case '2':
    //       this.headText_zngzyj = '设施设备预警'
    //       break;
    //     case '3':
    //       this.headText_zngzyj = '气象灾害预警'
    //       break;
    //     case '4':
    //       this.headText_zngzyj = '其他预警'
    //       break;
    //     default:
    //       break;
    //   }
    //   this.isShow_zngzyj = true
    // },
    // 关闭预警处置弹框
    // close_zngzyj(){
    //   this.isShow_zngzyj = false
    // },

    // 事件动态
    get_sjdt(levle, name, wd = '0', rqlx) {
      get_sjdt(this.currentPage, this.pageSize2, levle, name, wd, rqlx).then(res => {
        this.warningData_2 = res.data.data.list;
        this.warningTotal = res.data.data.total;
      });
    },
    sjdt_rq_change(val) {
      this.currentSelect_4 = val;
      this.get_sjdt(0, 0, '0', this.currentSelect_4);
    },
    // 事件动态分页
    pageNumChange(val) {
    //   console.log(val);
      this.currentPage = val;
      this.currentItemIndex = null;
      this.get_sjdt(0, 0, '0', this.currentSelect_4);
    },

    // 事件动态，点击显示详情弹框，撒点
    itemMouseOver(item) {
      let params = {
        jd: '',
        category: '',
        currentPage: 1,
        id: item.pointId,
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        rank: '',
        trialList: [],
      };
      wbd_list2(params).then(res => {
        // console.log('事件活跃点位', res.data.data);
        eventBus.$emit('drawCulturalPoi', res.data.data.list, '', '6');
      });
    },
    itemMouseLeave() {
      eventBus.$emit('poiBack');
    },
    itemClick(item, index) {
    //   console.log(item);
      this.currentItemIndex = index;
      if (item.title1 === '气象预警') {
        this.eventRow = item;
        this.isShow_eventDetail = true;
        this.logo_eventDetail += '1';
        this.date_eventDetail = item.value2.split(' ')[0];
        this.get_qxDetail_2(this.date_eventDetail, '2bf3be523de944ec3ee1ad832a7a2587', 'b16db07f34112b9b0fc6d2b54214e0aa', '4');
        this.get_qxDetail_1(this.date_eventDetail, '14da5819da904c4ab1d9d94a961ca27a', '1'); //国保
        this.get_qxDetail_1(this.date_eventDetail, 'cef2a80fbea6df89578ad5599b67b71f', '2'); //省保
      } else if (item.title1 === '硬件预警') {
        // console.log(item);
        this.eventRow = item;
        this.isShow_eventDetail = true;
        this.logo_eventDetail += '1';
      } else {
        // console.log(item);
        if (item.title1 == '例行检查任务') {
          get_instenceId(item.id).then(res => {
            this.isShow_ysyd_detail = true;
            this.ysyd_row = item;
            this.ysyd_row.instanceId = res.data.data.instanceId;
          });
        } else {
          this.isShow_ysyd_detail = true;
          this.ysyd_row = item;
        }
      }
    },

    // 事件动态详情弹框关闭
    eventDetail_detailClose() {
      this.get_qxDetail_2(this.date_eventDetail, '2bf3be523de944ec3ee1ad832a7a2587', 'b16db07f34112b9b0fc6d2b54214e0aa', '4');
      this.get_qxDetail_1(this.date_eventDetail, 'cef2a80fbea6df89578ad5599b67b71f', '2'); //省保
      this.get_qxDetail_1(this.date_eventDetail, '14da5819da904c4ab1d9d94a961ca27a', '1'); //国保
      this.isShow_eventDetail = false;
    },
    // 气象预警详情获取
    get_qxDetail_1(rq, rankId, type) {
      // 撒点位--未聚合
      get_qxDetail(1, 300, rq, rankId).then(res => {
        // console.log('气象预警详情1', res.data.data.qxxqList.list);
        eventBus.$emit('drawCulturalPoi', res.data.data.qxxqList.list, '', type);
      });
    },
    get_qxDetail_2(rq, rank1, rank2, type) {
      // 撒点位--聚合
      let p1 = get_qxDetail(1, 300, rq, rank1);
      let p2 = get_qxDetail(1, 300, rq, rank2);
      Promise.all([p1, p2]).then(res => {
        let arr1 = res[0].data.data.qxxqList.list;
        let arr2 = res[1].data.data.qxxqList.list;
        let arr = arr1.concat(arr2);
        // console.log('9876_1', arr);
        eventBus.$emit('drawCulturalPoi', arr, '', type);
      });
    },

    // 事件详情----各种检查
    ysyd_detail_close() {
      // 关闭弹框
      this.isShow_ysyd_detail = false;
    },

    // 多跨协同---图例点击
    legendClick(item) {
      switch (item.name) {
        case '一网统管':
          // this.get_ywtg_list()
          this.logo_ywtg += '1';
          this.isShow_ywtg_detail = true;
          break;
        case '安全整改':
          this.eventTitle = '安全整改';
          this.isShow_aqzg = true;
          break;
        case '例行检查':
          this.eventTitle = '例行检查';
          this.isShow_aqzg = true;
          break;
        default:
          break;
      }
    },
    get_ywtg_list() {
      let params = {
        current: 1,
        size: 100,
      };
      ywtg_list(params).then(res => {
        // console.log("一网统管列表", res.data);
        this.taskList = res.data.data.records;
      });
    },

    // 获取文保点列表
    get_wbdList_data(rankId = this.rankId, logo = '', type = '') {
      let params = {
        jd: this.jd,
        category: this.category,
        currentPage: this.pageNum,
        id: '',
        fxdj: this.fxdj,
        fxlx: this.fxlx,
        isGraden: 0,
        pageSize: this.pageSize,
        publishName: '',
        rank: rankId,
        trialList: [],
      };
      let params2 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: this.fxdj,
        fxlx: this.fxlx,
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        rank: rankId,
        trialList: [],
      };
      wbd_list2(params2).then(res => {
        // console.log('文保点列表2', res.data.data);
        eventBus.$emit('drawCulturalPoi', res.data.data.list, logo, type);
      });
      // wbd_list(params).then((res) => {
      //   console.log('文保点列表', res.data.data)
      //   this.wwListData = res.data.data.list
      //   this.wwListTotal = res.data.data.total
      //   // this.$refs.wwList.scrollTop = 0
      //   // eventBus.$emit("drawCulturalPoi", res.data.data.list, logo);
      // })
    },

    // 获取全部文物点位
    get_all_wbdList_data(logo, type) {
      let params1 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        rank: '14da5819da904c4ab1d9d94a961ca27a',
        trialList: [],
      };
      let params2 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        rank: 'cef2a80fbea6df89578ad5599b67b71f',
        trialList: [],
      };
      let params3 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        rank: '2bf3be523de944ec3ee1ad832a7a2587',
        trialList: [],
      };
      let params4 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        rank: 'b16db07f34112b9b0fc6d2b54214e0aa',
        trialList: [],
      };
      let p1 = wbd_list2(params1);
      let p2 = wbd_list2(params2);
      let p3 = wbd_list2(params3);
      let p4 = wbd_list2(params4);
      Promise.all([p1, p2, p3, p4]).then(res => {
        let arr1 = res[0].data.data.list;
        let arr2 = res[1].data.data.list;
        let arr3 = res[2].data.data.list;
        let arr4 = res[3].data.data.list;
        let arr = arr1
          .concat(arr2)
          .concat(arr3)
          .concat(arr4);
        // console.log('9876000', arr);
        eventBus.$emit('drawCulturalPoi', arr, logo, type);
      });
    },

    // 获取需要聚合的点位---市保和市级文保点
    get_wbdList_data_cluster(rank_shiB, rank_shiJ, logo, type) {
      let params1 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: this.fxdj,
        fxlx: this.fxlx,
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        rank: rank_shiB,
        trialList: [],
      };
      let params2 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: this.fxdj,
        fxlx: this.fxlx,
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        rank: rank_shiJ,
        trialList: [],
      };
      let p1 = wbd_list2(params1);
      let p2 = wbd_list2(params2);
      Promise.all([p1, p2]).then(res => {
        let arr1 = res[0].data.data.list;
        let arr2 = res[1].data.data.list;
        let arr = arr1.concat(arr2);
        // console.log('9876000', arr);
        eventBus.$emit('drawCulturalPoi', arr, logo, type);
      });
    },
    basicBoxHidden() {
      this.basicBoxShow = false;
    },
    ywtg_detailClose() {
      this.isShow_ywtg_detail = false;
    },
    eventTableClose() {
      this.isShow_aqzg = false;
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes rotateCircle {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.box {
  // width: 100%;
  // height: 100%;
  user-select: none;

  background: #102e56;
  border: 1px solid rgba(49, 110, 177, 0.65);
  width: 453px;
  height: 949px;
  z-index: 10;
  img {
    position: relative;
    width: 444px;
    height: 57px;
    top: -9px;
    left: 6px;
  }

  .title-btn {
    background: red;
    width: 20px;
    height: 20px;
    position: relative;
    cursor: pointer;
    .riskType {
      position: absolute;
      top: 45px;
      left: 0;
      display: flex;
      flex-direction: column;
      width: 100px;
      height: 150px;
      border: 1px solid #1888d8;
      background: #034370;
      z-index: 999;
      .item {
        width: 100%;
        height: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 18px;
        &:hover {
          background: gold;
        }
      }
    }
  }

  .first-echart {
    width: 100%;
    height: 221px;

    .event {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      margin-left: 10px;
      .item {
        height: 28px;
        width: 134px;
        background-size: 100% 100%;
        margin-right: 5px;
        box-sizing: border-box;
        padding-left: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        &:nth-child(1) {
          background: url('../../../assets/img3/button_1.png') no-repeat center;
        }
        &:nth-child(2) {
          background: url('../../../assets/img3/button_1.png') no-repeat center;
        }
      }
    }
    .pie {
      width: 100%;
      height: calc(100% - 40px);
      position: relative;
    }
    .pie-echart {
      height: 100%;
      width: 50%;
      position: relative;
      .center {
        position: absolute;
        top: 50%;
        left: 40%;
        transform: translate(-50%, -50%);
        width: 94px;
        height: 93px;
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
          margin-bottom: 10px;
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
          margin-bottom: 10px;
          border-top: 1px solid;
          border-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)) 1;
        }
      }
    }
    .legend {
      position: absolute;
      top: 15px;
      right: 10px;
      // height: 100%;
      box-sizing: border-box;
      width: 55%;
      padding-left: 2%;
      display: flex;
      flex-wrap: wrap;

      border-left: 2px solid;
      border-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0)) 1;
      .item-special-1 {
        margin: 5px 0;
      }
      .item-special {
        width: 100%;
        cursor: pointer;
        margin-left: 10px;
        .row1 {
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
        .row2 {
          display: flex;
          align-items: flex-end;
          height: 40px;
          .line-box {
            height: 100%;
            width: 15px;
            // background: red;
            box-sizing: border-box;
            padding: 0 0 3px 6px;
            .line {
              display: block;
              width: 6px;
              height: 30px;
              border: 1px solid #7bd7fe;
              border-top: none;
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
  .second-echart {
    width: 100%;
    height: 251px;
    .top {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 140px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        margin-left: 10px;
        img {
          width: 78px;
          height: 76px;
          margin-right: 5px;
          margin-top: 15px;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 80px;
          span:nth-child(1) {
            font-family: DINAlternate-Bold;
            font-size: 28px;
            font-weight: bold;
            font-stretch: normal;
            letter-spacing: 1px;
            // color: #00dcff;
            color: #ffffff;
          }
          span:nth-child(2) {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 14px;
            letter-spacing: 0px;
            color: #ffffff;
            opacity: 0.6;
            margin-bottom: 10px;
          }
        }
      }
      .right {
        width: calc(100% - 155px);
        height: 53px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .row {
          width: 100%;
          height: 16px;
          display: flex;
          align-items: center;
          span:nth-child(1) {
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #d9d9d9;
            margin: 0 10px;
          }
          .outSide {
            flex: 1;
            height: 14px;
            background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 208, 244, 0.2));
            position: relative;
            .inside {
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
          &:nth-child(1) {
            .outSide .inside {
              width: 70%;
              background: linear-gradient(to right, rgba(0, 0, 0, 0), #0a93e3);
            }
          }
          &:nth-child(2) {
            .outSide .inside {
              width: 30%;
              background: linear-gradient(to right, rgba(0, 0, 0, 0), #0a93e3);
            }
          }
          span:nth-child(3) {
            display: inline-block;
            width: 40px;
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #18b6ff;
            margin: 0 10px;
            margin-right: 5px;
          }
        }
      }
    }
    // .line {
    //   width: 100%;
    //   height: calc(100% - 110px);
    // }
    .yjcz_box {
      width: 100%;
      height: 161px;
      // background: url('../../../assets/img3/txt-bg.png') no-repeat center;
      // background-size: 100% 100%;
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        &:nth-child(1) {
          width: 85px;
          height: 74px;
          transform: translateX(-50%);
        }
        &:nth-child(2) {
          width: 234px;
          height: 188px;
          animation: rotateCircle 5s infinite linear;
        }
      }
      .center {
        width: 160px;
        height: 126px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -40%);
        // background: url('../../../assets/img3/yjcz-pic.png') no-repeat center;
        // background-size:100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        span:nth-child(1) {
          font-family: DINPro-Bold;
          font-size: 28px;
          font-weight: 900;
          font-stretch: normal;
          line-height: 23px;
          letter-spacing: 0px;
          color: #fefefe;
          background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 5px;
        }
        span:nth-child(2) {
          font-family: SourceHanSansCN-Bold;
          font-size: 16px;
          font-weight: 900;
          font-stretch: normal;
          line-height: 23px;
          letter-spacing: 2px;
          color: #ffffff;
        }
      }
      .item {
        width: 141px;
        height: 75px;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        span:nth-child(1) {
          font-family: SourceHanSansCN-Medium;
          font-size: 28px;
          font-weight: 900;
          font-stretch: normal;
          letter-spacing: 1px;
          background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        span:nth-child(2) {
          font-family: DINPro-Bold;
          font-size: 16px;
          font-weight: 900;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
      .item-1 {
        top: 0px;
        left: 10px;
        background: url('../../../assets/img3/l-pic1.png') no-repeat bottom;
        background-size: 100% auto;
        span {
          margin-left: 30px;
        }
      }
      .item-2 {
        top: 0px;
        right: 5px;
        background: url('../../../assets/img3/l-pic3.png') no-repeat bottom;
        background-size: 100% auto;
        span {
          margin-right: 30px;
        }
      }
      .item-3 {
        bottom: 0px;
        left: 10px;
        background: url('../../../assets/img3/l-pic2.png') no-repeat bottom;
        background-size: 100% auto;
        span {
          margin-left: 30px;
        }
      }
      .item-4 {
        bottom: 0px;
        right: 5px;
        background: url('../../../assets/img3/l-pic4.png') no-repeat bottom;
        background-size: 100% auto;
        span {
          margin-right: 30px;
        }
      }
    }
  }
  .third-part {
    width: 100%;
    height: 331px;
    .head {
      width: 430px;
      height: 30px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 20px;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-family: Alibaba-PuHuiTi-R;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        opacity: 0.6;
      }
      span:nth-child(1) {
        width: 92px;
      }
      span:nth-child(2) {
        width: 140px;
      }
      span:nth-child(3) {
        width: 110px;
      }
      span:nth-child(4) {
        width: 73px;
      }
    }
    .list-box {
      width: 100%;
      height: calc(100% - 90px);
      overflow: auto;
      overflow-x: hidden;
      .item {
        // width: 468px;
        width: 450px;
        height: 48px;
        box-sizing: border-box;
        padding-left: 20px;
        // background: url('../../../assets/img3/list-nomal.png') no-repeat center;
        // background-size: 100% auto;
        border-top: 2px solid rgba(0, 0, 0, 0);
        border-image: radial-gradient(#00f5ff, #00f7ff00) 2;
        display: flex;
        cursor: pointer;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          font-family: Alibaba-PuHuiTi-R;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
          border-right: 1px solid #00bbff;
        }
        span:nth-child(1) {
          width: 92px;
        }
        span:nth-child(2) {
          width: 140px;
        }
        span:nth-child(3) {
          width: 110px;
        }
        span:nth-child(4) {
          width: 73px;
          border: none;
        }

        // .left {
        //   height: 100%;
        //   width: 332px;
        //   box-sizing: border-box;
        //   padding-left: 15px;
        //   display: flex;
        //   flex-direction: column;
        //   justify-content: center;
        //   align-items: flex-start;
        //   .title {
        //     height: 50%;
        //     display: flex;
        //     width: 100%;
        //     .item-r {
        //       width: 50%;
        //       height: 100%;
        //       display: flex;
        //       justify-content: flex-start;
        //       align-items: center;
        //       &:nth-child(1) {
        //         font-family: PingFangSC-Regular;
        //         font-size: 16px;
        //         font-weight: normal;
        //         font-stretch: normal;
        //         line-height: 16px;
        //         letter-spacing: 0px;
        //         color: #ffffff;
        //       }
        //       &:nth-child(2) {
        //         font-family: AdobeHeitiStd-Regular;
        //         font-size: 14px;
        //         font-weight: normal;
        //         font-stretch: normal;
        //         line-height: 14px;
        //         letter-spacing: 0px;
        //         color: #ffdaba;
        //       }
        //     }
        //   }
        //   .info {
        //     height: 50%;
        //     display: flex;
        //     width: 100%;
        //     .item-r {
        //       flex: 1;
        //       height: 100%;
        //       display: flex;
        //       justify-content: flex-start;
        //       align-items: center;
        //       span {
        //         font-family: PingFangSC-Regular;
        //         font-size: 14px;
        //         font-weight: normal;
        //         font-stretch: normal;
        //         line-height: 14px;
        //         letter-spacing: 0px;
        //         color: #ffffff;
        //         opacity: 0.5;
        //         &:nth-child(1) {
        //           margin-right: 2px;
        //           max-width:65px;
        //           white-space: nowrap;
        //         }
        //       }
        //     }
        //   }
        // }
        // .right {
        //   height: 100%;
        //   width: 100px;
        //   box-sizing: border-box;
        //   padding: 0 5px;
        //   display: flex;
        //   flex-direction: column;
        //   justify-content: center;
        //   align-items: flex-end;
        //   .info {
        //     width: 100%;
        //     font-family: AdobeHeitiStd-Regular;
        //     font-size: 14px;
        //     font-weight: normal;
        //     font-stretch: normal;
        //     line-height: 14px;
        //     letter-spacing: 0px;
        //     color: #ffdaba;
        //   }
        //   .type {
        //     width: 56px;
        //     height: 26px;
        //     background: url('../../../assets/img3/b-btn-n.png') no-repeat center;
        //     background-size: 100% 100%;
        //     display: flex;
        //     justify-content: center;
        //     align-items: center;
        //     font-family: MicrosoftYaHei;
        //     font-size: 16px;
        //     font-weight: normal;
        //     font-stretch: normal;
        //     line-height: 24px;
        //     letter-spacing: 2px;
        //     color: #ffffff;
        //     margin-top: 5px;
        //   }
        //   .active-type {
        //     background: url('../../../assets/img3/b-btn2.png') no-repeat center;
        //     background-size: 100% 100%;
        //   }
        // }
      }
      .active-item {
        background: url('../../../assets/img3/list-selected.png') no-repeat left;
        background-size: 100% 124%;
        border-image: none;
      }
      .item:hover {
        background: url('../../../assets/img3/list-selected.png') no-repeat left;
        background-size: 100% 124%;
        border-image: none;
      }
      .item:nth-last-child(1) {
        border-bottom: 2px solid rgba(0, 0, 0, 0);
      }
    }
    .pagination {
      text-align: right;
    }
  }
}
</style>
