<script lang="ts" setup>
import type { PanelProps } from 'primevue/panel'
import type { Facet } from '../../../utils/types'
import { useDataTruncator } from '@/composables/useDataTruncator'
import Panel from 'primevue/panel'
import PhCaretDown from '~icons/ph/caret-down'
import Typography from '../typography/Typography.vue'

const props = defineProps<{
  title?: string
  facets: Facet[]
}>()

defineSlots<{
  header: (props: { title?: string }) => any
}>()

const model = defineModel<string[]>()
const collapsed = defineModel<boolean>('collapsed')

const {
  data: truncatedFacets,
  toggle: toggleFacetsTruncation,
  isTruncated,
  isTruncationNeeded,
} = useDataTruncator<Facet>({
  data: props.facets,
  limit: 5,
})

const panelPreset = {
  header: ({ props }: { props: PanelProps }) => ({
    class: [
      // Flex
      'flex items-center justify-between',
      // Colors
      'text-surface-700 dark:text-surface-0/80',
      'bg-transparent',
      // 'border border-surface-200 dark:border-surface-700',
      // Shape
      'rounded-tl-lg rounded-tr-lg',
      // Conditional Spacing
      { 'px-4 py-3': props.toggleable },
    ],
  }),
  title: {
    class: 'leading-none font-bold',
  },
  toggler: {
    class: [
      'inline-flex items-center justify-center',
      'relative',
      'w-8 h-8',
      'm-0 p-0',
      'border-0 rounded-full',
      'bg-transparent',
      'text-surface-600 dark:text-surface-0/80',
      'focus:outline-hidden focus:outline-offset-0 focus-visible:ring-3 focus-visible:ring-primary-400/50 focus-visible:ring-inset dark:focus-visible:ring-primary-300/50',
      'transition-all duration-200 ease-in-out',
      'overflow-hidden no-underline',
      'cursor-pointer',
    ],
  },
  togglerIcon: {
    class: 'inline-block',
  },
  content: {
    class: ['text-surface-700 dark:text-surface-0/80'],
  },
  footer: {
    class: [
      'py-3 p-5',
      'border border-t-0 rounded-br-lg rounded-bl-lg',
      'border-surface-200 dark:border-surface-700',
      'text-surface-700 dark:text-surface-0/80',
    ],
  },
  transition: {
    enterFromClass: 'max-h-0',
    enterActiveClass: 'overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]',
    enterToClass: 'max-h-[1000px]',
    leaveFromClass: 'max-h-[1000px]',
    leaveActiveClass: 'overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]',
    leaveToClass: 'max-h-0',
  },
}
</script>

<template>
  <Panel
    v-model:collapsed="collapsed"
    class="flex min-w-64 flex-col bg-white rounded-custom"
    :pt="panelPreset"
    :pt-options="{ mergeSections: false, mergeProps: false }"
    toggleable
  >
    <template #header>
      <div class="flex w-full flex-col justify-center gap-2">
        <slot
          name="header"
          :title="props.title"
        >
          <Typography
            variant="by-heading-5"
            class="flex flex-row justify-between text-neutral-100"
          >
            {{ title }}
            <!-- <PhCaretDown class="text-lg font-semibold" /> -->
          </Typography>
        </slot>
      </div>
    </template>
    <template #togglericon="{ collapsed }">
      <PhCaretDown
        class="text-lg font-semibold transition-transform duration-200 ease-in-out"
        :class="{
          'rotate-180': !collapsed,
        }"
      />
    </template>
    <div class="flex-1">
      <ul class="flex flex-col divide-y border-neutral-20">
        <li
          v-for="(facet, i) in truncatedFacets"
          :key="i"
          class=""
        >
          <label class="relative">
            <input
              :id="facet.id"
              v-model="model"
              class="peer absolute left-0 top-0 size-0 opacity-0"
              type="checkbox"
              :value="facet.id"
              :name="facet.label"
            >
            <div
              class="max-h-12 w-full px-4 py-3 pr-6"
              :class="{
                'text-fg-muted hover:bg-neutral-20': !model?.includes(facet.id),
                'border-b border-b-primary-60 bg-primary-30 font-semibold text-primary-fg': model?.includes(facet.id),
              }"
              :name="facet.label"
              :value="facet.value || facet.id"
            >
              <div class="flex flex-1 flex-row flex-nowrap items-center justify-between">
                <div class="truncate">
                  {{ facet.label }}
                </div>
                <Typography
                  class="font-normal text-fg-muted"
                  as="div"
                  variant="button-text"
                >
                  {{ facet.count }}
                </Typography>
              </div>
            </div>
          </label>
        </li>
        <li v-if="isTruncationNeeded">
          <button class="grid max-h-12 w-full place-content-center border border-t-0 bg-[#f7f7f7] px-4 py-3 pr-6" @click="toggleFacetsTruncation">
            <i v-if="isTruncated" class="icon-[ph--caret-down]" />
            <i v-else class="icon-[ph--caret-up]" />
          </button>
        </li>
      </ul>
    </div>
  </Panel>
</template>
