<script setup lang="ts">
import type { SelectOptionList } from '../../utils/types'
import Dropdown from 'primevue/dropdown'
import InputGroup from 'primevue/inputgroup'
import InputText from 'primevue/inputtext'

const props = defineProps<{
  placeholder?: string
  selectPlaceholder?: string
  selectOptions?: SelectOptionList
  disableDropdown?: boolean
}>()

const searchValue = defineModel<string>()
const selectValue = defineModel<string>('select')
</script>

<template>
  <InputGroup>
    <InputText
      v-model="searchValue"
      :placeholder="props.placeholder"
      size="small"
    />
    <Dropdown
      v-if="!props.disableDropdown"
      v-model="selectValue"
      :options="props.selectOptions"
      option-label="label"
      option-value="value"
      :placeholder="props.selectPlaceholder"
      class="md:w-[14rem] rounded-l-none"
    />
  </InputGroup>
</template>
