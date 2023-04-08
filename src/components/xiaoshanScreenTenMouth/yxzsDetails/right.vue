<template>
  <div class="yxzsDetailsRightCon">
    <Box :height="'309px'" :bgSrc="require('../../../assets/yxzs/yx-box-bg.png')">
      <Title :text="'火灾防护-人防'"></Title>
      <div class="peopleCon">
        <div class="gradientOneBack">
          <div class="holderImg"></div>
          <div class="gradientText">
            <span class="gradientTeFir">动态指数</span>
            <span class="gradientTeSec"><countTo :startVal="startVal" :endVal="dynamicTotal1" :duration="3000"></countTo></span>
            <span class="gradientTeThi">分</span>
          </div>
        </div>
        <div class="blockCon">
          <template v-for="(item, index) in peopleArray">
            <div :key="index" class="commonBlockItem" :class="[peopleActive == index ? 'activeItem' : '']" @click="switchPeople(index)">
              <div class="itemText">{{ item.text }}</div>
              <div class="itemValue">
                <span><countTo :startVal="startVal" :endVal="item.value" :duration="3000"></countTo></span><span>{{ item.unit }}</span>
              </div>
              <div class="fakeWatermark" :style="{ backgroundImage: 'url(' + item.img + ')' }"></div>
            </div>
          </template>
        </div>
        <div class="peopleChartOuter">
          <div class="pointOuter">
            <div class="pointSelf"></div>
            <div class="pointText">动态分值趋势变化</div>
          </div>
          <div class="peopleChartCon">
            <peopleChart :data="peopleData" :logo="triggerNumber1" />
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'309px'" :bgSrc="require('../../../assets/yxzs/yx-box-bg.png')">
      <Title :text="'火灾防护-物防'"></Title>
      <div class="materialCon">
        <div class="gradientOneBack">
          <div class="holderImg"></div>
          <div class="gradientText">
            <span class="gradientTeFir">动态指数</span>
            <span class="gradientTeSec"><countTo :startVal="startVal2" :endVal="dynamicTotal2" :duration="3000"></countTo></span>
            <span class="gradientTeThi">分</span>
          </div>
        </div>
        <div class="blockCon">
          <template v-for="(item, index) in materialArray">
            <div :key="index" class="commonBlockItem" :class="[materialActive == index ? 'activeItem' : '']" @click="switchMaterial(index)">
              <div class="itemText">{{ item.text }}</div>
              <div class="itemValue">
                <span><countTo :startVal="startVal2" :endVal="item.value" :duration="3000"></countTo></span><span>{{ item.unit }}</span>
              </div>
              <div class="fakeWatermark" :style="{ backgroundImage: 'url(' + item.img + ')' }"></div>
            </div>
          </template>
        </div>
        <div class="peopleChartOuter">
          <div class="pointOuter">
            <div class="pointSelf"></div>
            <div class="pointText">动态分值趋势变化</div>
          </div>
          <div class="peopleChartCon">
            <materialChart :data="materialData" :logo="triggerNumber2" />
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'309px'" :bgSrc="require('../../../assets/yxzs/yx-box-bg.png')">
      <Title :text="'火灾防护-智防'"></Title>
      <div class="skillCon">
        <div class="gradientOneBack">
          <div class="holderImg"></div>
          <div class="gradientText">
            <span class="gradientTeFir">动态指数</span>
            <span class="gradientTeSec"><countTo :startVal="startVal3" :endVal="dynamicTotal3" :duration="3000"></countTo></span>
            <span class="gradientTeThi">分</span>
          </div>
        </div>
        <div class="blockCon">
          <template v-for="(item, index) in skillArray">
            <div :key="index" class="commonBlockItem" :class="[skillActive == index ? 'activeItem' : '']" @click="switchSkill(index)">
              <div class="itemText">{{ item.text }}</div>
              <div class="itemValue">
                <span><countTo :startVal="startVal3" :endVal="item.value" :duration="3000"></countTo></span><span>{{ item.unit }}</span>
              </div>
              <div class="fakeWatermark" :style="{ backgroundImage: 'url(' + item.img + ')' }"></div>
            </div>
          </template>
        </div>
        <div class="peopleChartOuter">
          <div class="pointOuter">
            <div class="pointSelf"></div>
            <div class="pointText">动态分值趋势变化</div>
          </div>
          <div class="peopleChartCon">
            <skillChart :data="skillData" :logo="triggerNumber3" />
          </div>
        </div>
      </div>
    </Box>
    <humanModal
      :isShow="showHumanM"
      :currentType="humanType"
      :currentCount="humanCount"
      @close="
        () => {
          this.showHumanM = false;
        }
      "
    ></humanModal>
    <materialModal
      :isShow="showMaterialM"
      :currentType="humanType"
      :currentCount="humanCount"
      @close="
        () => {
          this.showMaterialM = false;
        }
      "
    ></materialModal>
    <smartModal
      :isShow="showSmartM"
      :currentType="humanType"
      :currentCount="humanCount"
      @close="
        () => {
          this.showSmartM = false;
        }
      "
    ></smartModal>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import Box from '../components/box';
import Title from '../components/title';
import countTo from 'vue-count-to';
import peopleChart from '../yxzs/newComponents/peopleChart.vue';
import materialChart from '../yxzs/newComponents/materialChart';
import skillChart from '../yxzs/newComponents/skillChart';
import {
  get_yxzs_data,
  get_yxzs_line_data,
  screenBaseCheckFireProtectionCount,
  administrationAddCulturalCount,
  get_WF_tj_data,
  get_ZF_tj_data,
} from '../../../api/xsApi3';
export default {
  components: {
    Box,
    Title,
    peopleChart,
    materialChart,
    skillChart,
    countTo,
    humanModal: () => import(/* webpackChunkName: "yxzshumanModal" */ './components/humanModal.vue'),
    materialModal: () => import(/* webpackChunkName: "yxzsmaterialModal" */ './components/materialModal.vue'),
    smartModal: () => import(/* webpackChunkName: "yxzssmartModal" */ './components/smartModal.vue'),
  },
  data() {
    return {
      humanType: '',
      humanCount: '',
      showHumanM: false,
      showMaterialM: false,
      showSmartM: false,
      startVal: 0,
      startVal2: 0,
      startVal3: 0,
      dynamicTotal1: 0,
      dynamicTotal2: 0,
      dynamicTotal3: 0,
      triggerNumber1: 0,
      triggerNumber2: 0,
      triggerNumber3: 0,
      peopleArray: [
        { text: '巡查任务', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon1.png'), unit: '次' },
        { text: '培训任务', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon2.png'), unit: '次' },
        { text: '处置事件', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon3.png'), unit: '次' },
        { text: '人员组织', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon4.png'), unit: '人' },
      ],
      peopleActive: 0,
      peopleData: [
        { value: 0, date: '01-01' },
        { value: 0, date: '01-02' },
        { value: 0, date: '01-03' },
        { value: 0, date: '01-04' },
        { value: 0, date: '01-05' },
      ],
      materialArray: [
        { text: '灭火器', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon5.png'), unit: '件' },
        { text: '消防栓', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon6.png'), unit: '件' },
        { text: '消防水缸', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon7.png'), unit: '条' },
        { text: '其他', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon8.png'), unit: '个' },
      ],
      materialActive: 0,
      materialData: [
        { value: 0, date: '01-01' },
        { value: 0, date: '01-02' },
        { value: 0, date: '01-03' },
        { value: 0, date: '01-04' },
        { value: 0, date: '01-05' },
      ],
      skillArray: [
        { text: '视频监测', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon9.png'), unit: '个' },
        { text: '电流监测', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon10.png'), unit: '个' },
        { text: '水压监测', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon11.png'), unit: '个' },
        { text: '烟感监测', value: '0', img: require('../../../assets/yxzsDetail/r-t-icon12.png'), unit: '个' },
      ],
      skillActive: 0,
      skillData: [
        { value: 0, date: '01-01' },
        { value: 0, date: '01-02' },
        { value: 0, date: '01-03' },
        { value: 0, date: '01-04' },
        { value: 0, date: '01-05' },
      ],
    };
  },
  watch: {
    $route(nval, val) {
      if (nval && nval.query && nval.query.id) {
        this.fetchData();
      }
      if (nval && nval.query && nval.query.zjmc) {
        this.fetchData();
      }
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    _get_yxzs_data() {
      get_yxzs_data().then((res) => {
        // console.log('永兴指数',res.data)
        this.dynamicTotal1 = res.data.data.rff;
        this.dynamicTotal2 = res.data.data.wff;
        this.dynamicTotal3 = res.data.data.zff;
      });
    },
    _get_yxzs_line_data() {
      this.peopleData = [];
      this.materialData = [];
      this.skillData = [];
      let params = {
        bumpPointId: this.$route.query.id ? this.$route.query.id : '',
      };
      get_yxzs_line_data(params).then((res) => {
        // console.log('动态趋势',res.data)
        res.data.data.map((item) => {
          let obj1 = {
            date: item.reportDay,
            value: item.rff,
          };
          let obj2 = {
            date: item.reportDay,
            value: item.wff,
          };
          let obj3 = {
            date: item.reportDay,
            value: item.zff,
          };
          this.peopleData.push(obj1);
          this.materialData.push(obj2);
          this.skillData.push(obj3);
          this.triggerNumber1 += 1;
          this.triggerNumber2 += 1;
          this.triggerNumber3 += 1;
        });
      });
    },
    // 获取物防四个统计数据
    _get_WF_tj_data() {
      let params = {
        bumpPointId: this.$route.query.id ? this.$route.query.id : '',
      };
      get_WF_tj_data(params).then((res) => {
        // console.log('物防统计数据', res.data);
        let resData = res.data.data;
        if (resData) {
          this.materialArray[0].value = resData.reportNum1 * 1;
          this.materialArray[1].value = resData.reportNum2 * 1;
          this.materialArray[2].value = resData.reportNum3 * 1;
          this.materialArray[3].value = resData.reportNum4 * 1;
        }
      });
    },
    // 获取智防四个统计数据
    _get_ZF_tj_data() {
      let params = {
        bumpPointId: this.$route.query.id ? this.$route.query.id : '',
      };
      get_ZF_tj_data(params).then((res) => {
        // console.log('智防统计数据', res.data);
        let resData = res.data.data[0];
        this.skillArray[0].value = resData.reportNum1 * 1;
        this.skillArray[1].value = resData.reportNum2 * 1;
        this.skillArray[2].value = resData.reportNum3 * 1;
        this.skillArray[3].value = resData.reportNum4 * 1;
      });
    },
    fetchHuman() {
      let data = {};
      if (this.$route.query.id) {
        data.pointId = this.$route.query.id;
      }
      if (this.$route.query.zjmc) {
        data.zjmc = this.$route.query.zjmc;
      }
      administrationAddCulturalCount(data)
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter) {
              this.peopleArray[3].value = +shorter;
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
      screenBaseCheckFireProtectionCount({
        ...data,
        checkType: 3,
      })
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter) {
              this.peopleArray[0].value = +shorter;
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
      screenBaseCheckFireProtectionCount({
        ...data,
        checkType: 50,
      })
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter) {
              this.peopleArray[2].value = +shorter;
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    fetchData() {
      this.fetchHuman();
      this._get_yxzs_data();
      this._get_yxzs_line_data();
      this._get_WF_tj_data();
      this._get_ZF_tj_data();
    },
    switchPeople(value) {
      this.peopleActive = value;
      this.humanType = this.peopleArray[value].text;
      this.humanCount = this.peopleArray[value].value;
      this.showHumanM = true;
    },
    switchMaterial(value) {
      this.materialActive = value;
      this.humanType = this.materialArray[value].text;
      this.humanCount = this.materialArray[value].value;
      this.showMaterialM = true;
    },
    switchSkill(value) {
      this.skillActive = value;
      this.humanType = this.skillArray[value].text;
      this.humanCount = this.skillArray[value].value;
      this.showSmartM = true;
    },
  },
};
</script>
<style lang="less" scoped>
.yxzsDetailsRightCon {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.peopleCon {
  width: 460px;
  margin: 0 auto;
  margin-top: 4px;
}
.materialCon {
  width: 460px;
  margin: 0 auto;
  margin-top: 4px;
}
.skillCon {
  width: 460px;
  margin: 0 auto;
  margin-top: 4px;
}
.commonBlockItem {
  width: 110px;
  height: 54px;
  background-image: url(../../../assets/yxzsDetail/r-txt-bg.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  cursor: pointer;
  padding-top: 8px;
  box-sizing: border-box;
  position: relative;
}
.activeItem {
  background-image: url(../../../assets/yxzsDetail/r-txt-bg-s.png);
}
.itemText {
  line-height: 14px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  letter-spacing: 0px;
  color: #bfc8d7;
  text-align: center;
}
.fakeWatermark {
  position: absolute;
  width: 30px;
  height: 25px;
  right: 0;
  bottom: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
}
.itemValue {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 3px;
  span:nth-child(1) {
    font-family: DINPro-Medium;
    font-size: 26px;
    height: 20px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #fefefe;
    margin-right: 2px;
  }
  span:nth-child(2) {
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    height: 12px;
    line-height: 12px;
    letter-spacing: 0px;
    color: #ffffff;
    box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.19);
    opacity: 0.6;
  }
}
.blockCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-top: 5px;
}
.gradientOneBack {
  width: 436px;
  height: 38px;
  background-image: url(../../../assets/yxzsDetail/s-t-bg2.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  padding-left: 7px;
  box-sizing: border-box;
  .holderImg {
    width: 31px;
    height: 31px;
    background-image: url(../../../assets/yxzsDetail/s-t-icon1.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-right: 23px;
  }
  .gradientText {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .gradientTeFir {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .gradientTeSec {
      font-family: PangMenZhengDao;
      font-size: 24px;
      height: 24px;
      line-height: 22px;
      letter-spacing: 0px;
      color: #fee9a2;
      margin-left: 21px;
      margin-right: 21px;
    }
    .gradientTeThi {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: 0px;
      color: #a8b7c9;
    }
  }
}
.peopleChartOuter {
  padding-top: 10px;
  box-sizing: border-box;
}
.peopleChartCon {
  height: 100px;
}
.pointOuter {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.pointSelf {
  width: 16px;
  height: 16px;
  background-image: url(../../../assets/yxzsDetail/point.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
}
.pointText {
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0px;
  color: #ffffff;
}
</style>
