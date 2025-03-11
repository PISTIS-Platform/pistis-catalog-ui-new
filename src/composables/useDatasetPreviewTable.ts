import type { MaybeRefOrGetter } from 'vue'
import appConfig from '@/../config/appConfig'
import { useQuery } from '@tanstack/vue-query'
import { computed, getCurrentInstance, toValue } from 'vue'

const baseUrl = appConfig.oup.url.endsWith('/')
  ? appConfig.oup.url
  : `${appConfig.oup.url}/`
const infoUrl = `${baseUrl}UrbanPulseManagement/api/eventtypes/`
const dataurl = `${baseUrl}UrbanPulseData/historic/sensordata?`

export interface DatasetPreviewTableHeader {
  field: string
  header: string
  __dataType: string
}

export interface DatasetPreviewTableData {
  [key: string]: any
}

export function isOUPUrl(url: string) {
  return url.startsWith(infoUrl)
}

/**
 * Manages async fetching of dataset preview table data using OUP historic API
 * @param id The sensor id. If reactive, it will trigger a refetch whenever changed.
 * @param url The access url
 * @returns
 */
export function useDatasetPreviewTable(id: MaybeRefOrGetter<string>, url: MaybeRefOrGetter<string>) {
  const vm = getCurrentInstance()
  if (!vm) {
    throw new Error('useDatasetPreviewTable must be called within a setup function')
  }

  // prep for http basic auth header
  // base64 encode with consideration of possible unicode string
  // from https://developer.mozilla.org/en-US/docs/Glossary/Base64
  const encodedCredentials = btoa(
    Array.from(
      new TextEncoder().encode(`${appConfig.oup.username}:${appConfig.oup.password}`),
      byte => String.fromCodePoint(byte),
    ).join(''),
  )
  const headers = new Headers()
  headers.append('Authorization', `Basic ${encodedCredentials}`)

  const headerKey = computed(() => (['oup-header', toValue(id)]))
  const enableTableHeader = computed(() => !!toValue(id) && !!toValue(url) && isOUPUrl(toValue(url)))
  const tableHeaderQuery = useQuery({
    queryKey: headerKey,
    queryFn: async () => {
      const response = await fetch(
        toValue(url),
        {
          method: 'GET',
          headers,
        },
      )
      if (!response.ok) {
        throw new Error(`failed to fetch data from oup ${response.status} ${response.statusText}`)
      }
      return await response.json()
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: enableTableHeader,
  })

  const dataKey = computed(() => [tableHeaderQuery.data.value?.name])
  const enableTableData = computed(() => tableHeaderQuery.isSuccess.value)
  const tableDataQuery = useQuery({
    queryKey: dataKey,
    queryFn: async () => {
      const response = await fetch(
        dataurl + new URLSearchParams({
          eventTypeName: dataKey.value[0],
        }).toString(),
        {
          method: 'GET',
          headers,
        },
      )
      if (!response.ok) {
        throw new Error(`failed to fetch data from oup ${response.status} ${response.statusText}`)
      }
      return await response.json()
    },
    enabled: enableTableData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const isLoadingPreviewTable = computed(() => tableHeaderQuery.isFetching.value || tableDataQuery.isFetching.value)
  const isError = computed(() => tableHeaderQuery.isError.value || tableDataQuery.isError.value)

  const previewTableHeader = computed<DatasetPreviewTableHeader[]>(() => {
    const header = tableHeaderQuery.data.value
    if (!header)
      return []
    const headerKeys = Object.keys(header.description)
    return headerKeys.map(key => ({
      field: key,
      header: header.description[key as keyof typeof header.description],
      __dataType: header.config[key as keyof typeof header.config],
    }))
  })

  const previewTableData = computed<DatasetPreviewTableData[]>(() => {
    const data = tableDataQuery.isSuccess && tableDataQuery.data.value?.sensordata
    if (!data)
      return []
    return data
  })

  return {
    previewTableHeader,
    previewTableData,
    isLoadingPreviewTable,
    isError,
  }
}
