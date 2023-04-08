<template>
  <div class="container">
    <Box :height="'290px'" :bgSrc="require('../../../assets/imgBoxBg/wbd-bg1.png')">
      <div class="part-1">
        <Title :text="'文物基本情况'">
          <div class="btn" @click="checkDetail">查看详情</div>
        </Title>
        <div class="info-box">
          <div class="left">
            <div v-if="IsWBdFlag" class="culturalImage" :style="{ backgroundImage: `url(${wbdLocalImage})` }"></div>
            <div v-else class="culturalImage" :style="{ backgroundImage: regularImage ? `url(   ${imageSecPrefix}${regularImage})` : `url(${holderImg})` }"></div>
          </div>
          <div class="right">
            <div class="row">
              <span>文物名称：</span>
              <span>{{ (globalData && globalData.goodsData && globalData.goodsData.publishName) || '务本堂' }}</span>
            </div>
            <div class="row">
              <span>文物分类：</span>
              <span> {{ (globalData && globalData.goodsData && globalData.goodsData.category) || '古建筑' }}</span>
            </div>
            <div class="row">
              <span>文物级别：</span>
              <span> {{ (globalData && globalData.goodsData && globalData.goodsData.rank && rankMap[globalData.goodsData.rank]) || '省保单位' }} </span>
            </div>
            <div class="row">
              <span>分布情况：</span>
              <el-tooltip :popperClass="'popperTip'" :content="globalData && globalData.goodsData && globalData.goodsData.specificDistribution" placement="top-start">
                <span> {{ (globalData && globalData.goodsData && globalData.goodsData.specificDistribution) || '务本堂一处' }} </span>
              </el-tooltip>
            </div>
            <div class="row">
              <span>文物地址：</span>
              <el-tooltip :popperClass="'popperTip'" :content="globalData && globalData.goodsData && globalData.goodsData.address" placement="top-start">
                <span> {{ (globalData && globalData.goodsData && globalData.goodsData.address) || '进化镇欢潭村' }} </span>
              </el-tooltip>
            </div>
            <div class="row">
              <span>保护范围：</span>
              <el-tooltip :popperClass="'popperTip'" :content="globalData && globalData.goodsData && globalData.goodsData.protectionArea" placement="top-start">
                <span> {{ (globalData && globalData.goodsData && globalData.goodsData.protectionArea) || '总面积6022平方米' }} </span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'290px'" :bgSrc="require('../../../assets/imgBoxBg/wbd-bg2.png')">
      <div class="part-2">
        <Title :text="'主体责任部门'"></Title>
        <div class="gov">
          <img src="../../../assets/img4/tubiao.png" alt="" />
          <div class="info">
            <span>安全责任管理单位</span>
            <span>{{ (globalData && globalData.goodsData && globalData.goodsData.jd) || '进化镇' }}人民政府</span>
          </div>
        </div>
        <div class="list">
          <div class="item">
            <span>直接责任人：</span>
            <span class="commonName">{{ (globalData && globalData.goodsData && globalData.goodsData.directlyLiableUser) || '洪波' }}</span>
            <span>联系方式：</span>
            <span>{{ (globalData && globalData.goodsData && globalData.goodsData.directlyLiableUserPhone) || '82454003' }}</span>
          </div>
          <div class="item">
            <span>安全管理人：</span>
            <span class="commonName">{{ (globalData && globalData.goodsData && globalData.goodsData.safetyManager) || '梅李栋' }}</span>
            <span>联系方式：</span>
            <span>{{ (globalData && globalData.goodsData && globalData.goodsData.safetyManagerPhone) || '13738022466' }}</span>
          </div>
        </div>
      </div>
    </Box>
    <Box :height="'300px'" :bgSrc="require('../../../assets/imgBoxBg/wbd-bg3.png')">
      <div class="part-3">
        <Title :text="'监管责任部门'"> </Title>
        <div class="jg-table">
          <Table
            :tableData="tableData_jgzrbm"
            :tableColumns="tableColumn_jgzrbm"
            :isStripe="true"
            :headTextColor="'#b7bedc'"
            :headHeight="`${35 / 192}rem`"
            :headBgColor="'rgba(139,180,255, 0.22)'"
            :rowHeight="`${34 / 192}rem`"
            :rowTextColor="'#a8b0d0'"
          >
          </Table>
        </div>
      </div>
    </Box>
    <BasicInfoBox :isShow="basicBoxShow" :basicData="basicData" @close="basicBoxHidden" :realImage="regularImage" />
  </div>
</template>
<script>
import Box from '../components/box';
import Title from '../components/title';
import Table from './components/table';
import BasicInfoBox from '../../xiaoshanComponentsNew/firstPage/components/basicInfoBox.vue';
import { eventBus } from '@/main';
import { getBumpPointBaseInfoById } from '../../../api/xsApi3';
import { wbd_list } from '../../../api/xsApi';
import { imageSecPrefix } from '@/utils/const';
import { formatName, formatPhone } from '@/utils/tools';
export default {
  components: { Box, Title, Table, BasicInfoBox },
  data() {
    return {
      basicData: {},
      basicBoxShow: false,
      IsWBdFlag: false,
      regularImage: '',
      wbdLocalImage: require('../../../assets/wwImg/务本堂.png'),
      holderImg: require('../../../assets/wwImg/holder.png'),
      imageSecPrefix,
      globalData: {},
      rankMap: {
        '14da5819da904c4ab1d9d94a961ca27a': '国保单位',
        cef2a80fbea6df89578ad5599b67b71f: '省保单位',
        '2bf3be523de944ec3ee1ad832a7a2587': '市保单位',
      },
      tableColumn_jgzrbm: [
        {
          props: 'companyName',
          name: '单位名称',
        },
        {
          props: 'name',
          name: '联系人',
          format: (row) => {
            if (row.name) {
              return formatName(row.name);
            } else {
              return '-';
            }
          },
        },
        {
          props: 'phone',
          name: '联系电话',
          format: (row) => {
            if (row.phone) {
              return formatPhone(row.phone);
            } else {
              return '-';
            }
          },
        },
      ],
      tableData_jgzrbm: [
        {
          companyName: '区公安分局',
          name: '李晓文',
          phone: '13745698417',
        },
        // {
        //   companyName: '区文物局',
        //   name: '李晓文',
        //   phone: '13745698417',
        // },
      ],
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == 'zbz') {
      //   next('/xbg');
      next((vm) => {
        vm.$router.go(-1);
      });
    } else {
      next();
    }
  },
  watch: {
    $route(nval, val) {
      if (nval && nval.query && nval.query.id) {
        this.fetchData();
      }
    },
  },
  created() {
    eventBus.$on('bumpPointClick', (msg) => {
      //   console.log('传参--左', msg)
    });
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    checkDetail() {
      let params = {
        pageSize: 10,
        currentPage: 1,
        publishName: this.globalData.goodsData.publishName,
      };
      wbd_list(params).then((res) => {
        this.basicData = res.data.data.list[0];
        this.basicBoxShow = true;
      });
    },
    basicBoxHidden() {
      this.basicBoxShow = false;
    },
    fetchData() {
      this.regularImage = '';
      this.IsWBdFlag = false;
      if (this.$route.query && this.$route.query.id) {
        getBumpPointBaseInfoById({ id: this.$route.query.id }).then((res) => {
          this.tableData_jgzrbm = [];
          if (res && res.data && res.data.code == 200) {
            let shorter = res.data.data;
            this.globalData = shorter;
            if (shorter.imgs && shorter.imgs.length) {
              let filter1 = shorter.imgs.filter((ele) => {
                return ele.sort_flag || ele.sort_flag == 0;
              });
              let final = filter1.sort((a, b) => {
                return a.sort_flag - b.sort_flag;
              });
              if (final && final.length) {
                this.regularImage = final[0].path;
              }
            }
            this.tableData_jgzrbm = shorter.other || [];
            if (this.globalData.goodsData && this.globalData.goodsData.publishName && this.globalData.goodsData.publishName == '务本堂') {
              this.IsWBdFlag = true;
              this.globalData.goodsData.directlyLiableUser = '洪波';
              this.globalData.goodsData.directlyLiableUserPhone = '82454003';
              this.globalData.goodsData.safetyManager = '梅李栋';
              this.globalData.goodsData.safetyManagerPhone = '13738022466';
            }
            this.$store.commit('setCurrentWBDinfo', this.globalData);
          }
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 95%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .part-1 {
    .btn {
      width: 80px;
      height: 25px;
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
    .info-box {
      width: 454px;
      height: 184px;
      background: url('../../../assets/img4/wbd-bg.png') no-repeat center;
      background-size: 100% 100%;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 231px;
        height: 100%;
        box-sizing: border-box;
        padding: 10px;
        img {
          width: 100%;
          height: 100%;
        }
        .culturalImage {
          width: 100%;
          height: 100%;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
      .right {
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        .row {
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
          }
          span:nth-child(1) {
            width: 85px;
            color: #5ed7ff;
          }
          span:nth-child(2) {
            width: 114px;
            color: #b7bedc;
            overflow: hidden; //溢出隐藏
            white-space: nowrap; //禁止换行
            text-overflow: ellipsis;
            user-select: none;
          }
        }
      }
    }
  }
  .part-2 {
    .gov {
      width: 100%;
      height: 78px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 10px 0;
      img {
        width: 78px;
        height: 78px;
      }
      .info {
        width: 318px;
        height: 100%;
        background: linear-gradient(to right, #3b76a100, #18466694, #3b76a100);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span:nth-child(1) {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #ffffff;
        }
        span:nth-child(2) {
          font-family: AdobeHeitiStd-Regular;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #5ed7ff;
        }
      }
    }
    .list {
      width: 100%;
      height: 115px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .item {
        width: 100%;
        height: 54px;
        background: url('../../../assets/img4/biaoqian.png') no-repeat center;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-family: PingFang-SC-Medium;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
        }
        span:nth-child(1) {
          color: #5ed7ff;
        }
        span:nth-child(2) {
          color: #b7bedc;
          margin-right: 20px;
          width: 60px;
        }
        span:nth-child(3) {
          color: #5ed7ff;
        }
        span:nth-child(4) {
          color: #b7bedc;
          width: 100px;
        }
      }
    }
  }
  .part-3 {
    .jg-table {
      width: 100%;
      height: 220px;
    }
  }
}
</style>
<style lang="less">
.popperTip {
  width: 180px;
}
</style>
