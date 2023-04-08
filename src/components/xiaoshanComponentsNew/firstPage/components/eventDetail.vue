<template>
  <div
    class="mask"
    v-show="isShow"
  >
    <div
      class="info-container" 
    >
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">事件详情</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body"
        v-loading="isLoading" 
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >
        <div class="row">
          <span>预警类型：</span>
          <span>{{row.title1||'气象预警'}}</span>
        </div>
        <div class="row row2">
          <span>预警内容：</span>
          <span class="warning-color">{{row.title2||"高温红色预警"}}</span>
        </div>
        <div class="row" v-show="row.title1=='硬件预警'">
          <span>预警位置：</span>
          <span class="warning-color">{{row.value1||""}}</span>
        </div>

        <div class="row-table" v-show="row.title1=='气象预警'">
          <span>预警位置：</span>
          <div class="table">
            <div class="head">
              <div class="span">关联文物</div>
              <div class="span">巡查员</div>
              <div class="span">电话号码</div>
            </div>
            <div class="body">
              <div class="item" v-for="(item,index) in tableData" :key="index">
                <div class="span">{{item.publishName | subString}}</div>
                <div class="span">{{item.xcy}}</div>
                <div class="span">{{item.lxdh}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="pagination" v-show="row.title1=='气象预警'">
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

        <div class="attention-text">
          <span>注意事项：</span>
          <div  v-show="row.title1=='气象预警'">
            气象局发布高温红色预警！<br/>
            请有关文物保护单位按照预案，做好高温应对、防火相关工作。
          </div>
          <div  v-show="row.title1=='硬件预警'">
            硬件预警！<br/>
            请有关文物保护单位按照巡查预案，做好预警应对、排查相关工作。
          </div>
        </div>
        <div class="status">
          <span>处置状态：</span>
          <div class="status-btn">{{status}}</div>
        </div>
        <div class="handle" @click="handle" v-show="status=='未处理'">
          生成例行检查任务
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableC from '../../../mapPublicComponents/table'
import { get_qxDetail,qxyj_handle,yjyj_handle } from '../../../../api/xsApi2'
import {eventBus} from '@/main'


export default {
  components: { TableC },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    logo: String,
    date: String,
    row:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      tableData:[
        {
          publishName:'务本堂'
        }
      ],
      currentPage:1,
      pageSize:5,
      total:0,
      isLoading:false,
      status:''
    }
  },
  mounted() {
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
    logo() {
      let time = setInterval(()=>{
        if(this.date&&this.row.title1=='气象预警'){
          this.get_qxDetail_2()
          clearInterval(time)
        }else if(this.row.title1=='硬件预警'){
          this.status = this.row.statusText
        }
      },100)
      
    },
  },
  filters: {
    subString(val) {
      if (val.length <= 8) {
        return val
      } else {
        let str = val.substr(0, 7) + '...'
        return str
      }
    },
  },
  methods: {
    pageNumChange(val){
      this.currentPage=val
      this.get_qxDetail_2()
    },
    get_qxDetail_2(){
      // 详情分页
      get_qxDetail(this.currentPage,this.pageSize,this.date,'-1').then(res=>{
        console.log('气象预警详情2',res.data.data.qxxqList.list)
        this.tableData = res.data.data.qxxqList.list
        this.total = res.data.data.qxxqList.total
        this.status = res.data.data.statusText
      })
    },
    // 批量处置
    handle(){
      this.isLoading = true
      if(this.row.title1=='气象预警'){
        qxyj_handle(this.date).then(res=>{
          console.log('一键处置气象',res)
          if(res.data.code==200){
            this.isLoading = false
            this.close()
            eventBus.$emit('updateApi')
          }else{
            this.$message.error('处置失败')
          }
        })
      }else if(this.row.title1=='硬件预警'){
        yjyj_handle(this.row.pointId,this.row.id).then(res=>{
          console.log('一键处置硬件',res)
          if(res.data.code==200){
            this.isLoading = false
            this.close()
            eventBus.$emit('updateApi')
          }else{
            this.$message.error('处置失败')
          }
        })
      }
      
    },
    close() {
      eventBus.$emit('clearWarningMarker')
      this.$emit('close')
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
  background: url('../../../../assets/img2/f-dialogs-box.png') no-repeat center;
  background-size: 100%;
  z-index: 999;
  .info-container {
    width: 1299px;
    height: 807px;
    margin-top: 15px;
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
      .title {
        width: 1186px;
        height: 89px;
        background: url('../../../../assets/img2/pop-s-title.png') no-repeat center;
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
            letter-spacing: 5px;
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
        background: url('../../../../assets/img2/-s-ic_guanbi.png');
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
      padding: 0 40px 0 150px;
      padding-top: 8px;
      .row{
        margin-bottom: 10px;
        span{
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #f5fdff;
        }
      }
      .row2{
        .warning-color{
          color:#fa6252;
        }
      }
      .row-table{
        display:flex;
        justify-content: flex-start;
        align-items: flex-start;
        span{
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #f5fdff;
        }
        .table{
          width: 500px;
          max-height: 300px;
          min-height: 88px;
          background: #002e60;
          box-sizing: border-box;
          border: 0.5px solid #0162a6;
          .head{
            width: 100%;
            height: 43px;
            display: flex;
            padding: 0;
            .span{
              flex: 1;
              height: 100%;
              border: 0.5px solid #0162a6;
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: SourceHanSansCN-Medium;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 30px;
              letter-spacing: 1px;
              color: #6bd0ff;
            }
          }
          .body{
            width: 100%;
            height:calc(100% - 43px);
            overflow: auto;
            padding:0;
            .item{
              width: 100%;
              height: 43px;
              display: flex;
              .span{
                flex: 1;
                height: 100%;
                border: 1px solid #0162a6;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: SourceHanSansCN-Medium;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #ffffff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            &::-webkit-scrollbar {
              width: 1px; /*高宽分别对应横竖滚动条的尺寸*/
              height: 1px;
            }

            &::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 2px;
              box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
              background: #77bdff33;
            }

            &::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
              border-radius: 0;
              background: rgba(0, 0, 0, 0.2);
            }
          }
        }
      }
      .pagination{
          width: 400px;
          text-align: right;
          margin: 10px 0 20px 0;
      }
      .attention-text{
        display:flex;
        span{
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #fa6252;
        }
        div{
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #f5fdff;
        }
      }
      .status{
        margin: 20px 0;
        display:flex;
        span{
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #f5fdff;
        }
        .status-btn{
          width: 87px;
          height: 31px;
          background: url('../../../../assets/img3/1.png') no-repeat center;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #f5fdff;
        }
      }
      .handle{
          width: 177px;
          height: 49px;
          background: url('../../../../assets/img3/2.png') no-repeat center;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #f5fdff;
          margin-left: 90px;
          cursor: pointer;
      }
    }
  }
}
</style>
