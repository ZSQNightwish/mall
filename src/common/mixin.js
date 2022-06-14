import {debounce} from "@/common/untils";

export const itemListenerMixin = {
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemListener = () => {
      newRefresh()
    }
    this.$bus.$on('imageLoad', this.itemListener)
    console.log('111111111111111');
  }
}
