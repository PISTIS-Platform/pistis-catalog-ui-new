<script setup lang="ts">
import type { PropertyTableEntryHref, PropertyTableEntryValue } from '../../utils/types'
import Typography from '../base/typography/Typography.vue'

defineProps<{
  data: PropertyTableEntryHref | PropertyTableEntryValue
}>()
</script>

<template>
  <ul>
    <li
      v-for="(entry, i) in Array.isArray(data.data) ? data.data : [data.data]"
      :key="i"
    >
      <template v-if="data.type === 'href' && typeof entry !== 'string' && typeof entry !== 'number'">
        <a
          :href="entry.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 underline"
        >
          <Typography
            as="span"
            variant="caption"
          >{{ entry.label }}</Typography>
        </a>
      </template>
      <template v-else-if="data.type === 'value'">
        <Typography
          as="span"
          variant="caption"
        >
          {{ entry }}
        </Typography>
      </template>
      <template v-else>
        <Typography
          as="span"
          variant="caption"
        >
          {{ entry }}
        </Typography>
      </template>
    </li>
  </ul>
</template>

<style scoped></style>
