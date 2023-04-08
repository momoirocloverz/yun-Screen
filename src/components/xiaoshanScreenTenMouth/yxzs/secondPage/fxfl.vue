<template>
  <div class="confxfltainer" v-if="isShow" :style="{ opacity: maskOpacity }">
    <div class="center-container">
      <div class="head">萧山文保风险分类分析</div>
      <div class="close" @click="close"></div>
      <div class="search-box">
        <div class="search-params">
          <span>文保单位:</span>
          <el-autocomplete
            class="inline-input"
            v-model="searchParams.pointName"
            size="mini"
            :fetch-suggestions="querySearch"
            placeholder="文保单位"
            @select="handleSelect"
            :style="{ width: `${180 / 192}rem !important` }"
          ></el-autocomplete>
          <!-- <el-select clearable v-model="searchParams.pointName" filterable size="mini" placeholder="文物" :style="{ width: `${180 / 192}rem !important` }">
            <el-option v-for="item in bumpPointList" :key="item.id" :label="item.publishName" :value="item.publishName"> </el-option>
          </el-select> -->
          <span>镇街:</span>
          <el-select clearable v-model="searchParams.jd" filterable size="mini" placeholder="镇街" :style="{ width: `${180 / 192}rem !important` }">
            <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
          <span>风险类别:</span>
          <el-select v-model="searchParams.fxfl" clearable size="mini" placeholder="风险分类" :style="{ width: `${180 / 192}rem !important` }">
            <el-option v-for="item in riskTypeList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
          <span>处置状态:</span>
          <el-select v-model="searchParams.czzt" clearable size="mini" placeholder="处置状态" :style="{ width: `${180 / 192}rem !important` }">
            <el-option v-for="item in czztList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
        </div>
        <div class="btn-search" @click="search">搜索</div>
      </div>
      <div class="table-box">
        <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="false" :optionList="optionList" @btnClick="operateClick">
          <template slot="riskLevel" slot-scope="scope">
            <div style="width: 100%; display: flex; align-items: center">
              <img
                :style="{
                  width: `${19 / 192}rem`,
                  height: `${17 / 192}rem`,
                  marginRight: '5px',
                }"
                v-show="scope.row.riskLevel == '1'"
                src="../../../../assets/img4/l-icon@3x.png"
                alt=""
                srcset=""
              />
              <span v-show="scope.row.riskLevel == '1'" style="color: #4bfffe">低</span>
              <img
                :style="{
                  width: `${19 / 192}rem`,
                  height: `${17 / 192}rem`,
                  marginRight: '5px',
                }"
                v-show="scope.row.riskLevel == '2'"
                src="../../../../assets/img4/c-icon@3x.png"
                alt=""
                srcset=""
              />
              <span v-show="scope.row.riskLevel == '2'" style="color: #ffe082">中</span>
              <img
                :style="{
                  width: `${19 / 192}rem`,
                  height: `${17 / 192}rem`,
                  marginRight: '5px',
                }"
                v-show="scope.row.riskLevel == '3'"
                src="../../../../assets/img4/h-icon@3x.png"
                alt=""
                srcset=""
              />
              <span v-show="scope.row.riskLevel == '3'" style="color: #ff3e46">高</span>
            </div>
          </template>
        </Table>
      </div>
      <div class="pagination">
        <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
      </div>
    </div>
    <FXLYDetail :isShow="isShowDetailBox" :row="detailInfo" @close="closeDetailBox" />
  </div>
</template>
<script>
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
import { get_fxfl_detail, screenV3getHzfxyhqd } from '../../../../api/xsApi3.js';
import Table from './component/table';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    FXFLOtherParams: {
      type: Object,
      default: {},
    },
  },
  components: { Table, FXLYDetail: () => import(/* webpackChunkName: "FXLY43Detail" */ '@/components/xiaoshanScreenTenMouth/yxzs/secondPage/fxlyDetail') },
  data() {
    return {
      optionList: [
        {
          name: '',
          bgImg: require('@/assets/img3/btn.png'),
        },
      ],
      searchItemStored: {},
      searchParams: {
        pointName: '',
        jd: '',
        fxfl: '',
        czzt: '',
      },
      bumpPointList: [],
      streetList: [],
      czztList: [
        {
          name: '已处置',
          id: '1',
        },
        {
          name: '待处置',
          id: '0',
        },
      ],
      riskTypeList: [
        {
          name: '用电用气隐患',
          id: '1',
        },
        {
          name: '违规用火隐患',
          id: '2',
        },
        {
          name: '易燃易爆隐患',
          id: '3',
        },
        {
          name: '其他',
          id: '4',
        },
      ],
      tableColumns: [
        {
          name: '文保单位',
          props: 'pointName',
        },
        {
          name: '镇街',
          props: 'jd',
        },
        // {
        //   name: '永兴指数',
        //   props: 'sum',
        // },
        {
          name: '风险类别',
          props: 'fxfl',
        },
        {
          name: '处置状态',
          props: 'czzt',
        },
        {
          name: '发布时间',
          props: 'createTime',
        },
      ],
      tableData: [],
      pageSize: 15,
      currentPage: 1,
      total: 0,
      stableData: [],
      isShowDetailBox: false,
      maskOpacity: 1,
      detailInfo: {},
    };
  },
  mounted() {
    this.getStreetList();
    this.getBumpPointList();
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
    isShow(nval) {
      this.currentPage = 1;
      this.searchParams.pointName = '';
      this.searchParams.jd = '';
      this.searchParams.fxfl = '';
      this.searchParams.czzt = '';
      this.total = 0;
      this.tableData = [];
      if (nval) {
        if (this.FXFLOtherParams.fxfl) {
          this.searchParams.pointName = this.FXFLOtherParams.pointName;
          this.searchParams.fxfl = this.FXFLOtherParams.fxfl;
          this.getFXFL_detail();
        } else {
          this.getFXFL_detail();
        }
      }
    },
  },
  methods: {
    operateClick(row) {
      this.isShowDetailBox = true;
      this.maskOpacity = 0;
      this.detailInfo = row;
    },
    closeDetailBox() {
      this.isShowDetailBox = false;
      this.maskOpacity = 1;
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
      this.searchItemStored = item;
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.getFXFL_detail();
    },
    search() {
      this.currentPage = 1;
      this.getFXFL_detail();
    },
    getFXFL_detail() {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        fxfl: this.searchParams.fxfl,
        jd: this.searchParams.jd,
        pointName: this.searchParams.pointName,
        czzt: this.searchParams.czzt,
      };
      screenV3getHzfxyhqd(data).then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          if (shorter) {
            this.total = shorter.total;
            // shorter.list.forEach((ele) => {
            //   ele.sum = ele.btf ? +ele.btf : 0 + ele.hjf ? +ele.hjf : 0 + ele.rff ? +ele.rff : 0 + ele.wff ? +ele.wff : 0 + ele.zff ? +ele.zff : 0;
            // });
            this.tableData = shorter.list;
          }
        }
      });
    },
    close() {
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
  },
};
</script>

<style lang="less" scoped>
.confxfltainer {
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
    width: 1226px;
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
      height: 600px;
    }
    .pagination {
      text-align: center;
    }
  }
}
</style>
