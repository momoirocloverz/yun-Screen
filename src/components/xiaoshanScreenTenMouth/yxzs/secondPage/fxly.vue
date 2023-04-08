<template>
  <div class="confxlytainer" v-if="isShow" :style="{ opacity: maskOpacity }">
    <div class="center-container">
      <div class="head">萧山文保风险来源分析</div>
      <div class="close" @click="close"></div>
      <div class="tab">
        <div @click="swicthTab(1)" :class="['item', showList ? 'item-act' : '']">
          <span>风险来源</span>
        </div>
        <div @click="swicthTab(0)" :class="['item', !showList ? 'item-act' : '']">
          <span>风险分析</span>
        </div>
      </div>
      <div v-show="showList">
        <div class="search-box">
          <div class="search-params">
            <span>文保单位: </span>
            <el-autocomplete
              class="inline-input"
              v-model="searchParams.pointName"
              size="mini"
              :disabled="pointDisable"
              :fetch-suggestions="querySearch"
              placeholder="文保单位"
              @select="handleSelect"
              @change="completeChange"
              :style="{ width: `${130 / 192}rem !important` }"
            ></el-autocomplete>
            <!-- <el-select clearable v-model="searchParams.pointName" filterable size="mini" placeholder="文物" :style="{ width: `${130 / 192}rem !important` }">
              <el-option v-for="item in bumpPointList" :key="item.id" :label="item.publishName" :value="item.publishName"></el-option>
            </el-select> -->
            <span>镇街: </span>
            <el-select @change="streetChange" clearable :disabled="streetDisable" v-model="searchParams.jd" filterable size="mini" placeholder="镇街" :style="{ width: `${130 / 192}rem !important` }">
              <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
            <span>风险来源: </span>
            <el-select v-model="searchParams.fxly" clearable size="mini" placeholder="风险来源" :style="{ width: `${130 / 192}rem !important` }">
              <el-option v-for="item in riskSourceList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
            </el-select>
            <!-- <span>风险变化: </span>
            <el-select v-model="searchParams.fxbh" clearable size="mini" placeholder="风险变化" :style="{ width: `${130 / 192}rem !important` }">
              <el-option v-for="item in riskChangeList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
            </el-select> -->
          </div>
          <div class="btn-search" @click="search">搜索</div>
        </div>
        <div class="table-box">
          <Table
            v-if="isWtsb"
            :tableColumns="tableColumns_wtsb"
            :tableData="tableData"
            :optionList="optionList"
            :headTextColor="'#e4f0ff'"
            :rowTextColor="'#a6b9ff'"
            :hasIndex="true"
            @btnClick="showDetail"
          >
            <template slot="hasTrouble" slot-scope="scope">
              <span style="color: red">有隐患</span>
              <!-- <span style="color: red" v-if="scope.row.hasTrouble">有隐患</span>
              <span style="color: #3981eb" v-else>无隐患</span> -->
            </template>
            <template slot="checkStatus" slot-scope="scope">
              <span>{{ scope.row.checkStatus == '0' ? '处理中' : scope.row.checkStatus == '1' ? '已处理' : scope.row.checkStatus == '-1' ? '异常' : '暂无' }}</span>
            </template>
            <!-- <template slot="isRun" slot-scope="scope">
              <span style="color: red" v-if="scope.row.isRun == -1">待审核</span>
              <span style="color: #3981eb" v-if="scope.row.isRun == 1">合格</span>
              <span style="color: red" v-if="scope.row.isRun == 99">不合格</span>
            </template> -->
          </Table>
          <Table v-else :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true">
            <template slot="riskLevel" slot-scope="scope">
              <div style="width: 100%; display: flex; align-items: center">
                <img
                  :style="{
                    width: `${19 / 192}rem`,
                    height: `${17 / 192}rem`,
                    marginRight: '5px',
                  }"
                  v-show="scope.row.riskLevel == '1'"
                  src="../../../../assets/img4/l-icon@3x.png"
                  alt=""
                  srcset=""
                />
                <span v-show="scope.row.riskLevel == '1'" style="color: #4bfffe">低</span>
                <img
                  :style="{
                    width: `${19 / 192}rem`,
                    height: `${17 / 192}rem`,
                    marginRight: '5px',
                  }"
                  v-show="scope.row.riskLevel == '2'"
                  src="../../../../assets/img4/c-icon@3x.png"
                  alt=""
                  srcset=""
                />
                <span v-show="scope.row.riskLevel == '2'" style="color: #ffe082">中</span>
                <img
                  :style="{
                    width: `${19 / 192}rem`,
                    height: `${17 / 192}rem`,
                    marginRight: '5px',
                  }"
                  v-show="scope.row.riskLevel == '3'"
                  src="../../../../assets/img4/h-icon@3x.png"
                  alt=""
                  srcset=""
                />
                <span v-show="scope.row.riskLevel == '3'" style="color: #ff3e46">高</span>
              </div>
            </template>
          </Table>
        </div>
        <div class="pagination">
          <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
        </div>
      </div>
      <div v-show="!showList" class="g6Outer">
        <div id="g6container"></div>
      </div>
    </div>
    <FXLYDetail :isShow="isShowDetailBox" :row="detailInfo" @close="closeDetailBox" />
  </div>
</template>
<script>
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
import { getTaskList, screenBaseCheckFireRiskAll, screenBaseCheckFireRisk } from '../../../../api/xsApi3.js';
import { mapGetters } from 'vuex';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    defaultSelected: {
      type: String,
      default: '',
    },
    count1: {
      type: Number,
      default: 0,
    },
    count2: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Table: () => import(/* webpackChunkName: "FXLY43Table" */ '@/components/xiaoshanScreenTenMouth/yxzs/secondPage/component/table'),
    FXLYDetail: () => import(/* webpackChunkName: "FXLY43Detail" */ '@/components/xiaoshanScreenTenMouth/yxzs/secondPage/fxlyDetail'),
  },
  data() {
    return {
      isWtsb: true,
      pointDisable: false,
      streetDisable: false,
      searchItemStored: {},
      showList: true,
      searchParams: {
        pointName: '',
        jd: '',
        fxbh: '',
        fxly: '',
      },
      bumpPointList: [],
      streetList: [],
      riskSourceList: [
        {
          name: '问题上报',
          id: '0',
        },
        {
          name: '智能感知',
          id: '1',
        },
        {
          name: '气象预警',
          id: '2',
        },
        {
          name: '巡查上报',
          id: '3',
        },
        {
          name: '稽查督查',
          id: '4',
        },
        {
          name: '行为监测',
          id: '5',
        },
      ],
      riskChangeList: [
        {
          name: '上升',
          id: '1',
        },
        {
          name: '下降',
          id: '2',
        },
      ],
      tableColumns: [
        {
          name: '文保单位',
          props: 'bumpPointName',
        },
        {
          name: '镇街',
          props: 'jd',
        },
        {
          name: '风险来源',
          props: 'status',
          format: (row) => {
            return row.status;
          },
        },
        {
          name: '事件内容',
          props: 'jd',
        },
        {
          name: '时间',
          props: 'status',
          format: (row) => {
            return row.createTime;
          },
        },
      ],
      tableColumns_wtsb: [
        {
          name: '文保单位',
          props: 'publishName',
        },
        {
          name: '上报人员',
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
          name: '风险来源',
          props: 'checkType',
          format: (row) => {
            let mapType = {
              8: '问题上报',
              88: '气象预警',
              18: '行为监测',
              7: '稽查督查',
              11: '智能感知',
              12: '智能感知',
              13: '智能感知',
              14: '智能感知',
              15: '智能感知',
              3: '巡查上报',
            };
            return mapType[row.checkType];
          },
        },
        {
          name: '问题内容',
          props: 'checkName',
        },
        {
          name: '上报状态',
          props: 'hasTrouble',
          withSlot: true,
        },
        {
          name: '处置状态',
          props: 'checkStatus',
          //   withSlot: true,
          format: (row) => {
            // let mapType = {
            //   8: '问题上报',
            //   88: '气象预警',
            //   18: '行为监测',
            //   7: '稽查督查',
            //   11: '智能感知',
            //   12: '智能感知',
            //   13: '智能感知',
            //   14: '智能感知',
            //   15: '智能感知',
            //   3: '巡查上报',
            // };
            if (row.checkType == 8) {
              return '已流转';
            } else {
              if (row.checkStatus == '0') {
                return '处理中';
              } else if (row.checkStatus == '1') {
                return '已处理';
              } else if (row.checkStatus == '-1') {
                return '异常';
              } else {
                return '暂无';
              }
            }
          },
        },
        {
          name: '审核状态',
          props: 'isRun',
          //   withSlot: true,
          format: (row) => {
            // let mapType = {
            //   8: '问题上报',
            //   88: '气象预警',
            //   18: '行为监测',
            //   7: '稽查督查',
            //   11: '智能感知',
            //   12: '智能感知',
            //   13: '智能感知',
            //   14: '智能感知',
            //   15: '智能感知',
            //   3: '巡查上报',
            // };
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
        {
          name: '上报时间',
          props: 'checkCreateTime',
        },
      ],
      tableData: [],
      optionList: [
        {
          name: '',
          bgImg: require('@/assets/img3/btn.png'),
        },
      ],
      pageSize: 15,
      currentPage: 1,
      total: 0,
      graphInstance: null,
      maskOpacity: 1,
      isShowDetailBox: false,
      detailInfo: {},
    };
  },
  computed: {
    ...mapGetters(['allPoi']),
  },
  mounted() {
    this.getStreetList();
    this.getBumpPointList();
    // 挂载到body下
    this.$nextTick(() => {
      const body = document.querySelector('body');
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  },
  watch: {
    showList(val, nval) {
      if (nval) {
        this.generateMap();
      } else {
        if (this.graphInstance) {
          this.graphInstance.destroy();
        }
      }
    },
    isShow(nval) {
      this.searchParams.fxly = this.defaultSelected;
      this.currentPage = 1;
      this.searchParams.jd = '';
      this.searchParams.pointName = '';
      this.tableData = [];
      this.total = 0;
      this.isWtsb = true;
      this.fetchTableData();
    },
  },
  methods: {
    streetChange() {
      this.pointDisable = false;
      this.streetDisable = false;
      if (this.searchParams.jd) {
        // switch (this.searchParams.fxly) {
        //   case '巡查上报':
        //     this.pointDisable = true;
        //     this.streetDisable = false;
        //     break;
        //   case '智能感知':
        //     this.pointDisable = true;
        //     this.streetDisable = false;
        //     break;
        //   case '气象预警':
        //     break;
        //   case '行为监测':
        //     break;
        //   case '稽查督查':
        //     break;
        //   case '其他':
        //     break;
        // }
      }
    },
    completeChange() {
      if (!this.searchParams.pointName) {
        this.pointDisable = false;
        this.streetDisable = false;
      }
    },
    handleSelect(item) {
      this.pointDisable = false;
      this.streetDisable = false;
      //   switch (this.searchParams.fxly) {
      //     case '巡查上报':
      //       this.pointDisable = false;
      //       this.streetDisable = true;
      //       break;
      //     case '智能感知':
      //       this.pointDisable = false;
      //       this.streetDisable = true;
      //       break;
      //     case '气象预警':
      //       break;
      //     case '行为监测':
      //       break;
      //     case '稽查督查':
      //       break;
      //     case '其他':
      //       break;
      //   }
      // this.form.keyWord = item.value;
      //   this.searchParams.bumpPointId = item.id
      this.searchItemStored = item;
    },
    querySearch(queryString, cb) {
      var restaurants = this.bumpPointList.map((ele) => {
        return {
          value: ele.publishName,
          ...ele,
        };
      });
      var results = queryString ? restaurants.filter((i) => i.value.includes(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    swicthTab(value) {
      if (value) {
        this.showList = true;
      } else {
        this.showList = false;
      }
    },
    generateMap() {
      const data = {
        id: '1',
        label: '风险来源',
        size: 80,
        style: {
          //   fill: '#265EFF',
          //   stroke: '#265EFF'
          //   fill: '#91cc75',
          //   stroke: '#91cc75',
          fill: '#d02e2d',
          stroke: '#ff9291',
          opacity: 0.9,
        },
        visible: true,
        labelCfg: {
          position: 'center',
          style: {
            fontSize: 18,
            fill: '#fff',
          },
        },
        children: [
          {
            id: '1-1',
            label: '巡查上报',
            children: [
              {
                id: '1-1-1',
                label: '事件',
                children: [
                  { id: '1-1-1-1', label: '火警' },
                  { id: '1-1-1-2', label: '紧急求助' },
                  { id: '1-1-1-3', label: '其它事件' },
                ],
              },
              {
                id: '1-1-2',
                label: '使用情况',
                children: [
                  { id: '1-1-2-1', label: '文物建筑开放使用' },
                  { id: '1-1-2-2', label: '巡检情况' },
                ],
              },
              { id: '1-1-3', label: '用途', children: [{ id: '1-1-3-1', label: '居住类、闲置堆物、闲置空置' }] },
              {
                id: '1-1-4',
                label: '本体',
                children: [
                  { id: '1-1-4-1', label: '基础沉降' },
                  { id: '1-1-4-2', label: '结构变形' },
                  { id: '1-1-4-3', label: '位移' },
                  { id: '1-1-4-4', label: '梁柱裂缝' },
                  { id: '1-1-4-5', label: '空鼓' },
                ],
              },
            ],
          },
          {
            id: '1-2',
            label: '智能感知',
            children: [
              {
                id: '1-2-1',
                label: '安防',
                children: [
                  { id: '1-2-1-1', label: '周界入侵' },
                  { id: '1-2-1-2', label: '门禁报警' },
                  { id: '1-2-1-3', label: '非法闯入' },
                  { id: '1-2-1-4', label: '玻璃破碎' },
                ],
              },
              {
                id: '1-2-2',
                label: '消防',
                children: [
                  { id: '1-2-2-1', label: '消防水泵水压过低' },
                  { id: '1-2-2-2', label: '温度过高' },
                  { id: '1-2-2-3', label: '烟感' },
                  { id: '1-2-2-4', label: '火情' },
                  { id: '1-2-2-5', label: '抽烟' },
                  { id: '1-2-2-6', label: '消防通道占用' },
                  { id: '1-2-2-7', label: '可燃气体浓度过高' },
                ],
              },
              {
                id: '1-2-3',
                label: '用电',
                children: [
                  { id: '1-2-3-1', label: '电压欠压过压' },
                  { id: '1-2-3-2', label: '电流过流' },
                  { id: '1-2-3-3', label: '短路' },
                  { id: '1-2-3-4', label: '浪涌' },
                ],
              },
            ],
          },
          {
            id: '1-3',
            label: '气象预警',
            children: [
              {
                id: '1-3-1',
                label: '防雷',
                children: [
                  { id: '1-3-1-1', label: '雷暴天气' },
                  { id: '1-3-1-2', label: '是否有避雷措施' },
                ],
              },
              {
                id: '1-3-2',
                label: '环境监测',
                children: [
                  { id: '1-3-2-1', label: '温度异常' },
                  { id: '1-3-2-2', label: '湿度异常' },
                  { id: '1-3-2-3', label: '水位异常' },
                ],
              },
              {
                id: '1-3-3',
                label: '天气',
                children: [
                  { id: '1-3-3-1', label: '风速' },
                  { id: '1-3-3-2', label: '降雨量' },
                  { id: '1-3-3-3', label: '酸雨' },
                  { id: '1-3-3-4', label: '大气质量' },
                  { id: '1-3-3-5', label: '水质' },
                ],
              },
              {
                id: '1-3-4',
                label: '病虫害',
                children: [
                  { id: '1-3-4-1', label: '白蚁防治监测' },
                  { id: '1-3-4-2', label: '表面病害' },
                ],
              },
            ],
          },
          {
            id: '1-4',
            label: '行为监测',
            children: [
              {
                id: '1-4-1',
                label: '行为监测',
                children: [
                  { id: '1-4-1-1', label: '区域入侵' },
                  { id: '1-4-1-2', label: '人员徘徊' },
                  { id: '1-4-1-3', label: '高危人群出现' },
                  { id: '1-4-1-4', label: '人员离岗' },
                  { id: '1-4-1-5', label: '偷盗' },
                  { id: '1-4-1-6', label: '物品消失' },
                  { id: '1-4-1-7', label: '挖掘' },
                  { id: '1-4-1-8', label: '施工' },
                  { id: '1-4-1-9', label: '违建' },
                ],
              },
            ],
          },
          {
            id: '1-5',
            label: '利用状态',
            children: [
              {
                id: '1-5-1',
                label: '用途',
                children: [
                  { id: '1-5-1-1', label: '祭祀活动类' },
                  { id: '1-5-1-2', label: '展览、办公类' },
                ],
              },
            ],
          },
          {
            id: '1-6',
            label: '稽查督查',
            children: [
              {
                id: '1-6-1',
                label: '多跨协同',
                children: [
                  { id: '1-6-1-1', label: '公安' },
                  { id: '1-6-1-2', label: '消防' },
                  { id: '1-6-1-3', label: '城管' },
                  { id: '1-6-1-4', label: '住建' },
                  { id: '1-6-1-5', label: '镇街' },
                ],
              },
            ],
          },
        ],
      };
      data.children.forEach((ele) => {
        ele.size = 60;
        ele.style = {
          //   fill: '#269a99',
          //   stroke: '#269a99'
          fill: '#dcaa39',
          stroke: '#fed986',
          opacity: 0.9,
        };
        ele.visible = true;
        ele.labelCfg = {
          positions: 'center',
          style: {
            fontSize: 16,
            fill: '#fff',
          },
        };
        if (ele.children) {
          ele.children.forEach((sub) => {
            sub.size = 50;
            sub.style = {
              //   fill: '#ff99c3',
              //   stroke: '#ff99c3'
              fill: '#72a957',
              stroke: '#a0ef7a',
              opacity: 0.9,
            };
            sub.visible = true;
            sub.labelCfg = {
              positions: 'center',
              style: {
                fontSize: 14,
                fill: '#fff',
              },
            };
            if (sub.children) {
              sub.children.forEach((third) => {
                third.size = 40;
                third.type = 'ellipse';
                third.style = {
                  //   fill: '#6DC8EC',
                  //   stroke: '#6DC8EC'
                  fill: '#1c95fc',
                  stroke: '#71bdfe',
                  opacity: 0.9,
                };
                third.visible = true;
                third.labelCfg = {
                  autoRotate: true,
                  positions: 'center',
                  style: {
                    fontSize: 13,
                    fill: '#fff',
                  },
                };
              });
            }
          });
        }
      });
      this.$nextTick(() => {
        const container = document.getElementById('g6container');
        const that = this;
        if (container) {
          const width = container.scrollWidth;
          const height = container.scrollHeight || 580;
          const graph = new G6.TreeGraph({
            container: 'g6container',
            width,
            height,
            linkCenter: true,
            fitView: true,
            fitViewPadding: -1500,
            modes: {
              default: [
                {
                  type: 'collapse-expand',
                  onChange: function onChange(item, collapsed) {
                    const data = item.get('model');
                    data.collapsed = collapsed;
                    return true;
                  },
                },
                'drag-canvas',
                'zoom-canvas',
              ],
            },
            defaultNode: {
              size: 26,
            },
            layout: {
              //   type: 'dendrogram',
              type: 'compactBox',
              preventOverlap: true,
              direction: 'LR',
              //   direction: 'RL',
              //   nodeSep: 50,
              //   rankSep: 120,
              //   radial: true,
              gpuEnabled: true,
            },
          });
          graph.data(data);
          graph.render();
          that.graphInstance = graph;
          if (typeof window !== 'undefined')
            window.onresize = () => {
              if (!graph || graph.get('destroyed')) return;
              if (!container || !container.scrollWidth || !container.scrollHeight) return;
              graph.changeSize(container.scrollWidth, container.scrollHeight);
            };
        }
      });
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.fetchTableData();
    },
    search() {
      this.currentPage = 1;
      this.tableData = [];
      this.total = 0;
      this.fetchTableData();
    },
    fetchTableData() {
      if (this.searchParams.fxly) {
        let params = {
          orderByFlag: 1,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          zjmc: this.searchParams.jd,
          publishName: this.searchParams.pointName,
        };
        switch (this.searchParams.fxly) {
          case '问题上报':
            params.checkType = 8;
            params.jdIsRunState = 1;
            break;
          case '智能感知':
            params.checkTypes = [11, 12, 13, 14, 15];
            break;
          case '气象预警':
            params.checkType = 99;
            break;
          case '巡查上报':
            params.checkType = 3;
            params.jdIsRunStates = [1, 99];
            break;
          case '稽查督查':
            params.checkType = 7;
            break;
          case '行为监测':
            params.checkType = 18;
            break;
        }
        screenBaseCheckFireRisk(params).then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            // console.log('shorter', shorter);
            if (shorter) {
              this.tableData = shorter.list;
              this.total = shorter.total;
            }
          }
        });
      } else {
        let params = {
          orderByFlag: 1,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          zjmc: this.searchParams.jd,
          publishName: this.searchParams.pointName,
        };
        screenBaseCheckFireRiskAll(params).then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            // console.log('shorter', shorter);
            if (shorter) {
              this.tableData = shorter.list;
              this.total = shorter.total;
            }
          }
        });
        /* screenBaseCheckFireRisk().then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            console.log('shorter', shorter);
            if (shorter) {
              this.tableData = shorter.list;
              this.total = shorter.total;
            }
          }
        }); */
      }
    },
    setValueFormat() {
      this.tableColumns = [
        {
          name: '文保单位',
          props: 'bumpPointName',
        },
        {
          name: '镇街',
          props: 'jd',
        },
        {
          name: '风险来源',
          props: 'status',
          format: (row) => {
            return row.status;
          },
        },
        {
          name: '事件内容',
          props: 'jd',
        },
        {
          name: '时间',
          props: 'status',
          format: (row) => {
            return row.createTime;
          },
        },
      ];
      switch (this.searchParams.fxly) {
        case '巡查上报':
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'bumpPointId',
            },
            {
              name: '镇街',
              props: 'jd',
            },
            {
              name: '风险来源',
              props: 'status',
              format: (row) => {
                return row.checkName;
              },
            },
            {
              name: '事件内容',
              props: 'tag2',
            },
            {
              name: '时间',
              props: 'status',
              format: (row) => {
                return row.createTime;
              },
            },
          ];
          break;
        case '智能感知':
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'bumpPointName',
            },
            {
              name: '镇街',
              props: 'jd',
            },
            {
              name: '风险来源',
              props: 'status',
              format: (row) => {
                return row.tag;
              },
            },
            {
              name: '事件内容',
              props: 'tag1',
            },
            {
              name: '时间',
              props: 'status',
              format: (row) => {
                return row.createTime;
              },
            },
          ];
          break;
        case '气象预警':
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'pointName',
            },
            {
              name: '镇街',
              props: 'jd',
            },
            {
              name: '风险来源',
              props: 'status',
              format: (row) => {
                return row.msg;
              },
            },
            {
              name: '事件内容',
              props: 'riskMag',
            },
            {
              name: '时间',
              props: 'status',
              format: (row) => {
                return row.riskTime;
              },
            },
          ];
          break;
        case '行为监测':
          //   this.tableColumns = [
          //     {
          //       name: '文保单位',
          //       props: 'pointName',
          //     },
          //     {
          //       name: '镇街',
          //       props: 'jd',
          //     },
          //     {
          //       name: '风险来源',
          //       props: 'status',
          //       format: (row) => {
          //         return row.status;
          //       },
          //     },
          //     {
          //       name: '事件内容',
          //       props: 'jd',
          //     },
          //     {
          //       name: '时间',
          //       props: 'status',
          //       format: (row) => {
          //         return row.createTime;
          //       },
          //     },
          //   ];
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'pointName',
            },
            {
              name: '镇街',
              props: 'jd',
            },
            {
              name: '风险来源',
              props: 'status',
              format: (row) => {
                return row.msg;
              },
            },
            {
              name: '事件内容',
              props: 'riskMag',
            },
            {
              name: '时间',
              props: 'status',
              format: (row) => {
                return row.riskTime;
              },
            },
          ];
          break;
        case '巡查上报':
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'bumpPointId',
            },
            {
              name: '镇街',
              props: 'jd',
            },
            {
              name: '风险来源',
              props: 'status',
              format: (row) => {
                return row.checkName;
              },
            },
            {
              name: '事件内容',
              props: 'tag2',
            },
            {
              name: '时间',
              props: 'status',
              format: (row) => {
                return row.createTime;
              },
            },
          ];
          break;
        case '智能感知':
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'bumpPointName',
            },
            {
              name: '镇街',
              props: 'jd',
            },
            {
              name: '风险来源',
              props: 'status',
              format: (row) => {
                return row.tag;
              },
            },
            {
              name: '事件内容',
              props: 'tag1',
            },
            {
              name: '时间',
              props: 'status',
              format: (row) => {
                return row.createTime;
              },
            },
          ];
          break;
        case '稽查督查':
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'bumpPointName',
            },
            {
              name: '镇街',
              props: 'jd',
            },
            {
              name: '风险来源',
              props: 'status',
              format: (row) => {
                return row.status;
              },
            },
            {
              name: '事件内容',
              props: 'content',
            },
            {
              name: '时间',
              props: 'status',
              format: (row) => {
                if (row.signTime) {
                  return row.signTime.replace('T', ' ');
                }
              },
            },
          ];
          break;
        case '其他':
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'type',
            },
            {
              name: '镇街',
              props: 'local',
            },
            {
              name: '风险来源',
              props: 'status',
              format: (row) => {
                return row.status;
              },
            },
            {
              name: '事件内容',
              props: 'jd',
            },
            {
              name: '时间',
              props: 'status',
              format: (row) => {
                return row.createTime;
              },
            },
          ];
          break;
      }
    },
    close() {
      this.$emit('close');
      this.showList = true;
    },
    // 获取文保点列表
    getBumpPointList() {
      if (this.$store.state.hugeListData && this.$store.state.hugeListData.length) {
        this.bumpPointList = this.$store.state.hugeListData;
      } else {
        let params = {
          currentPage: 1,
          pageSize: 600,
        };
        wbd_list2(params).then((res) => {
          // console.log("lol", res.data);
          this.bumpPointList = res.data.data.list;
        });
      }
    },
    // 获取镇街列表
    getStreetList() {
      if (this.$store.state.commonStreetList && this.$store.state.commonStreetList.length) {
        this.streetList = this.$store.state.commonStreetList;
      } else {
        szzj().then((res) => {
          this.streetList = res.data.data;
          this.$store.commit('setCommonStreetList', res.data.data);
        });
      }
    },
    // 获取问题上报列表
    getList_wtsb() {
      let params = {
        page: this.currentPage,
        pageSize: this.pageSize,
        checkType: '8',
      };
      getTaskList(params).then((res) => {
        this.tableData = res.data.data.list.map((item) => {
          let obj = { ...item.baseCheck };
          obj.baseCheckDetailList = item.baseCheckDetailList;
          obj.baseCheckEndList = item.baseCheckEndList;
          let arr = this.formatPoiName(obj.bumpPointId);
          //   console.log(arr)
          obj.pointName = item.publishName;
          obj.taskContent = this.formatTaskDetails(item.baseCheckDetailList, 'dicDetailName');
          obj.checkNameType = this.formatTaskDetails(item.baseCheckDetailList, 'checkNameType');
          obj.hasTrouble = this.formatHasTrouble(item.baseCheckDetailList, 'isCheck', 1);
          obj.userName = item.userName;
          return obj;
        });
        // console.log('000', this.tableData)
        this.total = res.data.data.total;
      });
    },
    // 根据文物id获取文物名称,责任人和联系电话
    formatPoiName(pointId) {
      let poiName = '';
      let userName = '';
      let userPhone = '';
      if (this.allPoi.length > 0) {
        this.allPoi.map((item) => {
          if (item.bumpPointBaseInfoId == pointId) {
            // console.log(item)
            poiName = item.bumpPointBaseInfoName;
            userName = item.userDataAndUserVOS ? item.userDataAndUserVOS[0].nickName : '';
            userPhone = item.userDataAndUserVOS ? item.userDataAndUserVOS[0].phone : '';
          }
        });
      }
      return [poiName, userName, userPhone];
    },
    // 格式化任务内容列表展示
    formatTaskDetails(detailList, prop) {
      if (!detailList || detailList.length <= 0) return;
      let str = '';
      let arr = [];
      //   console.log(detailList)
      detailList.map((item) => {
        arr.push(item[prop]);
      });
      str = arr.join(' / ');
      return str;
    },
    // 根据字段判断是否有隐患
    formatHasTrouble(detailList, prop, value) {
      if (!detailList || detailList.length <= 0) return;
      let boolean = false;
      detailList.map((item) => {
        if (item[prop] !== value) {
          boolean = true;
        }
      });
      return boolean;
    },

    // 点击详情按钮
    showDetail(row, btnName) {
      this.isShowDetailBox = true;
      this.maskOpacity = 0;
      this.detailInfo = row;
    },
    closeDetailBox() {
      this.isShowDetailBox = false;
      this.maskOpacity = 1;
    },
  },
};
</script>
<style lang="less" scoped>
#g6container {
  height: 100%;
  width: 100%;
}
.g6Outer {
  height: 620px;
}
.confxlytainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 13;
  background: rgba(0, 0, 0, 0.7);
  .center-container {
    width: 1126px;
    height: 826px;
    overflow: hidden;
    position: relative;
    background: url('../../../../assets/img4/s-pop-bg.png') no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 12px 35px 35px 35px;
    .close {
      width: 54px;
      height: 53px;
      position: absolute;
      top: 0px;
      right: 0px;
      background: url('../../../../assets/img4/close.png') no-repeat center;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .head {
      width: 100%;
      height: 79px;
      background: url('../../../../assets/img4/pop-title.png') no-repeat center;
      background-size: auto 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Lucida Calligraphy', cursive, serif, sans-serif;
      font-size: 30px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      color: #ffffff;
    }
    .search-box {
      width: calc(100% - 20px);
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      margin-left: 0px;
      .search-params {
        width: auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        span {
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #f5fdff;
          margin-left: 20px;
          margin-right: 5px;
        }
        span:nth-child(1) {
          margin-left: 0;
        }
      }
      .btn-search {
        width: 60px;
        height: 28px;
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
    .table-box {
      width: 100%;
      height: 550px;
    }
    .pagination {
      text-align: center;
    }
  }
}
.swicth {
  color: #fff;
}
.tab {
  width: 50%;
  height: 42px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 35px;
  .item {
    width: 188px;
    height: 100%;
    background: url('../../../../assets/img4/pop-tab-n.png') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
      font-family: SourceHanSansCN-Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: rgba(141, 162, 196, 0.68);
    }
  }
  .item-act {
    background: url('../../../../assets/img4/pop-tab-s.png') no-repeat top;
    background-size: 100% auto;
    span {
      font-family: SourceHanSansCN-Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      // color: rgba(206, 220, 244, 1);
      box-shadow: 0px 1px 3px 0px rgba(17, 15, 27, 0.26);
      text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
      background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
