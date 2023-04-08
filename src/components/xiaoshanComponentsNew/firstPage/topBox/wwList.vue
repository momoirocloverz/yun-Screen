<template>
  <div
    class="mask"
    v-if="isShow"
    :style="{ opacity: maskOpacity }"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">萧保馆</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <div class="wwgk">
          <div
            class="item"
            v-for="(item, index) in wwgk_data"
            :key="index"
            @click="wwgk_click(item, index)"
          >
            <img
              :src="currentIndex === index ? item.active_imgSrc : item.imgSrc"
              alt=""
              srcset=""
            />
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div class="num">
                <span>{{ item.num }}</span>
                <span>处</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="list"
          v-if="!isRepair&&!isKGKT"
          v-loading="isLoading" 
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
        >
          <div
            class="item"
            v-for="(item,index) in wwList"
            :key='index'
            @click="clickListItem(item)"
          >
            <div class="img">
              <img
                :src="getWWImg(item.publishName,item.paths)"
                alt=""
                srcset=""
              >
            </div>
            <div class="info">
              <div class="row1">名称：<span>{{item.publishName}}</span></div>
              <div class="row2">
                <img
                  src="../../../../assets/img3/pot.png"
                  alt=""
                  srcset=""
                >
                <span>文保类型：</span>
                <span>{{item.category}}</span>
              </div>
              <div class="row3">
                <img
                  src="../../../../assets/img3/pot.png"
                  alt=""
                  srcset=""
                >
                <span>属地：</span>
                <span>{{item.jd}}</span>
              </div>
              <div class="row4" @click.stop="hhlyClick(item)" v-show="item.activation>0">
                <img
                  src="../../../../assets/img3/pot.png"
                  alt=""
                  srcset=""
                >
                <span>活化利用：</span>
                <img src="../../../../assets/img3/tag.png" alt="" srcset="">
              </div>
            </div>
          </div>
        </div>

        <div
          class="repair"
          v-if="isRepair"
        >
          <div class="table">
            <TableC
              :isShowCheck="false"
              :tableColumns="tableColumns"
              :tableData="tableData"
              :logo="logo"
            />
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="pageNumChange"
              :page-size="pageSize2"
              :pager-count="7"
              layout="total,prev, pager, next"
              :total="total_repair"
            >
            </el-pagination>
          </div>
        </div>

        <!-- <div
          class="repair"
          v-if="isKGKT"
        >
          <div class="table">
            <TableCC
              :isShowCheck="false"
              :hasIndex="false"
              :hasOtherInfo="{flex:0.8}"
              :tableColumns="tableColums_kgkt"
              :tableData="tableData_kgkt"
              :logo="logo_kgkt"
              :optionList="optionList_kgkt"
              @btnClick="detailClick"
            >
              <template slot="progress" slot-scope="scope">
                <span :style="{color:getColorAndImg('progress',scope.row.progress,'color'),'padding-left':'5px'}">
                  <img :src="getColorAndImg('progress',scope.row.progress,'img')" alt="" srcset="" :style="{width:`${21/192}rem`,height:`${21/192}rem`,'margin-right':'5px'}">
                  {{scope.row.progress | getProgress}}
                </span>
              </template>
              <template slot="excavation" slot-scope="scope">
                <span :style="{color:getColorAndImg('excavation',scope.row.excavation,'color'),'justify-content':'flex-start','padding-left':'5px'}">
                  <img :src="getColorAndImg('excavation',scope.row.excavation,'img')" alt="" srcset="" :style="{width:`${17/192}rem`,height:`${17/192}rem`,'margin-right':'5px'}">
                  {{scope.row.excavation | getExcavation}}
                </span>
              </template>
              <template slot="otherInfo" slot-scope="scope">
                <img v-show="scope.row.warningCount==1" src="../../../../assets/img3/tag2@3x.png" alt="" srcset="" :style="{'height':`${60/192}rem`,'width':'auto'}">
                <img v-show="scope.row.warningCount>=2" src="../../../../assets/img3/tag1@3x.png" alt="" srcset="" :style="{'height':`${60/192}rem`,'width':'auto'}">
              </template>
            </TableCC>
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="pageNumChange_kgkt"
              :page-size="pageSize3"
              :pager-count="7"
              layout="total,prev, pager, next"
              :total="total_kgkt"
            >
            </el-pagination>
          </div>
        </div> -->

      </div>
    </div>
    <kgktDetail :isShow="isShow_kgkt" :row="row_kgkt" @close="close_kgkt"/>
    <HHLY :isShow="isShow_hhly" :pointId="clickPointId" @close="close_hhly" />
  </div>
</template>

<script>
import { wwgk, wbd_list2 } from '../../../../api/xsApi'
import { repairList,kgkt_List } from '../../../../api/xsApi2'
import { eventBus } from '@/main'
import TableC from '../../../mapPublicComponents/table'
import TableCC from '../../../mapPublicComponents/tableC'
import kgktDetail from './wwkt-detail'
import HHLY from '../components/hhly'


export default {
  components: { TableC, TableCC,kgktDetail,HHLY },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maskOpacity: 1,
      isLoading:false,
      wwList: [],
      currentIndex: 1,
      wwgk_data: [
        {
          name: '国保单位',
          id: '14da5819da904c4ab1d9d94a961ca27a',
          num: '3',
          imgSrc: require('../../../../assets/img2/icon1-n.png'),
          active_imgSrc: require('../../../../assets/img2/icon1-s.png'),
        },
        {
          name: '省保单位',
          id: 'cef2a80fbea6df89578ad5599b67b71f',
          num: '9',
          imgSrc: require('../../../../assets/img2/icon2-n.png'),
          active_imgSrc: require('../../../../assets/img2/icon2-s.png'),
        },
        {
          name: '市保单位',
          id: '2bf3be523de944ec3ee1ad832a7a2587',
          num: '54',
          imgSrc: require('../../../../assets/img2/icon3-n.png'),
          active_imgSrc: require('../../../../assets/img2/icon3-s.png'),
        },
        {
          name: '市级文保点',
          id: 'b16db07f34112b9b0fc6d2b54214e0aa',
          num: '143',
          imgSrc: require('../../../../assets/img2/icon4-n.png'),
          active_imgSrc: require('../../../../assets/img2/icon4-s.png'),
        },
        {
          name: '一般文物',
          id: 'ac38ee765b5e5155b8bb3eadc1b5aa8d',
          num: '359',
          imgSrc: require('../../../../assets/img3/icon7-n.png'),
          active_imgSrc: require('../../../../assets/img3/icon7-s.png'),
        },
        {
          name: '文物修缮',
          id: '0',
          num: '0',
          imgSrc: require('../../../../assets/img3/icon5-n@2x.png'),
          active_imgSrc: require('../../../../assets/img3/icon5-s@2x.png'),
        },
        // {
        //   name: '考古勘探',
        //   id: '1',
        //   num: '1',
        //   imgSrc: require('../../../../assets/img3/icon6-n.png'),
        //   active_imgSrc: require('../../../../assets/img3/icon6-s.png'),
        // },
        
      ],
      isRepair: false,
      isKGKT:false,

      isShow_hhly:false,
      clickPointId:'',

      // 文物修缮
      pageNum2: 1,
      pageSize2: 15,
      tableColumns: [
        {
          props: 'xmmc',
          name: '项目名称',
          flex: 1.5,
          justifyContent:'flex-start'
        },
        {
          props: 'jb',
          name: '级别',
          justifyContent:'flex-start'
        },
        {
          props: 'dz',
          name: '地址',
          justifyContent:'flex-start'
        },
        {
          props: 'mj',
          name: '面积(㎡)',
          flex: 0.5,
          justifyContent:'flex-start'
        },
        {
          props: 'ztz',
          name: '总投资(万元)',
          flex: 0.5,
          justifyContent:'flex-start'
        },
        {
          props: 'zrdw',
          name: '责任单位',
          justifyContent:'flex-start'
        },
        {
          props: 'jsnr',
          name: '建设内容',
          justifyContent:'flex-start'
        },
      ],
      tableData: [],
      total_repair: 0,
      logo: '1',

      // 考古勘探
      pageNum3:1,
      pageSize3:9,
      tableColums_kgkt:[
        {
          props: 'projectName',
          name: '项目名称',
          flex: 1.5,
        },
        {
          props: 'address',
          name: '地址',
        },
        {
          props: 'parcelName',
          name: '地块名称',
        },
        {
          props: 'landUnit',
          name: '做地单位',
        },
        {
          props: 'contactUser',
          name: '联系人',
          flex:0.6
        },
        {
          props: 'contactPhone',
          name: '联系方式',
        },
        {
          props: 'landArea',
          name: '土地面积(㎡)',
        },
        {
          props: 'transfer',
          name: '土地是否已移交',
          flex:0.6,
          format:(row)=>{
            if(row.transfer==0){
              return '是'
            }else if(row.transfer == 1){
              return '否'
            }
          }
        },
        {
          props: 'agreement',
          name: '是否签订协议',
          flex:0.5,
          format:(row)=>{
            if(row.agreement==0){
              return '是'
            }else if(row.agreement == 1){
              return '否'
            }
          }
        },
        {
          props: 'prospect',
          name: '是否需勘探',
          format:(row)=>{
            if(row.prospect==0){
              return '是'
            }else if(row.prospect == 1){
              return '否'
            }
          }
        },
        {
          props: 'progress',
          name: '当前进展',
          withSlot:true
        },
        {
          props: 'excavation',
          name: '发掘情况',
          withSlot:true
        },
      ],
      tableData_kgkt:[
        // {
        //   xmmc:'22',
        //   dz:'44',
        //   dkmc:'ff',
        //   zddw:'发送',
        //   lxr:'人房',
        //   lxfs:'看见看见',
        //   tdmj:'二位',
        //   tdsfyj:'是',
        //   sfqdxy:'是',
        //   sfkt:'问我提问时',
        //   progress:'未勘探',
        //   excavation:'无需发掘',
        // },
        // {
        //   xmmc:'22',
        //   dz:'44',
        //   dkmc:'ff',
        //   zddw:'发送',
        //   lxr:'人房',
        //   lxfs:'看见看见',
        //   tdmj:'二位',
        //   tdsfyj:'是',
        //   sfqdxy:'是',
        //   sfkt:'问我提问时',
        //   progress:'完成勘探',
        //   excavation:'完成发掘',
        // },
        // {
        //   xmmc:'22',
        //   dz:'44',
        //   dkmc:'ff',
        //   zddw:'发送',
        //   lxr:'人房',
        //   lxfs:'看见看见',
        //   tdmj:'二位',
        //   tdsfyj:'是',
        //   sfqdxy:'是',
        //   sfkt:'问我提问时',
        //   progress:'勘探排队中',
        //   excavation:'正在发掘',
        // },
      ],
      optionList_kgkt:[
        {
          flex:0.8,
          bgImg:require("../../../../assets/img3/btn.png"),
        }
      ],
      total_kgkt:0,
      logo_kgkt:'2',
      row_kgkt:'',// 选中的数据
      // 当前进展
      progress_1:require('../../../../assets/img3/dqjz_1.png'),
      progress_2:require('../../../../assets/img3/dqjz_2.png'),
      progress_3:require('../../../../assets/img3/dqjz_3.png'),
      progress_4:require('../../../../assets/img3/dqjz_4.png'),
      progress_5:require('../../../../assets/img3/dqjz_5.png'),
      // 发掘情况
      excavation_1:require('../../../../assets/img3/fjqk_1.png'),
      excavation_2:require('../../../../assets/img3/fjqk_2.png'),
      excavation_3:require('../../../../assets/img3/fjqk_3.png'),
      // 勘探详情弹框
      isShow_kgkt:false,

      // 一般文物


      // 文物列表搜索条件
      // pageNum: 1,
      // pageSize: 300,
      rankId: 'cef2a80fbea6df89578ad5599b67b71f',
      // fxlx: '',
      // fxdj: '',
      // address: '',
    }
  },
  watch: {
    isShow(val) {
      if (!val) return
      this.maskOpacity = 1
    },
  },
  filters:{
    getProgress(value){
      switch (value) {
          case 0:
            return '未勘探'
          case 1:
            return '勘探排队中'
          case 2:
            return '完成勘探'
          case 3:
            return '需要补探'
          case 4:
            return '已进场'
          default:
            break;
        }
    },
    getExcavation(value){
      switch (value) {
          case 0:
            return '无需发掘'
          case 1:
            return '正在发掘'
          case 2:
            return '完成发掘'
          default:
            break;
        }
    },
  },
  created(){
    eventBus.$on('closeSelf',()=>{
      this.close()
    })
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

    this.getWWGK_data('0', '0')
    this.get_wbdList_data()
  },
  methods: {
    getWWImg(name,path) {
      if (path&&path instanceof Array) {
        return path[0]
      } else {
        let img
        try {
          img = require(`../../../../assets/wwImg/${name}.png`)
          return img
        } catch (error) {
          return require(`../../../../assets/wwImg/default.jpg`)
        }
      }
      
    },
    wwgk_click(item, index) {
      this.currentIndex = index
      if (item.id === '0') {
        // 文物修缮
        this.getRepairList()
        this.isKGKT = false
        this.isRepair = true
      }else if(item.id === '1'){
        // 考古勘探
        // this.getKGKT_list()
        // this.isRepair = false
        // this.isKGKT = true
      } else {
        this.pageNum2 = 1
        this.isRepair = false
        this.isKGKT = false
        this.rankId = item.id
        this.get_wbdList_data()
      }
    },
    // 文物修缮----分页
    pageNumChange(val) {
      this.pageNum2 = val
      this.getRepairList()
    },
    // 获取修缮列表
    getRepairList() {
      let params = {
        currentPage: this.pageNum2,
        pageSize: this.pageSize2,
      }
      repairList(params).then((res) => {
        console.log('修缮', res.data)
        this.tableData = res.data.data.list
        this.total_repair = res.data.data.total
      })
    },
    // 考古勘探----分页
    pageNumChange_kgkt(val){
      this.pageNum3 = val
      this.getKGKT_list()
    },
    // 获取考古勘探列表
    getKGKT_list(){
      let params = {
        currentPage: this.pageNum3,
        pageSize: this.pageSize3,
      }
      kgkt_List(params).then(res=>{
        console.log('考古勘探列表',res.data.data)
        this.total_kgkt = res.data.data.total
        this.tableData_kgkt = res.data.data.list
        // .length>0&&res.data.data.list.map(item=>{
        //   if(item.transfer)
        // })
        this.logo_kgkt += '1'
      })
    },
    // 考古勘探详情
    detailClick(row){
      console.log('考古勘探',row)
      this.row_kgkt = row
      this.maskOpacity = 0
      this.isShow_kgkt = true
    },
    close_kgkt(){
      this.maskOpacity = 1
      this.isShow_kgkt = false
    },

    // 活化利用
    hhlyClick(item){
      this.isShow_hhly = true
      this.maskOpacity = 0
      this.clickPointId = item.id
    },
    close_hhly(){
      this.maskOpacity = 1
      this.isShow_hhly = false
    },

    // 获取文物概况数据
    getWWGK_data(level, name) {
      let params = {
        level,
        name,
      }
      wwgk(params).then((res) => {
        console.log('文物概况', res.data.data)
        let result = res.data.data[0]
        this.wwgk_data[0].num = result.reportNum1
        this.wwgk_data[1].num = result.reportNum2
        this.wwgk_data[2].num = result.reportNum3
        this.wwgk_data[3].num = result.reportNum4
        this.wwgk_data[4].num = result.reportNum7
        // this.wwgk_data[5].num = result.reportNum6
        this.wwgk_data[5].num = result.reportNum5
      })
    },
    // 获取文保点列表
    get_wbdList_data(logo = '') {
      let params2 = {
        jd: '',
        category: '',
        currentPage: 1,
        id: '',
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 400,
        publishName: '',
        rank: this.rankId,
        trialList: [],
      }
      this.isLoading = true
      this.wwList = []
      wbd_list2(params2).then((res) => {
        console.log('文保点列表2', res.data.data)
        this.isLoading = false
        this.wwList = res.data.data.list
        // eventBus.$emit("drawCulturalPoi", res.data.data.list, logo);
      })
      // wbd_list(params).then((res) => {
      //   console.log('文保点列表', res.data.data)
      //   this.wwList = res.data.data.list
      // })
    },
    // 点击文物列表
    clickListItem(item) {
      let path=[]
      if(item.paths&&item.paths instanceof Array&& item.paths.length>0){
        path = item.paths
      }else{
        let img
        try {
          img = require(`../../../../assets/wwImg/${item.publishName}.png`)
        } catch (error) {
          img = require(`../../../../assets/wwImg/务本堂.png`)
        }
        path=[img]
      }
      eventBus.$emit('poiClick', { poiName: item.publishName,path })
    },
    // 文物详情关闭
    close() {
      this.pageNum2 = 1
      this.$emit('close')
    },

    // 根据字段，判断颜色和图片
    getColorAndImg(key,value,returnType){
      let color,img
      if(key === 'progress'){
        switch (value) {
          case 0:
            color = '#9c9998'
            img = this.progress_1
            break;
          case 1:
            color = '#f89a7c'
            img = this.progress_4
            break;
          case 2:
            color = '#2fd692'
            img = this.progress_2
            break;
          case 3:
            color = '#28aadb'
            img = this.progress_3
            break;
          case 4:
            color = '#fdd89f'
            img = this.progress_5
            break;
        
          default:
            break;
        }
      }else if(key === 'excavation'){
        switch (value) {
          case 0:
            color = '#9c9998'
            img = this.excavation_1
            break;
          case 1:
            color = '#f99a7d'
            img = this.excavation_3
            break;
          case 2:
            color = '#2fd692'
            img = this.excavation_2
            break;
        
          default:
            break;
        }
      }

      if(returnType === 'color'){
        return color
      }else if(returnType === 'img'){
        return img
      }
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
  background: url('../../../../assets/img2/pop-bg.png') no-repeat center;
  background-size: 100%;
  z-index: 999;
  user-select: none;
  .info-container {
    width: 1700px;
    height: 950px;
    // background: rgba(255, 0, 0, 0.288);
    // margin-top: 15px;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 0;
    .head {
      position: relative;
      width: 100%;
      height: 148;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        width: 1206px;
        height: 89px;
        background: url('../../../../assets/img2/pop-b-title.png') no-repeat
          center;
        background-size: 100%;
        background-position-y: -45px;
        display: flex;
        box-sizing: border-box;
        padding-right: 60px;
        padding-top: 10px;
        align-items: flex-start;
        justify-content: center;
        .top-box {
          width: 555px;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          .text {
            font-family: SourceHanSansCN-Bold;
            font-size: 34px;
            font-weight: 900;
            font-stretch: normal;
            letter-spacing: 10px;
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
        top: -20px;
        right: -20px;
        width: 56px;
        height: 56px;
        background: url('../../../../assets/img2/close_new.png');
        background-size: 100%;
        cursor: pointer;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 87px);
      box-sizing: border-box;
      .wwgk {
        margin-top: 20px;
        width: 100%;
        height: 70px;
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 180px;
          height: 52px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
          img {
            width: 52px;
            height: 52px;
            margin: 0 15px;
          }
          .info {
            .name {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #ffffff;
            }
            .num {
              span:nth-child(1) {
                font-family: Arial-BoldMT;
                font-size: 30px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #c9dfff;
              }
              span:nth-child(2) {
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #98a9c5;
              }
            }
          }
        }
      }
      .list {
        margin-top: 10px;
        width: 100%;
        height: calc(100% - 100px);
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        .item {
          width: 15.4%;
          height: 300px;
          background: url('../../../../assets/img3/cc-img-bg.png') no-repeat
            center;
          background-size: 100% 100%;
          margin: 10px;
          cursor: pointer;
          .img {
            width: 100%;
            height: 170px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 87%;
              height: 135px;
            }
          }
          .info {
            width: 100%;
            height: calc(100% - 170px);
            box-sizing: border-box;
            padding: 10px;
            .row1 {
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #f3fdff;
              opacity: 0.93;
              background: url('../../../../assets/img3/x-line.png') no-repeat
                bottom;
              background-size: 100%;
              padding-bottom: 5px;
              margin-bottom: 10px;
              display: flex;
              span {
                display: inline-block;
                width: 170px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;

                color: #2cfff1;
              }
            }
            .row2 {
              display: flex;
              align-items: center;
              margin-bottom: 5px;
              img {
                width: 19px;
                height: 19px;
                margin-right: 10px;
              }
              span {
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #d9effd;
                &:nth-child(3){
                  display: inline-block;
                  width: 120px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                }
              }
            }
            .row3 {
              display: flex;
              align-items: center;
              margin-bottom: 5px;
              img {
                width: 19px;
                height: 19px;
                margin-right: 10px;
              }
              span {
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #d9effd;
              }
            }
            .row4 {
              display: flex;
              align-items: center;
              img { 
                width: 19px;
                height: 19px;
                margin-right: 10px;
              }
              span {
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #d9effd;
              }
              img:nth-child(3){
                width: 30px;
                height: 28px;
              }
            }
          }
        }
      }
      .repair {
        margin-top: 10px;
        width: 100%;
        height: calc(100% - 100px);
        .pagination {
          text-align: center;
        }
      }
    }
  }
}
</style>