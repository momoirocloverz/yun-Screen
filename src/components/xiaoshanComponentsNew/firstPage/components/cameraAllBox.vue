<template>
  <div class="mask" v-show="isShow">
      <div class="container">
          <div class="head">
              <div class="tab">
                  <div class="item tab-1" :class="[currentShow?'active':'']" @click="tabChange(true)">视频列表</div>
                  <div class="item tab-2" :class="[!currentShow?'active':'']" @click="tabChange(false)">12屏视窗</div>
              </div>
              <div class="close" @click="close"></div>
          </div>
          <div class="body">
              <div class="tab_1" v-show="currentShow">
                  <div class="head">
                      <DialogTitleBox :title="'视频监控列表'"/>
                      <div class="right">
                          <div class="total">
                              <img src="../../../../assets/img2/v-icon@2x.png" alt="" srcset="">
                              <span>视频总数</span>
                              <span>80</span>
                          </div>
                          <div class="select">
                              <div class="text">
                                  <span>全部视频</span>
                              </div>
                              <div class="img">
                                  <img src="" alt="" srcset="">
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="list">
                      <div class="item" v-for="(item,index) in 10" :key="item" @click="listClick(index)" :class="[currentIndex==index?'active':'']">
                          <div class="left">
                              <img v-if="currentIndex==index" src="../../../../assets/img2/v-icon-s@2x.png" alt="" srcset="">
                              <img v-else src="../../../../assets/img2/v-icon@2x.png" alt="" srcset="">
                              <span>位置：务本堂XXXXXXX</span>
                          </div>
                          <div class="right">
                              <img v-if="currentIndex==index" src="../../../../assets/img2/p-icon-s@2x.png" alt="" srcset="">
                              <img v-else src="../../../../assets/img2/p-icon-n@2x.png" alt="" srcset="">
                          </div>
                      </div>
                  </div>
              </div>
              <div class="tab_2" v-show="!currentShow">
                  <div class="head">
                      <div class="left">
                          <span>实时监控</span>
                      </div>
                      <div class="right">
                          <div class="up">
                              <span>上一组</span>
                          </div>
                          <div class="down">
                              <span>下一组</span>
                          </div>
                      </div>
                  </div>
                  <div class="video-box">
                      <div class="item" v-for="(item,index) in 12" :key="index">
                        <VideoBox
                            :index="index"
                            :videoId="`${index}00`"
                            :width="'100%'"
                            :height="'100%'"
                            :imgSrc="'http://localhost:8089/static/images/culturalSave/poster_1.png'"
                        />
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import DialogTitleBox from '../../../newComponents/dialogTitleBox'
import VideoBox from "../../publicComponents/videoBoxXG";
export default {
    components:{DialogTitleBox,VideoBox},
    props:{
        isShow:{
            type:Boolean
        }
    },
    data(){
        return{
            currentShow:true,
            currentIndex:0
        }
    },
    mounted(){
        // 挂载到body下
        this.$nextTick(() => {
            const body = document.querySelector("body");
            if (body.append) {
                body.append(this.$el);
            } else {
                body.appendChild(this.$el);
            }
        });
    },
    methods:{
        tabChange(boolean){
            this.currentShow = boolean
        },
        listClick(index){
            this.currentIndex = index
        },
        close(){
            this.currentShow = true
            this.$emit('close')
        }
    }
}
</script>

<style lang="less" scoped>
.mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .container{
        width: 1736px;
        height: 979px;
        background: url('../../../../assets/img2/full-s-pop.png');
        background-size: 100%;
        box-sizing: border-box;
        padding: 30px 50px;
        .head{
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .tab{
                height: 40px;
                width: 280px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .item{
                    width: 135px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: MicrosoftYaHei-Bold;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 24px;
                    letter-spacing: 2px;
                    color: #ffffff;
                    background: url('../../../../assets/img2/tab-n-b.png') no-repeat center;
                    background-size: 100%;
                    cursor: pointer;
                }
                .active{
                    background: url('../../../../assets/img2/tab-s-b.png') no-repeat center;
                    background-size: 100%;
                }
            }
            .close{
                width: 34px;
                height: 34px;
                background: url('../../../../assets/img2/close.png') no-repeat center;
                background-size: 100%;
            }
        }
        .body{
            width: 100%;
            height: calc(100% - 120px);
            overflow: auto;
            .tab_1{
                width: 100%;
                height: 100%;
                .head{
                    height: 80px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    .right{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .total{
                            width: 167px;
                            height: 46px;
                            background: url('../../../../assets/img2/v-btn.png') no-repeat center;
                            background-size: 100%;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            margin-right: 20px;
                            img{
                                width: 28px;
                                height: 26px;
                            }
                            span:nth-child(2){
                                font-family: MicrosoftYaHei;
                                font-size: 16px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 24px;
                                letter-spacing: 2px;
                                color: #9cd1fe;
                            }
                            span:nth-child(3){
                                font-family: MicrosoftYaHei-Bold;
                                font-size: 24px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 24px;
                                letter-spacing: 2px;
                                color: #41e6ff;
                            }
                        }
                        .select{
                            width: 136px;
                            height: 46px;
                            background: url('../../../../assets/img2/v-selected.png') no-repeat center;
                            background-size: 100%;
                            .text{
                                height: 100%;
                                width: 110px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                span{
                                    font-family: MicrosoftYaHei;
                                    font-size: 16px;
                                    font-weight: normal;
                                    font-stretch: normal;
                                    line-height: 24px;
                                    letter-spacing: 2px;
                                    color: #9cd1fe;
                                }
                            }
                            .img{
                                height: 100%;
                                width: calc(100% - 110px);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                img{
                                    width: 11px;
                                    height: 9px;
                                }
                            }
                        }
                    }
                }
                .list{
                    width: 100%;
                    height: calc(100% - 100px);
                    .item{
                        width: 100%;
                        height: 54px;
                        box-sizing: border-box;
                        padding: 0 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: solid 1px rgba(21,110,157,0.3);
                        &:hover{
                            background: linear-gradient(to right,#3baef5c2 1%,rgba(0,0,0,0) 50%);
                        }
                        .left{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            img{
                                width: 28px;
                                height: 26px;
                                margin-right: 20px;
                            }
                            span{
                                font-family: MicrosoftYaHei;
                                font-size: 20px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #ffffff;
                            }
                        }
                        .right{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            img{
                                width: 28px;
                                height: 26px;
                            }
                        }
                    }
                    .active{
                        background: linear-gradient(to right,#3baef5 1%,rgba(0,0,0,0) 50%);
                    }
                }
            }
            .tab_2{
                width: 100%;
                height: 100%;
                .head{
                    height: 52px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 5px;
                    background: url('../../../../assets/img2/v-title.png') no-repeat center;
                    background-size: 100%;
                    box-sizing: border-box;
                    padding-left: 50px;
                    margin-bottom: 5px;
                    .left{
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        span{
                            font-family: MicrosoftYaHei;
                            font-size: 18px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 2px;
                            color: #d1eaff;
                        }
                    }
                    .right{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 36px;
                        .up{
                            width: 84px;
                            height: 36px;
                            background: url('../../../../assets/img2/up.png') no-repeat center;
                            background-size: 100%;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            margin-right: 10px;
                            cursor: pointer;
                            span{
                                font-family: MicrosoftYaHei;
                                font-size: 16px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 24px;
                                letter-spacing: 2px;
                                color: #9cd1fe;
                            }
                        }
                        .down{
                            width: 84px;
                            height: 36px;
                            background: url('../../../../assets/img2/down.png') no-repeat center;
                            background-size: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            span{
                                font-family: MicrosoftYaHei;
                                font-size: 16px;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 24px;
                                letter-spacing: 2px;
                                color: #9cd1fe;
                            }
                        }
                    }
                }
                .video-box{
                    width: 100%;
                    height: calc(100% - 57px);
                    // background: red;
                    display: flex;
                    flex-wrap: wrap;
                    .item{
                        width: 24%;
                        height: 33%;
                        margin: 0.5%;
                    }
                }
            }
        }
    }
}
</style>