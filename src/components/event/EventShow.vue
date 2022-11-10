<template>
  <div style="justify-content: center">
    <el-dialog :visible.sync="previewDialog" width="50%" center>
      <div>{{detail}}</div>
    </el-dialog>
    <el-row style="margin: 18px 0 20px 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>突发事件</el-breadcrumb-item>
        <el-breadcrumb-item>突发事件管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card>
      <el-form>
        <el-row>
          <el-col :span=2>
            <el-form-item>事件名称：</el-form-item>
          </el-col>
          <el-col :span=10>
            <el-form-item>
              <el-input v-model="nameKeyword"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=2>
            <el-form-item>事件类型:</el-form-item>
          </el-col>
          <el-col :span=10>
            <el-form-item>
              <el-input v-model="typeKeyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      <el-button size="small" type="primary" icon="el-icon-search" @click="loadInfo">搜索</el-button>
      <el-button size="small" type="primary" icon="el-icon-delete" @click="resetKeyword">清空</el-button>
      </el-form>
    </el-card>
    <div>
      <el-card>
        <el-table :data="events" style="width: 100%">
          <el-table-column prop="id" label="序号" v-if="false"></el-table-column>
          <el-table-column prop="eventName" label="事件名称" fit></el-table-column>
          <el-table-column prop="eventTime" label="事件时间" fit></el-table-column>
          <el-table-column prop="eventLocation" label="事件位置" fit></el-table-column>
          <el-table-column prop="eventType" label="事件类型" fit></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
            </template>
          </el-table-column>
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
  name: 'EventShow',
  data () {
    return {
      events: [],
      currentPage: 1,
      totalCount: 0,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      nameKeyword: '',
      typeKeyword: '',
      detail: '',
      previewDialog: false
    }
  },
  mounted () {
    this.loadInfo()
  },
  methods: {
    loadInfo () {
      const _this = this
      this.$axios
        .get('/event/search', {
          params: {
            nameKeyword: this.nameKeyword,
            typeKeyword: this.typeKeyword,
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.events = resp.data.result.content
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
      this.currentPage = 1
      this.pageSize = 10
      this.loadInfo()
    },
    showDetail (event) {
      this.detail = event.eventUrl
      this.previewDialog = true
    }
  }
}
</script>

<style scoped>

</style>
