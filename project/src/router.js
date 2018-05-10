import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
// import Post from './views/Post'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/posts/list',
      component: () => import('./views/Post')
    }
  ]
})
