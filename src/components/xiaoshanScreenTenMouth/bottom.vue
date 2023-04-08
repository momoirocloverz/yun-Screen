<template>
  <div class="bottom">
    <div class="tab">
      <div :class="['item', item.path == currentPath ? 'act-item' : '']" v-for="(item, index) in tabList" :key="index" @click="tabClick(item.path)">
        <img :src="item.path == currentPath ? item.active_imgSrc : item.imgSrc" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { eventBus } from '@/main';
export default {
  name: '',
  data() {
    return {
      currentPath: '',
      tabList: [
        {
          imgSrc: require('../../assets/img4/nav1-nomal.png'),
          active_imgSrc: require('../../assets/img4/nav1-selected.png'),
          path: '/yxzs',
        },
        {
          imgSrc: require('../../assets/img4/nav2-nomal.png'),
          active_imgSrc: require('../../assets/img4/nav2-selected.png'),
          path: '/xbg',
        },
        {
          imgSrc: require('../../assets/img4/nav3-nomal.png'),
          active_imgSrc: require('../../assets/img4/nav3-selected.png'),
          path: '/zbz',
        },
        {
          imgSrc: require('../../assets/img4/nav4-nomal.png'),
          active_imgSrc: require('../../assets/img4/nav4-selected.png'),
          path: '/hb365',
        },
        {
          imgSrc: require('../../assets/img4/nav5-nomal.png'),
          active_imgSrc: require('../../assets/img4/nav5-selected.png'),
          path: '/zbz2',
        },
      ],
    };
  },
  computed: {
    ...mapState(['currentRouteName']),
  },
  created() {
    // console.log('当前路由', this.$route)
    this.currentPath = this.$route.path;
  },
  watch: {
    currentRouteName(val) {
      //   console.log('当前的路由', val);
      this.currentPath = val;
      if (this.currentPath == '/wbd') {
        this.currentPath = '/xbg';
      }
    //   if (this.currentPath == '/zbz2') {
    //     this.currentPath = '/zbz';
    //   }
    },
  },
  methods: {
    tabClick(path) {
      eventBus.$emit('gotoStreet', '萧山区');
      eventBus.$emit('resetGlobalJD', '');
      if (path == '/yxzs') {
        eventBus.$emit('resetCurrentPoiType', '');
      }
      this.$nextTick(() => {
        this.$router
          .replace(path)
          .then((res) => {
            // console.log('res', res);
            this.runInitAction(path);
          })
          .catch((err) => {
            console.log('err');
            this.runInitAction(path);
          });
        // this.$router.push(path);
        // if (path == '/zbz') {
        //   this.$router.push({
        //     name: 'zbz',
        //     // params: { isShowV2: false },
        //   });
        // }
      });
    },
    runInitAction(val) {
      eventBus.$emit('tabSwitchReset', val);
    },
  },
};
</script>

<style lang="less" scoped>
.bottom {
  width: 100%;
  //   height: 90px;
  height: 58px;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 12;
  background: url('../../assets/img4/bottom.png') no-repeat bottom;
  background-size: 100% auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .tab {
    width: 820px;
    height: 100%;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      width: 140px;
      height: 101px;
      margin-bottom: 25px;
      margin-left: 15px;
      margin-right: 15px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .act-item {
      height: 110px;
      margin-bottom: 33px;
    }
  }
}
</style>
