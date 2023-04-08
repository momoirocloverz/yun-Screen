<template>
  <div class="mask" v-if="isShow" :style="{ opacity: maskOpacity }">
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">智能感知信息</span>
          </div>
        </div>
        <div class="close" @click="close"></div>
      </div>
      <div class="body">
        <div class="part1">
          <div class="search">
            <input v-model="searchContent" type="text" placeholder="搜索" />
            <img src="../../../../assets/img2/s-icon@3x.png" alt="" srcset="" @click="search" />
          </div>
          <div class="table">
            <TableC :isSpecal="true" :isShowCheck="false" :tableColumns="tableColumns_point" :tableData="tableData_point" />
          </div>
          <div class="pagination">
            <el-pagination @current-change="pageNumChange" :page-size="pageSize" :pager-count="7" layout="total,prev, pager, next" :total="total"> </el-pagination>
          </div>
        </div>
        <div class="part2">
          <DialogTitleBox :title="'务本堂'" />
          <div class="discrible">
            <div class="item" v-for="(item, index) in discribleList" :key="index">
              {{ item }}
            </div>
          </div>
          <DialogTitleBox :title="`感知设施(<span style='color:#84ccff;'>共3个</span>)`" />
          <div class="device">
            <div class="item" v-for="(item, index) in deviceList" :key="index" :style="{ background: `url(${item.bgImg}) no-repeat center`, 'background-size': '100% 100%' }">
              <div class="title">{{ item.name }}</div>
              <div class="num" :style="{ color: item.color }">
                <span>{{ item.num }}</span>
                <span>{{ item.unit }}</span>
              </div>
            </div>
          </div>
          <div class="table-title">
            <div class="text">设备清单</div>
          </div>
          <div class="table">
            <TableC :isShowCheck="false" :tableColumns="tableColumns_device" :tableData="tableData_device" />
          </div>
          <div class="table-title">
            <div class="text">感知预警</div>
          </div>
          <div class="table">
            <TableC :isShowCheck="false" :tableColumns="tableColumns_warning" :tableData="tableData_warning" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '../../publicComponents/table';
import DialogTitleBox from '../../../newComponents/dialogTitleBox';
import TableC from '../../../mapPublicComponents/table';

import PreviewImgs from './previewImgs';

import { wbd_list2 } from '../../../../api/xsApi';

export default {
  components: {
    Table,
    DialogTitleBox,
    TableC,
    PreviewImgs,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    boxData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      maskOpacity: 1,
      searchContent: '',

      discribleList: ['古建筑', '省保单位'],
      deviceList: [
        {
          name: '正常设备',
          num: '2',
          unit: '个',
          color: '#bde5ff',
          bgImg: require('../../../../assets/img2/zngz_1.png'),
        },
        {
          name: '异常设备',
          num: '1',
          unit: '个',
          color: '#ffaf8a',
          bgImg: require('../../../../assets/img2/zngz_2.png'),
        },
        {
          name: '报警次数',
          num: '1',
          unit: '次',
          color: '#ffc3c3',
          bgImg: require('../../../../assets/img2/zngz_3.png'),
        },
        {
          name: '待处理',
          num: '0',
          unit: '条',
          color: '#faf3af',
          bgImg: require('../../../../assets/img2/zngz_4.png'),
        },
      ],
      tableColumns_point: [
        {
          name: '文物名称',
          props: 'publishName',
          requireEllipsis: 100,
        },
      ],
      tableData_point: [
        {
          id: '11',
          publishName: '务本堂',
        },
      ],
      tableColumns_device: [
        {
          name: '设备名称',
          props: 'deviceName',
          requireEllipsis: 100,
        },
        {
          name: '设备类型',
          props: 'deviceType',
          requireEllipsis: 100,
        },
        {
          name: '安装位置',
          props: 'azwz',
          requireEllipsis: 100,
        },
        {
          name: '监测数值',
          props: 'jcsz',
          requireEllipsis: 100,
        },
        {
          name: '上报时间',
          props: 'time',
          requireEllipsis: 100,
        },
        {
          name: '设备状态',
          props: 'status',
          flex: 0.8,
          requireEllipsis: 100,
          withColor: true,
        },
      ],
      tableData_device: [
        {
          id: '1',
          deviceName: '光电感烟',
          deviceType: '光电感烟探测器',
          azwz: '务本堂厨房',
          jcsz: '0g/m',
          time: '2022-04-05 10:00',
          status: '正常',
          color: '#77f5b7',
        },
        {
          id: '2',
          deviceName: '光电感烟',
          deviceType: '光电感烟探测器',
          azwz: '务本堂厨房',
          jcsz: '0g/m',
          time: '2022-04-05 10:00',
          status: '正常',
          color: '#77f5b7',
        },
        {
          id: '3',
          deviceName: '光电感烟',
          deviceType: '光电感烟探测器',
          azwz: '务本堂厨房',
          jcsz: '0g/m',
          time: '2022-04-05 10:00',
          status: '离线',
          color: '#cbc9cb',
        },
      ],
      tableColumns_warning: [
        {
          name: '预警类型',
          props: 'warningType',
          requireEllipsis: 100,
        },
        {
          name: '发生时间',
          props: 'time',
          requireEllipsis: 100,
        },
        {
          name: '发生地点',
          props: 'fsdd',
          requireEllipsis: 100,
        },
        {
          name: '描述',
          props: 'describle',
          requireEllipsis: 100,
        },
        {
          name: '处置状态',
          props: 'status',
          requireEllipsis: 100,
          flex: 0.8,
          withColor: true,
        },
        {
          name: '处置人员',
          props: 'czry',
          flex: 0.8,
          requireEllipsis: 100,
        },
      ],
      tableData_warning: [
        {
          id: '1',
          warningType: '火灾预警',
          time: '2022-04-05 10:00',
          fsdd: '务本堂厨房',
          describle: '烟雾深度超过阈值',
          status: '处置中',
          czry: '李小双',
          color: '#e9c351',
        },
        {
          id: '2',
          warningType: '火灾预警',
          time: '2022-04-05 10:00',
          fsdd: '务本堂厨房',
          describle: '烟雾深度超过阈值',
          status: '已处置',
          czry: '李小双',
          color: '#77f5b7',
        },
        {
          id: '3',
          warningType: '火灾预警',
          time: '2022-04-05 10:00',
          fsdd: '务本堂厨房',
          describle: '烟雾深度超过阈值',
          status: '处置中',
          czry: '李小双',
          color: '#e9c351',
        },
      ],

      currentPage: 1,
      pageSize: 12,
      total: 0,
    };
  },
  watch: {
    isShow(val) {
      if (!val) return;
    },
  },
  mounted() {
    this.getPointlist();
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
    // 获取文保点列表
    getPointlist() {
      let params = {
        publishName: this.searchContent,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };
      wbd_list2(params).then(res => {
        let result = res.data.data;
        this.total = result.total;
        this.tableData_point = result.list;
      });
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.getPointlist();
    },
    search() {
      //   console.log('kkk', this.searchContent)
      this.currentPage = 1;
      this.getPointlist();
    },
    // 文物详情关闭
    close() {
      this.tableData_peopleList = [];
      this.billboardShow = false;
      this.$emit('close');
    },
  },
};
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
  background: url('../../../../assets/img2/pop-bg.png') no-repeat center;
  background-size: 100%;
  z-index: 999;
  user-select: none;
  .info-container {
    width: 1700px;
    height: 950px;
    // background: rgba(255, 0, 0, 0.288);
    // margin-top: 15px;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 0;
    .head {
      position: relative;
      width: 100%;
      height: 148;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        width: 1206px;
        height: 89px;
        background: url('../../../../assets/img2/pop-b-title.png') no-repeat center;
        background-size: 100%;
        background-position-y: -45px;
        display: flex;
        box-sizing: border-box;
        padding-right: 60px;
        padding-top: 10px;
        align-items: flex-start;
        justify-content: center;
        .top-box {
          width: 555px;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          .text {
            font-family: SourceHanSansCN-Bold;
            font-size: 34px;
            font-weight: 900;
            font-stretch: normal;
            letter-spacing: 10px;
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
        top: -20px;
        right: -20px;
        width: 56px;
        height: 56px;
        background: url('../../../../assets/img2/close_new.png');
        background-size: 100%;
        cursor: pointer;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 147px);
      box-sizing: border-box;
      display: flex;
      margin-top: 40px;
      .part1 {
        height: 100%;
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        .table-title {
          width: 100%;
          height: 36px;
          margin: 15px 0;
          .text {
            width: 262px;
            height: 100%;
            background: url('../../../../assets/img2/title-s.png') no-repeat center;
            background-size: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: MicrosoftYaHei;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 1px;
            color: #eceff4;
          }
        }
        .search {
          width: 400px;
          height: 34px;
          margin-bottom: 20px;
          background-color: #042c68;
          box-shadow: #007294 0px 0px 10px;
          border-radius: 2px;
          border: solid 1px #007294;
          display: flex;
          align-items: center;
          input {
            margin-left: 5px;
            height: 30px;
            border: none;
            width: calc(100% - 34px);
            background: none;
            color: #6bd0ff;
            &:focus {
              box-sizing: border-box;
              width: calc(100% - 30px);
              height: 100%;
              line-height: 34px;
              border: none;
            }
            &:focus-visible {
              box-sizing: border-box;
              width: calc(100% - 30px);
              height: 100%;
              line-height: 34px;
              border: none;
              outline: none;
            }
            &::-webkit-input-placeholder {
              color: rgba(107, 208, 255, 0.5);
            }
          }
          img {
            width: 19px;
            height: 19px;
            margin: 0 5px;
            cursor: pointer;
          }
        }
        .table {
          width: 400px;
          height: 700px;
        }
        .pagination {
          text-align: center;
        }
      }
      .part2 {
        height: 100%;
        flex: 4.5;
        background: url('../../../../assets/img2/hr-y.png') no-repeat left;
        background-size: auto 100%;
        box-sizing: border-box;
        padding-left: 50px;
        .discrible {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          width: 100%;
          margin: 15px 0;
          margin-bottom: 5px;
          padding-left: 20px;
          .item {
            width: 116px;
            height: 32px;
            background: url('../../../../assets/img2/info-btn.png') no-repeat center;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            margin: 0 10px;
          }
        }
        .device {
          display: flex;
          justify-content: flex-start;
          width: 100%;
          .item {
            width: 165px;
            height: 132px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 15px;
            .title {
              font-family: MicrosoftYaHei;
              font-size: 21px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 2px;
              color: #ffffff;
              margin-bottom: 20px;
            }
            .num {
              font-family: Arial-BoldMT;
              font-size: 30px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              span:nth-child(2) {
                font-size: 14px;
              }
            }
          }
        }
        .table-title {
          width: 100%;
          height: 36px;
          margin: 15px 0;
          .text {
            width: 262px;
            height: 100%;
            background: url('../../../../assets/img2/title-s.png') no-repeat center;
            background-size: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: MicrosoftYaHei;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 1px;
            color: #eceff4;
          }
        }
        .table {
          width: 1050px;
          height: 172px;
        }
      }
    }
  }
}
</style>
