<template>
  <div class="boxT">
    <div class="title" v-html="title">
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
      default: "默认标题"
    }
  }
};
</script>

<style scoped lang="less">
.boxT {
  position: relative;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  background-image: url("../../../assets/img2/title-l.png");
  background-size: 180%;
  background-position-x: -22px;
  background-position-y: -23px;
  background-repeat: no-repeat;
  font-family: SourceHanSansCN-Medium;
  .title {
    width: 97%;
    height: 45px;
    font-family: MicrosoftYaHei;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 45px;
    letter-spacing: 0px;
    color: #f1f2f7;
    padding-left: 47px;
    box-sizing: border-box;
  }
}
</style>
