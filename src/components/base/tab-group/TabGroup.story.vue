<script setup lang="ts">
import type { TabItem } from './TabGroup.vue'
import { ref } from 'vue'
import TabGroup from './TabGroup.vue'

const tabs = ref<TabItem[]>([
  {
    id: 'dataset',
    title: 'Über diesen Datensatz',
    content: 'Der Datensatz enthält Routenbeschreibungen aller Art, die für Freizeitunternehmungen interessant sind.',
  },
  {
    id: 'similar',
    title: 'Ähnliche Datensätze',
    content: 'Hier finden Sie ähnliche Datensätze und verwandte Informationen.',
  },
])

function handleTabChange(tabId: string) {
  console.log('Tab changed to:', tabId)
}
</script>

<template>
  <Story title="Base Components/TabGroup">
    <TabGroup
      :tabs="tabs"
      class="mx-auto max-w-4xl"
      @tab-change="handleTabChange"
    />
  </Story>
</template>
