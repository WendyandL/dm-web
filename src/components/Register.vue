<template>
  <body id="paper">
  <el-form class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">用户注册</h3>
    <el-form-item>
      <el-input type="text" v-model="registerForm.username"
                auto-complete="off" placeholder="用户名">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="registerForm.password"
                auto-complete="off" placeholder="密码">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="registerForm.email" auto-complete="off" placeholder="邮箱">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="registerForm.phone" auto-complete="off" placeholder="手机号">
      </el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="register">注册</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  data () {
    return {
      checked: true,
      registerForm: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      loading: false
    }
  },
  methods: {
    register () {
      const _this = this
      this.$axios
        .post('/register', {
          username: this.registerForm.username,
          password: this.registerForm.password,
          email: this.registerForm.email,
          phone: this.registerForm.phone
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('注册成功！', '提示', {
              confirmButtonText: '确定'
            })
            _this.$router.replace('/login')
          } else {
            this.$alert(resp.data.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style>
#paper {
  background: url("../assets/bg.jpeg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body{
  margin: -5px 0;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
