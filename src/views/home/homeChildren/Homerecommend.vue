<template>
<div class="recommend">
  <div v-for="item in recommend" class="recommend-item">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: "Homerecommend",
  props:{
    recommend:{
      type:Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  border-bottom: 8px solid #eee;
  padding-bottom: 15px;
}
.recommend-item{
  flex: 1;
  font-size: 13px;
}
img{
  width: 85px;
  height: 80px;
  margin-bottom: 6px;
}
</style>
