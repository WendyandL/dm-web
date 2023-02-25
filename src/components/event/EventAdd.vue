<template>
  <div style="text-align: left">
    <el-button type="primary" icon="el-icon-phone-outline" style="margin: 18px 0 20px 18px" @click="dialogFormVisible=true">
      录入事件
    </el-button>
    <el-dialog title="录入突发事件" :visible.sync="dialogFormVisible" @close="clear" width="25%">
      <el-form :model="loginForm" :rules="rules" label-position="left" label-width="0px">
        <el-form-item>
          <el-input type="text" v-model="loginForm.eventName" auto-complete="off" placeholder="事件名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="loginForm.eventTime" auto-complete="off" placeholder="事件时间"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="loginForm.eventLocation" auto-complete="off" placeholder="事件位置"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="loginForm.eventType" auto-complete="off" placeholder="事件类型"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="loginForm.eventDetail" auto-complete="off" placeholder="事件详情"></el-input>
        </el-form-item>
        <el-form-item style="justify-content: center;display: flex">
          <el-button type="primary" v-on:click="register" style="margin-right: 20px">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogAddFormVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="应急仓库" name="first" :key="'first'">
          <el-table :data="warehouses" style="width: 100%">
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
        </el-tab-pane>
        <el-tab-pane label="应急物资" name="second" :key="'second'">
          <el-table :data="supplies" style="width: 100%">
            <el-table-column prop="supplyName" label="物资名称" fit></el-table-column>
            <el-table-column prop="supplyNum" label="物资数量" fit></el-table-column>
            <el-table-column prop="supplyUnit" label="计量单位" fit></el-table-column>
            <el-table-column prop="supplyType" label="物资类型" fit></el-table-column>
            <el-table-column prop="whName" label="所属仓库" fit></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="应急队伍" name="third" :key="'third'">
          <el-table :data="teams" style="width: 100%">
            <el-table-column prop="teamName" label="队伍名称" fit></el-table-column>
            <el-table-column prop="teamLevel" label="队伍级别" fit></el-table-column>
            <el-table-column prop="teamDepart" label="主管单位" fit></el-table-column>
            <el-table-column prop="teamHotline" label="值班电话" fit></el-table-column>
            <el-table-column prop="teamContact" label="联系人" fit></el-table-column>
            <el-table-column prop="teamCtel" label="联系人电话" fit></el-table-column>
            <el-table-column prop="teamSpecial" label="专长描述" fit></el-table-column>
            <el-table-column prop="teamAddress" label="队伍地址" fit></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="应急装备" name="fourth" :key="'fourth'">
          <el-table :data="equipments" style="width: 100%">
            <el-table-column prop="equipName" label="装备名称" fit></el-table-column>
            <el-table-column prop="equipType" label="装备类型" fit></el-table-column>
            <el-table-column prop="equipNum" label="装备数量" fit></el-table-column>
            <el-table-column prop="equipUnit" label="计量单位" fit></el-table-column>
            <el-table-column prop="equipParam" label="装备参数" fit></el-table-column>
            <el-table-column prop="equipAddress" label="储备地址" fit></el-table-column>
            <el-table-column prop="teamName" label="所属队伍" fit></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="应急预案" name="fifth" :key="'fifth'">
          <el-table :data="plans" style="width: 100%">
            <el-table-column prop="planName" label="预案名称" fit></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'EventAdd',
  data () {
    return {
      dialogFormVisible: false,
      rules: {
        eventName: [{required: true, message: '事件名称不能为空', trigger: 'blur'}]
      },
      loginForm: {
        eventName: '',
        eventTime: '',
        eventLocation: '',
        eventType: '',
        eventDetail: ''
      },
      activeName: 'first',
      dialogAddFormVisible: false,
      warehouses: [
        {
          'whName': '北京市市级救灾物资储备库',
          'whCode': 'YCK1032193495',
          'whType': '救灾物资库',
          'whLevel': '市级',
          'whLocation': '北京市/北京市市辖区/大兴区/黄村镇',
          'whAddress': '大兴区黄村天河北路9号北京百利威仓储物流有限公司库房',
          'whOrganization': '北京市粮食和物资储备局',
          'whContact': null,
          'whTel': null,
          'whLongitude': 116.345613,
          'whLatitude': 39.691571
        },
        {
          'whName': '北京市救灾物资储备库延庆分库',
          'whCode': 'YCK1032193504',
          'whType': '救灾物资库',
          'whLevel': '市级',
          'whLocation': '北京市/北京市市辖区/延庆区/香水园街道',
          'whAddress': '北京市北京市市辖区延庆区香水园街道',
          'whOrganization': '延庆区商务局（北京市延庆区粮食和物资储备局）',
          'whContact': '王文远',
          'whTel': '13910991879',
          'whLongitude': 115.973739,
          'whLatitude': 40.45578
        }
      ],
      supplies: [
        {
          'supplyName': 'GPS对讲机',
          'supplyNum': 3,
          'supplyUnit': '个',
          'whID': '2',
          'supplyType': '救灾物资',
          'whName': '北京市市级救灾物资储备库'
        },
        {
          'supplyName': '手提照明灯',
          'supplyNum': 97134,
          'supplyUnit': '盏',
          'whID': '2',
          'supplyType': '救灾物资',
          'whName': '北京市市级救灾物资储备库'
        },
        {
          'supplyName': '12㎡棉帐篷',
          'supplyNum': 8339,
          'supplyUnit': '顶',
          'whID': '2',
          'supplyType': '救灾物资',
          'whName': '北京市市级救灾物资储备库'
        },
        {
          'supplyName': '手电筒',
          'supplyNum': 77320,
          'supplyUnit': '把',
          'whID': '2',
          'supplyType': '救灾物资',
          'whName': '北京市市级救灾物资储备库'
        },
        {
          'supplyName': '折叠床',
          'supplyNum': 117659,
          'supplyUnit': '张',
          'whID': '2',
          'supplyType': '救灾物资',
          'whName': '北京市市级救灾物资储备库'
        }
      ],
      teams: [
        {
          'teamName': '北京燕山石化消防中心',
          'teamLevel': '市级',
          'teamDepart': null,
          'teamHotline': '01069342558',
          'teamContact': null,
          'teamCtel': null,
          'teamSpecial': '综合救援',
          'teamAddress': '房山区燕东路12号',
          'teamLongitude': 115.981453,
          'teamLatitude': 39.723858
        }
      ],
      plans: [
        {
          'planName': '北京市火灾事故应急预案'
        },
        {
          'planName': '国家森林草原火灾应急预案'
        }
      ],
      equipments: [
        {
          'equipName': '防静电工作服',
          'equipType': '个人防护装备',
          'equipNum': 10,
          'equipUnit': '套',
          'equipParam': null,
          'equipAddress': '北京市大兴区魏善庄镇黄魏路北吴庄村南北京市烟花鞭炮有限公司院内10号库房内',
          'teamID': '1',
          'teamName': '大兴区危险化学品事故专业应急救援队'
        },
        {
          'equipName': '灭火毯',
          'equipType': '灭火及爆炸物处置设备',
          'equipNum': 28,
          'equipUnit': '块',
          'equipParam': '1.5米×1.5米双层',
          'equipAddress': '北京市大兴区魏善庄镇黄魏路北吴庄村南北京市烟花鞭炮有限公司院内10号库房内',
          'teamID': '1',
          'teamName': '大兴区危险化学品事故专业应急救援队'
        },
        {
          'equipName': '防毒面具',
          'equipType': '个人防护装备',
          'equipNum': 9,
          'equipUnit': '套',
          'equipParam': 'MF14',
          'equipAddress': '北京市大兴区魏善庄镇黄魏路北吴庄村南北京市烟花鞭炮有限公司院内10号库房内',
          'teamID': '1',
          'teamName': '大兴区危险化学品事故专业应急救援队'
        },
        {
          'equipName': '隔热服',
          'equipType': '个人防护装备',
          'equipNum': 2,
          'equipUnit': '套',
          'equipParam': null,
          'equipAddress': '北京市大兴区魏善庄镇黄魏路北吴庄村南北京市烟花鞭炮有限公司院内10号库房内',
          'teamID': '1',
          'teamName': '大兴区危险化学品事故专业应急救援队'
        }
      ]
    }
  },
  methods: {
    clear () {
      this.loginForm = {
        eventName: '',
        eventTime: '',
        eventLocation: '',
        eventType: '',
        eventDetail: ''
      }
    },
    register () {
      this.$axios
        .post('/event/save', {
          eventName: this.loginForm.eventName,
          eventTime: this.loginForm.eventTime,
          eventLocation: this.loginForm.eventLocation,
          eventType: this.loginForm.eventType,
          eventDetail: this.loginForm.eventDetail
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.dialogFormVisible = false
            this.dialogAddFormVisible = true
            this.clear()
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
        })
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
