<template>
  <div class="confxybtainer" v-if="isShow">
    <div class="center-container">
      <div class="head">萧山文保{{ dynamicFXTitleYB || '气象' }}风险预告</div>
      <div class="close" @click="close"></div>
      <div class="search-box">
        <div class="search-params">
          <span>文保单位:</span>
          <el-select clearable v-model="searchParams.bumpId" filterable size="mini" placeholder="文物" :style="{ width: `${130 / 192}rem !important` }">
            <el-option v-for="item in bumpPointList" :key="item.publishName" :label="item.publishName" :value="item.publishName"> </el-option>
          </el-select>
          <span>镇街:</span>
          <el-select clearable v-model="searchParams.townId" filterable size="mini" placeholder="镇街" :style="{ width: `${130 / 192}rem !important` }">
            <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
          <!-- <span>风险因子:</span>
          <el-select v-model="searchParams.riskReson" clearable size="mini" placeholder="风险因子" :style="{ width: `${130 / 192}rem !important` }">
            <el-option v-for="item in riskResonList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select> -->
          <!-- <span>风险变化:</span>
          <el-select v-model="searchParams.riskChange" clearable size="mini" placeholder="风险状态" :style="{ width: `${130 / 192}rem !important` }">
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
import { screenV3RiskDataDetails } from '../../../../api/xsApi3.js';
import Table from './component/table';
import { mapState } from 'vuex';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    dynamicFXTitleYB: {
      type: String,
      default: '',
    },
    defaultSelected: {
      type: String,
      default: '',
    },
  },
  components: { Table },
  computed: {
    ...mapState(['temporaryFXSourceYBList']),
  },
  data() {
    return {
      searchParams: {
        bumpId: '',
        townId: '',
        riskChange: '',
      },
      bumpPointList: [],
      streetList: [],
      riskResonList: [
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
          name: '街道',
          props: 'jd',
        },
        // {
        //   name: '风险因子',
        //   props: 'riskYz',
        // },
        // {
        //   name: '风险变化',
        //   props: 'content',
        // },
      ],
      tableData: [
        /*     {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '2',
          riskChange: '高——>低',
          riskYz: '巡查上报',
        },
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '1',
          riskChange: '高——>低',
          riskYz: '巡查上报',
        },
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '3',
          riskChange: '高——>低',
          riskYz: '巡查上报',
        },
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '2',
          riskChange: '高——>低',
          riskYz: '巡查上报',
        },
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '2',
          riskChange: '高——>低',
          riskYz: '巡查上报',
        },
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '2',
          riskChange: '高——>低',
          riskYz: '巡查上报',
        }, */
      ],
      pageSize: 15,
      currentPage: 1,
      total: 0,
    };
  },
  watch: {
    temporaryFXSourceYBList(nval, val) {
      this.tableData = nval.slice(0, 15);
      this.total = nval.length;
    },
    isShow(nval) {
      this.currentPage = 1;
      this.searchParams.bumpId = '';
      this.searchParams.townId = '';
      this.searchParams.riskChange = '';
      //   this.tableData = this.temporaryFXSourceYBList.slice(0, 15);
      //   this.total = this.temporaryFXSourceYBList.length;
      if (nval) {
        this.fetchList();
      }
    },
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
  methods: {
    pageNumChange(val) {
      this.currentPage = val;
      this.fetchList();
    },
    fetchList() {
      /*     let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        riskChange: this.searchParams.riskChange,
        townId: this.searchParams.townId,
        bumpId: this.searchParams.bumpId,
      };
      let after1 = this.temporaryFXSourceYBList.filter((ele) => {
        if (params.townId) {
          return params.townId.indexOf(ele.jd) > -1;
        } else {
          return ele;
        }
      });
      let after2 = after1.filter((ele) => {
        if (params.bumpId) {
          return params.bumpId.indexOf(ele.publishName) > -1;
        } else {
          return ele;
        }
      });
      let upMatch = {
        下降: '高-->低',
        上升: '低-->高',
      };
      let after4 = after2.filter((ele) => {
        if (params.riskChange) {
          return upMatch[params.riskChange].indexOf(ele.content) > -1;
        } else {
          return ele;
        }
      });
      this.tableData = after4.slice((this.currentPage - 1) * 15, this.currentPage * 15);
      this.total = after4.length; */
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        alarmSource: this.defaultSelected,
        bumpPointId: this.searchParams.bumpId,
        tag: this.dynamicFXTitleYB,
        jd: this.searchParams.townId,
      };
      this.resetDataFormat();
      screenV3RiskDataDetails(data).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          //   res.data.data.list.forEach((ele) => {
          //     ele.status = this.searchParams.fxly;
          //   });
          this.tableData = res.data.data.list || [];
          this.total = res.data.data.total;
        }
      });
    },
    resetDataFormat() {
      this.tableColumns = [
        {
          name: '文保单位',
          props: 'bumpPointName',
        },
        {
          name: '街道',
          props: 'jd',
        },
      ];
      switch (this.defaultSelected) {
        case '气象预警':
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'pointName',
            },
            {
              name: '街道',
              props: 'jd',
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
              name: '街道',
              props: 'jd',
            },
          ];
          break;
      }
    },
    search() {
      this.currentPage = 1;
      this.fetchList();
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
.confxybtainer {
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
