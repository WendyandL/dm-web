<template>
  <div style="justify-content: center">
    <el-row style="margin: 18px 0 20px 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急资源</el-breadcrumb-item>
        <el-breadcrumb-item>应急物资管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card>
      <el-form>
        <el-row>
          <el-col :span=2>
            <el-form-item>物资名称：</el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item>
              <el-input v-model="nameKeyword"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=2>
            <el-form-item>物资类型：</el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item>
              <el-select v-model="typeKeyword" style="width: 268px">
                <el-option label="救灾物资" value="救灾物资"></el-option>
                <el-option label="防汛物资" value="防汛物资"></el-option>
                <el-option label="安全生产" value="安全生产"></el-option>
                <el-option label="森林防火" value="森林防火"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=2>
            <el-form-item>仓库名称：</el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item>
              <el-input v-model="whKeyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button size="small" type="primary" icon="el-icon-search" @click="loadInfo">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-delete" @click="resetKeyword">清空</el-button>
      </el-form>
    </el-card>
    <div>
      <el-card>
        <el-table :data="supplies" style="width: 100%">
          <el-table-column prop="id" label="序号" v-if="false"></el-table-column>
          <el-table-column prop="supplyName" label="物资名称" fit></el-table-column>
          <el-table-column prop="supplyNum" label="物资数量" fit></el-table-column>
          <el-table-column prop="supplyUnit" label="计量单位" fit></el-table-column>
          <el-table-column prop="supplyType" label="物资类型" fit></el-table-column>
          <el-table-column prop="whName" label="所属仓库" fit></el-table-column>
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
  name: 'SupplyShow',
  data () {
    return {
      supplies: [],
      currentPage: 1,
      totalCount: 0,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      nameKeyword: '',
      typeKeyword: '',
      whKeyword: ''
    }
  },
  mounted () {
    this.loadInfo()
  },
  methods: {
    loadInfo () {
      const _this = this
      this.$axios
        .get('/resources/supply/search', {
          params: {
            nameKeyword: this.nameKeyword,
            typeKeyword: this.typeKeyword,
            whKeyword: this.whKeyword,
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
        }).then(resp => {
          if (resp && resp.status === 200) {
            console.log(resp)
            _this.supplies = resp.data.result.content
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
      this.typeKeyword = ''
      this.whKeyword = ''
      this.currentPage = 1
      this.pageSize = 10
      this.loadInfo()
    }
  }
}
</script>

<style scoped>

</style>
