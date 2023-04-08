<template>
  <div id="container-3d">
    <model-obj
      :src="`/static/model/${modelName}.obj`"
      :backgroundAlpha="0"
      :lights="lights"
    />
    <!-- <model-fbx
      src="/static/model/wbt.obj"
      :backgroundAlpha="0"
      :lights="lights"
    /> -->
  </div>
</template>

<script>
import { ModelObj, ModelFbx } from "vue-3d-model";
export default {
  components: { ModelObj, ModelFbx },
  props: {},
  data() {
    return {
      modelName: "wbt",
      lights: [
        {
          type: "HemisphereLight",
          position: { x: 0, y: 1, z: 0 },
          skyColor: 0xffffff,
          // groundColor: 0xFF0000, 此代码为灯光后颜色
          intensity: 0.5
        },
        {
          type: "DirectionalLight",
          position: { x: 1, y: 1, z: 1 },
          color: 0x5c89ff,
          intensity: 1
        }
      ]
    };
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
