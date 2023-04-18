<script lang="ts">
export default {
    name: "Generic"
} 
</script>

<template>
    <data-table
        class="ma-6 w-75"
        v-model:items-per-page="itemsPerPage"
        v-model:current-page="currentPage"
        v-model:search-term="searchTerm"
        v-model:sort-by="sortBy"
        :page-data="pageData"
        :is-loading="false"
        :data-length="data.total"
        :markable-fields="['name']"
        :import-template-headers="headers.map(header => header.text)"
        title="Deserts"
        :headers="headers"
        @import="importData"
    >
        <template #create-btn="props">
            <v-btn v-bind="props">Create</v-btn>
        </template>
        <template #filter-btn="props">
            <v-btn v-bind="props">Filter</v-btn>
        </template>
    </data-table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DataTable from '../components/data-table/DataTable.vue';
import { Desert } from '../types/Desert.type';
import { SortBy } from '../types/SortBy.type';
import { TableHeader, TableRow } from '../types/TableData.type';

const itemsPerPage = ref(10);
const currentPage = ref(1);
const searchTerm = ref('');
const sortBy = ref<SortBy[]>([]);
const data = ref<Desert[] & {total: number}>(Object.assign([], {total: 0}));

const pageData = computed<TableRow[]>(()=> data.value.map((desert: Desert) => {
  return {
    id: desert.id,
    textData: [desert.name, desert.calories, desert.fat, desert.carbs, desert.protein, desert.iron],
    actions: [
      {
        text: 'Edit',
        icon: 'mdi-pencil',
        handle: (id: string) => console.log(id + ' Edit'),
      },
      {
        text: 'Delete',
        icon: 'mdi-delete',
        handle: (id: string) => console.log(id + ' Delete'),
      },
    ],
  }
}));

const importData = (data: Desert[]) => {
  console.log(data);
}
const headers: TableHeader[] = [
  {
    text: 'Name',
    key: 'name',
    sortable: true,
  },

  {
    text: 'Calories',
    key: 'calories',
    sortable: true,
  },

  {
    text: 'Fat',
    key: 'fat',
    sortable: true,
  },

  {
    text: 'Carbs',
    key: 'carbs',
    sortable: true,
  },

  {
    text: 'Protein',
    key: 'protein',
    sortable: true,
  },

  {
    text: 'Iron',
    key: 'iron',
    sortable: true,
  }
]

</script>

<style scoped>
</style>