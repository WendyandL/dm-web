<template>
  <div style="justify-content: center">
    <el-row style="margin: 18px 0 20px 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急资源</el-breadcrumb-item>
        <el-breadcrumb-item>应急队伍管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card>
      <el-form>
        <el-row>
          <el-col :span=2>
            <el-form-item>队伍名称：</el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item>
              <el-input v-model="nameKeyword"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=2>
            <el-form-item>队伍级别:</el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item>
              <el-select v-model="levelKeyword" style="width: 268px">
                <el-option label="市级" value="市级"></el-option>
                <el-option label="区县级" value="区县级"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=2>
            <el-form-item>主管单位：</el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item>
              <el-input v-model="departKeyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button size="small" type="primary" icon="el-icon-search" @click="loadInfo">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-delete" @click="resetKeyword">清空</el-button>
      </el-form>
    </el-card>
    <div>
      <el-card class="box-card2">
        <el-table :data="teams" style="width: 100%">
          <el-table-column prop="id" label="序号" v-if="false"></el-table-column>
          <el-table-column prop="teamName" label="队伍名称" fit></el-table-column>
          <el-table-column prop="teamLevel" label="队伍级别" fit></el-table-column>
          <el-table-column prop="teamDepart" label="主管单位" fit></el-table-column>
          <el-table-column prop="teamHotline" label="值班电话" fit></el-table-column>
          <el-table-column prop="teamContact" label="联系人" fit></el-table-column>
          <el-table-column prop="teamCtel" label="联系人电话" fit></el-table-column>
          <el-table-column prop="teamSpecial" label="专长描述" fit></el-table-column>
          <el-table-column prop="teamAddress" label="队伍地址" fit></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="pageSizes"
                       :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="totalCount">
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamShow',
  data () {
    return {
      teams: [],
      currentPage: 1,
      totalCount: 0,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      nameKeyword: '',
      levelKeyword: '',
      departKeyword: ''
    }
  },
  mounted () {
    this.loadInfo()
  },
  methods: {
    loadInfo () {
      const _this = this
      this.$axios
        .get('/resources/team/search', {
          params: {
            nameKeyword: this.nameKeyword,
            levelKeyword: this.levelKeyword,
            departKeyword: this.departKeyword,
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.teams = resp.data.result.content
            _this.totalCount = resp.data.result.total
          }
        })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.loadInfo()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.loadInfo()
    },
    resetKeyword () {
      this.nameKeyword = ''
      this.levelKeyword = ''
      this.departKeyword = ''
      this.currentPage = 1
      this.pageSize = 10
      this.loadInfo()
    }
  }
}
</script>

<style scoped>

</style>
