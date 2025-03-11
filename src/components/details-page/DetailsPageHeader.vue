<script setup lang="ts">
import Typography from '../base/typography/Typography.vue'

defineProps<{
  headline?: string
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <header class="block">
    <slot name="headline" :headline="headline">
      <Typography as="p" variant="by-copy-small-regular" class="block uppercase text-primary-fg">
        {{ headline }}
      </Typography>
    </slot>
    <slot name="title" :title="title">
      <Typography as="h1" variant="by-heading-2" class="mb-2 block text-primary-fg">
        {{ title }}
      </Typography>
    </slot>
    <slot name="subtitle" :subtitle="subtitle">
      <Typography as="p" variant="by-copy-small-regular" class="block text-primary-fg">
        {{ subtitle }}
      </Typography>
    </slot>
  </header>
</template>
