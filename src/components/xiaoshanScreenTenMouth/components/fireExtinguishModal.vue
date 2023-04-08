<template>
  <div class="fireExtingishModalCon" v-if="isShow">
    <div class="centerCon">
      <div class="header">
        <div class="title">二氧化碳灭火器检查卡</div>
        <div class="shut" @click="close"></div>
      </div>
      <div class="infoArea">
        <div class="year">
          <span>年度：</span>
          <el-select class="removeDisabled" v-model="currentYear" filterable size="mini" placeholder="年度" :style="{ width: `${100 / 192}rem !important` }" @change="yearChange">
            <el-option v-for="item in yearList" :key="item.title" :label="item.title" :value="item.title"></el-option>
          </el-select>
        </div>
        <div class="name">
          <span>责任人：</span>
          <span>田欢乐</span>
        </div>
        <div class="number">
          <span>编号：</span>
          <span>001</span>
        </div>
      </div>
      <div class="table-box">
        <InnerTable :tableColumns="tableColumns" :tableData="tableData" :headTextColor="'#e4f0ff'" :rowTextColor="'#a6b9ff'" :hasIndex="false">
          <template slot="mouth" slot-scope="scope">
            <div><i v-if="scope.row.mouth == '1'" class="el-icon-check"></i></div>
          </template>
          <template slot="pin" slot-scope="scope">
            <div><i v-if="scope.row.pin == '1'" class="el-icon-check"></i></div>
          </template>
          <template slot="handler" slot-scope="scope">
            <div><i v-if="scope.row.handler == '1'" class="el-icon-check"></i></div>
          </template>
          <template slot="body" slot-scope="scope">
            <div><i v-if="scope.row.body == '1'" class="el-icon-check"></i></div>
          </template>
        </InnerTable>
      </div>
    </div>
  </div>
</template>
<script>
// import { screenV3RiskDataDetails } from '../../../../api/xsApi3.js';
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    InnerTable: () => import(/* webpackChunkName: "fireExtingishModalTable" */ './fireExtinguish/table'),
  },
  data() {
    return {
      pageSize: 15,
      currentPage: 1,
      total: 0,
      tableColumns: [
        {
          name: '日期',
          props: 'date',
        },
        {
          name: '喷嘴',
          props: 'mouth',
          withSlot: true,
        },
        {
          name: '保险销',
          props: 'pin',
          withSlot: true,
        },
        {
          name: '压把',
          props: 'handler',
          withSlot: true,
        },
        {
          name: '瓶体',
          props: 'body',
          withSlot: true,
        },
        {
          name: '重量 (KG)',
          props: 'weight',
        },
        {
          name: '有效期',
          props: 'limit',
        },
        {
          name: '检查人',
          props: 'user',
        },
      ],
      tableData: [],
      yearList: [{ title: '2023' }, { title: '2022' }],
      currentYear: '2023',
      lastYearList: [
        { date: '2022/01', weight: '5KG', limit: '12月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
        { date: '2022/02', weight: '5KG', limit: '11月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
        { date: '2022/03', weight: '5KG', limit: '10月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
        { date: '2022/04', weight: '5KG', limit: '9月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
        { date: '2022/05', weight: '5KG', limit: '8月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
        { date: '2022/06', weight: '5KG', limit: '7月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
        { date: '2022/07', weight: '5KG', limit: '6月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
        { date: '2022/08', weight: '5KG', limit: '5月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
        { date: '2022/09', weight: '5KG', limit: '4月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
        { date: '2022/10', weight: '5KG', limit: '3月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
        { date: '2022/11', weight: '5KG', limit: '2月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
        { date: '2022/12', weight: '5KG', limit: '1月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' },
      ],
      currentYearList: [{ date: '2023/01', weight: '5KG', limit: '12月', user: '田欢乐', mouth: '1', pin: '1', handler: '1', body: '1' }],
    };
  },
  mounted() {
    this.initAction();
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
      if (nval) {
        this.initAction();
      }
    },
  },
  methods: {
    initAction() {
      this.currentYear = '2023';
      this.tableData = this.currentYearList;
    },
    yearChange() {
      if (this.currentYear == '2023') {
        this.tableData = this.currentYearList;
      }
      if (this.currentYear == '2022') {
        this.tableData = this.lastYearList;
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
<style lang="less" scoped>
.fireExtingishModalCon {
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
  z-index: 200;
  //   background: rgba(0, 0, 0, 0.7);
}
.title {
  width: 680px;
  height: 45px;
  background: url(../../../assets/modelLink/t.png) no-repeat center;
  background-size: 100% 100%;
  font-family: STSongti-SC-Black;
  font-size: 20px;
  line-height: 45px;
  padding-left: 35px;
  box-sizing: border-box;
  letter-spacing: 1px;
  color: #e4f5ff;
  cursor: pointer;
}
.centerCon {
  //   width: 1126px;
  //   height: 826px;
  width: 750px;
  height: 550px;
  position: relative;
  background: url('../../../assets/modelLink/s-pop-bg.png') no-repeat center;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 12px 35px 35px 35px;
}
.shut {
  width: 31px;
  height: 31px;
  position: absolute;
  top: 0px;
  right: 0px;
  background: url('../../../assets/modelLink/close@3x.png') no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}
.header {
  margin-top: 10px;
  position: relative;
}
.table-box {
  width: 100%;
  height: 400px;
}
.infoArea {
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 10px;
}
.year {
  span:nth-child(1) {
    color: #777fa4;
    font-size: 16px;
  }
  span:nth-child(2) {
    color: #fff;
    font-size: 14px;
  }
}
.name {
  span:nth-child(1) {
    color: #777fa4;
    font-size: 16px;
  }
  span:nth-child(2) {
    color: #c0c8e5;
    font-size: 16px;
  }
  margin-left: 60px;
  margin-right: 60px;
}
.number {
  span:nth-child(1) {
    color: #777fa4;
    font-size: 16px;
  }
  span:nth-child(2) {
    color: #c0c8e5;
    font-size: 16px;
  }
}
</style>
