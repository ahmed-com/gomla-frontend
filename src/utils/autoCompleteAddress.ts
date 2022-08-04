import { UseFetchOptions } from "@vueuse/core";
import { computed, Ref } from "vue";
import { useLocationIQ } from "../composables/useLocationIQ";

type Response = Array<{
	lat: string,
	lon: string,
	display_name: string
}>

export const autoCompleteAddress = ( address: Ref<string>, useFetchOptions: UseFetchOptions ) => {
	const url = computed<string>(()=>`autocomplete?q=${address.value}`)
	return useLocationIQ<Response>(url, useFetchOptions);
}