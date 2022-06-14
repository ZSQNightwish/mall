<template>
  <div class="big">
    <nav-bar>
      <div slot="left" class="left" @click="back">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="item"
             :class="{active:index === currentIndex}"
             @click="titleClick(index)">{{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import navBar from "@/components/common/navBar/navBar";

export default {
  name: "detailBar",
  components: {
    navBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    back(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.big{
  border-bottom: 1px dashed #cccccc;
}
.title {
  display: flex;
}

.item {
  flex: 1;
  font-size: 15px;
}

.active {
  color: #ff5777;
}
.left img{
text-align: center;
  position: absolute;
  left: 15px;
  top: 9px;
  width: 25px;
}
</style>
