<script lang="ts">
import LPFooter from '@/components/landing-page/LPFooter.vue'
import LPHeader from '@/components/landing-page/LPHeader.vue'
import DatasetDetailsView from '@/views/DatasetDetailsView.vue'

export default {
  name: 'PublicDatasetDetailsView',
  components: { LPHeader, DatasetDetailsView, LPFooter },
}
</script>

<template>
  <LPHeader />
  <DatasetDetailsView />
  <LPFooter />
</template>

<style scoped></style>
