import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { getPoiInfo } from '@/api/xsApi3';
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});
Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    allPoi: [],
    currentRouteName: '',
    hugeListData: [],
    commonStreetList: [],
    hookMapReactionWithTopData: {
      jd: '',
      bumpPointId: '',
    },
    transferEventTrack: {},
    currentWBDinfo: {},
    temporaryFXSourceYBList: [],
    tempHugeIntelligenceList: [],
    globalBottomFlag: '',
    matchGlobalBottomNumber: 0,
    currentAreaName: '萧山区',
    needGlobalLoadModel: false,
    isGlobalShowModel: false,
    yxzsCopyRiskPoints: [],
    yxzsCopyRiskNumberPoints: 0,
    mapGoBackNumber: 0,
    yxzsCopyRiskTypePoints: 0,
    yxzsCopyRiskTypeData: [],
    yxzsCopyRebootPoint: 0,
    xbgCopyRankLevel: '',
    xbgCopyRankPoint: 0,
    xbgCopyRebootPoint: 0,
    xbgCopyRankType: '',
    xbgCopyRankTypePoint: 0,
    zbzCopyAIPoints: 0,
    zbzCopyAIData: [],
    hb365CopyPoints: 0,
    hb365CopyPartData: [],
    hb365CopyPartPoints: 0,
    mainMapSearchPoints: 0,
    mainMapSearchParams: {
      category: '',
      street: '',
    },
    isGlobalShowCenter: true,
    isGlobalShowTop: true,
    isGlobalShowZBZ2: false,
    xbgCopyRankDisturbLevel: '',
    xbgCopyRankDisturbArea: '',
    xbgCopyRankDisturbPoint: 0,
    xbgCopyRankYXZSLevel: '',
    xbgCopyRankYXZSArea: '',
    xbgCopyRankYXZSPoint: 0,
    updateIframeFlag: 0,
  },
  getters: {
    fetchHookMapReactionWithTopData(state) {
      return state.hookMapReactionWithTopData;
    },
    allPoi: (state) => state.allPoi,
  },
  mutations: {
    setUpdateIframeFlag(state, payload) {
      state.updateIframeFlag++;
    },
    setXbgCopyRankYXZSLevel(state, payload) {
      state.xbgCopyRankYXZSLevel = payload.level;
      state.xbgCopyRankYXZSArea = payload.area;
      state.xbgCopyRankYXZSPoint++;
    },
    setXbgCopyRankDisturbLevel(state, payload) {
      state.xbgCopyRankDisturbLevel = payload.level;
      state.xbgCopyRankDisturbArea = payload.area;
      state.xbgCopyRankDisturbPoint++;
    },
    SET_AII_POI: (state, res) => {
      state.allPoi = res;
    },
    setIsGlobalShowZBZ2(state, payload) {
      state.isGlobalShowZBZ2 = payload;
    },
    setIsGlobalShowTop(state, payload) {
      state.isGlobalShowTop = payload;
    },
    setIsGlobalShowCenter(state, payload) {
      state.isGlobalShowCenter = payload;
    },
    setMainMapDatas(state, payload) {
      state.mainMapSearchPoints++;
      state.mainMapSearchParams = payload;
    },
    setHb365CopyPartData(state, payload) {
      state.hb365CopyPartPoints++;
      state.hb365CopyPartData = payload;
    },
    setHb365CopyPoints(state, payload) {
      state.hb365CopyPoints++;
    },
    setZbzCopyAIType(state, payload) {
      state.zbzCopyAIData = payload;
      state.zbzCopyAIPoints++;
    },
    setXbgCopyRankType(state, payload) {
      state.xbgCopyRankType = payload;
      state.xbgCopyRankTypePoint++;
    },
    setXbgCopyRebootPoint(state, payload) {
      state.xbgCopyRebootPoint++;
    },
    setXbgCopyRankLevel(state, payload) {
      state.xbgCopyRankLevel = payload;
      state.xbgCopyRankPoint++;
    },
    setYxzsCopyRebootPoint(state, payload) {
      state.yxzsCopyRebootPoint++;
    },
    setYxzsCopyRiskTypePoints(state, payload) {
      state.yxzsCopyRiskTypePoints++;
      state.yxzsCopyRiskTypeData = payload;
    },
    setMapGoBackNumber(state, payload) {
      state.mapGoBackNumber++;
    },
    setYxzsCopyRiskPoints(state, payload) {
      state.yxzsCopyRiskPoints = payload;
      state.yxzsCopyRiskNumberPoints++;
    },
    setIsGlobalShowModel(state, payload) {
      state.isGlobalShowModel = payload;
    },
    setNeedGlobalLoadModel(state, payload) {
      state.needGlobalLoadModel = payload;
    },
    setCurrentAreaName(state, payload) {
      state.currentAreaName = payload;
    },
    setMatchGlobalBottomNumber(state, payload) {
      state.matchGlobalBottomNumber++;
      state.globalBottomFlag = payload;
    },
    changeRoute(state, routeName) {
      state.currentRouteName = routeName;
    },
    setHugeListData(state, payload) {
      state.hugeListData = payload;
    },
    setCommonStreetList(state, payload) {
      state.commonStreetList = payload;
    },
    setHookMapReactionWithTopData(state, payload) {
      state.hookMapReactionWithTopData = payload;
    },
    setTransferEventTrack(state, payload) {
      state.transferEventTrack = payload;
    },
    setCurrentWBDinfo(state, payload) {
      state.currentWBDinfo = payload;
    },
    setTemporaryFXSourceYBList(state, payload) {
      state.temporaryFXSourceYBList = payload;
    },
    setTempHugeIntelligenceList(state, payload) {
      state.tempHugeIntelligenceList = payload;
    },
  },
  actions: {
    getRoute({ commit }, routeName) {
      commit('changeRoute', routeName);
    },
    getAllPoi({ commit, state }) {
      // console.log('2323')
      return new Promise((resolve, reject) => {
        getPoiInfo()
          .then((response) => {
            commit('SET_AII_POI', response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
