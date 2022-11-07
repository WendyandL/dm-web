<template>
  <div>
    <el-row style="margin: 18px 0px 20px 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card class="box-card1">
      <el-form v-model="lists">
        <el-form-item label="用户名">
          <el-input v-model="lists[0]" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="lists[1]" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="lists[2]" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card2">
      <el-form ref="form2" :model="form2" label-width="80px">
        <el-form-item label="修改密码">
          <el-input type="password" v-model="form2.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
          <el-button @click="Clear">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'PersonalModify',
  data () {
    return {
      lists: [],
      form2: {
        password: ''
      }
    }
  },
  mounted () {
    this.loadInfo()
  },
  methods: {
    loadInfo () {
      const _this = this
      this.$axios
        .get('/personal/info?username=' + this.$store.state.user.username, {
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.lists = resp.data
          }
        })
    },
    onSubmit () {
      const _this = this
      this.$axios
        .post('/personal/modify?name=' + this.$store.state.user.username + '&pass=' + this.form2.password, {
        }).then(resp => {
          if (resp.data.code === 200) {
            this.$alert('更改成功！', '提示', {
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
    },
    Clear () {
      this.form2 = {
        password: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
