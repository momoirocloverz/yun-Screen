<template>
  <div class="top">
    <div
      class="item"
      v-for="(item, index) in topList"
      :key="index"
    >
      <img
        :src="item.imgSrc"
        alt=""
        srcset=""
      />
      <div>
        <span>{{ item.name }}</span>
        <span>{{ item.num }}<span class="unit">项</span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      topList: [
        {
          name: '限时整改',
          num: '375',
          imgSrc: require('../../../assets/img/m-icon1.png'),
        },
        {
          name: '重大火灾隐患',
          num: '15',
          imgSrc: require('../../../assets/img/m-icon2.png'),
        },
        {
          name: '重大文物犯罪',
          num: '5',
          imgSrc: require('../../../assets/img/m-icon3.png'),
        },
        {
          name: '重大法人违法',
          num: '7',
          imgSrc: require('../../../assets/img/m-icon4.png'),
        },
      ],
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.top {
  width: 892px;
  height: 163px;
  z-index: 2;
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: url('../../../assets/img/m-box-bg.png') no-repeat center;
  padding: 0 10px;
  .item {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    img {
      width: 102px;
      height: 135px;
      margin-right: 5px;
    }
    div {
      height: 135px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      span:nth-child(1) {
        font-family: SourceHanSansCN-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ededed;
      }
      span:nth-child(2) {
        font-family: DINAlternate-Bold;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #4ae3ff;
        .unit {
          font-family: SourceHanSansCN-Bold;
          font-size: 19px;
          font-weight: normal;
          letter-spacing: 0px;
          color: #4ae3ff;
        }
      }
    }
  }
}
</style>
