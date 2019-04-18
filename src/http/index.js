import * as http from './http'

export const $http = http

export default {
  install (Vue, options) {
    Vue.prototype.$http = http
  }
}
