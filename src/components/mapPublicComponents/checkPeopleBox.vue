<template>
  <div class="container" v-show="isShow">
    <div class="head-text">{{ headText }}</div>
    <div v-show="isShowBtn" class="poi-btn" @click="showAllPoi">开启定位</div>
    <div v-show="!isShowBtn" class="poi-btn" @click="hideAllPoi">关闭定位</div>
    <div class="close" @click="close"></div>
    <div class="body">
      <div class="list">
        <div class="item" v-for="(item, index) in listData" :key="index">
          <img
            src="../../assets/img2/photo.png"
            alt=""
            srcset=""
            width="57px"
            height="60px"
          />
          <div class="info">
            <div class="row">
              <span>姓名:</span>
              <span>{{ item.name }}</span>
              <span>所属镇街:</span>
              <span>{{ item.jd }}</span>
            </div>
            <div class="row">
              <span>联系电话:</span>
              <span>{{ item.phone }}</span>
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
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { xcy_list } from "../../api/xsApi.js";
import { eventBus } from "@/main";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headText: "文物巡查员列表",
      listData: [
        {
          name: "李晓文",
          jd: "进化镇",
          phone: "13956231456",
          pointName: "务本堂",
          zb: [120.27134, 30.060297],
          type: "people",
          lastTime: "2022-05-02",
          num: "15"
        },
        {
          name: "张志涛",
          jd: "进化镇",
          phone: "13956231456",
          pointName: "务本堂",
          zb: [120.2975, 30.009382],
          type: "people",
          lastTime: "2022-05-03",
          num: "16"
        },
        {
          name: "萧然",
          jd: "进化镇",
          phone: "13956231456",
          pointName: "务本堂",
          zb: [120.312807, 29.9432],
          type: "people",
          lastTime: "2022-05-04",
          num: "18"
        }
      ],
      isShowBtn: true,
      pageSize: 3,
      currentPage: 1,
      total: 3
    };
  },
  watch: {
    isShow(val) {
      if (val) {
        // this.get_xcy_list()
      }
    }
  },
  created() {
    eventBus.$on("checkPeopleBtn", () => {
      this.isShowBtn = true;
    });
  },
  methods: {
    get_xcy_list() {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      xcy_list(params).then(res => {
        console.log("有定位的巡查员", res.data.data);
        this.listData = res.data.data.list.map(item => {
          item.type = "people";
          return item;
        });
        this.total = res.data.data.total;
        if (!this.isShowBtn) {
          this.$emit("ShowPoi", this.listData);
        }
      });
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.get_xcy_list();
    },
    showAllPoi() {
      this.$emit("ShowPoi", this.listData);
      this.isShowBtn = false;
    },
    hideAllPoi() {
      this.$emit("HidePoi");
      this.isShowBtn = true;
    },
    close() {
      this.$emit("close");
      // this.isShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  left: 40px;
  width: 328px;
  height: 331px;
  background: url("../../assets/img2/pop2.png") no-repeat center;
  background-size: 100% 100%;
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
  .poi-btn {
    width: 80px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 15px;
    right: 45px;

    border: 1px solid #8ba4fe;
    background: #34478c;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #c2cffd;
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
        width: 93%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid rgba(92, 194, 212, 0.3);
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
