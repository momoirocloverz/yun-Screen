<template>
  <div class="container">
    <img
      src="../../../assets/img2/img-box2.png"
      alt=""
      srcset=""
    >
    <div class="info">
      <div class="row1">
        <span>{{rhdata.name}}</span>
        <img
          src="../../../assets/img2/contact.png"
          alt=""
          srcset=""
        >
      </div>
      <div class="row">
        <span>负责文物：</span>
        <span>{{rhdata.pointName}}</span>
      </div>
      <div class="row">
        <span>上次巡查时间：</span>
        <span>{{rhdata.lastTime}}</span>
      </div>
      <div class="row">
        <span>累计巡查次数：</span>
        <span>{{rhdata.num}}次</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rhdata: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.container {
  width: 457px;
  height: 204px;
  position: absolute;
  left: -200px;
  top: -210px;
  background: url('../../../assets/img2/pop6.png') no-repeat center;
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
      background: url('../../../assets/img2/pop-title.png');
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
        color: rgba(195, 230, 249, 0.87);
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
</style>
