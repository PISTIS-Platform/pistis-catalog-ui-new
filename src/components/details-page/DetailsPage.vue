<script setup lang="ts">
import { useDataTruncator } from '@/composables/useDataTruncator'
import { computed, toValue } from 'vue'

import { useRouter } from 'vue-router'
import PhCaretLeft from '~icons/ph/caret-left'
import SummaryBox from '../base/summary-box/SummaryBox.vue'

import TabGroup from '../base/tab-group/TabGroup.vue'

import Typography from '../base/typography/Typography.vue'

import DetailsPageHeader from './DetailsPageHeader.vue'

const props = withDefaults(defineProps<{
  headline?: string
  title?: string
  subtitle?: string
  datasetId: string
  summary?: { title: string, text: string }[]
  descriptionMarkup?: string
}>(), {
  headline: 'Datensatz',
})

const router = useRouter()

// const { useResource: getDataset } = useDcatApSearch()

// const { isSuccess, query, resultEnhanced } = shallowReactive(
//   getDataset(datasetId),
// )

// const getFormattedDistributions = computed(() => {
//   if (!isSuccess.value)
//     return []
//   if (!resultEnhanced.value?.getDistributions)
//     return []

//   return resultEnhanced.value.getDistributions.map((dist) => {
//     return {
//       title: dist.title ?? dist.id ?? '',
//       description: dist.description ?? '',
//       descriptionMarkup: DOMPurify.sanitize(marked(dist.description ?? '', { async: false })),
//       downloadUrls: dist.accessUrls || [],
//       format: dist.format ?? '',
//       id: dist.id,
//       accessUrls: dist.accessUrls,
//       modified: dist.modified ?? '',
//       data: {
//         type: 'node',
//         id: 'root',
//         label: 'root',
//         data: dist.getPropertyTable,
//       } satisfies PropertyTableEntryNode,
//       linkedData: {
//         'RDF/XML': dist.getLinkedData.rdf,
//         'Turtle': dist.getLinkedData.ttl,
//         'Notation3': dist.getLinkedData.n3,
//         'N-Tripes': dist.getLinkedData.nt,
//         'JSON-LD': dist.getLinkedData.jsonld,
//       },
//     }
//   })
// })

// const { getTitle, getId, getDescription, getPropertyTable, getFormattedDistributions, getCategories } = toRefs(resultEnhanced)
// const { isError: searchError, error } = query
// // Parse AxiosError to get the error message
// const errorView = computed(() => {
//   if (searchError.value) {
//     return error.value?.message || 'An error occurred'
//   }
//   return ''
// })

// Dataset desecription truncator "show more"
const { data: truncatedDescription, toggle: toggleDescription, isTruncated: isDescriptionTruncated, isTruncationNeeded: isDescriptionTruncationNeeded } = useDataTruncator({
  data: computed(() => props.descriptionMarkup || ''),
  limit: 550,
})

const truncatedEllipsedDescription = computed(() => {
  if (toValue(isDescriptionTruncated)) {
    return `${truncatedDescription.value}...`
  }
  return truncatedDescription.value
})

// Distribution truncator ("show more")
// const {
//   data: truncatedFormattedDistributions,
//   toggle: showAllDistributions,
//   isTruncated: isDistributionsTruncated,
// } = useDataTruncator({
//   data: getFormattedDistributions,
//   limit: 7,
// })
</script>

<template>
  <!-- <div
      v-if="error"
      class="grid size-full place-content-center bg-bg-base"
    >
      <KCard class="size-96">
        <template #title>
          Fehler
        </template>
<template #content>
          {{ errorView }}
        </template>
</KCard>
</div> -->
  <div class="container mx-auto p-8">
    <div class="mx-auto mb-12 w-full max-w-content-max space-y-12 pt-1">
      <section name="dsd-header" class="flex flex-col gap-12">
        <!-- Go previous page -->
        <div class="flex flex-col gap-12">
          <div>
            <button class="-ml-6 mt-[10px] px-4 py-1 cursor-pointer" @click="router.back()">
              <Typography variant="paragraph-1" class="flex items-center gap-2 text-primary hover:text-primary-hover">
                <PhCaretLeft />
                <span>Zurück</span>
              </Typography>
            </button>
          </div>
          <DetailsPageHeader :headline="headline" :title="title" :subtitle="subtitle">
            <template #subtitle>
              <slot name="subtitle" :subtitle="subtitle">
                <span>{{ subtitle }}</span>
                <!-- <RouterLink :to="{ name: 'Datasets', query: { catalog: resultEnhanced?.getCatalogId } }" class="by-link" /> -->
              </slot>
            </template>temp
          </DetailsPageHeader>
        </div>
        <!-- Metadata -->
        <slot name="metadata">
          <div class="mb-12 flex flex-col justify-between md:flex-row">
            <SummaryBox
              v-for="(s, i) in summary" :key="i" class="mb-4 mr-4 flex-1" :title="s.title"
              :text="s.text || '-'"
            />
            <!-- <SummaryBox class="mb-4 mr-4 flex-1" title="Datenbereitsteller" :text="resultEnhanced?.getPublisher?.name || '-'" />
              <SummaryBox class="mb-4 mr-4 flex-1" title="Aktualisiert" :text="resultEnhanced?.getModified || '-'" /> -->
          </div>
        </slot>
      </section>
      <section class="my-12">
        <TabGroup
          :tabs="[
            {
              id: 'dataset',
              title: 'Info',
              content: truncatedEllipsedDescription || '',
            },
          ]" class=""
        >
          <template #default="{ id, content }">
            <template v-if="id === 'dataset'">
              <div class="flex flex-col gap-4">
                <div>
                  <Typography as="h5" variant="by-heading-4" class="mb-8">
                    <slot name="about-this-dataset">
                      Über diesen Datensatz
                    </slot>
                  </Typography>
                  <Typography as="p" variant="by-copy-small-regular" class="text-neutral-60">
                    <div class="markdown-content" v-html="content" />
                  </Typography>
                </div>
                <button
                  v-if="isDescriptionTruncationNeeded" class="grid w-full place-content-center"
                  @click="toggleDescription"
                >
                  <div class="flex flex-col items-center justify-center text-copy-xs/6 font-bold">
                    <span>Mehr lesen</span>
                    <i v-if="isDescriptionTruncated" class="icon-[ph--caret-down]" />
                    <i v-else class="icon-[ph--caret-up]" />
                  </div>
                </button>
              </div>
            </template>
          </template>
        </TabGroup>
      </section>
      <slot name="sections">
        <!-- <section class="space-y-4">
            <div class="my-12 flex flex-row items-center gap-2">
              <h2 class="text-[2.5rem] font-bold leading-[3rem] text-primary-100">
                Distributionen
              </h2>
              <KTag interactive class="rounded-full bg-primary-90">
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
                    :title="distribution.title || ''"
                    :description="distribution.descriptionMarkup || ''"
                    :format="distribution.format || 'Unknown'"
                    :download-url="distribution.downloadUrls?.[0]!"
                    :last-updated="distribution.modified"
                    :data="distribution.data"
                    :linked-data="distribution.linkedData"
                  />
                  <div
                    v-if="i === truncatedFormattedDistributions.length - 1 && isDistributionsTruncated"
                    name="distribution-card-overlay"
                    class="absolute left-0 top-0 size-full bg-linear-to-b from-transparent from-0% to-white to-55%"
                  >
                    <div class="absolute bottom-0 flex w-full flex-row items-center justify-center">
                      <div>
                        <KButton
                          icon="icon-[ph--eye-fill]"
                          size="small"
                          severity="secondary"
                          :label="`Mehr anzeigen (${getFormattedDistributions.length})`"
                          icon-pos="left" @click="showAllDistributions"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </section>
          <div
            v-if="(resultEnhanced?.getCategories?.length || 0) > 0"
            class="space-y-3"
          >
            <Typography
              variant="by-heading-4"
              class="font-semibold text-primary"
            >
              Kategorien
            </Typography>
            <div class="flex flex-row gap-2">
              <KTag
                v-for="category in resultEnhanced?.getCategories"
                :key="category.id"
                interactive
                @click="router.push({ name: 'Datasets', query: { categories: category.id } })"
              >
                {{ getLocalizedValue({ obj: category.label, fallbackLocale: 'de' }) }}
              </KTag>
            </div>
          </div>
          <div class="h-px w-full bg-bg-divider" />
          <div class="space-y-4">
            <div class="flex flex-col gap-4 pt-12">
              <Typography
                variant="by-heading-4"
                class="text-primary"
              >
                Zusätzliche Informationen
              </Typography>
              <PropertyTable
                v-if="isSuccess"
                :node="{
                  type: 'node',
                  id: 'a',
                  label: 'a',
                  data: resultEnhanced?.getPropertyTable2 || undefined,
                }"
              />
            </div>
          </div> -->
      </slot>
    </div>
  </div>
</template>
