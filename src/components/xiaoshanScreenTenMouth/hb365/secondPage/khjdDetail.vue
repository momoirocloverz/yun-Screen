<template>
  <div class="container" v-if="isShow">
    <div class="center-container" :style="{ opacity: maskOpacity }">
      <div class="head">护保员考核监督详情</div>
      <div class="close" @click="close"></div>
      <div class="basic-info">
        <div class="head-img">
          <!-- <img src="../../../../assets/img4/p-img.png" alt="" /> -->
          <img src="../../../../assets/img4/qiuLuMing.png" alt="" />
        </div>
        <div class="right-info">
          <div class="row">
            <span class="key">姓名：</span>
            <span class="value">田欢乐</span>
          </div>
          <div class="row">
            <span class="key">考核监督：</span>
            <el-rate v-model="getRate" disabled :colors="['#fb9259', '#fb9259', '#fb9259']"> </el-rate>
            <span class="khjg">{{ rate < 60 ? '不达标' : rate >= 60 && rate < 85 ? '达标' : '优秀' }}</span>
            <span class="num">{{ rate }}分</span>
          </div>
        </div>
      </div>
      <div class="search-box">
        <div class="search-params">
          <span>类别: </span>
          <el-select clearable v-model="searchParams.pointName" filterable size="mini" placeholder="类别" :style="{ width: `${130 / 192}rem !important` }">
            <el-option v-for="item in bumpPointList" :key="item.id" :label="item.pointName" :value="item.pointName"> </el-option>
          </el-select>
          <span>考核情况: </span>
          <el-select clearable v-model="searchParams.khqk" filterable size="mini" placeholder="考核情况" :style="{ width: `${130 / 192}rem !important` }">
            <el-option
              v-for="item in [
                { name: '优秀', id: '1' },
                { name: '达标', id: '2' },
                { name: '不达标', id: '3' },
              ]"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
  
        </div>

        <div class="btn-search" @click="search">搜索</div>
      </div>
      <div class="table-box">
        <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true">
          <template slot="khfz" slot-scope="scope">
            <span :style="{ color: scope.row.khfz > 0 ? '#ff3e46' : '#51fda6' }">{{ scope.row.khfz > 0 ? `+${scope.row.khfz}` : scope.row.khfz }}</span>
          </template>
          <template slot="preview" slot-scope="scope">
            <!-- <div style="width: 100%;display: flex; align-items:center;">
              <div class="btn-slot" @click="preview(scope.row)">查看</div>
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
      maskOpacity: 1,
      searchParams: {
        date: [],
        pointName: '',
        khqk: '',
      },
      streetList: [],
      bumpPointList: [
        {
          pointName: '日常巡检',
          id: '1',
        },
        {
          pointName: '隐患上报',
          id: '2',
        },
        {
          pointName: '事件处理',
          id: '3',
        },
      ],
      tableColumns: [
        {
          name: '类别',
          props: 'lb',
        },
        {
          name: '任务要求',
          props: 'yq',
        },

        {
          name: '完成次数',
          props: 'num',
        },
        {
          name: '考核情况',
          props: 'khqk',
        },
        {
          name: '考核分值',
          props: 'khfz',
          withSlot: true,
        },
        {
          name: '操作',
          props: 'preview',
          withSlot: true,
        },
      ],
      tableData: [
        {
          lb: '日常巡检',
          yq: '每月2次',
          num: '2次',
          khqk: '达标',
          khfz: 20,
        },
        {
          lb: '隐患上报',
          yq: '无',
          num: '1次',
          khqk: '无',
          khfz: 5,
        },
        {
          lb: '事件处理',
          yq: '135时效',
          num: '1次',
          khqk: '未达标',
          khfz: -5,
        },
        {
          lb: '日常巡检',
          yq: '每月2次',
          num: '2次',
          khqk: '达标',
          khfz: 20,
        },
        {
          lb: '隐患上报',
          yq: '无',
          num: '1次',
          khqk: '无',
          khfz: 5,
        },
        {
          lb: '事件处理',
          yq: '135时效',
          num: '1次',
          khqk: '未达标',
          khfz: -5,
        },
      ],
      pageSize: 15,
      currentPage: 1,
      total: 6,
      rate: 75,
    };
  },
  computed: {
    getRate() {
      return this.rate / 20;
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
    preview(row) {
      //   console.log(row);
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.getKHJD_detail();
    },
    search() {
      this.currentPage = 1;
      this.getKHJD_detail();
    },
    getKHJD_detail() {
      let params = {};
    },
    close() {
      this.$emit('close');
    },
    // 获取文保点列表
    getBumpPointList() {
      /* if (this.$store.state.hugeListData && this.$store.state.hugeListData.length) {
        this.bumpPointList = this.$store.state.hugeListData;
      } else {
        let params = {
          currentPage: 1,
          pageSize: 600,
        };
        wbd_list2(params).then(res => {
          // console.log("lol", res.data);
          this.bumpPointList = res.data.data.list;
        });
      } */
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
  z-index: 13;
  background: rgba(0, 0, 0, 0);
  .center-container {
    width: 997px;
    height: 866px;
    position: relative;
    background: url('../../../../assets/img4/s-pop-bg.png') no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 12px 45px 35px 60px;
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

    .basic-info {
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 10px;
      .head-img {
        width: 55px;
        height: 65px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right-info {
        width: 777px;
        height: 100%;
        background: url('../../../../assets/img4/t-bg2.png') no-repeat center;
        background-size: 100% 100%;
        display: flex;
        box-sizing: border-box;
        padding: 0 20px 0 40px;
        justify-content: flex-start;
        align-items: center;
        .row {
          display: flex;
          flex-direction: row;
          align-items: center;
          &:nth-child(1) {
            width: 200px;
          }
          .key {
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #a8b0d0;
          }
          .value {
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            font-weight: normal;
            letter-spacing: 0px;
            color: #ffffff;
          }
          .khjg {
            font-family: SourceHanSansCN-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #fb9259;
            margin: 0 10px;
          }
          .num {
            font-family: DINPro-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
      }
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
      height: 580px;
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
