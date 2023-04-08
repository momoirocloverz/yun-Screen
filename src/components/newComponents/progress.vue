<template>
  <div class="container">
    <div class="my-progress">
      <div
        ref="btn"
        class="btn"
        id="btn-f"
        @mousedown="btnMouseDown"
      >{{level}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-progress',
  data() {
    return {
      level: '3',
      origionPositionY: 0,
      oBtn: null,
      finalTop: null,
    }
  },
  mounted() {
    this.oBtn = document.getElementById('btn-f')
  },
  methods: {
    btnMouseDown(e) {
      let that = this
      this.origionPositionY = e.clientY
      let ofY = e.clientY
      let origionTop = document.getElementById('btn-f').offsetTop
      // console.log('鼠标按下', e.clientY)
      document.onmousemove = function(e) {
        let top = origionTop + e.clientY - ofY
        // console.log('鼠标移动', origionTop, top)
        if (top <= 0) {
          top = 0
        }
        if (top >= 148) {
          top = 148
        }
        this.finalTop = top
        document.getElementById('btn-f').style.top = top + 'px'
      }
      document.onmouseup = function() {
        let top
        let level
        if (this.finalTop <= 0) {
          top = 0
          level = '1'
        }
        if (this.finalTop > 0 && this.finalTop < 37) {
          top = 37
          level = '2'
        }
        if (this.finalTop > 37 && this.finalTop <= 74) {
          top = 74
          level = '3'
        }
        if (this.finalTop > 74 && this.finalTop <= 111) {
          top = 111
          level = '4'
        }
        if (this.finalTop > 111 && this.finalTop <= 148) {
          top = 148
          level = '5'
        }
        document.getElementById('btn-f').style.top = top + 'px'
        document.getElementById('btn-f').innerHTML = level
        document.onmousemove = null
        that.$emit('zoomChange', level)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 270px;
  .my-progress {
    width: 5px;
    height: 176px;
    background: linear-gradient(0deg, #0384e0 0%, #0bbafb 100%);
    position: relative;
    .btn {
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      -khtml-user-select: none;
      user-select: none;
      width: 28px;
      height: 28px;
      background-image: linear-gradient(0deg, #0384e0 0%, #0bbafb 100%);
      box-shadow: 0px 0px 8px 0px #000000;
      border-radius: 2px;
      text-align: center;
      line-height: 28px;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 74px;
      transform: translateX(-50%);
      cursor: pointer;
    }
  }
}
</style>

