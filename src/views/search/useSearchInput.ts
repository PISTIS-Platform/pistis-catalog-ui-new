import {watch, toRef} from "vue";
import {useSearchParams} from "@/composables/useSearchParams";

export const useSearchInput = (options) => {
    const searchInput = toRef((options?.searchInput || '') as string);
    const { queryParams } = options?.searchParams
        ? options.searchParams
        : useSearchParams();
    watch(
        () => queryParams.q.value,
        (val) => {
            searchInput.value = val
        },
        { immediate: true },
    )
    function doSearch() {
        if (queryParams.q.value === searchInput.value)
            return
        queryParams.q.value = searchInput.value
        queryParams.page.value = 0
    }
    return { searchInput, doSearch }
};
