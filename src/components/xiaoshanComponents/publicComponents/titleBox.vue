<template>
  <div
    class="boxT"
    :style="{
      height: height,
      background: `url(${imgSrc}) no-repeat -10px 0`
    }"
  >
    <div
      :class="['title', titleLeft ? 'leftTitle' : 'rightTitle']"
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
    height: {
      type: String,
      default: '240px',
    },
    imgSrc: {
      type: String,
      default: require('../../../assets/img/box-bg1.png'),
    },
    titleLeft: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped lang="less">
.boxT {
  position: relative;
  width: 100%;
  height: 59px;
  box-sizing: border-box;
  background-size: 100% auto;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
  font-family: SourceHanSansCN-Medium;
  margin-bottom: 15px;
  .title {
    width: 97%;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    margin-bottom: 5px;
    // font-family: YouSheBiaoTiHei;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 3px;
    color: #c1e8ff;
  }
  .leftTitle {
    text-align: right;
    padding-right: 50px;
  }
  .rightTitle {
    text-align: left;
    padding-left: 50px;
  }
}
</style>
