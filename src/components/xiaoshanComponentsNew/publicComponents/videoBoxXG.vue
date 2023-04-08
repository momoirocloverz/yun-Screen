<template>
  <div :id="`xgPlayer_${index}_${videoId}`"></div>
</template>

<script>
import { get_play_url } from "../../../api/dahua";
// import { getHikVideoUrl } from "../../../api/xsApi";
import "xgplayer";
import Player from "xgplayer";
import HlsPlayer from "xgplayer-hls";
import HlsJsPlayer from "xgplayer-hls.js";

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
        this.xG_player.src = res.data.data.url;
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
      get_play_url(id).then(res => {
        // console.log("111000222", res);
        this.xG_player = new HlsJsPlayer({
          id: `xgPlayer_${this.index}_${this.videoId}`,
          url: res.data,
          // url: "http://127.0.0.1:1515/hls/test.m3u8",
          playsinline: true,
          whitelist: [""],
          width: this.width,
          height: this.height,
          autoplay: this.autoplay,
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
