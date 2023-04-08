<template>
  <div class="container" v-if="isShow">
    <div class="center-container" :style="{ opacity: maskOpacity }">
      <div class="head">护保员详情</div>
      <div class="close" @click="close"></div>

      <div class="basic-info">
        <div class="head-img">
          <!-- <img src="../../../../assets/img4/p-img.png" alt="" /> -->
          <img src="../../../../assets/img4/qiuLuMing.png" alt="" />
        </div>
        <div class="right-info">
          <div class="col">
            <div class="row">
              <div class="point"></div>
              <span class="key">姓名：</span>
              <span class="value">田欢乐</span>
            </div>
            <div class="row">
              <div class="point"></div>
              <span class="key">联系电话：</span>
              <span class="value">13875941573</span>
              <div class="btn" @click="taskDispatch">任务派发</div>
            </div>
            <div class="row">
              <div class="point"></div>
              <span class="key">所属镇街：</span>
              <span class="value">进化镇</span>
            </div>
          </div>
          <div class="col">
            <div class="row">
              <div class="point"></div>
              <span class="key">护保人类型：</span>
              <span class="value">文物巡查员</span>
            </div>
            <div class="row">
              <div class="point"></div>
              <span class="key">考核监督：</span>
              <span class="value kh-value">达标 75分</span>
              <div class="btn" @click="khjd_click">查看</div>
            </div>
            <div class="row">
              <div class="point"></div>
              <span class="key">关联文物：</span>
              <span class="value">二桥书屋、务本堂</span>
            </div>
          </div>
        </div>
      </div>
      <div class="xc-tj">
        <div class="row">
          <span>今年巡查：</span>
          <span>1</span>
          <span>次</span>
        </div>
        <div class="row">
          <span>当月巡查：</span>
          <span>1</span>
          <span>次</span>
        </div>
        <div class="row">
          <span class="time-key">最近巡查时间：</span>
          <span class="time">2023-01-04 14:25:39</span>
        </div>
      </div>

      <div class="search-box">
        <div class="search-params">
          <span>文保单位: </span>
          <el-select clearable v-model="searchParams.pointName" filterable size="mini" placeholder="文物" :style="{ width: `${130 / 192}rem !important` }">
            <el-option v-for="item in bumpPointList" :key="item.id" :label="item.pointName" :value="item.pointName"> </el-option>
          </el-select>
          <span>完成情况: </span>
          <el-select clearable v-model="searchParams.wcqk" filterable size="mini" placeholder="完成情况" :style="{ width: `${130 / 192}rem !important` }">
            <el-option
              v-for="item in [
                { name: '完成', id: '1' },
                { name: '未完成', id: '2' },
              ]"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
          <span>日期: </span>
          <el-date-picker
            clearable
            size="mini"
            v-model="searchParams.date"
            :style="{ width: `${240 / 192}rem !important` }"
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
    <TaskDispatch :isShow="isShow_taskDispatch" @close="close_taskDispatch" />
    <KHJDDetail :isShow="isShow_khjd" @close="close_khjd" />
  </div>
</template>

<script>
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
import {} from '../../../../api/xsApi3';
import Table from './component/tableXL';
import TaskDispatch from '../../components/taskDispatch';
import KHJDDetail from './khjdDetail';

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: { Table, TaskDispatch, KHJDDetail },
  data() {
    return {
      maskOpacity: 1,
      searchParams: {
        pointName: '',
        wcqk: '',
        date: '',
      },
      streetList: [],
      bumpPointList: [],

      tableColumns: [
        {
          name: '时间',
          props: 'time',
        },
        {
          name: '文保单位',
          props: 'publishName',
          format: (row) => {
            if (row.publishName.length > 8) {
              return row.publishName.substr(0, 8) + '...';
            } else {
              return row.publishName;
            }
          },
        },
        {
          name: '要求',
          props: 'yq',
        },

        {
          name: '完成次数',
          props: 'num',
        },
      ],
      tableData: [
        {
          time: '2023/01',
          yq: '每月2次',
          publishName: '务本堂',
          num: '1次',
          detail: [
            {
              img: require('@/assets/img4/xcImg.png'),
              time: '2023-01-04 14:25:39',
            },
          ],
        },
      ],
      pageSize: 15,
      currentPage: 1,
      total: 1,
      // 二级页面
      isShow_taskDispatch: false,
      isShow_khjd: false,
    };
  },
  mounted() {
    this.getStreetList();
    this.getBumpPointList();
    // this.getHBDW_detail();
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
    search() {
      this.currentPage = 1;
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

    // 任务派发
    taskDispatch() {
      this.isShow_taskDispatch = true;
      this.maskOpacity = 0;
    },
    close_taskDispatch() {
      this.isShow_taskDispatch = false;
      this.maskOpacity = 1;
    },
    // 考核监督
    khjd_click() {
      this.isShow_khjd = true;
      this.maskOpacity = 0;
    },
    close_khjd() {
      this.isShow_khjd = false;
      this.maskOpacity = 1;
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
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .head-img {
        width: 79px;
        height: 93px;
        // margin-left: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right-info {
        width: 777px;
        height: 100%;
        background: url('../../../../assets/img4/t-bg.png') no-repeat center;
        background-size: 100% 100%;
        display: flex;
        box-sizing: border-box;
        padding: 0 20px 0 40px;
        justify-content: space-between;
        align-items: center;
        .col {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          .row {
            display: flex;
            flex-direction: row;
            align-items: center;
            .point {
              width: 20px;
              height: 20px;
              background: url('../../../../assets/img4/pot-icon.png') no-repeat center;
              background-size: 100% 100%;
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
            .kh-value {
              color: #fb9259;
            }
            .btn {
              width: 77px;
              height: 25px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #34478c;
              border: 1px solid #8ba4fe;
              font-family: SourceHanSansCN-Regular;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #aec0ff;
              margin-left: 30px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .xc-tj {
      width: 100%;
      height: 38px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: url('../../../../assets/img4/txt-info-bg.png') no-repeat center;
      background-size: 100% 100%;
      margin: 10px 0;
      .row {
        display: flex;
        align-items: center;
        span:nth-child(1) {
          font-family: AdobeHeitiStd-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #a8b0d0;
          margin-top: 5px;
        }
        span:nth-child(2) {
          font-family: DINPro-Medium;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
        span:nth-child(3) {
          font-family: AdobeHeitiStd-Regular;
          font-size: 16px;
          font-weight: normal;
          letter-spacing: 0px;
          color: #a8b0d0;
          margin-left: 8px;
          margin-top: 5px;
        }
        .time-key {
          margin-top: 0 !important;
        }
        .time {
          font-size: 16px !important;
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
      height: 490px;
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
