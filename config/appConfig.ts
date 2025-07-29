import developmentConfig from './config.dev.js'
import productionConfig from './config.js'

interface Configuration {
  appUrl: string
  keycloakUrl: string
  keycloakRealm: string
  keycloakClientId: string
  piveauHubSearchUrl: string
  pistisMode: string
}

let appConfig: Record<string, any>

if (import.meta.env.MODE === 'production') {
  appConfig = productionConfig
}
else {
  appConfig = developmentConfig
}

export default appConfig
