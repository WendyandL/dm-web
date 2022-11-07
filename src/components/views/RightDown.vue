<template>
  <div id="rightCounty"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'RightDown',
  data () {
    return {
      myChart: {},
      pieData: [
        {
          value: 47,
          name: '个人防护装备'
        },
        {
          value: 2,
          name: '信号标识类器材'
        },
        {
          value: 1,
          name: '信息技术设备'
        },
        {
          value: 79,
          name: '其它应急处置装备'
        },
        {
          value: 47,
          name: '分析检测类仪器仪表'
        },
        {
          value: 20,
          name: '后勤支援装备'
        },
        {
          value: 2,
          name: '安防及反恐防暴装备'
        },
        {
          value: 2,
          name: '工程机械设备'
        },
        {
          value: 4,
          name: '工程材料'
        },
        {
          value: 1,
          name: '广播电视设备'
        },
        {
          value: 4,
          name: '应急处置装备'
        },
        {
          value: 7,
          name: '应急照明设备及用品'
        },
        {
          value: 5,
          name: '应急运输与专用作业交通设备'
        },
        {
          value: 4,
          name: '拦污封堵器材装备'
        },
        {
          value: 17,
          name: '搜救装备'
        },
        {
          value: 11,
          name: '泵类及通风排烟设备'
        },
        {
          value: 11,
          name: '洗消设备及器材'
        },
        {
          value: 27,
          name: '灭火及爆炸物处置设备'
        },
        {
          value: 6,
          name: '监测预警仪器和装置'
        },
        {
          value: 7,
          name: '通信设备'
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
          text: '应急装备分类统计',
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
            radius: '30%', // 饼图半径
            data: this.pieData
          }
        ]
      }
      this.myChart = echarts.init(document.getElementById('rightCounty'))
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

#rightCounty {
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
