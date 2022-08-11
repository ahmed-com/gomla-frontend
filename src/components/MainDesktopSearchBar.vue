<script lang="ts">
	export default {
		name: 'MainDesktopSearchBar',
	};
</script>

<template>
	<form @submit.prevent="emit('submit')" class="main-grid elevation-6">
		<div
			class="grid-row-1 grid-column-1 input-grid rounded-ts pt-2 bg-background"
			:class="{ 'rounded-bs': !showSearchSuggestions }"
			v-click-outside="hideSearchSuggestions"
		>
			<label
				v-if="searchLabel"
				for="search-input"
				class="grid-row-1 grid-column-1 d-flex align-center text-grey-darken-2 px-4 font-weight-bold"
			>
				{{ searchLabel }}
			</label>
			<span
				class="grid-row-1 grid-column-2 d-flex align-center text-grey px-2"
				>{{ computedSearchTypeahead }}</span
			>
			<input
				type="text"
				@focus="showSearchSuggestions = true"
				@keydown.tab="onSearchTabbed"
				@keydown.up.prevent="
					setActiveSearchSuggestion(activeSearchSuggestion - 1)
				"
				@keydown.down.prevent="
					setActiveSearchSuggestion(activeSearchSuggestion + 1)
				"
				class="grid-row-1 grid-column-2 bg-transparent text-black px-2"
				autocomplete="off"
				:placeholder="searchPlaceholder"
				v-model="computedSearchTerm"
				id="search-input"
			/>
			<div class="h-0 grid-row-2 grid-column-1-3">
			<v-scroll-y-transition>
				<ul
					class="bg-background w-100 pa-4 rounded-b list-style-none overflow-y-auto scrollbar-hidden suggestions-list elevation-compliment-6"
					v-if="!!searchSuggestions.length && showSearchSuggestions"
				>
					<v-hover
						v-for="(suggestion, index) in searchSuggestions"
						:key="suggestion"
                        @update:model-value="p => hoverSearchSuggestion(index)(p)"
                        v-slot="{props}"
					>
						<li
							class="cursor-pointer pa-2 rounded overflow-x-hidden"
							:class="{
								'bg-primary': activeSearchSuggestion === index,
							}"
							@click="setSearchTerm(suggestion)"
                            v-bind="props"
						>
							<markable-text :text="suggestion" :match="computedSearchTerm"></markable-text>
						</li>
					</v-hover>
				</ul>
			</v-scroll-y-transition>
			</div>
		</div>
		<div class="grid-row-1 grid-column-2 bg-grey">
			<v-divider vertical></v-divider>
		</div>
		<div class="grid-row-1 grid-column-3 pt-2 input-grid bg-background position-relative" v-click-outside="hideAddressSuggestions">
			<label
				v-if="addressLabel"
				for="address-input"
				class="grid-row-1 grid-column-1 d-flex align-center text-grey-darken-2 px-4 font-weight-bold"
			>
				{{ addressLabel }}
			</label>
			<span
				class="grid-row-1 grid-column-2 d-flex align-center text-grey px-2"
				>{{ computedAddressTypeahead }}</span
			>
			<input
				type="text"
				@focus="showAddressSuggestions = true"
				@keydown.tab="onAddressTabbed"
				@keydown.up.prevent="
					setActiveAddressSuggestion(activeAddressSuggestion - 1)
				"
				@keydown.down.prevent="
					setActiveAddressSuggestion(activeAddressSuggestion + 1)
				"
				class="grid-row-1 grid-column-2 bg-transparent text-black px-2"
				autocomplete="off"
				:placeholder="addressPlaceholder"
				v-model="computedAddress.description"
				id="address-input"
			/>
			<v-btn icon="mdi-crosshairs-gps" size="x-small" class="grid-row-1 grid-column-2 position-absolute position-right-0 ma-1"></v-btn>
			<div class="h-0 grid-row-2 grid-column-1-3">
			<v-scroll-y-transition>
				<ul
					class="bg-background w-100 pa-4 rounded-b list-style-none overflow-y-auto scrollbar-hidden suggestions-list elevation-compliment-6"
					v-if="!!addressSuggestions.length && showAddressSuggestions"
				>
					<v-hover
						v-for="(suggestion, index) in addressSuggestions"
						:key="suggestion.description"
                        @update:model-value="p => hoverAddressSuggestion(index)(p)"
                        v-slot="{props}"
					>
						<li
							class="cursor-pointer pa-2 rounded overflow-x-hidden"
							:class="{
								'bg-primary': activeAddressSuggestion === index,
							}"
							@click="setAddress(suggestion)"
                            v-bind="props"
						>
							<markable-text :text="suggestion.description" :match="computedAddress.description"></markable-text>
						</li>
					</v-hover>
				</ul>
			</v-scroll-y-transition>
			</div>
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
	import { computed, ref, toRefs } from 'vue';
	import searchIcon from '../assets/magnifying.svg';
	import { Address } from '../types/Address.type';
import MarkableText from './MarkableText.vue';

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

	const showAddressSuggestions = ref<boolean>(false);
	const showSearchSuggestions = ref<boolean>(false);
	const activeSearchSuggestion = ref<number>(searchSuggestions.value.length);
	const activeAddressSuggestion = ref<number>(
		addressSuggestions.value.length
	);

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
	const setAddress = ({description, point}: Address) => (computedAddress.value = {description, point});

	const hideSearchSuggestions = () => {
		showSearchSuggestions.value = false;
		activeSearchSuggestion.value = searchSuggestions.value.length;
	};
	const hideAddressSuggestions = () => {
		showAddressSuggestions.value = false;
		activeAddressSuggestion.value = addressSuggestions.value.length;
	};

	const onSearchTabbed = () => {
		if (computedSearchTypeahead.value)
			computedSearchTerm.value = computedSearchTypeahead.value;
		if (showSearchSuggestions.value) hideSearchSuggestions();
	};
	const onAddressTabbed = () => {
		if (computedAddressTypeahead.value)
			computedAddress.value = {
				description: computedAddressTypeahead.value,
			};
		if (showAddressSuggestions.value) hideAddressSuggestions();
	};

	const setActiveSearchSuggestion = (n: number) => {
		let activeIndex: number = n;
		if (n > searchSuggestions.value.length) activeIndex = 0;
		if (n < 0) activeIndex = searchSuggestions.value.length;
		activeSearchSuggestion.value = activeIndex;
		if (activeIndex === searchSuggestions.value.length) return;
		setSearchTerm(searchSuggestions.value[activeIndex]);
	};
	const setActiveAddressSuggestion = (n: number) => {
		let activeIndex: number = n;
		if (n > addressSuggestions.value.length) activeIndex = 0;
		if (n < 0) activeIndex = addressSuggestions.value.length;
		activeAddressSuggestion.value = activeIndex;
		if (activeIndex === addressSuggestions.value.length) return;
		setAddress(addressSuggestions.value[activeIndex]);
	};

    const hoverSearchSuggestion = (i: number) => (p: boolean) => activeSearchSuggestion.value = p ? i : searchSuggestions.value.length;
    const hoverAddressSuggestion = (i: number) => (p: boolean) => activeAddressSuggestion.value = p ? i : addressSuggestions.value.length;
</script>

<style scoped lang="scss">
	@import '../styles/_variables.scss';
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

	.suggestions-list{
		max-height: $autocomplete-max-height;
	}
</style>
