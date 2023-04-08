import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

// 指挥调度
// import zhddLeft from '@/components/xiaoshanComponents/zhdd/left';
// import zhddRight from '@/components/xiaoshanComponents/zhdd/right';
// import zhddTop from '@/components/xiaoshanComponents/zhdd/top';
// import zhddHeader from '@/components/xiaoshanComponents/zhdd/header';

// 驾驶舱
// import jscLeft from '@/components/xiaoshanComponents/jsc/left';
// import jscRight from '@/components/xiaoshanComponents/jsc/right';
// import jscTop from '@/components/xiaoshanComponents/jsc/top';
// import jscHeader from '@/components/xiaoshanComponents/jsc/header';

// 第二版page1
// import pageLeft_1 from '@/components/xiaoshanComponentsNew/firstPage/leftNew';
// import pageRight_1 from '@/components/xiaoshanComponentsNew/firstPage/rightNew';
// import pageTop_1 from '@/components/xiaoshanComponentsNew/firstPage/topNew';
// import pageHeader_1 from '@/components/xiaoshanComponentsNew/firstPage/header';
// import pageBottom_1 from '@/components/xiaoshanComponentsNew/firstPage/bottom';

// 第二版page2
// import pageLeft_2 from '@/components/xiaoshanComponentsNew/secondPage/left';
// import pageRight_2 from '@/components/xiaoshanComponentsNew/secondPage/right';
// import pageTop_2 from '@/components/xiaoshanComponentsNew/secondPage/top';
// import pageHeader_2 from '@/components/xiaoshanComponentsNew/secondPage/header';
// import pageBottom_2 from '@/components/xiaoshanComponentsNew/secondPage/bottom';

// 十月份大屏
// import mainViewNew from '@/components/main-view-new';
// import Map3d from '@/components/map-3d';
// import top from '@/components/xiaoshanScreenTenMouth/top';
// import header from '@/components/xiaoshanScreenTenMouth/header';
// import bottom from '@/components/xiaoshanScreenTenMouth/bottom';
// import YXZS_left from '@/components/xiaoshanScreenTenMouth/yxzs/left';
// import YXZS_right from '@/components/xiaoshanScreenTenMouth/yxzs/right';
// import XBG_left from '@/components/xiaoshanScreenTenMouth/xbg/left';
// import XBG_right from '@/components/xiaoshanScreenTenMouth/xbg/right';
// import HB365_left from '@/components/xiaoshanScreenTenMouth/hb365/left';
// import HB365_right from '@/components/xiaoshanScreenTenMouth/hb365/right';
// import ZKW_left from '@/components/xiaoshanScreenTenMouth/zkw/left';
// import ZKW_right from '@/components/xiaoshanScreenTenMouth/zkw/right';
// import ZKW_center from '@/components/xiaoshanScreenTenMouth/zkw/center';
// import ZBZ_left from '@/components/xiaoshanScreenTenMouth/zbz/left';
// import ZBZ_right from '@/components/xiaoshanScreenTenMouth/zbz/right';
// import WBD_left from '@/components/xiaoshanScreenTenMouth/wbd/left';
// import WBD_right from '@/components/xiaoshanScreenTenMouth/wbd/right';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  //   },
  {
    path: '/old',
    name: 'mainView',
    component: () => import(/* webpackChunkName: "main-view" */ '@/components/main-view'),
    children: [
      // {
      //     path: "/",
      //     redirect: "/page1"
      // },
      {
        path: '/jsc',
        name: 'jsc',
        components: {
          head: () => import(/* webpackChunkName: "xiaoshanComponentsjscheader" */ '@/components/xiaoshanComponents/jsc/header'),
          left: () => import(/* webpackChunkName: "xiaoshanComponentsjscleft" */ '@/components/xiaoshanComponents/jsc/left'),
          right: () => import(/* webpackChunkName: "xiaoshanComponentsjscright" */ '@/components/xiaoshanComponents/jsc/right'),
          top: () => import(/* webpackChunkName: "omponentsNewfirstPagetopNew" */ '@/components/xiaoshanComponentsNew/firstPage/topNew'),
          bottom: () => import(/* webpackChunkName: "omponentsNewfirstPagebottom" */ '@/components/xiaoshanComponentsNew/firstPage/bottom'),
        },
      },
      {
        path: 'page1',
        name: 'page1',
        components: {
          head: () => import(/* webpackChunkName: "omponentsNewfirstPageheader" */ '@/components/xiaoshanComponentsNew/firstPage/header'),
          left: () => import(/* webpackChunkName: "omponentsNewfirstPageleftNew" */ '@/components/xiaoshanComponentsNew/firstPage/leftNew'),
          right: () => import(/* webpackChunkName: "omponentsNewfirstPagerightNew" */ '@/components/xiaoshanComponentsNew/firstPage/rightNew'),
          top: () => import(/* webpackChunkName: "omponentsNewfirstPagetopNew" */ '@/components/xiaoshanComponentsNew/firstPage/topNew'),
          bottom: () => import(/* webpackChunkName: "omponentsNewfirstPagebottom" */ '@/components/xiaoshanComponentsNew/firstPage/bottom'),
        },
      },
    ],
  },
  {
    path: '/new',
    name: 'mainViewNewCon',
    component: () => import(/* webpackChunkName: "omponentsmainviewnewCon" */ '@/components/main-view-newCopy'),
    children: [
      {
        path: '/',
        redirect: '/yxzsCopy',
      },
      {
        path: '/yxzsCopy',
        name: 'yxzsCopy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeaderCopy" */ '@/components/xiaoshanScreenTenMouth/headerCopy'),
          //   left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthLeft" */ '@/components/xiaoshanScreenTenMouth/yxzs/left'),
          //   right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthRight" */ '@/components/xiaoshanScreenTenMouth/yxzs/right'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthLeft" */ '@/components/xiaoshanScreenTenMouth/yxzs/leftCopy'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthRight" */ '@/components/xiaoshanScreenTenMouth/yxzs/rightCopy'),
          center: () => import(/* webpackChunkName: "omponentsMap3dCopy" */ '@/components/map-3dCopy/index'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottomCopy" */ '@/components/xiaoshanScreenTenMouth/bottomCopy'),
        },
      },
      {
        path: '/yxzsDetailsCopy',
        name: 'yxzsDetailsCopy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeaderCopy" */ '@/components/xiaoshanScreenTenMouth/headerCopy'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthyxzsDetailsleft" */ '@/components/xiaoshanScreenTenMouth/yxzsDetails/left'),
          center: () => import(/* webpackChunkName: "omponentsMap3dCopy" */ '@/components/map-3dCopy/index'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthyxzsDetailsright" */ '@/components/xiaoshanScreenTenMouth/yxzsDetails/right'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottomCopy" */ '@/components/xiaoshanScreenTenMouth/bottomCopy'),
        },
      },
      {
        path: '/xbgCopy',
        name: 'xbgCopy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeaderCopy" */ '@/components/xiaoshanScreenTenMouth/headerCopy'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthxbgleft" */ '@/components/xiaoshanScreenTenMouth/xbg/left'),
          center: () => import(/* webpackChunkName: "omponentsMap3dCopy" */ '@/components/map-3dCopy/index'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthxbgright" */ '@/components/xiaoshanScreenTenMouth/xbg/right'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottomCopy" */ '@/components/xiaoshanScreenTenMouth/bottomCopy'),
        },
      },
      {
        path: '/wbdCopy',
        name: 'wbdCopy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeaderCopy" */ '@/components/xiaoshanScreenTenMouth/headerCopy'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthwbdleft" */ '@/components/xiaoshanScreenTenMouth/wbd/left'),
          center: () => import(/* webpackChunkName: "omponentsMap3dCopy" */ '@/components/map-3dCopy/index'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthwbdright" */ '@/components/xiaoshanScreenTenMouth/wbd/right'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottomCopy" */ '@/components/xiaoshanScreenTenMouth/bottomCopy'),
        },
      },
      {
        path: '/zbzCopy',
        name: 'zbzCopy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeaderCopy" */ '@/components/xiaoshanScreenTenMouth/headerCopy'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthzbzleft" */ '@/components/xiaoshanScreenTenMouth/zbz/left'),
          center: () => import(/* webpackChunkName: "omponentsMap3dCopy" */ '@/components/map-3dCopy/index'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthzbzright" */ '@/components/xiaoshanScreenTenMouth/zbz/right'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottomCopy" */ '@/components/xiaoshanScreenTenMouth/bottomCopy'),
        },
      },
      {
        path: '/zbz2Copy',
        name: 'zbz2Copy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeaderCopy" */ '@/components/xiaoshanScreenTenMouth/headerCopy'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthzbz2left" */ '@/components/xiaoshanScreenTenMouth/zbz2/leftCopy'),
          center: () => import(/* webpackChunkName: "omponentsMap3dCopy" */ '@/components/map-3dCopy/index'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthzbz2right" */ '@/components/xiaoshanScreenTenMouth/zbz2/rightCopy'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottomCopy" */ '@/components/xiaoshanScreenTenMouth/bottomCopy'),
        },
      },
      {
        path: '/hb365Copy',
        name: 'hb365Copy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeaderCopy" */ '@/components/xiaoshanScreenTenMouth/headerCopy'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthhb365left" */ '@/components/xiaoshanScreenTenMouth/hb365/left'),
          center: () => import(/* webpackChunkName: "omponentsMap3dCopy" */ '@/components/map-3dCopy/index'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthhb365right" */ '@/components/xiaoshanScreenTenMouth/hb365/right'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottomCopy" */ '@/components/xiaoshanScreenTenMouth/bottomCopy'),
        },
      },
    ],
  },
  {
    path: '/',
    name: 'mainViewNew',
    component: () => import(/* webpackChunkName: "omponentsmainviewnew" */ '@/components/main-view-new'),
    children: [
      {
        path: '/',
        redirect: '/yxzs',
        redirect: '/yxzsCopy',
      },
      {
        path: '/yxzs',
        name: 'yxzs',
        redirect: '/yxzsCopy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeader" */ '@/components/xiaoshanScreenTenMouth/header'),
          //   left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthLeft" */ '@/components/xiaoshanScreenTenMouth/yxzs/left'),
          //   right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthRight" */ '@/components/xiaoshanScreenTenMouth/yxzs/right'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthLeft" */ '@/components/xiaoshanScreenTenMouth/yxzs/leftCopy'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthRight" */ '@/components/xiaoshanScreenTenMouth/yxzs/rightCopy'),
          center: () => import(/* webpackChunkName: "omponentsMap3d" */ '@/components/map-3d'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottom" */ '@/components/xiaoshanScreenTenMouth/bottom'),
        },
      },
      {
        path: '/yxzsDetails',
        name: 'yxzsDetails',
        redirect: '/yxzsDetailsCopy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeader" */ '@/components/xiaoshanScreenTenMouth/header'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthyxzsDetailsleft" */ '@/components/xiaoshanScreenTenMouth/yxzsDetails/left'),
          center: () => import(/* webpackChunkName: "omponentsMap3d" */ '@/components/map-3d'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthyxzsDetailsright" */ '@/components/xiaoshanScreenTenMouth/yxzsDetails/right'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottom" */ '@/components/xiaoshanScreenTenMouth/bottom'),
        },
      },
      {
        path: '/xbg',
        name: 'xbg',
        redirect: '/xbgCopy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeader" */ '@/components/xiaoshanScreenTenMouth/header'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthxbgleft" */ '@/components/xiaoshanScreenTenMouth/xbg/left'),
          center: () => import(/* webpackChunkName: "omponentsMap3d" */ '@/components/map-3d'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthxbgright" */ '@/components/xiaoshanScreenTenMouth/xbg/right'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottom" */ '@/components/xiaoshanScreenTenMouth/bottom'),
        },
      },
      {
        path: '/hb365',
        name: 'hb365',
        redirect: '/hb365Copy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeader" */ '@/components/xiaoshanScreenTenMouth/header'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthhb365left" */ '@/components/xiaoshanScreenTenMouth/hb365/left'),
          center: () => import(/* webpackChunkName: "omponentsMap3d" */ '@/components/map-3d'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthhb365right" */ '@/components/xiaoshanScreenTenMouth/hb365/right'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottom" */ '@/components/xiaoshanScreenTenMouth/bottom'),
        },
      },
    //   {
    //     path: '/zkw',
    //     name: 'zkw',
    //     components: {
    //       head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeader" */ '@/components/xiaoshanScreenTenMouth/header'),
    //       left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthzkwleft" */ '@/components/xiaoshanScreenTenMouth/zkw/left'),
    //       center: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthzkwcenter" */ '@/components/xiaoshanScreenTenMouth/zkw/center'),
    //       right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthzkwright" */ '@/components/xiaoshanScreenTenMouth/zkw/right'),
    //       top: null,
    //       bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottom" */ '@/components/xiaoshanScreenTenMouth/bottom'),
    //     },
    //   },
      {
        path: '/zbz',
        name: 'zbz',
        redirect: '/zbzCopy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeader" */ '@/components/xiaoshanScreenTenMouth/header'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthzbzleft" */ '@/components/xiaoshanScreenTenMouth/zbz/left'),
          center: () => import(/* webpackChunkName: "omponentsMap3d" */ '@/components/map-3d'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthzbzright" */ '@/components/xiaoshanScreenTenMouth/zbz/right'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottom" */ '@/components/xiaoshanScreenTenMouth/bottom'),
        },
      },
      {
        path: '/zbz2',
        name: 'zbz2',
        redirect: '/zbz2Copy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeader" */ '@/components/xiaoshanScreenTenMouth/header'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthzbz2left" */ '@/components/xiaoshanScreenTenMouth/zbz2/leftCopy'),
          center: () => import(/* webpackChunkName: "omponentsMap3d" */ '@/components/map-3d'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthzbz2right" */ '@/components/xiaoshanScreenTenMouth/zbz2/rightCopy'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottom" */ '@/components/xiaoshanScreenTenMouth/bottom'),
        },
      },
      {
        path: '/wbd',
        name: 'wbd',
        redirect: '/wbdCopy',
        components: {
          head: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthHeader" */ '@/components/xiaoshanScreenTenMouth/header'),
          left: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthwbdleft" */ '@/components/xiaoshanScreenTenMouth/wbd/left'),
          center: () => import(/* webpackChunkName: "omponentsMap3d" */ '@/components/map-3d'),
          right: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthwbdright" */ '@/components/xiaoshanScreenTenMouth/wbd/right'),
          top: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthTop" */ '@/components/xiaoshanScreenTenMouth/top'),
          bottom: () => import(/* webpackChunkName: "omponentsxiaoshanScreenTenMouthbottom" */ '@/components/xiaoshanScreenTenMouth/bottom'),
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/components/login'),
  },
  {
    path: '/head',
    name: 'login',
    component: () => import(/* webpackChunkName: "omponentsNewfirstPageheader" */ '@/components/xiaoshanComponentsNew/firstPage/header'),
  },
  {
    path: '/top',
    name: 'login',
    component: () => import(/* webpackChunkName: "omponentsNewfirstPagetopNew" */ '@/components/xiaoshanComponentsNew/firstPage/topNew'),
  },
  {
    path: '/left',
    name: 'login',
    component: () => import(/* webpackChunkName: "omponentsNewfirstPageleftNew" */ '@/components/xiaoshanComponentsNew/firstPage/leftNew'),
  },
  {
    path: '/right',
    name: 'login',
    component: () => import(/* webpackChunkName: "omponentsNewfirstPagerightNew" */ '@/components/xiaoshanComponentsNew/firstPage/rightNew'),
    children: [
      {
        path: '/',
        name: 'withHead',
        component: () => import(/* webpackChunkName: "omponentsNewfirstPageheader" */ '@/components/xiaoshanComponentsNew/firstPage/header'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
