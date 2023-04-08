<template>
  <div class="poi-box" v-show="boxShow">
    <div class="search">
      <Input @topSearch="search" />
    </div>
    <div class="tab">
      <div class="item" :class="[isShow ? 'activeTab1' : '']" @click="tabChange(true)">按文物类型</div>
      <div class="item" :class="[isShow ? '' : 'activeTab2']" @click="tabChange(false)">按所在镇街</div>
    </div>
    <div class="select-tab">
      <div class="select-item" @click="selectTabClick('0')">全选</div>
      <div class="select-item" @click="selectTabClick('1')">反选</div>
    </div>
    <div class="check-box check-box-1" v-if="isShow">
      <div class="item sameStyle" v-for="(item, index) in tabData_1" :key="index" @click="checkClick_1(index)">
        <img v-show="item.isSelected" src="../../assets/img2/multiple-boxes.png" alt="" srcset="" width="16px" height="16px" />
        <img v-show="!item.isSelected" src="../../assets/img2/multiple-boxes-d.png" alt="" srcset="" width="16px" height="16px" />
        <span class="text">{{ item.name }}</span>
      </div>
    </div>
    <div class="check-box check-box-2" v-else>
      <div class="item" v-for="(item, index_f) in tabData_2" :key="index_f">
        <div class="father sameStyle" @click="checkClick_2(index_f)">
          <img v-show="item.isSelected" src="../../assets/img2/multiple-boxes.png" alt="" srcset="" width="16px" height="16px" />
          <img v-show="!item.isSelected" src="../../assets/img2/multiple-boxes-d.png" alt="" srcset="" width="16px" height="16px" />
          <span class="title">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="btn btn-1" @click="confirm"></div>
      <div class="btn btn-2" @click="close"></div>
    </div>
  </div>
</template>
<script>
import { wwlx, szzj } from '../../api/xsApi';
import { eventBus } from '@/main';
import Input from './input';
export default {
  props: {
    boxShow: {
      type: Boolean,
      default: false,
    },
  },
  components: { Input },
  data() {
    return {
      isShow: true,
      tabData_1: [],
      tabData_2: [],
      selectedData_category: [],
      selectedData_street: [],
    };
  },
  created() {
    eventBus.$on('data_back', (msg) => {
      this.resetTabData();
    });
  },
  mounted() {
    this.get_wwlx_data();
    this.get_szzj_data();
  },
  methods: {
    search(value) {
      eventBus.$emit('drawSimplePoi', value);
    },
    // 获取文物类型
    get_wwlx_data() {
      wwlx().then((res) => {
        // console.log('文物类型', res.data.data);
        res.data.data.map((item) => {
          let obj = {
            id: item.id,
            name: item.value,
            value: item.name,
            isSelected: true,
          };
          this.tabData_1.push(obj);
          this.selectedData_category.push(item.value);
        });
      });
    },
    // 获取所在镇街
    get_szzj_data() {
      szzj().then((res) => {
        // console.log('所在镇街', res.data.data);
        res.data.data.map((item) => {
          item.isSelected = false;
          this.selectedData_street.push(item.name);
          if (item.childs && item.childs.length > 0) {
            item.childs.map((val) => {
              val.isSelected = false;
            });
          }
        });
        this.tabData_2 = res.data.data;
      });
    },
    // 全选、反选
    selectTabClick(type) {
      if (type == '0') {
        // 全选
        if (this.isShow) {
          // 文物类型
          this.selectedData_category = [];
          this.tabData_1.map((item) => {
            item.isSelected = true;
            this.selectedData_category.push(item.name);
            return item;
          });
        } else {
          // 镇街
          this.selectedData_street = [];
          this.tabData_2.map((item) => {
            item.isSelected = true;
            this.selectedData_street.push(item.name);
            return item;
          });
        }
      } else if (type == '1') {
        // 反选
        if (this.isShow) {
          // 文物类型
          this.selectedData_category = [];
          this.tabData_1.map((item) => {
            item.isSelected = !item.isSelected;
            if (item.isSelected) {
              this.selectedData_category.push(item.name);
            }
            return item;
          });
        } else {
          // 镇街
          this.selectedData_street = [];
          this.tabData_2.map((item) => {
            item.isSelected = !item.isSelected;
            if (item.isSelected) {
              this.selectedData_street.push(item.name);
            }
            return item;
          });
        }
      }
    },
    tabChange(isShow) {
      // this.resetTabData()
      this.isShow = isShow;
    },
    checkClick_1(index) {
      this.tabData_1[index].isSelected = !this.tabData_1[index].isSelected;
      let name = this.tabData_1[index].name;
      if (this.tabData_1[index].isSelected) {
        this.selectedData_category.push(name);
      } else {
        let index = this.selectedData_category.indexOf(name);
        this.selectedData_category.splice(index, 1);
      }
    },
    checkClick_2(index_f) {
      this.tabData_2[index_f].isSelected = !this.tabData_2[index_f].isSelected;
      let name = this.tabData_2[index_f].name;
      if (this.tabData_2[index_f].isSelected) {
        this.selectedData_street.push(name);
      } else {
        let index = this.selectedData_street.indexOf(name);
        this.selectedData_street.splice(index, 1);
      }
    },
    resetTabData() {
      //   this.isShow = true
      this.selectedData_category = [];
      this.selectedData_street = [];
      this.tabData_1.map((item) => {
        item.isSelected = false;
      });
      this.tabData_2.map((item) => {
        item.isSelected = false;
        // if (item.childs && item.childs.length > 0) {
        //   item.childs.map((val) => {
        //     val.isSelected = false
        //   })
        // }
      });
    },
    confirm() {
      //   console.log(this.selectedData_street, this.selectedData_category);
      if (this.selectedData_street.length >= 1 || this.selectedData_category.length >= 1) {
        this.$store.commit('setMainMapDatas', {
          category: this.selectedData_category,
          street: this.selectedData_street,
        });
      } else {
        this.$message.warning('未选择任何筛选项');
      }
      this.close();
    },
    close() {
      // this.resetTabData()
      this.isShow = true;
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.poi-box {
  position: absolute;
  top: -4px;
  left: 45px;
  width: 314px;
  height: 362px;
  background: url('../../assets/img4/s-float-box.png') no-repeat center;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 10px 18px 20px 10px;
  user-select: none;
  .search {
    margin-top: 2px;
    margin-bottom: 10px;
    margin-left: 1px;
  }
  .tab {
    width: 100%;
    height: 29px;
    display: flex;
    justify-content: space-around;
    .item {
      width: 133px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-family: SourceHanSansCN-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #a2aacaea;
      background-color: #181c53dc;
      border: solid 1px #3a65a4;
    }
    .activeTab1 {
      background-color: #183771dc;
      border: solid 1px #8ed4f5;
      font-family: SourceHanSansCN-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      box-shadow: inset #3cdafd 0 0 10px;
    }
    .activeTab2 {
      background-color: #183771dc;
      border: solid 1px #8ed4f5;
      font-family: SourceHanSansCN-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      box-shadow: inset #3cdafd 0 0 10px;
    }
  }
  .select-tab {
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    .select-item {
      background: url('../../assets/img3/pull-down.png') no-repeat center;
      background-size: 100% 100%;
      margin-left: 15px;
      width: 50px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #feffff;
    }
  }
  .check-box {
    width: 271px;
    height: 170px;
    overflow: auto;
    box-sizing: border-box;
    margin: 10px 0 8px 15px;
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
        display: inline-block;
        width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      width: 90px;
      height: 30px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 0 10px;
    }
    .btn-1 {
      background: url('../../assets/img4/p-btn2.png') no-repeat center;
    }
    .btn-2 {
      background: url('../../assets/img4/p-btn3.png') no-repeat center;
    }
  }
}
</style>
