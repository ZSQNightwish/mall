<template>
  <div class="checked" :class="{check: isChecked}">
  <img src="@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "checkButton",
  props:{
    isChecked:{
      type:Boolean,
      default:true
    }
  }
}
</script>

<style scoped>
.checked{
  position: absolute;
  left: 0;
  top:43px;
  width: 22px;
  text-align: center;
  border-radius: 50% ;
  border: 2px solid #a3a3a5;
}
.check{
  background: #ff5777;
  border-color: #ff5777;
}
</style>
