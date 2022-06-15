<template>
  <div class="bottom-bar">
    <div class="checkAll">
      <check-button/>
      <span>全选</span>
      <span class="all">合计￥{{ totalPrice }}</span>
      <span class="pay">结算支付({{ payLegth }})</span>
    </div>

  </div>
</template>

<script>
import checkButton from "@/components/content/checkbutton/checkButton";

export default {
  name: "bottomBar",
  components: {
    checkButton
  },
  computed: {
    /*总价格*/
    totalPrice() {
      return this.$store.state.carList.filter(item => {
        return item.checked
      }).reduce((prevValue, item) => {
        return item.price * item.count + prevValue
      }, 0).toFixed(2)
      //0是初始化值，当购物车里没有物品的时候，是0  ，tofixed取两位小数，
    },
    //  结算支付，后面的，选中的商品的个数
    payLegth() {
      return this.$store.state.carList.filter(item => item.checked).length
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 40px;
  border: 1px solid black;
  position: fixed;
  bottom: 49px;
}

.checkAll {
  position: relative;
  bottom: 37px;
}

span {
  position: relative;
  bottom: -37px;
  left: 30px;
  line-height: 40px;
  vertical-align: middle;
}

.all {
  position: absolute;
  left: 80px;
}

.pay {
  float: right;
  width:90px;
  margin-right: 30px;
  text-align: center;
  background-color: #ff5777;
  color: #eeeeee;
}
</style>
