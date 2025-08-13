import DatasetDetailsView from '@/views/DatasetDetailsView.vue'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import Catalogues from '@/views/search/catalogues/Catalogues.vue'
import Datasets from '@/views/search/datasets/Datasets.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Themer from './views/Themer.vue'
// Lineage View will be integrated later:
import LineageView from './data-lineage/views/LineageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Datasets,
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: 'Datasets',
      path: '/datasets',
      component: Datasets,
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: 'Catalogues',
      path: '/catalogues',
      component: Catalogues,
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
      name: 'themer',
      path:  '/themer',
      component: Themer,
      meta : {
        requiresAuth: false,
      }
    },
    {
      name: 'data-lineage',
      path:  '/data-lineage',
      component: LineageView,
      meta : {
        requiresAuth: false,
      }
    },
    // 404
    {
      path: '/:catchAll(.*)',
      component: NotFound,
      meta: {
        requiresAuth: false,
      },
    },

  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export const appRoute: string = `${location.origin}/app`
export default router
