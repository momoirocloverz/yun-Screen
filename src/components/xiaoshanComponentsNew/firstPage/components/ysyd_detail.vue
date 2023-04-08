<template>
  <div
    class="mask"
    v-if="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">事件详情</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <div class="part1">
          <DialogTitleBox :title="'事件信息'" />
          <div class="part-1">
            <div class="row">
              <div class="col">
                <span>文物名称：</span>
                <span>务本堂</span>
              </div>
              <div class="col">
                <span>事件类型：</span>
                <span>{{row.name||row.title1}}</span>
              </div>
              <div class="col">
                <span>事件编号：</span>
                <span>LXJC0001</span>
              </div>
            </div>
            <div class="row">
              <div class="col" v-show="row.createTime">
                <span>发布时间：</span>
                <span>{{row.createTime}}</span>
              </div>
              <!-- <div class="col">
                <span>巡查时间：</span>
                <span>{{row.createTime}}</span>
              </div>
              <div class="col">
                <span>完成时间：</span>
                <span>{{row.createTime}}</span>
              </div> -->
            </div>
            <div class="row">
              <div class="col">
                <span>检查人员：</span>
                <span>田欢乐</span>
              </div>
              <div class="col">
                <span>联系电话：</span>
                <span>15378659878</span>
              </div>
              <div class="col">
                <span>检查结果：</span>
                <span>发现安全隐患</span>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <span>处置部门：</span>
                <span>进化镇人民政府</span>
              </div>
              <div class="col">
                <span>处置时间：</span>
                <span>1个工作日</span>
              </div>
              <div class="col">
              </div>
            </div>
          </div>
        </div>
        
        <div class="part2">
          <DialogTitleBox :title="'处置依据'" />
          <div class="part-2">
            <div class="content">
              <div class="item">
                <div class="row1">
                  <div class="col-1">
                    <span>
                      1.文物建筑内因生活必须需设置厨房，应设置防火隔断措施 
                    </span>
                  </div>
                  <div class="col-2">
                    查看现场图片
                  </div>
                </div>
                <div class="row2">
                  <div class="col-3">
                    <span>
                      处置依据：《文物建筑火灾风险防范指南（试行）》三、（三）
                    </span>
                  </div>
                  <div class="col-4">
                    查看详情
                  </div>
                </div>
                
                <div class="col-5">
                  5.2.4 当设置消防水池时，应符合下列要求： <br />
                  1、消防水池有的效容积应按火灾延续时间内，将其作统的火灾延续时间不应小于表5.52.4的规定; <br />
                  2、消防用水与生产、生活用水合并的水池、应采取确保消防用水不作它用的技术措施;
                </div>
              </div>

              <div class="item">
                <div class="row1">
                  <div class="col-1">
                    <span>
                      2.禁止违章乱拉电线
                    </span>
                  </div>
                  <div class="col-2">
                    查看现场图片
                  </div>
                </div>

                <div class="row2">
                  <div class="col-3">
                    <span>
                      处置依据：《文物建筑火灾风险防范指南（试行）》一、（二）
                    </span>
                  </div>
                  <div class="col-4">
                    查看详情
                  </div>
                </div>
                <div class="col-5">
                  9.2.6 当设置消防水池时，应符合下列要求：<br />
                  1、消防水池有的效容积应按火灾延续时间内，将其作统的火灾延续时间不应小于表5.52.4的规定;<br />
                  2、消防用水与生产、生活用水合并的水池、应采取确保消防用水不作它用的技术措施;
                </div>
              </div>

              <div class="item">
                <div class="row1">
                  <div class="col-1">
                    <span>
                      3.炉具应在指定范围内使用，且四周禁止堆放杂物，如废纸或其他易燃物品
                    </span>
                  </div>
                  <div class="col-2">
                    查看现场图片
                  </div>
                </div>

                <div class="row2">
                  <div class="col-3">
                    <span>
                      处置依据：《文物建筑火灾风险防范指南（试行）》三、（三）
                    </span>
                  </div>
                  <div class="col-4">
                    查看详情
                  </div>
                </div>
                <div class="col-5">
                  9.2.6 当设置消防水池时，应符合下列要求：<br />
                  1、消防水池有的效容积应按火灾延续时间内，将其作统的火灾延续时间不应小于表5.52.4的规定;<br />
                  2、消防用水与生产、生活用水合并的水池、应采取确保消防用水不作它用的技术措施;
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="img-container">
          <div class="time">
            <DialogTitleBox :title="thridTitle" />
            <div class="time-box">
              <el-timeline>
                <el-timeline-item
                v-for="(item,index) in timelineData"
                :key="index"
                  :timestamp="item.time"
                  placement="top"
                >
                  <div class="content">
                    <div
                      class="depart"
                      :style="{background:`url(${item.img}) no-repeat center`,width:`${item.width/192}rem`}"
                    >
                      {{item.text_1}}
                    </div>
                    <span>
                      {{item.text_2}}
                    </span>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import DialogTitleBox from '../../../newComponents/dialogTitleBox'
import { eventBus } from '../../../../main'
import {get_timeLineData} from '../../../../api/xsApi2'
export default {
  components: { DialogTitleBox },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      processImgSrc: require('../../../../assets/img2/floww-chart6.png'),

      thridTitle:'事件追踪',
      timelineData:[

      ]
    }
  },
  watch:{
    isShow(val){
      if(val){
        if(this.row.instanceId){
          this.get_timeLineData(this.row.instanceId)
        }
      }
    }
  },
  created(){
    // 初始化
    eventBus.$on('initTimeData',(time)=>{
      this.thridTitle = '事件追踪(135机制)'
      this.timelineData = []
      let obj = {
          time:time,
          text_1:'例行检查任务',
          text_2:'已发布',
          img:require(`../../../../assets/img2/1.png`),
          width:226
        }
        this.timelineData.push(obj)
    })
    // 更新任务进度数据
    eventBus.$on('updateTimeData',(msg)=>{
      let obj = {
          time:msg['提交时间'],
          text_1:msg['事件类型'],
          text_2:msg['处置状态'],
          img:require(`../../../../assets/img2/1.png`),
          width:226
        }
        this.timelineData.push(obj)
    })
  },
  mounted() {
    // 挂载到body下
    this.$nextTick(() => {
      const body = document.querySelector('body')
      if (body.append) {
        body.append(this.$el)
      } else {
        body.appendChild(this.$el)
      }
    })
  },
  methods: {
    get_timeLineData(id){
      get_timeLineData(id).then(res=>{
        this.timelineData = []
        console.log(res.data.data)
        let eventType = this.row.name?this.row.name.split('-')[0]:this.row.title1
        res.data.data.map(item=>{
          let obj={
            time:item.createTime,
            text_1:eventType,
            text_2:item.name,
            img:require(`../../../../assets/img2/3.png`),
            width:106
          }
          this.timelineData.push(obj)
        })
        this.timelineData[1].text_1?this.timelineData[1].text_1='1分钟响应':this.timelineData[1].text_1=eventType
        this.timelineData[2].text_1?this.timelineData[2].text_1='3分钟到场':this.timelineData[2].text_1=eventType
        this.timelineData[3].text_1?this.timelineData[3].text_1='5分钟处置':this.timelineData[3].text_1=eventType
      })
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../../../assets/img2/pop-bg.png') no-repeat center;
  background-size: 100%;
  z-index: 1000;
  user-select: none;
  .info-container {
    width: 1700px;
    height: 950px;
    // background: rgba(255, 0, 0, 0.288);
    // margin-top: 15px;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 0;
    .head {
      position: relative;
      width: 100%;
      height: 148;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        width: 1206px;
        height: 89px;
        background: url('../../../../assets/img2/pop-b-title.png') no-repeat
          center;
        background-size: 100%;
        background-position-y: -45px;
        display: flex;
        box-sizing: border-box;
        padding-right: 60px;
        padding-top: 10px;
        align-items: flex-start;
        justify-content: center;
        .top-box {
          width: 555px;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          .text {
            font-family: SourceHanSansCN-Bold;
            font-size: 34px;
            font-weight: 900;
            font-stretch: normal;
            letter-spacing: 10px;
            color: #f5fdff;
            text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
            background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .close {
        position: absolute;
        top: -20px;
        right: -20px;
        width: 56px;
        height: 56px;
        background: url('../../../../assets/img2/close_new.png');
        background-size: 100%;
        cursor: pointer;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 147px);
      box-sizing: border-box;
      display: flex;
      // overflow: auto;
      .part1 {
        flex: 3;
        height: 100%;
        box-sizing: border-box;
        padding-left: 20px;
        .part-1 {
          width: 100%;
          height: 110px;
          box-sizing: border-box;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          .row {
            width: 100%;
            // height: 33%;
            display: flex;
            flex-direction: column;
          justify-content: space-between;
          align-items: center;
            // justify-content: flex-start;
            // align-items: center;
            .col {
              width: 100%;
              height: 50px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              span:nth-child(1) {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
              span:nth-child(2) {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #80d6ff;
              }
            }
          }
        }
      }
      .part2{
        flex: 6;
        height: 100%;
        box-sizing: border-box;
        padding-left: 20px;
        background: url('../../../../assets/img2/b-line2.png') no-repeat
              left;
        background-size: auto 100%;
        .part-2 {
          width: 100%;
          height: 100%;
          margin-top: 5px;
          box-sizing: border-box;
        padding-left: 20px;
          .content {
            width: 100%;
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
            padding-left: 10px;
            .item {
              width: 100%;
              height: 280px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: flex-start;
              .row1{
                width: 100%;
                height: 180px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .col-1 {
                  height: 100%;
                  width: 293px;
                  background: url('../../../../assets/img2/base-a.png') no-repeat;
                  background-size: 100% auto;
                  background-position-y: 95%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  span {
                    padding: 0 12px;
                    text-align: center;
                    font-family: SourceHanSansCN-Medium;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                  }
                }
                .col-2 {
                  width: 140px;
                  height: 30px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: url('../../../../assets/img2/btn-b.png') no-repeat
                    center;
                  background-size: 100% 100%;
                  font-family: MicrosoftYaHei;
                  font-size: 16px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 24px;
                  letter-spacing: 2px;
                  color: #ffffff;
                  margin: 20px;
                }
              }
              .row2{
                width: 100%;
                height: 200px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 20px 0;
                .col-3 {
                  width: 335px;
                  height: 80px;
                  overflow: auto;
                  box-sizing: border-box;
                  padding: 0 10px;
                  background: url('../../../../assets/img2/base-c.png') no-repeat
                    top;
                  background-size: 100% 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  span {
                    font-family: SourceHanSansCN-Medium;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    &::before {
                      content: '';
                      display: inline-block;
                      margin-right: 5px;
                      height: 9px;
                      width: 9px;
                      border-radius: 50%;
                      background: #85d7f9;
                    }
                  }
                }
                .col-4 {
                  width: 120px;
                  height: 30px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: url('../../../../assets/img2/btn-d.png') no-repeat
                    center;
                  background-size: 100% 100%;
                  font-family: MicrosoftYaHei;
                  font-size: 16px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 24px;
                  letter-spacing: 2px;
                  color: #ffffff;
                  margin: 20px;
                }
              }
              
              .col-5 {
                width: 95%;
                height: 200px;
                overflow: auto;
                box-sizing: border-box;
                padding: 0 10px;
                background: url('../../../../assets/img2/base-e.png') no-repeat
                  top;
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: SourceHanSansCN-Medium;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                display: none;
              }
            }
          }
        }
      }
      .img-container {
        flex: 3;
        height: 100%;
        box-sizing: border-box;
        padding-left: 50px;
        display: flex;
        background: url('../../../../assets/img2/b-line2.png') no-repeat
              left;
        background-size: auto 100%;
        .time {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          .time-box {
            width: 100%;
            height: 100%;
            
            .el-timeline {
              margin-top: 30px;
              .el-timeline-item {
                .content {
                  width: 400px;
                  height: 100px;
                  // background: #fff;
                  .depart {
                    color: rgb(255, 255, 255);
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 35px;
                    background-size: 100% 100% !important;
                  }
                  span {
                    display: block;
                    font-family: MicrosoftYaHei;
                    font-size: 20px;
                    margin-top: 5px;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>


