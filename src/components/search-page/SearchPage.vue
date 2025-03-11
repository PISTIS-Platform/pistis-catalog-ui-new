<script setup lang="ts">
import type { Facet } from '@piveau/sdk-vue'
import Paginator from 'primevue/paginator'
import Sidebar from 'primevue/sidebar'
import KButton from '../base/button/KButton.vue'
import KSearchInfoPanel from '../base/search-info-panel/SearchInfoPanel.vue'
import Typography from '../base/typography/Typography.vue'
import FacetSidebar from '../facet-sidebar/FacetSidebar.vue'
import SearchPageLayout from '../layout/SearchPageLayout.vue'
import KSearchInput from '../search-input/KSearchInput.vue'
import SelectedFacetsOverview from '../selected-facets-overview/SelectedFacetsOverview.vue'

withDefaults(defineProps<{
  public?: boolean
  availableFacets: { id: string, label: string, items: Facet[] }[]
  resultCount: string
  totalPages: number
  isLoading?: boolean
  sidebarTitle?: string
  searchPlaceholder?: string
  searchButtonText?: string
  dev?: boolean
}>(), {
  public: true,
  sidebarTitle: 'Kataloge durchsuchen',
  searchPlaceholder: 'Suchbegriff eingeben',
  searchButtonText: 'Suchen',
  dev: false,
})

const emit = defineEmits([
  'search',
])

const searchInput = defineModel<string>('searchInput', { required: true })
const hvdModel = defineModel<boolean>('hvd', { required: true })
const livedataModel = defineModel<boolean>('livedata', { required: true })
const selectedFacets = defineModel<Record<string, string[]>>('selectedFacets', { required: true })
const sort = defineModel<string>('sort', { required: true })
const sortDirection = defineModel<string>('sortDirection', { required: true })
const page = defineModel<number>('page', { required: true })
const sidebarVisible = defineModel<boolean>('sidebarVisible', { default: false })
</script>

<template>
  <Sidebar
    v-model:visible="sidebarVisible"
    header="Kataloge durchsuchen"
  >
    <slot name="face-sidebar">
      <FacetSidebar
        v-model:model-value="selectedFacets"
        v-model:hvd="hvdModel"
        v-model:livedata="livedataModel"
        :public="public"
        mobile
        :facets="availableFacets"
      />
    </slot>
  </Sidebar>
  <SearchPageLayout class="mx-auto max-w-content-max">
    <template #hamburger>
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
    </template>
    <template #sidebar>
      <slot name="face-sidebar">
        <FacetSidebar
          v-model="selectedFacets"
          v-model:hvd="hvdModel"
          v-model:livedata="livedataModel"
          :public="public"
          :facets="availableFacets"
        />
      </slot>
    </template>
    <template #top>
      <section
        name="top"
        class="flex flex-col py-16"
      >
        <form
          class="flex gap-3"
          @submit.prevent="emit('search')"
        >
          <KSearchInput
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
    </template>
    <section
      name="datasets"
      class="flex flex-col gap-6 px-6"
    >
      <SelectedFacetsOverview
        v-model="selectedFacets"
        :facets="availableFacets"
      />
      <div class="flex flex-col gap-6">
        <KSearchInfoPanel
          v-model:direction="sortDirection"
          v-model:sort="sort"
        >
          <slot name="result-count" :result-count="resultCount">
            {{ resultCount }}
          </slot>
        </KSearchInfoPanel>
      </div>
      <section v-if="dev">
        <div class="mb-4 flex flex-row gap-4">
          <RouterLink
            v-for="(resource, i) in ['Datasets', 'ProcessSteps', 'Organization', 'Project', 'Software', 'Hardware']"
            :key="i"
            v-slot="{ isActive }"
            class="by-link"
            :to="{ name: resource }"
          >
            <KButton size="small" :severity="isActive ? 'secondary' : 'tertiary'">
              {{ resource }}
            </KButton>
          </RouterLink>
        </div>
      </section>
      <div class="flex flex-col gap-2">
        <slot name="search-results" />
      </div>
      <div class="grid w-full place-content-center">
        <Paginator
          v-model:first="page"
          class="rounded"
          :rows="1"
          :total-records="totalPages"
        />
      </div>
    </section>
  </SearchPageLayout>
</template>
