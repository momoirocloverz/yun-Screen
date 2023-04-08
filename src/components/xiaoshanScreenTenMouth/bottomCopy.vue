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
export default {
  name: '',
  data() {
    return {
      currentPath: '',
      tabList: [
        {
          imgSrc: require('../../assets/img4/nav1-nomal.png'),
          active_imgSrc: require('../../assets/img4/nav1-selected.png'),
          path: '/yxzsCopy',
        },
        {
          imgSrc: require('../../assets/img4/nav2-nomal.png'),
          active_imgSrc: require('../../assets/img4/nav2-selected.png'),
          path: '/xbgCopy',
        },
        {
          imgSrc: require('../../assets/img4/nav3-nomal.png'),
          active_imgSrc: require('../../assets/img4/nav3-selected.png'),
          path: '/zbzCopy',
        },
        {
          imgSrc: require('../../assets/img4/nav4-nomal.png'),
          active_imgSrc: require('../../assets/img4/nav4-selected.png'),
          path: '/hb365Copy',
        },
        {
          imgSrc: require('../../assets/img4/nav5-nomal.png'),
          active_imgSrc: require('../../assets/img4/nav5-selected.png'),
          path: '/zbz2Copy',
        },
      ],
    };
  },
  created() {
    this.currentPath = this.$route.path;
  },
  methods: {
    tabClick(path) {
      this.currentPath = path;
      this.$store.commit('setUpdateIframeFlag', '');
      this.$store.commit('setCurrentAreaName', '萧山区');
      this.$store.commit('setIsGlobalShowModel', false);
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: '',
        bumpPointId: '',
      });
      this.$nextTick(() => {
        this.$router
          .replace(path)
          .then((res) => {
            this.runInitAction(path);
          })
          .catch((err) => {
            console.log('err');
            this.runInitAction(path);
          });
      });
    },
    runInitAction(val) {
      this.$store.commit('setMatchGlobalBottomNumber', val);
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
