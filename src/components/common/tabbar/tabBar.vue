<template>
<div id="tab-bar">
<slot></slot>
</div>
</template>

<script>
export default {
  name: "tabBar"
}
</script>

<style scoped>
#tab-bar{
  display: flex;
  text-align: center;
  height: 49px;
  line-height: 49px;

  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color:whitesmoke;
}

</style>
