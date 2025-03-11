<script lang="ts">
import LPFooter from '@/components/landing-page/LPFooter.vue'
import LPHeader from '@/components/landing-page/LPHeader.vue'
import FirstStepView from '@/views/FirstStepView.vue'

export default {
  name: 'PublicFirstStepView',
  components: { LPHeader, FirstStepView, LPFooter },
}
</script>

<template>
  <LPHeader />
  <FirstStepView public />
  <LPFooter />
</template>
