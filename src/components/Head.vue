<template>
  <el-card class="admin-header">
    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">应急物资推荐系统</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>
  </el-card>
</template>

<script>
export default {
  name: 'Head',
  methods: {
    logout () {
      var _this = this
      this.$axios.get('/logout').then(resp => {
        if (resp.data.code === 200) {
          _this.$store.commit('logout')
          _this.$router.replace('/login')
          _this.$alert('成功登出！', '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.admin-header {
  height: 80px;
  opacity: 0.85;
  line-height: 40px;
  min-width: 900px;
}
.el-icon-switch-button {
  cursor: pointer;
  outline:0;
}
</style>
