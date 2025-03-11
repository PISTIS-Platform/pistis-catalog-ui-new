import GlobalWrapper from '.histoire/GlobalWrapper.vue'
import { defineSetupVue3 } from '@histoire/plugin-vue'
import PrimeVue from 'primevue/config'
import Lara from './components/base/preset/index.js'

import './assets/tailwind.css'
import './assets/base.css'
import '@fontsource-variable/inter'
import '@fontsource-variable/inter/standard.css'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/space-grotesk/wght.css'

// Specify axis and style

export const setupVue3 = defineSetupVue3(({ app, addWrapper }) => {
  // Vue plugin
  app.use(PrimeVue, {
    unstyled: true,
    pt: Lara,
  })

  addWrapper(GlobalWrapper)
})
