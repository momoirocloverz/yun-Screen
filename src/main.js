import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'video.js/dist/video-js.css';
Vue.use(ElementUI);

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

// 字体库
import './assets/css/font.less';
import './assets/css/reset.less';
// 引入mapBox
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
Vue.prototype.$mapboxgl = mapboxgl;

library.add(fas, far, fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

import dialogMessage from './utils/dialog/dialogUtil';
Vue.prototype.$installdialog = dialogMessage.installDialog();

const G2 = require('@antv/g2');
Vue.prototype.$G2 = G2;

Object.defineProperties(Vue.prototype, {
    echarts: { get: () => echarts },
});

// import "echarts-gl";
Vue.prototype.$echarts = echarts;

export const eventBus = new Vue();

Vue.config.productionTip = false;

import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'videojs-flash';

import hls from 'videojs-contrib-hls';

Vue.use(VideoPlayer);
Vue.use(hls);

//在线图片查看
import ImageViewer from 'vue2-viewer';
Vue.use(ImageViewer);

import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999,
    },
});

// 列表滚动插件
import vueSeamlessScroll from 'vue-seamless-scroll';
Vue.use(vueSeamlessScroll);

Date.prototype.Format = function(fmt) {
    var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'H+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return fmt;
};
var userInfo = { userName: '', passWord: '' };

userInfo.userName = localStorage.getItem('userName');
userInfo.passWord = localStorage.getItem('passWord');
router.beforeEach((to, from, next) => {
    store.dispatch('getRoute', to.path);
    next();
});
localStorage.removeItem('xs_token');

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');