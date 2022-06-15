<template>
  <div id="detail">
    <detail-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <deatil-bottom-bar @addClick="addClick"/>
    <back-top @click.native="backClick" v-show="isShowBckTop"/>

    <toast :message="message" :show="show"/>
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
import goodsList from "@/components/content/goodList/goodsList"; //商品的推荐模块，因为两个用法类似，所以直接引入即可，然后需要注意的是，因为推荐模块和 goodslist模块的图片的数据结构不一样     //名字不同，所以在goodslist里需要判断一样
import deatilBottomBar from "@/views/detail/detailComps/deatilBottomBar";
import backTop from "@/components/content/backTop/backTop";

import scroll from "@/components/common/scroll/scroll";//页面的滚动效果引入
import {getDdatil, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail" //网络请求商品详情的数据
import {debounce} from "@/common/untils";
import {itemListenerMixin} from "@/common/mixin";

import toast from "@/components/common/toast/toast";//商品添加成功弹出提示功能

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
    goodsList,
    deatilBottomBar,
    backTop,
    toast

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
      recommend: [],
      itemListener: null,
      mixins: [itemListenerMixin],
      themeY: [],
      getThemeY: null,
      currentIndex: 0,
      isShowBckTop: true,
      message: '',
      show: false
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
          this.recommend = res.data.list
        })
        /*若果没有nexttick，数据还没渲染出来，所以就拿不到top值，所以就会underfined
        * 但是图片还没有加载出来，依然还不准确数据不对，*/
        /* this.$nextTick(() => {
           this.themeY = []
           this.themeY.push(0)
           this.themeY.push(this.$refs.params.$el.offsetTop)
           this.themeY.push(this.$refs.comment.$el.offsetTop)
           this.themeY.push(this.$refs.recommend.$el.offsetTop)
           console.log(this.themeY);
         })*/
        /*根绝点击tab 跳转到相应的内容范围里*/
        //使用防抖 提高性能
        this.getThemeY = debounce(() => {
          this.themeY = []
          this.themeY.push(0)
          this.themeY.push(this.$refs.params.$el.offsetTop)
          this.themeY.push(this.$refs.comment.$el.offsetTop)
          this.themeY.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeY);
        }, 200)
      }
    });
  },
  mounted() {

  },
  destroyed() {
    this.$bus.$off('imageLoad', this.itemListener)
  },
  methods: {
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeY[index], 300)
    },
    /*当所有的图片加载完成，执行获取top值，*/
    detailImageLoad() {
      this.getThemeY()
    },
    /*滚动的时候，滚动到不同的内容区，顶部tab栏显示不同的内容范围*/
    contentScroll(position) {
      /*  console.log(position);*/
      /*获取y值*/
      const positionY = -position.y
      /* positionY 和主题中的值对比*/
      let length = this.themeY.length
      for (let i = 0; i < length; i++) {
        /*console.log(k);*/
        /* if (positionY > this.themeY[parseInt(i)] && positionY < this.themeY[i + 1]) {
           console.log(i)*/
        if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeY[i] && positionY < this.themeY[i + 1]) || (i === length - 1 && positionY >= this.themeY[i]))) {
          this.currentIndex = i
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    debounce(func, delay) {
      let timer = null
      return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)//0 0是 位置，500是在和这个时间内滚动回去
    },
    addClick() {
      // console.log(2222);
      //1.获取购物车需要展示的信息 图片 标题 价格 描述
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      //这里同时获取商品的id，才能知道把对应的商品添加到购物车
      product.iid = this.iid
      //2.添加到购物车  首先把数据添加到 vue x共享
      //当商品被成功加入购物车，弹窗提示成功功能 成功的时候需要他来告诉我们成功了
      // 所以就需要通过promise实现，
      this.$store.dispatch('addClick', product).then(res => {
        this.show = true
        this.message = res
        console.log(res);
        setTimeout(() => {
          this.show = false
          this.message = ''
        }, 1500)
      })


    }
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
  height: calc(100% - 95px);
}
</style>
