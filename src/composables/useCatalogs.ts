import { toRef, toRefs } from 'vue';
import {useDcatApCatalogSearch} from "@/sdk";
import {useSearchParams} from "@/composables/useSearchParams";
import {useSelectedFacets} from "@/composables/useSelectedFacets";

export const useCatalogs = (options) => {

    const { queryParams, sort, sortDirection } = options?.searchParams
        ? options.searchParams
        : useSearchParams()
    const selectedFacets = options.selectedFacets
        ? toRef(options.selectedFacets)
        : toRef(useSelectedFacets())

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
        selectedFacets: {
            ...toRefs(selectedFacets.value),
            // is_hvd: isHvd,
            // periodicity: isLivedata,
        },
        // headers: searchHeaders,
    });

    return {
        getSearchResultsEnhanced,
        getSearchResultsCount,
        getSearchResultsPagesCount,
        getAvailableFacetsLocalized,
        isFetching,
        isLoading,
    }
}
