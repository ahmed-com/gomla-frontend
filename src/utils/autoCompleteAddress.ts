import { UseFetchOptions } from "@vueuse/core";
import { computed, Ref } from "vue";
import { useLocationIQ } from "../composables/useLocationIQ";
import { useDebouncedRefHistory } from '@vueuse/core';

type Response = Array<{
	lat: string,
	lon: string,
	display_name: string
}>

export const autoCompleteAddress = ( address: Ref<string>, useFetchOptions: UseFetchOptions ) => {
	const {last} = useDebouncedRefHistory(address,{capacity: 1, debounce: 300})
	const url = computed<string>(()=>`autocomplete?q=${last.value.snapshot}`)
	return useLocationIQ<Response>(url, useFetchOptions);
}