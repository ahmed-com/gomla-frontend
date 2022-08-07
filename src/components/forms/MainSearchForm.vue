<script lang="ts">
    export default {
        name: 'MainSearchForm'
    }
</script>

<template>
    <main-desktop-search-bar 
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
    ></main-desktop-search-bar>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
import { Address } from '../../types/Address.type';
import MainDesktopSearchBar from '../MainDesktopSearchBar.vue';

    const address = ref<Address>({description: ''})
    const searchTerm = ref<string>('')
    const searchSuggestions = ref<string[]>([])
    const addressSuggestions = ref<Address[]>([])
    const searchTypeadead = ref<string>('restaurant')
    const addressTypeahead = ref<string>('')

    const onSubmit = ()=> searchTerm.value = "submitted"

</script>