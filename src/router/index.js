import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/views/AppIndex'
import Login from '../components/Login'
import Home from '../components/Home'
import Register from '../components/Register'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      name: 'index',
      redirect: '/index',
      component: AppIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
