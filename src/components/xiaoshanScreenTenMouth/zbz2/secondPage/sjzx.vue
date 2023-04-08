<template>
  <div class="consjzxtainer" v-if="isShow">
    <div class="center-container">
      <div class="head">事件中心</div>
      <div class="close" @click="close"></div>

      <div class="search-box">
        <div class="search-params">
          <span>文保单位:</span>
          <el-select clearable v-model="searchParams.pointName" filterable size="mini" placeholder="文物" :style="{ width: `${120 / 192}rem !important` }">
            <el-option v-for="item in bumpPointList" :key="item.id" :label="item.publishName" :value="item.publishName"> </el-option>
          </el-select>
          <span>上报员类型:</span>
          <el-select clearable v-model="searchParams.peopleType" filterable size="mini" placeholder="类型" :style="{ width: `${120 / 192}rem !important` }">
            <el-option
              v-for="item in [
                { name: '应急处置员', id: '1' },
                { name: '党员', id: '2' },
                { name: '志愿者', id: '3' },
                { name: '文保员', id: '4' },
                { name: '其他', id: '5' },
              ]"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
          <span>事件状态:</span>
          <el-select clearable v-model="searchParams.status" filterable size="mini" placeholder="状态" :style="{ width: `${120 / 192}rem !important` }">
            <el-option
              v-for="item in [
                { name: '已处理', id: '1' },
                { name: '处理中', id: '0' },
              ]"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span>事件时间:</span>
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
import { get_sjzx_detail } from '../../../../api/xsApi3';
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
      searchParams: {},
      streetList: [],
      bumpPointList: [],

      tableColumns: [
        {
          name: '文保单位',
          props: 'pointName',
          format: (row) => {
            if (row.pointName&&row.pointName.length > 8) {
              return row.pointName.substr(0, 8) + '...';
            } else {
              return row.pointName;
            }
          },
        },
        {
          name: '上报人',
          props: 'userName',
          flex: 1,
        },
        {
          name: '上报人分类',
          props: 'roleName',
          flex: 1,
        },
        {
          props: 'createTime',
          name: '时间',
          flex: 1.2,
        },
        {
          props: 'content',
          name: '事件内容',
          flex: 1.2,
          format: (row) => {
            if (row.content && row.content.length > 8) {
              return row.content.substr(0, 8) + '...';
            } else {
              return row.content;
            }
          },
        },
        {
          name: '事件状态',
          props: 'status',
          flex: 0.7,
        },
        {
          props: 'userName',
          name: '护保员',
          flex: 0.7,
        },
      ],
      tableData: [
        {
          publishName: '务本堂',
          createTime: '2022-10-31 12:05:49',
          people: '胡超',
          peopleType: '志愿者',
          status: '1',
          content: '烟浓度过高，触发烟感报警',
          hby: '田欢乐',
        },
      ],
      pageSize: 15,
      currentPage: 1,
      total: 0,
    };
  },
  mounted() {
    // this.getStreetList();
    this.getBumpPointList();
    this.getSJZX_detail();
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
    pageNumChange(val) {
      this.currentPage = val;
      this.getSJZX_detail();
    },
    search() {
      this.currentPage = 1;
      this.getSJZX_detail();
    },
    getSJZX_detail() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        beginDay: this.searchParams.date ? this.searchParams.date[0] : '',
        endDay: this.searchParams.date ? this.searchParams.date[1] : '',
        sbylx: this.searchParams.peopleType,
        sjzt: this.searchParams.status,
        wbdw: this.searchParams.pointName,
      };
      get_sjzx_detail(params).then((res) => {
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
.consjzxtainer {
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
