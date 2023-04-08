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
            <div class="time">
              <span class="key">预警时间</span>
              <span class="value">：{{item.createTime}}</span>
            </div>
          </div>
          <div class="row2">
            <div class="name">
              <span class="key">位置</span>
              <span class="value">：{{item.locale}}</span>
            </div>
            <div :class="['btn',item.status=='处理中'?'btn-yellow':'btn-green']">{{item.status}}</div>
            
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
import {get_yjcz_list} from '../../../../api/xsApi2'
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
      this.currentPage=1
      switch (this.headText) {
        case '智能感知预警':
          this.currentType = '1'
          break;
        case '设施设备预警':
          this.currentType = '2'
          break;
        case '气象灾害预警':
          this.currentType = '3'
          break;
        case '其他预警':
          this.currentType = '4'
          break;
        default:
          break;
      }
      this.getList()
    },
    headText(val){
      if(!this.isShow) return
      this.currentPage=1
      switch (val) {
        case '智能感知预警':
          this.currentType = '1'
          break;
        case '设施设备预警':
          this.currentType = '2'
          break;
        case '气象灾害预警':
          this.currentType = '3'
          break;
        case '其他预警':
          this.currentType = '4'
          break;
        default:
          break;
      }
      this.getList()
    }
  },
  methods: {
    pageNumChange(val){
      this.currentPage = val
      this.getList()
    },
    getList(){
      let params={
        currentPage:this.currentPage,
        pageSize:this.pageSize,
        type:this.currentType,
        rqlx:this.rqlx
      }
      get_yjcz_list(params).then(res=>{
        console.log('预警处置列表',res.data.data)
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
  top: 400px;
  right: 456px;
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
              width: 50px;
              text-align-last:justify;
              font-family: SourceHanSansCN-Bold;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              color: #f0e4cd;
            }
            .value{
              font-family: SourceHanSansCN-Bold;
              font-size: 16px;
              font-weight: normal;
              letter-spacing: 0px;
              color: #f0e4cd;
            }
          }
          .time{
            height: 100%;
            display: flex;
            align-items: center;
            .key{
              display: inline-block;  
              width: 64px;
              text-align-last:justify;
              font-family: SourceHanSansCN-Bold;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              color: #ffffff;
            }
            .value{
              font-family: SourceHanSansCN-Bold;
              font-size: 16px;
              font-weight: normal;
              letter-spacing: 0px;
              color: #ffffff;
            }
          }
        }
        .row2{
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .name{
            .key{
              display: inline-block;
              width: 50px;
              text-align-last:justify;
              margin-left: 21px;
              font-family: SourceHanSansCN-Regular;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              color: #ffffff;
            }
            .value{
              font-family: SourceHanSansCN-Regular;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #ffffff;
            }
          }
          .btn{
            width: 75px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .btn-yellow{
            background:url('../../../../assets/img3/state1.png') no-repeat center;
            background-size: 100% 100%;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffac71;
          }
          .btn-green{
            background:url('../../../../assets/img3/state2.png') no-repeat center;
            background-size: 100% 100%;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #38ffcb;
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
