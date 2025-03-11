<script setup lang="ts">
import type { SelectOptionList } from '../../../utils/types'
import { ref } from 'vue'
import SearchInfoPanel from './SearchInfoPanel.vue'

const selectOptions = ref([
  { label: 'Name', value: 'name' },
  { label: 'Modified', value: 'modified' },
  { label: 'Created', value: 'created' },
] satisfies SelectOptionList)

const selected = ref('modified')
</script>

<template>
  <Story title="Components/Search Info Panel">
    <SearchInfoPanel
      v-model="selected"
      select-placeholder="Select a city"
      :select-options="selectOptions"
    >
      12/24 Datensets
    </SearchInfoPanel>
  </Story>
</template>
