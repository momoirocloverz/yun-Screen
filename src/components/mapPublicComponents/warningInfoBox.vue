<template>
  <div class="mask" v-show="isShow">
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <img
              src="../../assets/img2/r@2x.png"
              width="50px"
              height="50px"
              alt=""
              srcset=""
            />
            <span class="text">预警详情</span>
          </div>
        </div>
        <div class="close" @click="close"></div>
      </div>
      <div class="body">
        <div class="part1">
          <DialogTitleBox :title="'预警列表'" />
          <div class="list">
            <div class="item" v-for="(item, index) in yjList" :key="index">
              <div
                class="text"
                :class="[currentIndex == index ? 'active' : '']"
                @click="listClick(item, index)"
              >
                <span>{{ index + 1 }}、</span>
                <span>{{ item.source }} : </span>
                <span>{{ item.content }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="part2">
          <DialogTitleBox :title="'预警详情'" />
          <div class="info">
            <div class="row">
              <span class="point"></span>
              <span class="text">预警时间：{{ detailData.time }}</span>
            </div>
            <div class="row">
              <span class="point"></span>
              <span class="text">预警类型：智能火感预警</span>
            </div>
            <div class="row">
              <span class="point"></span>
              <span class="text">预警位置：萧山区进化镇欢潭村</span>
            </div>
            <div class="row">
              <span class="point"></span>
              <span class="text">预警文物点：务本堂</span>
            </div>
          </div>
          <div class="img">
            <img src="../../assets/img2/plane-wbt-1.png" alt="" srcset="" />
            <PlanePoi :title="'离火监控'" :top="'0.55rem'" :left="'-0.13rem'" />
          </div>
        </div>
        <div class="part3">
          <DialogTitleBox :title="'预警联动'" />
          <div class="table-title">
            <div class="text">联动人员</div>
          </div>
          <div class="info">
            <div class="item">
              <img src="../../assets/img2/img-box2.png" alt="" srcset="" />
              <div class="right">
                <div class="row1">
                  <span>田欢乐</span>
                  <span>13606717524</span>
                </div>
                <div class="row">短信通知 已推送</div>
                <div class="row">{{ detailData.time }}</div>
              </div>
            </div>
            <div class="item">
              <img src="../../assets/img2/img-box2.png" alt="" srcset="" />
              <div class="right">
                <div class="row1">
                  <span>洪波</span>
                  <span>82454003</span>
                </div>
                <div class="row">短信通知 已推送</div>
                <div class="row">{{ detailData.time }}</div>
              </div>
            </div>
          </div>
          <DialogTitleBox :title="'预警处置'" />
          <div class="btn-box">
            <div class="btn" @click="btnClick">
              完结本次任务
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DialogTitleBox from "../newComponents/dialogTitleBox";
import PlanePoi from "./planePoi";
export default {
  components: { DialogTitleBox, PlanePoi },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object,
      default: () => {
        time: "2022.06.24 10:22:23";
      }
    }
  },
  data() {
    return {
      yjList: [
        {
          source: "物联感知监测",
          content: "智能火感预警"
        }
      ],
      currentIndex: 0
    };
  },
  mounted() {
    console.log("klkl", this.isShow);
    // 挂载到body下
    this.$nextTick(() => {
      const body = document.querySelector("body");
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  },
  methods: {
    listClick(item, index) {
      this.currentIndex = index;
    },
    btnClick() {
      this.$emit("cancelWarning");
    },
    close() {
      this.$emit("close");
    }
  }
};
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
  background: url("../../assets/img2/f-dialogs-box.png") no-repeat center;
  background-size: 100%;
  z-index: 999;
  .info-container {
    width: 1299px;
    height: 807px;
    // background: rgba(255, 0, 0, 0.288);
    margin-top: 15px;
    box-sizing: border-box;
    padding: 30px;
    .head {
      position: relative;
      width: 100%;
      height: 87px;
      .title {
        width: 395px;
        height: 100%;
        background: url("../../assets/img2/pop-title-bg.png") no-repeat center;
        background-size: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        .top-box {
          width: 100%;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          box-sizing: border-box;
          padding-left: 40px;
          img {
            width: 50px;
            height: 50px;
          }
          .text {
            font-family: SourceHanSansCN-Bold;
            font-size: 30px;
            font-weight: 900;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #f5fdff;
            margin-left: 20px;
            text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
            background: linear-gradient(180deg, #ffffff 26%, #f0584f 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .close {
        position: absolute;
        top: 0;
        right: 0px;
        width: 34px;
        height: 34px;
        background: url("../../assets/img2/-s-ic_guanbi.png");
        background-size: 100%;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 87px);
      box-sizing: border-box;
      display: flex;
      .part1 {
        height: 100%;
        flex: 4;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        .list {
          width: 100%;
          box-sizing: border-box;
          padding: 0 10px;
          padding-top: 20px;
          .item {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-family: MicrosoftYaHei;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
            border-bottom: 1px solid rgba(21, 110, 157, 0.3);
            .text {
              width: 100%;
              height: 39px;
              box-sizing: border-box;
              padding-left: 5px;
              line-height: 39px;
              cursor: pointer;
              &:hover {
                background: url("../../assets/img2/txt-s-bg2.png") no-repeat
                  left;
                background-size: 100%;
              }
            }
            .active {
              background: url("../../assets/img2/txt-s-bg2.png") no-repeat left;
              background-size: 100%;
            }
          }
        }
      }
      .part2 {
        height: 100%;
        flex: 5;
        background: url("../../assets/img2/hr-y.png") no-repeat left;
        background-size: auto 100%;
        box-sizing: border-box;
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .info {
          width: 100%;
          box-sizing: border-box;
          padding-left: 22px;
          padding-top: 20px;
          margin-bottom: 20px;
          .row {
            width: 100%;
            height: 40px;
            border-top: 1px solid rgba(21, 110, 157, 0.3);
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .point {
              height: 17px;
              width: 17px;
              background: url("../../assets/img2/dot.png") no-repeat center;
              background-size: 100%;
              margin-right: 10px;
            }
            .text {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #ffffff;
            }
          }
        }
        .img {
          position: relative;
          width: 100%;
          height: 389px;
          //   background: url("../../assets/img2/frame.png") no-repeat center;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100%;
            height: 389px;
          }
        }
      }
      .part3 {
        height: 100%;
        flex: 5;
        background: url("../../assets/img2/hr-y.png") no-repeat left;
        background-size: auto 100%;
        box-sizing: border-box;
        padding-left: 20px;
        .table-title {
          width: 100%;
          height: 36px;
          margin: 30px 0;
          .text {
            width: 262px;
            height: 100%;
            background: url("../../assets/img2/title-s.png") no-repeat center;
            background-size: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: MicrosoftYaHei;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 1px;
            color: #eceff4;
          }
        }
        .info {
          width: 100%;
          box-sizing: border-box;
          padding-left: 10px;
          margin-bottom: 15px;
          .item {
            width: 100%;
            height: 110px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            img {
              width: 73px;
              height: 91px;
            }
            .right {
              height: 100%;
              width: 311px;
              .row1 {
                width: 100%;
                height: 41px;
                box-sizing: border-box;
                padding-left: 40px;
                display: flex;
                align-items: center;
                background: url("../../assets/img2/pop-title.png") no-repeat
                  center;
                background-size: 100%;
                span:nth-child(1) {
                  font-family: MicrosoftYaHei-Bold;
                  font-size: 20px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 29px;
                  letter-spacing: 0px;
                  color: #ffffff;
                  margin-right: 10px;
                }
                span:nth-child(2) {
                  font-family: MicrosoftYaHei;
                  font-size: 16px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 29px;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
              .row {
                box-sizing: border-box;
                padding-left: 40px;
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 29px;
                letter-spacing: 0px;
                color: #51c0e9;
              }
            }
          }
        }
        .btn-box {
          width: 100%;
          box-sizing: border-box;
          padding-top: 30px;
          padding-left: 50px;
          .btn {
            width: 146px;
            height: 41px;
            background: url("../../assets/img2/suc-btn.png") no-repeat center;
            background-size: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: MicrosoftYaHei;
            font-size: 18px;
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
  }
}
</style>
