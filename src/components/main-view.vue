<template>
  <div class="main-view">
    <router-view name="head"></router-view>
    <!-- <map-header></map-header> -->
    <!-- <map3d></map3d> -->
    <div class="top">
      <router-view name="top"></router-view>
    </div>
    <div class="left-box">
      <!-- <img src="../assets/img3/title-left1.png" alt="" srcset=""> -->
      <router-view name="left"></router-view>
    </div>
    <div class="right-box">
      <!-- <img src="../assets/img3/title-right.png" alt="" srcset=""> -->
      <router-view name="right"></router-view>
    </div>
    <router-view name="bottom"></router-view>
    <!-- <div class="legend">
      <div class='legend-title'>图例</div>
      <Legend />
    </div> -->

    <div id="videoSource"></div>

    <LegendBox />

    <div class="videoBox" v-show="isShow_video">
      <VideoBox :index="2" :videoId="`37bc9ca73d8c467a94c95576dfccd9d1`" :autoplay="false" />
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main';
// import Map3d from "@/components/map-3d";
// import Map3d from "@/components/map-3d-MapBox";
// import LegendBox from './xiaoshanComponentsNew/firstPage/components/legendBox';
// import VideoBox from './xiaoshanComponentsNew/publicComponents/videoBox2';
export default {
  name: 'main-view',
  components: {
    // Map3d,
    LegendBox: () => import(/* webpackChunkName: "legend1Box" */ './xiaoshanComponentsNew/firstPage/components/legendBox')  ,
    VideoBox: () => import(/* webpackChunkName: "videoBox2" */ './xiaoshanComponentsNew/publicComponents/videoBox2'),
  },
  data() {
    return {
      isShow_video: false,
    };
  },
  created() {
    eventBus.$on('isShowVideo', (boolean) => {
      this.isShow_video = boolean;
    });
  },
  methods: {},
};
</script>

<style scoped lang="less">
.main-view {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.top {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
.left-box,
.right-box {
  position: absolute;
  box-sizing: border-box;
  top: 100px;
  background: #102e56;
  border: 1px solid rgba(49, 110, 177, 0.65);
  width: 453px;
  height: 949px;
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
  left: 27px;
  z-index: 11;
}
.right-box {
  right: 27px;
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
</style>
