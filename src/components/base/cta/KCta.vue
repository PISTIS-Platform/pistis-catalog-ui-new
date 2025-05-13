<script setup lang="ts">
const props = defineProps<{
  title?: string
  text?: string
}>()
</script>

<template>
  <div class="flex h-[91px] max-h-[91px] gap-4 rounded-lg border bg-white text-neutral-900">
    <div class="bg-primary-800 size-[91px] flex-none rounded-l-lg text-white">
      <div class="grid size-full place-content-center">
        <div class="grid place-content-center">
          <slot name="icon">
            <div class="size-12 bg-white" />
          </slot>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <slot>
        <div class="py-4 pr-4 text-content">
          <p class="text-base font-semibold">
            {{ props.title }}
          </p>
          <p class="text-sm">
            {{ props.text }}
          </p>
        </div>
      </slot>
    </div>
  </div>
</template>
