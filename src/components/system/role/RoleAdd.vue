<template>
  <div style="text-align: left">
    <el-button type="primary" icon="el-icon-service" style="margin: 18px 0 20px 18px" @click="dialogFormVisible=true">添加角色</el-button>
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible" @close="clear" width="25%">
      <el-form :model="roleForm" label-position="left" label-width="0px">
        <el-form-item>
          <el-input type="text" v-model="roleForm.name" auto-complete="off" placeholder="角色名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="roleForm.nameZh" auto-complete="off" placeholder="角色描述"></el-input>
        </el-form-item>
        <el-form-item style="justify-content: center;display: flex">
          <el-button type="primary" v-on:click="createRole" style="margin-right: 20px">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleAdd',
  data () {
    return {
      dialogFormVisible: false,
      roleForm: {
        name: '',
        nameZh: ''
      }
    }
  },
  methods: {
    clear () {
    },
    createRole () {
      this.$axios.post('/system/role', {
        name: this.roleForm.name,
        nameZh: this.roleForm.nameZh
      })
        .then(resp => {
          if (resp && resp.data.code === 200) {
            this.$alert(resp.data.result, '提示', {
              confirmButtonText: '确定'
            })
            this.clear()
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        }).catch(failResponse => {})
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
