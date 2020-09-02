const state = {
  CJFKServiceType: null,
  year: 2019,
  area: {
    cantonProvince: '440000',
    cantonCity: '',
    cantonArea: ''
  },
  locationCity: '广东省'
}

const mutations = {
  SET_CJFKServiceType (state, data) {
    state.CJFKServiceType = data
  },
  SET_year (state, data) {
    state.year = data
  },
  SET_area (state, data) {
    state.area = data
  },
  SET_locationCity (state, data) {
    state.locationCity = data
  }

}

const actions = {
  setCJFKServiceType ({ commit }, state) {
    commit('SET_CJFKServiceType', state)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
