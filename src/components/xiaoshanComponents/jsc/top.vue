<template>
  <div class="top">
    <div class="item" v-for="(item, index) in topList" :key="index">
      <img :src="item.imgSrc" alt="" srcset="" />
      <div>
        <span>{{ item.name }}</span>
        <span
          >{{ item.num }}
          <!-- <span class="unit">项</span> -->
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// api接口
import {zdtj} from '../../../api/xsApi'
export default {
  name: "",
  data() {
    return {
      topList: [
        {
          name: "当前隐患",
          num: "0",
          imgSrc: require("../../../assets/img2/m-icon1.png")
        },
        {
          name: "逾期催办",
          num: "3",
          imgSrc: require("../../../assets/img2/m-icon2.png")
        },
        {
          name: "待整改",
          num: "9",
          imgSrc: require("../../../assets/img2/m-icon3.png")
        },
        {
          name: "立案调查",
          num: "7",
          imgSrc: require("../../../assets/img2/m-icon4.png")
        }
      ]
    };
  },
  mounted(){
    this.getZDTJ_data()
  },
  methods: {
    getZDTJ_data(){
      zdtj().then(res=>{
        let result = res.data.data[0]
        console.log('置顶统计',result)
        this.topList[0].num = result.reportNum1
        this.topList[1].num = result.reportNum2
        this.topList[2].num = result.reportNum3
        this.topList[3].num = result.reportNum4
      })
    }
  },
};
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
  background: url("../../../assets/img2/m-box-bg.png") no-repeat center;
  padding: 0 10px;
  .item {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    img {
      width: 107px;
      height: 120px;
      margin-right: 5px;
    }
    div {
      height: 135px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      span:nth-child(1) {
        font-family: SourceHanSansCN-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ededed;
      }
      span:nth-child(2) {
        font-family: DINAlternate-Bold;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #4ae3ff;
        .unit {
          font-family: SourceHanSansCN-Bold;
          font-size: 19px;
          font-weight: normal;
          letter-spacing: 0px;
          color: #4ae3ff;
        }
      }
    }
  }
}
</style>
