<template>
  <div id="detail">
    <detail-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info :param-info="paramInfo"/>
      <comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommend"/>
    </scroll>
  </div>

</template>

<script>
import detailBar from "@/views/detail/detailComps/detailBar";//顶部导航栏
import detailSwiper from "@/views/detail/detailComps/detailSwiper";//轮播图
import detailBaseInfo from "@/views/detail/detailComps/DetailBaseInfo";//基本数据
import detailShopInfo from "@/views/detail/detailComps/DetailShopInfo";//店铺信息
import detailGoodsInfo from "@/views/detail/detailComps/DetailGoodsInfo";// 穿着效果展示，图片
import detailParamInfo from "@/views/detail/detailComps/DetailParamInfo";// 商品的 尺寸 信息
import commentInfo from "@/views/detail/detailComps/commentInfo";//评论信息
import goodsList from "@/components/content/goodList/goodsList"; /*商品的推荐模块，因为两个用法类似，所以直接引入即可，然后需要注意的是，因为推荐模块和 goodslist模块的图片的数据结构不一样
                                                                名字不同，所以在goodslist里需要判断一样，*/


import scroll from "@/components/common/scroll/scroll";//页面的滚动效果引入
import {getDdatil, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail" //网络请求商品详情的数据
import {debounce} from "@/common/untils";
import {itemListenerMixin} from "@/common/mixin";

export default {
  name: "Detail",
  components: {
    detailBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    scroll,
    detailGoodsInfo,
    detailParamInfo,
    commentInfo,
    goodsList

  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend:[],
      mixins:[itemListenerMixin]
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    /*2.根据iid 请求商品数据*/
    getDdatil(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages

      /*   3.获取商品信息*/
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      /*4. 保存商品的险情的数据*/
      this.detailInfo = data.detailInfo

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //6.评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]

      //7.推荐信息
        getRecommend().then(res => {
          // console.log(res);
          //因为这个推荐模块，就是之前主页的列表模块，可以只用goodlist
          this.recommend=res.data.list
        })
      }
    });
  },
  mounted() {
    console.log('mounted');
  },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemListener)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
