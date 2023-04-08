<template>
  <div class="box">
    <TitleBox :title="'监控设备'">
      <div class="monitor-device">
        <div class="item" v-for="(item, index) in deviceData" :key="index">
          <span>{{ item.num }}</span>
          <div class="imgBox">
            <img :src="item.img" alt="" srcset="" width="32px" height="33px" />
          </div>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </TitleBox>

    <TitleBox
      :title="'设备列表'"
      :height="'648px'"
      :imgSrc="require('../../../assets/img/box-bg2.png')"
    >
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
    </TitleBox>
  </div>
</template>

<script>
import TitleBox from "../publicComponents/titleBox";
import Table from "../publicComponents/table";
export default {
  name: "",
  components: { TitleBox, Table },
  data() {
    return {
      deviceData: [
        {
          num: "8",
          img: require("@/assets/img/icon1@2x.png"),
          name: "设备类型"
        },
        {
          num: "5000",
          img: require("@/assets/img/icon2@2x.png"),
          name: "设备总数"
        },
        {
          num: "100%",
          img: require("@/assets/img/icon3@2x.png"),
          name: "设备完成率"
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
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.box {
  width: 95%;
  height: 100%;
  // background: red;
  .monitor-device {
    width: 97%;
    height: calc(100% - 70px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      color: #fff;
      .imgBox {
        width: 93px;
        height: 70px;
        background: url("../../../assets/img/base-bg.png") bottom no-repeat;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        box-sizing: border-box;
      }
      span:nth-child(1) {
        font-family: DINAlternate-Bold;
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 35px;
        letter-spacing: 0px;
        color: #4ae3ff;
      }
      span:nth-child(2) {
        font-family: SourceHanSansCN-Medium;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 18px;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
  .monitor-list {
    width: 97%;
    height: calc(100% - 70px);
    overflow: auto;
    .item {
      width: 100%;
      height: 120px;
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
}
</style>
