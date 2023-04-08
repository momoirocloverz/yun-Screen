<template>
  <div class="box_right">
    <TitleBox
      :title="`${culturalRelicsName}人员列表`"
      :imgSrc="require('../../../assets/img/box-bg3.png')"
      :titleLeft="false"
    >
      <div class="people-list">
        <Table
          :tableColumns="tableColumns_peopleList"
          :tableData="tableData_peopleList"
          :optionList="optionList_peopleList"
          :hasIndex="false"
          @table_row_click="peopleList_tableRow_click"
          @BtnClick="peopleList_btnClick"
        />
      </div>
    </TitleBox>

    <TitleBox
      :title="`${culturalRelicsName}周边力量`"
      :height="'280px'"
      :imgSrc="require('../../../assets/img/box-bg4.png')"
      :titleLeft="false"
    >
      <div class="round-power">
        <div class="text text-1">{{culturalRelicsName}}</div>
        <div class="text text-2">周边力量</div>
        <div class="item item-1">
          <div class="info">
            <div class="name">
              <span>{{ roundPower[0].name }}</span>
              <img
                src="../../../assets/img/video-icon1@2x.png"
                alt=""
                srcset=""
                width="15px"
                height="12px"
              />
            </div>
            <div class="department">{{ roundPower[0].department }}</div>
          </div>
        </div>
        <div class="item item-2">
          <div class="info">
            <div class="name">
              <span>{{ roundPower[0].name }}</span>
              <img
                src="../../../assets/img/video-icon1@2x.png"
                alt=""
                srcset=""
                width="15px"
                height="12px"
              />
            </div>
            <div class="department">{{ roundPower[1].department }}</div>
          </div>
        </div>
        <div class="item item-3">
          <div class="info">
            <div class="name">
              <span>{{ roundPower[0].name }}</span>
              <img
                src="../../../assets/img/video-icon1@2x.png"
                alt=""
                srcset=""
                width="15px"
                height="12px"
              />
            </div>
            <div class="department">{{ roundPower[2].department }}</div>
          </div>
        </div>
      </div>
    </TitleBox>

    <div
      class="camera"
      v-for="(item, index) in videoIds"
      :key="index"
    >
      <div class="camera-title">{{ item.name }}</div>
      <VideoBox
        :index="index"
        :videoId="item.videoId"
        :width="'90%'"
        :height="'135px'"
        :imgSrc="item.imgSrc"
      />
    </div>
  </div>
</template>

<script>
import TitleBox from '../publicComponents/titleBox'
import Table from '../publicComponents/table'
import VideoBox from '../publicComponents/videoBox'
import { eventBus } from '../../../main'
export default {
  name: '',
  components: { TitleBox, Table, VideoBox },
  data() {
    return {
      culturalRelicsName: '务本堂',

      // 人员列表
      tableColumns_peopleList: [
        {
          name: '职位',
          props: 'job',
        },
        {
          name: '姓名',
          props: 'name',
        },
      ],
      tableData_peopleList: [
        {
          job: '安全责任人',
          name: '李晓文',
          btnName: ['视频连线'],
        },
        {
          job: '文保巡查员',
          name: '李晓文',
          btnName: ['查看位置'],
        },
      ],
      optionList_peopleList: [
        {
          name: '视频连线',
          bgImg: require('@/assets/img/v-btn1.png'),
          btnWidth: '110px',
        },
        {
          name: '查看位置',
          bgImg: require('@/assets/img/m-btn1.png'),
          btnWidth: '110px',
        },
      ],
      // 周边力量列表
      roundPower: [
        {
          department: '区消防救援大队',
          name: '李晓文',
        },
        {
          department: '区公安分局',
          name: '李晓文',
        },
        {
          department: '旅游局',
          name: '李晓文',
        },
      ],
      // 附近监控
      videoIds: [
        {
          name: '现场监控1',
          videoId: '1',
          // imgSrc: '../../../../static/images/culturalSave/poster_1.png',
          imgSrc:
            'http://localhost:8089/static/images/culturalSave/poster_1.png',
        },
        {
          name: '现场监控2',
          videoId: '2',
          // imgSrc: '../../../../static/images/culturalSave/poster_2.png',
          imgSrc:
            'http://localhost:8089/static/images/culturalSave/poster_2.png',
        },
      ],
    }
  },
  created() {
    // 点击地图文物点位，获取侧边信息
    eventBus.$on('culturalChnage', (msg) => {
      console.log('msg', msg)
      this.culturalRelicsName = msg.name
    })
  },
  methods: {
    // 人员列表点击
    peopleList_tableRow_click() {},
    // 人员列表按钮点击
    peopleList_btnClick(row, btnName) {
      console.log(row, btnName)
    },
    // 周边力量点击
    roundPower_tableRow_click() {},
    // 周边力量列表按钮点击
    roundPower_btnClick(row, btnName) {
      console.log(row, btnName)
    },
  },
}
</script>

<style lang="less" scoped>
.box_right {
  width: 95%;
  height: 100%;
  padding-left: 30px;
  .people-list {
    width: 97%;
    height: calc(100% - 70px);
  }
  .round-power {
    width: 97%;
    height: calc(100% - 70px);
    background: url('../../../assets/img/circum-bg.png') no-repeat center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .text {
      font-family: 'STFangsong';
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      z-index: 10;
      font-weight: 900;
      font-style: italic;
    }
    .text-1 {
      font-size: 20px;
      line-height: 27px;
      color: #e4f3fe;
    }
    .text-2 {
      font-size: 30px;
      line-height: 27px;
      color: #ffc63e;
    }
    .item {
      width: 178px;
      height: 70px;
      padding-top: 2px;
      box-sizing: border-box;
      position: absolute;
      .info {
        width: 105px;
        height: 40px;
        .name {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 3px;
          box-sizing: border-box;
          span {
            font-family: SourceHanSansCN-Bold;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #add8ff;
          }
          img {
            cursor: pointer;
          }
        }
        .department {
          font-family: SourceHanSansCN-Bold;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 20px;
          letter-spacing: 0px;
          color: #95c2eb;
        }
      }
    }
    .item-1 {
      background: url('../../../assets/img/c1.png') no-repeat;
      top: 30px;
      left: 30px;
      .info {
        margin-left: 8px;
      }
    }
    .item-2 {
      background: url('../../../assets/img/c2.png') no-repeat;
      padding-top: 15px;
      top: 140px;
      left: 65px;
      .info {
        margin-left: 8px;
      }
    }
    .item-3 {
      background: url('../../../assets/img/c3.png') no-repeat;
      top: 70px;
      left: 245px;
      .info {
        margin-left: 58px;
      }
    }
  }
  .camera {
    width: 431px;
    height: 177px;
    background: url('../../../assets/img/video-box.png') no-repeat center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    .camera-title {
      width: 100%;
      text-align: center;
      font-family: SourceHanSansCN-Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      color: #a1d0f8;
      margin: 3px 0;
    }
  }
}
</style>
