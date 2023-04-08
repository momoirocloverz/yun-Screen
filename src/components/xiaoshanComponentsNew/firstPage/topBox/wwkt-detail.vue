<template>
  <div
    class="mask"
    v-show="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">考古勘探详情</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <DialogTitleBox :title="'详情信息'" />
        <div class="text-info">
          <div class="part part-1">
            <div class="row">
              <span class="key">项目名称</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.projectName}}</span>
            </div>
            <div class="row">
              <span class="key">做地单位</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.landUnit}}</span>
            </div>
            <div class="row">
              <span class="key">性质、批次</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.properties}}、{{row.batch}}</span>
            </div>
            <div class="row">
              <span class="key">定范围</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.scope==0?'是':'否'}}</span>
            </div>
            <div class="row">
              <span class="key">设围挡</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.fence==0?'是':'否'}}</span>
            </div>
            <div class="row">
              <span class="key">是否需勘探</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.prospect==0?'是':'否'}}</span>
            </div>
            <div class="row">
              <span class="key">进场时间</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.mobilizationTime&&row.mobilizationTime.split(' ')[0]}}</span>
            </div>
            <div class="row">
              <span class="key">预警次数</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.warningCount}}</span>
            </div>
          </div>
          <div class="part part-2">
            <div class="row">
              <span class="key">地址</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.address}}</span>
            </div>
            <div class="row">
              <span class="key">联系人及联系方式</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.contactUser}},{{row.contactPhone}}</span>
            </div>
            <div class="row">
              <span class="key">拟出让时间</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.proposedTransferTime}}</span>
            </div>
            <div class="row">
              <span class="key">清关系</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.qingDynasty==0?'是':'否'}}</span>
            </div>
            <div class="row">
              <span class="key">付费用</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.cost==0?'是':'否'}}</span>
            </div>
            <div class="row">
              <span class="key">开始月份</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.month&&row.month.split(' ')[0]}}</span>
            </div>
            <div class="row">
              <span class="key">前置工作进度</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.archaeologicalWorkProgress=='0'?'考古调查':row.archaeologicalWorkProgress=='1'?'考古勘探':row.archaeologicalWorkProgress=='2'?'考古发掘':'暂无'}}</span>
            </div>
          </div>
          <div class="part part-3">
            <div class="row">
              <span class="key">地块名称</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.parcelName}}</span>
            </div>
            <div class="row">
              <span class="key">土地面积</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.landArea}}㎡</span>
            </div>
            <div class="row">
              <span class="key">土地是否已移交</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.transfer==0?'是':'否'}}</span>
            </div>
            <div class="row">
              <span class="key">整地表</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.arrangeLand==0?'是':'否'}}</span>
            </div>
            <div class="row">
              <span class="key">是否签订协议</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.agreement==0?'是':'否'}}</span>
            </div>
            <div class="row">
              <span class="key">预计结束</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.estimatedEndTime&&row.estimatedEndTime.split(' ')[0]}}</span>
            </div>
            <div class="row">
              <span class="key">预警时间</span>
              <span class="value"><span style="color:#fff;">：</span>{{row.workProgressChangeTime&&row.workProgressChangeTime.split(' ')[0]}}</span>
            </div>
          </div>
        </div>
        <div class="img-title">
          <img
            src="../../../../assets/img3/pot_ywtg.png"
            alt=""
            srcset=""
          >
          <span>当前进展</span>
        </div>
        <div class="time-line">
          <div
            class="line-item"
          >
            <div :class="['img',currentStep_1>=1?'active-img':'']">
              <div :class="['line',currentStep_1>=1?'active-line':'']"></div>
            </div>
            <span :class="['text',currentStep_1>=1?'active-text':'']">
              未勘探
            </span>
          </div>
          <div
            class="line-item"
          >
            <div :class="['img',currentStep_1>=2?'active-img':'']">
              <div :class="['line',currentStep_1>=2?'active-line':'']"></div>
            </div>
            <span :class="['text',currentStep_1>=2?'active-text':'']">
              勘探排队中
            </span>
          </div>
          <div
            class="line-item"
          >
            <div :class="['img',currentStep_1>=3?'active-img':'']">
              <div :class="['line',currentStep_1>=3?'active-line':'']"></div>
            </div>
            <span :class="['text',currentStep_1>=3?'active-text':'']">
              完成勘探
            </span>
          </div>
          <div
            class="line-item"
          >
            <div :class="['img',currentStep_1>=4?'active-img':'']">
              <div :class="['line',currentStep_1>=4?'active-line':'']"></div>
            </div>
            <span :class="['text',currentStep_1>=4?'active-text':'']">
              完成勘探，需要补探
            </span>
          </div>
          <div
            class="line-item"
          >
            <div :class="['img',currentStep_1>=5?'active-img':'']">
              <div :class="['line',currentStep_1>=5?'active-line':'']"></div>
            </div>
            <span :class="['text',currentStep_1>=5?'active-text':'']">
              已进场
            </span>
          </div>
        </div>

        <div class="img-title">
          <img
            src="../../../../assets/img3/pot_ywtg.png"
            alt=""
            srcset=""
          >
          <span>发掘情况</span>
        </div>
        <div class="time-line-2">
          <div
            class="line-item"
          >
            <div :class="['img',currentStep_2>=1?'active-img':'']">
              <div :class="['line',currentStep_2>=1?'active-line':'']"></div>
            </div>
            <span :class="['text',currentStep_2>=1?'active-text':'']">
              无需发掘
            </span>
          </div>
          <div
            class="line-item"
          >
            <div :class="['img',currentStep_2>=2?'active-img':'']">
              <div :class="['line',currentStep_2>=2?'active-line':'']"></div>
            </div>
            <span :class="['text',currentStep_2>=2?'active-text':'']">
              正在发掘
            </span>
          </div>
          <div
            class="line-item"
          >
            <div :class="['img',currentStep_2>=3?'active-img':'']">
              <div :class="['line',currentStep_2>=3?'active-line':'']"></div>
            </div>
            <span :class="['text',currentStep_2>=3?'active-text':'']">
              完成发掘
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DialogTitleBox from '../../../newComponents/dialogTitleBox'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    row:{
      type:Object,
      default:()=>{}
    }
  },
  components:{DialogTitleBox},
  data() {
    return {
      currentStep_1:3,
      currentStep_2:2
    }
  },
  watch:{
    isShow(val){
      if(!val) return
      this.currentStep_1 = this.row.progress+1
      this.currentStep_2 = this.row.excavation+1
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

  methods: {

    close() {
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
    // background: rgba(255, 0, 0, 0.288);
    margin-top: 15px;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 0;
    .head {
      position: relative;
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding-left: 50px;
      .title {
        width: 1186px;
        height: 89px;
        background: url('../../../../assets/img2/pop-s-title.png') no-repeat
          center;
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
    }
    .body {
      width: 100%;
      height: calc(100% - 80px);
      box-sizing: border-box;
      padding: 0 15px 0 20px;
      .text-info{
        width:100%;
        height:220px;
        display:flex;
        box-sizing: border-box;
        padding-left: 40px;
        margin-top: 15px;
        .part{
          flex: 1;
          height: 100%;
          box-sizing: border-box;
          padding-bottom: 34px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          .row{
            width: 100%;
            .key{
              display: inline-block;
              width: 110px;
              text-align: justify;
              text-justify:distribute-all-lines; // 这行必加，兼容ie浏览器
              text-align-last: justify;
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              color: #ffffff;
            }
            .value{
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              color: #80d6ff;
            }
          }
        }
        .part-1{
          padding-bottom: 0;
        }
        .part-2 .row .key{
          width: 144px;
        }
        .part-3 .row .key{
          width: 128px;
        }
      }
      .img-title {
        display: flex;
        align-items: center;
        position: relative;
        left: -15px;
        margin: 40px 0px 10px 40px;
        img {
          width: 53px;
          height: 53px;
        }
        span {
          font-family: MicrosoftYaHei-Bold;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #84e1ff;
        }
      }
      .time-line {
        width: 100%;
        display: flex;
        margin-left: 50px;
        .line-item {
          height: 65px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .img {
            width: 33px;
            height: 33px;
            background: url(../../../../assets/img3/ic-g1.png) no-repeat
              center;
            background-size: 100% 100%;
            position: relative;
            .line {
              position: absolute;
              top: 16px;
              left: 31px;
              width: 230px;
              height: 1px;
              background: #9f9f9f;
            }
            .active-line{
              background: #e2c495;
            }
          }
          .text {
            font-family: MicrosoftYaHei;
            font-size: 20px;
            margin-top: 5px;
            color: #9f9f9f;
          }
          .active-text{
            color:#fdd89f;
          }
        }
        .line-item:nth-of-type(1) {
          .img{
            background: url(../../../../assets/img3/ic-g1.png) no-repeat
              center;
          }
          .active-img{
            background: url(../../../../assets/img3/ic-y1.png) no-repeat
              center;
          }
        }
        .line-item:nth-of-type(2) {
          margin-left: 155px;
          .img{
            background: url(../../../../assets/img3/ic-g2.png) no-repeat
              center;
          }
          .active-img{
            background: url(../../../../assets/img3/ic-y2.png) no-repeat
              center;
          }
        }
        .line-item:nth-of-type(3) {
          margin-left: 155px;
          .img{
            background: url(../../../../assets/img3/ic-g4.png) no-repeat
              center;
          }
          .active-img{
            background: url(../../../../assets/img3/ic-y4.png) no-repeat
              center;
          }
        }
        .line-item:nth-of-type(4) {
          margin-left: 115px;
          .img{
            background: url(../../../../assets/img3/ic-g3.png) no-repeat
              center;
          }
          .active-img{
            background: url(../../../../assets/img3/ic-y3.png) no-repeat
              center;
          }
        }
        .line-item:nth-of-type(5) {
          margin-left: 125px;
          .img{
            background: url(../../../../assets/img3/ic-g5.png) no-repeat
              center;
          }
          .active-img{
            background: url(../../../../assets/img3/ic-y5.png) no-repeat
              center;
          }
        }
        .line-item:nth-last-child(1) {
          .line {
            display: none;
          }
        }
      }

      .time-line-2 {
        width: 100%;
        display: flex;
        margin-left: 50px;
        .line-item {
          height: 65px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .img {
            width: 33px;
            height: 33px;
            background: url(../../../../assets/img3/ic-g6.png) no-repeat
              center;
            background-size: 100% 100%;
            position: relative;
            .line {
              position: absolute;
              top: 16px;
              left: 31px;
              width: 450px;
              height: 1px;
              background: #9f9f9f;
            }
            .active-line{
              background: #00b168;
            }
          }
          .text {
            font-family: MicrosoftYaHei;
            font-size: 20px;
            margin-top: 5px;
            color: #9f9f9f;
          }
          .active-text{
            color:#2fd692;
          }
        }
        .line-item:nth-of-type(1) {
          .img{
            background: url(../../../../assets/img3/ic-g6.png) no-repeat
              center;
          }
          .active-img{
            background: url(../../../../assets/img3/ic-y6.png) no-repeat
              center;
          }
        }
        .line-item:nth-of-type(2) {
          margin-left: 400px;
          .img{
            background: url(../../../../assets/img3/ic-g7.png) no-repeat
              center;
          }
          .active-img{
            background: url(../../../../assets/img3/ic-y7.png) no-repeat
              center;
          }
        }
        .line-item:nth-of-type(3) {
          margin-left: 375px;
          .img{
            background: url(../../../../assets/img3/ic-g8.png) no-repeat
              center;
          }
          .active-img{
            background: url(../../../../assets/img3/ic-y8.png) no-repeat
              center;
          }
        }
        .line-item:nth-last-child(1) {
          .line {
            display: none;
          }
        }
      }
    }
  }
}
</style>
