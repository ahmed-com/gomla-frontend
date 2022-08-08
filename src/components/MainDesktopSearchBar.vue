<script lang="ts">
	export default {
		name: 'MainDesktopSearchBar',
	};
</script>

<template>
	<div class="the-container" >
		<label
			id="service-label"
			class="label rounded-s"
			for="service-input"
			>{{ searchLabel }}</label
		>
		<span id="service-typeahead" class="typeahead">{{
			computedSearchTypeahead
		}}</span>
		<input
			type="text"
			id="service-input"
			class="input"
			@focus="showSearchSuggestions = true"
			@blur="hideSearchSuggestions"
			autocomplete="off"
			:placeholder="searchPlaceholder"
			v-model="computedSearchTerm"
		/>
		<div id="service-suggestions-container">
			<ul
				v-if="!!searchSuggestions.length && showSearchSuggestions"
				id="service-suggestions"
				class="suggestions"
			>
				<li
					v-for="suggestion in searchSuggestions"
					:key="suggestion"
					class="service-suggestion"
					@click="setSearchTerm(suggestion)"
				>
					{{ suggestion }}
				</li>
			</ul>
		</div>
		<div id="line-break"><div id="divider"></div></div>
		<label id="location-label" class="label" for="location-input">{{
			addressLabel
		}}</label>
		<span id="location-typeahead" class="typeahead">{{
			computedAddressTypeahead
		}}</span>
		<input
			type="text"
			id="location-input"
			class="input"
			@focus="showAddressSuggestions = true"
			@blur="hideAddressSuggestions"
			autocomplete="off"
			:placeholder="addressPlaceholder"
			v-model="computedAddress.description"
		/>
		<div id="location-suggestions-container">
			<ul
				v-if="!!addressSuggestions.length && showAddressSuggestions"
				id="location-suggestions"
				class="suggestions"
			>
				<li
					v-for="suggestion in addressSuggestions"
					:key="suggestion.description"
					class="location-suggestion"
					@click="setAddress(suggestion)"
				>
					{{ suggestion.description }}
				</li>
			</ul>
		</div>
		<button
			id="search-btn"
			class="bg-primary rounded-e"
			@click="emit('submit')"
		>
			<img width="20" :src="searchIcon" alt="" />
		</button>
	</div>
</template>

<script setup lang="ts">
	import { computed, nextTick, Ref, ref, toRefs } from 'vue';
	import searchIcon from '../assets/magnifying.svg';
	import { Address } from '../types/Address.type';

	type Props = {
		searchTerm: string;
		address: Address;
		searchPlaceholder: string;
		addressPlaceholder: string;
		searchTypeahead: string;
		addressTypeahead: string;
		searchSuggestions: string[];
		addressSuggestions: Address[];
		searchLabel: string | undefined;
		addressLabel: string | undefined;
	};

	const props: Props = withDefaults(defineProps<Props>(), {
			searchTerm: '',
			address: () => ({ description: '' }),
			searchPlaceholder: '',
			addressPlaceholder: '',
			searchTypeahead: '',
			addressTypeahead: '',
			searchSuggestions: () => [],
			addressSuggestions: () => [],
		})

	const {
		searchTerm,
		address,
		searchLabel,
		addressLabel,
		searchPlaceholder,
		addressPlaceholder,
		searchSuggestions,
		addressSuggestions,
		searchTypeahead,
		addressTypeahead,
	} = toRefs(props);

	const emit = defineEmits<{
		(event: 'update:searchTerm', searchTerm: string): void;
		(event: 'update:address', address: Address): void;
		(event: 'submit'): void;
	}>();

	const showAddressSuggestions: Ref<boolean> = ref<boolean>(false);
	const showSearchSuggestions: Ref<boolean> = ref<boolean>(false);

	const computedSearchTypeahead = computed<string>(() => {
		if(!searchTerm.value) return '';
		if (
			!searchTypeahead
				.value
				.toLowerCase()
				.startsWith(searchTerm.value.toLowerCase())
		)
			return '';
		return (
			searchTerm.value +
			searchTypeahead.value.slice(
				searchTerm.value.length,
				searchTypeahead.value.length
			)
		);
	});
	const computedAddressTypeahead = computed<string>(() => {
		if(!address.value.description) return '';
		if (
			!addressTypeahead
				.value
				.toLowerCase()
				.startsWith(address.value.description.toLowerCase())
		)
			return '';
		return (
			address.value.description +
			addressTypeahead.value.slice(
				address.value.description.length,
				addressTypeahead.value.length
			)
		);
	});
	const computedSearchTerm = computed<string>({
		get() {
			return searchTerm.value;
		},

		set(value: string) {
			emit('update:searchTerm', value);
		},
	});
	const computedAddress = computed<Address>({
		get() {
			return address.value;
		},

		set(value: Address) {
			emit('update:address', value);
		},
	});

	const setSearchTerm = (value: string)=> computedSearchTerm.value = value;
	const setAddress = (value: Address)=>  computedAddress.value = value;

	// FIXME: this is a race condition
	const hideSearchSuggestions = ()=> setTimeout(()=>showSearchSuggestions.value = false,200);
	const hideAddressSuggestions = ()=> setTimeout(()=>showAddressSuggestions.value = false,200);
</script>

<style scoped>
	.the-container {
		display: inline-grid;
		grid-template-columns: auto 1fr 1px auto 1fr auto;
	}

	#service-label {
		grid-row: 1;
		grid-column: 1;
	}

	#service-typeahead,
	#service-input {
		grid-row: 1;
		grid-column: 2;
	}

	#line-break {
		grid-row: 1;
		grid-column: 3;
		background-color: #fff;
	}

	#location-label {
		grid-row: 1;
		grid-column: 4;
	}

	#location-typeahead,
	#location-input {
		grid-row: 1;
		grid-column: 5;
	}

	#search-btn {
		grid-row: 1;
		grid-column: 6;
	}

	#service-suggestions-container {
		grid-row: 2;
		grid-column: 1 / 4;
		max-height: 0;
	}

	#location-suggestions-container {
		grid-row: 2;
		grid-column: 4 / 6;
		max-height: 0;
	}

	#divider {
		content: '';
		width: 1px !important;
		background-color: #ccc;
		height: 70%;
		position: relative;
		top: 15%;
	}

	.typeahead {
		background-color: #fff;
		color: #bbb;
		pointer-events: none;
	}

	.input {
		color: #000;
		background-color: transparent;
	}

	.typeahead,
	.input {
		display: flex;
		align-items: center;
		padding: 0.8rem 0;
		text-indent: 0px;
		text-align: start;
		margin: 0em;
		box-sizing: border-box;
		letter-spacing: normal;
		word-spacing: normal;
		line-height: normal;
		border: 0;
		outline: 0;
		font-size: 1rem;
		border-radius: 0;
		font-family: inherit;
		font-size: 100%;
		overflow: hidden;
	}

	.input:focus-visible,
	.typeahead:focus-visible {
		outline: none;
	}

	.label {
		display: flex;
		align-items: center;
		color: #666;
		font-weight: 700;
		background-color: #fff;
		padding-right: 1rem;
		padding-left: 1rem;
	}

	#location-suggestions,
	#service-suggestions {
		position: relative;
		font: inherit;
		vertical-align: baseline;
		border-radius: 0 0 4px 4px;
		box-shadow: 0 21px 38px rgb(0 0 0 / 20%);
		margin-top: 0 !important;
		border-top: none;
		background-color: #fff;
		padding: 0;
		line-height: 1.28571em;
		font-size: 14px;
		margin: -3px 0 0;
		list-style: none;
		max-height: 430px;
		overflow-y: auto;
		z-index: 10;
	}

	.location-suggestion,
	.service-suggestion {
		padding: 8px 15px;
		color: #000;
		cursor: pointer;
		font-size: 14px;
	}

	.location-suggestion:hover,
	.service-suggestion:hover {
		background-color: #4682b4;
		color: #fff;
	}

	#search-btn {
		border: 0;
		padding: 14px 20px 13px;
		box-shadow: none;
		font-size: 12px;
		line-height: 1.5em;
		color: #fff;
		font-weight: 700;
		cursor: pointer;
		vertical-align: middle;
	}
</style>
