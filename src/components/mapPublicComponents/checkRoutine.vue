<template>
  <div
    class="audit-case"
    v-if="isShow"
  >
    <div class="title">
      核查结果
    </div>
    <div
      class="close"
      @click="close"
    ></div>
    <div class="info">
      <!-- <div class="half-row">
        <span>任务名称：</span>
        <span>{{formData.checkName}}</span>
      </div> -->
      <div class="half-row">
        <span>关联文物：</span>
        <span>{{ formData.pointName }}</span>
      </div>
      <div class="half-row">
        <span>检查人员：</span>
        <el-select
          size="small"
          v-model="checkUserId"
          placeholder=""
          disabled
        >
          <el-option
            v-for="item in options_jcry"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="half-row">
        <span>限期时间：</span>
        <span>{{ formData.deadLine }}</span>
      </div>

      <div class="row">
        <span>巡查结果：</span>
      </div>
      <div
        class="row-result"
        v-for="(item, index) in checkDetails"
        :key="index"
      >
        <div class="event-name">
          <span>事项：</span>
          <span>{{ item.dicDetailName }}</span>
        </div>
        <div class="event-name">
          <span>结果：</span>
          <span>{{ item.checkOpinion||'暂无' }}</span>
        </div>
        <div class="img">
          <!-- <img
            v-for="(val, index2) in item.storageFile"
            :key="index2"
            :src="
              `http://223.65.209.139:18180/admin/cmd/v1/storage/view/${val.path}`
            "
            alt=""
            srcset=""
          /> -->
          <vue-viewer
            v-for="(val, index2) in item.storageFile"
            :key="index2"
            multiple
            class="imgShow"
            list-ul-class="image-list"
            :thumb="`http://223.65.209.139:18180/admin/cmd/v1/storage/view/${val.path}`"
            :full="`http://223.65.209.139:18180/admin/cmd/v1/storage/view/${val.path}`"
          />
        </div>
      </div>
    </div>

    <div class="btn">
      <el-button
        size="small"
        type="primary"
        @click="confirmTask()"
      >完成核查</el-button>
      <el-button
        size="small"
        @click="close"
      >取消</el-button>
    </div>
  </div>
</template>

<script>
import { confirmTask } from '@/api/xsApi'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formData: {},
      checkUserId: '',
      checkDetails: [],
      options_jcry: [
        {
          id: '1',
          name: '文物巡查员',
        },
        {
          id: '2',
          name: '党员',
        },
        {
          id: '3',
          name: '文保志愿者',
        },
      ],
    }
  },
  watch: {
    isShow(val) {
      if (!val) return
      this.formData = this.row
      this.checkDetails = this.formData.checkDetails
      // this.checkUserId =
      //   this.formData.checkDetails[0] &&
      //   this.formData.checkDetails[0].checkUserId
      this.checkUserId = this.formData.jcyr
    },
  },
  mounted() {
    console.log('mounted', this.formData)
  },
  methods: {
    // 查看附件
    // previewCase() {
    //   console.log(this.formData);
    //   var baseUrl =
    //     "http://223.65.209.139:18180/admin/cmd/v1/storage/view/" +
    //     this.formData.zgfalj;
    //   window.open(baseUrl);
    // },
    // 核查检查结果
    confirmTask() {
      console.log(this.formData)
      let params = {
        comment: '',
        file: {
          checkId: this.formData.id,
          fileType: '1',
          id: '',
          storageId: this.formData.zgfaFjId,
          uploadUserId: '',
        },
        id: this.formData.id,
        type: '0',
        zgfaFjId: this.formData.zgfaFjId,
      }
      confirmTask(params).then((res) => {
        console.log('任务完成', res)
        this.close()
      })
    },
    close() {
      this.$emit('update')
      this.$emit('close')
    },
  },
}
</script>

<style lang="less" scoped>
.audit-case {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 500px;
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
    background: url('../../assets/img2/-s-ic_guanbi.png');
    background-size: 100%;
  }
  .info {
    width: 100%;
    // height: 350px;
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
        margin-left: 5px;
        &:nth-child(1) {
          color: rgb(167, 190, 255);
        }
      }
    }
    .row {
      width: 95%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      span {
        white-space: nowrap;
        font-size: 16px;
        color: #fff;
        margin-left: 5px;
        &:nth-child(1) {
          color: rgb(167, 190, 255);
        }
      }
    }
    .row-result {
      width: 100%;
      margin: 5px 0;
      margin-left: 20px;
      .event-name {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        span {
          white-space: nowrap;
          font-size: 16px;
          color: #fff;
          margin-left: 5px;
          &:nth-child(1) {
            color: rgb(167, 190, 255);
          }
        }
      }
      .img {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .imgShow {
          width: 100px;
          height: 100px;
          margin: 5px;
        }
        // img {
        //   width: 100px;
        //   height: 100px;
        //   margin: 5px;
        // }
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
