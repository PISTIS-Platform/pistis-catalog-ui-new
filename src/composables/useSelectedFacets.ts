import { useDcatApCatalogSearch, useDcatApSearch } from '../sdk/index'

export function useSelectedFacets() {
  const { refSyncedWithRouteQueryFacet } = useDcatApSearch()

  return {
    categories: refSyncedWithRouteQueryFacet('categories', [] as string[]),
    publisher: refSyncedWithRouteQueryFacet('publisher', [] as string[]),
    format: refSyncedWithRouteQueryFacet('format', [] as string[]),
    license: refSyncedWithRouteQueryFacet('license', [] as string[]),
    catalog: refSyncedWithRouteQueryFacet('catalog', [] as string[]),
  }
}

export function useSelectedFacetsCatalog() {
  const { refSyncedWithRouteQueryFacet } = useDcatApCatalogSearch()

  return {
    country: refSyncedWithRouteQueryFacet('country', [] as string[]),
    superCatalog: refSyncedWithRouteQueryFacet('superCatalog', [] as string[]),
  }
}
