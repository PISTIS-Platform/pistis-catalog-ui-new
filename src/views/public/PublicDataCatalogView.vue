<script lang="ts">
import LPFooter from '@/components/landing-page/LPFooter.vue'
import LPHeader from '@/components/landing-page/LPHeader.vue'
import DatasetSearchView from '@/views/DatasetSearchView.vue'

export default {
  name: 'PublicDataCatalogView',
  components: { LPHeader, DatasetSearchView, LPFooter },
}
</script>

<template>
  <LPHeader />
  <DatasetSearchView public />
  <LPFooter />
</template>
