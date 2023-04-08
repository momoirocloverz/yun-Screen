<template>
  <div
    class="mask"
    v-if="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">事件详情</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <DialogTitleBox :title="'事件信息'" />
        <div class="info-box">
          <div class="part-1">
            <div class="row">
              <div class="col">
                <span>文物名称：</span>
                <span>务本堂</span>
              </div>
              <div class="col">
                <span>事件类型：</span>
                <span>例行检查</span>
              </div>
              <div class="col">
                <span>事件编号：</span>
                <span>LXJC0001</span>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <span>发布时间：</span>
                <span>2022-05-05 10:09:56</span>
              </div>
              <div class="col">
                <span>巡查时间：</span>
                <span>2022-05-06 12:32:25</span>
              </div>
              <div class="col">
                <span>完成时间：</span>
                <span>2022-05-07 09:30:46</span>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <span>检查人员：</span>
                <span>田欢乐</span>
              </div>
              <div class="col">
                <span>联系电话：</span>
                <span>15378659878</span>
              </div>
              <div class="col">
                <span>检查结果：</span>
                <span>发现安全隐患</span>
              </div>
            </div>
          </div>
          <div class="part-2">
            <div class="title">隐患描述：</div>
            <div class="content">
              <div class="item">
                <div class="col-1">
                  <span>
                    1、消防水源不满足使用需求
                  </span>
                </div>
                <div class="col-2">
                  查看现场图片
                </div>
                <div class="col-3">
                  <span>
                    处置依据：《文物建筑电气防火导则》 5.2.4
                  </span>
                </div>
                <div class="col-4">
                  查看详情
                </div>
                <div class="col-5">
                  5.2.4 当设置消防水池时，应符合下列要求： <br />
                  1、消防水池有的效容积应按火灾延续时间内，将其作统的火灾延续时间不应小于表5.52.4的规定; <br />
                  2、消防用水与生产、生活用水合并的水池、应采取确保消防用水不作它用的技术措施;
                </div>
              </div>
              <div class="item">
                <div class="col-1">
                  <span>
                    2、电源插座（含拖线电源插座）、照明开关是否直接安装、放置在木质等可燃材料上
                  </span>
                </div>
                <div class="col-2">
                  查看现场图片
                </div>
                <div class="col-3">
                  <span>
                    处置依据：《文物建筑电气防火导则》 9.2.6
                  </span>
                </div>
                <div class="col-4">
                  查看详情
                </div>
                <div class="col-5">
                  9.2.6 当设置消防水池时，应符合下列要求：<br />
                  1、消防水池有的效容积应按火灾延续时间内，将其作统的火灾延续时间不应小于表5.52.4的规定;<br />
                  2、消防用水与生产、生活用水合并的水池、应采取确保消防用水不作它用的技术措施;
                </div>
              </div>
            </div>
          </div>
          <div class="part-3">
            <div class="row">
              <div class="col">
                <span>处置部门：</span>
                <span>进化镇人民政府</span>
              </div>
              <div class="col">
                <span>处置时间：</span>
                <span>7个工作日</span>
              </div>
              <div class="col">
              </div>
            </div>
          </div>
        </div>

        <div class="img-container">
          <div class="time">
            <DialogTitleBox :title="'事件追踪'" />
            <div class="time-box">
              <el-timeline>
                <el-timeline-item
                  timestamp="2022/05/31 09:12:05"
                  placement="top"
                >
                  <div class="content">
                    <div
                      class="depart"
                      :style="{background:`url(${img_1}) no-repeat center`,width:`${226/192}rem`}"
                    >
                      文物安全监测处置应用系统
                    </div>
                    <span>
                      发布一网统管任务
                    </span>
                  </div>
                </el-timeline-item>
                <el-timeline-item
                  timestamp="2022/05/31 09:12:29"
                  placement="top"
                >
                  <div class="content">
                    <div
                      class="depart"
                      :style="{background:`url(${img_2}) no-repeat center`,width:`${96/192}rem`}"
                    >
                      区智中心
                    </div>
                    <span>
                      签收成功
                    </span>
                  </div>

                </el-timeline-item>
                <el-timeline-item
                  timestamp="2022/05/31 10:18:51"
                  placement="top"
                >
                  <div class="content">
                    <div
                      class="depart"
                      :style="{background:`url(${img_3}) no-repeat center`,width:`${96/192}rem`}"
                    >
                      镇街
                    </div>
                    <span>
                      提交整改反馈
                    </span>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
          <div class="process">
            <DialogTitleBox :title="'事件处置进展'" />
            <img
              :src="processImgSrc"
              alt=""
            >
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import DialogTitleBox from '../../../newComponents/dialogTitleBox'
export default {
  components: { DialogTitleBox },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      processImgSrc: require('../../../../assets/img2/floww-chart6.png'),

      img_1: require('../../../../assets/img2/1.png'),
      img_2: require('../../../../assets/img2/2.png'),
      img_3: require('../../../../assets/img2/3.png'),
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
  background: url('../../../../assets/img2/pop-bg.png') no-repeat center;
  background-size: 100%;
  z-index: 1000;
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
      display: flex;
      flex-direction: column;
      overflow: auto;
      .info-box {
        width: 100%;
        height: auto;
        background: url('../../../../assets/img2/b-line1.png') no-repeat bottom;
        background-size: 100% auto;
        background-position-x: center;
        .part-1 {
          width: 100%;
          height: 110px;
          box-sizing: border-box;
          padding-left: 50px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          .row {
            width: 100%;
            height: 33%;
            display: flex;
            // justify-content: flex-start;
            // align-items: center;
            .col {
              width: 33%;
              height: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              span:nth-child(1) {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
              span:nth-child(2) {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #80d6ff;
              }
            }
          }
        }
        .part-2 {
          width: 100%;
          // height: 110px;
          box-sizing: border-box;
          padding-left: 50px;
          margin-top: 5px;
          .title {
            font-family: MicrosoftYaHei;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
          }
          .content {
            width: 100%;
            height: 280px;
            overflow: auto;
            box-sizing: border-box;
            padding-left: 10px;
            .item {
              width: 100%;
              height: 139px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .col-1 {
                height: 100%;
                width: 293px;
                background: url('../../../../assets/img2/base-a.png') no-repeat;
                background-size: 100% auto;
                background-position-y: 95%;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                  padding: 0 12px;
                  text-align: center;
                  font-family: SourceHanSansCN-Medium;
                  font-size: 18px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
              .col-2 {
                width: 140px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: url('../../../../assets/img2/btn-b.png') no-repeat
                  center;
                background-size: 100% 100%;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 2px;
                color: #ffffff;
              }
              .col-3 {
                width: 335px;
                height: 60px;
                overflow: auto;
                box-sizing: border-box;
                padding: 0 10px;
                background: url('../../../../assets/img2/base-c.png') no-repeat
                  top;
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                  font-family: SourceHanSansCN-Medium;
                  font-size: 18px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffffff;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  &::before {
                    content: '';
                    display: inline-block;
                    margin-right: 5px;
                    height: 9px;
                    width: 9px;
                    border-radius: 50%;
                    background: #85d7f9;
                  }
                }
              }
              .col-4 {
                width: 120px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: url('../../../../assets/img2/btn-d.png') no-repeat
                  center;
                background-size: 100% 100%;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 2px;
                color: #ffffff;
              }
              .col-5 {
                width: 475px;
                height: 100%;
                overflow: auto;
                box-sizing: border-box;
                padding: 0 10px;
                background: url('../../../../assets/img2/base-e.png') no-repeat
                  top;
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: SourceHanSansCN-Medium;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
            }
          }
        }
        .part-3 {
          width: 100%;
          height: 70px;
          box-sizing: border-box;
          padding-left: 50px;
          .row {
            width: 100%;
            height: 100%;
            display: flex;
            // justify-content: flex-start;
            // align-items: center;
            .col {
              width: 33%;
              height: 100%;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              span:nth-child(1) {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
              span:nth-child(2) {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #80d6ff;
              }
            }
          }
        }
      }
      .img-container {
        width: 100%;
        height: 600px;
        display: flex;
        .time {
          width: 620px;
          height: 600px;
          display: flex;
          flex-direction: column;
          .time-box {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-left: 80px;
            background: red;
            background: url('../../../../assets/img2/b-line2.png') no-repeat
              right;
            background-size: auto 100%;
            .el-timeline {
              margin-top: 30px;
              .el-timeline-item {
                .content {
                  width: 400px;
                  height: 100px;
                  // background: #fff;
                  .depart {
                    color: rgb(255, 255, 255);
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 35px;
                    background-size: 100% 100% !important;
                  }
                  span {
                    display: block;
                    font-family: MicrosoftYaHei;
                    font-size: 20px;
                    margin-top: 5px;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
        .process {
          flex: 1;
          height: 600px;
          display: flex;
          flex-direction: column;
          img {
            margin-top: 10px;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>


