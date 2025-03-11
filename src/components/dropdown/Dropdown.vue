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
  <Menu as="div" class="inline-block relative">
    <MenuButton as="span">
      <KButton :severity="severity" icon="icon-[ph--caret-down]" icon-pos="right" :label="label" />
    </MenuButton>
    <div class="absolute right-0 bg-neutral-5 z-10">
      <MenuItems as="div" class="flex flex-col py-2 border border-[#D5D7DA] rounded-lg text-copy-lg">
        <slot />
      </MenuItems>
    </div>
  </Menu>
</template>
