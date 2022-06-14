<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">☆{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "goodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  /*因为商品的详情模块，用到了该数据，但是里面的数据结构不一样，所以
  * 这里需要判断一下，两个地方的图片的名字不一样，所以会获取不到，*/
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('imageLoad')
    },
    itemClick(){
      // console.log(11111111111);
      this.$router.push('/detail/'+this.goodsItem.iid) //不同的商品有不同的id
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;

}

img {
  width: 100%;
  border-radius: 10px;

}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.collect {
  position: relative;
}
</style>
