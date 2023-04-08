<template>
  <div
    class="box"
    :style="{ 'font-size': fontSize ? fontSize : '16px' }"
  >
    <div class="head">
      <div
        style="flex:0.5;"
        v-if="hasIndex"
      >序号</div>
      <div
        v-for="(item, index) in tableColumns"
        :key="index"
        :style="{ flex: item.flex ? item.flex : 1 }"
      >{{ item.name }}</div>
      <div v-if="optionList && optionList.length > 0">操作</div>
    </div>
    <div class="body">
      <div
        class="row"
        v-for="(item, index) in tableData"
        :key="index"
        @click="rowClick(item)"
      >
        <div
          style="flex:0.5;"
          v-if="hasIndex"
        >{{ index + 1 }}</div>
        <div
          v-for="(val, index) in tableColumns"
          :key="index"
          :style="{ flex: val.flex ? val.flex : 1,color:item.color&&val.withColor?item.color:'#51c0e9' }"
        >{{ cutString(item[val.props], val.requireEllipsis) }}</div>

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

        <div v-if="optionList && optionList.length == 1">
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
              {{ val.name?val.name:'' }}
            </span>
          </button>
        </div>
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
      default: true,
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
        newStr = str.substring(0, requireEllipsis + 1)
        if (str.length <= requireEllipsis) return newStr
        return newStr + '...'
      } else {
        return str
      }
    },
    btnClick(row, btnName) {
      console.log('000', row)
      this.$emit('BtnClick', row, btnName)
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
    height: 33px;
    display: flex;
    align-items: center;
    background: url('../../../assets/img2/p-list-tab.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 5px;
    div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: SourceHanSansCN-Bold;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 0;
      color: #a2c0d1;
    }
  }
  .body {
    // flex: 1;
    width: 100%;
    height: calc(100% - 33px);
    overflow: auto;
    .row {
      display: flex;
      height: 40px;
      // background: url(../../../assets/img2/tab-list.png) no-repeat;
      // background-size: 100%;
      border-bottom: 1px solid rgba(92, 194, 212, 0.3);
      margin: 1px 0;
      cursor: pointer;
      div {
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
        color: #51c0e9;
      }
      .btn {
        padding: 0;
        width: 66px;
        height: 24px;
        background: rgb(36, 131, 255);
        color: #fff;
        border: none;
        border-radius: 2px;
        background-size: 100% 100% !important;
        cursor: pointer;
        span {
          width: 100%;
          height: 100%;
          color: #fff;
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
