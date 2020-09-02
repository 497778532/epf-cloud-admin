import Vue from 'vue'
const state = {
  screenMessage: {}
}
const mutations = {
  to_fullScreen(state, rows) {
    state.screenMessage = rows
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
