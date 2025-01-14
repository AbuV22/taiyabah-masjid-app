import Home from '../views/Home.vue'
import SeeMonth from '../helpers/SeeMonth/SeeMonth.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/full-month', component: SeeMonth },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
