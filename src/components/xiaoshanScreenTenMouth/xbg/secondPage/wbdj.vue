<template>
  <div class="conwbdjtainer" v-if="isShow">
    <div class="center-container">
      <div class="head">萧山文保单位</div>
      <div class="close" @click="close"></div>
      <div class="search-box">
        <div class="search-params">
          <span>文保单位: </span>
          <el-input size="mini" :style="{ width: `${120 / 192}rem !important` }" v-model="searchParams.publishName" placeholder="文保单位"></el-input>
          <span>镇街: </span>
          <el-select clearable v-model="searchParams.jd" filterable size="mini" placeholder="镇街" :style="{ width: `${120 / 192}rem !important` }">
            <el-option v-for="item in streetList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
          <span>文保等级: </span>
          <el-select clearable v-model="searchParams.rank" filterable size="mini" placeholder="文保等级" :style="{ width: `${120 / 192}rem !important` }">
            <el-option v-for="item in rankList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
          <span>文保分类: </span>
          <el-select clearable v-model="searchParams.category" filterable size="mini" placeholder="文保分类" :style="{ width: `${120 / 192}rem !important` }">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
          </el-select>
        </div>
        <div class="btn-search" @click="search">搜索</div>
      </div>
      <div class="table-box">
        <Table :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="true" :optionList="optionList" @btnClick="showDetail">
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
  </div>
</template>

<script>
import { wbd_list, szzj } from '../../../../api/xsApi.js';
import Table from './component/table';

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
      optionList: [
        {
          name: '',
          bgImg: require('@/assets/img3/btn.png'),
        },
      ],
      searchParams: {},
      streetList: [],
      rankList: [
        {
          name: '国保单位',
          id: '14da5819da904c4ab1d9d94a961ca27a',
        },
        {
          name: '省保单位',
          id: 'cef2a80fbea6df89578ad5599b67b71f',
        },
        {
          name: '市保单位',
          id: '2bf3be523de944ec3ee1ad832a7a2587',
        },
        {
          name: '市级文保点',
          id: 'b16db07f34112b9b0fc6d2b54214e0aa',
        },
        {
          name: '一般文物',
          id: 'ac38ee765b5e5155b8bb3eadc1b5aa8d',
        },
      ],
      categoryList: [
        {
          name: '古建筑',
          id: '1',
        },
        {
          name: '近现代重要史迹及代表性建筑',
          id: '2',
        },
        {
          name: '古遗址',
          id: '3',
        },
        {
          name: '古墓葬',
          id: '4',
        },
        {
          name: '碑刻',
          id: '5',
        },
      ],

      tableColumns: [
        {
          name: '文保单位',
          props: 'publishName',
          format: (row) => {
            if (row.publishName && row.publishName.length > 8) {
              return row.publishName.substr(0, 8) + '...';
            } else {
              return row.publishName;
            }
          },
        },
        {
          name: '街道',
          props: 'jd',
          flex: 0.5,
        },
        {
          name: '地址',
          props: 'address',
          flex: 2,
          format: (row) => {
            if (row.address && row.address.length > 16) {
              return row.address.substr(0, 16) + '...';
            } else {
              return row.address;
            }
          },
        },
        {
          name: '文保等级',
          props: 'rank',
          format: (row) => {
            switch (row.rank) {
              case '14da5819da904c4ab1d9d94a961ca27a':
                return '国保单位';
              case 'cef2a80fbea6df89578ad5599b67b71f':
                return '省保单位';
              case '2bf3be523de944ec3ee1ad832a7a2587':
                return '市保单位';
              case 'b16db07f34112b9b0fc6d2b54214e0aa':
                return '市级文保点';
              case 'ac38ee765b5e5155b8bb3eadc1b5aa8d':
                return '一般文物';
              default:
                break;
            }
          },
        },
        {
          name: '文保分类',
          props: 'category',
          format: (row) => {
            if (row.category && row.category.length > 8) {
              return row.category.substr(0, 8) + '...';
            } else {
              return row.category;
            }
          },
        },
      ],
      tableData: [
        {
          publishName: '务本堂',
          jd: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          rank: '2',
          riskStatus: '高——>低',
          category: '巡查上报',
        },
        {
          publishName: '务本堂',
          jd: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          rank: '1',
          riskStatus: '高——>低',
          category: '巡查上报',
        },
        {
          publishName: '务本堂',
          jd: '进化镇',
          address: '欢潭村欢潭旅游度假村',
          name: '田欢乐',
          riskNum: '80分',
          rank: '3',
          riskStatus: '高——>低',
          category: '巡查上报',
        },
      ],
      pageSize: 15,
      currentPage: 1,
      total: 0,
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
  methods: {
    showDetail(row, btnName) {
      this.$emit('close');
      this.$nextTick(() => {
        this.$store.commit('setHookMapReactionWithTopData', {
          jd: row.publishName,
          bumpPointId: row.id,
        });
        this.$store.commit('setCurrentAreaName', row.publishName);
        this.$router
          .push({
            name: 'wbdCopy',
            query: { id: row.id },
          })
          .catch((err) => {
            console.log('err');
          });
        if (row.publishName == '务本堂') {
          this.$store.commit('setIsGlobalShowModel', true);
        }
      });
    },
    pageNumChange(val) {
      this.currentPage = val;
      this.getBumpPointList();
    },
    search() {
      this.currentPage = 1;
      this.getBumpPointList();
    },
    close() {
      this.$emit('close');
    },
    // 获取文保点列表
    getBumpPointList() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        publishName: this.searchParams.publishName,
        jd: this.searchParams.jd,
        rank: this.searchParams.rank,
        category: this.searchParams.category,
      };
      wbd_list(params).then((res) => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
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
.conwbdjtainer {
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
      height: 600px;
    }
    .pagination {
      text-align: center;
    }
  }
}
</style>
