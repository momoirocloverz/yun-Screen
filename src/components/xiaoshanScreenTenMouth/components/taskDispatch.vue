<template>
  <div class="container-mask taskDisptachContainer1" v-if="isShow">
    <div class="container">
      <div class="close" @click="close"></div>
      <div class="title">
        任务派发
      </div>
      <div class="info">
        <div class="col">
          <div class="row">
            <span>姓名：</span>
            <span>{{ basicInfo.userName || '田欢乐' }}</span>
          </div>
          <div class="row">
            <span>文保单位：</span>
            <span>{{ basicInfo.bumpPointName || '务本堂' }}</span>
          </div>
        </div>
        <div class="col">
          <div class="row">
            <span>镇街：</span>
            <span>{{ basicInfo.address || '进化镇' }}</span>
          </div>
          <div class="row">
            <span>电话：</span>
            <span>{{ basicInfo.phone || '13946521876' }}</span>
          </div>
        </div>
      </div>
      <div class="title1">
        <span class="text">任务派发</span>
      </div>
      <div class="form-box">
        <div class="row">
          <span>文保单位: </span>
          <el-select class="removeDisabled" disabled clearable v-model="searchParams.bumpId" filterable size="mini" placeholder="文物" :style="{ width: `${250 / 192}rem !important` }">
            <el-option v-for="item in bumpPointList" :key="item.id" :label="item.publishName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="row">
          <span>任务时间: </span>
          <el-date-picker v-model="searchParams.time" size="mini" :style="{ width: `${250 / 192}rem !important` }" type="datetime" placeholder="选择日期时间"> </el-date-picker>
        </div>
        <div class="row">
          <span>任务类型: </span>
          <el-select class="removeDisabled" disabled clearable v-model="searchParams.type" filterable size="mini" placeholder="任务类型" :style="{ width: `${250 / 192}rem !important` }">
            <el-option v-for="item in taskTypeList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="row">
          <span>任务内容: </span>
          <el-input type="textarea" :rows="2" :style="{ width: `${250 / 192}rem !important` }" v-model.trim="searchParams.content" placeholder=""></el-input>
        </div>
      </div>
      <div class="btn" @click="taskDispatch"></div>
    </div>
  </div>
</template>
<script>
import { wbd_list2 } from '@/api/xsApi.js';
import { getPatrollerListByPointId, screenDataCreate } from '@/api/xsApi3.js';
import { Promise } from 'q';
import dayjs from 'dayjs';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: () => ({
        name: '',
        pointName: '',
        jd: '',
      }),
    },
    current: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      basicInfo: {},
      searchParams: {
        bumpId: '',
        time: '',
        type: '',
        content: '',
      },
      bumpPointList: [],
      taskTypeList: [],
    };
  },
  watch: {
    isShow(val) {
      if (val) {
        if (this.current && this.current.bumpPointId) {
          let trackChineseObj = this.bumpPointList.find(ele => {
            return ele.id == this.current.bumpPointId;
          });
          let trackChinese = '';
          if (trackChineseObj) {
            trackChinese = trackChineseObj.publishName;
            this.basicInfo.bumpPointName = trackChinese;
          }
          this.basicInfo.userName = this.current.userName;
          this.searchParams.bumpId = this.current.bumpPointId;
          getPatrollerListByPointId({ id: this.current.bumpPointId }).then(res => {
            if (res && res.data && res.data.code && res.data.code == 200) {
              let shorter = res.data.data;
              if (shorter && shorter.length) {
                this.basicInfo = shorter[0];
              }
            }
          });
        }
      }
    },
  },
  mounted() {
    this.getBumpPointList();
    // 挂载到body下
    this.$nextTick(() => {
      const body = document.querySelector('body');
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  },
  methods: {
    fetchDetail() {
      //
    },
    // 任务派发
    taskDispatch() {
      this.searchParams.bumpId = this.current.bumpPointId;
      let timeFormat = dayjs(this.searchParams.time).format('YYYY-MM-DD HH:mm:ss');
      let data = {
        pointId: this.current.bumpPointId,
        deadLine: timeFormat,
        checkName: '数据大屏任务指派',
        jcry: '1',
        yjid: this.current.id,
        checkDetails: [
          {
            dicDetailName: this.searchParams.content,
            dicDetailId: '0',
          },
        ],
      };
      if (!this.searchParams.time) {
        return this.$message.error('请选择时间');
      }
      if (!this.searchParams.content) {
        return this.$message.error('请填写内容');
      }
      screenDataCreate(data).then(res => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          this.$message({
            message: '操作成功',
            type: 'success',
          });
          this.searchParams.bumpId = '';
          this.searchParams.content = '';
          this.searchParams.time = '';
          this.searchParams.type = '';
          this.close();
        }
      });
    },
    // 关闭弹框
    close() {
      this.$emit('close');
    },
    // 获取文保点列表
    getBumpPointList() {
      if (this.$store.state.hugeListData && this.$store.state.hugeListData.length) {
        this.bumpPointList = this.$store.state.hugeListData;
      } else {
        let params = {
          currentPage: 1,
          pageSize: 300,
        };
        let params2 = {
          currentPage: 2,
          pageSize: 300,
        };
        let p1 = wbd_list2(params);
        let p2 = wbd_list2(params2);
        Promise.all([p1, p2]).then(res => {
          let arr1 = res[0].data.data.list;
          let arr2 = res[1].data.data.list;
          this.bumpPointList = arr1.concat(arr2);
        });
      }
      // wbd_list2(params).then(res => {
      //   console.log("lol", res.data);
      //   this.bumpPointList = res.data.data.list;
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.container-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 13;
  background: rgba(0, 0, 0, 0.1);
  .container {
    width: 474px;
    height: 511px;
    background: url('../../../assets/img4/float-box1.png') no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 8px 40px 20px 40px;
    position: relative;
    .close {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 0px;
      right: 0px;
      background: url('../../../assets/img4/close.png') no-repeat center;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .title {
      width: 100%;
      height: 43px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-family: SourceHanSerifCN-Bold;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #ecf4ff;
    }
    .info {
      width: 100%;
      height: 100px;
      display: flex;
      .col {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        &:nth-child(1) {
          width: 70%;
        }
        .row {
          margin-bottom: 8px;
          span:nth-child(1) {
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 7px;
            letter-spacing: 0px;
            color: #a8aed1;
          }
          span:nth-child(2) {
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            font-weight: normal;
            letter-spacing: 0px;
            color: #fdfdfa;
          }
        }
      }
    }
    .title1 {
      width: 379px;
      height: 39px;
      background: url('../../../assets/img4/t-title.png') no-repeat center;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .text {
        margin-left: 30px;
        margin-bottom: 15px;
        font-family: AdobeHeitiStd-Regular;
        font-size: 18px;
        font-weight: normal;
        font-style: italic;
        font-stretch: normal;
        line-height: 32px;
        letter-spacing: 0px;
        background-image: -webkit-linear-gradient(bottom, #acddff, #fff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .form-box {
      margin-top: 10px;
      .row {
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        span {
          font-family: SourceHanSansCN-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #a8aed1;
          margin-right: 5px;
        }
      }
    }
    .btn {
      width: 100px;
      height: 30px;
      background: url('../../../assets/img4/p-btn1.png') no-repeat center;
      background-size: 100% 100%;
      margin-left: 75px;
      cursor: pointer;
    }
  }
}
</style>

<style lang="less">
.taskDisptachContainer1 {
  .removeDisabled .el-input.is-disabled .el-input__inner {
    background-color: transparent !important;
  }
}
</style>
