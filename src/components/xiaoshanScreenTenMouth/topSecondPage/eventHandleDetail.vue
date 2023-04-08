<template>
  <div class="confxlytainer" v-if="isShow" :style="{ opacity: maskOpacity }">
    <div class="center-container">
      <div class="head">{{ title }}详情</div>
      <div class="close" @click="close"></div>
      <div class="body-box">
        <div class="head-info">
          <img :src="detailInfo.pointImagePath" />
          <div class="info">
            <div class="top">
              <span class="pointName">{{ detailInfo.publishName || '务本堂' }}</span>
              <div class="col">
                <span>{{ detailInfo.publishAddress || '萧山区进化镇欢潭村' }}</span>
              </div>
            </div>
            <div class="bottom">
              <div class="col">
                <span class="key">事件类型：</span>
                <span class="value">{{ detailInfo.checkType || '设备预警' }}</span>
              </div>
              <div class="col">
                <span class="key">上报人员：</span>
                <span class="value">{{ detailInfo.nickName || '田欢乐' }}</span>
              </div>
              <div class="col">
                <span class="key">处置人员：</span>
                <span class="value">{{ detailInfo.userName || '田欢乐' }}</span>
              </div>
              <div class="col">
                <span class="key">处置时间：</span>
                <span class="value">{{ detailInfo.bodyTime || '2023-03-12' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="before-info">
          <div class="part part-1">
            <div class="title">问题事项：</div>
            <div class="content">{{ detailInfo.checkName || '务本堂例行检查' }}</div>
          </div>
          <div class="part part-2">
            <div class="title">现场照片：</div>
            <div class="content" v-if="workImgList.length > 0">
              <template v-for="(sub, subIndex) in workImgList">
                <img @click="() => showImg(subIndex, workImgList)" :src="sub.img" class="thumbImg" :key="subIndex" />
              </template>
              <viewer :images="workImgList" :options="options" @inited="inited" class="viewer" ref="viewer2" v-show="false">
                <img v-for="(src, index) in workImgList" :src="src.img" :key="index" />
              </viewer>
            </div>
            <div class="content" v-else>暂无图片</div>
          </div>

          <div class="part part-1">
            <div class="title">处理事项：</div>
            <div class="content">{{ detailInfo.checkName || '务本堂例行检查' }}</div>
          </div>
          <div class="part part-2">
            <div class="title">处理照片：</div>
            <div class="content" v-if="workImgList.length > 0">
              <template v-for="(sub, subIndex) in workImgList">
                <img @click="() => showImg(subIndex, workImgList)" :src="sub.img" class="thumbImg" :key="subIndex" />
              </template>
              <viewer :images="workImgList" :options="options" @inited="inited" class="viewer" ref="viewer2" v-show="false">
                <img v-for="(src, index) in workImgList" :src="src.img" :key="index" />
              </viewer>
            </div>
            <div class="content" v-else>暂无图片</div>
          </div>

          <div class="part part-4">
            <div class="title">镇街审核：</div>
            <div class="content" v-if="getJdState(detailInfo.jdIsRunState)">
              <img :src="getJdState(detailInfo.jdIsRunState)" />
            </div>
            <div class="content" v-else>待审核</div>
          </div>
        </div>
        <div class="after-info" v-if="detailInfo.jdIsRunState !== 4">
          <div class="part part-2">
            <div class="title">区文物局审核：</div>
            <div class="content" v-if="getWljState(detailInfo.isRun)">
              <img :src="getWljState(detailInfo.isRun)" />
            </div>
            <div class="content" v-else>待审核</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getListDetailById } from '@/api/xsApi3';
import { mapGetters } from 'vuex';

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
      title: '事件处置',
      options: {
        initialViewIndex: 0,
      },

      detailInfo: {}, // 基本信息
      workImgList: [], // 工作照片
      checkList: [], // 巡查数据
      handleImgList: [], // 处置图片

      stateBtnList: [
        // 审核状态图片
        require('@/assets/img4/state-btn1.png'),
        require('@/assets/img4/state-btn2.png'),
        require('@/assets/img4/state-btn3.png'),
        require('@/assets/img4/state-btn4.png'),
        require('@/assets/img4/state-btn5.png'),
      ],
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
    isShow(nval) {
      if (nval) {
        // switch (this.row.checkType) {
        //   case '1':
        //     this.title = '专项检查';
        //     break;
        //   case '2':
        //     this.title = '专项整改';
        //     break;
        //   case '3':
        //     this.title = '巡查上报';
        //     break;
        //   case '4':
        //     this.title = '设备报警';
        //     break;
        //   case '5':
        //     this.title = '安全检查';
        //     break;
        //   case '6':
        //     this.title = '信访案件';
        //     break;
        //   case '7':
        //     this.title = '稽查督查';
        //     break;
        //   case '8':
        //     this.title = '问题上报';
        //     break;
        //   case '10':
        //     this.title = '一网统管';
        //     break;
        //   case '11':
        //     this.title = '视频预警（ 热成像事件-温度报警）';
        //     break;
        //   case '12':
        //     this.title = '视频预警（热成像事件-火点检测）';
        //     break;
        //   case '13':
        //     this.title = '用电监测';
        //     break;
        //   case '14':
        //     this.title = '水压监测 ';
        //     break;
        //   case '15':
        //     this.title = '烟感监测 ';
        //     break;
        //   case '18':
        //     this.title = '行为监测 ';
        //     break;
        //   case '31':
        //     this.title = '设备检查 ';
        //     break;
        //   default:
        //     break;
        // }
        this.workImgList = [];
        this.checkList = [];
        this._getListDetailById(this.row.id);
      }
    },
  },
  methods: {
    _getListDetailById(id) {
      let params = {
        id: id,
      };
      getListDetailById(params).then((res) => {
        let shorter = res.data.data;
        if (shorter) {
          this.detailInfo = shorter;
          if (this.detailInfo.details.length <= 0) return;
          this.checkList =
            this.detailInfo.details.length > 0 &&
            this.detailInfo.details.map((item) => {
              let str = item.storageId;
              item.imgList = JSON.parse(str);
              return item;
            });
          this.checkList.map((item, index) => {
            if (!item.checkNameType) {
              this.checkList.splice(index, 1);
              let str = this.detailInfo.details[index].storageId;  
              if (str) {
                this.workImgList = JSON.parse(str);
              }
            }
          });
        }
      });
    },
    getJdState(state) {
      switch (state) {
        case 1:
          return this.stateBtnList[0];
        case 99:
          return this.stateBtnList[1];
        case 4:
          return this.stateBtnList[2];
        default:
          break;
      }
    },
    getWljState(state) {
      switch (state) {
        case 1:
          return this.stateBtnList[3];
        case 99:
          return this.stateBtnList[4];
        default:
          return false;
      }
    },

    inited(viewer) {
      this.$viewer = viewer;
    },
    showImg(index, item) {
      this.options.initialViewIndex = index;
      this.images = item;
      setTimeout(() => {
        this.$viewer.show();
      }, 400);
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>
<style lang="less" scoped>
.confxlytainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 21;
  background: rgba(0, 0, 0, 0.7);
  .center-container {
    width: 1026px;
    height: 826px;
    overflow: hidden;
    position: relative;
    background: url('@/assets/img4/s-pop-bg.png') no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 12px 35px 35px 35px;
    .close {
      width: 54px;
      height: 53px;
      position: absolute;
      top: 0px;
      right: 0px;
      background: url('@/assets/img4/close.png') no-repeat center;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .head {
      width: 100%;
      height: 79px;
      background: url('@/assets/img4/pop-title.png') no-repeat center;
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
    .body-box {
      width: 100%;
      height: calc(100% - 100px);
      margin-top: 8px;
      overflow: auto;
      // background: red;
      box-sizing: border-box;
      // padding-left:20px;
      .head-info {
        width: 100%;
        height: 102px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        padding-left: 20px;
        img {
          width: 170px;
          height: 98px;
        }
        .info {
          flex: 1;
          margin-left: 18px;
          height: 100%;
          box-sizing: border-box;
          padding-left: 20px;
          background: url('@/assets/img4/top-bg.png') no-repeat center;
          background-size: 100% 100%;
          .top {
            height: 40%;
            width: 100%;
            display: flex;
            align-items: flex-end;
            .pointName {
              font-family: SourceHanSansCN-Bold;
              font-size: 18px;
              color: #ffffff;
              margin-right: 30px;
            }
            .col {
              span {
                font-family: SourceHanSansCN-Regular;
                font-size: 16px;
                color: #a8b0d0;
              }
            }
          }
          .bottom {
            height: 60%;
            width: 100%;
            display: flex;
            align-items: center;
            .col {
              margin-right: 8px;
              display: flex;
              align-items: center;
              .key {
                font-family: SourceHanSansCN-Regular;
                font-size: 16px;
                color: #a8b0d0;
                display: flex;
                align-items: center;
                &::before {
                  content: '';
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  background: url('@/assets/img4/pot.png') no-repeat center;
                  background-size: 100% 100%;
                }
              }
              .value {
                font-family: SourceHanSansCN-Regular;
                font-size: 16px;
                color: #ffffff;
              }
            }
          }
        }
      }
      .before-info {
        width: 100%;
        min-height: 250px;
        margin-top: 30px;
        box-sizing: border-box;
        padding-left: 20px;
        margin-bottom: 10px;
        .part {
          width: 100%;
          height: auto;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          margin-bottom: 20px;
          .title {
            width: 150px;
            text-align: right;
            margin-right: 10px;
            font-size: 16px;
            color: #fff;
          }
          .content {
            flex: 1;
            font-size: 16px;
            color: #fff;
          }
        }
        .part-1 {
          .content {
            width: 100%;
            min-height: 50px;
            box-sizing: border-box;
            padding: 8px 12px;
            border: 1px solid #152e77;
            background: #121c39;
            font-family: SourceHanSansCN-Regular;
            font-size: 16px;
            color: #ffffff;
            text-align: left;
            display: flex;
            align-items: center;
          }
        }
        .part-2 {
          .content {
            height: auto;
            display: flex;
            flex-wrap: wrap;
            img {
              width: 150px;
              height: 80px;
              margin-right: 8px;
              margin-bottom: 5px;
            }
          }
        }
        .part-3 {
          .content {
            height: auto;
            .item {
              width: 100%;
              height: auto;
              margin-bottom: 10px;
              .title {
                width: 100%;
                font-family: SourceHanSansCN-Regular;
                font-size: 16px;
                color: #ffffff;
                text-align: left;
              }
              .detail {
                width: 100%;
                min-height: 50px;
                box-sizing: border-box;
                padding: 8px 12px;
                border: 1px solid #152e77;
                background: #121c39;
                font-family: SourceHanSansCN-Regular;
                font-size: 16px;
                color: #ffffff;
                text-align: left;
                display: flex;
                align-items: center;
                margin: 10px 0;
              }
              .img {
                height: auto;
                display: flex;
                flex-wrap: wrap;
                img {
                  width: 150px;
                  height: 80px;
                  margin-right: 8px;
                  margin-bottom: 5px;
                }
              }
            }
          }
        }
        .part-4 {
          .content {
            width: 130px;
            height: 30px;
            img {
              width: 130px;
              height: 100%;
            }
          }
        }
      }
      .after-info {
        width: 100%;
        height: auto;
        // background:linear-gradient(180deg, #2463967a 0%, rgba(36, 98, 150, 0) 100%);
        // border-top: solid 1px #246296;
        .part {
          width: 100%;
          height: auto;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          margin-bottom: 20px;
          .title {
            width: 150px;
            text-align: right;
            margin-right: 10px;
            font-size: 16px;
            color: #fff;
          }
          .content {
            flex: 1;
            font-size: 16px;
            color: #fff;
          }
        }
        .part-1 {
          margin-top: 10px;
          .content {
            width: 100%;
            height: auto;
            .it {
              width: 100%;
              display: flex;
              margin-bottom: 10px;
              .key {
                width: 90px;
                font-family: SourceHanSansCN-Regular;
                font-size: 16px;
                color: #a8b0d0;
              }
              .content-sub {
                flex: 1;
                font-family: SourceHanSansCN-Regular;
                font-size: 16px;
                color: #ffffff;
              }
            }
            .it-2 {
              .content-sub {
                display: flex;
                flex-wrap: wrap;
                img {
                  width: 150px;
                  height: 80px;
                  margin-right: 8px;
                  margin-bottom: 5px;
                }
              }
            }
          }
        }
        .part-2 {
          .content {
            width: 130px;
            height: 30px;
            img {
              width: 130px;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
