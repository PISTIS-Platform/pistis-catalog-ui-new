// import routes from '@/router/routes'
// import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'

import CatalogSearchView from '../views/CatalogSearchView.vue'
import DatasetDetailsView from '../views/DatasetDetailsView.vue'
import DatasetSearchView from '../views/DatasetSearchView.vue'
import NotFound from '../views/NotFound.vue'
import LandingPageView from '../views/public/LandingPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LandingPageView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: 'Datasets',
      path: '/datasets',
      component: DatasetSearchView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: 'dataset-details',
      path: '/datasets/:datasetId',
      component: DatasetDetailsView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: 'Catalogues',
      path: '/catalogues',
      component: CatalogSearchView,
      meta: {
        requiresAuth: false,
      },
    },
    // 404
    {
      path: '/:catchAll(.*)',
      component: NotFound,
      meta: {
        requiresAuth: false,
      },
    },

  ]
})

export const appRoute: string = `${location.origin}/app`
export default router
