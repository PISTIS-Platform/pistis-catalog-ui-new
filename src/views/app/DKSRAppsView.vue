<script setup lang="ts">
import COSViewHeader from '@/components/city-os/COSViewHeader.vue'
import DKSRAppTile from '@/components/dksr-apps/DKSRAppTile.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const dksrAnalyticsApps = [
  {
    appId: '42af1ad994fe',
    imagePath: 'src/assets/images/heatwaves.png',
    provider: 'DKSR',
    categories: ['traffic', 'environment', 'energy', 'citizens'],
    translation: 'heatwaves',
  },
  {
    appId: '20818f21de8e',
    imagePath: 'src/assets/images/bikelanes.png',
    provider: 'DKSR',
    categories: ['traffic', 'citizens'],
    translation: 'bikePlanner',
  },
  {
    appId: '56518f21de9c',
    imagePath: 'src/assets/images/hood.png',
    provider: 'DKSR',
    categories: ['traffic', 'environment', 'energy', 'citizens'],
    translation: 'heatActions',
  },
  {
    appId: '1884da02be32',
    imagePath: 'src/assets/images/filter_heat_risk.png',
    provider: 'DKSR',
    categories: ['traffic', 'environment', 'energy', 'citizens'],
    translation: 'heatRisk',
  },
]
</script>

<template>
  <main>
    <COSViewHeader
      :title="$t('views.app.DKSRAppsView.title')"
      :subtitle="$t('views.app.DKSRAppsView.subtitle')"
    />
    <div class="tiles">
      <DKSRAppTile
        v-for="(app, index) in dksrAnalyticsApps"
        :key="index"
        :image-path="app.imagePath"
        :title="$t(`views.app.DKSRAppsView.apps.${app.translation}.title`)"
        :content="$t(`views.app.DKSRAppsView.apps.${app.translation}.content`)"
        :provider="app.provider"
        :categories="app.categories.map(cat => $t(`views.app.DKSRAppsView.categories.${cat}`))"
        :app-link="app.appId"
      />
    </div>
  </main>
</template>

<style scoped>
.tiles {
  padding: 1.25rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 1.25rem;
}

@media (max-width: 1032px) {
  .tiles {
    justify-content: center;
  }
}

@media (min-width: 1024px) {
}
</style>
