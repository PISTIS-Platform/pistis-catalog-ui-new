<script setup lang="ts">
import { useDcatApSearch } from '@/sdk'
import { ref, toRef } from 'vue'
import DataInfoCard from '../components/base/data-info-box/DataInfoCard.vue'
import KDataInfoBox from '../components/base/data-info-box/KDataInfoBox.vue'
import SearchPage from '../components/search-page/SearchPage.vue'
import { useDatasetSearchView } from '../composables/useDatasetsSearchView'
import { useSearchParams } from '../composables/useSearchParams'
import { useSelectedFacets } from '../composables/useSelectedFacets'

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

<template>
  <SearchPage
    v-model:search-input="searchInput"
    v-model:hvd="hvdModel"
    v-model:livedata="livedataModel"
    v-model:selected-facets="selectedFacets"
    v-model:sort="sort"
    v-model:sort-direction="sortDirection"
    v-model:page="searchParams.queryParams.page.value"
    v-model:sidebar-visible="sidebarVisible"
    :available-facets="availableFacetsFormatted"
    :result-count="formattedDatasetResultCount"
    :show-only-public="showOnlyPublic"
    :total-pages="getSearchResultsPagesCount"
    :is-loading="isLoading"
    search-placeholder="Suchbegriff eingeben"
    search-button-text="Suchen"
    @search="doSearch"
  >
    <template #search-results>
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
        <KDataInfoBox
          v-for="i in 8"
          :key="`placeholder--${i}`"
          title="na"
          :categories="['na']"
          ghost
        />
      </template>
    </template>
  </SearchPage>
</template>
