<template>
  <div class="container">
      <div class="title">
          {{rhdata.reportName}}
      </div>
      <div class="row1">
          <div class="item left">
              <span>{{rhdata.reportNum5}}</span>
              <span>安全责任书签订率</span>
          </div>
          <div class="item right">
              <span>{{rhdata.reportNum6}}</span>
              <span>事件处置率</span>
          </div>
      </div>
      <div class="row2">
          <div class="item">
              <span>国保<br/>单位</span>
              <span>{{rhdata.reportNum1}}</span>
          </div>
          <div class="item">
              <span>省保<br/>单位</span>
              <span>{{rhdata.reportNum2}}</span>
          </div>
          <div class="item">
              <span>市保<br/>单位</span>
              <span>{{rhdata.reportNum3}}</span>
          </div>
          <div class="item">
              <span>市级<br/>文保点</span>
              <span>{{rhdata.reportNum4}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    rhdata: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    };
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
    .container{
        width: 330px;
        height: 247px;
        position: absolute;
        left:17px;
        top: -50px;
        background: url('../../../assets/img2/pop7.png') no-repeat center;
        background-size: 100%;
        box-sizing: border-box;
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        visibility: visible;
        .title{
            width: 100%;
            height: 33px;
            line-height: 33px;
            text-align: left;
            box-sizing: border-box;
            padding-left: 15px;
            font-family: MicrosoftYaHei-Bold;
            font-size: 20px;
            font-weight: bold;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
        }
        .row1{
            width: 286px;
            height: 80px;
            margin: 0 20px;
            border-bottom: 1px solid rgba(8, 172, 206, 0.3);
            display: flex;
            .item{
                flex:1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                span:nth-child(1){
                    font-family: Arial-BoldMT;
                    font-size: 24px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #4ae3ff;
                    margin-bottom: 5px;
                }
                span:nth-child(2){
                    font-family: MicrosoftYaHei;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: -1px;
                    color: #ffffff;
                }
            }
            .left{
                border-right: 1px solid rgba(8, 172, 206, 0.3);
            }
        }

        .row2{
            width: 100%;
            margin: 0 10px;
            box-sizing: border-box;
            padding: 0 10px;
            display: flex;
            flex-wrap: wrap;
            .item{
                width: 138px;
                height: 59px;
                background: url('../../../assets/img2/txt-info-bg.png') no-repeat center bottom;
                background-size: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin: 0 4px;
                box-sizing: border-box;
                padding: 0 10px;
                span:nth-child(1){
                    font-family: MicrosoftYaHei;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                }
                span:nth-child(2){
                    font-family: Arial-BoldMT;
                    font-size: 24px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #4ae3ff;
                }
            }
        }
    }
</style>
