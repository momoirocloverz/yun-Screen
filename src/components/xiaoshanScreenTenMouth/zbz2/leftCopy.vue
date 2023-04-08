<template>
  <div class="zbz2LeftContainer">
    <div class="v2">
      <Box :height="'305px'" :bgSrc="require('../../../assets/imgBoxBg/zb-box2-bg.png')">
        <div class="part-1">
          <Title :text="'火灾烟感监测'"></Title>
          <div class="shrinker">
            <div class="tj">
              <div class="item" @click="showListBox('火灾烟感监测',item)" v-for="(item, index) in tj_1" :key="index" :style="{ backgroundImage: `url(${item.imgSrc})` }">
                <div class="info">
                  <span>{{ item.name }}</span>
                  <span>{{ item.num }}</span>
                </div>
              </div>
            </div>
            <div class="aizb-table">
              <Table
                :tableData="tableData_1"
                :tableColumns="tableColumn"
                :isStripe="true"
                :headTextColor="'rgba(255,255,255, 0.6)'"
                :headHeight="`${35 / 192}rem`"
                :headBgColor="'rgba(107,154,233, 0.2)'"
                :rowHeight="`${34 / 192}rem`"
                :rowTextColor="'#a8b0d0'"
              >
                <template slot="isOver" slot-scope="scope">
                  <span
                    :style="{
                      color: scope.row.isOver == '已处置' ? '#a8b0d0' : '#ffc231',
                      fontSize: '14px',
                    }"
                    >{{ scope.row.isOver }}</span
                  >
                </template>
                <!-- <template slot="content" slot-scope="scope">
                  <span
                    :style="{
                      fontSize: '14px',
                      color: '#a8b0d0',
                    }"
                    >{{ scope.row.content }}</span
                  >
                </template> -->
              </Table>
            </div>
          </div>
        </div>
      </Box>
      <Box :height="'305px'" :bgSrc="require('../../../assets/imgBoxBg/zb-box2-bg.png')">
        <div class="part-1">
          <Title :text="'违规电器监测'"> </Title>
          <div class="shrinker">
            <div class="tj">
              <div class="item" @click="showListBox('违规电器监测',item)" v-for="(item, index) in tj_2" :key="index" :style="{ backgroundImage: `url(${item.imgSrc})` }">
                <div class="info">
                  <span>{{ item.name }}</span>
                  <span>{{ item.num }}</span>
                </div>
              </div>
            </div>
            <div class="aizb-table">
              <Table
                :tableData="tableData_2"
                :tableColumns="tableColumn"
                :isStripe="true"
                :headTextColor="'rgba(255,255,255, 0.6)'"
                :headHeight="`${35 / 192}rem`"
                :headBgColor="'rgba(107,154,233, 0.2)'"
                :rowHeight="`${34 / 192}rem`"
                :rowTextColor="'#a8b0d0'"
              >
                <template slot="isOver" slot-scope="scope">
                  <span
                    :style="{
                      color: scope.row.isOver == '已处置' ? '#a8b0d0' : '#ffc231',
                      fontSize: '14px',
                    }"
                    >{{ scope.row.isOver }}</span
                  >
                </template>
                <!-- <template slot="content" slot-scope="scope">
                  <span
                    :style="{
                      fontSize: '14px',
                      color: '#a8b0d0',
                    }"
                    >{{ scope.row.content }}</span
                  >
                </template> -->
              </Table>
            </div>
          </div>
        </div>
      </Box>
      <Box :height="'305px'" :bgSrc="require('../../../assets/imgBoxBg/zb-box2-bg.png')">
        <div class="part-1">
          <Title :text="'消防水压监测'"> </Title>
          <div class="shrinker">
            <div class="tj">
              <div class="item" @click="showListBox('消防水压监测',item)" v-for="(item, index) in tj_3" :key="index" :style="{ backgroundImage: `url(${item.imgSrc})` }">
                <div class="info">
                  <span>{{ item.name }}</span>
                  <span>{{ item.num }}</span>
                </div>
              </div>
            </div>
            <div class="aizb-table">
              <Table
                :tableData="tableData_3"
                :tableColumns="tableColumn"
                :isStripe="true"
                :headTextColor="'rgba(255,255,255, 0.6)'"
                :headHeight="`${35 / 192}rem`"
                :headBgColor="'rgba(107,154,233, 0.2)'"
                :rowHeight="`${34 / 192}rem`"
                :rowTextColor="'#a8b0d0'"
              >
                <template slot="isOver" slot-scope="scope">
                  <span
                    :style="{
                      color: scope.row.isOver == '已处置' ? '#a8b0d0' : '#ffc231',
                      fontSize: '14px',
                    }"
                    >{{ scope.row.isOver }}</span
                  >
                </template>
                <!-- <template slot="content" slot-scope="scope">
                  <span
                    :style="{
                      fontSize: '14px',
                      color: '#a8b0d0',
                    }"
                    >{{ scope.row.content }}</span
                  >
                </template> -->
              </Table>
            </div>
          </div>
        </div>
      </Box>
    </div>
    <!-- 二级页面 -->
    <TableList :isShow="isShowTableList" :logo1="logo1" :logo2="logo2" @close="closeListBox" />
  </div>
</template>
<script>
import Box from '../components/box';
import Title from '../components/title';
import { get_hzcz_data } from '../../../api/xsApi3';
import { get_jmzk_tj } from '@/api/xsApi2'
import { eventBus } from '@/main';
import Table from './components/newTable';
// 二级页面
import TableList from './secondPage/tableList';
export default {
  components: {
    Box,
    Title,
    Table,
    TableList
  },
  data() {
    return {

      isShowTableList:false,
      listTitle:'',
      logo1:'',
      logo2:'',

      tj_1: [
        {
          name: '数量',
          num: '14',
          imgSrc: require('../../../assets/zbz/info-icon1.png'),
        },
        {
          name: '累计报警',
          num: '113',
          imgSrc: require('../../../assets/zbz/info-icon2.png'),
        },
        {
          name: '已处理',
          num: '5',
          imgSrc: require('../../../assets/zbz/info-icon3.png'),
        },
        {
          name: '待处理',
          num: '7',
          imgSrc: require('../../../assets/zbz/info-icon4.png'),
        },
      ],
      tj_2: [
        {
          name: '数量',
          num: '12',
          imgSrc: require('../../../assets/zbz/info-icon5.png'),
        },
        {
          name: '累计报警',
          num: '11',
          imgSrc: require('../../../assets/zbz/info-icon2.png'),
        },
        {
          name: '已处理',
          num: '123',
          imgSrc: require('../../../assets/zbz/info-icon3.png'),
        },
        {
          name: '待处理',
          num: '1',
          imgSrc: require('../../../assets/zbz/info-icon4.png'),
        },
      ],
      tj_3: [
        {
          name: '数量',
          num: '20',
          imgSrc: require('../../../assets/zbz/info-icon6.png'),
        },
        {
          name: '累计报警',
          num: '31',
          imgSrc: require('../../../assets/zbz/info-icon2.png'),
        },
        {
          name: '已处理',
          num: '131',
          imgSrc: require('../../../assets/zbz/info-icon3.png'),
        },
        {
          name: '待处理',
          num: '2',
          imgSrc: require('../../../assets/zbz/info-icon4.png'),
        },
      ],
      tableColumn: [
        {
          name: '文保单位',
          props: 'publishName',
        },
        {
          name: '设备位置',
          props: 'address',
          format:(row)=>{
            if(row.address.length>5){
              return row.address.substr(0,5)+'...'
            }else{
              return row.address
            }
          }
        },
        {
          name: '事件内容',
          props: 'context',
          format:(row)=>{
            if(row.context.length>6){
              return row.context.substr(0,7)+'...'
            }else{
              return row.context
            }
          }
        },
        {
          name: '时间',
          props: 'warningTime',
          flex: 1.2,
          format: (row) => {
            return row.warningTime.split(' ')[0];
          },
        },
        {
          name: '状态',
          props: 'isOver',
          flex: 0.6,
          withSlot: true,
        },
      ],
      tableData_1: [],
      tableData_2: [],
      tableData_3: [],
      
    };
  },
  created() {
    eventBus.$on('data_back', () => {});
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      get_hzcz_data().then(res=>{


        get_jmzk_tj().then((result) => {
        let resx = result.data.data
        let target=resx.find(item=>item.name=='感烟检测')


        console.log('首屏数据左：',res.data.data)
        let data_1 = res.data.data['火灾烟感检测']
        let data_2 = res.data.data['违规电器检测']
        let data_3 = res.data.data['消防水压检测']

        this.tj_1[0].num = target.num;
        this.tj_1[1].num = data_1.alarmSum

        this.tj_1[2].num = data_1.doCount
        this.tj_1[3].num = data_1.toDoCount
        this.tableData_1 = data_1.hikBaseAlarmVOS

        this.tj_2[0].num = data_2.deviceSum
        this.tj_2[1].num = data_2.alarmSum
        this.tj_2[2].num = data_2.doCount
        this.tj_2[3].num = data_2.toDoCount
        this.tableData_2 = data_2.hikBaseAlarmVOS

        this.tj_3[0].num = data_3.deviceSum
        this.tj_3[1].num = data_3.alarmSum
        this.tj_3[2].num = data_3.doCount
        this.tj_3[3].num = data_3.toDoCount
        this.tableData_3 = data_3.hikBaseAlarmVOS




      })


        

        
      })
    },
    showListBox(logo1,item){
      this.logo1 = logo1
      this.logo2 = item.name
      if(item.num*1>0){
        this.isShowTableList = true
      }else{
        this.$message({
          type:"warning",
          message:"暂无数据"
        })
      }
      
    },
    closeListBox(){
      this.isShowTableList = false
    }
  },
};
</script>
<style lang="less" scoped>
.zbz2LeftContainer {
  width: 100%;
  height: 97%;
  .v2 {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .part-1 {
      .tj {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          width: 213px;
          height: 50px;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100%;
          margin-bottom: 5px;
          display: flex;
          .info {
            width: 150px;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 60px;
            span:nth-child(1) {
              font-size: 16px;
              width: 80px;
              color: #b7bedc;
            }
            span:nth-child(2) {
              font-size: 24px;
              color: #ffffff;
              font-family: DINPro-Medium;
            }
          }
        }
      }
      .aizb-table {
        width: 100%;
        // height: 220px;
        .btn {
          width: 50px;
          height: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          border: 1px solid #6aade5;
          box-shadow: inset #6aade5 0 0 10px;
          color: #6aade5;
          font-size: 14px;
        }
      }
    }
    .part-2 {
      .tj {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .item {
          width: 206px;
          display: flex;
          img {
            width: 71px;
            height: 100%;
          }
          .info {
            width: 120px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-left: 10px;
            span:nth-child(1) {
              font-size: 16px;
              color: #a8b0d0;
            }
            span:nth-child(2) {
              font-size: 20px;
              color: #ffffff;
            }
          }
        }
      }
      .chart {
        width: 100%;
        height: 200px;
      }
    }
  }
}
.shrinker {
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  box-sizing: border-box;
}
</style>
