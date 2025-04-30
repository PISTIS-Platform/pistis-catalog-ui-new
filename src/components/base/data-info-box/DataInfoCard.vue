<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { computed } from 'vue'
import SummaryBox from '../summary-box/SummaryBox.vue'
import KTag from '../tag/KTag.vue'
import Typography from '../typography/Typography.vue'

interface Summary {
  title: string
  text: string
}

interface DataInfoCardProps {
  id?: string
  title?: string
  description?: string
  fileFormats?: string[]
  ghost?: boolean
  href?: string
  to?: RouteLocationRaw
  properties?: Summary[]
}

const props = withDefaults(defineProps<DataInfoCardProps>(), {
  fileFormats: () => [],
  properties: () => [],
})

const computedWrapperComponent = computed(() => {
  return props.ghost ? 'div' : props.href ? 'a' : 'router-link'
})
</script>

<template>
  <component
    :is="computedWrapperComponent"
    :to="props.to || '/'"
    class="group relative mx-auto box-border rounded-custom by w-full rounded-b-none border-b-[3px] border-neutral-20 border-b-transparent bg-white p-12 hover:border-b-primary-pressed mb-6"
  >
    <!-- Header -->
    <div class="flex flex-col gap-by5">
      <Typography v-if="title || id" variant="by-heading-4" class="mb-6 text-primary-fg group-hover:text-primary-pressed">
        {{ title || id }}
      </Typography>
      <div class="flex flex-col gap-16">
        <slot name="body">
          <div class="grid grid-cols-12 gap-4">
            <!-- Description -->
            <p class="col-span-12 line-clamp-6 text-fg-muted lg:col-span-8">
              {{ description }}
            </p>
            <slot name="sidebar">
              <!-- File Format Tags -->
              <SummaryBox
                v-if="fileFormats.length > 0"
                class="col-span-12 lg:col-span-4"
                title="Dateiformate"
              >
                <template #text>
                  <div class="flex flex-wrap gap-2">
                    <KTag
                      v-for="format in fileFormats"
                      :key="format"
                    >
                      {{ format }}
                    </KTag>
                  </div>
                </template>
              </SummaryBox>
            </slot>
          </div>
        </slot>
        <!-- Metadata Grid -->
        <div v-if="properties && properties.length > 0" class="flex flex-row gap-6">
          <div
            v-for="(value, key) in properties"
            :key="key" class="flex-1 overflow-x-hidden"
          >
            <SummaryBox class="max-w-full" :title="value.title" :text="value.text || '-'" truncate />
          </div>
        </div>
        <div
          v-if="props.ghost"
          class="absolute left-0 top-0 size-full bg-white"
        >
          <div class="size-full animate-pulse bg-slate-200" />
        </div>
      </div>
    </div>
  </component>
</template>
