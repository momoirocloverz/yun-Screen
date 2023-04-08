<template>
  <div class="box">
    <TitleBox :title="'文物基本情况'" />
    <div class="imgBox">
      <img src="" alt="" srcset="">
    </div>
    <div class="row">
      <div class="half">
        <span>文物名称：</span>
        <span>务本堂</span>
      </div>
      <div class="half">
        <span>文物分类：</span>
        <span>古建筑</span>
      </div>
    </div>
    <div class="row">
      <div class="half">
        <span>文物级别：</span>
        <span>省级文物保护单位</span>
      </div>
      <div class="half">
        <span>文物分布情况：</span>
        <span>务本堂一处</span>
      </div>
    </div>
    <div class="row row3">
      <div class="half">
        <span>文物地址：</span>
        <span>萧山区进化镇</span>
      </div>
    </div>
    <div class="row row4">
      <div class="title">保护范围面积：</div>
      <div class="content">包含重要的历史环境，四至相近道路的近建筑侧路缘石线，详见图则，总面积6022平方米。</div>
    </div>

    <div class="table-title">
      <div class="text">责任单位联系人</div>
    </div>
    <div class="table">
        <Table
          :tableColumns="tableColumns_peopleList"
          :tableData="tableData_peopleList"
        />
    </div>
    <TitleBox :title="'风险防护等级'" />
    <div class="risk-level">
      <div class="item" v-for="(item,index) in riskLevelData" :key="index" :style="{background:`url(${item.bgImg}) no-repeat bottom`}">
        <img :src="item.imgSrc" alt="" srcset="" width="46px" height="72px">
        <div class="text">{{item.riskLevel}} : {{item.num}}</div>
      </div>
    </div>
    <TitleBox :title="'人防力量'" />
    <div class="people-prevent">
      <div class="item" v-for="(item,index) in peoplePreventData" :key="index" >
        <img :src="item.imgSrc" alt="" srcset="">
        <div class="info">
          <div class="roww roww1">
            <span>{{item.job}}</span>
            <span>{{item.name}}</span>
          </div>
          <div class="roww roww2">
            <div>联系电话</div>
            <div>{{item.phone}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBox from '../publicComponents/titleBox'
import Table from '../publicComponents/table'
import { eventBus } from '../../../main'
export default {
  name: '',
  components: { TitleBox, Table },
  data() {
    return {
      tableColumns_peopleList: [
        {
          name: '单位名称',
          props: 'department',
          requireEllipsis:100
        },
        {
          name: '姓名',
          props: 'name',
          requireEllipsis:100
        },
        {
          name: '电话',
          props: 'phone',
          requireEllipsis:100
        },
      ],
      tableData_peopleList: [
        {
          department: '区消防救援大队',
          name: '李晓文',
          phone: '13912345698',
        },
        {
          department: '区公安分局',
          name: '李晓文',
          phone: '14645982364',
        },
      ],
      riskLevelData:[
        {
          imgSrc:require('../../../assets/img2/risk1.png'),
          riskLevel:'一级',
          num:'10',
          bgImg:require('../../../assets/img2/r-bg.png'),
        },
        {
          imgSrc:require('../../../assets/img2/risk2.png'),
          riskLevel:'二级',
          num:'20',
          bgImg:require('../../../assets/img2/g-bg.png'),
        },
        {
          imgSrc:require('../../../assets/img2/risk3.png'),
          riskLevel:'一级',
          num:'40',
          bgImg:require('../../../assets/img2/b-bg.png'),
        },
        {
          imgSrc:require('../../../assets/img2/risk4.png'),
          riskLevel:'一级',
          num:'30',
          bgImg:require('../../../assets/img2/y-bg.png'),
        },
      ],
      peoplePreventData:[
        {
          imgSrc:require('../../../assets/img2/person-icon1.png'),
          job:'直接责任人',
          name:'王刚',
          phone:'15632164562'
        },
        {
          imgSrc:require('../../../assets/img2/person-icon2.png'),
          job:'文物巡查员',
          name:'张攀',
          phone:'17215632495'
        },
      ]
    }
  },
  created() {

  },
  methods: {
    
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .imgBox{
    width: 352px;
    min-height: 146px;
    background: url('../../../assets/img2/img_frame.png') no-repeat center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position-x: -4px;
    margin: 10px 0;
    img{
      width: 335px;
      height: 120px;
    }
  }
  .row{
    width: 100%;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: url('../../../assets/img2/hr-line.png') no-repeat bottom;
    // margin: 3px;
    .half{
      flex: 1;
      text-align: left;
      span:nth-child(1){
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #95c2eb;
      }
      span:nth-child(2){
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        letter-spacing: 0px;
        color: #49c5ff;
      }
    }
  }
  .row4{
    min-height: 60px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    .title{
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #95c2eb;
      // margin-bottom: 8px;
    }
    .content{
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: normal;
      letter-spacing: 0px;
      color: #49c5ff;
      margin-bottom: 10px;
    }
  }
  .table-title{
    width: 100%;
    height: 36px;
    margin: 15px 0;
    .text{
      width: 262px;
      height: 100%;
      background: url('../../../assets/img2/title-s.png') no-repeat center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: MicrosoftYaHei;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 24px;
      letter-spacing: 1px;
      color:#eceff4;
    }
  }
  .table{
    width: 100%;
    height: 115px;
    margin-bottom: 15px;
  }
  .risk-level{
    width: 100%;
    height: 102px;
    display: flex;
    margin-bottom: 30px;
    .item{
      flex: 1;
      height: 110%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .text{
        font-family: MicrosoftYaHei-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 22px;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
  .people-prevent{
    display: flex;
    width: 100%;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    .item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      img{
        width: 88px;
        height: 87px;
      }
      .roww{
        span:nth-child(1){
          font-family: SourceHanSansCN-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 24px;
          letter-spacing: 0px;
          color: #ffffff;
          margin-left: 5px;
        }
        span:nth-child(2){
          font-family: SourceHanSansCN-Regular;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 24px;
          letter-spacing: 0px;
          color: #39e3fd;
          margin-left: 3px;
        }
      }
      .roww1{
        background: url('../../../assets/img2/txt-bg.png') no-repeat;
      }
      .roww2{
        div:nth-child(1){
          font-family: SourceHanSansCN-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 24px;
          letter-spacing: 0px;
          color: #ffffff;
          margin-left: 5px;
        }
        div:nth-child(2){
          font-family: SourceHanSansCN-Regular;
          font-size: 20px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 24px;
          letter-spacing: 0px;
          color: #39e3fd;
          margin-left: 5px;
        }
      }
    }
  }
  
}
</style>
