import { SIDEBAR_INIT, SIDEBAR_TOGGLE, SIDEBAR_SHOW, SIDEBAR_HIDE } from '../types'

// state
const state = {
  sidebar: null,
  accounts: []
}

// getters
const getters = {
  shown: state => state.sidebar.shown
}

// actions
const actions = {

}

// mutations
const mutations = {
  [SIDEBAR_INIT] (state, sidebar) {
    state.sidebar = sidebar
  },

  [SIDEBAR_TOGGLE] (state) {
    return state.sidebar.toggle()
  },

  [SIDEBAR_SHOW] (state) {
    return state.sidebar.show()
  },

  [SIDEBAR_HIDE] (state) {
    return state.sidebar.hide()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
