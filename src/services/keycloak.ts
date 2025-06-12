import i18n from '@/i18n'
import { useAuthStore } from '@/stores/authStore'
import Keycloak from 'keycloak-js'
import appConfig from '../../config/appConfig'

const options = {
  url: appConfig.keycloakUrl,
  clientId: appConfig.keycloakClientId,
  realm: appConfig.keycloakRealm,
}

const keycloak = new Keycloak(options)
let authenticated: boolean | undefined
let store = null

async function init(appInitCallback: Function) {
  try {
    authenticated = await keycloak.init({
      onLoad: 'login-required',
      silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`,
      checkLoginIframe: true,
    })

    appInitCallback()
    console.log("Keycloak initialized successfully")
  }
  catch (error) {
    console.error("Keycloak init failed")
    console.error(error)
  }
}
async function initStore(storeInstance: any) {
  try {
    store = storeInstance
    await store.initAuthStoreData(keycloak)

    const registrationURL = keycloak.createRegisterUrl()
    store.setRegistrationURL(registrationURL)

    if (!authenticated) {
      console.warn(i18n.global.t('authentication.logged_out'))
    }
  }
  catch (error) {
    console.error(error)
  }
}

function logout(url: string) {
  keycloak.logout({ redirectUri: url }).then()
}

function login(url: string) {
  keycloak.login({ redirectUri: url }).then()
}

async function refreshToken() {
  try {
    await keycloak.updateToken(import.meta.env.VITE_KEYCLOAK_MIN_TOKEN_VALIDITY)
    return keycloak
  }
  catch (error) {
    console.error(error)
  }
}

async function sendUpdatePasswordEmail() {
  const keycloakServerUrl = appConfig.keycloakUrl
  const realm = appConfig.keycloakRealm

  const authStore = useAuthStore()

  // @ts-ignore
  const userId = authStore.user.parsedToken.sub

  const url = `${keycloakServerUrl}/auth/admin/realms/${realm}/users/${userId}/execute-actions-email`

  const bodyData = {
    actions: ['UPDATE_PASSWORD'],
  }

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })

    if (response.ok) {
      console.log('Action email sent successfully')
    }
    else {
      const errorData = await response.json()
      console.error('Error sending action email:', errorData)
    }
  }
  catch (error) {
    console.error('Network error:', error)
  }
}

const KeycloakService = {
  initKeycloak: init,
  initAuthStore: initStore,
  keycloakLogout: logout,
  keycloakLogin: login,
  keycloakRefreshToken: refreshToken,
  keycloakUpdatePassword: sendUpdatePasswordEmail,
  keycloakInstance: keycloak,
}

export default KeycloakService
