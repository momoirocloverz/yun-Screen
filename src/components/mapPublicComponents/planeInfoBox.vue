<template>
    <div
        class="mask"
        v-show="isShow"
    >
        <div class="info-container">
            <div class="head">
                <div class="title">
                    <div class="top-box">
                        <img
                            src="../../assets/img2/A@2x.png"
                            width="50px"
                            height="50px"
                            alt=""
                            srcset=""
                        >
                        <span class="text">建筑平面图</span>
                    </div>
                </div>
                <div
                    class="close"
                    @click="close"
                ></div>
            </div>
            <div class="body">
                <div class="part1">
                    <DialogTitleBox :title="'文物列表'" />
                    <div class="left">
                        <div
                            class="item"
                            v-for="(item,index_f) in planeData"
                            :key="index_f"
                        >
                            <div
                                class="father sameStyle"
                                @click="checkClick_2(index_f)"
                            >
                                <img
                                    class="down"
                                    v-show="item.isSelected"
                                    src="../../assets/img2/down@3x.png"
                                    alt=""
                                    srcset=""
                                    width="16px"
                                    height="16px"
                                >
                                <img
                                    class="right"
                                    v-show="!item.isSelected"
                                    src="../../assets/img2/right@3x.png"
                                    alt=""
                                    srcset=""
                                    width="16px"
                                    height="16px"
                                >
                                <span class="title">{{item.name}}</span>
                            </div>
                            <div
                                class="child"
                                v-show="item.isSelected"
                                v-for="(val,index_c) in item.child"
                                :key="index_c"
                            >
                                <div
                                    class="val sameStyle"
                                    :class="[currentIndex == index_f + '_' + index_c&&(!val.child||val.child.length<=0)?'active':'']"
                                    @click="listClick(val,index_f,index_c)"
                                >
                                    <img
                                        class="down"
                                        v-show="val.isSelected&&val.child&&val.child.length>0"
                                        src="../../assets/img2/down@3x.png"
                                        alt=""
                                        srcset=""
                                        width="16px"
                                        height="16px"
                                    >
                                    <img
                                        class="right"
                                        v-show="!val.isSelected&&val.child&&val.child.length>0"
                                        src="../../assets/img2/right@3x.png"
                                        alt=""
                                        srcset=""
                                        width="16px"
                                        height="16px"
                                    >
                                    <span class="text">{{val.name}}</span>
                                </div>

                                <div
                                    class="child-child"
                                    v-show="val.isSelected"
                                >
                                    <div
                                        class="val-child sameStyle"
                                        :class="[currentIndex == index_f + '_' + index_c+'_'+index_c_c?'active':'']"
                                        v-for="(child_val,index_c_c) in val.child"
                                        :key="index_c_c"
                                        @click="listClick(child_val,index_f,index_c,index_c_c)"
                                    >
                                        <span class="text">{{child_val.name}}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div class="part2">
                    <div class="plane-img">
                        <img
                            :src="currentImg"
                            alt=""
                            srcset=""
                        >
                    </div>

                    <PlanePoi v-show="currentImg&&currentIndex.split('_')[1]==0" />
                    <PlanePoi
                        v-show="currentImg&&currentIndex.split('_')[1]==0"
                        :title="'水压监测'"
                        :number="'SY001'"
                        :status="'正常'"
                        :imgSrc="require('../../assets/img2/map2@2x.png')"
                        :top="'1rem'"
                        :left="'1.5rem'"
                    />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DialogTitleBox from '../newComponents/dialogTitleBox'
import PlanePoi from './planePoi'
export default {
  components: { DialogTitleBox, PlanePoi },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    currentIndex: {
      type: String,
      default: '0_1',
    },
  },
  data() {
    return {
      planeData: [
        {
          name: '茅湾里窑址',
          isSelected: false,
          child: [
            {
              id: '1',
              name: '平面图',
              isSelected: false,
              child: [
                {
                  id: '1',
                  name: '一层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-1.png'),
                },
                {
                  id: '2',
                  name: '二层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-2.png'),
                },
              ],
            },
            {
              id: '2',
              name: '规划图',
              isSelected: false,
              imgSrc: require('../../assets/img2/ght-mwlyz.jpg'),
            },
            {
              id: '3',
              name: '现状图',
              isSelected: false,
              imgSrc: require('../../assets/img2/xzt-mwlyz.jpg'),
            },
          ],
        },
        {
          name: '务本堂',
          isSelected: false,
          child: [
            {
              id: '1',
              name: '平面图',
              isSelected: false,
              child: [
                {
                  id: '1',
                  name: '一层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-1.png'),
                },
                {
                  id: '2',
                  name: '二层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-2.png'),
                },
              ],
            },
            {
              id: '2',
              name: '规划图',
              isSelected: false,
            },
            {
              id: '3',
              name: '影像图',
              isSelected: false,
            },
          ],
        },
        {
          name: '许家南大房',
          isSelected: false,
          child: [
            {
              id: '1',
              name: '平面图',
              isSelected: false,
              child: [
                {
                  id: '1',
                  name: '一层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-1.png'),
                },
                {
                  id: '2',
                  name: '二层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-2.png'),
                },
              ],
            },
            {
              id: '2',
              name: '规划图',
              isSelected: false,
            },
            {
              id: '3',
              name: '影像图',
              isSelected: false,
            },
          ],
        },
        {
          name: '朱凤标故居',
          isSelected: false,
          child: [
            {
              id: '1',
              name: '平面图',
              isSelected: false,
              child: [
                {
                  id: '1',
                  name: '一层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-1.png'),
                },
                {
                  id: '2',
                  name: '二层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-2.png'),
                },
              ],
            },
            {
              id: '2',
              name: '规划图',
              isSelected: false,
            },
            {
              id: '3',
              name: '影像图',
              isSelected: false,
            },
          ],
        },
        {
          name: '汤寿潜故居(祖宅)',
          isSelected: false,
          child: [
            {
              id: '1',
              name: '平面图',
              isSelected: false,
              child: [
                {
                  id: '1',
                  name: '一层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-1.png'),
                },
                {
                  id: '2',
                  name: '二层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-2.png'),
                },
              ],
            },
            {
              id: '2',
              name: '规划图',
              isSelected: false,
            },
            {
              id: '3',
              name: '影像图',
              isSelected: false,
            },
          ],
        },
        {
          name: '凤坞315号民居',
          isSelected: false,
          child: [
            {
              id: '1',
              name: '平面图',
              isSelected: false,
              child: [
                {
                  id: '1',
                  name: '一层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-1.png'),
                },
                {
                  id: '2',
                  name: '二层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-2.png'),
                },
              ],
            },
            {
              id: '2',
              name: '规划图',
              isSelected: false,
            },
            {
              id: '3',
              name: '影像图',
              isSelected: false,
            },
          ],
        },
        {
          name: '葛云飞墓',
          isSelected: false,
          child: [
            {
              id: '1',
              name: '平面图',
              isSelected: false,
              child: [
                {
                  id: '1',
                  name: '一层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-1.png'),
                },
              ],
            },
            {
              id: '2',
              name: '规划图',
              isSelected: false,
            },
            {
              id: '3',
              name: '影像图',
              isSelected: false,
            },
          ],
        },
        {
          name: '纱帽山窑遗址',
          isSelected: false,
          child: [
            {
              id: '1',
              name: '平面图',
              isSelected: false,
              child: [
                {
                  id: '1',
                  name: '一层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-1.png'),
                },
              ],
            },
            {
              id: '2',
              name: '规划图',
              isSelected: false,
            },
            {
              id: '3',
              name: '影像图',
              isSelected: false,
            },
          ],
        },
        {
          name: '蔡东藩墓',
          isSelected: false,
          child: [
            {
              id: '1',
              name: '平面图',
              isSelected: false,
              child: [
                {
                  id: '1',
                  name: '一层',
                  isSelected: false,
                  imgSrc: require('../../assets/img2/plane-wbt-1.png'),
                },
              ],
            },
            {
              id: '2',
              name: '规划图',
              isSelected: false,
            },
            {
              id: '3',
              name: '影像图',
              isSelected: false,
            },
          ],
        },
      ],
      //   currentIndex: '0_0_1',
      currentImg: require('../../assets/img2/plane-wbt-1.png'),
    }
  },
  watch: {
    currentIndex() {
      this.initExpand(this.currentIndex)
    },
  },
  mounted() {
    console.log('klkl', this.isShow)
    this.initExpand(this.currentIndex)
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
    initExpand(currentIndex) {
      let arr = currentIndex.split('_')
      if (arr.length == 2) {
        this.planeData[arr[0]].isSelected = true
        this.planeData[arr[0]].child[arr[1]].isSelected = true

        if (
          this.planeData[arr[0]].child[arr[1]].child &&
          this.planeData[arr[0]].child[arr[1]].child.length > 0
        ) {
          this.planeData[arr[0]].child[arr[1]].isSelected = !this.planeData[
            arr[0]
          ].child[arr[1]].isSelected
          this.currentImg = this.planeData[arr[0]].child[arr[1]].child[0].imgSrc
        } else {
          this.currentImg = this.planeData[arr[0]].child[arr[1]].imgSrc
        }
      } else if (arr.length == 3) {
        this.planeData[arr[0]].isSelected = true
        this.planeData[arr[0]].child[arr[1]].isSelected = true
        this.planeData[arr[0]].child[arr[1]].child[arr[2]].isSelected = true
        this.currentImg = this.planeData[arr[0]].child[arr[1]].child[
          arr[2]
        ].imgSrc
      }
    },
    checkClick_2(index_f) {
      if (!this.planeData[index_f].isSelected) {
        this.planeData.map((item) => {
          item.isSelected = false
        })
      }

      this.planeData[index_f].isSelected = !this.planeData[index_f].isSelected
    },
    listClick(item, index_f, index_c, index_c_c) {
      console.log('点击3层', index_f, index_c, index_c_c)
      if (index_c_c + 1) {
        this.currentIndex = index_f + '_' + index_c + '_' + index_c_c
        this.planeData[index_f].child[index_c].isSelected = true
      } else {
        this.currentIndex = index_f + '_' + index_c
        this.planeData[index_f].child[index_c].isSelected = !this.planeData[
          index_f
        ].child[index_c].isSelected
      }
      if (item.imgSrc) {
        this.currentImg = item.imgSrc
      } else {
        this.currentImg = item.child[0].imgSrc
      }
    },
    close() {
      this.currentIndex = ''
      this.planeData.map((item) => {
        item.isSelected = false
        if (item.child && item.child.length > 0) {
          item.child.map((value) => {
            value.isSelected = false
            if (value.child && value.child.length > 0) {
              value.child.map((value_child) => {
                value_child.isSelected = false
              })
            }
          })
        }
      })
      console.log(this.planeData)
      this.$emit('close')
      // mapBox.flyTo({
      //   center: [120.36452, 30.22505],
      //   zoom: 9.5,
      // })
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
  background: url('../../assets/img2/f-dialogs-box.png') no-repeat center;
  background-size: 100%;
  z-index: 999;
  .info-container {
    width: 1299px;
    height: 807px;
    // background: rgba(255, 0, 0, 0.288);
    margin-top: 15px;
    box-sizing: border-box;
    padding: 30px;
    .head {
      position: relative;
      width: 100%;
      height: 87px;
      .title {
        width: 395px;
        height: 100%;
        background: url('../../assets/img2/pop-title-bg.png') no-repeat center;
        background-size: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        .top-box {
          width: 100%;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          box-sizing: border-box;
          padding-left: 40px;
          img {
            width: 50px;
            height: 50px;
          }
          .text {
            font-family: SourceHanSansCN-Bold;
            font-size: 30px;
            font-weight: 900;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #f5fdff;
            margin-left: 20px;
            text-shadow: 0px 0px 7px rgba(52, 255, 204, 0.1);
            background: linear-gradient(180deg, #ffffff 26%, #63f7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .close {
        position: absolute;
        top: 0;
        right: 0px;
        width: 34px;
        height: 34px;
        background: url('../../assets/img2/-s-ic_guanbi.png');
        background-size: 100%;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 87px);
      box-sizing: border-box;
      display: flex;
      .part1 {
        height: 100%;
        flex: 3;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        box-sizing: border-box;
        padding-left: 30px;
        padding-right: 20px;
        .left {
          width: 100%;
          height: 90%;
          overflow: auto;
          box-sizing: border-box;
          padding-top: 20px;
          padding-left: 20px;
          .item {
            width: 100%;
            cursor: pointer;
            .father {
              height: 39px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              border-bottom: 1px solid rgba(21, 110, 157, 0.3);
              .down {
                width: 17px;
                height: 13px;
                margin-right: 8px;
              }
              .right {
                width: 13px;
                height: 17px;
                margin-right: 8px;
              }
              .title {
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
            }
            .child {
              .val {
                width: 100%;
                cursor: pointer;
                height: 39px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                box-sizing: border-box;
                padding-left: 41px;
                border-bottom: 1px solid rgba(21, 110, 157, 0.3);
                &:hover {
                  background: url('../../assets/img2/txt-s-bg1.png') no-repeat
                    left;
                  background-size: 100%;
                }
                .down {
                  width: 17px;
                  height: 13px;
                  margin-right: 8px;
                }
                .right {
                  width: 13px;
                  height: 17px;
                  margin-right: 8px;
                }
                .text {
                  font-family: MicrosoftYaHei;
                  font-size: 16px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
              .active {
                background: url('../../assets/img2/txt-s-bg1.png') no-repeat
                  left;
                background-size: 100%;
              }
              .child-child {
                .val-child {
                  width: 100%;
                  cursor: pointer;
                  height: 39px;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  box-sizing: border-box;
                  padding-left: 61px;
                  border-bottom: 1px solid rgba(21, 110, 157, 0.3);
                  &:hover {
                    background: url('../../assets/img2/txt-s-bg1.png') no-repeat
                      left;
                    background-size: 100%;
                  }
                  .text {
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                  }
                }
                .active {
                  background: url('../../assets/img2/txt-s-bg1.png') no-repeat
                    left;
                  background-size: 100%;
                }
              }
            }
          }
        }
      }
      .part2 {
        position: relative;
        height: 90%;
        flex: 5;
        background: url('../../assets/img2/hr-y.png') no-repeat left;
        background-size: auto 100%;
        box-sizing: border-box;
        padding: 20px;
        padding-left: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .plane-img {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>