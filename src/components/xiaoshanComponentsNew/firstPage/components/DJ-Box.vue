<template>
  <div
    class="container"
    v-show="isShow"
  >
    <div class="head-text">{{ headText }}列表</div>
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
          :hasIndex="false"
          @BtnClick="btnClick"
        />
      </div>
      <div class="pagination">
        <el-pagination
          @current-change="pageNumChange"
          :page-size="10"
          :pager-count="5"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <DJBoxDetail
      :isShow="djBoxDetailShow"
      :headText="headText"
      :peopleName="currentClickMan"
      @close="djBoxDetailClose"
    />
  </div>
</template>

<script>
import TableC from '../../publicComponents/table2'
import DJBoxDetail from './DJ-Box-detail'

import { yywby } from '../../../../api/xsApi'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    headText: {
      type: String,
      default: '',
    },
  },
  components: { TableC, DJBoxDetail },
  data() {
    return {
      tableColumn_list: [
        {
          name: '姓名',
          props: 'userName',
          requireEllipsis: 100,
          flex: 0.7,
        },
        {
          name: '负责文物',
          props: 'pointName',
          requireEllipsis: 5,
          flex: 1.3,
        },
        {
          name: '本月巡查次数',
          props: 'times',
          requireEllipsis: 100,
          flex: 1.4,
        },
        {
          name: '联系电话',
          props: 'mobile',
          requireEllipsis: 100,
          flex: 1.2,
        },
      ],
      tableData_list: [
        // {
        //   name: "张三",
        //   pointName: "务本堂",
        //   phone: "13956231456",
        //   times: 12
        // },
        // {
        //   name: "李四",
        //   pointName: "许家南大房",
        //   phone: "13956231456",
        //   times: 19
        // },
        // {
        //   name: "赵子龙",
        //   pointName: "葛云飞墓",
        //   phone: "13956231456",
        //   times: 16
        // }
      ],
      optionList: [
        {
          name: '详情',
          bgImg: require('../../../../assets/img2/g-btn-bg.png'),
          btnWidth: '60px',
          btnHeight: '30px',
        },
      ],

      djBoxDetailShow: false,
      currentClickMan: '',
      currentPage: 1,
      total: 0,
    }
  },
  watch: {
    headText(val) {
      if (val === '文物巡查员') {
        this.get_yywby_data()
      } else {
        this.tableData_list = []
        this.total = 0
      }
    },
  },
  mounted() {},
  methods: {
    pageNumChange(val) {
      console.log('分页', val)
      this.currentPage = val
      if (this.headText === '文物巡查员') {
        this.get_yywby_data()
      } else {
        this.tableData_list = []
        this.total = 0
      }
    },
    get_yywby_data() {
      let params = {
        currentPage: this.currentPage,
        pageSize: 10,
      }
      yywby(params).then((res) => {
        console.log('业余文保员', res.data.data)
        this.tableData_list = res.data.data.list
        this.total = res.data.data.total
      })
    },
    btnClick(row, btnName) {
      this.djBoxDetailShow = true
      this.currentClickMan = row.userName
    },
    djBoxDetailClose() {
      this.djBoxDetailShow = false
    },
    close() {
      this.djBoxDetailShow = false
      this.$emit('close')
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  left: 456px;
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
