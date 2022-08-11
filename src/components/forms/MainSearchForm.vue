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
		:is-address-suggestions-loading="true"
		:is-submitting="false"
		:address-suggestions="addressSuggestions"
		:search-typeahead="searchTypeadead"
		:address-typeahead="addressTypeahead"
		search-label="Deal"
		address-label="Address"
		@submit="onSubmit"
	></main-desktop-search-bar>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { Address } from '../../types/Address.type';
	import MainDesktopSearchBar from '../MainDesktopSearchBar.vue';

	const address = ref<Address>({ description: '' });
	const searchTerm = ref<string>('');
	const searchSuggestions = ref<string[]>([
		'كلام عربي',
		'something 2',
		'something 3',
		'something 4',
		'something 5',
		'something 6',
	]);
	const addressSuggestions = ref<Address[]>([
		{ description: 'some address', point: { lat: 40, lng: 30 } },
	]);
	const searchTypeadead = ref<string>('restaurant');
	const addressTypeahead = ref<string>('');

	const onSubmit = () => console.log(address.value);
</script>
