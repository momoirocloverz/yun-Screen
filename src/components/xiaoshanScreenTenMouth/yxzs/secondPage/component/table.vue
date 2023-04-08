<template>
  <div class="box-table" :style="{ 'font-size': fontSize ? fontSize : '16px' }">
    <div class="head">
      <div v-if="isShowCheck" class="check" @click="selectAll()">
        <img v-if="!isAllSelect" src="../../../../../assets/img2/multiple-boxes-d.png" alt="" srcset="" />
        <img v-else src="../../../../../assets/img2/multiple-boxes.png" alt="" srcset="" />
      </div>
      <span
        v-if="hasIndex"
        :style="{
          flex: '0.5',
          color: headTextColor ? headTextColor : '',
        }"
        >序号</span
      >
      <span
        v-for="(value, i) in tableColumns"
        :key="i"
        :style="{
          flex: value.flex ? value.flex : 1,
          color: headTextColor ? headTextColor : '',
        }"
        >{{ value.name }}</span
      >
      <span v-if="optionList && optionList.length > 0" :style="{ flex: optionList[0].flex ? optionList[0].flex : 1, color: headTextColor ? headTextColor : '' }">操作</span>
      <span v-if="hasOtherInfo" :style="{ flex: hasOtherInfo.flex }"></span>
    </div>
    <div class="body globalFireFoxScrollBar">
      <div :class="['row', isStripe ? 'row_stripe' : '', isSpecal ? 'row_specal' : '']" v-for="(item, index) in tableData" :key="item.id" @click="rowClick(item)">
        <!--  -->
        <div v-if="isShowCheck" class="check" @click="selectItem(item, index)">
          <img v-if="!item.isSelect" src="../../../../../assets/img2/multiple-boxes-d.png" alt="" srcset="" />
          <img v-else src="../../../../../assets/img2/multiple-boxes.png" alt="" srcset="" />
        </div>

        <span
          v-if="hasIndex"
          :style="{
            flex: '0.5',
            'font-size': rowFontSize ? rowFontSize : '16px',
            color: rowTextColor ? rowTextColor : '',
          }"
          >{{ index + 1 }}</span
        >
        <span
          v-for="(val, index_) in tableColumns"
          :key="index_"
          class="outerFlex"
          :style="{
            flex: val.flex ? val.flex : 1,
            color: item.color && val.withColor ? item.color : '#fff',
            'font-size': rowFontSize ? rowFontSize : '16px',
            color: rowTextColor ? rowTextColor : '',
          }"
        >
          <slot v-if="val.withSlot" :name="val.props" :row="item"></slot>
          <i class="ellSelf" :title="val.withSlot || val.format ? '' : item[val.props]">
            {{ val.format ? val.format(item) : '' }}
            {{ val.withSlot || val.format ? '' : item[val.props] }}
          </i>
        </span>
        <span class="btn-container" v-if="optionList && optionList.length > 0" :style="{ flex: optionList[0].flex ? optionList[0].flex : 1 }">
          <button @click.stop="btnClick(item, val.name)" class="btn" v-for="(val, index__) in optionList" :key="index__" :style="{ background: `url(${val.bgImg}) no-repeat center` }">
            <span :style="{ 'font-size': val.fontSize ? val.fontSize : '', color: rowTextColor ? rowTextColor : '' }" >
              {{ val.name }}
            </span>
          </button>
        </span>
        <span v-if="hasOtherInfo" :style="{ flex: hasOtherInfo.flex }">
          <slot name="otherInfo" :row="item"></slot>
        </span>
      </div>

      <div class="emptyHolder" v-if="!tableData.length">暂无数据</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
      default: () => [],
    },
    tableColumns: {
      type: Array,
      required: true,
      default: () => [],
    },
    optionList: {
      type: Array,
      default: () => [],
    },
    hasOtherInfo: {
      type: Object,
      default: () => {},
    },
    hasIndex: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: String,
      default: '14px',
    },
    logo: {
      type: String,
      default: '1',
    },
    isShowCheck: {
      type: Boolean,
      default: false,
    },
    isSpecal: {
      type: Boolean,
      default: false,
    },
    isStripe: {
      //决定表格体是否为条纹样式
      type: Boolean,
      default: false,
    },
    headTextColor: String,
    rowFontSize: String,
    rowTextColor: String,
  },
  data() {
    return {
      isAllSelect: false,
      selectArr: [],
    };
  },
  watch: {
    logo() {
      this.tableData.map((item) => {
        item.isSelect = false;
      });
    },
  },
  computed: {},
  mounted() {
    this.tableData.map((item) => {
      item.isSelect = false;
    });
  },
  methods: {
    cutString(str, requireEllipsis = 10) {
      let newStr = '';
      if (str && str.length > 0 && requireEllipsis != 100) {
        if (this.tableColumns.length <= 3 && str.length > 8) {
          // console.log('---',str)
          newStr = str.substring(0, requireEllipsis);
          return newStr + '...';
        } else {
          if (this.tableColumns.length > 3 && str.length > 4) {
            newStr = str.substring(0, 4);
            return newStr + '...';
          } else {
            return str;
          }
        }
      } else {
        return str;
      }
    },
    selectAll() {
      if (!this.isAllSelect) {
        this.isAllSelect = true;
        this.tableData.map((item) => {
          item.isSelect = true;
          this.selectArr = [];
          this.selectArr = [...this.tableData];
        });
      } else {
        this.isAllSelect = false;
        this.tableData.map((item) => {
          item.isSelect = false;
          this.selectArr = [];
        });
      }
      console.log('勾选', this.selectArr);
      this.$emit('selectChange', this.selectArr);
    },
    selectItem(item, index) {
      console.log('索引', index);
      let obj;
      if (this.tableData[index].isSelect) {
        obj = { ...item, isSelect: false };
      } else {
        obj = { ...item, isSelect: true };
      }
      Vue.set(this.tableData, index, obj);
      this.selectArr = this.tableData.filter((item) => item.isSelect === true);
      console.log('勾选', this.selectArr);
      if (this.selectArr.length == this.tableData.length) {
        this.isAllSelect = true;
      } else {
        this.isAllSelect = false;
      }
      this.$emit('selectChange', this.selectArr);
    },
    btnClick(row, btnName) {
      this.$emit('btnClick', row, btnName);
    },
    rowClick(row) {
    //   this.$emit('table_row_click', row);
    },
  },
};
</script>

<style lang="less" scoped>
.box-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    background: url('../../../../../assets/img4/list-t.png') no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-left: 30px;
    .check {
      img {
        width: 16px;
        height: 16px;
        margin-left: 15px;
        cursor: pointer;
      }
    }

    span {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      font-family: SourceHanSansCN-Medium;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #6bd0ff;
    }
  }
  .body {
    height: calc(100% - 43px);
    overflow: auto;
    .row {
      display: flex;
      align-items: center;
      white-space: nowrap;
      height: 32px;
      background: url('../../../../../assets/img4/list-txt-bg.png') no-repeat;
      background-size: 100% 100%;
      margin: 2px 0;
      box-sizing: border-box;
      padding-left: 30px;
      // &:hover {
      //   background: url(../../assets/img2/table-list-s.png) no-repeat;
      //   background-size: 100% 100%;
      // }
      .check {
        img {
          width: 16px;
          height: 16px;
          margin-left: 15px;
          cursor: pointer;
        }
      }

      span {
        word-break: break-all;
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 17px;
        color: #ffffff;
      }
      .ellSelf {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-style: normal;
        // flex: 1;
      }
      .btn-container {
        display: flex;
        justify-content: flex-start;
        box-sizing: border-box;
        padding-left: 5px;
        .btn {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 70px;
          height: 30px;
          background: rgb(36, 131, 255);
          color: #fff;
          border: none;
          border-radius: 2px;
          margin-right: 5px;
          cursor: pointer;
          span {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
      }
    }
    .row-yellow {
      background: url(../../../../../assets/img2/y-seleted.png) no-repeat;
      background-size: 100% 100%;
    }
    .row-red {
      background: url(../../../../../assets/img2/r-seleted.png) no-repeat;
      background-size: 100% 100%;
    }
    .row_specal {
      background: none;
      border-bottom: 1px solid rgba(21, 110, 157, 0.3);
      &:hover {
        background: linear-gradient(to right, #00ccff94 1%, rgba(0, 0, 0, 0) 90%);
      }
    }
    .row_stripe {
      &:nth-child(2n-1) {
        background: none;
      }
      &:nth-child(2n) {
        background: rgba(28, 149, 252, 0.13);
      }
    }
  }
}
.outerFlex {
  min-width: 0;
}
.emptyHolder {
  margin-top: 100px;
  text-align: center;
  color: rgb(228, 240, 255);
}
</style>
