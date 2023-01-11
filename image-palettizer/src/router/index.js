import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Palettes from '../views/Palettes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/palettes',
    name: 'Palettes',
    component: Palettes,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
