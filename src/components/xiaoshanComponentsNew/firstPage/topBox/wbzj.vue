<template>
  <div
    class="mask"
    v-if="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">文保资金</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <div class="container">
          <div class="top">
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
            <div class="top-right">
              <div class="part">
                <img
                  src="../../../../assets/img3/m-icon-b.png"
                  alt=""
                  srcset=""
                >
                <div class="info">
                  <div class='row1'>
                    <span>43</span>
                    <span>万元</span>
                  </div>
                  <div class='row2'>
                    社会资金
                  </div>
                </div>
              </div>
              <div class="part">
                <img
                  src="../../../../assets/img3/m-icon-r.png"
                  alt=""
                  srcset=""
                >
                <div class="info">
                  <div class='row1'>
                    <span>3000</span>
                    <span>万元</span>
                  </div>
                  <div class='row2'>
                    财政资金
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <DialogTitleBox :title="'资金申请列表'" />
              <div class="list">
                <div
                  class="item"
                  v-for="(item, index) in listData"
                  :key="index"
                  @click="showDeatil(item)"
                >
                  <div class="index">
                    <span class="text">{{ index+1 }}</span>
                  </div>
                  <div class="info">
                    <div class="row">
                      <span>申请单位 : </span>
                      <span>{{ item.name }}</span>
                      <span>资金用途 : </span>
                      <span>{{ item.purpose }}</span>
                    </div>
                    <div class="row">
                      <span>申请金额 : </span>
                      <span>{{ item.num }}</span>
                      <span>申请时间 : </span>
                      <span>{{ item.time }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pagination">
                <el-pagination
                  @current-change="pageNumChange"
                  :page-size="3"
                  :pager-count="5"
                  layout="prev, pager, next"
                  :total="3"
                >
                </el-pagination>
              </div>
            </div>
            <div class="right">
              <DialogTitleBox :title="'资金申请详情'" />
              <div class="part-1">
                <div class="text">资金使用流程</div>
                <div class="process">
                  <div
                    class="bgImg"
                    :style="{ background: `url(${true ? img_g : img_b})`,'background-size': '100% '}"
                  >
                    申请
                  </div>
                  <img
                    src="../../../../assets/img2/arrow.png"
                    alt=""
                    srcset=""
                    width="34px"
                    height="26px"
                  />
                  <div
                    class="bgImg"
                    :style="{ background: `url(${true ? img_g : img_b})`,'background-size': '100% ' }"
                  >
                    审批
                  </div>
                  <img
                    src="../../../../assets/img2/arrow.png"
                    alt=""
                    srcset=""
                    width="34px"
                    height="26px"
                  />
                  <div
                    class="bgImg"
                    :style="{ background: `url(${false ? img_g : img_b})`,'background-size': '100% ' }"
                  >
                    拨付
                  </div>
                  <img
                    src="../../../../assets/img2/arrow.png"
                    alt=""
                    srcset=""
                    width="34px"
                    height="26px"
                  />
                  <div
                    class="bgImg"
                    :style="{ background: `url(${false ? img_g : img_b})`,'background-size': '100% ' }"
                  >
                    使用
                  </div>
                  <img
                    src="../../../../assets/img2/arrow.png"
                    alt=""
                    srcset=""
                    width="34px"
                    height="26px"
                  />
                  <div
                    class="bgImg"
                    :style="{ background: `url(${false ? img_g : img_b})`,'background-size': '100% ' }"
                  >
                    核查
                  </div>
                </div>
              </div>
              <div class="part-2">
                <div class="left">
                  <div class="row">
                    <div class="half">
                      <span>申请单位 : </span>
                      <span>务本堂</span>
                    </div>
                    <div class="half">
                      <span>直接责任单位 : </span>
                      <span>进化镇</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="half">
                      <span>申请人 : </span>
                      <span>张帆</span>
                    </div>
                    <div class="half">
                      <span>联系电话 : </span>
                      <span>13954726138</span>
                    </div>
                  </div>
                  <div class="row row3">
                    <div class="half">
                      <span>申请内容 : </span>
                      <span>务本堂部分消防设施老旧、发霉、需要更换</span>
                    </div>
                  </div>
                  <div class="row row4">
                    <div class="half">
                      <span>资金估算 : </span>
                      <span>1500</span>
                    </div>
                    <div class="half btn">查看附件清单</div>
                  </div>
                </div>
                <div class="right-img">
                  <div class="text">现场照片</div>
                  <div class="img">
                    <img
                      src="../../../../assets/img2/wbt_zj.png"
                      alt=""
                      srcset=""
                    />
                  </div>
                </div>
              </div>
              <div class="part-3">
                <div class="btn-1">驳回申请</div>
                <div class="btn-2">审批通过</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_device_list } from '@/api/xsApi2'
import { wwbhzj, zjly } from '../../../../api/xsApi'
import EchartsPie from '../components/echartPie'
import DialogTitleBox from '../../../newComponents/dialogTitleBox'

export default {
  components: { EchartsPie, DialogTitleBox },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      moneyTotal: '500',
      wwbhzj_chartData: [],
      logo_2: '1',

      // 资金列表
      listData: [
        {
          name: '务本堂',
          purpose: '修缮',
          num: '150000',
          time: '2022/05/10',
        },
        {
          name: '许家南大房',
          purpose: '电器更换',
          num: '500',
          time: '2022/05/10',
        },
        {
          name: '汤寿潜故居',
          purpose: '电器更换',
          num: '500',
          time: '2022/05/10',
        },
      ],
      // 资金详情
      img_g: require('../../../../assets/img2/flow_sheet_g.png'),
      img_b: require('../../../../assets/img2/flow_sheet_blue.png'),
      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 0,
    }
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
    this.getWWBHZJ_data('0', '0')
    this.getZJLY_data('0', '0')
  },

  methods: {
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
        this.moneyTotal = result.reportNum1 * 1 + 3000
        // this.saveMoney_listData[0].num = result.reportNum2
        // this.saveMoney_listData[1].num = result.reportNum3
        // this.saveMoney_listData[2].num = result.reportNum4
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

    showDeatil() {
      this.detailBoxShow = true
    },

    // 分页
    pageNumChange(val) {
      this.currentPage = val
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
  background: url('../../../../assets/img2/f-dialogs-box.png') no-repeat center;
  background-size: 100%;
  z-index: 999;
  .info-container {
    width: 1299px;
    height: 807px;
    // background: rgba(255, 0, 0, 0.288);
    margin-top: 15px;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 0;
    .head {
      position: relative;
      width: 100%;
      height: 110px;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding-left: 50px;
      .title {
        width: 1186px;
        height: 89px;
        background: url('../../../../assets/img2/pop-s-title.png') no-repeat
          center;
        background-size: 100%;
        background-position-y: -42px;
        display: flex;
        box-sizing: border-box;
        padding-right: 40px;
        padding-top: 10px;
        align-items: center;
        justify-content: center;
        .top-box {
          width: 555px;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          margin-bottom: 20px;
          .text {
            font-family: SourceHanSansCN-Bold;
            font-size: 30px;
            font-weight: 900;
            font-stretch: normal;
            letter-spacing: 5px;
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
        top: 20px;
        right: 20px;
        width: 34px;
        height: 34px;
        background: url('../../../../assets/img2/-s-ic_guanbi.png');
        background-size: 100%;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 67px);
      box-sizing: border-box;
      padding: 0 40px 0 20px;
      padding-top: 8px;
      .container {
        width: 100%;
        height: calc(100% - 40px);
        .top {
          width: 90%;
          height: 32%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: url('../../../../assets/img2/b-line1.png') bottom
            no-repeat;
          background-size: 100% 100%;
          margin-bottom: 10px;
          .total {
            width: 294px;
            height: 100%;
            box-sizing: border-box;
            padding-left: 20px;
            background: url('../../../../assets/img3/m-pic.png') top no-repeat;
            background-size: 100%;
            display: flex;
            flex-direction: column-reverse;
            justify-content: center;
            align-items: center;
            .text {
              margin: 5px 0 30px 0;
              font-family: MicrosoftYaHei-Bold;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 24px;
              letter-spacing: 1px;
              color: #eceff4;
            }
            .num {
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
            width: 150px;
            height: 100%;
          }
          .top-right {
            width: 437px;
            height: 91px;
            display: flex;
            background: url('../../../../assets/img3/m-icon-bg.png') bottom
              no-repeat;
            background-size: 100% 100%;
            .part {
              width: 50%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 68px;
                height: 66px;
                margin-right: 5px;
              }
              .info {
                .row1 {
                  span:nth-child(1) {
                    font-family: DINAlternate-Bold;
                    font-size: 30px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 24px;
                    letter-spacing: 0px;
                    color: #39e3fd;
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
                .row2 {
                  font-family: SourceHanSansCN-Medium;
                  font-size: 18px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 24px;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
            }
          }
        }
        .bottom {
          width: 100%;
          height: 65%;
          display: flex;
          .left {
            width: 40%;
            height: 100%;
            .list {
              width: 100%;
              height: calc(100% - 100px);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              .item {
                width: 96%;
                height: 80px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid rgba(92, 194, 212, 0.3);
                .index {
                  width: 40px;
                  height: 45px;
                  background: url('../../../../assets/img2/num.png') no-repeat
                    center;
                  background-size: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-right: 8px;
                  .text {
                    font-family: ArialMT;
                    font-size: 24px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 1px;
                    color: #ffffff;
                    background: linear-gradient(
                      180deg,
                      #ffffff 26%,
                      #63f7ff 100%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }
                }
                .info {
                  .row {
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #a2c0d1;
                  }
                  span:nth-child(2n) {
                    color: #51c0e9;
                    display: inline-block;
                    width: 90px;
                  }
                }
              }
            }
            .pagination {
              text-align: right;
            }
          }
          .right {
            width: 60%;
            height: 100%;
            box-sizing: border-box;
            padding-left: 5%;
            background: url('../../../../assets/img2/hr-y.png') no-repeat left;
            background-size: auto 100%;
            .part-1 {
              .text {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                margin: 20px 0 20px 28px;
              }
              .process {
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  width: 34px;
                  height: 26px;
                }
                .bgImg {
                  width: 79px;
                  height: 36px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-family: MicrosoftYaHei;
                  font-size: 18px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 44px;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
            }
            .part-2 {
              height: 220px;
              box-sizing: border-box;
              padding-left: 28px;
              display: flex;
              justify-content: space-between;
              .left {
                width: 360px;
                height: 100%;
                .row {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin: 15px 0;
                  .half:nth-child(1) {
                    flex: 0.9;
                  }
                  .half:nth-child(2) {
                    flex: 1;
                  }
                  .half {
                    span:nth-child(1) {
                      font-family: MicrosoftYaHei;
                      font-size: 16px;
                      font-weight: normal;
                      font-stretch: normal;
                      letter-spacing: 0px;
                      color: #a2c0d1;
                    }
                    span:nth-child(2) {
                      font-family: MicrosoftYaHei;
                      font-size: 16px;
                      font-weight: normal;
                      letter-spacing: 0px;
                      color: #51c0e9;
                    }
                  }
                }
                .row3 {
                  .half {
                    display: flex;
                    align-items: flex-start;
                    span:nth-child(2) {
                      display: inline-block;
                      max-height: 70px;
                      width: 240px;
                      margin-left: 5px;
                    }
                  }
                }
                .row4 {
                  .btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 136px;
                    height: 31px;
                    background: url('../../../../assets/img2/b-btn1.png')
                      no-repeat center;
                    background-size: 100%;
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 24px;
                    letter-spacing: 2px;
                    color: #ffffff;
                    cursor: pointer;
                  }
                }
              }
              .right-img {
                width: 169px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .text {
                  font-family: MicrosoftYaHei;
                  font-size: 16px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #a2c0d1;
                }
                .img {
                  width: 152px;
                  height: 173px;
                  background: url('../../../../assets/img2/img-box.png')
                    no-repeat center;
                  background-size: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  img {
                    width: 140px;
                    height: 158px;
                  }
                }
              }
            }
            .part-3 {
              box-sizing: border-box;
              padding-left: 28px;
              display: flex;
              .btn-1 {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 106px;
                height: 41px;
                background: url('../../../../assets/img2/b-btn2.png');
                background-size: 100%;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 2px;
                color: #ffffff;
                cursor: pointer;
              }
              .btn-2 {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 24px;
                width: 106px;
                height: 41px;
                background: url('../../../../assets/img2/g-btn1.png');
                background-size: 100%;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 24px;
                letter-spacing: 2px;
                color: #ffffff;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
