<template>
  <div class="mideasquare" ref="video" v-if="show">
    <div class="mideasquare-title">
      <img src="../../assets/img/tip_arrow.png" alt="" srcset="" />
      <span class="video-name">{{ placeName }}</span>
    </div>
    <div class="mideasquare-title">
      <img src="../../assets/img/tip_arrow.png" alt="" srcset="" />
      <span class="video-name">{{ nowDate }}</span>
    </div>
    <span class="X_icon" @click="closeWindow"></span>
    <div class="mideasquare-video" v-show="!showImg">
      <div id="xgPlayer"></div>
      <div class="control">
        <div class="control-panel">
          <div class="center-img"></div>

          <div class="arrow" v-for="(item, index) in 8" :key="item">
            <div class="arrow-inside" :class="[index === currentArrow ? 'active-arrow' : '']" @click="holderRotate(index)">
              <img src="./../../assets/img/arrow-icon.png" alt="" srcset="" />
            </div>
          </div>
        </div>
        <div class="progress-bar">
          <img src="./../../assets/img/icon2.png" alt="" srcset="" />
          <Myprogress @zoomChange="zoomChange" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getVideoUrl, controlCamera } from '../../api/api';
import 'xgplayer';
import HlsPlayer from 'xgplayer-hls';
import HlsJsPlayer from 'xgplayer-hls.js';

import Myprogress from './progress';

export default {
  name: 'ploy-vue-player-square',
  components: { Myprogress },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    videoId: {
      type: String,
      required: true,
    },
    placeName: {
      type: String,
      required: true,
    },
    ishot: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      xG_player: null,

      playerOption: {},
      nowDate: null,
      imgSrc: '',
      firstImg: false,
      showImg: false,
      showDetail: false,
      currentArrow: 0,

      pan: 0, //水平移动(-1,1)
      tilt: 0, //垂直移动(-1,1)
      zoom: 0, //变焦(-1,1)
    };
  },
  filters: {
    getTime(val) {
      let arr = val.split('T');
      return arr[0] + ' ' + arr[1];
    },
  },
  mounted() {
    this.getTime();
    console.log('666999', this.videoId);
    this.videoId && this.getVideoURL(this.videoId);
    if (this.ishot) {
      this.$refs.video.style.left = '40%';
    }
  },
  methods: {
    controlCamera(pan, tilt, zoom) {
      let params = {
        pan,
        tilt,
        zoom,
      };
      controlCamera(params, this.videoId).then((res) => {
        console.log('调整成功');
      });
    },
    // 监控变焦事件
    zoomChange(zoomLevel) {
      console.log('变焦', zoomLevel);
      switch (zoomLevel) {
        case '1':
          this.zoom = -1;
          break;
        case '2':
          this.zoom = -0.5;
          break;
        case '3':
          this.zoom = 0;
          break;
        case '4':
          this.zoom = 0.5;
          break;
        case '5':
          this.zoom = 1;
          break;
        default:
          break;
      }
      this.controlCamera(this.pan, this.tilt, this.zoom);
    },
    // 云台转动
    holderRotate(index) {
      switch (index) {
        case 0:
          if (this.tilt >= 1) {
            this.tilt = 1;
          } else {
            this.tilt += 0.1;
          }
          console.log('上');
          break;
        case 1:
          if (this.tilt >= 1) {
            this.tilt = 1;
          } else {
            this.tilt += 0.1;
          }
          if (this.pan >= 1) {
            this.pan = 1;
          } else {
            this.pan += 0.1;
          }
          console.log('右上');
          break;
        case 2:
          if (this.pan >= 1) {
            this.pan = 1;
          } else {
            this.pan += 0.1;
          }
          console.log('右');
          break;
        case 3:
          if (this.tilt <= -1) {
            this.tilt = -1;
          } else {
            this.tilt -= 0.1;
          }
          if (this.pan >= 1) {
            this.pan = 1;
          } else {
            this.pan += 0.1;
          }
          console.log('右下');
          break;
        case 4:
          if (this.tilt <= -1) {
            this.tilt = -1;
          } else {
            this.tilt -= 0.1;
          }
          console.log('下');
          break;
        case 5:
          if (this.pan <= -1) {
            this.pan = -1;
          } else {
            this.pan -= 0.1;
          }
          if (this.tilt <= -1) {
            this.tilt = -1;
          } else {
            this.tilt -= 0.1;
          }
          console.log('左下');
          break;
        case 6:
          if (this.pan <= -1) {
            this.pan = -1;
          } else {
            this.pan -= 0.1;
          }
          console.log('左');
          break;
        case 7:
          if (this.pan <= -1) {
            this.pan = -1;
          } else {
            this.pan -= 0.1;
          }
          if (this.tilt >= 1) {
            this.tilt = 1;
          } else {
            this.tilt += 0.1;
          }
          console.log('左上');
          break;

        default:
          break;
      }
      this.controlCamera(this.pan, this.tilt, this.zoom);
    },

    eventClick(eventInfo) {
      console.log('事件信息', eventInfo);
      if (eventInfo.firstImg) {
        this.firstImg = eventInfo.firstImg;
      } else {
        this.firstImg = false;
        this.imgSrc = common.eventImg + eventInfo.url;
      }

      this.showImg = true;
    },
    closeWindow() {
      this.show = false;
      this.$emit('windowClosed');
    },
    closeImg() {
      this.showImg = false;
    },
    closeDetail() {
      this.showDetail = false;
    },
    getTime() {
      setInterval(() => {
        this.nowDate = new Date().Format('yyyy-MM-dd HH:mm:ss');
      }, 1000);
    },
    // 通过id获取视频url
    getVideoURL(id) {
      //   console.log("2", id);
      getVideoUrl(id).then((res) => {
        // console.log("111000222", res);
        // this.getPlayerOption(res.data.data);

        this.xG_player = new HlsJsPlayer({
          id: 'xgPlayer',
          url: res.data.data,
          playsinline: true,
          whitelist: [''],
          width: '480px',
          height: '270px',
          autoplay: true,
          playbackRate: [0.5, 1, 1.5, 2],
          fitVideoSize: 'fixHeight',
        });
      });
    },
    getPlayerOption(url) {
      this.playerOption = {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        // aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'application/x-mpegURL', //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: url, //url地址
          },
        ],
        // poster: "../../static/images/test.jpg", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        hls: true, // 启用hls？
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      };
    },
  },
};
</script>

<style scoped lang="less">
.mideasquare {
  position: relative;
  width: 800px;
  height: 360px;
  background: linear-gradient(#1f5492, rgb(1, 41, 75));
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  border-radius: 10px;
  z-index: 99;
}
.mideasquare .tableList {
  width: 400px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 100%;
  background: linear-gradient(#041a3385, rgba(1, 18, 32, 0.644));
  color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.mideasquare .tableList .head {
  width: 95%;
  height: 35px;
  background: url('../../assets/images/tablebg.png') no-repeat;
  background-size: 200%;
  display: flex;
  margin-bottom: 2px;
}
.mideasquare .tableList .head span {
  display: inline-block;
  flex: 1;
  height: 100%;
  line-height: 35px;
  text-align: center;
}
.mideasquare .tableList .body {
  width: 95%;
  height: 500px;
  overflow: auto;
}
.mideasquare .tableList .body .row {
  width: 100%;
  height: 35px;
  background: url(../../assets/images/no1bg.png) no-repeat;
  background-size: 200%;
  display: flex;
  margin-bottom: 1px;
  cursor: pointer;
}
.mideasquare .tableList .body .row:hover {
  background: #3088ec85;
}
.mideasquare .tableList .body .row span {
  display: inline-block;
  flex: 1;
  height: 100%;
  line-height: 35px;
  text-align: center;
}
.mideasquare .X_icon {
  display: inline-block;
  width: 34px;
  height: 34px;
  background: url('../../assets/img/x.png');
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
  cursor: pointer;
}
.mideasquare .mideasquare-title {
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  font-size: 17px;
  color: #ffffff;
  padding: 0 8px;
  box-sizing: border-box;
  margin: 0;
}
.mideasquare .mideasquare-detail {
  width: 225%;
  height: 750px;
  position: absolute;
  top: -110px;
  left: -120px;
  background: linear-gradient(#1f5492, rgb(1, 41, 75));
  z-index: 100;
}
.mideasquare .mideasquare-detail img {
  width: 100%;
  height: 100%;
}
.mideasquare .mideasquare-detail .X_icon {
  display: inline-block;
  width: 34px;
  height: 34px;
  background: url('../../assets/img/x.png');
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
  cursor: pointer;
}

.mideasquare .mideasquare-img {
  width: 190%;
  height: 600px;
  position: absolute;
  top: -100px;
  left: -20px;
  background: linear-gradient(#1f5492, rgb(1, 41, 75));
  z-index: 99;
}
.mideasquare .mideasquare-img .detail-img {
  display: inline-block;
  padding: 5px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  right: 70px;
  top: 30px;
  background: linear-gradient(#2a7edd, rgb(5, 67, 121));
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}
.mideasquare .mideasquare-img .mideasquare-title {
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  font-size: 17px;
  color: #ffffff;
  padding: 0 8px;
  box-sizing: border-box;
  margin: 0;
}
.mideasquare .mideasquare-img .event-img {
  width: 100%;
  height: 500px;
}
.mideasquare .mideasquare-img .X_icon {
  display: inline-block;
  width: 34px;
  height: 34px;
  background: url('../../assets/img/x.png');
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
  cursor: pointer;
}
.mideasquare .mideasquare-video {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.mideasquare .mideasquare-video .control {
  height: 270px;
  width: 300px;
  // background: red;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .progress-bar {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 65px;
  }
  .control-panel {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    width: 176px;
    height: 176px;
    background: url('./../../assets/img/circle1.png');
    position: relative;
    .center-img {
      width: 24px;
      height: 24px;
      background: url('./../../assets/img/icon1.png');
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .arrow {
      width: 64px;
      height: 88px;
      // background: rgba(231, 194, 27, 0.342);
      position: absolute;
      top: 0;
      left: 56px;
      transform-origin: 50% 100%;
      &:nth-child(3) {
        transform: rotateZ(45deg);
        .arrow-inside {
          img {
            transform: scale(0.7);
          }
        }
      }
      &:nth-child(4) {
        transform: rotateZ(90deg);
      }
      &:nth-child(5) {
        transform: rotateZ(135deg);
        .arrow-inside {
          img {
            transform: scale(0.7);
          }
        }
      }
      &:nth-child(6) {
        transform: rotateZ(180deg);
      }
      &:nth-child(7) {
        transform: rotateZ(225deg);
        .arrow-inside {
          img {
            transform: scale(0.7);
          }
        }
      }
      &:nth-child(8) {
        transform: rotateZ(270deg);
      }
      &:nth-child(9) {
        transform: rotateZ(315deg);
        .arrow-inside {
          img {
            transform: scale(0.7);
          }
        }
      }
      .arrow-inside {
        width: 64px;
        height: 37px;
        // background: rgba(68, 231, 27, 0.342);
        text-align: center;
        line-height: 37px;
        img {
          opacity: 0.5;
        }
        &:hover {
          cursor: pointer;
          background: url('./../../assets/img/a-bg.png');
          img {
            opacity: 1;
          }
        }
      }
    }
  }
}

.mideasquare .mideasquare-video /deep/.vjs-custom-skin > .video-js {
  width: 100%;
  height: 100%;
}
.mideasquare .mideasquare-video video {
  width: 100%;
  height: 100%;
  /* ie 8/9/10/Opera - for ie8/ie10/Opera */
  object-fit: fill;
  cursor: pointer;
  background-color: #ffffff;
}

/deep/ .video-js .vjs-fluid {
  height: 100% !important;
}
/deep/ .video-js .vjs-big-play-button {
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}
</style>
