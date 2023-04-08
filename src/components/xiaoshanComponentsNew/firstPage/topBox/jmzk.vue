<template>
  <div
    class="mask"
    v-show="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">文物一张网</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <div class="top">
          <div
            :class="['item', currentIndex === index ? 'item-active' : 'item-normal']"
            v-for="(item, index) in tabData"
            :key="index + 40"
            @click="tabClick(item, index)"
          >
            <img
              v-if="currentIndex === index"
              :src="item.imgSrc_active"
              alt=""
              srcset=""
            />
            <img
              v-else
              :src="item.imgSrc"
              alt=""
              srcset=""
            />
            <div class="info">
              <span>{{ item.name }}</span>
              <span>{{ item.num }}</span>
            </div>
          </div>
        </div>
        <div
          class="camera"
          v-show="isShow_1"
        >
          <div class="left">
            <div class="key-word">
              <span @click="cameraSearch">
                <i class="el-icon-search"></i>
              </span>
              <input
                type="text"
                placeholder="搜索标题关键字"
                v-model="keyWord"
              />
            </div>
            <div class="list">
              <div
                class="item"
                v-for="(item, index) in cameraList"
                :key="index + 10"
              >
                <div
                  class="pBox"
                  @click="parentClick(index)"
                >
                  <img
                    v-show="item.isSelected || item.list.length <= 0"
                    src="../../../../assets/img2/sub.png"
                    alt=""
                    srcset=""
                    width="16px"
                    height="16px"
                  />
                  <img
                    v-show="!item.isSelected && item.list.length > 0"
                    src="../../../../assets/img2/add.png"
                    alt=""
                    srcset=""
                    width="16px"
                    height="16px"
                  />
                  <span>{{ item.name }}</span>
                </div>
                <div
                  v-show="item.isSelected"
                  :class="['cBox', cameraIndexCode == value.cameraIndexCode ? 'cBox-active' : '']"
                  v-for="(value, index_c) in item.list"
                  :key="index_c + 1000"
                  @click="childClick(value)"
                >
                  <img
                    src="../../../../assets/img3/v.png"
                    alt=""
                    srcset=""
                  />
                  <span>{{ value.cameraName }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="right"
            v-if="isShow"
          >
            <div v-if="cameraType == 'hik'">
              <VideoBox
                :index="0"
                :videoId="cameraIndexCode"
                :width="'4.0625rem'"
                :height="'2.39584rem'"
                :autoplay="false"
              />
            </div>
            <div v-if="cameraType == 'h265'||cameraType=='h265_self'">
              <VideoBoxEasy
                :index="0"
                :videoId="cameraIndexCode"
                :width="'4.0625rem'"
                :height="'2.39584rem'"
                :autoplay="true"
                :cameraType="cameraType"
              />
            </div>
            <div v-if="cameraType == 'h264'">
              <VideoBoxXG
                :index="0"
                :videoId="cameraIndexCode"
                :width="'4.0625rem'"
                :height="'2.39584rem'"
                :autoplay="true"
              />
            </div>
          </div>
        </div>
        <div
          class="water"
          v-show="isShow_2"
        >
          <div
            class="item"
            v-for="(item, index) in waterList"
            :key="index + 20"
          >
            <!-- <img
              src="../../../../assets/img3/eg-img.png"
              alt=""
              srcset=""
            > -->
            <div class="gauge">
              <div class="box">
                <Gauge :chartData="item.value" />
              </div>
            </div>
            <div class="row1">
              <div>水压值</div>
              <div>{{ item.valueStr || '0.00Mpa' }}</div>
            </div>
            <div class="row2">
              <div>设备名称：{{ item.srcName }}</div>
              <div>设备位置：{{ item.bumpPointName }}</div>
            </div>
          </div>
        </div>

        <div
          class="electricity"
          v-show="false"
        >
          <div
            class="item"
            v-for="(item, index) in electricityList"
            :key="index + 30"
          >
            <img
              src="../../../../assets/img3/e-icon.png"
              alt=""
            />
            <div class="info">
              <div class="row">{{ item.detectionValue && item.detectionValue.split(':')[0] }}</div>
              <div class="row">{{ item.detectionValue && item.detectionValue.split(':')[1] }}</div>
              <div class="bottom">
                <div class="row">设备名称：{{ item.srcName }}</div>
                <div class="row">设备位置：{{ item.bumpPointName }}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="electricity"
          v-show="isShow_3"
        >
          <div class="search-box">
            <span>文保单位:</span>
            <el-select
              clearable
              v-model="searchParams.pointId"
              filterable
              placeholder="文物"
              :style="{ width: `${150 / 192}rem !important` }"
              @change="search"
            >
              <el-option
                v-for="item in bumpPointList"
                :key="item.pointId"
                :label="item.pointName"
                :value="item.pointId"
              > </el-option>
            </el-select>
            <span>电流监测类型:</span>
            <el-select
              clearable
              v-model="searchParams.eventType"
              filterable
              placeholder="电流监测类型"
              :style="{ width: `${150 / 192}rem !important` }"
              @change="search"
            >
              <el-option
                v-for="item in typeList"
                :key="item"
                :label="item"
                :value="item"
              > </el-option>
            </el-select>
            <!-- <span>时间:</span>
            <el-select
              clearable
              v-model="searchParams.time"
              filterable
              placeholder="时间"
              :style="{ width: `${150 / 192}rem !important` }"
            >
              <el-option
                v-for="item in timeRangeList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              > </el-option>
            </el-select> -->
            <!-- <div
              class="search-btn"
              @click="search"
            ></div> -->
          </div>
          <div class="chart-box">
            <LineChart
              :data="lineData"
              :logo="logo"
              :unit="unit"
            />
          </div>
        </div>
        <div class="yangan" v-show="isShow_4">
          <div class="table-box">
            <Table :tableColumns="tableColumns_yangan" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true">
              <template slot="preview" slot-scope="scope">
                <div style="width: 100%; display: flex; align-items: center">
                  <div class="btn-slot" @click="taskDispatch(scope.row)">派发</div>
                </div>
              </template>
            </Table>
          </div>
          <div class="pagination">
            <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
          </div>
        </div>
        <div class="huogan" v-show="isShow_5">
          <div class="table-box">
            <Table :tableColumns="tableColumns_huogan" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true">
              <template slot="preview" slot-scope="scope">
                <div style="width: 100%; display: flex; align-items: center">
                  <div class="btn-slot" @click="taskDispatch(scope.row)">派发</div>
                </div>
              </template>
            </Table>
          </div>
          <div class="pagination">
            <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VideoBox from '../../publicComponents/videoBox' // hik
import VideoBoxXG from '../../publicComponents/videoBoxXG' // h264
import VideoBoxEasy from '../../publicComponents/videoPlayerBox' // h265

import LineChart from './components/lineChart'

import Table from './components/table';

import { get_jmzk_tj, get_jmzk_list, get_camera_list,get_has_device_poi_list } from '@/api/xsApi2'
import { getElectracLineData, getElectracType,get_aigz_yanGan_huoGan_data } from '@/api/xsApi3'
import Gauge from './components/gauge'
export default {
  components: { VideoBox, Gauge, VideoBoxEasy, VideoBoxXG, LineChart,Table },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentIndex: 0,
      tabData: [
        {
          name: '视频监控',
          num: '18',
          imgSrc: require('../../../../assets/img3/p-n-icon1.png'),
          imgSrc_active: require('../../../../assets/img3/p-s-icon1.png'),
        },
        {
          name: '水压监测',
          num: '2',
          imgSrc: require('../../../../assets/img3/p-n-icon2.png'),
          imgSrc_active: require('../../../../assets/img3/p-s-icon2.png'),
        },
        {
          name: '电流检测',
          num: '13',
          imgSrc: require('../../../../assets/img3/p-n-icon3.png'),
          imgSrc_active: require('../../../../assets/img3/p-s-icon3.png'),
        },
        {
          name: '烟感监测',
          num: '192',
          imgSrc: require('../../../../assets/img3/p-n-icon2.png'),
          imgSrc_active: require('../../../../assets/img3/p-s-icon2.png'),
        },
        {
          name: '火感监测',
          num: '237',
          imgSrc: require('../../../../assets/img3/p-n-icon2.png'),
          imgSrc_active: require('../../../../assets/img3/p-s-icon2.png'),
        },
      ],
      // 视频监控
      isShow_1: true,
      cameraIndexCode: '1f8caaebace94be185335ef94823227d',
      cameraType: 'hik',
      cameraList: [],
      keyWord: '',
      // 水压
      isShow_2: false,
      waterList: [],
      // 电压
      isShow_3: false,
      electricityList: [],

      searchParams: {
        pointId: '11',
        eventType: '功率',
      },
      bumpPointList: [
        {
          pointId: '11',
          pointName: '务本堂',
        },
        {
          pointId: '9',
          pointName: '许家南大房',
        },
      ],
      typeList: [],
      // timeRangeList: [],

      lineData: [],
      logo: '1',
      unit: 'A',

      // 烟感
      isShow_4:false,
      tableColumns_yangan:[
        {
          name: '文保单位',
          props: 'bumpPointName',
          format: (row) => {
            if (row.bumpPointName) {
              return row.bumpPointName;
            } else {
              return '-';
            }
          }
        },
        {
          name: '所属区域',
          props: 'regionName',
          format: (row) => {
            if (row.regionName) {
              return row.regionName;
            } else {
              return '-';
            }
          }
        },
        {
          name: '所属设备名称',
          props: 'deviceName',
          format: (row) => {
            if (row.deviceName) {
              return row.deviceName;
            } else {
              return '-';
            }
          }
        },
        {
          name: '传感器名称',
          props: 'channelName',
          format: (row) => {
            if (row.channelName) {
              return row.channelName;
            } else {
              return '-';
            }
          }
        },
        {
          name: '传感器编号',
          props: 'channelNo',
          format: (row) => {
            if (row.channelNo) {
              return row.channelNo;
            } else {
              return '-';
            }
          }
        },
        {
          name: '消防传感器大类型',
          props: 'fireproChannelTypeName',
          format: (row) => {
            if (row.fireproChannelTypeName) {
              return row.fireproChannelTypeName;
            } else {
              return '-';
            }
          }
        },
        {
          name: '消防传感器小类型',
          props: 'channelSubTypeName',
          flex:1.2,
          format: (row) => {
            if (row.channelSubTypeName) {
              return row.channelSubTypeName  ;
            } else {
              return '-';
            }
          }
        },
        
        
        
      ],

      // 火感
      isShow_5:false,
      tableColumns_huogan:[
        {
          name: '文保单位',
          props: 'bumpPointName',
          format: (row) => {
            if (row.bumpPointName) {
              return row.bumpPointName;
            } else {
              return '-';
            }
          },
        },
        {
          name: '监控名称',
          props: 'name',
          format: (row) => {
            if (row.cameraName) {
              return row.cameraName;
            } else {
              return '-';
            }
          },
        },
        {
          name: '监控类型',
          props: 'cameraTypeName',
          format: (row) => {
            if (row.cameraTypeName) {
              return row.cameraTypeName;
            } else {
              return '-';
            }
          },
        },
        {
          name: '通道类型',
          props: 'channelTypeName',
          flex: 1.1,
          format: (row) => {
            if (row.channelTypeName) {
              return row.channelTypeName;
            } else {
              return '-';
            }
          },
        },
        {
          name: '创建时间',
          props: 'createTime',
          flex: 1.5,
          format: (row) => {
            if (row.createTime) {
              return row.createTime;
            } else {
              return '-';
            }
          },
        }
      ],

      // 烟感和火感的公共变量
      tableData:[],
      currentPage: 1,
      pageSize: 12,
      total:0,
    }
  },
  mounted() {
    // 挂载到body下
    this.$nextTick(() => {
      const body = document.querySelector('body')
      if (body.append) {
        body.append(this.$el)
      } else {
        body.appendChild(this.$el)
      }
    })
  },
  watch: {
    isShow(nval) {
      if (nval) {
        this.get_jmzk_tj()
        this.getCameraList()
        this._getElectracType()
        this._get_has_device_poi_list()
      }
    },
  },
  methods: {
    // 获取统计数据
    get_jmzk_tj() {
      get_jmzk_tj().then((result) => {
        let res = result.data.data
        this.tabData[0].num = res[0].num
        this.tabData[1].num = res[1].num;
        // this.tabData[1].num = 2
        this.tabData[2].num = res[2].num;
        // this.tabData[2].num = 12
         this.tabData[3].num = res[3].num;
          this.tabData[4].num = res[4].num;
      })
    },
    tabClick(item, index) {
      this.currentIndex = index
      this.tableData=[]
      switch (index) {
        case 0:
          this.getCameraList()
          this.cameraIndexCode = '1f8caaebace94be185335ef94823227d'
          this.isShow_1 = true
          this.isShow_2 = false
          this.isShow_3 = false
          this.isShow_4 = false
          this.isShow_5 = false
          break
        case 1:
          this.getWaterList()
          this.isShow_1 = false
          this.isShow_2 = true
          this.isShow_3 = false
          this.isShow_4 = false
          this.isShow_5 = false
          break
        case 2:
          this.getElectricityList()
          this.search()
          this.isShow_1 = false
          this.isShow_2 = false
          this.isShow_3 = true
          this.isShow_4 = false
          this.isShow_5 = false
          break
        case 3:
          this._get_yanGan_huoGan_data(3)
          this.isShow_1 = false
          this.isShow_2 = false
          this.isShow_3 = false
          this.isShow_4 = true
          this.isShow_5 = false
          break
        case 4:
          this._get_yanGan_huoGan_data(4)
          this.isShow_1 = false
          this.isShow_2 = false
          this.isShow_3 = false
          this.isShow_4 = false
          this.isShow_5 = true
          break
        default:
          break
      }
    },
    parentClick(index) {
      this.cameraList[index].isSelected = !this.cameraList[index].isSelected
      //   console.log(this.cameraList[index].isSelected);
    },
    childClick(value) {
      this.cameraIndexCode = value.cameraIndexCode
      if (value.cameraSign == 0) {
        this.cameraType = 'hik'
      } else {
        this.cameraType = 'h265'
      }
      // if(value.cameraIndexCode=='7dfebb7006864120b6d076c918cb0ab8'){
      //   this.cameraType = 'h265_self'
      //   // this.cameraType = 'h265'
      // }
    },
    // 获取视频列表
    getCameraList() {
      get_camera_list().then((res) => {
        this.cameraList =
          res.data.data &&
          res.data.data.map((item) => {
            item.isSelected = true
            return item
          })
      })
    },
    cameraSearch() {
    //   console.log('摄像头搜索:', this.keyWord)
    },
    // 获取水压列表
    getWaterList() {
      get_jmzk_list(2).then((res) => {
        res.data.data.forEach((ele) => {
          if (ele.valueStr) {
            ele.value = +ele.valueStr.split('Mpa')[0]
          } else {
            ele.value = 0
          }
        })
        this.waterList = res.data.data
      })
    },
    // 获取电流列表
    getElectricityList() {
      get_jmzk_list(3).then((res) => {
        this.electricityList = res.data.data
      })
      this.logo += '1'
    },
    // 获取电流类型
    _getElectracType() {
      getElectracType().then((res) => {
        // console.log(res.data)
        this.typeList = res.data.data
      })
    },
    // 获取已接入硬件的文保点
    _get_has_device_poi_list(){
      get_has_device_poi_list().then(res=>{
        // console.log('已接入硬件文保点',res.data)
        this.bumpPointList=res.data.data
      })
    },
    // 根据条件查询电压情况数据
    search() {
    //   console.log(this.searchParams)
      getElectracLineData(this.searchParams).then((res) => {
        // console.log('555', res.data)
        this.lineData = res.data.data.map((item) => {
          let obj = {}
          obj.date = item.happenTime ? item.happenTime.split(' ')[1] : ''
          obj.value = item.detectionValue ? parseFloat(item.detectionValue.split(':')[1]) : 0
          return obj
        })
        this.logo += '1'
        this.unit = res.data.data[0].valueUnit
      })
    },

    // 烟感和火感
    _get_yanGan_huoGan_data(index){
      let type = ''
      if(index == 3){
        type='烟感监测'
      }else if(index == 4){
        type='火感监测'
      }
      let params={
        currentPage:this.currentPage,
        pageSize:this.pageSize,
        type:type,
        pointId:''
      }
      get_aigz_yanGan_huoGan_data(params).then(res=>{
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    pageNumChange(val) {
      this.currentPage = val;
      this._get_yanGan_huoGan_data(this.currentIndex);
    },

    close() {
      this.cameraIndexCode = '1f8caaebace94be185335ef94823227d'
      this.$emit('close')
    },

  },
}
</script>
<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../../../assets/img2/f-dialogs-box.png') no-repeat center;
  background-size: 100%;
  z-index: 999;
  .info-container {
    width: 1299px;
    height: 807px;
    // background: rgba(255, 0, 0, 0.288);
    margin-top: 15px;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 0;
    .head {
      position: relative;
      width: 100%;
      height: 110px;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding-left: 50px;
      .title {
        width: 1186px;
        height: 89px;
        background: url('../../../../assets/img2/pop-s-title.png') no-repeat center;
        background-size: 100%;
        background-position-y: -42px;
        display: flex;
        box-sizing: border-box;
        padding-right: 40px;
        padding-top: 10px;
        align-items: center;
        justify-content: center;
        .top-box {
          width: 555px;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          margin-bottom: 20px;
          .text {
            font-family: SourceHanSansCN-Bold;
            font-size: 30px;
            font-weight: 900;
            font-stretch: normal;
            letter-spacing: 5px;
            color: #f5fdff;
            text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
            background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 34px;
        height: 34px;
        background: url('../../../../assets/img2/-s-ic_guanbi.png');
        background-size: 100%;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 67px);
      box-sizing: border-box;
      padding: 0 40px 0 20px;
      padding-top: 8px;
      .top {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: flex-start;
        margin-bottom: 10px;
        .item {
          height: 80px;
          width: 180px;
          display: flex;
          align-items: center;
          margin-right: 10px;
          background-size: 100% 100%;
          img {
            width: 67px;
            height: 69px;
            margin: 0 10px;
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            span:nth-child(1) {
              font-family: MicrosoftYaHei;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 0px;
              color: #a2ecff;
              opacity: 0.8;
            }
            span:nth-child(2) {
              font-family: DINAlternate-Bold;
              font-size: 30px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 2px;
              color: #ffffff;
            }
          }
        }
        .item-active {
          background: url('../../../../assets/img3/tab-s-bg.png') no-repeat center;
        }
        .item-normal {
          background: url('../../../../assets/img3/tab-n-bg.png') no-repeat center;
        }
      }
      .camera {
        width: 100%;
        height: calc(100% - 140px);
        display: flex;
        .left {
          width: 300px;
          height: 100%;
          margin-right: 10px;
          .key-word {
            height: 40px;
            width: 300px;
            padding: 0 0px 0 0px;
            // background: url('../../../../assets/img3/pull-down.png') no-repeat
            //   center;
            border-radius: 3px;
            border: 1px solid #04baf1;
            box-shadow: #04baf1 0 0 5px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            span {
              display: inline-block;
              height: 20px;
              width: 20px;
              color: #43bbea;
              font-size: 20px;
              display: flex;
              align-items: center;
              margin: 0 5px;
              cursor: pointer;
            }
            input {
              display: inline-block;
              box-sizing: border-box;
              color: rgba(13, 203, 228, 0.911);
              width: calc(100% - 20px);
              height: 100%;
              line-height: 40px;
              border: none;
              background: none;
              font-size: 18px;
            }
            input:focus {
              box-sizing: border-box;
              width: calc(100% - 25px);
              height: 100%;
              line-height: 40px;
              border: none;
              // border-left: none !important;
            }
            input:focus-visible {
              box-sizing: border-box;
              width: calc(100% - 25px);
              height: 100%;
              line-height: 40px;
              border: none;
              // border-left: none !important;
              outline: none;
            }
            input::-webkit-input-placeholder {
              color: #1490be;
            }
          }
          .list {
            width: 100%;
            height: calc(100% - 100px);
            overflow: auto;
            user-select: none;
            .item {
              width: 100%;
              height: auto;
              box-sizing: border-box;
              padding: 0 10px;
              padding-left: 0px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              .pBox {
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                cursor: pointer;
                border-bottom: solid 1px rgba(21, 110, 157, 0.3);
                img {
                  width: 23px;
                  height: 23px;
                  margin-right: 20px;
                }
                span {
                  display: inline-block;
                  width: 240px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  font-family: MicrosoftYaHei;
                  font-size: 20px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
              .cBox {
                width: 100%;
                height: 50px;
                box-sizing: border-box;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                cursor: pointer;
                padding-left: 20px;
                border-bottom: solid 1px rgba(21, 110, 157, 0.3);
                img {
                  width: 23px;
                  height: 23px;
                  margin-right: 20px;
                }
                span {
                  display: inline-block;
                  width: 210px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  font-family: MicrosoftYaHei;
                  font-size: 20px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
              .cBox-active {
                background: linear-gradient(to right, #3baef5 1%, rgba(0, 0, 0, 0) 50%);
              }
            }
          }
        }
        .right {
          height: 100%;
          width: calc(100% - 310px);
          background: url('../../../../assets/img2/hr-y.png') no-repeat left;
          background-size: auto 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
      .water {
        width: 100%;
        height: calc(100% - 140px);
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        .item {
          display: flex;
          width: 20%;
          height: 264px;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          img {
            width: 199px;
            height: 180px;
          }
          .gauge {
            width: 199px;
            height: 180px;
            background: url('../../../../assets/img3/dial.png') no-repeat center;
            background-size: 100%;
            position: relative;
            .box {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 120%;
              height: 120%;
            }
          }
          .row1 {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            div:nth-child(1) {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 0px;
              color: #ffffff;
              margin-right: 5px;
            }
            div:nth-child(2) {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 94px;
              height: 21px;
              background: url('../../../../assets/img3/b-btn1.png') no-repeat center;
              background-size: 100% 100%;
              font-family: MicrosoftYaHei;
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 1px;
              color: #ffffff;
            }
          }
          .row2 {
            width: 211px;
            height: 63px;
            background: url('../../../../assets/img3/txt-info-bg.png') no-repeat center;
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            div {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 0px;
              color: #ffffff;
              opacity: 0.8;
              margin-left: 5px;
              &:nth-child(1) {
                margin-bottom: 5px;
              }
            }
          }
        }
      }
      .electricity {
        width: 100%;
        max-height: calc(100% - 140px);
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        justify-content: center;
        .item {
          display: flex;
          width: 33.3%;
          height: 134px;
          margin-bottom: 40px;
          img {
            width: 134px;
            height: 134px;
            margin-right: 20px;
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .row {
              font-family: MicrosoftYaHei;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 0px;
              color: #ffffff;
              margin-bottom: 4px;
            }
            .bottom {
              width: 209px;
              height: 62px;
              background: url('../../../../assets/img3/txt-info-bg2.png') no-repeat center;
              background-size: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              .row {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: #ffffff;
                opacity: 0.8;
              }
            }
          }
        }

        .search-box {
          width: calc(100% - 20px);
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding-right: 100px;
          span {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #f5fdff;
            margin: 0 10px;
          }
          .search-btn {
            width: 80px;
            height: 30px;
            background: url('../../../../assets/img3/search-btn.png') no-repeat center;
            background-size: 100% 100%;
            margin-left: 10px;
          }
        }
        .chart-box {
          width: 80%;
          height: 400px;
          margin-top: 10px;
        }
      }
      .yangan {
        width: 100%;
        max-height: calc(100% - 140px);
        .table-box {
          width: 100%;
          height: 500px;
          .btn-slot {
            width: 60px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border: 1px solid #8ba4fe;
            background: #34478c;
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #8ba4fe;
            cursor: pointer;
          }
        }
        .pagination {
          text-align: center;
        }
      }
      .huogan {
        width: 100%;
        max-height: calc(100% - 140px);
        .table-box {
          width: 100%;
          height: 500px;
          .btn-slot {
            width: 60px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border: 1px solid #8ba4fe;
            background: #34478c;
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #8ba4fe;
            cursor: pointer;
          }
        }
        .pagination {
          text-align: center;
        }
      }
    }
  }
}
</style>
