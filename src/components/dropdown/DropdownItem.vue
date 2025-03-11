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
      class="flex w-48 py-2 px-6 hover:bg-neutral-20 text-neutral-100 items-start hover:cursor-pointer active:bg-neutral-10 "
      :class="{ 'bg-neutral-20': active }"
      v-bind="$attrs"
    >
      <slot :active="active" />
    </component>
  </MenuItem>
</template>
