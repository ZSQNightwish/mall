<!--这个组件是用来，当点击添加购物车成功的时候，的弹窗提示功能
因为很多的页面会需要用到，所以单独封装-->
<template>
  <div class="toast" v-show="show">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "toast",
  props: {
    message: {
      type: String,
      default() {
        return ''
      }
    },
    show: {
      type: Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  right: 120px;

  width: 120px;
  height:35px;
  background-color: rgba(0, 0, 0, .6);
  text-align: center;
  line-height: 35px;
  color: #eeeeee;
}
</style>
