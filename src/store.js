import Vue from 'vue'
import Vuex from 'vuex'
import contract from './loot-smartweave-contract'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contract,
    state: {},
    validity: {},
    loadingAssets: false,
  },
  mutations: {
    setState(state, swState) {
      state.state = swState
    },

    setValidity(state, validity) {
      state.validity = validity
    },

    setLoadingAssets(state, val) {
      state.loadingAssets = val
    },

  },
  actions: {
    async loadState({ commit }) {
      commit('setLoadingAssets', true)
      const { state, validity } = await contract.readState()
      commit('setState', state)
      commit('setLoadingAssets', false)
      commit('setValidity', validity)
    }
  }
})
