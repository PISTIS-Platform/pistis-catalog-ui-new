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
import LinkedDataSelector from '../base/links/LinkedDataSelector.vue'
import config from '../../../config/appConfig'


interface CardProps {
  title: string
  description: string
  format: string
  downloadText?: string
  saveText?: string
  lastUpdated?: string
  downloadUrl: string
  linkedData?: Record<string, string>
  datasetId: string
  distributionId: string
  data: PropertyTableEntryNode
  onSave?: () => void
}

const props = withDefaults(defineProps<CardProps>(), {
  downloadText: 'Download',
  saveText: 'Beschreibung speichern',
  lastUpdated: '',
  onSave: () => {},
})

const dataOrder = ['modified', 'license', 'created', 'languages']
const pistisMode = config.pistisMode
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
  <div class="mb-3 rounded-xl border-b-none bg-surface p-4">
    <div class="py-12">
      <div class="flex items-start justify-between">
        <Typography as="h2" variant="by-heading-4" class="text-surface-text">
          {{ title }}
        </Typography>
        <KTag class="hidden md:block">
          {{ format }}
        </KTag>
      </div>

      <div class="my-0 flex flex-col lg:my-12 lg:flex-row lg:justify-between lg:gap-28">
        <div class="flex flex-1 flex-col gap-6">
          <div class="markdown-content mt-4 text-sm leading-6 text-surface-light" v-html="description" />
          <div class="flex">
            <KTag class="md:hidden">
              {{ format }}
            </KTag>
          </div>
        </div>

        <div class="my-12 lg:my-0 lg:basis-4/12 text-surface-text"> 
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
        <div v-if="pistisMode == 'factory'" class="flex gap-6 flex-wrap">
          <a
            :href="downloadUrl"
            target="_blank"
            nofollow
            noreferrer
            download
            class=""
          >
            <KButton
              size="small">
              {{ downloadText }}
                <i class="icon-[ph--arrow-square-out]" />
            </KButton>
          </a>

          <a
            :href="`/srv/enrichment-ui?datasetId=${datasetId}&distributionId=${distributionId}&file_type=${format}`"
            target="_blank"
            nofollow
            noreferrer
          >
            <KButton
            size="small">
              Data Enrichment
              <!-- <i class="icon-[ph--arrow-square-out]" /> -->
            </KButton>
          </a>

          <a
            :href="`/anonymizer?datasetId=${datasetId}&distribution=${distributionId}&language=en`"
            target="_blank"
            nofollow
            noreferrer
          >
            <KButton
            size="small">
              Anonymize
              <!-- <i class="icon-[ph--arrow-square-out]" /> -->
            </KButton>
          </a>
          <!-- <KButton>
            Preview
          </KButton> -->

          <LinkedDataSelector :resource-id="distributionId" resource="distributions" class="text-white dark:text-surface-900 bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-dark-hover active:bg-primary dark:active:bg-primary-dark-pressed rounded-3xl border-transparent inline-flex min-w-fit items-center justify-center text-center font-medium align-bottom h-8 text-sm px-4 py-2"/>

          <!-- Why is this not showing?? -->
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