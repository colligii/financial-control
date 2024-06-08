import Main from '@/views/Main.vue'
import Graph from "@/views/Graph.vue"
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
      path: '/graph',
      name: 'graph',
      component: Graph,
    }
  ]
})

export default router
