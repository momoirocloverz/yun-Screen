<template>
  <div class="conwbjjtainer" v-if="isShow">
    <div class="center-container">
      <div class="head">文保基金</div>
      <div class="close" @click="close"></div>
      <div class="tab">
        <div @click="tabClick('1')" :class="['item', currentTab == '1' ? 'item-act' : '']">
          <span>社会捐赠</span>
        </div>
        <div @click="tabClick('2')" :class="['item', currentTab == '2' ? 'item-act' : '']">
          <span>资金申请</span>
        </div>
      </div>
      <div v-show="currentTab == '1'" class="tab-part1">
        <div class="search-box">
          <div class="search-params">
            <span>名称:</span>
            <el-input size="mini" :style="{ width: `${130 / 192}rem !important` }" v-model="searchParams.xxmc" placeholder="名称"></el-input>
            <span>捐赠来源:</span>
            <el-select clearable v-model="searchParams.jzly" filterable size="mini" placeholder="捐赠来源" :style="{ width: `${130 / 192}rem !important` }">
              <el-option
                v-for="item in [
                  { id: '0', name: '个人' },
                  { id: '1', name: '公司' },
                  { id: '2', name: '社会' },
                ]"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <span>捐赠金额:</span>
            <el-select clearable v-model="searchParams.jzje" filterable size="mini" placeholder="捐赠金额" :style="{ width: `${130 / 192}rem !important` }">
              <el-option
                v-for="item in [
                  { id: '0', name: '小于1000' },
                  { id: '1', name: '1000~5000' },
                  { id: '2', name: '大于5000' },
                ]"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="btn-search" @click="search">搜索</div>
        </div>
        <div class="table-box">
          <Table :tableColumns="tableColums" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'">
            <template slot="donateMoney" slot-scope="scope">
              <div class="amountCon">
                <span class="amountValue">
                  {{ scope.row.donateMoney }}
                </span>
                <span class="amountUnit">元</span>
              </div>
            </template>
          </Table>
        </div>
        <div class="pagination">
          <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
        </div>
      </div>
      <div v-show="currentTab == '2'" class="tab-part2">
        <div class="search-box">
          <div class="search-params">
            <span>文保单位:</span>
            <!-- <el-select clearable v-model="searchParams.bumpId" filterable size="mini" placeholder="文物" :style="{ width: `${130 / 192}rem !important` }">
              <el-option v-for="item in bumpPointList" :key="item.id" :label="item.publishName" :value="item.id"> </el-option>
            </el-select> -->
            <el-autocomplete
              class="inline-input"
              v-model="searchParams.bumpId"
              size="mini"
              :fetch-suggestions="querySearch"
              placeholder="文保单位"
              @select="handleSelect"
              :style="{ width: `${120 / 192}rem !important` }"
            ></el-autocomplete>
            <span>镇街:</span>
            <el-select clearable v-model="searchParams.townId" filterable size="mini" placeholder="镇街" :style="{ width: `${130 / 192}rem !important` }">
              <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </div>
          <div class="btn-search" @click="search2">搜索</div>
        </div>
        <div class="list">
          <Table :tableColumns="tableColums2" :tableData="tableData2" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'">
            <template slot="applicationAmount" slot-scope="scope">
              <div class="amountCon">
                <span class="amountValue">
                  {{ scope.row.applicationAmount }}
                </span>
                <span class="amountUnit">元</span>
              </div>
            </template>
          </Table>
        </div>
        <div class="pagination">
          <el-pagination @current-change="pageNumChange2" :current-page="currentPage2" :page-size="pageSize2" :pager-count="5" layout="total, prev, pager, next" :total="total2"> </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
import { get_jzlb_data, get_zjsqlb_data } from '../../../../api/xsApi3';
import Table from './component/table-kgqz';
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
      currentTab: '1',
      searchParams: {},
      bumpPointList: [],
      streetList: [],
      // tab1
      currentPage: 1,
      pageSize: 15,
      tableColums: [
        {
          name: '名称',
          props: 'donateUnit',
          flex: 1.3,
        },
        {
          name: '捐赠来源',
          props: 'source',
        },
        {
          name: '捐赠金额',
          props: 'donateMoney',
          withSlot: true,
        },
        {
          name: '备注',
          props: 'remark',
        },
      ],
      tableData: [],
      total: 0,
      // tab2
      tableColums2: [
        {
          name: '申请单位',
          props: 'pointName',
          flex: 1.3,
        },
        {
          name: '资金用途',
          props: 'fundUse',
        },
        {
          name: '申请金额',
          props: 'applicationAmount',
          withSlot: true,
        },
        {
          name: '申请时间',
          props: 'createTime',
        },
      ],
      tableData2: [],
      currentPage2: 1,
      pageSize2: 15,
      total2: 0,
    };
  },
  mounted() {
    this.getStreetList();
    this.getBumpPointList();
    this.getJZLB_list();
    this.getZJSQ_list();
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
      this.searchItemStored = item;
    },

    tabClick(val) {
      this.currentTab = val;
      this.searchParams = {};
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.getJZLB_list();
    },
    search() {
      this.getJZLB_list();
    },
    // 获取捐赠列表
    getJZLB_list() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      get_jzlb_data(params).then((res) => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    pageNumChange2(val) {
      this.currentPage = val;
      this.getZJSQ_list();
    },
    search2() {
      this.getZJSQ_list();
    },
    // 获取资金申请列表
    getZJSQ_list() {
      let params = {
        currentPage: this.currentPage2,
        pageSize: this.pageSize2,
      };
      get_zjsqlb_data(params).then((res) => {
        this.tableData2 = res.data.data.list;
        this.total2 = res.data.data.total;
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
.conwbjjtainer {
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

    .tab {
      width: 50%;
      height: 42px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // margin-left: 35px;
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

    .tab-part1 {
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
        height: 560px;
      }
      .pagination {
        text-align: center;
      }
    }
    .tab-part2 {
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
      .list {
        width: 100%;
        height: 560px;
      }
      .pagination {
        text-align: center;
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
</style>
