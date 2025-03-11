<script lang="ts">
import LPFooter from '@/components/landing-page/LPFooter.vue'
import LPHeader from '@/components/landing-page/LPHeader.vue'
import FindTwinsView from '@/views/FindTwinsView.vue'

export default {
  name: 'PublicTwinsView',
  components: { LPHeader, FindTwinsView, LPFooter },
}
</script>

<template>
  <LPHeader />
  <FindTwinsView public />
  <LPFooter />
</template>
