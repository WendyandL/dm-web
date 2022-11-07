<template>
  <div style="justify-content: center">
    <el-dialog :visible.sync="pdfPreviewDialog" width="50%" center>
      <div class="pdf">
        <pdf :src="src" :page="currentPdf" @num-pages="pageCount=$event"
             @page-loaded="currentPdf=$event" @loaded="loadPdfHandler"></pdf>
        <p class="arrow" style="text-align: center">
          <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPdf==1}">上一页</span>
          {{currentPdf}} / {{pageCount}}
          <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPdf==pageCount}">下一页</span>
        </p>
<!--      <pdf :src="src" style="width:100%" ref="pdf"></pdf>-->
        </div>
    </el-dialog>
    <el-row style="margin: 18px 0 20px 18px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>应急资源</el-breadcrumb-item>
        <el-breadcrumb-item>应急预案管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card>
      <el-form>
        <el-row>
          <el-col :span=10>
            <el-form-item style="text-align: right">预案名称：</el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item>
              <el-input v-model="nameKeyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button size="small" type="primary" icon="el-icon-search" @click="loadInfo">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-delete" @click="resetKeyword">清空</el-button>
      </el-form>
    </el-card>
    <div>
      <el-card>
        <el-table :data="plans" style="width: 100%">
          <el-table-column prop="id" label="序号" v-if="false"></el-table-column>
          <el-table-column prop="planName" label="预案名称" fit></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="showPDF(scope.row)" type="text" size="small">预览</el-button>
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
import pdf from 'vue-pdf'

export default {
  name: 'PlanShow',
  components: {
    pdf
  },
  data () {
    return {
      plans: [],
      currentPage: 1,
      totalCount: 0,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      nameKeyword: '',
      pdfUrl: '',
      src: '',
      pdfPreviewDialog: false,
      currentPdf: 1,
      pageCount: 0
    }
  },
  mounted () {
    this.loadInfo()
  },
  methods: {
    loadInfo () {
      const _this = this
      this.$axios
        .get('/resources/plan/search', {
          params: {
            nameKeyword: this.nameKeyword,
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.plans = resp.data.result.content
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
      this.currentPage = 1
      this.pageSize = 10
      this.loadInfo()
    },
    showPDF (plan) {
      this.pdfUrl = plan.planURL
      this.src = pdf.createLoadingTask(this.pdfUrl)
      this.currentPdf = 1
      this.pdfPreviewDialog = true
    },
    changePdfPage (val) {
      if (val === 0 && this.currentPdf > 1) {
        this.currentPdf--
      }
      if (val === 1 && this.currentPdf < this.pageCount) {
        this.currentPdf++
      }
    },
    loadPdfHandler () {
      this.currentPdf = 1 // 加载的时候先加载第一页
    }
  }
}
</script>

<style scoped>

</style>
