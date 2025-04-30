<script setup lang="ts">
import type { LooseAutocomplete } from '../../utils/types'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import KButton from '../base/button/KButton.vue'

type Severity = 'secondary' | 'tertiary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | 'contrast'

const props = defineProps<{
  severity?: LooseAutocomplete<Severity>
  label?: string
}>()
</script>

<template>
 
</template>
