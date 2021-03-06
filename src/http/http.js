import {
  request
} from 'axios-add-jsonp';

import router from '@/router';
// See doc: https://www.npmjs.com/package/axios-add-jsonp

// http request 请求拦截器，有token值则配置上token值
request.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      config.headers.Authorization = token;
    }
    
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
request.interceptors.response.use(
  response => {
    switch (response.code) {
      case '401':
        // 这里写清除token的代码
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          } //登录成功后跳入浏览的当前页面
        })
    }

    return response;
  },
  error => {
    return Promise.reject(error)
  });

export function getApiXxx() {
  return request.get('/api/xxx')
}

// 获取用户信息
export function getUser(data = {}) {
  return request.get('/api/user', data)
}

//下单信息
export function renewOrderInfo(data = {}) {
  return request.get('/api/renewOrderInfo', data)
}
//代金券信息
export function cashCardList(data = {}) {
  return request.get('/api/cashCardList', data)
}
// 添加代金券
export function cashCardAdd(data = {}) {
  return request.post('/api/cashCardAdd', data)
}
// 提交订单
export function renewOrderPay(data = {}) {
  return request.post('/api/renewOrderPay', data)
}
