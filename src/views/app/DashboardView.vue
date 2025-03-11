<script setup>
import COSViewHeaderBackButtonPanel from '@/components/city-os/COSViewHeaderBackButtonPanel.vue'
import appConfig from '@config/appConfig'
// import { embedDashboard } from '@superset-ui/embedded-sdk'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const embeddableDashboardId = route.params.embeddableDashboardId || ''

async function getToken() {
  return await fetch(`${appConfig.supersetUrl}/api/v1/security/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: appConfig.dashboard.username,
      password: appConfig.dashboard.password,
      provider: 'db',
      refresh: true,
    }),
  }).then(response => response.json())
}

async function getGuestToken() {
  const tokens = await getToken()

  const csrfResponse = await fetch(`${appConfig.supersetUrl}/api/v1/security/csrf_token/`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`,
    },
  })
  const csrfToken = await csrfResponse.json()

  if (!csrfToken || !csrfToken.result) {
    throw new Error('Failed to obtain CSRF token')
  }

  const guestTokenResponse = await fetch(`${appConfig.supersetUrl}/api/v1/security/guest_token/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`,
    },
    body: JSON.stringify({
      user: {
        username: 'random',
        first_name: 'irrelevant',
        last_name: 'info',
      },
      resources: [
        {
          type: 'dashboard',
          id: embeddableDashboardId,
        },
      ],
      rls: [],
    }),
  })

  if (!guestTokenResponse.ok) {
    const error = await guestTokenResponse.text()
    throw new Error(`Failed to obtain guest token: ${error}`)
  }

  return guestTokenResponse.json()
}

async function newGuestToken() {
  const token = await getGuestToken()
  return token.token
}

onMounted(() => {
  embedDashboard({
    id: embeddableDashboardId,
    supersetDomain: appConfig.supersetUrl,
    mountPoint: document.getElementById('dashboard-element'),
    fetchGuestToken: () => newGuestToken(),
    dashboardUiConfig: {
      hideTitle: true,
      filters: {
        expanded: false,
      },
    },
  })

  document.getElementById('dashboard-element').children[0].width = '100%'
  document.getElementById('dashboard-element').children[0].height = '100%'

  console.log(newGuestToken().body)
})
</script>

<template>
  <main>
    <COSViewHeaderBackButtonPanel :context-text="$t('navigation.dashboards-context')" />
    <div id="dashboard-element" />
  </main>
</template>

<style scoped>
main {
  height: 100%;
}

#dashboard-element {
  width: 100%;
  height: 100%;
}
</style>
