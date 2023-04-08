<template>
  <div class="search">
    <input placeholder="请输入文物名称" v-model="inputValue" />
    <span @click="search">
      <i class="el-icon-search"></i>
    </span>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
export default {
  data() {
    return {
      inputValue: ""
    };
  },
  created() {
    eventBus.$on("data_back", () => {
      this.inputValue = "";
    });
  },
  methods: {
    search() {
      this.$emit("topSearch", this.inputValue);
    },
    reset() {
      this.inputValue = "";
    }
  }
};
</script>

<style scoped lang="less">
.search {
  height: 40px;
  width: 548px;
  border: 1px #4384da solid;
  box-shadow: #4384da 5px;
  border-radius: 4px;
  padding: 0 0px 0 10px;
  background: #042c68;
  display: flex;
  input {
    display: inline-block;
    box-sizing: border-box;
    color: rgba(13, 203, 228, 0.911);
    width: calc(100% - 65px);
    height: 100%;
    line-height: 40px;
    border: none;
    background: none;
    font-size: 18px;
  }
  input:focus {
    box-sizing: border-box;
    width: calc(100% - 65px);
    height: 100%;
    line-height: 28px;
    border: none;
    // border-left: none !important;
  }
  input:focus-visible {
    box-sizing: border-box;
    width: calc(100% - 65px);
    height: 100%;
    line-height: 28px;
    border: none;
    // border-left: none !important;
    outline: none;
  }
  input::-webkit-input-placeholder {
    color: #88aad5;
    font-size: 18px;
  }
  span {
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-radius: 4px;
    height: 100%;
    width: 65px;
    background: #074798;
    color: #74b7f7;
    font-size: 18px;
    cursor: pointer;
  }
  span:nth-child(2) {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: 1px #74b7f7 solid;
    border-left: 1px #4384da solid;
  }
  span:nth-child(3) {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
