<template>
  <div class="list">
    <scroll class="content" ref="scroll">
      <list-item v-for="(item,index) in carList"
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
    //配置映射就可以获取到carlist的信息  这个叫做辅助函数
    ...mapGetters({
      carList:'carList',
      cartLength:'cartLength'
    })
      // ...mapGetters(['carList','cartLength']) 这是第一种写法，如果方法过多可以抽出去
     //
  },
  activated() {
    this.$refs.scroll.refresh()
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
