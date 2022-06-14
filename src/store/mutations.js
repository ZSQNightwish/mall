export default {
  addCounter(state, payload) {
    payload.count++
  },
  addCart(state, payload) {
    state.carList.push(payload)
  }
}
