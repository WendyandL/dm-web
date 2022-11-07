<template>
  <el-container id="admin-body">
    <el-header style="z-index: 1;height: 80px;margin-left: -20px">
      <Head style="position: absolute;width: 98%;background-color: white"></Head>
    </el-header>
    <el-container>
      <el-aside style="height: 112%;margin-top: -80px;width: 200px">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from './Menu'
import Head from './Head'

export default {
  name: 'Home',
  components: {Menu, Head}
}
</script>

<style scoped>
#admin-body {
  height: 95vh;
}
</style>
