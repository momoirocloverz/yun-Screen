<template>
  <div class="conjypxtainer" v-if="isShow">
    <div class="center-container">
      <div class="head">教育培训详情</div>
      <div class="close" @click="close"></div>
      <div class="search-box">
        <div class="search-params">
          <span>活动名称: </span>
          <el-input size="mini" :style="{ width: `${120 / 192}rem !important` }" v-model="searchParams.name" placeholder=""></el-input>
          <span>培训类别: </span>
          <el-select clearable v-model="searchParams.type" filterable size="mini" placeholder="类别" :style="{ width: `${120 / 192}rem !important` }">
            <el-option v-for="item in [{ name: '消防', id: '1' }]" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
          <span>时间: </span>
          <el-date-picker
            clearable
            size="mini"
            v-model="searchParams.date"
            :style="{ width: `${200 / 192}rem !important` }"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div class="btn-search" @click="search">搜索</div>
      </div>
      <div class="table-box">
        <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true">
          <template slot="preview" slot-scope="scope">
            <!-- <div style="width: 100%;display: flex; align-items:center;">
              <div class="btn-slot">查看</div>
            </div> -->
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
import { get_jypx_detail } from '../../../../api/xsApi3';
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
      searchParams: {
        name: '',
        type: '',
        date: [],
      },
      streetList: [],
      bumpPointList: [],
      tableColumns: [
        {
          name: '活动名称',
          props: 'hdmc',
        },
        {
          name: '培训类别',
          props: 'pxlb',
          format: (row) => {
            if (row.pxlb && row.pxlb.length > 6) {
              return row.pxlb.substr(0, 6) + '...';
            } else {
              return row.pxlb;
            }
          },
        },
        {
          name: '培训内容',
          props: 'pxnr',
          flex: 2,
          format: (row) => {
            if (row.pxnr && row.pxnr.length > 13) {
              return row.pxnr.substr(0, 13) + '...';
            } else {
              return row.pxnr;
            }
          },
        },
        {
          name: '参与人数',
          props: 'cyrs',
          flex: 0.7,
        },
        {
          name: '时间',
          props: 'createTime',
          flex: 1.3,
        },
        {
          props: 'preview',
          name: '',
          withSlot: true,
        },
      ],
      tableData: [],
      pageSize: 15,
      currentPage: 1,
      total: 0,
    };
  },
  mounted() {
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
    isShow(val) {
      if (val) {
        this.currentPage = 1;
        this.searchParams = {
          name: '',
          type: '',
          date: [],
        };
        this.getStreetList();
        this.getJYPX_detail();
      }
    },
  },
  methods: {
    pageNumChange(val) {
      this.currentPage = val;
      this.getJYPX_detail();
    },
    search() {
      this.currentPage = 1;
      this.getJYPX_detail();
    },
    getJYPX_detail() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        beginDay: this.searchParams.date ? this.searchParams.date[0] : '',
        endDay: this.searchParams.date ? this.searchParams.date[1] : '',
        hdmc: this.searchParams.name,
        pxlb: this.searchParams.type,
      };
      get_jypx_detail(params).then((res) => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    close() {
      this.$emit('close');
    },
    getBumpPointList() {
      let params = {
        currentPage: 1,
        pageSize: 600,
      };
      //   wbd_list62(params).then(res => {
      //     // console.log("lol", res.data);
      //     this.bumpPointList = res.data.data.list;
      //   });
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
.conjypxtainer {
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
      .btn-slot {
        width: 60px;
        height: 24px;
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
    .pagination {
      text-align: center;
    }
  }
}
</style>
