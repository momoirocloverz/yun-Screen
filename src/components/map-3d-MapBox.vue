<template>
  <div id="cesiumContainer">
    <div class="top-mask"></div>
    <div class="left-mask"></div>
    <div class="right-mask"></div>
    <div class="tool">
      <div class="item">
        <div class="text" @click="culturalBtnClick(true)"></div>
        <culturalPoiBox :boxShow="culturalPoiBoxShow" @close="culturalBtnClick(false)" />
      </div>
      <div class="item">
        <div class="text" @click="checkPeopleBtnClick(true)"></div>
        <checkPeopleBox :isShow="checkPeopleBoxShow" @ShowPoi="showPeoplePoi" @HidePoi="hidePeoplePoi" @close="checkPeopleBtnClick(false)" />
      </div>
      <!-- <div class="item">
          <div
            class="text"
            @click="culturalPlaneBtnClick()"
          ></div>
          <PlaneInfoBox
            :currentIndex="planeIndex"
            :isShow="planeBoxShow"
            @close="closePlaneBox"
          />
        </div> -->
    </div>
    <div class="wearth-warning" v-show="isShowWearthWarning">
      <div class="item" @click="weatherWarningClick('1')">
        <img src="../assets/img2/high-icon.png" alt="" />
        <span>高温预警</span>
      </div>
      <div class="item" @click="weatherWarningClick('2')">
        <img src="../assets/img2/rain-icon.png" alt="" />
        <span>暴雨预警</span>
      </div>
      <div class="item" @click="weatherWarningClick('3')">
        <img src="../assets/img2/typhoon-icon.png" alt="" />
        <span>台风预警</span>
      </div>
    </div>
    <div class="warning red" v-if="isWarning" @click="warningBtnClick">
      <!-- 弹框 -->
      <YjBox :isShow="yjBoxShow" @close="yjBoxClose" @closeAndChange="_closeAndChange" />
    </div>
    <div class="warning green" v-else></div>
    <div class="back" @click="zoom('back')"></div>
    <div class="zoom">
      <div class="item" @click="zoom('+')"></div>
      <div class="item" @click="zoom('-')"></div>
      <div v-show="false" class="item" @click="zoom('back')"></div>
      <div class="item" @click="changeMapStyle"></div>
      <div class="item" @click="zoom('legend')"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import * as turf from '@turf/turf';
import { eventBus } from '@/main';
import { mapState } from 'vuex';
// import { mapBoxStyle } from '../js/mapBoxStyle_amap'
import { mapBoxStyle2 } from '../js/mapBoxStyle';
import { mapBoxStyle3 } from '../js/mapBoxStyle_road';
import { bd09towgs84 } from '../js/CesiumTools';
import { getLocalData, zjtj, wbd_list_by_weatherWarning } from '../api/xsApi';
// 地图上按钮的弹框
// import culturalPoiBox from './mapPublicComponents/culturalPoiBox.vue';
// import checkPeopleBox from './mapPublicComponents/checkPeopleBox.vue';
// import YjBox from './mapPublicComponents/YJ-Box';
// import PlaneInfoBox from '../components/mapPublicComponents/planeInfoBox';

// import Popup_1 from './xiaoshanComponents/popUp/pop-CultureWaring';
// import Popup_2 from './xiaoshanComponents/popUp/pop-CultureWaringJSC';
// import peoplePop from './xiaoshanComponentsNew/popUp/pop-people';
import streetPop from './xiaoshanComponentsNew/popUp/pop-street';
import warningPop from './xiaoshanComponentsNew/popUp/warningBox';
import tipPop from './xiaoshanComponentsNew/popUp/poiTip';
let mapBox = null;
let street_arr = [
  // '临江街道',
  '义桥镇',
  '临浦镇',
  // '义蓬街道',
  '党湾镇',
  // '前进街道',
  '北干街道',
  '南阳街道',
  // '围垦区',
  '城厢街道',
  '宁围街道',
  '戴村镇',
  '所前镇',
  '新塘街道',
  // '新湾街道',
  '新街街道',
  '河上镇',
  // '河庄街道',
  '楼塔镇',
  '浦阳镇',
  '瓜沥镇',
  '益农镇',
  '红山农场',
  '萧山商业城',
  '萧山空港经济区',
  '萧山经济技术开发区',
  '蜀山街道',
  '衙前镇',
  '进化镇',
  '闻堰街道',
  '靖江街道',
];
let currentPop = null;
let tipPopEntity = null;
let culturalRelicsEntities = []; // 文保单位点位实体
let allLayers = [];
let poiLayers = []; // 文保点点位图层
let lineLayers = []; // 轨迹图层
let currentTrackPoiArr = [];
let allStreetLayer = []; //所有镇街的面图层ID
let allStreetLineLayer = []; //所有镇街的线图层ID
let saveRangeLayers = []; // 保护范围的图层id
let timer1 = null;
let timer2 = null;
let timer3 = null;
let timer4 = null;
let timer5 = null;
let timer6 = null;
let tipTimer = null;
let warningMarker = []; // 预警的点位动图标识
export default {
  name: 'map-3d',
  components: {
    Popup_1: () => import(/* webpackChunkName: "Popup_1" */ './xiaoshanComponents/popUp/pop-CultureWaring'),
    Popup_2: () => import(/* webpackChunkName: "Popup_2" */ './xiaoshanComponentsNew/popUp/pop-CultureWaringJSC'),
    peoplePop: () => import(/* webpackChunkName: "peoplePop" */ './xiaoshanComponentsNew/popUp/pop-people'),
    culturalPoiBox: () => import(/* webpackChunkName: "culturalPoiBox" */ './mapPublicComponents/culturalPoiBox.vue'),
    checkPeopleBox: () => import(/* webpackChunkName: "checkPeopleBox" */ './mapPublicComponents/checkPeopleBox.vue'),
    YjBox: () => import(/* webpackChunkName: "YjBox" */ './mapPublicComponents/YJ-Box'),
    PlaneInfoBox: () => import(/* webpackChunkName: "PlaneInfoBox" */ '../components/mapPublicComponents/planeInfoBox'),
  },
  data() {
    return {
      // 当前地区
      currentAddress: '萧山区',
      // 当前气象预警类型
      currentWeatherType: '',
      // 萧山文物点位
      // culturalRelics:[],
      gouBaoPoi: [], // 国保
      shengBaoPoi: [], // 省保
      shiBaoPoi: [], // 市保和市级文保点
      // shiJiPoi: [], // 市级文保点
      initPoi_nine: [], // 初始化9个文保点

      // 平面图弹框的文物展示的index
      planeIndex: '1_0_1',
      popupTemp: null,
      // 地图上按钮弹出框的配置
      isMapStyle: true,
      isShowWearthWarning: false,
      culturalPoiBoxShow: false,
      checkPeopleBoxShow: false,
      isWarning: false,
      yjBoxShow: false,
      planeBoxShow: false,
      isClickStreet: false,
      isNormalPoi: true,
      isClusterFlag: true,
      noCluster: false, // 强制不使用聚合
      isInit: false, // 是否初始状态的点位
      mouseOverStreetName: '',
      mouseOverStreetCenterPoi: '',
      // websocket配置
      path: `ws://223.65.209.139:18180/hik/broadcast/${Math.random()}`,
      socket: '',
      warningEventId: '', // 预警事件唯一标识
      warningData: {},
    };
  },
  computed: {
    ...mapState(['currentRouteName']),
  },
  created() {
    eventBus.$on('removePopUp', () => {
      currentPop && currentPop.remove();
    });
    eventBus.$on('show_qxyj', () => {
      this.isShowWearthWarning = !this.isShowWearthWarning;
    });
    eventBus.$on('changeToNormalPoi', () => {
      this.isNormalPoi = true;
    });
    eventBus.$on('closePup', () => {
      currentPop && currentPop.remove();
    });
    eventBus.$on('clearWarningMarker', () => {
      this.clearMarkerAndBox();
    });
    // 返回操作
    eventBus.$on('poiBack', () => {
      this.zoom('back');
    });

    // 绘制轨迹
    eventBus.$on('drawTrack', (row) => {
      console.log('<<>>', row);
      currentTrackPoiArr = row.trail;
      this.mouseOverStreetName = row.streetName;

      this.isClickStreet = true;

      if (this.isMapStyle) {
        allStreetLayer.map((val) => {
          if (val !== `streetPolygon_${this.mouseOverStreetName}`) {
            this.layerHidden(val);
          }
          mapBox.setPaintProperty(`streetPolygon_${this.mouseOverStreetName}`, 'fill-color', '#42EFE2');
          mapBox.setPaintProperty(`streetPolygon_${this.mouseOverStreetName}`, 'fill-opacity', 0.3);
        });
        allStreetLineLayer.map((val) => {
          if (val !== `streetLine_${this.mouseOverStreetName}`) {
            this.layerHidden(val);
          }
        });
        if (mapBox.getLayer(`streetLine_${this.mouseOverStreetName}`)) {
          mapBox.setPaintProperty(`streetLine_${this.mouseOverStreetName}`, 'line-color', 'skyblue');
          mapBox.setPaintProperty(`streetLine_${this.mouseOverStreetName}`, 'line-width', 3);
        }
        this.changeMapStyle();
        this.bounderMask(`./static/data/萧山镇街/${this.mouseOverStreetName}.json`, `streetLine_${this.mouseOverStreetName}`);
        this.layerHidden('bounder');
      }

      this.drawTrack(currentTrackPoiArr, 'lineSource_1', 'lineLayer_1');
      mapBox.flyTo({
        center: bd09towgs84(...currentTrackPoiArr[3].split(',')),
        zoom: 17,
      });
    });
  },
  watch: {
    currentRouteName(val) {
      // console.log('当前的路由', val)
      if (currentPop) {
        currentPop.remove();
      }
    },
  },
  methods: {
    initMap() {
      this.$mapboxgl.accessToken = 'pk.eyJ1IjoiY29kaW5nLWNoZW5nIiwiYSI6ImNrdWpjdDl2NTJ3cWIyb3FwY3N4bWpnemoifQ._ib-T9XB8c6scHFkFq2oEw';
      // mapBox = new this.$mapboxgl.Map({
      //   container: "cesiumContainer",
      //   style: "mapbox://styles/coding-cheng/cl25fi5jq00hu15ozxvk9ui91",
      //   attributionControl: false,
      //   center: [120.36452, 30.22505],
      //   zoom: 9.5
      // });
      mapBox = new this.$mapboxgl.Map({
        container: 'cesiumContainer',
        style: mapBoxStyle2,
        attributionControl: false,
        center: [120.36452, 30.22505],
        maxZoom: 18,
        minZoom: 9,
        // zoom: 9.5,
        maxBounds: [
          [119.443049, 29.804549], //赋值你想要的界限的西南坐标
          [121.25989, 30.517929], //赋值你想要的界限的东北坐标
        ],
      });
      mapBox.on('load', () => {
        this.mapLoad();
      });
    },
    // 切换底图
    changeMapStyle() {
      if (this.isMapStyle) {
        mapBox.setStyle(mapBoxStyle3);
      } else {
        mapBox.setStyle(mapBoxStyle2);
      }
      setTimeout(() => {
        this.mapLoad();
      }, 10);
      this.isMapStyle = !this.isMapStyle;
    },
    // mapLoad事件
    mapLoad() {
      // mapBox.scrollZoom.disable()
      window.mapBox = mapBox;
      this.loadAllImg();
      // console.log('allLayers123456')
      if (!mapBox.getSource('XiaoShanGeo')) {
        mapBox.addSource('XiaoShanGeo', {
          type: 'geojson',
          data: './static/data/萧山区New.json',
        });
      }
      if (!this.isClickStreet) {
        this.drawPolygonWith_Xiaoshan();
        this.drawLineWith_Xiaoshan();
        this.bounderMask('./static/data/萧山区New.json'); // 边界遮罩
      } else {
        console.log(this.currentAddress);
        this.bounderMask(`./static/data/萧山镇街/${this.currentAddress}.json`, `streetLine_${this.currentAddress}`); // 边界遮罩
        this.drawPolygonWith_Xiaoshan(this.currentAddress);
      }
      // 恢复点位
      // 先删除原有点位图层
      if (poiLayers.length > 0) {
        poiLayers.map((item) => {
          if (mapBox && mapBox.getLayer(item)) {
            mapBox.removeLayer(item);
          }
        });
        this.drawSymbolWithText(this.gouBaoPoi, 'culturalPoints_gouB', 'symbol_cultural_gouB');
        this.drawSymbolWithText(this.shengBaoPoi, 'culturalPoints_shengB', 'symbol_cultural_shengB');
        this.drawSymbolWithText(this.shiBaoPoi, 'culturalPoints_shiB', 'symbol_cultural_shiB');
        this.drawSymbolWithText(this.initPoi_nine, 'culturalPoints_init', 'symbol_cultural_init');
      }

      // 恢复轨迹
      if (lineLayers.length > 0) {
        lineLayers.map((item) => {
          if (mapBox && mapBox.getLayer(item)) {
            mapBox.removeLayer(item);
          }
        });
        lineLayers = [];
        this.drawTrack(currentTrackPoiArr, 'lineSource_1', 'lineLayer_1');
      }

      // 鼠标滚动事件
      mapBox.on('wheel', (e) => {
        let currentZoom = mapBox.getZoom();

        // 根据鼠标所在镇街，跳转至镇街
        console.log(this.mouseOverStreetName, this.mouseOverStreetCenterPoi);
        if (this.isClickStreet) return;
        if (!this.mouseOverStreetName) return;
        if (currentZoom >= 10.5) {
          console.log('当前层级', currentZoom);
          this.currentAddress = this.mouseOverStreetName;

          this.isClickStreet = true;
          // 隐藏点击的镇街图层
          allStreetLayer.map((val) => {
            if (val !== `streetPolygon_${this.mouseOverStreetName}`) {
              this.layerHidden(val);
            }
            mapBox.setPaintProperty(`streetPolygon_${this.mouseOverStreetName}`, 'fill-color', '#42EFE2');
            mapBox.setPaintProperty(`streetPolygon_${this.mouseOverStreetName}`, 'fill-opacity', 0.3);
          });
          allStreetLineLayer.map((val) => {
            if (val !== `streetLine_${this.mouseOverStreetName}`) {
              this.layerHidden(val);
            }
          });
          if (mapBox.getLayer(`streetLine_${this.mouseOverStreetName}`)) {
            mapBox.setPaintProperty(`streetLine_${this.mouseOverStreetName}`, 'line-color', 'skyblue');
            mapBox.setPaintProperty(`streetLine_${this.mouseOverStreetName}`, 'line-width', 3);
          }
          this.changeMapStyle();
          this.bounderMask(`./static/data/萧山镇街/${this.mouseOverStreetName}.json`, `streetLine_${this.mouseOverStreetName}`);
          this.layerHidden('bounder');
          // 同步更新大屏两侧的数据
          eventBus.$emit('gotoStreet', ['1', this.mouseOverStreetName, this.isNormalPoi]);
          if (!this.isNormalPoi) {
            this.weatherWarningClick(this.currentWeatherType);
          }
          setTimeout(() => {
            mapBox.flyTo({
              center: this.mouseOverStreetCenterPoi.split(','),
              zoom: 12,
            });
          }, 750);
        }
      });
      // 不聚合文保点位点击事件
      mapBox.on('click', 'symbol_cultural_init', (e) => {
        e.preventDefault();
        // console.log("点击文物点位", e.lngLat,e.features[0].properties);
        const detailInfo = e.features[0].properties;
        eventBus.$emit('poiClick', {
          poiName: detailInfo.publishName,
        });
      });
      mapBox.on('mousemove', 'symbol_cultural_init', (e) => {
        this.mouseOverStreetName = '';
        e.preventDefault();
        street_arr.map((item) => {
          if (mapBox.getLayer(`streetPolygon_${item}`)) {
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-color', 'skyblue');
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-opacity', 0.2);
          }
        });

        const detailInfo = e.features[0].properties;
        console.log('鼠标上移');
        let poi = detailInfo.poi.split(',');
        // 创建弹框
        tipPopEntity && tipPopEntity.remove();
        this.createPopUp(detailInfo, 'tip'); //第二步中的创建内容的方法
        tipPopEntity = new this.$mapboxgl.Popup({
          closeButton: false,
          className: 'my-popUp-class',
        })
          .setLngLat([poi[0] * 1, poi[1] * 1])
          .setMaxWidth('630px') //设置弹窗最大宽度
          .setDOMContent(this.popupTemp) //插入节点
          .addTo(mapBox);
      });
      mapBox.on('mouseleave', 'symbol_cultural_init', (e) => {
        e.preventDefault();
        console.log('鼠标移出');
        tipPopEntity && tipPopEntity.remove();
      });
      mapBox.on('click', 'symbol_cultural_gouB', (e) => {
        e.preventDefault();
        // console.log("点击文物点位", e.lngLat,e.features[0].properties);
        const detailInfo = e.features[0].properties;
        eventBus.$emit('poiClick', {
          poiName: detailInfo.publishName,
        });
      });
      mapBox.on('mousemove', 'symbol_cultural_gouB', (e) => {
        this.mouseOverStreetName = '';
        e.preventDefault();
        street_arr.map((item) => {
          if (mapBox.getLayer(`streetPolygon_${item}`)) {
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-color', 'skyblue');
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-opacity', 0.2);
          }
        });

        const detailInfo = e.features[0].properties;
        console.log('鼠标上移');
        let poi = detailInfo.poi.split(',');
        // 创建弹框
        tipPopEntity && tipPopEntity.remove();
        this.createPopUp(detailInfo, 'tip'); //第二步中的创建内容的方法
        tipPopEntity = new this.$mapboxgl.Popup({
          closeButton: false,
          className: 'my-popUp-class',
        })
          .setLngLat([poi[0] * 1, poi[1] * 1])
          .setMaxWidth('630px') //设置弹窗最大宽度
          .setDOMContent(this.popupTemp) //插入节点
          .addTo(mapBox);
      });
      mapBox.on('mouseleave', 'symbol_cultural_gouB', (e) => {
        e.preventDefault();
        console.log('鼠标移出');
        tipPopEntity && tipPopEntity.remove();
      });
      mapBox.on('click', 'symbol_cultural_shengB', (e) => {
        e.preventDefault();
        // console.log("点击文物点位", e.lngLat,e.features[0].properties);
        const detailInfo = e.features[0].properties;
        eventBus.$emit('poiClick', {
          poiName: detailInfo.publishName,
        });
      });
      mapBox.on('mousemove', 'symbol_cultural_shengB', (e) => {
        this.mouseOverStreetName = '';
        e.preventDefault();
        street_arr.map((item) => {
          if (mapBox.getLayer(`streetPolygon_${item}`)) {
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-color', 'skyblue');
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-opacity', 0.2);
          }
        });
        const detailInfo = e.features[0].properties;
        console.log('鼠标上移');
        let poi = detailInfo.poi.split(',');
        // 创建弹框
        tipPopEntity && tipPopEntity.remove();
        this.createPopUp(detailInfo, 'tip'); //第二步中的创建内容的方法
        tipPopEntity = new this.$mapboxgl.Popup({
          closeButton: false,
          className: 'my-popUp-class',
        })
          .setLngLat([poi[0] * 1, poi[1] * 1])
          .setMaxWidth('630px') //设置弹窗最大宽度
          .setDOMContent(this.popupTemp) //插入节点
          .addTo(mapBox);
      });
      mapBox.on('mouseleave', 'symbol_cultural_shengB', (e) => {
        e.preventDefault();
        console.log('鼠标移出');
        tipPopEntity && tipPopEntity.remove();
      });
      mapBox.on('click', 'symbol_cultural_noCluster_shiB', (e) => {
        e.preventDefault();
        // console.log("点击文物点位", e.lngLat,e.features[0].properties);
        const detailInfo = e.features[0].properties;
        eventBus.$emit('poiClick', {
          poiName: detailInfo.publishName,
        });
      });
      mapBox.on('mousemove', 'symbol_cultural_noCluster_shiB', (e) => {
        this.mouseOverStreetName = '';
        e.preventDefault();
        street_arr.map((item) => {
          if (mapBox.getLayer(`streetPolygon_${item}`)) {
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-color', 'skyblue');
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-opacity', 0.2);
          }
        });

        const detailInfo = e.features[0].properties;
        console.log('鼠标上移');
        let poi = detailInfo.poi.split(',');
        // 创建弹框
        tipPopEntity && tipPopEntity.remove();
        this.createPopUp(detailInfo, 'tip'); //第二步中的创建内容的方法
        tipPopEntity = new this.$mapboxgl.Popup({
          closeButton: false,
          className: 'my-popUp-class',
        })
          .setLngLat([poi[0] * 1, poi[1] * 1])
          .setMaxWidth('630px') //设置弹窗最大宽度
          .setDOMContent(this.popupTemp) //插入节点
          .addTo(mapBox);
      });
      mapBox.on('mouseleave', 'symbol_cultural_noCluster_shiB', (e) => {
        e.preventDefault();
        console.log('鼠标移出');
        tipPopEntity && tipPopEntity.remove();
      });

      mapBox.on('click', 'eventPoint_layer', (e) => {
        e.preventDefault();
        // console.log("点击文物点位", e.lngLat,e.features[0].properties);
        const detailInfo = e.features[0].properties;
        eventBus.$emit('poiClick', {
          poiName: detailInfo.publishName,
        });
      });
      mapBox.on('mousemove', 'eventPoint_layer', (e) => {
        this.mouseOverStreetName = '';
        e.preventDefault();
        street_arr.map((item) => {
          if (mapBox.getLayer(`streetPolygon_${item}`)) {
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-color', 'skyblue');
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-opacity', 0.2);
          }
        });
        const detailInfo = e.features[0].properties;
        console.log('鼠标上移');
        let poi = detailInfo.poi.split(',');
        // 创建弹框
        tipPopEntity && tipPopEntity.remove();
        this.createPopUp(detailInfo, 'tip'); //第二步中的创建内容的方法
        tipPopEntity = new this.$mapboxgl.Popup({
          closeButton: false,
          className: 'my-popUp-class',
        })
          .setLngLat([poi[0] * 1, poi[1] * 1])
          .setMaxWidth('630px') //设置弹窗最大宽度
          .setDOMContent(this.popupTemp) //插入节点
          .addTo(mapBox);
      });
      mapBox.on('mouseleave', 'eventPoint_layer', (e) => {
        e.preventDefault();
        console.log('鼠标移出');
        tipPopEntity && tipPopEntity.remove();
      });

      // 聚合的文物点位点击事件
      mapBox.on('click', 'symbol_cultural_shiB', (e) => {
        e.preventDefault();
        console.log('点击文物点位', e.lngLat, e.features[0].properties);
        const detailInfo = e.features[0].properties;
        // this.planeBoxShow = true
        // this.planeIndex = '0_1'
        eventBus.$emit('poiClick', {
          poiName: detailInfo.publishName,
        });
        // mapBox.flyTo({
        //   center: detailInfo.centerPoi.split(','),
        //   zoom: 14.5,
        // })
      });
      mapBox.on('mousemove', 'symbol_cultural_shiB', (e) => {
        this.mouseOverStreetName = '';
        e.preventDefault();
        const detailInfo = e.features[0].properties;
        street_arr.map((item) => {
          if (mapBox.getLayer(`streetPolygon_${item}`)) {
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-color', 'skyblue');
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-opacity', 0.2);
          }
        });
        console.log('鼠标上移');
        let poi = detailInfo.poi.split(',');
        // 创建弹框
        tipPopEntity && tipPopEntity.remove();
        this.createPopUp(detailInfo, 'tip'); //第二步中的创建内容的方法
        tipPopEntity = new this.$mapboxgl.Popup({
          closeButton: false,
          className: 'my-popUp-class',
        })
          .setLngLat([poi[0] * 1, poi[1] * 1])
          .setMaxWidth('630px') //设置弹窗最大宽度
          .setDOMContent(this.popupTemp) //插入节点
          .addTo(mapBox);
      });
      mapBox.on('mouseleave', 'symbol_cultural_shiB', (e) => {
        e.preventDefault();
        console.log('鼠标移出');
        tipPopEntity && tipPopEntity.remove();
      });
      // mapBox.on('click', 'symbol_cultural_shiJ', (e) => {
      //   e.preventDefault()
      //   console.log('点击文物点位', e.lngLat, e.features[0].properties)
      //   const detailInfo = e.features[0].properties
      //   // this.planeBoxShow = true
      //   // this.planeIndex = '0_1'
      //   eventBus.$emit('poiClick', {
      //     poiName: detailInfo.publishName,
      //   })
      //   // mapBox.flyTo({
      //   //   center: detailInfo.centerPoi.split(','),
      //   //   zoom: 14.5,
      //   // })
      // })
      // mapBox.on('mousemove', 'symbol_cultural_shiJ', (e) => {
      //   e.preventDefault()
      //   const detailInfo = e.features[0].properties
      //   street_arr.map((item) => {
      //     if (mapBox.getLayer(`streetPolygon_${item}`)) {
      //       mapBox.setPaintProperty(
      //         `streetPolygon_${item}`,
      //         'fill-color',
      //         'skyblue'
      //       )
      //       mapBox.setPaintProperty(
      //         `streetPolygon_${item}`,
      //         'fill-opacity',
      //         0.2
      //       )
      //     }
      //   })

      //     console.log('鼠标上移')
      //     let poi = detailInfo.poi.split(',')
      //     // 创建弹框
      //     this.createPopUp(detailInfo, 'tip') //第二步中的创建内容的方法
      //     tipPopEntity = new this.$mapboxgl.Popup({
      //       closeButton: false,
      //       className: 'my-popUp-class',
      //     })
      //       .setLngLat([poi[0] * 1, poi[1] * 1])
      //       .setMaxWidth('630px') //设置弹窗最大宽度
      //       .setDOMContent(this.popupTemp) //插入节点
      //       .addTo(mapBox)
      // })
      // mapBox.on('mouseleave', 'symbol_cultural_shiJ', (e) => {
      //   e.preventDefault()
      //   console.log('鼠标移出')
      //   tipPopEntity && tipPopEntity.remove()
      // })

      // 巡查员点位点击事件
      mapBox.on('click', 'peopleLayer', (e) => {
        this.mouseOverStreetName = '';
        e.preventDefault();
        // console.log('点击巡查员点位', e.lngLat, e.features[0].properties.name)
        const detailInfo = e.features[0].properties;
        // 创建弹框
        this.createPopUp(detailInfo); //第二步中的创建内容的方法
        currentPop = new this.$mapboxgl.Popup({
          closeButton: false,
          className: 'my-popUp-class',
        })
          .setLngLat(e.lngLat)
          .setMaxWidth('630px') //设置弹窗最大宽度
          .setDOMContent(this.popupTemp) //插入节点
          .addTo(mapBox);
      });

      mapBox.on('mousemove', 'peopleLayer', (e) => {
        e.preventDefault();
        street_arr.map((item) => {
          if (mapBox.getLayer(`streetPolygon_${item}`)) {
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-color', 'skyblue');
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-opacity', 0.2);
          }
        });
      });
      // 镇街————面点击、移进、移出事件
      street_arr.map((item) => {
        mapBox.on('click', `streetPolygon_${item}`, (e) => {
          if (this.isClickStreet) return;
          if (e.defaultPrevented) return;
          const detailInfo = e.features[0].properties;
          // console.log('点击镇街', detailInfo, e.lngLat)
          this.isClickStreet = true;
          this.currentAddress = detailInfo.name;
          // // 隐藏点击的镇街图层
          allStreetLayer.map((val) => {
            if (val !== `streetPolygon_${item}`) {
              this.layerHidden(val);
            }
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-color', '#42EFE2');
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-opacity', 0.3);
          });
          allStreetLineLayer.map((val) => {
            if (val !== `streetLine_${item}`) {
              this.layerHidden(val);
            }
          });
          if (mapBox.getLayer(`streetLine_${item}`)) {
            mapBox.setPaintProperty(`streetLine_${item}`, 'line-color', 'skyblue');
            mapBox.setPaintProperty(`streetLine_${item}`, 'line-width', 3);
          }
          this.changeMapStyle();
          this.bounderMask(`./static/data/萧山镇街/${item}.json`, `streetLine_${item}`);
          this.layerHidden('bounder');
          // 同步更新大屏两侧的数据
          eventBus.$emit('gotoStreet', ['1', detailInfo.name, this.isNormalPoi]);
          if (!this.isNormalPoi) {
            this.weatherWarningClick(this.currentWeatherType);
          }
          mapBox.flyTo({
            center: detailInfo.centerPoi ? detailInfo.centerPoi.split(',') : e.lngLat,
            zoom: 12,
          });
        });
        mapBox.on('mousemove', `streetPolygon_${item}`, (e) => {
          if (e.defaultPrevented) return;
          const detailInfo = e.features[0].properties;
          this.mouseOverStreetName = item;
          this.mouseOverStreetCenterPoi = detailInfo.centerPoi ? detailInfo.centerPoi : [e.lngLat.lng, e.lngLat.lat].join(',');
          // console.log('移进镇街', detailInfo)
          if (!this.isClickStreet) {
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-color', '#F3C164');
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-opacity', 0.4);
          }
        });
        mapBox.on('mouseleave', `streetPolygon_${item}`, (e) => {
          this.mouseOverStreetName = '';
          this.mouseOverStreetCenterPoi = '';
          // console.log('移出镇街', e)
          if (!this.isClickStreet) {
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-opacity', 0.2);
            mapBox.setPaintProperty(`streetPolygon_${item}`, 'fill-color', 'skyblue');
          }
        });
      });
    },
    // 图层隐藏
    layerHidden(layerId) {
      if (mapBox.getLayer(layerId)) {
        mapBox.setLayoutProperty(layerId, 'visibility', 'none');
      }
    },
    // 图层显示
    layerShow(layerId, callback = () => {}) {
      if (mapBox.getLayer(layerId)) {
        // console.log('存在1')
        mapBox.setLayoutProperty(layerId, 'visibility', 'visible');
      } else {
        callback;
      }
    },
    // 将点位字符串转为geoJson数据
    strToGeoJson(str, properties = {}) {
      if (!str) return {};
      let arr = str.split(',');
      let geoArr = [];
      arr.map((item, index) => {
        if (index % 2 == 1) {
          geoArr.push([arr[index - 1], arr[index]]);
        }
      });
      let geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [geoArr],
            },
            properties: properties,
          },
        ],
      };
      return geojson;
    },
    // 添加自定义图片
    loadImg(imgPath, imgName) {
      mapBox.loadImage(imgPath, (error, image) => {
        if (error) {
          throw error;
        }
        // 先判断是否加载了该 id 的图片资源，没有则加载
        if (!mapBox.hasImage(imgName)) {
          mapBox.addImage(imgName, image); // 定义图片
        }
      });
    },
    // 将图片叠加在底图上
    addImgToMap(layerId) {
      mapBox.flyTo({
        center: [120.308623, 29.952447],
        zoom: 18,
      });
      if (!mapBox.getSource('wbt_1')) {
        mapBox.addSource('wbt_1', {
          type: 'image',
          url: './static/images/culturalSave/wbt_1.gif',
          // url: "./static/images/culturalSave/radar.gif",
          coordinates: [
            [120.308623, 29.952447],
            [120.309616, 29.952447],
            [120.309616, 29.951829],
            [120.308623, 29.951829],
          ],
        });
      }
      if (mapBox.getLayer(layerId)) return;
      mapBox.addLayer({
        id: layerId,
        type: 'raster',
        source: 'wbt_1',
        paint: {
          'raster-fade-duration': 0,
        },
      });
    },
    // 边界遮罩
    bounderMask(path, beforeId = 'bounder') {
      if (mapBox.getLayer('mask')) {
        mapBox.removeLayer('mask');
      }
      if (mapBox.getSource('bounderMaskSource')) {
        mapBox.removeSource('bounderMaskSource');
      }
      mapBox.addSource('bounderMaskSource', {
        type: 'geojson',
        data: path,
      });
      this.loadImg('./static/images/culturalSave/bg.png', 'bg');
      getLocalData(path).then((res) => {
        // console.log('203', res.data.features[0].geometry.coordinates[0])
        if (!mapBox.getLayer('mask')) {
          mapBox.addLayer(
            {
              id: `mask`,
              type: 'fill',
              source: 'bounderMaskSource',
              layout: {},
              paint: {
                // "fill-color": "#213363",
                'fill-pattern': 'bg', // 填充图片
                'fill-opacity': 1,
              },
            },
            beforeId,
          );
        }
        // [119.443049, 29.804549], //赋值你想要的界限的西南坐标
        //   [121.25989, 30.517929], //赋值你想要的界限的东北坐标
        mapBox.getSource('bounderMaskSource').setData(
          turf.polygon([
            // [[-180, -90], [-180, 90], [180, 90], [180, -90], [-180, -90]],
            [
              [119.443049, 29.804549],
              [119.443049, 30.517929],
              [121.25989, 30.517929],
              [121.25989, 29.804549],
              [119.443049, 29.804549],
            ],
            res.data.features[0].geometry.coordinates[0],
          ]),
        );
      });
    },
    /*
     ** pointsArray:包含点位数据的对象的数组
     ** poiProp:点位数据在key值
     ** sourceName:添加点位数据的资源名称
     ** imgSrc:自定义图片的路径
     ** imgName:添加图片数据的资源名称
     ** layerId:图层ID
     */
    drawSymbol(pointsArray, poiProp, sourceName, imgSrc, imgName, layerId, imgSize = 1) {
      let poiGeo = {
        type: 'FeatureCollection',
        features: [],
      };
      pointsArray.map((item) => {
        const obj = {
          type: 'Feature',
          properties: item,
          geometry: {
            type: 'Point',
            coordinates: item[poiProp] instanceof Array ? item[poiProp] : item[poiProp].split(','),
          },
        };
        poiGeo.features.push(obj);
      });
      if (mapBox.getLayer(layerId)) {
        mapBox.removeLayer(layerId);
      }
      if (mapBox.getSource(sourceName)) {
        mapBox.removeSource(sourceName);
      }
      this.loadImg(imgSrc, imgName);
      mapBox.addSource(sourceName, {
        type: 'geojson',
        data: poiGeo,
      });
      mapBox.addLayer({
        id: layerId,
        type: 'symbol',
        source: sourceName,
        layout: {
          visibility: 'visible',
          'icon-allow-overlap': true,
          'icon-image': imgName,
          'icon-size': imgSize,
          // "text-field": "{name}", //此属性为需要显示的字段
          // "text-size": 18,
          // "text-offset": [0, -2.2],
          'text-allow-overlap': true, // 是否允许文本重叠（可选，默认值为 false。
          'text-anchor': 'top',
        },
        paint: {
          // "text-color": "#fff"
        },
      });
      allLayers.push(layerId);
      allLayers = [...new Set(allLayers)];
    },
    drawPolygon(sourceId, geoData, layerId, fillColor = 'red', fillOpacity = 0.3, beforeId = '') {
      if (!mapBox.getSource(sourceId)) {
        mapBox.addSource(sourceId, {
          type: 'geojson',
          data: geoData,
        });
      }
      if (!mapBox.getLayer(layerId)) {
        mapBox.addLayer(
          {
            id: layerId,
            type: 'fill',
            source: sourceId,
            layout: {},
            paint: {
              'fill-color': fillColor,
              'fill-opacity': fillOpacity,
            },
          },
          beforeId,
        );
      }
      return layerId;
    },
    drawLine(sourceId, geoData, layerId, lineColor = 'red', lineWidth = 3, beforeId = '') {
      if (!geoData) return;
      if (!mapBox.getSource(sourceId)) {
        mapBox.addSource(sourceId, {
          type: 'geojson',
          data: geoData,
        });
      }
      if (!mapBox.getLayer(layerId)) {
        mapBox.addLayer(
          {
            id: layerId,
            type: 'line',
            source: sourceId,
            layout: {},
            paint: {
              'line-width': lineWidth,
              'line-color': lineColor,
            },
          },
          beforeId,
        );
      }
      return layerId;
    },
    // 绘制多个文保点
    drawSymbolWithText(poiArr, sourceName, poiLayer) {
      console.log('/123', poiArr);
      this.isClusterFlag = false;
      allLayers.map((item) => {
        this.layerHidden(item);
      });

      let offsetX = 0;
      let poiGeo = {
        type: 'FeatureCollection',
        features: [],
      };
      poiArr.map((item) => {
        if (item.publishName.length > 5) {
          item._nameLength_ = 1;
          if (item.publishName.length > 8) {
            item._name_ = item.publishName.substr(0, 9) + '...';
          } else {
            item._name_ = item.publishName;
          }
          offsetX = 0;
        } else {
          item._name_ = item.publishName;
          item._nameLength_ = 0;
        }
        // console.log('文物点位123', item)
        const obj = {
          type: 'Feature',
          properties: item,
          geometry: {
            type: 'Point',
            coordinates: item.poi ? item.poi.split(',') : [],
          },
        };
        poiGeo.features.push(obj);
      });
      if (mapBox.getLayer(poiLayer)) {
        mapBox.removeLayer(poiLayer);
      }
      if (mapBox.getSource(sourceName)) {
        mapBox.removeSource(sourceName);
      }
      console.log('无需', poiGeo);
      mapBox.addSource(sourceName, {
        type: 'geojson',
        data: poiGeo,
      });
      // let express_gw_1 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 1],
      //   ['==', ['get', '_weatherType_'], '1'],
      // ]
      // let express_gw_2 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 0],
      //   ['==', ['get', '_weatherType_'], '1'],
      // ]
      // let express_by_1 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 1],
      //   ['==', ['get', '_weatherType_'], '2'],
      // ]
      // let express_by_2 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 0],
      //   ['==', ['get', '_weatherType_'], '2'],
      // ]
      // let express_tf_1 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 1],
      //   ['==', ['get', '_weatherType_'], '3'],
      // ]
      // let express_tf_2 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 0],
      //   ['==', ['get', '_weatherType_'], '3'],
      // ]

      // let express1 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 1],
      //   ['==', ['get', 'maxLevel'], '一级'],
      // ]
      // let express2 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 0],
      //   ['==', ['get', 'maxLevel'], '一级'],
      // ]
      // let express3 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 1],
      //   ['==', ['get', 'maxLevel'], '二级'],
      // ]
      // let express4 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 0],
      //   ['==', ['get', 'maxLevel'], '二级'],
      // ]
      // let express5 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 1],
      //   ['==', ['get', 'maxLevel'], '三级'],
      // ]
      // let express6 = [
      //   'all',
      //   ['==', ['get', '_nameLength_'], 0],
      //   ['==', ['get', 'maxLevel'], '三级'],
      // ]
      let express_gouB_1 = ['all', ['==', ['get', 'rank'], '国保'], ['==', ['get', 'maxLevel'], '一级'], ['==', ['get', 'yjbs'], '0']];
      let express_gouB_2 = ['all', ['==', ['get', 'rank'], '国保'], ['==', ['get', 'maxLevel'], '二级'], ['==', ['get', 'yjbs'], '0']];
      let express_gouB_3 = ['all', ['==', ['get', 'rank'], '国保'], ['==', ['get', 'maxLevel'], '三级'], ['==', ['get', 'yjbs'], '0']];
      let express_gouB_1_red = ['all', ['==', ['get', 'rank'], '国保'], ['==', ['get', 'maxLevel'], '一级'], ['==', ['get', 'yjbs'], '1']];
      let express_gouB_2_red = ['all', ['==', ['get', 'rank'], '国保'], ['==', ['get', 'maxLevel'], '二级'], ['==', ['get', 'yjbs'], '1']];
      let express_gouB_3_red = ['all', ['==', ['get', 'rank'], '国保'], ['==', ['get', 'maxLevel'], '三级'], ['==', ['get', 'yjbs'], '1']];

      let express_shengB_1 = ['all', ['==', ['get', 'rank'], '省保'], ['==', ['get', 'maxLevel'], '一级'], ['==', ['get', 'yjbs'], '0']];
      let express_shengB_2 = ['all', ['==', ['get', 'rank'], '省保'], ['==', ['get', 'maxLevel'], '二级'], ['==', ['get', 'yjbs'], '0']];
      let express_shengB_3 = ['all', ['==', ['get', 'rank'], '省保'], ['==', ['get', 'maxLevel'], '三级'], ['==', ['get', 'yjbs'], '0']];
      let express_shengB_1_red = ['all', ['==', ['get', 'rank'], '省保'], ['==', ['get', 'maxLevel'], '一级'], ['==', ['get', 'yjbs'], '1']];
      let express_shengB_2_red = ['all', ['==', ['get', 'rank'], '省保'], ['==', ['get', 'maxLevel'], '二级'], ['==', ['get', 'yjbs'], '1']];
      let express_shengB_3_red = ['all', ['==', ['get', 'rank'], '省保'], ['==', ['get', 'maxLevel'], '三级'], ['==', ['get', 'yjbs'], '1']];

      let express_shiB_1 = ['all', ['==', ['get', 'rank'], '市保'], ['==', ['get', 'maxLevel'], '一级'], ['==', ['get', 'yjbs'], '0']];
      let express_shiB_2 = ['all', ['==', ['get', 'rank'], '市保'], ['==', ['get', 'maxLevel'], '二级'], ['==', ['get', 'yjbs'], '0']];
      let express_shiB_3 = ['all', ['==', ['get', 'rank'], '市保'], ['==', ['get', 'maxLevel'], '三级'], ['==', ['get', 'yjbs'], '0']];
      let express_shiB_1_red = ['all', ['==', ['get', 'rank'], '市保'], ['==', ['get', 'maxLevel'], '一级'], ['==', ['get', 'yjbs'], '1']];
      let express_shiB_2_red = ['all', ['==', ['get', 'rank'], '市保'], ['==', ['get', 'maxLevel'], '二级'], ['==', ['get', 'yjbs'], '1']];
      let express_shiB_3_red = ['all', ['==', ['get', 'rank'], '市保'], ['==', ['get', 'maxLevel'], '三级'], ['==', ['get', 'yjbs'], '1']];

      let express_shiJ_1 = ['all', ['==', ['get', 'rank'], '市保点'], ['==', ['get', 'maxLevel'], '一级'], ['==', ['get', 'yjbs'], '0']];
      let express_shiJ_2 = ['all', ['==', ['get', 'rank'], '市保点'], ['==', ['get', 'maxLevel'], '二级'], ['==', ['get', 'yjbs'], '0']];
      let express_shiJ_3 = ['all', ['==', ['get', 'rank'], '市保点'], ['==', ['get', 'maxLevel'], '三级'], ['==', ['get', 'yjbs'], '0']];
      let express_shiJ_1_red = ['all', ['==', ['get', 'rank'], '市保点'], ['==', ['get', 'maxLevel'], '一级'], ['==', ['get', 'yjbs'], '1']];
      let express_shiJ_2_red = ['all', ['==', ['get', 'rank'], '市保点'], ['==', ['get', 'maxLevel'], '二级'], ['==', ['get', 'yjbs'], '1']];
      let express_shiJ_3_red = ['all', ['==', ['get', 'rank'], '市保点'], ['==', ['get', 'maxLevel'], '三级'], ['==', ['get', 'yjbs'], '1']];

      mapBox.addLayer({
        id: poiLayer,
        type: 'symbol',
        source: sourceName,
        layout: {
          visibility: 'visible',
          'icon-allow-overlap': true,
          'icon-image': [
            'case',
            express_gouB_1,
            'gouB_g',
            express_gouB_2,
            'gouB_z',
            express_gouB_3,
            'gouB_d',
            express_gouB_1_red,
            'gouB_g_red',
            express_gouB_2_red,
            'gouB_z_red',
            express_gouB_3_red,
            'gouB_d_red',
            express_shengB_1,
            'shengB_g',
            express_shengB_2,
            'shengB_z',
            express_shengB_3,
            'shengB_d',
            express_shengB_1_red,
            'shengB_g_red',
            express_shengB_2_red,
            'shengB_z_red',
            express_shengB_3_red,
            'shengB_d_red',
            express_shiB_1,
            'shiB_g',
            express_shiB_2,
            'shiB_z',
            express_shiB_3,
            'shiB_d',
            express_shiB_1_red,
            'shiB_g_red',
            express_shiB_2_red,
            'shiB_z_red',
            express_shiB_3_red,
            'shiB_d_red',
            express_shiJ_1,
            'shiJ_g',
            express_shiJ_2,
            'shiJ_z',
            express_shiJ_3,
            'shiJ_d',
            express_shiJ_1_red,
            'shiJ_g_red',
            express_shiJ_2_red,
            'shiJ_z_red',
            express_shiJ_3_red,
            'shiJ_d_red',
            'shengB_d',
          ],
          'icon-size': 0.8,
          'text-allow-overlap': true, // 是否允许文本重叠（可选，默认值为 false。
          'text-anchor': 'top',
        },
        paint: {
          'text-color': '#fff',
        },
      });
      poiLayers.push(poiLayer);
    },
    // 绘制多个文保点--聚合
    drawSymbolWithText_cluster(poiArr, sourceName, clusterLayer, unClusterLayer) {
      console.log('聚合poiArr', poiArr);
      this.isClusterFlag = true;
      // 先隐藏不聚合的图层
      allLayers.map((item) => {
        this.layerHidden(item);
      });
      let offsetX = 0;
      let poiGeo = {
        type: 'FeatureCollection',
        features: [],
      };
      poiArr.map((item) => {
        if (item.publishName.length > 5) {
          item._nameLength_ = 1;
          if (item.publishName.length > 8) {
            item._name_ = item.publishName.substr(0, 9) + '...';
          } else {
            item._name_ = item.publishName;
          }
          offsetX = 0;
        } else {
          item._name_ = item.publishName;
          item._nameLength_ = 0;
        }
        const obj = {
          type: 'Feature',
          properties: item,
          geometry: {
            type: 'Point',
            coordinates: item.poi ? item.poi.split(',') : [],
          },
        };
        poiGeo.features.push(obj);
      });
      if (mapBox.getLayer(clusterLayer)) {
        mapBox.removeLayer(clusterLayer);
      }
      if (mapBox.getLayer(unClusterLayer)) {
        mapBox.removeLayer(unClusterLayer);
      }
      if (mapBox.getSource(sourceName)) {
        mapBox.removeSource(sourceName);
      }
      mapBox.addSource(sourceName, {
        type: 'geojson',
        data: poiGeo,
        cluster: true,
        clusterMaxZoom: 14, //最大缩放到群集点
        clusterRadius: 70, // 每一组点的半径（=50）
      });
      // 聚合图片
      let express_cluster_g = ['all', ['<=', ['get', 'point_count_abbreviated'], 10]];
      let express_cluster_y = ['all', ['>', ['get', 'point_count_abbreviated'], 10], ['<=', ['get', 'point_count_abbreviated'], 30]];
      let express_cluster_r = ['all', ['>', ['get', 'point_count_abbreviated'], 30]];
      mapBox.addLayer({
        id: clusterLayer,
        type: 'symbol',
        source: sourceName,
        filter: ['has', 'point_count'],
        layout: {
          visibility: 'visible',
          'icon-allow-overlap': true,
          'icon-image': ['case', express_cluster_g, 'clusterImg-g', express_cluster_y, 'clusterImg-y', express_cluster_r, 'clusterImg-r', 'clusterImg-g'],
          'icon-size': 0.4,
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 20,
          'text-offset': [0, -0.6],
          'text-allow-overlap': true, // 是否允许文本重叠（可选，默认值为 false。
          'text-anchor': 'top',
        },
        paint: {
          'text-color': '#fff',
          'text-opacity': 1,
        },
      });
      // 没有聚合的点位显示原始标签
      let express_gw_1 = ['all', ['==', ['get', '_nameLength_'], 1], ['==', ['get', '_weatherType_'], '1']];
      let express_gw_2 = ['all', ['==', ['get', '_nameLength_'], 0], ['==', ['get', '_weatherType_'], '1']];
      let express_by_1 = ['all', ['==', ['get', '_nameLength_'], 1], ['==', ['get', '_weatherType_'], '2']];
      let express_by_2 = ['all', ['==', ['get', '_nameLength_'], 0], ['==', ['get', '_weatherType_'], '2']];
      let express_tf_1 = ['all', ['==', ['get', '_nameLength_'], 1], ['==', ['get', '_weatherType_'], '3']];
      let express_tf_2 = ['all', ['==', ['get', '_nameLength_'], 0], ['==', ['get', '_weatherType_'], '3']];
      let express1 = ['all', ['==', ['get', '_nameLength_'], 1], ['==', ['get', 'maxLevel'], '一级']];
      let express2 = ['all', ['==', ['get', '_nameLength_'], 0], ['==', ['get', 'maxLevel'], '一级']];
      let express3 = ['all', ['==', ['get', '_nameLength_'], 1], ['==', ['get', 'maxLevel'], '二级']];
      let express4 = ['all', ['==', ['get', '_nameLength_'], 0], ['==', ['get', 'maxLevel'], '二级']];
      let express5 = ['all', ['==', ['get', '_nameLength_'], 1], ['==', ['get', 'maxLevel'], '三级']];
      let express6 = ['all', ['==', ['get', '_nameLength_'], 0], ['==', ['get', 'maxLevel'], '三级']];

      let express_shiB_1 = ['all', ['==', ['get', 'rank'], '市保'], ['==', ['get', 'maxLevel'], '一级']];
      let express_shiB_2 = ['all', ['==', ['get', 'rank'], '市保'], ['==', ['get', 'maxLevel'], '二级']];
      let express_shiB_3 = ['all', ['==', ['get', 'rank'], '市保'], ['==', ['get', 'maxLevel'], '三级']];
      let express_shiJ_1 = ['all', ['==', ['get', 'rank'], '市保点'], ['==', ['get', 'maxLevel'], '一级']];
      let express_shiJ_2 = ['all', ['==', ['get', 'rank'], '市保点'], ['==', ['get', 'maxLevel'], '二级']];
      let express_shiJ_3 = ['all', ['==', ['get', 'rank'], '市保点'], ['==', ['get', 'maxLevel'], '三级']];

      mapBox.addLayer({
        id: unClusterLayer,
        type: 'symbol',
        source: sourceName,
        filter: ['!', ['has', 'point_count']],
        layout: {
          visibility: 'visible',
          'icon-allow-overlap': true,
          'icon-image': [
            'case',
            // express_gw_1,
            // 'gw-l',
            // express_gw_2,
            // 'gw-s',
            // express_by_1,
            // 'by-l',
            // express_by_2,
            // 'by-s',
            // express_tf_1,
            // 'tf-l',
            // express_tf_2,
            // 'tf-s',
            express_shiB_1,
            'shiB_d',
            express_shiB_2,
            'shiB_z',
            express_shiB_3,
            'shiB_d',
            express_shiJ_1,
            'shiJ_d',
            express_shiJ_2,
            'shiJ_z',
            express_shiJ_3,
            'shiJ_d',
            'shiJ_d',
          ],
          'icon-size': 0.8,
          // 'text-field': '{_name_}', //此属性为需要显示的字段
          // 'text-size': 18,
          // 'text-offset': [offsetX, -3.4],
          'text-allow-overlap': true, // 是否允许文本重叠（可选，默认值为 false。
          'text-anchor': 'top',
        },
        paint: {
          'text-color': '#fff',
        },
      });
      poiLayers.push(clusterLayer, unClusterLayer);
    },
    // 绘制多个文保点---仅依据风险等级判断
    drawSymbol_onlyRiskLevel(poiArr, sourceName, poiLayer) {
      console.log('/123', poiArr);
      this.isClusterFlag = false;
      allLayers.map((item) => {
        this.layerHidden(item);
      });

      let offsetX = 0;
      let poiGeo = {
        type: 'FeatureCollection',
        features: [],
      };
      poiArr.map((item) => {
        if (item.publishName.length > 5) {
          item._nameLength_ = 1;
          if (item.publishName.length > 8) {
            item._name_ = item.publishName.substr(0, 9) + '...';
          } else {
            item._name_ = item.publishName;
          }
          offsetX = 0;
        } else {
          item._name_ = item.publishName;
          item._nameLength_ = 0;
        }
        // console.log('文物点位123', item)
        const obj = {
          type: 'Feature',
          properties: item,
          geometry: {
            type: 'Point',
            coordinates: item.poi ? item.poi.split(',') : [],
          },
        };
        poiGeo.features.push(obj);
      });
      if (mapBox.getLayer(poiLayer)) {
        mapBox.removeLayer(poiLayer);
      }
      if (mapBox.getSource(sourceName)) {
        mapBox.removeSource(sourceName);
      }
      console.log('无需', poiGeo);
      mapBox.addSource(sourceName, {
        type: 'geojson',
        data: poiGeo,
      });

      let express_gouB_1 = ['all', ['==', ['get', 'maxLevel'], '一级']];
      let express_gouB_2 = ['all', ['==', ['get', 'maxLevel'], '二级']];
      let express_gouB_3 = ['all', ['==', ['get', 'maxLevel'], '三级']];

      mapBox.addLayer({
        id: poiLayer,
        type: 'symbol',
        source: sourceName,
        layout: {
          visibility: 'visible',
          'icon-allow-overlap': true,
          'icon-image': ['case', express_gouB_1, 'maxLevel-r', express_gouB_2, 'maxLevel-y', express_gouB_3, 'maxLevel-g', 'shengB_d'],
          'icon-size': 0.8,
          'text-allow-overlap': true, // 是否允许文本重叠（可选，默认值为 false。
          'text-anchor': 'top',
        },
        paint: {
          'text-color': '#fff',
        },
      });
      poiLayers.push(poiLayer);
    },

    // 绘制轨迹
    drawTrack(poiArr, sourceName, lineLayer) {
      // allLayers.map((item) => {
      //   this.layerHidden(item)
      // })

      let path = [];
      poiArr.map((item) => {
        let arr_0 = item.split(',');
        let arr_1 = bd09towgs84(arr_0[0] * 1, arr_0[1] * 1);
        path.push(arr_1);
      });

      let poiGeo = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: path,
            },
          },
        ],
      };

      if (mapBox.getLayer(lineLayer)) {
        mapBox.removeLayer(lineLayer);
      }
      if (mapBox.getSource(sourceName)) {
        mapBox.removeSource(sourceName);
      }
      console.log('无需', poiGeo);
      mapBox.addSource(sourceName, {
        type: 'geojson',
        data: poiGeo,
      });

      mapBox.addLayer({
        id: lineLayer,
        type: 'line',
        source: sourceName,
        layout: {
          visibility: 'visible',
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-width': 3,
          'line-color': 'red',
          // 'line-dasharray': [5, 5] // 可设置实线、虚线的长度
        },
      });

      lineLayers.push(lineLayer);
    },
    // 绘制单个点
    drawSingle_Symbol(poi, detail, sourceName, layerId, imgConfig) {
      let poiGeo = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: detail,
            geometry: {
              type: 'Point',
              coordinates: poi,
            },
          },
        ],
      };
      if (!mapBox.getSource(sourceName)) {
        mapBox.addSource(sourceName, {
          type: 'geojson',
          data: poiGeo,
        });
      }
      this.loadImg(imgConfig.imgPath, imgConfig.imgName);
      if (!mapBox.getLayer(layerId)) {
        mapBox.addLayer({
          id: layerId,
          type: 'symbol',
          source: sourceName,
          layout: {
            visibility: 'visible',
            'icon-allow-overlap': true,
            'icon-image': imgConfig.imgName,
            'icon-size': imgConfig.imgSize ? imgConfig.imgSize : 1,
            // "text-field": "{name}", //此属性为需要显示的字段
            // "text-size": 18,
            // "text-offset": [0, -2.2],
            // "text-allow-overlap": true, // 是否允许文本重叠（可选，默认值为 false。
            // "text-anchor": "top"
          },
          paint: {
            'text-color': '#fff',
          },
        });
        allLayers.push(layerId);
      }
    },
    // 绘制线---line--萧山区轮廓
    drawLineWith_Xiaoshan() {
      if (!mapBox.getLayer('bounder')) {
        mapBox.addLayer({
          id: 'bounder',
          type: 'line',
          source: 'XiaoShanGeo',
          layout: {
            visibility: 'visible',
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-width': 3,
            'line-color': 'skyblue',
            // 'line-dasharray': [5, 5] // 可设置实线、虚线的长度
          },
        });
      }
    },
    // 绘制面---polygon---镇街
    drawPolygonWith_Xiaoshan(streetName = '') {
      street_arr.map((item) => {
        if (streetName) {
          if (!mapBox.getSource(streetName)) {
            mapBox.addSource(streetName, {
              type: 'geojson',
              data: `./static/data/萧山镇街/${streetName}.json`,
            });
          }
        } else {
          if (!mapBox.getSource(item)) {
            mapBox.addSource(item, {
              type: 'geojson',
              data: `./static/data/萧山镇街/${item}.json`,
            });
          }
        }
        if (streetName) {
          if (!mapBox.getLayer(`streetPolygon_${streetName}`)) {
            mapBox.addLayer({
              id: `streetPolygon_${streetName}`,
              type: 'fill',
              source: streetName,
              layout: {
                // 'text-field': '{name}',
              },
              paint: {
                'fill-color': 'skyblue',
                'fill-opacity': 0.2,
              },
            });
            allStreetLayer.push(`streetPolygon_${streetName}`);
          }
        } else {
          if (!mapBox.getLayer(`streetPolygon_${item}`)) {
            mapBox.addLayer({
              id: `streetPolygon_${item}`,
              type: 'fill',
              source: item,
              layout: {},
              paint: {
                'fill-color': 'skyblue',
                'fill-opacity': 0.2,
              },
            });
            allStreetLayer.push(`streetPolygon_${item}`);
          }
        }
        if (streetName) {
          if (!mapBox.getLayer(`streetLine_${streetName}`)) {
            mapBox.addLayer({
              id: `streetLine_${streetName}`,
              type: 'line',
              source: streetName,
              layout: {
                visibility: 'visible',
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-width': 1,
                'line-color': '#01c0ff',
                // 'line-dasharray': [5, 5] // 可设置实线、虚线的长度
              },
            });
            allStreetLineLayer.push(`streetLine_${streetName}`);
          }
        } else {
          if (!mapBox.getLayer(`streetLine_${item}`)) {
            mapBox.addLayer({
              id: `streetLine_${item}`,
              type: 'line',
              source: item,
              layout: {
                visibility: 'visible',
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-width': 1,
                'line-color': '#01c0ff',
                // 'line-dasharray': [5, 5] // 可设置实线、虚线的长度
              },
            });
            allStreetLineLayer.push(`streetLine_${item}`);
          }
        }
      });
    },
    // 创建弹框
    createPopUp(data, type = '') {
      var that = this;
      let comp;
      if (that.currentRouteName.indexOf('jsc') >= 0) {
        comp = Popup_2;
      } else if (that.currentRouteName.indexOf('zhdd') >= 0) {
        comp = Popup_1;
      }
      if (data.type == 'people') {
        comp = peoplePop;
      }
      if (data.reportType == '镇街统计') {
        comp = streetPop;
      }
      if (type == 'warning') {
        console.log('0000', data);
        comp = warningPop;
      } else if (type === 'tip') {
        comp = tipPop;
      }
      const p = Vue.extend(comp);
      let vm = new p({
        propsData: {
          rhdata: data, //传递到弹框页面的数据
        }, //传参
      });
      vm.$mount(); //挂载
      that.popupTemp = vm.$el;
    },
    // 加载所有图片
    loadAllImg() {
      // this.loadImg('./static/images/culturalSave/map-a.png', 'culturalImg')
      // this.loadImg('./static/images/culturalSave/b-s@2x.png', 'blue-s')
      // this.loadImg('./static/images/culturalSave/b-l@2x.png', 'blue-l')
      // this.loadImg('./static/images/culturalSave/r-s@2x.png', 'red-s')
      // this.loadImg('./static/images/culturalSave/r-l@2x.png', 'red-l')
      // this.loadImg('./static/images/culturalSave/g-s@2x.png', 'green-s')
      // this.loadImg('./static/images/culturalSave/g-l@2x.png', 'green-l')
      // this.loadImg('./static/images/culturalSave/y-s@2x.png', 'yellow-s')
      // this.loadImg('./static/images/culturalSave/y-l@2x.png', 'yellow-l')

      // 无预警
      this.loadImg('./static/images/culturalSave/gb-g.png', 'gouB_g');
      this.loadImg('./static/images/culturalSave/gb-z.png', 'gouB_z');
      this.loadImg('./static/images/culturalSave/gb-d.png', 'gouB_d');

      this.loadImg('./static/images/culturalSave/pb-g.png', 'shengB_g');
      this.loadImg('./static/images/culturalSave/pb-z.png', 'shengB_z');
      this.loadImg('./static/images/culturalSave/pb-d.png', 'shengB_d');

      this.loadImg('./static/images/culturalSave/sb-g.png', 'shiB_g');
      this.loadImg('./static/images/culturalSave/sb-z.png', 'shiB_z');
      this.loadImg('./static/images/culturalSave/sb-d.png', 'shiB_d');

      this.loadImg('./static/images/culturalSave/sjb-g.png', 'shiJ_g');
      this.loadImg('./static/images/culturalSave/sjb-z.png', 'shiJ_z');
      this.loadImg('./static/images/culturalSave/sjb-d.png', 'shiJ_d');

      // 有预警
      this.loadImg('./static/images/culturalSave/gb-g-r.png', 'gouB_g_red');
      this.loadImg('./static/images/culturalSave/gb-z-r.png', 'gouB_z_red');
      this.loadImg('./static/images/culturalSave/gb-d-r.png', 'gouB_d_red');

      this.loadImg('./static/images/culturalSave/pb-g-r.png', 'shengB_g_red');
      this.loadImg('./static/images/culturalSave/pb-z-r.png', 'shengB_z_red');
      this.loadImg('./static/images/culturalSave/pb-d-r.png', 'shengB_d_red');

      this.loadImg('./static/images/culturalSave/sb-g-r.png', 'shiB_g_red');
      this.loadImg('./static/images/culturalSave/sb-z-r.png', 'shiB_z_red');
      this.loadImg('./static/images/culturalSave/sb-d-r.png', 'shiB_d_red');

      this.loadImg('./static/images/culturalSave/sjb-g-r.png', 'shiJ_g_red');
      this.loadImg('./static/images/culturalSave/sjb-z-r.png', 'shiJ_z_red');
      this.loadImg('./static/images/culturalSave/sjb-d-r.png', 'shiJ_d_red');

      // 气象预警图片
      // this.loadImg('./static/images/culturalSave/r-s-c@2x.png', 'gw-s')
      // this.loadImg('./static/images/culturalSave/r-l-c@2x.png', 'gw-l')
      // this.loadImg('./static/images/culturalSave/r-s-r@2x.png', 'by-s')
      // this.loadImg('./static/images/culturalSave/r-l-r@2x.png', 'by-l')
      // this.loadImg('./static/images/culturalSave/r-s-t@2x.png', 'tf-s')
      // this.loadImg('./static/images/culturalSave/r-l-t@2x.png', 'tf-l')
      // 聚合图图片
      this.loadImg('./static/images/culturalSave/gp@3x.png', 'clusterImg-g');
      this.loadImg('./static/images/culturalSave/yp@3x.png', 'clusterImg-y');
      this.loadImg('./static/images/culturalSave/rp@3x.png', 'clusterImg-r');

      // 仅根据风险类别区分
      this.loadImg('./static/images/culturalSave/bump-g.png', 'maxLevel-g');
      this.loadImg('./static/images/culturalSave/bump-y.png', 'maxLevel-y');
      this.loadImg('./static/images/culturalSave/bump-r.png', 'maxLevel-r');
    },
    // ====================================================================
    // 左上按钮点击
    culturalBtnClick(isShow) {
      if (isShow) {
        this.culturalPoiBoxShow = true;
      } else {
        this.culturalPoiBoxShow = false;
      }
    },
    culturalPlaneBtnClick() {
      this.planeBoxShow = true;
    },
    closePlaneBox() {
      this.planeBoxShow = false;
    },
    checkPeopleBtnClick(isShow) {
      // console.log('00000', isShow)
      if (isShow) {
        this.checkPeopleBoxShow = true;
      } else {
        this.checkPeopleBoxShow = false;
      }
    },
    // 展示巡查员点位
    showPeoplePoi(poiList) {
      allLayers.map((item) => {
        this.layerHidden(item);
      });
      this.drawSymbol(poiList, 'zb', 'peoplePoi', './static/images/culturalSave/people.png', 'peopleImg', 'peopleLayer', 1);
    },
    // 隐藏巡查员点位
    hidePeoplePoi() {
      allLayers.map((item) => {
        this.layerHidden(item);
      });
    },
    // 左上气象预警
    weatherWarningClick(type) {
      // console.log('气象类型', type)
      this.isNormalPoi = false;
      this.currentWeatherType = type;
      let params = {
        type,
        level: this.isClickStreet ? '1' : '0',
        name: this.currentAddress,
      };
      wbd_list_by_weatherWarning(params).then((res) => {
        // console.log('气象预警列表', res.data)
        let arr = res.data.data.map((item) => {
          item._weatherType_ = type;
          return item;
        });
        this.culturalRelics = [...arr];
        if (this.isClickStreet) {
          this.drawSymbolWithText();
        } else {
          this.drawSymbolWithText_cluster();
        }
      });
    },
    // 右上预警按钮
    warningBtnClick() {
      if (this.yjBoxShow) {
        warningMarker.length > 0 &&
          warningMarker.map((item) => {
            item.remove();
          });
        currentPop.remove();
        allLayers.map((item) => {
          this.layerShow(item);
        });
        warningMarker = [];
        this.yjBoxShow = false;
      } else {
        this.yjBoxShow = true;
        // allLayers.map(item => {
        //   this.layerHidden(item);
        // });
        // this.addAnimationToMap();
        // this.showYJ_Box();
      }
    },
    showYJ_Box(data = {}, poi = [120.30147736711149, 29.959598423120653]) {
      currentPop && currentPop.remove();
      // 创建弹框
      this.createPopUp(data, 'warning'); //第二步中的创建内容的方法
      currentPop = new this.$mapboxgl.Popup({
        closeButton: false,
        className: 'my-popUp-class',
      })
        .setLngLat(poi)
        .setMaxWidth('630px') //设置弹窗最大宽度
        .setDOMContent(this.popupTemp) //插入节点
        .addTo(mapBox);

      eventBus.$emit('isShowVideo', true);
    },
    // 移除预警跳动点位和浮框
    clearMarkerAndBox() {
      warningMarker.length > 0 &&
        warningMarker.map((item) => {
          item.remove();
        });
      warningMarker = [];
      currentPop.remove();

      this.isWarning = false;
    },
    yjBoxClose() {
      this.yjBoxShow = false;
    },
    _closeAndChange() {
      warningMarker.length > 0 &&
        warningMarker.map((item) => {
          item.remove();
        });
      currentPop.remove();
      allLayers.map((item) => {
        this.layerShow(item);
      });
      warningMarker = [];
      this.yjBoxShow = false;
      setTimeout(() => {
        this.isWarning = false;
      }, 100);
    },
    // 点位是否聚合
    isCluster(boolean) {
      if (boolean) {
        if (mapBox.getLayer('symbol_cultural_noCluster_shiB')) {
          mapBox.removeLayer('symbol_cultural_noCluster_shiB');
        }
        if (mapBox.getSource('culturalPoints_noCluster_shiB')) {
          mapBox.removeSource('culturalPoints_noCluster_shiB');
        }
        this.drawSymbolWithText_cluster(this.shiBaoPoi, 'culturalPoints_shiB', 'clusterLayer_shiB', 'symbol_cultural_shiB');
      } else {
        if (mapBox.getLayer('clusterLayer_shiB')) {
          mapBox.removeLayer('clusterLayer_shiB');
        }
        if (mapBox.getLayer('symbol_cultural_shiB')) {
          mapBox.removeLayer('symbol_cultural_shiB');
        }
        if (mapBox.getSource('culturalPoints_shiB')) {
          mapBox.removeSource('culturalPoints_shiB');
        }
        this.drawSymbolWithText(this.shiBaoPoi, 'culturalPoints_noCluster_shiB', 'symbol_cultural_noCluster_shiB');
      }
    },
    // 地图缩放操作
    zoom(type) {
      let currentZoom = mapBox.getZoom();
      switch (type) {
        case '+':
          if (currentZoom <= 19) {
            mapBox.flyTo({
              zoom: currentZoom + 1,
            });
          }
          break;
        case '-':
          if (currentZoom >= 2) {
            mapBox.flyTo({
              zoom: currentZoom - 1,
            });
          }
          break;
        case 'back':
          this.noCluster = false;

          lineLayers.map((item) => {
            // 移除轨迹图层
            if (mapBox && mapBox.getLayer(item)) {
              mapBox.removeLayer(item);
            }
          });
          lineLayers = [];

          if (!this.isClickStreet) {
            mapBox.flyTo({
              center: [120.36452, 30.22505],
              zoom: 9.4,
            });
            currentPop && currentPop.remove(); // 移除弹框

            if (this.isNormalPoi) {
              eventBus.$emit('data_back', ['']);
            } else {
              eventBus.$emit('data_back', ['noDraw']);
              this.weatherWarningClick(this.currentWeatherType);
            }
            return;
          }
          this.currentAddress = '萧山区';
          if (this.isClickStreet) {
            this.bounderMask('./static/data/萧山区New.json');
            this.layerShow('bounder');
          }
          this.isClickStreet = false;
          this.changeMapStyle();
          mapBox.flyTo({
            center: [120.36452, 30.22505],
            zoom: 9.4,
          });
          currentPop && currentPop.remove(); // 移除弹框
          if (this.isNormalPoi) {
            eventBus.$emit('data_back', ['']);
          } else {
            eventBus.$emit('data_back', ['noDraw']);
            this.weatherWarningClick(this.currentWeatherType);
          }
          break;
        case 'legend':
          eventBus.$emit('showLegend');
          break;
        default:
          break;
      }
    },
    // 在地图上展示动效
    addAnimationToMap(poi) {
      warningMarker.length > 0 &&
        warningMarker.map((item) => {
          item.remove();
        });
      warningMarker = [];
      var el = document.createElement('div');
      el.className = 'marker-box';
      var el1 = document.createElement('div');
      el1.className = 'marker';
      var el2 = document.createElement('span');
      el2.innerText = '务本堂';
      el1.appendChild(el2);
      el.appendChild(el1);
      el.onclick = (e) => {
        e.stopPropagation();
        // let time = new Date().Format('yyyy-MM-dd HH:mm:ss')
        this.showYJ_Box(this.warningData);
      };
      let marker = new this.$mapboxgl.Marker(el).setLngLat([120.30147736711149, 29.959598423120653]).addTo(mapBox);
      warningMarker.push(marker);
    },
    // 预警接收---webSocket
    initWebSocket() {
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket');
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open: function () {
      console.log('预警socket连接成功');
    },
    error: function () {
      console.log('连接错误');
    },
    getMessage: function (msg) {
      console.log('websocket接收预警信息123', msg, msg.data, JSON.parse(msg.data));
      if (JSON.parse(msg.data) == 1) return;
      setTimeout(() => {
        eventBus.$emit('updateApi'); // 更新风险态势数据
      }, 5000);

      let _warningData = JSON.parse(msg.data);
      this.isWarning = true;
      allLayers.map((item) => {
        this.layerHidden(item);
      });
      let time = new Date().Format('yyyy-MM-dd HH:mm:ss');
      // 更新任务进度数据
      if (_warningData['事件类型'] === '例行检查提交') {
        setTimeout(() => {
          eventBus.$emit('updateTimeData', _warningData); // 更新事件详情时间进度图数据
          eventBus.$emit('updateApi'); // 检查完成后更新最新的风险态势数据
          this.clearMarkerAndBox();
        }, 2000);
      } else {
        this.addAnimationToMap();
        this.warningData = {
          time: _warningData['发生时间'] || time,
          warningType: _warningData['事件类型'] || '火灾预警',
          warningValue: _warningData.value + _warningData.valueUnit || _warningData['当前温度'] || _warningData['最大温度'] || _warningData['检测值'] || '暂无',
        };
        this.showYJ_Box(this.warningData);
        setTimeout(() => {
          eventBus.$emit('initTimeData', _warningData['发生时间']);
          eventBus.$emit('updateApi'); // 更新风险态势数据
          // // 弹出精密智控窗口
          // eventBus.$emit('openVideo')
        }, 2000);
      }
      // if(this.warningEventId==''){
      //   this.warningEventId = msg.data
      // }
    },
    send: function () {
      this.socket.send(params);
    },
    close: function () {
      console.log('socket已经关闭');
    },

    // 地图自动展示文物点tip
    autoShowPoiTip() {
      tipPopEntity && tipPopEntity.remove();
      clearInterval(timer6);
      timer6 = setInterval(() => {
        if (mapBox.getLayer('symbol_cultural_gouB') && mapBox.getLayer('symbol_cultural_shengB')) {
          clearInterval(timer6);
          let arr = this.gouBaoPoi.concat(this.shengBaoPoi);
          let index = 0;
          clearInterval(tipTimer);
          tipTimer = setInterval(() => {
            if (index > arr.length - 1) {
              index = 0;
            }
            let detail = arr[index];
            let poi = detail.poi.split(',');
            // 创建弹框
            tipPopEntity && tipPopEntity.remove();
            this.createPopUp(detail, 'tip'); //第二步中的创建内容的方法
            tipPopEntity = new this.$mapboxgl.Popup({
              closeButton: false,
              className: 'my-popUp-class',
            })
              .setLngLat([poi[0] * 1, poi[1] * 1])
              .setMaxWidth('630px') //设置弹窗最大宽度
              .setDOMContent(this.popupTemp) //插入节点
              .addTo(mapBox);
            index++;
          }, 3000);
        }
      }, 100);
    },
  },
  mounted() {
    this.initMap();
    this.initWebSocket();
    // 绘制文保点位
    eventBus.$on('drawCulturalPoi', (msg, logo, type) => {
      console.log('0000005520', type);
      if (mapBox && mapBox.getLayer('symbol_cultural_init')) {
        mapBox.removeLayer('symbol_cultural_init');
      }
      switch (type) {
        case '1':
          // 国保
          this.gouBaoPoi = [...msg];
          if (logo == 'init') {
            clearInterval(timer1);
            timer1 = setInterval(() => {
              if (mapBox && mapBox.getLayer('bounder') && mapBox.hasImage('clusterImg-g') && mapBox.hasImage('clusterImg-y') && mapBox.hasImage('clusterImg-r')) {
                this.drawSymbolWithText(this.gouBaoPoi, 'culturalPoints_gouB', 'symbol_cultural_gouB');
                clearInterval(timer1);
              }
            }, 100);
          } else {
            this.drawSymbolWithText(this.gouBaoPoi, 'culturalPoints_gouB', 'symbol_cultural_gouB');
          }
          break;
        case '2':
          // 省保
          this.shengBaoPoi = [...msg];
          if (logo == 'init') {
            clearInterval(timer2);
            timer2 = setInterval(() => {
              if (mapBox && mapBox.getLayer('bounder') && mapBox.hasImage('clusterImg-g') && mapBox.hasImage('clusterImg-y') && mapBox.hasImage('clusterImg-r')) {
                this.drawSymbolWithText(this.shengBaoPoi, 'culturalPoints_shengB', 'symbol_cultural_shengB');
                clearInterval(timer2);
              }
            }, 100);
          } else {
            this.drawSymbolWithText(this.shengBaoPoi, 'culturalPoints_shengB', 'symbol_cultural_shengB');
          }
          break;
        case '3':
          // 市保和市级文保点
          this.shiBaoPoi = [...msg];
          if (logo == 'init') {
            clearInterval(timer3);
            timer3 = setInterval(() => {
              if (mapBox && mapBox.getLayer('bounder') && mapBox.hasImage('clusterImg-g') && mapBox.hasImage('clusterImg-y') && mapBox.hasImage('clusterImg-r')) {
                this.drawSymbolWithText_cluster(this.shiBaoPoi, 'culturalPoints_shiB', 'clusterLayer_shiB', 'symbol_cultural_shiB');
                clearInterval(timer3);
              }
            }, 100);
          } else {
            this.drawSymbolWithText_cluster(this.shiBaoPoi, 'culturalPoints_shiB', 'clusterLayer_shiB', 'symbol_cultural_shiB');
          }
          break;
        case '4':
          this.noCluster = true;
          // 市保和市级文保点不聚合
          this.shiBaoPoi = [...msg];
          if (logo == 'init') {
            clearInterval(timer4);
            timer4 = setInterval(() => {
              if (mapBox && mapBox.getLayer('bounder') && mapBox.hasImage('clusterImg-g') && mapBox.hasImage('clusterImg-y') && mapBox.hasImage('clusterImg-r')) {
                this.drawSymbolWithText(this.shiBaoPoi, 'culturalPoints_shiB', 'symbol_cultural_shiB');
                clearInterval(timer4);
              }
            }, 100);
          } else {
            if (mapBox && mapBox.getLayer('clusterLayer_shiB')) {
              mapBox.removeLayer('clusterLayer_shiB');
            }
            this.drawSymbolWithText(this.shiBaoPoi, 'culturalPoints_shiB', 'symbol_cultural_shiB');
          }
          break;
        case '5':
          this.gouBaoPoi = [];
          this.shengBaoPoi = [];
          this.shiBaoPoi = [];

          this.noCluster = true;
          // 先删除其他点位图层
          poiLayers.length > 0 &&
            poiLayers.map((item) => {
              if (mapBox && mapBox.getLayer(item)) {
                mapBox.removeLayer(item);
              }
            });
          // 项目初始化，9个文保点不聚合
          this.initPoi_nine = [...msg];
          if (logo == 'init') {
            clearInterval(timer5);
            timer5 = setInterval(() => {
              if (mapBox && mapBox.getLayer('bounder') && mapBox.hasImage('clusterImg-g') && mapBox.hasImage('clusterImg-y') && mapBox.hasImage('clusterImg-r')) {
                this.drawSymbol_onlyRiskLevel(this.initPoi_nine, 'culturalPoints_init', 'symbol_cultural_init');
                // this.drawSymbolWithText(
                //   this.initPoi_nine,
                //   'culturalPoints_init',
                //   'symbol_cultural_init'
                // )
                clearInterval(timer5);
              }
            }, 100);
          } else {
            if (mapBox && mapBox.getLayer('clusterLayer_shiB')) {
              mapBox.removeLayer('clusterLayer_shiB');
            }
            this.drawSymbol_onlyRiskLevel(this.initPoi_nine, 'culturalPoints_init', 'symbol_cultural_init');
            // this.drawSymbolWithText(
            //   this.initPoi_nine,
            //   'culturalPoints_init',
            //   'symbol_cultural_init'
            // )
          }
          break;
        case '6':
          this.noCluster = true;
          // 先删除其他点位图层
          poiLayers.length > 0 &&
            poiLayers.map((item) => {
              if (mapBox && mapBox.getLayer(item)) {
                mapBox.removeLayer(item);
              }
            });
          // 事件关联的点位
          if (mapBox && mapBox.getLayer('clusterLayer_shiB')) {
            mapBox.removeLayer('clusterLayer_shiB');
          }
          this.drawSymbolWithText([...msg], 'eventPoint_source', 'eventPoint_layer');
          break;
        default:
          break;
      }
      // this.autoShowPoiTip()
    });
  },
};
</script>

<style lang="less" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* box-shadow: inset 1px 0 150px 70px #11264dcc; */
    background: radial-gradient(rgba(0, 40, 97, 0), rgba(0, 40, 97, 1));
    pointer-events: none;
    z-index: 1;
  }
  .top-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 280px;
    background: url('../assets/img2/left-shade.png') no-repeat left;
    background: linear-gradient(to bottom, rgba(16, 46, 86, 1), rgba(16, 46, 86, 0.05));
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 1;
  }
  .left-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 753px;
    height: 100%;
    background: url('../assets/img2/left-shade.png') no-repeat left;
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 1;
  }
  .right-mask {
    position: absolute;
    right: 0;
    top: 0;
    width: 862px;
    height: 100%;
    background: url('../assets/img2/right-shade.png') no-repeat right;
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 1;
  }
  .tool {
    position: absolute;
    width: 50px;
    top: 270px;
    left: 510px;
    z-index: 1;
    .item {
      position: relative;
      width: 100%;
      height: 50px;
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
      background: url('../assets/img3/map-icon1.png') no-repeat center;
      background-size: 85% auto;
    }
    .item:nth-child(2) {
      background: url('../assets/img2/map-icon3.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
  .wearth-warning {
    position: absolute;
    width: 135px;
    top: 425px;
    left: 550px;
    z-index: 1;
    .item {
      width: 100%;
      height: 38px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      background: url('../assets/img2/m-icon-box.png') no-repeat right;
      background-size: 100%;
      cursor: pointer;
      img {
        width: 38px;
        height: 38px;
      }
      span {
        margin-left: 10px;
        font-family: MicrosoftYaHei-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
  .warning {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 380px;
    left: 510px;
    z-index: 1;
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 5px 0;
    cursor: pointer;
  }
  .red {
    background: url('../assets/img2/map-icon5.png') no-repeat center;
    background-size: 100% 100%;
  }
  .green {
    background: url('../assets/img2/map-icon4.png') no-repeat center;
    background-size: 100% 100%;
  }
  .back {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 270px;
    right: 515px;
    z-index: 1;
    background: url('../assets/img3/re-icon@3x.png') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 5px 0;
    cursor: pointer;
  }
  .zoom {
    position: absolute;
    width: 32px;
    bottom: 50px;
    right: 515px;
    z-index: 2;
    .item {
      width: 100%;
      height: 32px;
      background: red;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin: 5px 0;
      cursor: pointer;
    }
    .item:nth-child(1) {
      background: url('../assets/img2/map-a.png') no-repeat center;
      background-size: 100% 100%;
    }
    .item:nth-child(2) {
      background: url('../assets/img2/map-s.png') no-repeat center;
      background-size: 100% 100%;
    }
    .item:nth-child(3) {
      background: url('../assets/img2/map-r.png') no-repeat center;
      background-size: 100% 100%;
    }
    .item:nth-child(4) {
      background: url('../assets/img2/m-icon-add.png') no-repeat center;
      background-size: 100% 100%;
    }
    .item:nth-child(5) {
      background: url('../assets/img3/pic-icon.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
}
</style>
