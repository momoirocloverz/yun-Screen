<template>
  <div class="box">
    <span>{{ text }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 802px;
  height: 45px;
  background: url("../../../assets/img4/title3.png") no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 5px 0 33px;
  span {
    font-family: STSongti-SC-Black;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #e4f5ff;
  }
}
</style>
