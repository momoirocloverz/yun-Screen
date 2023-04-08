<template>
  <div class="yxzsDetailMaterialModalCon" v-if="isShow">
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
          <span v-if="showStatus">完成状态: </span>
          <el-select v-if="showStatus" clearable v-model="searchParams.type" filterable size="mini" placeholder="类别" :style="{ width: `${120 / 192}rem !important` }">
            <el-option v-for="item in stateArray" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
          <span v-if="showTime">时间: </span>
          <el-date-picker
            v-if="showTime"
            clearable
            size="mini"
            v-model="searchParams.date"
            :style="{ width: `${240 / 192}rem !important` }"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div class="btn-search" @click="search">搜索</div>
      </div>
      <div class="table-box">
        <cusTable v-if="showNormal" :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="false"></cusTable>
        <cusTableSp v-else :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="false"></cusTableSp>
      </div>
      <div class="pagination">
        <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
import { basecheckPhysicalDefenseData, basecheckPhysicalDefenseV2Data } from '../../../../api/xsApi3.js';
import { mapState } from 'vuex';
import staticData from './staticTempIntelligenList.json';
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
    cusTable: () => import(/* webpackChunkName: "yxzsDetailenvironmentMHumanMTable" */ './table'),
    cusTableSp: () => import(/* webpackChunkName: "yxzsDetailenvironmentMHumanMTableSp" */ './tableSp'),
  },
  data() {
    return {
      showPoint: true,
      showTime: true,
      showStatus: true,
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
          name: '应配置数量',
          props: 'facilitiesConfigNumber',
        },
        {
          name: '配置数量',
          props: 'facilitiesRealNumber',
        },
        {
          name: '配置状态',
          props: 'facilitiesRealNumber',
          format: (row) => {
            if (+row.facilitiesRealNumber - +row.facilitiesConfigNumber == 0) {
              return '已完成';
            } else {
              return '未完成';
            }
          },
        },
        {
          name: '灭火器状态',
          props: 'dataState',
          format: (row) => {
            if (row.dataState == 1) {
              return '已完成';
            } else {
              return '未完成';
            }
          },
        },
        {
          name: '时间',
          props: 'createTime',
        },
      ],
      tableData: [],
      stateArray: [
        { name: '已完成', id: '正常' },
        { name: '未完成', id: '维修' },
      ],
      showNormal: true,
    };
  },
  computed: {
    // ...mapState(['tempHugeIntelligenceList']),
  },
  watch: {
    isShow(nval) {
      if (nval) {
        this.setColumn();
        this.total = 0;
        this.tableData = [];
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
    commonSetColumn() {
      this.tableColumns = [
        {
          name: '文保单位',
          props: 'bumpPointId',
        },
        {
          name: '应配置数量',
          props: 'facilitiesConfigNumber',
        },
        {
          name: '配置数量',
          props: 'facilitiesRealNumber',
        },
        {
          name: '配置状态',
          props: 'facilitiesRealNumber',
          format: (row) => {
            if (+row.facilitiesRealNumber - +row.facilitiesConfigNumber == 0) {
              return '已完成';
            } else {
              return '未完成';
            }
          },
        },
        {
          name: '状态',
          props: 'dataState',
          format: (row) => {
            if (row.dataState == 1) {
              return '正常';
            } else {
              return '维修';
            }
          },
        },
        {
          name: '时间',
          props: 'createTime',
        },
      ];
      this.showNormal = true;
      this.showTime = true;
      this.showStatus = true;
    },
    setColumn() {
      switch (this.currentType) {
        case '灭火器':
          this.commonSetColumn();
          break;
        case '消防栓':
          this.commonSetColumn();
          break;
        case '消防水缸':
          this.commonSetColumn();
          break;
        case '智能设备':
          this.tableColumns = [
            {
              name: '文保单位',
              props: 'poIntName',
            },
            {
              name: '护保员',
              props: 'userName',
            },
            {
              name: '设备名称',
              props: 'bumpPointName',
            },
            {
              name: '设备数量',
              props: 'facilitiesRealNumber',
            },
            {
              name: '在线数量',
              props: 'dataState',
            },
            // {
            //   name: '时间',
            //   props: 'createTime',
            // },
          ];
          this.showNormal = false;
          this.showTime = false;
          this.showStatus = false;
          break;
      }
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.fetchList();
    },
    commonRequest() {
      let data = {
        typeName: this.currentType,
        count: this.currentCount,
        page: this.currentPage,
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
        }
      }
      if (this.$route.query.zjmc) {
        data.zjmc = this.$route.query.zjmc;
      }
      basecheckPhysicalDefenseData(data).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          this.total = shorter.total;
          if (data.pointId && data.pointId == 11) {
            shorter.list.forEach((ele) => {
              ele.userIds = '田欢乐';
              ele.userName = '田欢乐';
            });
          }
          this.tableData = shorter.list;
        }
      });
    },
    fetchList() {
      switch (this.currentType) {
        case '灭火器':
          this.commonRequest();
          break;
        case '消防栓':
          this.commonRequest();
          break;
        case '消防水缸':
          this.commonRequest();
          break;
        case '智能设备':
          this.tempHugeIntelligenceList = staticData;
          this.anlyseData();
          //   if (this.tempHugeIntelligenceList && this.tempHugeIntelligenceList.length) {
          //     // this.tableData = this.tempHugeIntelligenceList;
          //     // this.total = this.tempHugeIntelligenceList.length;
          //     console.log(JSON.parse(JSON.stringify(this.tempHugeIntelligenceList)));
          //     this.anlyseData();
          //   } else {
          //     basecheckPhysicalDefenseV2Data({}).then((res) => {
          //       if (res && res.data && res.data.code && res.data.code == 200) {
          //         let nameList = [];
          //         let shorter = res.data.data;
          //         shorter.forEach((ele) => {
          //           nameList.push({
          //             name: ele.poIntId,
          //           });
          //         });
          //         let afterNameList = _.unionBy(nameList, 'name');
          //         let finalArray = [];
          //         // let temp = [];
          //         afterNameList.forEach((ele) => {
          //           let middleStage = [];
          //           shorter.forEach((sub, subIndex) => {
          //             if (ele.name == sub.poIntId) {
          //               sub.totalAll = String(sub.totalAll);
          //               sub.online = String(sub.online);
          //               middleStage.push(sub);
          //             }
          //           });
          //           finalArray.push({ array: middleStage });
          //           //   if (middleStage.length < 4) {
          //           //     temp.push(middleStage);
          //           //   }
          //         });
          //         // console.log(temp);
          //         finalArray.forEach((ele) => {
          //           ele.jd = ele.array[0].jd;
          //           ele.poIntId = ele.array[0].poIntId;
          //           ele.poIntName = ele.array[0].poIntName;
          //           ele.userName = ele.array[0].userName;
          //         });
          //         this.$store.commit('setTempHugeIntelligenceList', finalArray);
          //         this.anlyseData();
          //       }
          //     });
          //   }
          break;
      }
    },
    anlyseData() {
      let data = {
        page: this.currentPage,
        pageSize: this.pageSize,
      };
      if (this.$route.query.id) {
        data.pointId = this.$route.query.id;
        this.showPoint = false;
      } else {
        if (this.searchParams.pointName) {
          data.pointId = this.searchItemStored.id;
        }
      }
      if (this.$route.query.zjmc) {
        data.zjmc = this.$route.query.zjmc;
      }
      let after1 = this.tempHugeIntelligenceList.filter((ele) => {
        if (data.zjmc) {
          return data.zjmc.indexOf(ele.jd) > -1;
        } else {
          return ele;
        }
      });
      let after2 = after1.filter((ele) => {
        if (data.pointId) {
          return data.pointId == ele.poIntId;
        } else {
          return ele;
        }
      });
      // console.log('after2', after2);
      let after5 = [];
      if (after2.length >= 15) {
        this.tableData = after2.slice((data.page - 1) * 15, data.page * 15);
        this.total = after2.length;
      } else {
        after5 = after2;
        this.total = after2.length;
        this.tableData = after5;
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
  },
};
</script>
<style lang="less" scoped>
.yxzsDetailMaterialModalCon {
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
  height: 580px;
}
.pagination {
  text-align: center;
}
</style>
