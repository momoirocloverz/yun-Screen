<template>
  <div class="boxT">
    <div class="leftTitle" v-html="title">
      <!-- {{ title }} -->
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
  width: 373px;
  height: 59px;
  background: url("../../../../../assets/img2/info-title.png") no-repeat center;
  box-sizing: border-box;
  background-size: 100% auto;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
  font-family: SourceHanSansCN-Medium;
  box-sizing: border-box;
  padding-top: 28px;
  .leftTitle {
    width: 97%;
    height: 50px;
    box-sizing: border-box;
    margin-bottom: 5px;
    font-family: MicrosoftYaHei-Bold;
    font-size: 21px;
    font-weight: 500;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 2px;
    color: #ffffff;
    text-align: left;
    padding-left: 50px;
  }
}
</style>
