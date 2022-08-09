<script lang="ts">
	export default {
		name: 'TestDesktopSearchBar',
	};
</script>

<template>
	<form @submit.prevent="emit('submit')" class="main-grid">
		<div
			class="grid-row-1 grid-column-1 input-grid rounded-ts pt-2 bg-background"
			:class="{ 'rounded-bs': !showSearchSuggestions }"
			v-click-outside="hideSearchSuggestions"
		>
			<label
				v-if="searchLabel"
				for="search-input"
				class="grid-row-1 grid-column-1 d-flex align-center text-grey-darken-2 px-2 font-weight-bold"
			>
				{{ searchLabel }}
			</label>
			<span
				class="grid-row-1 grid-column-2 d-flex align-center text-grey-lighten-1"
				>{{ computedSearchTypeahead }}</span
			>
			<input
				type="text"
				@focus="showSearchSuggestions = true"
				class="grid-row-1 grid-column-2 bg-transparent text-black"
				autocomplete="off"
				:placeholder="searchPlaceholder"
				v-model="computedSearchTerm"
				id="search-input"
			/>
			<div class="h-0 grid-row-2 grid-column-1-3">
				<ul
                    class="bg-background w-100 pa-4 rounded-b list-style-none"
					v-if="!!searchSuggestions.length && showSearchSuggestions"
				>
					<li
						v-for="suggestion in searchSuggestions"
						:key="suggestion"
						class="cursor-pointer pa-2 rounded"
						@click="setSearchTerm(suggestion)"
					>
						{{ suggestion }}
					</li>
				</ul>
			</div>
		</div>
		<div class="grid-row-1 grid-column-2 bg-grey">
			<v-divider vertical></v-divider>
		</div>
		<div
			class="grid-row-1 grid-column-3 input-grid bg-background"
		>
			<label
				v-if="addressLabel"
				for="search-input"
				class="grid-row-1 grid-column-1 d-flex align-center text-grey-darken-2 px-2 font-weight-bold"
			>
				{{ addressLabel }}
			</label>
		</div>
		<button
			type="submit"
			class="px-5 py-3 grid-row-1 grid-column-4 bg-primary rounded-e"
		>
			<img width="20" :src="searchIcon" alt="" />
		</button>
	</form>
</template>

<script lang="ts" setup>
	import { computed, Ref, ref, toRefs } from 'vue';
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
		searchLabel?: string;
		addressLabel?: string;
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
	});

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
		if (!searchTerm.value) return '';
		if (
			!searchTypeahead.value
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
		if (!address.value.description) return '';
		if (
			!addressTypeahead.value
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

	const setSearchTerm = (value: string) => (computedSearchTerm.value = value);
	const setAddress = (value: Address) => (computedAddress.value = value);

	const hideSearchSuggestions = () => (showSearchSuggestions.value = false);
	const hideAddressSuggestions = () => (showAddressSuggestions.value = false);
</script>

<style scoped>
	.main-grid {
		display: inline-grid;
		grid-template-columns: 1fr 1px 1fr auto;
	}

	.input-grid {
		display: inline-grid;
		grid-template-columns: auto 1fr;
	}

	input[type='text']:focus-visible {
		outline: none;
	}
</style>
