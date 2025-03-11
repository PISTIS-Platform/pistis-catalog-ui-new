<script setup>
import COSButton from '@/components/city-os/COSButton.vue'
import HomepageHeader from '@/components/homepage/HomepageHeader.vue'
import HomepageQuickLinks from '@/components/homepage/HomepageQuickLinks.vue'
import HofDashboards from '@/components/landing-page/hof/HofDashboards.vue'
import HofDatacatalog from '@/components/landing-page/hof/HofDatacatalog.vue'
import HofDigitalTwin from '@/components/landing-page/hof/HofDigitalTwin.vue'
import HofLPFeatures from '@/components/landing-page/hof/HofLPFeatures.vue'
import HofLPHeader from '@/components/landing-page/hof/HofLPHeader.vue'
import UserDashboard from '@/components/user-dashboard/user-dashboard.vue'
import { useAuthStore } from '@/stores/authStore'
import appConfig from '@config/appConfig'

const homepageHeaderImage = `src/assets/images/${appConfig.components.headerImageFileName}`
const authStore = useAuthStore()
</script>

<template>
  <main
    v-if="appConfig.customer.name === 'kdw' || (appConfig.customer.name === 'hof' && authStore.authenticated)"
    class="main-background"
  >
    <HomepageHeader
      :title="`${$t('homepage.title')} ${authStore.user.parsedToken?.name}`"
      :subtitle="$t('homepage.subtitle')"
      :background-image-url="homepageHeaderImage"
    >
      <template #primary-button>
        <COSButton
          button-style="outline"
          suffix="src/assets/icons/ThreeDotsVertical.svg"
          route-to="data-catalog/organisation-data"
          :button-text="$t('home.organisation_data')"
          :capitalize-text="false"
        />
      </template>
    </HomepageHeader>
    <HomepageQuickLinks />
    <UserDashboard
      v-if="authStore.authenticated"
      :widgets="appConfig.customer.modules.home.widgets"
    />
  </main>
  <main v-if="appConfig.customer.name === 'hof' && !authStore.authenticated">
    <HofLPHeader />
    <HofLPFeatures />
    <HofDigitalTwin />
    <HofDashboards />
    <HofDatacatalog />
    <!--        <HofOrganisations></HofOrganisations> -->
    <!--        <HofDiscoverData></HofDiscoverData> -->
  </main>
</template>

<style scoped>
.main-background {
  min-height: 95dvh;
  background: #f5f7fa;
}
</style>
