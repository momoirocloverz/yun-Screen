<template>
  <div
    class="box"
    :style="{'font-size':fontSize?fontSize:'16px'}"
  >
    <div class="head">
      <div
        v-if="isShowCheck"
        class="check"
        @click="selectAll()"
      >
        <img
          v-if="!isAllSelect"
          src="../../../../../assets/img2/multiple-boxes-d.png"
          alt=""
          srcset=""
        >
        <img
          v-else
          src="../../../../../assets/img2/multiple-boxes.png"
          alt=""
          srcset=""
        >
      </div>
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
      <span style="flex:0.6;">操作</span>
    </div>
    <div class="body">
      <div
        class="itemRow"
        v-for="(item,index) in tableData"
        :key="item.id"
      >
        <div :class="['row',isSpecal?'row_specal':'']" @click="rowClick(item)">
          <div
            v-if="isShowCheck"
            class="check"
            @click="selectItem(item,index)"
          >
            <img
              v-if="!item.isSelect"
              src="../../../../../assets/img2/multiple-boxes-d.png"
              alt=""
              srcset=""
            >
            <img
              v-else
              src="../../../../../assets/img2/multiple-boxes.png"
              alt=""
              srcset=""
            >
          </div>
          <span
            v-if="hasIndex"
            style="flex:0.5; justify-content: center;"
          >{{index+1}}</span>
          <span
            v-for="(val, index_) in tableColumns"
            :key="index_"
            :style="{'flex':val.flex?val.flex:1,color:item.color&&val.withColor?item.color:'#fff'}"
          >
            <slot v-if="val.withSlot" :name="val.props" :row="item"></slot>
            {{val.format?val.format(item):""}}
            {{val.withSlot||val.format?"":item[val.props]|cutString}}
          </span>
          <span
            class="btn-container"
            @click.stop="btnClick(item)"
          >
            <!-- <button
              @click.stop="btnClick(item,val.name)"
              class="btn"
              v-for="(val, index__) in optionList"
              :key="index__"
              :style="{background:`url(${val.bgImg}) no-repeat center`}"
            >
              <span :style="{'font-size':val.fontSize?val.fontSize:''}">
                {{ val.name }}
              </span>
            </button> -->
            详情
              <i
                v-if="currentId == item.id"
                class="el-icon-arrow-down"
              ></i>
              <i
                v-else
                class="el-icon-arrow-up"
              ></i>
          </span>
        </div>
        <div v-show="currentId == item.id" class="detail">
          <div class="left">
            <div class="img-title">
              <img
                src="../../../../../assets/img3/pot_ywtg.png"
                alt=""
                srcset=""
              >
              <span>现场照片</span>
            </div>
            <div class="img-box">
              <div class="img-item" v-for="(item,index) in imgList" :key="index">
                <img :src="item" alt="" srcset="">
              </div>
            </div>
          </div>
          <div class="right">
            <div class="img-title">
              <img
                src="../../../../../assets/img3/pot_ywtg.png"
                alt=""
                srcset=""
              >
              <span>电器维保日志</span>
            </div>
            <div class="table-x">
              <div class="head-x">
                <span style="flex:0.3"></span>
                <span>时间</span>
                <span style="flex:1.5">内容</span>
                <span>类型</span>
              </div>
              <div class="t-body">
                <div class="t-row" v-for="(item,index) in tableList_X" :key="index">
                  <span style="flex:0.3"></span>
                  <span>{{item.checkTime&&item.checkTime.split(' ')[0]}}</span>
                  <span style="flex:1.5">{{item.context}}</span>
                  <span>{{item.eventCategory}}</span>
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
import Vue from 'vue'
import { czj_Detail } from '../../../../../api/xsApi2'
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
    logo: {
      type: String,
      default: '1',
    },
    isShowCheck: {
      type: Boolean,
      default: true,
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
      currentId:'',// 选中row的id
      imgList:[] ,// 现场图片
      tableList_X:[],// 设施维保日志
    }
  },
  watch: {
    logo() {
      this.tableData.map((item) => {
        item.isSelect = false
      })
    },
  },
  computed: {},
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
    selectAll() {
      if (!this.isAllSelect) {
        this.isAllSelect = true
        this.tableData.map((item) => {
          item.isSelect = true
          this.selectArr = []
          this.selectArr = [...this.tableData]
        })
      } else {
        this.isAllSelect = false
        this.tableData.map((item) => {
          item.isSelect = false
          this.selectArr = []
        })
      }
      console.log('勾选', this.selectArr)
      this.$emit('selectChange', this.selectArr)
    },
    selectItem(item, index) {
      console.log('索引', index)
      let obj
      if (this.tableData[index].isSelect) {
        obj = { ...item, isSelect: false }
      } else {
        obj = { ...item, isSelect: true }
      }
      Vue.set(this.tableData, index, obj)
      this.selectArr = this.tableData.filter((item) => item.isSelect === true)
      console.log('勾选', this.selectArr)
      if (this.selectArr.length == this.tableData.length) {
        this.isAllSelect = true
      } else {
        this.isAllSelect = false
      }
      this.$emit('selectChange', this.selectArr)
    },
    btnClick(item) {
      if (this.currentId == item.id) {
        this.currentId = ''
      } else {
        this.tableList_X = []
        this.imgList=[]
        czj_Detail(item.id).then(res=>{
          console.log('维保日志',res.data.data)
          let resImg
          if(res.data.data.overallaFile&&res.data.data.parameterFile){
            resImg = res.data.data.overallaFile.concat(res.data.data.parameterFile).map(item=>item.path)
          }else if(res.data.data.overallaFile&&!res.data.data.parameterFile){
            resImg = res.data.data.overallaFile.map(item=>item.path)
          }else if(!res.data.data.overallaFile&&res.data.data.parameterFile){
            resImg = res.data.data.parameterFile.map(item=>item.path)
          }
          
          this.imgList=resImg&&resImg.length>0&&resImg.map(item=>{
            if(item){
              return 'http://223.65.209.139:18180/admin/cmd/v1/storage/view/'+ item
            }
          })

          this.tableList_X = res.data.data.kitchenEquipmentLogBookList
        })
        this.currentId = item.id
      }
    },
    rowClick(row) {
      //   this.$emit('table_row_click', row)
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background: url('../../../../../assets/img2/table-head-s.png') no-repeat;
    background-size: 100% 100%;
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
    .itemRow {
      width: 100%;
      min-height: 40px;
      .row{
        display: flex;
        align-items: center;
        height: 40px;
        background: url(../../../../../assets/img2/table-list-line.png) no-repeat;
        background-size: 100% 100%;
        margin: 2px 0;
        // &:hover {
        //   background: url(../../../../../assets/img2/table-list-s.png) no-repeat;
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
          flex: 0.6;
          width: 55px;
          height: 29px;
          background: url('../../../../../assets/img3/pull-down.png') no-repeat center;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #51c0e9;
          cursor: pointer;
          i {
            margin-left: 3px;
          }
        }
      }
      .row_specal {
        background:none;
        border-bottom: 1px solid rgba(21,110,157,0.3);
        &:hover {
          background: linear-gradient(
              to right,
              #00ccff94 1%,
              rgba(0, 0, 0, 0) 90%
            );
        }
      }
      .detail{
        width: 100%;
        height: 259px;
        background: rgba(36, 142, 203, .1);
        display: flex;
        .left{
          width: 50%;
          height: 100%;
          box-sizing: border-box;
          padding-left: 10px;
          .img-title {
            display: flex;
            align-items: center;
            position: relative;
            left: -15px;
            img {
              width: 53px;
              height: 53px;
            }
            span {
              font-family: MicrosoftYaHei-Bold;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #84e1ff;
            }
          }
          .img-box{
            width: 100%;
            height: 175px;
            display: flex;
            align-items: center;
            .img-item{
              width: 189px;
              height: 174px;
              background: url('../../../../../assets/img3/img-box.png') no-repeat center;
              background-size: 100% 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-left: 10px;
              img{
                width: 171px;
                height: 152px;
              }
            }
          }
        }
        .right{
          width: 50%;
          height: 100%;
          .img-title {
            display: flex;
            align-items: center;
            position: relative;
            left: -15px;
            img {
              width: 53px;
              height: 53px;
            }
            span {
              font-family: MicrosoftYaHei-Bold;
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #84e1ff;
            }
          }
          .table-x{
            width: 90%;
            margin-left: 5%;
            height:210px;
            .head-x{
              width: 100%;
              height: 35px;
              display: flex;
              align-items: center;
              span{
                flex: 1;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #a3e2ff;
              }
            }
            .t-body{
              width: 100%;
              height:calc(100% - 35px);
              overflow: auto;
              .t-row{
                width: 100%;
                height: 35px;
                display: flex;
                align-items: center;
                span{
                  flex: 1;
                  font-family: MicrosoftYaHei;
                  font-size: 16px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
                &:nth-of-type(2n-1){
                  background: #0f3c6f;
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