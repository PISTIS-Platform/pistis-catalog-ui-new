<script setup lang="ts">
import { computed } from 'vue'
import Typography from '../typography/Typography.vue'

const props = defineProps<{
  title?: string
  text?: string
  /**
   * Whether to truncate the text to keep it on one line
   */
  truncate?: boolean
}>()

const computedTextClasses = computed(() => ({
  truncate: props.truncate,
}))
</script>

<template>
  <div class="flex flex-col gap-by1">
    <slot name="title" :title="props.title">
      <Typography as="div" variant="by-caption" class="uppercase">
        {{ props.title }}
      </Typography>
    </slot>
    <slot name="text" :text="props.text">
      <Typography as="div" variant="by-copy-small-regular" :class="computedTextClasses">
        {{ props.text }}
      </Typography>
    </slot>
  </div>
</template>
