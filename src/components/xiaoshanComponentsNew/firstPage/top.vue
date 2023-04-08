<template>
  <div class="top">
    <div
      class="item"
      v-for="(item, index) in topList"
      :key="index"
    >
      <img
        :src="item.imgSrc"
        alt=""
        srcset=""
      />
      <div class="right">
        <div class="title">{{ item.name }}</div>
        <div
          class="row"
          @click="toDo_click(item)"
        >
          <span>{{ item.text1 }}：</span>
          <span>{{ item.num1 }}</span>
        </div>
        <div
          class="row row2"
          @click="handleClick(item)"
        >
          <span>{{ item.text2 }}：</span>
          <span>{{ item.num2 }}</span>
        </div>
      </div>
    </div>

    <!-- <EventHandleBox
      :isShow="isBoxShow"
      :logo="logo"
      :title="title"
      :taskList="taskList"
      :left="left"
    /> -->
    <YwtgDetail
      :isShow="isShow_ywtg_detail"
      :taskList="taskList"
      :logo="logo2"
      @close="ywtg_detailClose"
    />
    <EventTable
      :isShow="isBoxShow_3"
      :title="title"
      @close="eventTableClose3"
    />
    <EventTable2
      :isShow="isBoxShow_2"
      :title="title"
      @close="eventTableClose"
    />
  </div>
</template>

<script>
import EventHandleBox from '../../mapPublicComponents/eventHandleBox'
import EventTable2 from '../../mapPublicComponents/eventTable2'
import EventTable from '../../mapPublicComponents/eventTable'
import YwtgDetail from '../../mapPublicComponents/YwtgDatail'

import { eventBus } from '@/main'

// api接口
import { top_statistics, ywtg_list } from '../../../api/xsApi'

let currentTab = ''

let timer
export default {
  name: '',
  components: { EventHandleBox, EventTable, EventTable2, YwtgDetail },
  data() {
    return {
      topList: [
        {
          name: '一网统管',
          text1: '待办',
          num1: '0',
          text2: '处置',
          num2: '0',
          imgSrc: require('../../../assets/img2/m-icon1.png'),
        },
        {
          name: '巡查处置',
          text1: '待办',
          num1: '0',
          text2: '处置',
          num2: '0',
          imgSrc: require('../../../assets/img2/m-icon2.png'),
        },
        {
          name: '预警处置',
          text1: '待办',
          num1: '0',
          text2: '处置',
          num2: '0',
          imgSrc: require('../../../assets/img2/m-icon3.png'),
        },
        {
          name: '专项治理',
          text1: '待办',
          num1: '0',
          text2: '处置',
          num2: '0',
          imgSrc: require('../../../assets/img2/m-icon4.png'),
        },
      ],

      // websocket配置
      path: 'ws://223.65.209.139:18180/cultural/broadcast/1',
      socket: '',
      // 待办
      taskList: [],
      isBoxShow_3: false,
      title: '',
      left: '',
      isShow_ywtg_detail: false,
      logo2: '1',
      // 处置
      isBoxShow_2: false,
    }
  },
  created() {
    // eventBus.$on('gotoStreet',msg=>{
    //   this.getZDTJ_data(msg[0],msg[1])
    // })
    // eventBus.$on('data_back',()=>{
    //   this.getZDTJ_data('0','0')
    // })
  },
  mounted() {
    this.getZDTJ_data()
    // timer = setInterval(() => {
    //   this.getZDTJ_data()
    // }, 1000)
    this.init()
  },
  beforeDestroy() {
    clearInterval(timer)
  },
  methods: {
    getZDTJ_data() {
      top_statistics().then((res) => {
        let result = res.data.data
        // console.log("置顶统计", result);
        this.topList[0].num1 = result.union
        this.topList[0].num2 = result.union_done
        this.topList[1].num1 = result.inspection
        this.topList[1].num2 = result.inspection_done
        this.topList[2].num1 = result.alarm
        this.topList[2].num2 = result.alarm_done
        this.topList[3].num1 = result.spec
        this.topList[3].num2 = result.spec_other
      })
    },
    get_ywtg_list() {
      ywtg_list().then((res) => {
        // console.log('一网统管列表', res.data)
        this.taskList = res.data.data
      })
    },
    // 接入websocket
    init() {
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open: function() {
      console.log('socket连接成功')
    },
    error: function() {
      console.log('连接错误')
    },
    getMessage: function(msg) {
      console.log('接收信息', msg.data)
      this.getZDTJ_data()
    },
    send: function() {
      this.socket.send(params)
    },
    close: function() {
      console.log('socket已经关闭')
    },
    // 待办
    toDo_click(item) {
      switch (item.name) {
        case '一网统管':
          // this.get_ywtg_list()
          this.title = '一网统管'
          break
        case '巡查处置':
          this.title = '巡查处置'
          this.isBoxShow_3 = true
          break
        case '预警处置':
          this.title = '预警处置'
          this.isBoxShow_3 = true
          break
        case '专项治理':
          this.title = '专项治理'
          this.isBoxShow_3 = true
          break
        default:
          break
      }

      // if (item.name !== '一网统管') {
      //   if (item.name == currentTab && this.isBoxShow) {
      //     this.isBoxShow = false
      //   } else {
      //     this.isBoxShow = true
      //   }
      //   currentTab = item.name
      //   this.logo += '1'
      // } else {
      //   this.isBoxShow = false
      //   this.logo2 += '1'
      //   this.isShow_ywtg_detail = true
      // }
    },
    // 处置
    handleClick(item) {
      this.isBoxShow_2 = true
      switch (item.name) {
        case '一网统管':
          this.get_ywtg_list()
          this.isBoxShow_2 = false
          this.logo2 += '1'
          this.isShow_ywtg_detail = true
          this.title = '一网统管任务清单'
          break
        case '巡查处置':
          this.title = '巡查处置任务清单'
          break
        case '预警处置':
          this.title = '预警处置任务清单'
          break
        case '专项治理':
          this.title = '专项治理任务清单'
          break
        default:
          break
      }
    },
    ywtg_detailClose() {
      this.isShow_ywtg_detail = false
    },
    eventTableClose() {
      this.isBoxShow_2 = false
    },
    eventTableClose3() {
      this.isBoxShow_3 = false
    },
  },
}
</script>

<style lang="less" scoped>
.top {
  width: 892px;
  height: 132px;
  z-index: 2;
  position: absolute;
  top: 110px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: url('../../../assets/img2/m-box-bg.png') no-repeat center;
  padding: 0 10px;
  user-select: none;
  .item {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      width: 87px;
      height: 96px;
      margin-right: 5px;
    }
    .right {
      height: 132px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      box-sizing: border-box;
      padding: 20px 0;
      .title {
        width: 87px;
        height: 32px;
        background: url('../../../assets/img2/m-cont-title.png');
        background-size: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: SourceHanSansCN-Bold;
        font-size: 17px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #ededed;
      }
      .row {
        box-sizing: border-box;
        padding-left: 10px;
        display: flex;
        align-items: center;
        span:nth-child(1) {
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #9cd7ff;
        }
        span:nth-child(2) {
          font-size: 22px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #4ae3ff;
        }
      }
      .row2 {
        box-sizing: border-box;
        padding-left: 10px;
        span:nth-child(2) {
          font-size: 22px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #4affd2;
        }
      }
    }
  }
}
</style>
