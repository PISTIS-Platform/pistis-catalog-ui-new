<script setup lang="ts">
import type { FacetList } from '../../utils/types'
import { useVModel } from '@vueuse/core'
import ScrollPanel from 'primevue/scrollpanel'
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
  <ScrollPanel
    style="width: 100%; height: 100%"
    :pt="{
      wrapper: {
        style:
          'border-right: 10px solid rgb(var(--primary-400)/10%); border-bottom: 10px solid rgb(var(--primary-400)/10%);',
      },
      bary: 'relative z-20 w-[9px] top-0 rounded-none bg-surface-300 hover:bg-surface-400',
    }"
  >
    <div class="flex flex-col gap-6 px-6 py-8 lg:mt-48">
      <div
        v-if="ghost"
        class="h-[720px] w-full animate-pulse rounded-lg border bg-surface-200"
      />
      <template v-else>
        <div class="flex flex-col gap-4 w-full">
          <KFacetGroup
            v-for="facet of facets.filter((facet) => facet.items.length > 0)"
            :id="`facet-group-${facet.id}`"
            :key="`facet-group-${facet.id}`"
            v-model="model[facet.id]"
            :title="facet.label"
            :facets="facet.items"
          />
        </div>
      </template>
    </div>
  </ScrollPanel>
</template>
