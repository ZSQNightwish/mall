<template>
<div class="nav-bar">
  <div class="left"><slot name="left"></slot></div>
  <div class="center"><slot name="center"></slot></div>
  <div class="right"><slot name="right"></slot></div>
</div>
</template>

<script>
export default {
  name: "navBar"
}
</script>

<style scoped>
.nav-bar{
  line-height: 44px;
  height: 44px;
  display: flex;

}
.left,
.right{
  width:55px
}
.center{
  flex: 1;
  text-align: center;
}
</style>
