<template>
  <div class="box-e">
    <div class="title">
      <span>{{ normalSource ? '务本堂火灾' : '' }}风险预警应急处置事件追踪</span>
    </div>
    <div class="close" @click="close"></div>
    <div class="process-container">
      <div class="p-head">
        <span class="head-text process-name">事件流程</span>
        <span class="head-text status">状态</span>
        <span class="head-text time">时间</span>
        <span class="head-text content">内容</span>
      </div>
      <div class="p-body">
        <div class="item" v-for="(item, index) in eventTrackList" v-show="currentStep >= index" :key="index">
          <div class="process-name">
            <div :class="['text', index < 4 ? 'text-b' : index >= 4 && index < 8 ? 'text-g' : 'text-r']">
              {{ item.task }}
            </div>
            <div class="arrow">
              <img src="../../../assets/img4/jiantou.png" alt="" srcset="" />
            </div>
          </div>
          <div class="status">
            <span>{{ item.status }}</span>
          </div>
          <div class="time">
            <span>
              {{ item.createTime }}
            </span>
          </div>
          <div class="content">
            <span>
              {{ item.content }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';
import { get_sjgz_data, getWarnDataById } from '../../../api/xsApi3';
import { mapState } from 'vuex';
import dayjs from 'dayjs';
export default {
  props: {
    logo: String,
  },
  computed: {
    ...mapState(['transferEventTrack']),
  },
  data() {
    return {
      normalSource: true,
      currentStep: 0,
      eventTrackList: [
        // {
        //   processName: "AI数据",
        //   status: "设备推送",
        //   time: "2022-10-12 10:25:56",
        //   content: "设备电流过大，自动断电"
        // },
        // {
        //   processName: "系统平台",
        //   status: "系统推送",
        //   time: "2022-10-12 10:25:56",
        //   content: "设备电流过大，自动断电"
        // },
        // {
        //   processName: "应急启动",
        //   status: "系统推送",
        //   time: "2022-10-12 10:25:56",
        //   content: "设备电流过大，自动断电"
        // },
        // {
        //   processName: "应急处置员",
        //   status: "系统推送",
        //   time: "2022-10-12 10:25:56",
        //   content: "设备电流过大，自动断电"
        // },
        // {
        //   processName: "事件处置上报",
        //   status: "人工上报",
        //   time: "2022-10-12 10:25:56",
        //   content: "设备电流过大，自动断电"
        // },
        // {
        //   processName: "事件跟踪",
        //   status: "人工上报",
        //   time: "2022-10-12 10:25:56",
        //   content: "设备电流过大，自动断电"
        // },
        // {
        //   processName: "信息上报",
        //   status: "人工上报",
        //   time: "2022-10-12 10:25:56",
        //   content: "设备电流过大，自动断电"
        // },
        // {
        //   processName: "处置完毕",
        //   status: "人工上报",
        //   time: "2022-10-12 10:25:56",
        //   content: "设备电流过大，自动断电"
        // },
        // {
        //   processName: "数据归档",
        //   status: "系统",
        //   time: "2022-10-12 10:25:56",
        //   content: "设备电流过大，自动断电"
        // }
      ],
    };
  },
  watch: {
    // logo(val){
    //   if(val == 'onlyPreview'){
    //   }
    // }
  },
  mounted() {
    this.getSJGZ_data();
  },
  methods: {
    // 获取事件跟踪
    getSJGZ_data() {
      this.normalSource = true;
      let currentTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      if (this.logo && this.logo == 'onlyPreview') {
        this.normalSource = false;
        if (this.transferEventTrack.itype == '3') {
          if (this.transferEventTrack && this.transferEventTrack.replyContent) {
            this.transferEventTrack.parseRes = JSON.parse(this.transferEventTrack.replyContent);
            console.log(this.transferEventTrack.parseRes);
          }
          let arr = [
            {
              task: '事件上报',
              status: this.transferEventTrack.checkSuggestion == '通过' ? '已处置' : '未处置',
              createTime: (this.transferEventTrack.signTime && this.transferEventTrack.signTime.replace('T', ' ')) || currentTime,
              content: this.transferEventTrack.content,
            },
            {
              task: '处置结果',
              status: this.transferEventTrack.checkSuggestion,
              createTime: (this.transferEventTrack.replyTime && this.transferEventTrack.replyTime.replace('T', ' ')) || currentTime,
              content: (this.transferEventTrack.parseRes && this.transferEventTrack.parseRes.feedbackContent) || '',
            },
          ];
          this.eventTrackList = arr;
          this.currentStep = arr.length;
          //   alarmSource: '稽查督查';
          //   bumpPoint: null;
          //   bumpPointId: '68';
          //   checkStarLevel: '5';
          //   checkSuccess: 0;
          //   checkSuggestion: '通过';
          //   checkUserName: '管理员';
          //   content: '2022.08.19,近日，萧山区文物局在巡查中发现，市级文物保护点-文昌桥桥体长有杂草，对文物的风貌和安全造成一定的影响。';
          //   eventId: '2022082618252062523';
          //   file: 'http://223.65.209.139:8888/city3ddemo/events/s3/24/1.jpg';
          //   handleDeptId: '001003001010007005015003';
          //   handleDeptName: '新塘综合信息指挥室';
          //   id: '202208301538568968';
          //   itype: '3';
          //   location: '新塘街道半爿街社区石头王自然村';
          //   mobile: '13656713554';
          //   name: '萧山区文物局';
          //   occurSource: '48';
          //   replyContent: '{"accessoryList":[{"accessoryName":"cc8304851b474569a0db9f15d79295e369f4bd831d51ebf74e40235f81f5ac9.jpg?Expires=1979803995&OSSAccessKeyId=UtxS6TrzGthwmxYQ&Signature=PAwAy0dwVHubbkR33tu9tlUjjzw%3D","accessoryPath":"https://xsjczlspt.xiaoshan.gov.cn:281/oss/cc8304851b474569a0db9f15d79295e369f4bd831d51ebf74e40235f81f5ac9.jpg?Expires=1979803995&OSSAccessKeyId=UtxS6TrzGthwmxYQ&Signature=PAwAy0dwVHubbkR33tu9tlUjjzw%3D"}],"businessId":"2022082618252062523","containAccessory":"1","feedbackContent":"桥台阶上及周边的杂草已清理。爬山虎已有60年以上的树龄，如将其清除可能会有烂根的情况。会给古桥基础带来破坏，故暂不清理。","feedbackTime":"2022-09-29 17:33:58","handleDeptId":"001003001010007005015004007","handleDeptName":"半爿街社区","status":"办结"}';
          //   replyTime: '2022-09-29T17:33:59';
          //   signContent: '{"eventId":"2022082618252062523","isReceive":true}';
          //   signTime: '2022-09-28T18:28:43';
          //   status: 3;
          //   subject: '关于市级文保点-文昌桥桥体上长有杂草的问题';
          //   taskCode: 'XS04015000000';
          //   type: '其他';
          //   userid: '26533e40317f11ecdbc8a698deb48ea2';
        } else {
          getWarnDataById({
            id: this.transferEventTrack.id,
            itype: this.transferEventTrack.itype,
          }).then((res) => {
            if (res && res.data && res.data.code && res.data.code == 200) {
              let shorter = res.data.data;
              if (this.transferEventTrack.itype == 1) {
                let arr = [
                  {
                    task: shorter.pushXiTongData.taskName,
                    status: shorter.pushXiTongData.isOver == '1' ? '已处置' : '未处置',
                    createTime: shorter.pushXiTongData.warningTime || currentTime,
                    content:
                      shorter.pushXiTongData.deviceName || '' + shorter.pushXiTongData.eventLvlStr || '' + shorter.pushXiTongData.detectionValue || '' + shorter.pushXiTongData.detectionUnit || '',
                  },
                  {
                    task: '事件处置上报',
                    status: shorter.pushChuZhiData && shorter.pushChuZhiData[0] && shorter.pushChuZhiData[0].haveSecurity,
                    createTime:
                      (shorter.pushChuZhiData && shorter.pushChuZhiData[0] && shorter.pushChuZhiData[0].createTime ? shorter.pushChuZhiData[0].createTime : shorter.pushXiTongData.createTime) ||
                      currentTime,
                    content: shorter.pushXiTongData.eventType,
                  },
                  {
                    task: '处置完毕',
                    status: shorter.taskBody && shorter.taskBody[0] && shorter.taskBody[0].checkStatus == '1' ? '已处置' : '未处置',
                    createTime: (shorter.taskBody && shorter.taskBody[0] && shorter.taskBody[0].createTime) || currentTime,
                    content: (shorter.taskBody && shorter.taskBody[0] && shorter.taskBody[0].checkName) || '处理完成',
                  },
                ];
                if (shorter.isAll) {
                  arr[0].status = '已处置';
                  arr[1].status = '已处置';
                  arr[2].status = '已处置';
                } else {
                  //
                }
                //   console.log('arr', arr);
                this.eventTrackList = arr;
                this.currentStep = arr.length;
              }
              if (this.transferEventTrack.itype == 2) {
                let arr = [
                  {
                    task: shorter.pushXiTongData.taskName || '派发预警处置',
                    status: shorter.pushXiTongData.isOver == '1' ? '已处理' : '未处理',
                    createTime: shorter.pushXiTongData.createTime,
                    content: shorter.pushXiTongData.checkName,
                  },
                  {
                    task: shorter.pushXiTongData.isOver == '1' ? '处置完毕' : '未处置',
                    status: shorter.pushXiTongData.isOver == '1' ? '已处理' : '未处理',
                    createTime: (shorter.taskBody && shorter.taskBody[0] && shorter.taskBody[0].createTime) || currentTime,
                    content: shorter.pushXiTongData.isOver == '1' ? '已处理' : '未处理',
                  },
                ];
                this.eventTrackList = arr;
                this.currentStep = arr.length;
              }
            }
          });
        }
      } else {
        get_sjgz_data().then((res) => {
          this.eventTrackList = res.data.data;
          this.currentStep = 3;
          let timer = setInterval(() => {
            if (this.currentStep >= this.eventTrackList.length) {
              this.currentStep = this.eventTrackList.length;
              clearInterval(timer);
            } else {
              this.currentStep += 1;
            }
          }, 1000);
        });
      }
      /*   get_sjgz_data().then(res => {
        this.eventTrackList = res.data.data;
        if (this.logo == 'onlyPreview') {
          this.currentStep = this.eventTrackList.length;
        } else {
          this.currentStep = 3;
          let timer = setInterval(() => {
            if (this.currentStep >= this.eventTrackList.length) {
              this.currentStep = this.eventTrackList.length;
              clearInterval(timer);
            } else {
              this.currentStep += 1;
            }
          }, 1000);
        }
      }); */
    },
    close() {
      eventBus.$emit('isShowCenterAndTop', true);
      this.$store.commit('setIsGlobalShowCenter', true);
      this.$store.commit('setIsGlobalShowTop', true);
      if (this.logo == 'onlyPreview') {
        // 只是查看事件追踪信息的话
        eventBus.$emit('onlyPreview');
      } else {
        eventBus.$emit('closeWarningPopAndBox');
        eventBus.$emit('closeZBZ2');
        // this.$router.back();
        // 显示智保站v1
        // eventBus.$emit('isShow_ZBZ_V2', false);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.box-e {
  width: 100%;
  height: 97%;
  box-sizing: border-box;
  background: url('../../../assets/imgBoxBg/bg.png') no-repeat center;
  background-size: 100% 100%;
  position: relative;
  box-sizing: border-box;
  padding: 0 20px 10px 20px;
  z-index: 20;
  .title {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../../../assets/img4/biaotibeijing.png') no-repeat center;
    background-size: 95% 100%;
    span {
      font-size: 22px;
      font-weight: 900;
      font-stretch: normal;
      letter-spacing: 4px;
      color: #f5fdff;
      text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
      background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .close {
    width: 26px;
    height: 26px;
    background: url('../../../assets/img4/guanbi.png') no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  .process-container {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .p-head {
      width: 98%;
      height: 40px;
      background: #1f2b65;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 10px;
      box-sizing: border-box;
      padding-left: 10px;
      .head-text {
        font-size: 16px;
        color: #3ccacf;
      }
      .process-name {
        width: 150px;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .status {
        width: 116px;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .time {
        width: 220px;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .content {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
    .p-body {
      width: 98%;
      height: calc(100% - 40px);
      box-sizing: border-box;
      margin-top: 10px;
      .item {
        width: 100%;
        // height: 80px;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        &:nth-last-child(1) {
          .process-name {
            .arrow {
              display: none;
            }
          }
        }
        .process-name {
          width: 160px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .text {
            width: 146px;
            height: 46px;

            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 20px;
            color: #fff;
            letter-spacing: 1px;
          }
          .text-b {
            background: url('../../../assets/img4/lanse.png') no-repeat center;
            background-size: 100% 100%;
          }
          .text-g {
            background: url('../../../assets/img4/lvse.png') no-repeat center;
            background-size: 100% 100%;
          }
          .text-r {
            background: url('../../../assets/img4/hongse.png') no-repeat center;
            background-size: 100% 100%;
          }
          .arrow {
            width: 146px;
            height: 34px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 12px;
              height: 34px;
            }
          }
        }
        .status {
          width: 116px;
          height: auto;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span {
            width: 100px;
            min-height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 16px;
            color: #3ccacf;
            border: 1px solid #315a7e;
            box-sizing: border-box;
            padding-left: 15px;
            box-shadow: inset #315a7e 0px 0px 15px;
          }
        }
        .time {
          width: 220px;
          height: auto;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span {
            width: 200px;
            min-height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 16px;
            color: #fff;
            border: 1px solid #315a7e;
            box-sizing: border-box;
            padding-left: 15px;
            box-shadow: inset #315a7e 0px 0px 15px;
          }
        }
        .content {
          flex: 1;
          height: auto;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span {
            width: 100%;
            min-height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 16px;
            color: #fff;
            border: 1px solid #315a7e;
            box-sizing: border-box;
            padding-left: 15px;
            box-shadow: inset #315a7e 0px 0px 15px;
          }
        }
      }
    }
  }
}
</style>
