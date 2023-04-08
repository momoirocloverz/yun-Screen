<template>
  <div class="boxT">
    <img class="img-bg" src="../../../assets/img3/t-bg.png" alt="" srcset="">
    <img
      class="icon"
      :src="imgSrc"
      alt=""
      srcset=""
    >
    <div
      class="title"
      v-html="title"
    >
      {{ title }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '默认标题',
    },
    imgSrc: {
      type: String,
      default: require('../../../assets/img3/icon1.png'),
    },
  },
}
</script>

<style scoped lang="less">
  @keyframes rotateCircle {
    0% {transform:translateY(-50%) rotate(0deg)}
    100% {transform:translateY(-50%) rotate(360deg)}
  }
.boxT {
  position: relative;
  width: 100%;
  height: 41px;
  box-sizing: border-box;
  padding-left: 12px;
  padding-bottom: 7px;
  // background-image: url('../../../assets/img3/s-title-bg.png');
  background-image: url('../../../assets/img3/t-circle.png');
  background-size: 100% 90%;
  background-position-x: 28px;
  background-repeat: no-repeat;
  font-family: SourceHanSansCN-Medium;
  display: flex;
  align-items: center;
  .img-bg{
    width: 41px;
    height: 41px;
    position: absolute;
    left: 0;
    top: 50%;
    animation: rotateCircle 8s infinite linear;
  }
  .icon {
    width: 19px;
    height: 19px;
    margin-top: 6px;
  }
  .title {
    width: 97%;
    height: 45px;
    font-family: MicrosoftYaHei;
    font-size: 20px;
    font-weight: 900;
    font-stretch: normal;
    line-height: 45px;
    letter-spacing: 0px;
    color: #d9eaf5;
    // text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
    // background: linear-gradient(180deg, #ffffff 46%, #0ec5ec 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    padding-left: 17px;
    box-sizing: border-box;
    margin-top: 3px;
  }
}
</style>
