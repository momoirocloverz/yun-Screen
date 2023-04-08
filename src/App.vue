<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { login } from './api/xsApi';
export default {
  name: 'App',
  created() {
    this.login();
  },
  data() {
    return {};
  },
  methods: {
    login() {
      login().then((res) => {
        localStorage.setItem('xs_token', res.data.data.token);
      });
    },
  },
};
</script>
<style lang="less">
/* 3840*1080 */
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 1px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 1px;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  background: #00ffff17;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.2);
}
</style>
