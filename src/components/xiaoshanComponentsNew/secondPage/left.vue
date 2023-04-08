<template>
  <div class="box">
    <TitleBox :title="'智能预警'" />
    <div class="znyj">
      <div
        class="item"
        v-for="(item, index) in znyj_data"
        :key="index"
      >
        <span>{{ item.name }}</span>
        <span>{{ item.num }}</span>
      </div>
    </div>
    <TitleBox :title="'设备列表'" />
    <div class="monitor-list">
        <div class="item" v-for="(item, index) in deviceList" :key="index">
          <div class="device">
            <span>{{ item.deviceName }}</span>
            <img
              src="@/assets/img/device1.png"
              alt=""
              srcset=""
              width="75px"
              height="59px"
            />
          </div>
          <div class="info">
            <div class="info-item online">
              <span>{{ item.online ? "在线" : "异常" }}</span>
              <img
                v-if="item.online"
                src="@/assets/img/o-icon.png"
                alt=""
                srcset=""
              />
              <img v-else src="@/assets/img/off-icon.png" alt="" srcset="" />
            </div>
            <div class="info-item signal">
              <span>信号</span>
              <div class="bottom">
                <img
                  v-if="item.signal >= 400"
                  src="@/assets/img/s-icon.png"
                  alt=""
                  srcset=""
                />
                <img v-else src="@/assets/img/so-icon.png" alt="" srcset="" />
                <span
                  :style="{
                    color: item.signal >= 400 ? '#00b6ff' : '#bacce6'
                  }"
                  >-{{ item.signal }}</span
                >
              </div>
            </div>
            <div class="info-item battery">
              <span>电池</span>
              <div class="bottom">
                <img
                  v-if="item.battery >= 0.5"
                  src="@/assets/img/b-icon.png"
                  alt=""
                  srcset=""
                />
                <img v-else src="@/assets/img/b-icon2.png" alt="" srcset="" />
                <span
                  :style="{ color: item.battery >= 0.5 ? '#00b6ff' : 'red' }"
                  >{{ item.battery * 100 }}%</span
                >
              </div>
            </div>
          </div>
        </div>
    </div>
    <div
      class="camera"
      v-for="(item, index) in videoIds"
      :key="index"
    >
      <div class="camera-title">{{ item.name }}</div>
      <VideoBox
        :index="index"
        :videoId="item.videoId"
        :width="'93%'"
        :height="'163px'"
        :imgSrc="item.imgSrc"
      />
    </div>
  </div>
</template>

<script>
import TitleBox from "../publicComponents/titleBox";
import VideoBox from '../publicComponents/videoBox'
export default {
  name: "",
  components: { TitleBox, VideoBox},
  data() {
    return {
      znyj_data: [
        {
          name: "视频监控",
          num: "18"
        },
        {
          name: "感烟监测",
          num: "9"
        },
        {
          name: "水压监测",
          num: "15"
        },
        {
          name: "气体监测",
          num: "9"
        },
        {
          name: "电流监测",
          num: "28"
        },
        {
          name: "感温监测",
          num: "9"
        }
      ],
      deviceList: [
        {
          deviceName: "设备1",
          online: true,
          signal: 450,
          battery: 0.9
        },
        {
          deviceName: "设备2",
          online: false,
          signal: 250,
          battery: 0.2
        },
        {
          deviceName: "设备3",
          online: true,
          signal: 420,
          battery: 0.68
        },
        {
          deviceName: "设备4",
          online: true,
          signal: 460,
          battery: 0.7
        },
        {
          deviceName: "设备5",
          online: true,
          signal: 400,
          battery: 0.45
        },
        {
          deviceName: "设备6",
          online: true,
          signal: 360,
          battery: 0.8
        },
        {
          deviceName: "设备7",
          online: true,
          signal: 200,
          battery: 0.85
        }
      ],
      videoIds: [
        {
          name: '现场监控1',
          videoId: '1',
          imgSrc:
            'http://localhost:8089/static/images/culturalSave/poster_1.png',
        },
      ],
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  .znyj {
    width: 100%;
    height: 201px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    .item {
      width: 33%;
      height: 50%;
      background: url("../../../assets/img2/icon11.png") center no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      span:nth-child(1) {
        font-family: MicrosoftYaHei-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 1px;
        color: #bbdbff;
        opacity: 0.8;
        margin-top: 5px;
        margin-bottom: 10px;
      }
      span:nth-child(2) {
        font-family: MicrosoftYaHei-Bold;
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 1px;
        color: #c4dcff;
      }
    }
  }
  .monitor-list {
    width: 100%;
    height: calc(100% - 570px);
    overflow: auto;
    margin: 10px 0;
    .item {
      width: 100%;
      height: 90px;
      display: flex;
      padding: 0 10px;
      box-sizing: border-box;
      background: url("../../../assets/img/x-line.png") no-repeat bottom;
      .device {
        width: 75px;
        height: 97px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
        span {
          font-family: MicrosoftYaHei-Bold;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 2px;
          color: #b4dfff;
        }
      }
      .info {
        flex: 1;
        display: flex;
        height: 97px;
        .info-item {
          width: 100px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: url("../../../assets/img/line.png") no-repeat right center;
          span {
            font-family: SourceHanSansCN-Bold;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 2px;
            color: #8ba9cc;
            margin-bottom: 10px;
          }
        }
        .signal {
          .bottom {
            span {
              font-family: SourceHanSansCN-Bold;
              font-size: 22px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #00b4ff;
            }
          }
        }
        .battery {
          background: none;
          .bottom {
            span {
              font-family: SourceHanSansCN-Bold;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #00b6ff;
            }
          }
        }
      }
    }
  }
  .camera {
    width: 459px;
    height: 234px;
    background: url('../../../assets/img2/video-box.png') no-repeat center;
    background-position: -9px -5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    .camera-title {
      width: 100%;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-family: SourceHanSansCN-Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      color: #a1d0f8;
      margin: 3px 0;
      margin-bottom: 8px;
    }
  }
}
</style>
