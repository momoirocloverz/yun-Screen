<template>
  <div
    class="mapPop"
    v-bind:id="'popupDiv' + popId"
    v-bind:ref="'nmaPop-' + levelNum"
    v-on:click="clickStick('popupDiv' + popId)"
  >
    <div class="cluster-box">
      <div class="num">
        <span></span>
        <span></span>
        <span></span>
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
  .cluster-box {
    width: 143px;
    height: 123px;
    position: absolute;
    left: -72px;
    bottom: -75%;
    box-sizing: border-box;
    visibility: visible;
    pointer-events: all;
    background: url("../../../assets/img4/normalCluster.png") no-repeat center;
    background-size: 100% 100%;
    .num {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #fff;
      }
    }
  }
}
</style>
