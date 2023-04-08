<template>
  <div class="box">
    <TitleBox :title="'文物档案'" />
    <div class="wwgk">
      <div
        class="item"
        v-for="(item, index) in wwgk_data"
        :key="index"
        @click="wwgk_click(item, index)"
      >
        <img
          :src="currentIndex === index ? item.active_imgSrc : item.imgSrc"
          alt=""
          srcset=""
        />
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="num">
            <span>{{ item.num }}</span>
            <span>处</span>
          </div>
        </div>
      </div>
    </div>
    <div class="listTitle">{{ wwListTitle }}列表 ({{ wwListTotal }}处)</div>
    <div class="list" ref="wwList">
      <div
        class="item"
        v-for="(item, index) in wwListData"
        :key="index"
        @click="listClick(item)"
      >
        <div class="top">
          <div class="left">
            <div class="row">
              <span>名称：</span>
              <span>{{ item.publishName }}</span>
            </div>
            <div class="row">
              <span>文保类别：</span>
              <span>{{ item.category }}</span>
            </div>
            <div class="row">
              <span>风险等级：</span>
              <span>{{ item.maxLevel }}</span>
            </div>
          </div>
          <div class="right">
            <img :src="getWWImg(item.publishName)" alt="" srcset="" />
          </div>
        </div>
        <!-- <div class="bottom">
          <span>文物地址：</span>
          <span>{{ item.address }}</span>
        </div> -->
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        small
        @current-change="pageNumChange"
        :current-page="pageNum"
        :page-size="pageSize"
        :pager-count="5"
        layout="prev, pager, next"
        :total="wwListTotal"
      >
      </el-pagination>
    </div>

    <div class="camera">
      <div class="camera-title">
        <div class="left">文物实时监控</div>
        <div class="right">
          <el-select
            v-model="cameraIndexCode"
            size="mini"
            placeholder="监控选择菜单"
            style="width:136px;"
            @change="selectVideoChange"
          >
            <el-option v-for="item in videoList" :key="item.cameraIndexCode" :label="item.cameraName" :value="item.cameraIndexCode">
            </el-option>
          </el-select>
          <button class="btn" @click="CameraAllBoxShow">全部</button>
        </div>
      </div>
      <VideoBox
        :index="index"
        :videoId="cameraIndexCode"
        :width="'94%'"
        :height="'152px'"
        :autoplay="false"
      />
    </div>

    <DragBox />
    <BasicInfoBox
      :isShow="basicBoxShow"
      :basicData="basicData"
      @close="basicBoxHidden"
    />
    <CameraAllBox :isShow="cameraAllBoxShow" @close="CameraAllBoxHidden" />
  </div>
</template>

<script>
import TitleBox from "../publicComponents/titleBox";
import Table from "../publicComponents/table";
import VideoBox from "../publicComponents/videoBox";

import DragBox from "../publicComponents/dragBox";

import BasicInfoBox from "./components/basicInfoBox";
import CameraAllBox from "./components/cameraAllBox";

// api接口
import { wwgk, wbd_list,wbd_list2,getHikVideoList } from "../../../api/xsApi";

import { eventBus } from "../../../main";

export default {
  name: "",
  components: {
    TitleBox,
    Table,
    VideoBox,
    DragBox,
    BasicInfoBox,
    CameraAllBox
  },
  data() {
    return {
      wwListTitle: "",
      wwListTotal: null,
      currentIndex: 1,
      wwgk_data: [
        {
          name: "国保单位",
          id: "14da5819da904c4ab1d9d94a961ca27a",
          num: "3",
          imgSrc: require("../../../assets/img2/icon1-n.png"),
          active_imgSrc: require("../../../assets/img2/icon1-s.png")
        },
        {
          name: "省保单位",
          id: "cef2a80fbea6df89578ad5599b67b71f",
          num: "9",
          imgSrc: require("../../../assets/img2/icon2-n.png"),
          active_imgSrc: require("../../../assets/img2/icon2-s.png")
        },
        {
          name: "市保单位",
          id: "2bf3be523de944ec3ee1ad832a7a2587",
          num: "54",
          imgSrc: require("../../../assets/img2/icon3-n.png"),
          active_imgSrc: require("../../../assets/img2/icon3-s.png")
        },
        {
          name: "市级文保点",
          id: "b16db07f34112b9b0fc6d2b54214e0aa",
          num: "143",
          imgSrc: require("../../../assets/img2/icon4-n.png"),
          active_imgSrc: require("../../../assets/img2/icon4-s.png")
        }
      ],
      wwListData: [
        // {
        //   name: "务本堂",
        //   type: "古建筑",
        //   level: "一级",
        //   address: "萧山区进化镇欢潭村",
        //   imgSrc: require("../../../assets/img2/wbt.png")
        // },
        // {
        //   name: "许家南大房",
        //   type: "古建筑",
        //   level: "一级",
        //   address: "萧山区瓜沥镇党山老街的南端",
        //   imgSrc: require("../../../assets/img2/xjndf.png")
        // },
        // {
        //   name: "汤寿潜故居",
        //   type: "古建筑",
        //   level: "一级",
        //   address: "萧山区进化镇大汤坞新村",
        //   imgSrc: require("../../../assets/img2/tsqgj.png")
        // }
      ],
      basicBoxShow: false,
      basicData: {},
      videoList: [
        // {
        //   name: "文物实时监控",
        //   videoId: "37bc9ca73d8c467a94c95576dfccd9d1",
        //   imgSrc:
        //     "http://223.65.209.139:8888/xswl-screen/static/images/culturalSave/务本堂离火监控.png"
        // }
      ],
      cameraIndexCode: "37bc9ca73d8c467a94c95576dfccd9d1",
      cameraAllBoxShow: false,

      // 文物列表搜索条件
      pageNum: 1,
      pageSize: 10,
      rankId: "",
      fxlx: "",
      fxdj: "",
      address: ""
    };
  },
  created() {
    eventBus.$on("gotoStreet", msg => {
      this.getWWGK_data(msg[0], msg[1]);
      this.pageSize = 10;
      this.address = msg[1];
      if (msg[2]) {
        this.get_wbdList_data(); //需要传入镇街名称查点位
      }
    });
    eventBus.$on("data_back", msg => {
      this.getWWGK_data("0", "0");
      this.pageSize = 10;
      this.pageNum = 1;
      this.address = "";
      if (!msg[0]) {
        this.get_wbdList_data();
      }
    });
    // 左边风险等级点击
    eventBus.$on("riskLevelList", msg => {
      console.log("risk", msg);
      this.currentIndex = -1;
      // this.wwListTotal = '0'
      this.rankId = "";
      this.pageSize = 10;
      this.pageNum = 1;
      this.fxlx = msg.fxlx;
      this.fxdj = msg.fxdj;
      this.get_wbdList_data();
      this.wwListTitle = msg.title;
    });
    // 地图点位点击
    eventBus.$on('poiClick',msg=>{
      
      let params={
        pageSize:10,
        currentPage:1,
        publishName:msg.poiName
      }
      console.log(msg,params)
      wbd_list(params).then(res=>{
        this.basicData = res.data.data.list[0];
        this.basicBoxShow = true;
      })
    })
  },
  mounted() {
    this.getHikVideoList()
    this.getWWGK_data("0", "0");
    this.rankId = this.wwgk_data[this.currentIndex].id;
    this.pageSize = 10;
    this.pageNum = 1;
    this.fxlx = "";
    this.fxdj = "";
    this.get_wbdList_data("init");
  },
  methods: {
    // 获取海康监控列表
    getHikVideoList(){
      getHikVideoList().then(res=>{
        console.log('海康视频列表',res.data.data.list)
        this.videoList = res.data.data.list
      })
    },
    selectVideoChange(videoId){
      this.cameraIndexCode = videoId
    },
    // 获取文物概况数据
    getWWGK_data(level, name) {
      let params = {
        level,
        name
      };
      wwgk(params).then(res => {
        console.log("文物概况", res.data.data);
        let result = res.data.data[0];
        this.wwgk_data[0].num = result.reportNum1;
        this.wwgk_data[1].num = result.reportNum2;
        this.wwgk_data[2].num = result.reportNum3;
        this.wwgk_data[3].num = result.reportNum4;

        this.wwListTitle = this.wwgk_data[this.currentIndex].name;
        // this.wwListTotal = this.wwgk_data[this.currentIndex].num
      });
    },
    // 文物概况点击
    wwgk_click(item, index) {
      eventBus.$emit("changeToNormalPoi");
      this.currentIndex = index;
      this.wwListTitle = this.wwgk_data[index].name;
      // this.wwListTotal = this.wwgk_data[index].num
      this.rankId = item.id;
      this.pageSize = 10;
      this.pageNum = 1;
      this.fxlx = "";
      this.fxdj = "";
      this.get_wbdList_data();
    },
    // 文物列表分页
    pageNumChange(val) {
      console.log(val);
      this.pageNum = val;
      this.get_wbdList_data();
    },
    // 获取文保点列表
    get_wbdList_data(logo = "") {
      let params = {
        address: this.address,
        category: "",
        currentPage: this.pageNum,
        id: "",
        fxdj: this.fxdj,
        fxlx: this.fxlx,
        isGraden: 0,
        pageSize: this.pageSize,
        publishName: "",
        rank: this.rankId,
        trialList: []
      };
      let params2 = {
        address: this.address,
        category: "",
        currentPage: 1,
        id: "",
        fxdj: this.fxdj,
        fxlx: this.fxlx,
        isGraden: 0,
        pageSize: 300,
        publishName: "",
        rank: this.rankId,
        trialList: []
      };
      wbd_list2(params2).then(res => {
        console.log("文保点列表2", res.data.data);
        eventBus.$emit("drawCulturalPoi", res.data.data.list, logo);
      });
      wbd_list(params).then(res => {
        console.log("文保点列表", res.data.data);
        this.wwListData = res.data.data.list;
        this.wwListTotal = res.data.data.total;
        this.$refs.wwList.scrollTop = 0;
        // eventBus.$emit("drawCulturalPoi", res.data.data.list, logo);
      });
    },
    getWWImg(name) {
      let img;
      try {
        img = require(`../../../assets/wwImg/${name}.png`);
        return img;
      } catch (error) {
        return require(`../../../assets/wwImg/务本堂.png`);
      }

      // if (img) {
      //   return img
      // } else {
      //   return require(`../../../assets/wwImg/务本堂.png`)
      // }
    },
    // 点击右侧列表
    listClick(item) {
      this.basicData = { ...item };
      this.basicBoxShow = true;
    },
    basicBoxHidden() {
      this.basicBoxShow = false;
    },
    CameraAllBoxShow() {
      this.cameraAllBoxShow = true;
    },
    CameraAllBoxHidden() {
      this.cameraAllBoxShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  user-select: none;
  .wwgk {
    width: 100%;
    height: 160px;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 50%;
      height: 50%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      img {
        width: 52px;
        height: 52px;
        margin: 0 15px;
      }
      .info {
        .name {
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
        .num {
          span:nth-child(1) {
            font-family: Arial-BoldMT;
            font-size: 30px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #c9dfff;
          }
          span:nth-child(2) {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #98a9c5;
          }
        }
      }
    }
  }
  .listTitle {
    width: 100%;
    height: 40px;
    background: url("../../../assets/img2/title2.png") center no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 40px;
    font-family: MicrosoftYaHei-Bold;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #e0eefe;
    box-shadow: 0px 1px 3px 0px rgba(0, 17, 36, 0.22);
    margin: 10px 0;
  }
  .list {
    width: 100%;
    height: calc(100% - 525px);
    overflow: auto;
    .item {
      margin-top: 10px;
      width: 100%;
      height: 125px;
      background: url("../../../assets/img2/hr-line.png") no-repeat bottom;
      background-size: 100% 100%;
      .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 105px;
        .left {
          .row {
            margin: 5px 0;
            display: flex;
            align-items: center;
            span:nth-child(1) {
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 32px;
              letter-spacing: 2px;
              color: #95c2eb;
            }
            span:nth-child(2) {
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 32px;
              letter-spacing: 0px;
              color: #49c5ff;
              max-width: 160px;
              display: inline-block;
              overflow: hidden; //溢出隐藏
              white-space: nowrap; //禁止换行
              text-overflow: ellipsis; //...
            }
          }
        }
        .right {
          width: 228px;
          height: 94px;
          background: url("../../../assets/img2/frame.png") no-repeat center;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 210px;
            height: 76px;
          }
        }
      }
      .bottom {
        width: 100%;
        margin-top: 10px;
        span:nth-child(1) {
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 32px;
          letter-spacing: 2px;
          color: #95c2eb;
        }
        span:nth-child(2) {
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 32px;
          letter-spacing: 0px;
          color: #49c5ff;
        }
      }
    }
  }
  .pagination {
    text-align: right;
  }
  .camera {
    width: 475px;
    height: 238px;
    background: url("../../../assets/img2/video-box2.png") no-repeat center;
    background-size: 100% 100%;
    background-position: -9px -5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2px;
    box-sizing: border-box;
    padding-right: 20px;
    .camera-title {
      width: 100%;
      height: 52px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 40px;
      padding-right: 10px;
      margin-bottom: 5px;
      .left {
        font-family: MicrosoftYaHei;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 2px;
        color: #d1eaff;
      }
      .right {
        display: flex;
        .btn {
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 5px;
          width: 65px;
          height: 29px;
          background: url("../../../assets/img2/all-btn.png") no-repeat center;
          background-size: 100% 100%;
          font-family: MicrosoftYaHei-Bold;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 2px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
