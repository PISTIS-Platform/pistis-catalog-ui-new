<script setup lang="ts">
import type { DatasetType } from '@/utils/types'
import type { RouteLocationRaw } from 'vue-router'
import KTag from '@/components/base/tag/KTag.vue'
import Typography from '@/components/base/typography/Typography.vue'
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  text?: string
  formats?: string[]
  categories?: string[]
  issued?: string
  to?: RouteLocationRaw
  href?: string
  ghost?: boolean
  datasetType?: DatasetType
}>()

const computedWrapperComponent = computed(() => {
  return props.ghost ? 'div' : props.href ? 'a' : 'router-link'
})
</script>

<template>
  <component
    :is="computedWrapperComponent"
    :to="props.to || '/'"
    class="focus:outline-hidden focus:ring-3 focus:ring-primary-400/50 group relative flex cursor-pointer gap-8 text-clip rounded-lg border border-bg-divider bg-white p-4 transition-colors hover:bg-bg-darker focus:outline-offset-0"
  >
    <div>
      <div class="flex-1">
        <slot>
          <div class="flex flex-col gap-6 text-content">
            <div class="w-full flex-1">
              <Typography
                as="h3"
                variant="header-3"
                class="text-primary-800 group-hover:underline"
              >
                {{ props.title }}
              </Typography>
            </div>
            <div class="flex flex-wrap gap-2">
              <KTag
                v-for="category in props.categories"
                :key="category"
                outline
              >
                {{ category }}
              </KTag>
            </div>
          </div>
        </slot>
      </div>
    </div>
    <div
      v-if="props.ghost"
      class="absolute left-0 top-0 size-full bg-white"
    >
      <div class="size-full animate-pulse bg-slate-200" />
    </div>
  </component>
</template>
