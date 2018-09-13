/* 
解决输入框获取焦点将底部tab顶上来的问题
*/
$(function(){
  var oHeight = $(window).height(); //浏览器当前的高度  
  $(window).resize(function () {
    if ($(window).height() < oHeight) {
      $(".tab").css("position", "static");
    } else {
      $(".tab").css("position", "fixed");
    }
  });
});

import router from '../../router';

import store from '../../store';
import api from 'service/api.js';
import http from 'service/http.js';
import { Toast } from 'mint-ui';
export default{

    domain: Object.is(process.env.NODE_ENV, 'production') ? "http://"+document.domain+"/h5?v=3#" : "http://vue.feihuo.com#",
    goGameUrl: "http://"+document.domain+"/h5/play",
    /*  
    跳转外部打开游戏统一接口
    type 是否需要登陆，1：不需要（默认），2：需要。
    */ 
    openurlW(url,type=1,isLogin=false){
      if(type === 2 && !isLogin){
        store.commit('setCurrentPath',location.href);
        store.commit('changeshow');
      }else{
        window.location.href = url;
      }
        // window.location.href = url;
        // window.open(url,'_self');
    },
    /* 省略号
    maxstr:保留的字符个数，
    text：需要处理的字符串 */
    ellipsis(maxstr,text){
        if(text.length>maxstr){ 
          return text.substr(0,maxstr)+'...';
        }else{
          return text;
        }
    },
    /* 处理手机号1333333333处理为133*****33 */
    tophone(phone){
      let str1 = phone.toString().substring(0,3);
      let str2 = phone.toString().substring(9);
      return str1+"******"+str2;
    },
    //判断是否是微信浏览器的函数
    isWeiXin(){
      //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
      var ua = window.navigator.userAgent.toLowerCase();
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
      }else{
        return false;
      }
    },
    login(type) { //第三方登陆
     if(type === 1){
       this.fetchData(api.getThirdLoginUrl, {
         type: 1,
         returnUrl: encodeURI(store.state.currentPath)
       }).then(e => {
        //  window.open(e);
         location.href = e.data;
       });
     }else{
        this.fetchData(api.getThirdLoginUrl, {
         type: 2,
         returnUrl: encodeURI(store.state.currentPath)
       }).then(e => {
        store.commit('changeshow');
        store.commit('changeLogin');
        location.href = e.data;
       });
     }
   },
   fetchData: async function(url, data) {//获取数据
    const res = await http.post(url, data);
    // console.log(res.data);
    // if(res.data.hasOwnProperty('success') && !res.data.success){
    //   // console.log('fdfsdf')
    //   Toast({
    //     message: res.data.msg,
    //     position: 'middle',
    //     duration: 1000
    //   });
    // }
    return new Promise(resolve => {
      resolve(res.data);
    });
  },
  isMobile(mobile){
    let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    return reg.test(mobile);
  },
  isIdCard(IdCard){
    let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    return reg.test(IdCard);
  },
  isName(name){
    let reg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/; 
    return reg.test(name);
  },
  // 格式化html字符串
  removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/ /ig,'');//去掉空格
    return str;
  }
}