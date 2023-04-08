<template>
  <div class="top">
    <img src="../../../assets/img3/title-middle.png" alt="" srcset="">
    <div class="item-box">
      <div
        class="item"
        v-for="(item, index) in topList"
        :key="index"
        @click="topClick(item)"
      >
        <img
          :src="item.imgSrc"
          alt=""
          srcset=""
        />
        <div class="right">
          <div class="row">
            <span>{{ item.name }}</span>
          </div>
          <div class="row row2">
            <span>{{ item.num }}</span>
            <span>{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="kgqz-btn" @click="kgqzClick">
      <span>考古前置</span>
    </div>
    
    <WWList
      :isShow="wwListBoxShow"
      @close="wwListBoxHidden"
    />
    <JMZK
      :isShow="jmzkBoxShow"
      @close="jmzkBoxHidden"
    />
    <Device
      :isShow="deviceBoxShow"
      @close="deviceBoxHidden"
    />
    <People
      :isShow="peopleBoxShow"
      @close="peopleBoxHidden"
    />
    <WBZJ
      :isShow="wbzjBoxShow"
      @close="wbzjBoxHidden"
    />
    <CZJDetail
      :isShow="czjBoxShow"
      :logo="czj_logo"
      @close="czjBoxHidden"
    />
    <KGQZ
      :isShow="isShow_kgqz"
      @close="close_kgqz"
    />
  </div>
</template>

<script>
import { eventBus } from '@/main'

import WWList from './topBox/wwList'
import JMZK from './topBox/jmzk'
import Device from './topBox/device'
import People from './topBox/people'
import WBZJ from './topBox/wbzj'
import CZJDetail from './topBox/czjDetail'
import KGQZ from './topBox/kgqz'

// api接口
import { get_top_data,get_czj_num } from '../../../api/xsApi2'

let currentTab = ''

let timer
export default {
  name: '',
  components: { WWList, JMZK, Device, People, WBZJ,CZJDetail,KGQZ },
  data() {
    return {
      topList: [
        {
          name: '萧保馆',
          num: '209',
          unit: '处',
          imgSrc: require('../../../assets/img3/m-icon1.png'),
        },
        {
          name: '护保365',
          num: '209',
          unit: '人',
          imgSrc: require('../../../assets/img3/m-icon2.png'),
        },
        {
          name: '高危场景',
          num: '3',
          unit: '个',
          imgSrc: require('../../../assets/img3/m-icon6.png'),
        },
        // {
        //   name: '设施设备',
        //   num: '209',
        //   unit: '个',
        //   imgSrc: require('../../../assets/img3/m-icon4.png'),
        // },
        {
          name: '文物一张网',
          num: '209',
          unit: '个',
          imgSrc: require('../../../assets/img3/m-icon3.png'),
        },
        {
          name: '文保资金',
          num: '209',
          unit: '万',
          imgSrc: require('../../../assets/img3/m-icon5.png'),
        },
      ],

      // websocket配置
      path: 'ws://223.65.209.139:18180/cultural/broadcast/1',
      socket: '',
      // 文保单位
      wwListBoxShow: false,
      // 精密智控
      jmzkBoxShow: false,
      // 设施设备
      deviceBoxShow: false,
      //文保队伍
      peopleBoxShow: false,
      //文保资金
      wbzjBoxShow: false,
      //高危场景
      czjBoxShow: false,
      czj_logo:'1',

      // 考古前置
      isShow_kgqz:false,
    }
  },
  created() {
    eventBus.$on('gotoStreet', (msg) => {
      this.addressName = msg[1]
      if(msg[1]=='进化镇'){
        this.topList[0].num = 85
        this.topList[1].num = 23
        this.topList[2].num = 5
        this.topList[3].num = 31
        this.topList[4].num = 253
      }
    })

    eventBus.$on('data_back', (msg) => {
      this.get_top_data(0, 0)
      this.get_czj_num()
    })

    // 打开精密智控
    eventBus.$on('openVideo',()=>{
      this.jmzkBoxShow = true
    })
  },
  mounted() {
    this.get_top_data(0, 0)
    this.get_czj_num()
    this.init()
  },
  methods: {
    // 获取统计数据
    get_top_data(level, name) {
      get_top_data(level, name).then((result) => {
        let res = result.data.data[0]
        this.topList[0].num = res.reportNum1
        this.topList[1].num = res.reportNum2
        // this.topList[2].num = res.reportNum4
        this.topList[3].num = res.reportNum3
        this.topList[4].num = res.reportNum5
      })
    },
    // 单独获取高危场景的统计数据
    get_czj_num(){
      get_czj_num().then(res=>{
        this.topList[2].num = res.data.data
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
      console.log('websocket接收信息例行检查', msg.data)
    },
    send: function() {
      this.socket.send(params)
    },
    close: function() {
      console.log('socket已经关闭')
    },

    // 点击事件
    topClick(item) {
      switch (item.name) {
        case '萧保馆':
          this.wwListBoxShow = true
          break
        case '护保365':
          this.peopleBoxShow = true
          break
        case '文物一张网':
          this.jmzkBoxShow = true
          break
        case '设施设备':
          this.deviceBoxShow = true
          break
        case '文保资金':
          this.wbzjBoxShow = true
          break
        case '高危场景':
          this.czjBoxShow = true
          this.czj_logo += '1'
          break
        default:
          break
      }
    },

    // 关闭文保单位弹框
    wwListBoxHidden() {
      this.wwListBoxShow = false
    },
    // 关闭精密智控弹框
    jmzkBoxHidden() {
      this.jmzkBoxShow = false
    },
    // 关闭设施设备弹框
    deviceBoxHidden() {
      this.deviceBoxShow = false
    },
    // 关闭文保队伍弹框
    peopleBoxHidden() {
      this.peopleBoxShow = false
    },
    // 关闭文保资金弹框
    wbzjBoxHidden() {
      this.wbzjBoxShow = false
    },
    // 关闭高危场景弹框
    czjBoxHidden() {
      this.czjBoxShow = false
    },

    // 打开考古前置
    kgqzClick(){
      this.isShow_kgqz = true
    },
    // 关闭考古前置
    close_kgqz(){
      this.isShow_kgqz = false
    },
  },
}
</script>

<style lang="less" scoped>
@keyframes animate {
  0%
  {
    transform: rotate(0deg);
  }
  100%
  {
    transform: rotate(360deg);
  }
}
.top {
  width: 892px;
  height: 161px;
  z-index: 2;
  // position: absolute;
  // top: 100px;
  // left: 50%;
  // transform: translateX(-50%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: url('../../../assets/img2/m-box-bg.png') no-repeat center;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 0 10px;
  user-select: none;
  img{
    position: relative;
    top: -5px;
  }
  .item-box{
    width: 100%;
    height: 132px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
        // margin-right: 5px;
      }
      .right {
        height: 96px;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        // padding: 20px 0;
        .row {
          box-sizing: border-box;
          padding-left: 5px;
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          span:nth-child(1) {
            font-family: SourceHanSansCN-Bold;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ededed;
          }
        }
        .row2 {
          box-sizing: border-box;
          // padding-left: 5px;
          display: flex;
          align-items: flex-end;
          span:nth-child(1) {
            font-family: DINAlternate-Bold;
            font-size: 30px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #4affd2;
            font-family: LCDDIGITALFONT;
            margin-right: 5px;
          }
          span:nth-child(2) {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            // line-height: 14px;
            letter-spacing: 0px;
            color: #3cba9b;
            margin-bottom: 5px;
          }
        }
      }
    }
  }

  .kgqz-btn{
    width: 140px;
    height: 48px;
    background: url('../../../assets/img3/kgqz-btn.png') no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span{
      font-family: SourceHanSansCN-Bold;
	    font-size: 18px;
      margin-left: 40px;
      margin-bottom: 5px;
      background: linear-gradient(180deg, #ffffff 45%, rgba(71,180,249,0.81) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

  }
  
}
</style>
