// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.prototype.router = router;

Vue.config.productionTip = false

// 引入mint-ui
import MintUI from 'mint-ui';

// 引入初始化样式
import  'style/index.less';

// 引入淘宝lib-flexible
import 'lib-flexible';

// 插件 图片加载以及加载失败
Vue.use(MintUI, {
  lazyload: {
    preLoad: 1.3,
    error: require('img/fail.png'),
    loading: require('img/default.png'),
    attempt: 1,
  }
});

// 引入jq
import $ from 'jquery';
// 引入自己的js
import fn from 'js/main.js';
Vue.prototype.$fn = fn;
// 引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
require('js/jquery.easing.js');
// 引入mockjs
process.env.MOCK && require('@/util/mock');

// 引入复制粘贴插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

import store from './store';

import api from 'service/api';
import http from 'service/http';
Vue.prototype.$api = api;
Vue.prototype.$http = http;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
