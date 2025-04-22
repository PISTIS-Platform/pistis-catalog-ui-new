import { toRef, toRefs } from 'vue';
import {useDcatApCatalogSearch} from "@/sdk";
import {useSearchParams} from "../useSearchParams";
import {useSelectedFacetsCatalog} from "../useSelectedFacets";
import {useSearchInput} from "@/views/search/useSearchInput";

export const useCatalogs = (options) => {

    const { queryParams, sort, sortDirection } = options?.searchParams
        ? options.searchParams
        : useSearchParams()
    const selectedFacets = options.selectedFacets
        ? toRef(options.selectedFacets)
        : toRef(useSelectedFacetsCatalog())

    const { useSearch } = useDcatApCatalogSearch();

    const {
        getSearchResultsEnhanced,
        getSearchResultsCount,
        getSearchResultsPagesCount,
        getAvailableFacetsLocalized,
        isFetching,
        isLoading,
    } = useSearch({
        queryParams,
        selectedFacets: toRefs(selectedFacets.value)
    });

    const { doSearch } = useSearchInput(options);

    return {
        availableFacetsFormatted: getAvailableFacetsLocalized('de'),
        sort,
        sortDirection,
        catalogues: getSearchResultsEnhanced,
        getSearchResultsCount,
        getSearchResultsPagesCount,
        isLoading,
        isFetching,
        showOnlyPublic: false,
        doSearch,
    };
}
