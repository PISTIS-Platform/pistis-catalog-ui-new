import type Keycloak from 'keycloak-js'
import { appRoute } from '@/router.ts'
import KeycloakService from '@/services/keycloak'
import { defineStore } from 'pinia'
import appConfig from '../../config/appConfig'

interface AuthStoreUser {
  username: string
  token: string | undefined
  refToken: string | undefined
  parsedToken: object | undefined
  groupMemberships: string[]
}

export const useAuthStore = defineStore({
  id: 'storeAuth',
  state: () => {
    return {
      authenticated: <boolean | undefined>false,
      user: <AuthStoreUser>{},
      registrationURL: '',
    }
  },

  getters: {},
  actions: {
    async initAuthStoreData(keycloak: Keycloak, clearData = true) {
      if (clearData) {
        await this.clearUserData()
      }

      this.authenticated = keycloak.authenticated
      this.user.username = keycloak.idTokenParsed?.preferred_username
      this.user.token = keycloak.token
      this.user.refToken = keycloak.refreshToken
      this.user.parsedToken = keycloak.idTokenParsed
      this.user.groupMemberships
        = keycloak.idTokenParsed?.group_membership?.map((membership: string) => membership.slice(1)) || []
    },

    async setRegistrationURL(url: string) {
      this.registrationURL = url
    },

    async logout() {
      try {
        await KeycloakService.keycloakLogout(appConfig.appUrl)
        await this.clearUserData()
      }
      catch (error) {
        console.error(error)
      }
    },
    async login() {
      try {
        await KeycloakService.keycloakLogin(appRoute)
      }
      catch (error) {
        console.error(error)
      }
    },
    async refreshUserToken() {
      try {
        const keycloak = await KeycloakService.keycloakRefreshToken()
        if (keycloak !== undefined) {
          await this.initAuthStoreData(keycloak, false)
        }
      }
      catch (error) {
        console.error(error)
      }
    },
    clearUserData() {
      this.authenticated = false
      this.user = <AuthStoreUser>{}
    },
  },
})
