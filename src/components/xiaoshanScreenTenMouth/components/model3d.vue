<template>
  <div id="container-3d"></div>
</template>

<script>
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { OrbitControls } from "three-orbit-controls";

import { OBJLoader } from 'three-obj-mtl-loader'
// const OrbitControls = require("three-orbit-controls")(THREE);
export default {
  components: {},
  props: {
    text: String,
  },
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      mesh2: null,
      group: null,
      controls: null,
    }
  },
  mounted() {
    this.init()
    // this.animate();
  },
  methods: {
    init() {
      let container = document.getElementById('container-3d')
      this.camera = new Three.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      )
      this.camera.position.z = 0.6
      this.scene = new Three.Scene()

      // let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      // let material = new Three.MeshNormalMaterial();
      // this.mesh2 = new Three.Mesh(geometry, material);
      // this.mesh2.position.x = 0;
      // this.mesh2.position.y = 0;
      // this.mesh2.position.z = -0.1;
      // this.scene.add(this.mesh2);
      this.loadObj()

      this.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
      this.renderer.setClearAlpha(1)

      // 创建控件对象
      // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.addEventListener("change", this.animate);
      this.initOrbitControls()
    },
    // 创建obj模型
    loadObj(current = 'wbt') {
      let that = this
      let objloader = new FBXLoader()
      // let objloader = new OBJLoader();
      objloader.load(`static/model/wbt.fbx`, function(obj) {
        console.log('obj', obj)
        that.mesh = obj.children[1]
        that.mesh.scale.set(3, 3, 3)
        that.mesh.position.set(0, 0, 0)

        that.camera.lookAt(0, 0, 0)
        that.scene.add(that.mesh)

        // that.renderer.render(that.scene, that.camera);
        that.animate()
      })
    },
    initOrbitControls() {
      let controls = new OrbitControls(this.camera, this.renderer.domElement)
      controls.enableDamping = true
      controls.enableZoom = true
      controls.autoRotate = false
      controls.autoRotateSpeed = 3
      controls.enablePan = true
      controls.enableKeys = true
      controls.keyPanSpeed = 7
      controls.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40,
      }
      this.controls = controls
    },
    animate() {
      let that = this
      requestAnimationFrame(this.animate)
      // that.mesh2.rotation.y += 0.02;

      that.renderer.render(that.scene, that.camera)
    },
  },
}
</script>

<style lang="less" scoped>
#container-3d {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  background: url('../../../assets/img4/BJ.jpg') no-repeat center;
  background-size: 100% 100%;
}
</style>
