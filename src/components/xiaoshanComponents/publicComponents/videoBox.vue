<template>
  <div :id="`xgPlayer_${index}`"></div>
</template>

<script>
import { getVideoUrl } from "../../../api/api";
import "xgplayer";
import HlsPlayer from "xgplayer-hls";
import HlsJsPlayer from "xgplayer-hls.js";

export default {
  props: {
    index: {
      type: Number || String,
      required: true
    },
    videoId: {
      type: String,
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
    }
  },
  data() {
    return {
      xG_player: null
    };
  },
  watch: {
    isFullScreen(val) {
      if (val) {
        this.xG_player.getFullscreen(this.xG_player.root);
      }
    },
    videoId(val) {
      getVideoUrl(val).then(res => {
        this.xG_player.src = res.data.data;
      });
    }
  },
  mounted() {
    this.videoId && this.getVideoURL(this.videoId);
  },
  methods: {
    // 通过id获取视频url
    getVideoURL(id) {
    //   console.log("2", id);
      getVideoUrl(id).then(res => {
        // console.log("111000222", res);
        this.xG_player = new HlsJsPlayer({
          id: `xgPlayer_${this.index}`,
          url: res.data.data,
          playsinline: true,
          whitelist: [""],
          width: this.width,
          height: this.height,
          autoplay: false,
          playbackRate: [0.5, 1, 1.5, 2],
          fitVideoSize: "fixHeight",
          poster: this.imgSrc
        });
      });
    }
  }
};
</script>

<style></style>
