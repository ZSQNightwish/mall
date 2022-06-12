<template>
<div>
  <swiper>
    <swiper-item v-for="item in topImages" class="swiper-item">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</div>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper" //导入封装的轮播图

export default {
  name: "detailSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return[]
      }
    }
  }
}
</script>

<style scoped>
.swiper-item{
  height: 350px;
  overflow: hidden;
}
</style>
