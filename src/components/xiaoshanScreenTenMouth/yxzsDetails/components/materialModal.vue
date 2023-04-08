<template>
  <div class="yxzsDetailMaterialModalCon" v-if="isShow" :style="{opacity:maskOpacity}">
    <div class="centerCon">
      <div class="head">{{ currentType }}</div>
      <div class="close" @click="close"></div>
      <div class="search-box">
        <div class="search-params">
          <span v-if="showPoint">文保单位: </span>
          <el-select
            v-if="showPoint"
            class="inline-input"
            v-model="searchParams.pointId"
            size="mini"
            filterable 
            clearable 
            placeholder="文保单位"
            :style="{ width: `${180 / 192}rem !important` }"
          >
            <el-option v-for="item in bumpPointList" :key="item.id" :label="item.publishName" :value="item.id"> </el-option>
          </el-select>
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
        <cusTable :tableColumns="tableColumns" :tableData="tableData" :optionList="optionList" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="false" @btnClick="showDetail"></cusTable>
      </div>
      <div class="pagination">
        <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>

    <Detail :isShow="isShowDetailBox" :row="detailInfo" @close="closeDetailBox" />

  </div>
</template>
<script>
import _ from 'lodash';
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
import { get_WF_list_data } from '../../../../api/xsApi3.js';
import { mapState } from 'vuex';
import staticData from './staticTempIntelligenList.json';

import Detail from './wuFangDetail'
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
    cusTable: () => import(/* webpackChunkName: "yxzsDetailenvironmentMHumanMTable" */ './table'),
  },
  data() {
    return {
      showPoint: true,
      showTime: false,
      showStatus: false,


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
          props: 'pointName',
        },
        {
          name: '应配置数量',
          props: 'facilitiesConfigureNumber',
        },
        {
          name: '配置数量',
          props: 'facilitiesRealNumber',
        },
        {
          name: '配置状态',
          props: 'configurationState',
        },
        // {
        //   name: '灭火器状态',
        //   props: 'dataState',
        //   format: (row) => {
        //     if (row.dataState == 1) {
        //       return '已完成';
        //     } else {
        //       return '未完成';
        //     }
        //   },
        // },
        // {
        //   name: '时间',
        //   props: 'createTime',
        // },
      ],
      tableData: [],
      optionList:[],
      stateArray: [
        { name: '已完成', id: '正常' },
        { name: '未完成', id: '维修' },
      ],

      maskOpacity:1,
      isShowDetailBox:false,
      detailInfo:{}
    };
  },
  computed: {
    // ...mapState(['tempHugeIntelligenceList']),
  },
  watch: {
    isShow(nval) {
      if (nval) {
        this.total = 0;
        this.tableData = [];
        this.currentPage = 1;
        this.getList();

        if(this.$route.query.id){
          this.searchParams.pointId = this.$route.query.id
        }

        this.optionList=[
          {
            name:'',
            bgImg: require('@/assets/img3/btn.png')
          }
        ]

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
    pageNumChange(val) {
      this.currentPage = val;
      this.getList();
    },
    search() {
      this.currentPage = 1;
      this.total = 0;
      this.tableData = [];
      this.getList();
    },
    getList(){
      let params={
        bumpPointId:this.$route.query.id?this.$route.query.id:this.searchParams.pointId,
        currentPage:this.currentPage,
        pageSize:this.pageSize,
        facilitiesType:this.currentType
      }
      get_WF_list_data(params).then(res=>{
        console.log('物防列表',res.data.data)
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
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


    // 点击详情按钮
    showDetail(row,btnName){
      console.log(row,btnName)
      this.isShowDetailBox = true
      this.maskOpacity = 0
      this.detailInfo = row
    },
    closeDetailBox(){
      console.log('42')
      this.isShowDetailBox = false
      this.maskOpacity = 1
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
