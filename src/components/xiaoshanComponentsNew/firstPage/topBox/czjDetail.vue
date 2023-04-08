<template>
  <div
    class="mask"
    v-show="isShow"
  >
    <div class="info-container">
      <div class="head">
        <div class="title">
          <div class="top-box">
            <span class="text">高危场景详情</span>
          </div>
        </div>
        <div
          class="close"
          @click="close"
        ></div>
      </div>
      <div class="search-box">
        <span>分类类别:</span>
        <el-cascader clearable :style="{width:`${110/192}rem !important`}" size="mini" :props="{ checkStrictly: true }" v-model="searchParams.classification" :options="classification_option" :show-all-levels="false"></el-cascader>
        <span>文物单位:</span>
        <el-select
          v-model="searchParams.bumpPointName"
          clearable
          filterable
          size="mini"
          placeholder="文物单位"
          :style="{width:`${110/192}rem !important`}"
        >
          <el-option
            v-for="item in bumpPointList"
            :key="item.id"
            :label="item.publishName"
            :value="item.publishName"
          >
          </el-option>
        </el-select>

        <span>设施名称:</span>
        <el-input :style="{width:`${110/192}rem !important`}" type="text" size="mini" v-model="searchParams.facilitiesName" placeholder="输入设施名称"></el-input>

        <span>使用频度:</span>
        <el-select
          v-model="searchParams.sypd"
          clearable
          size="mini"
          placeholder="使用频度"
          :style="{width:`${110/192}rem !important`}"
        >
          <el-option
            v-for="item in sypd_option"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        
        <span>年龄区段:</span>
        <el-select
          v-model="searchParams.nlqd"
          clearable
          size="mini"
          placeholder="年龄区段"
          :style="{width:`${110/192}rem !important`}"
        >
          <el-option
            v-for="item in nlqd_option"
            :key="item.id"
            :label="item.name"
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
        <TableC 
          :isShowCheck="false"
          :tableColumns="tableColums"
          :tableData="tableData"
          :logo="logo2"
        >
          <template slot="facilitiesStatus" slot-scope="scope">
            <span :style="{color:getColorAndImg('facilitiesStatus',scope.row.facilitiesStatus,'color'),'padding-left':'5px'}">
              <img :src="getColorAndImg('facilitiesStatus',scope.row.facilitiesStatus,'img')" alt="" srcset="" :style="{width:`${17/192}rem`,height:`${17/192}rem`,'margin-right':'5px'}">
              {{scope.row.facilitiesStatus}}
            </span>
          </template>
        </TableC>
      </div>
      <div class="pagination">
        <el-pagination
          @current-change="pageNumChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :pager-count="5"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import { ywtg_list, ywtg_detail, wbd_list2, szzj,czj_flcx } from '../../../../api/xsApi.js'
import {czj_List} from '../../../../api/xsApi2.js'
import TableC from './components/tableC'

export default {
  components:{TableC},
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    logo: {
      type:String,
      default:'1',
    }
  },
  data() {
    return {
      show1: true,
      show2: false,
      show3: false,
      taskList: [],
      formData: {},
      imgArr_1: [], // 附件图片--问题附件
      imgArr_2: [], // 附件图片--反馈附件
      timeLineData: [],
      currentId: '', // 当前列表的id
      bumpPointList: [], // 文物列表
      classification_option: [
      //   {
      //     label: '可用电器',
      //     value: '可用电器',
      //     children:[
      //       {
      //         label: '饮水机',
      //         value: '饮水机',
      //       },
      //       {
      //         label: '电饭煲',
      //         value: '电饭煲',
      //       },
      //       {
      //         label: '热水器',
      //         value: '热水器',
      //       },
      //       {
      //         label: '电烤箱',
      //         value: '电烤箱',
      //       },
      //       {
      //         label: '洗衣机',
      //         value: '洗衣机',
      //       },
      //       {
      //         label: '空调',
      //         value: '空调',
      //       },
      //       {
      //         label: '电水壶',
      //         value: '电水壶',
      //       },
      //       {
      //         label: '微波炉',
      //         value: '微波炉',
      //       },
      //       {
      //         label: '冰箱',
      //         value: '冰箱',
      //       },
      //       {
      //         label: '电磁炉',
      //         value: '电磁炉',
      //       },
      //     ]
      //   },
      //   {
      //     label: '不可用电器',
      //     value: '不可用电器',
      //     children:[
      //       {
      //         label:'热得快',
      //         value:'热得快'
      //       },
      //       {
      //         label:'电热毯',
      //         value:'电热毯'
      //       },
      //     ]
      //   },
      //   {
      //     label: '厨灶间明火',
      //     value: '厨灶间明火',
      //     children:[
      //       {
      //         label:'煤气灶',
      //         value:'煤气灶'
      //       },
      //       {
      //         label:'天然气灶',
      //         value:'天然气灶'
      //       },
      //     ]
      //   },
      //   {
      //     label: '配电线路',
      //     value: '配电线路',
      //   },
      //   {
      //     label: '天花板吊顶',
      //     value: '天花板吊顶',
      //   },
      ], // 镇街列表
      nlqd_option: [
        {
          name: '老年',
          id: '老',
        },
        {
          name: '中年',
          id: '中',
        },
        {
          name: '青年',
          id: '青',
        },
      ], // 年龄区段
      sypd_option:[
        {
          name: '春季',
          id: '春',
        },
        {
          name: '夏季',
          id: '夏',
        },
        {
          name: '秋季',
          id: '秋',
        },
        {
          name: '冬季',
          id: '冬',
        },
        {
          name: '全年',
          id: '全年',
        },
      ], 

      // 表格配置
      tableColums:[
        {
          props: 'facilitiesName',
          name: '设施名称',
          flex:1.2
        },
        {
          props: 'bumpPointName',
          name: '文物单位',
          requireEllipsis:3,
        },
        {
          props: 'classification',
          name: '分类类别',
          flex:1
        },
        {
          props: 'facilitiesStatus',
          name: '设施状态',
          withSlot:true,
          flex:0.9
        },
        {
          props: 'liaisonMan',
          name: '联系人',
          flex:0.7
        },
        {
          props: 'contactWay',
          name: '联系方式',
          flex:1.3,
        },
        {
          props: 'sypd',
          name: '使用频度',
          flex:0.8,
          format:(row)=>{
            if(row.sypd!=='全年'){
              return row.sypd+'季'
            }else{
              return row.sypd
            }
            
          }
        },
        {
          props: 'nlqd',
          name: '年龄区段',
          flex:0.8,
          format:(row)=>{
            return row.nlqd+'年'
          }
        },
        {
          props: 'facilitiesType',
          name: '设施类型',
        },
        {
          props: 'effectiveTimeLimit',
          name: '有效时限',
          flex:1.2,
          format:(row)=>{
            return row.effectiveTimeLimit.split(' ')[0]
          }
        },
        {
          props: 'power',
          name: '功率',
          flex:0.7
        },
        {
          props: 'locationMarks',
          name: '位置',
          flex:1.3
        },
      ],
      tableData:[],
      logo2:'',
      status_1:require('../../../../assets/img3/status_1.png'),
      status_2:require('../../../../assets/img3/status_2.png'),
      // 分页
      currentPage: 1,
      pageSize: 5,
      total: 0,

      // 搜索
      searchParams: {},
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
  watch: {
    logo() {
      // this.getStreetList()
      this.czj_List()
      this.getBumpPointList()
      this.czj_flcx()
    },
  },
  methods: {
    search() {
      console.log('搜索的参数', this.searchParams)
      this.czj_List()
    },
    pageNumChange(val) {
      this.currentPage = val
      this.czj_List()
    },
    // 获取厨灶间列表
    czj_List(){
      let params={
        currentPage:this.currentPage,
        pageSize:this.pageSize,
        bumpPointName:this.searchParams.bumpPointName,
        classification:this.searchParams.classification&&this.searchParams.classification[this.searchParams.classification.length-1],
        facilitiesName:this.searchParams.facilitiesName,
        nlqd:this.searchParams.nlqd,
        sypd:this.searchParams.sypd,
      }
      czj_List(params).then(res=>{
        console.log('厨灶间',res.data.data)
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    // 厨灶间分类查询
    czj_flcx(){
      czj_flcx().then(res=>{
        console.log('厨灶间分类',res.data.data)
        this.classification_option = res.data.data
      })

    },
    close() {
      this.formData = {}
      this.$emit('close')
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
    // 根据字段，判断颜色和图片
    getColorAndImg(key,value,returnType){
      let color,img,text
      if(key === 'facilitiesStatus'){
        switch (value) {
          case '正常': // 正常
            color = '#2fd692'
            img = this.status_1
            text = '正常'
            break;
          case '维修中':
            color = '#eaa614'
            img = this.status_2
            text = '维修中'
            break;
        
          default:
            break;
        }
      }
      if(returnType === 'color'){
        return color
      }else if(returnType === 'img'){
        return img
      }else if(returnType === 'text'){
        return text
      }
    },
    // 获取镇街列表
    // getStreetList() {
    //   szzj().then((res) => {
    //     console.log('lol', res.data)
    //     this.streetList = res.data.data
    //   })
    // },
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
      width: calc(100% - 40px);
      height: 60px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      margin-left: 20px;
      border-bottom: 1px solid rgba(92, 194, 212, 0.3);
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

    }
    .pagination {
      height: 30px;
      text-align: center;
    }
  }
}
</style>
