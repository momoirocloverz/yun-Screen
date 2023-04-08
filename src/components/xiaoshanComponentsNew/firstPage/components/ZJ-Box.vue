<template>
  <div class="container" v-show="isShow">
    <div class="head-text">{{ headText }}</div>
    <div class="close" @click="close"></div>
    <div class="body">
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in listData"
          :key="index"
          @click="showDeatil(item)"
        >
          <div class="index">
            <span class="text">{{ index }}</span>
          </div>
          <div class="info">
            <div class="row">
              <span>申请单位 : </span>
              <span>{{ item.name }}</span>
              <span>资金用途 : </span>
              <span>{{ item.purpose }}</span>
            </div>
            <div class="row">
              <span>申请金额 : </span>
              <span>{{ item.num }}</span>
              <span>申请时间 : </span>
              <span>{{ item.time }}</span>
            </div>
          </div>
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

    <!-- 详情弹框 -->
    <zjDetailBox :isShow="detailBoxShow" @close="detailClose" />
  </div>
</template>

<script>
import zjDetailBox from "./ZJ-Detail-Box";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  components: { zjDetailBox },
  data() {
    return {
      detailBoxShow: false,
      headText: "资金申请列表",
      listData: [
        {
          name: "务本堂",
          purpose: "修缮",
          num: "150000",
          time: "2022/05/10"
        },
        {
          name: "许家南大房",
          purpose: "电器更换",
          num: "500",
          time: "2022/05/10"
        },
        {
          name: "汤寿潜故居",
          purpose: "电器更换",
          num: "500",
          time: "2022/05/10"
        }
      ]
    };
  },
  methods: {
    pageNumChange() {},
    close() {
      this.$emit("close");
      this.detailBoxShow = false;
    },
    showDeatil() {
      this.detailBoxShow = true;
    },
    detailClose() {
      this.detailBoxShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  left: 456px;
  width: 437px;
  height: 331px;
  background: url("../../../../assets/img2/pop3.png") no-repeat center;
  background-size: 100%;
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
    .list {
      width: 100%;
      height: calc(100% - 33px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .item {
        width: 96%;
        height: 80px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgba(92, 194, 212, 0.3);
        .index {
          width: 40px;
          height: 45px;
          background: url("../../../../assets/img2/num.png") no-repeat center;
          background-size: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 8px;
          .text {
            font-family: ArialMT;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #ffffff;
            background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        .info {
          .row {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #a2c0d1;
          }
          span:nth-child(2n) {
            color: #51c0e9;
            display: inline-block;
            width: 90px;
          }
        }
      }
    }
    .pagination {
      text-align: right;
    }
  }
}
</style>
