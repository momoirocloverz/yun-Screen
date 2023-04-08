<template>
  <div
    class="mask"
    v-show="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">设施设备</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <div class="container">
          <div class="left">
            <div class="list">
              <div
                class="item"
                v-for="(item,index) in listData"
                :key="index+1"
                @click="listClick(item,index)"
                :class="[currentIndex==index?'active':'']"
              >
                <div class="left-img">
                  <span>{{item.name}}</span>
                  <span>{{item.num}}件</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div
              class="item"
              v-for="(item,index) in rightListData"
              :key="index+20"
            >
              <img
                :src="imgSrc"
                alt=""
                srcset=""
              >
              <div class="right-list">
                <div class="row">
                  <span>名称：</span>
                  <span>{{item.facilitiesName}}</span>
                </div>
                <div class="row">
                  <span>所在文保单位：</span>
                  <span>{{item.bumpPointName}}</span>
                </div>
                <div class="row">
                  <span>位置：</span>
                  <span>{{item.locationMarks}}</span>
                </div>
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

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listData: [],
      rightListData: [],
      currentIndex: 0,
      imgSrc: require('../../../../assets/img3/device-icon3.png'),
    }
  },
  mounted() {
    this.getLeftList()
    // this.getCameraList()
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
    // 获取统计列表数据
    getLeftList() {
      get_device_list().then((res) => {
        this.listData = res.data.data
        this.rightListData = res.data.data[0].facilitiesDetailVOList
      })
    },
    listClick(item, index) {
      this.currentIndex = index
      this.rightListData = this.listData[index].facilitiesDetailVOList
      let name = item.name
      switch (name) {
        case '大功率电器':
          this.imgSrc = require('../../../../assets/img3/device-icon3.png')
          break
        case '消防栓':
          this.imgSrc = require('../../../../assets/img3/device-icon2.png')
          break
        case '灭火器':
          this.imgSrc = require('../../../../assets/img3/device-icon1.png')
          break
        default:
          break
      }
    },

    close() {
      this.currentIndex = 0
      this.rightListData = this.listData[0].facilitiesDetailVOList
      this.imgSrc = require('../../../../assets/img3/device-icon3.png')
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
        display: flex;
        .left {
          width: 300px;
          height: 100%;
          margin-right: 10px;
          .list {
            width: 100%;
            height: 100%;
            .item {
              width: 100%;
              height: 54px;
              box-sizing: border-box;
              padding: 0 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: solid 1px rgba(21, 110, 157, 0.3);
              cursor: pointer;
              &:hover {
                background: linear-gradient(
                  to right,
                  #3baef5c2 1%,
                  rgba(0, 0, 0, 0) 50%
                );
              }
              .left-img {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                  font-family: MicrosoftYaHei;
                  font-size: 20px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
            }
            .active {
              background: linear-gradient(
                to right,
                #3baef5 1%,
                rgba(0, 0, 0, 0) 50%
              );
            }
          }
        }
        .right {
          height: 100%;
          overflow: auto;
          width: calc(100% - 310px);
          background: url('../../../../assets/img2/hr-y.png') no-repeat left;
          background-size: auto 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          .item {
            width: 80%;
            height: 100px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            flex-direction: row;
            margin-bottom: 10px;
            border-bottom: 1px solid rgba(92, 194, 212, 0.3);
            img {
              width: 70px;
              height: 79px;
            }
            .right-list {
              width: calc(100% - 70px);
              height: 80px;
              display: flex;
              flex-wrap: wrap;
              box-sizing: border-box;
              padding-left: 20px;
              .row {
                width: 50%;
                height: 50%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-family: MicrosoftYaHei;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;

                span:nth-child(1) {
                  color: #a2c0d1;
                }
                span:nth-child(2) {
                  color: #51c0e9;
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
