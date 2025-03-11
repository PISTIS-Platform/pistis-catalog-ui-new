<script setup lang="ts">
import type { Ref } from 'vue'
import DetailsPage from '@/components/details-page/DetailsPage.vue'
import { useRouteParams } from '@vueuse/router'

import { computed, shallowReactive, toValue } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import KCard from '../components/base/card/KCard.vue'

import Typography from '../components/base/typography/Typography.vue'
import { PropertyTable } from '../components/property-table/PropertyTableRow'
import { useSoftwareSearch } from '../sdk/index'

function ensureDatasetId(id: Ref): asserts id is Ref<string> {
  if (typeof toValue(id) !== 'string')
    throw new Error('id must be a string')
}

const router = useRouter()

const datasetId = useRouteParams('datasetId', '', {
  router,
  route: useRoute(),
})

ensureDatasetId(datasetId)

const { useResource: getDataset } = useSoftwareSearch()

const { isSuccess, query, resultEnhanced } = shallowReactive(
  getDataset(datasetId),
)

// const { getTitle, getId, getDescription, getPropertyTable, getFormattedDistributions, getCategories } = toRefs(resultEnhanced)
const { isError: searchError, error } = query
// Parse AxiosError to get the error message
const errorView = computed(() => {
  if (searchError.value) {
    return error.value?.message || 'An error occurred'
  }
  return ''
})
</script>

<template>
  <div>
    <div v-if="error" class="grid size-full place-content-center bg-bg-base">
      <KCard class="size-96">
        <template #title>
          Fehler
        </template>
        <template #content>
          {{ errorView }}
        </template>
      </KCard>
    </div>
    <DetailsPage
      headline="Prozessschritt"
      :title="resultEnhanced?.getTitle || ''"
      :subtitle="resultEnhanced?.getPublisher?.name || ''"
      :dataset-id="datasetId"
      :summary="resultEnhanced?.getSummary || []"
      :description-markup="resultEnhanced?.getDescription"
    >
      <template #subtitle>
        <span />
      </template>

      <template #about-this-dataset>
        Über diesen Prozesschritt
      </template>

      <template #sections>
        <div class="space-y-4">
          <div class="flex flex-col gap-4 pt-12">
            <Typography variant="by-heading-4" class="text-primary">
              Zusätzliche Informationen {{ }}
            </Typography>
            <PropertyTable
              v-if="isSuccess" :node="{
                type: 'node',
                id: 'a',
                label: 'a',
                data: resultEnhanced?.getPropertyTable || undefined,
              }"
            />
          </div>
        </div>
      </template>
    </DetailsPage>
  </div>
</template>
