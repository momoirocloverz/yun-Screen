<template>
  <div
    class="mask"
    v-show="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">{{ title }}列表</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <div class="table">
          <TableC
            :tableColumns="tableColumns"
            :tableData="tableData"
            :logo="logo"
            :isShowCheck="false"
          />
        </div>
        <div class="pagination">
          <el-pagination
            @current-change="pageNumChange"
            :page-size="10"
            :pager-count="7"
            layout="total,prev, pager, next"
            :total="tableData.length"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableC from '../../../mapPublicComponents/table'

export default {
  components: { TableC },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '隐患处置清单',
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableColumns: [
        {
          props: 'ww',
          name: '关联文物',
        },
        {
          props: 'productName',
          name: '产品名称',
        },
        {
          props: 'num',
          name: '数量',
          flex: 0.5,
        },
        {
          props: 'power',
          name: '功率',
        },
        {
          props: 'location',
          name: '摆放位置',
        },
        {
          props: 'belongMan',
          name: '所有人',
          flex: 0.6,
        },
        {
          props: 'buyTime',
          name: '购买时间',
          flex: 1.2,
        },
      ],
      logo: '1',
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
  },
  methods: {
    pageNumChange() {},
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
    margin-top: 35px;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 0;
    .head {
      position: relative;
      width: 100%;
      height: 127px;
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
            letter-spacing: 0px;
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
      height: calc(100% - 127px);
      box-sizing: border-box;
      padding-top: 8px;
      .table {
        width: 100%;
        height: calc(100% - 50px);
      }
      .pagination {
        text-align: center;
      }
    }
  }
}
</style>
