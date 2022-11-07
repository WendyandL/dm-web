<template>
  <el-menu :default-active="currentPath" class="el-menu-admin" router mode="vertical"
           background-color="#67AFDF" text-color="#FFFFFF" active-text-color="#3C3C3C" :collapse="isCollapse">
    <div style="height: 80px;"></div>
    <template>
      <el-submenu v-for="(item,i) in adminMenus" :key="i" :index="(i).toString()" style="text-align: left">
      <span slot="title" style="font-size: 17px;">
        <i :class="item.iconCls"></i>
        {{ item.nameZh }}
      </span>
        <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
          <i :class="child.icon"></i>
          {{ child.nameZh }}
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    adminMenus () {
      return this.$store.state.adminMenus
    },
    currentPath () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.el-menu-admin {
  border-radius: 5px;
  height: 100%;
}
</style>
