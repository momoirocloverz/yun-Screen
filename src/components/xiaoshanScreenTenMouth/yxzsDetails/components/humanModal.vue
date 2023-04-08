<template>
  <div class="yxzsDetailHumanModalCon" v-if="isShow" :style="{opacity:maskOpacity}">
    <div class="centerCon">
      <div class="head">{{ currentType }}</div>
      <div class="close" @click="close"></div>
      <div class="search-box">
        <div class="search-params">
          <span v-if="showPoint">文保单位: </span>
          <el-autocomplete
            v-if="showPoint"
            class="inline-input"
            v-model="searchParams.pointName"
            size="mini"
            :fetch-suggestions="querySearch"
            placeholder="文保单位"
            @select="handleSelect"
            :style="{ width: `${180 / 192}rem !important` }"
          ></el-autocomplete>
          <!-- <span v-if="showState">完成状态: </span>
          <el-select v-if="showState" clearable v-model="searchParams.type" filterable size="mini" placeholder="类别" :style="{ width: `${120 / 192}rem !important` }">
            <el-option v-for="item in stateArray" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select> -->
          <!-- <span v-if="showTime">时间: </span>
          <el-date-picker
            clearable
            v-if="showTime"
            size="mini"
            v-model="searchParams.date"
            :style="{ width: `${240 / 192}rem !important` }"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker> -->
        </div>
        <div class="btn-search" @click="search">搜索</div>
      </div>
      <div class="table-box">
        <cusTable :tableColumns="tableColumns" :tableData="tableData" :optionList="optionList" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="false" @btnClick="showDetail"></cusTable>
      </div>
      <div class="pagination" v-show="showPage">
        <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>

    <Detail :isShow="isShowDetailBox" :row="detailInfo" @close="closeDetailBox" />
    <EventHandleDetail :isShow="isShowDetailBox_2" :row="detailInfo" @close="closeDetailBox_2" />

  </div>
</template>
<script>
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
import { basecheckRenAntiData, screenBaseCheckFireProtection, bumpPointBaseInfoScreenUserData } from '../../../../api/xsApi3.js';
import Detail from '@/components/xiaoshanScreenTenMouth/yxzs/secondPage/fxlyDetail'
import EventHandleDetail from './eventHandleDetail'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    currentType: {
      type: String,
      default: '',
    },
    currentCount: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Detail,
    EventHandleDetail,
    cusTable: () => import(/* webpackChunkName: "yxzsDetailenvironmentMHumanMTable" */ './table'),
  },
  data() {
    return {
      showPage: true,
      showTime: true,
      showState: true,
      showPoint: true,
      pageSize: 15,
      currentPage: 1,
      total: 0,
      searchParams: {
        pointName: '',
        type: '',
        date: [],
      },
      bumpPointList: [],
      tableColumns: [
        {
          name: '文保单位',
          props: 'bumpPointId',
        },
        {
          name: '护保员',
          props: 'userIds',
        },
        {
          name: '巡查任务',
          props: 'checkName',
        },
        {
          name: '完成状态',
          props: 'isOvertime',
          format: (row) => {
            if (row.isOvertime == 1) {
              return '已完成';
            } else {
              return '未完成';
            }
          },
        },
        {
          name: '时间',
          props: 'deadLine',
        },
      ],
      tableData: [],
      optionList:[],
      stateArray: [{ name: '已完成' }, { name: '未完成' }],

      maskOpacity:1,
      isShowDetailBox:false,
      isShowDetailBox_2:false,
      detailInfo:{}
    };
  },
  watch: {
    isShow(nval) {
      if (nval) {
        this.tableData = [];
        this.total = 0;
        this.setColumn();
        this.currentPage = 1;
        this.fetchList();
      }
    },
  },
  mounted() {
    this.getBumpPointList();
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
    setColumn() {
      this.showPage = true;
      switch (this.currentType) {
        case '巡查任务':
          this.showState = true;
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'publishName',
            },
            {
              name: '文保员',
              props: 'nickName',
              format: (row) => {
                if (row.nickName) {
                  return row.nickName;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '事件内容',
              props: 'checkName',
            },
            {
              name: '完成状态',
              props: 'isOvertime',
              format: (row) => {
                // let mapType = {
                //   8: '问题上报',
                //   88: '气象预警',
                //   18: '行为监测',
                //   7: '稽查督查',
                //   11: '智能感知',
                //   12: '智能感知',
                //   13: '智能感知',
                //   14: '智能感知',
                //   15: '智能感知',
                //   3: '巡查上报',
                // };
                if (row.checkType == 8) {
                  if (row.jdIsRunState == 1) {
                    return '有问题';
                  } else {
                    return '非问题';
                  }
                } else if (row.checkType == 3) {
                  if (row.jdIsRunState == 1) {
                    return '立即处置';
                  } else if (row.jdIsRunState == 99) {
                    return '无需处置';
                  } else if (row.jdIsRunState == 2) {
                    return '无需审核';
                  } else if (row.jdIsRunState == 4) {
                    return '无法处置';
                  } else if (row.jdIsRunState == 0) {
                    return '待审核';
                  } else if (row.jdIsRunState == -1) {
                    return '待审核';
                  }
                } else {
                  if (row.isRun != 1 && row.isRun != 99) {
                    if (row.jdIsRunState == 1) {
                      return '完结';
                    } else if (row.jdIsRunState == 99) {
                      return '一网统管';
                    } else if (row.jdIsRunState == 2) {
                      return '无需审核';
                    } else if (row.jdIsRunState == 4) {
                      return '无法处置';
                    } else if (row.jdIsRunState == 0) {
                      return '待审核';
                    } else if (row.jdIsRunState == -1) {
                      return '待审核';
                    }
                  }
                }
              },
            },
            {
              name: '时间',
              props: 'checkCreateTime',
            },
          ];
          this.optionList=[
            {
              name:'',
              bgImg: require('@/assets/img3/btn.png')
            }
          ]
          break;
        case '培训任务':
          this.showState = false;
          this.showPage = false;
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'pointName',
            },
            {
              name: '文保员',
              props: 'userName',
            },
            {
              name: '巡查任务',
              props: 'message',
            },
            {
              name: '完成状态',
              props: 'bumpPointName',
              format: (row) => {
                return '已完成';
              },
            },
            {
              name: '时间',
              props: 'createTime',
            },
          ];
          this.optionList=[]
          break;
        case '处置事件':
          this.showState = true;
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'publishName',
            },
            {
              name: '文保员',
              props: 'nickName',
              format: (row) => {
                if (row.nickName) {
                  return row.nickName;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '事件内容',
              props: 'checkName',
            },
            {
              name: '完成状态',
              props: 'isOvertime',
              format: (row) => {
                // let mapType = {
                //   8: '问题上报',
                //   88: '气象预警',
                //   18: '行为监测',
                //   7: '稽查督查',
                //   11: '智能感知',
                //   12: '智能感知',
                //   13: '智能感知',
                //   14: '智能感知',
                //   15: '智能感知',
                //   3: '巡查上报',
                // };
                if (row.checkType == 8) {
                  if (row.jdIsRunState == 1) {
                    return '有问题';
                  } else {
                    return '非问题';
                  }
                } else if (row.checkType == 3) {
                  if (row.jdIsRunState == 1) {
                    return '立即处置';
                  } else if (row.jdIsRunState == 99) {
                    return '无需处置';
                  } else if (row.jdIsRunState == 2) {
                    return '无需审核';
                  } else if (row.jdIsRunState == 4) {
                    return '无法处置';
                  } else if (row.jdIsRunState == 0) {
                    return '待审核';
                  } else if (row.jdIsRunState == -1) {
                    return '待审核';
                  }
                } else {
                  if (row.isRun != 1 && row.isRun != 99) {
                    if (row.jdIsRunState == 1) {
                      return '完结';
                    } else if (row.jdIsRunState == 99) {
                      return '一网统管';
                    } else if (row.jdIsRunState == 2) {
                      return '无需审核';
                    } else if (row.jdIsRunState == 4) {
                      return '无法处置';
                    } else if (row.jdIsRunState == 0) {
                      return '待审核';
                    } else if (row.jdIsRunState == -1) {
                      return '待审核';
                    }
                  }
                }
              },
            },
            {
              name: '时间',
              props: 'checkCreateTime',
            },
          ];
          this.optionList=[
            {
              name:'',
              bgImg: require('@/assets/img3/btn.png')
            }
          ]
          break;
        case '人员组织':
          this.showState = false;
          this.showTime = false;
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'publishName',
            },
            {
              name: '党员',
              props: 'dy',
              format: (row) => {
                if (row.dy) {
                  return row.dy;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '文保员',
              props: 'wby',
              format: (row) => {
                if (row.wby) {
                  return row.wby;
                } else {
                  return '-';
                }
              },
            },
            {
              name: '志愿者',
              props: 'zyz',
              format: (row) => {
                if (row.zyz) {
                  return row.zyz;
                } else {
                  return '-';
                }
              },
            },
          ];
          this.optionList=[]
          break;
      }
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.fetchList();
    },
    fetchList() {
      let data = {
        orderByFlag: 1,
        typeName: this.currentType,
        count: this.currentCount,
        page: this.currentPage,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        startTime: this.searchParams.date && this.searchParams.date[0] ? this.searchParams.date[0] + ' 00:00:01' : undefined,
        endTime: this.searchParams.date && this.searchParams.date[1] ? this.searchParams.date[1] + ' 23:59:59' : undefined,
        typeState: this.searchParams.type,
      };
      if (this.$route.query.id) {
        data.pointId = this.$route.query.id;
        this.showPoint = false;
      } else {
        if (this.searchParams.pointName) {
          data.pointId = this.searchItemStored.id;
          data.publishName = this.searchItemStored.publishName;
        }
      }
      if (this.$route.query.zjmc) {
        data.zjmc = this.$route.query.zjmc;
      }
      switch (this.currentType) {
        case '巡查任务':
          screenBaseCheckFireProtection({
            ...data,
            checkType: 3,
          }).then((res) => {
            if (res && res.data && res.data.code && res.data.code == 200) {
              let shorter = res.data.data;
              if (shorter) {
                this.total = shorter.total;
                this.tableData = shorter.list;
              }
            }
          });
          break;
        case '培训任务':
        //   basecheckRenAntiData(data).then((res) => {
        //     if (res && res.data && res.data.code && res.data.code == 200) {
        //       let shorter = res.data.data;
        //       this.total = shorter.total;
        //       if (data.pointId && data.pointId == 11) {
        //         shorter.list.forEach((ele) => {
        //           ele.userIds = '田欢乐';
        //           ele.userName = '田欢乐';
        //         });
        //       } else {
        //         shorter.list.forEach((ele) => {
        //           if (ele.bumpPointId == '务本堂') {
        //             ele.userIds = '田欢乐';
        //             ele.userName = '田欢乐';
        //           }
        //         });
        //       }
        //       this.tableData = shorter.list;
        //     }
        //   });
          break;
        case '处置事件':
          screenBaseCheckFireProtection({
            ...data,
            checkType: 50,
          }).then((res) => {
            if (res && res.data && res.data.code && res.data.code == 200) {
              let shorter = res.data.data;
              if (shorter) {
                this.total = shorter.total;
                this.tableData = shorter.list;
              }
            }
          });
          break;
        case '人员组织':
          bumpPointBaseInfoScreenUserData(data).then((res) => {
            if (res && res.data && res.data.code && res.data.code == 200) {
              let shorter = res.data.data;
              if (shorter) {
                this.total = shorter.total;
                this.tableData = shorter.list;
              }
            }
          });
          break;
      }
    },
    search() {
      this.currentPage = 1;
      this.total = 0;
      this.tableData = [];
      this.setColumn();
      this.fetchList();
    },
    querySearch(queryString, cb) {
      var restaurants = this.bumpPointList.map((ele) => {
        return {
          value: ele.publishName,
          ...ele,
        };
      });
      var results = queryString ? restaurants.filter((i) => i.value.includes(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      // this.form.keyWord = item.value;
      //   this.searchParams.bumpPointId = item.id
    //   console.log('item', item);
      this.searchItemStored = item;
    },
    close() {
      this.searchParams = {
        pointName: '',
        type: '',
        date: [],
      };
      this.$emit('close');
    },
    // 获取文保点列表
    getBumpPointList() {
      if (this.$store.state.hugeListData && this.$store.state.hugeListData.length) {
        this.bumpPointList = this.$store.state.hugeListData;
      } else {
        let params = {
          currentPage: 1,
          pageSize: 600,
        };
        wbd_list2(params).then((res) => {
          // console.log("lol", res.data);
          this.bumpPointList = res.data.data.list;
        });
      }
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


    // 点击详情按钮
    showDetail(row,btnName){
      console.log( 'this.currentType',this.currentType ) 
      if(this.currentType=="巡查任务"){
        this.isShowDetailBox = true
      }else if(this.currentType=="处置事件"){
        this.isShowDetailBox_2 = true
      }
      this.maskOpacity = 0
      this.detailInfo = row
    },
    closeDetailBox(){
      this.isShowDetailBox = false
      this.maskOpacity = 1
    },
    closeDetailBox_2(){
      this.isShowDetailBox_2 = false
      this.maskOpacity = 1
    },
  },
};
</script>
<style lang="less" scoped>
.yxzsDetailHumanModalCon {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  background: rgba(0, 0, 0, 0.7);
}
.centerCon {
  width: 1126px;
  height: 826px;
  position: relative;
  background: url('../../../../assets/img4/s-pop-bg.png') no-repeat center;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 12px 35px 35px 35px;
  .close {
    width: 54px;
    height: 53px;
    position: absolute;
    top: 0px;
    right: 0px;
    background: url('../../../../assets/img4/close.png') no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
.head {
  width: 100%;
  height: 79px;
  background: url('../../../../assets/img4/pop-title.png') no-repeat center;
  background-size: auto 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Lucida Calligraphy', cursive, serif, sans-serif;
  font-size: 30px;
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
  height: 580px;
}
.pagination {
  text-align: center;
}
</style>
