<template>
  <div class="confxlytainer" v-if="isShow" :style={opacity:maskOpacity}>
    <div class="center-container">
      <div class="head">{{title}}详情</div>
      <div class="close" @click="close"></div>
      <div class="body-box">
        <img src="@/assets/img4/demoWuFang.png" width="100%" height="100%"/>
      </div>
    </div>
  </div>
</template>
<script>

import {getListDetailById} from "@/api/xsApi3"
import { mapGetters } from 'vuex';

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    row:{
      type: Object,
      default:()=>{}
    }
  },
  data() {
    return {
      title:"物防",
      options: {
        initialViewIndex: 0,
      },
    
      detailInfo:{}, // 基本信息
      workImgList:[], // 工作照片
      checkList:[], // 巡查数据
      handleImgList:[], // 处置图片



      stateBtnList:[ // 审核状态图片
        require("@/assets/img4/state-btn1.png"),
        require("@/assets/img4/state-btn2.png"),
        require("@/assets/img4/state-btn3.png"),
        require("@/assets/img4/state-btn4.png"),
        require("@/assets/img4/state-btn5.png"),
        ]
    };
  },
  mounted() {
    // 挂载到body下
    this.$nextTick(() => {
      const body = document.querySelector('body');
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  },
  watch: {
    isShow(nval) {
      switch (this.row.checkType) {
        case "1": 
          this.title = "专项检查"
          break;
        case "2": 
          this.title = "专项整改"
          break;
        case "3": 
          this.title = "巡查上报"
          break;
        case "4": 
          this.title = "设备报警"
          break;
        case "5": 
          this.title = "安全检查"
          break;
        case "6": 
          this.title = "信访案件"
          break;
        case "7": 
          this.title = "稽查督查"
          break;
        case "8": 
          this.title = "问题上报"
          break;
        case "10": 
          this.title = "一网统管"
          break;
        case "11": 
          this.title = "视频预警（ 热成像事件-温度报警）"
          break;
        case "12": 
          this.title = "视频预警（热成像事件-火点检测）"
          break;
        case "13": 
          this.title = "用电监测"
          break;
        case "14": 
          this.title = "水压监测 "
          break;
        case "15": 
          this.title = "烟感监测 "
          break;
        case "18": 
          this.title = "行为监测 "
          break;
        case "31": 
          this.title = "设备检查 "
          break;
        default:
          break;
      }

      this.workImgList=[]
      this.checkList=[]
      // this._getListDetailById(this.row.id)
    },
  },
  methods: {
    _getListDetailById(id){
      let params={
        id:id
      }
      getListDetailById(params).then(res=>{
        console.log('任务详情1235',res.data)
        this.detailInfo = res.data.data

        if (this.detailInfo.details.length <= 0) return
        this.checkList =
          this.detailInfo.details.length > 0 &&
          this.detailInfo.details.map((item) => {
            let str = item.storageId
            item.imgList = JSON.parse(str)
            return item
          })

        this.checkList.map((item,index)=>{
          if (!item.checkNameType) {
              this.checkList.splice(index,1)
              let str = this.detailInfo.details[index].storageId
              this.workImgList = JSON.parse(str)
          }
        })

      })
    },
    getJdState(state){
      switch (state) {
        case 1:
          return this.stateBtnList[0]
        case 99:
          return this.stateBtnList[1]
        case 4:
          return this.stateBtnList[2]
        default:
          break;
      }
    },
    getWljState(state){
      switch (state) {
        case 1:
          return this.stateBtnList[3]
        case 99:
          return this.stateBtnList[4]
        default:
          return false
      }
    },


    inited(viewer) {
      this.$viewer = viewer;
    },
    showImg(index, item) {
      this.options.initialViewIndex = index;
      this.images = item;
      setTimeout(() => {
        this.$viewer.show();
      }, 400);
    },

    close() {
      this.$emit('close');
    },

  },
};
</script>
<style lang="less" scoped>
.confxlytainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 21;
  background: rgba(0, 0, 0, 0.7);
  .center-container {
    width: 1026px;
    height: 826px;
    overflow: hidden;
    position: relative;
    background: url('../../../../assets/img4/s-pop-bg.png') no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 12px 35px 35px 35px;
    .close {
      width: 54px;
      height: 53px;
      position: absolute;
      top: 0px;
      right: 0px;
      background: url('../../../../assets/img4/close.png') no-repeat center;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .head {
      width: 100%;
      height: 79px;
      background: url('../../../../assets/img4/pop-title.png') no-repeat center;
      background-size: auto 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Lucida Calligraphy', cursive, serif, sans-serif;
      font-size: 30px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      color: #ffffff;
    }
    .body-box{
      width:100%;
      height: calc(100% - 100px);
      margin-top: 8px;
      overflow: auto;
      // background: red;
      box-sizing: border-box;
      // padding-left:20px;
    }
  }
}
</style>
