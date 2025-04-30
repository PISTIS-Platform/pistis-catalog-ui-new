<script setup lang="ts">
import type { PropertyTableEntryNode } from '@piveau/sdk-vue'
import { computed } from 'vue'
import KButton from '../base/button/KButton.vue'
import KTag from '../base/tag/KTag.vue'
import Typography from '../base/typography/Typography.vue'
import DataToggler from '../data-toggler/DataToggler.vue'
import Dropdown from '../dropdown/Dropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
import { PropertyTable } from '../property-table/PropertyTableRow'

interface CardProps {
  title: string
  description: string
  format: string
  downloadText?: string
  saveText?: string
  lastUpdated?: string
  downloadUrl: string
  linkedData?: Record<string, string>
  data: PropertyTableEntryNode
  onSave?: () => void
}

const props = withDefaults(defineProps<CardProps>(), {
  downloadText: 'Zum Download',
  saveText: 'Beschreibung speichern',
  lastUpdated: '',
  onSave: () => {},
})

const dataOrder = ['modified', 'license', 'created', 'languages']
const resolvedData = computed(() => {
  const sortedData = [...props.data.data || []].sort((a, b) => {
    // eslint-disable-next-line unicorn/prefer-includes
    const aIndex = dataOrder.indexOf(a.id) === -1 ? dataOrder.length : dataOrder.indexOf(a.id)
    // eslint-disable-next-line unicorn/prefer-includes
    const bIndex = dataOrder.indexOf(b.id) === -1 ? dataOrder.length : dataOrder.indexOf(b.id)
    return aIndex - bIndex
  })

  return sortedData
})
</script>

<template>
  <div class="border-b bg-bg-lighter bg-white p-4 rounded mb-3">
    <div class="py-12">
      <div class="flex items-start justify-between">
        <Typography as="h2" variant="by-heading-4" class="text-primary-fg">
          {{ title }}
        </Typography>
        <KTag class="hidden md:block">
          {{ format }}
        </KTag>
      </div>

      <div class="my-0 flex flex-col lg:my-12 lg:flex-row lg:justify-between lg:gap-28">
        <div class="flex flex-1 flex-col gap-6">
          <div class="markdown-content mt-4 text-sm leading-6 text-fg-muted" v-html="description" />
          <div class="flex">
            <KTag class="md:hidden">
              {{ format }}
            </KTag>
          </div>
        </div>

        <div class="my-12 lg:my-0 lg:basis-4/12">
          <DataToggler v-slot="{ truncated }" :data="resolvedData || []" :limit="1" :expanded="false">
            <PropertyTable
              :node="{
                id: 'root',
                label: '',
                type: 'node',
                isRoot: true,
                data: truncated,
              }"
            />
          </DataToggler>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex gap-6">
          <a
            :href="downloadUrl"
            target="_blank"
            nofollow
            noreferrer
            download
          >
            <KButton :label="downloadText" icon="icon-[ph--arrow-square-out]" icon-pos="right" />
          </a>

          <Dropdown severity="secondary" label="Beschreibung speichern">
            <DropdownItem v-for="[key, uri] in Object.entries(linkedData || {})" :key="key" as="a" :href="uri" target="_blank">
              {{ key }}
            </DropdownItem>
          </Dropdown>

          <!-- <button
            @click="onSave"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            {{ saveText }}
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>
