<template>
  <div class="container" v-if="isShow">
    <div class="center-container" :style="{ opacity: maskOpacity }">
      <div class="head">待处理任务列表</div>
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
          <el-input size="mini" :style="{ width: `${130 / 192}rem !important` }" v-model.trim="searchParams.fxnr" placeholder="风险内容"></el-input>
          <span>风险来源: </span>
          <!-- clearable -->
          <el-select v-model="searchParams.fxly" filterable size="mini" placeholder="风险来源" :style="{ width: `${180 / 192}rem !important` }">
            <el-option v-for="item in fxlyList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
          <span>风险因子: </span>
          <el-select clearable v-model="searchParams.fxyz" filterable size="mini" placeholder="风险因子" :style="{ width: `${180 / 192}rem !important` }">
            <el-option v-for="item in fxyzList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
        </div>
        <div class="btn-search" @click="search">搜索</div>
      </div>
      <div class="table-box">
        <Table v-if="isSJCZ" :tableColumns="tableColumns_sjcz" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true">
          <template slot="preview" slot-scope="scope">
            <div style="width: 100%; display: flex; align-items: center">
              <div class="btn-slot" @click="taskDispatch(scope.row)">派发</div>
            </div>
          </template>
        </Table>
        <Table v-else :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true">
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
    <TaskDispatch :isShow="isShow_taskDispatch" :current="selectedItem" @close="close_taskDispatch" />
  </div>
</template>
<script>
import { wbd_list2, szzj } from '../../../api/xsApi.js';
import { getWarningDisposalList,getMyBaseCheckList } from '../../../api/xsApi3.js';
import Table from './component/table';
import TaskDispatch from '../components/taskDispatch';
import { mapState } from 'vuex';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: { Table, TaskDispatch },
  data() {
    return {
      isSJCZ:true,
      maskOpacity: 1,
      isShow_taskDispatch: false,
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
      tableColumns_sjcz: [
        {
          name: '任务名称',
          props: 'checkName',
          format: (row) => {
            if (row.baseCheck.checkName) {
              return row.baseCheck.checkName;
            } else {
              return '-';
            }
          },
        },
        {
          name: '任务内容',
          props: 'checkContent',
          flex:2,
          format: (row) => {
            if (row.subArray.length>0) {
              let arr=[]
              row.subArray.map(item=>{
                arr.push(item.content )
              })
              let str = arr.join('; ')
              if(str.length>20){
                return str.substr(0,21) + '...'
              }else{
                return str
              }
              
            } else {
              return '-';
            }
          },
        },
        {
          name: '截止时间',
          props: 'checkDeadLine',
          format: (row) => {
            if (row.baseCheck.checkDeadLine) {
              return row.baseCheck.checkDeadLine;
            } else {
              return '-';
            }
          },
        },
        {
          name: '处理时间',
          props: 'checkCreateTime',
          format: (row) => {
            if (row.baseCheck.checkCreateTime) {
              return row.baseCheck.checkCreateTime;
            } else {
              return '-';
            }
          },
        },
        // {
        //   name: '处理状态',
        //   props: 'checkCreateTime',
        //   format: (row) => {
        //     if (row.baseCheck.checkCreateTime) {
        //       return row.baseCheck.checkCreateTime;
        //     } else {
        //       return '-';
        //     }
        //   },
        // },
      ],
      tableData: [
        /*     {
          source: '智能感知',
          reson: '电压',
          content: '务本堂电压过大',
          peopleOrDevice: '电压传感器',
          createTime: '2022-11-17 12:10:39',
          status: '待处理',
        }, */
        {
          baseCheck:{
            checkName:'1111',
            checkDeadLine:'2023-03-31 00:00:00',
            checkCreateTime:'2023-03-20 13:05:12',
          },
          subArray:[
            {
              content:"亚硝酸钠擦"
            },
            {
              content:"看看看亚硝酸钠擦卡静安寺持久化洒出尽可能苍井空内存卡"
            }
          ]
        }
      ],
      pageSize: 15,
      currentPage: 1,
      total: 0,
      selectedItem: {},
    };
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
      // this.searchParams.fxly = '智能感知';
      this.searchParams.fxly = '';
      this.fxyzList = [...this.fxyzList_2];
      this.$nextTick(() => {
        // this.searchParams.fxyz = '烟感';
        if (nval) {
          // this.getWillDoTask_detail();
          this.getList_sjcz()
        }
      });
    },
  },
  computed: {
    ...mapState(['hookMapReactionWithTopData']),
  },
  methods: {
    pageNumChange(val) {
      this.currentPage = val;
      // this.getWillDoTask_detail();
      this.getList_sjcz()
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
                return '待指派';
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
                return '待指派';
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
                return '待指派';
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
                return '待指派';
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
                return '待指派';
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
        queryState: 0,
      };
      getWarningDisposalList(params).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          ((res.data.data && res.data.data.list) || []).forEach((ele) => {
            ele.alarmSource = this.searchParams.fxly;
          });
          this.tableData = (res.data.data && res.data.data.list) || [];
          this.total = (res.data.data && res.data.data.total) || 0;
        }
      });
      // get_aqzs_detail(params).then((res) => {
      //   this.tableData = res.data.data.list
      //   this.total = res.data.data.total
      // })
    },
    close() {
      this.$emit('close');
    },
    // 任务派发
    taskDispatch(item) {
      this.isShow_taskDispatch = true;
      this.maskOpacity = 0;
      this.selectedItem = item;
    },
    close_taskDispatch() {
      this.isShow_taskDispatch = false;
      this.maskOpacity = 1;
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

    // 获取移动端的事件处置列表
    getList_sjcz() {
      let params = {
        selectByMyAndAll: 'my',
        checkType: '',
        page: this.currentPage,
        pageSize: this.pageSize,
        checkStatus: 0,
      }
      getMyBaseCheckList(params).then((res) => {
        console.log(res)
          if (res.data && res.data.code && res.data.code == 200) {
            let shorter = res.data.data;
            if (shorter&&shorter.length>0) {
              shorter.list.forEach((ele) => {
                ele.subArray = [];
                if (ele && ele.baseCheck) {
                  switch (ele.baseCheck.isRun) {
                    case 1:
                      ele.subStatus = '合格';
                      break;
                    case -1:
                      ele.subStatus = '待审核';
                      break;
                    case 99:
                      ele.subStatus = '不合格';
                      break;
                  }
                }
                switch (ele.baseCheck.checkType) {
                  default:
                    if (ele.baseCheckDetailList) {
                      ele.baseCheckDetailList.forEach((sub) => {
                        sub.content = sub.dicDetailName;
                      });
                      ele.subArray = ele.baseCheckDetailList;
                    }
                    break;
                }
              });
              this.total = shorter.total;
              this.tableData = shorter.list;
            }else{
              this.tableData = []
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
          uni.hideLoading();
        });
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
