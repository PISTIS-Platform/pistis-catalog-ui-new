<script setup lang="ts">
import type { SelectOptionList } from '../../utils/types'

const props = defineProps<{
  placeholder?: string
  selectPlaceholder?: string
  selectOptions?: SelectOptionList
  disableDropdown?: boolean
}>()

const searchValue = defineModel<string>()
</script>

<template>
  <input
    v-model="searchValue"
    :placeholder="props.placeholder"
    size="small"
    class="custom-input text-surface-800 dark:text-surface-200 bg-surface-0 dark:bg-surface-900 border focus:outline-hidden" />
</template>

<style scoped>
.custom-input {
  border: 0.3px solid #dedede;
  border-radius: 100px !important;
  padding-left: 1rem;
}
</style>