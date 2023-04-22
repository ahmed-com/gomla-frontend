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
        v-model:filter-by="filterBy"
        :actions="actions"
        :page-data="data ? data : []"
        :is-loading="isFetching"
        :data-length="data ? data.total : 0"
        :markable-fields="['name']"
        :import-template-headers="headers"
        title="Deserts"
        :loading-error="error"
        :headers="headers"
        :isImporting="isImporting"
        @import="importData"
        @refresh="refresh"
        @view="view"
        @showActions="showActions"
        @action="handleAction"
        @hover="hover"
    >
        <template #create-btn="props">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn class="d-inline bg-primary mx-2" icon="mdi-table-plus"  v-bind="props"></v-btn>
            </template>
            <span>Create</span>
          </v-tooltip>
        </template>
    </data-table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DataTable from '../components/data-table/DataTable.vue';
import { Desert } from '../types/Desert.type';
import { SortBy } from '../types/SortBy.type';
import { TableHeader, TableRow, TableRowAction, TableRowState } from '../types/TableData.type';
import { useDeserts } from '../composables/useDesert';
import { FilterBy } from '../types/FilterBy.type';

const itemsPerPage = ref(5);
const currentPage = ref(1);
const searchTerm = ref('');
const isImporting = ref(false);
const sortBy = ref<SortBy[]>([]);
const filterBy = ref<FilterBy[]>([]);
const actions = ref<TableRowAction[]>([]);

const view = (row: TableRow) => console.log(row.id + ' View');
const showActions = (row: TableRow) => {
  console.log(row.id + ' Show Actions');
  actions.value = [
    {
      icon: 'mdi-pencil',
      text: 'Edit',
      color: 'primary',
      key: 'edit',
    },
    {
      icon: 'mdi-delete',
      text: 'Delete',
      color: 'error',
      key: 'delete',
    },
  ]
}
const handleAction = (event: {row: TableRow, action: TableRowAction}) => {
  console.log(event.row.id + ' ' + event.action.key);
}
const hover = (row: TableRow | null) => {
  if (row) {
    console.log(row.id + ' Hover');
  }else{
    console.log('romove hover');
  }
}

const { data, error, isFetching, execute } = useDeserts(
  searchTerm,
  itemsPerPage,
  computed(() => (currentPage.value - 1) * itemsPerPage.value),
  sortBy,
  { immediate: true, refetch: true}
);

const refresh = () => execute();

const importData = (data: Desert[]) => {
  isImporting.value = true;
  setTimeout(() => {
    isImporting.value = false;
  }, 2000);
  console.log(data);
}
const headers: TableHeader[] = [
  {
    text: 'Name',
    key: 'name',
    sortable: true,
    filterable: true,
    type: 'markableText',
  },

  {
    text: 'Calories',
    key: 'calories',
    sortable: true,
    filterable: true,
    type: 'number',
  },

  {
    text: 'Fat',
    key: 'fat',
    sortable: true,
    filterable: true,
    type: 'number',
  },

  {
    text: 'Carbs',
    key: 'carbs',
    sortable: true,
    filterable: true,
    type: 'number',
  },

  {
    text: 'Protein',
    key: 'protein',
    sortable: true,
    filterable: true,
    type: 'number',
  },

  {
    text: 'Iron',
    key: 'iron',
    sortable: false,
    filterable: false,
    type: 'text',
  }
]

</script>

<style scoped>
</style>