<template>
  <div
    v-bind:id="'popupDiv' + popId"
    class="mapPop"
    v-bind:ref="'nmaPop-' + levelNum"
    v-on:click="clickStick('popupDiv' + popId)"
  >
    <div class="container">
      <div class="mapPop-title">
        <div class="mapPop-name">{{ rhdata.name }}限时整改事项</div>
        <div v-on:click.stop="pop_close" class="close-btn"></div>
      </div>
      <div class="mapPop-content">
        <div class="text">文物单位内居民厨房,防火设施不完善。</div>

        <div class="row_2">
          <div class="date">
            <img
              src="../../../assets/img/a-icon@2x.png"
              width="18px"
              height="18px"
              alt=""
              srcset=""
            />
            限期完成时间：2022/05/05
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
let popzIndex = 0;
export default {
  name: "pop-cultureWarning",
  props: {
    rhdata: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      popId: "",
      levelNum: 0 //层级
      // rhdata: {},
    };
  },
  methods: {
    pop_close() {
      eventBus.$emit("removePopUp");
    },
    clickStick(id) {
      ++popzIndex;
      let stick = document.getElementById(id);
      if (stick !== null) {
        stick.style.zIndex = popzIndex;
        stick.style.position = "fixed";
      }
    }
  }
};
</script>

<style scoped lang="less">
.mapPop {
  width: 427px;
  height: 325px;
  color: #fff;
  font-family: Microsoft YaHei;
  position: absolute;
  left: -220px;
  top: -325px;
  pointer-events: none;
  z-index: 2;
  visibility: visible;
  .container {
    position: absolute;
    // left: -55%;
    // top: -50%;
    width: 100%;
    height: 100%;
    background: url("../../../assets/img/pop-box2.png") no-repeat center;
    padding: 10px;
    box-sizing: border-box;
    pointer-events: auto;
    .mapPop-title {
      width: 100%;
      height: 60px;
      font-size: 15px;
      font-weight: bolder;
      letter-spacing: 2px;
      padding: 5px 8px;
      min-height: 30px;
      box-sizing: border-box;
      position: relative;
      .mapPop-name {
        margin-left: 10px;
        font-family: SourceHanSansCN-Bold;
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        line-height: 60px;
      }

      .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 33px;
        height: 33px;
        background: url("../../../assets/img/close.png");
        background-size: 100% 100%;
        pointer-events: auto;
      }
    }
    .mapPop-content {
      font-size: 15px;
      padding: 20px 18px 0 18px;
      box-sizing: border-box;
      height: calc(100% - 60px);
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #0560b6a1;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.2);
      }
      .text {
        width: 100%;
        height: 140px;
        line-height: 50px;
        font-family: SourceHanSansCN-Regular;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #f5fdff;
      }
      .row_2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        margin: 10px 0;
        .date {
          width: 282px;
          height: 34px;
          background: url("../../../assets/img/b-btn.png") center no-repeat;
          font-family: SourceHanSansCN-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #65fdff;
          line-height: 34px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            margin: 0 5px;
          }
        }
      }
    }
  }
}
</style>
