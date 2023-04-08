<template>
  <div id="header" class="header">
    <div class="headerImg">
      <div class="weather">
        <img
          src="../../../assets/img2/area-icon.png"
          alt=""
          srcset=""
          width="25px"
          height="28px"
        />
        <span>{{ addressName }}</span>
        <span>天气</span>
        <span>晴</span>
        <img
          src="../../../assets/img2/weather-icon.png"
          alt=""
          srcset=""
          width="30px"
          height="30px"
        />
      </div>
      <span class="header-text" @click="routerJump('/page2')">{{
        headTitle
      }}</span>
      <div class="date">
        <span>{{ currentTime[0] }}</span>
        <span>{{ currentTime[1] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import map3d from "../../map-3d";
import "../../../js/CesiumSurvey.js";
import "../../../js/CesiumPop.js";
import { eventBus } from "../../../main";
import "../../../js/CesiumTrail.js";
import common from '@/api/common';

// import { get_ZHSL_RegionTreeData } from '../../../api/api'

let nowTime;
let isSimple3DShow = false;

export default {
  name: "map-header",
  data() {
    return {
      msg: "map-header",
      addressName: "萧山",
      headTitle: "萧山区文物安全监测处置应用系统",
      nowTime: nowTime,
      currentTime: [],
      currentRegion: "1_0",
      parentRegion: "1_0",
      currentRegionCenter: "",
      currentRegionPoi: "",
      currentNetName: "",
      currentRegionColor: "",
      regionList: [],
      childNetInfo: [],

      currentNetPoi_1: "",
      currentNetPoi_2: ""
    };
  },
  created() {
    eventBus.$on("changeRegionVal_2", msg => {
      console.log("jjkjkjk", msg);
      this.currentRegion = msg.newVal;
      this.parentRegion = msg.parentRegionId;
    });
  },
  methods: {
    // 遍历tree数据，获取某一个对象的子集
    getTreeDataChildList(treeData, p_val) {
      if (this.childNetInfo instanceof Array && this.childNetInfo.length > 0)
        return;
      for (let i in treeData) {
        if (treeData[i].newVal === p_val) {
          console.log("当前区域全部信息", treeData[i]);
          this.childNetInfo = treeData[i].childList;
          this.currentRegionCenter = treeData[i].netCenter;
          this.currentRegionPoi = treeData[i].netPoi;
          this.currentNetPoi_1 = treeData[i].netPoi_1
            ? treeData[i].netPoi_1
            : "";
          this.currentNetPoi_2 = treeData[i].netPoi_2
            ? treeData[i].netPoi_2
            : "";
          this.currentNetName = treeData[i].netName;
          this.currentRegionColor = treeData[i].netColor;
          this.parentRegion =
            p_val.split("_")[0] * 1 - 1 + "_" + treeData[i].netPid;
        } else {
          this.getTreeDataChildList(treeData[i].childList, p_val);
        }
      }
    },
    // 当前地区改变响应
    currentRegionChange(val) {
      console.log("klklkl", val);
      let currentNewValue = val;
      if (val == "0_1") {
        currentNewValue = "1_0";
      }
      this.childNetInfo = [];
      this.getTreeDataChildList(this.regionList, currentNewValue);
      let curRegionNum = currentNewValue ? currentNewValue.substr(0, 1) : "";
      let currentRegionType = "1";
      let currentRegionId = currentNewValue ? currentNewValue.substr(2) : "";
      // console.log('this.parentRegion',this.parentRegion)
      let currentRegionPid = this.parentRegion.split("_")[1];

      if (
        currentRegionPid.indexOf("-") < 0 &&
        currentRegionId != "-2" &&
        currentRegionId != "-3"
      ) {
        // 行政区划
        currentRegionType = "1";
      } else if (currentRegionId == "-2" || currentRegionPid == "-2") {
        // 三大区块
        currentRegionType = "2";
      } else if (currentRegionId == "-3" || currentRegionPid == "-3") {
        // 六大流域
        currentRegionType = "3";
      }
      let params = {
        currentRegion: currentNewValue,
        currentPoi: this.currentRegionPoi,
        currentRegionLevel: curRegionNum,
        currentRegionId: currentRegionId,
        childNetInfo: this.childNetInfo,
        currentRegionCenter: this.currentRegionCenter,
        currentRegionName: this.currentNetName,
        currentRegionColor: this.currentRegionColor,
        netPid: this.parentRegion,
        currentNetPoi_1: this.currentNetPoi_1,
        currentNetPoi_2: this.currentNetPoi_2,
        currentRegionType: currentRegionType
      };
      eventBus.$emit("currentRegionChange", params);
    },
    // --------------------------------------------------------------------------------------------------------
    win_Simple3D() {
      if (isSimple3DShow) {
        map3d.methods.removeSimple3D();
        this.map_addLocalTerrain();
        isSimple3DShow = false;
      } else {
        map3d.methods.addSimple3D();
        this.map_addelTerrain();
        map3d.methods.removeTilesetWall();
        isSimple3DShow = true;
      }
    },
    /**添加cesium提供的全球30米分辨率地形数据*/
    map_addWorldTerrain() {
      map3d.methods.addWorldTerrain();
      map3d.methods.initTilesetWall(5.0);
    },
    /**添加ArcGIS提供的全球高分辨率地形数据*/
    map_adArcGISTerrain() {
      map3d.methods.addArcgisTerrain();
    },
    map_addLocalTerrain() {
      map3d.methods.addLocalTerrain();
      map3d.methods.initTilesetWall(5.0);
    },
    map_addLocalImageLayer() {
      map3d.methods.addLocalImageLayer();
    },
    map_addelTerrain() {
      map3d.methods.addelTerrain();
      map3d.methods.initTilesetWall(2.0);
    },
    map_addDarkMapLayer() {
      map3d.methods.addDarkMapLayer();
    },
    map_addgoogleImageLayer() {
      map3d.methods.addgoogleImageLayer();
    },
    map_addarcgisImageLayer() {
      map3d.methods.addarcgisImageLayer();
    },
    map_addtdtImageLayer() {
      map3d.methods.addtdtImageLayer();
    },
    map_addtdtVectorLayer() {
      map3d.methods.addtdtVectorLayer();
    },

    resizeState() {
      let winWidth = Number(document.documentElement.clientWidth);
      let stateWidth = winWidth - common.navigationWidth;
    },

    logout() {
      this.$router.push("/login");
      userInfo.userInfo = "";
      userInfo.passWord = "";
      localStorage.setItem("userName", "");
      localStorage.setItem("passWord", "");
    },
    // 获取当前时间
    getCurrentTime() {
      let weeks = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      );
      setInterval(() => {
        let time = new Date().Format("yyyy-MM-dd HH:mm:ss");
        this.currentTime = time.split(" ");
      }, 1000);
    },
    // 路由跳转
    routerJump(path) {
      this.$router.push(path);
    }
  },
  mounted() {
    //this.nowTimes();
    // this.getRegionList();
    this.getCurrentTime();
    this.resizeState();
    window.onresize = () => {
      return (() => {
        this.resizeState();
      })();
    };
  }
};
</script>

<style scoped lang="less">
.header {
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 105px;
  color: #f2f2f2;
}
.headerImg {
  position: absolute;
  width: 100%;
  height: 100px;
  top: 0;
  background: url("../../../assets/img2/header.png") center top no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-text {
    font-size: 38px;
    font-weight: 900;
    flex: 1;
    text-align: center;
    margin-bottom: 20px;
    font-family: "HYYaKuHeiW";
    cursor: pointer;

    color: #ffffff;
    text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
    background: linear-gradient(180deg, #ffffff 26%, #41b2f9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .weather {
    padding-left: 30px;
    margin-top: 20px;
    width: 300px;
    letter-spacing: 1px;
    color: #6686cc;
    display: flex;
    align-items: center;
    span:nth-child(2) {
      font-family: SourceHanSansCN-Regular;
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 36px;
      letter-spacing: 0px;
      color: #00a8ff;
      margin-left: 5px;
    }
    span:nth-child(3) {
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 36px;
      letter-spacing: 0px;
      color: #fefefe;
      margin-left: 20px;
    }
    span:nth-child(4) {
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 36px;
      letter-spacing: 0px;
      color: #ebbb2d;
      margin: 0 5px;
    }
  }
  .date {
    padding-right: 30px;
    margin-top: 20px;
    width: 300px;
    text-align: right;
    font-family: SourceHanSansCN-Regular;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 36px;
    letter-spacing: 0px;
    color: #fefefe;
    span:nth-child(2) {
      color: #00a8ff;
    }
  }
}
</style>
