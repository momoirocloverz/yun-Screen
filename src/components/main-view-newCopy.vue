<template>
  <div class="main-view">
    <router-view name="head"></router-view>
    <router-view v-if="isGlobalShowCenter && !isGlobalShowModel" name="center"></router-view>
    <div class="top" v-show="isGlobalShowTop">
      <router-view name="top"></router-view>
    </div>
    <!-- <div class="left-box" v-show="!isShowZBZ2">
      <router-view name="left"></router-view>
    </div>
    <div class="right-box" v-show="!isShowZBZ2">
      <router-view name="right"></router-view>
    </div> -->
    <div class="left-box" v-show="!isGlobalShowZBZ2">
      <router-view name="left"></router-view>
    </div>
    <div class="right-box" v-show="!isGlobalShowZBZ2">
      <router-view name="right"></router-view>
    </div>
    <router-view name="bottom"></router-view>
    <div id="videoSource"></div>
    <div class="videoBox" v-if="isShow_video">
      <VideoBox :index="2" :videoId="`37bc9ca73d8c467a94c95576dfccd9d1`" :autoplay="false" />
    </div>
    <div class="event-track" v-if="!isGlobalShowCenter">
      <EventTrack :logo="eventTrack_logo" />
    </div>
    <div class="zbz2-box" v-show="isGlobalShowZBZ2">
      <div class="left-box" v-if="isGlobalShowZBZ2">
        <ZBZLeft_2 />
      </div>
      <div class="right-box" v-if="isGlobalShowZBZ2">
        <ZBZRight_2 />
      </div>
    </div>
    <!-- <div class="zbz2-box" v-show="isShowZBZ2">
      <div class="left-box" v-if="isShowZBZ2">
        <ZBZLeft_2 />
      </div>
      <div class="right-box" v-if="isShowZBZ2">
        <ZBZRight_2 />
      </div>
    </div> -->
    <div class="back" v-show="isGlobalShowModel" @click="model_back"></div>
    <iframe ref="iframe" :style="{ opacity: isGlobalShowModel ? 1 : 0 }" style="width: 100%; height: 100%; border: none" src="http://www.thingjs.com/pp/b0fcefbac5764e0fca3b6ed8"></iframe>
    <div class="model-videoBox" v-if="isShow_modelVideo">
      <VideoBox :index="`2${modelVideoId}`" :videoId="modelVideoId" :autoplay="false" :width="'480px'" :height="'270px'" />
      <div
        class="close"
        @click="
          () => {
            this.isShow_modelVideo = false;
          }
        "
      ></div>
    </div>
    <div class="model-videoBox" v-if="fakeVideoShow">
      <div class="fakeSameImg" ref="fakeImRef" @dblclick="switchFullScreen">
        <div class="fakeTime" :class="[fullScreenStatus ? 'fakeResetTime' : '']">{{ timeValue1 }}</div>
        <div class="fakeImg"></div>
      </div>
      <div class="close" @click="destoryHere"></div>
    </div>
    <fireExtinguishModal
      :isShow="showFireExtinguisher"
      @close="
        () => {
          this.showFireExtinguisher = false;
        }
      "
    />
  </div>
</template>
<script>
import { eventBus } from '../main';
// new Version  import Map3d from '@/components/map-3d'
// import Map3d from "@/components/map-3d-MapBox";
// import LegendBox from "./xiaoshanComponentsNew/firstPage/components/legendBox";
// import EventTrack from './xiaoshanScreenTenMouth/components/eventTrack'; // 事件追踪
// import Model3D from './xiaoshanScreenTenMouth/components/model3d' // 3d模型---three.js
// import Model3D from "./xiaoshanScreenTenMouth/components/model3d2"; // 3d模型---vue-3d-model
// import Model3D from "./xiaoshanScreenTenMouth/components/model3d3"; // 3d模型---vue-3d-loader
// import VideoBox from './xiaoshanComponentsNew/publicComponents/videoBox2';
import ZBZRight_2 from '@/components/xiaoshanScreenTenMouth/zbz2/right';
import ZBZLeft_2 from '@/components/xiaoshanScreenTenMouth/zbz2/left';
import '../js/CesiumPop.js';
import { mapState } from 'vuex';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
export default {
  name: 'main-view',
  components: {
    // Map3d,
    // LegendBox,
    VideoBox: () => import(/* webpackChunkName: "videoBox2" */ './xiaoshanComponentsNew/publicComponents/videoBox2'),
    EventTrack: () => import(/* webpackChunkName: "EventTrack" */ './xiaoshanScreenTenMouth/components/eventTrack'),
    fireExtinguishModal: () => import(/* webpackChunkName: "fireExtinguishModal" */ './xiaoshanScreenTenMouth/components/fireExtinguishModal'),
    // Model3D,
    ZBZRight_2,
    ZBZLeft_2,
  },
  data() {
    return {
      isShow_video: false,
      isShow_center: true,
      isShowZBZ2: false,
      isShow_model: false,
      needLoadModel: false,
      isShow_top: true,
      eventTrack_logo: '',
      // 模型监控
      modelVideoId: '',
      isShow_modelVideo: false,
      showFireExtinguisher: false,
      fakeVideoShow: false,
      timer1: null,
      timeValue1: '',
      fullScreenStatus: false,
      //   videoSrc: require('../assets/yxzs/video.mp4'),
    };
  },
  computed: {
    ...mapState(['currentRouteName', 'needGlobalLoadModel', 'isGlobalShowModel', 'isGlobalShowCenter', 'isGlobalShowTop', 'isGlobalShowZBZ2', 'updateIframeFlag']),
  },
  watch: {
    // currentRouteName(val) {
    //   this.$store.commit('setIsGlobalShowZBZ2', false);
    //   this.isShow_modelVideo = false;
    //   this.$store.commit('setIsGlobalShowCenter', true);
    //   this.$store.commit('setIsGlobalShowTop', true);
    // },
    // isGlobalShowCenter(val) {
    //   this.$store.commit('setIsGlobalShowCenter', val);
    //   this.$store.commit('setIsGlobalShowTop', val);
    //   if (val) {
    //   } else {
    //     // if (logo == 'onlyPreview') {
    //     //   this.eventTrack_logo = 'onlyPreview';
    //     // } else {
    //     this.eventTrack_logo = '';
    //     this.$store.commit('setIsGlobalShowZBZ2', true);
    //     // }
    //   }
    // },
    updateIframeFlag(val) {
      this.$refs.iframe.src = '';
      setTimeout(() => {
        this.$refs.iframe.src = 'http://www.thingjs.com/pp/b0fcefbac5764e0fca3b6ed8';
      }, 100);
    },
  },
  created() {
    eventBus.$on('newFireReaction', (boolean, logo) => {
      CesiumPop.clearDivPop(viewer);
      this.$router
        .replace({
          name: 'zbz2',
        })
        .then((res) => {})
        .catch((err) => {
          console.log('err');
        });
    });
    eventBus.$on('showEvent', (boolean) => {
      this.isShow_center = boolean;
      this.eventTrack_logo = '';
    });
    eventBus.$on('isShowCenterAndTop', (boolean, logo) => {
      console.log('这里', boolean);
      this.$store.commit('setIsGlobalShowCenter', boolean);
      this.$store.commit('setIsGlobalShowTop', boolean);
      if (boolean) {
      } else {
        if (logo == 'onlyPreview') {
          this.eventTrack_logo = 'onlyPreview';
        } else {
          console.log('这里 logo 无');
          this.eventTrack_logo = '';
          this.$store.commit('setIsGlobalShowZBZ2', true);
          //   this.isShowZBZ2 = true;
        }
      }
    });
    eventBus.$on('closeZBZ2', () => {
      this.isShowZBZ2 = false;
    });
    eventBus.$on('isShowVideo', (boolean) => {
      this.isShow_video = boolean;
    });
    eventBus.$on('modelWarning', (isWarning) => {
      let msg = {
        info: '成功传递',
        isWarning: isWarning,
      };
      this.sendMesFroIframe(msg);
    });
  },
  mounted() {
    this.plantMessage();
    this.watchFullScreen();
  },
  methods: {
    watchFullScreen() {
      document.addEventListener(
        'fullscreenchange',
        () => {
          if (document.fullscreen) {
            this.fullScreenStatus = true;
          } else {
            this.fullScreenStatus = false;
          }
        },
        false,
      );
      document.addEventListener(
        'mozfullscreenchange',
        () => {
          if (document.mozFullScreen) {
            this.fullScreenStatus = true;
          } else {
            this.fullScreenStatus = false;
          }
        },
        false,
      );
      document.addEventListener(
        'webkitfullscreenchange',
        () => {
          if (document.webkitIsFullScreen) {
            this.fullScreenStatus = true;
          } else {
            this.fullScreenStatus = false;
          }
        },
        false,
      );
    },
    switchFullScreen() {
      let currentElement = this.$refs.fakeImRef;
      if (this.fullScreenStatus) {
        var doc = document;
        if (doc.exitFullscreen) {
          doc.exitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          doc.mozCancelFullScreen();
        } else if (doc.webkitCancelFullScreen) {
          doc.webkitCancelFullScreen();
        }
      } else {
        var doc = document.documentElement;
        if (doc.requestFullscreen) {
          currentElement.requestFullscreen();
        } else if (doc.mozRequestFullScreen) {
          doc.mozRequestFullScreen();
        } else if (currentElement.webkitRequestFullScreen) {
          doc.webkitRequestFullScreen();
        }
      }
    },
    destoryHere() {
      this.fakeVideoShow = false;
      clearInterval(this.timer1);
      this.timer1 = null;
    },
    simlauteTimer() {
      let time = dayjs().format('YYYY年MM月DD日 dddd HH:mm:ss');
      this.timeValue1 = time;
      this.timer1 = setInterval(() => {
        let time = dayjs().format('YYYY年MM月DD日 dddd HH:mm:ss');
        this.timeValue1 = time;
      }, 1000);
    },
    plantMessage() {
      let that = this;
      window.addEventListener('message', function (e) {
        var res = e.data;
        if (res.videoId) {
          console.log('res.videoId', res.videoId);
          if (res.videoId == '37bc9ca73d8c467a94c95576dfccd9d1') {
            that.fakeVideoShow = true;
            that.simlauteTimer();
          } else {
            that.isShow_modelVideo = true;
            that.modelVideoId = res.videoId;
          }
        }
        if (res.flag_mhq) {
          that.showFireExtinguisher = true;
        }
      });
    },
    model_back() {
      this.$store.commit('setIsGlobalShowModel', false);
      this.$store.commit('setCurrentAreaName', '萧山区');
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: '',
        bumpPointId: '',
      });
      switch (this.$route.name) {
        case 'yxzsCopy':
          this.$router
            .replace({
              name: 'yxzsCopy',
            })
            .catch((err) => {
              console.log('err');
            });
          break;
        case 'yxzsDetailsCopy':
          this.$router
            .replace({
              name: 'yxzsCopy',
            })
            .catch((err) => {
              console.log('err');
            });
          break;
        case 'wbdCopy':
          this.$router
            .replace({
              name: 'xbgCopy',
            })
            .catch((err) => {
              console.log('err');
            });
          break;
        default:
          this.$router.go(-1);
          break;
      }
    },
    // 传值到iframe
    sendMesFroIframe(msg = { info: '成功传递' }) {
      // 向iframe传值
      const mapFrame = this.$refs.iframe;
      if (mapFrame) {
        const iframeWin = mapFrame.contentWindow;
        iframeWin.postMessage(msg, '*');
        // console.log('iframeWin', iframeWin);
      }
    },
  },
};
</script>
<style lang="less">
.main-view {
  .draw-window {
    border: none !important;
  }
}
</style>
<style scoped lang="less">
.main-view {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: url('../assets/img4/BJ.jpg') no-repeat center;
  //   background-size: 100% 100%;
  background-size: cover;
  .back {
    position: absolute;
    width: 42px;
    height: 42px;
    top: 180px;
    right: 600px;
    z-index: 13;
    background: url('../assets/img4/fanhui.png') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 5px 0;
    cursor: pointer;
  }
  .zbz2-box {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    .left-box,
    .right-box {
      position: absolute;
      box-sizing: border-box;
      top: 80px;
      // background: #102e56;
      // border: 1px solid rgba(16, 24, 34, 0.65);
      width: 500px;
      height: 950px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .left-box {
      left: 22px;
      z-index: 11;
    }
    .right-box {
      right: 22px;
    }
  }
}
.top {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
.left-box,
.right-box {
  position: absolute;
  box-sizing: border-box;
  top: 80px;
  // background: #102e56;
  // border: 1px solid rgba(16, 24, 34, 0.65);
  width: 500px;
  height: 950px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    position: relative;
    width: 444px;
    height: 57px;
    top: -6px;
    left: 6px;
  }
}
.right-box {
  img {
    top: -9px;
  }
}
.left-box {
  left: 22px;
  z-index: 11;
}
.right-box {
  right: 22px;
}
.legend {
  width: 700px;
  height: 160px;
  background: url(../assets/img/m-box.png) no-repeat bottom;
  background-size: 100% 100%;
  z-index: 99;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  .legend-title {
    width: 45px;
    height: 100%;
    padding-top: 35px;
    font-family: MicrosoftYaHei;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 2px;
    color: #ffffff;
    text-align: center;
  }
}
#videoSource {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.videoBox {
  width: 433px;
  height: 300px;
  position: absolute;
  top: 300px;
  right: 540px;
}
.event-track {
  width: 830px;
  //   height: 950px;
  height: 850px;
  position: absolute;
  left: 50%;
  top: 80px;
  transform: translateX(-50%);
  z-index: 300;
  // background: red;
}
.box-3d {
  width: 100%;
  height: 100%;
}
.model-videoBox {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 540px;
  height: 320px;
  background: url(../assets/videoCon/videoOutline.png) no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  // background: #000;
  .close {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #5be1f9d0;
    font-size: 34px;
    cursor: pointer;
    &:hover {
      color: #aaf5ff;
    }
  }
  .fakeSameImg {
    width: 480px;
    height: 270px;
    background-color: transparent;
    position: absolute;
    left: 30px;
    top: 26px;
    // background-image: url(../assets/yxzs/2.jpg);
    // background-position: center center;
    // background-repeat: no-repeat;
    // background-size: 100%;
    // text-align: center;
  }
  .fakeTime {
    position: absolute;
    left: 30px;
    top: 20px;
    z-index: 20;
    color: #fff;
    letter-spacing: 2px;
    font-size: 13px;
  }
  .fakeResetTime {
    font-size: 50px !important;
    left: 50px !important;
    top: 50px !important;
  }
  .fakeImg {
    // width: 480px;
    // height: 270px;
    width: 100%;
    height: 100%;
    background-color: transparent;
    // position: absolute;
    // left: 30px;
    // top: 26px;
    background-image: url(../assets/yxzs/2.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    text-align: center;
  }
}
</style>
