<template>
  <div class="box">
    <TitleBox :title="'党建引领'">
      <div style="width:76px;height:29px;position: absolute;right: 10px;top: 20%;background:#0A2F5E;">
        <el-select
          v-model="currentMouth"
          size="mini"
          placeholder="月份"
          style="width:76px;"
        >
          <el-option
            v-for="item in mouthOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </TitleBox>
    <div class="djyl">
      <EchartsBar
        :chartData="djyl_chartData"
        :logo="logo_1"
        :startColor="'rgba(245,92,87,0)'"
        :endColor="'rgba(245,92,87,0.8)'"
        :backgroundColor="'rgba(200,80,81,0.3)'"
        :startColor_2="'rgba(14,182,140,0)'"
        :endColor_2="'rgba(14,182,140,0.8)'"
        :backgroundColor_2="'rgba(14,182,140,0.2)'"
        @barClick="barClick"
      />
      <!-- <div class="num">
        <span v-for="(item, index) in djyl_chartData_Num" :key="index">{{
          item.value
        }}</span>
      </div> -->
      <!-- 弹框 -->
      <DjBox
        :isShow="djBoxShow"
        :headText="djTitle"
        @close="djBoxClose"
      />
    </div>
    <TitleBox :title="'文保资金'">
      <div
        class="wwzj-btn"
        @click="zjClick(item)"
      >
        <div class="text">资金申请列表</div>
      </div>
    </TitleBox>
    <div class="wwbhzj">
      <div class="total">
        <div class="text">总金额</div>
        <div class="num">
          <span>{{ moneyTotal }}</span>
          <span>万元</span>
        </div>
      </div>
      <div class="pie">
        <EchartsPie
          :chartData="wwbhzj_chartData"
          :logo="logo_2"
        />
      </div>
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in saveMoney_listData"
          :key="index"
        >
          <div class="info">
            <span>{{ item.name }}</span>
            <span>{{ item.num }}</span>
            <span>{{ item.unit }}</span>
          </div>
        </div>
      </div>

      <!-- 弹框 -->
      <ZjBox
        :isShow="zjBoxShow"
        @close="zjBoxClose"
      />
    </div>
    <TitleBox :title="'风险等级'" />
    <div class="fxfhdj">
      <div
        class="item"
        v-for="(item, index) in riskLevel"
        :key="index"
      >
        <div class="name">{{ item.name }}</div>
        <div class="levelBox">
          <div
            class="level-item"
            v-for="(val, i) in item.level"
            :key="i"
            :style="{
              'background-image': `url(${item.bgImg})`,
              'background-size': '100%'
            }"
            @click="riskLevelClick(item.name,val.levelName)"
          >
            <span>{{ val.levelName }}</span>
            <span :style="{ color: item.textColor }">{{ val.num }}</span>
          </div>
        </div>
      </div>
    </div>
    <TitleBox :title="'智能感知'" />
    <div class="znyj">
      <div
        class="item"
        v-for="(item, index) in znyj_data"
        :key="index"
        @click="yjClick(item)"
      >
        <div class="img-box">
          <img
            :src="item.imgSrc"
            alt=""
            srcset=""
            width="62%"
          />
        </div>

        <div class="info">
          <span>{{ item.name }}</span>
          <span>{{ item.num }}</span>
        </div>
      </div>
    </div>
    <ZNGZBox :isShow="zngzBoxShow" :boxData="{}" @close="zngzClose"/>
  </div>
</template>

<script>
import TitleBox from '../publicComponents/titleBox'
import EchartsBar from './components/echartBarNormal'
import EchartsPie from './components/echartPie'
import ZNGZBox from './components/zngzBox'

// 弹框
import DjBox from './components/DJ-Box'
import ZjBox from './components/ZJ-Box'

import { eventBus } from '@/main'

// api接口
import { djyl, rfll, wwbhzj, zjly, fxfhdj, zngz } from '../../../api/xsApi'

export default {
  name: '',
  components: {
    TitleBox,
    EchartsBar,
    EchartsPie,
    DjBox,
    ZjBox,
    ZNGZBox
  },
  data() {
    return {
      mouthOptions: [
        {
          label: '一月',
          value: '1',
        },
        {
          label: '二月',
          value: '2',
        },
        {
          label: '三月',
          value: '3',
        },
        {
          label: '四月',
          value: '4',
        },
        {
          label: '五月',
          value: '5',
        },
        {
          label: '六月',
          value: '6',
        },
        {
          label: '七月',
          value: '7',
        },
        {
          label: '八月',
          value: '8',
        },
        {
          label: '九月',
          value: '9',
        },
        {
          label: '十月',
          value: '10',
        },
        {
          label: '十一月',
          value: '11',
        },
        {
          label: '十二月',
          value: '12',
        },
      ],
      currentMouth: (new Date().getMonth()+1)+"",
      djyl_chartData: [
        // {
        //   name: "综合执法队",
        //   value: "90",
        //   value2:'72'
        // },
        // {
        //   name: "文物巡查员",
        //   value: "50",
        //   value2:'56'
        // },
        // {
        //   name: "党员微心愿",
        //   value: "70",
        //   value2:'60'
        // },
        // {
        //   name: "护宝志愿者",
        //   value: "110",
        //   value2:'92'
        // },
        // {
        //   name: "文物专家",
        //   value: "150",
        //   value2:'108'
        // }
      ],
      logo_1: '1',
      djBoxShow: false,
      djTitle: '',
      moneyTotal: '500',
      wwbhzj_chartData: [
        // {
        //   name: "政府财政",
        //   value: "90"
        // },
        // {
        //   name: "社会捐献",
        //   value: "50"
        // },
        // {
        //   name: "xxx",
        //   value: "70"
        // },
        // {
        //   name: "xxxx",
        //   value: "110"
        // },
        // {
        //   name: "xxxxx",
        //   value: "150"
        // }
      ],
      logo_2: '1',
      saveMoney_listData: [
        {
          name: '累计申请',
          num: '35',
          unit: '笔',
        },
        {
          name: '审批中',
          num: '15',
          unit: '笔',
        },
        {
          name: '已拨付',
          num: '300',
          unit: '万元',
        },
      ],
      zjBoxShow: false,
      riskLevel: [
        {
          name: '火灾隐患',
          bgImg: require('../../../assets/img2/r.png'),
          textColor: '#ff504d',
          level: [
            {
              levelName: '一级',
              num: '9',
            },
            {
              levelName: '二级',
              num: '45',
            },
            {
              levelName: '三级',
              num: '45',
            },
          ],
        },
        {
          name: '自然灾害',
          bgImg: require('../../../assets/img2/g.png'),
          textColor: '#05e799',
          level: [
            {
              levelName: '一级',
              num: '25',
            },
            {
              levelName: '二级',
              num: '65',
            },
            {
              levelName: '三级',
              num: '157',
            },
          ],
        },
        {
          name: '法人违法',
          bgImg: require('../../../assets/img2/b.png'),
          textColor: '#3fd0ff',
          level: [
            {
              levelName: '一级',
              num: '40',
            },
            {
              levelName: '二级',
              num: '60',
            },
            {
              levelName: '三级',
              num: '120',
            },
          ],
        },
        {
          name: '盗挖盗掘',
          bgImg: require('../../../assets/img2/y.png'),
          textColor: '#ffcf22',
          level: [
            {
              levelName: '一级',
              num: '30',
            },
            {
              levelName: '二级',
              num: '70',
            },
            {
              levelName: '三级',
              num: '130',
            },
          ],
        },
      ],
      znyj_data: [
        {
          name: '视频监控',
          num: '18',
          imgSrc: require('../../../assets/img2/r-icon1.png'),
        },
        {
          name: '感烟监测',
          num: '9',
          imgSrc: require('../../../assets/img2/r-icon2.png'),
        },
        {
          name: '水压监测',
          num: '15',
          imgSrc: require('../../../assets/img2/r-icon3.png'),
        },
        {
          name: '气象监测',
          num: '9',
          imgSrc: require('../../../assets/img2/r-icon4.png'),
        },
        {
          name: '电流监测',
          num: '28',
          imgSrc: require('../../../assets/img2/icon5.png'),
        },
        {
          name: '感温监测',
          num: '9',
          imgSrc: require('../../../assets/img2/r-icon6.png'),
        },
      ],

      // 智能感知弹框
      zngzBoxShow:false

    }
  },
  computed: {
    djyl_chartData_Num() {
      let arr = [...this.djyl_chartData]
      return arr.reverse()
    },
  },
  created() {
    eventBus.$on('gotoStreet', (msg) => {
      this.getRFLL_data(msg[0], msg[1])
      this.getFXFHDJ_data(msg[0], msg[1])
      this.getWWBHZJ_data(msg[0], msg[1])
      this.getZJLY_data(msg[0], msg[1])
      this.getZNYJ_data(msg[0], msg[1])
    })
    eventBus.$on('data_back', () => {
      this.getRFLL_data('0', '0')
      this.getFXFHDJ_data('0', '0')
      this.getWWBHZJ_data('0', '0')
      this.getZJLY_data('0', '0')
      this.getZNYJ_data('0', '0')
    })
  },
  mounted() {
    this.getRFLL_data('0', '0')
    this.getFXFHDJ_data('0', '0')
    this.getWWBHZJ_data('0', '0')
    this.getZJLY_data('0', '0')
    this.getZNYJ_data('0', '0')
  },
  methods: {
    // 获取党建引领数据
    getRFLL_data(level, name) {
      let params = {
        level,
        name,
      }
      rfll(params).then((res) => {
        // console.log('党建引领',res.data)
        this.djyl_chartData = []
        res.data.data.map((item) => {
          let obj = {
            name: item.reportName,
            value: item.reportNum1,
            value2: item.reportNum2,
          }
          this.djyl_chartData.push(obj)
        })
        this.logo_1 += '1'
      })
    },
    barClick(params) {
      console.log(params.name)
      this.djBoxShow = true
      this.djTitle = params.name
    },
    djBoxClose() {
      this.djBoxShow = false
    },

    // 资金
    // 获取文物保护资金数据
    getWWBHZJ_data(level, name) {
      let params = {
        level,
        name,
      }
      wwbhzj(params).then((res) => {
        console.log('文物保护资金', res.data.data)
        let result = res.data.data[0]
        this.moneyTotal = result.reportNum1
        this.saveMoney_listData[0].num = result.reportNum2
        this.saveMoney_listData[1].num = result.reportNum3
        this.saveMoney_listData[2].num = result.reportNum4
      })
    },
    getZJLY_data(level, name) {
      let params = {
        level,
        name,
      }
      zjly(params).then((res) => {
        this.wwbhzj_chartData = []
        console.log('资金来源', res.data.data)
        res.data.data.map((item) => {
          let obj = {
            name: item.reportName,
            value: item.reportNum1,
          }
          this.wwbhzj_chartData.push(obj)
        })
        this.logo_2 += '1'
      })
    },
    zjClick(item) {
      this.zjBoxShow = true
    },
    zjBoxClose() {
      this.zjBoxShow = false
    },

    // 获取风险防护等级
    getFXFHDJ_data(level, name) {
      let params = {
        level,
        name,
      }
      fxfhdj(params).then((res) => {
        console.log('风险防护等级', res.data.data)
        res.data.data.map((item, index) => {
          this.riskLevel[index].name = item.reportName
          this.riskLevel[index].level[0].num = item.reportNum1
          this.riskLevel[index].level[1].num = item.reportNum2
          this.riskLevel[index].level[2].num = item.reportNum3
        })
      })
    },
    // 风险防护等级点击获取文物点位
    riskLevelClick(riskType, riskLevel) {
      console.log(riskType, riskLevel)
      let fxlx
      let fxdj
      switch (riskType) {
        case '火灾隐患':
          fxlx = '1'
          break
        case '自然灾害':
          fxlx = '2'
          break
        case '法人违法':
          fxlx = '3'
          break
        case '盗挖盗掘':
          fxlx = '4'
          break
        default:
          break
      }
      switch (riskLevel) {
        case '一级':
          fxdj = '1'
          break
        case '二级':
          fxdj = '2'
          break
        case '三级':
          fxdj = '3'
          break
        default:
          break
      }
      let msg = {
        fxlx,
        fxdj,
        title: riskType + riskLevel,
      }
      eventBus.$emit('changeToNormalPoi')
      eventBus.$emit('riskLevelList', msg)
    },

    // 预警
    // 获取智能感知数据
    getZNYJ_data(level, name) {
      let params = {
        level,
        name,
      }
      zngz(params).then((res) => {
        console.log('智能感知', res.data.data)
        res.data.data.map((item) => {
          this.znyj_data.map((val) => {
            if (item.name == val.name) {
              val.num = item.value
            }
          })
        })
      })
    },

    yjClick(item) {
      if (item.name === '气象监测') {
        eventBus.$emit('show_qxyj')
      }else{
        this.zngzBoxShow=true
      }
    },

    zngzClose(){
      this.zngzBoxShow=false
    }
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  user-select: none;
  // background: red;
  // 党建引领
  .djyl {
    width: 100%;
    height: 150px;
    position: relative;
    .num {
      position: absolute;
      top: 5px;
      right: 0;
      height: 120px;
      width: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      font-family: Arial-BoldMT;
      font-size: 16px;
      font-weight: 900;
      font-stretch: normal;
      line-height: 20px;
      letter-spacing: 1px;
      color: #f55c57;
    }
  }
  // 文物保护资金
  .wwzj-btn {
    width: 106px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 20%;
    background: #0a2f5e;
    .text {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url('../../../assets/img2/btn-box.png') center no-repeat;
      background-size: 100%;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 20px;
      letter-spacing: 1px;
      color: #ffffff;
    }
  }
  .wwbhzj {
    width: 100%;
    height: 149px;
    position: relative;
    display: flex;
    justify-content: space-between;
    .total {
      width: 134px;
      height: 100%;
      background: url('../../../assets/img2/img1.png') center no-repeat;
      background-size: auto 81%;
      background-position-x: -20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .text {
        font-family: MicrosoftYaHei-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 1px;
        color: #eceff4;
      }
      .num {
        margin: 5px 0 30px 0;
        span:nth-child(1) {
          font-family: Arial-BoldMT;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 24px;
          letter-spacing: 1px;
          color: #b3d9ea;
        }
        span:nth-child(2) {
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 24px;
          letter-spacing: 1px;
          color: #eceff4;
        }
      }
    }
    .pie {
      width: 100px;
      height: 100%;
    }
    .list {
      width: 205px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .item {
        width: 100%;
        height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: url('../../../assets/img2/img2.png') center no-repeat;
        background-size: 100% 100%;
        margin: 2px 0;
        .info {
          width: 100%;
          box-sizing: border-box;
          padding-left: 30px;
          span {
            display: inline-block;
            font-family: MicrosoftYaHei;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 1px;
            color: #eceff4;
          }
          span:nth-child(1) {
            width: 78px;
          }
          span:nth-child(2) {
            width: 42px;
            font-size: 22px;
          }
          span:nth-child(3) {
            width: 35px;
            font-size: 16px;
          }
        }
      }
    }
  }
  // 风险防护等级
  .fxfhdj {
    width: 100%;
    height: 256px;

    .item {
      width: 100%;
      height: 59px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        width: 38px;
        font-family: MicrosoftYaHei;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 1px;
        color: #ffffff;
      }
      .levelBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        height: 66px;
        width: calc(100% - 38px);
        .level-item {
          position: absolute;
          width: 156px;
          height: 66px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-position-y: -10px;
          cursor: pointer;
          span:nth-child(1) {
            font-family: SourceHanSansCN-Medium;
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 27px;
            letter-spacing: 0px;
            color: #ffffff;
            margin-right: 10px;
            margin-left: 30px;
          }
          span:nth-child(2) {
            font-family: SourceHanSansCN-Bold;
            font-size: 24px;
            font-weight: normal;
            letter-spacing: 0px;
          }
        }
        .level-item:nth-child(1) {
          left: 0;
        }
        .level-item:nth-child(2) {
          left: 31%;
        }
        .level-item:nth-child(3) {
          left: 63%;
        }
      }
    }
  }
  // 智能感知
  .znyj {
    width: 100%;
    height: 201px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 33%;
      height: 50%;
      // background: url("../../../assets/img2/icon11.png") center no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .img-box {
        width: 67px;
        height: 69px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url('../../../assets/img2/icon-base.png') no-repeat center;
        background-size: 100% 100%;
        img {
          // width: 30px;
          // height: 24px;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        margin-left: 10px;
        span:nth-child(1) {
          font-family: MicrosoftYaHei-Bold;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 24px;
          letter-spacing: 1px;
          color: #bbdbff;
          opacity: 0.8;
          margin-top: 5px;
          margin-bottom: 10px;
        }
        span:nth-child(2) {
          font-family: MicrosoftYaHei-Bold;
          font-size: 24px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 24px;
          letter-spacing: 1px;
          color: #c4dcff;
        }
      }
    }
  }
}
</style>
