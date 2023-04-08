<template>
  <div class="container" v-show="isShow">
    <div class="head-text">{{ headText }}</div>
    <div class="close" @click="close"></div>
    <div class="body">
      <div class="gk">
        <div class="row">
          <span>预警内容:</span>
          <span>高温预警！</span>
          <span>预计气温:</span>
          <span>42摄氏度</span>
        </div>
        <div class="row">
          <span>预计发生时间:</span>
          <span>2022-05-14 12:00</span>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in listData" :key="index">
          <div class="point-img"></div>
          <div class="name">{{ item.name }}</div>
          <div class="level">防护等级 : {{ item.level }}</div>
          <div class="btn">通知镇街</div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          @current-change="pageNumChange"
          :page-size="3"
          :pager-count="5"
          layout="prev, pager, next"
          :total="3"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headText: "气象预警信息",
      listData: [
        {
          name: "务本堂",
          level: "火灾一级"
        },
        {
          name: "许家南大房",
          level: "火灾一级"
        },
        {
          name: "汤寿潜故居",
          level: "火灾一级"
        }
      ]
    };
  },
  methods: {
    pageNumChange() {},
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  bottom: -25px;
  left: 456px;
  width: 437px;
  height: 331px;
  background: url("../../../../assets/img2/pop5.png") no-repeat center;
  box-sizing: border-box;
  padding-left: 10px;
  .head-text {
    width: 100%;
    height: 45px;
    line-height: 50px;
    box-sizing: border-box;
    padding-left: 30px;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #feffff;
    opacity: 0.95;
  }
  .close {
    width: 22px;
    height: 22px;
    position: absolute;
    top: 15px;
    right: 17px;
    cursor: pointer;
  }
  .body {
    width: 97%;
    height: calc(100% - 47px);
    .gk {
      height: 88px;
      box-sizing: border-box;
      padding-left: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-family: MicrosoftYaHei-Bold;
      font-size: 18px;
      font-weight: 900;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      opacity: 0.88;
      .row {
        margin: 3px 0;
      }
    }
    .list {
      width: 100%;
      height: calc(100% - 33px - 88px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .item {
        margin: 7px;
        width: 96%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(208, 154, 146, 0.3);
        .point-img {
          height: 17px;
          width: 17px;
          background: url("../../../../assets/img2/dot.png") no-repeat center;
        }
        .name {
          width: 100px;
          font-family: MicrosoftYaHei-Bold;
          font-size: 16px;
          font-weight: 900;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #f0e4cd;
        }
        .level {
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
        .btn {
          width: 97px;
          height: 31px;
          background: url("../../../../assets/img2/r-btn.png") no-repeat center;
          text-align: center;
          line-height: 30px;
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffd143;
        }
      }
    }
    .pagination {
      text-align: right;
    }
  }
}
</style>
