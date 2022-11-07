<template>
  <div id="index">
    <div class="bg">
      <div class="host-body">
        <div class="body-box">
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <LeftUp/>
              </dv-border-box-12>
              <dv-border-box-12>
                <LeftDown/>
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-11 :title="chinaMapTitle">
                <China @map-change="mapClick" @back-change="backClick"/>
              </dv-border-box-11>
            </div>
            <div>
              <dv-border-box-12>
                <RightUp/>
              </dv-border-box-12>
              <dv-border-box-12>
                <RightDown/>
              </dv-border-box-12>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftUp from './LeftUp'
import LeftDown from './LeftDown'
import China from './China'
import RightUp from './RightUp'
import RightDown from './RightDown'

export default {
  name: 'AppIndex',
  components: {
    LeftUp,
    LeftDown,
    China,
    RightUp,
    RightDown
  },
  data () {
    return {
      areaData: {
        areaCode: '000000',
        areaLevel: 'county',
        name: '中国',
        areaName: '中国'
      }
    }
  },
  computed: {
    chinaMapTitle () {
      let areaName = this.areaData.areaName
      if (areaName === 'china') {
        areaName = '全国'
      }
      return areaName
    }
  },
  methods: {
    mapClick (data) {
      this.areaData = data
    },
    backClick (data) {
      this.areaData = data
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/index.scss';

#index {
  .dv-border-box-12 {
    height: inherit;
    width: 100%;
  }

  .bg {
    padding: .2rem;
    background-image: url("../../assets/bg.jpeg");
    background-size: cover;
    background-position: center center;
  }
}
</style>
