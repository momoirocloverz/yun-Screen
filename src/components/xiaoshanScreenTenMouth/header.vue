<template>
  <div id="header" class="header">
    <div class="headerImg">
      <div class="nameCon">萧山区文物安全监测处置应用系统</div>
      <div class="weather">
        <img class="address" src="../../assets/img2/area-icon.png" />
        <span>{{ addressName }}</span>
        <span>{{ temperature }}℃</span>
        <span>{{ weather }}</span>
        <img class="weather-img" :src="require(`../../assets/weatherImg/${weatherImgCode}@1x.png`)" />
      </div>
      <div class="date">
        <span>{{ currentTime[0] }}</span>
        <span>{{ currentTime[1] }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import '../../js/CesiumSurvey.js';
import '../../js/CesiumPop.js';
import { eventBus } from '../../main';
import '../../js/CesiumTrail.js';
import common from '@/api/common';
import { getWeatherData, getWeatherWarning } from '../../api/xsApi';
let isSimple3DShow = false;
export default {
  name: 'map-header',
  data() {
    return {
      msg: 'map-header',
      addressName: '萧山区',
      titleAddressName: '萧山区',
      headTitle: '萧山区文物安全监测处置应用系统',
      currentTime: [],
      // 天气
      weather: '晴',
      temperature: '30',
      weatherImgCode: '0',
    };
  },
  created() {
    eventBus.$on('gotoStreet', (msg) => {
      this.addressName = msg;
      // if (msg[1] == "进化镇") {
      //   this.titleAddressName = "进化镇";
      // } else {
      //   this.getWeatherData();
      //   this.titleAddressName = "萧山区";
      // }
    });
    eventBus.$on('data_back', (msg) => {
      //   this.addressName = '萧山区';
      //   this.titleAddressName = '萧山区';
      this.getWeatherData();
    });
  },
  methods: {
    // 获取天气信息
    getWeatherData() {
      getWeatherData().then((res) => {
        let result = res.data.results[0].now;
        this.weather = result.text;
        this.temperature = result.temperature;
        this.weatherImgCode = result.code;
      });
    },
    // 获取天气预警信息
    // getWeatherWarning() {
    //   getWeatherWarning().then(res => {
    //     console.log("天气预警", res.data.results[0]);
    //   });
    // },
    resizeState() {
      let winWidth = Number(document.documentElement.clientWidth);
      let stateWidth = winWidth - common.navigationWidth;
    },
    logout() {
      this.$router.push('/login');
      userInfo.userInfo = '';
      userInfo.passWord = '';
      localStorage.setItem('userName', '');
      localStorage.setItem('passWord', '');
    },
    // 获取当前时间
    getCurrentTime() {
      let weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
      setInterval(() => {
        let time = new Date().Format('yyyy-MM-dd HH:mm:ss');
        this.currentTime = time.split(' ');
      }, 1000);
    },
    // 路由跳转
    routerJump(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    this.getWeatherData(); // 获取天气数据
    // this.getWeatherWarning(); //获取天气预警数据
    this.getCurrentTime();
    this.resizeState();
    window.onresize = () => {
      return (() => {
        this.resizeState();
      })();
    };
  },
};
</script>
<style scoped lang="less">
.header {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 80px;
  color: #f2f2f2;
}
.headerImg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: url('../../assets/img4/toubu.png') center top no-repeat;
  background-size: 100% auto;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 13px;
  box-sizing: border-box;
  .weather {
    box-sizing: border-box;
    padding-left: 30px;
    // width: 350px;
    letter-spacing: 1px;
    color: #6686cc;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .address {
      width: 18px;
      height: 22px;
    }
    .weather-img {
      width: 24px;
      height: auto;
      margin-left: 10px;
    }
    span:nth-child(2) {
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      line-height: 17px;
      letter-spacing: 0px;
      color: #fff;
      margin-left: 10px;
    }
    span:nth-child(3) {
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      line-height: 17px;
      letter-spacing: 0px;
      color: #88aad5;
      margin-left: 15px;
      margin-right: 9px;
    }
    span:nth-child(4) {
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      line-height: 17px;
      letter-spacing: 0px;
      color: #88aad5;
    }
    span:nth-child(5) {
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      letter-spacing: 0px;
      color: #88aad5;
    }
  }
  .date {
    box-sizing: border-box;
    padding-right: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span:nth-child(1) {
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      line-height: 14px;
      letter-spacing: 0px;
      color: #88aad5;
      margin-right: 10px;
    }
    span:nth-child(2) {
      font-family: DS-Digital;
      letter-spacing: 0px;
      font-size: 24px;
      line-height: 18px;
      color: #fefefe;
      width: 72px;
    }
  }
}
.nameCon {
  position: absolute;
  left: 0;
  right: 0;
  top: 7px;
  text-align: center;
  font-family: STSongti-SC-Black;
  font-size: 30px;
  letter-spacing: 3px;
  color: transparent;
  background-image: linear-gradient(rgba(255, 255, 255, 1.0), rgba(196, 230, 250, 0.9));
  background-clip: text;
  -webkit-background-clip: text;
}
</style>
