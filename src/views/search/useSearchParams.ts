import type { MaybeRefOrGetter } from 'vue'
import { useDcatApSearch } from '@/sdk'
import { syncRef } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import { computed, ref, toValue } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useSearchParams(locale?: MaybeRefOrGetter) {
  const { refSyncedWithRouteQuery } = useDcatApSearch()
  const q = refSyncedWithRouteQuery('q', '')
  const limit = refSyncedWithRouteQuery('limit', 10)
  const displayedPage = refSyncedWithRouteQuery('page', 1)
  const page = computed({
    get: () => displayedPage.value - 1,
    set: (val: number) => {
      displayedPage.value = val + 1
    },
  })

  const sort = ref('modified')
  const sortDirection = ref('desc')
  // const computedSort = computed(() => `${sort.value}+${sortDirection.value}`)
  const computedSort = computed({
    get() {
      return `${sort.value}+${sortDirection.value}`
    },
    set(val: string) {
      const [sortValue, sortDirectionValue] = val.split('+')
      sort.value = sortValue
      sortDirection.value = sortDirectionValue
    },
  })
  const finalComputedSort = computed(() => {
    const unrefLocale = toValue(locale) || 'de'
    const titleSort = `title.${unrefLocale}+${sortDirection.value}`
    if (sort.value === 'relevance')
      return `${computedSort.value},modified+desc,${titleSort}`
    if (sort.value === 'modified')
      return `${computedSort.value},relevance+desc,${titleSort}`
    if (sort.value === 'issued')
      return `${computedSort.value},relevance+desc,${titleSort}`
    return computedSort.value
  })
  const routerQuerySort = useRouteQuery<string>('sort', 'modified+desc', {
    mode: 'push',
    router: useRouter(),
    route: useRoute(),
  })
  syncRef(routerQuerySort, computedSort, { direction: 'both' })

  return {
    displayedPage,
    queryParams: {
      q,
      limit,
      page,
      sort: finalComputedSort,
    },
    sort,
    sortDirection,
  }
}
