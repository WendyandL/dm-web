<template>
  <div id="myChart"></div>
</template>

<script>
export default {
  name: 'KgShow',
  data () {
    return {
      graphData: [],
      graphLinks: []
    }
  },
  mounted () {
    this.loadInfo()
  },
  methods: {
    loadInfo () {
      const _this = this
      this.$axios
        .get('/neo4j/node').then(resp => {
          if (resp && resp.status === 200) {
            _this.graphData = resp.data.result
            this.$axios
              .get('/neo4j/relation').then(resp => {
                if (resp && resp.status === 200) {
                  _this.graphLinks = resp.data.result
                  _this.drawLine()
                }
              })
          }
        })
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '应急资源知识图谱'
        },
        tooltip: {},

        series: [{
          type: 'graph', // 类型:关系图
          layout: 'force', // 图的布局，类型为力导图
          symbolSize: 40, // 调整节点的大小
          roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [2, 10],
          force: {
            repulsion: 200, // 节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
            edgeLength: 70, // 边的两个节点之间的距离，值越小则长度越长，这个距离也会受 repulsion影响。
            gravity: 0.03, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
            layoutAnimation: true // 初始化时转动动画
          },
          draggable: true,
          lineStyle: {
            normal: {
              width: 2,
              color: '#4b565b'
            }
          },
          edgeLabel: {
            normal: {
              show: true,
              formatter: function (x) {
                return x.data.name
              }
            }
          },
          label: {
            normal: {
              show: true,
              textStyle: {}
            }
          },
          data: this.graphData,
          links: this.graphLinks
        }]
      })
    }
  }
}
</script>

<style scoped>
#myChart {
  width: 100%;
  height: 100%;
}
</style>
