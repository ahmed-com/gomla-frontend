<script lang="ts">
    export default {
        name: 'MainSearchForm'
    }
</script>

<template>
    <test-desktop-search-bar 
        class="w-100"
        v-model:address="address"
        v-model:searchTerm="searchTerm"
        address-placeholder="Location"
        search-placeholder="Keyword"
        :search-suggestions="searchSuggestions"
        :address-suggestions="addressSuggestions"
        :search-typeahead="searchTypeadead"
        :address-typeahead="addressTypeahead"
        search-label="Deal"
        address-label="Address"
        @submit="onSubmit"
    ></test-desktop-search-bar>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { Address } from '../../types/Address.type';
    import TestDesktopSearchBar from '../TestDesktopSearchBar.vue';

    const address = ref<Address>({description: ''})
    const searchTerm = ref<string>('')
    const searchSuggestions = ref<string[]>(['something 0',])
    const addressSuggestions = ref<Address[]>([])
    const searchTypeadead = ref<string>('restaurant')
    const addressTypeahead = ref<string>('')

    const onSubmit = ()=> searchTerm.value = "submitted"

</script>