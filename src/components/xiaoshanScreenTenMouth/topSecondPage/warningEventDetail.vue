<template>
  <div class="container" v-if="isShow" :style="{ opacity: maskOpacity }">
    <div class="center-container">
      <div class="head">预警任务详情</div>
      <div class="close" @click="close"></div>
      <div class="basic-box">
        <!-- <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="false" /> -->
        <div class="item">
          <span>文保单位：</span>
          <span>{{ basicData.bumpPointName}}</span>
        </div>
        <div class="item">
          <span>所属镇街：</span>
          <span>{{ basicData.jd}}</span>
        </div>
        <div class="item">
          <span>设备类型：</span>
          <span style="color:#ffbb19; ">{{ basicData.deviceType}}</span>
        </div>
        <div class="item">
          <span>设备名称：</span>
          <span>{{ basicData.deviceName}}</span>
        </div>
        <div class="item">
          <span>设备编号：</span>
          <span>{{ basicData.deviceCode}}</span>
        </div>
        <div class="item">
          <span>预警时间：</span>
          <span>{{ basicData.createTime}}</span>
        </div>
      </div>

      <div class="scroll-box">
        <div class="relative-device-title">
          <img src="@/assets/img4/t-p.png" alt="" srcset="">
          <span>联动设备</span>
        </div>
        <div v-if="true" class="relative-device-table-box">
          <div class="box-item" v-for="(item,index) in relativeDeviceList" :key="index">
            <div class="box-item-top">
              <div class="box-item-img">
                <img :src="item.img" alt="">
              </div>
              <div class="box-item-title-img">
                <img :src="item.titleImg" alt="">
              </div>
              <!-- <div class="box-title">
                <span>{{ item.name }}</span>
              </div> -->
            </div>
            <div class="table-box">
              <Table :tableColumns="tableColumns_2" :tableData="item.tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true" />
            </div>
          </div>
        </div>
        <div class="empty" v-else>
          <span>暂无关联设备预警</span>
        </div>

        <div class="relative-device-title">
          <img src="@/assets/img4/t-p.png" alt="" srcset="">
          <span>监控照片</span>
        </div>
        <div v-if="true" class="camera-img">
          <div class="box-item" v-for="(item,index) in imgList" :key="index">
            <img :src="item.imgUrl" alt="" srcset="">
          </div>
        </div>
        <div class="empty" v-else>
          <span>暂无监控照片</span>
        </div>
        <div class="sys-res">
          <div class="divider"></div>
          <span>系统判定为</span>
          <span style="color:rgb(255, 89, 89);">80%存在风险</span>
        </div>
      </div>

      <div class="re-audit">
        <span>人工复核：</span>
        <span>存在风险</span>
        <span>2023-03-15 09:45</span>
      </div>
      <div class="status">
        <span>处置情况：</span>
        <span><img src="@/assets/img4/s-icon1.png">已处置</span>
        <div class="btn" @click="previewEventHandleDetail">查看</div>
      </div>
    </div>

    <EventHandleDetail :isShow="isShowHandleDetail" @close="closeHandelDetail"/>

  </div>
</template>
<script>
import { eventBus } from '@/main';

import Table from './component/table';
import EventHandleDetail from './eventHandleDetail'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: { Table,EventHandleDetail },
  data() {
    return {
      maskOpacity: 1,
      deviceTypeList: [
        {
          name: '烟感',
          id: '1',
        },
        {
          name: '火感',
          id: '2',
        },
        {
          name: '水压',
          id: '3',
        },
        {
          name: '电流',
          id: '4',
        },
        {
          name: '监控',
          id: '5',
        },
      ],
      handleStatusList: [
        {
          id: '1',
          name: '未处置',
        },
        {
          id: '2',
          name: '已处置',
        }
      ],
      basicData:{
        bumpPointName:'务本堂',
        jd:'进化镇',
        deviceType: '电压',
        deviceName: '电压传感器',
        deviceCode:'Dy0001',
        createTime: '2022-11-17 12:10:39',
      },
      
      relativeDeviceList:[
        {
          name:'烟感设备',
          img:require('@/assets/img4/icon-yg.png'),
          titleImg:require('@/assets/img4/txt1.png'),
          tableData:[]
        },
        {
          name:'水压设备',
          img:require('@/assets/img4/icon-sy.png'),
          titleImg:require('@/assets/img4/txt2.png'),
          tableData:[]
        },
        {
          name:'火感设备',
          img:require('@/assets/img4/icon-hg.png'),
          titleImg:require('@/assets/img4/txt3.png'),
          tableData:[]
        },
        {
          name:'电流设备',
          img:require('@/assets/img4/icon-dl.png'),
          titleImg:require('@/assets/img4/txt4.png'),
          tableData:[]
        }
      ],
      tableColumns_2:[
        {
          name: '标题',
          props: 'name',
          format: (row) => {
            if (row.name) {
              return row.name;
            } else {
              return '-';
            }
          },
        },
        {
          name: '设备名称',
          props: 'deviceName',
          format: (row) => {
            if (row.deviceName) {
              return row.deviceName;
            } else {
              return '-';
            }
          },
        },
        {
          name: '设备编号',
          props: 'deviceCode',
          format: (row) => {
            if (row.deviceCode) {
              return row.deviceCode;
            } else {
              return '-';
            }
          },
        },
        {
          name: '预警状态',
          props: 'status',
          format: (row) => {
            if (row.status == '1') {
              return '存在风险';
            } else if(row.status == '0') {
              return '未复核';
            }else if(row.status == '2') {
              return '无风险';
            }
          },
        },
      ],
      imgList:[{
        imgUrl: require('@/assets/img4/img.png')
      },{
        imgUrl: require('@/assets/img4/img.png')
      },{
        imgUrl: require('@/assets/img4/img.png')
      },{
        imgUrl: require('@/assets/img4/img.png')
      }],

      // 事件处置详情配置
      isShowHandleDetail:false
    };
  },
  created() {

  },
  computed: {
  },
  watch: {
    isShow(nval, val) {
      this.currentPage = 1;
      this.total = 0;
      this.$nextTick(() => {
        if (nval) {
          // this.getList();
        }
      });
    },
  },
  mounted() {
    // 挂载到body下
    this.$nextTick(() => {
      const body = document.querySelector('body');
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  },
  methods: {
    getList() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        bumpPointId: this.searchParams.pointName || '',
      };

    },
    close() {
      this.$emit('close');
    },
    // 查看事件处置详情
    previewEventHandleDetail(item) {
      this.maskOpacity = 0;
      this.isShowHandleDetail=true
    },
    closeHandelDetail(){
      this.maskOpacity = 1;
      this.isShowHandleDetail=false
    }
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 13;
  background: rgba(0, 0, 0, 0.7);
  .center-container {
    width: 1026px;
    height: 1000px;
    position: relative;
    background: url('../../../assets/img4/s-pop-bg.png') no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 12px 35px 35px 35px;
    .close {
      width: 54px;
      height: 53px;
      position: absolute;
      top: 0px;
      right: 0px;
      background: url('../../../assets/img4/close.png') no-repeat center;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .head {
      width: 100%;
      height: 79px;
      background: url('../../../assets/img4/pop-title.png') no-repeat center;
      background-size: auto 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      font-family: 'Lucida Calligraphy', cursive, serif, sans-serif;
      font-size: 30px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 2px;
      color: #ffffff;
    }
    .basic-box {
      width: 100%;
      height: 91px;
      margin-bottom:15px;
      background: url('@/assets/img4/box1.png') no-repeat center;
      background-size:100% 100%;
      box-sizing: border-box;
      padding: 22px;
      display: flex;
      flex-wrap: wrap;
      .item{
        height: 50%;
        width: 33.3%;
        display: flex;
        align-items: center;
        span{
          font-family: SourceHanSansCN-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 2px;
          color: #ffffff;
        }
      }
    }

    .scroll-box{
      width: 100%;
      max-height: calc(100% - 320px);
      overflow: auto;
      margin-bottom: 20px;
      .relative-device-title{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img{
          width: 26px;
          height: 26px;
        }
        span{
          font-family: SourceHanSansCN-Regular;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #85d3fd;
        }
      }
      .relative-device-table-box{
        width: 100%;
        min-height: 200px;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap;
        // overflow: auto;
        .box-item{
          background: url('@/assets/img4/txt-bg.png') no-repeat center;
          background-size:100% 100%;
          width: 49%;
          max-height: 250px;
          margin: 20px 0;
          .box-item-top{
            display: flex;
            align-items: center;
            margin-top: -25px;
            margin-left: -15px;
            .box-item-img{
              width: 86px;
              height: 59px;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
          
          .box-title{
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
              font-family: 'Lucida Calligraphy', cursive, serif, sans-serif;
              font-size: 20px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 2px;
              color: #ffffff;
            }
          }
          .table-box{
            width: 100%;
            height:200px;
          }
        }
      }
      .camera-img{
        width: 100%;
        min-height:100px;
        // overflow: auto;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .box-item{
          width: 210px;
          height: 117px;
          margin: 0 8px 8px 0;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .empty{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          font-family: 'Lucida Calligraphy', cursive, serif, sans-serif;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 2px;
          color: #ffffff;
        }
      }
    }


    .sys-res{
      width:100%;
      height: 47px;
      display: flex;
      align-items: center;
      background-image: linear-gradient(45deg, rgba(255,84,104,0.5) 0%, rgba(0,163,247,0.00) 100%);
      margin: 10px 0;
      .divider{
        width: 7px;
        height: 25px;
        background-color: #ff5468;
      }
      span{
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        font-stretch: normal;
        color: #fff;
        margin-left: 8px;
      }
    }
    .re-audit{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 30px;
      margin-bottom: 5px;
      span{
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #fff;
        &:nth-child(2){
          color: #ff5468;
          margin: 0 8px;
        }
      }
    }
    .status{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 30px;
      span{
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        color: #fff;
        &:nth-child(2){
          margin: 0 8px;
          font-size: 16px;
          color: #50b7ff;
          img{
            vertical-align: text-top;
          }
        }
      }
      .btn {
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
    
  }
}
</style>
