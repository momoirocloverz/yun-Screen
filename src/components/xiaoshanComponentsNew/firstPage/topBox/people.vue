<template>
  <div
    class="mask"
    v-show="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">护保365</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="body">
        <div class="container">
          <div class="left">
            <div class="list">
              <div
                class="item"
                v-for="(item,index) in listData"
                :key="index+10"
                @click="listClick(item,index)"
                :class="[currentIndex==index?'active':'']"
              >
                <div class="left-img">
                  <span>{{item.name}}</span>
                  <span>{{item.value}}人</span>
                </div>
              </div>
            </div>
            <div class="echarts">
              <!-- <EchartBar :chartData="[]" :logo="`1`"/> -->
            </div>
          </div>
          <div class="right">
            <div
              class="item"
              v-for="(item,index) in rightListData"
              :key="index"
            >
              <div class="normal-info">
                <img
                  :src="imgSrc"
                  alt=""
                  srcset=""
                  @click="showDetailTrack(item)"
                >
                <div class="right-list">
                  <div class="row" style="width:20%;">
                    <span>姓名：</span>
                    <span>{{item.userName}}</span>
                  </div>
                  <div style="width:30%;" class="row img-box" v-if="currentIndex==1">
                    <div class="show" v-if="item.phone.substr(3,3)*1+58 >= 800">
                      <img v-for="(item,index) in 5" :key="index" src="../../../../assets/img3/star.png" alt="" srcset=""></img>
                    </div>
                    <div class="show" v-else-if="item.phone.substr(3,3)*1+58 >= 600">
                      <img v-for="(item,index) in 4" :key="index" src="../../../../assets/img3/star.png" alt="" srcset=""></img>
                    </div>
                    <div class="show" v-else-if="item.phone.substr(3,3)*1+58 >= 400">
                      <img v-for="(item,index) in 3" :key="index" src="../../../../assets/img3/star.png" alt="" srcset=""></img>
                    </div>
                    <div class="show" v-else-if="item.phone.substr(3,3)*1+58 >= 200">
                      <img v-for="(item,index) in 2" :key="index" src="../../../../assets/img3/star.png" alt="" srcset=""></img>
                    </div>
                    <div class="show" v-else-if="item.phone.substr(3,3)*1+58 >= 100">
                      <img v-for="(item,index) in 1" :key="index" src="../../../../assets/img3/star.png" alt="" srcset=""></img>
                    </div>
                    <div class="show" v-else-if="item.phone.substr(3,3)*1+58 >= 0">
                      <img v-for="(item,index) in 0" :key="index" src="../../../../assets/img3/star.png" alt="" srcset=""></img>
                    </div>
                  </div>
                  <div class="row" style="width:50%;" v-if="currentIndex==1">
                    <span>护保状态：</span>
                    <span :style="{color:item.phone.substr(6,3)*1+58 >= 300?'#90ffad':'#ff3b30'}">{{item.phone.substr(6,3)*1+58 >= 300?'巡查中':'离线'}}</span>
                  </div>
                  <div class="row" style="width:50%;">
                    <span>联系电话：</span>
                    <span>{{item.phone}}</span>
                  </div>
                  <div class="row" style="width:50%;" v-if="currentIndex==1">
                    <span>考核监督：</span>
                    <span :style="{color:item.phone.substr(3,3)*1+58 >= 800?'#90ffad':'#ff3b30'}">{{item.phone.substr(3,3)*1+58 >= 800?'达标':'未达标'}}</span>
                  </div>
                  <div class="row" style="width:50%;" v-if="currentIndex==1">
                    <span>所属镇街：</span>
                    <span>{{item.jd||'暂无'}}</span>
                  </div>
                  <div class="row" style="width:50%;" v-if="currentIndex==2">
                    <span>所属党支部：</span>
                    <span>{{item.dzz||'暂无'}}</span>
                  </div>
                  <!-- <div class="row" v-if="currentIndex==1">
                    <span>护保积分：</span>
                    <span>{{item.phone.substr(3,3)*1+58}}</span>
                  </div> -->
                  <div style="width:50%;" class="row" v-if="currentIndex==1">
                    <span>关联文物：</span>
                    <span>{{item.pointName}}</span>
                  </div>
                </div>
              </div>
              <div class="detail-info" v-show="currentRowName == item.userName">
                <div class="text">
                  <div class="row" v-if="currentIndex==1" style="width:25%">
                    <span>今年巡查：</span>
                    <span>{{item.trackInfo&&item.trackInfo.this_year}}次</span>
                  </div>
                  <div class="row" v-if="currentIndex==1" style="width:25%">
                    <span>当月巡查：</span>
                    <span>{{item.trackInfo&&item.trackInfo.this_month}}次</span>
                  </div>
                  <div class="row" v-if="currentIndex==1" style="width:50%">
                    <span>最后巡查时间：</span>
                    <span>{{item.trackInfo&&item.trackInfo.last_time}}</span>
                  </div>
                </div>

                <div class="track-table" v-if="currentIndex==1">
                  <ScrollTable :isSpecal="true" :tableData="tableData_xcgj" :tableColumns="tableColumn_xcgj" @table_row_click="scrollRowClick"/>
                </div>
                
              </div>
              
            </div>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            @current-change="pageNumChange"
            :page-size="pageSize"
            :pager-count="7"
            layout="total,prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollTable from '../components/scroll-table_3'
import EchartBar from './components/echartBar2D'

import { get_people_tj, get_people_list } from '@/api/xsApi2'
import { eventBus } from '../../../../main'

let demoInfo=[{
    "name": "田欢乐",
    "this_year": 45,
    "this_month": 5,
    "last_time": "2022-09-20 14:50:20",
    "records": [{
       "streetName":"进化镇",
        "bump_name": "务本堂",
        "start_time": "2022-09-20 09:50:46",
        "end_time": "2022-09-20 10:10:23",
        "name": "田欢乐",
        "trail": ["120.316009,29.956913", "120.316144,29.957284", "120.316153,29.957315", "120.316305,29.957542", "120.316103,29.95755", "120.315982,29.957581", "120.315883,29.957609", "120.315923,29.957644", "120.315838,29.957593", "120.315852,29.957632"]
    }, {
       "streetName":"进化镇",
        "bump_name": "务本堂",
        "start_time": "2022-09-21 11:20:19",
        "end_time": "2022-09-21 11:33:12",
        "name": "田欢乐",
        "trail": ["120.316674,29.956991", "120.316498,29.956995", "120.316269,29.956959", "120.316009,29.956909", "120.316072,29.957077", "120.316112,29.957229", "120.316166,29.957358", "120.316265,29.957507", "120.316135,29.957546", "120.315959,29.957519", "120.31587,29.95757", "120.315923,29.957648"]
    }, {
       "streetName":"进化镇",
        "bump_name": "务本堂",
        "start_time": "2022-09-16 14:50:20",
        "end_time": "2022-09-16 15:01:51",
        "name": "田欢乐",
        "trail": ["120.316427,29.957648", "120.316314,29.957538", "120.316238,29.95746", "120.316094,29.957511", "120.315955,29.957527", "120.315847,29.957566", "120.315883,29.957581"]
    }, {
       "streetName":"进化镇",
        "bump_name": "务本堂",
        "start_time": "2022-09-07 15:40:20",
        "end_time": "2022-09-07 15:51:27",
        "name": "田欢乐",
        "trail": ["120.315519,29.956212", "120.315542,29.95642", "120.315591,29.956643", "120.315627,29.956791", "120.315825,29.956854", "120.31604,29.956905", "120.316108,29.957179", "120.316256,29.957476", "120.316359,29.957601", "120.316171,29.957609", "120.315941,29.95766", "120.315703,29.95766", "120.315874,29.95775", "120.315946,29.957726"]
    }, {
       "streetName":"进化镇",
        "bump_name": "务本堂",
        "start_time": "2022-09-01 10:50:41",
        "end_time": "2022-09-01 11:03:01",
        "name": "田欢乐",
        "trail": ["120.315969,29.957556", "120.315879,29.957575", "120.315722,29.957626", "120.315713,29.957689", "120.315766,29.95779", "120.315942,29.957775", "120.316045,29.957767", "120.316013,29.957657", "120.315874,29.957642"]
    }]
}]

export default {
  components:{ScrollTable,EchartBar},
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listData: [],
      rightListData: [],
      currentIndex: 1,
      imgSrc: require('../../../../assets/img3/photo@2x.png'),

      currentRowName:"",
      tableColumn_xcgj:[
        {
          props:'bump_name',
          name:'关联文物'
        },
        {
          props:'start_time',
          name:'巡查开始时间'
        },
        {
          props:'end_time',
          name:'巡查结束时间'
        },
      ],
      tableData_xcgj:[],

      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 0,
    }
  },
  mounted() {
    this.getLeftList()
    this.currentRowName=''
    let obj={
      userName:'田欢乐',
      trackInfo:demoInfo[0]
    }
    this.showDetailTrack(obj)
    
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
    // 获取统计列表数据
    getLeftList() {
      get_people_tj().then((res) => {
        this.listData = res.data.data
        // this.getList(res.data.data[0].id)
        this.getList(this.listData[this.currentIndex].id)
      })
    },
    listClick(item, index) {
      this.currentPage = 1
      this.currentIndex = index
      this.getList(item.id)
    },

    // 分页
    pageNumChange(val) {
      this.currentPage = val
      this.getList(this.listData[this.currentIndex].id)
    },

    // 获取具体列表
    getList(id) {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        roleId: id,
      }
      get_people_list(params).then((res) => {
        this.rightListData = res.data.data.list
        this.total = res.data.data.total

        this.rightListData.map(item=>{
          demoInfo.map(val=>{
            if(item.userName==val.name){
              item.trackInfo = val
            }
          })
           return item
        })
      })
    },

    // 点击展示轨迹
    scrollRowClick(row){
      console.log('轨迹',row)
      eventBus.$emit('drawTrack',row)
      this.$emit('close')
    },

    // 展示轨迹数据
    showDetailTrack(item){
      if(this.currentRowName !== item.userName){
        if(item.trackInfo){
          this.currentRowName = item.userName
          this.tableData_xcgj = item.trackInfo.records
        }
      }else{
        this.currentRowName = ''
        this.tableData_xcgj = []
      }
      
    },

    close() {
      this.currentIndex = 1
      this.currentPage = 1
      this.getList(this.listData[this.currentIndex].id)
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
    // background: rgba(255, 0, 0, 0.288);
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
    .body {
      width: 100%;
      height: calc(100% - 67px);
      box-sizing: border-box;
      padding: 0 40px 0 20px;
      padding-top: 8px;
      .container {
        width: 100%;
        height: calc(100% - 80px);
        display: flex;
        .left {
          width: 300px;
          height: 100%;
          margin-right: 10px;
          .list {
            width: 100%;
            height: 50%;
            .item {
              width: 100%;
              height: 54px;
              box-sizing: border-box;
              padding: 0 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: solid 1px rgba(21, 110, 157, 0.3);
              cursor: pointer;
              &:hover {
                background: linear-gradient(
                  to right,
                  #3baef5c2 1%,
                  rgba(0, 0, 0, 0) 50%
                );
              }
              .left-img {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                  font-family: MicrosoftYaHei;
                  font-size: 20px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
            }
            .active {
              background: linear-gradient(
                to right,
                #3baef5 1%,
                rgba(0, 0, 0, 0) 50%
              );
            }
          }
          .echarts{
            width: 100%;
            height: 50%;
          }
        }
        .right {
          height: 100%;
          overflow: auto;
          width: calc(100% - 310px);
          background: url('../../../../assets/img2/hr-y.png') no-repeat left;
          background-size: auto 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          .item {
            width: 90%;
            // min-height: 160px;
            box-sizing: border-box;
            // display: flex;
            // align-items: center;
            // flex-direction: row;
            // margin-bottom: 10px;
            border-bottom: 1px solid rgba(92, 194, 212, 0.3);
            .normal-info{
              width:100%;
              height: 160px;
              display: flex;
              align-items: center;
              flex-direction: row;
              margin-bottom: 10px;
              img {
                width: 149px;
                height: 157px;
                cursor: pointer;
              }
              .right-list {
                width: calc(100% - 149px);
                height: 80px;
                display: flex;
                flex-wrap: wrap;
                box-sizing: border-box;
                padding-left: 20px;
                .row {
                  width: 33.3%;
                  height: 50%;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  font-family: MicrosoftYaHei;
                  font-size: 18px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  &:nth-child(1) {
                    width: 30%;
                  }
                  &:nth-child(2) {
                    width: 34%;
                  }
                  &:nth-child(3) {
                    width: 36%;
                  }
                  &:nth-child(4) {
                    width: 50%;
                  }

                  span:nth-child(1) {
                    color: #a2c0d1;
                  }
                  span:nth-child(2) {
                    color: #51c0e9;
                  }
                }
                .img-box{
                  .show{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                  }
                  img{
                    width: 15px;
                    height: 15px;
                    margin-right: 5px;
                  }
                }
              }
            }
            .detail-info{
              width: 97%;
              height: auto;
              margin-left: 15px;
              background-color: #07315a;
              
              .text{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-wrap: wrap;
                margin: 5px 0 0 5px;
                .row{
                  font-family: MicrosoftYaHei;
                  font-size: 18px;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  span:nth-child(1) {
                    color: #a2c0d1;
                  }
                  span:nth-child(2) {
                    color: #51c0e9;
                  }
                }
              }
              .track-table{
                width: 100%0;
                height: 150px;
              }
              
            }
            
          }
        }
      }
      .pagination {
        text-align: right;
      }
    }
  }
}
</style>
