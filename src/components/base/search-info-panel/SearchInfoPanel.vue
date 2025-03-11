<script setup lang="ts">
import SortSplitButton from '../../../components/sort-split-button/SortSplitButton.vue'

const sort = defineModel<string>('sort', { default: 'relevance' })
const direction = defineModel<string>('direction', { default: 'desc' })
</script>

<template>
  <section>
    <div class="flex flex-col gap-x-2 gap-y-4 lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between">
      <div class="min-w-fit">
        <p class="font-medium leading-5 text-fg-muted">
          <slot />
        </p>
      </div>
      <div>
        <SortSplitButton
          v-model:direction="direction"
          v-model:sort="sort"
        />
      </div>
    </div>
  </section>
</template>
