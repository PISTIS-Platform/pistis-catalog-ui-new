<script setup>
import COSButton from '@/components/city-os/COSButton.vue'
import DashboardWidget from '@/components/dashboards/DashboardWidget.vue'
import HomepageHeader from '@/components/homepage/HomepageHeader.vue'
import appConfig from '@config/appConfig'

const primaryColor = appConfig.customer.primaryColor

function isHof() {
  return appConfig.customer?.name === 'hof'
}

const temporaryDynamicDashboards
  = appConfig.customer?.name === 'hof'
    ? [
        {
          icon: 'src/assets/icons/Wetter.svg',
          title: 'Klima- & Wetterdashboard',
          editor: 'hoferLand.digital',
          themes: 'Klima, Temperatur, Niederschlag',
          embeddableDashboardId: '4ebc1d6e-5333-45d9-beda-8ce2e9c5ed11',
        },
        {
          icon: 'src/assets/icons/Tree.svg',
          title: 'Energie- & Umweltdashboard',
          editor: 'hoferLand.digital',
          themes: 'Nachhaltigkeit, Versorgung, Emissionen',
          embeddableDashboardId: 'a658e1c5-fa18-4540-92a7-23f3ee4c29dc',
        },
        {
          icon: 'src/assets/icons/Traffic.svg',
          title: 'Verkehrsdashboard',
          editor: 'hoferLand.digital',
          themes: 'Mobilitätsverhalten, Verkehrsinfrastruktur, Pendlerströme',
          embeddableDashboardId: 'ee38c7e2-6085-4a37-aabd-fa6da5264959',
        },
        {
          icon: 'src/assets/icons/TrendingUp.svg',
          title: 'Wirtschaftsdashboard',
          editor: 'hoferLand.digital',
          themes: 'Wirtschaft, Arbeit, Soziales',
          embeddableDashboardId: '5f1cabfa-9932-4cdd-be4f-8c0c38360697',
        },
        {
          icon: 'src/assets/icons/Bank.svg',
          title: 'Smarte Bänke',
          editor: 'hoferLand.digital',
          themes: 'IoT, Live-Daten',
          embeddableDashboardId: 'ba84895f-cda5-48a0-b8e9-f25eb3418240',
        },
      ]
    : [
        {
          icon: 'src/assets/icons/Navigation.svg',
          title: 'Mobilitätsdashboard',
          editor: 'DKSR',
          themes: 'Mobilität, Verkehr, Demografie',
          embeddableDashboardId: appConfig.dashboard.embeddableDashboardId || 'c96d68b7-a5ea-459b-bad3-d01f0dc88509',
        },
      ]
</script>

<template>
  <main>
    <HomepageHeader
      :title="$t('dashboards.title')"
      :subtitle="$t('dashboards.subtitle')"
    >
      <template v-if="!isHof()" #primary-button>
        <COSButton
          button-style="outline"
          prefix="src/assets/icons/PlusDarkBlue.svg"
          :button-text="$t('dashboard.new_dashboard')"
          :link-to="appConfig.supersetUrl"
          :capitalize-text="false"
        />
      </template>
    </HomepageHeader>
    <div class="dashboard-widgets">
      <DashboardWidget
        v-for="(widget, index) in temporaryDynamicDashboards"
        :key="index"
        :title="widget.title"
        :source="widget.editor"
        :themes="widget.themes"
        :icon="widget.icon"
        :embeddable-dashboard-id="widget.embeddableDashboardId"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100%;
}

.dashboard-widgets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
}

.content-row {
  padding: 32px 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 42px 62px;

  background: linear-gradient(187.06deg, rgba(255, 255, 255, 0.73) 69.27%, rgba(196, 196, 196, 0) 172.21%);
  border: 1.8px solid;
  border-radius: 8px;
  border-image-source: linear-gradient(169.68deg, #FFFFFF 6.36%, rgba(255, 255, 255, 0) 78.22%);
  backdrop-filter: blur(20px);
}

.title {
  color: v-bind(primaryColor);
  font-family: 'Sofia Sans', serif;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 45px; /* 125% */
}

.subtitle {
  color: #1a2025;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: justified;
}

.homepage-info {
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: start;
}

@media (max-width: 1032px) {
  .dashboard-widgets {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
}
</style>
