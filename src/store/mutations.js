export default {
  addCounter(state, payload) {
    payload.count++
  },
  addCart(state, payload) {
    payload.checked = true
    state.carList.push(payload)
  }
}
