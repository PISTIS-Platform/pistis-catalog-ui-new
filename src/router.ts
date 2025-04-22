import { createRouter, createWebHistory } from 'vue-router';
import DatasetDetailsView from '@/views/DatasetDetailsView.vue';
import Datasets from '@/views/search/datasets/Datasets.vue';
import Catalogues from '@/views/search/catalogues/Catalogues.vue';
import NotFound from '@/views/NotFound.vue';
import Home from '@/views/Home.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Home,
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
