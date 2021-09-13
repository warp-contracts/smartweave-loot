import Vue from 'vue'
import Vuex from 'vuex'
import contract from './loot-smartweave-contract'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contract,
    state: {},
    validity: {}
  },
  mutations: {
    setState(state, swState) {
      state.state = swState
    },

    setValidity(state, validity) {
      state.validity = validity
    },

  },
  actions: {
    async loadState({ commit }) {
      const { state, validity } = await contract.readState()
      commit('setState', state)
      commit('setValidity', validity)
    }
  }
})
