<template>
  <div class="container">
    <Box
      :height="'100%'"
      :bgSrc="require('../../../assets/imgBoxBg/z-box5-bg.png')"
    >
      <div class="part-1">
        <Title :text="'AI布控'"> </Title>
        <div class="list">
          <div class="item" v-for="(item, index) in listData" :key="index">
            <div class="info-box">
              <div class="name">{{ item.name }}</div>
              <div class="info">
                <span>{{ item.time }}</span>
                <span>{{ item.text }}</span>
              </div>
              <div class="btn" @click="itemClick(index)">
                <span>详情</span>
                <img
                  :class="[index == currentIndex ? 'open' : '']"
                  src="../../../assets/img4/arrow.png"
                  alt=""
                  srcset=""
                />
              </div>
            </div>
            <div v-if="index == currentIndex" class="time-line">
              <el-timeline>
                <el-timeline-item timestamp="" placement="top">
                  <div class="content">
                    <div class="system">
                      <span>文物安全监测处置应用系统</span>
                      <span>22/10/12 09:12:05</span>
                    </div>
                    <span class="info">
                      发布一网统管任务
                    </span>
                  </div>
                </el-timeline-item>
                <el-timeline-item timestamp="" placement="top">
                  <div class="content">
                    <div class="qzzx">
                      <span>区智中心</span>
                      <span>22/10/12 09:12:29</span>
                    </div>
                    <span class="info">
                      签收成功
                    </span>
                  </div>
                </el-timeline-item>
                <el-timeline-item timestamp="" placement="top">
                  <div class="content">
                    <div class="street">
                      <span>镇街</span>
                      <span>22/10/12 10:18:51</span>
                    </div>
                    <span class="info">
                      提交整改反馈
                    </span>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
        <div class="chart">
          <LineChart
            :chartData_1="lineData_1"
            :chartData_2="lineData_2"
            :chartData_3="lineData_3"
            :chartData_4="lineData_4"
          />
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from "../components/box";
import Title from "../components/title";
import LineChart from "./components/echartLine4";

export default {
  components: { Box, Title, LineChart },
  data() {
    return {
      currentIndex: 0,
      listData: [
        {
          name: "智能感知预警",
          time: "2022-10-12",
          text: "巡查员上报：文物损坏"
        },
        {
          name: "火灾灾害预警",
          time: "2022-10-12",
          text: "巡查员上报：文物损坏"
        },
        {
          name: "智能感知预警",
          time: "2022-10-12",
          text: "巡查员上报：文物损坏"
        }
      ],

      lineData_1: [
        {
          name: "益农镇",
          value: "10"
        },
        {
          name: "北干街道",
          value: "30"
        },
        {
          name: "进化镇",
          value: "20"
        },
        {
          name: "楼塔镇",
          value: "35"
        },
        {
          name: "新塘街道",
          value: "24"
        },
        {
          name: "瓜沥镇",
          value: "30"
        }
      ],
      lineData_2: [
        {
          name: "益农镇",
          value: "30"
        },
        {
          name: "北干街道",
          value: "20"
        },
        {
          name: "进化镇",
          value: "35"
        },
        {
          name: "楼塔镇",
          value: "24"
        },
        {
          name: "新塘街道",
          value: "30"
        },
        {
          name: "瓜沥镇",
          value: "10"
        }
      ],
      lineData_3: [
        {
          name: "益农镇",
          value: "20"
        },
        {
          name: "北干街道",
          value: "35"
        },
        {
          name: "进化镇",
          value: "24"
        },
        {
          name: "楼塔镇",
          value: "30"
        },
        {
          name: "新塘街道",
          value: "10"
        },
        {
          name: "瓜沥镇",
          value: "22"
        }
      ],
      lineData_4: [
        {
          name: "益农镇",
          value: "14"
        },
        {
          name: "北干街道",
          value: "24"
        },
        {
          name: "进化镇",
          value: "10"
        },
        {
          name: "楼塔镇",
          value: "16"
        },
        {
          name: "新塘街道",
          value: "9"
        },
        {
          name: "瓜沥镇",
          value: "20"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    itemClick(index) {
      if (index == this.currentIndex) {
        this.currentIndex = -1;
      } else {
        this.currentIndex = index;
      }
    }
  }
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
    .list {
      width: 100%;
      height: 570px;
      margin-bottom: 15px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        width: 445px;
        min-height: 52;
        margin: 2px 0;
        box-sizing: border-box;
        // background-color: #6f90fe37;
        // border-bottom: 2px solid #6f90fe;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .info-box {
          width: 100%;
          height: 52px;
          background-color: #6f90fe37;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .name {
            width: 127px;
            height: 30px;
            background: url("../../../assets/img4/tag-r.png") no-repeat center;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            font-weight: normal;
            font-style: italic;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #ffd1d1;
          }
          .info {
            width: 200px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            span:nth-child(1) {
              font-family: SourceHanSansCN-Regular;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1px;
              color: #a8b0d0;
            }
            span:nth-child(2) {
              font-family: SourceHanSansCN-Regular;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #ffffff;
            }
          }
          .btn {
            width: 72px;
            height: 30px;
            background: url("../../../assets/img4/more-btn.png") no-repeat
              center;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 5;
            span {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #a8b0d0;
              margin-right: 2px;
            }
            img {
              width: 14px;
              height: 7px;
              transform: rotateZ(-90deg);
            }
            .open {
              transform: rotateZ(0deg);
            }
          }
        }
        .time-line {
          width: 100%;
          height: 380px;
          // background: red;
          .el-timeline {
            margin-top: 30px;
            padding-left: 5px;
            .el-timeline-item {
              .content {
                width: 410px;
                height: 100px;
                position: relative;
                top: -20px;
                .system {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  margin-bottom: 10px;
                  width: 410px;
                  justify-content: space-between;

                  span:nth-child(1) {
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffe6e1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 227px;
                    height: 34px;
                    border-radius: 17px;
                    border: 1px solid #9672bb;
                    background-color: #9672bb1c;
                  }
                  span:nth-child(2) {
                    font-family: DINPro-Medium;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #a8b0d0;
                    margin-left: 10px;
                  }
                }
                .qzzx {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  margin-bottom: 10px;
                  width: 410px;
                  justify-content: space-between;

                  span:nth-child(1) {
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffe6e1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100px;
                    height: 34px;
                    border-radius: 17px;
                    border: 1px solid #9672bb;
                    background-color: #9672bb1c;
                  }
                  span:nth-child(2) {
                    font-family: DINPro-Medium;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #a8b0d0;
                    margin-left: 10px;
                  }
                }
                .street {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  margin-bottom: 10px;
                  width: 410px;
                  justify-content: space-between;

                  span:nth-child(1) {
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffe6e1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100px;
                    height: 34px;
                    border-radius: 17px;
                    border: 1px solid #9672bb;
                    background-color: #9672bb1c;
                  }
                  span:nth-child(2) {
                    font-family: DINPro-Medium;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #a8b0d0;
                    margin-left: 10px;
                  }
                }
                .info {
                  font-family: MicrosoftYaHei;
                  font-size: 18px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #a8b0d0;
                }
              }
            }
          }
        }
      }
    }
    .chart {
      width: 100%;
      height: 225px;
    }
  }
}
</style>
