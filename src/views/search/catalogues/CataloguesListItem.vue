<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{
  item: {
    id: string
    title: string
    description: string
  }
}>()
</script>

<template>
  <RouterLink to="datasets">
    <div
      class="group relative mx-auto box-border w-full rounded-b-none border-b-[3px]
      border-neutral-20 border-b-transparent bg-white p-12 hover:border-b-primary-pressed"
    >
      <div class="flex flex-col gap-by5">
        <span class="mb-6 font-sans text-[1.375rem] font-bold leading-8 text-primary-fg group-hover:text-primary-pressed md:text-[1.5rem] md:leading-9">
          {{ item.getTitle ?? '' }}
        </span>
        <div class="flex flex-col gap-16">
          <div class="grid grid-cols-12 gap-4">
            <p class="col-span-12 line-clamp-6 text-fg-muted lg:col-span-8">
              {{ item.getDescription ?? '' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
