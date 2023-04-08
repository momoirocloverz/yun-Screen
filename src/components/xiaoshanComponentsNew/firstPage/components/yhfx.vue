<template>
  <div
    class="container"
    v-if="isShow"
  >
    <div class="head-text">{{ headText }}</div>
    <div
      class="close"
      @click="close"
    ></div>
    <div class="body">
      <div class="list-box">
        <div class="item" v-for="(item,index) in list" :key="index">
          <div class="row1">
            <div class="name">
              <span class="point"></span>
              <span class="key">文物点</span>
              <span class="value">：{{item.pointName}}</span>
            </div>
            <div class="time">{{item.createTime.split(' ')[0]}}</div>
          </div>
          <div class="row2">
            <div class="event">
              <span class="key">事件内容</span>
              <span class="value">：{{item.remark}}</span>
            </div>
            <div class="time">{{item.createTime.split(' ')[1]}}</div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          small
          @current-change="pageNumChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :pager-count="5"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {get_yhfx_list} from '../../../../api/xsApi2'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    headText: {
      type: String,
      default: '默认标题',
    },
    logo: {
      type: String,
      default: '1',
    },
    rqlx:{
      type:String,
      required:true
    }
  },
  components: { },
  data() {
    return {
      list:[],
      currentType:'',
      pageSize:3,
      currentPage:1,
      total:0
    }
  },
  watch:{
    rqlx(){
      if(!this.isShow) return
      switch (this.headText) {
        case '火灾隐患风险':
          this.currentType = '1'
          break;
        case '盗掘盗窃风险':
          this.currentType = '2'
          break;
        case '法人违法风险':
          this.currentType = '3'
          break;
        case '自然灾害风险':
          this.currentType = '4'
          break;
        case '其他':
          this.currentType = '5'
          break;
        default:
          break;
      }
      this.get_yhfx_list()

    },
    headText(val){
      this.currentPage=1
      if(!this.isShow) return
      switch (val) {
        case '火灾隐患风险':
          this.currentType = '1'
          break;
        case '盗掘盗窃风险':
          this.currentType = '2'
          break;
        case '法人违法风险':
          this.currentType = '3'
          break;
        case '自然灾害风险':
          this.currentType = '4'
          break;
        case '其他':
          this.currentType = '5'
          break;
        default:
          break;
      }
      this.get_yhfx_list()
    }
  },
  methods: {
    pageNumChange(val){
      this.currentPage = val
      this.get_yhfx_list()
    },
    get_yhfx_list(){
      let params={
        type:this.currentType,
        currentPage:this.currentPage,
        pageSize:this.pageSize,
        rqlx:this.rqlx
      }
      get_yhfx_list(params).then(res=>{
        console.log('隐患分析列表',res)
        this.total = res.data.data.total
        this.list = res.data.data.list

      })
    },
    close() {
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
  width: 466px;
  height: 261px;
  background: url('../../../../assets/img3/pop-bg.png') no-repeat center;
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
    box-sizing: border-box;
    padding: 10px 10px;
    .list-box{
      width: 100%;
      height: calc(100% - 20px);
      .item{
        width: 100%;
        height: 58px;
        border-bottom: 1px solid rgba(208, 154, 146, .3);
        .row1{
          width: 100%;
          height: 50%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name{
            height: 100%;
            display: flex;
            align-items: center;
            .point{
              display: inline-block;
              width: 5px;
              height: 5px;
              background: #ff9046;
              margin: 0 8px;
            }
            .key{
              display: inline-block;
              width: 65px;
              text-align-last:justify;
              font-family: SourceHanSansCN-Bold;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              color: #ffffff;
            }
            .value{
              width:230px;
              font-family: SourceHanSansCN-Bold;
              font-size: 16px;
              font-weight: normal;
              letter-spacing: 0px;
              color: #ffffff;
              overflow: hidden;//溢出隐藏
              white-space: nowrap;//禁止换行
              text-overflow: ellipsis;//...
            }
          }
          .time{
            height: 100%;
            display: flex;
            align-items: center;
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
        .row2{
          width: 100%;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .event{
            height: 100%;
            display: flex;
            align-items: center;
            .key{
              display: inline-block;
              width: 65px;
              text-align-last:justify;
              margin-left: 21px;
              font-family: SourceHanSansCN-Regular;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              // color: #dba6a1;
              color: #fd5243;
            }
            .value{
              width:230px;
              font-family: SourceHanSansCN-Regular;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #fd5243;
              overflow: hidden;//溢出隐藏
              white-space: nowrap;//禁止换行
              text-overflow: ellipsis;//...
            }
          }
          .time{
            height: 100%;
            display: flex;
            align-items: center;
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
      }
    }
    .pagination{
      text-align: right;
    }
  }
}
</style>
