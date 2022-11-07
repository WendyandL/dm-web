<template>
  <div style="justify-content: center">
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form v-model="selectedUser" style="text-align:left" ref="dataForm">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="selectedUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="selectedUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="selectedUser.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色分配" label-width="120px">
          <el-checkbox-group v-model="selectedRolesIds">
            <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{ role.nameZh }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="onSubmit(selectedUser)">确定</el-button>
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0 0 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <user-add @onSubmit="listUsers()"></user-add>
    <el-card>
      <el-form>
        <el-row>
          <el-col :span=8>
            <el-form-item style="text-align: right">用户名：</el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item>
              <el-input v-model="userName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button size="small" type="primary" icon="el-icon-search" @click="listUsers">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-delete" @click="resetKeyword">清空</el-button>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="username" label="用户名" fit></el-table-column>
        <el-table-column prop="email" label="邮箱" fit></el-table-column>
        <el-table-column prop="phone" label="手机号" fit></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#409EFF"
              inactive-color="#FF0000"
              @change="(value) => commitStatusChange(value, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUser(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteUser(scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import UserAdd from './UserAdd'
export default {
  name: 'UserShow',
  components: {UserAdd},
  data () {
    return {
      dialogFormVisible: false,
      selectedUser: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      department: [],
      roles: [],
      users: [],
      // 当前用户的角色id
      selectedRolesIds: [],
      userName: ''
    }
  },
  mounted () {
    this.listUsers()
    this.listRoles()
  },
  methods: {
    listUsers () {
      const _this = this
      this.$axios.get('/system/user', {
        params: {
          username: this.userName
        }
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          _this.users = resp.data.result
        }
      })
    },
    resetKeyword () {
      this.userName = ''
      this.listUsers()
      this.listRoles()
    },
    listRoles () {
      const _this = this
      this.$axios.get('/system/roleU').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.roles = resp.data.result
        }
      })
    },
    commitStatusChange (value, user) {
      if (user.username !== 'admin') {
        this.$axios.put('/system/user/status', {
          enabled: value,
          username: user.username
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            if (value) {
              this.$message('用户 [' + user.username + '] 已启用！')
            } else {
              this.$message('用户 [' + user.username + '] 已禁用！')
            }
          }
        })
      } else {
        user.enabled = true
        this.$alert('不能禁用admin用户！')
      }
    },
    editUser (user) {
      this.dialogFormVisible = true
      this.selectedUser = user
      let roleIds = []
      for (let i = 0; i < user.roles.length; i++) {
        roleIds.push(user.roles[i].id)
      }
      this.selectedRolesIds = roleIds
    },
    onSubmit (user) {
      let _this = this
      let roles = []
      for (let i = 0; i < _this.selectedRolesIds.length; i++) {
        for (let j = 0; j < _this.roles.length; j++) {
          if (_this.selectedRolesIds[i] === _this.roles[j].id) {
            // 把一个用户 可能修改过的角色 存到roles里
            roles.push(_this.roles[j])
          }
        }
      }
      this.$axios.put('/system/user', {
        username: user.username,
        email: user.email,
        phone: user.phone,
        roles: roles
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('用户信息修改成功！')
          this.dialogFormVisible = false
          this.listUsers()
        } else {
          this.$alert(resp.data.msg)
        }
      })
    },
    deleteUser (user) {
      this.$confirm('是否删除此用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/system/user/delete', {
          employeeId: user.employeeId
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            this.$alert('删除成功！')
            this.listUsers()
          } else {
            this.$alert(resp.data.msg)
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
