<template>
  <div class="box">
    <img src="../../../assets/img3/title-left1.png" alt="" srcset=""/>
    <TitleBox
      :title="'健康指数'"
      :imgSrc="require('../../../assets/img3/icon1.png')"
    >
      <div style="width:96px;height:29px;position: absolute;right: 10px;top: 15%;background:#0A2F5E;">
        <el-select
          v-model="currentSelect_1"
          size="mini"
          placeholder="月份"
          style="width:96px;"
          @change="fxts_rq_change"
        >
          <el-option
            v-for="item in selectOPtion_1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </TitleBox>
    <div class="first-echart">
      <div class="tj">
        <div
          class="item"
          v-for="(item,index) in level_tj"
          :key="index"
        >
          <img
            :src="item.imgSrc"
            alt=""
            srcset=""
          >
          <div class="info">
            <div class="top">
             <countTo :startVal='startVal' :endVal='item.num*1' :duration='3000'></countTo>

              <span>{{item.unit}}</span>
            </div>
            <div class="bottom">{{item.name}}</div>
          </div>
        </div>
      </div>
      <!-- <div class="load-process">
        
        <div class="load-bg">
          <img src="../../../assets/img3/txt1.png" :style="{left:`${arrowLeft1/192}rem`}" alt="" srcset="">
          <img src="../../../assets/img3/txt2.png" :style="{left:`${arrowLeft2/192}rem`}" alt="" srcset="">
          <img src="../../../assets/img3/txt3.png" :style="{left:`${arrowLeft3/192}rem`}" alt="" srcset="">
          
          <div class="text text1" :style="{left:`${arrowLeft1/192}rem`}">
            <span style="color:#ff3b30;">{{level_tj[0].num}}</span>
            <span>{{level_tj[0].unit}}</span>
          </div>
          <div class="text text1" :style="{left:`${arrowLeft2/192}rem`}">
            <span style="color:#e5b55b">{{level_tj[1].num}}</span>
            <span>{{level_tj[1].unit}}</span>
          </div>
          <div class="text text1" :style="{left:`${arrowLeft3/192}rem`}">
            <span style="color:#90ffad;">{{level_tj[2].num}}</span>
            <span>{{level_tj[2].unit}}</span>
          </div>
        </div>
        
      </div> -->
      <div class="line">
        <EchartsLine
          :chartData_1="chartData_1_1"
          :chartData_2="chartData_1_2"
          :firstColor="'#f64f07'"
          :secondColor="'#22d1a4'"
          :legendText="['升级','降级']"
          :logo="logo_1"
          @clickLine="clickLine"
        />
      </div>
      <FXTS
        :isShow="isShow_fxts"
        :headText="headText_fxts"
        :rqlx ="currentSelect_1"
        @close="close_fxts"
      />
    </div>
    <TitleBox
      :title="'文物巡查'"
      :imgSrc="require('../../../assets/img3/icon2.png')"
    >
      <div style="width:96px;height:29px;position: absolute;right: 10px;top: 15%;background:#0A2F5E;">
        <el-select
          v-model="currentSelect_2"
          size="mini"
          placeholder="月份"
          style="width:96px;"
          @change="wwxc_rq_change"
        >
          <el-option
            v-for="item in selectOPtion_1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </TitleBox>
    <div class="second-echart">
      <div class="tj">
        <div class="item item-0">
          <div class="top">
            <span>
              <countTo :startVal='startVal' :endVal='check_tj[0].num*1' :duration='3000'></countTo>
            </span>
            <!-- <span>次</span> -->
          </div>
          <div class="bottom">{{check_tj[0].name}}</div>
        </div>
        <div class="item item-1">
          <div class="top">
            <span>
              <countTo :startVal='startVal' :endVal='check_tj[1].num*1' :duration='3000'></countTo>
              <!-- {{check_tj[1].num}} -->
            </span>
            <!-- <span>次</span> -->
          </div>
          <div class="bottom">{{check_tj[1].name}}</div>
        </div>
        <div class="item item-2">
          <div class="top">
            <span>
              <countTo :startVal='startVal' :endVal='check_tj[2].num*1' :duration='3000'></countTo>
              <!-- {{check_tj[2].num}} -->
            </span>
            <!-- <span>次</span> -->
          </div>
          <div class="bottom">{{check_tj[2].name}}</div>
        </div>
        <div class="item item-3">
          <div class="top">
            <span>
              <countTo :startVal='startVal' :endVal='check_tj[3].num*1' :duration='3000'></countTo>
              <!-- {{check_tj[3].num}} -->
            </span>
            <!-- <span>次</span> -->
          </div>
          <div class="bottom">{{check_tj[3].name}}</div>
        </div>
        <div class="item item-4">
          <div class="top">
            <span>{{check_tj[4].num}}</span>
            <!-- <span>次</span> -->
          </div>
          <div class="bottom">{{check_tj[4].name}}</div>
        </div>
      </div>
      <!-- <div class="line">
        <EchartsLine2
          :chartData_1="chartData_2_1"
          :chartData_2="chartData_2_2"
          :chartData_3="chartData_2_3"
          :chartData_4="chartData_2_4"
          :firstColor="'#2BD5F2'"
          :secondColor="'#3BCDB4'"
          :thirdColor="'#ECA976'"
          :forthColor="'#1EAAFB'"
          :legendText="['党员','志愿者','文物巡查员','其他']"
          :logo="logo_2"
        />
      </div> -->
      <div class="scroll-table">
        <ScrollTable :logo="logo_2" :tableData="tableData_wwxc" :tableColumns="tableColumn_wwxc" @table_row_mouseenter="scrollRowClick" @table_row_mouseleave="scrollRowLeave"/>
      </div>
    </div>
    <TitleBox
      :title="'隐患分析'"
      :imgSrc="require('../../../assets/img3/icon3.png')"
    >
      <div style="width:96px;height:29px;position: absolute;right: 10px;top: 15%;">
        <el-select
          v-model="currentSelect_3"
          size="mini"
          placeholder="月份"
          style="width:96px;"
          @change="yhfx_rq_change"
        >
          <el-option
            v-for="item in selectOPtion_1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </TitleBox>
    <div class="third-echart">
      <div class="pie">
        <HeighChart
          :dataitems="chartData_3_1"
          :logo="logo_3"
          :colors="chartColor"
        />
        <div class="legend">
          <div
            class="item"
            v-for="(item,index) in chartData_3_1"
            :key="index"
            @click="legendClick(item)"
          >
            <span
              class='icon'
              :style="{background:chartColor[index]}"
            ></span>
            <span :class="['name',currentLegend===item.name?'name-active':'']">{{item.name}}</span>
            <span :class="['rate',currentLegend===item.name?'name-active':'']">{{(parseFloat(item.num*1/totalNUm)*100).toFixed(1)}}%</span>
            <img v-if="item.num*1-10<0&&index!==0" src="../../../assets/img3/g-arrow-up.png" alt="" srcset="">
            <img v-else src="../../../assets/img3/r-arrow-up.png" alt="" srcset="">
          </div>
        </div>
      </div>
      <YHFX
        :isShow="isShow_yhfx"
        :headText="headText_yhfx"
        :logo="logo_yhfx"
        :rqlx ="currentSelect_3"
        @close="close_yhfx"
      />
    </div>
    <TitleBox
      :title="'隐患高发'"
      :imgSrc="require('../../../assets/img3/icon4.png')"
    >
      <div style="width:160px;height:29px;position: absolute;right: 10px;top: 14%;display:flex;justify-content:center;">
        <div
          :class="['title-btn',currentType==1?'active-title-btn':'']"
          style="margin-right:5px;"
          @click="titleBtnClick(1)"
        >镇街</div>
        <div
        :class="['title-btn',currentType==2?'active-title-btn':'']"
          @click="titleBtnClick(2)"
        >文保单位</div>
      </div>
    </TitleBox>
    <div class="forth-echart">
      <!-- <div class="bar">
        <EchartsBar2d
          :chartData="chartData_4_1"
          :logo="logo_4"
          :startColor="'#62D5EF'"
          :endColor="'#FF3600'"
          :backgroundColor="'rgba(0,100,255,0.15)'"
          :maxNum="maxNum"
        />
        <div class="num">
          <span
            v-for="(item,index) in chartData_4_1_reverse"
            :key="index"
          >{{item.value}}</span>
        </div>
      </div> -->
      <vue-seamless-scroll :data="chartData_4_1_reverse"  class="auto-scorll-table" :class-option="optionSingleHeight">
        <div :class="['item',index==0?'first-row':'']" v-for="(item,index) in chartData_4_1_reverse" :key="index">
          <div class="index" :style="{'color':currentType==1?'#e26636':'#1bdaff'}">NO.{{index+1}}</div>
          <div class="name">{{item.name}}</div>
          <Process :outWidth="`${220/192}rem`" :outHeight="`${7/192}rem`" :maxNum="maxNum" :currentNum="item.value*1" :index="currentType"/>
          <div class="num">{{item.value}}</div>
        </div>
      </vue-seamless-scroll>
      

    </div>
  </div>
</template>

<script>
import TitleBox from '../publicComponents/titleBoxNew'
import EchartsBar from './components/echartBarNormal'
import EchartsBar2d from './components/echartBar2D'
import EchartsPie from './components/echartPie'
import EchartsLine from './components/echartLine'
import EchartsLine2 from './components/echartLine2'
import EchartsPie2 from './components/echartPie2'
import HeighChart from './components/highchart'
import ScrollTable from './components/scroll-table'
import Process from './components/process'

import YHFX from './components/yhfx'
import FXTS from './components/fxts'


import countTo from 'vue-count-to'

import { eventBus } from '@/main'

// api接口
import { get_fxts, get_wwxc, get_yhfx, get_yhgf } from '../../../api/xsApi2'
import { wbd_list2 } from '../../../api/xsApi'


let timer;

export default {
  name: '',
  components: {
    TitleBox,
    EchartsBar,
    EchartsBar2d,
    EchartsPie,
    EchartsLine,
    EchartsLine2,
    EchartsPie2,
    HeighChart,
    YHFX,
    ScrollTable,
    Process,
    FXTS,
    countTo
  },
  data() {
    return {
      startVal:0,
      selectOPtion_1: [
        {
          label: '近30日',
          value: '30',
        },
        {
          label: '近7日',
          value: '7',
        },
        {
          label: '当日',
          value: '1',
        }
      ],
      // part1
      currentSelect_1: '1',
      level_tj: [
        {
          name: '高风险',
          num: '0',
          unit: '处',
          imgSrc: require('../../../assets/img3/high-icon.png'),
        },
        {
          name: '中风险',
          num: '0',
          unit: '处',
          imgSrc: require('../../../assets/img3/center-icon.png'),
        },
        {
          name: '低风险',
          num: '0',
          unit: '处',
          imgSrc: require('../../../assets/img3/low-icon.png'),
        },
      ],
      chartData_1_1: [],
      chartData_1_2: [],
      logo_1: '1',
      isShow_fxts: false,
      headText_fxts: '',

      arrowLeft1:10,
      arrowLeft2:150,
      arrowLeft3:300,
      // part2
      currentSelect_2: '1',
      check_tj: [
        {
          name: '巡查总计',
          num: '16',
        },
        {
          name: '党员',
          num: '9',
        },
        {
          name: '志愿者',
          num: '5',
        },
        {
          name: '文物护保员',
          num: '2',
        },
        {
          name: '其他',
          num: '2',
        },
      ],
      chartData_2_1: [],
      chartData_2_2: [],
      chartData_2_3: [],
      chartData_2_4: [],
      logo_2: '1',

      tableColumn_wwxc:[
        {
          props:'userName',
          name:'姓名',
          format:(row)=>{
            if(row.userName.length>=3){
              return row.userName.substr(0,1)+' * '+row.userName.substr(2)
            }else if(row.userName.length==2){
              return row.userName.substr(0,1)+' * '
            }
          }
        },
        {
          props:'roleName',
          name:'角色'
        },
        {
          props:'checkTime',
          name:'巡查时间'
        },
        {
          props:'pointName',
          name:'巡查地点',
          format:(row)=>{
            if(row.pointName&&row.pointName.length>6){
              return row.pointName.substr(0,5) + "..."
            }else{
              return row.pointName
            }
          }
        },
      ],
      tableData_wwxc:[],
      // part3
      currentSelect_3: '1',
      currentLegend: '',
      chartData_3_1: [
        {
          name: '火灾隐患风险',
          num: '15',
        },
        {
          name: '盗掘盗窃风险',
          num: '9',
        },
        {
          name: '法人违法风险',
          num: '10',
        },
        {
          name: '自然灾害风险',
          num: '15',
        },
        {
          name: '其他',
          num: '12',
        },
      ],
      totalNUm: 0,
      chartColor: [
        '#ff8c80',
        '#4d9ddb',
        '#e5b55b',
        '#2ec4ae',
        '#1bdaff',
        '#576dfb',
      ],
      logo_3: '1',

      isShow_yhfx: false,
      headText_yhfx: '',
      logo_yhfx: '1',

      // part4
      currentType:1,
      chartData_4_1: [
        // {
        //   name: '进化镇',
        //   value: '5',
        // },
        // {
        //   name: '所前镇',
        //   value: '9',
        // },
        // {
        //   name: '楼塔镇',
        //   value: '10',
        // },
        // {
        //   name: '义桥镇',
        //   value: '13',
        // },
        // {
        //   name: '戴村镇',
        //   value: '15',
        // },
      ],
      chartData_4_1_reverse: [],
      maxNum: 0,
      logo_4: '1',
    }
  },
  created() {
    eventBus.$on('gotoStreet', (msg) => {
      // 模拟数据
      if(msg[1] == '进化镇'){
        // 健康指数
        this.level_tj[0].num = 1
        this.level_tj[1].num = 9
        this.level_tj[2].num = 75
        this.chartData_1_1.map(item=>{
          item.value = item.value*1- parseInt(Math.random()*10+6)
          return item
        })
        this.chartData_1_2.map(item=>{
          item.value = item.value*1- parseInt(Math.random()*10+3)
          return item
        })

        // 文物巡查
        this.check_tj[0].num = 6
        this.check_tj[1].num = 1
        this.check_tj[2].num = 1
        this.check_tj[3].num = 2
        this.check_tj[4].num = 1
        this.tableData_wwxc = this.tableData_wwxc.splice(0,4)
        this.logo_2 +='1'

        // 隐患分析
        this.chartData_3_1[0].num = 5
        this.chartData_3_1[1].num = 1
        this.chartData_3_1[2].num = 1
        this.chartData_3_1[3].num = 1
        this.chartData_3_1[4].num = 3
        this.totalNUm = 11
        this.logo_3 += '1'
      }
      
    })
    eventBus.$on('data_back', () => {
      this.get_fxts(0, 0,this.currentSelect_1)
      this.get_wwxc(0, 0,1,100, this.currentSelect_2)
      this.get_yhfx(0, 0,this.currentSelect_3)
    })

    eventBus.$on('updateApi',()=>{
      this.get_fxts(0, 0,this.currentSelect_1)
    })
  },
  computed: {
    optionSingleHeight() {
      return {
        singleHeight: 40 // 这里要变成你的一行表格的高度 可以审查元素
      }
    }
  },
  mounted() {
    setInterval(()=>{
      if(this.startVal == 0){
        this.startVal = 0
      }else{
        this.startVal = 0
      }
    },5000)
    this.get_fxts(0, 0,this.currentSelect_1)
    this.get_wwxc(0, 0,1,100, this.currentSelect_2)
    this.get_yhfx(0, 0,this.currentSelect_3)
    this.get_yhgf(1, 0, 0)

    // 隐患高发自动切换
    clearInterval(timer)
    timer = setInterval(()=>{
      if(this.currentType==1){
        this.get_yhgf(2, 0, 0)
      }else if(this.currentType==2){
        this.get_yhgf(1, 0, 0)
      }
    },16.3*1000)
  },
  methods: {
    // 风险态势
    get_fxts(level, name,rqlx) {
      this.chartData_1_1=[]
      this.chartData_1_2=[]
      get_fxts(level, name,rqlx).then((res) => {
        console.log('风险态势', res)
        let detail = res.data.data.detail
        let list = res.data.data.list
        this.level_tj[0].num = detail.reportNum1
        this.level_tj[1].num = detail.reportNum2
        this.level_tj[2].num = detail.reportNum3

        list.map((item) => {
          let obj_1 = {
            name: item.reportItem,
            value: item.reportNum1,
          }
          let obj_2 = {
            name: item.reportItem,
            value: item.reportNum2,
          }
          this.chartData_1_1.push(obj_1)
          this.chartData_1_2.push(obj_2)
        })
        this.logo_1 += '1'
      })
    },
    // 风险态势日期变化
    fxts_rq_change(val){
      this.currentSelect_1 = val
      this.get_fxts(0, 0,this.currentSelect_1)
    },
    // 文物巡查
    get_wwxc(level, name,currentPage,pageSize,rqlx) {
      get_wwxc(level, name,currentPage,pageSize,rqlx).then((res) => {
        console.log('文物巡查', res)
        let detail = res.data.data.detail
        let list = res.data.data.list.list

        this.check_tj[0].num = detail.reportNum1
        this.check_tj[1].num = detail.reportNum2
        this.check_tj[2].num = detail.reportNum3
        this.check_tj[3].num = detail.reportNum4
        this.check_tj[4].num = detail.reportNum5

        this.tableData_wwxc = list
        this.logo_2 +='1'

        // list.map((item) => {
        //   let obj_1 = {
        //     name: item.reportItem,
        //     value: item.reportNum1,
        //   }
        //   let obj_2 = {
        //     name: item.reportItem,
        //     value: item.reportNum2,
        //   }
        //   let obj_3 = {
        //     name: item.reportItem,
        //     value: item.reportNum3,
        //   }
        //   let obj_4 = {
        //     name: item.reportItem,
        //     value: item.reportNum4,
        //   }
        //   this.chartData_2_1.push(obj_1)
        //   this.chartData_2_2.push(obj_2)
        //   this.chartData_2_3.push(obj_3)
        //   this.chartData_2_4.push(obj_4)
        // })
        // this.logo_2 += '1'
      })
    },
    // 文物巡查日期变化
    wwxc_rq_change(val){
      this.currentSelect_2 = val
      this.get_wwxc(0, 0,1,100,this.currentSelect_2)
    },

    // 文物巡查列表点击
    scrollRowClick(row){
      console.log(row)
      let params = {
        jd: '',
        category: '',
        currentPage: 1,
        id: '',
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 600,
        publishName: row.pointName,
        rank: '',
        trialList: [],
      }
      wbd_list2(params).then((res) => {
        console.log('事件活跃点位', res.data.data)
        eventBus.$emit('drawCulturalPoi',res.data.data.list,'','6')
      })
    },
    scrollRowLeave(){
      eventBus.$emit('poiBack')
    },
    // 隐患分析
    get_yhfx(level, name,rqlx) {
      get_yhfx(level, name,rqlx).then((res) => {
        console.log('隐患分析', res)
        let list = res.data.data
        this.chartData_3_1[0].num = list.reportNum1
        this.chartData_3_1[1].num = list.reportNum2
        this.chartData_3_1[2].num = list.reportNum3
        this.chartData_3_1[3].num = list.reportNum4
        this.chartData_3_1[4].num = list.reportNum5

        this.getSum()
        this.logo_3 += '1'
      })
    },
    // 隐患分析日期变化
    yhfx_rq_change(val){
      this.currentSelect_3 = val
      this.get_yhfx(0,0,this.currentSelect_3)
    },
    getSum() {
      let sum = 0
      this.chartData_3_1.map((item) => {
        sum += item.num * 1
      })
      this.totalNUm = sum
    },
    // 隐患高发
    get_yhgf(type, level, name) {
      get_yhgf(type, level, name).then((res) => {
        console.log('隐患高发', res)
        let list = res.data.data
        this.chartData_4_1 = []
        list.map((item) => {
          let obj = {
            name: item.reportName,
            value: item.reportNum1,
          }
          this.chartData_4_1.push(obj)
        })
        this.maxNum = list[list.length-1].reportNum1 * 1.2
        this.rightShowData()
        this.logo_4 += '1'
        this.currentType = type
      })
    },
    titleBtnClick(type) {
      console.log('type000', type)
      this.get_yhgf(type, 0, 0)
    },

    rightShowData() {
      let arr = [...this.chartData_4_1]
      this.chartData_4_1_reverse = arr.reverse()
    },

    // 点击图例，展示具体数据
    legendClick(item) {
      this.currentLegend = item.name
      this.isShow_yhfx = true
      this.headText_yhfx = item.name
      this.logo_yhfx += '1'
    },
    // 关闭隐患分析弹框
    close_yhfx() {
      this.isShow_yhfx = false
    },
    // 点击风险态势折线图
    clickLine(val){
      console.log(val)
      this.isShow_fxts = true
    },
    // 关闭风险态势弹框
    close_fxts() {
      this.isShow_fxts = false
    }
  },
}
</script>

<style lang="less" scoped>
.box {
  // width: 100%;
  // height: 100%;
  user-select: none;

  background: #102E56;
  border: 1px solid rgba(49, 110, 177, 0.65);
  width: 453px;
  height: 949px;
  z-index: 10;
  img{
    position: relative;
    width: 444px;
    height: 57px;
    top: -6px;
    left: 6px;
  }
  .title-btn {
    height: 29px;
    background: url('../../../assets/img3/pull-down.png') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #ffffff83;
    cursor: pointer;
    z-index: 2;
    &:nth-child(1) {
      width: 67px;
    }
    &:nth-child(2) {
      width: 87px;
    }
  }
  .active-title-btn{
    background: url('../../../assets/img3/selected.png') no-repeat center;
    background-size: 100% 100%;
    color: #ffffff;
  }
  //
  .first-echart {
    width: 100%;
    height: 186px;
    position: relative;
    margin-bottom: 10px;
    .tj {
      width: 100%;
      height: 53px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item {
        width: 32%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        img {
          width: 60px;
          height: 60px;
          margin-right: 5px;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .top {
            span:nth-child(1) {
              font-family: DINAlternate-Bold;
              font-size: 28px;
              font-weight: bold;
              font-stretch: normal;
              line-height: 14px;
              letter-spacing: 1px;
              color: #ffffff;
            }
            span:nth-child(2) {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: rgba(255, 255, 255, 0.8);
            }
          }
          .bottom {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 14px;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
        &:nth-child(1) {
          .info .top span:nth-child(1) {
            color: #ff3b30;
          }
          .info .bottom {
            // color: #ff3b30;
            color: #ffffff;
          }
        }
        &:nth-child(2) {
          .info .top span:nth-child(1) {
            color: #e5b55b;
          }
          .info .bottom {
            // color: #ffb72c;
            color: #ffffff;
          }
        }
        &:nth-child(3) {
          .info .top span:nth-child(1) {
            color: #90ffad;
          }
          .info .bottom {
            // color: #21ed6d;
            color: #ffffff;
          }
        }
      }
    }
    .load-process{
      width: 100%;
      height: 189px;
      display: flex;
      justify-content: center;
      align-items: center;
      .load-bg{
        width: 420px;
        height:60px;
        background:url('../../../assets/img3/load-bg.png') no-repeat center;
        background-size:100% 100%;
        position: relative;
        img{
          position: absolute;
          width: 20px;
          height: 34px;
          top: -34px;
          left: 10px;
        }
        .text{
          position: absolute;
          bottom: -30px;
          span:nth-child(1) {
            font-family: DINAlternate-Bold;
            font-size: 28px;
            font-weight: bold;
            font-stretch: normal;
            line-height: 14px;
            letter-spacing: 1px;
            color: #ffffff;
          }
          span:nth-child(2) {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }
    .line {
      width: 100%;
      height: 136px;
    }
  }
  .second-echart {
    width: 100%;
    height: 196px;
    position: relative;
    margin-bottom: 10px;
    .tj {
      width: 100%;
      height: 52px;
      // background: url('../../../assets/img3/1-1.png') no-repeat center;
      // background-size: 100% 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      margin-left: 6px;
      .item {
        height: 56px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 7px;
        .bottom {
          font-family: SourceHanSansCN-Medium;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          color: rgba(255, 255, 255, 0.6);
        }
      }
      .item-0 {
        width: 97px;
        box-sizing: border-box;
        background: url('../../../assets/img3/s-b1.png') no-repeat center;
        background-size: 100% 100%;
        .top {
          span:nth-child(1) {
            font-family: DINAlternate-Bold;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #f0ad18;
          }
          span:nth-child(2) {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #f0ad18;
            opacity: 0.5;
          }
        }
      }
      .item-1 {
        width: 70px;
        box-sizing: border-box;
        background: url('../../../assets/img3/s-b2.png') no-repeat center;
        background-size: 100% 100%;
        .top {
          span:nth-child(1) {
            font-family: DINAlternate-Bold;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #00dcff;
          }
          span:nth-child(2) {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #00dcff;
            opacity: 0.5;
          }
        }
      }
      .item-2 {
        width: 70px;
        box-sizing: border-box;
        background: url('../../../assets/img3/s-b2.png') no-repeat center;
        background-size: 100% 100%;
        .top {
          span:nth-child(1) {
            font-family: DINAlternate-Bold;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #00dcff;
          }
          span:nth-child(2) {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #00dcff;
            opacity: 0.5;
          }
        }
      }
      .item-3 {
        width: 97px;
        box-sizing: border-box;
        background: url('../../../assets/img3/s-b3.png') no-repeat center;
        background-size: 100% 100%;
        .top {
          span:nth-child(1) {
            font-family: DINAlternate-Bold;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #00dcff;
          }
          span:nth-child(2) {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #00dcff;
            opacity: 0.5;
          }
        }
      }
      .item-4 {
        width: 70px;
        box-sizing: border-box;
        background: url('../../../assets/img3/s-b2.png') no-repeat center;
        background-size: 100% 100%;
        .top {
          span:nth-child(1) {
            font-family: DINAlternate-Bold;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #00dcff;
          }
          span:nth-child(2) {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #00dcff;
            opacity: 0.5;
          }
        }
      }
    }
    .scroll-table {
      width: calc(100% - 20px);
      height: 150px;
      margin-left: 12px;
    }
  }
  .third-echart {
    width: 100%;
    height: 161px;
    position: relative;
    .pie {
      width: 50%;
      height: 100%;
    }
    .legend {
      position: absolute;
      top: 10px;
      right: 5px;
      height: 100%;
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        width: 100%;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        display:flex;
        align-items: center;
        .icon {
          display: inline-block;
          width: 10px;
          height: 10px;
          // border-radius: 2px;
          margin-right: 5px;
        }
        .name {
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #ffffff;
          opacity: 0.6;
          width: 105px;
        }
        .rate{
          display: inline-block;
          width: 55px;
          font-family: PingFangSC-Regular;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #ffffff;
          opacity: 0.6;
        }
        .name-active {
          opacity: 1;
          font-size: 16px;
        }
        img{
          width: 10px;
          height: 12px;
          margin-top: 15px;
        }
      }
    }
  }
  .forth-echart {
    width: 100%;
    height: 155px;
    overflow: hidden;
    // .bar {
    //   width: 100%;
    //   height: 100%;
    //   position: relative;
    //   .num {
    //     display: flex;
    //     flex-direction: column;
    //     justify-content: space-between;
    //     font-size: 18px;
    //     // font-weight: 900;
    //     color: #fff;
    //     height: 100%;
    //     position: absolute;
    //     right: 10px;
    //     top: 0;
    //     box-sizing: border-box;
    //     padding: 15px 0 30px 0;
    //   }
    // }
    .auto-scorll-table{
      .item{
        width: 100%;
        display: flex;
        height: 40px;
        align-items: center;
        margin: 0 15px;
        .index{
          width: 45px;
          font-family: MicrosoftYaHei-Bold;
          font-size: 14px;
          font-weight: 900;
          font-stretch: normal;
          letter-spacing: 1px;
        }
        .name{
          width: 100px;
          font-family: SourceHanSansCN-Medium;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #b5c1d1;
          margin-left: 15px;
        }
        .num{
          font-family: DINPro-Medium;
          font-size: 20px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #ffffff;
          margin-left: 15px;
        }
      }
    }
    
  }
}
</style>
