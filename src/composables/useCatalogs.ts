import { toRef, toRefs } from 'vue';
import {useDcatApCatalogSearch, useDcatApSearch} from "@/sdk";
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
    const x = useSearch({
        queryParams,
        selectedFacets: {
            ...toRefs(selectedFacets.value),
            // is_hvd: isHvd,
            // periodicity: isLivedata,
        },
        // headers: searchHeaders,
    });

    const {
        getSearchResultsEnhanced,
        getSearchResultsCount,
        getSearchResultsPagesCount,
        getAvailableFacetsLocalized,
        isFetching,
        isLoading,
    } = x;

    const { useSearch: u } = useDcatApSearch();
    const y = u({
        queryParams,
        selectedFacets: {
            ...toRefs(selectedFacets.value),
            // is_hvd: isHvd,
            // periodicity: isLivedata,
        },
        // headers: searchHeaders,
    });

    console.log("useCatalogs", {x,y})
    return {
        getSearchResultsEnhanced,
        getSearchResultsCount,
        getSearchResultsPagesCount,
        getAvailableFacetsLocalized,
        isFetching,
        isLoading,
    }
}
