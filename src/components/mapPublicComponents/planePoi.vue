<template>
  <div class="poi-box" :style="{'top':top,'left':left}">
      <div class="box" :style="{'opacity':isShow?'1':'0'}">
          <div class="title">{{title}}</div>
          <div class="bottom">
              <div class="info num">
                  <span>编号</span>
                  <span>{{number}}</span>
              </div>
              <div class="info status">
                  <span>状态</span>
                  <span>{{status}}</span>
              </div>
          </div>
          
      </div>
      <div class="poi-img" @click="poiClick">
          <img :src="imgSrc" alt="" srcset="">
      </div>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'感烟监测',
        },
        number:{
            type:String,
            default:'GY001',
        },
        status:{
            type:String,
            default:'报警',
        },
        imgSrc:{
            type:String,
            default:require('../../assets/img2/map1@2x.png'),
        },
        top:{
            type:String,
            default:'0.1rem',
        },
        left:{
            type:String,
            default:'0.1rem',
        },
    },
    data(){
        return{
            isShow:true
        }
    },
    methods:{
        poiClick(){
            if(this.isShow){
                this.isShow = false
            }else{
                this.isShow = true
            }
        }
    }
}
</script>

<style lang="less" scoped>
.poi-box{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    .box{
        width: 203px;
        height: 154px;
        background: url('../../assets/img2/pop1.png') no-repeat center;
        background-size: 100%;
        box-sizing: border-box;
        padding-top: 40px;
        .title{
            font-family: MicrosoftYaHei;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ebf6fc;
            text-align: center;
            margin-bottom: 15px;

            text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
            background: linear-gradient(180deg, #ffffff 26%, #6a9ab7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .bottom{
            display: flex;
            justify-content: space-around;
            align-items: center;
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                span:nth-child(1){
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #a7c0d2;
                    text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
                    background: linear-gradient(180deg, #ffffff 6%, #a7c0d2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                span:nth-child(2){
                    font-family: ArialMT;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #13d0ff;
                    opacity: 0.75;
                    text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
                    background: linear-gradient(180deg, #ffffff 6%, #13d0ff 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
            
        }
    }
    .poi-img{
        cursor: pointer;
        img{
            width: 42px;
            height: 55px;  
        }
    }
}
</style>