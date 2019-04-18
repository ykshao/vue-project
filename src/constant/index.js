import * as constant from './const'

export const $constant = constant

export default {
  install (Vue, options) {
    Vue.prototype.$constant = constant
  }
}
