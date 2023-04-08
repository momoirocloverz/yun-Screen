<template>
  <div class="container">
    <Box :height="'300px'" :bgSrc="require('../../../assets/imgBoxBg/wbd-bg4.png')">
      <div class="part-1">
        <Title :text="'感知设备'">
          <!-- <div class="btn">查看详情</div> -->
        </Title>
        <div class="barOuter">
          <div class="barLeft">异常</div>
          <div class="process">
            <div class="text" :style="{ left: `${arrowLeft / 192}rem` }" alt="">
              {{ getText }}
            </div>
          </div>
          <div class="barRight">优秀</div>
        </div>
        <div class="device-tj">
          <div class="item" v-for="(item, index) in deviceTj_data" :key="index">
            <img :src="item.imgSrc" alt="" />
            <span>{{ item.name }}</span>
            <span>{{ item.num }}</span>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'600px'" :bgSrc="require('../../../assets/imgBoxBg/wbd-bg5.png')">
      <div class="part-2">
        <Title :text="'巡查处置记录'">
          <!-- <div class="btn">查看详情</div> -->
        </Title>
        <div class="list" v-show="listData && listData.length">
          <div class="listInner">
            <div class="item" v-for="(item, index) in listData" :key="index" :class="[item.istate != '1' ? 'attention' : '']">
              <div class="info-box">
                <div class="infoLeftCon">
                  <div class="nameLeft">
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="infoLeft">
                    <span>{{ item.createTime ? formatYMDDate(item.createTime) : '' }}</span>
                    <span :title="currentWBDinfo && currentWBDinfo.goodsData && currentWBDinfo.goodsData.publishName">{{
                      (currentWBDinfo && currentWBDinfo.goodsData && currentWBDinfo.goodsData.publishName) || '务本堂'
                    }}</span>
                  </div>
                </div>
                <div class="info">
                  <span
                    :style="{
                      color: item.istate == '0' ? '#e5a35d' : '#47fff0',
                    }"
                    >{{ item.istate == '0' ? '处理中' : '已处理' }}</span
                  >
                  <span :title="item.fxmsg">{{ item.fxmsg }}</span>
                </div>
                <div class="btn-l" @click="itemClick(index)">
                  <span>详情</span>
                  <img :class="[index == currentIndex ? 'open' : '']" src="../../../assets/img4/arrow.png" alt="" srcset="" />
                </div>
              </div>
              <div v-if="index == currentIndex" class="detail-info">
                <div class="time-line">
                  <el-timeline>
                    <!-- <template v-for="(sub, subIndex) in item.baseCheckDetailList">
                    <el-timeline-item timestamp="" placement="top" :key="subIndex">
                      <div class="content">
                        <div class="system">
                          <span>{{ item.checkName }}</span>
                          <span>{{ sub.checkTime }}</span>
                        </div>
                        <span class="info">
                          {{ sub.dicDetailName }}
                        </span>
                      </div>
                    </el-timeline-item>
                  </template> -->
                    <el-timeline-item timestamp="" placement="top">
                      <div class="content">
                        <div class="system">
                          <span>开始任务</span>
                          <span>{{ formatSpYMDDate(item.createTime) }}</span>
                        </div>
                        <span class="info"> {{ item.fxyz }} </span>
                      </div>
                    </el-timeline-item>
                    <el-timeline-item timestamp="" placement="top">
                      <div class="content">
                        <div class="qzzx">
                          <span>5分钟检查</span>
                          <span>22/10/12 09:12:29</span>
                        </div>
                        <span class="info"> 接收任务 </span>
                      </div>
                    </el-timeline-item>
                    <el-timeline-item timestamp="" placement="top">
                      <div class="content">
                        <div class="street">
                          <span>镇街</span>
                          <span>{{ item.istate == '0' ? '' : formatSpYMDDate(item.endTime) }}</span>
                        </div>
                        <span class="info"> 接收任务 </span>
                      </div>
                    </el-timeline-item>
                    <el-timeline-item timestamp="" placement="top">
                      <div class="content">
                        <div class="street">
                          <span>区文物局</span>
                          <span>{{ item.istate == '0' ? '' : formatSpYMDDate(item.endTime) }}</span>
                        </div>
                        <span class="info"> 接收任务 </span>
                      </div>
                    </el-timeline-item>
                  </el-timeline>
                </div>
                <div class="czyj" v-if="item.detailRes && item.detailRes.length">
                  <div class="title">处置内容</div>
                  <div class="row problem">
                    <span>问题内容</span>
                    <div class="text">
                      {{ item.detailRes && item.detailRes.length && item.detailRes[0].dicDetailName }}
                    </div>
                    <div class="btn-p" @click="popPic(item)"></div>
                  </div>
                  <div class="row ruler">
                    <span>处置内容</span>
                    <div class="text">
                      {{ (item.baseCheckDetailList && item.baseCheckDetailList[0] && item.baseCheckDetailList[0].checkOpinion) || '处置依据《文物建筑火灾风险防范指南》（试行)三、（三）' }}
                    </div>
                    <div class="btn-p"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination">
            <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
          </div>
        </div>
        <div class="list" v-show="listData && !listData.length">
          <div class="emptyCon">暂无数据</div>
        </div>
      </div>
    </Box>
    <viewer :images="imgArr_2" :options="options" @inited="inited2" class="viewer" ref="viewer2" v-show="false">
      <img v-for="(src, index) in imgArr_2" :src="src" :key="index" />
    </viewer>
  </div>
</template>
<script>
import Box from '../components/box';
import Title from '../components/title';
import { listByBumpPointId, equipFacilityInfoResourcesSelectInfoTotal } from '@/api/xsApi3';
import { eventBus } from '@/main';
import Table from './components/table';
import dayjs from 'dayjs';
import { mapState } from 'vuex';
import { imageSecPrefix } from '@/utils/const';
export default {
  components: { Box, Title, Table },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      options: {
        initialViewIndex: 0,
      },
      imgArr_2: [],
      arrowLeft: 268,
      deviceTj_data: [
        {
          name: '监控',
          num: '20',
          imgSrc: require('../../../assets/img4/camera1.png'),
        },
        {
          name: '烟感',
          num: '20',
          imgSrc: require('../../../assets/img4/smoke22.png'),
        },
        {
          name: '电流',
          num: '3',
          imgSrc: require('../../../assets/img4/electric22.png'),
        },
        {
          name: '水压',
          num: '5',
          imgSrc: require('../../../assets/img4/water22.png'),
        },
      ],
      currentIndex: 0,
      listData: [],
    };
  },
  computed: {
    ...mapState(['currentWBDinfo']),
    getText() {
      if (this.arrowLeft < 120) {
        return '差';
      } else if (this.arrowLeft >= 120 && this.arrowLeft < 250) {
        return '良';
      } else if (this.arrowLeft >= 250 && this.arrowLeft <= 330) {
        return '优';
      } else if (this.arrowLeft > 330) {
        this.arrowLeft = 330;
        return '优';
      }
    },
  },
  watch: {
    $route(nval, val) {
      if (nval && nval.query && nval.query.id) {
        this.listData = [];
        this.fetchData();
      }
    },
  },
  created() {
    eventBus.$on('bumpPointClick', (msg) => {
      //   console.log('传参--右', msg)
    });
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    pageNumChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    inited2(viewer) {
      this.$viewer2 = viewer;
    },
    popPic(item) {
      if (item.baseCheckDetailList && item.baseCheckDetailList.length) {
        let mixFirst = [];
        item.baseCheckDetailList.map((ele) => {
          if (ele.storageFile) {
            mixFirst.push(...ele.storageFile);
          }
        });
        if (mixFirst && mixFirst.length) {
          mixFirst.forEach((ele) => {
            ele.fullPath = imageSecPrefix + ele.path;
          });
          let pure = mixFirst.map((ele) => {
            return ele.fullPath;
          });
          this.imgArr_2 = pure;
          this.options.initialViewIndex = 0;
          setTimeout(() => {
            this.$viewer2.show();
          }, 400);
        }
      }
    },
    formatYMDDate(value) {
      return dayjs(value).format('YYYY-MM-DD');
    },
    formatSpYMDDate(value) {
      return dayjs(value).format('YY/MM/DD HH:mm:ss');
    },
    fetchList() {
      if (this.$route.query && this.$route.query.id) {
        /*         if (this.$route.query.id == 11) {
          this.listData = [
            {
              createTime: '2022-10-16 08:10:05',
              details: null,
              endTime: '2022-10-15 18:25:42',
              fxmsg: '本体',
              fxyz: '瓦片脱落',
              id: 'f1ca5c3a3f97269dce12100b9dea2239',
              istate: '0',
              name: '巡查上报',
            },
            {
              createTime: '2023-01-15 14:25:06',
              details: null,
              endTime: '2023-01-16 13:41:12',
              fxmsg: '火灾隐患',
              fxyz: '天气降温，存在大功率电器使用隐患，加强火灾防范宣传和风险巡查力度',
              id: 'f1ca5c3a3f97269dce12100b9dea2230',
              istate: '1',
              name: '气象预警',
            },
            {
              createTime: '2023-01-12 10:05:26',
              details: null,
              endTime: '2023-01-13 14:15:39',
              fxmsg: '火灾隐患',
              fxyz: '发现大功率取暖器',
              id: 'f1ca5c3a3f97269dce12100b9dea2231',
              istate: '1',
              name: '巡查上报',
            },
            {
              createTime: '2023-01-07 10:05:26',
              details: null,
              endTime: '2023-01-08 14:15:39',
              fxmsg: '本体',
              fxyz: '瓦片脱落',
              id: 'f1ca5c3a3f97269dce12100b9dea2232',
              istate: '1',
              name: '巡查上报',
            },
            {
              createTime: '2022-12-29 08:35:01',
              details: null,
              endTime: '2022-12-29 17:03:06',
              fxmsg: '物品堆放',
              fxyz: '易燃易爆物品堆放',
              id: 'f1ca5c3a3f97269dce12100b9dea2233',
              istate: '1',
              name: '智能感知',
            },
            {
              createTime: '2022-12-19 16:30:59',
              details: null,
              endTime: '2022-12-21 08:01:16',
              fxmsg: '灭火器',
              fxyz: '灭火器即将过期',
              id: 'f1ca5c3a3f97269dce12100b9dea2234',
              istate: '1',
              name: '巡查上报',
            },
            {
              createTime: '2022-12-12 09:01:10',
              details: null,
              endTime: '2022-12-12 14:10:09',
              fxmsg: '任务派发',
              fxyz: '发现易燃易爆物品堆放',
              id: 'f1ca5c3a3f97269dce12100b9dea2235',
              istate: '1',
              name: '气象预警',
            },
            {
              createTime: '2022-12-02 08:25:14',
              details: null,
              endTime: '2022-12-02 15:25:34',
              fxmsg: '本体',
              fxyz: '玻璃破损',
              id: 'f1ca5c3a3f97269dce12100b9dea2236',
              istate: '1',
              name: '巡查上报',
            }
          ];
        } else { */
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          pointId: this.$route.query.id,
        };
        listByBumpPointId(params).then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            res.data.data.list.forEach((ele) => {
              if (ele.details) {
                ele.detailRes = JSON.parse(ele.details);
              }
            });
            this.listData = res.data.data.list;
            this.total = res.data.data.total;
          }
        });
      }
    },
    fetchData() {
      if (this.$route.query && this.$route.query.id) {
        this.fetchList();
        equipFacilityInfoResourcesSelectInfoTotal({ bumpPointId: this.$route.query.id })
          .then((res) => {
            if (res && res.data && res.data.code && res.data.code == 200) {
              let shorter = res.data.data;
              if (shorter && shorter.length) {
                this.deviceTj_data[0].num = shorter[0].videoTotal || 0;
                this.deviceTj_data[1].num = shorter[0].smokeTotal || 0;
                this.deviceTj_data[3].num = shorter[0].waterGageTotal || 0;
                this.deviceTj_data[2].num = shorter[0].voltageTotal || 0;
              }
            }
          })
          .catch((err) => {
            console.log('err', err);
          });
        // getEquipmentCount({
        //   id: this.$route.query.id,
        // }).then((res) => {
        //   if (res && res.data && res.data.code == 200) {
        //     let shorter = res.data.data;
        //     let randomValue = Number.parseInt(140 * Math.random());
        //     this.arrowLeft = 180 + randomValue;
        //     /* if (shorter && shorter.iotPerceptionDeviceList) {
        //       let randomValue = Number.parseInt(140 * Math.random());
        //       if (shorter.iotPerceptionDeviceList.length) {
        //         let passLength = shorter.iotPerceptionDeviceList.filter((ele) => {
        //           return ele.deviceStatus == '在线';
        //         });
        //         let originPercent = passLength.length / shorter.iotPerceptionDeviceList.length;
        //         if (originPercent == 1) {
        //           this.arrowLeft = 320;
        //         } else {
        //           this.arrowLeft = 180 + randomValue;
        //         }
        //       } else {
        //         this.arrowLeft = 180 + randomValue;
        //       }
        //     } */
        //   }
        // });
      }
    },
    itemClick(index) {
      if (index == this.currentIndex) {
        this.currentIndex = -1;
      } else {
        this.currentIndex = index;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 95%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .part-1 {
    .btn {
      width: 80px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border: 1px solid #8ba4fe;
      background: #34478c;
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #8ba4fe;
      cursor: pointer;
    }
    .barOuter {
      margin: 0 auto;
      padding-top: 25px;
      width: 437px;
      //   height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
    }
    .barLeft {
      color: #dff7ff;
      font-size: 16px;
      font-family: PingFangSC-Regular;
    }
    .barRight {
      color: #dff7ff;
      font-size: 16px;
      font-family: PingFangSC-Regular;
    }
    //
    .process {
      width: 352px;
      height: 6px;
      //   background: url('../../../assets/img4/caihong.png') no-repeat center;
      background: url('../../../assets/img4/rainBow.png') no-repeat center;
      background-size: 100% 100%;
      position: relative;
      margin-left: 10px;
      margin-right: 10px;
      .text {
        width: 42px;
        height: 36px;
        background-color: #0c5a9c;
        // background: url('../../../assets/img4/sanjiao.png') no-repeat center;
        // background-size: 100% 100%;
        position: absolute;
        color: #9affff;
        font-size: 24px;
        top: -15px;
        text-align: center;
        display: flex;
        border: 2px solid #14abfb;
        justify-content: center;
        align-items: flex-end;
        box-sizing: border-box;
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-weight: normal;
        font-stretch: normal;
        line-height: 32px;
        transform: translateX(-50%);
      }
    }
    .device-tj {
      width: 100%;
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 30px;
      .item {
        width: 104px;
        height: 100%;
        cursor: pointer;
        padding-top: 5px;
        padding-bottom: 8px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        background: rgba(28, 74, 142, 0.45);
        img {
          width: 76px;
          height: 59px;
        }
        span:nth-child(2) {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 1px;
          color: #b7bedc;
        }
        span:nth-child(3) {
          font-family: DINPro-Medium;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 1px;
          color: #ffffff;
        }
      }
    }
  }
  .part-2 {
    .btn {
      width: 80px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border: 1px solid #8ba4fe;
      background: #34478c;
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #8ba4fe;
      cursor: pointer;
    }
    .list {
      width: 100%;
      height: 530px;
      margin-bottom: 15px;
      overflow: hidden;
      //   display: flex;
      //   flex-direction: column;
      //   align-items: center;
      .listInner {
        height: 490px;
        overflow: auto;
      }
      .item {
        // width: 445px;
        width: 100%;
        min-height: 52px;
        margin: 2px 0;
        // padding-left: 12px;
        // padding-right: 12px;
        box-sizing: border-box;
        // background-color: #6f90fe37;
        // border-bottom: 2px solid #6f90fe;
        // display: flex;
        // flex-direction: column;
        // justify-content: space-around;
        // align-items: center;
        .info-box {
          box-sizing: border-box;
          padding-left: 10px;
          padding-right: 10px;
          width: 100%;
          height: 52px;
          background-color: #6f90fe37;
          display: flex;
          //   justify-content: space-around;
          justify-content: space-between;
          align-items: center;
          .name {
            min-width: 90px;
            padding-left: 10px;
            padding-right: 10px;
            height: 30px;
            box-sizing: border-box;
            border: 1px solid #5366b2;
            transform: skewX(-20deg);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;
            span {
              display: inline-block;
              white-space: nowrap;
              transform: skewX(30deg);
              font-family: PingFangSC-Regular;
              font-size: 16px;
              font-weight: normal;
              font-style: italic;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #a2b0e9;
            }
          }
          .info {
            width: 130px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            span:nth-child(1) {
              font-family: SourceHanSansCN-Regular;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #a8b0d0;
            }
            span:nth-child(2) {
              font-family: SourceHanSansCN-Regular;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #ffffff;
              width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
            }
          }
          .btn-l {
            width: 72px;
            height: 30px;
            background: url('../../../assets/img4/more-btn.png') no-repeat center;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 5;
            span {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #a8b0d0;
              margin-right: 2px;
            }
            img {
              width: 14px;
              height: 7px;
              transition: transform 200ms;
            }
            .open {
              transform: rotateZ(-180deg);
            }
          }
        }
        .detail-info {
          width: 100%;
          //   height: 380px;
          height: auto;
          //   background: rgba(28, 43, 99, 0.45);
          .time-line {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            // height: 215px;
            overflow: auto;
            // background: red;
            .el-timeline {
              margin-top: 30px;
              padding-left: 5px;
              .el-timeline-item {
                height: 110px;
                &:nth-last-child(1) {
                  height: 60px;
                }
                .content {
                  width: 410px;
                  height: 100px;
                  position: relative;
                  top: -20px;
                  .system {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-bottom: 10px;
                    // width: 410px;
                    width: 400px;
                    justify-content: space-between;

                    span:nth-child(1) {
                      font-family: MicrosoftYaHei;
                      font-size: 16px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #ffe6e1;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: auto;
                      height: 34px;
                      border-radius: 17px;
                      border: 1px solid #9672bb;
                      background-color: #9672bb1c;
                      box-sizing: border-box;
                      padding: 0 15px;
                    }
                    span:nth-child(2) {
                      font-family: DINPro-Medium;
                      font-size: 18px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #a8b0d0;
                      margin-left: 10px;
                    }
                  }
                  .qzzx {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-bottom: 10px;
                    width: 400px;
                    justify-content: space-between;

                    span:nth-child(1) {
                      font-family: MicrosoftYaHei;
                      font-size: 16px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #ffe6e1;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 100px;
                      height: 34px;
                      border-radius: 17px;
                      border: 1px solid #9672bb;
                      background-color: #9672bb1c;
                    }
                    span:nth-child(2) {
                      font-family: DINPro-Medium;
                      font-size: 18px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #a8b0d0;
                      margin-left: 10px;
                    }
                  }
                  .street {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-bottom: 10px;
                    width: 400px;
                    justify-content: space-between;

                    span:nth-child(1) {
                      font-family: MicrosoftYaHei;
                      font-size: 16px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #ffe6e1;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 100px;
                      height: 34px;
                      border-radius: 17px;
                      border: 1px solid #9672bb;
                      background-color: #9672bb1c;
                    }
                    span:nth-child(2) {
                      font-family: DINPro-Medium;
                      font-size: 18px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #a8b0d0;
                      margin-left: 10px;
                    }
                  }
                  .info {
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #a8b0d0;
                  }
                }
              }
            }
          }
          .czyj {
            width: 100%;
            height: 150px;
            overflow: auto;
            .title {
              margin-top: 10px;
              width: 100%;
              height: 24px;
              background: rgba(111, 144, 254, 0.37);
              display: flex;
              align-items: center;
              font-family: AdobeHeitiStd-Regular;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #47fff0;
              box-sizing: border-box;
              padding-left: 10px;
            }
            .row {
              box-sizing: border-box;
              padding: 0 10px;
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              .text {
                width: 250px;
                max-height: 40px;
                font-family: AdobeHeitiStd-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #a8b0d0;
              }
              .btn-p {
                width: 82px;
                height: 24px;
              }
            }
            .problem {
              margin: 10px 0;
              span {
                font-family: AdobeHeitiStd-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #e5a35d;
              }
              .btn-p {
                background: url('../../../assets/img4/xianchangtu.png') no-repeat center;
                background-size: 100% 100%;
              }
            }
            .ruler {
              span {
                font-family: AdobeHeitiStd-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #4baac2;
              }
              //   .btn-p {
              //     background: url('../../../assets/img4/xiangqing2.png') no-repeat center;
              //     background-size: 100% 100%;
              //   }
              .btn-p {
                background: url('../../../assets/img4/xianchangtu.png') no-repeat center;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
      .attention {
        background-color: rgba(75, 60, 60, 0.5);
        .nameLeft {
          border: 1px solid #e5a35d;
          span {
            color: #e5a35d;
          }
        }
        .info-box {
          background-color: rgba(119, 90, 70, 0.6);
          border-bottom: 2px solid #e5a35d;
          .btn-l {
            background: url('../../../assets/img4/3951673858473_.pic.jpg') no-repeat center;
            span {
              color: #fff;
            }
          }
        }
      }
    }
    .infoLeftCon {
      width: 230px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .nameLeft {
        width: 90px;
        padding-left: 10px;
        padding-right: 10px;
        height: 30px;
        box-sizing: border-box;
        border: 1px solid #5366b2;
        transform: skewX(-20deg);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        span {
          display: inline-block;
          white-space: nowrap;
          transform: skewX(30deg);
          font-family: PingFangSC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-style: italic;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #a2b0e9;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
      }
      .infoLeft {
        width: 130px;
        height: 100%;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        span:nth-child(1) {
          font-family: SourceHanSansCN-Regular;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #a8b0d0;
        }
        span:nth-child(2) {
          font-family: SourceHanSansCN-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
      }
    }
  }
}
.emptyCon {
  color: #b7bedc;
  font-size: 14px;
  margin-top: 130px;
  text-align: center;
}
.pagination {
  text-align: center;
}
</style>
