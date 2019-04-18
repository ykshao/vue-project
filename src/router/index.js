import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [{
  path: '/',
  name: 'home',
  component: () => import('@/views/home')
},{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login')
},{
  path: '/admin',
  name: 'admin',
  meta: {
    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('@/views/admin')
}]

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

/**
 * 添加路由守卫
 */
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    let token = localStorage.getItem("token");
    // if (store.state.token) {
    // 通过vuex state获取当前的token是否存在
    if (token) {
      next();
    } else {
      next({
        name: 'login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})

export default router
