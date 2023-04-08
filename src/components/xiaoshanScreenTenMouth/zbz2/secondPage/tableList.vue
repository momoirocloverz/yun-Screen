<template>
  <div class="container" v-if="isShow">
    <div class="center-container">
      <div class="head">{{ getTitle }}</div>
      <div class="close" @click="close"></div>
      <div class="table-box">
        <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'"
          :hasIndex="true">
          <template slot="preview" slot-scope="scope">
            <div style="width: 100%; display: flex; align-items: center">
              <div class="btn-slot" @click="taskDispatch(scope.row)">派发</div>
            </div>
          </template>
        </Table>
      </div>
      <div class="pagination">
        <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5"
          layout="total, prev, pager, next" :total="total"> </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { get_hzcz_list_data, get_aigz_yanGan_huoGan_data } from '@/api/xsApi3.js';
import Table from './component/table';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    logo1: {
      type: String,
      default: '',
    },
    logo2: {
      type: String,
      default: '',
    },
  },
  components: { Table },
  data() {
    return {
      bumpPointList: [],
      streetList: [],
      tableColumns: [
        {
          name: '文保单位',
          props: 'userName',
          flex: 1.1,
          format: (row) => {
            if (row.bumpPointName) {
              return row.bumpPointName;
            } else {
              return '-';
            }
          },
        },
        {
          name: '风险来源',
          props: 'alarmSource',
          format: (row) => {
            if (row.alarmSource) {
              return row.alarmSource;
            } else {
              return '-';
            }
          },
        },
        {
          name: '风险因子',
          props: 'tag',
          format: (row) => {
            if (row.tag) {
              return row.tag;
            } else {
              return '-';
            }
          },
        },
        {
          name: '风险内容',
          props: 'tag1',
          flex: 1.5,
          format: (row) => {
            if (row.tag1) {
              return row.tag1;
            } else {
              return '-';
            }
          },
        },

        {
          name: '上报时间',
          props: 'warningTime',
          flex: 1.5,
          format: (row) => {
            if (row.warningTime) {
              return row.warningTime;
            } else {
              return '-';
            }
          },
        },
        {
          name: '状态',
          props: 'itype',
          format: (row) => {
            return '待指派';
          },
          flex: 0.7,
        },
        {
          name: '',
          props: 'preview',
          withSlot: true,
        },
      ],
      tableData: [],
      pageSize: 15,
      currentPage: 1,
      total: 0,
    };
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
  watch: {
    isShow(nval, val) {
      this.currentPage = 1;
      this.total = 0;
      this.$nextTick(() => {
        if (nval) {
          this.setTableColumn();
          this.getListData();
        }
      });
    },
  },
  computed: {
    getTitle() {
      let str1 = this.logo1;
      let str2 = '';
      // switch(this.logo1){
      //   case '火灾烟感监测':
      //     str1='火灾烟感'
      //     break;
      //   case '违规电器监测':
      //     str1='违规电器'
      //     break;
      //   case '消防水压监测':
      //     str1='消防水压'
      //     break;
      //   case '物品堆积识别':
      //     str1='物品堆积'
      //     break;
      //   case '违规用火识别':
      //     str1='违规用火'
      //     break;
      // }
      switch (this.logo2) {
        case '数量':
          str2 = '(设备详情)';
          break;
        case '累计报警':
          str2 = '(累计报警)';
          break;
        case '已处理':
          str2 = '(已处理详情)';
          break;
        case '待处理':
          str2 = '(待处理详情)';
          break;
      }
      return str1 + str2;
    },
  },
  methods: {
    pageNumChange(val) {
      this.currentPage = val;
      this.getListData();
    },
    setTableColumn() {
      this.currentPage = 1;
      switch (this.logo2) {



        case '数量':




          if (this.logo1 == "火灾烟感监测") {


            this.tableColumns = [
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
                flex: 1.2,
                format: (row) => {
                  if (row.channelSubTypeName) {
                    return row.channelSubTypeName;
                  } else {
                    return '-';
                  }
                }
              },



            ]

          } else {
            this.tableColumns = [
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
                name: '设备名称',
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
                name: '设备编码',
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
                name: '设备类型',
                props: 'deviceTypeStr',
                flex: 1.1,
                format: (row) => {
                  if (row.deviceTypeStr) {
                    return row.deviceTypeStr;
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
              },
              {
                name: '区域',
                props: 'regionName',
                format: (row) => {
                  if (row.regionName) {
                    return row.regionName;
                  } else {
                    return '-';
                  }
                },
              },
              {
                name: '父区域',
                props: 'regionPathName',
                format: (row) => {
                  if (row.regionPathName) {
                    return row.regionPathName;
                  } else {
                    return '-';
                  }
                },
              },
              {
                name: '来源类型',
                props: 'resourceTypeStr',
                format: (row) => {
                  if (row.resourceTypeStr) {
                    return row.resourceTypeStr;
                  } else {
                    return '-';
                  }
                },
              },
            ];
          }




          if (this.logo1 == '违规用火识别') {
            this.tableColumns = [
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
              },
            ];
          }
          break;
        case '累计报警':
          this.tableColumns = [
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
              name: '设备名称',
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
              name: '传感器名称',
              props: 'srcName',
              format: (row) => {
                if (row.srcName) {
                  return row.srcName;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '事件类型',
              props: 'eventTypeStr',
              format: (row) => {
                if (row.eventTypeStr) {
                  return row.eventTypeStr;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '事件状态',
              props: 'statusStr',
              format: (row) => {
                if (row.statusStr) {
                  return row.statusStr;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '监测值',
              props: 'value',
              format: (row) => {
                if (row.value) {
                  if (this.logo1 == '违规电器监测') {
                    return row.value;
                  } else {
                    return row.value + row.valueUnit;
                  }
                } else {
                  return '-';
                }
              },
            },
            {
              name: '发生时间',
              props: 'happenTime',
              format: (row) => {
                if (row.happenTime) {
                  return row.happenTime;
                } else {
                  return '-';
                }
              },
            },
          ];
          if (this.logo1 == '违规用火识别') {
            this.tableColumns = [
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
                name: '单位地址',
                props: 'bumpPointAddress',
                format: (row) => {
                  if (row.bumpPointAddress) {
                    return row.bumpPointAddress;
                  } else {
                    return '-';
                  }
                },
              },
              {
                name: '事件名称',
                props: 'eventName',
                format: (row) => {
                  if (row.eventName) {
                    return row.eventName;
                  } else {
                    return '-';
                  }
                },
              },
              {
                name: '事件类型',
                props: 'eventTypeName',
                format: (row) => {
                  if (row.eventTypeName) {
                    return row.eventTypeName;
                  } else {
                    return '-';
                  }
                },
              },
              {
                name: '监控名称',
                props: 'srcName',
                format: (row) => {
                  if (row.srcName) {
                    return row.srcName;
                  } else {
                    return '-';
                  }
                },
              },
              {
                name: '监测值',
                props: 'value',
                format: (row) => {
                  if (row.eventTypeName == '火点检测') {
                    if (row.fireMaxTemperature) {
                      return row.fireMaxTemperature + '℃';
                    } else {
                      return '-';
                    }
                  } else if (row.eventTypeName == '温度报警') {
                    if (row.curTemperature) {
                      return row.curTemperature + '℃';
                    } else {
                      return '-';
                    }
                  }
                },
              },
              {
                name: '发生时间',
                props: 'happenTime',
                format: (row) => {
                  if (row.happenTime) {
                    return row.happenTime;
                  } else {
                    return '-';
                  }
                },
              },
            ];
          }
          break;
        case '已处理':
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'bumpPointName',
              flex: 0.8,
              format: (row) => {
                if (row.bumpPointName) {
                  return row.bumpPointName;
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
                  if (row.deviceCode.length > 12) {
                    return row.deviceCode.substr(0, 12) + '...';
                  } else {
                    return row.deviceCode;
                  }
                } else {
                  return '-';
                }
              },
            },

            {
              name: '设备类型',
              props: 'deviceType',
              flex: 1.2,
              format: (row) => {
                if (row.deviceType) {
                  return row.deviceType;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '事件类型',
              props: 'eventType',
              flex: 0.8,
              format: (row) => {
                if (row.eventType) {
                  return row.eventType;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '事件类型(小类)',
              props: 'smallEventType',
              flex: 1.2,
              format: (row) => {
                if (row.smallEventType) {
                  return row.smallEventType;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '预警来源',
              props: 'alarmSource',
              format: (row) => {
                if (row.alarmSource) {
                  return row.alarmSource;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '预警时间',
              props: 'warningTime',
              flex: 1.2,
              format: (row) => {
                if (row.warningTime) {
                  return row.warningTime;
                } else {
                  return '-';
                }
              },
            },
          ];
          break;
        case '待处理':
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'bumpPointName',
              flex: 0.8,
              format: (row) => {
                if (row.bumpPointName) {
                  return row.bumpPointName;
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
                  if (row.deviceCode.length > 12) {
                    return row.deviceCode.substr(0, 12) + '...';
                  } else {
                    return row.deviceCode;
                  }
                } else {
                  return '-';
                }
              },
            },

            {
              name: '设备类型',
              props: 'deviceType',
              flex: 1.2,
              format: (row) => {
                if (row.deviceType) {
                  return row.deviceType;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '事件类型',
              props: 'eventType',
              flex: 0.8,
              format: (row) => {
                if (row.eventType) {
                  return row.eventType;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '事件类型(小类)',
              props: 'smallEventType',
              flex: 1.2,
              format: (row) => {
                if (row.smallEventType) {
                  return row.smallEventType;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '预警来源',
              props: 'alarmSource',
              format: (row) => {
                if (row.alarmSource) {
                  return row.alarmSource;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '预警时间',
              props: 'warningTime',
              flex: 1.2,
              format: (row) => {
                if (row.warningTime) {
                  return row.warningTime;
                } else {
                  return '-';
                }
              },
            },
          ];
          break;
      }
    },
    getListData() {



      if (this.logo1 == '火灾烟感监测' && this.logo2 == '数量') {
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          type: '烟感监测',
          pointId: ''
        }
        get_aigz_yanGan_huoGan_data(params).then(res => {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        })
      } else {

        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          type: this.logo1,
          detailType: this.logo2,
        };
        get_hzcz_list_data(params).then((res) => {
          console.log('', res.data.data);
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        });
      }







    },
    close() {
      this.$emit('close');
      this.tableData = [];
    },
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
    width: 1400px;
    height: 826px;
    position: relative;
    background: url('@/assets/img4/s-pop-bg.png') no-repeat center;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 12px 35px 35px 35px;

    .close {
      width: 54px;
      height: 53px;
      position: absolute;
      top: 0px;
      right: 0px;
      background: url('@/assets/img4/close.png') no-repeat center;
      background-size: 100% 100%;
      cursor: pointer;
    }

    .head {
      width: 100%;
      height: 79px;
      background: url('@/assets/img4/pop-title.png') no-repeat center;
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

    .search-box {
      width: calc(100% - 20px);
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      margin-left: 10px;

      .search-params {
        width: auto;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;

        span {
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #f5fdff;
          margin-left: 20px;
          margin-right: 5px;
        }

        span:nth-child(1) {
          margin-left: 0;
        }
      }

      .btn-search {
        width: 60px;
        height: 28px;
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

    .table-box {
      width: 100%;
      height: 600px;

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
}</style>
