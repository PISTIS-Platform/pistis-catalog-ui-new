import appConfig from '@/../config/appConfig'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

const sparqlUrl = `${appConfig.piveauSparqlUrl}?`
const searchUrl = appConfig.piveauHubSearchUrl.endsWith('/')
  ? `${appConfig.piveauHubSearchUrl}search?`
  : `${appConfig.piveauHubSearchUrl}/search?`
const staleTime = 60 * 60 * 24 * 1000
const refetchOnWindowFocus = false

export function useDatasetStatistics() {
  const datasetsQuery = useQuery({
    queryKey: ['datasetsStats'],
    refetchOnWindowFocus,
    staleTime,
    queryFn: async () => {
      const response = await fetch(
        searchUrl + new URLSearchParams({
          filter: 'dataset',
          limit: '0',
        }).toString(),
      )
      if (!response.ok) {
        throw new Error(`failed to fetch dataset statistics from piveau ${response.status} ${response.statusText}`)
      }
      return await response.json()
    },
  })

  const distributionsQuery = useQuery({
    queryKey: ['distributionsCount'],
    refetchOnWindowFocus,
    staleTime,
    queryFn: async () => {
      const response = await fetch(
        sparqlUrl + new URLSearchParams({
          'default-graph-uri': '',
          'query': 'prefix dcat:  <http://www.w3.org/ns/dcat#> select count(?d) where { ?d a dcat:Distribution .  }',
          'format': 'application/sparql-results+json',
          'timeout': '0',
          'signal_void': 'on',
        }).toString(),
      )
      if (!response.ok) {
        throw new Error(`failed to fetch distribution statistics from piveau ${response.status} ${response.statusText}`)
      }
      return await response.json()
    },
  })

  const isError = computed(() =>
    datasetsQuery.isError || distributionsQuery.isError)
  const isLoading = computed(() =>
    datasetsQuery.isLoading || distributionsQuery.isLoading)

  const datasetsCount = computed(() => {
    if (datasetsQuery.isSuccess && !!datasetsQuery.data.value) {
      return datasetsQuery.data.value?.result.count
    }
    return '-'
  })

  const publisherCount = computed(() => {
    if (datasetsQuery.isSuccess && !!datasetsQuery.data.value) {
      const publisherFacet = datasetsQuery.data.value?.result.facets
        .find((facet: any) => facet.id === 'publisher')
      if (publisherFacet) {
        return publisherFacet.items.length
      }
    }
    return '-'
  })

  const distributionsCount = computed(() => {
    if (distributionsQuery.isSuccess && !!distributionsQuery.data.value) {
      return distributionsQuery.data.value?.results
        .bindings[0]['callret-0']
        .value
    }
    return '-'
  })

  return {
    datasetsCount,
    distributionsCount,
    publisherCount,
    isError,
    isLoading,
  }
}
