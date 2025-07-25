<script setup lang="ts">
import type { PropertyTableEntryNode } from '@piveau/sdk-vue'
import type { Ref } from 'vue'
import DetailsPage from '@/components/details-page/DetailsPage.vue'
import { useDataTruncator } from '@/composables/useDataTruncator'
import { useRouteParams } from '@vueuse/router'
import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'

import { computed, shallowReactive, toValue } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import KButton from '../components/base/button/KButton.vue'
import KCard from '../components/base/card/KCard.vue'

import KTag from '../components/base/tag/KTag.vue'
import Typography from '../components/base/typography/Typography.vue'
import DistributionCard from '../components/distribution-card/DistributionCard.vue'
import { PropertyTable } from '../components/property-table/PropertyTableRow'
import { useDcatApSearch } from '../sdk/index'

import { getLocalizedValue } from '../sdk/utils/helpers'

import { ref } from 'vue'
import config from '../../config/appConfig'
import MonetizationView from '@/components/monetization/MonetizationView.vue'

function ensureDatasetId(id: Ref): asserts id is Ref<string> {
  if (typeof toValue(id) !== 'string')
    throw new Error('id must be a string')
}

const router = useRouter()
const searchUrl = ref(config)

const datasetId = useRouteParams('datasetId', '', {
  router,
  route: useRoute(),
})

ensureDatasetId(datasetId)

const { useResource: getDataset } = useDcatApSearch()

const { isSuccess, query, resultEnhanced } = shallowReactive(
  getDataset(datasetId),
)

const getFormattedDistributions = computed(() => {
  if (!isSuccess.value)
    return []
  if (!resultEnhanced.value?.getDistributions)
    return []

  return resultEnhanced.value.getDistributions.map((dist) => {
    return {
      title: dist.title ?? dist.id ?? '',
      description: dist.description ?? '',
      descriptionMarkup: DOMPurify.sanitize(marked(dist.description ?? '', { async: false })),
      downloadUrls: dist.accessUrls || [],
      format: dist.format ?? '',
      id: dist.id,
      accessUrls: dist.accessUrls,
      modified: dist.modified ?? '',
      data: {
        type: 'node',
        id: 'root',
        label: 'root',
        data: dist.getPropertyTable,
      } satisfies PropertyTableEntryNode,
      linkedData: {
        'RDF/XML': dist.getLinkedData.rdf,
        'Turtle': dist.getLinkedData.ttl,
        'Notation3': dist.getLinkedData.n3,
        'N-Tripes': dist.getLinkedData.nt,
        'JSON-LD': dist.getLinkedData.jsonld,
      },
    }
  })
})

// const { getTitle, getId, getDescription, getPropertyTable, getFormattedDistributions, getCategories } = toRefs(resultEnhanced)
const { isError: searchError, error } = query
// Parse AxiosError to get the error message
const errorView = computed(() => {
  if (searchError.value) {
    return error.value?.message || 'An error occurred'
  }
  return ''
})

// Distribution truncator ("show more")
const {
  data: truncatedFormattedDistributions,
  toggle: showAllDistributions,
  isTruncated: isDistributionsTruncated,
} = useDataTruncator({
  data: getFormattedDistributions,
  limit: 7,
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
      headline="Datensatz"
      :title="resultEnhanced?.getTitle || ''"
      :subtitle="resultEnhanced?.getPublisher?.name || ''"
      :dataset-id="datasetId"
      :summary="[
        {
          title: 'Datenbereitsteller',
          text: resultEnhanced?.getPublisher?.name || '-',
        },
        {
          title: 'Aktualisiert',
          text: resultEnhanced?.getModified || '-',
        },
      ]" :description-markup="resultEnhanced?.getDescriptionMarkup"
    >
      <template #subtitle="{ subtitle }">
        <RouterLink :to="{ name: 'Datasets', query: { catalog: resultEnhanced?.getCatalogId } }" class="by-link">
          {{ subtitle }}
        </RouterLink>
      </template>

      <template #sections>
        <section class="space-y-4">
          <div class="my-12 flex flex-row items-center gap-2">
            <h2 class="text-[2.5rem] font-bold leading-[3rem] text-primary-100">
              Distributionen
            </h2>
            <KTag class="rounded-full bg-secondary">
              {{
                getFormattedDistributions?.length
              }}
            </KTag>
          </div>
          <div class="h-px w-full bg-bg-divider" />
          <div name="distribution-cards" class="relative">
            <template v-for="(distribution, i) in truncatedFormattedDistributions" :key="distribution.id">
              <div name="distribution-card-wrapper" class="relative">
                <DistributionCard
                  :title="distribution.title || ''" :description="distribution.descriptionMarkup || ''"
                  :format="distribution.format || 'Unknown'" :download-url="distribution.downloadUrls?.[0]!"
                  :last-updated="distribution.modified" :data="distribution.data"
                  :linked-data="distribution.linkedData"
                  :datasetId="datasetId"
                  :distributionId="distribution.id"
                />
                <div
                  v-if="i === truncatedFormattedDistributions.length - 1 && isDistributionsTruncated"
                  name="distribution-card-overlay"
                  class="bg-linear-to-b absolute left-0 top-0 size-full from-transparent from-0% to-white to-55%"
                >
                  <div class="absolute bottom-0 flex w-full flex-row items-center justify-center">
                    <div>
                      <KButton
                        :label="`Mehr anzeigen (${getFormattedDistributions.length})`"
                        @click="showAllDistributions"
                      >
                        <i class="icon-[ph--eye-fill]"></i>
                      </KButton> 
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </section>
        <div v-if="(resultEnhanced?.getCategories?.length || 0) > 0" class="space-y-3">
          <Typography variant="by-heading-4" class="font-semibold text-primary-100">
            Kategorien
          </Typography>
          <div class="flex flex-row gap-2">
            <KTag
              v-for="category in resultEnhanced?.getCategories" :key="category.id" interactive
              @click="router.push({ name: 'Datasets', query: { categories: category.id } })"
            >
              {{ getLocalizedValue({ obj: category.label, fallbackLocale: 'de' }) }}
            </KTag>
          </div>
        </div>
        <div class="h-px w-full bg-bg-divider" />
        <div class="space-y-4">
          <div class="flex flex-col rounded-xl gap-4 bg-surface p-4 pt-12">
            <Typography variant="by-heading-4" class="">
              Zusätzliche Informationen
            </Typography>
            <PropertyTable
              v-if="isSuccess" :node="{
                type: 'node',
                id: 'a',
                label: 'a',
                data: resultEnhanced?.getPropertyTable2 || undefined,
              }"
            />
            <MonetizationView/>
          </div>
        </div>
      </template>
    </DetailsPage>
  </div>
</template>
