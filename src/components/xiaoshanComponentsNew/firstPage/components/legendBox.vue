<template>
  <div
    class="legend-box"
    v-show="isShow"
  >
    <div class="box-1">
      <div class="title">文物点风险等级</div>
      <div class="detail">
        <div
          class="item"
          v-for="(item, index) in legend_1"
          :key="index"
        >
          <img
            :src="item.imgSrc"
            alt=""
            srcset=""
          />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main'
export default {
  data() {
    return {
      isShow: false,
      legend_1: [
        {
          name: '高风险',
          imgSrc: require('../../../../assets/img4/bump-r.png'),
        },
        {
          name: '中风险',
          imgSrc: require('../../../../assets/img4/bump-y.png'),
        },
        {
          name: '低风险',
          imgSrc: require('../../../../assets/img4/bump-g.png'),
        },
      ],
    }
  },
  created() {
    eventBus.$on('showLegend', () => {
      this.isShow = !this.isShow
    })
  },
}
</script>

<style lang="less" scoped>
.legend-box {
  width: 148px;
  height: 133px;
  position: absolute;
  bottom: 85px;
  right: 583px;
  box-sizing: border-box;
  padding: 15px;
  background: url('../../../../assets/img4/map-img-box.png') no-repeat center;
  background-size: 100% 100%;
  z-index: 12;
  .box-1 {
    width: 100%;
    height: 100%;
    .title {
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #d9e0ff;
      margin-bottom: 5px;
    }
    .detail {
      display: flex;
      flex-direction: column;
      .item {
        width: 100%;
        height: 33%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 4px;
        img {
          width: 20px;
          height: 21px;
          margin-right: 10px;
        }
        span {
          font-family: SourceHanSansCN-Regular;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #8b93b4;
        }
      }
    }
  }
  .box-2 {
    width: 100%;
    height: 36%;
    border-bottom: 1px solid rgba(20, 183, 254, 0.3);
    margin: 5px 0;
    .detail {
      display: flex;
      flex-wrap: wrap;
      .item {
        height: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 4px;
        &:nth-child(1) {
          width: 100%;
        }
        &:nth-child(1) {
          width: 100%;
        }
        img {
          width: 22px;
          height: 27px;
          margin-right: 5px;
        }
        span {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
    }
  }
  .box-3 {
    width: 100%;
    margin-top: 2px;
    height: 25%;
    .detail {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 21px;
          height: 26px;
          margin-right: 5px;
        }
        span {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
