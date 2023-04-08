<template>
  <div class="yxzsMainLeft">
    <Box :height="'416px'" :bgSrc="require('../../../assets/yxzs/yx-box1-bg.png')">
      <Title :text="'火灾风险指数'" @click.native="reBoot"></Title>
      <div class="safeCon">
        <div class="safeFirstCon">
          <div class="mainNumber">
            <div class="mainNumImg"></div>
            <div class="mainNumText"><countTo :startVal="startVal" :endVal="themeValue" :decimals="1" :duration="3000"></countTo></div>
          </div>
          <div class="safeFirstBar">
            <div class="safeFirBarImg"></div>
            <div class="safeFirTextCon">
              <div class="safeFirTextFir">文保数量</div>
              <div class="safeFirTextSec"><countTo :startVal="startVal" :endVal="culturalVal1" :duration="3000"></countTo></div>
            </div>
          </div>
        </div>
        <div class="safeSecondCon">
          <div class="safeSecShort" @click="ranksClick(rank1)">
            <div class="safeSecText">国保</div>
            <div class="safeSecValue"><countTo :startVal="startVal" :endVal="culturalVal2" :duration="3000"></countTo></div>
          </div>
          <div class="safeSecShort" @click="ranksClick(rank2)">
            <div class="safeSecText">省保</div>
            <div class="safeSecValue"><countTo :startVal="startVal" :endVal="culturalVal3" :duration="3000"></countTo></div>
          </div>
          <div class="safeSecShort" @click="ranksClick(rank3)">
            <div class="safeSecText">市保</div>
            <div class="safeSecValue"><countTo :startVal="startVal" :endVal="culturalVal4" :duration="3000"></countTo></div>
          </div>
          <div class="safeSecLong" @click="ranksClick(rank4)">
            <div class="safeSecText">市级文保点</div>
            <div class="safeSecValue"><countTo :startVal="startVal" :endVal="culturalVal5" :duration="3000"></countTo></div>
          </div>
          <div class="safeSecLong" @click="ranksClick(rank5)">
            <div class="safeSecText">一般文物</div>
            <div class="safeSecValue"><countTo :startVal="startVal" :endVal="culturalVal6" :duration="3000"></countTo></div>
          </div>
        </div>
        <div class="safeThirdCon">
          <div class="safeThirdLeft" @click="checkMap('高风险')">
            <div class="safeThirdImg"></div>
            <div class="safeThirdTextFirCon">
              <div class="safeThirdTextFirFir">高风险</div>
              <div class="safeThirdTextFirSec"><countTo :startVal="startVal" :endVal="highRiskValue1" :duration="3000"></countTo></div>
            </div>
            <div class="safeThirdTextSecCon">
              <div class="safeThirdTextSecFir">今日</div>
              <div class="safeThirdTextSecSec">
                <div :style="{ color: highTodayValue > 0 ? '#ea5757' : '#6ae2ac' }">
                  <countTo :startVal="startVal" :endVal="Math.abs(highTodayValue)" :duration="3000"></countTo>
                </div>
                <div class="upOrDown" v-if="highTodayValue" :style="[highTodayValue > 0 ? { backgroundImage: 'url(' + upArrow + ')' } : { backgroundImage: 'url(' + downArrow + ')' }]"></div>
              </div>
            </div>
          </div>
          <div class="safeThirdChartCon">
            <redChart :data="redArray" :logo="triggerNumber1" />
          </div>
        </div>
        <div class="safeFourthCon">
          <div class="safeFourthLeft" @click="checkMap('中风险')">
            <div class="safeFourthImg"></div>
            <div class="safeFourthTextFirCon">
              <div class="safeFourthTextFirFir">中风险</div>
              <div class="safeFourthTextFirSec"><countTo :startVal="startVal" :endVal="middleRiskValue1" :duration="3000"></countTo></div>
            </div>
            <div class="safeFourthTextSecCon">
              <div class="safeFourthTextSecFir">今日</div>
              <div class="safeFourthTextSecSec">
                <div :style="{ color: middleTodayValue > 0 ? '#ea5757' : '#6ae2ac' }">
                  <countTo :startVal="startVal" :endVal="Math.abs(middleTodayValue)" :duration="3000"></countTo>
                </div>
                <div class="upOrDown" v-if="middleTodayValue" :style="[middleTodayValue > 0 ? { backgroundImage: 'url(' + upArrow + ')' } : { backgroundImage: 'url(' + downArrow + ')' }]"></div>
              </div>
            </div>
          </div>
          <div class="safeFourthChartCon">
            <yellowChart :data="yellowArray" :logo="triggerNumber2" />
          </div>
        </div>
        <div class="safeFifthCon">
          <div class="safeFifthLeft" @click="checkMap('低风险')">
            <div class="safeFifthImg"></div>
            <div class="safeFifthTextFirCon">
              <div class="safeFifthTextFirFir">低风险</div>
              <div class="safeFifthTextFirSec"><countTo :startVal="startVal" :endVal="lowRiskValue1" :duration="3000"></countTo></div>
            </div>
            <div class="safeFifthTextSecCon">
              <div class="safeFifthTextSecFir">今日</div>
              <div class="safeFifthTextSecSec">
                <div :style="{ color: lowTodayValue > 0 ? '#ea5757' : '#6ae2ac' }">
                  <countTo :startVal="startVal" :endVal="Math.abs(lowTodayValue)" :duration="3000"></countTo>
                </div>
                <div class="upOrDown" v-if="lowTodayValue" :style="[lowTodayValue > 0 ? { backgroundImage: 'url(' + upArrow + ')' } : { backgroundImage: 'url(' + downArrow + ')' }]"></div>
              </div>
            </div>
          </div>
          <div class="safeFifthChartCon">
            <greenChart :data="greenArray" :logo="triggerNumber3" />
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'244px'" :bgSrc="require('../../../assets/yxzs/yx-box1-bg.png')">
      <Title :text="'火灾风险隐患'" @click.native="reBoot">
        <div class="detailBtn" @click="fxfl_Click">详情<i class="el-icon-arrow-right"></i></div>
      </Title>
      <div class="riskCon">
        <div class="riskLeft">
          <div class="riskCircle"></div>
          <pieChart :data="pieArray" :logo="updateTrigger" />
          <div class="fakeGradient"></div>
        </div>
        <div class="riskRight">
          <template v-for="(item, index) in riskArray">
            <div class="riskItem" :class="[riskActive == index ? 'riskActive' : '']" :key="index" @click="riskMapClick(item, index)">
              <div class="riskIcon" :style="{ backgroundImage: 'url(' + item.img + ')' }"></div>
              <div class="riskTitle">{{ item.title }}</div>
              <div class="riskVerLine"></div>
              <div class="riskValue"><countTo :startVal="startVal" :endVal="item.value" :duration="3000"></countTo></div>
            </div>
          </template>
        </div>
      </div>
    </Box>
    <Box :height="'266px'" :bgSrc="require('../../../assets/yxzs/yx-box3-bg.png')">
      <div class="part-2">
        <Title :text="'火灾风险来源'">
          <div class="detailBtn" @click="fxly_Click">详情<i class="el-icon-arrow-right"></i></div>
        </Title>
        <div class="fxyz">
          <div
            :class="['item', currentIndex == item.id ? 'active-item' : '']"
            v-for="(item, index) in fxyzList"
            :key="index"
            @click="fxyzClick(item, index)"
            :style="{
              backgroundImage: `url(${currentIndex == item.id ? item.actBgImg : item.bgImg})`,
            }"
          >
            <span>{{ item.name }}</span>
            <countTo :startVal="localTartVal" :endVal="item.num * 1" :duration="3000"></countTo>
          </div>
        </div>
      </div>
    </Box>
    <FXLY
      :isShow="isShow_fxly"
      :defaultSelected="selectedTab"
      :count1="fxlCount1"
      :count2="fxlCount2"
      @close="
        () => {
          this.isShow_fxly = false;
        }
      "
    />
    <FXFL
      :isShow="isShow_fxfl"
      @close="
        () => {
          this.isShow_fxfl = false;
        }
      "
    />
    <FXLYItem
      :isShow="isShow_fxlyItem"
      :fxlyId="currentIndex"
      :defaultSelected="selectedTab"
      @close="
        () => {
          this.isShow_fxlyItem = false;
        }
      "
    />
  </div>
</template>
<script>
import { eventBus } from '@/main';
import Box from '../components/box';
import Title from '../components/title';
import countTo from 'vue-count-to';
import redChart from './newComponents/redChart';
import yellowChart from './newComponents/yellowChart';
import greenChart from './newComponents/greenChart';
import pieChart from './newComponents/pieChart';
import { get_yhfx } from '../../../api/xsApi2';
import { screenV3RiskData, get_aqzs_data, get_yxzs_data, screenBaseCheckFireProtectionCount, screenV3getTqyj, screenV3getHzfxyh } from '../../../api/xsApi3';
import { wbd_list2, wbd_list3, wbd_list, selectMuseumRelicInfoNumGroupLevell, login, wwgk } from '@/api/xsApi';
import { fetchFxzsCopyRiskLevelData, fetchFxzsCopyRiskTypeData } from '@/components/map-3dCopy/part2.js';
export default {
  components: {
    countTo,
    Box,
    Title,
    redChart,
    yellowChart,
    greenChart,
    pieChart,
    FXLY: () => import(/* webpackChunkName: "fxly" */ './secondPage/fxly'),
    FXFL: () => import(/* webpackChunkName: "FXFL" */ './secondPage/fxfl'),
    FXLYItem: () => import(/* webpackChunkName: "fxlyItem" */ './secondPage/fxlyItem'),
  },
  data() {
    return {
      selectedTab: '',
      isShow_fxlyItem: false,
      isShow_fxfl: false,
      isShow_fxly: false,
      triggerNumber1: 0,
      triggerNumber2: 0,
      triggerNumber3: 0,
      lowRiskValue1: 0,
      middleRiskValue1: 0,
      highRiskValue1: 0,
      culturalVal1: 0,
      culturalVal2: 0,
      culturalVal3: 0,
      culturalVal4: 0,
      culturalVal5: 0,
      culturalVal6: 0,
      themeValue: 45,
      //   currentIndex: '3',
      currentIndex: 1,
      updateTrigger: 0,
      highTodayValue: 0,
      middleTodayValue: 0,
      lowTodayValue: 0,
      startVal: 0,
      localTartVal: 0,
      timer: null,
      downArrow: require('../../../assets/yxzs/g-arrow-up.png'),
      upArrow: require('../../../assets/yxzs/r-arrow-up.png'),
      statisticsArray: [
        { value: 0, date: '01-01' },
        { value: 0, date: '01-02' },
        { value: 0, date: '01-03' },
        { value: 0, date: '01-14' },
        { value: 0, date: '01-15' },
      ],
      redArray: [
        { value: 0, date: '01-01' },
        { value: 0, date: '01-02' },
        { value: 0, date: '01-03' },
        { value: 0, date: '01-14' },
        { value: 0, date: '01-15' },
      ],
      yellowArray: [
        { value: 0, date: '01-01' },
        { value: 0, date: '01-02' },
        { value: 0, date: '01-03' },
        { value: 0, date: '01-14' },
        { value: 0, date: '01-15' },
      ],
      greenArray: [
        { value: 0, date: '01-01' },
        { value: 0, date: '01-02' },
        { value: 0, date: '01-03' },
        { value: 0, date: '01-14' },
        { value: 0, date: '01-15' },
      ],
      pieArray: [
        { name: '用电用气隐患', value: 0, color: '#41c2ae' },
        { name: '违规用火隐患', value: 0, color: '#256cdf' },
        { name: '易燃易爆隐患', value: 0, color: '#37dcfb' },
        { name: '其他', value: 0, color: '#7580f5' },

        // { name: '火灾隐患风险', value: 43, color: '#41c2ae' },
        // { name: '盗掘盗窃风险', value: 19, color: '#256cdf' },
        // { name: '法人违法风险', value: 3, color: '#37dcfb' },
        // { name: '自然灾害风险', value: 5, color: '#7580f5' },
      ],
      riskArray: [
        { title: '用电用气隐患', img: require('../../../assets/yxzs/d-icon1@2x.png'), value: '0' },
        { title: '违规用火隐患', img: require('../../../assets/yxzs/d-icon2@2x.png'), value: '0' },
        { title: '易燃易爆隐患', img: require('../../../assets/yxzs/d-icon3@2x.png'), value: '0' },
        { title: '其他', img: require('../../../assets/yxzs/d-icon4@2x.png'), value: '0' },

        // { title: '火灾隐患风险', img: require('../../../assets/yxzs/d-icon1@2x.png'), value: '0' },
        // { title: '盗掘盗窃风险', img: require('../../../assets/yxzs/d-icon2@2x.png'), value: '0' },
        // { title: '法人违法风险', img: require('../../../assets/yxzs/d-icon3@2x.png'), value: '0' },
        // { title: '自然灾害风险', img: require('../../../assets/yxzs/d-icon4@2x.png'), value: '0' },
      ],
      fxyzList: [
        {
          //   name: '巡查上报',
          name: '问题上报',
          num: '0',
          id: '1',
          bgImg: require('../../../assets/img4/source-box1.png'),
          actBgImg: require('../../../assets/img4/source-box1-s.png'),
        },
        {
          name: '智能感知',
          num: '0',
          id: '2',
          bgImg: require('../../../assets/img4/source-box2.png'),
          actBgImg: require('../../../assets/img4/source-box2-s.png'),
        },
        {
          name: '气象预警',
          num: '0',
          id: '3',
          bgImg: require('../../../assets/img4/source-box3.png'),
          actBgImg: require('../../../assets/img4/source-box3-s.png'),
        },
        {
          //   name: '行为监测',
          name: '巡查上报',
          num: '0',
          id: '4',
          bgImg: require('../../../assets/img4/source-box4.png'),
          actBgImg: require('../../../assets/img4/source-box4-s.png'),
        },
        {
          name: '稽查督查',
          num: '0',
          id: '5',
          bgImg: require('../../../assets/img4/source-box5.png'),
          actBgImg: require('../../../assets/img4/source-box5-s.png'),
        },
        {
          //   name: '其他',
          name: '行为监测',
          num: '0',
          id: '6',
          bgImg: require('../../../assets/img4/source-box6.png'),
          actBgImg: require('../../../assets/img4/source-box6-s.png'),
        },
      ],
      currentLegend_1: '',
      currentLastLegend_1: '',
      sixthArr1: [],
      sixthArr2: [],
      sixthArr3: [],
      sixthArr4: [],
      rank1: '14da5819da904c4ab1d9d94a961ca27a',
      rank2: 'cef2a80fbea6df89578ad5599b67b71f',
      rank3: '2bf3be523de944ec3ee1ad832a7a2587',
      rank4: 'b16db07f34112b9b0fc6d2b54214e0aa',
      rank5: 'ac38ee765b5e5155b8bb3eadc1b5aa8d',
      riskActive: 0,
      beClicked: false,
      fxlCount1: 0,
      fxlCount2: 0,
    };
  },
  mounted() {
    let token = localStorage.getItem('xs_token');
    if (token) {
      this.$nextTick(() => {
        this.initAction();
      });
    } else {
      login().then((res) => {
        localStorage.setItem('xs_token', res.data.data.token);
        this.$nextTick(() => {
          this.initAction();
        });
      });
    }
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.fetchRiskForTimerSource();
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  watch: {
    $route(nval) {
      if (nval.query) {
        this.wholeBlockRequest();
      }
    },
  },
  methods: {
    initAction() {
      this._get_yxzs_data();
      this.wholeBlockRequest();
      this.fetchChartData();
      this.fetchRiskData();
      this.fetchRiskSource();
      this.fetchHugeData();
      this.pieWatch();
    },
    _get_yxzs_data() {
      get_yxzs_data().then((res) => {
        // console.log('永兴指数',res.data)
        this.themeValue = res.data.data.zf ? res.data.data.zf : 45;
      });
    },
    reBoot() {
      if (this.$route.name == 'yxzs') {
        eventBus.$emit('switchYxzsMapMark', '');
      } else if (this.$route.name == 'yxzsCopy') {
        this.$store.commit('setYxzsCopyRebootPoint', '');
      }
    },
    wholeBlockRequest() {
      if (this.$route.query.zjmc) {
        this.fetchCulturalPoint();
      } else {
        this.fetchHeaderData();
      }
    },
    ranksClick(value) {
      this.$store.commit('setXbgCopyRankYXZSLevel', {
        level: value,
        area: this.$route.query.zjmc || '',
      });
    },
    fetchCulturalPoint() {
      let params = {
        currentPage: 1,
        pageSize: 1,
        publishName: '',
        jd: this.$route.query.zjmc,
        rank: this.rank1,
        category: '',
      };
      let p2arams = {
        currentPage: 1,
        pageSize: 1,
        publishName: '',
        jd: this.$route.query.zjmc,
        rank: this.rank2,
        category: '',
      };
      let p3arams = {
        currentPage: 1,
        pageSize: 1,
        publishName: '',
        jd: this.$route.query.zjmc,
        rank: this.rank3,
        category: '',
      };
      let p4arams = {
        currentPage: 1,
        pageSize: 1,
        publishName: '',
        jd: this.$route.query.zjmc,
        rank: this.rank4,
        category: '',
      };
      let p5arams = {
        currentPage: 1,
        pageSize: 1,
        publishName: '',
        jd: this.$route.query.zjmc,
        rank: this.rank5,
        category: '',
      };
      let p1 = wbd_list(params);
      let p2 = wbd_list(p2arams);
      let p3 = wbd_list(p3arams);
      let p4 = wbd_list(p4arams);
      let p5 = wbd_list(p5arams);
      Promise.all([p1, p2, p3, p4, p5]).then((res) => {
        this.culturalVal2 = res[0].data.data.total;
        this.culturalVal3 = res[1].data.data.total;
        this.culturalVal4 = res[2].data.data.total;
        this.culturalVal5 = res[3].data.data.total;
        this.culturalVal6 = res[4].data.data.total;
        this.culturalVal1 = +this.culturalVal2 + +this.culturalVal3 + +this.culturalVal4 + +this.culturalVal5 + +this.culturalVal6;
      });
    },
    fetchHeaderData() {
      wwgk({ level: '0', name: '0' }).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          if (shorter && shorter.length) {
            this.culturalVal2 = +shorter[0].reportNum1 || 0;
            this.culturalVal3 = +shorter[0].reportNum2 || 0;
            this.culturalVal4 = +shorter[0].reportNum3 || 0;
            this.culturalVal5 = +shorter[0].reportNum4 || 0;
            this.culturalVal6 = +shorter[0].reportNum7 || 0;
            this.culturalVal1 = +this.culturalVal2 + +this.culturalVal3 + +this.culturalVal4 + +this.culturalVal5 + +this.culturalVal6;
          }
        }
      });
      /*      selectMuseumRelicInfoNumGroupLevell({}).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let track1 = res.data.data.find((ele) => {
            return ele.name == '国保单位';
          });
          let track2 = res.data.data.find((ele) => {
            return ele.name == '省保单位';
          });
          let track3 = res.data.data.find((ele) => {
            return ele.name == '市保单位';
          });
          let track4 = res.data.data.find((ele) => {
            return ele.name == '市级文保点';
          });
          let track5 = res.data.data.find((ele) => {
            return ele.name == '一般文物';
          });
          if (track1) {
            this.culturalVal2 = track1.num;
          }
          if (track2) {
            this.culturalVal3 = track2.num;
          }
          if (track3) {
            // this.culturalVal4 = track3.num;
            this.culturalVal4 = 65;
          }
          if (track4) {
            // this.culturalVal5 = track4.num;
            this.culturalVal5 = 134;
          }
          if (track5) {
            this.culturalVal6 = track5.num;
          }
          this.culturalVal1 = this.culturalVal2 + this.culturalVal3 + this.culturalVal4 + this.culturalVal5 + this.culturalVal6;
        }
      }); */
    },
    fetchHugeData() {
      if (this.$store.state.hugeListData && this.$store.state.hugeListData.length) {
        //
      } else {
        let params = {
          currentPage: 1,
          pageSize: 600,
        };
        let p1 = wbd_list2(params);
        let p2 = wbd_list3(params);
        Promise.all([p1, p2]).then((res) => {
          let arr1 = res[0].data.data.list;
          let arr4 = res[1].data.data.list;
          arr1.forEach((ele, index) => {
            ele.activation = arr4[index].activation;
            ele.lxdh = arr4[index].lxdh;
            ele.category = arr4[index].category;
            ele.maxLevel = arr4[index].maxLevel;
            ele.paths = arr4[index].paths;
            ele.rank = arr4[index].rank;
            ele.xcy = arr4[index].xcy;
            ele.yjbs = arr4[index].yjbs;
          });
          this.$store.commit('setHugeListData', arr1);
        });
      }
    },
    riskMapClick(item, index) {
      this.riskActive = index;
      this.beClicked = true;
      let commonAction = () => {
        this.currentLastLegend_1 = item.title;
        fetchFxzsCopyRiskTypeData.bind(this)(this.currentLastLegend_1);
      };
      if (this.currentLegend_1) {
        this.currentLegend_1 = item.title;
        if (this.currentLegend_1 == this.currentLastLegend_1) {
          this.currentLegend_1 = '';
          this.currentLastLegend_1 = '';
          eventBus.$emit('switchYxzsMapMark', '');
        } else {
          commonAction();
        }
      } else {
        this.currentLegend_1 = item.title;
        commonAction();
      }
    },
    checkMap(val) {
      let riskLevle = '';
      switch (val) {
        case '高风险':
          riskLevle = '1';
          break;
        case '中风险':
          riskLevle = '2';
          break;
        case '低风险':
          riskLevle = '3';
          break;
        default:
          break;
      }
      if (this.$route.name == 'yxzs') {
        eventBus.$emit('drawPointByRiskLevel', riskLevle);
      } else if (this.$route.name == 'yxzsCopy') {
        fetchFxzsCopyRiskLevelData.bind(this)(riskLevle);
      }
    },
    fetchRiskForTimerSource() {
      //   if (this.localTartVal == 0) {
      //     this.localTartVal = 0.1;
      //   } else {
      //     this.localTartVal = 0;
      //   }
      //   this.fetchRiskSource();
      if (this.currentIndex < 6) {
        this.currentIndex++;
      } else {
        this.currentIndex = 1;
      }
    },
    fetchRiskSource() {
      screenBaseCheckFireProtectionCount({
        checkType: 8,
        jdIsRunState: 1,
      })
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter) {
              this.fxyzList[0].num = +shorter;
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
      screenBaseCheckFireProtectionCount({
        checkTypes: [11, 12, 13, 14, 15],
      })
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter) {
              this.fxyzList[1].num = +shorter;
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
      screenV3getTqyj({})
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter) {
              this.fxyzList[2].num = +shorter.reportNum1;
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
      screenBaseCheckFireProtectionCount({
        checkType: 3,
        jdIsRuns: [1, 99],
      })
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter) {
              this.fxyzList[3].num = +shorter;
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
      screenBaseCheckFireProtectionCount({
        checkType: 7,
      })
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter) {
              this.fxyzList[4].num = +shorter;
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
      screenBaseCheckFireProtectionCount({
        checkType: 18,
      })
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter) {
              this.fxyzList[5].num = +shorter;
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
      screenV3RiskData({}).then((res) => {
        // this.fxyzList[5].num = 0;
        // this.fxyzList[2].num = 50;
        // this.fxyzList[3].num = 17;
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          let track1 = shorter.PatrolData;
          let track2 = shorter.actionData;
          let track3 = shorter.inspectData;
          let track4 = shorter.otherData;
          let track5 = shorter.perceptionData;
          let track6 = shorter.weatherData;
          this.globaltrack1 = track1;
          this.globaltrack2 = track2;
          this.globaltrack3 = track3;
          this.globaltrack4 = track4;
          this.globaltrack5 = track5;
          this.globaltrack6 = track6;
          //   if (track1) {
          //     // let res1 = track1.reduce((acc, current) => {
          //     //   return acc + current.number;
          //     // }, 0);
          //     this.fxyzList[0].num = track1;
          //   }
          //   if (track2) {
          //     // let res2 = track2.reduce((acc, current) => {
          //     //   return acc + current.number;
          //     // }, 0);
          //     // this.fxyzList[3].num = res2;
          //   }
          //   if (track3) {
          //     let res3 = track3.reduce((acc, current) => {
          //       return acc + current.number;
          //     }, 0);
          //     this.fxyzList[4].num = res3;
          //   }
          //   if (track4) {
          //     //
          //   }
          //   if (track5) {
          //     let res5 = track5.reduce((acc, current) => {
          //       return acc + current.number;
          //     }, 0);
          //     this.fxyzList[1].num = res5;
          //   }
          //   //   if (track6) {
          //   //     let res6 = track6.reduce((acc, current) => {
          //   //       return acc + current.number;
          //   //     }, 0);
          //   //     this.fxyzList[2].num = res6;
          //   //   }
        }
      });
    },
    pieWatch() {
      eventBus.$on('yxzsMasterLeftPie', (msg) => {
        if (!this.beClicked) {
          if (msg == 0) {
            this.riskActive = 3;
          } else {
            this.riskActive = msg - 1;
          }
        }
      });
    },
    fetchRiskData() {
      screenV3getHzfxyh({}).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          if (shorter) {
            let track1 = shorter.find((ele) => {
              return ele.reportName == '用电用气隐患';
            });
            if (track1) {
              this.riskArray[0].value = +track1.reportNum1;
              this.pieArray[0].value = +track1.reportNum1;
              this.updateTrigger++;
            }
            let track2 = shorter.find((ele) => {
              return ele.reportName == '违规用火隐患';
            });
            if (track2) {
              this.riskArray[1].value = +track2.reportNum1;
              this.pieArray[1].value = +track2.reportNum1;
              this.updateTrigger++;
            }
            let track3 = shorter.find((ele) => {
              return ele.reportName == '易燃易爆隐患';
            });
            if (track3) {
              this.riskArray[2].value = +track3.reportNum1;
              this.pieArray[2].value = +track3.reportNum1;
              this.updateTrigger++;
            }
            let track4 = shorter.find((ele) => {
              return ele.reportName == '其他';
            });
            if (track4) {
              this.riskArray[3].value = +track4.reportNum1;
              this.pieArray[3].value = +track4.reportNum1;
              this.updateTrigger++;
            }
          }
        }
      });
    },
    fetchChartData() {
      get_aqzs_data().then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          let list = shorter.list;
          let detail = shorter.detail;
          this.highRiskValue1 = +detail.reportNum1;
          this.highTodayValue = +detail.reportNum4;
          this.middleRiskValue1 = +detail.reportNum2;
          this.middleTodayValue = +detail.reportNum5;
          this.lowRiskValue1 = +detail.reportNum3;
          this.lowTodayValue = +detail.reportNum6;
          let temp1 = [];
          let temp2 = [];
          let temp3 = [];
          list.forEach((ele) => {
            temp1.push({
              date: ele.reportType,
              value: ele.reportNum7,
            });
            temp2.push({
              date: ele.reportType,
              value: ele.reportNum8,
            });
            temp3.push({
              date: ele.reportType,
              value: ele.reportNum9,
            });
          });
          this.redArray = temp1;
          this.triggerNumber1++;
          this.yellowArray = temp2;
          this.triggerNumber2++;
          this.greenArray = temp3;
          this.triggerNumber3++;
        }
      });
    },
    getFXYB_data() {
      //   switch (this.currentIndex) {
      //     case 1:
      //       const tag1 = this.globaltrack1.find((ele) => {
      //         return ele.name == '安防';
      //       });
      //       const tag2 = this.globaltrack1.find((ele) => {
      //         return ele.name == '消防';
      //       });
      //       const tag3 = this.globaltrack1.find((ele) => {
      //         return ele.name == '周边';
      //       });
      //       const tag4 = this.globaltrack1.find((ele) => {
      //         return ele.name == '本土';
      //       });
      //       const tag5 = this.globaltrack1.find((ele) => {
      //         return ele.name == '本体';
      //       });
      //       const tag6 = this.globaltrack1.find((ele) => {
      //         return !ele.name;
      //       });
      //       const tag7 = this.globaltrack1.find((ele) => {
      //         return ele.name == '其他';
      //       });
      //       this.pieData[0].value = (tag1 && tag1.number) || 0;
      //       this.pieData[1].value = (tag2 && tag2.number) || 0;
      //       this.pieData[2].value = (tag3 && tag3.number) || 0;
      //       this.pieData[3].value = (tag4 && tag4.number) + (tag5 && tag5.number) || 0;
      //       this.pieData[4].value = (tag6 && tag6.number) + (tag7 && tag7.number) || 0;
      //       break;
      //     case 2:
      //       const tag21 = this.globaltrack5.find((ele) => {
      //         return ele.name == '烟感';
      //       });
      //       this.pieData[0].value = (tag21 && tag21.number) || 0;
      //       this.pieData[1].value = 0;
      //       this.pieData[2].value = 0;
      //       this.pieData[3].value = 0;
      //       this.pieData[4].value = 0;
      //       break;
      //     case 3:
      //       //   let weather1 = [];
      //       //   let weather2 = [];
      //       //   let weather3 = [];
      //       //   let weather4 = [];
      //       //   crisi.forEach((ele, index) => {
      //       //     if (ele.risk) {
      //       //       if (ele.risk[2] && ele.risk[2].yz && ele.risk[2].yz[0]) {
      //       //         let rainMap = {
      //       //           阴: 5,
      //       //           阵雨: 6,
      //       //           雷阵雨: 7,
      //       //           雨: 8,
      //       //           雨夹雪: 9,
      //       //           小雨: 10,
      //       //           中雨: 11,
      //       //           大雨: 12,
      //       //           暴雨: 13,
      //       //           大暴雨: 14,
      //       //           冻雨: 15,
      //       //           特大暴雨: 16,
      //       //           小到中雨: 17,
      //       //           中到大雨: 18,
      //       //           大到暴雨: 19,
      //       //           暴雨到大暴雨: 20,
      //       //           大暴雨到特大暴雨: 21,
      //       //           雷阵雨伴有冰雹: 22,
      //       //         };
      //       //         if (rainMap[this.currentWeatherData.now.text] >= ele.risk[2].yz[0].limitValue) {
      //       //           weather1.push(index);
      //       //         }
      //       //         if (rainMap[this.currentWeatherData.now.temp] >= ele.risk[2].yz[1].limitValue) {
      //       //           weather2.push(index);
      //       //         }
      //       //         let thunderMap = {
      //       //           雷阵雨: 8,
      //       //           雷阵雨伴有冰雹: 12,
      //       //         };
      //       //         if (thunderMap[this.currentWeatherData.now.text] >= ele.risk[2].yz[2].limitValue) {
      //       //           weather3.push(index);
      //       //         }
      //       //         let windNumber = +this.currentWeatherData.now.wind_class.replace('级', '');
      //       //         if (windNumber >= ele.risk[2].yz[3].limitValue) {
      //       //           weather4.push(index);
      //       //         }
      //       //       }
      //       //     }
      //       //   });
      //       const tag31 = this.globaltrack6.find((ele) => {
      //         return ele.name == '降雨';
      //       });
      //       const tag32 = this.globaltrack6.find((ele) => {
      //         return ele.name == '气温';
      //       });
      //       const tag33 = this.globaltrack6.find((ele) => {
      //         return ele.name == '雷电';
      //       });
      //       const tag34 = this.globaltrack6.find((ele) => {
      //         return ele.name == '风级';
      //       });
      //       this.pieData[0].value = (tag31 && tag31.number) || 0;
      //       this.pieData[1].value = (tag32 && tag32.number) || 0;
      //       this.pieData[2].value = (tag33 && tag33.number) || 0;
      //       this.pieData[3].value = (tag34 && tag34.number) || 0;
      //       break;
      //     case 4:
      //       const tag41 = this.globaltrack2.find((ele) => {
      //         return ele.name == '活动';
      //       });
      //       const tag42 = this.globaltrack2.find((ele) => {
      //         return ele.name == '人流';
      //       });
      //       const tag43 = this.globaltrack2.find((ele) => {
      //         return ele.name == '占道';
      //       });
      //       const tag44 = this.globaltrack2.find((ele) => {
      //         return ele.name == '越界';
      //       });
      //       const tag45 = this.globaltrack2.find((ele) => {
      //         return ele.name == '其他';
      //       });
      //       this.pieData[0].value = (tag41 && tag41.number) || 0;
      //       this.pieData[1].value = (tag42 && tag42.number) || 0;
      //       this.pieData[2].value = (tag43 && tag43.number) || 0;
      //       this.pieData[3].value = (tag44 && tag44.number) || 0;
      //       this.pieData[4].value = (tag45 && tag45.number) || 0;
      //       break;
      //     case 5:
      //       const tag51 = this.globaltrack3.find((ele) => {
      //         return ele.name == '其他';
      //       });
      //       this.pieData[0].value = this.sixthArr1.length;
      //       this.pieData[1].value = this.sixthArr2.length;
      //       this.pieData[2].value = this.sixthArr3.length;
      //       this.pieData[3].value = this.sixthArr4.length;
      //       this.pieData[4].value = (tag51 && tag51.number) || 0;
      //       break;
      //     case '6':
      //       break;
      //   }
      this.logo += '1';
      /*    get_fxyb_data(params).then(res => {
        let data = res.data.data;
        if (data && data.length) {
          if (+this.currentIndex != 3) {
            this.pieData[0].value = data[0].reportNum1;
            this.pieData[1].value = data[1].reportNum1;
            this.pieData[2].value = data[2].reportNum1;
            this.pieData[3].value = data[3].reportNum1;
            this.pieData[4].value = data[4].reportNum1;
          } else {
            this.pieData[0].value = data[0].reportNum1;
            this.pieData[1].value = data[1].reportNum1;
            this.pieData[2].value = data[3].reportNum1;
            this.pieData[3].value = data[4].reportNum1;
          }
        }
        this.logo += '1';
      }); */
    },
    fxyzClick(item, index) {
      this.fxlCount1 = this.fxyzList[0].num;
      this.fxlCount2 = this.fxyzList[1].num;
      this.currentIndex = +item.id;
      switch (this.currentIndex) {
        case 1:
          this.selectedTab = '问题上报';
          break;
        case 2:
          this.selectedTab = '智能感知';
          break;
        case 3:
          this.selectedTab = '气象预警';
          break;
        case 4:
          this.selectedTab = '巡查上报';
          break;
        case 5:
          this.selectedTab = '稽查督查';
          break;
        case 6:
          this.selectedTab = '行为监测';
          break;
      }
      // this.isShow_fxlyItem = true
      switch (index) {
        case 0:
          this.part3_title = '巡查上报';
          this.part3_Text = '巡查';
          this.pieData = [
            {
              value: 0,
              name: '安防',
              iconImg: require('../../../assets/img4/x-icon1.png'),
            },
            {
              value: 0,
              name: '消防',
              iconImg: require('../../../assets/img4/x-icon2.png'),
            },
            {
              value: 0,
              name: '周边',
              iconImg: require('../../../assets/img4/x-icon1.png'),
            },
            {
              value: 0,
              name: '本土',
              iconImg: require('../../../assets/img4/x-icon4.png'),
            },
            {
              value: 0,
              name: '其他',
              iconImg: require('../../../assets/img4/x-icon5.png'),
            },
          ];
          this.isShow_fxly = true;
          break;
        case 1:
          this.part3_title = '智能感知';
          this.part3_Text = 'AI';
          this.pieData = [
            {
              value: 0,
              name: '烟感',
              iconImg: require('../../../assets/img4/ai-icon1.png'),
            },
            {
              value: 0,
              name: '水压',
              iconImg: require('../../../assets/img4/ai-icon2.png'),
            },
            {
              value: 0,
              name: '水位',
              iconImg: require('../../../assets/img4/ai-icon3.png'),
            },
            {
              value: 0,
              name: '监控',
              iconImg: require('../../../assets/img4/ai-icon4.png'),
            },
            {
              value: 0,
              name: '电压',
              iconImg: require('../../../assets/img4/ai-icon5.png'),
            },
          ];
          this.isShow_fxly = true;
          break;
        case 2:
          this.part3_title = '气象预警';
          this.part3_Text = '气象';
          /*           this.pieData[0].name = '降雨';
          this.pieData[0].iconImg = require('../../../assets/img4/r-icon1@2x.png');
          this.pieData[1].name = '气温';
          this.pieData[1].iconImg = require('../../../assets/img4/r-icon2@2x.png');
          this.pieData[2].name = '湿度';
          this.pieData[2].iconImg = require('../../../assets/img4/r-icon3@2x.png');
          this.pieData[3].name = '雷电';
          this.pieData[3].iconImg = require('../../../assets/img4/r-icon4@2x.png');
          this.pieData[4].name = '风级';
          this.pieData[4].iconImg = require('../../../assets/img4/r-icon5@2x.png'); */
          this.pieData = [
            {
              value: 0,
              name: '降雨',
              iconImg: require('../../../assets/img4/r-icon1@2x.png'),
            },
            {
              value: 0,
              name: '气温',
              iconImg: require('../../../assets/img4/r-icon2@2x.png'),
            },
            {
              value: 0,
              name: '雷电',
              iconImg: require('../../../assets/img4/r-icon4@2x.png'),
            },
            {
              value: 0,
              name: '风级',
              iconImg: require('../../../assets/img4/r-icon5@2x.png'),
            },
          ];
          this.isShow_fxly = true;
          break;
        case 3:
          this.part3_title = '行为监测';
          this.part3_Text = '行为';
          this.pieData = [
            {
              value: 0,
              name: '活动',
              iconImg: require('../../../assets/img4/xw-icon1.png'),
            },
            {
              value: 0,
              name: '人流',
              iconImg: require('../../../assets/img4/xw-icon2.png'),
            },
            {
              value: 0,
              name: '占道',
              iconImg: require('../../../assets/img4/xw-icon3.png'),
            },
            {
              value: 0,
              name: '越界',
              iconImg: require('../../../assets/img4/xw-icon4.png'),
            },
            {
              value: 0,
              name: '其他',
              iconImg: require('../../../assets/img4/xw-icon5.png'),
            },
          ];
          this.isShow_fxly = true;
          break;
        case 4:
          this.part3_title = '稽查督查';
          this.part3_Text = '稽查';
          this.pieData = [
            {
              value: 0,
              name: '城管',
              iconImg: require('../../../assets/img4/jc-icon1.png'),
            },
            {
              value: 0,
              name: '住建',
              iconImg: require('../../../assets/img4/jc-icon2.png'),
            },
            {
              value: 0,
              name: '消防',
              iconImg: require('../../../assets/img4/jc-icon3.png'),
            },
            {
              value: 0,
              name: '公安',
              iconImg: require('../../../assets/img4/jc-icon4.png'),
            },
            {
              value: 0,
              name: '其他',
              iconImg: require('../../../assets/img4/jc-icon5.png'),
            },
          ];
          this.isShow_fxly = true;
          break;
        case 5:
          //   this.currentIndex = item.id
          //   this.isShow_fxlyItem = true;
          this.isShow_fxly = true;
          break;
        default:
          break;
      }
      this.getFXYB_data();
    },
    fxfl_Click() {
      this.isShow_fxfl = true;
    },
    fxly_Click() {
      this.isShow_fxly = true;
      this.selectedTab = '';
    },
  },
};
</script>
<style lang="less" scoped>
@keyframes circleRoatation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.yxzsMainLeft {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.safeCon {
  padding-top: 10px;
  box-sizing: border-box;
}
.mainNumber {
  height: 61px;
  position: relative;
  width: 111px;
}
.mainNumImg {
  width: 111px;
  height: 58px;
  background-image: url(../../../assets/yxzs/num-img.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  bottom: 0;
}
.mainNumText {
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: -5px;
  text-align: center;
  width: 75px;
  font-family: PangMenZhengDao;
  font-size: 32px;
  line-height: 30px;
  letter-spacing: 1px;
  color: transparent;
  background-image: linear-gradient(#fff, #3167b7);
  background-clip: text;
  -webkit-background-clip: text;
}
.safeFirstCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
.safeFirstBar {
  width: 349px;
  height: 61px;
  background-image: url(../../../assets/yxzs/index-box1.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.safeFirBarImg {
  width: 54px;
  height: 52px;
  background-image: url(../../../assets/yxzs/d-icon.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-left: 90px;
  margin-right: 10px;
}
.safeFirTextCon {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 42px;
}
.safeFirTextFir {
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #bfc8d7;
}
.safeFirTextSec {
  font-family: DINPro-Bold;
  font-size: 24px;
  line-height: 22px;
  letter-spacing: 1px;
  color: #ffffff;
}
.safeSecondCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  .safeSecShort {
    cursor: pointer;
    width: 80px;
    height: 56px;
    background-image: url(../../../assets/yxzs/index-box2.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    text-align: center;
  }
  .safeSecLong {
    cursor: pointer;
    width: 100px;
    height: 56px;
    background-image: url(../../../assets/yxzs/index-box3.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    text-align: center;
  }
}
.safeSecText {
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #bfc8d7;
  margin-top: 8px;
  margin-bottom: 4px;
}
.safeSecValue {
  font-family: DINPro-Medium;
  font-size: 24px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #fefefe;
}
.safeThirdCon {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.safeThirdLeft {
  width: 153px;
  height: 50px;
  cursor: pointer;
  background-image: url(../../../assets/yxzs/h-bg.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 12px;
  box-sizing: border-box;
}
.safeThirdChartCon {
  width: 280px;
  height: 50px;
}
.safeFourthCon {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.safeFifthCon {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.safeFourthLeft {
  cursor: pointer;
  width: 153px;
  height: 50px;
  background-image: url(../../../assets/yxzs/c-bg.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 12px;
  box-sizing: border-box;
}
.safeFourthChartCon {
  width: 280px;
  height: 50px;
}
.safeFifthLeft {
  width: 153px;
  height: 50px;
  cursor: pointer;
  background-image: url(../../../assets/yxzs/l-bg.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 12px;
  box-sizing: border-box;
}
.safeFifthChartCon {
  width: 280px;
  height: 50px;
}
.safeThirdImg {
  width: 30px;
  height: 34px;
  background-image: url(../../../assets/yxzs/h-icon.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
}
.safeFourthImg {
  width: 30px;
  height: 34px;
  background-image: url(../../../assets/yxzs/c-icon.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
}
.safeFifthImg {
  width: 30px;
  height: 34px;
  background-image: url(../../../assets/yxzs/l-icon.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
}
.safeThirdTextFirCon {
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 7px;
}
.safeThirdTextFirFir {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 1px;
  color: #fff;
}
.safeThirdTextFirSec {
  font-family: DINPro-Medium;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 1px;
  color: #ff4b4b;
}
.safeThirdTextSecCon {
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 20px;
}
.safeThirdTextSecFir {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 1px;
  color: #fff;
}
.safeThirdTextSecSec {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  div:nth-child(1) {
    font-family: DINPro-Medium;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0px;
    min-width: 16px;
    text-align: center;
    span {
      font-size: 16px;
      line-height: 14px;
      display: inline-block;
    }
  }
  div:nth-child(2) {
    width: 10px;
    height: 12px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
.safeFourthTextFirCon {
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 7px;
}
.safeFourthTextFirFir {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 1px;
  color: #fff;
}
.safeFourthTextFirSec {
  font-family: DINPro-Medium;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 1px;
  color: #ffe082;
}
.safeFourthTextSecCon {
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 20px;
}
.safeFourthTextSecFir {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 1px;
  color: #fff;
}
.safeFourthTextSecSec {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  div:nth-child(1) {
    font-family: SourceHanSansCN-Bold;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0px;
    min-width: 16px;
    text-align: center;
    span {
      font-size: 16px;
      line-height: 14px;
      display: inline-block;
    }
  }
  div:nth-child(2) {
    width: 10px;
    height: 12px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
.safeFifthTextFirCon {
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 7px;
}
.safeFifthTextFirFir {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 1px;
  color: #fff;
}
.safeFifthTextFirSec {
  font-family: DINPro-Medium;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 1px;
  color: #88e886;
}
.safeFifthTextSecCon {
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 20px;
}
.safeFifthTextSecFir {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 1px;
  color: #fff;
}
.safeFifthTextSecSec {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  div:nth-child(1) {
    font-family: SourceHanSansCN-Bold;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0px;
    min-width: 16px;
    text-align: center;
    span {
      font-size: 16px;
      line-height: 14px;
      display: inline-block;
    }
  }
  div:nth-child(2) {
    width: 10px;
    height: 12px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
.detailBtn {
  width: 70px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #8ba4fe;
  background: #34478c;
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  letter-spacing: 1px;
  color: #8ba4fe;
  cursor: pointer;
  .el-icon-arrow-right {
    width: 6px;
  }
}
.riskCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  box-sizing: border-box;
  margin-top: 10px;
}
.riskLeft {
  width: 150px;
  height: 150px;
  position: relative;
}
.riskCircle {
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  height: 150px;
  background-image: url(../../../assets/yxzs/cricle.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  animation: circleRoatation 15s linear infinite;
}
.fakeGradient {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  left: 25px;
  top: 25px;
  z-index: -1;
  background-color: rgba(74, 84, 137, 0.8);
}
.riskRight {
}
.riskItem {
  border: 1px solid transparent;
  box-sizing: border-box;
  width: 190px;
  height: 30px;
  cursor: pointer;
  background-image: url(../../../assets/yxzs/d-icon-bg.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4px;
  padding-left: 10px;
  box-sizing: border-box;
  &:last-child {
    margin-bottom: 0;
  }
}
.riskIcon {
  margin-top: 3px;
  width: 24px;
  height: 25px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-right: 10px;
}
.riskTitle {
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  width: 84px;
  letter-spacing: 0px;
  color: rgb(210, 210, 210);
  opacity: 0.6;
  margin-right: 16px;
}
.riskVerLine {
  width: 2px;
  height: 60%;
  background-color: #fff;
  margin-right: 10px;
}
.riskValue {
  font-family: DINPro-Medium;
  font-size: 14px;
  letter-spacing: 0px;
  color: rgb(210, 210, 210);
  opacity: 0.6;
}
.riskActive {
  border: 1px solid #ffe082;
  background-image: linear-gradient(45deg, rgba(253, 133, 47, 0.1) 0%, rgba(254, 205, 61, 0.3) 100%);
  .riskTitle {
    opacity: 1;
    color: #fff;
    font-weight: 500 !important;
  }
  .riskValue {
    opacity: 1;
    color: #fff;
    font-weight: 500 !important;
  }
}
.part-2 {
  .fxyz {
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-around;
    margin-top: 15px;
    .item {
      width: 146px;
      height: 50px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      box-sizing: border-box;
      padding-left: 65px;
      cursor: pointer;
      span:nth-child(1) {
        font-family: SourceHanSansCN-Regular;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: 1px;
        color: #fff;
      }
      span:nth-child(2) {
        font-family: DINPro-Bold;
        font-size: 20px;
        line-height: 22px;
        letter-spacing: 1px;
        color: #ffffff;
      }
    }
    .active-item {
      span:nth-child(2) {
        color: #ffca97;
      }
    }
  }
}
</style>
