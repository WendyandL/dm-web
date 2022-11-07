<template>
  <div id="rightProvince"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'RightUp',
  data () {
    return {
      myChart: {},
      pieData: [
        {
          value: 3,
          name: '市级'
        },
        {
          value: 2,
          name: '区县级'
        }
      ],
      pieName: [],
      myChartStyle: { float: 'left', width: '100%', height: '400px' } // 图表样式
    }
  },
  mounted () {
    this.initDate() // 数据初始化
    this.initEcharts()
  },
  methods: {
    initDate () {
      for (let i = 0; i < this.pieData.length; i++) {
        // this.xData[i] = i;
        // this.yData =this.xData[i]*this.xData[i];
        this.pieName[i] = this.pieData[i].name
      }
    },
    initEcharts () {
      // 饼图
      const option = {
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: '应急队伍分类统计',
          top: '0%',
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            label: {
              show: true,
              formatter: '{b} : {c}' // b代表名称，c代表对应值，d代表百分比
            },
            radius: '45%', // 饼图半径
            data: this.pieData
          }
        ]
      }
      this.myChart = echarts.init(document.getElementById('rightProvince'))
      this.myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/index.scss';

#rightProvince {
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
