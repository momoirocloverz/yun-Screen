<template>
  <div class="container" v-if="isShow">
    <div class="center-container">
      <div class="head">萧山文保健康综合指数</div>
      <div class="close" @click="close"></div>

      <div class="search-box">
        <span>文保单位:</span>
        <el-select clearable v-model="searchParams.bumpId" filterable size="mini" placeholder="文物" :style="{ width: `${180 / 192}rem !important` }">
          <el-option v-for="item in bumpPointList" :key="item.id" :label="item.publishName" :value="item.id"> </el-option>
        </el-select>
        <span>镇街:</span>
        <el-select clearable v-model="searchParams.townId" filterable size="mini" placeholder="镇街" :style="{ width: `${180 / 192}rem !important` }">
          <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
        <span>护保员:</span>
        <el-input v-model="searchParams.name" size="mini" :style="{ width: `${180 / 192}rem !important` }" placeholder="护保员名字"></el-input>
        <span>风险等级:</span>
        <el-select v-model="searchParams.level" clearable size="mini" placeholder="等级" :style="{ width: `${180 / 192}rem !important` }">
          <el-option v-for="item in riskTypeList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
        <span>风险状态:</span>
        <el-select v-model="searchParams.riskStatus" clearable size="mini" placeholder="风险状态" :style="{ width: `${180 / 192}rem !important` }">
          <el-option v-for="item in riskStatusList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
        </el-select>
      </div>
      <div class="table-box">
        <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'">
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
  </div>
</template>

<script>
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
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
          props: 'pointName',
        },
        {
          name: '街道',
          props: 'street',
        },
        {
          name: '地址',
          props: 'address',
          flex: 1.2,
        },
        {
          name: '护保员',
          props: 'name',
          format: (row) => {
            if (row.name.length >= 3) {
              return row.name.substr(0, 1) + ' * ' + row.name.substr(2);
            } else if (row.name.length == 2) {
              return row.name.substr(0, 1) + ' * ';
            }
          },
        },
        {
          name: '风险分值',
          props: 'riskNum',
        },
        {
          name: '风险等级',
          props: 'riskLevel',
          withSlot: true,
        },
        {
          name: '风险状态',
          props: 'riskStatus',
        },
        {
          name: '风险因子',
          props: 'riskYz',
        },
      ],
      tableData: [
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '2',
          riskStatus: '高——>低',
          riskYz: '巡查上报',
        },
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '1',
          riskStatus: '高——>低',
          riskYz: '巡查上报',
        },
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '3',
          riskStatus: '高——>低',
          riskYz: '巡查上报',
        },
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '2',
          riskStatus: '高——>低',
          riskYz: '巡查上报',
        },
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '2',
          riskStatus: '高——>低',
          riskYz: '巡查上报',
        },
        {
          pointName: '务本堂',
          street: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          riskLevel: '2',
          riskStatus: '高——>低',
          riskYz: '巡查上报',
        },
      ],
      pageSize: 15,
      currentPage: 1,
      total: 0,
    };
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
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
  background: rgba(0, 0, 0, 0.7);
  .center-container {
    width: 1526px;
    height: 914px;
    position: relative;
    background: url('../../../../assets/img4/pop-bg.png') no-repeat center;
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
      justify-content: space-around;
      box-sizing: border-box;
      margin-left: 10px;
      // border-bottom: 1px solid rgba(92, 194, 212, 0.3);
      span {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #f5fdff;
        margin-left: 20px;
      }
    }
    .table-box {
      width: 100%;
      height: 700px;
    }
    .pagination {
      text-align: center;
    }
  }
}
</style>
