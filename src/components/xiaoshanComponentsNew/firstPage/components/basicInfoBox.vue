<template>
  <div class="mask" v-if="isShow" :style="{ opacity: maskOpacity }">
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <!-- <span class="text">全生命周期管理</span> -->
            <span class="text">萧 保 馆</span>
          </div>
        </div>
        <div class="gk">
          <div class="left">
            <span>
              {{ basicData.publishName }}
            </span>
          </div>
          <div class="center">
            <span>
              <!-- 一点一策 -->
              文物身份证
            </span>
          </div>
          <div class="right">
            <span>
              <!-- 一事一档 -->
              动态健康卡
            </span>
          </div>
        </div>
        <div class="close" @click="close"></div>
      </div>
      <div class="body">
        <div class="part1">
          <DialogTitleBox :title="'文物基本情况'" />
          <div class="imgBox">
            <div class="fakeImg" :style="{ backgroundImage: `url(${wwImg})` }" @click="showPhoto('基本图片')"></div>
            <!-- <img :src="wwImg"  @click="showPhoto('基本图片')" /> -->
          </div>
          <div class="row">
            <div class="half">
              <span>文物名称：</span>
              <span>{{ basicData.publishName }}</span>
            </div>
          </div>
          <div class="row">
            <div class="half">
              <span>文物分类：</span>
              <span>{{ basicData.category }}</span>
            </div>
          </div>
          <div class="row">
            <div class="half">
              <span>文物级别：</span>
              <span>{{ basicData.rank | rank }}</span>
            </div>
          </div>
          <div class="row">
            <div class="half">
              <span>文物分布情况：</span>
              <span>{{ basicData.specificDistribution }}</span>
            </div>
          </div>
          <div class="row row3">
            <div class="half">
              <span>文物地址：</span>
              <span>{{ basicData.address }}</span>
            </div>
          </div>
          <div class="row row4">
            <div class="title">保护范围面积：</div>
            <div class="content">{{ basicData.protectionArea }}</div>
          </div>
          <div class="picsArrayCon">
            <div class="picArray1" @click="show(0, group1Array)">电气线路分布图</div>
            <div class="picArray2" @click="show(0, group2Array)">消防灭火器及消防栓分布图</div>
            <div class="picArray3" @click="show(0, group3Array)">监控分布图</div>
            <div class="picArray4" @click="show(0, group4Array)">文保单位图</div>
          </div>
          <!-- <div class="btn-img">
            <div class="item" @click="showPhoto('平面图')"></div>
            <div class="item" @click="showPhoto('规划图')"></div>
            <div class="item" @click="showPhoto('现状图')"></div>
            <PreviewPhoto :imgArr="photoImgs" :isShow="photoShow" :title="photoTitle" />
          </div> -->
          <div class="table-title">
            <div class="text">风险防护等级</div>
          </div>
          <div class="risk-level">
            <div class="item" v-for="(item, index) in riskLevelData" :key="index" :style="{ background: `url(${item.bgImg}) no-repeat bottom`, 'background-size': '100%' }">
              <img :src="item.imgSrc" alt="" srcset="" />
              <div class="text text-1">{{ item.name }}</div>
              <div class="text">{{ item.riskLevel }}</div>
            </div>
          </div>
        </div>
        <div class="part2">
          <DialogTitleBox :title="'文物责任信息'" />
          <div class="table-title">
            <div class="text">主体责任部门</div>
          </div>
          <div class="body-depart">
            <div class="top">
              <img src="../../../../assets/img2/p-icon1.png" alt="" srcset="" @click="showBillboard" />
              <img src="../../../../assets/img2/p-icon-add.png" alt="" srcset="" @click="showSafetyBook" />
              <div class="info">
                <div class="row1">安全管理责任单位</div>
                <div class="row">{{ bodyDepartInfo.departName }}</div>
              </div>
            </div>
            <div class="bottom">
              <div class="row">
                <span>直接责任人：</span>
                <span>{{ bodyDepartInfo.zjzrr }}</span>
                <span>联系方式：</span>
                <span>{{ bodyDepartInfo.zjzrr_phone }}</span>
              </div>
              <div class="row">
                <span>安全管理人：</span>
                <span>{{ bodyDepartInfo.aqglr }}</span>
                <span>联系方式：</span>
                <span>{{ bodyDepartInfo.aqglr_phone }}</span>
              </div>
            </div>
            <!-- 公示牌弹框 -->
            <div class="billboard" v-show="billboardShow">
              <img :src="billboardSrc" alt="" srcset="" />
              <span>公示牌</span>
            </div>
            <!-- 安全责任书图片预览 -->
            <PreviewImgs :imgArr="safetyBookImgs" :isShow="safetyBookShow" />
          </div>
          <div class="table-title">
            <div class="text">监管责任部门</div>
          </div>
          <div class="table">
            <Table :tableColumns="tableColumns_peopleList" :tableData="tableData_peopleList" />
          </div>
          <div class="table-title">
            <!-- <div class="text">直接责任人</div> -->
            <div class="text">护保员信息</div>
          </div>
          <div class="people-prevent">
            <div class="item" v-for="(item, index) in peoplePreventData" :key="index">
              <img :src="item.imgSrc" alt="" srcset="" />
              <div class="info">
                <div class="roww roww1">
                  <span>{{ item.job }}</span>
                  <span>{{ item.name }}</span>
                </div>
                <div class="roww roww2">
                  <div>联系电话</div>
                  <div>{{ item.phone }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="part3">
          <DialogTitleBox :title="'设备设施信息'" />
          <div class="table-title">
            <div class="text">智能感知</div>
          </div>
          <div class="znyj">
            <div class="item" v-for="(item, index) in znyj_data" :key="index" @click="yjClick(item)">
              <!-- <div class="img-box">
                                <img
                                    :src="item.imgSrc"
                                    alt=""
                                    srcset=""
                                    width="62%"
                                >
                            </div> -->
              <img class="img-box" :src="item.imgSrc" alt="" srcset="" width="62%" />
              <div class="info">
                <span>{{ item.name }}</span>
                <span>{{ item.num }}</span>
              </div>
            </div>
          </div>
          <div class="table-title">
            <div class="text">消防设施</div>
          </div>
          <div class="znyj xfss">
            <div class="item" v-for="(item, index) in xfss_data" :key="index">
              <!-- <div class="img-box">
                                <img
                                    :src="item.imgSrc"
                                    alt=""
                                    srcset=""
                                    width="62%"
                                >
                            </div> -->
              <img class="img-box" :src="item.imgSrc" alt="" srcset="" width="62%" />

              <div class="info">
                <span>{{ item.name }}</span>
                <span>{{ item.num }}</span>
              </div>
            </div>
          </div>
          <div class="table-title">
            <div class="text">火灾危险源</div>
          </div>
          <!-- <div class="znyj hzwxy">
            <div
              class="item"
              v-for="(item, index) in hzwxy_data"
              :key="index"
              @click="hzwxyClick(item)"
            >
              <img
                class="img-box"
                :src="item.imgSrc"
                alt=""
                srcset=""
                width="62%"
              >
              <div class="info">
                <span>{{ item.name }}</span>
                <span>{{ item.num }}</span>
              </div>
            </div>
          </div> -->
          <!-- <div class="znyj hzwxy2">
            <div class="item" v-for="(item, index) in hzwxy_data2" :key="index" @click="hzwxyClick(item)">
              <img class="img-box" :src="item.imgSrc" alt="" srcset="" width="62%" />
              <div class="info">
                <span class="name">{{ item.name }}</span>
                <div class="location">
                  <span>{{ item.location }}</span>
                  <span>{{ item.specialLocation }}</span>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div class="part4">
          <div class="load-process">
            <img :src="getArrowImg" :style="{ left: `${arrowLeft / 192}rem` }" alt="" srcset="" />
            <div class="load-bg"></div>
          </div>
          <div class="tj">
            <div class="item" v-for="(item, index) in part4Data" :key="index">
              <span :style="{ color: item.color }" class="num">{{ item.num }}</span>
              <div class="img-box">
                <img :src="item.imgSrc" alt="" srcset="" />
              </div>
              <span class="name">{{ item.name }}</span>
            </div>
          </div>
          <div class="table-title">
            <div class="text">文物处置记录</div>
          </div>
          <div class="table">
            <CusTable :tableColumns="tableColumns_handleList" :tableData="tableData_handleList" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" @table_row_click="tableRowClick" />
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="pageNumChange"
              :current-page="current1Page"
              :page-size="pageSize"
              :pager-count="5"
              layout="total,prev, pager, next"
              :total="tableData1Total"
            ></el-pagination>
          </div>
          <div class="table-title">
            <div class="text">文物巡查记录</div>
          </div>
          <div class="table-gj">
            <CusTable :tableColumns="tableColumns_gj" :tableData="tableData_gj" @table_row_click="tableRow2Click" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="false" />
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="page2NumChange"
              :current-page="current2Page"
              :page-size="pageSize"
              :pager-count="5"
              layout="total,prev, pager, next"
              :total="tableData2Total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <HzwxyTable :isShow="hzwxyListShow" :title="hzwxyListTitle" :tableData="tableData_hzwxy" @close="hzwxyListClose" />
    <YsydDetail :isShow="isShow_ysyd_detail" :row="ysyd_row" @close="ysyd_detail_close" />
    <viewer :images="imgArr_1" :options="options" @inited="inited" class="viewer" ref="viewer" v-show="false">
      <img v-for="(src, index) in imgArr_1" :src="src" :key="index" />
    </viewer>
    <FXLYDetail class="resetZindex" :isShow="isShowDetailBox" :row="detailInfo" @close="closeDetailBox" />
    <EventHandleDetail class="resetZindex" :isShow="isShowDetailBox_2" :row="detailInfo" @close="closeDetailBox_2" />
  </div>
</template>
<script>
import {  imageSecPrefix } from '@/utils/const';
import Table from '../../publicComponents/table';
import DialogTitleBox from '../../../newComponents/dialogTitleBox';
import FXLYDetail from '../../../xiaoshanScreenTenMouth/yxzs/secondPage/fxlyDetail';
import EventHandleDetail from '../../../xiaoshanScreenTenMouth/yxzsDetails/components/eventHandleDetail.vue';
import TableC from '../../publicComponents/table2';
import PreviewImgs from './previewImgs';
import PreviewPhoto from './previewPhoto';
import HzwxyTable from './hzwxyTable';
import CusTable from './table';
import YsydDetail from './ysyd_detail';
import { eventBus } from '../../../../main';
import { wbdDetail, hzwxy } from '../../../../api/xsApi';
import { equipFacilityInfoResourcesSelectInfoTotal, queryListByPointId, screenBaseCheckFireProtection } from '@/api/xsApi3';
let demoTrack = [
  {
    streetName: '进化镇',
    bump_name: '务本堂',
    start_time: '2022-09-20 09:50:46',
    end_time: '2022-09-20 10:10:23',
    name: '田欢乐',
    trail: [
      '120.316009,29.956913',
      '120.316144,29.957284',
      '120.316153,29.957315',
      '120.316305,29.957542',
      '120.316103,29.95755',
      '120.315982,29.957581',
      '120.315883,29.957609',
      '120.315923,29.957644',
      '120.315838,29.957593',
      '120.315852,29.957632',
    ],
  },
  {
    streetName: '进化镇',
    bump_name: '务本堂',
    start_time: '2022-09-21 11:20:19',
    end_time: '2022-09-21 11:33:12',
    name: '田欢乐',
    trail: [
      '120.316674,29.956991',
      '120.316498,29.956995',
      '120.316269,29.956959',
      '120.316009,29.956909',
      '120.316072,29.957077',
      '120.316112,29.957229',
      '120.316166,29.957358',
      '120.316265,29.957507',
      '120.316135,29.957546',
      '120.315959,29.957519',
      '120.31587,29.95757',
      '120.315923,29.957648',
    ],
  },
  {
    streetName: '进化镇',
    bump_name: '务本堂',
    start_time: '2022-09-16 14:50:20',
    end_time: '2022-09-16 15:01:51',
    name: '田欢乐',
    trail: ['120.316427,29.957648', '120.316314,29.957538', '120.316238,29.95746', '120.316094,29.957511', '120.315955,29.957527', '120.315847,29.957566', '120.315883,29.957581'],
  },
  {
    streetName: '进化镇',
    bump_name: '务本堂',
    start_time: '2022-09-07 15:40:20',
    end_time: '2022-09-07 15:51:27',
    name: '田欢乐',
    trail: [
      '120.315519,29.956212',
      '120.315542,29.95642',
      '120.315591,29.956643',
      '120.315627,29.956791',
      '120.315825,29.956854',
      '120.31604,29.956905',
      '120.316108,29.957179',
      '120.316256,29.957476',
      '120.316359,29.957601',
      '120.316171,29.957609',
      '120.315941,29.95766',
      '120.315703,29.95766',
      '120.315874,29.95775',
      '120.315946,29.957726',
    ],
  },
  {
    streetName: '进化镇',
    bump_name: '务本堂',
    start_time: '2022-09-01 10:50:41',
    end_time: '2022-09-01 11:03:01',
    name: '田欢乐',
    trail: [
      '120.315969,29.957556',
      '120.315879,29.957575',
      '120.315722,29.957626',
      '120.315713,29.957689',
      '120.315766,29.95779',
      '120.315942,29.957775',
      '120.316045,29.957767',
      '120.316013,29.957657',
      '120.315874,29.957642',
    ],
  },
];
export default {
  components: {
    Table,
    DialogTitleBox,
    TableC,
    HzwxyTable,
    PreviewImgs,
    YsydDetail,
    PreviewPhoto,
    CusTable,
    FXLYDetail,
    EventHandleDetail,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    basicData: {
      type: Object,
      default: () => {},
    },
    poiImgArr: {
      type: Array,
      default: () => [],
    },
    realImage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      detailInfo: {},
      isShowDetailBox_2: false,
      isShowDetailBox: false,
      current1Page: 1,
      current2Page: 1,
      pageSize: 3,
      group1Array: [],
      group2Array: [],
      group3Array: [],
      group4Array: [],
      imgArr_1: [],
      options: {
        initialViewIndex: 0,
      },
      maskOpacity: 1,
      holderImg: require('../../../../assets/wwImg/holder.png'),
      //   wwImg: require('../../../../assets/img2/mwlyz.png'),
      wwImg: require('../../../../assets/wwImg/务本堂.png'),
      WBTIMAGE: require('../../../../assets/wwImg/务本堂.png'),
      wwImgArr: [],
      tableColumns_peopleList: [
        {
          name: '单位名称',
          props: 'department',
          requireEllipsis: 100,
        },
        {
          name: '姓名',
          props: 'name',
          requireEllipsis: 100,
        },
        {
          name: '电话',
          props: 'phone',
          requireEllipsis: 100,
        },
      ],
      tableData1Total: 0,
      tableData2Total: 0,
      tableData_peopleList: [],
      riskLevelData: [
        {
          imgSrc: require('../../../../assets/img2/risk1.png'),
          name: '火灾隐患',
          riskLevel: '一级',
          num: '',
          bgImg: require('../../../../assets/img2/r-bg.png'),
        },
        {
          imgSrc: require('../../../../assets/img2/risk2.png'),
          name: '自然灾害',
          riskLevel: '二级',
          num: '',
          bgImg: require('../../../../assets/img2/g-bg.png'),
        },
        {
          imgSrc: require('../../../../assets/img2/risk3.png'),
          name: '法人违法',
          riskLevel: '一级',
          num: '',
          bgImg: require('../../../../assets/img2/b-bg.png'),
        },
        {
          imgSrc: require('../../../../assets/img2/risk4.png'),
          name: '盗挖盗掘',
          riskLevel: '一级',
          num: '',
          bgImg: require('../../../../assets/img2/y-bg.png'),
        },
      ],
      bodyDepartInfo: {
        departName: '进化镇人民政府',
        zjzrr: '洪波',
        zjzrr_phone: '82454003',
        aqglr: '汤校',
        aqglr_phone: '15990133833',
      },
      peoplePreventData: [
        {
          imgSrc: require('../../../../assets/img2/p-icon3.png'),
          job: '文物巡查员',
          name: '李小双',
          phone: '12345678123',
        },
        {
          imgSrc: require('../../../../assets/img2/p-icon4.png'),
          job: '护宝志愿者',
          name: '李小双',
          phone: '12345678123',
        },
        {
          imgSrc: require('../../../../assets/img2/p-icon5.png'),
          job: '结对党员',
          name: '李小双',
          phone: '12345678123',
        },
      ],
      znyj_data: [
        {
          name: '视频监控',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-l-icon1@2x.png'),
        },
        {
          name: '烟感监测',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-l-icon2@2x.png'),
        },
        {
          name: '水压监测',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-l-icon3@2x.png'),
        },
        // {
        //   name: '气象监测',
        //   num: '0',
        //   imgSrc: require('../../../../assets/img2/p-l-icon4@2x.png'),
        // },
        {
          name: '电流监测',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-l-icon5@2x.png'),
        },
        {
          name: '温感监测',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-l-icon6@2x.png'),
        },
      ],
      xfss_data: [
        {
          name: '灭火器',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-r-icon7.png'),
        },
        {
          name: '消防栓',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-r-icon8.png'),
        },
        {
          name: '消防水缸',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-r-icon10.png'),
        },
        {
          name: '其他',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-r-icon9.png'),
        },
      ],
      hzwxy_data: [
        {
          name: '大功率电器',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-r-icon11.png'),
        },
        {
          name: '煤气罐',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-r-icon12.png'),
        },
        {
          name: '配电箱',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-r-icon13.png'),
        },
        {
          name: '防雷装置',
          num: '0',
          imgSrc: require('../../../../assets/img2/p-r-icon14.png'),
        },
      ],
      hzwxy_data2: [
        {
          name: '热得快',
          location: '务本堂101室',
          specialLocation: '厨房内',
          imgSrc: require('../../../../assets/img2/p-r-icon11.png'),
        },
        {
          name: '煤气罐',
          location: '务本堂103室',
          specialLocation: '厨灶间内',
          imgSrc: require('../../../../assets/img2/p-r-icon12.png'),
        },
        {
          name: '煤炉',
          location: '务本堂102室外',
          specialLocation: '走廊边',
          imgSrc: require('../../../../assets/img2/p-r-icon13.png'),
        },
        {
          name: '配电箱',
          location: '务本堂101室',
          specialLocation: '大堂外墙',
          imgSrc: require('../../../../assets/img2/p-r-icon13.png'),
        },
        {
          name: '防雷装置',
          location: '务本堂101室',
          specialLocation: '屋顶',
          imgSrc: require('../../../../assets/img2/p-r-icon14.png'),
        },
      ],
      part4Data: [
        {
          name: '当月巡查',
          num: '3',
          imgSrc: require('../../../../assets/img2/p-r-icon1.png'),
          color: '#06e27d',
        },
        {
          name: '专项治理',
          num: '2',
          imgSrc: require('../../../../assets/img2/p-r-icon2.png'),
          color: '#d5da0e',
        },
        {
          name: '未完成事项',
          num: '1',
          imgSrc: require('../../../../assets/img2/p-r-icon3.png'),
          color: '#e3570b',
        },
      ],
      tableColumns_handleList: [
        {
          name: '时间',
          props: 'checkCreateTime',
        },
        {
          name: '文保员',
          props: 'nickName',
          format: (row) => {
            if (row.nickName) {
              return row.nickName;
            } else {
              return '-';
            }
          },
        },
        {
          name: '完成状态',
          props: 'isOvertime',
          format: (row) => {
            if (row.checkType == 8) {
              if (row.jdIsRunState == 1) {
                return '有问题';
              } else {
                return '非问题';
              }
            } else if (row.checkType == 3) {
              if (row.jdIsRunState == 1) {
                return '立即处置';
              } else if (row.jdIsRunState == 99) {
                return '无需处置';
              } else if (row.jdIsRunState == 2) {
                return '无需审核';
              } else if (row.jdIsRunState == 4) {
                return '无法处置';
              } else if (row.jdIsRunState == 0) {
                return '待审核';
              } else if (row.jdIsRunState == -1) {
                return '待审核';
              }
            } else {
              if (row.isRun != 1 && row.isRun != 99) {
                if (row.jdIsRunState == 1) {
                  return '完结';
                } else if (row.jdIsRunState == 99) {
                  return '一网统管';
                } else if (row.jdIsRunState == 2) {
                  return '无需审核';
                } else if (row.jdIsRunState == 4) {
                  return '无法处置';
                } else if (row.jdIsRunState == 0) {
                  return '待审核';
                } else if (row.jdIsRunState == -1) {
                  return '待审核';
                }
              }
            }
          },
        },
      ],
      tableData_handleList: [],
      hzwxyListShow: false,
      hzwxyListTitle: '',
      // 公示牌
      billboardSrc: require('../../../../assets/img2/tsq-gsp.png'),
      billboardShow: false,
      // 文物安全责任书
      safetyBookImgs: [require('../../../../assets/safetyBookImgs/demo_1.png'), require('../../../../assets/safetyBookImgs/demo_2.png'), require('../../../../assets/safetyBookImgs/demo_3.png')],
      safetyBookShow: false,
      // 火灾危险源列表
      tableData_hzwxy: [
        {
          ww: '务本堂',
          productName: '电磁炉',
          num: '1',
          power: '2000W',
          location: '卧室',
          belongMan: '周星',
          buyTime: '2022-05-25 10：00',
        },
      ],
      // 一事一档列表详情
      isShow_ysyd_detail: false,
      ysyd_row: {},
      // 三张图的配置
      photoImgs: [require('../../../../assets/safetyBookImgs/demo_1.png'), require('../../../../assets/safetyBookImgs/demo_2.png'), require('../../../../assets/safetyBookImgs/demo_3.png')],
      photoTitle: '平面图',
      photoShow: false,
      arrowLeft: 280, // 10~126~242~360
      // 轨迹列表
      tableColumns_gj: [
        {
          name: '时间',
          props: 'checkCreateTime',
        },
        {
          name: '文保员',
          props: 'nickName',
          format: (row) => {
            if (row.nickName) {
              return row.nickName;
            } else {
              return '-';
            }
          },
        },
        {
          name: '完成状态',
          props: 'isOvertime',
          format: (row) => {
            if (row.checkType == 8) {
              if (row.jdIsRunState == 1) {
                return '有问题';
              } else {
                return '非问题';
              }
            } else if (row.checkType == 3) {
              if (row.jdIsRunState == 1) {
                return '立即处置';
              } else if (row.jdIsRunState == 99) {
                return '无需处置';
              } else if (row.jdIsRunState == 2) {
                return '无需审核';
              } else if (row.jdIsRunState == 4) {
                return '无法处置';
              } else if (row.jdIsRunState == 0) {
                return '待审核';
              } else if (row.jdIsRunState == -1) {
                return '待审核';
              }
            } else {
              if (row.isRun != 1 && row.isRun != 99) {
                if (row.jdIsRunState == 1) {
                  return '完结';
                } else if (row.jdIsRunState == 99) {
                  return '一网统管';
                } else if (row.jdIsRunState == 2) {
                  return '无需审核';
                } else if (row.jdIsRunState == 4) {
                  return '无法处置';
                } else if (row.jdIsRunState == 0) {
                  return '待审核';
                } else if (row.jdIsRunState == -1) {
                  return '待审核';
                }
              }
            }
          },
        },
      ],
      tableData_gj: [],
    };
  },
  computed: {
    getArrowImg() {
      if (this.arrowLeft < 126 && this.arrowLeft >= 10) {
        return require('../../../../assets/img3/txt1.png');
      } else if (this.arrowLeft < 242 && this.arrowLeft >= 126) {
        return require('../../../../assets/img3/txt2.png');
      } else if (this.arrowLeft <= 360 && this.arrowLeft >= 242) {
        return require('../../../../assets/img3/txt3.png');
      }
    },
  },
  filters: {
    rank(val) {
      switch (val) {
        case '14da5819da904c4ab1d9d94a961ca27a':
          return '国保单位';
        case 'cef2a80fbea6df89578ad5599b67b71f':
          return '省保单位';
        case '2bf3be523de944ec3ee1ad832a7a2587':
          return '市保单位';
        case 'b16db07f34112b9b0fc6d2b54214e0aa':
          return '市级文保点';
        case 'ac38ee765b5e5155b8bb3eadc1b5aa8d':
          return '一般文物';
        default:
          break;
      }
    },
  },
  watch: {
    isShow(val) {
      if (!val) return;
      this.get_hzwxy_data();
      this.setMainImage();
      this.fetchSomeDetail();
      //   if (this.poiImgArr.length > 0) {
      //     this.wwImg = this.poiImgArr[0];
      //   } else {
      //     try {
      //       this.wwImg = require(`../../../../assets/wwImg/${this.basicData.publishName}.png`);
      //     } catch (error) {
      //       this.wwImg = require(`../../../../assets/wwImg/务本堂.png`);
      //     }
      //   }
      try {
        this.billboardSrc = require(`../../../../assets/gspImg/${this.basicData.publishName}.jpg`);
      } catch (error) {
        this.billboardSrc = require(`../../../../assets/gspImg/汤寿潜.png`);
      }
      if (val) {
        this.setInfo();
      }
      // 轨迹假数据
      //   if (this.basicData.publishName == '务本堂') {
      //     this.tableData_gj = demoTrack;
      //   } else {
      //     this.tableData_gj = [];
      //   }
    },
  },
  mounted() {
    // 挂载到body下
    this.$nextTick(() => {
      const body = document.querySelector('body');
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
    document.addEventListener('mousedown', (e) => {
      let t = document.getElementsByClassName('photoBox')[0]; // 最外层元素
      if (t && e.path) {
        if (!e.path.includes(t)) {
          if (this.photoShow) {
            this.photoShow = false;
          }
        }
      }
    });
  },
  methods: {
    closeDetailBox() {
      this.isShowDetailBox = false;
      this.maskOpacity = 1;
    },
    closeDetailBox_2() {
      this.isShowDetailBox_2 = false;
      this.maskOpacity = 1;
    },
    show(index, item) {
      this.options.initialViewIndex = index;
      if (item && item.length) {
        this.imgArr_1 = item;
        setTimeout(() => {
          this.$viewer.show();
        }, 400);
      } else {
        this.imgArr_1 = [];
        this.$message.warning('暂无图片');
      }
    },
    inited(viewer) {
      this.$viewer = viewer;
    },
    fetchSomeDetail() {
      equipFacilityInfoResourcesSelectInfoTotal({ bumpPointId: this.basicData.id })
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter && shorter.length) {
              this.znyj_data[0].num = shorter[0].videoTotal || 0;
              this.znyj_data[1].num = shorter[0].smokeTotal || 0;
              this.znyj_data[2].num = shorter[0].waterGageTotal || 0;
              //   this.znyj_data[4].num = shorter[0].voltageTotal || 0;
              //   this.znyj_data[5].num = shorter[0].warmthSensationTotal || 0;
              this.znyj_data[3].num = shorter[0].voltageTotal || 0;
              this.znyj_data[4].num = shorter[0].warmthSensationTotal || 0;
              this.xfss_data[0].num = shorter[0].mhqRealTotal || 0;
              this.xfss_data[1].num = shorter[0].xfsRealTotal || 0;
              this.xfss_data[2].num = shorter[0].xfsgRealTotal || 0;
              this.xfss_data[3].num = shorter[0].qtRealTotal || 0;
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
      queryListByPointId({ id: this.basicData.id })
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter) {
              if (shorter.bumpPointFileList && shorter.bumpPointFileList.length) {
                let group2 = shorter.bumpPointFileList.filter((ele) => {
                  return ele.fileType == '1';
                });
                let group3 = shorter.bumpPointFileList.filter((ele) => {
                  return ele.fileType == '2';
                });
                let group4 = shorter.bumpPointFileList.filter((ele) => {
                  return ele.fileType == '3';
                });
                let group5 = shorter.bumpPointFileList.filter((ele) => {
                  return ele.fileType == '4';
                });
                if (group2 && group2.length) {
                  let temp1 = group2.map((ele) => {
                    return ele.storageList;
                  });
                  let afterTemp1 = temp1.flat();
                  let fullArray = afterTemp1.map((ele) => {
                    return imageSecPrefix + ele.realName;
                  });
                  this.group1Array = fullArray;
                }
                if (group3 && group3.length) {
                  let temp1 = group3.map((ele) => {
                    return ele.storageList;
                  });
                  let afterTemp1 = temp1.flat();
                  let fullArray = afterTemp1.map((ele) => {
                    return imageSecPrefix + ele.realName;
                  });
                  this.group2Array = fullArray;
                }
                if (group4 && group4.length) {
                  let temp1 = group4.map((ele) => {
                    return ele.storageList;
                  });
                  let afterTemp1 = temp1.flat();
                  let fullArray = afterTemp1.map((ele) => {
                    return imageSecPrefix + ele.realName;
                  });
                  this.group3Array = fullArray;
                }
                if (group5 && group5.length) {
                  let temp1 = group5.map((ele) => {
                    return ele.storageList;
                  });
                  let afterTemp1 = temp1.flat();
                  let fullArray = afterTemp1.map((ele) => {
                    return imageSecPrefix + ele.realName;
                  });
                  this.group4Array = fullArray;
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
      this.fetch3List();
      this.fetch50List();
    },
    fetch3List() {
      screenBaseCheckFireProtection({
        checkType: 3,
        orderByFlag: 1,
        currentPage: this.current1Page,
        pageSize: this.pageSize,
        pointId: this.basicData.id,
      }).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          if (shorter) {
            this.tableData1Total = shorter.total;
            this.tableData_handleList = shorter.list;
          }
        }
      });
    },
    fetch50List() {
      screenBaseCheckFireProtection({
        checkType: 50,
        orderByFlag: 1,
        currentPage: this.current2Page,
        pageSize: this.pageSize,
        pointId: this.basicData.id,
      }).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          if (shorter) {
            this.tableData2Total = shorter.total;
            this.tableData_gj = shorter.list;
          }
        }
      });
    },
    pageNumChange(val) {
      this.current1Page = val;
      this.fetch3List();
    },
    page2NumChange(val) {
      this.current2Page = val;
      this.fetch50List();
    },
    yjClick() {
      //
    },
    setInfo() {
      // 责任单位联系人
      let obj = {
        department: this.basicData.directlyLiableUnit,
        name: this.basicData.directlyLiableUser,
        phone: this.basicData.directlyLiableUserPhone,
      };
      this.tableData_peopleList.push(obj);
      // 人防力量
      this.peoplePreventData[0].name = this.basicData.safetyManager && this.basicData.safetyManager == '郭如你' ? '郭霄汉' : this.basicData.safetyManager;
      this.peoplePreventData[0].phone = this.basicData.safetyManagerPhone;
      this.peoplePreventData[1].name = this.basicData.civilSecurityInspector;
      this.peoplePreventData[1].phone = this.basicData.civilSecurityInspectorPhone;

      // 风险等级
      this.riskLevelData[0].riskLevel = this.basicData.fireMaxLevel;
      this.riskLevelData[1].riskLevel = this.basicData.actMaxLevel;
      this.riskLevelData[2].riskLevel = this.basicData.legalMaxLevel;
      this.riskLevelData[3].riskLevel = this.basicData.poachingMaxLevel;
      this.getInfoById(this.basicData.id);
      if (this.basicData.publishName == '茅湾里窑址') {
        // this.wwImg = require('../../../../assets/img2/mwlyz.png')
        // 主体责任
        this.bodyDepartInfo.departName = '进化镇人民政府';
        this.bodyDepartInfo.zjzrr = '洪波';
        this.bodyDepartInfo.zjzrr_phone = '82454003';
        this.bodyDepartInfo.aqglr = '周凯';
        this.bodyDepartInfo.aqglr_phone = '15955124736';
        // 监管责任
        let obj1 = {
          department: '区文物局',
          name: '王凯军',
          phone: '83869066',
        };
        let obj2 = {
          department: '区住建局',
          name: '李磊',
          phone: '82629033',
        };
        this.tableData_peopleList.push(obj1, obj2);
        // 直接责任人
        this.peoplePreventData[2].name = '李杰';
        this.peoplePreventData[2].phone = '15324695137';

        // 火灾危险源
        this.hzwxy_data[0].num = '0';
        this.hzwxy_data[1].num = '0';
        this.hzwxy_data[2].num = '0';
        this.hzwxy_data[3].num = '0';
        // 一事一档
        // this.part4Data[0].num = '5'
        // this.part4Data[1].num = '4'
        // this.part4Data[2].num = '1'
      } else if (this.basicData.publishName == '务本堂') {
        // this.wwImg = require('../../../../assets/img2/wbt.png')
        // 主体责任
        this.bodyDepartInfo.departName = '进化镇人民政府';
        this.bodyDepartInfo.zjzrr = '洪波';
        this.bodyDepartInfo.zjzrr_phone = '82454003';
        this.bodyDepartInfo.aqglr = '梅李栋';
        this.bodyDepartInfo.aqglr_phone = '13738022466';
        // 监管责任
        let obj1 = {
          department: '区文物局',
          name: '王凯军',
          phone: '83869066',
        };
        let obj2 = {
          department: '区消防救援大队',
          name: '郭子良',
          phone: '82701921',
        };
        let obj3 = {
          department: '区住建局',
          name: '李磊',
          phone: '82629033',
        };
        this.tableData_peopleList.push(obj1, obj2, obj3);
        // 直接责任人
        this.peoplePreventData[2].name = '杨悦';
        this.peoplePreventData[2].phone = '15324695137';
        // 火灾危险源
        this.hzwxy_data[0].num = '5';
        this.hzwxy_data[1].num = '3';
        this.hzwxy_data[2].num = '3';
        this.hzwxy_data[3].num = '2';
        // 一事一档
        // this.part4Data[0].num = '3'
        // this.part4Data[1].num = '6'
        // this.part4Data[2].num = '2'
      }
    },
    setMainImage() {
      if (this.basicData.publishName == '务本堂') {
        this.wwImg = this.WBTIMAGE;
      } else {
        if (this.realImage) {
          this.wwImg = imageSecPrefix + this.realImage;
        } else {
          this.wwImg = this.holderImg;
        }
      }
    },
    // 获取火灾危险源
    get_hzwxy_data() {
      let params = {
        bumpPointId: this.basicData.publishName.id,
        currentPage: 1,
        dangerType: '',
        pageSize: 10,
      };
      hzwxy(params).then((res) => {
        // console.log('火灾危险源', res);
      });
    },
    // 显示公示牌
    showBillboard() {
      this.safetyBookShow = false;
      this.billboardShow = !this.billboardShow;
    },
    // 显示文物安全责任书
    showSafetyBook() {
      this.billboardShow = false;
      this.safetyBookShow = !this.safetyBookShow;
    },
    // 显示平面图、规划图、现状图
    showPhoto(type) {
      this.photoImgs = [];
      this.photoShow = true;
      switch (type) {
        case '基本图片':
          //   console.log('获取图片', this.basicData);
          this.photoTitle = '基本图片';
          try {
            // this.photoImgs= this.poiImgArr
            if (this.wwImgArr.length > 0) {
              this.photoImgs = this.wwImgArr;
            } else {
              this.photoImgs = [this.wwImg];
            }
            // console.log(this.photoImgs);
          } catch (error) {
            this.photoShow = false;
            this.$message.warning('该文保单位暂无平面图');
          }
          break;
        case '平面图':
          this.photoTitle = '平面图';
          try {
            let img = require(`../../../../assets/poiPhoto/平面图-${this.basicData.publishName}-1.png`);
            this.photoImgs.push(img);
            try {
              let img2 = require(`../../../../assets/poiPhoto/平面图-${this.basicData.publishName}-2.png`);
              this.photoImgs.push(img2);
            } catch (error) {
              this.$message.warning('该文保单位仅一张平面图');
            }
          } catch (error) {
            this.photoShow = false;
            this.$message.warning('该文保单位暂无平面图');
          }
          break;
        case '规划图':
          this.photoTitle = '规划图';
          try {
            let img = require(`../../../../assets/poiPhoto/规划图-${this.basicData.publishName}.jpg`);
            this.photoImgs.push(img);
          } catch (error) {
            this.photoShow = false;
            this.$message.warning('该文保单位暂无规划图');
          }
          break;
        case '现状图':
          this.photoTitle = '现状图';
          try {
            let img = require(`../../../../assets/poiPhoto/现状图-${this.basicData.publishName}.jpg`);
            this.photoImgs.push(img);
          } catch (error) {
            this.photoShow = false;
            this.$message.warning('该文保单位暂无现状图');
          }
          break;
        default:
          break;
      }
    },
    // 文保点Id查询信息
    getInfoById(id) {
      wbdDetail(id).then((res) => {
        // console.log('文保点详情2', res.data.data);
        let result = res.data.data;
        // // 智能感知
        // result.zngz.map((item, index) => {
        //   this.znyj_data[index].num = item.value
        // })
        // // 消防设施
        // result.xfss.map((item, index) => {
        //   this.xfss_data[index].num = item.value
        // })
        // // 火灾危险源
        // result.hzwxy.map((item, index) => {
        //   this.hzwxy_data[index].num = item.value
        // })
        // 一事一档
        this.part4Data[0].num = result.ysyd.dyxc;
        this.part4Data[1].num = result.ysyd.zxzl;
        this.part4Data[2].num = result.ysyd.wwcsx;
        // this.tableData_handleList = result.czjl.map((item) => {
        //   if (['已完结'].indexOf(item.status) >= 0) {
        //     item.color = '#77f5b7';
        //   } else if (['处理中', '处置中'].indexOf(item.status) >= 0) {
        //     item.color = '#e9c351';
        //   } else if (['未完成', '未安装'].indexOf(item.status) >= 0) {
        //     item.color = '#ff4f57';
        //   }
        //   return item;
        // });
        this.wwImgArr = result.path;
      });
    },
    // 火灾危险源
    hzwxyClick(item) {
      // this.tableData_hzwxy.map((item) => {
      //   item.ww = this.basicData.publishName
      // })
      // this.hzwxyListShow = true
      // this.hzwxyListTitle = item.name
    },
    hzwxyListClose() {
      this.hzwxyListShow = false;
    },
    tableRowClick(row) {
      this.isShowDetailBox = true;
      this.maskOpacity = 0;
      this.detailInfo = row;
      //   this.ysyd_row = row;
      //   this.ysyd_row.instanceId = row.id;
      //   this.isShow_ysyd_detail = true;
    },
    ysyd_detail_close() {
      this.maskOpacity = 1;
      this.isShow_ysyd_detail = false;
    },
    tableRow2Click(row) {
      this.isShowDetailBox_2 = true;
      this.maskOpacity = 0;
      this.detailInfo = row;
      //   eventBus.$emit('drawTrack', row);
      //   eventBus.$emit('closeSelf'); // 关闭顶部的文物列表弹框
      //   this.$emit('close');
    },
    // 文物详情关闭
    close() {
      this.tableData_peopleList = [];
      // mapBox.flyTo({
      //   center: this.basicData.centerPoi.split(','),
      //   zoom: 14.5,
      // })
      this.billboardShow = false;
      this.photoShow = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../../../assets/img2/pop-bg.png') no-repeat center;
  background-size: 100%;
  z-index: 1000;
  user-select: none;
  .info-container {
    width: 1700px;
    height: 950px;
    // background: rgba(255, 0, 0, 0.288);
    // margin-top: 15px;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 0;
    .head {
      position: relative;
      width: 100%;
      height: 148;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        width: 1206px;
        height: 89px;
        background: url('../../../../assets/img2/pop-b-title.png') no-repeat center;
        background-size: 100%;
        background-position-y: -45px;
        display: flex;
        box-sizing: border-box;
        padding-right: 60px;
        padding-top: 10px;
        align-items: flex-start;
        justify-content: center;
        .top-box {
          width: 555px;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          .text {
            font-family: SourceHanSansCN-Bold;
            font-size: 34px;
            font-weight: 900;
            font-stretch: normal;
            letter-spacing: 10px;
            color: #f5fdff;
            text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
            background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .gk {
        width: 100%;
        height: 74px;
        display: flex;
        // margin: 5px 0;
        .left {
          flex: 5;
          height: 100%;
          background: url('../../../../assets/img2/l-title1.png') no-repeat center !important;
          background-size: 100% auto !important;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          font-family: SourceHanSansCN-Bold;
          font-size: 26px;
          font-weight: 900;
          font-stretch: normal;
          // line-height: 99px;
          letter-spacing: 0.5px;
          color: #fcc03d;

          span {
            display: inline-block;
            margin-left: 100px;
            max-width: 290px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        .center {
          flex: 11;
          height: 100%;
          background: url('../../../../assets/img2/l-title2.png') no-repeat center !important;
          background-size: 100% auto !important;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          font-family: SourceHanSansCN-Bold;
          font-size: 26px;
          font-weight: 900;
          font-stretch: normal;
          line-height: 99px;
          letter-spacing: 1px;
          color: #fcc03d;
          span {
            margin-left: 100px;
            background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        .right {
          flex: 5;
          height: 100%;
          background: url('../../../../assets/img2/l-title3.png') no-repeat center !important;
          background-size: 100% auto !important;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          font-family: SourceHanSansCN-Bold;
          font-size: 26px;
          font-weight: 900;
          font-stretch: normal;
          line-height: 99px;
          letter-spacing: 1px;
          color: #fcc03d;
          span {
            margin-left: 100px;
            background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .close {
        position: absolute;
        top: -20px;
        right: -20px;
        width: 56px;
        height: 56px;
        background: url('../../../../assets/img2/close_new.png');
        background-size: 100%;
        cursor: pointer;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 147px);
      box-sizing: border-box;
      display: flex;
      .part1 {
        height: 100%;
        flex: 5;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        .table-title {
          width: 100%;
          height: 36px;
          margin: 15px 0;
          .text {
            width: 262px;
            height: 100%;
            background: url('../../../../assets/img2/title-s.png') no-repeat center;
            background-size: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: MicrosoftYaHei;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 1px;
            color: #eceff4;
          }
        }
        .imgBox {
          width: 352px;
          min-height: 146px;
          background: url('../../../../assets/img2/img_frame.png') no-repeat center;
          background-size: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-position-x: -4px;
          margin: 10px 0;
          box-sizing: border-box;
          padding-right: 3px;
          img {
            width: 335px;
            height: 120px;
          }
          .fakeImg {
            width: 335px;
            height: 120px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
        .row {
          width: 100%;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: url('../../../../assets/img2/hr-line.png') no-repeat bottom;
          background-size: 100%;
          // margin: 3px;
          .half {
            flex: 1;
            text-align: left;
            span:nth-child(1) {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #95c2eb;
            }
            span:nth-child(2) {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              letter-spacing: 0px;
              color: #49c5ff;
            }
          }
        }
        .row4 {
          min-height: 60px;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          .title {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #95c2eb;
            // margin-bottom: 8px;
          }
          .content {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            letter-spacing: 0px;
            color: #49c5ff;
            margin-bottom: 10px;
            height: 80px;
            overflow: auto;
          }
        }
        .picsArrayCon {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          color: #fff;
          font-size: 14px;
          margin-top: 10px;
          margin-bottom: 10px;
          .picArray1 {
            border: 1px solid #77f5b7;
            background-color: rgba(119, 245, 183, 0.4);
            border-radius: 4px;
            padding: 6px;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;
          }
          .picArray2 {
            border: 1px solid #77f5b7;
            border-radius: 4px;
            padding: 6px;
            margin-bottom: 10px;
            background-color: rgba(119, 245, 183, 0.4);
            cursor: pointer;
          }
          .picArray3 {
            border: 1px solid #77f5b7;
            border-radius: 4px;
            padding: 6px;
            background-color: rgba(119, 245, 183, 0.4);
            margin-right: 10px;
            cursor: pointer;
          }
          .picArray4 {
            border: 1px solid #77f5b7;
            border-radius: 4px;
            padding: 6px;
            background-color: rgba(119, 245, 183, 0.4);
            cursor: pointer;
          }
        }
        .btn-img {
          width: 100%;
          height: 60px;
          display: flex;
          justify-content: space-around;
          position: relative;
          .item {
            width: 30%;
            height: 100%;
            &:nth-child(1) {
              background: url('../../../../assets/img3/l-btn1@2x.png') no-repeat center;
              background-size: 100% auto;
            }
            &:nth-child(2) {
              background: url('../../../../assets/img3/l-btn2@2x.png') no-repeat center;
              background-size: 100% auto;
            }
            &:nth-child(3) {
              background: url('../../../../assets/img3/l-btn3@2x.png') no-repeat center;
              background-size: 100% auto;
            }
          }
        }
        .risk-level {
          width: 98%;
          height: 112px;
          display: flex;
          margin-bottom: 40px;
          .item {
            flex: 1;
            height: 110%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-size: 100%;
            img {
              width: 46px;
              height: 72px;
            }
            .text {
              font-family: MicrosoftYaHei-Bold;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 22px;
              letter-spacing: 0px;
              color: #ffffff;
            }
            .text-1 {
              font-size: 16px;
              color: #bef5fd !important;
              margin-bottom: 5px;
            }
          }
        }
      }
      .part2 {
        height: 100%;
        flex: 6;
        background: url('../../../../assets/img2/hr-y.png') no-repeat left;
        background-size: auto 100%;
        box-sizing: border-box;
        padding-left: 10px;
        .table-title {
          width: 100%;
          height: 36px;
          margin: 15px 0;
          .text {
            width: 262px;
            height: 100%;
            background: url('../../../../assets/img2/title-s.png') no-repeat center;
            background-size: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: MicrosoftYaHei;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 1px;
            color: #eceff4;
          }
        }
        .body-depart {
          width: 100%;
          height: 150px;
          margin-bottom: 20px;
          position: relative;
          .top {
            width: 100%;
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 78px;
              height: 64px;
              margin-right: 20px;
              cursor: pointer;
              &:nth-child(1) {
                margin-right: 10px;
              }
            }
            .info {
              .row1 {
                width: 200px;
                height: 27px;
                background: url('../../../../assets/img2/txt-bg.png') no-repeat left;
                background-size: auto 100%;
                display: flex;
                box-sizing: border-box;
                padding-left: 10px;
                align-items: center;
                font-family: SourceHanSansCN-Regular;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: #d2eaff;
              }
              .row {
                box-sizing: border-box;
                padding-left: 10px;
                margin: 5px 0;
                font-family: MicrosoftYaHei;
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: #01cbed;
              }
            }
          }
          .bottom {
            width: 442px;
            height: 116px;
            background: url('../../../../assets/img2/info-box.png') no-repeat center;
            background-size: auto 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: relative;
            top: -25px;
            .row {
              width: 100%;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-left: 50px;
              span:nth-child(1) {
                font-family: SourceHanSansCN-Medium;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 53px;
                letter-spacing: 1px;
                color: #adf2fe;
              }
              span:nth-child(2) {
                font-family: SourceHanSansCN-Medium;
                font-size: 18px;
                font-weight: normal;
                letter-spacing: 1px;
                color: #49c5ff;
                margin-right: 15px;
              }
              span:nth-child(3) {
                font-family: SourceHanSansCN-Medium;
                font-size: 16px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #adf2fe;
              }
              span:nth-child(4) {
                font-family: SourceHanSansCN-Medium;
                font-size: 16px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #49c5ff;
              }
            }
          }
          .billboard {
            z-index: 2;
            position: absolute;
            top: 0px;
            left: 30%;
            width: 396px;
            height: 314px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            background: url('../../../../assets/img2/sign-board-box.png') no-repeat center;
            background-size: 100%;
            img {
              margin-top: 29px;
              width: 348px;
              height: 226px;
            }
            span {
              font-family: SourceHanSansCN-Regular;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 0px;
              color: #ffc72d;
              margin-top: 10px;
            }
          }
        }
        .table {
          width: 95%;
          height: 155px;
          // margin-bottom: 30px;
        }
        .people-prevent {
          display: flex;
          width: 100%;
          height: 100px;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 20px;
          .item {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 25px;
            img {
              width: 70px;
              height: 58px;
              margin-right: 8px;
            }
            .roww {
              span:nth-child(1) {
                font-family: SourceHanSansCN-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: #ffffff;
                margin-left: 5px;
              }
              span:nth-child(2) {
                font-family: SourceHanSansCN-Regular;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: #39e3fd;
                margin-left: 3px;
              }
            }
            .roww1 {
              background: url('../../../../assets/img2/txt-bg.png') no-repeat;
              background-size: 100%;
            }
            .roww2 {
              div:nth-child(1) {
                font-family: SourceHanSansCN-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: #ffffff;
                margin-left: 5px;
              }
              div:nth-child(2) {
                font-family: SourceHanSansCN-Regular;
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: #39e3fd;
                margin-left: 5px;
              }
            }
          }
        }
      }
      .part3 {
        height: 100%;
        flex: 3;
        background: url('../../../../assets/img2/hr-y.png') no-repeat left;
        background-size: auto 100%;
        box-sizing: border-box;
        padding-left: 10px;
        .table-title {
          width: 100%;
          height: 36px;
          margin: 15px 0;
          .text {
            width: 262px;
            height: 100%;
            background: url('../../../../assets/img2/title-s.png') no-repeat center;
            background-size: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: MicrosoftYaHei;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 1px;
            color: #eceff4;
          }
        }
        .znyj {
          width: 100%;
          height: 211px;
          padding-left: 20px;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          .item {
            width: 50%;
            height: 33%;
            // background: url("../../../assets/img2/icon11.png") center no-repeat;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            // cursor: pointer;
            .img-box {
              width: 67px;
              height: 69px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: url('../../../../assets/img2/icon-base.png') no-repeat center;
              background-size: 100%;
              img {
                // width: 30px;
                // height: 24px;
              }
            }

            .info {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: flex-start;
              margin-left: 10px;
              span:nth-child(1) {
                font-family: MicrosoftYaHei-Bold;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 1px;
                color: #bbdbff;
                opacity: 0.8;
                margin-top: 5px;
                margin-bottom: 10px;
              }
              span:nth-child(2) {
                font-family: MicrosoftYaHei-Bold;
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 1px;
                color: #c4dcff;
              }
            }
          }
        }
        .xfss {
          height: 140px;
          .item {
            height: 50%;
          }
        }
        .hzwxy {
          cursor: pointer;
          height: 140px;
          .item {
            height: 50%;
          }
        }
        .hzwxy2 {
          width: 95%;
          cursor: pointer;
          height: 140px;
          overflow: auto;
          .item {
            width: 100%;
            height: 40%;
            .img-box {
              width: 50px;
              height: 50px;
            }
            .info {
              justify-content: center;
              .name {
                margin-bottom: 0 !important;
              }
              .location {
                font-size: 16px;
                span:nth-child(2) {
                  color: rgb(0, 255, 85);
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
      .part4 {
        flex: 5;
        height: 100%;
        background: url('../../../../assets/img2/y-line.png') no-repeat left;
        background-size: auto 100%;
        box-sizing: border-box;
        padding-left: 10px;
        .table-title {
          width: 100%;
          height: 36px;
          margin: 15px 0;
          .text {
            width: 262px;
            height: 100%;
            background: url('../../../../assets/img2/title-s.png') no-repeat center;
            background-size: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: MicrosoftYaHei;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 1px;
            color: #eceff4;
          }
        }
        .load-process {
          width: 100%;
          height: 100px;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          position: relative;
          img {
            position: absolute;
            width: 20px;
            height: 34px;
            top: 10px;
            left: 10px;
          }
          .load-bg {
            width: 376px;
            height: 40px;
            background: url('../../../../assets/img3/load-bg.png') no-repeat center;
            background-size: 100% 100%;
            margin-bottom: 20px;
          }
        }
        .tj {
          width: 100%;
          height: 140px;
          display: flex;
          margin: 5px 0;
          .item {
            width: 33%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .num {
              font-family: DINAlternate-Bold;
              font-size: 30px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 18px;
              letter-spacing: 0px;
              color: #06e27d;
            }
            .img-box {
              width: 93px;
              height: 70px;
              // background: url('../../../../assets/img2/p-r-base.png') no-repeat
              //   bottom !important;
              // background-size: 100% !important;
              display: flex;
              justify-content: center;
              align-items: flex-start;
            }
            .name {
              font-family: SourceHanSansCN-Medium;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 18px;
              letter-spacing: 0px;
              color: #ffffff;
            }
          }
        }
        .table {
          width: 100%;
          // height: calc(100% - 270px);
          height: 160px;
          overflow: auto;
        }
        .pagination {
          text-align: right;
        }
        .table-gj {
          width: 100%;
          height: 160px;
          overflow: auto;
        }
      }
    }
  }
}
</style>
<style lang="less">
.resetZindex {
  z-index: 2000 !important;
}
</style>
