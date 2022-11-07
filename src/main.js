import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dataV from '@jiaminghi/data-view'

// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/chart-bar.js'
import 'vue-awesome/icons/chart-area.js'
import 'vue-awesome/icons/chart-pie.js'
import 'vue-awesome/icons/chart-line.js'
import 'vue-awesome/icons/align-left.js'

// 适配flex
import '@/utils/flexible.js'

// 引入全局css
// import './assets/scss/style.scss'

// 引入echart
import echarts from 'echarts'
import 'echarts/map/js/china.js'

Vue.use(ElementUI)
Vue.use(dataV)
// 全局注册图标
Vue.component('icon', Icon)
Vue.prototype.$echarts = echarts

// 设置反向代理，前端请求默认发送到 http://localhost:8444/api
const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8444/api'
axios.defaults.withCredentials = false
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (store.state.user.username) {
    initAdminMenu(router, store)
  }
  if (to.meta.requireAuth) {
    if (store.state.user) {
      axios.get('/authentication?user=' + store.state.user.username).then(resp => {
        if (resp.data.code === 200) {
          next()
        }
      })
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
const initAdminMenu = (route, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/menu?username=' + store.state.user.username).then(resp => {
    if (resp && resp.status === 200) {
      // store.state.adminMenus = resp.data.result
      var fmtRoutes = formatRoutes(resp.data.result)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}
const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      meta: {
        requireAuth: true
      },
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
