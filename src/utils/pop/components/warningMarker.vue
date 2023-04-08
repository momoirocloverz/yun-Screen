<template>
  <div
    class="mapPop"
    v-bind:id="'popupDiv' + popId"
    v-bind:ref="'nmaPop-' + levelNum"
    v-on:click="clickStick('popupDiv' + popId)"
  >
    <div class="marker-box">
      <div
        class="marker"
        @click="markerClick"
      >
        <!-- <span>{{ rhdata.name || "务本堂" }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main'
export default {
  name: '',
  props: {},
  data() {
    return {
      rhdata: {},
    }
  },
  methods: {
    clickStick(eleId) {},
    markerClick() {
      eventBus.$emit('showWarningBox')
    },
  },
}
</script>

<style lang="less" scoped>
.mapPop {
  width: 78px;
  height: 160px;
  color: #fff;
  font-family: Microsoft YaHei;
  position: absolute;
  left: 0px;
  top: 0px;
  pointer-events: none;
  z-index: 2;
  .marker-box {
    width: 78px;
    height: 160px;
    position: absolute;
    left: -39px;
    bottom: -75%;
    box-sizing: border-box;
    visibility: visible;
    pointer-events: all;
    .marker {
      position: absolute;
      width: 78px;
      height: 77px;
      // background: url("../../../assets/img2/r-s@2x.png") no-repeat top;
      background: url('../../../assets/img4/warningMarker.png') no-repeat top;
      background-size: 100% auto;
      animation: poiJump 1.5s infinite;
      cursor: pointer;
      span {
        position: absolute;
        left: 50%;
        top: 15px;
        transform: translateX(-50%);
        color: #fff;
        font-size: 18px;
      }
    }
  }

  @keyframes poiJump {
    0% {
      top: 0px;
    }
    50% {
      top: 10px;
    }
    100% {
      top: 0px;
    }
  }
}
</style>
