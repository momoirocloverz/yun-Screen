<template>
  <div class="conaqzstainer" v-if="isShow">
    <div class="center-container">
      <div class="head">萧山文保安全指数</div>
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
            :style="{ width: `${180 / 192}rem !important` }"
          ></el-autocomplete>
          <!-- <el-select clearable v-model="searchParams.pointName" filterable size="mini" placeholder="文物" :style="{ width: `${180 / 192}rem !important` }">
            <el-option v-for="item in bumpPointList" :key="item.id" :label="item.publishName" :value="item.publishName"> </el-option>
          </el-select> -->
          <span>镇街: </span>
          <el-select clearable v-model="searchParams.jd" filterable size="mini" placeholder="镇街" :style="{ width: `${180 / 192}rem !important` }">
            <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
        </div>
        <div class="btn-search" @click="search">搜索</div>
      </div>
      <div class="table-box">
        <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true">
          <template slot="content" slot-scope="scope">
            <div style="width: 100%; display: flex; align-items: center">
              <img
                :style="{
                  width: `${19 / 192}rem`,
                  height: `${17 / 192}rem`,
                  marginRight: '5px',
                }"
                v-show="scope.row.content == '三级'"
                src="../../../../assets/img4/l-icon@3x.png"
                alt=""
                srcset=""
              />
              <span v-show="scope.row.content == '三级'" style="color: #4bfffe">低</span>
              <img
                :style="{
                  width: `${19 / 192}rem`,
                  height: `${17 / 192}rem`,
                  marginRight: '5px',
                }"
                v-show="scope.row.content == '二级'"
                src="../../../../assets/img4/c-icon@3x.png"
                alt=""
                srcset=""
              />
              <span v-show="scope.row.content == '二级'" style="color: #ffe082">中</span>
              <img
                :style="{
                  width: `${19 / 192}rem`,
                  height: `${17 / 192}rem`,
                  marginRight: '5px',
                }"
                v-show="scope.row.content == '一级'"
                src="../../../../assets/img4/h-icon@3x.png"
                alt=""
                srcset=""
              />
              <span v-show="scope.row.content == '一级'" style="color: #ff3e46">高</span>
            </div>
          </template>
        </Table>
      </div>
      <div class="pagination">
        <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
import { get_aqzs_detail } from '../../../../api/xsApi3.js';
import Table from './component/table';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: { Table },
  data() {
    return {
      searchItemStored: {},
      searchParams: {
        pointName: '',
        jd: '',
      },
      bumpPointList: [],
      streetList: [],
      riskTypeList: [
        {
          name: '高风险',
          id: '3',
        },
        {
          name: '中风险',
          id: '2',
        },
        {
          name: '低风险',
          id: '1',
        },
      ],
      riskStatusList: [
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
          name: '风险等级',
          props: 'content',
          withSlot: true,
        },
      ],
      tableData: [
        /*  {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          content: '2',
          riskStatus: '高——>低',
          riskYz: '巡查上报',
        },
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          content: '1',
          riskStatus: '高——>低',
          riskYz: '巡查上报',
        }, */
      ],
      pageSize: 15,
      currentPage: 1,
      total: 0,
    };
  },
  mounted() {
    this.getStreetList();
    this.getBumpPointList();
    // this.getAQZS_detail();
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
    isShow(nval) {
      this.searchParams.pointName = '';
      this.searchParams.jd = '';
      this.currentPage = 1;
      if (nval) {
        this.getAQZS_detail();
      }
    },
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
      this.searchItemStored = item;
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.getAQZS_detail();
    },
    search() {
      this.getAQZS_detail();
    },
    getAQZS_detail() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        jd: this.searchParams.jd,
        pointName: this.searchParams.pointName,
      };
      get_aqzs_detail(params).then((res) => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
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
  },
};
</script>
<style lang="less" scoped>
.conaqzstainer {
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
      margin-left: 10px;
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
