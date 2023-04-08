<template>
  <div class="mask_a" v-if="isShow">
    <div class="audit-case">
      <div class="title">
        方案审核
      </div>
      <div class="close" @click="close"></div>
      <div class="info">
        <!-- <div class="half-row">
          <span>整改名称：</span>
          <span>{{ formData.checkName }}</span>
        </div> -->
        <div class="row">
          <span>关联文物：</span>
          <span>{{ formData.pointName }}</span>
        </div>
        <div class="half-row">
          <span>整改方案：</span>
          <span>{{ formData.zgfamc }}</span>
          <el-button type="primary" size="small" @click="previewCase"
            >查看方案</el-button
          >
        </div>
        <!-- <div class="half-row">
          
        </div> -->
      </div>

      <div class="btn">
        <el-button size="small" type="primary" @click="audit(true)"
          >方案通过</el-button
        >
        <el-button size="small" type="danger" @click="audit(false)"
          >方案驳回</el-button
        >
      </div>
    </div>
    <el-dialog ref="dialog" :visible.sync="isShow2" :modal="false">
      <Show v-if="showFile" :key="keys" v-model="showFile" />
    </el-dialog>
  </div>
</template>

<script>
import { audit_zgfa_file } from "@/api/xsApi";
import Show from "./show";
export default {
  components: { Show },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      //查看文件显示
      isShow2: false,
      showFile: null,
      keys: +new Date(),

      formData: {}
    };
  },
  watch: {
    isShow(val) {
      if (!val) return;
      this.formData = this.row;
    }
  },
  mounted() {
    console.log("mounted", this.formData);
    // // 挂载到body下
    // this.$nextTick(() => {
    //   const body = document.querySelector("body");
    //   if (body.append) {
    //     body.append(this.$refs.dialog);
    //   } else {
    //     body.appendChild(this.$refs.dialog);
    //   }
    // });
  },
  methods: {
    // 查看方案
    previewCase() {
      console.log(this.formData);
      // var baseUrl =
      //   "http://223.65.209.139:18180/admin/cmd/v1/storage/view/" +
      //   this.formData.zgfalj;
      // window.open(baseUrl);

      this.keys = +new Date();
      this.isShow2 = true;
      this.showFile = {
        type: this.formData.zgfalx,
        path: this.formData.zgfalj
      };
    },
    // 方案审核
    audit(boolean) {
      console.log(this.formData);
      let params = {
        comment: "",
        id: this.formData.id,
        type: boolean ? "0" : "1"
      };
      audit_zgfa_file(params).then(res => {
        console.log("审核结果", res);
        this.close();
      });
    },
    close() {
      this.$emit("update");
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" scoped>
.mask_a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(8, 8, 8, 0.377);
  .audit-case {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    min-height: 200px;
    max-height: 400px;
    background: #00254e;
    border: 1px solid #019efe;
    box-shadow: #04baf1 0px 0px 5px;
    overflow: auto;
    box-sizing: border-box;
    padding: 10px;
    .title {
      width: 100%;
      height: 50px;
      font-size: 24px;
      font-weight: 900;
      text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
      background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 34px;
      height: 34px;
      background: url("../../assets/img2/-s-ic_guanbi.png");
      background-size: 100%;
    }
    .info {
      width: 100%;
      height: 150px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      .half-row {
        width: 50%;
        height: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          font-size: 16px;
          color: #fff;
          min-width: 300px;
          margin-left: 5px;
          &:nth-child(1) {
            color: rgb(167, 190, 255);
            min-width: 80px;
          }
        }
      }
      .row {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          font-size: 16px;
          color: #fff;
          margin-left: 5px;
          &:nth-child(1) {
            color: rgb(167, 190, 255);
          }
        }
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
