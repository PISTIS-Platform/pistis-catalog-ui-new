<script setup lang="ts">
import type { FacetList } from '../../utils/types'
import { useVModel } from '@vueuse/core'
import { toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

import KFacetGroup from '../base/facet-group/KFacetGroup.vue'

// Need to export the types so that the generics work properly
export type { Facet } from '../../utils/types'
export type { FacetList }

const props = defineProps<{
  public?: boolean
  facets: FacetList<string>
  ghost?: boolean
  mobile?: boolean
  modelValue: Record<string, string[]>
}>()

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()

const { facets } = toRefs(props)

const model = useVModel(props, 'modelValue', emit, { passive: true })
</script>

<template>
  <div class="flex flex-col gap-6 py-8 pr-10 lg:mt-48">
    <div
      v-if="ghost"
      class="h-[720px] w-full animate-pulse rounded-lg border bg-surface-200"
    />
    <template v-else>
      <div class="flex w-full flex-col gap-4">
        <KFacetGroup
          v-for="facet of facets.filter((facet) => facet.items.length > 0)"
          :id="`facet-group-${facet.id}`"
          :key="JSON.stringify(facet)"
          v-model="model[facet.id]"
          :title="facet.label"
          :facets="facet.items"
        />
      </div>
    </template>
  </div>
</template>
