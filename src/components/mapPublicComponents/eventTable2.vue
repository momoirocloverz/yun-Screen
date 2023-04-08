<template>
  <div
    class="mask"
    v-show="isShow"
    :style="{opacity:maskOpacity}"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">{{ title }}</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
        <div class="search">
          <input
            v-model="searchContent"
            type="text"
            placeholder="搜索"
          />
          <img
            src="../../assets/img2/s-icon@3x.png"
            alt=""
            srcset=""
            @click="search"
          />
        </div>
      </div>
      <div class="body">
        <div class="table">
          <TableC
            :isShowCheck="false"
            :tableColumns="tableColumns"
            :tableData="tableData"
            :optionList="optionList"
            :logo="logo"
            @btnClick="tableBtnClick"
          />
        </div>
        <div class="pagination">
          <el-pagination
            @current-change="pageNumChange"
            :page-size="pageSize"
            :pager-count="7"
            layout="total,prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <TaskProcess
      :isShow="isTaskProcessShow"
      @close="taskprocessClose"
      :logo="logo"
      :info="row"
    />
  </div>
</template>

<script>
import TableC from './table'
import TaskProcess from './taskProcess'
import { xccz, yjcz } from '@/api/xsApi'

export default {
  components: { TableC, TaskProcess },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '隐患处置清单',
    },
  },
  data() {
    return {
      searchContent: '',
      maskOpacity: 1,
      tableColumns: [
        {
          props: 'pointName',
          name: '涉及文物',
          flex: 1.5,
        },
        {
          props: 'jd',
          name: '所属镇街',
        },
        {
          props: 'rectifyStatus',
          name: '任务进度',
        },
        {
          props: 'checkType',
          name: '任务类型',
        },
        {
          props: 'deadLine',
          name: '限期时间',
        },
      ],
      tableData: [],
      optionList: [
        {
          name: '查看',
          bgImg: require('../../assets/img2/l-btn.png'),
        },
        // {
        //   name: '处置',
        //   bgImg: require('../../assets/img2/h-btn.png'),
        // },
      ],
      logo: '1',
      row: {},
      isTaskProcessShow: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  mounted() {
    console.log('klkl', this.isShow)
    // 挂载到body下
    this.$nextTick(() => {
      const body = document.querySelector('body')
      if (body.append) {
        body.append(this.$el)
      } else {
        body.appendChild(this.$el)
      }
    })
  },
  watch: {
    isShow(val) {
      if (!val) return
      this.currentPage = 1
      this.total = 0
      console.log(this.title)
      switch (this.title) {
        case '一网统管任务清单':
          this.tableData = []
          break
        case '巡查处置任务清单':
          this.get_xccz_list()
          break
        case '预警处置任务清单':
          this.get_yjcz_list()
          break
        case '专项治理任务清单':
          this.tableData = []
          break
        case '安全整改':
          this.get_xccz_list()
          break
        case '例行检查':
          this.get_xccz_list()
          break
        default:
          break
      }
    },
  },
  methods: {
    search() {
    //   console.log('kkk', this.searchContent)
    },
    pageNumChange(val) {
      this.currentPage = val
      switch (this.title) {
        case '一网统管任务清单':
          this.tableData = []
          break
        case '巡查处置任务清单':
          this.get_xccz_list()
          break
        case '预警处置任务清单':
          this.get_yjcz_list()
          break
        case '专项治理任务清单':
          this.tableData = []
          break
        case '安全整改':
          this.get_xccz_list()
          break
        case '例行检查':
          this.get_xccz_list()
          break
        default:
          break
      }
    },
    close() {
      this.tableData = []
      this.$emit('close')
    },
    taskprocessClose() {
      console.log('0000000')
      this.maskOpacity = 1
      this.isTaskProcessShow = false
    },
    tableBtnClick(row, btnName) {
      if (btnName === '查看') {
        this.maskOpacity = 0
        this.isTaskProcessShow = true
        this.row = row
        this.logo += '1'
      }
    },
    // 获取巡查处置列表
    get_xccz_list() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        type: '2',
      }
      xccz(params).then((res) => {
        console.log('巡查处置列表', res)
        this.total = res.data.data.total
        this.tableData = res.data.data.list.map((item) => {
          item.deadLine = item.deadLine ? item.deadLine.substr(0, 11) : ''
          if (item.checkType === '安全整改') {
            item.btnArr = ['方案审核', '下派核查', '查看']
          } else if (item.checkType === '例行检查') {
            item.btnArr = ['核查结果', '查看']
          } else {
            item.btnArr = ['查看']
          }
          return item
        })
      })
    },
    // 获取预警处置列表
    get_yjcz_list() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      yjcz(params).then((res) => {
        console.log('预警处置列表', res)
        this.total = res.data.data.total
        this.tableData = res.data.data.list.map((item) => {
          item.deadLine = item.deadLine ? item.deadLine.substr(0, 11) : ''
          item.btnArr = ['查看']
          return item
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/img2/f-dialogs-box.png') no-repeat center;
  background-size: 100%;
  z-index: 999;
  .info-container {
    width: 1299px;
    height: 807px;
    // background: rgba(255, 0, 0, 0.288);
    margin-top: 35px;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 0;
    .head {
      position: relative;
      width: 100%;
      height: 127px;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding-left: 50px;
      //   .title {
      //     width: 395px;
      //     height: 100%;
      //     background: url('../../assets/img2/pop-title-bg.png') no-repeat center;
      //     background-size: 100%;
      //     display: flex;
      //     align-items: flex-start;
      //     justify-content: flex-start;
      //     .top-box {
      //       width: 100%;
      //       height: 50%;
      //       display: flex;
      //       align-items: center;
      //       justify-content: flex-start;
      //       box-sizing: border-box;
      //       padding-left: 40px;
      //       // img{
      //       //     width: 50px;
      //       //     height: 50px;
      //       // }
      //       .text {
      //         font-family: SourceHanSansCN-Bold;
      //         font-size: 30px;
      //         font-weight: 900;
      //         font-stretch: normal;
      //         letter-spacing: 0px;
      //         color: #f5fdff;
      //         margin-left: 20px;
      //         text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
      //         background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
      //         -webkit-background-clip: text;
      //         -webkit-text-fill-color: transparent;
      //       }
      //     }
      //   }
      .title {
        width: 1186px;
        height: 89px;
        background: url('../../assets/img2/pop-s-title.png') no-repeat center;
        background-size: 100%;
        background-position-y: -42px;
        display: flex;
        box-sizing: border-box;
        padding-right: 40px;
        padding-top: 10px;
        align-items: center;
        justify-content: center;
        .top-box {
          width: 555px;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          margin-bottom: 20px;
          .text {
            font-family: SourceHanSansCN-Bold;
            font-size: 30px;
            font-weight: 900;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #f5fdff;
            text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
            background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 34px;
        height: 34px;
        background: url('../../assets/img2/-s-ic_guanbi.png');
        background-size: 100%;
      }
      .search {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 215px;
        height: 34px;
        background-color: #042c68;
        box-shadow: #007294 0px 0px 10px;
        border-radius: 2px;
        border: solid 1px #007294;
        display: flex;
        align-items: center;
        input {
          margin-left: 5px;
          height: 30px;
          border: none;
          width: calc(100% - 34px);
          background: none;
          color: #6bd0ff;
          &:focus {
            box-sizing: border-box;
            width: calc(100% - 30px);
            height: 100%;
            line-height: 34px;
            border: none;
          }
          &:focus-visible {
            box-sizing: border-box;
            width: calc(100% - 30px);
            height: 100%;
            line-height: 34px;
            border: none;
            outline: none;
          }
          &::-webkit-input-placeholder {
            color: rgba(107, 208, 255, 0.5);
          }
        }
        img {
          width: 19px;
          height: 19px;
          margin: 0 5px;
          cursor: pointer;
        }
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 127px);
      box-sizing: border-box;
      padding-top: 8px;
      .table {
        width: 100%;
        height: calc(100% - 50px);
      }
      .pagination {
        text-align: center;
      }
    }
  }
}
</style>
