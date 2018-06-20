import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'

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
    },
    {
      path: '/map',
      component: () => import('./views/Map')
    },
    {
      path: '/login',
      component: Login
    },
  ]
})
