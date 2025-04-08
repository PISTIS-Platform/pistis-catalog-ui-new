<template>
  <div
      name="content"
      class="flex flex-col overflow-x-auto"
  >
    <section class="sm:hidden">
      <slot name="hamburger">
        hamburger
      </slot>
    </section>
    <div class="mt-[15px] flex-none px-6 py-[1.875rem]">
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
    </div>
    <div class="flex-1">
      <slot>
        <div class="h-[1000px]">
          C
        </div>
        <div class="h-[1000px]">
          D
        </div>
      </slot>
    </div>
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
</template>

<script setup lang="ts">
import { useDcatApSearch } from '@/sdk'
import { computed, ref, toRef } from 'vue'
import DataInfoCard from '@/components/base/data-info-box/DataInfoCard.vue'
import { useDatasetSearchView } from '@/composables/useDatasetsSearchView'
import { useSearchParams } from '@/composables/useSearchParams'
import { useSelectedFacets } from '@/composables/useSelectedFacets'
import KSearchInput from '@/components/search-input/KSearchInput.vue'
import KButton from '@/components/base/button/KButton.vue'

const props = withDefaults(
    defineProps<{
      public?: boolean
    }>(),
    {
      public: false,
    },
)

const emit = defineEmits([
  'search',
])

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
