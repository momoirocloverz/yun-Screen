<template>
  <div class="mask" v-show="isShow">
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">新增例行检查任务</span>
          </div>
        </div>
        <div class="close" @click="close"></div>
      </div>
      <div class="body">
        <el-form ref="form" :model="formData" label-width="140px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查名称：">
                <el-input size="mini" v-model="formData.checkName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文物名称：">
                <el-select
                  size="mini"
                  v-model="formData.pointId"
                  placeholder="请选择文物"
                >
                  <el-option
                    v-for="item in wwListData"
                    :key="item.id"
                    :label="item.publishName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="检查事项：">
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  @selection-change="handleSelectionChange1"
                >
                  <el-table-column type="selection" width="55" align="center">
                  </el-table-column>
                  <el-table-column label="事项" align="center">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="限期时间：">
                <el-date-picker
                  v-model="formData.deadLine"
                  type="date"
                  placeholder="选择日期"
                  size="small"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="附件名称：">
                <el-input size="mini" v-model="formData.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="">
                <div class="btn blue">上传附件</div>
                <div class="btn green">查看附件</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="整改方案：">
                <el-input size="mini" v-model="formData.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="方案状态：">
                <el-input size="mini" v-model="formData.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="">
                <div class="btn blue">上传方案</div>
                <div class="btn green">查看方案</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="">
                <div class="btn red">驳回</div>
                <div class="btn green">查核通过</div>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="btn-bottom">
            <div class="btn_1 cancel" @click="close">取消</div>
            <div class="btn_1 submit">保存并发送</div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import TableC from "./table";
import { wbd_list2, szzj } from "../../api/xsApi";

export default {
  components: { TableC },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {},
      wwListData: [],
      streetData: []
    };
  },
  mounted() {
    this.get_wbdList_data();
    this.get_szzj_data();
    // 挂载到body下
    this.$nextTick(() => {
      const body = document.querySelector("body");
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  },
  methods: {
    // 获取文保点列表
    get_wbdList_data() {
      let params = {
        address: "",
        category: "",
        currentPage: 1,
        id: "",
        pageSize: 20000,
        publishName: "",
        rank: ""
      };
      wbd_list2(params).then(res => {
        // console.log("文保点列表123456", res.data.data);
        this.wwListData = res.data.data.list;
      });
    },
    // 获取所在镇街
    get_szzj_data() {
      if (this.$store.state.commonStreetList && this.$store.state.commonStreetList.length) {
        this.streetData = this.$store.state.commonStreetList;
      } else {
        szzj().then((res) => {
          this.streetData = res.data.data;
          this.$store.commit('setCommonStreetList', res.data.data);
        });
      }
    },
    // 表一选择
    handleSelectionChange1(val) {},
    close() {
      this.formData = {};
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/img2/f-dialogs-box.png") no-repeat center;
  background-size: 100%;
  z-index: 999;
  .info-container {
    width: 1299px;
    height: 807px;
    // background: rgba(255, 0, 0, 0.288);
    margin-top: 15px;
    box-sizing: border-box;
    padding: 30px;
    .head {
      position: relative;
      width: 100%;
      height: 87px;
      .title {
        width: 395px;
        height: 100%;
        background: url("../../assets/img2/pop-title-bg.png") no-repeat center;
        background-size: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        .top-box {
          width: 100%;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          box-sizing: border-box;
          padding-left: 40px;
          // img{
          //     width: 50px;
          //     height: 50px;
          // }
          .text {
            font-family: SourceHanSansCN-Bold;
            font-size: 30px;
            font-weight: 900;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #f5fdff;
            margin-left: 20px;
            text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
            background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .close {
        position: absolute;
        top: 0;
        right: 0px;
        width: 34px;
        height: 34px;
        background: url("../../assets/img2/-s-ic_guanbi.png");
        background-size: 100%;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 67px);
      box-sizing: border-box;
      padding: 0 200px;
      padding-top: 8px;
      .el-form {
        .el-form-item {
          margin-bottom: 15px;
        }
        .el-input {
          width: 220px;
        }
        .el-select {
          width: 220px;
        }
        .btn {
          width: 106px;
          height: 30px;
          background-size: 100%;
          text-align: center;
          line-height: 30px;
          display: inline-block;
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 2px;
          color: #ffffff;
          cursor: pointer;
        }
        .green {
          background: url("../../assets/img2/p-btn1.png") no-repeat center;
        }
        .blue {
          background: url("../../assets/img2/p-btn2.png") no-repeat center;
        }
        .red {
          background: url("../../assets/img2/p-btn3.png") no-repeat center;
        }
        .btn_1 {
          width: 130px;
          height: 38px;
          background-size: 100%;
          margin: 0 20px;
          text-align: center;
          line-height: 38px;
          display: inline-block;
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 2px;
          color: #ffffff;
          cursor: pointer;
        }
        .btn-bottom {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 30px;
          .cancel {
            background: url("../../assets/img2/c-btn.png") no-repeat center;
          }
          .submit {
            background: url("../../assets/img2/s-btn.png") no-repeat center;
          }
        }
      }
    }
  }
}
</style>
