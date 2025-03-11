<script setup lang="ts">
import LPDataFeatures from '@/components/landing-page/LPDataFeatures.vue'
import LPDataShare from '@/components/landing-page/LPDataShare.vue'
import LPDataVisualization from '@/components/landing-page/LPDataVisualization.vue'
import LPHero from '@/components/landing-page/LPHero.vue'
import LPInterfaceSection from '@/components/landing-page/LPInterfaceSection.vue'
import LPTeam from '@/components/landing-page/LPTeam.vue'
import LPVideo from '@/components/landing-page/LPVideo.vue'
</script>

<template>
  <div
    class="bg-[linear-gradient(180deg,_#0B1A25_0%,_#093150_71.31%,_#003F6F_100%)] text-white space-y-36 py-40 overflow-hidden relative"
  >
    <LPHero />
    <LPDataFeatures />
    <LPDataVisualization />
    <LPInterfaceSection />
    <LPVideo />
    <LPDataShare />
    <LPTeam />
  </div>
</template>

<style scoped></style>
