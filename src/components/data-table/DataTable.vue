<script lang="ts">
export default {
    name: "DataTable",
}
</script>

<template>
  <div class="rounded-lg elevation-4 bg-surface max-width-75">
    <div class="bg-secondary rounded-t-lg pa-4">
      <div class="d-flex justify-space-between">
        <h1>{{ props.title }}</h1>
        <div>
          <slot class="d-inline mx-2" color="primary" name="create-btn">
          </slot>
          <import-x-l-s-x :import-template-headers="props.importTemplateHeaders"></import-x-l-s-x>
        </div>
      </div>
      <div class="d-flex justify-space-between">
        <div class="text-h6">
          {{ t('components.DataTable.search') }}:
          <input :disabled="!!loadingError" class="bg-surface rounded-lg px-2" :placeholder="t('components.DataTable.typeHere')" v-model="searchTerm"
            type="text">
        </div>
        <div>
          <export-x-l-s-x :page-table="pageTable" :filename="props.title"></export-x-l-s-x>
          <print-table :page-table="pageTable"></print-table>
          <slot class="d-inline mx-2" color="primary" name="filter-btn"></slot>
        </div>
      </div>
    </div>
    <v-progress-linear v-if="props.isLoading" height="8" indeterminate color="primary"></v-progress-linear>
    <div class="rounded-b-lg pa-4 overflow-x-auto">
      <div v-if="props.isLoading" class="d-flex justify-center">
        <v-progress-circular indeterminate size="100" width="10" color="primary"></v-progress-circular>
      </div>
      <div v-else-if="props.loadingError" class="d-flex align-center flex-column">
        <h2 class="text-h1 text-error">{{ loadingError?.status }}</h2>
        <h2 class="text-h3 text-error">{{ loadingError?.message }}</h2>
      </div>
      <table v-else ref="pageTable" class="w-100">
        <tr>
          <th class="text-primary pa-2">
            Movie Title
            <v-icon v-if="true" color="secondary" size="small">mdi-sort-alphabetical-ascending</v-icon>
            <v-icon v-else color="secondary" size="small">mdi-sort-alphabetical-descending</v-icon>
          </th>
          <th class="pa-2 text-primary">Genre</th>
          <th class="pa-2 text-primary">Year</th>
          <th class="pa-2 text-primary">Gross</th>
        </tr>
        <tr>
          <td class="pa-2">Star Wars</td>
          <td class="pa-2">Adventure, Sci-fi</td>
          <td class="pa-2">1977</td>
          <td class="pa-2">$460,935,665</td>
        </tr>
        <tr>
          <td class="pa-2">Howard The Duck</td>
          <td class="pa-2">"Comedy"</td>
          <td class="pa-2">1986</td>
          <td class="pa-2">$16,295,774</td>
        </tr>
        <tr>
          <td class="pa-2">American Graffiti</td>
          <td class="pa-2">Comedy, Drama</td>
          <td class="pa-2">1973</td>
          <td class="pa-2">$115,000,000</td>
        </tr>
      </table>
    <div class="pa-4 d-flex justify-start">
      <label for="items-per-page" class="d-inline mt-4 text-primary-darken-1 font-weight-bold">
        {{ t('components.DataTable.itemsPerPage') }}
        <input class="width-50" type="number" id="items-per-page" v-model="itemsPerPage">
      </label>
        <v-pagination rounded="circle" v-model="currentPage" :length="paginationLenght" :total-visible="componentsConfig.paginationTotalVisible"></v-pagination>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, computed, onBeforeMount, toRefs } from 'vue';
import { SortBy } from '../../types/SortBy.type';
import { TableHeader, TableRow } from '../../types/TableData.type';
import componentsConfig from '../../config/components.config.json';
import ImportXLSX from './ImportXLSX.vue';
import PrintTable from './PrintTable.vue';
import ExportXLSX from './ExportXLSX.vue';
import { HttpError } from '../../types/HttpError.type';

const pageTable = ref<HTMLElement | null>(null);
const { t } = useI18n();

type Props = {
  title: string;
  pageData: TableRow[];
  itemsPerPage: number;
  searchTerm: string;
  currentPage: number;
  isLoading: boolean;
  sortBy: SortBy[];
  dataLength: number;
  markableFields: string[];
  headers: TableHeader[];
  importTemplateHeaders: string[];
  loadingError: HttpError | null;
};

const emit = defineEmits<{
  (event: 'update:searchTerm', value: string): void;
  (event: 'update:currentPage', value: number): void;
  (event: 'update:itemsPerPage', value: number): void;
  (event: 'update:sortBy', value: SortBy[]): void;
  (event: 'import', value: Array<any>): void;
}>();

const props: Props = withDefaults(defineProps<Props>(), {
  title: '',
  itemsPerPage: 10,
  searchTerm: '',
  currentPage: 1,
  isLoading: false,
  dataLength: 0,
  loadingError: null,
});

const refProps = toRefs(props);

const searchTerm = computed({
  get: () => refProps.searchTerm.value,
  set: (value: string) => emit('update:searchTerm', value),
});

const currentPage = computed({
  get: () => refProps.currentPage.value,
  set: (value: number) => emit('update:currentPage', value),
});

const itemsPerPage = computed({
  get: () => refProps.itemsPerPage.value,
  set: (value: number) => emit('update:itemsPerPage', value),
});

const paginationLenght = computed(() => Math.ceil(refProps.dataLength.value / refProps.itemsPerPage.value));

</script>

<style scoped>

tr:nth-child(even) {
  background-color: rgb(var(--v-theme-secondary-lighten-3));
  color: rgb(var(--v-theme-surface));
}

th, td {
  text-align: start;
  min-width: 10em;
}
</style>