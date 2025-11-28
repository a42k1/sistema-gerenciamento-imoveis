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
      path: '/cadastrar-imovel',
      name: 'cadastrar-imovel',
      component: () => import('@/views/formulario.vue')
    },
    {
      path: '/editar-imovel/:id',
      name: 'editar-imovel',
      component: () => import('@/views/formulario.vue'),
      props:true
    }
  ],
})

export default router
