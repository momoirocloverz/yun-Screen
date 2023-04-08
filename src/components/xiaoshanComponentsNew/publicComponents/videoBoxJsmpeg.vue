<template>
  <!-- <div :id="`player_${index}_${videoId}`" style="width:2.18rem;height: 0.8rem;"></div> -->
  <!-- <div class="jsmpeg" data-url="ws://223.65.209.139:15559/openUrl/xgAwJhK" style="width:2.18rem;height: 0.8rem;"></div> -->

  <canvas ref="videoCanvas" id="videoCanvas" align = "center" style="width:2.18rem;height: 0.8rem;"></canvas>
</template>

<script>
import { getVideoUrl } from "../../../api/api";
import { getHikVideoUrl } from "../../../api/xsApi";

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
  },
  data() {
    return {
      player: null,
      playUrl:'ws://223.65.209.139:15559/openUrl/h3oQAvK'
    };
  },

  mounted() {
    this.player = new JSMpeg.Player(this.playUrl, {canvas: this.$refs.videoCanvas});
  },
  methods: {
    // 通过id获取视频url
    // getVideoURL(id) {
    //   console.log("2", id);
    //   getHikVideoUrl(id).then(res => {
    //     console.log("111000222", res.data.data.url);
    //     let url='ws://223.65.209.139:15559/openUrl/ensqWLC'
    //     let index = this.player.currentWindowIndex
    //     this.player.JS_Play(url, { playURL:url, mode:0 },index).then(
    //         () => { console.log('realplay success') },
    //         e => { console.error(e) }
    //       )
    //   });
    // },
  }
};
</script>

<style></style>
