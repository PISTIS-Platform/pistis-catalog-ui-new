import type { Publisher } from '@piveau/sdk-core'
import type { HubSearchDefinition } from '@piveau/sdk-vue'
import type { MaybeRef } from 'vue'
import type { LocationQueryValue } from 'vue-router'
import { useDcatApSearch } from '@/sdk'
import { getLocalizedValue } from '@/sdk/utils/helpers'
import { useAuthStore } from '@/stores/authStore'
import { useSearchInput } from '@/views/search/useSearchInput'
import { computed, ref, toRef, toRefs, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useSearchParams } from '../useSearchParams'
import { useSelectedFacets } from '../useSelectedFacets'

export interface EnhancedSearchResult {
  getId?: string
  getTitle?: string
  getDescription?: string
  getFormats: string[]
  getPublisher?: Publisher | null
  getSummary?: { title: string, text: string }[]
}

interface UseDatasetSearchViewOptions<TF extends string, TM, TS extends EnhancedSearchResult> {
  isPublic?: boolean
  hvdModel?: MaybeRef<boolean>
  livedataModel?: MaybeRef<boolean>
  searchInput?: MaybeRef<string>
  selectedFacets?: MaybeRef<{
    [f in TF]?: string[]
  }>
  searchParams?: ReturnType<typeof useSearchParams>
  hubSearchQueryDefinition?: () => HubSearchDefinition<TF, TM, TS>
}

export function useDatasetSearchView<TF extends string, TM, TS extends EnhancedSearchResult>(options: UseDatasetSearchViewOptions<TF, TM, TS>) {
  // --- Authentication, i18n and Routing ---
  const { t } = useI18n()
  const authStore = useAuthStore()
  const isAuthenticated = computed(() => !!authStore.authenticated)
  const route = useRoute()
  const showOnlyPublic = computed(() => options.isPublic || !isAuthenticated.value)

  // --- Search Query Parameters & Auth Headers ---
  function toStringOrFirst(value: LocationQueryValue | LocationQueryValue[]) {
    return Array.isArray(value) ? value[0] : value
  }
  const searchQueryArgs = {
    disableUserToken: !!route?.query?.['disable-user-token'],
    forceUserToken: toStringOrFirst(route?.query?.['force-user-token']),
  }
  const { queryParams, sort, sortDirection } = options?.searchParams
    ? options.searchParams
    : useSearchParams()
  const selectedFacets = options.selectedFacets
    ? toRef(options.selectedFacets)
    : toRef(useSelectedFacets())

  const searchHeaders = computed(() => ({
    ...(!searchQueryArgs.disableUserToken && authStore.user.token
      ? { Authorization: `Bearer ${searchQueryArgs.forceUserToken ?? authStore.user.token}` }
      : {}),
  }))

  // --- Dataset Scope: Model Toggles & Computed Flags ---
  const hvdModel = toRef(options?.hvdModel || false)
  const livedataModel = ref(options?.livedataModel || false)
  const isHvd = computed(() => (hvdModel.value ? ['true'] : []))
  const isLivedata = computed(() =>
    livedataModel.value
      ? [
          'http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT',
          'http://publications.europa.eu/resource/authority/frequency/CONT',
        ]
      : [],
  )

  // --- Search API Integration ---
  const { useSearch } = options.hubSearchQueryDefinition
    ? options.hubSearchQueryDefinition()
    : useDcatApSearch()
  const {
    getSearchResultsEnhanced,
    getSearchResultsCount,
    getSearchResultsPagesCount,
    getAvailableFacetsLocalized,
    isFetching,
    isLoading,
  } = useSearch({
    queryParams,
    selectedFacets: {
      ...toRefs(selectedFacets.value),
      is_hvd: isHvd,
      periodicity: isLivedata,
    },
    headers: searchHeaders,
  })

  const { doSearch } = useSearchInput(options)

  // --- Search Info Panel ---
  const numOfSearchResults = computed(() => getSearchResultsCount.value)
  const formattedDatasetResultCount = computed(
    () => `${numOfSearchResults.value} ${t('kdw.views.DatasetSearchView.datasets')}`,
  )

  // --- Datasets Mapping (Search Result Cards) ---
  const datasets = computed(() => {
    const results = getSearchResultsEnhanced.value
    if (!results || !results.length)
      return []
    return results.map(dcat => ({
      id: dcat.getId,
      title: dcat.getTitle || '',
      publisher: dcat.getPublisher?.name || '',
      description: dcat.getDescription || '',
      formats: dcat.getFormats || [],
      datasetType: (dcat as any)?.public === false ? 'kritis' : 'opendata',
      summary: dcat.getSummary || [],
    }))
  })

  // --- Facets ---
  const availableFacetsDe = getAvailableFacetsLocalized('de')
  const availableFacetsWithoutHvd = computed(() =>
    availableFacetsDe.value?.filter(facet => facet.id !== 'is_hvd'),
  )
  const availableFacetsFormatted = computed(() => {
    return availableFacetsWithoutHvd.value
      ?.map(facet => ({
        id: facet.id,
        label: t(`datasetFacets.facets.${facet.id}`) ?? facet.id,
        items: facet.items.map((item, index) => ({
          id: item.id || `${index}`,
          label:
                typeof item.title === 'string'
                  ? item.title
                  : (!item.title
                      ? (item.id ?? `item${index}` ?? '')
                      : getLocalizedValue({ obj: item.title, fallbackLocale: 'de' })),
          count: item.count ?? 0,
          value: item.id ?? '__value__',
        })),
      }))
      .filter(facet => Object.keys(unref(selectedFacets)).includes(facet.id)) || []
  })

  return {
    selectedFacets,
    hvdModel,
    livedataModel,
    availableFacetsFormatted,
    availableFacetsDe,
    doSearch,
    sort,
    sortDirection,
    getSearchResultsCount,
    datasets,
    queryParams,
    getSearchResultsPagesCount,
    isFetching,
    isLoading,
    showOnlyPublic,
  }
}
