// import routes from '@/router/routes'
// import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '../views/AboutView.vue'
import CatalogSearchView from '../views/CatalogSearchView.vue'
import DatasetDetailsView from '../views/DatasetDetailsView.vue'
import DatasetSearchView from '../views/DatasetSearchView.vue'
import FindTwinsView from '../views/FindTwinsView.vue'
import FirstStepView from '../views/FirstStepView.vue'
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
      path: '/about',
      component: AboutView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/twins',
      component: FindTwinsView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/info',
      component: FirstStepView,
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
    {
      name: 'ProcessSteps',
      path: '/process-steps',
      component: () => import('../views/ProcessStepsSearchView.vue'),
    },
    {
      name: 'process-steps-details',
      path: '/process-steps/:datasetId',
      component: () => import('../views/ProcessStepsDetailsView.vue'),
    },
    {
      name: 'Organization',
      path: '/organizations',
      component: () => import('../views/OrganizationSearchView.vue'),
    },
    {
      name: 'organization-details',
      path: '/organizations/:datasetId',
      component: () => import('../views/OrganizationDetailsView.vue'),
    },
    {
      name: 'Project',
      path: '/projects',
      component: () => import('../views/ProjectSearchView.vue'),
    },
    {
      name: 'project-details',
      path: '/projects/:datasetId',
      component: () => import('../views/ProjectDetailsView.vue'),
    },
    {
      name: 'Software',
      path: '/softwares',
      component: () => import('../views/SoftwareSearchView.vue'),
    },
    {
      name: 'software-details',
      path: '/softwares/:datasetId',
      component: () => import('../views/SoftwareDetailsView.vue'),
    },
    {
      name: 'Hardware',
      path: '/hardwares',
      component: () => import('../views/HardwareSearchView.vue'),
    },
    {
      name: 'hardware-details',
      path: '/hardwares/:datasetId',
      component: () => import('../views/HardwareDetailsView.vue'),
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
