<template>
  <div style="text-align: left">
    <el-button type="primary" icon="el-icon-user" style="margin: 18px 0 20px 18px" @click="dialogFormVisible=true">添加用户</el-button>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="clear" width="25%">
      <el-form :model="loginForm" :rules="rules" label-position="left" label-width="0px">
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="loginForm.email" auto-complete="off" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="loginForm.phone" auto-complete="off" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item style="justify-content: center;display: flex">
          <el-button type="primary" v-on:click="register" style="margin-right: 20px">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserAdd',
  data () {
    return {
      dialogFormVisible: false,
      rules: {
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      loginForm: {
        username: '',
        password: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    clear () {
      this.loginForm = {
        username: '',
        password: '',
        email: '',
        phone: ''
      }
    },
    register () {
      this.$axios
        .post('/register', {
          username: this.loginForm.username,
          password: this.loginForm.password,
          email: this.loginForm.email,
          phone: this.loginForm.phone
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('添加成功', '提示', {
              confirmButtonText: '确定'
            })
            this.clear()
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {})
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
