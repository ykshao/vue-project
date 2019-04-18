import Vue from 'vue'
import Vuex from 'vuex'
import {
  $http
} from '@/http'

Vue.use(Vuex)

const state = {
  //用户信息
  user: {},
  // 添加代金券
  addVoucherData: {},
  //代金券信息
  voucherData: [],
  //提交订单
  orderData: {},
}

const mutations = {
  m_user_plus(state, data) {
    state.user = data
  },
  // 添加代金券
  post_cashCardAdd(state, data) {
    state.addVoucherData = data
  },
  //获取代金券信息
  get_voucher(state, data) {
    state.voucherData = data
  },
  // 提交订单
  post_order(state, data) {
    state.orderData = data
  }
}

const actions = {
  user_plus(context, data) {
    return new Promise((resolve, reject) => {
      $http.getUser(data).then(res => {
        context.commit('m_user_plus', res.data)
        resolve(res)
      }, err => {
        alert("网络失踪了，请检查你的网络环境")
      })
    })
  },
  //添加代金券
  data_cashCardAdd(context, data) {
    return new Promise((resolve, reject) => {
      $http.cashCardAdd(data).then(res => {
        context.commit('post_cashCardAdd', res.data)
        resolve(res)
      }, err => {
        alert("网络失踪了，请检查你的网络环境")
      })
    })
  },
  //获取代金券信息
  data_voucher(context, data) {
    return new Promise((resolve, reject) => {
      $http.cashCardList(data).then(res => {
        context.commit('get_voucher', res.data)
      }, err => {
        alert('网络失踪了，请检查你的网络环境01')
        console.log(err)
      })
    })
  },
  //提交订单
  data_order(context, data) {
    return new Promise((resolve, reject) => {
      $http.renewOrderPay(data).then(res => {
        context.commit('renewOrderPay', res.data)
        resolve(res)
      }, err => {
        alert("网络失踪了，请检查你的网络环境")
      })
    })
  }
}

const getters = {}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
