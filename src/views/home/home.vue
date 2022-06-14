<template>
  <div id="home">
    <!--    1.顶部导航栏-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tabcontol :titles="['流行','新款','精选']"
               class="tab-control"
               @tabClick="tabClick"
               ref="tabControl"
               v-show="isFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--    2.轮播图-->
      <home-swiper :banner="banner" @swiperImgLoad="swiperImgLoad"/>
      <!--    3.推荐信息模块-->
      <homerecommend :recommend="recommend"/>
      <!--    4.本周流行模块 这就是一张图片里面一个类链接插入即可-->
      <feature/>
      <!--    5.精品 流行  标题 tabcontol 这个很多页面也可以复用，所以封装在common里面-->
      <tabcontol :titles="['流行','新款','精选']"
                 class="tab-control2"
                 @tabClick="tabClick"
                 ref="tabControl2"/>
      <!--     6.商品数据展示-->
      <goods-list :goods="goods[currentType].list"/>
      <!--    功能：根据点击，切换不同的状态栏下的商品 返回顶部 上啦加载更多功能  节流防抖，吸顶功能-->
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBckTop"/>
  </div>
</template>

<script>
import navBar from "@/components/common/navBar/navBar";//顶部导航栏，因为这个其他的页面也会使用所以需要单独的封装
import homeSwiper from "@/views/home/homeChildren/homeSwiper";//轮播图抽离的数据，
import homerecommend from "@/views/home/homeChildren/Homerecommend";//推荐信息模块
import feature from "@/views/home/homeChildren/feature";//本周流行模块
import tabcontol from "@/components/content/tabcontol/tabcontol";
import goodsList from "@/components/content/goodList/goodsList";


import {getHomeMultidata, getHomeGoods} from "@/network/home"//网络请求相关
import scroll from "@/components/common/scroll/scroll";
import backTop from "@/components/content/backTop/backTop";//返回顶部功能

export default {
  name: "home",
  components: {
    navBar,
    homeSwiper,
    homerecommend,
    feature,
    tabcontol,
    goodsList,
    scroll,
    backTop,

  },
  data() {
    return {
      banner: [],
      recommend: [],
      //商品展示模块的数据模型
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBckTop: false,
      tabOffsetTop: 651,
      isFixed: false,
      itemListener: null
    }
  },
  mounted() {
    /*$el 获取组件中的元素*/
    /*    this.tabOffsetTop=this.$refs.tabControl.$el*/

    /*对我们监听的事件进行保存*/
    this.itemListener = () => {
      newRefresh(20, 30, 'abc')
      this.$bus.$off('itemImageLoad', this.itemListener)
    }
  },
  /*
  * 生命周期函数，当被创建的时候就发送请求，
  * */
  created() {
    /*请求多个数据 轮播图相关*/
    this.getHomeMultidata()//调用下方的方法
    /*商品展示的数据请求*/
    this.getHomeGoods('pop')//调用下方的方法
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
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
    contScroll(position) {
      /*  position.y>1000*/
      /*判断tabcontrol 是否显示*/
      this.isShowBckTop = -(position.y) > 1000
      /*决定tabcontrol 是否吸顶 给他一个position fixed*/
      this.isFixed = -(position.y) > this.tabOffsetTop
    },
    loadMore() {
      console.log('111111111111');
      this.getHomeGoods(this.currentType)
    },
    /*tab 吸顶效果*/
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /*
    * 网络请求相关
    * */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.scroll.finishPullUp()
      })
    },
    /*
    *方法相关
    * */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    }
  },
  activated() {
    // 同时刷新better-scroll防止不能滚动
    this.$refs.scroll.refresh();
  },
  deactivated() {

    /*取消全局事件的监听*/
    this.$bus.$off('itemImageLoad',this.itemListener)
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;

}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;


  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  height: 570px;
  overflow: hidden;


}
</style>
