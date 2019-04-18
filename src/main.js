import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import http from '@/http'
import constant from '@/constant'
import Layout from '@/components/layout'
import '@/stylesheet'

if (__isWap) {  // eslint-disable-line no-undef
  // require('@/common/flexible')
}

Vue.use(http)
Vue.use(constant)

const app = new Vue({
  router,
  store,
  render: h => h(Layout)
})

app.$mount('#app')

if (module.hot) {
  module.hot.accept();
}
