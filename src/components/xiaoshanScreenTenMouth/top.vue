<template>
  <div class="top-box">
    <div class="top">
      <div
        class="item"
        v-for="(item, index) in topList"
        :key="index"
        :style="{
          background: `url(${item.bgImg}) no-repeat center`,
          'background-size': '100% 100%',
        }"
        @click="itemClick(item.name)"
      >
        <span>{{ formatValue(item.num) }}</span>
        <!-- <countTo :startVal="startVal" :endVal="item.num * 1" :duration="3000"></countTo> -->
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!-- 二级页面 -->
    <WillDo
      :isShow="isShow_willDo"
      @close="
        () => {
          this.isShow_willDo = false;
        }
      "
    />
    <HasDone
      :isShow="isShow_hasDone"
      @close="
        () => {
          this.isShow_hasDone = false;
        }
      "
    />
    <WarningEvent
      :isShow="isShow_warning"
      @close="
        () => {
          this.isShow_warning = false;
        }
      "
    />
  </div>
</template>
<script>
import { eventBus } from '@/main';
import { wbd_list2, wbd_list3 } from '../../api/xsApi';
import { get_top_data, screenV3Zdtjv2 } from '../../api/xsApi3';
import Input from './components/input';
import countTo from 'vue-count-to';
import WillDo from './topSecondPage/willDo';
import WarningEvent from './topSecondPage/warningEvent';
import HasDone from './topSecondPage/hasDone';
import { mapState } from 'vuex';
import staticfxlx1 from './mixDatafxlx1.json';
import staticfxlx2 from './mixDatafxlx2.json';
import staticfxlx3 from './mixDatafxlx3.json';
import staticfxlx4 from './mixDatafxlx4.json';
let timer;
export default {
  name: '',
  components: { Input, countTo, WillDo, WarningEvent, HasDone },
  data() {
    return {
      startVal: 0,
      addressName: '',
      jd: '',
      category: '',
      rankId: '',
      riskLevel: '',
      riskType: '',
      topList: [
        {
          name: '待处理任务',
          num: '67',
          bgImg: require('../../assets/img4/top1.png'),
        },
        {
          // name: '今日总报警',
          name: '设备总预警',
          num: '12',
          bgImg: require('../../assets/img4/top2.png'),
        },
        {
          name: '已处理任务',
          num: '164',
          bgImg: require('../../assets/img4/top3.png'),
        },
      ],
      currentPoiType: '',
      currentJd: '',
      currentBumpPointId: '',
      // 二级页面
      isShow_willDo: false,
      isShow_warning: false,
      isShow_hasDone: false,
    };
  },
  computed: {
    ...mapState(['currentRouteName', 'hookMapReactionWithTopData']),
  },
  watch: {
    // currentRouteName(val){
    //   this.jd = ''
    //   this.category = ''
    //   this.rankId = ''
    //   this.riskLevel = ''
    //   this.riskType = ''
    // },
    hookMapReactionWithTopData(nval, val) {
      this.getTopData();
    },
  },
  created() {
    eventBus.$on('resetCurrentPoiType', (msg) => {
      this.currentPoiType = msg;
    });
    eventBus.$on('gotoStreet_point', (msg) => {
      this.addressName = msg;
      this.jd = msg;
      // this.rankId = ''
      // this.riskLevel = ''
      // this.riskType = ''
      // this.get_all_wbdList_data()
      //   console.log('this.currentPoiType', this.currentPoiType);
      this.get_wbdList_data(this.currentPoiType);
    });
    // 左上按钮----筛选点位
    eventBus.$on('drawpoi', (msg1, msg2, msg3) => {
      //   console.log(msg1, msg2, msg3)
      this.category = msg1.join();
      this.jd = msg2.join();
      this.rankId = '';
      this.riskLevel = '';
      this.riskType = '';
      this.get_all_wbdList_data();
    });
    eventBus.$on('drawSimplePoi', (value) => {
      this.search(value);
    });
    eventBus.$on('data_back', (msg) => {
      this.jd = '';
      this.category = '';
      this.rankId = '';
      this.riskLevel = '';
      this.riskType = '';
      this.currentPoiType = '';
      // this.get_all_wbdList_data();
    });
    // 文物等级
    eventBus.$on('drawPoiByRank', (rankId) => {
      // this.jd = ''
      this.category = '';
      this.rankId = rankId;
      this.riskLevel = '';
      this.riskType = '';
      this.currentPoiType = '';
      this.get_wbdList_data();
    });
    eventBus.$on('drawPoiByRanks', (rankIds) => {
      this.jd = '';
      this.category = '';
      this.rankId = '';
      this.riskLevel = '';
      this.riskType = '';
      let params1 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: this.riskLevel,
        fxlx: this.riskType,
        isGraden: 0,
        pageSize: 3,
        publishName: '',
        rank: rankIds[0],
        trialList: [],
      };
      let params2 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: this.riskLevel,
        fxlx: this.riskType,
        isGraden: 0,
        pageSize: 9,
        publishName: '',
        rank: rankIds[1],
        trialList: [],
      };
      let params3 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: this.riskLevel,
        fxlx: this.riskType,
        isGraden: 0,
        pageSize: 54,
        publishName: '',
        rank: rankIds[2],
        trialList: [],
      };
      let p1 = wbd_list2(params1);
      let p2 = wbd_list2(params2);
      let p3 = wbd_list2(params3);
      let p4 = wbd_list3(params1);
      let p5 = wbd_list3(params2);
      let p6 = wbd_list3(params3);
      Promise.all([p1, p2, p3, p4, p5, p6]).then((res) => {
        let arr1 = res[0].data.data.list;
        let arr2 = res[1].data.data.list;
        let arr3 = res[2].data.data.list;
        let arr4 = res[3].data.data.list;
        let arr5 = res[4].data.data.list;
        let arr6 = res[5].data.data.list;
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
        arr2.forEach((ele, index) => {
          ele.activation = arr5[index].activation;
          ele.lxdh = arr5[index].lxdh;
          ele.category = arr5[index].category;
          ele.maxLevel = arr5[index].maxLevel;
          ele.paths = arr5[index].paths;
          ele.rank = arr5[index].rank;
          ele.xcy = arr5[index].xcy;
          ele.yjbs = arr5[index].yjbs;
        });
        arr3.forEach((ele, index) => {
          ele.activation = arr6[index].activation;
          ele.lxdh = arr6[index].lxdh;
          ele.category = arr6[index].category;
          ele.maxLevel = arr6[index].maxLevel;
          ele.paths = arr6[index].paths;
          ele.rank = arr6[index].rank;
          ele.xcy = arr6[index].xcy;
          ele.yjbs = arr6[index].yjbs;
        });
        let arr = arr1.concat(arr2).concat(arr3);
        eventBus.$emit('drawCulturalPoi', arr, '', '');
      });
    });
    // 文物类别
    eventBus.$on('drawPoiByCategory', (categoryName) => {
      // this.jd = ''
      this.category = categoryName;
      this.rankId = '';
      this.riskLevel = '';
      this.riskType = '';
      this.currentPoiType = 'category';
      this.get_wbdList_data('category');
    }),
      // 风险类别
      eventBus.$on('drawPointByRiskType', (riskType) => {
        // this.jd = ''
        this.category = '';
        this.rankId = '';
        this.riskType = riskType;
        this.riskLevel = '';
        this.currentPoiType = 'riskType';
        this.get_wbdfxlxList_data('riskType', this.riskType);
        // this.get_wbdList_data('riskType', this.riskType);
      }),
      // 风险等级
      eventBus.$on('drawPointByRiskLevel', (riskLevel) => {
        // this.jd = ''
        this.category = '';
        this.rankId = '';
        this.riskType = '';
        this.riskLevel = riskLevel;
        this.currentPoiType = 'riskLevel';
        this.get_wbdRiskList_data('riskLevel', this.riskLevel);
      });
    eventBus.$on('resetGlobalJD', (riskLevel) => {
      this.jd = '';
    });
  },
  mounted() {
    this.initMapWithTopDataVuex();
    // this.getTopData();
    // this.get_all_wbdList_data();
    // timer = setInterval(() => {
    //   this.getTopData();
    //   if (this.startVal == 0) {
    //     this.startVal = 0.1;
    //   } else {
    //     this.startVal = 0;
    //   }
    // }, 10000);
  },
  beforeDestroy() {
    // clearInterval(timer);
  },
  methods: {
    get_wbdRiskList_data(logo, type = '') {
      let params1 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: this.riskLevel,
        fxlx: this.riskType,
        isGraden: 0,
        pageSize: 600,
        publishName: '',
        rank: this.rankId,
        trialList: [],
      };
      console.log('params1', params1);
      console.log(logo, type);
      if (params1.fxdj) {
        if (params1.fxdj == 1) {
          let track = [
            {
              activation: '0',
              category: '古遗址',
              id: '2',
              jd: '进化镇',
              lxdh: null,
              maxLevel: '一级',
              paths: null,
              poi: '120.2792,30.0097',
              publishName: '茅湾里窑址',
              rank: '国保',
              sfxs: '0',
              xcy: null,
              yjbs: '0',
              yjcs: '0',
              zgcs: '0',
            },
          ];
          eventBus.$emit('drawCulturalPoi', track, logo, type);
        } else {
          let p1 = wbd_list2(params1);
          let p2 = wbd_list3(params1);
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
            let after = arr1.filter((ele) => {
              return ele.publishName != '茅湾里窑址';
            });
            eventBus.$emit('drawCulturalPoi', after, logo, type);
          });
        }
      } else {
        let p1 = wbd_list2(params1);
        let p2 = wbd_list3(params1);
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
          eventBus.$emit('drawCulturalPoi', arr1, logo, type);
        });
      }
    },
    formatValue(num) {
      return (+num).toLocaleString();
    },
    initMapWithTopDataVuex() {
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: '',
        bumpPointId: '',
      });
    },
    // 获取顶部数据
    getTopData() {
      //   get_top_data().then(res => {
      //     let data = res.data.data;
      //     this.topList[0].num = data.reportNum1;
      //     this.topList[1].num = data.reportNum2;
      //     this.topList[2].num = data.reportNum3;
      //   });
      this.currentJd = this.hookMapReactionWithTopData.jd;
      this.currentBumpPointId = this.hookMapReactionWithTopData.bumpPointId;
      const requestData = {
        jd: this.currentJd,
        bumpPointId: this.currentBumpPointId,
      };
      screenV3Zdtjv2(requestData).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          // if (shorter) {
          //   this.topList[0].num = shorter.reportNum1;
          //   this.topList[1].num = shorter.reportNum2;
          //   this.topList[2].num = shorter.reportNum3;
          // }
          if (shorter) {
            this.topList[0].num = shorter.reportNum1;
            this.topList[1].num = shorter.reportNum2;
            this.topList[2].num = shorter.reportNum3;
            /*   if (shorter.reportNum3) {
              let num = +shorter.reportNum3;
              if (num > 1000) {
                let after = num / 10;
                let sec = parseInt(after);
                this.topList[2].num = sec;
              } else {
                this.topList[2].num = shorter.reportNum3;
              }
            } */
          }
        }
      });
    },
    // 顶部点击，显示弹框
    itemClick(name) {
      switch (name) {
        case '待处理任务':
          this.isShow_willDo = true;
          break;
        case '设备总预警':
          this.isShow_warning = true;
          break;
        case '已处理任务':
          this.isShow_hasDone = true;
          break;
        default:
          break;
      }
    },

    // 获取全部文物点位
    get_all_wbdList_data() {
      let params1 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        // rank: '14da5819da904c4ab1d9d94a961ca27a',
        rank: '',
        trialList: [],
      };
      let params2 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        rank: 'cef2a80fbea6df89578ad5599b67b71f',
        trialList: [],
      };
      let params3 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        rank: '2bf3be523de944ec3ee1ad832a7a2587',
        trialList: [],
      };
      let params4 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 300,
        publishName: '',
        rank: 'b16db07f34112b9b0fc6d2b54214e0aa',
        trialList: [],
      };
      // let p1 = wbd_list2(params1)
      // let p2 = wbd_list2(params2)
      // let p3 = wbd_list2(params3)
      // let p4 = wbd_list2(params4)
      // Promise.all([p1, p2, p3, p4]).then((res) => {
      //   let arr1 = res[0].data.data.list
      //   let arr2 = res[1].data.data.list
      //   let arr3 = res[2].data.data.list
      //   let arr4 = res[3].data.data.list
      //   let arr = arr1
      //     .concat(arr2)
      //     .concat(arr3)
      //     .concat(arr4)
      //   console.log('9876000', arr)
      //   eventBus.$emit('drawCulturalPoi', arr, 'init')
      // })
      let p1 = wbd_list2(params1);
      let p2 = wbd_list3(params1);
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
        eventBus.$emit('drawCulturalPoi', arr1, 'init');
      });
    },
    get_wbdfxlxList_data(logo, type = '') {
      let params1 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: this.riskLevel,
        fxlx: this.riskType,
        isGraden: 0,
        pageSize: 600,
        publishName: '',
        rank: this.rankId,
        trialList: [],
      };
      switch (this.riskType) {
        case '1':
          if (params1.jd) {
            let after1 = staticfxlx1.filter((ele) => {
              if (params1.jd) {
                return params1.jd.indexOf(ele.jd) > -1;
              } else {
                return ele;
              }
            });
            eventBus.$emit('drawCulturalPoi', after1, logo, type);
          } else {
            eventBus.$emit('drawCulturalPoi', staticfxlx1, logo, type);
          }
          break;
        case '2':
          if (params1.jd) {
            let after2 = staticfxlx2.filter((ele) => {
              if (params1.jd) {
                return params1.jd.indexOf(ele.jd) > -1;
              } else {
                return ele;
              }
            });
            eventBus.$emit('drawCulturalPoi', after2, logo, type);
          } else {
            eventBus.$emit('drawCulturalPoi', staticfxlx2, logo, type);
          }
          break;
        case '3':
          if (params1.jd) {
            let after3 = staticfxlx3.filter((ele) => {
              if (params1.jd) {
                return params1.jd.indexOf(ele.jd) > -1;
              } else {
                return ele;
              }
            });
            eventBus.$emit('drawCulturalPoi', after3, logo, type);
          } else {
            eventBus.$emit('drawCulturalPoi', staticfxlx3, logo, type);
          }
          break;
        case '4':
          if (params1.jd) {
            let after4 = staticfxlx4.filter((ele) => {
              if (params1.jd) {
                return params1.jd.indexOf(ele.jd) > -1;
              } else {
                return ele;
              }
            });
            eventBus.$emit('drawCulturalPoi', after4, logo, type);
          } else {
            eventBus.$emit('drawCulturalPoi', staticfxlx4, logo, type);
          }
          break;
      }
      //   let p1 = wbd_list2(params1);
      //   let p2 = wbd_list3(params1);
      //   Promise.all([p1, p2]).then((res) => {
      //     let arr1 = res[0].data.data.list;
      //     let arr4 = res[1].data.data.list;
      //     arr1.forEach((ele, index) => {
      //       ele.activation = arr4[index].activation;
      //       ele.lxdh = arr4[index].lxdh;
      //       ele.category = arr4[index].category;
      //       ele.maxLevel = arr4[index].maxLevel;
      //       ele.paths = arr4[index].paths;
      //       ele.rank = arr4[index].rank;
      //       ele.xcy = arr4[index].xcy;
      //       ele.yjbs = arr4[index].yjbs;
      //     });
      //     console.log(  JSON.parse( JSON.stringify( arr1 ) ) )
      //     eventBus.$emit('drawCulturalPoi', arr1, logo, type);
      //   });
    },
    get_wbdList_data(logo, type = '') {
      let params1 = {
        jd: this.jd,
        category: this.category,
        currentPage: 1,
        id: '',
        fxdj: this.riskLevel,
        fxlx: this.riskType,
        isGraden: 0,
        pageSize: 600,
        publishName: '',
        rank: this.rankId,
        trialList: [],
      };
      let p1 = wbd_list2(params1);
      let p2 = wbd_list3(params1);
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
        eventBus.$emit('drawCulturalPoi', arr1, logo, type);
      });
    },
    // 单独搜索
    search(value) {
      //   console.log('搜索', value);
      let params1 = {
        jd: '',
        category: '',
        currentPage: 1,
        id: '',
        fxdj: '',
        fxlx: '',
        isGraden: 0,
        pageSize: 1,
        publishName: value,
        rank: '',
        trialList: [],
      };
      let p1 = wbd_list2(params1);
      let p2 = wbd_list3(params1);
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
        eventBus.$emit('drawCulturalPoi', arr1, 'fly');
      });
    },
  },
};
</script>
<style lang="less" scoped>
.top-box {
  width: 759px;
  height: 130px;
  padding-top: 10px;
  box-sizing: border-box;
  .search-co {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  .top {
    width: 100%;
    height: 91px;
    z-index: 2;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    user-select: none;
    .item {
      width: 204px;
      height: 91px;
      transform: scaleX(80%) scaleY(80%);
      box-sizing: border-box;
      padding: 0 9px 16px 9px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      span {
        margin-left: 80px;
      }
      span:nth-child(1) {
        // font-family: LCDDIGITALFONT;
        font-family: DINPro-Bold;
        font-size: 26px;
        letter-spacing: 3px;
        color: #ffca97;
        margin-bottom: 2px;
      }
      span:nth-child(2) {
        font-family: DengXian;
        font-family: SourceHanSansCN-Regular;
        font-size: 14px;
        letter-spacing: 1px;
        color: #d4f6ff;
      }
    }
  }
}
</style>
