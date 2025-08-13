<script setup lang="ts">
import type { PropertyTableEntryNode } from '@piveau/sdk-vue'
import { ref, computed, onMounted } from 'vue'
import KButton from '../base/button/KButton.vue'
import KTag from '../base/tag/KTag.vue'
import Typography from '../base/typography/Typography.vue'
import DataToggler from '../data-toggler/DataToggler.vue'
import Dropdown from '../dropdown/Dropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
import { PropertyTable } from '../property-table/PropertyTableRow'
import LinkedDataSelector from '../base/links/LinkedDataSelector.vue'
import config from '../../../config/appConfig'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import axios from 'axios'

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

const route = useRoute()
const authStore = useAuthStore()
const token = ref(authStore.user.token)

const dataOrder = ['modified', 'license', 'created', 'languages']
const pistisMode = config.pistisMode
const resolvedData = computed(() => {
  const sortedData = [...(props.data.data || [])].sort((a, b) => {
    // eslint-disable-next-line unicorn/prefer-includes
    const aIndex = dataOrder.indexOf(a.id) === -1 ? dataOrder.length : dataOrder.indexOf(a.id)
    // eslint-disable-next-line unicorn/prefer-includes
    const bIndex = dataOrder.indexOf(b.id) === -1 ? dataOrder.length : dataOrder.indexOf(b.id)
    return aIndex - bIndex
  })

  return sortedData
})

const catalog = ref(null)
const searchUrl = ref(config.appUrl)
const fetchMetadata = async () => {
  try {
    const response = await fetch(`${searchUrl.value}datasets/${props.datasetId}`)
    const data = await response.json()
    catalog.value = data.result.catalog.id
  }
  catch (error) {
    console.error('Error fetching the metadata. ERROR: ', error)
  }
}

onMounted(() => {
    fetchMetadata();
  })

// Determine filename based on title if possible:
let downloadFileName = 'download'
const titleObject = props.title
if (titleObject) {
  const keys = Object.keys(titleObject)
  if (keys) {
    if (keys.includes('en')) {
      downloadFileName = titleObject.en
    } else {
      downloadFileName = titleObject[keys[0]]
    }
  }
}

async function downloadFile() {
  const accessUrl = props.downloadUrl
  try {
    console.log('accessUrl', accessUrl, props.format)

    const config = {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      responseType: 'blob',
    }
    if (props.format === 'SQL') {
      config.params = { JSON_output: 'False' }
    }

    const response = await axios.get(accessUrl, config)

    const contentTypeHeader = response.headers['content-type']
    const contentType = contentTypeHeader.split(';')[0].trim()

    // Map Content-Type to file extensions
    const mimeToExtensionMap = {
      'text/csv': 'csv',
      'application/json': 'json',
      'application/pdf': 'pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'text/plain': 'txt',
    }

    // Determine the file extension from Content-Type
    const fileExtension = mimeToExtensionMap[contentType] || 'bin' // Default to 'bin' for unknown types
    const fileName = `${downloadFileName}.${fileExtension}`
    // Create a Blob URL with the detected Content-Type
    const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }))
    // Create a temporary link and trigger download
    const a = document.createElement('a')
    a.href = url
    a.download = fileName // Use the dynamically determined filename
    document.body.appendChild(a)
    a.click()

    // Clean up
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    console.error('Error downloading file:', error)
    alert('Failed to download the file.')
  }
}
</script>

<template>
  <div class="mb-3 rounded-xl border-b-none bg-surface p-4">
    <div class="py-12">
      <div class="flex items-start justify-between">
        <Typography
          as="h2"
          variant="by-heading-4"
          class="text-surface-text">
          {{ title }}
        </Typography>
        <KTag class="hidden md:block">
          {{ format }}
        </KTag>
      </div>

      <div class="my-0 flex flex-col lg:my-12 lg:flex-row lg:justify-between lg:gap-28">
        <div class="flex flex-1 flex-col gap-6">
          <div
            class="markdown-content mt-4 text-sm leading-6 text-surface-light"
            v-html="description" />
          <div class="flex">
            <KTag class="md:hidden">
              {{ format }}
            </KTag>
          </div>
        </div>

        <div class="my-12 lg:my-0 lg:basis-4/12 text-surface-text">
          <DataToggler
            v-slot="{ truncated }"
            :data="resolvedData || []"
            :limit="1"
            :expanded="false">
            <PropertyTable
              :node="{
                id: 'root',
                label: '',
                type: 'node',
                isRoot: true,
                data: truncated,
              }" />
          </DataToggler>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div
          v-if="pistisMode == 'factory'"
          class="flex gap-6 flex-wrap">
          <KButton
            @click="downloadFile"
            size="small">
            {{ downloadText }}
            <i class="icon-[ph--arrow-square-out]" />
          </KButton>

          <div v-if="catalog === 'my-data'" class="flex gap-6">
            <a
            :href="`/srv/enrichment-ui?datasetId=${props.datasetId}&distributionId=${props.distributionId}&file_type=${props.format}`"
            target="_blank"
            nofollow
            noreferrer>
            <KButton size="small">
              Data Enrichment
              <!-- <i class="icon-[ph--arrow-square-out]" /> -->
            </KButton>
          </a>

          <a
            :href="`/anonymizer?datasetId=${props.datasetId}&distribution=${props.distributionId}&language=en`"
            target="_blank"
            nofollow
            noreferrer>
            <KButton size="small">
              Anonymize
              <!-- <i class="icon-[ph--arrow-square-out]" /> -->
            </KButton>
          </a>
          </div>
          <!-- <KButton>
            Preview
          </KButton> -->

          <LinkedDataSelector
            :resource-id="distributionId"
            resource="distributions"
            class="text-white dark:text-surface-900 bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-dark-hover active:bg-primary dark:active:bg-primary-dark-pressed rounded-3xl border-transparent inline-flex min-w-fit items-center justify-center text-center font-medium align-bottom h-8 text-sm px-4 py-2" />

          <!-- Why is this not showing?? -->
          <Dropdown
            severity="secondary"
            label="Beschreibung speichern">
            <DropdownItem
              v-for="[key, uri] in Object.entries(linkedData || {})"
              :key="key"
              as="a"
              :href="uri"
              target="_blank">
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
