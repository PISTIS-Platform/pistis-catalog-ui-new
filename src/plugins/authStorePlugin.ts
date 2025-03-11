import KeycloakService from '@/services/keycloak'
import { useAuthStore } from '@/stores/authStore'

const authStorePlugin = {
  install(app: any, option: any) {
    const store = useAuthStore(option.pinia)

    app.config.globalProperties.$authStore = store

    KeycloakService.initAuthStore(store).then()
  },
}

export default authStorePlugin
