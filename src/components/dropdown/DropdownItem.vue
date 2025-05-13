<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'

const props = defineProps<{
  as: string
}>()
</script>

<template>
  <MenuItem v-slot="{ active }">
    <component
      :is="props.as || 'button'"
      class="flex w-48 items-start px-6 py-2 text-neutral-100 hover:cursor-pointer hover:bg-neutral-20 active:bg-neutral-10 "
      :class="{ 'bg-neutral-20': active }"
      v-bind="$attrs"
    >
      <slot :active="active" />
    </component>
  </MenuItem>
</template>
