import i18n from '@/i18n'
import { defaultConfig, plugin as FormKitPlugin } from '@formkit/vue'
import { plugin as piveauPlugin } from '@piveau/sdk-vue'
import { de } from '@piveau/sdk-vue/locale'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

// @ts-expect-error legacy stuff
import { createStore } from 'vuex'

import App from './App.vue'
import KDW from './components/base/preset/index.js'
import config from './formkit.config.js'
import AuthStorePlugin from './plugins/authStorePlugin'
import authStore from './projects/data-provider-interface/store/authStore'
import dpiStore from './projects/data-provider-interface/store/dpiStore'
import snackbarStore from './projects/data-provider-interface/store/snackbarStore'
import { userConfigShimPlugin } from './projects/data-provider-interface/utils/userConfigShimPlugin'

import router from './router'
import { configureMarked } from './sdk/utils/configureMarked'
import './assets/stylesheets/reset.css'
import './assets/stylesheets/fonts.css'
import './assets/tailwind.css'
import './assets/base.css'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'

import '@formkit/themes/genesis'

async function renderApp() {
  // const { worker } = await import('./services/msw')
  // worker.start()

  const app = createApp(App)

  const qc = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  })

  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)

  app.use(userConfigShimPlugin)
  const vuexStore = createStore({
    namespaced: true,
    modules: {
      auth: authStore,
      dpiStore,
      snackbar: snackbarStore,
    },
  })
  app.use(vuexStore)
  app.use(FormKitPlugin, defaultConfig(config))

  app.use(router)

  app.use(VueQueryPlugin, {
    queryClient: qc,
  })

  app.use(piveauPlugin, {
    queryClient: qc,
    locale: {
      messages: {
        de: {
          ...de,
          metadata: {
            ...de.metadata,
            modificationDate: 'Aktualisiert',
          },
        },
      },
      locale: 'de',
      fallbackLocale: 'de',
      dateFormatStrings: {
        short: 'DD.MM.YYYY',
        medium: 'DD.MM.YYYY',
        long: 'DD. MMMM YYYY hh:mm:ss',
      },
    },
  })

  app.use(PrimeVue, {
    unstyled: true,
    pt: KDW,
  })

  app.use(AuthStorePlugin, { pinia })
  app.use(pinia)

  app.use(i18n).mount('#app')
}

configureMarked()

if (import.meta.hot) {
  import.meta.hot.accept()
}
renderApp()
