import Vue from 'vue'
import Vuex from 'vuex'
import  mutations from "./mutations"
import actions from "./actions"
import modules from "./modules"
import getters from "./getters"

Vue.use(Vuex)
const state = {
  carList: []
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
