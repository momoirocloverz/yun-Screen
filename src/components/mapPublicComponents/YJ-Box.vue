<template>
  <div
    class="container"
    v-show="isShow"
  >
    <div class="head-text">
      <span>{{ headText }}</span>
      <!-- <span>{{ time }}</span> -->
    </div>
    <div class="body">
      <div class="gk">
        <div
          class="row"
          @click="showDetailBox"
        >
          <span>物联感知监测预警</span>
        </div>
      </div>
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in listData"
          :key="index"
        >
          <div class="point-img"></div>
          <div class="name">{{ item.name }} : {{ item.value }}</div>
        </div>
      </div>
    </div>

    <!-- 预警详情 -->
    <WarningInfoBox
      :detailData="detailData"
      :isShow="detailBoxShow"
      @close="closeDetailBox"
      @cancelWarning="_cancelWarning"
    />
  </div>
</template>

<script>
import { eventBus } from '@/main'
import WarningInfoBox from './warningInfoBox.vue'
export default {
  components: { WarningInfoBox },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headText: '预警提示',
      time: '2022.05.06 13:22:22',
      listData: [
        {
          name: '预警类型',
          value: '智能烟感预警',
        },
        {
          name: '预警文物点',
          value: '务本堂',
        },
        {
          name: '预警位置',
          value: '萧山区进化镇欢潭村',
        },
      ],
      detailBoxShow: false,
      detailData: {},
    }
  },
  created() {
    // eventBus.$on('showBox', (msg) => {
    //   this.detailBoxShow = true
    //   this.detailData.time = msg.time
    // })
  },
  methods: {
    showDetailBox() {
      this.detailBoxShow = true
    },
    closeDetailBox() {
      this.detailBoxShow = false
    },
    _cancelWarning() {
      console.log('点击了')
      this.detailBoxShow = false
      this.$emit('closeAndChange')
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 10px;
  left: 50px;
  width: 327px;
  height: 237px;
  background: url('../../assets/img2/expect-pro-box.png') no-repeat center;
  background-size: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  .head-text {
    width: 100%;
    height: 45px;
    line-height: 50px;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 15px;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #feffff;
    opacity: 0.95;
    display: flex;
    justify-content: space-between;
  }
  .close {
    width: 22px;
    height: 22px;
    position: absolute;
    top: 15px;
    right: 17px;
    cursor: pointer;
  }
  .body {
    width: 97%;
    height: calc(100% - 47px);
    .gk {
      height: 48px;
      box-sizing: border-box;
      padding-left: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .row {
        width: 147px;
        height: 31px;
        background: url('../../assets/img2/rist-b.png') no-repeat center;
        background-size: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-family: MicrosoftYaHei-Bold;
          font-size: 16px;
          font-weight: 900;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffd143;
          text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
          background: linear-gradient(180deg, #ffffff 6%, #ffd143 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .list {
      width: 100%;
      height: calc(100% - 33px - 48px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .item {
        margin: 7px;
        width: 96%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid rgba(208, 154, 146, 0.3);
        .point-img {
          height: 17px;
          width: 17px;
          background: url('../../assets/img2/dot.png') no-repeat center;
          background-size: 100%;
          margin-right: 10px;
        }
        .name {
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
