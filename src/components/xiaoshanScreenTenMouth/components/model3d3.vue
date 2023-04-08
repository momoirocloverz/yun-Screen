<template>
  <div id="container-3d">
    <vue3dLoader
      :filePath="['/static/glft/scene(39).gltf']"
      :width="400"
      :height="200"
      :mtlPath="[null]"
    ></vue3dLoader>
  </div>
</template>

<script>
import { vue3dLoader } from "vue-3d-loader";
export default {
  components: { vue3dLoader },
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
#container-3d {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  background: url("../../../assets/img4/BJ.jpg") no-repeat center;
  background-size: 100% 100%;
}
</style>
