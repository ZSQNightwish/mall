<template>
  <div class="list">
    <scroll class="content">
      <list-item v-for="(item,index) in    this.$store.state.carList"
                 :product="item"
                 :key="index">
      </list-item>
    </scroll>
  </div>
</template>
<script>
import scroll from "@/components/common/scroll/scroll";
import listItem from "@/views/shopcar/childcom/listItem";

import {mapGetters} from "vuex"
export default {
  name: "cartList",
  components: {
    scroll,
    listItem
  },
  computed: {
    ...mapGetters(['carList'])
  }
}
</script>

<style scoped>
.list {
  height: 100vh;
}

.content {
  height: calc(100% - 95px);
  overflow: hidden;
}
</style>
