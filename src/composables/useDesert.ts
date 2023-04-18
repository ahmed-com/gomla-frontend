import { UseFetchOptions } from "@vueuse/core";
import { computed, Ref } from "vue";
import { useAPI } from "../composables/useAPI";
import { Desert } from "../types/Desert.type";
import { SortBy } from "../types/SortBy.type";
import { useDebouncedRefHistory } from "@vueuse/core";

type Response = Array<Desert> & { total: number };

export const useDeserts = (
    searchTerm: Ref<string>,
    limit: Ref<number>,
    offset: Ref<number>,
    sortBy: Ref<SortBy[]>,
    useFetchOptions: UseFetchOptions
) => {
    const { last } = useDebouncedRefHistory(searchTerm, {
        capacity: 1,
        debounce: 300,
    });
    const url = computed<string>(() => {
        const query = new URLSearchParams({
            q: last.value.snapshot,
            _limit: limit.value.toString(),
            _start: offset.value.toString(),
            _sort: sortBy.value.map((s) => s.field).join(","),
            _order: sortBy.value.map((s) => s.direction).join(",")
        });
        return `deserts?${query.toString()}`;
    });
    return useAPI<Response>(url, useFetchOptions);
};
