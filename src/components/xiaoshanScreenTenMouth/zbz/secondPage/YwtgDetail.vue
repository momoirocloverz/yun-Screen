<template>
  <div class="mask" v-show="isShow">
    <div class="info-container">
      <div class="head">一网统管任务详情</div>
      <div class="close" @click="close"></div>
      <div class="search-box">
        <span>事件起止时间:</span>
        <el-date-picker
          clearable
          size="mini"
          v-model="searchParams.date"
          :style="{ width: `${200 / 192}rem !important` }"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <span>文物:</span>
        <el-select clearable v-model="searchParams.bumpId" filterable size="mini" placeholder="文物" :style="{ width: `${90 / 192}rem !important` }">
          <el-option v-for="item in bumpPointList" :key="item.id" :label="item.publishName" :value="item.id"> </el-option>
        </el-select>
        <span>镇街:</span>
        <el-select clearable v-model="searchParams.townId" filterable size="mini" placeholder="镇街" :style="{ width: `${90 / 192}rem !important` }">
          <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
        <span>部门:</span>
        <el-select clearable v-model="searchParams.dept" filterable size="mini" placeholder="部门" :style="{ width: `${90 / 192}rem !important` }">
          <el-option v-for="item in departList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
        </el-select>
        <span>事件状态:</span>
        <el-select v-model="searchParams.status" clearable size="mini" placeholder="状态" :style="{ width: `${90 / 192}rem !important` }">
          <el-option v-for="item in eventStatus" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
        <span>风险类别:</span>
        <el-select v-model="searchParams.riskType" clearable size="mini" placeholder="风险类别" :style="{ width: `${90 / 192}rem !important` }">
          <el-option v-for="item in riskTypeList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
        </el-select>
        <!-- <div class="key-word">
          <span>
            <i class="el-icon-search"></i>
          </span>
          <input
            type="text"
            placeholder="搜索标题关键字"
            v-model="searchParams.title"
          >
        </div> -->
        <div class="search-btn" @click="search"></div>
      </div>
      <div class="body">
        <div class="item" v-for="(item, index) in taskList" :key="index">
          <div class="title-info">
            <div class="info">
              <div class="row1">
                <div
                  class="status"
                  :style="{
                    background: `url(${getImgStatus(item.status)}) no-repeat center`,
                    'background-size': '100% 100%',
                  }"
                >
                  {{ item.status | statusChange }}
                </div>
                <div class="title">
                  {{ item.content && item.content.length > 58 ? item.content.substr(0, 58) + '...' : item.content.substr(0, 58) }}
                </div>
              </div>
              <div class="row2">
                <span class="key">发布时间:</span>
                <span class="value">{{ item.signTime && item.signTime.split('T').join(' ') }}</span>
                <span class="key">所属文物:</span>
                <span class="value">{{ item.bumpPoint }}</span>
                <span class="key">所属镇街:</span>
                <span class="value">{{ item.location | getStreetOrTown }}</span>
                <span class="key">处置部门:</span>
                <span class="value">{{ item.handleDeptName }}</span>
                <span class="key">风险类别:</span>
                <span class="value">{{ item.type || '暂无' }}</span>
              </div>
            </div>
            <div class="btn" @click="btnClick(item)">
              详情
              <i v-if="currentId == item.id" class="el-icon-arrow-up"></i>
              <i v-else class="el-icon-arrow-down"></i>
            </div>
          </div>
          <div class="detail-info" v-show="currentId == item.id">
            <div class="text-box">
              <div class="row1">
                <span class="key">内容描述:</span>
                <span class="value">{{ formData.content }}</span>
              </div>
              <div class="row2">
                <span class="key">反馈内容:</span>
                <span class="value">{{ (formData.replyContent && formData.replyContent.feedbackContent) || '暂无' }}</span>
                <span class="key">反馈时间:</span>
                <span class="value">{{ formData.replyTime ? formData.replyTime.split('T').join(' ') : '暂无' }}</span>
              </div>
            </div>
            <div class="img-title">
              <img src="../../../../assets/img3/pot_ywtg.png" alt="" srcset="" />
              <span>事件追踪</span>
            </div>
            <div class="time-line">
              <div class="line-item" v-for="(item, index) in timeLineData" :key="index">
                <span class="time">{{ item.time }}</span>
                <div class="img">
                  <div class="line"></div>
                </div>
                <div
                  class="depart"
                  :style="{
                    background: `url(${item.img}) no-repeat center`,
                    width: `${item.width / 192}rem`,
                  }"
                >
                  {{ item.title_1 }}
                </div>
                <span class="text">
                  {{ item.title_2 }}
                </span>
              </div>
            </div>
            <div class="file">
              <div class="part" v-show="imgArr_1.length > 0">
                <div class="img-title">
                  <img src="../../../../assets/img3/pot_ywtg.png" alt="" srcset="" />
                  <span>问题附件</span>
                </div>
                <div class="img">
                  <!-- <vue-viewer
                    v-for="(item, index) in imgArr_1"
                    :key="index"
                    multiple
                    class="imgShow"
                    list-ul-class="image-list"
                    :thumb="item"
                    :full="item"
                  /> -->
                  <template v-for="(sub, subIndex) in imgArr_1">
                    <img @click="() => show(subIndex, imgArr_1)" :src="sub" class="thumbImg" :key="subIndex" />
                  </template>
                  <viewer :images="imgArr_1" :options="options" @inited="inited" class="viewer" ref="viewer" v-show="false">
                    <img v-for="(src, index) in imgArr_1" :src="src" :key="index" />
                  </viewer>
                </div>
              </div>
              <div class="part" v-show="imgArr_2.length > 0">
                <div class="img-title">
                  <img src="../../../../assets/img3/pot_ywtg.png" alt="" srcset="" />
                  <span>反馈附件</span>
                </div>
                <div class="img">
                  <!-- <vue-viewer
                    v-for="(item, index) in imgArr_2"
                    :key="index"
                    multiple
                    class="imgShow"
                    list-ul-class="image-list"
                    :thumb="item"
                    :full="item"
                  /> -->
                  <template v-for="(sub, subIndex) in imgArr_2">
                    <img @click="() => showImg2(subIndex, imgArr_2)" :src="sub" class="thumbImg" :key="subIndex" />
                  </template>
                  <viewer :images="imgArr_2" :options="options" @inited="inited2" class="viewer" ref="viewer2" v-show="false">
                    <img v-for="(src, index) in imgArr_2" :src="src" :key="index" />
                  </viewer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { ywtg_list, ywtg_detail, wbd_list2, szzj } from '@/api/xsApi.js';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    logo: String,
  },
  data() {
    return {
      options: {
        initialViewIndex: 0,
      },
      show1: true,
      show2: false,
      show3: false,
      taskList: [],
      formData: {},
      imgArr_1: [], // 附件图片--问题附件
      imgArr_2: [], // 附件图片--反馈附件
      timeLineData: [],
      currentId: '', // 当前列表的id
      bumpPointList: [], // 文物列表
      streetList: [], // 镇街列表
      departList: [
        {
          name: '公安',
          id: '1',
        },
        {
          name: '消防',
          id: '2',
        },
        {
          name: '住建',
          id: '3',
        },
      ],
      eventStatus: [
        {
          name: '已签收',
          id: 1,
        },
        {
          name: '已反馈',
          id: 2,
        },
        {
          name: '已评价',
          id: 3,
        },
      ], // 事件状态
      riskTypeList: [
        {
          name: '火灾隐患',
          id: '1',
        },
        {
          name: '盗掘盗窃',
          id: '2',
        },
        {
          name: '法人违法',
          id: '3',
        },
        {
          name: '自然灾害',
          id: '4',
        },
        {
          name: '其他',
          id: '5',
        },
      ],
      img_1: require('../../../../assets/img2/1.png'),
      img_2: require('../../../../assets/img2/2.png'),
      img_3: require('../../../../assets/img2/3.png'),
      //   imgStatus_1: require('../../../../assets/img3/1_ywtg.png'),
      //   imgStatus_2: require('../../../../assets/img3/2_ywtg.png'),
      //   imgStatus_3: require('../../../../assets/img3/3_ywtg.png'),
      imgStatus_1: require('../../../../assets/img3/b-btn.png'),
      imgStatus_2: require('../../../../assets/img3/g-btn.png'),
      imgStatus_3: require('../../../../assets/img3/y-btn.png'),
      // 分页
      currentPage: 1,
      pageSize: 5,
      total: 0,
      // 搜索
      searchParams: {},
    };
  },
  mounted() {
    this.get_ywtg_list();
    this.getStreetList();
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
  watch: {
    // logo() {
    //   this.get_ywtg_list();
    //   this.getStreetList();
    //   this.getBumpPointList();
    // }
  },
  filters: {
    statusChange(val) {
      switch (val) {
        case 1:
          return '已签收';
        case 2:
          return '已反馈';
        case 3:
          return '已评价';
        default:
          break;
      }
    },
    getStreetOrTown(val) {
      if (val.indexOf('镇') > 0) {
        return val.split('镇')[0] + '镇';
      } else if (val.indexOf('街道') > 0) {
        return val.split('街道')[0] + '街道';
      }
    },
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
    },
    show(index, item) {
      this.options.initialViewIndex = index;
      this.images = item;
      setTimeout(() => {
        this.$viewer.show();
      }, 400);
    },
    inited2(viewer) {
      this.$viewer2 = viewer;
    },
    showImg2(index, item) {
      this.options.initialViewIndex = index;
      this.images = item;
      setTimeout(() => {
        this.$viewer2.show();
      }, 400);
    },
    getImgStatus(status) {
      switch (status) {
        case 1:
          return this.imgStatus_3;
        case 2:
          return this.imgStatus_2;
        case 3:
          return this.imgStatus_1;
        default:
          break;
      }
    },
    search() {
      console.log('搜索的参数', this.searchParams);
      this.get_ywtg_list();
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.get_ywtg_list();
    },
    get_ywtg_list() {
      let params = {
        current: this.currentPage,
        size: this.pageSize,
        startTime: this.searchParams && this.searchParams.date && this.searchParams.date[0],
        endTime: this.searchParams && this.searchParams.date && this.searchParams.date[1],
        bumpId: this.searchParams.bumpId,
        townId: this.searchParams.townId,
        status: this.searchParams.status,
        title: this.searchParams.title,
        type: this.searchParams.riskType,
        dept: this.searchParams.dept,
      };
      ywtg_list(params).then((res) => {
        // console.log('一网统管列表', res.data)
        this.taskList = res.data.data.list;
        this.total = res.data.data.total;
        // this.get_ywtg_detail(this.taskList[0].id)
        // this.currentId = this.taskList[0].id
      });
    },
    // rowClick(item) {
    //   this.get_ywtg_detail(item.id)
    //   this.currentId = item.id
    // },
    btnClick(item) {
      if (this.currentId == item.id) {
        this.currentId = '0';
      } else {
        this.get_ywtg_detail(item.id);
        this.currentId = item.id;
      }
    },
    get_ywtg_detail(id) {
      ywtg_detail(id).then((res) => {
        this.timeLineData = [];
        this.imgArr_1 = [];
        this.imgArr_2 = [];
        // console.log('一网统管', res.data)
        this.formData = res.data.data;
        this.formData.replyContent = this.formData.replyContent && JSON.parse(this.formData.replyContent);
        // console.log(this.formData.replyContent)
        // 图片数据
        let str1 = this.formData.file;
        this.imgArr_1 = str1 ? str1.split(',') : [];
        let str2 =
          this.formData.replyContent && this.formData.replyContent.accessoryList && this.formData.replyContent.accessoryList.length > 0 && this.formData.replyContent.accessoryList[0].accessoryPath;
        this.imgArr_2 = str2 ? str2.split(',') : [];
        // console.log(this.imgArr_1, this.imgArr_2)

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
      this.searchParams = {};
      this.$emit('close');
      this.currentPage = 1;
      this.get_ywtg_list();
    },
    // 获取文保点列表
    getBumpPointList() {
      if (this.$store.state.hugeListData && this.$store.state.hugeListData.length) {
        this.bumpPointList = this.$store.state.hugeListData;
      } else {
        let params = {
          currentPage: 1,
          pageSize: 600,
        };
        wbd_list2(params).then((res) => {
          // console.log('lol', res.data)
          this.bumpPointList = res.data.data.list;
        });
      }
    },
    // 获取镇街列表
    getStreetList() {
      if (this.$store.state.commonStreetList && this.$store.state.commonStreetList.length) {
        this.streetList = this.$store.state.commonStreetList;
      } else {
        szzj().then((res) => {
          this.streetList = res.data.data;
          this.$store.commit('setCommonStreetList', res.data.data);
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.thumbImg {
  width: 200px;
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 13;
  .info-container {
    width: 1299px;
    height: 807px;
    margin-top: 15px;
    box-sizing: border-box;
    background: url('../../../../assets/img4/pop-bg.png') no-repeat center;
    background-size: 100%;
    padding: 30px;
    padding-top: 25px;
    position: relative;
    .close {
      width: 54px;
      height: 53px;
      position: absolute;
      top: 0px;
      right: 0px;
      background: url('../../../../assets/img4/close.png') no-repeat center;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .head {
      width: 100%;
      height: 79px;
      background: url('../../../../assets/img4/pop-title.png') no-repeat center;
      background-size: auto 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      font-family: 'Lucida Calligraphy', cursive, serif, sans-serif;
      font-size: 30px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      color: #ffffff;
    }
    .search-box {
      width: calc(100% - 20px);
      height: 60px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      margin-left: 10px;
      border-bottom: 1px solid rgba(92, 194, 212, 0.3);
      span {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #f5fdff;
        margin: 0 10px;
      }
      .key-word {
        height: 28px;
        width: 140px;
        padding: 0 0px 0 0px;
        background: url('../../../../assets/img3/pull-down.png') no-repeat center;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        margin-left: 10px;
        span {
          display: inline-block;
          height: 20px;
          width: 18px;
          color: #43bbea;
          font-size: 18px;
          display: flex;
          align-items: center;
        }
        input {
          display: inline-block;
          box-sizing: border-box;
          color: rgba(13, 203, 228, 0.911);
          width: calc(100% - 20px);
          height: 100%;
          line-height: 28px;
          border: none;
          background: none;
        }
        input:focus {
          box-sizing: border-box;
          width: calc(100% - 25px);
          height: 100%;
          line-height: 28px;
          border: none;
          // border-left: none !important;
        }
        input:focus-visible {
          box-sizing: border-box;
          width: calc(100% - 25px);
          height: 100%;
          line-height: 28px;
          border: none;
          // border-left: none !important;
          outline: none;
        }
        input::-webkit-input-placeholder {
          color: #1490be;
        }
      }
      .search-btn {
        width: 80px;
        height: 30px;
        background: url('../../../../assets/img3/search-btn.png') no-repeat center;
        background-size: 100% 100%;
        margin-left: 10px;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 187px);
      box-sizing: border-box;
      padding: 0 20px 0 20px;
      overflow: auto;
      .item {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(92, 194, 212, 0.3);
        margin: 10px 0;
        .title-info {
          width: 100%;
          height: 92px;
          display: flex;
          align-items: center;
          .info {
            width: calc(100% - 70px);
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .row1 {
              display: flex;
              align-items: center;
              margin: 5px 0;
              .status {
                width: 86px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #f5fdff;
                margin-right: 5px;
              }
              .title {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
            }
            .row2 {
              margin: 5px 0;
              .key {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #a2c0d1;
              }
              .value {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #c5efff;
                margin-right: 12px;
              }
            }
          }
          .btn {
            width: 65px;
            height: 29px;
            background: url('../../../../assets/img3/pull-down.png') no-repeat center;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #51c0e9;
            cursor: pointer;
            i {
              margin-left: 3px;
            }
          }
        }
        .detail-info {
          width: 100%;
          min-height: 280px;
          background: #07315a;
          overflow: auto;
          box-sizing: border-box;
          padding: 20px 30px;
          .text-box {
            width: 100%;
            .row1 {
              width: 100%;
              margin-bottom: 8px;
              display: flex;
              .key {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #a2c0d1;
                white-space: nowrap;
              }
              .value {
                display: inline-block;
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #c5efff;
                // margin-right: 12px;
              }
            }
            .row2 {
              width: 100%;
              .key {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #a2c0d1;
              }
              .value {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #c5efff;
                margin-right: 12px;
              }
            }
          }
          .img-title {
            display: flex;
            align-items: center;
            position: relative;
            left: -15px;
            img {
              width: 53px;
              height: 53px;
            }
            span {
              font-family: MicrosoftYaHei-Bold;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #84e1ff;
            }
          }
          .time-line {
            width: 100%;
            display: flex;
            margin-left: 30px;

            .line-item {
              height: 120px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              .time {
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
              .img {
                width: 20px;
                height: 20px;
                background: url(../../../../assets/img2/ic_yuanyi.png) no-repeat center;
                background-size: 100% 100%;
                position: relative;
                .line {
                  position: absolute;
                  top: 10px;
                  left: 18px;
                  width: 300px;
                  height: 1px;
                  background: #01b7e1;
                }
              }
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
              .text {
                font-family: MicrosoftYaHei;
                font-size: 20px;
                margin-top: 5px;
                color: #fff;
              }
            }
            .line-item:nth-of-type(2) {
              margin-left: 125px;
            }
            .line-item:nth-of-type(3) {
              margin-left: 155px;
            }
            .line-item:nth-last-child(1) {
              .line {
                display: none;
              }
            }
          }
          .file {
            width: 100%;
            display: flex;
            .part {
              width: 50%;
              .img-title {
                display: flex;
                align-items: center;
                position: relative;
                left: -15px;
                img {
                  width: 53px;
                  height: 53px;
                }
                span {
                  font-family: MicrosoftYaHei-Bold;
                  font-size: 18px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #84e1ff;
                }
              }
              .img {
                width: 100%;
                overflow: auto;
                .imgShow {
                  display: inline-block;
                  width: 180px;
                  height: 180px;
                  margin: 10px;
                }
              }
            }
          }
        }
      }
    }
    .pagination {
      height: 30px;
      text-align: center;
    }
  }
}
</style>
