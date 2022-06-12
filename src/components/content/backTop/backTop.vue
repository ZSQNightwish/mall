<template>
  <div >
    <img src="@/assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "backTop",
}
</script>

<style scoped>
img {
  position: fixed;
  z-index: 9999;
  bottom: 50px;
  right: 4px;
  width: 50px;
}
</style>
