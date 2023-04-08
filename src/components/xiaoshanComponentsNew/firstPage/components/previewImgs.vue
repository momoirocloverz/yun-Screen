<template>
  <div
    class="preview-box"
    v-if="isShow"
  >
    <div class="content">
      <div
        id="imgBox"
        class="img-box"
        style="left:0rem;"
      >
        <img
          v-for="(item,index) in imgArr"
          :key="index"
          :src="item"
          alt=""
          srcset=""
        >
      </div>
    </div>
    <div
      class="pre"
      @click="pre"
    ></div>
    <div
      class="next"
      @click='next'
    ></div>
    <div class="title">文物安全责任书</div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    imgArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    pre() {
      let imgBox = document.querySelector('#imgBox')
      let left = parseFloat(imgBox.style.left)
      console.log('left', imgBox, left)
      if (this.currentPage > 1) {
        let currentLeft = left + 2.7864583333333335
        imgBox.style.left = `${currentLeft}rem`
        this.currentPage -= 1
      }
    },
    next() {
      let imgBox = document.querySelector('#imgBox')
      let left = parseFloat(imgBox.style.left)
      console.log('left', imgBox, left)
      if (this.currentPage < this.imgArr.length) {
        let currentLeft = left - 2.7864583333333335
        imgBox.style.left = `${currentLeft}rem`
        this.currentPage += 1
      }
    },
  },
}
</script>

<style lang="less" scoped>
.preview-box {
  position: absolute;
  top: -170px;
  right: -330px;
  width: 596px;
  height: 764px;
  background: url('../../../../assets/img2/bbox.png') no-repeat center;
  background-size: 100% 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .pre {
    position: absolute;
    left: -10px;
    top: 45%;
    transform: translateY(-50%);
    width: 70px;
    height: 70px;
    background: url('../../../../assets/img2/l-arrow.png') no-repeat center;
    background-size: 100%;
    cursor: pointer;
  }
  .next {
    position: absolute;
    right: -14px;
    top: 45%;
    transform: translateY(-50%);
    width: 70px;
    height: 70px;
    background: url('../../../../assets/img2/r-arrow.png') no-repeat center;
    background-size: 100%;
    cursor: pointer;
  }
  .content {
    width: 535px;
    height: 650px;
    overflow-x: hidden;
    position: relative;
    .img-box {
      position: absolute;
      top: 0;
      min-width: 535px;
      height: 100%;
      display: flex;
      transition: all 0.1s;
      img {
        height: 100%;
        width: 535px;
      }
    }
  }
  .title {
    width: 100%;
    height: 36px;
    font-size: 20px;
    font-weight: 900;
    font-family: SourceHanSansCN-Bold;
    text-align: center;
    line-height: 50px;
    text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
    background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
