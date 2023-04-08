<template>
    <div
        class="poi-box"
        v-show="boxShow"
    >
        <div class="tab">
            <div
                class="item"
                :class="[isShow?'activeTab1':'']"
                @click="tabChange(true)"
            >按文物类型</div>
            <div
                class="item"
                :class="[isShow?'':'activeTab2']"
                @click="tabChange(false)"
            >按所在镇街</div>
        </div>
        <div
            class="check-box check-box-1"
            v-if="isShow"
        >
            <div
                class="item sameStyle"
                v-for="(item,index) in tabData_1"
                :key="index"
                @click="checkClick_1(index)"
            >
                <img
                    v-show="item.isSelected"
                    src="../../assets/img2/multiple-boxes.png"
                    alt=""
                    srcset=""
                    width="16px"
                    height="16px"
                >
                <img
                    v-show="!item.isSelected"
                    src="../../assets/img2/multiple-boxes-d.png"
                    alt=""
                    srcset=""
                    width="16px"
                    height="16px"
                >
                <span class="text">{{item.name}}</span>
            </div>
        </div>
        <div
            class="check-box check-box-2"
            v-else
        >
            <div
                class="item"
                v-for="(item,index_f) in tabData_2"
                :key="index_f"
            >
                <div
                    class="father sameStyle"
                    @click="checkClick_2(index_f)"
                >
                    <img
                        v-show="item.isSelected||item.childs.length<=0"
                        src="../../assets/img2/sub.png"
                        alt=""
                        srcset=""
                        width="16px"
                        height="16px"
                    >
                    <img
                        v-show="!item.isSelected&&item.childs.length>0"
                        src="../../assets/img2/add.png"
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
                >
                    <div
                        class="val sameStyle"
                        v-for="(val,index_c) in item.childs"
                        :key="index_c"
                        @click="checkClick_inner(item,val,index_f,index_c)"
                    >
                        <img
                            v-show="val.isSelected"
                            src="../../assets/img2/multiple-boxes.png"
                            alt=""
                            srcset=""
                            width="16px"
                            height="16px"
                        >
                        <img
                            v-show="!val.isSelected"
                            src="../../assets/img2/multiple-boxes-d.png"
                            alt=""
                            srcset=""
                            width="16px"
                            height="16px"
                        >
                        <span class="text">{{val.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div
                class="btn btn-1"
                @click="confirm"
            ></div>
            <div
                class="btn btn-2"
                @click="close"
            ></div>
        </div>
    </div>
</template>

<script>
import { wwlx, szzj } from '../../api/xsApi'

export default {
  props: {
    boxShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: true,
      tabData_1: [
        //   {
        //       id:'1',
        //       name:'古建筑',
        //       isSelected:false
        //   },
        //   {
        //       id:'2',
        //       name:'古墓葬',
        //       isSelected:false
        //   },
        //   {
        //       id:'3',
        //       name:'碑刻',
        //       isSelected:false
        //   },
        //   {
        //       id:'4',
        //       name:'近现代建筑 ',
        //       isSelected:false
        //   },
        //   {
        //       id:'5',
        //       name:'近现代史迹',
        //       isSelected:false
        //   },
      ],
      tabData_2: [
        //   {
        //       name:'城厢街道',
        //       isSelected:false,
        //       childs:[
        //           {
        //               id:'11',
        //               name:'陈公桥社区',
        //               isSelected:false
        //           },
        //           {
        //               id:'13',
        //               name:'xx社区',
        //               isSelected:false
        //           },
        //       ]
        //   },
        //   {
        //       name:'xx街道',
        //       isSelected:false,
        //       childs:[
        //           {
        //               id:'14',
        //               name:'xx社区',
        //               isSelected:false
        //           },
        //           {
        //               id:'15',
        //               name:'xx社区',
        //               isSelected:false
        //           },
        //       ]
        //   }
      ],
      selectedData: [],
    }
  },
  mounted() {
    this.get_wwlx_data()
    this.get_szzj_data()
  },
  methods: {
    // 获取文物类型
    get_wwlx_data() {
      wwlx().then((res) => {
        // console.log('文物类型', res.data.data)
        res.data.data.map((item) => {
          let obj = {
            id: item.id,
            name: item.value,
            value: item.name,
            isSelected: false,
          }
          this.tabData_1.push(obj)
        })
      })
    },
    // 获取所在镇街
    get_szzj_data() {
      szzj().then((res) => {
        res.data.data.map((item) => {
          item.isSelected = false
          if (item.childs && item.childs.length > 0) {
            item.childs.map((val) => {
              val.isSelected = false
            })
          }
        })
        this.tabData_2 = res.data.data
      })
    },
    tabChange(isShow) {
      this.resetTabData()
      this.isShow = isShow
    },
    checkClick_1(index) {
      this.resetTabData()
      this.tabData_1[index].isSelected = !this.tabData_1[index].isSelected

      let id = this.tabData_1[index].id

      if (this.tabData_1[index].isSelected) {
        this.selectedData.push(id)
      } else {
        let index = this.selectedData.indexOf(id)
        this.selectedData.splice(index, 1)
      }
    },
    checkClick_2(index_f) {
      this.tabData_2[index_f].isSelected = !this.tabData_2[index_f].isSelected
    },
    checkClick_inner(item, val, index_f, index_c) {
      this.selectedData = []
      this.tabData_2.map((item) => {
        if (item.childs && item.childs.length > 0) {
          item.childs.map((val) => {
            val.isSelected = false
          })
        }
      })
      this.tabData_2[index_f].childs[index_c].isSelected = !this.tabData_2[
        index_f
      ].childs[index_c].isSelected

      let id = val.id

      if (this.tabData_2[index_f].childs[index_c].isSelected) {
        this.selectedData.push(id)
      } else {
        let index = this.selectedData.indexOf(id)
        this.selectedData.splice(index, 1)
      }
      console.log('ssd', this.selectedData)
    },
    resetTabData() {
      //   this.isShow = true
      this.selectedData = []
      this.tabData_1.map((item) => {
        item.isSelected = false
      })

      this.tabData_2.map((item) => {
        item.isSelected = false
        if (item.childs && item.childs.length > 0) {
          item.childs.map((val) => {
            val.isSelected = false
          })
        }
      })
    },
    confirm() {
      console.log(this.selectedData)
      this.$emit('drawpoi', this.selectedData, this.ishow)
      this.close()
    },
    close() {
      this.resetTabData()
      this.isShow = true
      this.$emit('close')
    },
  },
}
</script>

<style lang="less" scoped>
.poi-box {
  position: absolute;
  top: 10px;
  left: 60px;
  width: 251px;
  height: 323px;
  background: url('../../assets/img2/p-box2.png') no-repeat center;
  background-position-y: -22px;
  box-sizing: border-box;
  padding: 2px;
  .tab {
    width: 100%;
    height: 38px;
    display: flex;
    .item {
      flex: 1;
      height: 100%;
      // background: rgb(0, 140, 255);
      // border: 1px solid rgb(6, 90, 199);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #feffff;
      opacity: 0.5;
      &:nth-child(1) {
        background: url('../../assets/img2/tab-n2.png') no-repeat center;
        // background-size: 100% 100%;
      }
      &:nth-child(2) {
        background: url('../../assets/img2/tab-n1.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
    .activeTab1 {
      background: url('../../assets/img2/tab-s1.png') no-repeat center !important;
      // background-size: 100% 100% !important;
      color: #feffff !important;
      opacity: 0.95 !important;
    }
    .activeTab2 {
      background: url('../../assets/img2/tab-s2.png') no-repeat center !important;
      // background-size: 100% 100% !important;
      color: #feffff !important;
      opacity: 0.95 !important;
    }
  }
  .check-box {
    width: 100%;
    height: calc(100% - 38px - 55px);
    overflow: auto;
    box-sizing: border-box;
    padding: 10px 15px;
    .sameStyle {
      border-bottom: 1px solid rgba(92, 194, 212, 0.3);
    }
  }
  .check-box-1 {
    .item {
      width: 100%;
      cursor: pointer;
      height: 32px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
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
  }

  .check-box-2 {
    .item {
      width: 100%;
      cursor: pointer;
      .father {
        height: 32px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
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
          height: 32px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          box-sizing: border-box;
          padding-left: 21px;
          img {
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
      }
    }
  }
  .bottom {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      width: 80px;
      height: 30px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 0 10px;
    }
    .btn-1 {
      background: url('../../assets/img2/sure-btn.png') no-repeat center;
    }
    .btn-2 {
      background: url('../../assets/img2/cancel-btn.png') no-repeat center;
    }
  }
}
</style>