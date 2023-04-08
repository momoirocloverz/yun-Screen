<template>
  <div class="conkhdctainer" v-if="isShow">
    <div class="center-container" :style="{ opacity: maskOpacity }">
      <div class="head">考核监督详情</div>
      <div class="close" @click="close"></div>
      <div class="search-box">
        <div class="search-params">
          <span>姓名: </span>
          <el-input size="mini" :style="{ width: `${120 / 192}rem !important` }" v-model="searchParams.name" placeholder=""></el-input>
          <span>文保单位: </span>
          <el-select clearable v-model="searchParams.pointName" filterable size="mini" placeholder="文物" :style="{ width: `${120 / 192}rem !important` }">
            <el-option v-for="item in bumpPointList" :key="item.id" :label="item.publishName" :value="item.publishName"> </el-option>
          </el-select>
          <span>镇街: </span>
          <el-select clearable v-model="searchParams.jd" filterable size="mini" placeholder="镇街" :style="{ width: `${120 / 192}rem !important` }">
            <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
          <span>考核情况: </span>
          <el-select clearable v-model="searchParams.khqk" filterable size="mini" placeholder="类型" :style="{ width: `${120 / 192}rem !important` }">
            <el-option
              v-for="item in [
                { name: '优秀', id: '1' },
                { name: '良好', id: '2' },
                { name: '一般', id: '3' },
              ]"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
          <!-- <span>时间: </span>
          <el-select clearable v-model="searchParams.time" filterable size="mini" placeholder="类型" :style="{ width: `${120 / 192}rem !important` }">
            <el-option
              v-for="item in [
                { name: '一周', id: '1' },
                { name: '一个月', id: '2' },
                { name: '半年', id: '3' },
                { name: '全年', id: '4' },
              ]"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select> -->
        </div>
        <div class="btn-search" @click="search">搜索</div>
      </div>
      <div class="table-box">
        <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true">
          <template slot="preview" slot-scope="scope">
            <div style="width: 100%; display: flex; align-items: center">
              <div class="btn-slot" @click="preview(scope.row)">查看</div>
            </div>
          </template>
        </Table>
      </div>
      <div class="pagination">
        <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
      </div>
    </div>
    <KHJDDetail :isShow="isShow_khjd" @close="close_khjd" />
  </div>
</template>
<script>
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
import { get_khjd_detail } from '../../../../api/xsApi3';
import Table from './component/table';
import KHJDDetail from './khjdDetail';
import { formatName, formatPhone } from '@/utils/tools';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: { Table, KHJDDetail },
  data() {
    return {
      maskOpacity: 1,
      searchParams: {
        name: '',
        pointName: '',
        jd: '',
        khqk: '',
      },
      streetList: [],
      bumpPointList: [],
      tableColumns: [
        {
          name: '姓名',
          props: 'userName',
          format: (row) => {
            if (row.userName) {
              return formatName(row.userName);
            } else {
              return '-';
            }
          },
        },
        {
          name: '文保单位',
          props: 'pointName',
          flex: 1.9,
          format: (row) => {
            if (row.pointName && row.pointName.length > 16) {
              return row.pointName.substr(0, 16) + '...';
            } else {
              return row.pointName;
            }
          },
        },
        {
          name: '镇街',
          props: 'jd',
        },
        {
          name: '考核情况',
          props: 'khqk',
          flex: 1,
        },
        {
          name: '考核分值',
          props: 'khfz',
        },
        {
          props: 'preview',
          name: '',
          withSlot: true,
        },
      ],
      tableData: [
        // {
        //   name: '田欢乐',
        //   status: '优秀',
        //   publishName: '务本堂',
        //   jd: '进化镇',
        //   num: '100',
        // },
      ],
      pageSize: 15,
      currentPage: 1,
      total: 0,
      // 二级页面
      isShow_khjd: false,
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
          pointName: '',
          jd: '',
          khqk: '',
        };
        this.getStreetList();
        this.get_khjd_detail();
      }
    },
  },
  methods: {
    pageNumChange(val) {
      this.currentPage = val;
      this.get_khjd_detail();
    },
    search() {
      this.currentPage = 1;
      this.get_khjd_detail();
    },
    get_khjd_detail() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        // beginDay: this.searchParams.time,
        // endDay: this.searchParams.time,
        jd: this.searchParams.jd,
        khqk: this.searchParams.khqk,
        wbdw: this.searchParams.pointName,
        xm: this.searchParams.name,
      };
      get_khjd_detail(params).then((res) => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    close() {
      this.$emit('close');
    },
    // 查看
    preview(row) {
      this.isShow_khjd = true;
      this.maskOpacity = 0;
    },
    close_khjd() {
      this.isShow_khjd = false;
      this.maskOpacity = 1;
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
.conkhdctainer {
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
