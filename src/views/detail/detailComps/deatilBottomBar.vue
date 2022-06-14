<template>
  <div class="bottom-bar">

    <div class="item">
      <i class="serve"><img src="@/assets/img/detail/serve.png" alt=""></i><span>客服</span>
    </div>
    <div class="item">
      <i><img src="@/assets/img/detail/shop.png" alt=""></i><span>店铺</span>
    </div>
    <div class="item">
      <i class="collect"><img src="@/assets/img/detail/collect.png" alt=""></i><span>收藏</span>
    </div>
    <div class="buy" style="background-color: gold">
      <h2 style="font-size: 15px" @click="addClick">加入购物车</h2>
    </div>
    <div class="buy" style="background-color: #eb4868">
      <h2 style="color: #eeeeee">购买</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailBottomBar",
  methods:{
    addClick(){
    /*  console.log('11111');*/
      this.$emit('addClick')
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.item {
  flex: 1;
  font-size: 15px;
}

img, span {
  float: left;
  width: 33px;
  margin-left: 15px;

}

.collect img {
  height: 28.08px;
}

.buy {
  width: 95px;
  text-align: center;
  line-height: 49px;
}
</style>

