<script setup lang="ts">
import { ref } from 'vue'
import KSearchInput from './KSearchInput.vue'

const cities = ref([
  { label: 'New York', value: 'NY' },
  { label: 'Rome', value: 'RM' },
  { label: 'London', value: 'LDN' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'Paris', value: 'PRS' },
])

const input = ref('')
const select = ref('')

const placeholder = ref('Freetext search')
const selectPlaceholder = ref('Select a city')
</script>

<template>
  <Story title="Components/Search Input">
    <KSearchInput
      v-model="input"
      v-model:select="select"
      :placeholder="placeholder"
      :select-options="cities"
      :select-placeholder="selectPlaceholder"
    />
  </Story>
</template>

<style scoped></style>
