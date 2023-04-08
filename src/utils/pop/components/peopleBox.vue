<template>
  <div
    class="mapPop"
    v-bind:id="'popupDiv' + popId"
    v-bind:ref="'nmaPop-' + levelNum"
    v-on:click="clickStick('popupDiv' + popId)"
  >
    <div class="container">
      <img src="../../../assets/img2/img-box2.png" alt="" srcset="" />
      <div class="info">
        <div class="row1">
          <span>{{ rhdata.name }}</span>
          <span>{{ rhdata.phone }}</span>
          <img src="../../../assets/img2/contact.png" alt="" srcset="" />
        </div>
        <div class="row">
          <span>所属镇街：</span>
          <span>{{ rhdata.jd }}</span>
        </div>
        <div class="row">
          <span>负责文物：</span>
          <span>{{ rhdata.pointName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "",
  props: {},
  data() {
    return {
      rhdata: {}
    };
  },
  methods: {
    clickStick(eleId) {}
  }
};
</script>

<style lang="less" scoped>
.mapPop {
  width: 138px;
  height: 160px;
  color: #fff;
  font-family: Microsoft YaHei;
  position: absolute;
  left: 0px;
  top: 0px;
  pointer-events: none;
  z-index: 2;
  .container {
    width: 444px;
    height: 191px;
    position: absolute;
    left: 30px;
    top: 90px;
    background: url("../../../assets/img2/pop6.png") no-repeat center;
    background-size: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    visibility: visible;
    img {
      width: 118px;
      height: 144px;
      margin-right: 10px;
    }
    .info {
      .row1 {
        width: 268px;
        height: 40px;
        background: url("../../../assets/img2/pop-title.png");
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-family: MicrosoftYaHei-Bold;
          font-size: 20px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 29px;
          letter-spacing: 0px;
          color: #fff;
        }
        span:nth-child(2) {
          color: #a7aed1;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
      .row {
        width: 268px;
        height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span:nth-child(1) {
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #a2c0d1;
        }
        span:nth-child(2) {
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #51c0e9;
        }
      }
    }
  }
}
</style>
