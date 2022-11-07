<template>
  <div id="leftLevel"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LeftUp',
  data () {
    return {
      xData: ['救灾物资库', '森林消防库', '森林防火库', '消防救援库', '防汛抗旱库'], // 横坐标
      yData: [20, 3, 3, 2, 15], // 数据
      myChartStyle: { float: 'left', width: '100%', height: '400px' } // 图表样式
    }
  },
  mounted () {
    this.initEcharts()
  },
  methods: {
    initEcharts () {
      // 基本柱状图
      const option = {
        xAxis: {
          data: this.xData,
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {},
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: '应急仓库分类统计',
          top: '0%',
          left: 'center'
        },
        series: [
          {
            type: 'bar', // 形状为柱状图
            data: this.yData
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('leftLevel'))
      myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/index.scss';

#leftLevel {
  padding: 0.2rem;
  height: 5.125rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;

  .bg-color-black {
    height: 4.8125rem;
    border-radius: 0.125rem;
  }

  .text {
    color: #c3cbde;
  }

  #parent::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  #parent {
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
