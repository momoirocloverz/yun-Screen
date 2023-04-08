<template>
  <div
    class="mask"
    v-show="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">活化利用</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="search-box">
        <span>文物名称:</span>
        <el-select
          clearable
          v-model="pointId"
          filterable
          size="mini"
          placeholder="文物"
          :style="{width:`${300/192}rem !important`}"
        >
          <el-option
            v-for="item in bumpPointList"
            :key="item.id"
            :label="item.publishName"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <div
          class="search-btn"
          @click="search"
        ></div>
      </div>
      <div class="body">
        <div class="hhly-box" v-for="(item_2,index_2) in pointInfoList" :key="item_2.id">
          <div class="title">
            <div class="img-title">
              <img
                src="../../../../assets/img3/pot_ywtg.png"
                alt=""
                srcset=""
              >
              <span>{{item_2.projectName}}</span>
            </div>
            <div class="btn" @click="btnClick_2(item_2,index_2)" >
              {{currentId_2 == index_2?'关闭':'展开'}}
              <i
                v-if="currentId_2 == index_2"
                class="el-icon-arrow-down"
              ></i>
              <i
                v-else
                class="el-icon-arrow-right"
              ></i>
            </div>
          </div>
          <div class="item-box" v-show="currentId_2 == index_2">
            <div class="item" v-for="(item,index) in item_2.bumpPointActivationUtilizationList" :key="item.id">
              <div class="info">
                <div class="col">
                  <img src="../../../../assets/img3/d-icon.png" alt="" srcset="">
                  <span>{{item.contentDescription}}</span>
                </div>
                <div class="btn" @click="btnClick(item,index)" >
                  查看详情
                  <i
                    v-if="currentId == index&&item.tableDataActivationUtilization.length>0"
                    class="el-icon-arrow-down"
                  ></i>
                  <i
                    v-else
                    class="el-icon-arrow-right"
                  ></i>
                </div>
              </div>
              <div class="img-box" v-show="currentId == index&&item.tableDataActivationUtilization.length>0">
                <!-- <img v-for="val in item.tableDataActivationUtilization" :key="val.id" :src="`http://223.65.209.139:18180/admin/cmd/v1/storage/view/${val.path}`" alt="" srcset=""> -->
                <vue-viewer
                  v-for="val in item.tableDataActivationUtilization"
                  :key="val.id"
                  multiple
                  class="imgShow"
                  list-ul-class="image-list"
                  :thumb="`http://223.65.209.139:18180/admin/cmd/v1/storage/view/${val.path}`"
                  :full="`http://223.65.209.139:18180/admin/cmd/v1/storage/view/${val.path}`"
                />
              
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { wbd_list2 } from '../../../../api/xsApi.js'
import {get_hhly_info} from '../../../../api/xsApi2'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    pointId:{
      type:String,
      required:true
    },
    logo: String,
  },
  data() {
    return {
      currentId: '', // 某个文物点的当前列表的id
      currentId_2:'', // 所有文物点层面数据的当前id
      currentName:'',
      bumpPointList: [], // 文物列表
      pointInfoList:[],// 文物点活化利用的数据

      // 分页
      currentPage: 1,
      pageSize: 5,
      total: 0,

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

    this.getBumpPointList()
  },
  watch: {
    isShow(val) {
      if(!val) return 
      this.getDetailInfo(this.pointId)
      console.log('bumpPointList',this.bumpPointList)
      // this.bumpPointList.map(item=>{
      //   if(item.id == this.pointId){
      //     this.currentName = item.publishName
      //   }
      // })
    },
  },
  filters: {
  },
  methods: {
    search() {
      console.log('搜索的参数', this.searchParams)
      this.getDetailInfo(this.pointId)
      // this.bumpPointList.map(item=>{
      //   if(item.id == this.pointId){
      //     this.currentName = item.publishName
      //   }
      // })
    },
    btnClick(item,index) {
      if(item.tableDataActivationUtilization.length<=0){
        this.$message.warning('暂无图片信息！')
      }
      if (this.currentId == index) {
        this.currentId = -1
      } else {
        // this.get_ywtg_detail(item.id)
        this.currentId = index
      }
    },
    btnClick_2(item,index){
      if (this.currentId_2 == index) {
        this.currentId_2 = -1
      } else {
        this.currentId_2 = index
      }
    },
    close() {
      this.$emit('close')
    },
    // 根据文物id获取详情
    getDetailInfo(id){
      get_hhly_info(id).then(res=>{
        console.log('活化利用',res.data.data)
        if(res.data.data.length<=0){
          this.$message.warning('此文保点暂无信息！')
          this.pointInfoList = []
        }else{
          this.pointInfoList = res.data.data
        }
      })
    },
    // 获取文保点列表
    getBumpPointList() {
        if( this.$store.state.hugeListData&&this.$store.state.hugeListData.length){
            this.bumpPointList = this.$store.state.hugeListData
        }else{
            let params = {
        currentPage: 1,
        pageSize: 600,
      }
      wbd_list2(params).then((res) => {
        // console.log('lol', res.data)
        this.bumpPointList = res.data.data.list
      })
        }    
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
  z-index: 1000;
  .info-container {
    width: 1299px;
    height: 807px;
    margin-top: 15px;
    box-sizing: border-box;
    padding: 30px;
    padding-top: 0;
    .head {
      position: relative;
      width: 100%;
      height: 110px;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding-left: 50px;
      .title {
        width: 1186px;
        height: 89px;
        background: url('../../../../assets/img2/pop-s-title.png') no-repeat center;
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
            letter-spacing: 5px;
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
    .search-box {
      width: calc(100% - 20px);
      height: 60px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      margin-left: 10px;
      margin-bottom: 40px;
      span {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #f5fdff;
        margin: 0 10px;
      }
      .search-btn {
        width: 80px;
        height: 30px;
        background: url('../../../../assets/img3/search-btn.png') no-repeat center;
        background-size: 100% 100%;
        margin-left: 10px;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 187px);
      box-sizing: border-box;
      padding: 0 20px 0 20px;
      overflow: auto;
      .hhly-box{
        width: 100%;
        min-height: 55px;
        background: rgba(35, 138, 199, .2);
        margin-bottom: 20px;
        .title{
          width: 100%;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .img-title {
            display: flex;
            align-items: center;
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
          .btn {
            width: 65px;
            height: 29px;
            background: url('../../../../assets/img3/pull-down.png') no-repeat center;
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
            margin-right: 20px;
            cursor: pointer;
            i {
              margin-left: 3px;
            }
          }
        }
        .item-box{
          width: 100%;
          min-height: 50px;
          max-height: 400px;
          .item{
            width: 100%;
            min-height: 50px;
            padding: 0 20px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(92, 194, 212, 0.3);
            .info{
              width:100%;
              height: 50px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .col{
                span{
                  font-family: SourceHanSansCN-Medium;
                  font-size: 14px;
                  font-weight: normal;
                  letter-spacing: 1px;
                  color: #ffffff;
                }
              }
              .btn {
                width: 105px;
                height: 29px;
                background: url('../../../../assets/img3/pull-down.png') no-repeat center;
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
            .img-box{
              width: 100%;
              height: auto;
              display: flex;
              flex-wrap: wrap;
              .imgShow{
                display: inline-block;
                width: 150px;
                height: 150px;
                margin: 10px;
              }
              // img{
              //   width: 150px;
              //   height: 150px;
              //   margin: 10px;
              // }
            }
          }
        }
      }
    }
    .pagination {
      height: 30px;
      text-align: center;
    }
  }
}
</style>
