<script setup>
import COSTooltip from '@/components/city-os/COSTooltip.vue'
import SidebarIconButton from '@/components/navigation/sidebar/SidebarIconButton.vue'
</script>

<template>
  <div class="navigation-sidebar">
    <nav class="sidebar-content">
      <COSTooltip :text="$t('tooltips.home')">
        <SidebarIconButton
          icon="src/assets/icons/Home.svg"
          icon-active="src/assets/icons/HomeActive.svg"
          route="/app/home"
        />
      </COSTooltip>
      <COSTooltip :text="$t('tooltips.digital-twin')">
        <SidebarIconButton
          icon="src/assets/icons/Flip.svg"
          icon-active="src/assets/icons/FlipActive.svg"
          route="/app/digital-twin"
        />
      </COSTooltip>
      <COSTooltip :text="$t('tooltips.dashboards')">
        <SidebarIconButton
          icon="src/assets/icons/Layout.svg"
          icon-active="src/assets/icons/LayoutActive.svg"
          route="/app/dashboards"
        />
      </COSTooltip>
      <COSTooltip :text="$t('tooltips.data-catalog')">
        <SidebarIconButton
          icon="src/assets/icons/Layer.svg"
          icon-active="src/assets/icons/LayerActive.svg"
          route="/app/data-catalog"
        />
      </COSTooltip>
      <!--      <COSTooltip text="Datenanalyse"> -->
      <!--        <SidebarIconButton -->
      <!--          icon="src/assets/icons/Stats.svg" -->
      <!--          icon-active="src/assets/icons/StatsActive.svg" -->
      <!--          route="/app/movement-stats" /> -->
      <!--      </COSTooltip> -->
      <COSTooltip :text="$t('tooltips.organisation-sites')">
        <SidebarIconButton
          icon="src/assets/icons/Compass.svg"
          icon-active="src/assets/icons/CompassActive.svg"
          route="/app/organisation-sites"
        />
      </COSTooltip>
    </nav>
  </div>
</template>

<style scoped>
.navigation-sidebar {
  height: 100%;
  position: fixed;
  top: 73px;
  left: 0;
  width: 72px;
  background-color: white;
  border-right: 1px solid #d4dde3;
  z-index: 999;
}

.sidebar-content {
  padding-top: 16px;
  gap: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
</style>
