import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    contact: null,
    contacts: []
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },

    setContact (state, contact) {
      state.contact = contact || null
    },

    setContacts (state, contacts) {
      state.contacts = contacts
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer (state) {
      const sessionState = Object.assign({}, state)
      delete sessionState.util

      return sessionState
    }
  })]
})
