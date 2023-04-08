<template>
  <div id="video-box" :style="{'width':width,'height':height}">
      <easy-player style="width: 100%; height: 100%" :video-url="videoUrl" live="true" stretch="true"></easy-player>
  </div>
</template>

<script>
import EasyPlayer from '@easydarwin/easyplayer'
import { get_play_url } from "../../../api/dahua";
import { getHikVideoUrl } from '../../../api/xsApi';
// import { getHikVideoUrl } from "../../../api/xsApi";

export default {
  components:{EasyPlayer},
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
    },
    cameraType:{
      type:String,
      default:'h265'
    }
  },
  data() {
    return {
      videoUrl:'',
    };
  },
  watch: {
    videoId(val) {
      if(this.cameraType=='h265'){
        this.getVideoURL(val)
      }else if(this.cameraType=='h265_self'){
        this.getVideoURL_hik(val)
      }
      
    }
  },
  mounted() {
    if(this.cameraType=='h265'){
      this.videoId && this.getVideoURL(this.videoId);
    }else if(this.cameraType=='h265_self'){
      this.videoId && this.getVideoURL_hik(this.videoId);
    }
    
  },
  methods: {
    // 通过id获取视频url---政务内网视频
    getVideoURL(id) {
      console.log("26流量9", id);
      get_play_url(id).then(res => {
        // console.log("111000222", res)
        this.videoUrl=res.data
      });
    },
    getVideoURL_hik(id) {
      getHikVideoUrl(id).then((res) => {
        console.log("111000222海康", res.data.data)
        this.videoUrl=res.data.data.url
        
      });
    },

  },
}
</script>

<style>
</style>
