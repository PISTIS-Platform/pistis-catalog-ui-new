import { toRef, toRefs } from 'vue';
import {useDcatApCatalogSearch} from "@/sdk";
import {useSearchParams} from "../useSearchParams";
import {useSelectedFacetsCatalog} from "../useSelectedFacets";
import {useSearchInput} from "@/views/search/useSearchInput";
import {getLocalizedValue} from "@/sdk/utils/helpers";
import {computed, unref} from "vue";
import {useI18n} from "vue-i18n";

export const useCatalogs = (options) => {

    const { t } = useI18n();

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

    const availableFacetsFormatted = computed(() => {
        return getAvailableFacetsLocalized('de').value
            ?.map(facet => ({
                id: facet.id,
                label: t(`catalogFacets.facets.${facet.id}`) ?? facet.id,
                items: facet.items.map((item, index) => ({
                    id: item.id || `${index}`,
                    label:
                        typeof item.title === 'string'
                            ? item.title
                            : (!item.title
                                ? (item.id ?? `item${index}` ?? '')
                                : getLocalizedValue({obj: item.title, fallbackLocale: 'de'})),
                    count: item.count ?? 0,
                    value: item.id ?? '__value__',
                })),
            }))
            .filter(facet => Object.keys(unref(selectedFacets)).includes(facet.id)) || []
    })

    return {
        availableFacetsFormatted,
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
