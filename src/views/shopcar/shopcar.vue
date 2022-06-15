<template>
  <div>
    <!--导航-->
    <nav-bar class="nav">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!--    商品展示-->
    <cart-list/>
    <!--底部的汇总-->


  </div>
</template>
<script>
import navBar from "@/components/common/navBar/navBar";
import cartList from "@/views/shopcar/childcom/cartList";


import {mapGetters} from "vuex"//vuex 内置的方法，mapgetters
export default {
  name: "shopcar",
  components: {
    navBar,
    cartList
  },
  computed: {
    //如果改方法用的比较多，可以封装一个getters
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.nav {
  background: #ff5777;
  color: #eeeeee;

}

</style>
