<template>
  <div style="justify-content: center">
    <el-dialog title="修改角色信息" :visible.sync="dialogFormVisible">
      <el-form v-model="selectedRole" style="text-align: left" ref="dataForm">
        <el-form-item label="角色名" label-width="120px">
          <el-input v-model="selectedRole.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="selectedRole.nameZh" auto-complete="pff"></el-input>
        </el-form-item>
        <el-form-item label="功能配置" label-width="120px">
          <el-checkbox-group v-model="selectedPermsId">
            <el-checkbox v-for="(perm,i) in perms" :key="i" :label="perm.id">{{perm.desc_}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="菜单配置" label-width="120px">
          <el-tree :data="menus" :props="props" show-checkbox :default-checked-keys="selectedMenusId"
                   node-key="id" ref="tree"></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="onSubmit(selectedRole)">确定</el-button>
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0 0 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <role-add @onSubmit="listRoles()"></role-add>
    <el-card>
      <el-table :data="roles" style="width: 100%">
        <el-table-column prop="id" label="id" width="100" v-if="false"></el-table-column>
        <el-table-column prop="name" label="角色名" fit></el-table-column>
        <el-table-column prop="nameZh" label="角色描述" fit></el-table-column>
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
            <el-button type="text" size="small" @click="editRole(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import RoleAdd from './RoleAdd'
export default {
  name: 'RoleShow',
  components: {RoleAdd},
  data () {
    return {
      dialogFormVisible: false,
      roles: [],
      perms: [],
      menus: [],
      // 当前用户
      selectedRole: [],
      // 当前用户的权限
      selectedPermsId: [],
      // 当前用户的菜单
      selectedMenusId: [],
      props: {
        id: 'id',
        label: 'nameZh',
        children: 'children'
      }
    }
  },
  mounted () {
    this.listRoles()
    this.listPerms()
    this.listMenus()
  },
  methods: {
    listRoles () {
      const _this = this
      this.$axios.get('/system/role').then(resp => {
        if (resp && resp.status === 200) {
          _this.roles = resp.data.result
        }
      })
    },
    listPerms () {
      const _this = this
      this.$axios.get('/system/role/perm').then(resp => {
        if (resp && resp.status === 200) {
          _this.perms = resp.data.result
        }
      })
    },
    listMenus () {
      const _this = this
      this.$axios.get('/system/role/menus').then(resp => {
        if (resp && resp.status === 200) {
          _this.menus = resp.data.result
        }
      })
    },
    commitStatusChange (value, role) {
      if (role.id === 1) {
        role.enabled = true
        this.$alert('无法禁用管理员账户')
      } else {
        this.$confirm('是否更改角色状态？', '提示', {
          confirmButtonText: '确定',
          cancelButtonClass: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.put('/system/role/status', {
            enabled: value,
            id: role.id
          }).then(resp => {
            if (resp && resp.data.code === 200) {
              if (value) {
                this.$message('角色 [' + role.nameZh + '] 已启用')
              } else {
                this.$message('角色 [' + role.nameZh + '] 已禁用')
              }
            }
          })
        }).catch(() => {
          role.enabled = !role.enabled
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    editRole (role) {
      this.dialogFormVisible = true
      this.selectedRole = role
      let permIds = []
      for (let i = 0; i < role.perms.length; i++) {
        permIds.push(role.perms[i].id)
      }
      this.selectedPermsId = permIds
      let menuIds = []
      for (let i = 0; i < role.menus.length; i++) {
        menuIds.push(role.menus[i].id)
        for (let j = 0; j < role.menus[i].children.length; j++) {
          menuIds.push(role.menus[i].children[j].id)
        }
      }
      this.selectedMenusId = menuIds
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(menuIds)
      }
    },
    onSubmit (role) {
      let _this = this
      // 获取被选中用户的permission
      let perms = []
      for (let i = 0; i < _this.selectedPermsId.length; i++) {
        for (let j = 0; j < _this.perms.length; j++) {
          if (_this.selectedPermsId[i] === _this.perms[j].id) {
            perms.push(_this.perms[j])
          }
        }
      }
      this.$axios.put('/system/role', {
        id: role.id,
        name: role.name,
        nameZh: role.nameZh,
        enabled: role.enabled,
        perms: perms
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert(resp.data.result)
          this.dialogFormVisible = false
          this.listRoles()
        }
      })
      this.$axios.put('/system/role/menu?rid=' + role.id, {
        menusIds: this.$refs.tree.getCheckedKeys()
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          console.log(resp.data.result)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
