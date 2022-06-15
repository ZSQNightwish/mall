<template>
  <div class="listItem">
    <!--    商品图片-->
    <div class="shop"><img :src=" product.image" alt="">
      <!--    选择按钮-->
      <check-button :isChecked="product.checked" @click.native="BtnClick"/>
      <!--描述信息-->
      <div class="item">
        <div class="desc">{{ product.title }}</div>
        <div class="desc">{{ product.desc }}</div>
      </div>
      <div class="count">x{{ product.count }}</div>
      <p>￥{{ product.price }}</p>
    </div>
  </div>
</template>
<script>
import checkButton from "@/components/content/checkbutton/checkButton";

export default {
  name: "listItem",
  components: {
    checkButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    BtnClick() {
      this.product.checked = !this.product.checked
      console.log('..............');
    }
  },
}
</script>

<style scoped>
.listItem {
  position: relative;
}

.shop {
  height: 108px;
  border: 1px solid #eeeeee;
  border-radius: 15px;
}

img {
  position: absolute;
  height: 100%;
  left: 29px;
  border-radius: 7px;
}

.item {
  position: absolute;
  left: 105px;
  font-size: 13px;
}

.desc {
  width: 250px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

p {
  position: absolute;
  left: 105px;
  bottom: 0;
  color: #ff5777;
  font-size: 16px;
}

.count {
  position: absolute;
  right: 18px;
  bottom: 0;
}
</style>
