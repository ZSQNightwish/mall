<!--展示商品列表的数据-->
<template>
  <div class="goods">
    <goods-list-item class="item"
                     v-for="item in goods"
                     :goods-item="item"/>
  </div>
</template>

<script>
import goodsListItem from "@/components/content/goodList/goodsListItem";

export default {
  name: "goodsList",
  components: {
    goodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /*//均等分剩余的*/
}
</style>
