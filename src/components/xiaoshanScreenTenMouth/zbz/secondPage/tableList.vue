<template>
  <div class="container" v-if="isShow">
    <div class="center-container">
      <div class="head">{{ logo2 }}{{ logo1 }}</div>
      <div class="close" @click="close"></div>
      <div class="table-box">
        <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true">
          <template slot="preview" slot-scope="scope">
            <div style="width: 100%; display: flex; align-items: center">
              <div class="btn-slot" @click="taskDispatch(scope.row)">查看</div>
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
import {} from '@/api/xsApi3.js';
import Table from './component/tablelist';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    logo1: {
      type: String,
      default: '',
    },
    logo2: {
      type: String,
      default: '',
    },
  },
  components: { Table },
  data() {
    return {
      bumpPointList: [],
      streetList: [],
      tableColumns: [
        {
          name: '文保单位',
          props: 'userName',
          flex: 1.1,
          format: (row) => {
            if (row.bumpPointName) {
              return row.bumpPointName;
            } else {
              return '-';
            }
          },
        },
        {
          name: '设备名称',
          props: 'alarmSource',
          format: (row) => {
            if (row.alarmSource) {
              return row.alarmSource;
            } else {
              return '-';
            }
          },
        },
        {
          name: '设备编号',
          props: 'tag',
          format: (row) => {
            if (row.tag) {
              return row.tag;
            } else {
              return '-';
            }
          },
        },
        {
          name: '设备类型',
          props: 'tag1',
          format: (row) => {
            if (row.tag1) {
              return row.tag1;
            } else {
              return '-';
            }
          },
        },
        {
          name: '预警状态',
          props: 'warningTime',
          format: (row) => {
            if (row.warningTime) {
              return row.warningTime;
            } else {
              return '-';
            }
          },
        },
        {
          name: '预警次数',
          props: 'itype',
        },
        {
          name: '最近预警时间',
          props: 'time',
        },
        {
          name: '操作',
          props: 'preview',
          withSlot: true,
        },
      ],
      tableData: [
        {
          tag1: '121',
        },
      ],
      pageSize: 15,
      currentPage: 1,
      total: 0,
    };
  },
  mounted() {
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
    isShow(nval, val) {
      this.currentPage = 1;
      this.total = 0;
      this.$nextTick(() => {
        if (nval) {
          this.getListData();
        }
      });
    },
  },
  computed: {},
  methods: {
    taskDispatch(item) {
      //
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.getListData();
    },
    getListData() {},
    close() {
      this.$emit('close');
      this.tableData = [];
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
  background: rgba(0, 0, 0, 0.7);

  .center-container {
    width: 1400px;
    height: 826px;
    position: relative;
    background: url('@/assets/img4/s-pop-bg.png') no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 12px 35px 35px 35px;

    .close {
      width: 54px;
      height: 53px;
      position: absolute;
      top: 0px;
      right: 0px;
      background: url('@/assets/img4/close.png') no-repeat center;
      background-size: 100% 100%;
      cursor: pointer;
    }

    .head {
      width: 100%;
      height: 79px;
      background: url('@/assets/img4/pop-title.png') no-repeat center;
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
