<template>
  <div id="cesiumContainer">
    <div class="tool">
      <div class="item">
        <div class="text" @click="culturalBtnClick(!culturalPoiBoxShow)"></div>
        <culturalPoiBox :boxShow="culturalPoiBoxShow" @close="culturalBtnClick(false)" />
      </div>
      <!-- <div class="item">
        <div
          class="text"
          @click="checkPeopleBtnClick(true)"
        ></div>
        <checkPeopleBox
          :isShow="checkPeopleBoxShow"
          @ShowPoi="showPeoplePoi"
          @HidePoi="hidePeoplePoi"
          @close="checkPeopleBtnClick(false)"
        />
      </div> -->
    </div>
    <div class="warning red" v-if="isWarning" @click="warningBtnClick">
      <!-- 弹框 -->
      <YjBox :isShow="yjBoxShow" @close="yjBoxClose" @closeAndChange="_closeAndChange" />
    </div>
    <div class="warning green" v-else></div>
    <div class="back" v-show="isClickStreet" @click="zoom('back')"></div>
    <div class="zoom">
      <!-- <div
        class="item"
        @click="zoom('+')"
      ></div>
      <div
        class="item"
        @click="zoom('-')"
      ></div> -->
      <!-- <div v-show="false" class="item" @click="zoom('back')"></div> -->
      <!-- <div class="item" @click="changeMapStyle"></div> -->
      <!-- <div
        class="item"
        @click="zoom('legend')"
      ></div> -->
      <div class="fireTrigger" @click="onfire"></div>
    </div>
    <div id="mask" class="mask"></div>
    <LegendBox />
    <TaskDispatch
      :isShow="taskDispatch_isShow"
      @close="
        () => {
          this.taskDispatch_isShow = checkbox_false_full_focus;
        }
      "
    />
    <HBYDetailCopy :isShow="isShow_hbyDetail" @close="close_hbyDetail" />
  </div>
</template>
<script>
// import LegendBox from './xiaoshanComponentsNew/firstPage/components/legendBox';
// import TaskDispatch from './xiaoshanScreenTenMouth/components/taskDispatch';
import CesiumRotatingDial from '../js/CesiumRotatingDial.js';
// import HBYDetailCopy from './xiaoshanScreenTenMouth/hb365/secondPage/hbyDetailCopy.vue';
import { getMiniNetByAddId, getHousePoi, getLocalData, freshNginx, getSys_2, getTiles3D, getStreet, getNetNameAndCommunityName, save_hedao_info, get_NC_STBC_Polygon_Poi } from '@/api/api';
import { get_zpdt_data } from '@/api/xsApi3.js';
import * as turf from '@turf/turf';
import { eventBus } from '@/main';
import popUtil from '@/utils/pop/popUtil';
// import VideoWindow from './newComponents/videoWindow';
import { bd09towgs84, gcj02towgs84 } from '@/js/CesiumTools';
import '../js/CesiumPop.js';
import { mapState } from 'vuex';
import xiaoshanNewData from '@/data/XiaoshanNewCompression.json';
import xiaoshanStreetData from '@/data/萧山镇街.json';
import Static365Data from './365StaticData.json';
import ZBZStaticData from './ZBZStaticData.json';
import xs_map from '@/assets/img4/xs_map.png';
let viewer = null;
let mapHeight_min = 43;
let mapHeight_max = 250;
let localimageryUrl = '';
let localimgannoUrl = '';
let localdarkUrl = '';
let localdem = '';
let googleimagery;
let arcgisimagery;
let arcgisTerrainProvider;
let tdtimagery;
let tdtannoimagery;
let tdtvectorimagery;
let tdtvectoranoimagery;
let mapboxImagery;
let localimagery;
let localimganno;
let darkimagery;
let preImageryArr = [];
let localTerrainProvider;
let tilesetArr = [];
let simple3D;
let simpleUrl = '';
let importantLableArr = []; //重点地名地址标记数组
let address_overlays3D;
let pomhandler; //操作监听句柄对象
let rotatingDial;
let origin = [];
let rotatingDialPos;
let rotatingDialPosArr = [];
let tilesetWallArr = [];
window.emergencyPosArr = []; //接处警点坐标数组
let tilesZ = 0;
let buildingHighlight = []; //楼层实体
let labelEntities = []; //文字实体

let culturalRelicsEntities = []; // 文保单位点位实体
let xiaoShanStreetPolygonEntities = []; // 萧山镇街的面实体
let actStreet = []; // 高风险镇街名称
let xiaoShanStreetLabelEntities = []; // 萧山镇街的文字实体
let xiaoShanLineEntities = []; // 萧山地图描边线实体
let wallEntities = []; // 墙体实体
let weixingMapEntities = []; // 卫星地图实体
let clusterEntities = []; // 聚合实体
let clusterLabelEntities = []; // 聚合文字实体
let checkPeopleEntities = []; // 巡查员点位实体
let peoplePathEntities = []; // 巡查员轨迹实体
let palaceTileset = null; // 3d模型切片
let maskEntities = [];

// 地图上按钮的弹框
// import culturalPoiBox from './mapPublicComponents/culturalPoiBox.vue';
// import checkPeopleBox from './mapPublicComponents/checkPeopleBox.vue';
// import YjBox from './mapPublicComponents/YJ-Box';
import { getThreeData } from '../api/api';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
export default {
  name: 'map-3d',
  components: {
    LegendBox: () => import(/* webpackChunkName: "legend1Box" */ './xiaoshanComponentsNew/firstPage/components/legendBox'),
    VideoWindow: () => import(/* webpackChunkName: "VideoWindow" */ './newComponents/videoWindow'),
    culturalPoiBox: () => import(/* webpackChunkName: "culturalPoiBox" */ './mapPublicComponents/culturalPoiBox.vue'),
    checkPeopleBox: () => import(/* webpackChunkName: "checkPeopleBox" */ './mapPublicComponents/checkPeopleBox.vue'),
    YjBox: () => import(/* webpackChunkName: "YjBox" */ './mapPublicComponents/YJ-Box'),
    TaskDispatch: () => import(/* webpackChunkName: "TaskDispatch" */ './xiaoshanScreenTenMouth/components/taskDispatch'),
    HBYDetailCopy: () => import(/* webpackChunkName: "HBYDetailCopy" */ './xiaoshanScreenTenMouth/hb365/secondPage/hbyDetailCopy.vue'),
  },
  data() {
    return {
      isShow_hbyDetail: false,
      // 语音播报
      synth: {},
      msg: null,
      // 萧山文物点位
      culturalRelics: [],
      culturalPoiBoxShow: false,
      checkPeopleBoxShow: false,
      isWarning: false,
      yjBoxShow: false,
      isClickStreet: false, // 是否进入镇街标识
      // websocket配置
      path: `ws://223.65.209.139:18180/hik/broadcast/${Math.random()}`,
      socket: '',
      warningEventId: '', // 预警事件唯一标识
      warningData: {},
      // 二级页面
      taskDispatch_isShow: false, // 任务派发

      isShowModel:false, // 记录是否显示模型了
    };
  },
  computed: {
    ...mapState(['currentRouteName']),
  },
  watch: {
    currentRouteName(val) {
      // this.clearMarkerAndBox();
      //   console.log('当前的路由', val)
      /*   if (val !== '/wbd' && val !== '/zbz2') {
        // 删除模型
        // viewer.scene.primitives.remove(palaceTileset);
        // palaceTileset = null;
        // // 恢复隐藏的实体
        // this.showEntities(culturalRelicsEntities) // 文保单位点位实体
        // this.showEntities(xiaoShanStreetPolygonEntities) // 萧山镇街的面实体
        // this.showEntities(xiaoShanStreetLabelEntities) // 萧山镇街的面实体
        // this.showEntities(xiaoShanLineEntities) // 萧山地图描边线实体
        // this.showEntities(wallEntities) // 墙体实体

        // this.wholeView() // 恢复初始视角
        this.zoom('back');
      } */
      if (val == '/wbd') {
        //
      } else if (val == '/zbz2') {
        //
      } else if (val == '/yxzsDetails') {
        //
      } else {
        this.zoom('back');
      }
    },
  },
  created() {
    // eventBus.$on('isShowCenterAndTop', (boolean, logo) => {
    //   if (!boolean) {
    //     this.removeEntities(culturalRelicsEntities);
    //   }
    // });
    // 删除预警弹框
    eventBus.$on('closePup', () => {
      CesiumPop.removeDivPopById(viewer, 'warningBox');
    });

    // 点击预警点位标签，显示预警弹框
    eventBus.$on('showWarningBox', () => {
      CesiumPop.removeDivPopById(viewer, 'warningBox');
      this.showYJ_Box(this.warningData,this.warningData.poi);
    });

    // 绘制巡查员轨迹
    eventBus.$on('drawPeoplePath', (poi, row) => {
      this.drawPeoplePath(poi, row);
      this.flyToLocation([poi[0], poi[1], 3000]);
    });

    // 解除预警状态
    eventBus.$on('closeWarningPopAndBox', () => {
      this.clearMarkerAndBox();
    });

    // 绘制设备点位
    eventBus.$on('devicePoi', (poiArr) => {
      this.drawDeviceOrPeoplePoi(poiArr, 'device');
    });
    // 绘制护宝365人员点位
    eventBus.$on('peoplePoi', (poiArr) => {
      this.drawDeviceOrPeoplePoi(poiArr, 'people');
    });

    // 绘制正常事件的点位
    eventBus.$on('normalEventPoi', (poiArr, poiType) => {
      this.drawNormalEventPoi(poiArr, poiType);
    });
    eventBus.$on('tabSwitchReset', (value) => {
      this.tabSwitchReBirth(value);
    });

    eventBus.$on('switchYxzsMapMark', (value) => {
      this.getCluster_list(); // 初始化绘制聚合点位---永兴指数页面
    });
  },
  mounted() {
    console.log('map3d挂载了');
    this.initWebSocket();
    // 语音播报
    this.synth = window.speechSynthesis;
    this.msg = new SpeechSynthesisUtterance();
    // setTimeout(() => {
    //   let text = "警告，务本堂疑似发生火灾";
    //   this.handleSpeak(text);
    //   console.log(text);
    // }, 5000);

    // console.log('当前的路由-初始化路由获取', this.currentRouteName) // 可根据当前路由展示不同的地图效果
    this.initMap(1.0); // 初始化cesium
    this.initSys(); // 初始化视角和三维数据接口
    this.entitiesClick();

    this.draw_XiaoShan_map();
    this.draw_XiaoShan_Polygon(); // 绘制萧山区轮廓
    this.draw_XiaoshanStreet_Polygon(); // 绘制萧山镇街轮廓

    // this.initRotatingDial() // 绘制背景轮盘

    // this.addWarningMarkerToMap() // 测试预警点位标签
    // this.showYJ_Box(this.warningData) // 测试预警弹框

    // 不同页面的初始化
    switch (this.currentRouteName) {
      case '/yxzs':
        this.setModelConExist(true);
        this.getCluster_list(); // 初始化绘制聚合点位---永兴指数页面
        break;
      case '/xbg':
        this.setModelConExist(true);
        eventBus.$emit('drawPoiByRanks', ['14da5819da904c4ab1d9d94a961ca27a', 'cef2a80fbea6df89578ad5599b67b71f', '2bf3be523de944ec3ee1ad832a7a2587']);
        break;
      case '/zbz':
        this.setModelConExist(false);
        let poiArr = ZBZStaticData;
        this.drawDeviceOrPeoplePoi(poiArr, 'device');
        break;
      case '/zbz2':
        this.setModelConExist(false);
        let poi6Arr = ZBZStaticData;
        this.drawDeviceOrPeoplePoi(poi6Arr, 'device');
        break;
      case '/hb365':
        this.setModelConExist(false);
        let poiArr2 = Static365Data;
        this.drawDeviceOrPeoplePoi(poiArr2, 'people');
        break;
      default:
        break;
    }

    // 统一绘制文保点
    eventBus.$on('drawCulturalPoi', (msg, logo, type) => {
      //   console.log('文保点绘制', msg, logo)
      this.removeEntities(clusterEntities);
      this.removeEntities(clusterLabelEntities);
      this.removeEntities(culturalRelicsEntities);
      let scale;
      let height;
      if (logo == 'fly') {
        scale = 1;
        this.flyToLocation([...msg[0].poi.split(','), 10000]);
      } else {
        scale = 0.8;
      }

      if (this.isClickStreet) {
        height = 10;
      } else {
        height = mapHeight_max;
      }

      msg &&
        msg.length > 0 &&
        msg.map((item) => {
          let config = {};
          config.scale = scale;
          config.height = height;
          //   console.log(item);
          //   console.log(item.maxLevel);

          if (!item.maxLevel) {
            item.maxLevel = '三级';
          }
          if (item.publishName == '务本堂') {
            item.maxLevel = '三级';
          }
          if (item.publishName == '茅湾里窑址') {
            item.maxLevel = '一级';
          }
          //   console.log('logo', logo);

          if (logo == 'category') {
            // 文物分类---category
            switch (item.category) {
              case '古建筑':
                config.img = './static/images/culturalSave/gujianzhu.png';
                break;
              case '近现代重要史迹及代表性建筑':
                config.img = './static/images/culturalSave/daibiao.png';
                break;
              case '古遗址':
                config.img = './static/images/culturalSave/guyizhi.png';
                break;
              case '古墓葬':
                config.img = './static/images/culturalSave/gumuzang.png';
                break;
              case '碑刻':
                config.img = './static/images/culturalSave/beike.png';
                break;
              default:
                break;
            }
          } else if (logo == 'riskType') {
            // 风险分类---riskType
            switch (type) {
              case '1':
                // config.img = './static/images/culturalSave/huozaiyinhuan.png';
                config.img = './static/images/culturalSave/hz@3x@3x.png';
                break;
              case '2':
                // config.img = './static/images/culturalSave/ziranzaihai.png';
                config.img = './static/images/culturalSave/dj@3x@3x.png';
                break;
              case '3':
                // config.img = './static/images/culturalSave/farenweifa.png';
                config.img = './static/images/culturalSave/fr@3x@3x.png';
                break;
              case '4':
                // config.img = './static/images/culturalSave/wajuedaoqie.png';
                config.img = './static/images/culturalSave/zr@3x@3x.png';
                break;
              default:
                config.img = './static/images/culturalSave/qita.png';
                break;
            }
          } else {
            // normal
            if (item.maxLevel == '一级') {
              actStreet.push(item.jd); // 初始化保存高风险镇街名称
              if (logo == 'init') {
                // 初始化时，将高风险点位所在的镇街凸显 item.jd
                // let timer = setInterval(() => {
                //   if (xiaoShanStreetPolygonEntities.length > 0) {
                //     xiaoShanStreetPolygonEntities.map(val => {
                //       if (val.attributeList.name == item.jd) {
                //         // console.log("高风险的点位", val);
                //         val.polygon.material = new Cesium.Color.fromCssColorString(
                //           "red"
                //         ).withAlpha(0.7);
                //       }
                //     });
                //     clearInterval(timer);
                //   }
                // }, 100);
              }
              if (item.rank == '国保') {
                config.img = './static/images/culturalSave/guogao.png';
              } else if (item.rank == '省保') {
                config.img = './static/images/culturalSave/shenggao.png';
              } else if (item.rank == '市保') {
                config.img = './static/images/culturalSave/shigao.png';
              } else {
                config.img = './static/images/culturalSave/01.png';
              }
            } else if (item.maxLevel == '二级') {
              if (item.rank == '国保') {
                config.img = './static/images/culturalSave/guozhong.png';
              } else if (item.rank == '省保') {
                config.img = './static/images/culturalSave/shengzhong.png';
              } else if (item.rank == '市保') {
                config.img = './static/images/culturalSave/shizhong.png';
              } else {
                config.img = './static/images/culturalSave/02.png';
              }
            } else if (item.maxLevel == '三级') {
              // config.img = "./static/images/culturalSave/03.png";
              if (item.rank == '国保') {
                config.img = './static/images/culturalSave/guodi.png';
              } else if (item.rank == '省保') {
                config.img = './static/images/culturalSave/shengdi.png';
              } else if (item.rank == '市保') {
                config.img = './static/images/culturalSave/shidi.png';
              } else {
                config.img = './static/images/culturalSave/03.png';
              }
            }
          }
          if (item.poi) {
            culturalRelicsEntities.push(this.drawCulturalSave_poi(item.poi.split(','), config, item));
          }
        });
    });
    //根据窗口尺寸，调整地图尺寸
    window.onresize = () => {
      return (() => {
        // this.resizeMap()
      })();
    };
  },
  beforeDestroy() {
    viewer.entities.removeAll();
  },
  methods: {
    tabSwitchReBirth(val) {
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: '',
        bumpPointId: '',
      });
      if (this.isClickStreet) {
        this.isClickStreet = false;
        // 删除模型
        viewer.scene.primitives.remove(palaceTileset);
        palaceTileset = null;
        // 删除mapbox地图
        for (let i = 0; i < preImageryArr.length; i++) {
          viewer.imageryLayers.remove(preImageryArr[i], false);
        }
        preImageryArr = [];
        this.removeEntities(xiaoShanStreetPolygonEntities); // 删除萧山镇街的面实体
        this.removeEntities(xiaoShanLineEntities); // 删除萧山地图描边线实体
        this.removeEntities(wallEntities); // 删除墙体实体
        this.removeEntities(weixingMapEntities); // 卫星地图实体
        this.draw_XiaoShan_map(); // 绘制萧山区卫星图
        this.draw_XiaoShan_Polygon(); // 绘制萧山区轮廓
        this.draw_XiaoshanStreet_Polygon(); // 绘制萧山镇街轮廓
      }
      //   if (this.currentRouteName == '/wbd') {
      //     this.$router.back();
      //   }
      switch (val) {
        case '/yxzs':
          this.setModelConExist(true);
          this.getCluster_list(); // 初始化绘制聚合点位---永兴指数页面
          break;
        case '/xbg':
          this.setModelConExist(true);
          eventBus.$emit('drawPoiByRanks', ['14da5819da904c4ab1d9d94a961ca27a', 'cef2a80fbea6df89578ad5599b67b71f', '2bf3be523de944ec3ee1ad832a7a2587']);
          break;
        case '/zbz':
          this.setModelConExist(false);
          let poiArr = ZBZStaticData;
          this.drawDeviceOrPeoplePoi(poiArr, 'device');
          break;
        case '/zbz2':
          this.setModelConExist(false);
          let poi3Arr = ZBZStaticData;
          this.drawDeviceOrPeoplePoi(poi3Arr, 'device');
          break;
        case '/hb365':
          this.setModelConExist(false);
          let poiArr2 = Static365Data;
          this.drawDeviceOrPeoplePoi(poiArr2, 'people');
      }
      this.wholeView();
    },
    // thingjs挂载元素存在与否
    setModelConExist(value) {
      eventBus.$emit('showExistModel', value);
    },
    close_hbyDetail() {
      this.isShow_hbyDetail = false;
    },
    onfire() {
      CesiumPop.removeDivPopById(viewer, 'peopleBox');
      CesiumPop.removeDivPopById(viewer, 'warningBox'); // 删除预警信息框
      CesiumPop.removeDivPopById(viewer, 'marker'); // 删除预警信息框
      this.addWarningMarkerToMap({},this.warningData.poi); // 测试预警点位标签
      this.showYJ_Box(this.warningData,this.warningData.poi); // 测试预警弹框
      eventBus.$emit('modelWarning', true); // 模型中监控标识变成预警状态
    },
    //初始地图参数
    initSys(data) {
      origin = [
        '120.304263',
        '29.358119', // 萧山区
        '70051.38377763497',
        '360.50731329499604',
        '-40.29242547527932',
        '0.0002357937940213709',
      ];
      rotatingDialPosArr = [
        '120.404263',
        '29.768119', // 萧山区
        '130151.38377763497',
        '357.50731329499604',
        '-70.29242547527932',
        '0.0002357937940213709',
      ];
      window.mapServerIp = ''; // 获取三维模型请求的ip，可以写死
      simpleUrl = ''; // 获取三维模型请求的url，可以写死

      // mapbox自定义底图
      let mapboxProvider = new Cesium.MapboxStyleImageryProvider({
        url: 'https://api.mapbox.com/styles/v1/',
        // styleId: 'ckujcxroab8d417l7y53askqb',
        styleId: 'cl2zsosst002h14qqs6fvx7uf', // 空白背景
        // styleId: 'cl25fi5jq00hu15ozxvk9ui91',
        username: 'coding-cheng',
        accessToken: 'pk.eyJ1IjoiY29kaW5nLWNoZW5nIiwiYSI6ImNrdWpjdDl2NTJ3cWIyb3FwY3N4bWpnemoifQ._ib-T9XB8c6scHFkFq2oEw',
        scaleFactor: true,
      });
      mapboxImagery = new Cesium.ImageryLayer(mapboxProvider);

      // this.addMapboxLayer()
      this.wholeView();
    },
    //初始化地图
    initMap(terrainEx) {
      //cesium全球30米分辨率地形资源token
      Cesium.Ion.defaultAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZjFiOWU4Ny1iNzcwLTQxMWYtYjcxNi03MGNlNDllYjE2MzMiLCJpZCI6Njg4MzMsImlhdCI6MTY1MDM1MDUyOX0.iX9VwNnXrVPdBoGyjaTrB30B4B3W5k_JXcldk5XJAcw`;
      //初始化三维场景
      viewer = new Cesium.Viewer('cesiumContainer', {
        // orderIndependentTranslucency: true,
        fullscreenButton: false,
        homeButton: false,
        timeline: true,
        geocoder: false,
        scene3DOnly: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        shouldAnimate: true,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        terrainExaggeration: terrainEx,
      });
      //其他设置
      viewer.scene.globe.enableLighting = false; //太阳光
      //viewer.shadows = true;
      viewer.scene.skyBox.show = true; //星空
      viewer.scene.globe.depthTestAgainstTerrain = true;
      viewer.scene.globe.showGroundAtmosphere = true;
      viewer.scene._hdr = false;
      // 去掉entity的点击事件
      viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //抗锯齿设定
      if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
        //判断是否支持图像渲染像素化处理
        viewer.resolutionScale = window.devicePixelRatio;
      }
      viewer.scene.fxaa = false; // 处理label文字不清晰
      viewer.scene.postProcessStages.fxaa.enabled = false;

      // // 不显示底图
      // viewer.imageryLayers.get(0).show = false

      // // 地球球体透明
      // viewer.scene.globe.showGroundAtmosphere = false
      // viewer.scene.globe.baseColor = Cesium.Color.TRANSPARENT
      // viewer.scene.globe.translucency.enabled = true
      // viewer.scene.globe.undergroundColor = undefined

      // // 不显示黑色背景
      // viewer.scene.skyBox.destroy()
      // viewer.scene.skyBox = undefined
      // viewer.scene.sun.destroy()
      // viewer.scene.sun = undefined
      // viewer.scene.moon.destroy()
      // viewer.scene.moon = undefined
      // viewer.scene.skyAtmosphere.destroy()
      // viewer.scene.skyAtmosphere = undefined
      // viewer.scene.backgroundColor = new Cesium.Color.fromCssColorString(
      //   '#0e1435'
      // )

      var supportsImageRenderingPixelated = viewer.cesiumWidget._supportsImageRenderingPixelated;
      if (supportsImageRenderingPixelated) {
        var vtxf_dpr = window.devicePixelRatio;
        while (vtxf_dpr >= 2.0) {
          vtxf_dpr /= 2.0;
        }
        viewer.resolutionScale = vtxf_dpr;
      }

      window.viewer = viewer;
      //点击三维模型，返回模型信息的方法，有需要时可打开
      // var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      // handler.setInputAction(function(result) {
      //     var feature = viewer.scene.pick(result.position);
      //         var srcurl = feature.content._resource._url;
      //         console.log(srcurl);
      // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 加载全球地形图
      // var terrain = new Cesium.createWorldTerrain({
      //   requestWaterMask: true,
      //   requestVertexNormals: true,
      // });
      // viewer.terrainProvider = terrain;
    },
    //初始化视角
    wholeView() {
      //   console.log('初始化角度', origin)
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(origin[0], origin[1], origin[2]),
        orientation: {
          heading: Cesium.Math.toRadians(origin[3]),
          pitch: Cesium.Math.toRadians(origin[4]),
          roll: 0,
        },
      });
    },
    //改变地图尺寸
    resizeMap() {
      let winHeight = Number(document.documentElement.clientWidth);
      document.getElementById('cesiumContainer').style.height = winHeight + 'px';
      // this.initMap(1.0)
    },
    //初始化
    init3dtilesmaps(data) {
      //模型平移的转移矩阵
      for (let i = 0; i < data.length; i++) {
        if (data[i].tilesType === 'cc') {
          this.add3dtilesmap(data[i]);
        }
      }
    },
    //添加实景三维模型
    add3dtilesmap(data) {
      let tilesetOption = {
        url: mapServerIp + data.tilesUrl,
        imageBasedLightingFactor: new Cesium.Cartesian2(1.5, 1),
        maximumScreenSpaceError: 2,
        maximumNumberOfLoadedTiles: 1000,
        maximumMemoryUsage: 256,
        dynamicScreenSpaceError: true,
        dynamicScreenSpaceErrorDensity: 0.00278,
        dynamicScreenSpaceErrorFactor: 4.0,
        dynamicScreenSpaceErrorHeightFalloff: 0.25,
        //skipLevelOfDetail: true,
        baseScreenSpaceError: 1024,
        //skipScreenSpaceErrorFactor: 16,
        //skipLevels: 2,
        immediatelyLoadDesiredLevelOfDetail: true,
        loadSiblings: false,
        cullWithChildrenBounds: true,
        cullRequestsWhileMoving: true,
        cullRequestsWhileMovingMultiplier: 0.001, // 值越小能够更快的剔除
        preloadWhenHidden: true,
        preferLeaves: true,
        progressiveResolutionHeightFraction: 0.2, // 数值偏于0能够让初始加载变得模糊
      };
      let tileset = new Cesium.Cesium3DTileset(tilesetOption);
      //数据加载成功后，根据偏移量计算实景三维模型新的位置矩阵
      tileset.readyPromise
        .then(function () {
          let cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
          let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
          let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude + Number(data.tilesX), cartographic.latitude + Number(data.tilesY), cartographic.height + Number(data.tilesZ));
          tilesZ = Number(data.tilesZ);
          let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
          tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
          tilesetArr.push(tileset);
          viewer.scene.primitives.add(tileset); //加载3dtiles数据
        })
        .otherwise(function (error) {
          throw error;
        });
    },
    //移除实景三维模型
    remove3dtilesmap_c() {
      for (let i = 0; i < tilesetArr.length; i++) {
        viewer.scene.primitives.remove(tilesetArr[i], true);
        tilesetArr.splice(i, 1);
      }
      // tilesetArr.length=0
    },
    //调整实景三维数据透明度
    resetTilesetAlpha(tilesetAlpha) {
      for (let i = 0; i < tilesetArr.length; i++) {
        if (tilesetAlpha === 1.0) {
          tilesetArr[i].style = new Cesium.Cesium3DTileStyle({
            color: 'color("white",' + tilesetAlpha + ')',
          });
        } else {
          tilesetArr[i].style = new Cesium.Cesium3DTileStyle({
            color: 'color("skyblue",' + tilesetAlpha + ')',
          });
        }
      }
    },
    //改变实景三维模型切割面
    cut3dtilesmap(points) {
      //统一到逆时针
      let ring = [];
      points.map((item) => {
        ring.push([item.x, item.y]);
      });
      ring.push([points[0].x, points[0].y]);
      if (!turf.booleanClockwise(ring)) {
        points.reverse();
      }

      let clippingPlanesArr = []; // 存储ClippingPlane集合
      let inverseTransform = getInverseTransform(tilesetArr[0]); //需要根据点击的模型在Arr中找到该模型
      for (let i = 0; i < points.length; i++) {
        let plane;
        if (i < points.length - 1) {
          plane = createPlane(points[i], points[i + 1], inverseTransform);
        } else {
          plane = createPlane(points[i], points[0], inverseTransform);
        }
        clippingPlanesArr.push(plane);
      }

      let clippingPlanes = new Cesium.ClippingPlaneCollection({
        planes: clippingPlanesArr,
        edgeWidth: 1,
        edgeColor: Cesium.Color.WHITE,
        // unionClippingRegions: true
      });

      tilesetArr.map((item) => {
        item.clippingPlanes = clippingPlanes;
      });

      function getInverseTransform(tileSet) {
        let transform;
        let tmp = tileSet.root.transform;
        if ((tmp && tmp.equals(Cesium.Matrix4.IDENTITY)) || !tmp) {
          // 如果root.transform不存在，则3DTiles的原点变成了boundingSphere.center
          transform = Cesium.Transforms.eastNorthUpToFixedFrame(tileSet.boundingSphere.center);
        } else {
          transform = Cesium.Matrix4.multiply(tileSet.modelMatrix, tileSet.root.transform, new Cesium.Matrix4());
        }
        return Cesium.Matrix4.inverseTransformation(transform, new Cesium.Matrix4());
      }

      function getOriginCoordinateSystemPoint(point, inverseTransform) {
        return Cesium.Matrix4.multiplyByPoint(inverseTransform, point, new Cesium.Cartesian3(0, 0, 0));
      }

      function createPlane(p1, p2, inverseTransform) {
        // 将仅包含经纬度信息的p1,p2，转换为相应坐标系的cartesian3对象
        let p1C3 = getOriginCoordinateSystemPoint(p1, inverseTransform);
        let p2C3 = getOriginCoordinateSystemPoint(p2, inverseTransform);

        // 定义一个垂直向上的向量up
        let up = new Cesium.Cartesian3(0, 0, -1);
        //  right 实际上就是由p1指向p2的向量
        let right = Cesium.Cartesian3.subtract(p2C3, p1C3, new Cesium.Cartesian3());

        // 计算normal， right叉乘up，得到平面法向量，这个法向量指向right的右侧
        let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
        normal = Cesium.Cartesian3.normalize(normal, normal);

        //由于已经获得了法向量和过平面的一点，因此可以直接构造Plane,并进一步构造ClippingPlane
        let planeTmp = Cesium.Plane.fromPointNormal(p1C3, normal);
        return Cesium.ClippingPlane.fromPlane(planeTmp);
      }
    },
    clearClippingPlanes() {
      let points = [new Cesium.Cartesian3(0, 0, 0), new Cesium.Cartesian3(0, 0, 0), new Cesium.Cartesian3(0, 0, 0)];
      this.cut3dtilesmap(points);
    },
    //添加简模
    addSimple3D() {
      let tilesetOption = {
        url: mapServerIp + simpleUrl,
        imageBasedLightingFactor: new Cesium.Cartesian2(2.5, 1),
        maximumScreenSpaceError: 1,
        maximumNumberOfLoadedTiles: 1000,
        maximumMemoryUsage: 256,
        dynamicScreenSpaceError: true,
        dynamicScreenSpaceErrorDensity: 0.00278,
        dynamicScreenSpaceErrorFactor: 4.0,
        dynamicScreenSpaceErrorHeightFalloff: 0.25,
        skipLevelOfDetail: true,
        baseScreenSpaceError: 1024,
        skipScreenSpaceErrorFactor: 16,
        skipLevels: 1,
        immediatelyLoadDesiredLevelOfDetail: true,
        loadSiblings: false,
        cullWithChildrenBounds: true,
        cullRequestsWhileMoving: true,
        cullRequestsWhileMovingMultiplier: 0.001, // 值越小能够更快的剔除
        preloadWhenHidden: true,
        preferLeaves: true,
        progressiveResolutionHeightFraction: 0.1, // 数值偏于0能够让初始加载变得模糊
      };
      simple3D = new Cesium.Cesium3DTileset(tilesetOption);
      viewer.scene.primitives.add(simple3D); //加载3dtiles数据
      this.addDarkMapLayer();
    },
    //移除简模
    removeSimple3D() {
      if (simple3D) {
        viewer.scene.primitives.remove(simple3D);
        //this.addarcgisImageLayer();
      }
    },
    //切换地形加载
    addWorldTerrain() {
      viewer.scene.terrainProvider = Cesium.createWorldTerrain({
        requestWaterMask: true,
      });
    },
    //加载arcgis地形，但是加载速度过慢，不宜使用
    addArcgisTerrain() {
      viewer.scene.terrainProvider = arcgisTerrainProvider;
    },
    //椭球
    addelTerrain() {
      viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
    },
    //本地地形
    addLocalTerrain() {
      viewer.scene.terrainProvider = localTerrainProvider;
    },
    //本地影像
    addLocalImageLayer() {
      for (let i = 0; i < preImageryArr.length; i++) {
        viewer.imageryLayers.remove(preImageryArr[i], false);
      }
      preImageryArr = [];
      viewer.imageryLayers.add(localimagery);
      viewer.imageryLayers.add(localimganno);
      preImageryArr.push(localimagery, localimganno);
    },
    //加载谷歌遥感影像瓦片数据
    addgoogleImageLayer() {
      for (let i = 0; i < preImageryArr.length; i++) {
        viewer.imageryLayers.remove(preImageryArr[i], false);
      }
      preImageryArr = [];
      viewer.imageryLayers.add(googleimagery);
      viewer.imageryLayers.add(tdtannoimagery);
      preImageryArr.push(googleimagery, tdtannoimagery);
    },
    //加载arcgis影像底图
    addarcgisImageLayer() {
      for (let i = 0; i < preImageryArr.length; i++) {
        viewer.imageryLayers.remove(preImageryArr[i], false);
      }
      preImageryArr = [];
      viewer.imageryLayers.add(arcgisimagery);
      viewer.imageryLayers.add(tdtannoimagery);
      preImageryArr.push(arcgisimagery, tdtannoimagery);
    },
    //加载天地图遥感影像瓦片数据
    addtdtImageLayer() {
      for (let i = 0; i < preImageryArr.length; i++) {
        viewer.imageryLayers.remove(preImageryArr[i], false);
      }
      preImageryArr = [];
      viewer.imageryLayers.add(tdtimagery);
      viewer.imageryLayers.add(tdtannoimagery);
      preImageryArr.push(tdtimagery, tdtannoimagery);
    },
    //加载街道矢量瓦片数据
    addtdtVectorLayer() {
      for (let i = 0; i < preImageryArr.length; i++) {
        viewer.imageryLayers.remove(preImageryArr[i], false);
      }
      preImageryArr = [];
      viewer.imageryLayers.add(tdtvectorimagery);
      viewer.imageryLayers.add(tdtvectoranoimagery);
      preImageryArr.push(tdtvectorimagery, tdtvectoranoimagery);
    },
    // 加载mapbox自定义底图
    addMapboxLayer() {
      for (let i = 0; i < preImageryArr.length; i++) {
        viewer.imageryLayers.remove(preImageryArr[i], false);
      }
      preImageryArr = [];
      viewer.imageryLayers.add(mapboxImagery);
      preImageryArr.push(mapboxImagery);
    },
    //加载本地的暗色地图
    addDarkMapLayer() {
      for (let i = 0; i < preImageryArr.length; i++) {
        viewer.imageryLayers.remove(preImageryArr[i], false);
      }
      preImageryArr = [];
      viewer.imageryLayers.add(darkimagery);
      preImageryArr.push(darkimagery);
    },
    showImportantAddress(data) {
      let geojson = {
        type: 'FeatureCollection',
        features: [],
      };
      for (let i = 0; i < data.length; i++) {
        let position = data[i].poi.split(',');
        let addicon = '';
        switch (data[i].addType) {
          case '行政':
            addicon = 'static/images/redstar.png';
            break;
          case '地点':
            addicon = 'static/images/building.png';
            break;
          default:
            break;
        }
        let feature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [Number(position[0]), Number(position[1]), Number(position[2])],
          },
          name: '地名地址',
          properties: {
            title: data[i].addName,
            addType: data[i].addType,
            addicon: addicon,
          },
        };
        geojson.features.push(feature);
      }
      let promise = Cesium.GeoJsonDataSource.load(geojson, { markerSize: 30 });
      let dataSourcePromise = viewer.dataSources.add(promise);
      dataSourcePromise.then(function (dataSource) {
        address_overlays3D = dataSource;
        dataSource.clustering.enabled = true;
        dataSource.clustering.pixelRange = 25;
        dataSource.clustering.minimumClusterSize = 3;
        let dataSourceEntities = dataSource.entities.values;
        for (let i = 0; i < dataSourceEntities.length; i++) {
          let labelColor = dataSourceEntities[i].properties.addType._value === '行政' ? Cesium.Color.ORANGERED : Cesium.Color.MAROON;
          dataSourceEntities[i].label = new Cesium.LabelGraphics({
            text: dataSourceEntities[i].name,
            font: 'Bold 64px Helvetica',
            scale: 0.25,
            fillColor: labelColor,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 4,
            pixelOffset: new Cesium.Cartesian2(0, -20),
          });
          dataSourceEntities[i].billboard = new Cesium.BillboardGraphics({
            image: dataSourceEntities[i].properties.addicon._value,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            width: 24,
            height: 24,
            pixelOffset: new Cesium.Cartesian2(-48.0, -6.0),
          });
        }

        let removeListener;

        function customStyle() {
          if (Cesium.defined(removeListener)) {
            removeListener();
            removeListener = undefined;
          } else {
            removeListener = dataSource.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
              let curClusteredEntity;
              let tempClusteredEntity = clusteredEntities[0];
              for (let i = 0; i < clusteredEntities.length; i++) {
                let addType = clusteredEntities[i].properties.addType._value;
                if (addType === '行政') {
                  curClusteredEntity = clusteredEntities[i];
                  cluster.label.fillColor = Cesium.Color.ORANGERED;
                } else if (addType === '地名') {
                  tempClusteredEntity = clusteredEntities[i];
                  cluster.label.fillColor = Cesium.Color.MAROON;
                } else {
                  tempClusteredEntity = clusteredEntities[i];
                  cluster.label.fillColor = Cesium.Color.MAROON;
                }
              }
              if (curClusteredEntity === undefined) {
                curClusteredEntity = tempClusteredEntity;
              }
              cluster.label.text = curClusteredEntity.name;
              cluster.label.font = 'Bold 34px Helvetica';
              cluster.label.scale = 0.5;
              cluster.label.style = Cesium.LabelStyle.FILL_AND_OUTLINE;
              cluster.label.outlineColor = Cesium.Color.WHITE;
              cluster.label.outlineWidth = 4;
              cluster.label.pixelOffset = new Cesium.Cartesian2(0, -20);
              cluster.billboard = new Cesium.BillboardGraphics({
                image: curClusteredEntity.properties.addicon._value,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                width: 24,
                height: 24,
                pixelOffset: new Cesium.Cartesian2(-20.0, 0.0),
                scaleByDistance: new Cesium.NearFarScalar(1000, 1, 20000, 0.2),
                pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1000, 1, 20000, 0.2),
              });
            });
          }
          // force a re-cluster with the new styling
          let pixelRange = dataSource.clustering.pixelRange;
          dataSource.clustering.pixelRange = 0;
          dataSource.clustering.pixelRange = pixelRange;
        }

        // start with custom style
        customStyle();
      });
    },
    //贴地显示道路图标
    showRoadName(tmRoadLable) {
      //计算当前城市的经纬度与米的换算比
      if (tmRoadLable.length !== 0) {
        let yPerimeter = 40075016.68557849;
        let curlat = (Number(tmRoadLable[0].poi.split(',')[1].split('.')[0]) * Math.PI) / 180;
        let xPerimeter = yPerimeter * Math.cos(curlat);
        let yperi = 360 / yPerimeter;
        let xperi = 360 / xPerimeter;
        //显示重要道路标记
        for (let i = 0; i < tmRoadLable.length; i++) {
          let textCanvas = document.createElement('canvas');
          textCanvas.width = 40;
          textCanvas.height = 40;
          let context = textCanvas.getContext('2d');
          context.font = '36px Microsoft YaHei';
          context.fontWeight = '900';
          context.fillStyle = '#fff';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.strokeStyle = '#a25100';
          context.lineWidth = '1';
          context.fillText(tmRoadLable[i].streetName, 20, 20);
          context.strokeText(tmRoadLable[i].streetName, 20, 20);
          let poiArr = tmRoadLable[i].poi.split(',');
          let roadLable = viewer.entities.add({
            show: true,
            rectangle: {
              coordinates: Cesium.Rectangle.fromDegrees(Number(poiArr[0]) - 5 * xperi, Number(poiArr[1]) - 5 * yperi, Number(poiArr[0]) + 5 * xperi, Number(poiArr[1]) + 5 * yperi),
              material: textCanvas,
              rotation: Cesium.Math.toRadians(tmRoadLable[i].rotationAngle),
              stRotation: Cesium.Math.toRadians(tmRoadLable[i].rotationAngle),
              classificationType: Cesium.ClassificationType.BOTH,
            },
          });
          importantLableArr.push(roadLable);
        }
      }
    },
    //定位到坐标
    flyToLocation(position) {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(Number(position[0]), Number(position[1]), Number(position[2])),
      });
    },
    // 自动获取当前视口的中心经纬度
    getCenterPoi() {
      var result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas.clientHeight / 2));
      var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
      var lon = (curPosition.longitude * 180) / Math.PI;
      var lat = (curPosition.latitude * 180) / Math.PI;
      //   console.log('经纬度', lon, lat)
      return [lon, lat];
    },
    //跳转到cart视角
    moveToWin(x, y, z, h, p) {
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromElements(Number(x), Number(y), Number(z)),
        orientation: {
          heading: Number(h),
          pitch: Number(p),
          roll: 0,
        },
      });
    },
    //跳转到经纬度视角
    moveToDegrees(x, y, z, h, p) {
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(Number(x), Number(y), Number(z)),
        orientation: {
          heading: Number(h),
          pitch: Number(p),
          roll: 0,
        },
      });
    },
    //场景中所有图标点击选取获得数据的操作监听句柄
    addPOMListener() {
      pomhandler = pomhandler && pomhandler.destroy();
      pomhandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      let id;
      pomhandler.setInputAction(function (movement) {
        let pickedObject = viewer.scene.pick(movement.position);
        if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
          //判断拾取的是pin还是ClassificationPrimitive
          //若是pin ,pickedObject.id为一个对象，需要读取pickedObject.id._id获取id
          //若是ClassificationPrimitive，pickedObject.id则是字符串，直接获取id
          if (typeof pickedObject.id == 'string') {
            id = pickedObject.id;
          } else {
            id = pickedObject.id._id;
          }
          let type = id.substring(0, 2);
          let pomid = id.substring(2);
          //   console.log('点击房屋：', type, pomid)
          switch (type) {
            // case 'kp'://司法矫正等重点监控人口
            case 'ke':
              protectWall.methods.getKeypeopleById(pomid);
              break;
            case 'pp':
            case 'pe': //实有人口详情
              realPeople.methods.getRealPeopleById(pomid);
              break;
            case 'ra': //实有人口社区
              realPeople.methods.stepInNextLevel(pomid);
              break;
            case 'rd': //实有人口小区
              realPeople.methods.stepInCommunity(pomid);
              break;
            case 'ad':
            case 'fl': //实有人口分层分户
              realPeople.methods.doQueryPeopleByAddId(pomid);
              break;
            case 'hp': //实有房屋
            case 'he':
              realHouse.methods.getRealHouseById(pomid);
              break;
            case 'ha': //实有房屋社区
              realHouse.methods.stepInNextLevel(pomid);
              break;
            case 'hd': //实有房屋小区
              realHouse.methods.stepInCommunity(pomid);
              break;
            case 'hl': //房屋分层分户
              realHouse.methods.doQueryHouseByAddId(pomid);
              break;
            case 'cp':
            case 'ce': //实有单位
              realCompany.methods.getCompanyById(pomid);
              break;
            case 'cb': //实有单位社区
              realCompany.methods.stepInNextLevel(pomid);
              break;
            case 'cl': //单位分层分户
              realCompany.methods.doQueryCompanyByAddId(pomid);
              break;
            case 'ap':
            case 'ae':
            case 'al': //地名地址分层分户
              realAddress.methods.getRealAddressById(pomid);
              break;
            case 'as': //地名地址小区
              realAddress.methods.stepInCommunity(pomid);
              break;
            case 'aa': //地名地址社区
              realAddress.methods.stepInNextLevel(pomid);
              break;
            case 'nt':
              netManage.methods.getNetById(pomid);
              //netManage.methods.stepInNextLevel(pomid);
              break;
            case 'nd':
              netManage.methods.stepInCommunity(pomid);
              break;
            case 'ne':
            case 'nl':
              netManage.methods.doQueryAllByAddId(pomid.substring(1));
              break;
            case 'ss': //治安卡口
              netSecurity.methods.doGetSecurityById(pomid);
              break;
            case 'ca': //摄像头
            case 'rc': //接处警应急摄像头
              commandVideo.methods.getVideoById(pomid);
              break;
            case 'po': //人员
              let pos = pickedObject.id._position._value;
              commandMan.methods.getPoliceById(pomid, pos);
              break;
            case 'pc': //车辆
              let position = pickedObject.id._position._value;
              commandCar.methods.getPoliceCarById(pomid, position);
              break;
            case 'cs': //案件
              caseMap.methods.getCaseById(pomid);
              break;
            case 'bu': //建筑物
              netBuilding.methods.getBuildingById(pomid);
              break;
            case 'pl': //管线
              let plPosition = pickedObject.id.polylineVolume._positions._value;
              demoPipeline.methods.doGetPipelineById(pomid, plPosition);
              break;
            case 'wp': //管井
              let wpPosition = pickedObject.id._position._value;
              demoPipeline.methods.doGetPipelineWellById(pomid, wpPosition);
              break;
            case 'pi': //名址搜索
              toolSearchPOI.methods.getPOIDetailById(pomid);
              break;
            case 'wa': //电子围栏报警
              protectWall.methods.getAlarmById(pomid);
              break;
            case 'co': //自定义图层
              netCustomSearch.methods.dogetAttrDataById(pomid);
              break;
            case 'vi':
              protectAlert.methods.getVideoById(pomid);
              break;
            default:
              break;
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      let currentObjectId;
      let currentPrimitive;
      let currentColor;
      let currentShow;
      let attributes;
      pomhandler.setInputAction(function (movement) {
        let pickedObject = viewer.scene.pick(movement.endPosition);
        if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
          if (pickedObject.id === currentObjectId) {
            return;
          }
          if (Cesium.defined(currentObjectId)) {
            attributes = currentPrimitive.getGeometryInstanceAttributes(currentObjectId);
            if (attributes !== undefined) {
              if (currentColor !== undefined) {
                attributes.color = currentColor;
              } else {
                attributes.color = Cesium.Color.YELLOW;
              }
              attributes.show = currentShow;
            }
            currentObjectId = undefined;
            currentPrimitive = undefined;
            currentColor = undefined;
            currentShow = undefined;
          }
        }
        if (
          Cesium.defined(pickedObject) &&
          Cesium.defined(pickedObject.primitive) &&
          Cesium.defined(pickedObject.id) &&
          Cesium.defined(pickedObject.primitive.getGeometryInstanceAttributes) &&
          pickedObject.id._id !== 'cameraAreaId' &&
          pickedObject.id._id !== 'ppcAreaId' &&
          pickedObject.id._id !== 'comEntityFlat' &&
          pickedObject.id._id !== 'floodEnt' &&
          pickedObject.id._id !== 'comEntity'
        ) {
          currentObjectId = pickedObject.id;
          currentPrimitive = pickedObject.primitive;
          attributes = currentPrimitive.getGeometryInstanceAttributes(currentObjectId);
          currentColor = attributes.color;
          currentShow = attributes.show;
          if (!viewer.scene.invertClassification) {
            attributes.color = [245, 245, 0, 128];
          }
          attributes.show = [1];
        } else if (Cesium.defined(currentObjectId)) {
          attributes = currentPrimitive.getGeometryInstanceAttributes(currentObjectId);
          if (attributes !== undefined) {
            if (currentColor !== undefined) {
              attributes.color = currentColor;
            } else {
              attributes.color = Cesium.Color.YELLOW;
            }
            attributes.show = currentShow;
          }
          currentObjectId = undefined;
          currentPrimitive = undefined;
          currentColor = undefined;
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
    //初始化指南针罗盘
    initRotatingDial() {
      rotatingDialPos = '120.314263, 30.068119, 107.64504375244866, 33000, 1800';
      rotatingDialPosArr = rotatingDialPos.split(',');
      let position = Cesium.Cartesian3.fromDegrees(rotatingDialPosArr[0], rotatingDialPosArr[1], rotatingDialPosArr[2]);
      rotatingDial = new CesiumRotatingDial(viewer, position, rotatingDialPosArr[3], rotatingDialPosArr[4]);
    },
    //移除罗盘
    removeRotatingDial() {
      rotatingDial.remove();
    },
    //显示实景三维周边与地面衔接的墙
    initTilesetWall(repeatY) {
      viewer.entities.removeById('tilesetWall');
      viewer.entities.add({
        id: 'tilesetWall',
        wall: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights(tilesetWallArr),
          material: new Cesium.ImageMaterialProperty({
            image: 'static/images/wall.png',
            repeat: new Cesium.Cartesian2(0, repeatY),
          }),
        },
      });
    },
    //关闭实景三维衔接墙
    removeTilesetWall() {
      viewer.entities.removeById('tilesetWall');
    },
    // ====================================================================================================================================================
    // 隐藏实体集
    hiddenEntities(entities) {
      entities.map((item) => {
        item.show = false;
      });
    },
    // 显示实体集
    showEntities(entities) {
      entities.map((item) => {
        item.show = true;
      });
    },
    // 绘制单独点位
    drawPoint(poi, config, detail) {
      let a = viewer.entities.add(
        new Cesium.Entity({
          name: '水利设施',
          position: Cesium.Cartesian3.fromDegrees(
            // ...bd09towgs84(119.438105, 32.400775)
            ...poi,
          ),
          show: true,
          type: 'POI',
          attributeList: detail, // 可为实体增加属性信息
          // 添加图片
          billboard: {
            image: config.img ? config.img : 'static/images/cityComponents/star.png',
            scale: config.scale ? config.scale : 0.2,
            disableDepthTestDistance: 600000000,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 600000000),
          },
        }),
      );
      return a;
    },
    // 绘制单独线段
    drawLine(poi, config, detail) {
      this.removeEntities(rightTableEntity);
      rightTableEntity = [];
      let a = viewer.entities.add({
        attributeList: detail,
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights(poi),
          width: config.width ? config.width : 5,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: config.color ? new Cesium.Color.fromCssColorString(config.color) : new Cesium.Color.fromCssColorString('blue'),
            outlineWidth: 0.1,
            outlineColor: new Cesium.Color.fromCssColorString('YELLOW'),
          }),
        },
      });
      rightTableEntity.push(a);
    },
    // 绘制单独多边形面
    drawPolygon_Single(poi, config, detail) {
      this.removeEntities(rightTableEntity);
      rightTableEntity = [];
      let a = viewer.entities.add({
        name: '河道',
        attributeList: detail,
        polygon: {
          height: config.height ? config.height : 1, //离地面的高度
          hierarchy: new Cesium.Cartesian3.fromDegreesArrayHeights(poi), //面的轮廓坐标
          material: config.fillColor ? new Cesium.Color.fromCssColorString(config.fillColor).withAlpha(0.7) : new Cesium.Color.fromCssColorString('#FFD700').withAlpha(0.5), //面的颜色材质
          outline: true,
          outlineColor: config.lineColor ? new Cesium.Color.fromCssColorString(config.lineColor) : new Cesium.Color.fromCssColorString('#fff'),
          outlineWidth: 10,
          perPositionHeight: false,
          show: true,
          // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000) //视角距离大于90000显示
        },
      });
      rightTableEntity.push(a);
    },
    // 绘制轮廓_Line
    drawPolyLine(positions, config, detailInfo, hasHeight = true) {
      if (positions.length < 2) return;
      var config = config ? config : {};
      var detailInfo = detailInfo ? detailInfo : {};
      //   console.log('线坐标555', positions)
      var lineGeometry = viewer.entities.add({
        name: '线几何对象',
        attributeList: detailInfo,
        polyline: {
          positions: hasHeight ? Cesium.Cartesian3.fromDegreesArrayHeights(positions) : Cesium.Cartesian3.fromDegreesArray(positions),
          material: config.fillColor ? new Cesium.Color.fromCssColorString(config.fillColor) : new Cesium.Color.fromCssColorString('#fff'), //线的颜色材质
          show: true,
          width: config.lineWidth ? config.lineWidth : 2,
          clampToGround: true,
        },
      });
      return lineGeometry;
    },
    // 绘制静态区域_area
    drawPolygon(positions, config, detailInfo, hasHeight = true) {
      // console.log('坐标', positions)
      if (positions.length < 2) return;
      var config = config ? config : {};
      var polygonGeometry = viewer.entities.add({
        name: '面几何对象',
        attributeList: detailInfo,
        polygon: {
          height: config.height ? config.height : 10, //离地面的高度
          // height: 0,
          hierarchy: hasHeight ? new Cesium.Cartesian3.fromDegreesArrayHeights(positions) : new Cesium.Cartesian3.fromDegreesArray(positions), //面的轮廓坐标
          material: config.fillColor
            ? new Cesium.Color.fromCssColorString(config.fillColor).withAlpha(config.alpha > 0 ? config.alpha : 0)
            : new Cesium.Color.fromCssColorString('#FFD700').withAlpha(config.alpha > 0 ? config.alpha : 0), //面的颜色材质
          outline: true,
          outlineColor: config.lineColor ? new Cesium.Color.fromCssColorString(config.lineColor) : new Cesium.Color.fromCssColorString('#fff'),
          outlineWidth: 10,
          perPositionHeight: false,
          show: true,
          // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000) //视角距离大于90000显示
          // clampToGround: true,
        },
      });
      return polygonGeometry;
    },
    // 绘制空心面
    drawPolygonHoles(positions, config, detailInfo) {
      //   console.log('jhjh', positions)
      if (positions.length < 2) return;
      var config = config ? config : {};
      var polygonGeometry = viewer.entities.add({
        name: '面几何对象',
        attributeList: detailInfo,
        polygon: {
          height: config.height ? config.height : 10, //离地面的高度
          hierarchy: {
            positions: new Cesium.Cartesian3.fromDegreesArray(positions),
            holes: config.holes.map((item) => {
              return {
                positions: Cesium.Cartesian3.fromDegreesArray(item.flat(2)),
              };
            }),
          }, //面的轮廓坐标
          material: config.fillColor ? new Cesium.Color.fromCssColorString(config.fillColor).withAlpha(0.7) : new Cesium.Color.fromCssColorString('#FFD700').withAlpha(0.5), //面的颜色材质
          outline: true,
          outlineColor: config.lineColor ? new Cesium.Color.fromCssColorString(config.lineColor) : new Cesium.Color.fromCssColorString('#fff'),
          outlineWidth: 2,
          perPositionHeight: false,
          show: true,
        },
      });
      return polygonGeometry;
    },
    // 文字标注
    drawText(position, text, config, height, isShow = true) {
      var config = config ? config : {};
      var labelGeometry = viewer.entities.add({
        name: text,
        position: Cesium.Cartesian3.fromDegrees(position[0], position[1], height),
        label: {
          show: isShow,
          text: text,
          scale: config.scale ? config.scale : 0.25,
          font: '100px Helvetica',
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          fillColor: config.fillColor ? new Cesium.Color.fromCssColorString(config.fillColor) : new Cesium.Color.fromCssColorString('#000'),
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 3,
          scaleByDistance: new Cesium.NearFarScalar(10000, 1, 150000, 0.2),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //文字在坐标点的中间
          // 中心位置
          pixelOffset: config.pixelOffset ? new Cesium.Cartesian2(...config.pixelOffset) : new Cesium.Cartesian2(0, 0),
        },
      });
      return labelGeometry;
    },
    // 处理点位数据
    poiStrToArr(str) {
      // console.log('str', str)
      return str
        .replace('POLYGON((' || 'POLYGON ((', '')
        .replace('POLYGON ((', '')
        .replace('))', '')
        .replace(/\s/g, ',')
        .split(',');
    },
    //绘制分层分户图形
    showComNet(data) {
      //   console.log('没有长度')
      for (let i = 0; i < data.length; i++) {
        // console.log('没有长度2')
        if (data[i].poi !== null && data[i].poi !== '') {
          let position = data[i].poi.split(',');
          polygonEntities.push(
            viewer.entities.add({
              id: 'ne' + data[i].addId,
              position: Cesium.Cartesian3.fromDegrees(Number(position[0]), Number(position[1]), Number(position[2])),
              ellipsoid: {
                radii: new Cesium.Cartesian3(0.5, 0.5, 0.5),
                material: Cesium.Color.YELLOW.withAlpha(0.7),
              },
            }),
          );
        }
        if (data[i].floorPoi !== null && data[i].floorPoi !== '') {
          //   console.log('楼层数据22', data)
          let options = {
            viewer: viewer,
            floorType: 'nl_',
            floorAddId: data[i].addId,
            floorType_2: data[i].addType,
            floorPoi: data[i].floorPoi,
            floorHeading: data[i].floorHeading,
            floorHeight: data[i].floorHeight,
            miniheading: data[i].miniheading,
            floorName: data[i].addName,
          };
          this.addFloor(options);
        }
      }
    },
    //清除分层分户图形
    clearComNet() {
      for (let i = 0; i < buildingHighlight.length; i++) {
        viewer.scene.primitives.remove(buildingHighlight[i]); //去除分层分户
      }
      buildingHighlight = [];
    },
    addFloor(options) {
      let poiStrArr = options.floorPoi.split(',');
      let boxresult = CesiumFloor.fixtoboxvertex(poiStrArr);
      let headingVal = options.floorHeading;
      let heading, width, depth;
      switch (headingVal) {
        case 'north':
          heading = boxresult.heading[0];
          width = boxresult.distance[1];
          depth = boxresult.distance[0];
          break;
        case 'east':
          heading = boxresult.heading[1];
          width = boxresult.distance[2];
          depth = boxresult.distance[1];
          break;
        case 'south':
          heading = boxresult.heading[2];
          width = boxresult.distance[3];
          depth = boxresult.distance[2];
          break;
        case 'west':
          heading = boxresult.heading[3];
          width = boxresult.distance[0];
          depth = boxresult.distance[3];
          break;
        default:
          break;
      }
      let heightArr = options.floorHeight.split(',');
      for (let i = 0; i < heightArr.length - 2; i++) {
        let floorheight = Number(heightArr[i + 1]) - Number(heightArr[i]);
        let center = new Cesium.Cartesian3.fromDegrees(boxresult.centerLon, boxresult.centerLat, Number(heightArr[i]));
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
        let headingresult = Cesium.Math.toRadians(heading + Number(options.miniheading));
        let hprRotation = Cesium.Matrix3.fromHeadingPitchRoll(new Cesium.HeadingPitchRoll(headingresult, 0.0, 0.0));
        let hpr = Cesium.Matrix4.fromRotationTranslation(hprRotation, new Cesium.Cartesian3(0.0, 0.0, floorheight / 2));
        Cesium.Matrix4.multiply(modelMatrix, hpr, modelMatrix);
        let color;
        if (options.floorName && options.floorName !== '') {
          //   console.log('楼层颜色1', options)
          if (options.floorName.indexOf('-') >= 0) {
            // console.log('分之1')
            let floorNum = options.floorName.split('-')[1][0];
            color = Number(floorNum) % 2 === 0 ? Cesium.Color.ORANGE.withAlpha(0.4) : Cesium.Color.GREEN.withAlpha(0.4);
          } else {
            // console.log('分之2')
            color = Cesium.Color.GREEN.withAlpha(0.4);
          }
          //   console.log('楼层颜色2', color)
        } else {
          color = i % 2 === 0 ? Cesium.Color.ORANGERED.withAlpha(0.3) : Cesium.Color.CHARTREUSE.withAlpha(0.3);
        }
        if (options.floorType_2 === '单位') {
          color = Cesium.Color.BLUE.withAlpha(0.4);
        }
        buildingHighlight.push(
          viewer.scene.primitives.add(
            new Cesium.ClassificationPrimitive({
              geometryInstances: new Cesium.GeometryInstance({
                geometry: Cesium.BoxGeometry.fromDimensions({
                  vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
                  dimensions: new Cesium.Cartesian3(width, depth, floorheight),
                }),
                modelMatrix: modelMatrix,
                attributes: {
                  color: Cesium.ColorGeometryInstanceAttribute.fromColor(color),
                  show: new Cesium.ShowGeometryInstanceAttribute(true),
                },
                id: options.floorType + options.floorAddId,
              }),
              classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
            }),
          ),
        );
      }
    },
    // 删除实体
    removeEntities(entitiesCollection) {
      if (entitiesCollection.length < 0) return;
      for (let i = 0; i < entitiesCollection.length; i++) {
        viewer.entities.remove(entitiesCollection[i]);
      }
      entitiesCollection = [];
    },
    //地图上面，点位点击事件
    mapPointClick(preTipPoi, pick) {
      console.log('点 点击');
      eventBus.$emit('gotoStreet', pick.id.attributeList.publishName);
      CesiumPop.removeDivPopById(viewer, preTipPoi); // 删除点位提示框
      switch (this.$route.name) {
        case 'yxzs':
          if (pick.id.attributeList.publishName == '务本堂') {
            eventBus.$emit('showModel');
            this.isShowModel = true
            this.clearMarkerAndBox();
          }
          this.$router
            .push({
              name: 'yxzsDetails',
              query: { id: pick.id.attributeList.id },
            })
            .catch((err) => {
              console.log('err');
            });
          break;
        case 'yxzsDetails':
          if (pick.id.attributeList.publishName == '务本堂') {
            eventBus.$emit('showModel');
            this.isShowModel = true
            this.clearMarkerAndBox();
          }
          this.$router
            .replace({
              name: 'yxzsDetails',
              query: { id: pick.id.attributeList.id },
            })
            .catch((err) => {
              console.log('err');
            });
          break;
        case 'xbg':
          if (pick.id.attributeList.publishName == '务本堂') {
            eventBus.$emit('showModel');
            this.isShowModel = true
            this.clearMarkerAndBox();
          }
          this.$router
            .push({
              name: 'wbd',
              query: { id: pick.id.attributeList.id },
            })
            .catch((err) => {
              console.log('err');
            });
          break;
        case 'wbd':
          if (pick.id.attributeList.publishName == '务本堂') {
            eventBus.$emit('showModel');
            this.isShowModel = true
            this.clearMarkerAndBox();
          }
          this.$router
            .replace({
              name: 'wbd',
              query: { id: pick.id.attributeList.id },
            })
            .catch((err) => {
              console.log('err');
            });
          break;
        default:
          break;
      }
    },
    // 实例点击事件
    entitiesClick() {
      let that = this;
      let preTipPoi = ''; // 上一个文保点tip弹框id
      //点击三维模型，返回模型信息的方法，有需要时可打开
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (e) {
        var pick = viewer.scene.pick(e.position);
        that.getViewData(); // 获取当前视角参数
        // 文物点击
        // console.log('文物点击ppoo', pick.id.attributeList);
        if (pick && pick.id && pick.id.attributeList && pick.id.attributeList.publishName) {
          that.mapPointClick(preTipPoi, pick);
          preTipPoi = '';
        }
        // if (pick && pick.id && pick.id.attributeList && pick.id.attributeList.publishName) {
        //   CesiumPop.removeDivPopById(viewer, preTipPoi); // 删除点位提示框
        //   preTipPoi = '';
        //   if (that.$route.name == 'wbd') {
        //     eventBus.$emit('bumpPointClick', pick.id.attributeList);
        //     if (pick.id.attributeList.publishName == '务本堂') {
        //       eventBus.$emit('showModel');
        //     }
        //     that.$router
        //       .replace({
        //         name: 'wbd',
        //         query: { id: pick.id.attributeList.id },
        //       })
        //       .catch((err) => {
        //         console.log('err', err);
        //       });
        //   } else {
        //     if (pick.id.attributeList.publishName == '务本堂') {
        //       eventBus.$emit('showModel');
        //       // that.draw3DModel()
        //       //   that.hiddenEntities(culturalRelicsEntities) // 文保单位点位实体
        //       //   that.hiddenEntities(xiaoShanStreetPolygonEntities) // 萧山镇街的面实体
        //       //   that.hiddenEntities(xiaoShanStreetLabelEntities) // 萧山镇街的面实体
        //       //   that.hiddenEntities(xiaoShanLineEntities) // 萧山地图描边线实体
        //       //   that.hiddenEntities(wallEntities) // 墙体实体
        //     }
        //     that.$router
        //       .push({
        //         name: 'wbd',
        //         query: { id: pick.id.attributeList.id },
        //       })
        //       .catch((err) => {
        //         console.log('err', err);
        //       });
        //   }
        //   // that.zoom("back");
        // }

        // 点击空白地图
        if (!pick || !pick.id || !pick.id.attributeList) {
          CesiumPop.removeDivPopById(viewer, 'peopleBox');
          CesiumPop.removeDivPopById(viewer, 'warningBox'); // 删除预警信息框
        } else {
          //   console.log('当前点击', pick.id.attributeList)
        }

        // 全局地图点击事件与顶部统计数据联动处理逻辑
        if (pick && pick.id && pick.id.attributeList) {
          if (pick.id.attributeList.type === 'street') {
            that.$store.commit('setHookMapReactionWithTopData', {
              jd: pick.id.attributeList.name,
              bumpPointId: '',
            });
          } else {
            that.$store.commit('setHookMapReactionWithTopData', {
              jd: pick.id.attributeList.jd,
              bumpPointId: pick.id.attributeList.id,
            });
          }
        }

        // 镇街点击
        if (pick && pick.id && pick.id.attributeList && pick.id.attributeList.type === 'street') {
          console.log('点击 镇');
          that.isClickStreet = true;
          //   console.log(pick.id.attributeList.type)
          //   that.addMapboxLayer()
          // 删除现有的面、点、线实体
          that.removeEntities(culturalRelicsEntities); // 文保单位点位实体
          that.removeEntities(xiaoShanStreetPolygonEntities); // 萧山镇街的面实体
          that.removeEntities(xiaoShanStreetLabelEntities); // 萧山镇街的面实体
          that.removeEntities(xiaoShanLineEntities); // 萧山地图描边线实体
          that.removeEntities(wallEntities); // 墙体实体
          that.removeEntities(weixingMapEntities); // 卫星地图实体

          // 删除聚合标签实体
          that.removeEntities(clusterEntities);
          that.removeEntities(clusterLabelEntities);

          // 重新绘制镇街
          // 绘制线,不画墙
          that.draw_Street_Polygon(pick.id.attributeList.poitype, pick.id.attributeList.poi, false);
          //   绘制镇街面;
          if (pick.id.attributeList.poitype == 'Polygon') {
            xiaoShanStreetPolygonEntities.push(
              that.drawPolygon(
                pick.id.attributeList.poi,
                {
                  height: 10,
                  fillColor: '#184980',
                  alpha: 0.01,
                  lineColor: '#01c0ff',
                },
                pick.id.attributeList,
                false,
              ),
            );
            that.drawMask(pick.id.attributeList.poi, { fillColor: '#131c4b', alpha: 0.8, lineWidth: 3 }, { type: 'mask' });
          } else if (pick.id.attributeList.poitype == 'MultiPolygon') {
            pick.id.attributeList.poi.map((val) => {
              xiaoShanStreetPolygonEntities.push(
                that.drawPolygon(
                  val,
                  {
                    height: 10,
                    fillColor: '#184980',
                    alpha: 0.01,
                    lineColor: '#01c0ff',
                  },
                  pick.id.attributeList,
                  false,
                ),
              );
            });
          }
          console.log('pick.id.attributeList.name', pick.id.attributeList.name);
          // 根据当前路由，绘制点
          switch (that.currentRouteName) {
            case '/yxzs':
              // 绘制文保点
              that.setModelConExist(true);
              eventBus.$emit('gotoStreet', pick.id.attributeList.name);
              eventBus.$emit('resetCurrentPoiType', '');
              eventBus.$emit('gotoStreet_point', pick.id.attributeList.name);
              that.$router
                .replace({
                  name: 'yxzs',
                  query: { zjmc: pick.id.attributeList.name },
                })
                .catch((err) => {
                  console.log('err');
                });
              /*   that.$router
                  .push({
                    name: 'yxzsDetails',
                    query: { zjmc: pick.id.attributeList.name },
                  })
                  .catch((err) => {
                    console.log('err', err);
                  }); */
              break;
            case '/yxzsDetails':
              // 绘制文保点
              that.setModelConExist(true);
              eventBus.$emit('gotoStreet', pick.id.attributeList.name);
              eventBus.$emit('resetCurrentPoiType', '');
              eventBus.$emit('gotoStreet_point', pick.id.attributeList.name);
              break;
            case '/xbg':
              // 绘制文保点
              that.setModelConExist(true);
              eventBus.$emit('gotoStreet', pick.id.attributeList.name);
              eventBus.$emit('resetCurrentPoiType', '');
              eventBus.$emit('gotoStreet_point', pick.id.attributeList.name);
              break;
            case '/zbz':
              // 绘制设备点位
              that.setModelConExist(false);
              eventBus.$emit('gotoStreet', pick.id.attributeList.name);
              eventBus.$emit('gotoStreet_device', pick.id.attributeList.name);
              break;
            case '/zbz2':
              // 绘制设备点位
              that.setModelConExist(false);
              eventBus.$emit('gotoStreet', pick.id.attributeList.name);
              eventBus.$emit('gotoStreet_device', pick.id.attributeList.name);
              break;
            case '/hb365':
              // 绘制人员点位
              that.setModelConExist(false);
              eventBus.$emit('gotoStreet', pick.id.attributeList.name);
              eventBus.$emit('gotoStreet_people', pick.id.attributeList.name);
              break;
            default:
              break;
          }
          // 飞跃
          if (pick.id.attributeList.center) {
            that.flyToLocation([...pick.id.attributeList.center, 30000]);
          }
        }
        // 摄像机播放
        if (pick && pick.id.attributeList && pick.id.attributeList.id && pick.id.attributeList.type === 'slsp' && !that.videoShow) {
          //   console.log('000222666', pick.id.attributeList)
          that.videoShow = true;
          that.videoId = pick.id.attributeList.id;
          that.placeName = pick.id.attributeList.name;
        } else {
          that.videoShow = false;
        }
        // 巡查员点击
        if (pick && pick.id.attributeList && pick.id.attributeList.type === 'people') {
          //   console.log(pick.id.attributeList.type)
          let detail = pick.id.attributeList;
          CesiumPop.removeDivPopById(viewer, 'peopleBox'); // 删除点位提示框
          CesiumPop.bindPopGlobeEventHandler(viewer);
          let popoptions = {
            popId: 'peopleBox',
            rhdata: detail,
          };
          popUtil.installMapPop().PeopleBox_Pop(popoptions);
          let options = {
            viewer: viewer,
            id: 'peopleBox',
            popupWidth: 400,
            popupHeight: 215,
            pos: {
              lon: Number(detail.zb[0]),
              lat: Number(detail.zb[1]),
              alt: Number(0),
            },
            extentHeight: 60,
            extentColor: Cesium.Color.WHITE,
          };
          CesiumPop.addDivPop(options, 'h');
        }
        //保护365人员点击
        if (pick && pick.id.attributeList && pick.id.attributeList.linkAction) {
          that.isShow_hbyDetail = true;
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      // 鼠标移动事件
      let currentObjectId;
      let currentPrimitive;
      let currentColor;
      let currentShow;
      let attributes;
      handler.setInputAction(function (movement) {
        let pickedObject = viewer.scene.pick(movement.endPosition);

        // console.log("1234", pickedObject.id.attributeList);
        let detail = pickedObject && pickedObject.id && pickedObject.id.attributeList;

        // 展示文保点tip弹框
        if (detail && detail.poi && detail.maxLevel) {
          // CesiumPop.clearDivPop(viewer); // 删除所有弹框
          CesiumPop.removeDivPopById(viewer, preTipPoi); // 删除点位提示框
          preTipPoi = detail.poi;
          CesiumPop.bindPopGlobeEventHandler(viewer);
          let popoptions = {
            popId: detail.poi,
            rhdata: detail,
          };
          popUtil.installMapPop().CulturalPoiTip_Pop(popoptions);
          let options = {
            viewer: viewer,
            id: detail.poi,
            popupWidth: 140,
            popupHeight: 60,
            pos: {
              lon: Number(detail.poi.split(',')[0]),
              lat: Number(detail.poi.split(',')[1]),
              alt: Number(0),
            },
            extentHeight: 60,
            extentColor: Cesium.Color.WHITE,
          };
          CesiumPop.addDivPop(options, 'h');
        }
        if (!detail || !detail.maxLevel) {
          // CesiumPop.clearDivPop(viewer); // 删除所有弹框
          CesiumPop.removeDivPopById(viewer, preTipPoi); // 删除点位提示框
          preTipPoi = '';
        }

        // 展示镇街名称
        if (detail && detail.name && detail.type == 'street') {
          that.removeEntities(xiaoShanStreetLabelEntities);
          xiaoShanStreetLabelEntities.push(
            that.drawText(
              detail.center,
              detail.name,
              {
                fillColor: '#ff0',
                scale: 0.5,
              },
              mapHeight_max + 10,
            ),
          );
        }
        if (!detail || !detail.name || detail.type != 'street') {
          that.removeEntities(xiaoShanStreetLabelEntities);
        }

        // ======================================================
        if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
          if (pickedObject.id === currentObjectId) {
            return;
          }
          if (Cesium.defined(currentObjectId)) {
            attributes = currentPrimitive.getGeometryInstanceAttributes(currentObjectId);
            if (attributes !== undefined) {
              if (currentColor !== undefined) {
                attributes.color = currentColor;
              } else {
                attributes.color = Cesium.Color.YELLOW;
              }
              attributes.show = currentShow;
            }
            currentObjectId = undefined;
            currentPrimitive = undefined;
            currentColor = undefined;
            currentShow = undefined;
          }
        }
        if (
          Cesium.defined(pickedObject) &&
          Cesium.defined(pickedObject.primitive) &&
          Cesium.defined(pickedObject.id) &&
          Cesium.defined(pickedObject.primitive.getGeometryInstanceAttributes) &&
          pickedObject.id._id !== 'cameraAreaId' &&
          pickedObject.id._id !== 'ppcAreaId' &&
          pickedObject.id._id !== 'comEntityFlat' &&
          pickedObject.id._id !== 'floodEnt' &&
          pickedObject.id._id !== 'comEntity'
        ) {
          currentObjectId = pickedObject.id;
          currentPrimitive = pickedObject.primitive;
          attributes = currentPrimitive.getGeometryInstanceAttributes(currentObjectId);
          currentColor = attributes.color;
          currentShow = attributes.show;
          if (!viewer.scene.invertClassification) {
            if (!that.isClickStreet && pickedObject.id && pickedObject.id.attributeList && pickedObject.id.attributeList.type !== 'mask') {
              // attributes.color = [245, 245, 0, 128]
              attributes.color = [55, 90, 255, 100];
            }
          }
          attributes.show = [1];
        } else if (Cesium.defined(currentObjectId)) {
          attributes = currentPrimitive.getGeometryInstanceAttributes(currentObjectId);
          if (attributes !== undefined) {
            if (currentColor !== undefined) {
              attributes.color = currentColor;
            } else {
              if (!that.isClickStreet) {
                attributes.color = Cesium.Color.YELLOW;
              }
            }
            attributes.show = currentShow;
          }
          currentObjectId = undefined;
          currentPrimitive = undefined;
          currentColor = undefined;
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },

    // 请求三维模型
    get3DTile() {
      getTiles3D().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].tilesType === 'ff') {
            this.add3dtilesmap(res.data[i]);
          }
        }
      });
    },

    // 视频窗口关闭
    windwoClosed() {
      this.videoShow = false;
    },

    // --------------------------------------------------------------------------------------
    // 绘制遮罩mask
    drawMask(positions, config, detailInfo) {
      //   console.log('jhjh', positions)
      this.removeEntities(maskEntities);
      if (positions.length < 2) return;
      var config = config ? config : {};
      var polygonGeometry = viewer.entities.add({
        name: '面几何对象',
        attributeList: detailInfo,
        polygon: {
          // height: config.height ? config.height : 250, //离地面的高度
          hierarchy: {
            positions: new Cesium.Cartesian3.fromDegreesArray([100, 0, 100, 89, 150, 89, 150, 0]),
            holes: [
              {
                positions: Cesium.Cartesian3.fromDegreesArray(positions),
              },
            ],
          }, //面的轮廓坐标
          material: config.fillColor
            ? new Cesium.Color.fromCssColorString(config.fillColor).withAlpha(config.alpha > 0 ? config.alpha : 0)
            : new Cesium.Color.fromCssColorString('#FFD700').withAlpha(config.alpha > 0 ? config.alpha : 0), //面的颜色材质
          outline: false,
          outlineColor: config.lineColor ? new Cesium.Color.fromCssColorString(config.lineColor) : new Cesium.Color.fromCssColorString('#fff'),
          outlineWidth: 2,
          // perPositionHeight: false,
          show: true,
          clampToGround: true,
        },
      });
      maskEntities.push(polygonGeometry);
    },
    // 绘制墙体
    drawWall(positions, config) {
      if (positions.length < 2) return;
      var config = config ? config : {};
      var wallGeometry = viewer.entities.add({
        name: 'wall at height',
        wall: {
          positions: Cesium.Cartesian3.fromDegreesArray(positions),
          minimumHeights: config.minimumHeights,
          maximumHeights: config.maximumHeights,
          material: new Cesium.ImageMaterialProperty({
            image: this.getColorRamp([0, 1]), //添加材质
            transparent: true, // 让材质中的透明属性生效
          }),
          // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10)
        },
      });
      wallEntities.push(wallGeometry);
    },

    // 给材质添加canvas，达到渐变色的效果，但是只在2d图像
    getColorRamp(elevationRamp, isVertical = true) {
      var ramp = document.createElement('canvas');
      ramp.width = isVertical ? 1 : mapHeight_max;
      ramp.height = isVertical ? mapHeight_max : 1;
      var ctx = ramp.getContext('2d');

      var values = elevationRamp;
      var grd = isVertical ? ctx.createLinearGradient(0, 0, 0, mapHeight_max) : ctx.createLinearGradient(0, 0, mapHeight_max, 0);
      grd.addColorStop(values[0], '#182547'); //black
      grd.addColorStop(values[1], '#3380C2'); //blue
      // grd.addColorStop(values[0], "rgba(2,54,89,1)"); //black
      // grd.addColorStop(values[1], "rgba(1,87,144,1)"); //blue

      ctx.fillStyle = grd;
      if (isVertical) ctx.fillRect(0, 0, 1, mapHeight_max);
      else ctx.fillRect(0, 0, mapHeight_max, 1);
      return ramp;
    },
    // 给数组每隔n个元素，添加一个元素element
    addArrayElement(arr, n, element) {
      var typeData = [];
      for (var i = 0, len = arr.length; i < len; i += n) {
        typeData.push(arr.slice(i, i + n));
      }
      typeData.forEach((item) => {
        item.push(element);
      });
      return [].concat.apply([], typeData);
    },

    // 绘制点---文保点
    drawCulturalSave_poi(poi, config, detail) {
      let checkIsWBT = detail && detail.publishName == '务本堂';
      let a = viewer.entities.add(
        new Cesium.Entity({
          name: '文保点位',
          position: Cesium.Cartesian3.fromDegrees(...poi, config.height),
          show: true,
          type: 'POI',
          attributeList: detail, // 可为实体增加属性信息
          // 添加图片
          billboard: {
            image: config.img ? config.img : 'static/images/culturalSave/map-a.png',
            scale: config.scale ? config.scale : 1,
            pixelOffset: checkIsWBT ? new Cesium.Cartesian2(-40, -10) : new Cesium.Cartesian2(0, 0),
            // 垂直位置
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            disableDepthTestDistance: 6000000,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 600000000),
          },
          // 圆中的字
          label: {
            // text: detail.name, // 若要聚合，text不能为空
            text: '', // 若要聚合，text不能为空
            fillColor: Cesium.Color.fromCssColorString('#8ed4ff'),
            showBackground: false,
            scale: 0.08,
            font: '280px Helvetica',
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineColor: Cesium.Color.fromCssColorString('#2ddaff'),
            outlineWidth: 1,
            // scaleByDistance: new Cesium.NearFarScalar(10000, 0.5, 150000, 0.5),
            // 垂直位置
            verticalOrigin: Cesium.VerticalOrigin.TOP,
            // 中心位置
            // pixelOffset: new Cesium.Cartesian2(8, -38),
            eyeOffset: new Cesium.Cartesian3(0, 0, 0),
            disableDepthTestDistance: 60000000,
          },
        }),
      );
      return a;
    },
    // 绘制设备点位或人员点位
    drawDeviceOrPeoplePoi(msg, logo) {
      //   console.log('文保点绘制', msg, logo)
      this.removeEntities(clusterEntities);
      this.removeEntities(clusterLabelEntities);
      this.removeEntities(culturalRelicsEntities);
      let scale;
      let height;
      scale = 1;

      if (this.isClickStreet) {
        height = 10;
      } else {
        height = mapHeight_max;
      }

      msg &&
        msg.length > 0 &&
        msg.map((item) => {
          let config = {};
          config.scale = scale;
          config.height = height;

          if (logo == 'people') {
            // 护宝365---人员点位
            switch (item.type) {
              case 'yingji':
                config.img = './static/images/culturalSave/yingjichuzhiyuan.png';
                break;
              case 'zhiyuanzhe':
                config.img = './static/images/culturalSave/zhiyuanzhe.png';
                break;
              case 'wenwuxunjian':
                config.img = './static/images/culturalSave/wuwuxunjian.png';
                break;
              case 'dangyuan':
                config.img = './static/images/culturalSave/dangyuan.png';
                break;
              case 'qita':
                config.img = './static/images/culturalSave/qitarenyuan.png';
                break;
              default:
                break;
            }
          } else if (logo == 'device') {
            // 智保站---设备点位
            switch (item.type) {
              case 'shuiya':
                config.img = './static/images/culturalSave/shuiya.png';
                break;
              case 'yangan':
                config.img = './static/images/culturalSave/yangan.png';
                break;
              case 'jiankong':
                config.img = './static/images/culturalSave/jiankong.png';
                break;
              case 'dianya':
                config.img = './static/images/culturalSave/dianya.png';
                break;
              default:
                break;
            }
          }
          if (item.poi) {
            culturalRelicsEntities.push(this.drawCulturalSave_poi(item.poi.split(','), config, item));
          }
        });
    },
    // 绘制所有正常事件点位
    drawNormalEventPoi(msg, logo) {
      //   console.log('文保点绘制', msg, logo)
      this.removeEntities(clusterEntities);
      this.removeEntities(clusterLabelEntities);
      this.removeEntities(culturalRelicsEntities);
      let scale;
      let height;
      scale = 1;

      if (this.isClickStreet) {
        height = 10;
      } else {
        height = mapHeight_max;
      }

      msg &&
        msg.length > 0 &&
        msg.map((item) => {
          let config = {};
          config.scale = scale;
          config.height = height;

          if (logo == 'sjzx') {
            // 事件中心---点位
            switch (item.type) {
              case '上报事件':
                config.img = './static/images/culturalSave/shangbao.png';
                break;
              case '部门移交':
                config.img = './static/images/culturalSave/bumenyijiao.png';
                break;
              case '上级督办':
                config.img = './static/images/culturalSave/shangjiduban.png';
                break;
              default:
                break;
            }
          } else if (logo == 'aiyj') {
            // AI预警事件---点位
            switch (item.type) {
              case '':
                // config.img = './static/images/culturalSave/shuiya.png'
                break;
              default:
                break;
            }
          } else if (logo == 'dkxt') {
            // 多跨协同事件---点位
            switch (item.type) {
              case '公安':
                config.img = './static/images/culturalSave/gongan.png';
                break;
              case '消防':
                config.img = './static/images/culturalSave/xiaofang.png';
                break;
              case '住建':
                config.img = './static/images/culturalSave/zhujian.png';
                break;
              case '城管':
                config.img = './static/images/culturalSave/chengguan.png';
                break;
              default:
                break;
            }
          }
          if (item.poi) {
            culturalRelicsEntities.push(this.drawCulturalSave_poi(item.poi.split(','), config, item));
          }
        });
    },
    // 绘制点---巡查员
    drawPeople_poi(poi, config, detail) {
      let a = viewer.entities.add(
        new Cesium.Entity({
          name: '巡查员点位',
          position: Cesium.Cartesian3.fromDegrees(...poi, mapHeight_max),
          show: true,
          type: 'POI',
          attributeList: detail, // 可为实体增加属性信息
          // 添加图片
          billboard: {
            image: config.img ? config.img : 'static/images/culturalSave/map-a.png',
            scale: config.scale ? config.scale : 1,
            // 垂直位置
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            disableDepthTestDistance: 6000000,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 600000000),
          },
        }),
      );
      return a;
    },
    // 绘制聚合---文保点
    drawCluster_poi(poi, config, detail) {
      let a = viewer.entities.add(
        new Cesium.Entity({
          name: '聚合文保点',
          position: Cesium.Cartesian3.fromDegrees(...poi, mapHeight_max),
          show: true,
          type: 'POI',
          attributeList: detail, // 可为实体增加属性信息
          // 添加图片
          billboard: {
            image: config.img ? config.img : 'static/images/culturalSave/map-a.png',
            scale: config.scale ? config.scale : 0.6,
            scaleByDistance: new Cesium.NearFarScalar(10000, 3, 50000, 1),
            // 垂直位置
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            // eyeOffset: new Cesium.Cartesian3(0, 0, 1000),
            // disableDepthTestDistance: 6000000,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              // 110000
              60000000,
            ),
          },
          // 圆中的字
          label: {
            text: detail.jd,
            fillColor: Cesium.Color.fromCssColorString('#fff'),
            showBackground: false,
            backgroundColor: Cesium.Color.fromCssColorString('#ffffff00'),
            scale: 0.08,
            font: '150px Helvetica',
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineColor: Cesium.Color.fromCssColorString('#fff'),
            outlineWidth: 0,
            scaleByDistance: new Cesium.NearFarScalar(10000, 2, 50000, 1),

            // 垂直位置
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            // 中心位置
            pixelOffset: new Cesium.Cartesian2(-20, -63),
            pixelOffsetScaleByDistance: new Cesium.NearFarScalar(10000, 3, 50000, 1),
            eyeOffset: new Cesium.Cartesian3(0, 0, -10),
            disableDepthTestDistance: 0,
          },
        }),
      );
      let label_1 = viewer.entities.add(
        new Cesium.Entity({
          name: '聚合文保点',
          position: Cesium.Cartesian3.fromDegrees(...poi, mapHeight_max),
          show: true,
          type: 'POI',
          attributeList: detail, // 可为实体增加属性信息
          // 圆中的字
          label: {
            text: detail.gfx,
            fillColor: Cesium.Color.fromCssColorString('#FF5149'),
            showBackground: false,
            backgroundColor: Cesium.Color.fromCssColorString('#0F2D5900'),
            scale: 0.08,
            font: '150px sans-serif',
            // style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            // outlineColor: Cesium.Color.fromCssColorString("#000"),
            // outlineWidth: 0,
            scaleByDistance: new Cesium.NearFarScalar(10000, 2, 50000, 1),
            // 垂直位置
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            // 中心位置
            pixelOffset: new Cesium.Cartesian2(-30, -47),
            pixelOffsetScaleByDistance: new Cesium.NearFarScalar(10000, 3, 50000, 1),
            eyeOffset: new Cesium.Cartesian3(0, 0, -10),
            disableDepthTestDistance: 0,
            // disableDepthTestDistance: Number.POSITIVE_INFINITY
          },
        }),
      );
      let label_2 = viewer.entities.add(
        new Cesium.Entity({
          name: '聚合文保点',
          position: Cesium.Cartesian3.fromDegrees(...poi, mapHeight_max),
          show: true,
          type: 'POI',
          attributeList: detail, // 可为实体增加属性信息
          // 圆中的字
          label: {
            text: detail.zfx,
            fillColor: Cesium.Color.fromCssColorString('#F3C743'),
            showBackground: false,
            backgroundColor: Cesium.Color.fromCssColorString('#0F2D5900'),
            scale: 0.08,
            font: '150px Helvetica',
            // style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            // outlineColor: Cesium.Color.fromCssColorString("#000"),
            // outlineWidth: 1,
            scaleByDistance: new Cesium.NearFarScalar(10000, 2, 50000, 1),
            pixelOffsetScaleByDistance: new Cesium.NearFarScalar(10000, 3, 50000, 1),
            // 垂直位置
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            // 中心位置
            pixelOffset: new Cesium.Cartesian2(0, -47),
            eyeOffset: new Cesium.Cartesian3(0, 0, -10),
            disableDepthTestDistance: 0,
            // disableDepthTestDistance: Number.POSITIVE_INFINITY
          },
        }),
      );
      let label_3 = viewer.entities.add(
        new Cesium.Entity({
          name: '聚合文保点',
          position: Cesium.Cartesian3.fromDegrees(...poi, mapHeight_max),
          show: true,
          type: 'POI',
          attributeList: detail, // 可为实体增加属性信息
          // 圆中的字
          label: {
            text: detail.dfx,
            fillColor: Cesium.Color.fromCssColorString('#59D271'),
            showBackground: false,
            backgroundColor: Cesium.Color.fromCssColorString('#0F2D5900'),
            scale: 0.08,
            font: '150px Helvetica',
            // style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            // outlineColor: Cesium.Color.fromCssColorString("#000"),
            // outlineWidth: 1,
            scaleByDistance: new Cesium.NearFarScalar(10000, 2, 50000, 1),
            pixelOffsetScaleByDistance: new Cesium.NearFarScalar(10000, 3, 50000, 1),
            // 垂直位置
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            // 中心位置
            pixelOffset: new Cesium.Cartesian2(30, -47),
            eyeOffset: new Cesium.Cartesian3(0, 0, -10),
            disableDepthTestDistance: 0,
            // disableDepthTestDistance: Number.POSITIVE_INFINITY
          },
        }),
      );
      clusterLabelEntities.push(label_1, label_2, label_3);
      return a;
    },
    // 绘制萧山区轮廓墙体
    draw_XiaoShan_Polygon() {
      // 请求轮廓经纬度数据
      let parse = new acol_dea().decodeGeoJson({ data: xiaoshanNewData });
      // console.log( 'ajsgdashd',new acol_dea().encodeGeoJson({ data: xiaoshanNewData, level: 8, downLoad: true })   )
      let poi = parse.features[0].geometry.coordinates.flat(2);
      xiaoShanLineEntities.push(this.drawPolyLine(this.addArrayElement(poi, 2, mapHeight_max), { fillColor: 'skyblue', lineWidth: 3 }, {}));
      // 绘制遮罩
      this.drawMask(poi, { fillColor: '#131c4b', alpha: 0.8, lineWidth: 3 }, { type: 'mask' });
      // xiaoShanStreetPolygonEntities.push(
      //   this.drawPolygon(
      //     poi,
      //     {
      //       height: mapHeight_max - 100,
      //       fillColor: '#184980',
      //       alpha: 0.7,
      //       lineColor: '#01c0ff',
      //     },
      //     {},
      //     false
      //   )
      // )
      // 绘制墙体
      let wallConfig = {
        minimumHeights: [],
        maximumHeights: [],
      };
      poi.map((item) => {
        wallConfig.minimumHeights.push(mapHeight_min);
        wallConfig.maximumHeights.push(mapHeight_max);
      });
      // this.drawWall(poi, wallConfig);

      /* 未开启解压缩地图数据代码 RAW */
      /* getLocalData('static/data/萧山区New.json').then(res => {
        let poi = res.data.features[0].geometry.coordinates.flat(2);
        xiaoShanLineEntities.push(this.drawPolyLine(this.addArrayElement(poi, 2, mapHeight_max), { fillColor: 'skyblue', lineWidth: 3 }, {}));
        // 绘制遮罩
        this.drawMask(poi, { fillColor: '#131c4b', alpha: 0.8, lineWidth: 3 }, { type: 'mask' });

        // xiaoShanStreetPolygonEntities.push(
        //   this.drawPolygon(
        //     poi,
        //     {
        //       height: mapHeight_max - 100,
        //       fillColor: '#184980',
        //       alpha: 0.7,
        //       lineColor: '#01c0ff',
        //     },
        //     {},
        //     false
        //   )
        // )
        // 绘制墙体
        let wallConfig = {
          minimumHeights: [],
          maximumHeights: [],
        };
        poi.map(item => {
          wallConfig.minimumHeights.push(mapHeight_min);
          wallConfig.maximumHeights.push(mapHeight_max);
        });
        this.drawWall(poi, wallConfig);
      }); */
    },
    // 绘制镇街轮廓墙体
    draw_Street_Polygon(poitype, poi, hasWall = true) {
      //   console.log('镇街', poitype, poi)
      if (poitype == 'Polygon') {
        let height = '';
        if (this.isClickStreet) {
          height = 250;
        } else {
          height = mapHeight_max;
        }
        xiaoShanLineEntities.push(this.drawPolyLine(this.addArrayElement(poi, 2, height), { fillColor: 'skyblue', lineWidth: 3 }, {}));

        if (hasWall) {
          // 绘制墙体
          let wallConfig = {
            minimumHeights: [],
            maximumHeights: [],
          };
          poi.map((item) => {
            wallConfig.minimumHeights.push(mapHeight_min);
            wallConfig.maximumHeights.push(mapHeight_max);
          });
          this.drawWall(poi, wallConfig);
        }
      } else if (poitype == 'MultiPolygon') {
        poi.map((val) => {
          let height = '';
          if (this.isClickStreet) {
            height = 0;
          } else {
            height = mapHeight_max;
          }
          xiaoShanLineEntities.push(this.drawPolyLine(this.addArrayElement(val, 2, height), { fillColor: 'skyblue', lineWidth: 3 }, {}));

          if (hasWall) {
            // 绘制墙体
            let wallConfig = {
              minimumHeights: [],
              maximumHeights: [],
            };
            val.map((item) => {
              wallConfig.minimumHeights.push(mapHeight_min);
              wallConfig.maximumHeights.push(mapHeight_max);
            });
            this.drawWall(val, wallConfig);
          }
        });
      }
    },
    // 绘制萧山镇街轮廓
    draw_XiaoshanStreet_Polygon() {
      xiaoshanStreetData.map((item) => {
        if (item.poitype == 'Polygon') {
          xiaoShanStreetPolygonEntities.push(
            this.drawPolygon(
              item.poi,
              {
                height: mapHeight_max,
                fillColor: '#184980',
                alpha: 0.01,
                lineColor: '#01c0ff',
              },
              item,
              false,
            ),
          );
        } else if (item.poitype == 'MultiPolygon') {
          item.poi.map((val) => {
            xiaoShanStreetPolygonEntities.push(
              this.drawPolygon(
                val,
                {
                  height: mapHeight_max,
                  fillColor: '#184980',
                  alpha: 0.01,
                  lineColor: '#01c0ff',
                },
                item,
                false,
              ),
            );
          });
        }
      });
      /*
        // 使用axios获取本地json资源 RAW
// 请求是本地数据
      getLocalData('static/data/萧山镇街.json').then(res => {
        // console.log('萧山镇街', res.data)
        res.data.map(item => {
          if (item.poitype == 'Polygon') {
            xiaoShanStreetPolygonEntities.push(
              this.drawPolygon(
                item.poi,
                {
                  height: mapHeight_max,
                  fillColor: '#184980',
                  alpha: 0.01,
                  lineColor: '#01c0ff',
                },
                item,
                false,
              ),
            );
          } else if (item.poitype == 'MultiPolygon') {
            item.poi.map(val => {
              xiaoShanStreetPolygonEntities.push(
                this.drawPolygon(
                  val,
                  {
                    height: mapHeight_max,
                    fillColor: '#184980',
                    alpha: 0.01,
                    lineColor: '#01c0ff',
                  },
                  item,
                  false,
                ),
              );
            });
          }
        });
      }); */
    },
    // 绘制萧山区地图
    draw_XiaoShan_map() {
      let parse = new acol_dea().decodeGeoJson({ data: xiaoshanNewData });
      let poi = parse.features[0].geometry.coordinates.flat(2);
      var polygonGeometry = viewer.entities.add({
        name: '面几何对象',
        attributeList: {},
        polygon: {
          hierarchy: new Cesium.Cartesian3.fromDegreesArray(poi), //面的轮廓坐标
          outline: false,
          // height: mapHeight_max - 5, //离地面的高度
          perPositionHeight: false,
          material: new Cesium.ImageMaterialProperty({
            // image: 'static/images/culturalSave/xs_map.png',
            image: xs_map,
            repeat: new Cesium.Cartesian2(1, 1),
            // color: Cesium.Color.fromCssColorString('rgba(93,141,197,0)'),
          }),
          // clampToGround: true,
          // classificationType: Cesium.ClassificationType.TERRAIN,
          // show: true
          // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000) //视角距离大于90000显示
        },
      });
      weixingMapEntities.push(polygonGeometry);
      /*
      // 未开启解压缩地图数据代码 RAW
      getLocalData('static/data/萧山区New.json').then(res => {
        let poi = res.data.features[0].geometry.coordinates.flat(2);
        var polygonGeometry = viewer.entities.add({
          name: '面几何对象',
          attributeList: {},
          polygon: {
            hierarchy: new Cesium.Cartesian3.fromDegreesArray(poi), //面的轮廓坐标
            outline: false,
            height: mapHeight_max - 5, //离地面的高度
            perPositionHeight: false,
            material: new Cesium.ImageMaterialProperty({
              image: 'static/images/culturalSave/xs_map.png',
              repeat: new Cesium.Cartesian2(1, 1),
              // color: Cesium.Color.fromCssColorString('rgba(93,141,197,0)'),
            }),
            // show: true
            // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000) //视角距离大于90000显示
          },
        });
        weixingMapEntities.push(polygonGeometry);
      }); */
    },
    // 文物预警气泡
    showCultureWarningPop(data) {
      CesiumPop.clearDivPop(viewer); // 删除所有弹框
      //   console.log('信息', data)
      CesiumPop.bindPopGlobeEventHandler(viewer);
      let popoptions = {
        popId: data.poi[0] + data.poi[1],
        rhdata: data,
      };
      if (this.currentRouteName.indexOf('jsc') >= 0) {
        popUtil.installMapPop().cultureWaringJSC_Pop(popoptions);
      } else if (this.currentRouteName.indexOf('zhdd') >= 0) {
        popUtil.installMapPop().cultureWaring_Pop(popoptions);
      }

      let options = {
        viewer: viewer,
        id: data.poi[0] + data.poi[1],
        popupWidth: 700,
        popupHeight: 215,
        pos: {
          lon: Number(data.poi[0]),
          lat: Number(data.poi[1]),
          alt: Number(0),
        },
        extentHeight: 60,
        extentColor: Cesium.Color.WHITE,
      };
      CesiumPop.addDivPop(options, 'h');
    },

    // 加载背景图
    loadMapBg() {
      const texturedPolygon = viewer.entities.add({
        name: 'mapBg',
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([-180, 90, 1000, 180, 90, 1000, 90, -180, 1000, -90, -180, 1000]),
          textureCoordinates: {
            positions: [new Cesium.Cartesian2(0, 1), new Cesium.Cartesian2(0, 0), new Cesium.Cartesian2(1, 0), new Cesium.Cartesian2(1, 1)],
          },
          perPositionHeight: true,
          extrudedHeight: 0,
          material: 'static/images/culturalSave/bg.png',
        },
      });
    },

    // 绘制巡查轨迹
    drawPeoplePath(poi, row) {
      this.removeEntities(peoplePathEntities);
      peoplePathEntities.push(this.drawPolyLine(this.addArrayElement(poi, 2, mapHeight_max), { fillColor: 'red', lineWidth: 3 }, {}));

      // 巡查员点位
      let poiDetail = {
        name: row.userName,
        phone: row.phone,
        jd: row.jd ? row.jd : '暂无',
        pointName: row.pointName,
        type: 'people',
        zb: [poi[0], poi[1]],
      };
      checkPeopleEntities.push(this.drawPeople_poi(poiDetail.zb, { img: './static/images/culturalSave/people.png' }, poiDetail));
    },

    // 加载3d模型
    draw3DModel() {
      /*       // viewer.imageryLayers.get(0).show = true
      // viewer.imageryLayers.add(mapboxImagery)
      //加载3D模型数据
      palaceTileset = new Cesium.Cesium3DTileset({
        url: './static/model/wbt_3dTile_3/tileset.json',
        //控制切片视角显示的数量，可调整性能
        maximumScreenSpaceError: 2,
        maximumNumberOfLoadedTiles: 100000,
      })
      //添加到场景
      viewer.scene.primitives.add(palaceTileset)
      viewer.scene.light = new Cesium.DirectionalLight(
        {
          //去除时间原因影响模型颜色
          direction: new Cesium.Cartesian3(
            0.35492591601301104,
            -0.8909182691839401,
            -0.2833588392420772
          ),
        },
        Cesium.Color.YELLOW,
        1
      )

      // this.flyToLocation([120.335, 30.08, 11000]);
      this.moveToDegrees(
        120.32961547286085,
        30.099116998144474,
        90,
        0.5919116973268368,
        -0.6447149852354896
      ) */
    },

    // =================================================================
    // 左上按钮点击
    culturalBtnClick(isShow) {
      if (isShow) {
        this.culturalPoiBoxShow = true;
      } else {
        this.culturalPoiBoxShow = false;
      }
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
    showPeoplePoi(list) {
      this.hiddenEntities(clusterEntities);
      this.hiddenEntities(clusterLabelEntities);
      if (checkPeopleEntities.length > 0) {
        this.showEntities(checkPeopleEntities);
      } else {
        list.map((item) => {
          checkPeopleEntities.push(this.drawPeople_poi(item.zb, { img: './static/images/culturalSave/people.png' }, item));
        });
      }
    },
    // 隐藏巡查员点位
    hidePeoplePoi() {
      this.hiddenEntities(checkPeopleEntities);
      this.showEntities(clusterEntities);
      this.showEntities(clusterLabelEntities);
    },
    // 右上预警按钮
    // warningBtnClick() {
    //   if (this.yjBoxShow) {
    //     this.yjBoxShow = false;
    //   } else {
    //     this.yjBoxShow = true;
    //   }
    // },
    // 显示预警弹框
    showYJ_Box(data = {}, poi = '120.30147736711149, 29.959598423120653') {
      //   console.log('555666888')
      // CesiumPop.clearDivPop(viewer); // 删除所有弹框
      CesiumPop.bindPopGlobeEventHandler(viewer);
      let popoptions = {
        popId: 'warningBox',
        rhdata: data,
      };
      popUtil.installMapPop().WarningBox_Pop(popoptions);
      let options = {
        viewer: viewer,
        id: 'warningBox',
        popupWidth: 400,
        popupHeight: 215,
        pos: {
          lon: Number(poi.split(',')[0]),
          lat: Number(poi.split(',')[1]),
          alt: Number(0),
        },
        extentHeight: 60,
        extentColor: Cesium.Color.WHITE,
      };
      CesiumPop.addDivPop(options, 'h');
    },
    // 预警跳动点位 poi = '120.30147736711149, 29.959598423120653'
    addWarningMarkerToMap(data = {}, poi) {
    //   console.log('预警点位');
      CesiumPop.bindPopGlobeEventHandler(viewer);
      let popoptions = {
        popId: 'marker',
        rhdata: data,
      };
      popUtil.installMapPop().WarningMarker_Pop(popoptions);
      let options = {
        viewer: viewer,
        id: 'marker',
        popupWidth: 400,
        popupHeight: 215,
        pos: {
          lon: Number(poi.split(',')[0]),
          lat: Number(poi.split(',')[1]),
          alt: Number(0),
        },
        extentHeight: 60,
        extentColor: Cesium.Color.WHITE,
      };
      CesiumPop.addDivPop(options, 'h');
    },
    // 移除预警跳动点位和浮框
    clearMarkerAndBox() {
      this.isWarning = false;
      CesiumPop.removeDivPopById(viewer, 'warningBox');
      CesiumPop.removeDivPopById(viewer, 'marker');
    },
    yjBoxClose() {
      this.yjBoxShow = false;
    },
    _closeAndChange() {
      this.yjBoxShow = false;
      setTimeout(() => {
        this.isWarning = false;
      }, 100);
    },

    // 绘制聚合--请求数据
    getCluster_list() {
      get_zpdt_data().then((res) => {
        let list = res.data.data;
        this.removeEntities(clusterEntities);
        this.removeEntities(clusterLabelEntities);
        this.removeEntities(culturalRelicsEntities);
        list.map((item) => {
          if (item.zb) {
            clusterEntities.push(this.drawCluster_poi(item.zb.split(','), { img: './static/images/culturalSave/normalCluster.png' }, item));
          }
        });
      });
    },

    // 地图缩放操作
    zoom(type) {
      //   let centerPoi = this.getCenterPoi();
      let height = Math.ceil(viewer.camera.positionCartographic.height) * 1;
      //   console.log(height)
      switch (type) {
        // case '+':
        //   height -= 30000;
        //   this.flyToLocation([...centerPoi, height]);
        //   break;
        // case '-':
        //   height += 30000;
        //   this.flyToLocation([...centerPoi, height]);
        //   break;
        case 'back':
          this.$store.commit('setHookMapReactionWithTopData', {
            jd: '',
            bumpPointId: '',
          });
          if (this.isClickStreet) {
            this.isClickStreet = false;
            // 删除模型
            viewer.scene.primitives.remove(palaceTileset);
            palaceTileset = null;
            // 删除mapbox地图
            for (let i = 0; i < preImageryArr.length; i++) {
              viewer.imageryLayers.remove(preImageryArr[i], false);
            }
            preImageryArr = [];

            this.removeEntities(xiaoShanStreetPolygonEntities); // 删除萧山镇街的面实体
            this.removeEntities(xiaoShanLineEntities); // 删除萧山地图描边线实体
            this.removeEntities(wallEntities); // 删除墙体实体
            this.removeEntities(weixingMapEntities); // 卫星地图实体

            this.draw_XiaoShan_map(); // 绘制萧山区卫星图
            this.draw_XiaoShan_Polygon(); // 绘制萧山区轮廓
            this.draw_XiaoshanStreet_Polygon(); // 绘制萧山镇街轮廓
          }

          if (this.currentRouteName == '/wbd') {
            this.$router.back();
          }
          eventBus.$emit('gotoStreet', '萧山区');
          this.wholeView();
          eventBus.$emit('resetGlobalJD', '');

          //   // 删除现有的面、点、线实体
          //   this.removeEntities(culturalRelicsEntities); // 删除文保单位点位实体
          //   this.removeEntities(peoplePathEntities); // 删除人员轨迹

          //   eventBus.$emit('data_back', ['']);
          //   this.hiddenEntities(checkPeopleEntities); // 隐藏巡查员点位
          //   eventBus.$emit('checkPeopleBtn'); // 改变巡查员弹框按钮文字显示

          //   CesiumPop.clearDivPop(viewer); // 删除所有弹框
          //   this.wholeView();

          //   console.log('this.currentRouteName', this.currentRouteName);
          //   console.log(this.$route);
          //   console.log('this.isClickStreet', this.isClickStreet);
          // 不同页面的初始化
          switch (this.currentRouteName) {
            case '/yxzs':
              this.$router
                .replace({
                  name: 'yxzs',
                })
                .catch((err) => {
                  console.log('err');
                });
              this.setModelConExist(true);
              this.getCluster_list(); // 初始化绘制聚合点位---永兴指数页面
              break;
            case '/yxzsDetails':
              //   this.$router.back();
              this.$router
                .replace({
                  name: 'yxzs',
                })
                .catch((err) => {
                  console.log('err');
                });
              //   eventBus.$emit('hideModel');
              this.setModelConExist(true);
              this.getCluster_list(); // 初始化绘制聚合点位---永兴指数页面
              break;
            case '/xbg':
              eventBus.$emit('drawPoiByRanks', ['14da5819da904c4ab1d9d94a961ca27a', 'cef2a80fbea6df89578ad5599b67b71f', '2bf3be523de944ec3ee1ad832a7a2587']);
              this.setModelConExist(true);
              break;
            case '/zbz':
              this.setModelConExist(false);
              let poiArr = ZBZStaticData;
              this.drawDeviceOrPeoplePoi(poiArr, 'device');
              break;
            case '/zbz2':
              this.setModelConExist(false);
              let poi2Arr = ZBZStaticData;
              this.drawDeviceOrPeoplePoi(poi2Arr, 'device');
              break;
            case '/hb365':
              this.setModelConExist(false);
              let poiArr2 = Static365Data;
              this.drawDeviceOrPeoplePoi(poiArr2, 'people');
              break;
            default:
              break;
          }
          break;
        case 'legend':
          eventBus.$emit('showLegend');
          break;
        default:
          break;
      }
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
      //   console.log('预警socket连接成功')
    },
    error: function () {
      //   console.log('连接错误')
    },
    getMessage: function (msg) {
      //   console.log(
      //     'websocket接收预警信息123',
      //     msg,
      //     msg.data,
      //     JSON.parse(msg.data)
      //   )
      if (JSON.parse(msg.data) == 1) return;
      setTimeout(() => {
        eventBus.$emit('updateApi'); // 更新风险态势数据
      }, 5000);

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
        // console.log('预警信息',_warningData)
        // 绘制跳动点位
        this.clearMarkerAndBox();
        
        this.warningData = {
          poi:_warningData['文物点经纬度'],
          pointName:_warningData['文物点名称'],
          time: _warningData['发生时间'] || time,
          warningType: _warningData['事件类型'] || '火灾预警',
          warningValue: _warningData.value + _warningData.valueUnit || _warningData['当前温度'] || _warningData['最大温度'] || _warningData['检测值'] || '暂无',
        };

        if(!this.isShowModel){
          // 显示预警弹框
          this.showYJ_Box(this.warningData,this.warningData.poi);
          this.addWarningMarkerToMap({},this.warningData.poi);
        }
        
      }
    },
    send: function () {
      this.socket.send(params);
    },
    close: function () {
      //   console.log('socket已经关闭')
    },

    // 语音播报
    // 语音播报的函数
    handleSpeak(text) {
      this.msg.text = text; // 文字内容
      this.msg.lang = 'zh-CN'; // 使用的语言:中文
      this.msg.volume = 1; // 声音音量：1
      this.msg.rate = 1; // 语速：1
      this.msg.pitch = 1; // 音高：1
      this.synth.speak(this.msg); // 播放
    },
    // 语音停止
    handleStop(e) {
      this.msg.text = e;
      this.msg.lang = 'zh-CN';
      this.synth.cancel(this.msg);
    },

    // 根据页面视角，获取视角数据
    getViewData() {
      let lon = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(viewer.camera.position).longitude);
      let lat = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(viewer.camera.position).latitude);
      let heading = viewer.camera.heading;
      let pitch = viewer.camera.pitch;
      //   console.log(
      //     'lon:',
      //     lon,
      //     'lat:',
      //     lat,
      //     'heading:',
      //     heading,
      //     'pitch:',
      //     pitch
      //   )
    },
  },
};
</script>

<style scoped lang="less">
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  background: url('../assets/img4/BJ.jpg') no-repeat center;
  background-size: 100% 100%;
}

.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* box-shadow: inset 1px 0 150px 70px #11264dcc; */
  background: radial-gradient(rgba(0, 40, 97, 0) 20%, rgb(0, 0, 0));
  pointer-events: none;
  z-index: 1;
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
    background: url('../assets/img4/sousuo.png') no-repeat center;
    background-size: 100% auto;
  }
  .item:nth-child(2) {
    background: url('../assets/img4/ren.png') no-repeat center;
    background-size: 100% 100%;
  }
}
.warning {
  position: absolute;
  width: 42px;
  height: 42px;
  top: 275px;
  left: 618px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin: 5px 0;
  cursor: pointer;
  display: none;
}
.red {
  background: url('../assets/img2/map-icon5.png') no-repeat center;
  background-size: 100% 100%;
}
.green {
  background: url('../assets/img2/map-icon4.png') no-repeat center;
  background-size: 117.5% auto;
  background-position: -5px -5px;
}
.back {
  position: absolute;
  width: 42px;
  height: 42px;
  top: 180px;
  right: 600px;
  z-index: 13;
  background: url('../assets/img4/fanhui.png') no-repeat center;
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
  bottom: 80px;
  right: 545px;
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
  // .item:nth-child(3) {
  //   background: url("../assets/img2/map-r.png") no-repeat center;
  //   background-size: 100% 100%;
  // }
  // .item:nth-child(4) {
  //   background: url("../assets/img2/m-icon-add.png") no-repeat center;
  //   background-size: 100% 100%;
  // }
  .item:nth-child(3) {
    background: url('../assets/img3/pic-icon.png') no-repeat center;
    background-size: 100% 100%;
  }
}
.fireTrigger {
  height: 50px;
  width: 30px;
  cursor: pointer;
}
</style>
