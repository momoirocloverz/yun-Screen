<template>
  <div
    class="container"
    v-show="isShow"
  >
    <div class="head-text">{{ headText }}</div>
    <div
      class="close"
      @click="close"
    ></div>
    <div class="body">
      <div class="part-1">
        <div class="text">资金使用流程</div>
        <div class="process">
          <div
            class="bgImg"
            :style="{ background: `url(${true ? img_g : img_b})`,'background-size': '100% '}"
          >
            申请
          </div>
          <img
            src="../../../../assets/img2/arrow.png"
            alt=""
            srcset=""
            width="34px"
            height="26px"
          />
          <div
            class="bgImg"
            :style="{ background: `url(${true ? img_g : img_b})`,'background-size': '100% ' }"
          >
            审批
          </div>
          <img
            src="../../../../assets/img2/arrow.png"
            alt=""
            srcset=""
            width="34px"
            height="26px"
          />
          <div
            class="bgImg"
            :style="{ background: `url(${false ? img_g : img_b})`,'background-size': '100% ' }"
          >
            拨付
          </div>
          <img
            src="../../../../assets/img2/arrow.png"
            alt=""
            srcset=""
            width="34px"
            height="26px"
          />
          <div
            class="bgImg"
            :style="{ background: `url(${false ? img_g : img_b})`,'background-size': '100% ' }"
          >
            使用
          </div>
          <img
            src="../../../../assets/img2/arrow.png"
            alt=""
            srcset=""
            width="34px"
            height="26px"
          />
          <div
            class="bgImg"
            :style="{ background: `url(${false ? img_g : img_b})`,'background-size': '100% ' }"
          >
            核查
          </div>
        </div>
      </div>
      <div class="part-2">
        <div class="left">
          <div class="row">
            <div class="half">
              <span>申请单位 : </span>
              <span>务本堂</span>
            </div>
            <div class="half">
              <span>直接责任单位 : </span>
              <span>进化镇</span>
            </div>
          </div>
          <div class="row">
            <div class="half">
              <span>申请人 : </span>
              <span>张三</span>
            </div>
            <div class="half">
              <span>联系电话 : </span>
              <span>13912546532</span>
            </div>
          </div>
          <div class="row row3">
            <div class="half">
              <span>申请内容 : </span>
              <span>务本堂部分消防设施老旧、发霉、需要更换</span>
            </div>
          </div>
          <div class="row row4">
            <div class="half">
              <span>资金估算 : </span>
              <span>1500</span>
            </div>
            <div class="half btn">查看附件清单</div>
          </div>
        </div>
        <div class="right">
          <div class="text">现场照片</div>
          <div class="img">
            <img
              src="../../../../assets/img2/wbt_zj.png"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>
      <div class="part-3">
        <div class="btn-1">驳回申请</div>
        <div class="btn-2">审批通过</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headText: '资金申请详情',
      img_g: require('../../../../assets/img2/flow_sheet_g.png'),
      img_b: require('../../../../assets/img2/flow_sheet_blue.png'),
    }
  },
  methods: {
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
  left: 437px;
  width: 617px;
  height: 441px;
  background: url('../../../../assets/img2/pop4.png') no-repeat center;
  background-size: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  z-index: 13;
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
    .part-1 {
      .text {
        font-family: MicrosoftYaHei;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        margin: 20px 0 20px 28px;
      }
      .process {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 34px;
          height: 26px;
        }
        .bgImg {
          width: 79px;
          height: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 44px;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
    }
    .part-2 {
      height: 230px;
      box-sizing: border-box;
      padding-left: 28px;
      display: flex;
      justify-content: space-between;
      .left {
        width: 360px;
        height: 100%;
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 15px 0;
          .half:nth-child(1) {
            flex: 0.9;
          }
          .half:nth-child(2) {
            flex: 1;
          }
          .half {
            span:nth-child(1) {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #a2c0d1;
            }
            span:nth-child(2) {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              letter-spacing: 0px;
              color: #51c0e9;
            }
          }
        }
        .row3 {
          .half {
            display: flex;
            align-items: flex-start;
            span:nth-child(2) {
              display: inline-block;
              max-height: 70px;
              width: 240px;
              margin-left: 5px;
            }
          }
        }
        .row4 {
          .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 136px;
            height: 31px;
            background: url('../../../../assets/img2/b-btn1.png') no-repeat
              center;
            background-size: 100%;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 2px;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
      .right {
        width: 169px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .text {
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #a2c0d1;
        }
        .img {
          width: 152px;
          height: 173px;
          background: url('../../../../assets/img2/img-box.png') no-repeat
            center;
          background-size: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 140px;
            height: 158px;
          }
        }
      }
    }
    .part-3 {
      box-sizing: border-box;
      padding-left: 28px;
      display: flex;
      .btn-1 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 106px;
        height: 41px;
        background: url('../../../../assets/img2/b-btn2.png');
        background-size: 100%;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 2px;
        color: #ffffff;
        cursor: pointer;
      }
      .btn-2 {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 24px;
        width: 106px;
        height: 41px;
        background: url('../../../../assets/img2/g-btn1.png');
        background-size: 100%;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 2px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
