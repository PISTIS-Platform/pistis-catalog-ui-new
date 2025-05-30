<script setup lang="ts">
import type { SelectOptionList } from '../../utils/types'
import InputGroup from 'primevue/inputgroup'
import InputText from 'primevue/inputtext'

const props = defineProps<{
  placeholder?: string
  selectPlaceholder?: string
  selectOptions?: SelectOptionList
  disableDropdown?: boolean
}>()

const searchValue = defineModel<string>()
</script>

<template>
  <InputGroup>
    <InputText
      v-model="searchValue"
      :placeholder="props.placeholder"
      size="small"
      class="custom-input"
    />
  </InputGroup>
</template>

<style scoped>
.custom-input {
  border: 0.3px solid #dedede ;
  border-radius: 100px !important;
  padding-left: 1rem;
}
</style>
