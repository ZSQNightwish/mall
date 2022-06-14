<template>
<div>
  <scroll class="content">
    <nav-bar class="nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <ul>
      <Li v-for="item in $store.state.carList">{{item}}</Li>
    </ul>
  </scroll>
</div>
</template>
<script>
import scroll from "@/components/common/scroll/scroll";
import navBar from "@/components/common/navBar/navBar";


import {mapGetters} from "vuex"//vuex 内置的方法，mapgetters
export default {
  name: "shopcar",
  components: {
    scroll,
    navBar
  },
  computed:{
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.nav{
  background: #ff5777;
  color: #eeeeee;
}
.content {
  height: calc(100% - 95px);
}
</style>
