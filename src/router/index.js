import Vue from 'vue';
import Router from 'vue-router';
// import index from '@/components/index';
// import home from '@/components/home/index';//首页
// import more from '@/components/more/index';//更多
// import found from '@/components/found/index';//发现
// import detail from '@/components/detail/index';//详情
// import gameLibrary from '@/components/gameLibrary/index';//游戏库
// import search from '@/components/search/index';//搜索
import error from '@/components/comm/404.vue';//联网失败
// import personalCenter from '@/components/more/personalCenter/index.vue';//个人中心
// import rna from '@/components/more/personalCenter/rna.vue';//实名认证
// import phone from '@/components/more/personalCenter/phone.vue';//手机绑定
// import register from '@/components/comm/register/index.vue';//注册
// import login from '@/components/comm/login/index.vue';//登录
//! import login1 from '@/components/comm/login/login1.vue';//登录
// import voucher from '@/components/more/voucher.vue';//代金券
// import taskCenter from '@/components/more/taskCenter.vue';//任务中心
// import invite from '@/components/comm/invite.vue';//邀请页面
// import gameList from '@/components/gameList/index.vue';//游戏列表页面
// import articleList from '@/components/articleList/index.vue';//文章列表页面
// import articleDetail from '@/components/articleDetail/index.vue';//文章详情页面
// import openService from '@/components/openService/index';//开服页面
// import inforList from '@/components/inforList/index';//资讯列表
// import inforDetail from '@/components/inforDetail/index';//资讯详情


const index = () => import(/* webpackChunkName: "index" */ '@/components/index')
const home = () => import(/* webpackChunkName: "home" */ '@/components/home/index')
const more = () => import(/* webpackChunkName: "more" */ '@/components/more/index')
const found = () => import(/* webpackChunkName: "found" */ '@/components/found/index')
const detail = () => import(/* webpackChunkName: "detail" */ '@/components/detail/index')
const gameLibrary = () => import(/* webpackChunkName: "gameLibrary" */ '@/components/gameLibrary/index')
const search = () => import(/* webpackChunkName: "search" */ '@/components/search/index')
const personalCenter = () => import(/* webpackChunkName: "personalCenter" */ '@/components/more/personalCenter/index.vue')
const rna = () => import(/* webpackChunkName: "search" */ '@/components/more/personalCenter/rna.vue')
const phone = () => import(/* webpackChunkName: "search" */ '@/components/more/personalCenter/phone.vue')
const register = () => import(/* webpackChunkName: "search" */ '@/components/comm/register/index.vue')
const login = () => import(/* webpackChunkName: "search" */ '@/components/comm/login/index.vue')
const voucher = () => import(/* webpackChunkName: "search" */ '@/components/more/voucher.vue')
const taskCenter = () => import(/* webpackChunkName: "search" */ '@/components/more/taskCenter.vue')
const invite = () => import(/* webpackChunkName: "more" */ '@/components/comm/invite.vue')
const gameList = () => import(/* webpackChunkName: "more" */ '@/components/gameList/index.vue')
// const articleList = () => import(/* webpackChunkName: "more" */ '@/components/articleList/index.vue')
// const articleDetail = () => import(/* webpackChunkName: "more" */ '@/components/articleDetail/index.vue')
const openService = () => import(/* webpackChunkName: "more" */ '@/components/openService/index.vue')
const inforList = () => import(/* webpackChunkName: "more" */ '@/components/inforList/index.vue')
const inforDetail = () => import(/* webpackChunkName: "more" */ '@/components/inforDetail/index.vue')


import store from '../store';
import fn from 'js/main.js';
import api from 'service/api';
import http from 'service/http';
Vue.use(Router)

const route = new Router({
  linkActiveClass:"active",
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {
          path: '',
          redirect:'/home'
        },
        {
          path: '/home',
          name: '飞火微游戏',
          component: home,
          meta:{ keepAlive: true }
        },
        {
          path: '/more',
          name: '更多',
          component: more,
          meta:{ keepAlive: true },
          beforeEnter: (to,from,next) =>{
            if(store.state.isLogin){
              document.title = to.name;
              next();
            }else{
              store.commit('setCurrentPath',fn.domain+to.path);
              store.commit('changeshow');
            }
          }
        },
        {
          path: '/found',
          name: '发现',
          component: found,
          meta:{ keepAlive: true }
        },
        {
          path: '/openService',
          name: '开服',
          component: openService,
          meta:{ keepAlive: true }
        }
      ],
      meta:{ keepAlive: true }
    },
    {
      path: '/detail',
      name: '',
      component: detail,
      meta:{ keepAlive: false },
      beforeEnter:(to,from,next)=>{
        if(from.name === 'articleList'){
          to.meta.keepAlive = true;
        }else{
          to.meta.keepAlive = false;
        }
        next();
      }
    },
    {
      path: '/search',
      name: '搜索游戏',
      component: search,
      meta:{ keepAlive: true },
      beforeEnter:(to,from,next)=>{
        if(from.name === 'detail'){
          to.meta.keepAlive = true;
        }else{
          to.meta.keepAlive = false;
        }
        next();
      }
    },
    {
      path: '/gameLibrary',
      name: '游戏库',
      component: gameLibrary,
      meta:{ keepAlive: true },
      beforeEnter:(to,from,next)=>{
        if(from.name === 'home'){
          to.meta.keepAlive = false;
        }else{
          to.meta.keepAlive = true;
        }
        next();
      }
    },
    {
      path: '/404',
      name: '',
      component: error,
      meta:{ keepAlive: false }
    },
    {
      path: '/personalCenter',
      name: '个人中心',
      component: personalCenter,
      meta:{ keepAlive: false },
      beforeEnter:(to,from,next)=>{
        if(from.path ==='/more' || from.path === '/rna' || from.path  === '/phone'){
          next();
        }else{
          next('/more');
        }
      }
    },
    {
      path: '/rna',
      name: '实名认证',
      component: rna,
      meta:{ keepAlive: false },
      beforeEnter:(to,from,next)=>{
        if(from.path != '/personalCenter'){
          next('/more');
        }else{
          next();
        }
      }
    },
    {
      path: '/phone',
      name: '绑定手机',
      component: phone,
      meta:{ keepAlive: false },
      beforeEnter:(to,from,next)=>{
        if(from.path != '/personalCenter'){
          next('/more');
        }else{
          next();
        }
      }
    },
    {
      path: '/register',
      name: '注册',
      component: register,
      meta:{ keepAlive: false }
    },
    {
      path: '/login',
      name: '登录',
      component: login,
      meta:{ keepAlive: false }
    },
    {
      path: '/voucher',
      name: '代金券',
      component: voucher,
      meta:{ keepAlive: false },
      beforeEnter:(to,from,next)=>{
        if(from.path != '/more'){
          next('/more');
        }else{
          next();
        }
      }
    },
    {
      path: '/invite',
      name: '邀请',
      component: invite,
      meta:{ keepAlive: false }
    },
    {
      path: '/more/taskCenter',
      name: '任务中心',
      component: taskCenter,
      meta:{ keepAlive: false }
    },
    {
      path: '/gameList',
      name: '',
      component: gameList,
      meta:{ keepAlive: false }
    },
    // {
    //   path: '/articleList',
    //   name: '相关文章',
    //   component: articleList,
    //   meta:{ keepAlive: false }
    // }
    // ,
    // {
    //   path: '/articleDetail',
    //   name: '相关文章',
    //   component: articleDetail,
    //   meta:{ keepAlive: false }
    // },
    {
      path: '/inforList',
      name: '飞火资讯',
      component: inforList,
      meta:{ keepAlive: false }
    }
    ,
    {
      path: '/inforDetail',
      name: '飞火资讯',
      component: inforDetail,
      meta:{ keepAlive: false }
    }
  ]
});

route.beforeEach((to, from, next) => {
  if(to.path === '/more' && !store.state.isLogin){
    fn.fetchData(api.getSpecialSign,{sign:'isLogin-hasDiscovery'}).then(e=>{
      store.commit('setLogin',e.data.isLogin);
      // console.log(store.state.isLogin)
      next();
    });
  }else{
    document.title = to.name;
    next();
  }
});

export default route;
