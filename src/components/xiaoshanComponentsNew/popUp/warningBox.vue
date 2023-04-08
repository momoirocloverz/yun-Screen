<template>
  <div class="warning-box">
    <div class="close" @click="close"></div>
    <div class="title">
      <img src="../../../assets/img2/w-txt.png" alt="" srcset="" />
      <span>{{ this.rhdata.time }}</span>
    </div>
    <div class="body">
      <div class="part1">
        <div class="row">预警类型: {{this.rhdata.warningType}}</div>
        <div class="row">关联文物巡查员: 田欢乐</div>
        <div class="row">联系电话: 13606717524</div>
      </div>
      <div class="part2">
        <div class="row">预警值: {{this.rhdata.warningValue}}</div>
        <!-- <div class="btn" @click="handle">处置</div> -->
      </div>
    </div>

    <!-- 事件详情 -->
    <YsydDetail
      :isShow="isShow_ysyd_detail"
      :row="ysyd_row"
      @close="ysyd_detail_close"
    />

  </div>
</template>

<script>
import { eventBus } from "@/main";
import YsydDetail from "../firstPage/components/ysyd_detail.vue";
export default {
  name: "",
  components:{YsydDetail},
  props: {
    rhdata: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ysyd_row:{},
      isShow_ysyd_detail:false,
    };
  },
  methods: {
    ysyd_detail_close(){
      this.isShow_ysyd_detail = false
    },
    close() {
      eventBus.$emit("closePup");
      eventBus.$emit('isShowVideo',false)
    },
    handle() {
      // eventBus.$emit("showBox", { time: this.rhdata.time });
      this.isShow_ysyd_detail = true
    },
  }
};
</script>

<style lang="less" scoped>
.warning-box {
  width: 433px;
  height: 189px;
  position: absolute;
  left: 50px;
  top: -95px;
  //   background: url('../../../assets/img2/warning-box.png') no-repeat center;
  background: url("../../../assets/img2/w-box2.gif") no-repeat center;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 40px 20px 14px 50px;
  visibility: visible;
  .close {
    width: 32px;
    height: 30px;
    position: absolute;
    top: 30px;
    right: 10px;
    cursor: pointer;
  }
  .title {
    width: 100%;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 122px;
      height: 41px;
    }
    span {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #f9ce5c;
      opacity: 0.88;
    }
  }
  .body {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    .part1 {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      box-sizing: border-box;
      padding-left: 10px;
      .row {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #eae7ee;
        opacity: 0.88;
      }
    }
    .part2 {
      flex: 1.2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      box-sizing: border-box;
      padding: 5px 0;
      .row {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #eae7ee;
        opacity: 0.88;
      }
      .btn {
        width: 80px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../../../assets/img2/w-btn.png") no-repeat center;
        background-size: 100% 100%;

        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
  .videoBox{
    width: 433px;
    height: 300px;
    position: absolute;
    bottom: 200px;
    left: 0px;
    background: red;
  }
}
</style>
