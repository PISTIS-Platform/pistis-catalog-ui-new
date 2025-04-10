<template>
  <!-- Facets toggle sidebar for small devices -->
  <Sidebar
      v-model:visible="sidebarVisible"
      header="Suchfilter"
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
      <facet-burger-button class="sm:hidden" :openSidebar="toggleFacetSidebar" />
      <search-bar :search-action="doSearch" v-model="searchInput" />
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
          <search-items
              :datasets="datasets"
              :getSearchResultsPagesCount="getSearchResultsPagesCount"
              :isLoading="isLoading"
              :isFetching="isFetching"
              :showOnlyPublic="showOnlyPublic"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDcatApSearch } from '@/sdk'
import { ref, toRef } from 'vue'
import { useDatasetSearchView } from '@/composables/useDatasetsSearchView'
import { useSearchParams } from '@/composables/useSearchParams'
import { useSelectedFacets } from '@/composables/useSelectedFacets'
import FacetSidebar from '@/components/facet-sidebar/FacetSidebar.vue'
import SelectedFacetsOverview from '@/components/selected-facets-overview/SelectedFacetsOverview.vue'
import SearchInfoPanel from '@/components/base/search-info-panel/SearchInfoPanel.vue'
import Sidebar from 'primevue/sidebar'
import SearchBar from "@/views/search/datasets/SearchBar.vue";
import SearchItems from "@/views/search/datasets/SearchItems.vue";
import FacetBurgerButton from "@/views/search/datasets/FacetBurgerButton.vue";

const searchInput = defineModel<string>('searchInput', { required: true })
const hvdModel = defineModel<boolean>('hvd', { required: true })
const livedataModel = defineModel<boolean>('livedata', { required: true })
const selectedFacets = toRef(useSelectedFacets())
const searchParams = useSearchParams()
const page = defineModel<number>('page', { required: true })
const sidebarVisible = ref(false);

const toggleFacetSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};

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
