<script setup>
import COSViewHeaderBackButtonPanel from '@/components/city-os/COSViewHeaderBackButtonPanel.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Replace links with deployed apps, make sure that ID is matching id in DKSRAppsView.vue
const analyticsAppsLinks = {
  '42af1ad994fe': 'https://x-creation-app.azurewebsites.net/Understanding_heatwaves',
  '20818f21de8e': 'https://x-creation-app.azurewebsites.net/Bike_Lanes',
  '56518f21de9c': 'https://x-creation-app.azurewebsites.net/Measures_against_heatwaves',
  '1884da02be32': 'https://x-creation-app.azurewebsites.net/Filter_Heat_Risk',
}

const route = useRoute()
const appLink = analyticsAppsLinks[route.params.appLink] || ''
onMounted(() => {
  const dashboardElement = document.getElementById('dashboard-element')

  const iframe = document.createElement('iframe')
  iframe.src = appLink
  iframe.width = '100%'
  iframe.height = '100%'
  iframe.style.border = 'none'

  dashboardElement.appendChild(iframe)
  document.getElementById('dashboard-element').children[0].width = '100%'
  document.getElementById('dashboard-element').children[0].height = '100%'
})
</script>

<template>
  <main>
    <COSViewHeaderBackButtonPanel :context-text="$t('navigation.apps-context')" />
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
