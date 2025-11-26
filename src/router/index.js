import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard.vue')
    },
    {
      path: '/novo-imovel',
      name: 'novo-imovel',
      component: () => import('@/components/FormularioImoveis.vue')
    }
  ],
})

export default router
