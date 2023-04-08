<template>
  <div
    class="mask_process"
    v-show="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <!-- <img src="../../assets/img2/r@2x.png" width="50px" height="50px" alt="" srcset=""> -->
            <span class="text">任务详情</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <div class="row">
          <span>涉及文物：</span>
          <span>{{ this.info.pointName }}</span>
        </div>
        <div class="row">
          <span>任务类别：</span>
          <span>{{ this.info.checkType }}</span>
        </div>
        <div class="row">
          <span>提交时间：</span>
          <span>{{ this.info.createTime }}</span>
        </div>
        <!-- <div class="row">
          <span>任务处置进程：</span>
        </div> -->

        <!-- <HightLine
          v-if="true"
          :key="keys"
        /> -->
        <div
          class='processImg'
          :style="{'background': `url(${processImg}) no-repeat center`}"
        ></div>
        <div class="step">
          <!-- <div class="step-text" :class="[activeStep>=1?'finish-step':'']">
                      <span>2022-05-25 10:00</span>
                      <span>文化遗产科操作员</span>
                      <span>发布任务</span>
                  </div>
                  <div class="step-text" :class="[activeStep>=2?'finish-step':'']">
                      <span>2022-05-25 10:30</span>
                      <span>镇街操作员</span>
                      <span>接受任务</span>
                  </div>
                  <div class="step-text" :class="[activeStep>=3?'finish-step':'']">
                      <span>2022-05-25 11:00</span>
                      <span>文保所指导</span>
                      <span>提交评定结果</span>
                  </div>
                  <div class="step-text" :class="[activeStep>=4?'finish-step':'']">
                      <span>2022-05-25 11:30</span>
                      <span>专家复核</span>
                      <span>生成评定备案号</span>
                  </div>
                  <div class="step-text" :class="[activeStep>=5?'finish-step':'']">
                      <span>2022-05-25 12:00</span>
                      <span>材料归档</span>
                      <span>任务完成</span>
                  </div> -->
        </div>
        <!-- <el-steps :space="200" :active="activeStep" finish-status="success">
                <el-step title=""></el-step>
                <el-step title=""></el-step>
                <el-step title=""></el-step>
                <el-step title=""></el-step>
                <el-step title=""></el-step>
              </el-steps> -->
      </div>
    </div>
  </div>
</template>

<script>
import TableC from './table'
import HightLine from './HightLine'

export default {
  components: { TableC, HightLine },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
      default: '1',
    },
    info: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      line: '1',
      keys: +new Date(),
      activeStep: 2,
      processImg: require('../../assets/img2/floww-chart.png'),
    }
  },
  watch: {
    logo() {
      console.log('klkl1234', this.info)
      let taskType = this.info.checkType
      switch (taskType) {
        case '一网统管':
          this.processImg = require('../../assets/img2/floww-chart2.png')
          break
        case '文物定级':
          this.processImg = require('../../assets/img2/floww-chart3.png')
          break
        case '文物体检':
          this.processImg = require('../../assets/img2/floww-chart4.png')
          break
        case '安全整改':
          this.processImg = require('../../assets/img2/floww-chart5.png')
          break
        case '例行检查':
          this.processImg = require('../../assets/img2/floww-chart6.png')
          break
        default:
          this.processImg = require('../../assets/img2/floww-chart.png')
          break
      }
    },
  },
  mounted() {
    console.log('klkl123', this.info)
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
.mask_process {
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
  z-index: 1001;
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
      height: 87px;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding-left: 50px;
      //   .title {
      //     width: 395px;
      //     height: 100%;
      //     background: url("../../assets/img2/pop-title-bg.png") no-repeat center;
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
        background: url('../../assets/img2/-s-ic_guanbi.png');
        background-size: 100%;
      }
    }
    .body {
      position: relative;
      width: 100%;
      height: calc(100% - 87px);
      box-sizing: border-box;
      padding: 0 100px;
      padding-top: 8px;
      display: flex;
      flex-wrap: wrap;
      .row {
        margin: 20px;
        margin-bottom: 0;
        span:nth-child(1) {
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 21px;
          letter-spacing: 0px;
          color: #ffffff;
        }
        span:nth-child(2) {
          font-family: Arial-BoldMT;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #4ae3ff;
        }
      }
      .processImg {
        width: 1040px;
        height: 540px;
        // background: url('../../assets/img2/floww-chart.png') no-repeat center;
        background-size: 100% 100% !important;
        background-position-y: 0px !important;
      }
      .step {
        width: 950px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        .step-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          span {
            font-family: MicrosoftYaHei;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 21px;
            letter-spacing: 0px;
            color: #ffffff;
            margin: 5px 0;
          }
        }
        .finish-step {
          span {
            color: #4ae3ff;
          }
        }
      }
    }
  }
}
</style>
