<script setup lang="ts">
import type { CardProps, CardSlots } from 'primevue/card'
import Card from 'primevue/card'
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const myProps = defineProps<
  CardProps & {
    borderless?: boolean
  }
>()
const mySlots = defineSlots<CardSlots>()

const resolvedAttrs = computed(() => ({ ...useAttrs(), ...myProps }))

/**
 * @see https://tailwind.primevue.org/card/#presets.lara
 */
const pt = {
  root: {
    class: [
      'rounded-lg leading-7',
      {
        'border border-bg-divider': !myProps.borderless,
      },
      'bg-surface-0 dark:bg-surface-900',
      'text-content dark:text-surface-0',
    ],
  },
  body: {
    class: 'p-6',
  },
  title: {
    class: 'text-2xl font-medium mb-2',
  },
  subtitle: {
    class: ['font-normal', 'mb-2', 'text-surface-600 dark:text-surface-0/60'],
  },
  content: {
    class: 'py-5',
  },
  footer: {
    class: 'pt-5',
  },
}
</script>

<template>
  <Card
    v-bind="resolvedAttrs"
    :pt="pt"
    :pt-options="{ mergeSections: false, mergeProps: false }"
  >
    <template
      v-for="(_, slot) of mySlots"
      #[slot]
    >
      <slot :name="slot" />
    </template>
  </Card>
</template>

<style scoped></style>
