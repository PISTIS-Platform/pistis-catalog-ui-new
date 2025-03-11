<script setup lang="ts">
import Typography from '@/components/base/typography/Typography.vue'

withDefaults(
  defineProps<{
    icon?: string
    label?: string
  }>(),
  {
    icon: 'icon-[ph--globe-hemisphere-west]',
  },
)
</script>

<template>
  <div class="flex flex-row flex-nowrap items-center gap-2 rounded-lg bg-bg-darker p-2">
    <i
      class="flex-shrink-0 text-neutral-icon"
      :class="icon"
    />
    <Typography
      class="w-48 flex-1 truncate"
      variant="paragraph-2"
    >
      {{ label }}
    </Typography>
    <i class="icon-[ph--info] flex-shrink-0 text-neutral-icon" />
  </div>
</template>

<style scoped></style>
