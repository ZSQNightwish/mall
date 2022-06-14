export default {
  addClick(context, payload) {
    let oldProduct = null
    for (let k of context.state.carList) {
      if (k.iid === payload.iid) {
        oldProduct = k;
        /*上方是查找购物车里是否有改商品*/
      }
      /*这里进行的判断；如果已经有了执行+1
      * 如果没有的话，就执行=1，*/
    }
    if (oldProduct) {
      context.commit('addCounter', oldProduct)
    } else {
      payload.count = 1
      context.commit('addCart', payload)
    }

  }
}
