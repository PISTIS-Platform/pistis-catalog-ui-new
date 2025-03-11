<script setup lang="ts">
import COSViewHeaderBackButtonPanel from '@/components/city-os/COSViewHeaderBackButtonPanel.vue'
import DataExchange from '@/components/data-exchange/DataExchange.vue'
import DataExchangeHeader from '@/components/data-exchange/DataExchangeHeader.vue'
</script>

<template>
  <COSViewHeaderBackButtonPanel :context-text="$t('navigation.data-catalog')" />
  <DataExchangeHeader />
  <DataExchange />
</template>

<style scoped>

</style>
