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
        :is-loading="isFetching"
        :data-length="data ? data.total : 0"
        :markable-fields="['name']"
        :import-template-headers="headers.map(header => header.text)"
        title="Deserts"
        :loading-error="error"
        :headers="headers"
        @import="importData"
    >
        <template #create-btn="props">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn class="d-inline bg-primary mx-2" icon="mdi-table-plus"  v-bind="props"></v-btn>
            </template>
            <span>Create</span>
          </v-tooltip>
        </template>
        <template #filter-btn="props">
          <v-tooltip location="bottom">
            <template #activator="{ props }">
              <v-btn class="d-inline bg-primary mx-2" icon="mdi-filter"  v-bind="props"></v-btn>
            </template>
            <span>Filter</span>
          </v-tooltip>
        </template>
    </data-table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DataTable from '../components/data-table/DataTable.vue';
import { Desert } from '../types/Desert.type';
import { SortBy } from '../types/SortBy.type';
import { TableHeader, TableRow } from '../types/TableData.type';
import { useDeserts } from '../composables/useDesert';

const itemsPerPage = ref(5);
const currentPage = ref(1);
const searchTerm = ref('');
const sortBy = ref<SortBy[]>([]);

const { data, error, isFetching } = useDeserts(
  searchTerm,
  itemsPerPage,
  computed(() => (currentPage.value - 1) * itemsPerPage.value),
  sortBy,
  { immediate: true, refetch: true}
);

const pageData = computed<TableRow[]>(()=> data.value ? data.value.map((desert: Desert) => {
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
    view : (id: string | number) => console.log(id + ' View')
  }
}) : []);

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