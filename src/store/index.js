import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
      userId: '',
      userDepartmentName: '', // 通过查找设置初值
      userDepartmentId: ''
    },
    adminMenus: []
  },
  mutations: {
    login (state, user) {
      state.adminMenus = []
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    },
    logout (state) {
      state.user.username = ''
      window.localStorage.removeItem('username')
      state.adminMenus = []
    }
  }
})
