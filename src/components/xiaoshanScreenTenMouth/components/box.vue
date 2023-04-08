<template>
  <div
    class="box"
    :style="{
      width: width,
      height: height,
      background: `url(${bgSrc}) no-repeat center`,
      'background-size': '100% 100%'
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '325px',
    },
    bgSrc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.box {
  position: relative;
  // background-color: rgba(17, 29, 66, 0.8);
  // border: 1px solid rgba(35, 123, 159, 0.72);
  box-sizing: border-box;
  padding: 12px 17px;
  background-size: 100% 100% !important;
  // .corner {
  //   position: absolute;
  //   width: 28px;
  //   height: 28px;
  // }
  // .item-1 {
  //   top: 2px;
  //   left: 2px;
  //   transform: rotateZ(270deg);
  // }
  // .item-2 {
  //   top: 2px;
  //   right: 2px;
  // }
  // .item-3 {
  //   left: 2px;
  //   bottom: 2px;
  //   transform: rotateZ(180deg);
  // }
  // .item-4 {
  //   right: 2px;
  //   bottom: 2px;
  //   transform: rotateZ(90deg);
  // }
}
</style>
