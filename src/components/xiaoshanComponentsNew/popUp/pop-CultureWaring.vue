<template>
  <div
    v-bind:id="'popupDiv' + popId"
    class="mapPop"
    v-bind:ref="'nmaPop-' + levelNum"
    v-on:click="clickStick('popupDiv' + popId)"
  >
    <div class="container">
      <div class="mapPop-title">
        <div class="mapPop-name">{{ rhdata.name }}火灾隐患预警</div>
        <div v-on:click.stop="pop_close" class="close-btn"></div>
      </div>
      <div class="mapPop-content">
        <div class="text">文物单位内居民厨房烟感报警。</div>

        <div class="now-warning">
          <img
            src="../../../assets/img/alert-icon@2x.png"
            alt=""
            srcset=""
            width="20px"
            height="20px"
          />
          <span>当前预警</span>
        </div>

        <div class="row_1">
          <div class="scroll">
            <div class="arrow arrow_1" @click="preOne"></div>

            <div class="box">
              <div class="content" ref="content" :style="{ left: `${left}px` }">
                <div class="item" v-for="(item, index) in itemArr" :key="index">
                  <div v-show="currentIndex !== index" class="mask"></div>
                  <img
                    src="../../../assets/img/alert-icon@2x.png"
                    alt=""
                    srcset=""
                    width="20px"
                    height="20px"
                  />
                  <span>{{ index + 1 }}</span>
                </div>
              </div>
            </div>

            <div class="arrow arrow_2" @click="nextOne"></div>
            <span>共{{ itemArr.length }}个</span>
          </div>
          <div class="btn">
            批量完结所有预警
          </div>
        </div>

        <div class="row_2">
          <div class="date">
            <img
              src="../../../assets/img/a-icon@2x.png"
              alt=""
              srcset=""
              width="18px"
              height="18px"
            />
            预警时间：2022.05.05/11:30:28
          </div>
          <div class="detail_btn">
            预警消息推送详情
            <img
              src="../../../assets/img/arrow@2x.png"
              alt=""
              srcset=""
              width="8px"
              height="15px"
            />
          </div>
          <div class="mute_btn">
            <img
              src="../../../assets/img/c-icon@2x.png"
              alt=""
              srcset=""
              width="14px"
              height="17px"
            />
            远程消音
          </div>
        </div>

        <div class="row_3">
          <div class="finish_btn">完结本次任务</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
let popzIndex = 0;

export default {
  name: "pop-cultureWarning",
  props: {
    rhdata: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      popId: "",
      levelNum: 0, //层级
      // rhdata: {},
      currentIndex: 0,
      itemArr: [{}, {}, {}, {}, {}, {}, {}, {}],
      left: 0
    };
  },
  methods: {
    pop_close() {
      eventBus.$emit("removePopUp");
    },
    clickStick(id) {
      ++popzIndex;
      let stick = document.getElementById(id);
      if (stick !== null) {
        stick.style.zIndex = popzIndex;
        stick.style.position = "fixed";
      }
    },
    preOne() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      }
      if (this.currentIndex % 3 == 2) {
        this.left += 212;
      }
    },
    nextOne() {
      if (this.currentIndex < this.itemArr.length - 1) {
        this.currentIndex += 1;
      }
      if (this.currentIndex % 3 == 0) {
        this.left -= 212;
      }
    }
  }
};
</script>

<style scoped lang="less">
.mapPop {
  width: 630px;
  height: 395px;
  color: #fff;
  font-family: Microsoft YaHei;
  position: absolute;
  left: -330px;
  top: -395px;
  pointer-events: none;
  z-index: 2;
  visibility: visible;
  .container {
    position: absolute;
    // left: -55%;
    // top: -58%;
    width: 100%;
    height: 100%;
    background: url("../../../assets/img/pop-box1.png") no-repeat center;
    padding: 10px;
    box-sizing: border-box;
    pointer-events: auto;
    .mapPop-title {
      width: 100%;
      height: 60px;
      font-size: 15px;
      font-weight: bolder;
      letter-spacing: 2px;
      padding: 5px 8px;
      min-height: 30px;
      box-sizing: border-box;
      position: relative;
      .mapPop-name {
        margin-left: 10px;
        font-family: SourceHanSansCN-Bold;
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        line-height: 60px;
      }

      .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 33px;
        height: 33px;
        background: url("../../../assets/img/close.png");
        background-size: 100% 100%;
        pointer-events: auto;
      }
    }
    .mapPop-content {
      font-size: 15px;
      padding: 20px 18px 0 18px;
      box-sizing: border-box;
      height: calc(100% - 60px);
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #0560b6a1;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.2);
      }
      .text {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-family: SourceHanSansCN-Regular;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #f5fdff;
      }
      .now-warning {
        width: 173px;
        height: 37px;
        background: url("../../../assets/img/alert-img.png") no-repeat center;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: -5px;
        img {
          margin: 0 10px 0 30px;
        }
        span {
          font-family: SourceHanSansCN-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
      .row_1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 84px;
        background: url("../../../assets/img/x-line.png") bottom no-repeat;
        .scroll {
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .arrow {
            width: 33px;
            height: 33px;
            cursor: pointer;
          }
          .arrow_1 {
            background: url("../../../assets/img/right-arrow.png") center
              no-repeat;
            margin-right: 18px;
          }
          .arrow_2 {
            background: url("../../../assets/img/left-arrow.png") center
              no-repeat;
            margin-left: 18px;
          }
          .box {
            width: 212px;
            height: 33px;
            position: relative;
            box-sizing: border-box;
            overflow-x: hidden;
            .content {
              position: absolute;
              top: 0;
              left: 0;
              height: 33px;
              display: flex;
              justify-content: center;
              align-items: center;
              transition: left 0.5s;
              .item {
                margin: 0 5px;
                width: 61px;
                height: 33px;
                background: url("../../../assets/img/r-btn.png") center
                  no-repeat;
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 0 5px;
                box-sizing: border-box;
                position: relative;
                .mask {
                  position: absolute;
                  width: 61px;
                  height: 33px;
                  background: rgba(1, 27, 61, 0.39);
                }
                span {
                  font-family: Arial-BoldMT;
                  font-size: 19px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 22px;
                  letter-spacing: 0px;
                  color: #ffd3d3;
                }
              }
            }
          }

          span {
            font-family: SourceHanSansCN-Medium;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffd3d3;
            margin-left: 10px;
          }
        }
        .btn {
          width: 145px;
          height: 33px;
          background: url("../../../assets/img/btn1.png") center no-repeat;
          font-family: AdobeHeitiStd-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 33px;
          text-align: center;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
      .row_2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        margin: 10px 0;
        .date {
          width: 282px;
          height: 34px;
          background: url("../../../assets/img/b-btn.png") center no-repeat;
          font-family: SourceHanSansCN-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #65fdff;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            margin: 0 5px;
          }
        }
        .detail_btn {
          width: 152px;
          height: 33px;
          text-align: center;
          background: url("../../../assets/img/btn2.png") center no-repeat;
          font-family: SourceHanSansCN-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #c9dfff;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            margin-top: 2px;
            margin-left: 5px;
          }
        }
        .mute_btn {
          width: 109px;
          height: 33px;
          background: url("../../../assets/img/btn3.png") center no-repeat;
          text-align: center;
          font-family: SourceHanSansCN-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #c9dfff;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            margin-top: 2px;
            margin-right: 5px;
          }
        }
      }
      .row_3 {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .finish_btn {
          width: 109px;
          height: 37px;
          background: url("../../../assets/img/btn4.png") center no-repeat;
          line-height: 33px;
          text-align: center;
          font-family: SourceHanSansCN-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #fff;
        }
      }
    }
  }
}
</style>
