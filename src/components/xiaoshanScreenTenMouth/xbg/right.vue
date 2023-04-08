<template>
  <div class="container globalFireFoxScrollBar">
    <Box :height="'320px'" :bgSrc="require('../../../assets/imgBoxBg/x-box4-bg.png')">
      <div class="part part-1">
        <!-- <div class="title-row">
          <img src="../../../assets/img4/wenbaojijin.png" alt="" srcset="" />
        </div> -->
        <Title :text="'文保基金'">
          <!-- <div class="btn" @click="wbjj_Click">查看详情</div> -->
          <div class="detailBtn" @click="wbjj_Click">详情<i class="el-icon-arrow-right"></i></div>
        </Title>
        <div class="tab">
          <div @click="tabClick_1(1)" :class="['item', currentTab_1 == 1 ? 'item-act' : '']">资金概况</div>
          <div @click="tabClick_1(2)" :class="['item', currentTab_1 == 2 ? 'item-act' : '']">捐赠列表</div>
          <div @click="tabClick_1(3)" :class="['item', currentTab_1 == 3 ? 'item-act' : '']">申请列表</div>
        </div>
        <div v-show="currentTab_1 == 1" class="content content-1">
          <div class="row-1">
            <div class="left">
              <!-- <img src="../../../assets/img4/jijinImg.png" alt="" /> -->
              <div class="info">
                <div>总金额<span>(万元)</span></div>
                <!-- <span>总金额(万元)</span> -->
                <span class="number1">{{ tab1Value }}</span>
              </div>
            </div>
            <div class="right">
              <div class="item">
                <div class="title">社会资金<span>(万元)</span></div>
                <div class="num">
                  <span>{{ tab2Value }}</span>
                </div>
              </div>
              <div class="item">
                <div class="title">财政资金<span>(万元)</span></div>
                <div class="num">
                  <span>{{ tab3Value }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row-2">
            <div class="chart">
              <PieChart :chartData="pieData" :logo="logoNumber" />
              <span class="center-text">资金<br />来源</span>
            </div>
            <div class="tj">
              <div class="item">
                <span class="title">审批中</span>
                <div class="num">
                  <span>{{ tab4Value }}</span>
                  <span>个</span>
                </div>
              </div>
              <div class="item">
                <span class="title">已拨付</span>
                <div class="num">
                  <span>{{ tab5Value }}</span>
                  <span>万元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="currentTab_1 == 2" class="content content-2">
          <div class="jzlb-table">
            <Table
              :tableData="tableData_jzlb"
              :tableColumns="tableColums_jzlb"
              :isStripe="true"
              :headTextColor="'#c2966d'"
              :headHeight="`${35 / 192}rem`"
              :headBgColor="'rgba(227,168,111, 0.2)'"
              :rowHeight="`${34 / 192}rem`"
              :rowTextColor="'#a8b0d0'"
            >
              <template slot="donateMoney" slot-scope="scope">
                <div style="width: 100%; display: flex" class="amountCon">
                  <span class="amountValue">
                    {{ scope.row.donateMoney }}
                  </span>
                  <span class="amountUnit">元</span>
                </div>
              </template>
              <template slot="amount" slot-scope="scope">
                <div class="amountCon">
                  <span class="amountValue">
                    {{ scope.row.amount }}
                  </span>
                  <span class="amountUnit">元</span>
                </div>
              </template>
            </Table>
          </div>
        </div>
        <div v-show="currentTab_1 == 3" class="content content-3">
          <div class="list">
            <div class="item" v-for="(item, index) in listData" :key="index" @click="showDeatil(item)">
              <div class="index">
                <span class="text">{{ index + 1 }}</span>
              </div>
              <div class="info">
                <div class="row">
                  <span>申请单位 : </span>
                  <span>{{ item.name }}</span>
                  <span>资金用途 : </span>
                  <span>{{ item.purpose }}</span>
                </div>
                <div class="row">
                  <span>申请金额 : </span>
                  <span>{{ item.num }}</span>
                  <span>申请时间 : </span>
                  <span>{{ item.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'308px'" :bgSrc="require('../../../assets/imgBoxBg/x-box5-bg.png')">
      <div class="part part-2">
        <Title :text="'考古前置'" @textClick="kgqz_title_click">
          <!-- <div class="btn" @click="kgqz_Click">查看详情</div> -->
          <div class="detailBtn" @click="kgqz_Click">详情<i class="el-icon-arrow-right"></i></div>
        </Title>
        <div class="box-tj">
          <div class="item" v-for="(item, index) in kgqz_tj" :key="index">
            <span class="name">{{ item.name }}</span>
            <div class="value">
              <span>{{ item.num }}</span>
              <span>{{ item.unit }}</span>
            </div>
          </div>
        </div>
        <div class="kgqz-table">
          <Table
            :tableData="tableData_kgqz"
            :tableColumns="tableColums_kgqz"
            :isStripe="true"
            :headTextColor="'#a8b0d0'"
            :headHeight="`${32 / 192}rem`"
            :headBgColor="'rgba(28, 149, 252, 0.13)'"
            :rowHeight="`${32 / 192}rem`"
            :rowTextColor="'#a8b0d0'"
          >
            <template slot="progress" slot-scope="scope">
              <span
                :style="{
                  color: getColorAndImg('progress', scope.row.progress, 'color'),
                  'padding-left': '5px',
                  'font-size': '14px',
                }"
              >
                {{ scope.row.progress | getProgress }}
              </span>
            </template>
            <template slot="excavation" slot-scope="scope">
              <span
                :style="{
                  color: getColorAndImg('excavation', scope.row.excavation, 'color'),
                  'justify-content': 'flex-start',
                  'padding-left': '5px',
                  'font-size': '14px',
                }"
              >
                {{ scope.row.excavation | getExcavation }}
              </span>
            </template>
            <template slot="warningCount" slot-scope="scope">
              <span v-show="scope.row.warningCount < 1" :style="{ color: '#898989', 'font-size': '14px' }">无</span>
              <span v-show="scope.row.warningCount == 1" :style="{ color: '#ffc231', 'font-size': '14px' }">进度较慢</span>
              <span v-show="scope.row.warningCount >= 2" :style="{ color: '#ff4c39', 'font-size': '14px' }">严重逾期</span>
            </template>
          </Table>
        </div>
        <div class="pagination">
          <el-pagination @current-change="pageNumChange_kgqz" :page-size="pageSize" :pager-count="7" layout="total,prev, pager, next" :total="total_kgqz"> </el-pagination>
        </div>
      </div>
    </Box>
    <Box :height="'280px'" :bgSrc="require('../../../assets/imgBoxBg/x-box6-bg.png')">
      <div class="part part-3">
        <Title :text="'保护利用'" @textClick="bhly_title_click">
          <!-- <div class="btn" @click="bhly_Click">查看详情</div> -->
          <div class="detailBtn" @click="bhly_Click">详情<i class="el-icon-arrow-right"></i></div>
        </Title>
        <div class="tab">
          <div @click="tabClick_2(1)" :class="['item', currentTab_2 == 1 ? 'item-act' : '']">文物修缮</div>
          <div @click="tabClick_2(2)" :class="['item', currentTab_2 == 2 ? 'item-act' : '']">活化利用</div>
        </div>
        <div v-show="currentTab_2 == 1" class="content content-1">
          <div class="box-tj">
            <div class="item" v-for="(item, index) in wwxs_tj" :key="index">
              <span class="name">{{ item.name }}</span>
              <div class="value">
                <span>{{ item.num }}</span>
                <span>{{ item.unit }}</span>
              </div>
            </div>
          </div>
          <div class="chart-box">
            <div class="chart">
              <PieChartXs :chartData="wwxs_chartData" :logo="logo" />
              <span>修缮<br />情况</span>
            </div>
            <div class="legend">
              <div class="item" v-for="(item, index) in wwxs_chartData" :key="index">
                <span class="point" :style="{ background: item.color }"></span>
                <span class="name">{{ item.name }}</span>
                <span class="num" :style="{ color: item.color }">{{ item.num }}</span>
                <span class="unit">个</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="currentTab_2 == 2" class="content content-2">
          <div class="hhly-table">
            <Table
              :tableData="tableData_hhly"
              :tableColumns="tableColums_hhly"
              :isStripe="true"
              :headTextColor="'#3bbfe5'"
              :headHeight="`${32 / 192}rem`"
              :headBgColor="'rgba(28, 149, 252, 0.13)'"
              :rowHeight="`${32 / 192}rem`"
              :rowTextColor="'#a8b0d0'"
            ></Table>
          </div>
        </div>
      </div>
    </Box>
    <!-- 二级页面 -->
    <WBJJ
      :isShow="isShow_wbjj"
      @close="
        () => {
          this.isShow_wbjj = false;
        }
      "
    />
    <KGQZ
      :isShow="isShow_kgqz"
      @close="
        () => {
          this.isShow_kgqz = false;
        }
      "
    />
    <BHLY
      :isShow="isShow_bhly"
      @close="
        () => {
          this.isShow_bhly = false;
        }
      "
    />
  </div>
</template>
<script>
import Box from '../components/box';
import Title from '../components/title';
import { kgkt_List } from '../../../api/xsApi2';
import {
  get_wbjj_data,
  get_jzlb_data,
  get_zjsqlb_data,
  get_kgqz_data,
  get_wwxs_data,
  get_hhly_info,
  xbgFundTotal,
  fundDonationlist,
  fundApplylist,
  xbgAPControllerTopTJ,
  xbgAPControllerList,
  xbgBhlyControllerSaveTJ,
  saveuseUselist,
  selectDonateMoney,
} from '@/api/xsApi3';
import Table from './components/table';
import PieChart from './components/rightChart';
import PieChartXs from './components/rightChart_wwxs';
// 二级页面
import KGQZ from './secondPage/kgqz.vue';
import BHLY from './secondPage/bhly.vue';
import WBJJ from './secondPage/wbjj.vue';
let pieColor = ['#3bbfe5', '#f5a75a', '#5af5a7'];
export default {
  components: { Box, Title, Table, PieChart, PieChartXs, KGQZ, BHLY, WBJJ },
  data() {
    return {
      // part1
      // tab1
      tab1Value: 3043,
      tab2Value: 43,
      tab3Value: 3000,
      tab4Value: 0,
      tab5Value: 2000,
      logoNumber: 0,
      currentTab_1: 1,
      pieData: [
        { value: 40, name: '政府财政' },
        { value: 38, name: '个人捐献' },
        { value: 32, name: '企业捐献' },
        { value: 30, name: '旅游收入' },
        { value: 28, name: '党员捐献' },
      ],
      // tab2
      tableColums_jzlb: [
        {
          name: '名称',
          props: 'donateUnit',
          flex: 1.3,
          format: (row) => {
            if (row.resource == '社会捐赠') {
              if (row.donateUnit.length >= 3) {
                return row.donateUnit.substr(0, 1) + ' * ' + row.donateUnit.substr(2);
              } else if (row.donateUnit.length == 2) {
                return row.donateUnit.substr(0, 1) + ' * ';
              }
            } else {
              return row.donateUnit;
            }
          },
        },
        // {
        //   name: '名称',
        //   props: 'museumRelicInfo',
        //   flex: 1.3,
        //   format: (row) => {
        //     if (row.type == '1') {
        //       return row.museumRelicInfo.chargePerson;
        //     } else {
        //       return row.giver;
        //     }
        //   },
        // },
        {
          name: '捐赠来源',
          props: 'source',
          //   format: (row) => {
          //     if (row.resource == '0') {
          //       return '个人';
          //     } else if (row.resource == '1') {
          //       return '企业';
          //     }
          //   },
        },
        // {
        //   name: '捐赠来源',
        //   props: 'type',
        //   format: (row) => {
        //     if (row.type) {
        //       if (row.type == '1') {
        //         return '个人';
        //       } else {
        //         return '企业';
        //       }
        //     }
        //   },
        // },
        {
          name: '捐赠金额',
          props: 'donateMoney',
          withSlot: true,
        },
        // {
        //   name: '捐赠金额',
        //   props: 'amount',
        //   withSlot: true,
        // },
      ],
      tableData_jzlb: [
        {
          name: '李子轩',
          resource: '0',
          num: '1',
        },
        {
          name: '智途科技股份有限公司',
          resource: '1',
          num: '100',
        },
        {
          name: '王海林',
          resource: '0',
          num: '2',
        },
      ],
      // tab3
      listData: [
        {
          name: '务本堂',
          purpose: '修缮',
          num: '15000',
          time: '2022/12/10',
        },
        {
          name: '许家南大房',
          purpose: '电器更换',
          num: '500',
          time: '2022/11/20',
        },
        {
          name: '汤寿潜故居',
          purpose: '电器更换',
          num: '500',
          time: '2022/11/13',
        },
      ],
      isShow_wbjj: false,
      // part2 考古前置
      kgqz_tj: [
        {
          name: '项目总数',
          num: '100',
          unit: '个',
        },
        {
          name: '土地面积',
          num: '200',
          unit: '平米',
        },
        {
          name: '已移交',
          num: '100',
          unit: '',
        },
        {
          name: '已签约',
          num: '8',
          unit: '个',
        },
        {
          name: '已勘探',
          num: '100',
          unit: '',
        },
      ],
      tableColums_kgqz: [
        {
          props: 'projectName',
          name: '项目名称',
          flex: 1.5,
          format: (row) => {
            if (row.projectName.length > 7) {
              return row.projectName.substr(0, 7) + '...';
            } else {
              return row.projectName;
            }
          },
        },
        {
          props: 'landUnit',
          name: '做地单位',
        },
        {
          props: 'progress',
          name: '当前进展',
          withSlot: true,
        },
        {
          props: 'excavation',
          name: '发掘情况',
          withSlot: true,
        },
        {
          props: 'warningCount',
          name: '状态',
          withSlot: true,
        },
      ],
      tableData_kgqz: [
        {
          projectName: '越王城考古项目',
          landUnit: '万达集团',
          progress: 1,
          excavation: 1,
          warningCount: 72,
        },
        {
          projectName: '考古勘探研究',
          landUnit: '交投集团',
          progress: 1,
          excavation: 1,
          warningCount: 49,
        },
        {
          projectName: '沿池山考古项目',
          landUnit: '城投集团',
          progress: 0,
          excavation: 1,
          warningCount: 47,
        },
      ],
      pageNum: 1,
      pageSize: 3,
      total_kgqz: 0,
      isShow_kgqz: false,
      // part3
      currentTab_2: 1,
      // tab1
      wwxs_tj: [
        {
          name: '项目总数',
          num: '100',
          unit: '个',
        },
        {
          name: '土地面积',
          num: '2000',
          unit: '平米',
        },
      ],
      wwxs_chartData: [
        {
          name: '待修缮文物',
          num: '11',
          color: pieColor[0],
        },
        {
          name: '修缮中文物',
          num: '6',
          color: pieColor[1],
        },
        {
          name: '已修缮文物',
          num: '8',
          color: pieColor[2],
        },
      ],
      logo: '1',
      // tab2
      tableColums_hhly: [
        {
          props: 'pointName',
          name: '文保单位',
          flex: 1.2,
          format: (row) => {
            if (row.pointName.length > 8) {
              return row.pointName.substr(0, 7) + '...';
            } else {
              return row.pointName;
            }
          },
        },
        {
          props: 'jd',
          name: '属地',
          flex: 0.7,
        },
        {
          props: 'streamingMode',
          name: '利用情况',
          flex: 1.4,
          format: (row) => {
            if (row.streamingMode.length > 10) {
              return row.streamingMode.substr(0, 9) + '...';
            } else {
              return row.streamingMode;
            }
          },
        },
        {
          props: 'openDay',
          name: '开放时间',
          flex: 0.9,
        },
      ],
      tableData_hhly: [],
      isShow_bhly: false,
    };
  },
  filters: {
    getProgress(value) {
      switch (value) {
        case 0:
          return '未勘探';
        case 1:
          return '勘探排队中';
        case 2:
          return '完成勘探';
        case 3:
          return '需要补探';
        case 4:
          return '已进场';
        default:
          break;
      }
    },
    getExcavation(value) {
      switch (value) {
        case 0:
          return '无需发掘';
        case 1:
          return '正在发掘';
        case 2:
          return '完成发掘';
        default:
          break;
      }
    },
  },
  watch: {
    currentTab_1(nval, val) {
      switch (nval) {
        case 1:
          this.fetchXbgFundTotal();
          break;
        case 2:
          this.fetchFundList();
          break;
        case 3:
          this.fetchApplyList();
          break;
      }
    },
  },
  mounted() {
    this.getJZLB_list(1, 10); // 捐赠列表
    this.getZJSQ_list(1, 10); // 资金申请列表
    this.getKGQZ_list(); // 考古前置
    this.getWWXS_data(); // 文物修缮
    this.getHHLY_list(1, 100); // 活化利用
    this.fetchXbgFundTotal();
    // this.fetchTopTj();
    // this.fetchAPControllerList();
    // this.fetchHere();
    // this.fetchuseUselist();
  },
  methods: {
    fetchuseUselist() {
      saveuseUselist({}).then((res) => {
        console.log('res', res);
      });
    },
    fetchHere() {
      xbgBhlyControllerSaveTJ({}).then((res) => {
        console.log('res', res);
      });
    },
    fetchAPControllerList() {
      let parmas = {
        pageNum: 1,
        pageSize: 10,
      };
      xbgAPControllerList(parmas).then((res) => {
        console.log(res);
      });
    },
    fetchTopTj() {
      xbgAPControllerTopTJ({}).then((res) => {
        console.log(res);
      });
    },
    fetchApplyList() {
      const params = {
        pageNum: 1,
        pageSize: 10,
      };
      fundApplylist(params).then((res) => {
        console.log(res);
      });
    },
    fetchFundList() {
      const params = {
        pageNum: 1,
        pageSize: 10,
      };
      //   fundDonationlist(params).then((res) => {
      //     if (res && res.data && res.data.code && res.data.code == 200) {
      //       const shorter = res.data.data;
      //       this.tableData_jzlb = shorter.records;
      //     }
      //   });
    },
    fetchXbgFundTotal() {
      /*  selectDonateMoney({})
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        }); */
      /* xbgFundTotal({}).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          const shorter = res.data.data;
          //   资金来源（1党员捐款、2政府财政、3个人捐款、4企业捐款、5旅游收入）
          this.tab1Value = shorter.totalAmount;
          this.tab2Value = shorter.shzjAmount;
          this.tab3Value = shorter.czzjAmount;
          this.tab4Value = shorter.spzNums;
          this.tab5Value = shorter.ybfAmount;
          let tracksub1 = shorter.fundSourceTJList.find((ele) => {
            return ele.sourceType == 1;
          });
          if (tracksub1) {
            this.pieData[4].value = tracksub1.nums;
          }
          let tracksub2 = shorter.fundSourceTJList.find((ele) => {
            return ele.sourceType == 2;
          });
          if (tracksub2) {
            this.pieData[0].value = tracksub2.nums;
          }
          let tracksub3 = shorter.fundSourceTJList.find((ele) => {
            return ele.sourceType == 3;
          });
          if (tracksub3) {
            this.pieData[1].value = tracksub3.nums;
          }
          let tracksub4 = shorter.fundSourceTJList.find((ele) => {
            return ele.sourceType == 4;
          });
          if (tracksub4) {
            this.pieData[2].value = tracksub4.nums;
          }
          let tracksub5 = shorter.fundSourceTJList.find((ele) => {
            return ele.sourceType == 5;
          });
          if (tracksub5) {
            this.pieData[3].value = tracksub5.nums;
          }
          this.logoNumber += 1;
        }
      }); */
    },
    showDeatil(row) {
      //   console.log('row', row);
    },
    // 文保基金tab点击切换
    tabClick_1(val) {
      this.currentTab_1 = val;
    },
    // 获取文保基金
    getWBJJ_data() {
      get_wbjj_data().then((res) => {
        let data = res.data.data;
      });
    },
    // 获取捐赠列表
    getJZLB_list(pageNum, pageSize) {
      let params = {
        currentPage: pageNum,
        pageSize: pageSize,
      };
      get_jzlb_data(params).then((res) => {
        this.tableData_jzlb = res.data.data.list;
      });
    },
    // 获取资金申请列表
    getZJSQ_list(pageNum, pageSize) {
      let params = {
        currentPage: pageNum,
        pageSize: pageSize,
      };
      get_zjsqlb_data(params).then((res) => {});
    },
    wbjj_Click() {
      this.isShow_wbjj = true;
    },
    // 获取考古勘探列表
    getKGQZ_list() {
      get_kgqz_data(this.pageNum, this.pageSize).then((res) => {
        let tjData = res.data.data.detail;
        this.kgqz_tj[0].num = tjData.reportNum1;
        this.kgqz_tj[1].num = tjData.reportNum2;
        this.kgqz_tj[2].num = tjData.reportNum3;
        this.kgqz_tj[3].num = tjData.reportNum4;
        this.kgqz_tj[4].num = tjData.reportNum5;

        // let list = res.data.data.list;
        // this.total_kgqz = list.total;
        // this.tableData_kgqz = list.list;
      });
      let params = {
        currentPage: this.pageNum,
        pageSize: this.pageSize,
      };
      kgkt_List(params).then((res) => {
        // console.log('考古勘探列表', res.data.data)
        this.total_kgqz = res.data.data.total;
        this.tableData_kgqz = res.data.data.list;
      });
    },
    // 根据字段，判断颜色和图片
    getColorAndImg(key, value, returnType) {
      let color, img;
      if (key === 'progress') {
        switch (value) {
          case 0:
            color = '#9c9998';
            break;
          case 1:
            color = '#e3c284';
            break;
          case 2:
            color = '#2fd692';
            break;
          case 3:
            color = '#28aadb';
            break;
          case 4:
            color = '#fdd89f';
            break;
          default:
            break;
        }
      } else if (key === 'excavation') {
        switch (value) {
          case 0:
            color = '#9c9998';
            break;
          case 1:
            color = '#e3c284';
            break;
          case 2:
            color = '#2fd692';
            break;

          default:
            break;
        }
      }

      if (returnType === 'color') {
        return color;
      } else if (returnType === 'img') {
        return img;
      }
    },
    pageNumChange_kgqz(val) {
      this.pageNum = val;
      this.getKGQZ_list();
    },
    // 考古前置标题点击
    kgqz_title_click() {},
    kgqz_Click() {
      this.isShow_kgqz = true;
    },

    // 保护利用标题点击
    bhly_title_click() {},
    // 文物修缮
    getWWXS_data() {
      get_wwxs_data().then((res) => {
        let data = res.data.data;
        this.wwxs_tj[0].num = data.reportNum1;
        this.wwxs_tj[1].num = data.reportNum2;

        this.wwxs_chartData[0].num = data.reportNum3;
        this.wwxs_chartData[1].num = data.reportNum4;
        this.wwxs_chartData[2].num = data.reportNum5;
        this.logo += '1';
      });
    },
    // 活化利用
    getHHLY_list(pageNum, pageSize) {
      let params = {
        currentPage: pageNum,
        pageSize: pageSize,
      };
      get_hhly_info(params).then((res) => {
        this.tableData_hhly = res.data.data.list;
      });
    },

    // 保护利用tab点击切换
    tabClick_2(val) {
      this.currentTab_2 = val;
    },
    bhly_Click() {
      this.isShow_bhly = true;
    },
  },
};
</script>

<style lang="less" scoped>
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
    .tab {
      width: 100%;
      height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      .item {
        width: 148px;
        height: 100%;
        background: url('../../../assets/img4/tab3-nbg.png') no-repeat center;
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
      .item-act {
        background: url('../../../assets/img4/tab3-sbg.png') no-repeat center;
        background-size: 100% 100%;
        font-family: SourceHanSansCN-Regular;
        font-size: 16px;
        font-weight: 900;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .content {
      width: 100%;
      height: 210px;
    }
    .content-1 {
      .row-1 {
        width: 100%;
        height: 75px;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .left {
          //   width: 49%;
          width: 29%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to right, rgba(53, 148, 255, 0), rgba(53, 148, 255, 0.17));
          img {
            width: 94px;
            height: 61px;
            margin-right: 5px;
          }
          .info {
            // width: 80px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            div {
              font-family: SourceHanSansCN-Regular;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #a8b0d0;
              span {
                font-size: 15px;
              }
            }
            .number1 {
              font-family: DINPro-Medium;
              font-size: 30px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #ffca97;
            }
          }
        }
        .right {
          //   width: 49%;
          width: 70%;
          height: 100%;
          background: linear-gradient(to left, rgba(53, 148, 255, 0), rgba(53, 148, 255, 0.17));
          display: flex;
          justify-content: center;
          .item {
            // width: 95px;
            padding-left: 30px;
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .title {
              font-family: SourceHanSansCN-Regular;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #a8b0d0;
              span {
                font-size: 15px;
              }
            }
            .num {
              span {
                font-family: DINPro-Medium;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
              //   span {
              //     font-family: SourceHanSansCN-Medium;
              //     font-size: 14px;
              //     font-weight: normal;
              //     font-stretch: normal;
              //     letter-spacing: 0px;
              //     color: #737ead;
              //   }
            }
          }
        }
      }
      .row-2 {
        width: 100%;
        height: 120px;
        display: flex;
        margin-top: 10px;
        .chart {
          width: 45%;
          height: 100%;
          position: relative;
          background: #3593ff1c;
          .center-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #eceff4;
          }
        }
        .tj {
          width: 218px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          margin-left: 10px;
          .item {
            width: 100%;
            height: 55px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            box-sizing: border-box;
            padding-left: 40px;
            &:nth-child(1) {
              // background-color: #fcaa1c1c;
              background: linear-gradient(to right, #fcaa1c1c, #fcaa1c00);
            }
            &:nth-child(2) {
              // background-color: #12ffc013;
              background: linear-gradient(to right, #12ffc013, rgba(252, 170, 28, 0));
            }
            .title {
              font-family: SourceHanSansCN-Regular;
              font-size: 15px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #a8b0d0;
            }
            .num {
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
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #737ead;
              }
            }
          }
        }
      }
    }
    .content-2 {
      .jzlb-table {
        margin-top: 10px;
        width: 100%;
        height: 200px;
      }
    }
    .content-3 {
      .list {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: 10px;
        .item {
          width: 96%;
          height: 62px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          // justify-content: center;
          border-bottom: 1px solid rgba(92, 194, 212, 0.3);
          margin-left: 5px;
          .index {
            width: 29px;
            height: 33px;
            background: url('../../../assets/img4/zijinbiaoqian.png') no-repeat center;
            background-size: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            .text {
              font-family: ArialMT;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #ffffff;
              background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          .info {
            .row {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #a8b0d0;
            }
            span:nth-child(2n) {
              color: #fff;
              display: inline-block;
              width: 90px;
            }
          }
        }
      }
    }
  }
  .part-2 {
    .box-tj {
      width: 100%;
      height: 66px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5px 0 2px 0;
      background: url('../../../assets/img4/kgqz_bg.png') no-repeat center;
      background-size: 100% 100%;
      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:nth-child(2) {
          flex: 1.5;
        }
        .name {
          font-family: PingFangSC-Semibold;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #a8b0d0;
        }
        .value {
          span:nth-child(1) {
            font-family: DINPro-Medium;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            // color: #ffca97;
            color: #fff;
          }
          span:nth-child(2) {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #737ead;
          }
        }
      }
    }
    .kgqz-table {
      width: 100%;
      height: 140px;
    }
    .pagination {
      text-align: right;
    }
  }
  .part-3 {
    .tab {
      width: 100%;
      height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      .item {
        width: 225px;
        height: 100%;
        background: url('../../../assets/img4/tab2-nbg.png') no-repeat center;
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
      .item-act {
        background: url('../../../assets/img4/tab2-sbg.png') no-repeat center;
        background-size: 100% 100%;
        font-family: SourceHanSansCN-Regular;
        font-size: 16px;
        font-weight: 900;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .content {
      width: 100%;
      height: 210px;
    }
    .content-1 {
      .box-tj {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0;
        .item {
          width: 225px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          background: rgba(69, 229, 186, 0.1);
          box-sizing: border-box;
          padding-left: 30px;
          .name {
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #a8b0d0;
          }
          .value {
            // span:nth-child(1) {
            //   font-family: DINPro-Medium;
            //   font-size: 20px;
            //   font-weight: normal;
            //   font-stretch: normal;
            //   letter-spacing: 1px;
            //   color: #ffca97;
            // }
            // span:nth-child(2) {
            //   font-family: PingFangSC-Regular;
            //   font-size: 14px;
            //   font-weight: normal;
            //   font-stretch: normal;
            //   letter-spacing: 1px;
            //   color: #737ead;
            // }
            span:nth-child(1) {
              font-family: Arial-BoldMT;
              font-size: 26px;
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
      .chart-box {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        .chart {
          width: 100px;
          height: 100%;
          position: relative;
          span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: PingFangSC-Light;
            font-size: 17px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 2px;
            color: #a8b0d0;
          }
        }
        .legend {
          width: 258px;
          height: 100%;
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;

          .item {
            width: 100%;
            height: 26px;
            box-sizing: border-box;
            padding-left: 30px;
            background: linear-gradient(to right, #3bc0e534, #3bc0e500);
            transform: skewX(-50deg);
            .point {
              display: inline-block;
              width: 10px;
              height: 10px;
              margin: 0 10px;
              transform: skewX(50deg);
            }
            .name {
              display: inline-block;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #ffffff;
              transform: skewX(50deg);
            }
            .num {
              font-family: DINPro-Medium;
              font-size: 17px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #3bbfe5;
              display: inline-block;
              width: 25px;
              text-align: center;
              transform: skewX(50deg);
            }
            .unit {
              display: inline-block;
              font-family: PingFangSC-Semibold;
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #ffffff;
              transform: skewX(50deg);
            }
            &:nth-child(2) {
              background: linear-gradient(to right, #f5a75a34, #f5a75a00);
            }
            &:nth-child(3) {
              background: linear-gradient(to right, #5af5a734, #5af5a700);
            }
          }
        }
      }
    }
    .content-2 {
      .hhly-table {
        width: 100%;
        height: 180px;
        margin-top: 4px;
      }
    }
  }
}
.amountCon {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.amountValue {
  color: #a8b0d0 !important;
  font-size: 16px !important;
  overflow: auto !important;
  flex: none !important;
}
.amountUnit {
  color: #737ead !important;
  font-size: 12px !important;
  margin-left: 5px !important;
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
