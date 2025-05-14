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
  <router-link to="datasets">
    <div class="group relative mx-auto box-border w-full rounded-3xl border-b-[3px]
      border-neutral-20 border-b-transparent bg-surface p-12 hover:border-b-primary">
      <div class="flex flex-col gap-by5 text-surface-text">
        <span class="font-sans font-bold text-[1.375rem] leading-[2rem] md:text-[1.5rem] md:leading-[2.25rem] mb-6">
          {{ item.getTitle ?? '' }}
        </span>
        <div class="flex flex-col gap-16">
          <div class="grid grid-cols-12 gap-4">
            <p class="col-span-12 line-clamp-6 lg:col-span-8">
              {{ item.getDescription ?? '' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
