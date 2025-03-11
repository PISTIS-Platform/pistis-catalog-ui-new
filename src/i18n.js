import { createI18n } from 'vue-i18n'
import cs from './locales/cs.json'
import de from './locales/de.json'
import en from './locales/en.json'

function loadLocaleMessages() {
  const locales = [{ en }, { de }, { cs }]
  const messages = {}
  locales.forEach((lang) => {
    const key = Object.keys(lang)
    messages[key] = lang[key]
  })
  return messages
}

const browserLocale = navigator.language.split('-')[0]
export default createI18n({
  locale: browserLocale,
  fallbackLocale: 'de',
  legacy: false,
  messages: loadLocaleMessages(),
})
