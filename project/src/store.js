import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fetching: null,
    users: [],
  },
  getters: {
    GET_REVERSED_USERS (state) {
      return state.users.reverse()
    }
  },
  mutations: {
    SET_FETCHING (state, fetching) {
      state.fetching = fetching
    },
    SET_USERS (state, users) {
      state.users = users
    },
  },
  actions: {
    FETCH_USERS ({commit, state}) {
      if (state.fetching) {
        return state.fetching
      }

      const promise = fetch('http://jsonplaceholder.typicode.com/users')
      commit('SET_FETCHING', promise)
      return promise.then(res => res.json()).then(users => {
        commit('SET_USERS', users)
        commit('SET_FETCHING', null)
      })
    }
  }
})
