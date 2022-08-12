<script lang="ts">
	export default {
		name: 'MainSearchForm',
	};
</script>

<template>
	<main-desktop-search-bar
		class="w-75"
		v-model:address="address"
		v-model:searchTerm="searchTerm"
		address-placeholder="Location"
		search-placeholder="Keyword"
		:search-suggestions="searchSuggestions"
		:is-search-suggestions-loading="false"
		:is-address-suggestions-loading="isAddressSuggestionsLoading"
		:is-submitting="false"
		:address-suggestions="addressSuggestions"
		:search-typeahead="searchTypeadead"
		:address-typeahead="addressSuggestions?.[0]?.description || ''"
		search-label="Deal"
		address-label="Address"
		@submit="onSubmit"
	></main-desktop-search-bar>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { Address } from '../../types/Address.type';
	import MainDesktopSearchBar from '../MainDesktopSearchBar.vue';
	import { autoCompleteAddress } from '../../utils/autoCompleteAddress';

	const address = ref<Address>({ description: '' });
	const searchTerm = ref<string>('');

	const { data, isFetching: isAddressSuggestionsLoading } =
		autoCompleteAddress(address, { refetch: true });
	const addressSuggestions = computed<Address[]>(
		() =>
			data.value?.map?.((res) => ({
				description: res.display_name,
				point: {
					lat: +res.lat,
					lng: +res.lon,
				},
			})) || []
	);
	const searchSuggestions = ref<string[]>([
		'كلام عربي',
		'something 2',
		'something 3',
		'something 4',
		'something 5',
		'something 6',
	]);
	const searchTypeadead = ref<string>('restaurant');

	const onSubmit = () => console.log(address.value);
</script>
