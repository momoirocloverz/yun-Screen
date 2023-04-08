<template>
  <div class="container_">
    <div class="container">
      <Box
        :height="'611px'"
        :bgSrc="require('../../../assets/imgBoxBg/z-box3-bg.png')"
      >
        <div class="part-1">
          <Title2 :text="'实时监控'">
            <div class="img-box">
              <div
                :class="['img', 'img-1', imgTab ? '' : 'img-1-act']"
                @click="imgClick(false)"
              ></div>
              <div
                :class="['img', 'img-2', imgTab ? 'img-2-act' : '']"
                @click="imgClick(true)"
              ></div>
            </div>
          </Title2>
          <div class="video-container">
            <div
              class="item"
              v-for="(item, index) in realTimeCameraList"
              :key="index"
            >
              <div class="inner" v-if="true">
                <VideoBox
                  :index="index"
                  :videoId="item"
                  :width="'1.989583rem'"
                  :height="'1.375rem'"
                  :autoplay="false"
                />
              </div>
              <div class="inner" v-else>
                <VideoBoxEasy
                  :index="index"
                  :videoId="item"
                  :width="'1.989583rem'"
                  :height="'1.375rem'"
                  :autoplay="true"
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Box
        :height="'242px'"
        :bgSrc="require('../../../assets/imgBoxBg/z-box4-bg.png')"
      >
        <div class="part-2">
          <Title3 :text="'AI研判'"> </Title3>
          <div class="video-container">
            <div
              class="item"
              v-for="(item, index) in aiJudgeCameraList"
              :key="index"
            >
              <div class="inner" v-if="true">
                <VideoBox
                  :index="index + 10"
                  :videoId="item"
                  :width="'0.9947916rem'"
                  :height="'0.796875rem'"
                  :autoplay="false"
                />
              </div>
              <div class="inner" v-else>
                <VideoBoxEasy
                  :index="index + 1"
                  :videoId="item"
                  :width="'0.9947916rem'"
                  :height="'0.796875rem'"
                  :autoplay="true"
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  </div>
</template>

<script>
import Box from "../components/box";
import Title2 from "../components/title2";
import Title3 from "../components/title3";

import VideoBox from "./components/videoBox";
import VideoBoxEasy from "./components/videoPlayerBox";

import { eventBus } from "@/main";

export default {
  components: { Box, Title2, Title3, VideoBox, VideoBoxEasy },
  data() {
    return {
      imgTab: true,
      realTimeCameraList: [
        "37bc9ca73d8c467a94c95576dfccd9d1",
        "37bc9ca73d8c467a94c95576dfccd9d1",
        "37bc9ca73d8c467a94c95576dfccd9d1",
        "37bc9ca73d8c467a94c95576dfccd9d1"
      ],
      aiJudgeCameraList: [
        "37bc9ca73d8c467a94c95576dfccd9d1",
        "37bc9ca73d8c467a94c95576dfccd9d1",
        "37bc9ca73d8c467a94c95576dfccd9d1",
        "37bc9ca73d8c467a94c95576dfccd9d1"
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    imgClick(boolean) {
      this.imgTab = boolean;
    }
  }
};
</script>

<style lang="less" scoped>
.container_ {
  position: absolute;
  box-sizing: border-box;
  top: 80px;
  width: 830px;
  height: 950px;
  left: 545px;
  z-index: 10;

  .container {
    width: 100%;
    height: 93.5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .part-1 {
      .img-box {
        display: flex;
        margin-right: 10px;
        .img {
          width: 23px;
          height: 23px;
          margin: 0 10px;
          cursor: pointer;
        }
        .img-1 {
          background: url("../../../assets/img4/m-btn-n.png") no-repeat center;
        }
        .img-1-act {
          background: url("../../../assets/img4/m-btn-s.png") no-repeat center;
        }
        .img-2 {
          background: url("../../../assets/img4/m-btn2-n.png") no-repeat center;
        }
        .img-2-act {
          background: url("../../../assets/img4/m-btn2-s.png") no-repeat center;
        }
      }
      .video-container {
        width: 100%;
        height: 550px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
        .item {
          height: 48%;
          width: 48%;
        }
      }
    }
    .part-2 {
      .video-container {
        width: 100%;
        height: 160px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item {
          height: 95%;
          width: 24%;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
