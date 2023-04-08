<template>
  <div class="container">
    <div class="v2">
      <Box :height="'350px'" :bgSrc="require('../../../assets/imgBoxBg/zbz-box7-bg.png')">
        <div class="part-1">
          <Title :text="'物品堆积识别'"></Title>
          <div class="shrinker">
            <div class="tj">
              <div class="item" @click="showListBox('物品堆积识别', item)" v-for="(item, index) in tj_1" :key="index" :style="{ backgroundImage: `url(${item.imgSrc})` }">
                <div class="info">
                  <span>{{ item.name }}</span>
                  <span>{{ item.num }}</span>
                </div>
              </div>
            </div>
            <div class="camCon">
              <template v-for="(item, index) in cam1List">
                <div class="camItem" :key="index">
                  <!-- <div class="camImg" :style="{ backgroundImage: `url(${item.img})` }"></div> -->
                  <div class="video">
                    <div class="inner" v-if="true">
                      <VideoBox :index="index" :videoId="item.cameraId" :width="`${223 / 192}rem`" :height="`${123 / 192}rem`" :autoplay="false" />
                    </div>
                    <div class="inner" v-else>
                      <VideoBoxEasy :index="index" :videoId="item.cameraId" :width="'1.989583rem'" :height="'1.375rem'" :autoplay="true" />
                    </div>
                  </div>
                  <div class="camInfo">
                    <div class="camInfLeft">
                      <div class="camInfIcon"></div>
                      <div class="camName">{{ item.name }}</div>
                    </div>
                    <!-- <div class="camTime">{{ item.time }}</div> -->
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </Box>
      <Box :height="'350px'" :bgSrc="require('../../../assets/imgBoxBg/zbz-box7-bg.png')">
        <div class="part-1">
          <Title :text="'违规用火识别'"></Title>
          <div class="shrinker">
            <div class="tj">
              <div class="item" @click="showListBox('违规用火识别', item)" v-for="(item, index) in tj_2" :key="index" :style="{ backgroundImage: `url(${item.imgSrc})` }">
                <div class="info">
                  <span>{{ item.name }}</span>
                  <span>{{ item.num }}</span>
                </div>
              </div>
            </div>
            <div class="camCon">
              <template v-for="(item, index) in cam2List">
                <div class="camItem" :key="index">
                  <!-- <div class="camImg" :style="{ backgroundImage: `url(${item.img})` }"></div> -->
                  <div class="video">
                    <div class="inner" v-if="true">
                      <VideoBox :index="index" :videoId="item.cameraId" :width="`${223 / 192}rem`" :height="`${123 / 192}rem`" :autoplay="false" />
                    </div>
                    <div class="inner" v-else>
                      <VideoBoxEasy :index="index" :videoId="item.cameraId" :width="'1.989583rem'" :height="'1.375rem'" :autoplay="true" />
                    </div>
                  </div>
                  <div class="camInfo">
                    <div class="camInfLeft">
                      <div class="camInfIcon"></div>
                      <div class="camName">{{ item.name }}</div>
                    </div>
                    <!-- <div class="camTime">{{ item.time }}</div> -->
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </Box>
      <Box :height="'221px'" :bgSrc="require('../../../assets/imgBoxBg/zbz-box8-bg.png')">
        <div class="part-2">
          <Title :text="'紧急事件处理信息表'">
            <!-- <div class="btn withCursor" @click="popEvent">查看详情</div> -->
          </Title>
          <div class="table-jjsj">
            <Table
              :tableData="tableData_jjsj"
              :tableColumns="tableColumn_jjsj"
              :isStripe="true"
              :headTextColor="'rgba(255,255,255, 0.6)'"
              :headHeight="`${35 / 192}rem`"
              :headBgColor="'rgba(107,154,233, 0.2)'"
              :rowHeight="`${34 / 192}rem`"
              :rowTextColor="'#a8b0d0'"
            >
              <template slot="status" slot-scope="scope">
                <span
                  @click="popEvent"
                  :style="{
                    color: scope.row.status == '1' ? '#a8b0d0' : '#ffc231',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }"
                  >{{ scope.row.status == '1' ? '已处理' : '处理中' }}</span
                >
              </template>
              <template slot="content" slot-scope="scope">
                <span
                  :style="{
                    fontSize: '14px',
                    color: '#a8b0d0',
                  }"
                  >{{ scope.row.content }}</span
                >
              </template>
            </Table>
          </div>
        </div>
      </Box>
    </div>
    <!-- 二级页面 -->
    <TableList :isShow="isShowTableList" :logo1="logo1" :logo2="logo2" @close="closeListBox" />
  </div>
</template>
<script>
import { eventBus } from '@/main';
import { get_hzcz_data } from '../../../api/xsApi3';
import Box from '../components/box';
import Title from '../components/title';
import Table from './components/table';
import LeftChart from './components/leftChart';
import EchartPie from './components/echartPie3';
import LineChart from './components/echartLine4';
import VideoBox from './components/videoBox';
import VideoBoxEasy from './components/videoPlayerBox';
// 二级页面
import TableList from './secondPage/tableList';
export default {
  components: {
    Box,
    Title,
    Table,
    EchartPie,
    LeftChart,
    LineChart,
    VideoBox,
    VideoBoxEasy,
    TableList,
  },
  data() {
    return {
      isShowTableList: false,
      logo1: '',
      logo2: '',
      tj_1: [
        {
          name: '数量',
          num: '24',
          imgSrc: require('../../../assets/zbz/info-icon7.png'),
        },
        {
          name: '累计报警',
          num: '47',
          imgSrc: require('../../../assets/zbz/info-icon2.png'),
        },
        {
          name: '已处理',
          num: '35',
          imgSrc: require('../../../assets/zbz/info-icon3.png'),
        },
        {
          name: '待处理',
          num: '7',
          imgSrc: require('../../../assets/zbz/info-icon4.png'),
        },
      ],
      tj_2: [
        {
          name: '数量',
          num: '34',
          imgSrc: require('../../../assets/zbz/info-icon8.png'),
        },
        {
          name: '累计报警',
          num: '66',
          imgSrc: require('../../../assets/zbz/info-icon2.png'),
        },
        {
          name: '已处理',
          num: '32',
          imgSrc: require('../../../assets/zbz/info-icon3.png'),
        },
        {
          name: '待处理',
          num: '19',
          imgSrc: require('../../../assets/zbz/info-icon4.png'),
        },
      ],
      cam1List: [
        {
          name: '务本堂',
          cameraId: '1f8caaebace94be185335ef94823227d',
          isPic: true,
          img: require('../../../assets/zbz/1.png'),
          time: '2022-10-12 10:18',
        },
        {
          name: '务本堂离火监控',
          cameraId: 'fbba799c888e4c0b9892bb50d9ff3a72',
          isPic: true,
          img: require('../../../assets/zbz/2.png'),
          time: '2022-10-13 10:18',
        },
      ],
      cam2List: [
        {
          name: '务本堂红外',
          cameraId: '006da0ab55cd408da54d1f7f0c39e391',
          isPic: true,
          img: require('../../../assets/zbz/3.png'),
          time: '2022-10-04 09:18',
        },
        {
          name: '务本堂南走廊',
          cameraId: 'bc1cf460171847288a564632272e069e',
          isPic: true,
          img: require('../../../assets/zbz/4.png'),
          time: '2022-10-02 10:18',
        },
      ],
      // part3
      tableColumn_jjsj: [
        {
          name: '时间',
          props: 'createTime',
          flex: 1.5,
          format: (row) => {
            return row.createTime;
          },
        },
        {
          name: '内容',
          props: 'content',
        },
        {
          name: '状态',
          props: 'status',
          withSlot: true,
        },
        {
          name: '处理人',
          props: 'name',
        },
      ],
      tableData_jjsj: [
        {
          task: '务本堂',
          local: '入口1',
          status: '0',
          name: '张文',
          content: '烟感报警',
          createTime: '2022-10-12 10:14:45',
        },
        {
          task: '务本堂',
          local: '东侧',
          status: '1',
          name: '李杰',
          content: '一键报警',
          createTime: '2022-10-12 10:18:35',
        },
        {
          task: '务本堂',
          local: '东侧',
          status: '1',
          name: '王坤',
          content: '水压报警',
          createTime: '2022-10-12 11:24:12',
        },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    popEvent() {
      eventBus.$emit('showEvent', false);
    },
    getData() {
      get_hzcz_data().then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          if (shorter) {
            let data_1 = shorter['物品堆积识别'];
            let data_2 = shorter['违规用火识别'];
            this.tj_1[0].num = data_1.deviceSum;
            this.tj_1[1].num = data_1.alarmSum;
            this.tj_1[2].num = data_1.doCount;
            this.tj_1[3].num = data_1.toDoCount;
            this.tj_2[0].num = data_2.deviceSum;
            this.tj_2[1].num = data_2.alarmSum;
            this.tj_2[2].num = data_2.doCount;
            this.tj_2[3].num = data_2.toDoCount;
          }
        }
      });
    },
    showListBox(logo1, item) {
      this.logo1 = logo1;
      this.logo2 = item.name;
      if (item.num * 1 > 0) {
        this.isShowTableList = true;
      } else {
        this.$message({
          type: 'warning',
          message: '暂无数据',
        });
      }
    },
    closeListBox() {
      this.isShowTableList = false;
    },
  },
};
</script>
<style lang="less" scoped>
@keyframes circleRoatation {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.container {
  width: 100%;
  height: 97%;
  .v2 {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .part-1 {
      .tj {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          width: 213px;
          height: 50px;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100%;
          margin-bottom: 5px;
          display: flex;
          .info {
            width: 120px;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 60px;
            span:nth-child(1) {
              font-size: 16px;
              width: 80px;
              color: #b7bedc;
            }
            span:nth-child(2) {
              font-size: 24px;
              color: #ffffff;
              font-family: DINPro-Medium;
            }
          }
        }
      }
    }
    .part-2 {
      width: 100%;
      height: 245px;
      .btn {
        width: 80px;
        height: 25px;
        background: #122050;
        border: 1px solid #6aade5;
        box-shadow: inset #6aade5 0 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #6aade5;
        font-size: 15px;
      }
    }
  }
}
.fakeCamera {
  width: 210px;
  height: 150px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
}
.withCursor {
  cursor: pointer;
}
.shrinker {
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  box-sizing: border-box;
}
.camImg {
  width: 223px;
  height: 123px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-bottom: 5px;
}
.video {
  width: 223px;
  height: 123px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.camCon {
  //   height: 300px;
  display: flex;
  justify-content: space-between;
}
.camItem {
  border: solid 1px #4191f0;
  box-sizing: border-box;
}
.camInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.camInfLeft {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.camInfIcon {
  width: 20px;
  height: 20px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../../../assets/zbz/pot.png);
}
.camName {
  color: #fff;
  font-size: 12px;
}
.camTime {
  letter-spacing: 1px;
  color: #a8b0d0;
  font-size: 12px;
}
</style>
