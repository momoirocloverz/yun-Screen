<template>
  <div class="mapPop" v-bind:id="'popupDiv' + popId" v-bind:ref="'nmaPop-' + levelNum" v-on:click="clickStick('popupDiv' + popId)">
    <div class="tip-box" v-bind:id="'popupDiv' + popId" v-bind:ref="'nmaPop-' + levelNum" v-on:click="clickStick('popupDiv' + popId)">
      <div class="close" @click="close"></div>
      <div class="row1">
        <div class="poi-name">
          {{ (rhdata.publishName || '务本堂') | subString }}
        </div>
        <div class="img">
          <img v-if="rhdata.sfxs == 0" src="../../../assets/img3/x@3x.png" alt="" srcset="" />
          <img v-else src="../../../assets/img3/x-n@3x.png" alt="" srcset="" />
        </div>
      </div>
      <div class="row2">
        <div class="left">
          <span>预警：</span>
          <span>
            {{ rhdata.yjcs }}
          </span>
        </div>
        <div class="right">
          <span>整改：</span>
          <span>{{ rhdata.zgcs }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main';
export default {
  name: '',
  props: {
    // rhdata: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  data() {
    return {
      popId: '',
      levelNum: 0, //层级
      rhdata: {},
    };
  },
  mounted() {
    // console.log('555666', this.rhdata)
  },
  filters: {
    subString(val) {
      if (val.length <= 4) {
        return val;
      } else {
        let str = val.substr(0, 4) + '...';
        return str;
      }
    },
  },
  methods: {
    close() {
      eventBus.$emit('closePup');
    },
  },
};
</script>

<style lang="less" scoped>
.mapPop {
  // width: 630px;
  // height: 395px;
  width: 140px;
  height: 60px;
  color: #fff;
  font-family: Microsoft YaHei;
  position: absolute;
  // left: 500px;
  // top: 100px;
  pointer-events: none;
  z-index: 2;
  .tip-box {
    width: 140px;
    height: 60px;
    position: absolute;
    left: -70px;
    top: -70px;
    background: url('../../../assets/img3/s-pop-bg.png') no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 12px;
    visibility: visible;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .close {
      width: 32px;
      height: 30px;
      position: absolute;
      top: 30px;
      right: 10px;
      cursor: pointer;
    }
    .row1 {
      display: flex;
      width: 100%;
      height: 50%;
      .poi-name {
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #fff;
        font-size: 16px;
      }
      .img {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          margin-left: 5px;
        }
      }
    }
    .row2 {
      display: flex;
      height: 50%;
      .left,
      .right {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        span:nth-child(1) {
          color: #fff;
        }
      }
      .left {
        span:nth-child(2) {
          color: #f85e4e;
        }
      }
      .right {
        span:nth-child(2) {
          color: #ffe348;
        }
      }
    }
  }
}
</style>
