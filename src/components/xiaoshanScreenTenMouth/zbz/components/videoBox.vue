<template>
  <div
    :id="`player_${index}_${videoId}`"
    :style="{ width: width, height: height }"
  ></div>
</template>

<script>
import { getVideoUrl } from "../../../../api/api";
import { getHikVideoUrl } from "../../../../api/xsApi";
const IS_MOVE_DEVICE = document.body.clientWidth < 992; // 是否移动设备
const MSE_IS_SUPPORT = !!window.MediaSource; // 是否支持mse

export default {
  props: {
    index: {
      type: Number || String,
      required: true
    },
    videoId: {
      type: String || Number,
      required: true
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "150px"
    },
    isFullScreen: {
      type: Boolean,
      default: false
    },
    imgSrc: {
      type: String,
      default: "../../../../static/images/culturalSave/poster_1.png"
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      player: null,
      url: "",
      tabActive: MSE_IS_SUPPORT ? "mse" : "decoder"
    };
  },
  computed: {
    mode: function() {
      return this.tabActive === "mse" ? 0 : 1;
    }
  },
  watch: {
    videoId(val) {
      getHikVideoUrl(val).then(res => {
        this.url = res.data.data.url;
        let index = this.player.currentWindowIndex;
        this.player
          .JS_Play(
            res.data.data.url,
            { playURL: res.data.data.url, mode: 0 },
            index
          )
          .then(
            () => {
              console.log("realplay success");
            },
            e => {
              console.error(e);
            }
          );
      });
    }
  },
  mounted() {
    this.createPlayer();
    this.videoId && this.getVideoURL(this.videoId);
  },
  methods: {
    // 通过id获取视频url
    getVideoURL(id) {
    //   console.log("2", id);
      getHikVideoUrl(id).then(res => {
        // console.log("111000222", res.data.data.url);
        let index = this.player.currentWindowIndex;
        this.player
          .JS_Play(
            res.data.data.url,
            { playURL: res.data.data.url, mode: 0 },
            index
          )
          .then(
            () => {
              console.log("realplay success");
            },
            e => {
              console.error(e);
            }
          );
      });
    },
    createPlayer() {
      this.player = new window.JSPlugin({
        szId: `player_${this.index}_${this.videoId}`,
        // szBasePath: '../../static/hikPlayer', //开发环境
        szBasePath: "../../xswl-screen/static/hikPlayer", // 生产环境
        iMaxSplit: 1,
        iCurrentSplit: IS_MOVE_DEVICE ? 1 : 2,
        openDebug: true,
        oStyle: {
          borderSelect: IS_MOVE_DEVICE ? "#000" : "#FFCC00"
        }
      });
      // 事件回调绑定
      // this.player.JS_SetWindowControlCallback({
      //   windowEventSelect: function (iWndIndex) {  //插件选中窗口回调
      //       console.log('windowSelect callback: ', iWndIndex);
      //   },
      //   pluginErrorHandler: function (iWndIndex, iErrorCode, oError) {  //插件错误回调
      //       console.log('pluginError callback: ', iWndIndex, iErrorCode, oError);
      //   },
      //   windowEventOver: function (iWndIndex) {  //鼠标移过回调
      //       //console.log(iWndIndex);
      //   },
      //   windowEventOut: function (iWndIndex) {  //鼠标移出回调
      //       //console.log(iWndIndex);
      //   },
      //   windowEventUp: function (iWndIndex) {  //鼠标mouseup事件回调
      //       //console.log(iWndIndex);
      //   },
      //   windowFullCcreenChange: function (bFull) {  //全屏切换回调
      //       console.log('fullScreen callback: ', bFull);
      //   },
      //   firstFrameDisplay: function (iWndIndex, iWidth, iHeight) {  //首帧显示回调
      //       console.log('firstFrame loaded callback: ', iWndIndex, iWidth, iHeight);
      //   },
      //   performanceLack: function () {  //性能不足回调
      //       console.log('performanceLack callback: ');
      //   }
      // });
    }
  }
};
</script>

<style></style>
