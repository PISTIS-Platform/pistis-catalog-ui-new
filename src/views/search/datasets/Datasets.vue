<template>
  <!-- Facets toggle sidebar for small devices -->
  <Sidebar
      v-model:visible="sidebarVisible"
      header="Kataloge durchsuchen"
  >
    <FacetSidebar
        v-model:model-value="selectedFacets"
        v-model:hvd="hvdModel"
        v-model:livedata="livedataModel"
        :public="true"
        mobile
        :facets="availableFacetsFormatted"
    />
  </Sidebar>
  <div class="container relative mx-auto grid grid-cols-1 sm:grid-cols-[minmax(auto,_20rem)_1fr] mx-auto max-w-content-max">
    <!-- Permanent facets for large devices -->
    <div
        name="sidebar"
        class="relative hidden sm:block sm:max-w-96 lg:min-w-[420px]"
    >
      <div
          name="stickysidey"
          class="sticky top-0 h-screen"
      >
        <FacetSidebar
            v-model:model-value="selectedFacets"
            v-model:hvd="hvdModel"
            v-model:livedata="livedataModel"
            :public="true"
            mobile
            :facets="availableFacetsFormatted"
        />
      </div>
    </div>
    <div name="content" class="flex flex-col overflow-x-auto">
      <!-- Facet Burger button for small devices -->
      <section class="sm:hidden">
        <div class="flex items-center gap-2 p-2">
          <KButton
              severity="contrast"
              size="large"
              @click="sidebarVisible = true"
          >
            <template #icon>
              <i class="icon-[ph--text-align-left]" />
            </template>
          </KButton>
          <Typography
              as="h4"
              variant="header-4"
          >
            Katalog durchsuchen
          </Typography>
        </div>
      </section>
      <div class="mt-[15px] flex-none px-6 py-[1.875rem]">
        <section
            name="top"
            class="flex flex-col py-16"
        >
          <form
              class="flex gap-3"
              @submit.prevent="doSearch"
          >
            <SearchInput
                v-model="searchInput"
                disable-dropdown
                class="w-full max-w-[50rem]"
                :placeholder="$t('kdw.views.DatasetSearchView.searchDataCatalog')"
                :select-options="[]"
            />
            <KButton
                class="h-full text-base"
                size="large"
                type="submit"
            >
              {{ $t('kdw.views.DatasetSearchView.search') }}
            </KButton>
          </form>
        </section>
      </div>
      <div class="flex-1">
        <section
            name="datasets"
            class="flex flex-col gap-6 px-6"
        >
          <SelectedFacetsOverview
              v-model="selectedFacets"
              :facets="availableFacetsFormatted"
          />
          <div class="flex flex-col gap-6">
            <SearchInfoPanel
                v-model:direction="sortDirection"
                v-model:sort="sort"
            >
                {{ formattedDatasetResultCount }}
            </SearchInfoPanel>
          </div>
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
                <div class="flex flex-wrap gap-2 h-64" />
              </div>
            </template>
          </div>
          <div class="grid w-full place-content-center">
            <Paginator
                v-model:first="searchParams.queryParams.page.value"
                class="rounded"
                :rows="1"
                :total-records="getSearchResultsPagesCount"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDcatApSearch } from '@/sdk'
import { computed, toRef } from 'vue'
import DataInfoCard from '@/components/base/data-info-box/DataInfoCard.vue'
import { useDatasetSearchView } from '@/composables/useDatasetsSearchView'
import { useSearchParams } from '@/composables/useSearchParams'
import { useSelectedFacets } from '@/composables/useSelectedFacets'
import SearchInput from '@/components/search-input/SearchInput.vue'
import KButton from '@/components/base/button/KButton.vue'
import FacetSidebar from '@/components/facet-sidebar/FacetSidebar.vue'
import SelectedFacetsOverview from '@/components/selected-facets-overview/SelectedFacetsOverview.vue'
import SearchInfoPanel from '@/components/base/search-info-panel/SearchInfoPanel.vue'
import Paginator from 'primevue/paginator'
import Sidebar from 'primevue/sidebar'

const searchInput = defineModel<string>('searchInput', { required: true })
const hvdModel = defineModel<boolean>('hvd', { required: true })
const livedataModel = defineModel<boolean>('livedata', { required: true })
const selectedFacets = toRef(useSelectedFacets())
const searchParams = useSearchParams()
const page = defineModel<number>('page', { required: true })
const sidebarVisible = defineModel<boolean>('sidebarVisible', { default: false })

const itemsCount = computed(() => (searchParams?.queryParams?.limit ?? 10));

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
  isPublic: true,
  searchInput,
  hvdModel,
  livedataModel,
  selectedFacets,
  searchParams,
  hubSearchQueryDefinition: useDcatApSearch,
})
</script>
