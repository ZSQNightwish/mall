<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link"><img :src="item.image" alt="" @load="imgLoad"></a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper/index" //轮播图的组件
export default {
  name: "homeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }
    }

  },
  /*因为请求的轮播图数据在home里面，所以这里需要在传递一下数据*/
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
