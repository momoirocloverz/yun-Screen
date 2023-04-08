<template>
  <div class="yxzsDetailsLeftCon">
    <!-- <Box :height="'460px'" :bgSrc="require('../../../assets/yxzsDetail/box1-bg.png')"> -->
    <Box :height="'530px'" :bgSrc="require('../../../assets/yxzsDetail/box1-bg.png')">
      <Title :text="'预警指数'"></Title>
      <div class="countArea">
        <div class="countFirst">
          <div class="countFirLeftImg"></div>
          <div class="countFirRight">
            <div class="countFirRiText">综合指数</div>
            <div class="countFirRiSecText">
              <span><countTo :startVal="startVal" :endVal="masterValue" :duration="3000"></countTo></span><span>分</span>
            </div>
          </div>
        </div>
        <div class="countSecondCon">
          <div class="countSecFir countCommon">
            <div class="countSecFiImg"></div>
            <div class="countSecFiRight">
              <div class="countFirRiText">人防</div>
              <div class="countFirRiSecText">
                <span><countTo :startVal="startVal" :endVal="peopleValue" :duration="3000"></countTo></span><span>分</span>
              </div>
            </div>
          </div>
          <div class="countSecSec countCommon">
            <div class="countSecSeImg"></div>
            <div class="countSecSeRight">
              <div class="countFirRiText">物防</div>
              <div class="countFirRiSecText">
                <span><countTo :startVal="startVal" :endVal="materialValue" :duration="3000"></countTo></span><span>分</span>
              </div>
            </div>
          </div>
          <div class="countSecThird countCommon">
            <div class="countSecThImg"></div>
            <div class="countSecThRight">
              <div class="countFirRiText">智防</div>
              <div class="countFirRiSecText">
                <span><countTo :startVal="startVal" :endVal="skillValue" :duration="3000"></countTo></span><span>分</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pointTopCon">
          <div class="pointTopLeft" @click="popBody">
            <div class="pointTopLeImg"></div>
            <div class="pointTopLeRight">
              <div class="pointTopLeRiText">本体</div>
              <div class="pointTopLeRiSecText">
                <span><countTo :startVal="startVal" :endVal="firstValue" :duration="3000"></countTo></span><span>分</span>
              </div>
            </div>
          </div>
          <div class="pointTopRight" @click="popEnvir">
            <div class="pointTopRiImg"></div>
            <div class="pointTopLeRight">
              <div class="pointTopLeRiText">环境</div>
              <div class="pointTopLeRiSecText">
                <span><countTo :startVal="startVal" :endVal="secondValue" :duration="3000"></countTo></span><span>分</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="statisticsCon">
        <div class="statisticsLeft">
          <div class="chartCenterCon">
            <span><countTo :startVal="startVal" :endVal="totalValue" :duration="3000"></countTo></span><span>分</span>
          </div>
          <pieChart :data="statisticsArray" :logo="updateTrigger" />
        </div>
        <div class="statisticsRight">
          <template v-for="(item, index) in statisticsArray">
            <div class="statisticsItem" :key="index" :class="[riskActive == index ? 'riskActive' : '']">
              <div class="statisticsDot" :style="{ backgroundColor: item.color }"></div>
              <div class="statisticsTitle">{{ item.name }}</div>
              <div class="statisticsCount">{{ item.value }}</div>
            </div>
          </template>
        </div>
      </div>
    </Box>
    <Box :height="'396px'" :bgSrc="require('../../../assets/yxzsDetail/box2-bg.png')">
      <!-- <Box :height="'466px'" :bgSrc="require('../../../assets/yxzsDetail/box2-bg.png')"> -->
      <Title :text="'重点事项'"></Title>
      <!-- <div class="pointTopCon">
        <div class="pointTopLeft" @click="popBody">
          <div class="pointTopLeImg"></div>
          <div class="pointTopLeRight">
            <div class="pointTopLeRiText">本体</div>
            <div class="pointTopLeRiSecText">
              <span><countTo :startVal="startVal" :endVal="firstValue" :duration="3000"></countTo></span><span>分</span>
            </div>
          </div>
        </div>
        <div class="pointTopRight" @click="popEnvir">
          <div class="pointTopRiImg"></div>
          <div class="pointTopLeRight">
            <div class="pointTopLeRiText">环境</div>
            <div class="pointTopLeRiSecText">
              <span><countTo :startVal="startVal" :endVal="secondValue" :duration="3000"></countTo></span><span>分</span>
            </div>
          </div>
        </div>
      </div> -->
      <div class="pointBottomCon">
        <table border="0" cellpadding="0" cellspacing="0">
          <tbody>
            <tr class="firstRow">
              <td class="tableRowFirst"></td>
              <td class="tableRowSecond">发生事项</td>
              <td class="tableRowThird">分值</td>
            </tr>
            <template v-for="(item, index) in pointArray">
              <tr :key="index" class="notActiveTableRow" :class="activeIndex == index ? 'goldActive' : ''" @click="switchActive(index)">
                <td class="tableRowDataFir">
                  <div class="fakeImg" :style="{ backgroundImage: 'url(' + item.img + ')' }"></div>
                </td>
                <td class="tableRowDataSec">{{ item.name }}</td>
                <td class="tableRowDataThi"><countTo :startVal="startVal" :endVal="item.value" :duration="3000"></countTo></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </Box>
    <bodyModal
      :isShow="showBodyM"
      @close="
        () => {
          this.showBodyM = false;
        }
      "
    ></bodyModal>
    <environmentModal
      :isShow="showEnvironmentM"
      @close="
        () => {
          this.showEnvironmentM = false;
        }
      "
    ></environmentModal>
  </div>
</template>
<script>
import Box from '../components/box';
import Title from '../components/title';
import pieChart from './components/pieChart';
import countTo from 'vue-count-to';
import { getKeyIssuesCount, get_yjzs_data, screenV3getZdsx } from '@/api/xsApi3';
import { eventBus } from '@/main';
export default {
  components: {
    Box,
    Title,
    pieChart,
    countTo,
    bodyModal: () => import(/* webpackChunkName: "yxzsDetailbodyModal" */ './components/bodyModal'),
    environmentModal: () => import(/* webpackChunkName: "yxzsDetailenvironmentModal" */ './components/environmentModal'),
  },
  data() {
    return {
      riskActive: 0,
      showBodyM: false,
      showEnvironmentM: false,
      startVal: 0,
      totalValue: 0,
      peopleValue: 0,
      materialValue: 0,
      skillValue: 0,
      masterValue: 0,
      statisticsArray: [
        { name: '人防', value: 0, color: '#41c2ae' },
        { name: '物防', value: 0, color: '#256cdf' },
        { name: '智防', value: 0, color: '#37dcfb' },
        { name: '本体', value: 0, color: '#3bbafc' },
        { name: '环境', value: 0, color: '#7580f5' },
      ],
      firstValue: 0,
      secondValue: 0,
      updateTrigger: 1,
      pointArray: [
        { name: '消防设备异常', value: 0, img: require('../../../assets/yxzsDetail/t-icon1.png') },
        { name: '违规用火', value: 0, img: require('../../../assets/yxzsDetail/t-icon2.png') },
        { name: '易燃易爆物品堆放', value: 0, img: require('../../../assets/yxzsDetail/t-icon3.png') },
        { name: '烟感设备预警', value: 0, img: require('../../../assets/yxzsDetail/t-icon4.png') },
        { name: '水电设备报警', value: 0, img: require('../../../assets/yxzsDetail/t-icon5.png') },
      ],
      activeIndex: 0,
    };
  },
  watch: {
    $route(nval, val) {
      if (nval && nval.query && nval.query.id) {
        this.fetchData();
        this._get_yjzs_data();
      }
    },
  },
  mounted() {
    this._get_yjzs_data();
    this.fetchData();
    this.pieWatch();
  },
  methods: {
    _get_yjzs_data() {
      get_yjzs_data(this.$route.query.id).then((res) => {
        // console.log('预警指数', res.data.data);
        let info = res.data.data;
        if (info) {
          this.masterValue = info.zf;
          this.peopleValue = info.rff;
          this.materialValue = info.wff;
          this.skillValue = info.zff;
          this.firstValue = info.btf;
          this.secondValue = info.hjf;
          this.totalValue = info.zf;
          this.statisticsArray[0].value = info.rff;
          this.statisticsArray[1].value = info.wff;
          this.statisticsArray[2].value = info.zff;
          this.statisticsArray[3].value = info.btf;
          this.statisticsArray[4].value = info.hjf;
          this.updateTrigger++;
        } else {
          this.masterValue = 0;
          this.peopleValue = 0;
          this.materialValue = 0;
          this.skillValue = 0;
          this.firstValue = 0;
          this.secondValue = 0;
          this.totalValue = 0;
          this.statisticsArray[0].value = 0;
          this.statisticsArray[1].value = 0;
          this.statisticsArray[2].value = 0;
          this.statisticsArray[3].value = 0;
          this.statisticsArray[4].value = 0;
          this.updateTrigger++;
        }
      });
    },
    pieWatch() {
      eventBus.$on('yxzsDetailLeftPie', (msg) => {
        if (!this.beClicked) {
          if (msg == 0) {
            this.riskActive = 4;
          } else {
            this.riskActive = msg - 1;
          }
        }
      });
    },
    popEnvir() {
      this.showEnvironmentM = true;
    },
    popBody() {
      this.showBodyM = true;
    },
    fetchData() {
      screenV3getZdsx({ id: this.$route.query.id }).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          //   console.log('shorter', shorter);
          this.pointArray[0].value = 0;
          this.pointArray[1].value = 0;
          this.pointArray[2].value = 0;
          this.pointArray[3].value = 0;
          this.pointArray[4].value = 0;
          if (shorter) {
            let track1 = shorter.find((ele) => {
              return ele.reportName == '消防设备异常';
            });
            if (track1) {
              this.pointArray[0].value = +track1.reportNum1;
            }
            let track2 = shorter.find((ele) => {
              return ele.reportName == '违规用火';
            });
            if (track2) {
              this.pointArray[1].value = +track2.reportNum1;
            }
            let track3 = shorter.find((ele) => {
              return ele.reportName == '易燃易爆物品堆放';
            });
            if (track3) {
              this.pointArray[2].value = +track3.reportNum1;
            }
            let track4 = shorter.find((ele) => {
              return ele.reportName == '烟感设备预警';
            });
            if (track4) {
              this.pointArray[3].value = +track4.reportNum1;
            }
            let track5 = shorter.find((ele) => {
              return ele.reportName == '水电设备报警';
            });
            if (track5) {
              this.pointArray[4].value = +track5.reportNum1;
            }
          }
        }
      });
    },
    switchActive(index) {
      this.activeIndex = index;
    },
  },
};
</script>
<style lang="less" scoped>
.yxzsDetailsLeftCon {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.countArea {
  margin-top: 7px;
}
.countFirst {
  width: 460px;
  height: 70px;
  background-image: url(../../../assets/yxzsDetail/t-box1.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding-top: 3px;
  box-sizing: border-box;
  .countFirLeftImg {
    width: 45px;
    height: 45px;
    background-image: url(../../../assets/yxzsDetail/icon1.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .countFirRight {
    padding-top: 8px;
    box-sizing: border-box;
  }
}
.countFirRiText {
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  letter-spacing: 0px;
  color: #bfc8d7;
  margin-bottom: 6px;
}
.countFirRiSecText {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  align-content: center;
  span:nth-child(1) {
    font-family: DINPro-Bold;
    font-size: 26px;
    letter-spacing: 1px;
    color: #ffffff;
    height: 20px;
    line-height: 20px;
    margin-right: 3px;
  }
  span:nth-child(2) {
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    letter-spacing: 0px;
    color: #ffffff;
    box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.19);
    opacity: 0.6;
  }
}
.countSecondCon {
  width: 460px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin: 0 auto;
  margin-top: 10px;
  .countCommon {
    width: 150px;
    height: 70px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
  }
  .countSecFir {
    background-image: url(../../../assets/yxzsDetail/t-box2.png);
  }
  .countSecFiImg {
    width: 45px;
    height: 45px;
    background-image: url(../../../assets/yxzsDetail/icon2.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-left: 5px;
  }
  .countSecFiRight {
    padding-top: 8px;
    box-sizing: border-box;
  }
  .countSecSec {
    background-image: url(../../../assets/yxzsDetail/t-box3.png);
  }
  .countSecSeImg {
    width: 45px;
    height: 45px;
    margin-left: 5px;
    background-image: url(../../../assets/yxzsDetail/icon3.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .countSecSeRight {
    padding-top: 8px;
    box-sizing: border-box;
  }
  .countSecThird {
    background-image: url(../../../assets/yxzsDetail/t-box4.png);
  }
  .countSecThImg {
    width: 45px;
    height: 45px;
    margin-left: 5px;
    background-image: url(../../../assets/yxzsDetail/icon4.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .countSecThRight {
    padding-top: 8px;
    box-sizing: border-box;
  }
}
.statisticsCon {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  .statisticsLeft {
    width: 200px;
    height: 200px;
    position: relative;
    .chartCenterCon {
      position: absolute;
      //   z-index: -1;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;

      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      span:nth-child(1) {
        height: 28px;
        font-family: DINPro-Bold;
        font-size: 30px;
        line-height: 28px;
        letter-spacing: 2px;
        color: #eceff4;
      }
      span:nth-child(2) {
        height: 14px;
        font-family: SourceHanSansCN-Regular;
        font-size: 14px;
        line-height: 14px;
        letter-spacing: 1px;
        color: #eceff4;
      }
    }
  }
  .statisticsRight {
  }
  .statisticsItem {
    width: 190px;
    height: 30px;
    border: 1px solid transparent;
    box-sizing: border-box;
    background-image: url(../../../assets/yxzsDetail/p-bg.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-bottom: 4px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    padding-left: 13px;
    box-sizing: border-box;
    &:last-child {
      margin-bottom: 0;
    }
    .statisticsDot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
    }
    .statisticsTitle {
      font-size: 14px;
      color: rgb(210, 210, 210);
      opacity: 0.6;
      font-family: MicrosoftYaHei;
      letter-spacing: 0;
      line-height: 14px;
      height: 14px;
      width: 56px;
      margin-left: 23px;
      margin-right: 42px;
    }
    .statisticsCount {
      font-family: DINPro-Medium;
      font-size: 18px;
      letter-spacing: 0px;
      color: rgb(210, 210, 210);
      opacity: 0.6;
      line-height: 16px;
      height: 16px;
    }
  }
  .riskActive {
    border: 1px solid #ffe082;
    background-image: linear-gradient(45deg, rgba(253, 133, 47, 0.1) 0%, rgba(254, 205, 61, 0.3) 100%);
    .statisticsTitle {
      opacity: 1;
      color: #fff;
      font-weight: 500 !important;
    }
    .statisticsCount {
      opacity: 1;
      color: #fff;
      font-weight: 500 !important;
    }
  }
}
.pointTopCon {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 10px;
}
.pointTopLeft {
  width: 225px;
  height: 70px;
  cursor: pointer;
  background-image: url(../../../assets/yxzsDetail/t-box5.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-right: 8px;
  padding-left: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
}
.pointTopRight {
  width: 225px;
  height: 70px;
  cursor: pointer;
  background-image: url(../../../assets/yxzsDetail/t-box6.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  padding-left: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
}
.pointTopLeImg {
  width: 48px;
  height: 48px;
  background-image: url(../../../assets/yxzsDetail/icon5.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-right: 10px;
}
.pointTopLeRight {
  padding-top: 8px;
  box-sizing: border-box;
}
.pointTopLeRiText {
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  letter-spacing: 0px;
  color: #bfc8d7;
  margin-bottom: 6px;
}
.pointTopLeRiSecText {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  align-content: center;
  span:nth-child(1) {
    font-family: DINPro-Bold;
    font-size: 26px;
    letter-spacing: 1px;
    color: #ffffff;
    height: 20px;
    line-height: 20px;
    margin-right: 3px;
  }
  span:nth-child(2) {
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    letter-spacing: 0px;
    color: #ffffff;
    box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.19);
    opacity: 0.6;
  }
}
.pointTopRiImg {
  width: 48px;
  height: 48px;
  background-image: url(../../../assets/yxzsDetail/icon6.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-right: 10px;
}
.pointTopRiRight {
}
.pointBottomCon {
  width: 455px;
  color: #fff;
  margin: 0 auto;
  .tableRowFirst {
    width: 62px;
  }
  .tableRowSecond {
    width: 278px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .tableRowThird {
    width: 111px;
    text-align: center;
  }
}
.firstRow {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  letter-spacing: 0px;
  color: #bfc8d7;
  td {
    padding-top: 30px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
}
.tableRowDataFir {
  position: absolute;
  box-sizing: border-box;
  padding-left: 13px;
}
.tableRowDataSec {
  border-left: 2px solid #3b4a7f;
  border-right: 2px solid #3b4a7f;
  box-sizing: border-box;
  padding-left: 17px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 14px;
  letter-spacing: 0px;
  color: #ffffff;
}
.goldActive {
  .tableRowDataSec {
    border-color: transparent !important;
  }
}
.tableRowDataThi {
  text-align: center;
  font-family: DINPro-Medium;
  font-size: 24px;
  line-height: 14px;
  letter-spacing: 1px;
  color: #53ffe3;
}
.fakeImg {
  width: 44px;
  height: 44px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
}
.notActiveTableRow {
  width: 465px;
  height: 47px;
  background-image: url(../../../assets/yxzsDetail/tab-bg1copy.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
}
.goldActive {
  position: relative;
  background-image: url(../../../assets/yxzsDetail/tab-bg-scopy.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 98% 100%;
  &::before {
    position: absolute;
    content: '';
    left: -5px;
    top: 1px;
    width: 6px;
    height: 45px;
    background-image: linear-gradient(0deg, #fd852f 0%, #fecd3d 100%);
  }
}
</style>
<style lang="less"></style>
