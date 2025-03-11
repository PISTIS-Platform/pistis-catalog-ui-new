import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import appConfig from '../../config/appConfig.js'
import { useAuthStore } from '../stores/authStore.js'
import { useRptManager } from './useRptManager'

/**
 * Integrates resource server access protected by Keycloak using UMA protocol.
 * Retrieves access token from pinia authstore and uses it to request RPT.
 * The RPT is then stored in the Vuex auth store so that it can be used in the DPI.
 *
 */
export function useAuthToDpiBridge() {
  const dpiAuthStore = useStore()
  const authStore = useAuthStore()

  const computedAuthToken = computed(() => {
    return authStore.user.token
  })

  const rptEnabled = computed(() => {
    return !!authStore.user?.token
  })

  // Fetch rpt
  const { query: rptData } = useRptManager(({
    baseUrlKeycloak: appConfig.keycloakUrl,
    audience: 'piveau-hub-repo',
    grantType: 'urn:ietf:params:oauth:grant-type:uma-ticket',
    realm: appConfig.keycloakRealm,
    enabled: rptEnabled,
    authToken: computedAuthToken,
  }))

  const rpt = computed(() => {
    return rptData.isSuccess.value ? rptData.data.value : undefined
  })

  function updateUserData(payload: object) {
    dpiAuthStore.dispatch('auth/updateUserData', payload)
  }

  // Whenever rpt changes, update the user data in the vuex store for DPI
  watch(rpt, (newRpt) => {
    if (newRpt) {
      updateUserData({
        authToken: computedAuthToken.value,
        rtpToken: newRpt,
        hubUrl: appConfig!.piveauHubRepoUrl as string,
      })
    }
  })
}
