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
            <span class="text">考古前置</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <div
          class="repair"
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
        </div>

      </div>
    </div>
    <kgktDetail :isShow="isShow_kgkt" :row="row_kgkt" @close="close_kgkt"/>
  </div>
</template>

<script>
import {kgkt_List } from '../../../../api/xsApi2'
// import { eventBus } from '@/main'
import TableCC from '../../../mapPublicComponents/tableC'
import kgktDetail from './wwkt-detail'

export default {
  components: { TableCC,kgktDetail },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maskOpacity: 1,
      // 考古勘探
      pageNum3:1,
      pageSize3:10,
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

    this.getKGKT_list()
  },
  methods: {
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
    close(){
      this.$emit('close')
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
      .repair {
        margin-top: 10px;
        width: 100%;
        height: calc(100% - 30px);
        .pagination {
          text-align: center;
        }
      }
    }
  }
}
</style>