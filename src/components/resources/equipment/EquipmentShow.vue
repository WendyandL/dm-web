<template>
  <div style="justify-content: center">
    <el-row style="margin: 18px 0 20px 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急资源</el-breadcrumb-item>
        <el-breadcrumb-item>应急装备管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card>
      <el-form>
        <el-row>
          <el-col :span=2>
            <el-form-item>装备名称：</el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item>
              <el-input v-model="nameKeyword"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=2>
            <el-form-item>装备类型：</el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item>
              <el-input v-model="typeKeyword"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=2>
            <el-form-item>队伍名称：</el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item>
              <el-input v-model="teamKeyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button size="small" type="primary" icon="el-icon-search" @click="loadInfo">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-delete" @click="resetKeyword">清空</el-button>
      </el-form>
    </el-card>
    <div>
      <el-card>
        <el-table :data="equipments" style="width: 100%">
          <el-table-column prop="id" label="序号" v-if="false"></el-table-column>
          <el-table-column prop="equipName" label="装备名称" fit></el-table-column>
          <el-table-column prop="equipType" label="装备类型" fit></el-table-column>
          <el-table-column prop="equipNum" label="装备数量" fit></el-table-column>
          <el-table-column prop="equipUnit" label="计量单位" fit></el-table-column>
          <el-table-column prop="equipParam" label="装备参数" fit></el-table-column>
          <el-table-column prop="equipAddress" label="储备地址" fit></el-table-column>
          <el-table-column prop="teamName" label="所属队伍" fit></el-table-column>
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
  name: 'EquipmentShow',
  data () {
    return {
      equipments: [],
      currentPage: 1,
      totalCount: 0,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      nameKeyword: '',
      typeKeyword: '',
      teamKeyword: ''
    }
  },
  mounted () {
    this.loadInfo()
  },
  methods: {
    loadInfo () {
      const _this = this
      this.$axios
        .get('/resources/equip/search', {
          params: {
            nameKeyword: this.nameKeyword,
            typeKeyword: this.typeKeyword,
            teamKeyword: this.teamKeyword,
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
        }).then(resp => {
          if (resp && resp.status === 200) {
            console.log(resp)
            _this.equipments = resp.data.result.content
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
      this.teamKeyword = ''
      this.currentPage = 1
      this.pageSize = 10
      this.loadInfo()
    }
  }
}
</script>

<style scoped>

</style>
