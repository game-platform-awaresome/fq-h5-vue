'use strict'

import axios from 'axios';
import qs from 'qs';
import apiConfig from '../../config/api.config';
import router from 'router';
import { Toast } from 'mint-ui';
import store from '../store';

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // console.log(response);
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  // console.log(res);
  if (res.status === -404) {
    // alert(res.msg)
    store.commit('setCurrentPath',location.href);
    router.push('404');
  }
  if (res.data.hasOwnProperty('success') && (!res.data.success)) {//res.code != 2礼包已领过  && res.data.code != 2
    Toast({
      message: res.data.msg,
      position: 'middle',
      duration: 1000
    });
  }
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      // baseURL: apiConfig.baseUrl,
      url,
      data: qs.stringify(data),
      timeout: 20000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      withCredentials: true // 允许携带cookie
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      // baseURL: apiConfig.baseUrl,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        // response = eval( '(' + response.data +')')
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  ajax(url,data){
    return new Promise((resolve,reject)=>{
      $.ajax({
        url,
        type:'POST',
        data,
        dataType:'jsonp',
        success:function(data){
          resolve({
            status:200,
            data:data
          });

        },
        error:function(err){
          resolve({
            status:404,
            data:err
          });
        }
      })
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
