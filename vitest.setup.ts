import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'en',
  messages: {
    en: {
      views: {
        app: {
          'digital-twin-view': {
            'digital-twin-title': 'Digital Twin',
            'digital-twin-subtitle': 'The digital twin of a city offers a virtual representation of its entire ecosystem.',
            'tutorial-button': 'Watch Tutorial',
          },
        },
      },
    },
    de: {
      views: {
        app: {
          'digital-twin-view': {
            'digital-twin-title': 'Der digitale Zwilling',
            'digital-twin-subtitle': 'Der digitale Zwilling einer Stadt bietet eine virtuelle Repräsentation ihres gesamten Ökosystems.',
            'tutorial-button': 'Tutorial ansehen',
          },
        },
      },
    },
  },
})

config.global.plugins = [i18n]
