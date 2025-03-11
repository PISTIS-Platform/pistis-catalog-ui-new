<script lang="ts" setup>
import { logEvent } from 'histoire/client'
import KInteractiveChip from './KInteractiveChip.vue'

function handleClick(id: string) {
  logEvent('click', {
    id,
  })
}
</script>

<template>
  <Story title="Components/Interactive Chip">
    <KInteractiveChip
      id-name="sci"
      group-name="Kategorie"
      label="Wissenschaft und Technologie"
      @click="handleClick"
    />
  </Story>
</template>
