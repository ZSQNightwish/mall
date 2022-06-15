<template>
  <div class="bottom-bar">
    <div class="checkAll">
      <check-button
        :is-checked="isAll"
        @click.native="ckeckAll"/>
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
    },
    isAll() {
      /*通过点击商品选中按钮，让全选按钮被选中*/
      //判断长度是否为0， false 和 ture
      // return !(this.$store.state.carList.filter(item => !item.checked).length)
      if (this.$store.state.carList.length === 0) return false
      /*使用find 性能会高一点*/
      return !this.$store.state.carList.find(item => !item.checked)
    }
  },
  methods: {
    /*这里做的是，通过点击全选按钮，控制所有的商品被选中
    * 两种情况 1.如果都被选中了，点击让商品不被选中，
    *          2.如果都没有被选中，点击会，所有商品都被选中*/
    ckeckAll() {
      // console.log('..........');
      if (this.isAll) {
        this.$store.state.carList.forEach(item => item.checked = false)
      } else {
        this.$store.state.carList.forEach(item => item.checked = true)
      }
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
  width: 90px;
  margin-right: 30px;
  text-align: center;
  background-color: #ff5777;
  color: #eeeeee;
}
</style>
