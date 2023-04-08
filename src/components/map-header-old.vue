<template>
  <div
    id="header"
    class="header"
  >
    <div class="headerImg">
      <div class="weather">
        <span>天气：</span>
        <span>东南风3级</span>
        <span>气象预警：</span>
        <span>无</span>
      </div>
      <span style="font-size:32px;font-weight:900;flex:1;text-align:center;margin-bottom:20px;font-family:'Trebuchet MS'">{{headTitle}}</span>
      <div class="date">
        <span>{{ currentTime }}</span>
      </div>
    </div>
    <!-- <div class="select-userInfo">
      <div class="header-left">
        <div class="row row1">
          <span class="poi-img"></span>
          <span>当前地区：</span>
          <el-cascader
            v-model="currentRegion"
            style="width:130px;"
            size="mini"
            :options="regionList"
            :show-all-levels="false"
            :props="{
              checkStrictly: true,
              children: 'childList',
              label: 'netName',
              value: 'newVal',
              emitPath: false,
              disabled: ''
            }"
            @change="currentRegionChange"
          >
          </el-cascader>
        </div>
      </div>
      <div class="header-right">
        <span class="user-img"></span>
        <div class="userInfo">
          <span>Admin</span>
        </div>
        <div class="login">
          <span @click="logout"></span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import map3d from './map-3d'
import '../js/CesiumSurvey.js'
import '../js/CesiumPop.js'
import { eventBus } from '../main'
import '../js/CesiumTrail.js'
import '../../static/common.js'

import { get_ZHSL_RegionTreeData } from '../api/api'

let nowTime
let isSimple3DShow = false

export default {
  name: 'map-header',
  data() {
    return {
      msg: 'map-header',
      headTitle: '杭州市萧山区文物安全监管驾驶舱',
      nowTime: nowTime,
      currentTime: 'currentTime',
      currentRegion: '1_0',
      parentRegion: '1_0',
      currentRegionCenter: '',
      currentRegionPoi: '',
      currentNetName: '',
      currentRegionColor: '',
      regionList: [],
      childNetInfo: [],

      currentNetPoi_1: '',
      currentNetPoi_2: '',
    }
  },
  created() {
    eventBus.$on('changeRegionVal', (msg) => {
      console.log('klklkl--jjkjkjk', msg.newVal)
      // this.currentRegion = msg.newVal;
      // this.parentRegion = msg.parentRegionId;
    })
    eventBus.$on('changeRegionVal_2', (msg) => {
      console.log('jjkjkjk', msg)
      this.currentRegion = msg.newVal
      this.parentRegion = msg.parentRegionId
    })
  },
  methods: {
    // 获取行政区划treeData
    getRegionList() {
      // let params = { net_pid: "0" };
      get_ZHSL_RegionTreeData().then((res) => {
        this.regionList = this.handleTreeData(res.data)
        console.log('地区列表：', this.regionList)
        eventBus.$emit('getAllRegionData', this.regionList)
      })
    },

    // 遍历tree数据，给每个对象都添加一个新属性
    handleTreeData(treeData) {
      for (var i in treeData) {
        treeData[i].newVal = treeData[i].netLevel + '_' + treeData[i].netId
        if (treeData[i].netId === '-3') {
          let index_1 = null
          let id_1 = ''
          let index_2 = null
          let id_2 = ''
          let long_river = {}
          treeData[i].childList.map((item, index) => {
            if (item.netId === '-10') {
              index_1 = index
              id_1 = item.netId
              long_river = { ...item, netPoi_1: item.netPoi }
            } else if (item.netId === '-13') {
              index_2 = index
              id_2 = item.netId
              long_river.netPoi_2 = item.netPoi
            }
          })
          long_river.netId = `${id_1}*${id_2}`
          long_river.netName = '长江'
          long_river.newVal = long_river.netLevel + '_' + long_river.netId
          treeData[i].childList.splice(index_2, 1)
          treeData[i].childList.splice(index_1, 1)
          treeData[i].childList.push(long_river)
        }
        if (treeData[i].childList && treeData[i].childList.length > 0) {
          this.handleTreeData(treeData[i].childList)
        }
      }
      return treeData
    },
    // 遍历tree数据，获取某一个对象的子集
    getTreeDataChildList(treeData, p_val) {
      if (this.childNetInfo instanceof Array && this.childNetInfo.length > 0)
        return
      for (let i in treeData) {
        if (treeData[i].newVal === p_val) {
          console.log('当前区域全部信息', treeData[i])
          this.childNetInfo = treeData[i].childList
          this.currentRegionCenter = treeData[i].netCenter
          this.currentRegionPoi = treeData[i].netPoi
          this.currentNetPoi_1 = treeData[i].netPoi_1
            ? treeData[i].netPoi_1
            : ''
          this.currentNetPoi_2 = treeData[i].netPoi_2
            ? treeData[i].netPoi_2
            : ''
          this.currentNetName = treeData[i].netName
          this.currentRegionColor = treeData[i].netColor
          this.parentRegion =
            p_val.split('_')[0] * 1 - 1 + '_' + treeData[i].netPid
        } else {
          this.getTreeDataChildList(treeData[i].childList, p_val)
        }
      }
    },
    // 当前地区改变响应
    currentRegionChange(val) {
      console.log('klklkl', val)
      let currentNewValue = val
      if (val == '0_1') {
        currentNewValue = '1_0'
      }
      this.childNetInfo = []
      this.getTreeDataChildList(this.regionList, currentNewValue)
      let curRegionNum = currentNewValue ? currentNewValue.substr(0, 1) : ''
      let currentRegionType = '1'
      let currentRegionId = currentNewValue ? currentNewValue.substr(2) : ''
      // console.log('this.parentRegion',this.parentRegion)
      let currentRegionPid = this.parentRegion.split('_')[1]

      if (
        currentRegionPid.indexOf('-') < 0 &&
        currentRegionId != '-2' &&
        currentRegionId != '-3'
      ) {
        // 行政区划
        currentRegionType = '1'
      } else if (currentRegionId == '-2' || currentRegionPid == '-2') {
        // 三大区块
        currentRegionType = '2'
      } else if (currentRegionId == '-3' || currentRegionPid == '-3') {
        // 六大流域
        currentRegionType = '3'
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
        currentRegionType: currentRegionType,
      }
      eventBus.$emit('currentRegionChange', params)
    },
    // --------------------------------------------------------------------------------------------------------
    win_Simple3D() {
      if (isSimple3DShow) {
        map3d.methods.removeSimple3D()
        this.map_addLocalTerrain()
        isSimple3DShow = false
      } else {
        map3d.methods.addSimple3D()
        this.map_addelTerrain()
        map3d.methods.removeTilesetWall()
        isSimple3DShow = true
      }
    },
    /**添加cesium提供的全球30米分辨率地形数据*/
    map_addWorldTerrain() {
      map3d.methods.addWorldTerrain()
      map3d.methods.initTilesetWall(5.0)
    },
    /**添加ArcGIS提供的全球高分辨率地形数据*/
    map_adArcGISTerrain() {
      map3d.methods.addArcgisTerrain()
    },
    map_addLocalTerrain() {
      map3d.methods.addLocalTerrain()
      map3d.methods.initTilesetWall(5.0)
    },
    map_addLocalImageLayer() {
      map3d.methods.addLocalImageLayer()
    },
    map_addelTerrain() {
      map3d.methods.addelTerrain()
      map3d.methods.initTilesetWall(2.0)
    },
    map_addDarkMapLayer() {
      map3d.methods.addDarkMapLayer()
    },
    map_addgoogleImageLayer() {
      map3d.methods.addgoogleImageLayer()
    },
    map_addarcgisImageLayer() {
      map3d.methods.addarcgisImageLayer()
    },
    map_addtdtImageLayer() {
      map3d.methods.addtdtImageLayer()
    },
    map_addtdtVectorLayer() {
      map3d.methods.addtdtVectorLayer()
    },

    resizeState() {
      let winWidth = Number(document.documentElement.clientWidth)
      let stateWidth = winWidth - common.navigationWidth
      /*
        document.documentElement.getElementsByClassName(
          "sys-state"
        )[0].style.width = stateWidth + "px";
      */
    },

    logout() {
      // console.log('fgfgf', this.parentRegion)
      // if (this.parentRegion == '1_-1') {
      //   this.currentRegion = '1_0'
      //   return
      // } else {
      //   this.currentRegion = this.parentRegion
      //   this.currentRegionChange(this.currentRegion)
      // }

      this.$router.push('/login')
      userInfo.userInfo = ''
      userInfo.passWord = ''
      localStorage.setItem('userName', '')
      localStorage.setItem('passWord', '')
    },
    // 获取当前时间
    getCurrentTime() {
      let weeks = new Array(
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      )
      setInterval(() => {
        let time = new Date().Format('yyyy-MM-dd HH:mm:ss')
        let day = new Date().getDay()
        let week = weeks[day]
        let timeArr = time.split(' ')
        timeArr.splice(1, 0, week)
        this.currentTime = timeArr.join(' ')
      }, 1000)
    },
  },
  mounted() {
    //this.nowTimes();
    this.getRegionList()
    this.getCurrentTime()
    this.resizeState()
    window.onresize = () => {
      return (() => {
        this.resizeState()
      })()
    }
  },
  // beforeDestroy() {
  //   this.clear();
  // }
}
</script>

<style scoped lang='less'>
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
  height: 105px;
  top: 0;
  background: url('../assets/img/header.png') center top no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .weather {
    // position: absolute;
    // top: 20px;
    // left: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    width: 300px;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #9cc5ff;
    span:nth-child(2) {
      margin-right: 20px;
    }
  }
  .date {
    // position: absolute;
    // top: 20px;
    // right: 20px;
    margin-bottom: 20px;
    margin-right: 20px;
    width: 300px;
    text-align: right;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    // line-height: 30px;
    letter-spacing: 0px;
    color: #9cc5ff;
  }
}
.select-userInfo {
  position: absolute;
  width: 100%;
  height: 46px;
  top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-left {
    height: 100%;
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    .row {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      font-family: MicrosoftYaHei;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 24px;
      letter-spacing: 2px;
      color: #ffffff;
    }
    .row1 .poi-img {
      display: inline-block;
      width: 42px;
      height: 40px;
      background: url('../assets/header/icon1.png');
    }
    .row2 {
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        .poi-img {
          display: inline-block;
          width: 34px;
          height: 34px;
          background: url('../assets/header/icon1.png');
        }
      }
    }
  }
}

.header-right {
  height: 100%;
  padding-right: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  font-family: MicrosoftYaHei;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #b1d0ff;
  .user-img {
    display: inline-block;
    width: 42px;
    height: 40px;
    background: url('../assets/header/icon2.png');
  }
}
.header-right .login,
.userInfo,
.date {
  padding-left: 10px;
  box-sizing: border-box;
  // color: #fff;
  font-style: normal;
  /* font-family: IconFont; */
  font-size: 14px;
}
.header-right .login {
  // border-left: 1px solid #d5f8ff42;
  cursor: pointer;
  display: flex;
  align-items: center;
  // margin-left: 20px;
}
.header-right .login span {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url('../assets/header/re-icon.png');
}
.header-right .userInfo {
  margin-right: 5px;
}

.sys-title {
  position: absolute;
  height: 77px;
  width: 980px;
  /* background: url("../assets/header/title.png"); */
  z-index: 5;
}

.sys-logo {
  float: left;
  margin: 8px 0 0 20px;
  width: 46px;
  height: 46px;
  filter: drop-shadow(0px 0px 14px #ffffff);
}

.sys-bar {
  font-size: 15px;
  float: left;
  margin: 25px 0 0 6px;
  font-style: italic;
}

.sys-version {
  font-size: 12px;
  float: left;
  margin: 31px 0 0 10px;
  font-style: italic;
}

.navigation-icons {
  position: absolute;
  left: 720px;
  top: 34px;
  z-index: 6;
  width: 100%;
}

.navigation-fai {
  margin: 0 14px 0 2px;
  font-size: 16px;
  cursor: pointer;
}

.sys-tools {
  position: absolute;
  right: 20px;
  top: 7px;
  color: #00ffff;
}

.sys-user {
  float: left;
  margin: 0 25px 0 0;
}

.sys-user-icon {
  float: left;
  margin: 3px 10px 0 0;
}

.sys-tools-fai {
  margin: 0 0 0 20px;
  font-size: 18px;
  cursor: pointer;
}

.sys-state {
  position: absolute;
  left: 0;
  top: 34px;
  height: 40px;
  color: #00ffff;
  background-color: #11264dd1;
}

.sys-state-user {
  float: left;
  font-style: italic;
  border-bottom: solid 2px #00ffff;
  padding: 0 20px 3px 15px;
  font-size: 15px;
}

.sys-state-icon {
  float: left;
  margin: 5px 15px 0 520px;
  font-size: 18px;
}

.el-menu--horizontal > .el-menu-item {
  font-size: 15px;
  min-width: 100px;
}
</style>
