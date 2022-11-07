<template>
  <div>
    <div>
      <el-carousel>
        <el-carousel-item v-for="(item, index) in list_img" :key="index">
          <h3 class="small">
            <img :src="item.url" alt />
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppIndex',
  data () {
    return {
      list_img: [
        { url: require('../../assets/img/1.jpeg') },
        { url: require('../../assets/img/2.jpeg') },
        { url: require('../../assets/img/3.jpeg') },
        { url: require('../../assets/img/4.jpeg') }
      ]
    }
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 1;
  line-height: 300px;
  margin: 50px;
  text-align: center;
}

.box-card {
  margin: 60px;
  text-align: center;
}
</style>
