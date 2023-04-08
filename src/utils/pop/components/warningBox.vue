<template>
  <div class="mapPop" v-bind:id="'popupDiv' + popId" v-bind:ref="'nmaPop-' + levelNum" v-on:click="clickStick('popupDiv' + popId)">
    <div class="warning-box">
      <div class="row1">
        <span>{{ this.rhdata.warningType || '火灾预警' }}</span>
        <!-- <div class="btn" @click="eventTrack">事件追踪</div> -->
        <div class="btn" @click="reAudit">人工复核</div>
      </div>
      <div class="row2">
        <span>文物点：</span>
        <span>{{ this.rhdata.pointName || '务本堂' }}</span>
      </div>
      <div class="row2">
        <span>时间：</span>
        <span>{{ this.rhdata.time || new Date().Format('yyyy-MM-dd HH:mm:ss') }}</span>
      </div>
      <div class="row2" v-if='false'>
        <span>描述：</span>
        <span>{{ this.rhdata.remark || '电流电压过高' }}</span>
      </div>
      <div class="row2">
        <span>监测值：</span>
        <span>{{ this.rhdata.warningValue || '暂无' }}</span>
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
      rhdata: {},
    };
  },
  methods: {
    clickStick() {},
    // close() {
    //   eventBus.$emit('closePup')
    //   eventBus.$emit('isShowVideo', false)
    // },
    eventTrack() {
      eventBus.$emit('isShowCenterAndTop', false);
      //   eventBus.$emit('newFireReaction', false);
    },
    reAudit(){
      eventBus.$emit('isShowReAudit');
    }
  },
};
</script>
<style lang="less" scoped>
.mapPop {
  width: 630px;
  height: 395px;
  color: #fff;
  font-family: Microsoft YaHei;
  position: absolute;
  left: 500px;
  top: 100px;
  pointer-events: none;
  z-index: 2;
  .warning-box {
    width: 289px;
    height: 171px;
    position: absolute;
    left: 60px;
    bottom: 90px;
    background: url('../../../assets/img4/event-box.png') no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 0px 10px 0px 10px;
    visibility: visible;
    pointer-events: all;
    .row1 {
      width: 100%;
      height: 33px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-family: SourceHanSansCN-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .btn {
        width: 85px;
        height: 25px;
        background: url('../../../assets/img4/event-btn.png') no-repeat center;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: SourceHanSerifCN-Bold;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #fef6de;
        cursor: pointer;
      }
    }
    .row2 {
      width: 100%;
      height: 43px;
      display: flex;
      align-items: center;
      span:nth-child(1) {
        font-family: SourceHanSansCN-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #b7c1d4;
      }
      span:nth-child(2) {
        font-family: MicrosoftYaHei-Bold;
        font-size: 16px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
}
</style>
