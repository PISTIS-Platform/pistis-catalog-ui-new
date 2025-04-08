<template>
  <div class="flex flex-col gap-2">
    <template v-if="!isLoading && !isFetching">
      <DataInfoCard
          v-for="dataset in datasets"
          :key="dataset.id"
          :to="{ name: 'dataset-details', params: { datasetId: dataset.id } }"
          :title="dataset.title"
          :description="dataset.description"
          :file-formats="dataset.formats"
          :properties="dataset.summary"
      />
    </template>
    <template v-else>
      <div v-for="i in itemsCount.value" :key="i" class="size-full flex flex-col gap-6 text-content animate-pulse bg-slate-200">
        <div class="flex flex-wrap gap-2 h-36" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useDcatApSearch } from '@/sdk'
import { computed, ref, toRef } from 'vue'
import DataInfoCard from '@/components/base/data-info-box/DataInfoCard.vue'
import { useDatasetSearchView } from '@/composables/useDatasetsSearchView'
import { useSearchParams } from '@/composables/useSearchParams'
import { useSelectedFacets } from '@/composables/useSelectedFacets'

// const datasets = [{
//   id: 1,
//   title: "Mock Dataset",
//   description: "Mock Dataset description !!!",
//   formats: [],
//   summary: "Mock Dataset",
// }];

const props = withDefaults(
    defineProps<{
      public?: boolean
    }>(),
    {
      public: false,
    },
)

// --- UI ---
const sidebarVisible = ref(false)

// --- Input models ---
const searchInput = ref<string>('')
const hvdModel = ref<boolean>(false)
const livedataModel = ref<boolean>(false)
const selectedFacets = toRef(useSelectedFacets())
const searchParams = useSearchParams()

const itemsCount = computed(() => (searchParams?.queryParams?.limit ?? 10));

// --- Query management ---
const {
  availableFacetsFormatted,
  sort,
  sortDirection,
  formattedDatasetResultCount,
  datasets,
  getSearchResultsPagesCount,
  isLoading,
  isFetching,
  showOnlyPublic,
  doSearch,
} = useDatasetSearchView({
  isPublic: props.public,
  searchInput,
  hvdModel,
  livedataModel,
  selectedFacets,
  searchParams,
  hubSearchQueryDefinition: useDcatApSearch,
})
</script>
