<template>
  <div
    class="container"
    v-if="isShow"
  >
    <div class="head-text">风险态势详情</div>
    <div
      class="close"
      @click="close"
    ></div>
    <div class="body">
      <div class="title">
        <img src="../../../../assets/img3/s-title.png" alt="" srcset="">
        <span class="text">事件</span>
      </div>
      <div class="evnet-table">
        <scrollTable :tableData="tableData_event" :tableColumns="tableColumns_event">
          <template slot="checkName" slot-scope="scope">
            <span style="color:#f85e4e;">{{scope.row.checkName}}</span>
          </template>
        </scrollTable>
      </div>
      <div class="title">
        <img src="../../../../assets/img3/s-title.png" alt="" srcset="">
        <span class="text">评级</span>
      </div>
      <div class="pj-table">
        <scrollTable :tableData="tableData_pj" :tableColumns="tableColumns_pj">
          <template slot="maxLevel" slot-scope="scope">
            {{scope.row.maxLevel&&scope.row.maxLevel.split('(')[0]+'('}}<span :style="{'color':scope.row.maxLevel&&scope.row.maxLevel.split('(')[0]=='一级'?'#f85e4e':scope.row.maxLevel&&scope.row.maxLevel.split('(')[0]=='二级'?'#e5b55b':'#90ffad'}">{{scope.row.maxLevel&&scope.row.maxLevel.split('(')[1].split(')')[0]}}</span>{{')'}}
          </template>
        </scrollTable>
      </div>
    </div>
  </div>
</template>

<script>
import { get_fxts_event_list,get_fxts_pj_list} from '../../../../api/xsApi2'

import scrollTable from './scroll-table-2.vue'; 
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
  components: { scrollTable },
  data() {
    return {
      tableColumns_event:[
        {
          props:'checkName',
          name:'事件',
          withSlot:true
        },
        {
          props:'pointName',
          name:'文物信息',
        },
        {
          props:'createTime',
          name:'发生时间',
          format:(row)=>{
            return row.createTime.split(' ')[0]
          }
        },
        {
          props:'deviceName',
          name:'发生地点',
          format:(row)=>{
            if(row.deviceName.length>6){
              return row.deviceName.substr(0,5)+'...'
            }else{
              return row.deviceName
            }
          }
        },
      ],
      tableData_event:[
        {
          eventName:'高温预警',
          publishName:'平阳宗祠',
          time:'22/09/02',
          address:'东南角第二厢房'
        }
      ],
      tableColumns_pj:[
        {
          props:'maxLevel',
          name:'综合评价',
          withSlot:true
        },
        {
          props:'pointName',
          name:'文物信息',
        },
        {
          props:'gradeUserTime',
          name:'评级时间',
          format:(row)=>{
            return row.gradeUserTime.split(' ')[0]
          }
        },
        {
          props:'gradeUserName',
          name:'评级专家',
          format:(row)=>{
            if(row.gradeUserName.length>6){
              return row.gradeUserName.substr(0,5)+'...'
            }else{
              return row.gradeUserName
            }
          }
        },
      ],
      tableData_pj:[
        {
          zhpj:'一级',
          publishName:'平阳宗祠',
          time:'22/09/02',
          pjzj:'李白'
        }
      ]
    }
  },
  watch:{
    isShow(val){
      if(!val) return
      this.getEventList()
      this.getPjList()
    }
  },
  methods: {
    // 获取事件列表
    getEventList(){
      let params={
        currentPage:1,
        pageSize:100,
        rqlx:this.rqlx
      }
      get_fxts_event_list(params).then(res=>{
        console.log('风险态势事件列表',res.data.data.list)
        this.tableData_event = res.data.data.list
      })
    },
    // 获取评级列表
    getPjList(){
      let params={
        currentPage:1,
        pageSize:100,
        rqlx:this.rqlx
      }
      get_fxts_pj_list(params).then(res=>{
        console.log('风险态势评级列表',res.data.data.list)
        this.tableData_pj = res.data.data.list
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
  width: 494px;
  height: 471px;
  background: url('../../../../assets/img3/pop-add-bg.png') no-repeat center;
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
    padding: 5px 10px;
    box-sizing: border-box;
    .title{
      width: 100%;
      height: 36px;
      display:flex;
      align-items: center;
      img{
        width: 36px;
        height: 36px;
      }
      .text{
        font-family: SourceHanSansCN-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .evnet-table{
      width: 100%;
      height: 150px;
    }
    .pj-table{
      width: 100%;
      height: 180px;
    }
  }
}
</style>
