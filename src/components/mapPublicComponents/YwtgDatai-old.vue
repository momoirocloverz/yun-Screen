<template>
  <div class="mask" v-show="isShow">
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">一网统管任务详情</span>
          </div>
        </div>
        <div class="close" @click="close"></div>
      </div>
      <div class="body">
        <div class="left">
          <div :class="['item', item.id == currentId ? 'active-item' : '']" v-for="(item, index) in taskList" :key="index" @click="rowClick(item)">
            <!-- <span>{{ item.create_time }} </span> -->
            <span>{{ item.content.substr(0, 28) }}...</span>
          </div>
        </div>
        <div class="right">
          <div class="tab">
            <div class="item" @click="tabClick('detail')">
              事件详情
            </div>
            <!-- <div
              class="item"
              @click="tabClick('time')"
            >
              事件追踪
            </div> -->
            <div class="item" @click="tabClick('file')">
              事件附件
            </div>
          </div>
          <div class="detail-info" v-show="show1">
            <el-row>
              <el-col :span="24">
                <span>
                  标题：
                </span>
                <span>
                  {{ formData.subject }}
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span>
                  内容描述：
                </span>
                <span>
                  {{ formData.content }}
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span>
                  处置部门：
                </span>
                <span>
                  {{ formData.handleDeptName }}
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span>
                  发起时间：
                </span>
                <span>
                  {{ formData.signTime ? formData.signTime.split('T').join(' ') : '' }}
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span>
                  反馈内容：
                </span>
                <span>
                  {{ (formData.replyContent && formData.replyContent.feedbackContent) || '暂无' }}
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span>
                  反馈时间：
                </span>
                <span>
                  {{ formData.replyTime ? formData.replyTime.split('T').join(' ') : '暂无' }}
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span>
                  事件状态：
                </span>
                <span>
                  {{ formData.status | statusChange }}
                </span>
              </el-col>
            </el-row>
            <div class="sjzz">事件追踪：</div>
            <el-timeline>
              <el-timeline-item v-for="(item, index) in timeLineData" :key="index" :timestamp="item.time" placement="top">
                <div class="content">
                  <div class="depart" :style="{ background: `url(${item.img}) no-repeat center`, width: `${item.width / 192}rem` }">
                    {{ item.title_1 }}
                  </div>
                  <span>
                    {{ item.title_2 }}
                  </span>
                </div>
              </el-timeline-item>
              <!-- <el-timeline-item
                timestamp="2022/05/31 09:12:05"
                placement="top"
              >
                <div class="content">
                  <div
                    class="depart"
                    :style="{background:`url(${img_1}) no-repeat center`,width:`${226/192}rem`}"
                  >
                    文物安全监测处置应用系统
                  </div>
                  <span>
                    发布一网统管任务
                  </span>
                </div>
              </el-timeline-item>
              <el-timeline-item
                timestamp="2022/05/31 09:12:29"
                placement="top"
              >
                <div class="content">
                  <div
                    class="depart"
                    :style="{background:`url(${img_2}) no-repeat center`,width:`${96/192}rem`}"
                  >
                    区智中心
                  </div>
                  <span>
                    签收成功
                  </span>
                </div>

              </el-timeline-item>
              <el-timeline-item
                timestamp="2022/05/31 10:18:51"
                placement="top"
              >
                <div class="content">
                  <div
                    class="depart"
                    :style="{background:`url(${img_3}) no-repeat center`,width:`${96/192}rem`}"
                  >
                    镇街
                  </div>
                  <span>
                    提交整改反馈
                  </span>
                </div>
              </el-timeline-item> -->
            </el-timeline>
          </div>

          <div class="time-process" v-show="show2">
            <!-- <el-timeline>
              <el-timeline-item
                timestamp="2022-05-31 09:12:05"
                placement="top"
              >
                <div class="content">
                  <span>
                    文物安全监测处置应用系统
                  </span>
                  <span>
                    发布一网统管任务
                  </span>
                </div>
              </el-timeline-item>
              <el-timeline-item
                timestamp="2022-05-31 09:12:29"
                placement="top"
              >
                <div class="content">
                  <span>
                    区智中心
                  </span>
                  <span>
                    签收成功
                  </span>
                </div>

              </el-timeline-item>
              <el-timeline-item
                timestamp="2022-05-31 10:18:51"
                placement="top"
              >
                <div class="content">
                  <span>
                    镇街
                  </span>
                  <span>
                    提交整改反馈
                  </span>
                </div>
              </el-timeline-item>
            </el-timeline> -->
          </div>

          <div class="file" v-show="show3">
            <div class="img">
              <!-- <img
                v-for="(item,index) in imgArr"
                :key="index"
                :src="item"
                alt=""
                srcset=""
              > -->
              <vue-viewer v-for="(item, index) in imgArr" :key="index" multiple class="imgShow" list-ul-class="image-list" :thumb="item" :full="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableC from './table';
import { ywtg_list, ywtg_detail } from '../../api/xsApi.js';

let timer;

export default {
  components: { TableC },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    // taskList: {
    //   type: Array,
    //   default: () => [],
    // },
    logo: String,
  },
  data() {
    return {
      show1: true,
      show2: false,
      show3: false,
      taskList: [],
      formData: {},
      imgArr: [], // 附件图片
      timeLineData: [],
      currentId: '', // 当前列表的id

      img_1: require('../../assets/img2/1.png'),
      img_2: require('../../assets/img2/2.png'),
      img_3: require('../../assets/img2/3.png'),

      // 分页
      currentPage: 1,
      pageSize: 13,
      total: 0,
    };
  },
  mounted() {
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
  watch: {
    logo() {
      // timer = setInterval(() => {
      //   if (this.taskList[0] && this.taskList[0].id) {
      //     this.get_ywtg_detail(this.taskList[0].id)
      //     this.currentId = this.taskList[0].id
      //     clearInterval(timer)
      //   }
      // }, 10)
      this.get_ywtg_list();
    },
  },
  filters: {
    statusChange(val) {
      switch (val) {
        case 0:
          return '已签收';
        case 1:
          return '已签收';
        case 2:
          return '已反馈';
        default:
          break;
      }
    },
  },
  methods: {
    pageNumChange(val) {
      this.currentPage = val;
      this.get_ywtg_list();
    },
    get_ywtg_list() {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
      };
      ywtg_list(params).then(res => {
        // console.log('一网统管列表', res.data)
        this.taskList = res.data.data.list;
        this.total = res.data.data.total;
        this.get_ywtg_detail(this.taskList[0].id);
        this.currentId = this.taskList[0].id;
      });
    },
    rowClick(item) {
      this.get_ywtg_detail(item.id);
      this.currentId = item.id;
    },
    get_ywtg_detail(id) {
      ywtg_detail(id).then(res => {
        this.timeLineData = [];
        this.imgArr = [];
        // console.log('一网统管', res.data)
        this.formData = res.data.data;
        this.formData.replyContent = this.formData.replyContent && JSON.parse(this.formData.replyContent);
        // console.log(this.formData.replyContent)
        // 图片数据
        let str1 = this.formData.file;
        let str2 = this.formData.replyContent && this.formData.replyContent.accessoryList[0].accessoryPath;
        let imgArr1 = [];
        let imgArr2 = [];
        imgArr1 = str1 ? str1.split(',') : [];
        imgArr2 = str2 ? str2.split(',') : [];
        this.imgArr = [...imgArr1, ...imgArr2];

        if (this.formData.signTime != null) {
          this.timeLineData.push({
            time: this.formData.signTime.split('T').join(' '),
            img: this.img_1,
            width: 226,
            title_1: '文物安全监测处置应用系统',
            title_2: '发布一网统管任务',
          });
          this.timeLineData.push({
            time: this.formData.signTime.split('T').join(' '),
            img: this.img_2,
            width: 96,
            title_1: '区智中心',
            title_2: '签收成功',
          });
        }
        if (this.formData.replyTime != null) {
          this.timeLineData.push({
            time: this.formData.replyTime.split('T').join(' '),
            img: this.img_3,
            width: 96,
            title_1: '镇街',
            title_2: '提交整改反馈',
          });
        }
      });
    },
    tabClick(type) {
      switch (type) {
        case 'detail':
          this.show1 = true;
          this.show2 = false;
          this.show3 = false;
          break;
        case 'time':
          this.show1 = false;
          this.show2 = true;
          this.show3 = false;
          break;
        case 'file':
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          break;
        default:
          break;
      }
    },
    close() {
      this.formData = {};
      this.$emit('close');
    },
  },
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
  background: url('../../assets/img2/f-dialogs-box.png') no-repeat center;
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
        background: url('../../assets/img2/pop-title-bg.png') no-repeat center;
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
        background: url('../../assets/img2/-s-ic_guanbi.png');
        background-size: 100%;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 67px);
      box-sizing: border-box;
      padding: 0 40px 0 20px;
      padding-top: 8px;
      display: flex;
      .left {
        width: 400px;
        height: calc(100% - 20px);
        overflow: auto;
        // background: red;
        .list {
          width: 100%;
          height: calc(100% - 30px);
          .item {
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 5px;
            background: rgba(0, 0, 0, 0);
            border-bottom: 1px solid rgba(33, 91, 167, 0.411);
            cursor: pointer;
            margin-bottom: 5px;
            span {
              font-size: 16px;
              color: rgb(255, 255, 255);
              &:nth-child(1) {
                margin-right: 10px;
              }
            }
          }
          .active-item {
            background: linear-gradient(to right, #00ccff94 1%, rgba(0, 0, 0, 0) 90%);
          }
        }
        .pagination {
          text-align: center;
        }
      }
      .right {
        width: calc(100% - 400px);
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding-left: 30px;
        background: url('../../assets/img2/hr-y.png') no-repeat left;
        background-size: auto 100%;
        .tab {
          width: 100%;
          height: 30px;
          display: flex;
          margin-bottom: 10px;
          .item {
            width: 80px;
            height: 100%;
            color: #fff;
            background: #137ebd;
            cursor: pointer;
            margin: 0 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            &:nth-child(1) {
              margin-left: 0;
            }
          }
        }
        .detail-info {
          width: 100%;
          height: calc(100% - 40px);
          overflow: auto;
          .el-row {
            margin-bottom: 20px;
            .el-col {
              display: flex;
              align-items: flex-start;
              span {
                color: #fff;
                font-size: 18px;
                &:nth-child(1) {
                  display: inline-block;
                  width: 100px;
                }
                &:nth-child(2) {
                  display: inline-block;
                  width: calc(100% - 100px);
                  color: #c4ddff;
                }
              }
            }
          }
          .sjzz {
            color: #fff;
            font-size: 18px;
            margin-bottom: 5px;
          }
          .el-timeline {
            margin-top: 30px;
            .el-timeline-item {
              .content {
                width: 400px;
                height: 100px;
                // background: #fff;
                .depart {
                  color: rgb(255, 255, 255);
                  font-family: MicrosoftYaHei;
                  font-size: 16px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 35px;
                  background-size: 100% 100% !important;
                }
                span {
                  display: block;
                  font-family: MicrosoftYaHei;
                  font-size: 20px;
                  margin-top: 5px;
                  color: #fff;
                }
              }
            }
          }
        }
        .time-process {
          width: 100%;
          height: calc(100% - 50px);
          overflow: auto;
          box-sizing: border-box;
          padding-top: 20px;
          .el-timeline {
            .el-timeline-item {
              .content {
                width: 400px;
                height: 100px;
                // background: #fff;
                span {
                  display: block;
                  font-size: 16px;
                  margin-top: 5px;
                  color: #fff;
                  &:nth-child(1) {
                    color: rgb(137, 178, 255);
                    font-size: 18px;
                  }
                }
              }
            }
          }
        }
        .file {
          width: 100%;
          height: calc(100% - 50px);
          .img {
            width: 100%;
            height: 100%;
            overflow: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-content: flex-start;
            .imgShow {
              width: 200px;
              height: 200px;
              margin: 10px;
            }
            // img {
            //   width: 300px;
            //   height: 300px;
            //   margin: 10px;
            // }
          }
        }
      }
    }
  }
}
</style>
