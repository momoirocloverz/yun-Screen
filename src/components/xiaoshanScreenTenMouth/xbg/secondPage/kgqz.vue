<template>
  <div class="conkgqztainer" :style="{ opacity: maskOpacity }" v-if="isShow">
    <div class="center-container">
      <div class="head">考古前置</div>
      <div class="close" @click="close"></div>
      <div class="search-box">
        <div class="search-params">
          <span>项目名称:</span>
          <el-input size="mini" :style="{ width: `${130 / 192}rem !important` }" v-model="searchParams.xxmc" placeholder="项目名称"></el-input>
          <!-- <span>镇街:</span>
          <el-select
            clearable
            v-model="searchParams.jd"
            filterable
            size="mini"
            placeholder="镇街"
            :style="{ width: `${130 / 192}rem !important` }"
          >
            <el-option
              v-for="item in streetList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select> -->
          <span>移交情况:</span>
          <el-select clearable v-model="searchParams.transfer" filterable size="mini" placeholder="是否移交" :style="{ width: `${130 / 192}rem !important` }">
            <el-option
              v-for="item in [
                { id: '0', name: '是' },
                { id: '1', name: '否' },
              ]"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span>协议签订:</span>
          <el-select clearable v-model="searchParams.agreement" filterable size="mini" placeholder="协议签订" :style="{ width: `${130 / 192}rem !important` }">
            <el-option
              v-for="item in [
                { id: '0', name: '是' },
                { id: '1', name: '否' },
              ]"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span>当前进度:</span>
          <el-select clearable v-model="searchParams.progress" filterable size="mini" placeholder="当前进度" :style="{ width: `${130 / 192}rem !important` }">
            <el-option v-for="item in progressList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
          <span>发掘情况:</span>
          <el-select clearable v-model="searchParams.excavation" filterable size="mini" placeholder="发掘情况" :style="{ width: `${130 / 192}rem !important` }">
            <el-option v-for="item in excavationList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </div>
        <div class="btn-search" @click="search">搜索</div>
      </div>
      <div class="table-box">
        <Table :tableColumns="tableColums" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :optionList="optionList_kgkt" @btnClick="detailClick">
          <template slot="progress" slot-scope="scope">
            <span
              :style="{
                color: getColorAndImg('progress', scope.row.progress, 'color'),
                'padding-left': '5px',
              }"
            >
              <img
                :src="getColorAndImg('progress', scope.row.progress, 'img')"
                alt=""
                srcset=""
                :style="{
                  width: `${21 / 192}rem`,
                  height: `${21 / 192}rem`,
                  'margin-right': '5px',
                }"
              />
              {{ scope.row.progress | getProgress }}
            </span>
          </template>
          <template slot="excavation" slot-scope="scope">
            <span
              :style="{
                color: getColorAndImg('excavation', scope.row.excavation, 'color'),
                'justify-content': 'flex-start',
                'padding-left': '5px',
              }"
            >
              <img
                :src="getColorAndImg('excavation', scope.row.excavation, 'img')"
                alt=""
                srcset=""
                :style="{
                  width: `${17 / 192}rem`,
                  height: `${17 / 192}rem`,
                  'margin-right': '5px',
                }"
              />
              {{ scope.row.excavation | getExcavation }}
            </span>
          </template>
          <template slot="otherInfo" slot-scope="scope">
            <img v-show="scope.row.warningCount == 1" src="../../../../assets/img3/tag2@3x.png" alt="" srcset="" :style="{ height: `${30 / 192}rem`, width: 'auto' }" />
            <img v-show="scope.row.warningCount >= 2" src="../../../../assets/img3/tag1@3x.png" alt="" srcset="" :style="{ height: `${30 / 192}rem`, width: 'auto' }" />
          </template>
        </Table>
      </div>
      <div class="pagination">
        <el-pagination @current-change="pageNumChange" :current-page="currentPage" :page-size="pageSize" :pager-count="5" layout="total, prev, pager, next" :total="total"> </el-pagination>
      </div>
    </div>
    <KGQZDetail :isShow="isShow_kgkt" :row="row_kgkt" @close="close_kgkt" />
  </div>
</template>

<script>
import { wbd_list2, szzj } from '../../../../api/xsApi.js';
import { kgkt_List } from '../../../../api/xsApi2';
import Table from './component/table-kgqz';
import KGQZDetail from './kgqzDetail.vue';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: { Table, KGQZDetail },
  data() {
    return {
      searchParams: {},
      bumpPointList: [],
      streetList: [],
      progressList: [
        {
          name: '未勘探',
          id: 0,
        },
        {
          name: '勘探排队中',
          id: 1,
        },
        {
          name: '完成勘探',
          id: 2,
        },
        {
          name: '需要补探',
          id: 3,
        },
        {
          name: '已进场',
          id: 4,
        },
      ],
      excavationList: [
        {
          name: '无需发掘',
          id: 0,
        },
        {
          name: '正在发掘',
          id: 1,
        },
        {
          name: '完成发掘',
          id: 2,
        },
      ],
      maskOpacity: 1,
      currentPage: 1,
      pageSize: 15,
      tableColums: [
        {
          props: 'projectName',
          name: '项目名称',
          flex: 1.5,
        },
        {
          props: 'address',
          name: '地址',
          format: (row) => {
            if (row.address.length > 6) {
              return row.address.substr(0, 6) + '...';
            } else {
              return row.address;
            }
          },
        },
        {
          props: 'parcelName',
          name: '地块名称',
        },
        {
          props: 'landUnit',
          name: '做地单位',
        },
        {
          props: 'contactUser',
          name: '联系人',
          flex: 0.6,
        },
        // {
        //   props: "contactPhone",
        //   name: "联系方式"
        // },
        {
          props: 'landArea',
          name: '土地面积(㎡)',
        },
        {
          props: 'transfer',
          name: '土地是否已移交',
          flex: 0.6,
          format: (row) => {
            if (row.transfer == '0') {
              return '是';
            } else if (row.transfer == '1') {
              return '否';
            }
          },
        },
        {
          props: 'agreement',
          name: '是否签订协议',
          flex: 0.5,
          format: (row) => {
            if (row.agreement == '0') {
              return '是';
            } else if (row.agreement == '1') {
              return '否';
            }
          },
        },
        {
          props: 'prospect',
          name: '是否需勘探',
          format: (row) => {
            if (row.prospect == 0) {
              return '是';
            } else if (row.prospect == 1) {
              return '否';
            }
          },
        },
        {
          props: 'progress',
          name: '当前进展',
          withSlot: true,
        },
        {
          props: 'excavation',
          name: '发掘情况',
          withSlot: true,
        },
        {
          props: 'otherInfo',
          name: '',
          flex: 0.5,
          withSlot: true,
        },
      ],
      tableData: [],
      optionList_kgkt: [
        {
          flex: 0.8,
          bgImg: require('../../../../assets/img3/btn.png'),
        },
      ],
      total: 0,
      logo_kgkt: '2',
      row_kgkt: {}, // 选中的数据
      // 当前进展
      progress_1: require('../../../../assets/img3/dqjz_1.png'),
      progress_2: require('../../../../assets/img3/dqjz_2.png'),
      progress_3: require('../../../../assets/img3/dqjz_3.png'),
      progress_4: require('../../../../assets/img3/dqjz_4.png'),
      progress_5: require('../../../../assets/img3/dqjz_5.png'),
      // 发掘情况
      excavation_1: require('../../../../assets/img3/fjqk_1.png'),
      excavation_2: require('../../../../assets/img3/fjqk_2.png'),
      excavation_3: require('../../../../assets/img3/fjqk_3.png'),
      // 勘探详情弹框
      isShow_kgkt: false,
    };
  },
  mounted() {
    this.getStreetList();
    this.getBumpPointList();
    this.getKGKT_list();
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
  filters: {
    getProgress(value) {
      switch (value) {
        case 0:
          return '未勘探';
        case 1:
          return '勘探排队中';
        case 2:
          return '完成勘探';
        case 3:
          return '需要补探';
        case 4:
          return '已进场';
        default:
          break;
      }
    },
    getExcavation(value) {
      switch (value) {
        case 0:
          return '无需发掘';
        case 1:
          return '正在发掘';
        case 2:
          return '完成发掘';
        default:
          break;
      }
    },
  },
  methods: {
    pageNumChange(val) {
      this.currentPage = val;
      this.getKGKT_list();
    },
    search() {
      this.getKGKT_list();
    },
    // 获取考古勘探列表
    getKGKT_list() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        dqjd: this.searchParams.progress,
        fjqk: this.searchParams.excavation,
        jd: this.searchParams.jd,
        pointName: this.searchParams.xxmc,
        xyqd: this.searchParams.agreement,
        yjqk: this.searchParams.transfer,
      };
      kgkt_List(params).then((res) => {
        // console.log("考古勘探列表", res.data.data);
        this.total = res.data.data.total;
        this.tableData = res.data.data.list;
        this.logo_kgkt += '1';
      });
    },
    close() {
      this.$emit('close');
    },
    // 考古勘探详情
    detailClick(row) {
      // console.log('考古勘探', row);
      this.row_kgkt = row;
      this.maskOpacity = 0;
      this.isShow_kgkt = true;
    },
    close_kgkt() {
      this.maskOpacity = 1;
      this.isShow_kgkt = false;
    },
    // 获取文保点列表
    getBumpPointList() {
      let params = {
        currentPage: 1,
        pageSize: 300,
      };
      //   wbd_list62(params).then(res => {
      //     // console.log("lol", res.data);
      //     this.bumpPointList = res.data.data.list;
      //   });
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
    // 根据字段，判断颜色和图片
    getColorAndImg(key, value, returnType) {
      let color, img;
      if (key === 'progress') {
        switch (value) {
          case 0:
            color = '#9c9998';
            img = this.progress_1;
            break;
          case 1:
            color = '#f89a7c';
            img = this.progress_4;
            break;
          case 2:
            color = '#2fd692';
            img = this.progress_2;
            break;
          case 3:
            color = '#28aadb';
            img = this.progress_3;
            break;
          case 4:
            color = '#fdd89f';
            img = this.progress_5;
            break;

          default:
            break;
        }
      } else if (key === 'excavation') {
        switch (value) {
          case 0:
            color = '#9c9998';
            img = this.excavation_1;
            break;
          case 1:
            color = '#f99a7d';
            img = this.excavation_3;
            break;
          case 2:
            color = '#2fd692';
            img = this.excavation_2;
            break;
          default:
            break;
        }
      }
      if (returnType === 'color') {
        return color;
      } else if (returnType === 'img') {
        return img;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.conkgqztainer {
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
    width: 1526px;
    height: 914px;
    position: relative;
    background: url('../../../../assets/img4/pop-bg.png') no-repeat center;
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
      height: 700px;
    }
    .pagination {
      text-align: center;
    }
  }
}
</style>
