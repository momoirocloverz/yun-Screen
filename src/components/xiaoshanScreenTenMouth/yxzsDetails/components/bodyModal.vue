<template>
  <div class="yxzsDetailBodyModalCon" v-if="isShow">
    <div class="centerCon">
      <div class="head">本体</div>
      <div class="close" @click="close"></div>
      <div class="switchCon">
        <template v-for="(item, index) in switchArray">
          <div :key="index" class="commonItem" @click="switchTab(index)" :class="[currentActive == index ? 'active' : '']">
            <span>
              {{ item.title }}
            </span>
            <span>
              {{ item.num }}分
            </span>
          </div>
        </template>
      </div>
      <div>
        <cusTableSp :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="false"></cusTableSp>
      </div>
    </div>
  </div>
</template>
<script>
import { screenV3RiskDataDetails } from '../../../../api/xsApi3.js';
import staticData from './staticRuleList.json';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    cusTableSp: () => import(/* webpackChunkName: "yxzsDetailBodyMTableSpBody" */ './tableSpBopy'),
  },
  data() {
    return {
      currentActive: 0,
      pageSize: 15,
      currentPage: 1,
      total: 0,
      switchArray: [{ title: '火灾风险',num:10 }, { title: '法人违法',num:2 }, { title: '盗挖盗掘',num:2.5 }, { title: '自然灾害',num:7.5 }],
      tableColumns: [
        {
          name: '类别',
          props: 'type',
          flex:8
        },
        {
          name: '评定项',
          props: 'rule',
          flex:28
        },
        {
          name: '分值',
          props: 'num',
          flex:5
        },
      ],
      tableData: [
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      const body = document.querySelector('body');
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
    this.switchTab(0)
  },
  methods: {
    switchTab(index) {
      this.currentActive = index;
      switch (index) {
        case 0:
          this.tableData=staticData.hzfx
          break;
        case 1:
          this.tableData=staticData.frwf
          break;
        case 2:
          this.tableData=staticData.dwdj
          break;
        case 3:
          this.tableData=staticData.zrzh
          break;
        default:
          break;
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
<style lang="less" scoped>
.yxzsDetailBodyModalCon {
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
.switchCon {
  width:100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.commonItem {
  width: 230px;
  height: 70px;
  //   background-color: #4f65bc;
  background-image: url(../../../../assets/yxzsDetail/r-txt-bg.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  // border-radius: 1px;
  // border: solid 2px #4f65bc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  span{
    font-family: SourceHanSansCN-Regular;
    font-size: 24px;
    // line-height: 43px;
    letter-spacing: 0px;
    color: #e9f0f3;
    opacity: 0.71;
  }
  
  // text-align: center;
  margin-right: 4px;
  cursor: pointer;
}
.active {
  background-image: url(../../../../assets/yxzsDetail/r-txt-bg-s.png);
  // background-color: #226190;
  // border-radius: 1px;
  // border: solid 2px #1dd1f8;
  span{
    font-family: SourceHanSansCN-Medium;
    font-size: 24px;
    opacity: 1;
    letter-spacing: 0px;
    color: #e9f0f3;
  }
  
}
</style>
