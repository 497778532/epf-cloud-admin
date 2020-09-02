const state = {
  treeData: ['1'],
  screenshotState: false,
  layerUrl: null,
  layerId: '',
  drawType: '',
  radius: 0,
  special: false,
  specialData: {},
  rightSelectLayerId: null,
  searchShow: false,
  searchParams: ''

}

const mutations = {
  SET_specialData (state, data) {
    state.specialData = data
  },

  SET_specialT (state) {
    state.special = true
  },
  SET_specialF (state) {
    state.special = false
  },
  getTreeData (state, data) {
    state.treeData = data
  },
  SET_ScreenshotState (state, data) {
    state.screenshotState = data
  },
  SET_LayerUrl (state, layerUrl) {
    state.layerUrl = layerUrl
  },
  SET_LayerId (state, payload) {
    state.layerId = payload.layerId
    state.drawType = payload.drawType
    state.radius = payload.radius
  },
  SET_RigtSelectLayerId (state, layerId) {
    state.rightSelectLayerId = layerId
  },
  SET_Search (state, data) {
    state.searchShow = data
  },
  SET_SearchParams (state, data) {
    state.searchParams = data
  }

}

const actions = {
  setScreenshotState ({ commit }, state) {
    commit('SET_ScreenshotState', state)
  },
  setlayerUrl ({ commit }, layerUrl) {
    commit('SET_LayerUrl', layerUrl)
  },
  setlayerId ({ commit }, payload) {
    commit({
      type: 'SET_LayerId',
      layerId: payload.layerId,
      drawType: payload.drawType,
      radius: payload.radius
    })
  },
  setRightSelectLayerId ({ commit }, layerId) {
    commit('SET_RigtSelectLayerId', layerId)
  },

  setSpecialT ({ commit }) {
    commit('SET_specialT')
  },

  setSpecialF ({ commit }) {
    commit('SET_specialF')
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
