<template>
  <div class="container" v-if="isShow" v-show="maskOpacity">
    <div class="center-container">
      <div class="head">已处理任务列表</div>
      <div class="close" @click="close"></div>
      <div class="search-box">
        <div class="search-params">
          <!-- <span>任务名称:</span>
          <el-input
            size="mini"
            :style="{ width: `${130 / 192}rem !important` }"
            v-model="searchParams.rwmc"
            placeholder="任务名称"
          ></el-input>
          <span>文保单位: </span>
          <el-select
            clearable
            v-model="searchParams.pointName"
            filterable
            size="mini"
            placeholder="文物"
            :style="{ width: `${180 / 192}rem !important` }"
          >
            <el-option
              v-for="item in bumpPointList"
              :key="item.id"
              :label="item.publishName"
              :value="item.publishName"
            >
            </el-option>
          </el-select>
          <span>镇街: </span>
          <el-select
            clearable
            v-model="searchParams.jd"
            filterable
            size="mini"
            placeholder="镇街"
            :style="{ width: `${180 / 192}rem !important` }"
          >
            <el-option
              v-for="item in streetList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select> -->
          <span>风险内容:</span>
          <el-input size="mini" :style="{ width: `${130 / 192}rem !important` }" v-model="searchParams.fxnr" placeholder="风险内容"></el-input>
          <span>风险来源: </span>
          <!-- clearable -->
          <el-select v-model="searchParams.fxly" filterable size="mini" placeholder="风险来源" :style="{ width: `${180 / 192}rem !important` }">
            <el-option v-for="item in fxlyList" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
          <span>风险因子: </span>
          <el-select clearable v-model="searchParams.fxyz" filterable size="mini" placeholder="风险因子" :style="{ width: `${180 / 192}rem !important` }">
            <el-option v-for="item in fxyzList" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </div>
        <div class="btn-search" @click="search">搜索</div>
      </div>
      <div class="table-box">
        <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true">
          <template slot="preview" slot-scope="scope">
            <div style="width: 100%; display: flex; align-items: center">
              <div class="btn-slot" @click="preview(scope.row)">查看</div>
            </div>
          </template>
        </Table>
      </div>
      <div class="pagination">
        <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from '@/main';
import { wbd_list2, szzj } from '../../../api/xsApi.js';
import { getWarningDisposalList } from '../../../api/xsApi3.js';
import Table from './component/table';
import { mapState } from 'vuex';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: { Table },
  data() {
    return {
      maskOpacity: 1,
      searchParams: {
        fxly: '',
        fxyz: '',
        fxnr: '',
      },
      bumpPointList: [],
      streetList: [],
      fxlyList: [
        {
          name: '巡查上报',
          id: '1',
        },
        {
          name: '智能感知',
          id: '2',
        },
        {
          name: '气象预警',
          id: '3',
        },
        {
          name: '行为监测',
          id: '4',
        },
        {
          name: '稽查督查',
          id: '5',
        },
        {
          name: '其他',
          id: '6',
        },
      ],
      fxyzList: [
        {
          id: '1',
          name: '安防',
        },
        {
          id: '2',
          name: '消防',
        },
        {
          id: '3',
          name: '周边',
        },
        {
          id: '4',
          name: '本土',
        },
        {
          id: '5',
          name: '其他',
        },
      ],
      fxyzList_1: [
        // 巡查上报
        {
          id: '1',
          name: '安防',
        },
        {
          id: '2',
          name: '消防',
        },
        {
          id: '3',
          name: '周边',
        },
        {
          id: '4',
          name: '本土',
        },
        {
          id: '5',
          name: '其他',
        },
      ],
      fxyzList_2: [
        // 智能感知
        {
          id: '1',
          name: '烟感',
        },
        {
          id: '2',
          name: '水压',
        },
        {
          id: '3',
          name: '水位',
        },
        {
          id: '4',
          name: '监控',
        },
        {
          id: '5',
          name: '电压',
        },
      ],
      fxyzList_3: [
        // 气象预警
        {
          id: '1',
          name: '降雨',
        },
        {
          id: '2',
          name: '气温',
        },
        {
          id: '3',
          name: '湿度',
        },
        {
          id: '4',
          name: '雷电',
        },
        {
          id: '5',
          name: '风级',
        },
      ],
      fxyzList_4: [
        // 行为监测
        {
          id: '1',
          name: '活动',
        },
        {
          id: '2',
          name: '人流',
        },
        {
          id: '3',
          name: '占道',
        },
        {
          id: '4',
          name: '越界',
        },
        {
          id: '5',
          name: '其他',
        },
      ],
      fxyzList_5: [
        // 稽查督查
        {
          id: '1',
          name: '城管',
        },
        {
          id: '2',
          name: '住建',
        },
        {
          id: '3',
          name: '消防',
        },
        {
          id: '4',
          name: '公安',
        },
        {
          id: '5',
          name: '其他',
        },
      ],
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
          flex: 0.7,
          format: (row) => {
            return '已处理';
          },
        },
        {
          name: '',
          props: 'preview',
          withSlot: true,
        },
      ],
      tableData: [
        /* {
          source: '智能感知',
          reson: '电压',
          content: '务本堂电压过大',
          peopleOrDevice: '电压传感器',
          createTime: '2022-11-17 12:10:39',
          status: '已处理',
        }, */
      ],
      pageSize: 15,
      currentPage: 1,
      total: 0,
    };
  },
  computed: {
    ...mapState(['hookMapReactionWithTopData']),
  },
  created() {
    eventBus.$on('onlyPreview', () => {
      this.maskOpacity = 1;
    });
  },
  watch: {
    'searchParams.fxly'(val) {
      this.searchParams.fxyz = '';
      switch (val) {
        case '巡查上报':
          this.fxyzList = [...this.fxyzList_1];
          break;
        case '智能感知':
          this.fxyzList = [...this.fxyzList_2];
          break;
        case '气象预警':
          this.fxyzList = [...this.fxyzList_3];
          break;
        case '行为监测':
          this.fxyzList = [...this.fxyzList_4];
          break;
        case '稽查督查':
          this.fxyzList = [...this.fxyzList_5];
          break;
        default:
          this.fxyzList = [...this.fxyzList_1];
          break;
      }
    },
    isShow(nval, val) {
      this.currentPage = 1;
      this.total = 0;
      this.searchParams.fxnr = '';
      this.searchParams.fxly = '智能感知';
      this.fxyzList = [...this.fxyzList_2];
      this.$nextTick(() => {
        // this.searchParams.fxyz = '烟感';
        if (nval) {
          this.getWillDoTask_detail();
        }
      });
    },
  },
  mounted() {
    // this.getStreetList();
    this.getBumpPointList();
    // this.getWillDoTask_detail();
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
    pageNumChange(val) {
      this.currentPage = val;
      this.getWillDoTask_detail();
    },
    search() {
      this.currentPage = 1;
      switch (this.searchParams.fxly) {
        case '巡查上报':
          this.tableColumns = [
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
              name: '上报人员/设备',
              props: 'userName',
              flex: 1.1,
              format: (row) => {
                if (row.userName) {
                  return row.userName;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '上报时间',
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
              name: '状态',
              props: 'itype',
              format: (row) => {
                return '已处理';
              },
              flex: 0.7,
            },
            {
              name: '',
              props: 'preview',
              withSlot: true,
            },
          ];
          break;
        case '智能感知':
          this.tableColumns = [
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
              name: '上报人员/设备',
              props: 'userName',
              flex: 1.1,
              format: (row) => {
                if (row.userName) {
                  return row.userName;
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
                if (row.isOver && row.isOver == '1') {
                  return '已处理';
                } else {
                  return '未处理';
                }
              },
              flex: 0.7,
            },
            {
              name: '',
              props: 'preview',
              withSlot: true,
            },
          ];
          break;
        case '气象预警':
          this.tableColumns = [
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
              props: 'riskFactor',
              format: (row) => {
                if (row.riskFactor) {
                  return row.riskFactor;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '风险内容',
              props: 'riskMag',
              flex: 1.5,
              format: (row) => {
                if (row.riskMag) {
                  return row.riskMag;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '上报人员/设备',
              props: 'handleDeptName',
              flex: 1.1,
              format: (row) => {
                if (row.handleDeptName) {
                  return row.handleDeptName;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '上报时间',
              props: 'riskTime',
              flex: 1.5,
              format: (row) => {
                if (row.riskTime) {
                  return row.riskTime;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '状态',
              props: 'itype',
              format: (row) => {
                return '已处理';
              },
              flex: 0.7,
            },
            {
              name: '',
              props: 'preview',
              withSlot: true,
            },
          ];
          break;
        case '行为监测':
          this.tableColumns = [
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
              props: 'riskFactor',
              format: (row) => {
                if (row.riskFactor) {
                  return row.riskFactor;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '风险内容',
              props: 'riskMag',
              flex: 1.5,
              format: (row) => {
                if (row.riskMag) {
                  return row.riskMag;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '上报人员/设备',
              props: 'handleDeptName',
              flex: 1.1,
              format: (row) => {
                if (row.handleDeptName) {
                  return row.handleDeptName;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '上报时间',
              props: 'riskTime',
              flex: 1.5,
              format: (row) => {
                if (row.riskTime) {
                  return row.riskTime;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '状态',
              props: 'itype',
              format: (row) => {
                return '已处理';
              },
              flex: 0.7,
            },
            {
              name: '',
              props: 'preview',
              withSlot: true,
            },
          ];
          break;

        case '稽查督查':
          this.tableColumns = [
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
              props: 'type',
              format: (row) => {
                if (row.type) {
                  return row.type;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '风险内容',
              props: 'content',
              flex: 1.5,
              format: (row) => {
                if (row.content) {
                  return row.content;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '上报人员/设备',
              props: 'handleDeptName',
              flex: 1.1,
              format: (row) => {
                if (row.handleDeptName) {
                  return row.handleDeptName;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '上报时间',
              props: 'signTime',
              flex: 1.5,
              format: (row) => {
                if (row.signTime) {
                  return row.signTime.replace('T', ' ');
                } else {
                  return '-';
                }
              },
            },
            {
              name: '状态',
              props: 'itype',
              format: (row) => {
                return '已处理';
              },
              flex: 0.7,
            },
            {
              name: '',
              props: 'preview',
              withSlot: true,
            },
          ];
          break;
      }
      this.getWillDoTask_detail();
    },
    getWillDoTask_detail() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        tag1: this.searchParams.fxnr,
        alarmSource: this.searchParams.fxly,
        tag: this.searchParams.fxyz,
        jd: this.hookMapReactionWithTopData.jd || '',
        bumpPointId: this.hookMapReactionWithTopData.bumpPointId || '',
        queryState: 1,
      };
      getWarningDisposalList(params)
        .then((res) => {
          if (res && res.data && res.data.code && res.data.code == 200) {
            ((res.data.data && res.data.data.list) || []).forEach((ele) => {
              ele.alarmSource = this.searchParams.fxly;
            });
            this.tableData = (res.data.data && res.data.data.list) || [];
            this.total = (res.data.data && res.data.data.total) || 0;
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
      // get_aqzs_detail(params).then((res) => {
      //   this.tableData = res.data.data.list
      //   this.total = res.data.data.total
      // })
    },
    close() {
      this.$emit('close');
    },
    preview(item) {
      this.maskOpacity = 0;
      eventBus.$emit('isShowCenterAndTop', false, 'onlyPreview');
      this.$store.commit('setTransferEventTrack', item);
    },
    // 获取文保点列表
    getBumpPointList() {
      let params = {
        currentPage: 1,
        pageSize: 600,
      };
      //   wbd_list62(params).then((res) => {
      //     // console.log('lol', res.data)
      //     this.bumpPointList = res.data.data.list
      //   })
    },
    // 获取镇街列表
    getStreetList() {
      if (this.$store.state.commonStreetList && this.$store.state.commonStreetList.length) {
        this.streetList = this.$store.state.commonStreetList;
      } else {
        szzj().then((res) => {
          this.streetList = res.data.data;
          this.$store.commit('setCommonStreetList', res.data.data);
        });
      }
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
    width: 1026px;
    height: 826px;
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
}
</style>
