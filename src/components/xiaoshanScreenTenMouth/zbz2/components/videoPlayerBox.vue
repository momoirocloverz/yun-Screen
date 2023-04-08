<template>
  <div id="video-box" :style="{ width: width, height: height }">
    <easy-player
      style="width: 100%; height: 100%"
      :video-url="videoUrl"
      live="true"
      stretch="true"
    ></easy-player>
  </div>
</template>

<script>
import EasyPlayer from "@easydarwin/easyplayer";
import { get_play_url } from "../../../../api/dahua";
// import { getHikVideoUrl } from "../../../api/xsApi";

export default {
  components: { EasyPlayer },
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
      videoUrl: ""
    };
  },
  watch: {
    videoId(val) {
      this.getVideoURL(val);
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
        this.videoUrl = res.data;
      });
    }
  }
};
</script>

<style></style>
