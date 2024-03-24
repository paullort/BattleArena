import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/MainMenu',
      name: 'MainMenu',
      component: () => import('../views/MainMenu.vue')
    },
    {
      path: '/playerManagement',
      name: 'playerManagement',
      component: () => import('../views/PlayerManagement.vue')
    },
    {
      path: '/pasarela-play',
      name: 'pasarela-play',
      component: () => import('../views/Pasarela-play.vue')
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('../views/Ranking.vue')
    },
    {
      path: '/store',
      name: 'store',
      component: () => import('../views/Store.vue')
    },
    {
      path: '/createattack',
      name: 'createattack',
      component: () => import('../views/createAttack.vue')
    }

  ]
})

export default router
