<template>
  <div
    class="mask"
    v-show="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">精密智控</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <div class="top">
          <div
            :class="['item',currentIndex===index?'item-active':'item-normal']"
            v-for="(item,index) in tabData"
            :key="index+40"
            @click="tabClick(item,index)"
          >
            <img
              v-if="currentIndex===index"
              :src="item.imgSrc_active"
              alt=""
              srcset=""
            >
            <img
              v-else
              :src="item.imgSrc"
              alt=""
              srcset=""
            >
            <div class="info">
              <span>{{item.name}}</span>
              <span>{{item.num}}</span>
            </div>
          </div>
        </div>
        <div
          class="camera"
          v-show="isShow_1"
        >
          <div class="left">
            <div class="list">
              <div
                class="item"
                v-for="(item,index) in cameraList"
                :key="index+10"
                @click="listClick(item,index)"
                :class="[currentCameraIndex==index?'active':'']"
              >
                <div class="left-img">
                  <img
                    v-if="currentCameraIndex==index"
                    src="../../../../assets/img2/v-icon-s@2x.png"
                    alt=""
                    srcset=""
                  >
                  <img
                    v-else
                    src="../../../../assets/img2/v-icon@2x.png"
                    alt=""
                    srcset=""
                  >
                  <span>{{item.cameraName}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right" v-if="cameraType!=='hls'">
            <VideoBox
              :index="0"
              :videoId="cameraIndexCode"
              :width="'4.0625rem'"
              :height="'2.39584rem'"
              :autoplay="false"
            />
          </div>
          <div class="right" v-else>
            <VideoBoxXG
              :index="0"
              :videoId="cameraIndexCode"
              :width="'4.0625rem'"
              :height="'2.39584rem'"
              :autoplay="true"
            />
          </div>
        </div>

        <div
          class="water"
          v-show="isShow_2"
        >
          <div
            class="item"
            v-for="(item,index) in waterList"
            :key="index+20"
          >
            <!-- <img
              src="../../../../assets/img3/eg-img.png"
              alt=""
              srcset=""
            > -->
            <div class="gauge">
              <div class="box">
                <Gauge :chartData="0" />
              </div>

            </div>
            <div class="row1">
              <div>水压值</div>
              <div>{{item.valueStr||'0.00Mpa'}}</div>
            </div>
            <div class="row2">
              <div>设备名称：{{item.srcName}}</div>
              <div>设备位置：{{item.bumpPointName}}</div>
            </div>
          </div>
        </div>

        <div
          class="electricity"
          v-show="isShow_3"
        >
          <div
            class="item"
            v-for="(item,index) in electricityList"
            :key="index+30"
          >
            <img
              src="../../../../assets/img3/e-icon.png"
              alt=""
            >
            <div class="info">
              <div class="row">{{item.detectionValue&&item.detectionValue.split(":")[0]}}</div>
              <div class="row"> {{item.detectionValue&&item.detectionValue.split(":")[1]}}</div>
              <div class="bottom">
                <div class="row">设备名称：{{item.srcName}}</div>
                <div class="row"> 设备位置：{{item.bumpPointName}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoBox from '../../publicComponents/videoBox'
import VideoBoxXG from '../../publicComponents/videoBoxXG'
// import VideoBoxXG from '../../publicComponents/videoPlayerBox'
import { get_jmzk_tj, get_jmzk_list } from '@/api/xsApi2'
import Gauge from './components/gauge'

export default {
  components: { VideoBox, Gauge,VideoBoxXG },
  props: {
    isShow: {   
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentIndex: 0,
      tabData: [
        {
          name: '视频监控',
          num: '18',
          imgSrc: require('../../../../assets/img3/p-n-icon1.png'),
          imgSrc_active: require('../../../../assets/img3/p-s-icon1.png'),
        },
        {
          name: '水压监测',
          num: '15',
          imgSrc: require('../../../../assets/img3/p-n-icon2.png'),
          imgSrc_active: require('../../../../assets/img3/p-s-icon2.png'),
        },
        {
          name: '电流检测',
          num: '13',
          imgSrc: require('../../../../assets/img3/p-n-icon3.png'),
          imgSrc_active: require('../../../../assets/img3/p-s-icon3.png'),
        },
      ],
      // 视频监控
      isShow_1: true,
      currentCameraIndex: 0,
      cameraIndexCode: '7dfebb7006864120b6d076c918cb0ab8',
      cameraType:'',
      cameraList: [],
      // 水压
      isShow_2: false,
      waterList: [],
      // 电压
      isShow_3: false,
      electricityList: [],
    }
  },
  mounted() {
    this.get_jmzk_tj()
    this.getCameraList()
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
    // 获取统计数据
    get_jmzk_tj() {
      get_jmzk_tj().then((result) => {
        let res = result.data.data
        this.tabData[0].num = res[0].num
        this.tabData[1].num = res[1].num
        this.tabData[2].num = res[2].num
      })
    },
    tabClick(item, index) {
      this.currentIndex = index
      switch (index) {
        case 0:
          this.getCameraList()
          this.cameraIndexCode = '7dfebb7006864120b6d076c918cb0ab8'
          this.currentCameraIndex = 0
          this.isShow_1 = true
          this.isShow_2 = false
          this.isShow_3 = false
          break
        case 1:
          this.getWaterList()
          this.isShow_1 = false
          this.isShow_2 = true
          this.isShow_3 = false
          break
        case 2:
          this.getElectricityList()
          this.isShow_1 = false
          this.isShow_2 = false
          this.isShow_3 = true
          break
        default:
          break
      }
    },
    listClick(item, index) {
      this.currentCameraIndex = index
      this.cameraIndexCode = item.cameraIndexCode
      this.cameraType = item.type
    },
    // 获取视频列表
    getCameraList() {
      get_jmzk_list(1).then((res) => {
        this.cameraList = res.data.data
       this.cameraList.push({type:'hls',cameraIndexCode:'QMQzBmmiA1DVDCL8A7KOLO',cameraName:'02茅湾里窑址-02号点位'})
      })
    },
    // 获取水压列表
    getWaterList() {
      get_jmzk_list(2).then((res) => {
        this.waterList = res.data.data
      })
    },
    // 获取电流列表
    getElectricityList() {
      get_jmzk_list(3).then((res) => {
        this.electricityList = res.data.data
      })
    },

    close() {
      this.cameraIndexCode = '7dfebb7006864120b6d076c918cb0ab8'
      this.currentCameraIndex = 0
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
      height: 110px;
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
      height: calc(100% - 67px);
      box-sizing: border-box;
      padding: 0 40px 0 20px;
      padding-top: 8px;
      .top {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: flex-start;
        margin-bottom: 10px;
        .item {
          height: 80px;
          width: 180px;
          display: flex;
          align-items: center;
          margin-right: 10px;
          background-size: 100% 100%;
          img {
            width: 67px;
            height: 69px;
            margin: 0 10px;
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            span:nth-child(1) {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 0px;
              color: #a2ecff;
              opacity: 0.8;
            }
            span:nth-child(2) {
              font-family: DINAlternate-Bold;
              font-size: 30px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 2px;
              color: #ffffff;
            }
          }
        }
        .item-active {
          background: url('../../../../assets/img3/tab-s-bg.png') no-repeat
            center;
        }
        .item-normal {
          background: url('../../../../assets/img3/tab-n-bg.png') no-repeat
            center;
        }
      }
      .camera {
        width: 100%;
        height: calc(100% - 140px);
        display: flex;
        .left {
          width: 300px;
          height: 100%;
          margin-right: 10px;
          .list {
            width: 100%;
            height: calc(100% - 100px);
            overflow: auto;
            .item {
              width: 100%;
              height: 54px;
              box-sizing: border-box;
              padding: 0 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: solid 1px rgba(21, 110, 157, 0.3);
              &:hover {
                background: linear-gradient(
                  to right,
                  #3baef5c2 1%,
                  rgba(0, 0, 0, 0) 50%
                );
              }
              .left-img {
                display: flex;
                justify-content: space-between;
                align-items: center;
                img {
                  width: 28px;
                  height: 26px;
                  margin-right: 20px;
                }
                span {
                  font-family: MicrosoftYaHei;
                  font-size: 20px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
            }
            .active {
              background: linear-gradient(
                to right,
                #3baef5 1%,
                rgba(0, 0, 0, 0) 50%
              );
            }
          }
        }
        .right {
          height: 100%;
          width: calc(100% - 310px);
          background: url('../../../../assets/img2/hr-y.png') no-repeat left;
          background-size: auto 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
      .water {
        width: 100%;
        height: calc(100% - 140px);
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        .item {
          display: flex;
          width: 20%;
          height: 264px;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          img {
            width: 199px;
            height: 180px;
          }
          .gauge {
            width: 199px;
            height: 180px;
            background: url('../../../../assets/img3/dial.png') no-repeat center;
            background-size: 100%;
            position: relative;
            .box {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 120%;
              height: 120%;
            }
          }
          .row1 {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            div:nth-child(1) {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 0px;
              color: #ffffff;
              margin-right: 5px;
            }
            div:nth-child(2) {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 94px;
              height: 21px;
              background: url('../../../../assets/img3/b-btn1.png') no-repeat
                center;
              background-size: 100% 100%;
              font-family: MicrosoftYaHei;
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 1px;
              color: #ffffff;
            }
          }
          .row2 {
            width: 211px;
            height: 63px;
            background: url('../../../../assets/img3/txt-info-bg.png') no-repeat
              center;
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            div {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 0px;
              color: #ffffff;
              opacity: 0.8;
              margin-left: 5px;
              &:nth-child(1) {
                margin-bottom: 5px;
              }
            }
          }
        }
      }
      .electricity {
        width: 100%;
        max-height: calc(100% - 140px);
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        .item {
          display: flex;
          width: 33.3%;
          height: 134px;
          margin-bottom: 40px;
          img {
            width: 134px;
            height: 134px;
            margin-right: 20px;
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .row {
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 0px;
              color: #ffffff;
              margin-bottom: 4px;
            }
            .bottom {
              width: 209px;
              height: 62px;
              background: url('../../../../assets/img3/txt-info-bg2.png')
                no-repeat center;
              background-size: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              .row {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: #ffffff;
                opacity: 0.8;
              }
            }
          }
        }
      }
    }
  }
}
</style>
