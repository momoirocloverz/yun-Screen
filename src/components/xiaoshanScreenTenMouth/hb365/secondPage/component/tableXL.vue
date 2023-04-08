<template>
  <div class="box-table" :style="{ 'font-size': fontSize ? fontSize : '16px' }">
    <div class="head">
      <span
        v-if="hasIndex"
        :style="{
          flex: '0.5',
          color: headTextColor ? headTextColor : ''
        }"
        >序号</span
      >
      <span
        v-for="(value, i) in tableColumns"
        :key="i"
        :style="{
          flex: value.flex ? value.flex : 1,
          color: headTextColor ? headTextColor : ''
        }"
        >{{ value.name }}</span
      >
      <span
        :style="{
          color: headTextColor ? headTextColor : ''
        }"
        >操作</span
      >
    </div>
    <div class="body">
      <div
        class="row"
        v-for="(item, index) in tableData"
        :key="item.id"
        @click="rowClick(item)"
      >
        <div class="row1">
          <span
            v-if="hasIndex"
            :style="{
              flex: '0.5',
              'font-size': rowFontSize ? rowFontSize : '16px',
              color: rowTextColor ? rowTextColor : ''
            }"
            >{{ index + 1 }}</span
          >
          <span
            v-for="(val, index_) in tableColumns"
            :key="index_"
            :style="{
              flex: val.flex ? val.flex : 1,
              color: item.color && val.withColor ? item.color : '#fff',
              'font-size': rowFontSize ? rowFontSize : '16px',
              color: rowTextColor ? rowTextColor : ''
            }"
          >
            <slot v-if="val.withSlot" :name="val.props" :row="item"></slot>
            {{ val.format ? val.format(item) : "" }}
            {{ val.withSlot || val.format ? "" : item[val.props] }}
          </span>
          <span class="btn-container">
            <div @click.stop="btnClick(item, index)" class="btn">
              <span>详情</span>
              <img
                :class="[index == currentIndex ? 'open' : '']"
                src="../../../../../assets/img4/arrow.png"
                alt=""
                srcset=""
              />
            </div>
          </span>
        </div>
        <div class="row2" v-show="index == currentIndex">
          <div class="item" v-for="(val, i) in item.detail" :key="i">
            <div class="title">巡检事件0{{ i + 1 }}</div>
            <div class="row-1">
              <div class="col">巡检时间：{{ val.time }}</div>
              <div class="col">巡检内容：日常巡检</div>
              <div class="col">完成情况：已完成</div>
            </div>
            <div class="row-2">
              <span>巡检照片：</span>
              <div class="img-box">
                <img :src="val.img" alt="" srcset="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    tableColumns: {
      type: Array,
      required: true,
      default: () => []
    },
    hasOtherInfo: {
      type: Object,
      default: () => {}
    },
    hasIndex: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: String,
      default: "14px"
    },
    logo: {
      type: String,
      default: "1"
    },
    isSpecal: {
      type: Boolean,
      default: false
    },
    isStripe: {
      //决定表格体是否为条纹样式
      type: Boolean,
      default: false
    },
    headTextColor: String,
    rowFontSize: String,
    rowTextColor: String
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  watch: {},
  computed: {},
  mounted() {},
  methods: {
    btnClick(row, index) {
      if (this.currentIndex == index) {
        this.currentIndex = -1;
      } else {
        this.currentIndex = index;
      }
    },
    rowClick(row) {
      //   this.$emit('table_row_click', row)
    }
  }
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
    background: url("../../../../../assets/img4/list-t.png") no-repeat;
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
      // display: flex;
      // align-items: center;
      // height: 32px;
      // background: url("../../../../../assets/img4/list-txt-bg.png") no-repeat;
      // background-size: 100% 100%;
      margin: 2px 0;
      box-sizing: border-box;

      .row1 {
        display: flex;
        align-items: center;
        height: 32px;
        background: url("../../../../../assets/img4/list-txt-bg.png") no-repeat;
        background-size: 100% 100%;
        padding-left: 30px;
        span {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 17px;
          color: #ffffff;
        }
        .btn-container {
          flex: 1;
          display: flex;
          justify-content: flex-start;
          box-sizing: border-box;
          .btn {
            width: 63px;
            height: 21px;
            background: #34478c;
            border: 1px solid #8ba4fe;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 5;
            span {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #aec0ff;
              margin-right: 2px;
              flex: none;
            }
            img {
              width: 11px;
              height: 6px;
              transform: rotateZ(-90deg);
            }
            .open {
              transform: rotateZ(0deg);
            }
          }
        }
      }
      .row2 {
        min-height: 180px;
        max-height: 360px;
        overflow: auto;
        box-sizing: border-box;
        border-left: #2a3660 1px solid;
        border-right: #2a3660 1px solid;
        background: #0f1833;
        .item {
          padding: 10px 20px 0 20px;
          box-sizing: border-box;
          width: 100%;
          height: 180px;
          border-bottom: #2a3660 1px solid;
          .title {
            width: 100%;
            height: 27px;
            box-sizing: border-box;
            padding-left: 10px;
            border-left: #608ffc 4px solid;
            background: linear-gradient(
              to left,
              #5e8dfc00,
              #5e8dfc28,
              #497ffca1
            );
            display: flex;
            align-items: center;
            font-family: SourceHanSansCN-Bold;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #cedcf4;
          }
          .row-1 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 15px 0;
            .col {
              font-family: SourceHanSansCN-Medium;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #cedcf4;
            }
          }
          .row-2 {
            height: 82px;
            width: 100%;
            display: flex;
            align-items: center;
            span {
              font-family: SourceHanSansCN-Medium;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #cedcf4;
            }
            .img-box {
              flex: 1;
              height: 100%;
              display: flex;
              img {
                width: 154px;
                height: 100%;
                border: 1px solid #2b68e1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
