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
      component: () => import('../views/LOGIN/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/REGISTER/RegisterPage.vue')
    },
    {
      path: '/MainMenu',
      name: 'MainMenu',
      component: () => import('../views/MAIN_MENU/MainMenu.vue')
    },
    {
      path: '/playerManagement',
      name: 'playerManagement',
      component: () => import('../views/MAIN_MENU/PLAYER_MANAGEMENT/PlayerManagement.vue')
    },
    {
      path: '/pasarela-play',
      name: 'pasarela-play',
      component: () => import('../views/MAIN_MENU/PLAY/Pasarela-play.vue')
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('../views/MAIN_MENU/RANKING/RankingPage.vue')
    },
    {
      path: '/store',
      name: 'store',
      component: () => import('../views/MAIN_MENU/STORE/shopStore.vue')
    },
    {
      path: '/createattack',
      name: 'createattack',
      component: () => import('../views/MAIN_MENU/STORE/createAttack.vue')
    },
    {
      path: '/buyattack',
      name: 'buyattack',
      component: () => import('../views/MAIN_MENU/STORE/buyAttack.vue')
    },
    {
      path: '/equippedattacks',
      name: 'equippedattacks',
      component: () => import('../views/MAIN_MENU/STORE/equippedAttacks.vue')
    },
    {
      path: '/sellAttack',
      name: 'sellAttack',
      component: () => import('../views/MAIN_MENU/STORE/sellAttack.vue')
    },
    {
      path: '/joinavailablegames',
      name: 'joinAvailableGames',
      component: () => import('../views/MAIN_MENU/PLAY/JoinAvailableGames.vue')
    },
    {
      path: '/creategame',
      name: 'createGame',
      component: () => import('../views/MAIN_MENU/PLAY/CreateGame.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/MAIN_MENU/PLAY/HistoryPage.vue')
    },
    {
      path: '/playerinfo',
      name: 'playerinfo',
      component: () => import('../views/MAIN_MENU/PLAYER_MANAGEMENT/PlayerInfo.vue')
    },
    {
      path: '/deletion',
      name: 'deletion',
      component: () => import('../views/MAIN_MENU/PLAYER_MANAGEMENT/DeletionPage.vue')
    },
    {
      path: '/popupdelete',
      name: 'popupdelete',
      component: () => import('../views/MAIN_MENU/PLAYER_MANAGEMENT/PopUpDelete.vue')
    },
    {
      path: '/InGame',
      name: 'InGame',
      component: () => import('../views/MAIN_MENU/PLAY/InGame.vue')
    }

  ]
})

export default router
