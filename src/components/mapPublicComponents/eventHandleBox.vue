<template>
  <div class="container" v-if="isShow" :style="{ left: left + 'rem' }">
    <div class="title">{{ title }}待办清单</div>
    <div class="body">
      <div class="item" v-for="(item, index) in taskList" :key="index">
        <div class="item-title" v-show="title !== '一网统管'">
          {{ item.title }}
        </div>
        <div class="row">
          <span>提交时间：</span>
          <span>{{ item.create_time }}</span>
        </div>
        <div class="row">
          <span>任务内容：</span>
          <span>{{ item.content }}</span>
        </div>
        <div class="btn-box">
          <div class="btn" @click="handle(item)">{{ btnName }}</div>
        </div>
      </div>
    </div>

    <AddBox :isShow="isAddBoxShow" @close="addBoxClose" />
    <YwtgDetail :isShow="isShow_ywtg_detail" :formData="ywtgDetailInfo" @close="ywtg_detailClose" />
  </div>
</template>

<script>
import AddBox from './add';
import YwtgDetail from './YwtgDatail';

import { ywtg_detail } from '../../api/xsApi.js';

import Vue from 'vue';
//自定义drag指令
Vue.directive('drag', {
  bind: function(el, binding) {
    let oDiv = el; //当前元素
    let self = this; //上下文
    oDiv.onmousedown = function(e) {
      //鼠标按下，计算当前元素距离可视区的距离
      let disX = e.clientX - oDiv.offsetLeft;
      let disY = e.clientY - oDiv.offsetTop;
      document.onmousemove = function(e) {
        //通过事件委托，计算移动的距离
        let l = e.clientX - disX;
        let t = e.clientY - disY;
        //移动当前元素
        oDiv.style.left = l + 'px';
        oDiv.style.top = t + 'px';
        //将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY}, el)
        binding.value({ x: l, y: t }, el);
      };
      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
});

export default {
  components: {
    AddBox,
    YwtgDetail,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
      default: '1',
    },
    title: {
      type: String,
      default: '',
    },
    left: {
      type: String,
      default: '0',
    },
    taskList: {
      type: Array,
      default: () => [
        {
          title: '安全责任书待办',
          time: '2022-05-23 10：23',
          content: '进化镇完成定级评分表填写，请操作员核查',
        },
        {
          title: '安全责任书待办',
          time: '2022-05-23 10：23',
          content: '进化镇完成定级评分表填写，请操作员核查',
        },
        {
          title: '安全责任书待办',
          time: '2022-05-23 10：23',
          content: '进化镇完成定级评分表填写，请操作员核查',
        },
      ],
    },
  },
  data() {
    return {
      isAddBoxShow: false,
      isShow_ywtg_detail: false,
      ywtgDetailInfo: {},
      btnName: '处置',
    };
  },
  watch: {
    logo() {},
    title(val) {
      switch (val) {
        case '一网统管':
          this.btnName = '查看';
          break;
        default:
          this.btnName = '处置';
          break;
      }
    },
  },
  mounted() {
    // 挂载到body下
    // this.$nextTick(() => {
    //     const body = document.querySelector("body");
    //     if (body.append) {
    //         body.append(this.$el);
    //     } else {
    //         body.appendChild(this.$el);
    //     }
    // });
  },
  methods: {
    handle(item) {
      if (this.btnName === '处置') {
        this.isAddBoxShow = true;
      } else {
        this.get_ywtg_detail(item.id);
        this.isShow_ywtg_detail = true;
      }
    },
    addBoxClose() {
      this.isAddBoxShow = false;
    },
    ywtg_detailClose() {
      this.isShow_ywtg_detail = false;
    },
    get_ywtg_detail(id) {
      ywtg_detail(id).then(res => {
        // console.log("一网统管", res.data);
        this.ywtgDetailInfo = res.data.data;
      });
    },
    greet(val) {
      let x = val.x;
      let y = val.y;
      let width = 250;
      let height = 522;
      //   console.log(x, y);
      if (x <= 0) x = 0;
      if (y <= 0) y = 0;
      if (x >= 1920 - width) x = 1920 - width;
      if (y >= 1080 - height) y = 1080 - height;
      this.$el.style.left = x + 'px';
      this.$el.style.top = y + 'px';
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 250px;
  height: 522px;
  position: absolute;
  top: 140px;
  left: 520px;
  background: url('../../assets/img2/m-pop-box.png') no-repeat center;
  background-size: 100%;
  z-index: 20;
  user-select: none;
  .title {
    width: 100%;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #feffff;
  }
  .body {
    width: 100%;
    height: calc(100% - 40px);
    overflow: auto;
    box-sizing: border-box;
    padding: 19px;
    padding-top: 15px;
    .item {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-bottom: 1px #1f4f69 dashed;
      margin-bottom: 15px;
      .item-title {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #feffff;
        margin-bottom: 15px;
      }
      .row {
        span:nth-child(1) {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #9cd7ff;
          line-height: 24px;
        }
        span:nth-child(2) {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          font-weight: normal;
          letter-spacing: 0px;
          color: #feffff;
          line-height: 24px;
        }
      }
      .btn-box {
        width: 100%;
        height: 24px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 5px 0;
        cursor: pointer;
        .btn {
          width: 80px;
          height: 100%;
          background: url('../../assets/img2/m-btn.png') no-repeat;
          background-position: -2px -6px;
          background-size: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: MicrosoftYaHei-Bold;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
      &:last-child {
        border: none;
      }
    }
  }
}
</style>
