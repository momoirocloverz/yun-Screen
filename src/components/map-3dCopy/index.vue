<template>
  <div class="mapMasterCon">
    <div class="tool">
      <div class="item">
        <div class="text" @click="culturalBtnClick(!culturalPoiBoxShow)"></div>
        <culturalPoiBox :boxShow="culturalPoiBoxShow" @close="culturalBtnClick(false)" />
      </div>
    </div>
    <div id="map" style="margin: 0 auto; width: 46%; height: 100%; background-color: transparent; border: rgba(255, 255, 255, 0)"></div>
    <div class="back" v-show="isClickStreet" @click="zoom('back')"></div>
    <HBYDetailCopy :isShow="isShow_hbyDetail" @close="close_hbyDetail" />
    <div class="zoom">
      <div class="fireTrigger" @click="onfire"></div>
    </div>
    <div id="popElement" class="popTestup">
      <div class="triangle"></div>
      <div class="warning-box">
        <div class="row1">
          <span>{{ rhdata.warningType || '火灾预警' }}</span>
          <!-- <div class="btn" @click="eventTrack">事件追踪</div> -->
          <div class="btn" @click.stop="reAudit($event)">人工复核</div>
        </div>
        <div class="row2">
          <span>文物点：</span>
          <span>{{ rhdata.pointName || '务本堂' }}</span>
        </div>
        <div class="row2">
          <span>时间：</span>
          <span>{{ rhdata.time || new Date().Format('yyyy-MM-dd HH:mm:ss') }}</span>
        </div>
        <!-- <div class="row2">
          <span>描述：</span>
          <span>{{ rhdata.remark || '电流电压过高' }}</span>
        </div> -->
        <div class="row2">
          <span>监测值：</span>
          <span>{{ rhdata.warningValue || '暂无' }}</span>
        </div>
      </div>
    </div>
    <FXFL
      :isShow="isShow_fxfl"
      :FXFLOtherParams="FXFLOtherParams"
      @close="
        () => {
          this.isShow_fxfl = false;
        }
      "
    />
    <yxzsCardModal
      :isShow="isShow_yxzsCard"
      :yxzsCardOtherParams="yxzsCardOtherParams"
      @close="
        () => {
          this.isShow_yxzsCard = false;
        }
      "
    />
    <WarningEventReAudit
      :isShow="isShowReAudit"
      @close="
        () => {
          this.isShowReAudit = false;
        }
      "
    />
    <TableList :isShow="isShowTableList" :logo1="logo1" :logo2="logo2" @close="closeListBox" />
  </div>
</template>
<script>
import { eventBus } from '@/main';
import _ from 'lodash';
import {} from '@/api/api';
import { get_zpdt_data } from '@/api/xsApi3.js';
import { zoomAction, setEveryTownFlagAction, setCulturalPoints, showPopupAction, resetLayersAndZoom, showYxzsFireRiskPopupAction, showZbzPopupAction } from '@/components/map-3dCopy/part1.js';
import {
  calculateZBZPoints,
  calculate365Points,
  differentRouterClick,
  forTownClickForRoute,
  forPointClickAction,
  fxzsCopyRiskLevelDraw,
  fxzsCopyRiskTypeDraw,
  calculateHyperZBZPoints,
} from '@/components/map-3dCopy/part2.js';
import { xbgRankPoint, xbgCopyCulturalType, setZBZAIPoints, part365Points, mainSearchPoint, xbgRankDisturbPoint, xbgRankYXZSPoint } from '@/components/map-3dCopy/part3.js';
import { mapState } from 'vuex';
// const geoJsonData_county = new acol_dea().decodeGeoJson({ data: firstStr });
// const special = new acol_dea().decodeGeoJson({ data: realData });
import xiaoshanNewData from '@/data/XiaoshanNewCompression.json';
import xiaoshanStreetData from '@/data/萧山镇街.json';
import xiaoshanNewTownData from '@/data/townData.json';
import xs_map from '@/assets/img4/xs_map.png';
let parse = new acol_dea().decodeGeoJson({ data: xiaoshanNewData });
// let bridge = special.features.filter((ele) => {
//   return ele.properties.小地名;
// });
// const globalData = {
//   type: 'FeatureCollection',
//   features: bridge,
// };
export default {
  name: 'map-3d',
  components: {
    // LegendBox: () => import(/* webpackChunkName: "legend1Box" */ '@/components/xiaoshanComponentsNew/firstPage/components/legendBox'),
    // VideoWindow: () => import(/* webpackChunkName: "VideoWindow" */ '@/components/newComponents/videoWindow'),
    culturalPoiBox: () => import(/* webpackChunkName: "culturalPoiBoxCopy" */ '@/components/mapPublicComponents/culturalPoiBoxCopy.vue'),
    // checkPeopleBox: () => import(/* webpackChunkName: "checkPeopleBox" */ '@/components/mapPublicComponents/checkPeopleBox.vue'),
    // YjBox: () => import(/* webpackChunkName: "YjBox" */ '@/components/mapPublicComponents/YJ-Box'),
    // TaskDispatch: () => import(/* webpackChunkName: "TaskDispatch" */ '@/components/xiaoshanScreenTenMouth/components/taskDispatch'),
    HBYDetailCopy: () => import(/* webpackChunkName: "HBYDetailCopy" */ '@/components/xiaoshanScreenTenMouth/hb365/secondPage/hbyDetailCopy.vue'),
    FXFL: () => import(/* webpackChunkName: "FXF12LFormMap" */ '@/components/xiaoshanScreenTenMouth/yxzs/secondPage/fxflForMap'),
    yxzsCardModal: () => import(/* webpackChunkName: "yxzsCardModal" */ '@/components/xiaoshanScreenTenMouth/yxzs/secondPage/yxzsCardModal'),
    WarningEventReAudit: () => import(/* webpackChunkName: "WarningEventReAudit" */ '@/components/xiaoshanScreenTenMouth/components/warningEventReAudit'),
    TableList: () => import(/* webpackChunkName: "TableListMap" */ '@/components/xiaoshanScreenTenMouth/zbz/secondPage/tableList'),
  },
  data() {
    return {
      logo1: '',
      logo2: '',
      isShowTableList: false,
      yxzsCardOtherParams: {},
      isShow_yxzsCard: false,
      FXFLOtherParams: {},
      isShow_fxfl: false,
      rhdata: {},
      showPopTestup: true,
      culturalPoiBoxShow: false,
      isShow_hbyDetail: false,
      townName: '',
      villageName: '',
      areaRange: '',
      area_code: 'county',
      acMap: new acol_map(),
      vector_back: null,
      vector_area: null,
      vector_hl: null,
      vector_sub_highLight: null,
      vector_data: null,
      vector_flag_data: null,
      vector_popup_data: null,
      overLayer: null,
      acolLayer: null,
      acolUtil: new acol_util(),
      acolSearch: new acol_search(),
      showDataTag: '1',
      isClickStreet: false,
      path: `ws://223.65.209.139:18180/hik/broadcast/${Math.random()}`,
      socket: '',
      isShowReAudit: false, // 是否显示人工复核页面
    };
  },
  computed: {
    ...mapState([
      'currentRouteName',
      'globalBottomFlag',
      'matchGlobalBottomNumber',
      'yxzsCopyRiskNumberPoints',
      'yxzsCopyRiskPoints',
      'mapGoBackNumber',
      'yxzsCopyRiskTypePoints',
      'yxzsCopyRiskTypeData',
      'yxzsCopyRebootPoint',
      'xbgCopyRankPoint',
      'xbgCopyRankLevel',
      'xbgCopyRebootPoint',
      'xbgCopyRankType',
      'xbgCopyRankTypePoint',
      'zbzCopyAIPoints',
      'zbzCopyAIData',
      'hb365CopyPoints',
      'hb365CopyPartData',
      'hb365CopyPartPoints',
      'mainMapSearchPoints',
      'mainMapSearchParams',
      'xbgCopyRankDisturbPoint',
      'xbgCopyRankDisturbLevel',
      'xbgCopyRankDisturbArea',
      'xbgCopyRankYXZSLevel',
      'xbgCopyRankYXZSArea',
      'xbgCopyRankYXZSPoint',
    ]),
  },
  watch: {
    currentRouteName(val) {},
    matchGlobalBottomNumber(val) {
      this.tabSwitchReBirth(this.globalBottomFlag);
    },
    yxzsCopyRiskNumberPoints(val) {
      fxzsCopyRiskLevelDraw.bind(this)(this.yxzsCopyRiskPoints);
    },
    yxzsCopyRiskTypePoints(val) {
      fxzsCopyRiskTypeDraw.bind(this)(this.yxzsCopyRiskTypeData);
    },
    yxzsCopyRebootPoint(val) {
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: '',
        bumpPointId: '',
      });
      this.$store.commit('setCurrentAreaName', '萧山区');
      this.vector_flag_data.getSource().clear();
      if (this.vector_popup_data) {
        this.vector_popup_data.getSource().clear();
      }
      resetLayersAndZoom.bind(this)();
      this.setEveryTownMark();
    },
    xbgCopyRankYXZSPoint(val) {
      xbgRankYXZSPoint.bind(this)(this.xbgCopyRankYXZSLevel, this.xbgCopyRankYXZSArea);
    },
    xbgCopyRankDisturbPoint(val) {
      xbgRankDisturbPoint.bind(this)(this.xbgCopyRankDisturbLevel, this.xbgCopyRankDisturbArea);
    },
    xbgCopyRankPoint(val) {
      xbgRankPoint.bind(this)(this.xbgCopyRankLevel);
    },
    xbgCopyRebootPoint(val) {
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: '',
        bumpPointId: '',
      });
      this.$store.commit('setCurrentAreaName', '萧山区');
      this.vector_flag_data.getSource().clear();
      if (this.vector_popup_data) {
        this.vector_popup_data.getSource().clear();
      }
      resetLayersAndZoom.bind(this)();
      this.setCulturalPoints();
    },
    xbgCopyRankTypePoint(val) {
      xbgCopyCulturalType.bind(this)(this.xbgCopyRankType);
    },
    zbzCopyAIPoints(val) {
      setZBZAIPoints.bind(this)(this.zbzCopyAIData);
    },
    hb365CopyPoints(val) {
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: '',
        bumpPointId: '',
      });
      this.$store.commit('setCurrentAreaName', '萧山区');
      this.vector_flag_data.getSource().clear();
      if (this.vector_popup_data) {
        this.vector_popup_data.getSource().clear();
      }
      resetLayersAndZoom.bind(this)();
      this.set365Points();
    },
    hb365CopyPartPoints(val) {
      part365Points.bind(this)(this.hb365CopyPartData);
    },
    mainMapSearchPoints(val) {
      mainSearchPoint.bind(this)(this.mainMapSearchParams);
    },
  },
  mounted() {
    this.init();
    this.initWebSocket();
  },
  methods: {
    closeListBox() {
      this.isShowTableList = false;
    },
    initWebSocket() {
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket');
      } else {
        this.socket = new WebSocket(this.path);
        this.socket.onopen = this.open;
        this.socket.onerror = this.error;
        this.socket.onmessage = this.getMessage;
      }
    },
    getMessage(msg) {
      if (JSON.parse(msg.data) == 1) return;
      let _warningData = JSON.parse(msg.data);
      // this.isWarning = true
      let time = new Date().Format('yyyy-Mm-Dd HH:mm:ss');
      // 更新任务进度数据
      if (_warningData['事件类型'] === '例行检查提交') {
        // setTimeout(() => {
        //   eventBus.$emit("updateTimeData", _warningData); // 更新事件详情时间进度图数据
        //   eventBus.$emit("updateApi"); // 检查完成后更新最新的风险态势数据
        //   this.clearMarkerAndBox();
        // }, 2000);
      } else {
        this.rhdata = {
          poi: _warningData['文物点经纬度'].split(','),
          pointName: _warningData['文物点名称'],
          time: _warningData['发生时间'] || time,
          warningType: _warningData['事件类型'] || '火灾预警',
          warningValue: _warningData.value + _warningData.valueUnit || _warningData['当前温度'] || _warningData['最大温度'] || _warningData['检测值'] || '暂无',
        };
        this.overLayer.setPosition(undefined);
        let point = this.rhdata.poi;
        this.overLayer.setPosition(point);
      }
    },
    open() {
      //   console.log('预警socket连接成功')
    },
    error() {
      //   console.log('连接错误')
    },
    eventTrack() {
      eventBus.$emit('isShowCenterAndTop', false);
      // this.$store.commit('setIsGlobalShowCenter', false);
      // this.$store.commit('setIsGlobalShowTop', false);
      this.overLayer.setPosition(undefined);
    },
    reAudit(e) {
      e.preventDefault();
      this.isShowReAudit = true;
    },
    onfire() {
      let point = [120.30147736711149, 29.959598423120653];
      this.overLayer.setPosition(point);
    },
    close_hbyDetail() {
      this.isShow_hbyDetail = false;
    },
    culturalBtnClick(isShow) {
      if (isShow) {
        this.culturalPoiBoxShow = true;
      } else {
        this.culturalPoiBoxShow = false;
      }
    },
    zoom(type) {
      zoomAction.bind(this)(type);
      this.differentRouteRequest();
    },
    showZbzPopupAction(item) {
      showZbzPopupAction.bind(this)(item);
    },
    showYxzsFireRiskPopupAction(item) {
      showYxzsFireRiskPopupAction.bind(this)(item);
    },
    showPopupAction(item) {
      showPopupAction.bind(this)(item);
    },
    differentRouteRequest() {
      switch (this.$route.name) {
        case 'yxzsCopy':
          this.setEveryTownMark();
          break;
        case 'xbgCopy':
          this.setCulturalPoints();
          break;
        case 'zbzCopy':
          this.newZbzMapPoints();
          break;
        case 'zbz2Copy':
          this.setzbzPoints();
          break;
        case 'hb365Copy':
          this.set365Points();
          break;
      }
    },
    tabSwitchReBirth: _.debounce(function (val) {
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: '',
        bumpPointId: '',
      });
      if (this.vector_popup_data) {
        this.vector_popup_data.getSource().clear();
      }
      this.vector_flag_data.getSource().clear();
      resetLayersAndZoom.bind(this)();
      if (this.isClickStreet) {
        this.isClickStreet = false;
      }
      switch (val) {
        case '/yxzsCopy':
          this.setEveryTownMark();
          break;
        case '/xbgCopy':
          this.setCulturalPoints();
          break;
        case '/zbzCopy':
          this.newZbzMapPoints();
          break;
        case '/zbz2Copy':
          this.setzbzPoints();
          break;
        case '/hb365Copy':
          this.set365Points();
          break;
      }
    }, 1500),
    newZbzMapPoints() {
      calculateHyperZBZPoints.bind(this)();
    },
    setzbzPoints() {
      calculateZBZPoints.bind(this)();
    },
    set365Points() {
      calculate365Points.bind(this)();
    },
    init() {
      this.acMap.initMap({
        id: 'map',
        center: [120.311912262281, 30.10925126811137],
        zoom: 6,
        minZoom: 3,
        maxZoom: 18,
        constrainResolution: false,
        padding: [130, 30, 0, 0],
        rotation: 0.15,
        extent: [119.8999, 29.6077783203125, 120.75110778808594, 30.599972534179688],
      });
      this.acolLayer = new acol_layer(this.acMap.map);
      this.addAllLayers();
      this.layoutTheMap(this.area_code);
      this.globalSelectAction();
      this.globalMouseOverAction();
      this.differentRouteRequest();
    },
    selectComplexIntegration() {
      differentRouterClick.bind(this)();
    },
    globalSelectAction() {
      let mapSelect = new ol.interaction.Select();
      this.acMap.map.addInteraction(mapSelect);
      let state = this;
      mapSelect.on('select', function (e) {
        this.getFeatures().clear();
        if (!e.selected.length) return;
        let props = e.selected[0].getProperties();
        // console.log('select 事件', props);
        if (props.type && props.type == 'town') {
          //   console.log('globalSelectAction town');
          state.area_code = 'town';
          state.townName = props.name;
          if (!state.isClickStreet) {
            state.layoutTheMap(props.type);
          }
        }
        if (props.addon) {
          forPointClickAction.bind(state)(props.addon);
        }
      });
    },
    globalMouseOverAction() {
      this.acMap.mapEventOn((e) => {
        let features = this.acMap.map.getFeaturesAtPixel(e.pixel);
        this.vector_hl.getSource().clear();
        this.vector_sub_highLight.getSource().clear();
        if (features.length) {
          if (features[0].getProperties()['type'] == 'town') {
            let hlFeature = features[0].clone();
            switch (this.area_code) {
              case 'county':
                this.vector_hl.getSource().addFeatures([hlFeature]);
                // let value = this.vector_hl.getSource().getExtent();
                // let center = new ol.extent.getCenter(value);
                break;
              case 'town':
                this.vector_sub_highLight.getSource().addFeatures([hlFeature]);
                break;
            }
          }
        }
        var pixel = this.acMap.map.getEventPixel(e.originalEvent);
        this.acMap.map.forEachFeatureAtPixel(pixel, (feature) => {
          this.acMap.map.getTargetElement().style.cursor = '';
          this.vector_popup_data.getSource().clear();
          if (feature && feature.values_) {
            if (feature.values_.addon) {
              if (feature.values_.addon.pageSource) {
                switch (feature.values_.addon.pageSource) {
                  case 'xbgCopy':
                    this.acMap.map.getTargetElement().style.cursor = this.acMap.map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
                    if (feature.values_.addon && feature.values_.addon.pageSource == 'xbgCopy') {
                      this.showPopupAction(feature.values_.addon);
                    }
                    break;
                  case 'zbzCopy':
                    this.acMap.map.getTargetElement().style.cursor = this.acMap.map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
                    if (feature.values_.addon && feature.values_.addon.pageSource == 'zbzCopy') {
                      this.showZbzPopupAction(feature.values_.addon);
                    }
                    break;
                  case 'yxzsCopyFireRiskPoint':
                    this.acMap.map.getTargetElement().style.cursor = this.acMap.map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
                    // if (feature.values_.addon && feature.values_.addon.pageSource == 'yxzsCopyFireRiskPoint') {
                    //   this.showYxzsFireRiskPopupAction(feature.values_.addon);
                    // }
                    break;
                  case 'yxzsCopy':
                    this.acMap.map.getTargetElement().style.cursor = this.acMap.map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
                    if (feature.values_.addon && feature.values_.addon.pageSource == 'yxzsCopy') {
                      this.showPopupAction(feature.values_.addon);
                    }
                    break;
                  case 'yxzsCopyRiskLevel':
                    this.acMap.map.getTargetElement().style.cursor = this.acMap.map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
                    if (feature.values_.addon && feature.values_.addon.pageSource == 'yxzsCopyRiskLevel') {
                      this.showPopupAction(feature.values_.addon);
                    }
                    break;
                  case 'yxzsCopyRiskType':
                    this.acMap.map.getTargetElement().style.cursor = this.acMap.map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
                    if (feature.values_.addon && feature.values_.addon.pageSource == 'yxzsCopyRiskType') {
                      this.showPopupAction(feature.values_.addon);
                    }
                    break;
                  case 'globalSearch':
                    this.acMap.map.getTargetElement().style.cursor = this.acMap.map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
                    if (feature.values_.addon && feature.values_.addon.pageSource == 'globalSearch') {
                      this.showPopupAction(feature.values_.addon);
                    }
                    break;
                  case 'yxzsCard':
                    this.acMap.map.getTargetElement().style.cursor = this.acMap.map.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
                    break;
                }
              }
            }
          }
          return feature;
        }); //查询方式有很多
      }, 'MOUSE_MOVE');
    },
    addAllLayers() {
      // 初始化图层组
      this.vector_back = this.acolLayer.vectorLayer({
        name: 'background',
        type: 'polygon',
        style: {
          fill: { color: 'rgba(69, 98, 102, 0.1)' },
          stroke: { color: 'rgba(135,206,250,1.0)', width: 3 },
        },
        zIndex: 1,
      });
      this.vector_area = this.acolLayer.vectorLayer({
        name: 'area',
        type: 'polygon',
        style: {
          fill: {
            color: 'rgba(24, 73, 128, 0.0)',
          },
          stroke: { color: 'rgba(22,178,255,0.7)', width: 1 },
        },
        zIndex: 3,
      });
      this.vector_hl = this.acolLayer.vectorLayer({
        name: '高亮面图层',
        type: 'polygon',
        style: {
          fill: { color: 'rgba(24, 73, 128, 0.45)' },
          stroke: {},
          text: {
            field: 'name',
            fill: { color: '#FFD700' },
            stroke: { color: 'rgba(255, 0, 0, 0.8)', width: 1 },
            font: '16px Calibri',
          },
        },
        zIndex: 5,
      });
      this.vector_sub_highLight = this.acolLayer.vectorLayer({
        name: '第二个高亮面图层',
        type: 'polygon',
        style: {
          fill: { color: 'rgba(24, 73, 128, 0)' },
          stroke: {},
          text: {
            field: 'name',
            fill: { color: '#FFD700' },
            stroke: { color: 'rgba(255, 0, 0, 0.8)', width: 2 },
            font: '26px Calibri',
          },
        },
        zIndex: 5,
      });
      this.vector_data = this.acolLayer.vectorLayer({
        name: '地块',
        type: 'polygon',
        zIndex: 4,
      });
      this.vector_flag_data = this.acolLayer.vectorLayer({
        name: '旗帜',
        type: 'point',
        style: {
          fill: {
            color: 'rgba(0, 245, 161, 0.4)',
          },
          stroke: { color: 'rgba(0, 245, 161, 1)', width: 2 },
        },
        zIndex: 6,
      });
      this.vector_popup_data = this.acolLayer.vectorLayer({
        name: 'popLayer',
        type: 'point',
        style: {
          fill: {
            color: 'rgba(0, 245, 161, 0.4)',
          },
          stroke: { color: 'rgba(0, 245, 161, 1)', width: 2 },
        },
        zIndex: 7,
      });
      this.addPopElement();
      this.acMap.addLayers([this.vector_back, this.vector_area, this.vector_hl, this.vector_data, this.vector_flag_data, this.vector_popup_data, this.vector_sub_highLight]);
    },
    addPopElement() {
      // https://openlayers.org/en/latest/examples/popup.html
      // https://geoserver.zjsszxc.com/iClient/forJavaScript/examples/openlayers/editor.html#Eg-ImageLayer
      //   https://juejin.cn/post/7025529005214269470
      let popElement = document.getElementById('popElement');
      if (this.acolLayer.getOverlayById('popElement')) {
        this.acolLayer.removeOverlayById('popElement');
      }
      this.overLayer = this.acolLayer.overLayer({ id: 'popElement', element: popElement, offset: [-50, -100], positioning: 'center-center', stopEvent: true, autoPan: false });
      this.acMap.map.addOverlay(this.overLayer);
    },
    setEveryTownMark() {
      setEveryTownFlagAction.bind(this)();
    },
    setCulturalPoints() {
      setCulturalPoints.bind(this)(['14da5819da904c4ab1d9d94a961ca27a', 'cef2a80fbea6df89578ad5599b67b71f', '2bf3be523de944ec3ee1ad832a7a2587']);
    },
    addBackImgLayer() {
      let fetchCenter = [120.07235717773438, 29.8477783203125, 120.65110778808594, 30.299972534179688];
      let layerOptions = [
        {
          name: 'imageLayer',
          layer: 'imageLayer',
          imageUrl: xs_map,
          mapName: 'asd',
          zIndex: 1,
          extent: fetchCenter,
        },
      ];
      this.acMap.addLayersByOptions(layerOptions);
    },
    getAreaLevelByCode(areaCode) {
      return areaCode;
    },
    rundata() {
      this.vector_data.getSource().clear();
      if (this.showDataTag == '1') {
        switch (this.area_code) {
          case 'county':
            // let dataFeatures = new ol.format.GeoJSON().readFeatures(globalData, { featureProjection: 'EPSG:4326' });
            // if (this.areaRange) {
            //   if (this.areaRange == '1') {
            //     dataFeatures = dataFeatures.filter((ele) => {
            //       return ele.values_.mj < 100;
            //     });
            //   }
            //   if (this.areaRange == '2') {
            //     dataFeatures = dataFeatures.filter((ele) => {
            //       return ele.values_.mj >= 100 && ele.values_.mj <= 200;
            //     });
            //   }
            //   if (this.areaRange == '3') {
            //     dataFeatures = dataFeatures.filter((ele) => {
            //       return ele.values_.mj > 200;
            //     });
            //   }
            // }
            // // this.vector_data.getSource().addFeatures(dataFeatures);
            break;
          case 'town':
            // let track = globalData.features.filter((ele) => {
            //   return ele.properties.town == this.townName;
            // });
            // let reMix = {
            //   type: 'FeatureCollection',
            //   features: track,
            // };
            // let sec = new ol.format.GeoJSON().readFeatures(reMix, { featureProjection: 'EPSG:4326' });
            // if (this.areaRange) {
            //   if (this.areaRange == '1') {
            //     sec = sec.filter((ele) => {
            //       return ele.values_.mj < 100;
            //     });
            //   }
            //   if (this.areaRange == '2') {
            //     sec = sec.filter((ele) => {
            //       return ele.values_.mj >= 100 && ele.values_.mj <= 200;
            //     });
            //   }
            //   if (this.areaRange == '3') {
            //     sec = sec.filter((ele) => {
            //       return ele.values_.mj > 200;
            //     });
            //   }
            // }
            // // this.vector_data.getSource().addFeatures(sec);
            break;
          case 'village':
            // let track1 = globalData.features.filter((ele) => {
            //   return ele.properties.xzq.indexOf(this.villageName) > -1;
            // });
            // let reMix1 = {
            //   type: 'FeatureCollection',
            //   features: track1,
            // };
            // let third = new ol.format.GeoJSON().readFeatures(reMix1, { featureProjection: 'EPSG:4326' });
            // // this.vector_data.getSource().addFeatures(third);
            break;
        }
      }
    },
    clearAllLayers() {
      if (this.vector_back) {
        this.vector_back.getSource().clear();
      }
      if (this.vector_area) {
        this.vector_area.getSource().clear();
      }
      if (this.vector_hl) {
        this.vector_hl.getSource().clear();
      }
      if (this.vector_sub_highLight) {
        this.vector_sub_highLight.getSource().clear();
      }
      if (this.vector_popup_data) {
        this.vector_popup_data.getSource().clear();
      }
      if (this.vector_flag_data) {
        this.vector_flag_data.getSource().clear();
      }
      if (this.overLayer) {
        this.overLayer.setPosition(undefined);
      }
    },
    tdtMaskByFeature(maskFeature) {
      this.acMap.removeLayerByName('tdtImg');
      // tdt底图图层加载
      let tdtLayer = this.acolLayer.tdtLayer({ name: 'tdtImg', sourceType: 'XYZ', type: 'img', isLabel: false, zIndex: 0 });
      // 天地图掩膜，掩膜最上层图层即可
      this.acolLayer.tdtLayerMaskByGeoJson({ layer: tdtLayer, data: maskFeature });
      // 添加图层
      this.acMap.addLayer(tdtLayer);
    },
    layoutTheMap(code, panTo = true) {
      // 背景要素、矢量面要素
      let geoJson_back = null,
        geoJson_area = null;
      // 根据行政区划等级判断执行逻辑
      switch (this.getAreaLevelByCode(code)) {
        case 'county':
          geoJson_back = parse;
          geoJson_area = xiaoshanNewTownData;
          this.isClickStreet = false;
          this.addBackImgLayer();
          this.acMap.showLayerByName('imageLayer');
          break;
        case 'town':
          //   console.log('点击之后 town');
          geoJson_back = xiaoshanNewTownData.features.find((ele) => {
            return ele.properties.name == this.townName;
          });
          geoJson_area = this.acolSearch.getGeoJsonFeaturesByKV(xiaoshanNewTownData, 'town', this.townName);
          this.$store.commit('setCurrentAreaName', this.townName);
          this.$store.commit('setHookMapReactionWithTopData', {
            jd: this.townName,
            bumpPointId: '',
          });
          forTownClickForRoute.bind(this)(this.townName);
          this.isClickStreet = true;
          this.acMap.hideLayerByName('imageLayer');
          break;
        default:
          console.log('编码有误');
      }
      if (geoJson_back && geoJson_area) {
        this.clearAllLayers();
        // 天地图掩膜
        this.tdtMaskByFeature(geoJson_back);
        // 矢量偏移、裁剪
        // let res_data = acolUtil.geoJsonTransformTranslate({ data: geoJson_back, distance: (getAreaLevelByCode(area_code) === 'county') ? 1 : 0.5, direction: 180 });
        let res_data = this.acolUtil.geoJsonTransformTranslate({ data: geoJson_back, distance: 1, direction: 180 });
        let diff_data = this.acolUtil.differenceByTurf(res_data, geoJson_back);
        // 添加geoJson格式数据
        // let backFeatures = new ol.format.GeoJSON().readFeatures(diff_data, { featureProjection: 'EPSG:4326' });
        let backFeatures = new ol.format.GeoJSON().readFeatures(geoJson_back, { featureProjection: 'EPSG:4326' });
        this.vector_back.getSource().addFeatures(backFeatures);
        let areaFeatures = new ol.format.GeoJSON().readFeatures(geoJson_area, { featureProjection: 'EPSG:4326' });
        this.vector_area.getSource().addFeatures(areaFeatures);
        // 根据extent定位
        if (panTo) {
          this.acolLayer.panToByExtent({
            extent: this.vector_area.getSource().getExtent(),
            duration: 1000,
          });
        }
      }
    },
  },
};
</script>
<style scoped lang="less">
@keyframes poiJump {
  0% {
    top: 0px;
  }
  50% {
    top: 10px;
  }
  100% {
    top: 0px;
  }
}
.mapMasterCon {
  height: 100%;
  position: relative;
}
.back {
  position: absolute;
  width: 42px;
  height: 42px;
  top: 180px;
  right: 600px;
  z-index: 13;
  background: url('../../assets/img4/fanhui.png') no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin: 5px 0;
  cursor: pointer;
}
.tool {
  position: absolute;
  width: 42px;
  top: 180px;
  //   left: 600px;
  left: 617px;
  z-index: 11;
  .item {
    position: relative;
    width: 100%;
    height: 42px;
    background: red;
    margin: 5px 0;
    .text {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      cursor: pointer;
    }
  }
  .item:nth-child(1) {
    background: url('../../assets/img4/sousuo.png') no-repeat center;
    background-size: 100% auto;
  }
  .item:nth-child(2) {
    background: url('../../assets/img4/ren.png') no-repeat center;
    background-size: 100% 100%;
  }
}
.zoom {
  position: absolute;
  width: 32px;
  bottom: 80px;
  right: 545px;
  z-index: 2;
}
.fireTrigger {
  height: 50px;
  width: 30px;
  cursor: pointer;
}
.popTestup {
  cursor: pointer;
  position: absolute;
  .triangle {
    width: 78px;
    height: 77px;
    background: url('../../assets/img4/warningMarker.png') no-repeat top;
    background-size: 100% auto;
    position: absolute;
    animation: poiJump 1.5s infinite;
  }
  .warning-box {
    width: 289px;
    height: 171px;
    position: absolute;
    left: 90px;
    top: 10px;
    background: url('../../assets/img4/event-box.png') no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 0px 10px 0px 10px;
    visibility: visible;
    pointer-events: all;
    .row1 {
      width: 100%;
      height: 33px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-family: SourceHanSansCN-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .btn {
        width: 85px;
        height: 25px;
        background: url('../../assets/img4/event-btn.png') no-repeat center;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: SourceHanSerifCN-Bold;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #fef6de;
        cursor: pointer;
      }
    }
    .row2 {
      width: 100%;
      height: 43px;
      display: flex;
      align-items: center;
      span:nth-child(1) {
        font-family: SourceHanSansCN-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #b7c1d4;
      }
      span:nth-child(2) {
        font-family: MicrosoftYaHei-Bold;
        font-size: 16px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
}
::v-deep {
  .ol-rotate {
    display: none;
  }
}
</style>
