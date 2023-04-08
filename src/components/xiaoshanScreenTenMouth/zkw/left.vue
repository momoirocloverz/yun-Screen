<template>
  <div class="container">
    <Box :height="'365px'" :bgSrc="require('../../../assets/imgBoxBg/z-box1-bg.png')">
      <div class="part-1">
        <Title :text="'AI感知'"></Title>
        <div class="box-inner">
          <div class="left">
            <div class="chart">
              <LeftChart :chartData="aigzList" />
              <div class="centerInfo">
                <span>95%</span>
                <span>在线率</span>
              </div>
              <span class="chart-title">设备在线率</span>
            </div>
            <!-- <div class="legend">
              <div class="item" v-for="(item, index) in aigzList" :key="index">
                <div class="row-1">
                  <span
                    class="point"
                    :style="{
                      background: item.color
                    }"
                  ></span>
                  <span class="name">{{ item.name }}</span>
                </div>
                <span class="num">{{ item.onLineNum }}</span>
              </div>
            </div> -->
          </div>
          <div class="right">
            <div
              class="item"
              v-for="(item, index) in aigzList"
              :key="index"
              :style="{
                background: `url(${item.bgSrc}) no-repeat center`,
                'background-size': '100% 100%',
              }"
            >
              <img :src="item.imgSrc" alt="" srcset="" />
              <div class="info">
                <span class="name">{{ item.name }}</span>
                <div class="value">
                  <span>{{ item.total }}</span>
                  <span>/</span>
                  <span>{{ item.onLineNum }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'489px'" :bgSrc="require('../../../assets/imgBoxBg/z-box2-bg.png')">
      <div class="part-2">
        <Title :text="'多跨协同'"> </Title>
        <div class="img"></div>
        <div class="chart">
          <LeftLine :chartData="lineData" />
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '../components/box';
import Title from '../components/title';

import {} from '../../../api/xsApi';
import {} from '../../../api/xsApi2';
import { eventBus } from '@/main';
import LeftChart from './components/leftChart';
import LeftLine from './components/leftEchartLine';

export default {
  components: { Box, Title, LeftChart, LeftLine },
  data() {
    return {
      aigzList: [
        {
          name: '视频监控',
          total: '476',
          onLineNum: '179',
          color: '#0cd8d6',
          imgSrc: require('../../../assets/img4/icon1.png'),
          bgSrc: require('../../../assets/img4/icon1-bg.png'),
        },
        {
          name: '水压监测',
          total: '10',
          onLineNum: '10',
          color: '#ff7675',
          imgSrc: require('../../../assets/img4/icon2.png'),
          bgSrc: require('../../../assets/img4/icon2-bg.png'),
        },
        {
          name: '烟感监测',
          total: '192',
          onLineNum: '103',
          color: '#14b0ff',
          imgSrc: require('../../../assets/img4/icon3.png'),
          bgSrc: require('../../../assets/img4/icon3-bg.png'),
        },
        {
          name: '电流检测',
          total: '6',
          onLineNum: '6',
          color: '#0d91fe',
          imgSrc: require('../../../assets/img4/icon4.png'),
          bgSrc: require('../../../assets/img4/icon4-bg.png'),
        },
        {
          name: '火感监测',
          total: '60',
          onLineNum: '60',
          color: '#0380ff',
          imgSrc: require('../../../assets/img4/icon5.png'),
          bgSrc: require('../../../assets/img4/icon5-bg.png'),
        },
        {
          name: '气温监测',
          total: '60',
          onLineNum: '60',
          color: '#f5ba45',
          imgSrc: require('../../../assets/img4/icon6.png'),
          bgSrc: require('../../../assets/img4/icon6-bg.png'),
        },
      ],
      lineData: [
        {
          name: '1月',
          value: '2050',
        },
        {
          name: '2月',
          value: '1808',
        },
        {
          name: '3月',
          value: '404',
        },
        {
          name: '4月',
          value: '1046',
        },
        {
          name: '5月',
          value: '1125',
        },
        {
          name: '6月',
          value: '1002',
        },
        {
          name: '7月',
          value: '1256',
        },
        {
          name: '8月',
          value: '1327',
        },
        {
          name: '9月',
          value: '958',
        },
      ],
    };
  },
  created() {
    eventBus.$on('data_back', () => {});
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 93.5%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .part-1 {
    .box-inner {
      width: 100%;
      height: 290px;
      display: flex;
      .left {
        width: 35%;
        height: 100%;
        .chart {
          width: 100%;
          height: 100%;
          position: relative;
          .centerInfo {
            position: absolute;
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background: url('../../../assets/img4/c-bg.png') no-repeat center;
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span:nth-child(1) {
              font-family: DINPro-Medium;
              font-size: 20px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #ffffff;
            }
            span:nth-child(2) {
              font-family: AdobeHeitiStd-Regular;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #a8b0d0;
            }
          }
          .chart-title {
            display: flex;
            justify-content: center;
            width: 100%;
            position: absolute;
            // left: 50%;
            top: 67%;
            // transform: translateX(-50%);
            font-family: AdobeHeitiStd-Regular;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 2px;
            color: #f6f8fd;
          }
        }
        // .legend {
        //   width: 100%;
        //   height: 50%;
        //   display: flex;
        //   justify-content: space-between;
        //   align-content: space-around;
        //   flex-wrap: wrap;
        //   .item {
        //     width: 50%;
        //     height: 32px;
        //     display: flex;
        //     flex-direction: column;
        //     align-items: flex-start;
        //     justify-content: center;
        //     .row-1 {
        //       height: 15px;
        //       display: flex;
        //       flex-direction: row;
        //       align-items: center;
        //       .point {
        //         width: 7px;
        //         height: 7px;
        //         border-radius: 50%;
        //         margin-right: 5px;
        //       }
        //       .name {
        //         font-family: AdobeHeitiStd-Regular;
        //         font-size: 14px;
        //         font-weight: normal;
        //         font-stretch: normal;
        //         letter-spacing: 0px;
        //         color: #a8b0d0;
        //       }
        //     }
        //     .num {
        //       font-family: DINPro-Medium;
        //       font-size: 16px;
        //       font-weight: normal;
        //       font-stretch: normal;
        //       letter-spacing: 0px;
        //       color: #f0f2f5;
        //       margin-left: 13px;
        //     }
        //   }
        // }
      }
      .right {
        width: 65%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        .item {
          width: 145px;
          height: 85px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 45px;
            height: 45px;
            margin-right: 5px;
          }
          .info {
            width: 90px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .name {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #97c3e9;
              opacity: 0.8;
            }
            .value {
              span:nth-child(1) {
                font-family: DINPro-Medium;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #c5ddfe;
              }
              span:nth-child(2) {
                font-family: AdobeHeitiStd-Regular;
                font-size: 17px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #a8b0d0;
                opacity: 0.4;
                margin: 0 1px;
              }
              span:nth-child(3) {
                font-family: DINPro-Medium;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #22d1a4;
              }
            }
          }
        }
      }
    }
  }
  .part-2 {
    .img {
      width: 100%;
      height: 287px;
      background: url('../../../assets/img4/Ai-img.png') no-repeat top;
      background-size: 100% 100%;
    }
    .chart {
      width: 100%;
      height: 130px;
    }
  }
}
</style>
