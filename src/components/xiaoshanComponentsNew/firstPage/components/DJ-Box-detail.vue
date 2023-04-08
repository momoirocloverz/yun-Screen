<template>
  <div
    class="container"
    v-show="isShow"
  >
    <div class="head-text">{{ headText }}详情（{{peopleName}}）</div>
    <div
      class="close"
      @click="close"
    ></div>
    <div class="body">
      <div class="table">
        <TableC
          :tableColumns="tableColumn_list"
          :tableData="tableData_list"
          :optionList="optionList"
        />
      </div>
      <div class="pagination">
        <el-pagination
          @current-change="pageNumChange"
          :page-size="3"
          :pager-count="5"
          layout="prev, pager, next"
          :total="13"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import TableC from '../../publicComponents/table2'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    headText: {
      type: String,
      default: '护宝志愿者',
    },
    peopleName: {
      type: String,
      default: '',
    },
  },
  components: { TableC },
  data() {
    return {
      tableColumn_list: [
        {
          name: '巡查时间',
          props: 'time',
          requireEllipsis: 100,
          flex: 1.3,
        },
        {
          name: '任务类别',
          props: 'taskType',
          requireEllipsis: 100,
        },
        {
          name: '任务状态',
          props: 'status',
          requireEllipsis: 100,
          withColor: true,
          flex: 0.6,
        },
      ],
      tableData_list: [
        {
          time: '2022-05-14 12:36',
          taskType: '例行检查',
          status: '已完成',
          color: '#77f5b7',
        },
        {
          time: '2022-05-14 12:36',
          taskType: '例行检查',
          status: '未完成',
          color: '#ff4f57',
        },
        {
          time: '2022-05-14 12:36',
          taskType: '例行检查',
          status: '处置中',
          color: '#e9c351',
        },
      ],
      optionList: [
        {
          name: '查看',
          bgImg: require('../../../../assets/img2/g-btn-bg.png'),
          btnWidth: '60px',
          btnHeight: '30px',
        },
      ],
    }
  },
  watch: {
    headText() {},
  },
  methods: {
    pageNumChange() {},
    close() {
      this.$emit('close')
      // this.isShow = false;
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  left: 500px;
  width: 495px;
  height: 331px;
  background: url('../../../../assets/img2/pop-add.png') no-repeat center;
  background-size: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  .head-text {
    width: 100%;
    height: 45px;
    line-height: 50px;
    box-sizing: border-box;
    padding-left: 30px;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #feffff;
    opacity: 0.95;
  }
  .close {
    width: 22px;
    height: 22px;
    position: absolute;
    top: 15px;
    right: 17px;
    cursor: pointer;
  }
  .body {
    width: 97%;
    height: calc(100% - 47px);
    .table {
      width: 100%;
      height: calc(100% - 33px);
    }
    .pagination {
      text-align: right;
    }
  }
}
</style>
