<template>
  <div
    class="box"
    :style="{ 'font-size': fontSize ? fontSize : '16px' }"
  >
    <div class="head">
      <span
        v-if="hasIndex"
        style="flex:0.3;"
      >序号</span>
      <span
        v-for="(item, index) in tableColumns"
        :key="index"
        :style="{ flex: item.flex ? item.flex : 1 }"
      >{{ item.name }}</span>
      <span v-if="optionList && optionList.length > 0">操作</span>
    </div>
    <div class="body">
      <div
        class="row"
        v-for="(item, index) in tableData"
        :key="item.id"
        @click="rowClick(item)"
      >
        <span
          v-if="hasIndex"
          style="flex:0.3;"
        >{{ index + 1 }}</span>
        <span
          v-for="(val, index) in tableColumns"
          :key="index"
          :style="{ flex: val.flex ? val.flex : 1 }"
        >{{ cutString(item[val.props], val.requireEllipsis) }}</span>

        <span v-if="optionList && optionList.length > 1">
          <button
            @click.stop="btnClick(item, val.name)"
            class="btn"
            v-for="(val, index) in optionList"
            :key="index"
            :style="{
              background: `url(${val.bgImg})`,
              width: val.btnWidth,
              height: val.btnHeight
            }"
            v-show="item.btnName.indexOf(val.name) >= 0"
          >
            <span>
              <!-- {{ val.name }} -->
            </span>
          </button>
        </span>

        <span v-if="optionList && optionList.length == 1">
          <button
            @click.stop="btnClick(item, val.name)"
            class="btn"
            v-for="(val, index) in optionList"
            :key="index"
            :style="{
              background: `url(${val.bgImg})`,
              width: val.btnWidth,
              height: val.btnHeight
            }"
          >
            <span>
              <!-- {{ val.name }} -->
            </span>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
let vueApp = null
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
    hasIndex: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: String,
      default: '16px',
    },
  },
  beforeCreate() {
    vueApp = this
  },
  computed: {},
  methods: {
    cutString(str, requireEllipsis = 10) {
      let newStr = ''
      if (str && str.length > 0 && requireEllipsis != 100) {
        if (this.tableColumns.length <= 3 && str.length > 8) {
          console.log('---', str)
          newStr = str.substring(0, requireEllipsis)
          return newStr + '...'
        } else {
          if (this.tableColumns.length > 3 && str.length > 4) {
            newStr = str.substring(0, 4)
            return newStr + '...'
          } else {
            return str
          }
        }
      } else {
        return str
      }
    },
    btnClick(row, btnName) {
      console.log('000', row)
      this.$emit('BtnClick', row, btnName)
      this.$emit('historyBtn', row, btnName)
      if (btnName === '详情') {
        this.$emit('detail_gctj', row)
      }
    },
    rowClick(row) {
      this.$emit('table_row_click', row)
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  margin: 0 1%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    width: 100%;
    height: 38px;
    display: flex;
    align-items: center;
    background: url('../../../assets/img2/tab-list-h.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 5px;
    span {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: SourceHanSansCN-Bold;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 7px;
      color: #95c2eb;
    }
  }
  .body {
    // flex: 1;
    width:100%;
    height: calc(100% - 40px);
    overflow: auto;
    .row {
      display: flex;
      height: 37px;
      background: url(../../../assets/img2/tab-list.png) no-repeat;
      background-size: 100%;
      // margin: 2px 0;
      // &:hover {
      //   background: url(../../../../static/images/list-selected.png) no-repeat;
      // }
      span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: SourceHanSansCN-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 32px;
        letter-spacing: 0px;
        color: #95c2eb;
      }
      .btn {
        padding: 0;
        width: 66px;
        height: 24px;
        background: rgb(36, 131, 255);
        color: #fff;
        border: none;
        border-radius: 2px;
        cursor: pointer;
        span {
          width: 100%;
          height: 100%;
          // margin-left: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
