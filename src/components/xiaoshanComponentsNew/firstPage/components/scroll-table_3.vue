<template>
  <div
    class="table-box"
    :style="{'font-size':fontSize?fontSize:'16px'}"
  >
    <div class="head">
      <span
        v-if="hasIndex"
        style="flex:0.5;justify-content: center;"
      >序号</span>
      <span
        v-for="(value, i) in tableColumns"
        :key="i"
        :style="{'flex':value.flex?value.flex:1}"
      >{{
        value.name
        }}</span>
      <span v-if="optionList && optionList.length > 0">操作</span>
    </div>
    <div class="body" @mouseleave="rowMouseLeave">
      <!-- :class-option="optionSingleHeight"  :data="tableData" -->
      <vue-seamless-scroll  class="auto-scorll-table" >
        <div
          :class="['row',index==currentIndex?'row_specal':'']"
          v-for="(item,index) in tableData"
          :key="`${index+1000}`"
          @click="rowClick(item,index)"
          @mouseenter="rowMouseEnter(item,index)"
        >
          <span
            v-if="hasIndex"
            style="flex:0.5; justify-content: center;"
          >{{index+1}}</span>
          <span
            v-for="(val, index_) in tableColumns"
            :key="`${index_+10000}`"
            :style="{'flex':val.flex?val.flex:1,color:item.color&&val.withColor?item.color:'#fff'}"
          >
            <slot v-if="val.withSlot" :name="val.props" :row="item"></slot>
            {{val.format?val.format(item):""}}
            {{val.withSlot||val.format?"":item[val.props]}}
          </span>
          <span
            class="btn-container"
            v-if="optionList && optionList.length > 0"
          >
            <button
              @click.stop="btnClick(item,val.name)"
              class="btn"
              v-for="(val, index__) in optionList"
              :key="`${index__+100000}`"
              :style="{background:`url(${val.bgImg}) no-repeat center`}"
            >
              <span :style="{'font-size':val.fontSize?val.fontSize:''}">
                {{ val.name }}
              </span>
            </button>
          </span>
        </div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
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
    logo: {
      type: String,
      default: '1',
    },
    isSpecal:{
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isAllSelect: false,
      selectArr: [],
      currentIndex:0
    }
  },
  watch: {
    logo() {
      this.tableData.map((item) => {
        item.isSelect = false
      })
    },
  },
  computed: {
      optionSingleHeight() {
        return {
          singleHeight: 39 // 这里要变成你的一行表格的高度 可以审查元素
        }
      }
    },
  mounted() {
    this.tableData.map((item) => {
      item.isSelect = false
    })
  },
  methods: {
    cutString(str, requireEllipsis = 10) {
      let newStr = ''
      if (str && str.length > 0 && requireEllipsis != 100) {
        if (this.tableColumns.length <= 3 && str.length > 8) {
          // console.log('---',str)
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
      this.$emit('btnClick', row, btnName)
    },
    rowClick(row,index) {
      console.log('5555',row)
      this.currentIndex = index
      this.$emit('table_row_click', row)
    },
    rowMouseEnter(row,index){
      this.$emit('table_row_mouseenter',row)
      this.currentIndex=index
    },
    rowMouseLeave(){
      this.$emit('table_row_mouseleave')
      // this.currentIndex=0
    }
  },
}
</script>

<style lang="less" scoped>
.table-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    width: 100%;
    height: 33px;
    display: flex;
    align-items: center;
    background: url('../../../../assets/img3/table-head.png') no-repeat center;
    background-size: 100% 100%;
    margin-bottom: 5px;
    span {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Alibaba-PuHuiTi-R;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #8292a8;
    }
  }
  .body {
    height: calc(100% - 38px);
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 0px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 0px;
      box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
      background: #00ffff33;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.2);
    }
    .auto-scorll-table{
      .row {
        display: flex;
        align-items: center;
        height: 37px;
        background: #214a8033;
        margin: 2px 0;
        &:hover {
          background: url(../../../../assets/img2/table-list-s.png) no-repeat;
          background-size: auto 100%;
        }
        span {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 17px;
          color: #ffffff;
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
      .row_specal {
        background: url(../../../../assets/img2/table-list-s.png) no-repeat;
        background-size: auto 100%;
      }
    }
    
  }
}
</style>