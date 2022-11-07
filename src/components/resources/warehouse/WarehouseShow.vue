<template>
  <div style="justify-content: center">
    <el-row style="margin: 18px 0 20px 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急资源</el-breadcrumb-item>
        <el-breadcrumb-item>应急仓库管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card>
      <el-form>
        <el-row>
          <el-col :span=2>
            <el-form-item>仓库名称：</el-form-item>
          </el-col>
          <el-col :span=10>
            <el-form-item>
              <el-input v-model="nameKeyword"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=2>
            <el-form-item>仓库编码:</el-form-item>
          </el-col>
          <el-col :span=10>
            <el-form-item>
              <el-input v-model="codeKeyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=2>
            <el-form-item>仓库类型：</el-form-item>
          </el-col>
          <el-col :span=10>
            <el-form-item>
              <el-select v-model="typeKeyword" style="width: 450px">
                <el-option label="防汛抗旱库" value="防汛抗旱库"></el-option>
                <el-option label="救灾物资库" value="救灾物资库"></el-option>
                <el-option label="消防救援库" value="消防救援库"></el-option>
                <el-option label="森林防火库" value="森林防火库"></el-option>
                <el-option label="森林消防库" value="森林消防库"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=2>
            <el-form-item>仓库级别:</el-form-item>
          </el-col>
          <el-col :span=10>
            <el-form-item>
              <el-select v-model="levelKeyword" style="width: 450px">
                <el-option label="市级" value="市级"></el-option>
                <el-option label="省级" value="省级"></el-option>
                <el-option label="县级" value="县级"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=2>
            <el-form-item>管理机构：</el-form-item>
          </el-col>
          <el-col :span=10>
            <el-form-item>
              <el-input v-model="organKeyword"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=2>
            <el-form-item>联系人:</el-form-item>
          </el-col>
          <el-col :span=10>
            <el-form-item>
              <el-input v-model="contactKeyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button size="small" type="primary" icon="el-icon-search" @click="loadInfo">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-delete" @click="resetKeyword">清空</el-button>
      </el-form>
    </el-card>
    <div>
      <el-card>
        <el-table :data="warehouses" style="width: 100%">
          <el-table-column prop="id" label="序号" v-if="false"></el-table-column>
          <el-table-column prop="whName" label="仓库名称" fit></el-table-column>
          <el-table-column prop="whCode" label="仓库编码" fit></el-table-column>
          <el-table-column prop="whType" label="仓库类型" fit></el-table-column>
          <el-table-column prop="whLevel" label="仓库级别" fit></el-table-column>
          <el-table-column prop="whLocation" label="仓库位置" fit></el-table-column>
          <el-table-column prop="whAddress" label="详细位置" fit></el-table-column>
          <el-table-column prop="whOrganization" label="管理机构" fit></el-table-column>
          <el-table-column prop="whContact" label="联系人" fit></el-table-column>
          <el-table-column prop="whTel" label="联系人电话" fit></el-table-column>
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
  name: 'WarehouseShow',
  data () {
    return {
      warehouses: [],
      currentPage: 1,
      totalCount: 0,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      nameKeyword: '',
      codeKeyword: '',
      typeKeyword: '',
      levelKeyword: '',
      organKeyword: '',
      contactKeyword: ''
    }
  },
  mounted () {
    this.loadInfo()
  },
  methods: {
    loadInfo () {
      const _this = this
      this.$axios
        .get('/resources/warehouse/search', {
          params: {
            nameKeyword: this.nameKeyword,
            codeKeyword: this.codeKeyword,
            typeKeyword: this.typeKeyword,
            levelKeyword: this.levelKeyword,
            organKeyword: this.organKeyword,
            contactKeyword: this.contactKeyword,
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
        }).then(resp => {
          if (resp && resp.status === 200) {
            console.log(resp)
            _this.warehouses = resp.data.result.content
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
      this.codeKeyword = ''
      this.typeKeyword = ''
      this.levelKeyword = ''
      this.organKeyword = ''
      this.contactKeyword = ''
      this.currentPage = 1
      this.pageSize = 10
      this.loadInfo()
    }
  }
}
</script>

<style scoped>

</style>
