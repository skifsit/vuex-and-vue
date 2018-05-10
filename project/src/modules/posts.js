const postsModule = {
  namespaced: true,
  state: {
    fetchingPosts: null,
    posts: [],
  },
  getters: {},
  mutations: {
    SET_FETCHING_POSTS (state, fetching) {
      state.fetchingPosts = fetching
    },
    SET_POSTS (state, posts) {
      state.posts = posts
    },
  },
  actions: {
    FETCH_POSTS ({commit, state}) {
      if (state.fetchingPosts) {
        return state.fetchingPosts
      }

      const promise = fetch('http://jsonplaceholder.typicode.com/posts')
      commit('SET_FETCHING_POSTS', promise)
      return promise.then(res => res.json()).then(users => {
        commit('SET_POSTS', users)
        commit('SET_FETCHING_POSTS', null)
      })
    },
  },
}

export default postsModule