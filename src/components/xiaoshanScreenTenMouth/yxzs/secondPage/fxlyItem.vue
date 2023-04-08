<template>
  <div class="confxlyItemtainer" v-if="isShow">
    <div class="center-container">
      <div class="head">萧山文保风险因子分析</div>
      <div class="close" @click="close"></div>
      <div class="search-box">
        <div class="search-params">
          <span>文保单位: </span>
          <el-autocomplete
            class="inline-input"
            v-model="searchParams.pointName"
            size="mini"
            :fetch-suggestions="querySearch"
            placeholder="文保单位"
            @select="handleSelect"
            :style="{ width: `${130 / 192}rem !important` }"
          ></el-autocomplete>
          <!-- <el-select clearable v-model="searchParams.pointName" filterable size="mini" placeholder="文物" :style="{ width: `${130 / 192}rem !important` }">
            <el-option v-for="item in bumpPointList" :key="item.id" :label="item.publishName" :value="item.publishName"> </el-option>
          </el-select> -->
          <span>镇街: </span>
          <el-select clearable v-model="searchParams.jd" filterable size="mini" placeholder="镇街" :style="{ width: `${130 / 192}rem !important` }">
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
        <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true"> </Table>
      </div>
      <div class="pagination">
        <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
import { get_fxly_detail, screenV3RiskDataDetails } from '../../../../api/xsApi3.js';
import Table from './component/table';
import dataSource from './staticData.json';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    fxlyId: {
      type: String,
      required: true,
    },
    defaultSelected: {
      type: String,
      default: '',
    },
  },
  components: { Table },
  data() {
    return {
      searchItemStored: {},
      searchParams: {
        pointName: '',
        jd: '',
        fxly: '',
      },
      bumpPointList: [],
      streetList: [],
      riskSourceList: [
        {
          name: '巡查上报',
          id: '1',
        },
        {
          name: '智能感知',
          id: '2',
        },
        {
          name: '气象预警',
          id: '3',
        },
        {
          name: '行为监测',
          id: '4',
        },
        {
          name: '稽查督查',
          id: '5',
        },
        {
          name: '其他',
          id: '6',
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
          props: 'type',
        },
        {
          name: '街道',
          props: 'local',
        },
        {
          name: '风险来源',
          props: 'status',
        },
        {
          name: '风险因子',
          props: 'task',
          flex: 2,
        },
      ],
      tableData: [],
      pageSize: 15,
      currentPage: 1,
      total: 0,
    };
  },
  watch: {
    isShow(val) {
      this.currentPage = 1;
      this.searchParams.pointName = '';
      this.searchParams.jd = '';
      this.searchParams.fxly = this.defaultSelected;
      if (val) {
        this.getFXLY_detail();
      }
    },
  },
  mounted() {
    this.tableData = dataSource.slice(0, 15);
    this.total = 20;
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
  methods: {
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
    handleSelect(item) {
      // this.form.keyWord = item.value;
      //   this.searchParams.bumpPointId = item.id
      this.searchItemStored = item;
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.getFXLY_detail();
    },
    search() {
      this.currentPage = 1;
      this.getFXLY_detail();
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
      ];
      switch (this.searchParams.fxly) {
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
                return row.status;
              },
            },
          ];
          break;
        case '行为监测':
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
                return row.status;
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
          ];
          break;
      }
    },
    specialRequest() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        fxbh: this.searchParams.fxbh,
        jd: this.searchParams.jd,
        pointName: this.searchParams.pointName,
      };
      let after1 = dataSource.filter((ele) => {
        if (params.jd) {
          return params.jd.indexOf(ele.local) > -1;
        } else {
          return ele;
        }
      });

      let after2 = after1.filter((ele) => {
        if (params.pointName) {
          return params.pointName.indexOf(ele.type) > -1;
        } else {
          return ele;
        }
      });
      let upMatch = {
        下降: '高-->低',
        上升: '低-->高',
      };
      let after4 = after2.filter((ele) => {
        if (params.fxbh) {
          return upMatch[params.fxbh].indexOf(ele.content) > -1;
        } else {
          return ele;
        }
      });
      let after5 = [];
      if (after4.length >= 15) {
        this.tableData = after4.slice((params.currentPage - 1) * 15, params.currentPage * 15);
        this.total = after4.length;
      } else {
        after5 = after4;
        this.total = after4.length;
        this.tableData = after5;
      }
    },
    getFXLY_detail() {
      this.setValueFormat();
      if (this.searchParams.fxly != '其他') {
        // let data = {
        //   currentPage: this.currentPage,
        //   pageSize: this.pageSize,
        //   fxbh: this.searchParams.fxbh,
        //   fxly: this.searchParams.fxly ? this.searchParams.fxly : '0',
        //   jd: this.searchParams.jd,
        //   pointName: this.searchParams.pointName,
        // };
        let data = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          alarmSource: this.searchParams.fxly,
          bumpPointId: this.searchParams.pointName ? this.searchItemStored.id : '',
          jd: this.searchParams.jd,
        };
        screenV3RiskDataDetails(data).then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            (res.data.data.list || []).forEach((ele) => {
              ele.status = this.searchParams.fxly;
            });
            this.tableData = res.data.data.list || [];
            this.total = res.data.data.total;
          }
        });
      } else {
        this.specialRequest();
      }
      //   get_fxly_detail(params).then(res => {
      // this.tableData = res.data.data.list
      // this.total = res.data.data.total
      //   });
    },
    close() {
      this.$emit('close');
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
          // console.log('lol', res.data)
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
  },
};
</script>

<style lang="less" scoped>
.confxlyItemtainer {
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
    width: 1026px;
    height: 826px;
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
      height: 600px;
    }
    .pagination {
      text-align: center;
    }
  }
}
</style>
