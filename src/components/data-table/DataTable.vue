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
          <import-x-l-s-x :import-template-headers="props.importTemplateHeaders" :disabled="props.isLoading"></import-x-l-s-x>
        </div>
      </div>
      <div class="d-flex justify-space-between">
        <div class="text-h6">
          {{ t('components.DataTable.search') }}:
          <input :disabled="!!loadingError" class="bg-surface rounded-lg px-2" :placeholder="t('components.DataTable.typeHere')" v-model="searchTerm"
            type="text">
        </div>
        <div>
          <export-x-l-s-x :page-table="pageTable" :filename="props.title" :disabled="!!props.loadingError || props.isLoading"></export-x-l-s-x>
          <print-table :page-table="pageTable" :disabled="!!props.loadingError || props.isLoading"></print-table>
          <slot class="d-inline mx-2" color="primary" name="filter-btn"></slot>
        </div>
      </div>
    </div>
    <v-progress-linear v-if="showLoader" height="8" indeterminate color="primary"></v-progress-linear>
    <div class="rounded-b-lg pa-4 overflow-x-auto position-relative">
      <v-overlay
        v-model="showLoader"
        contained
        class="d-flex position-absolute w-100 justify-center align-center"
      >
      <v-progress-circular indeterminate size="100" width="10" color="primary"></v-progress-circular>
      </v-overlay>
      <div v-if="props.loadingError" class="d-flex align-center flex-column">
        <h2 class="text-h1 text-error">{{ loadingError?.status }}</h2>
        <h2 class="text-h3 text-error">{{ loadingError?.message }}</h2>
      </div>
      <table v-else ref="pageTable" class="w-100">
        <tr>
          <th v-for="header in props.headers" class="text-primary pa-2">
            {{ header.text }}
            <v-icon v-if="header.sortable" color="secondary" size="small">mdi-sort-alphabetical-ascending</v-icon>
            <v-icon v-else color="secondary" size="small">mdi-sort-alphabetical-descending</v-icon>
          </th>
        </tr>
        <TransitionGroup v-if="!!pageData.length" name="list">
          <tr v-for="record in pageData" :key="record.id" class="pa-2" :class="{'cursor-pointer': !!record.view}" @click="!!record.view ? record.view(record.id) : undefined">
            <td v-for="(field, i) in record.textData" class="pa-2" :key="i">
              {{ field }}
            </td>
          </tr>
        </TransitionGroup>
        <tr v-else>
          <td class="pa-2 text-secondary no-pointer-events no-user-select" colspan="100%">
            <h2 class="text-h3 text-center">{{ t('components.DataTable.noData') }}</h2>
          </td>
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
import { watchDebounced } from '@vueuse/shared';

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
  sortBy: () => [],
  pageData: () => [],
  markableFields: () => [],
  headers: () => [],
  importTemplateHeaders: () => [],
});

const showLoader = ref<boolean>(false);

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

const sortBy = computed({
  get: () => refProps.sortBy.value,
  set: (value: SortBy[]) => emit('update:sortBy', value),
});

watchDebounced(refProps.isLoading, (value) => {
  showLoader.value = value;
}, { debounce: 500 });

const paginationLenght = computed(() => Math.ceil(refProps.dataLength.value / refProps.itemsPerPage.value));

</script>

<style scoped>
.list-move, 
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

tr:hover:not(:first-child) {
  background-color: rgb(var(--v-theme-secondary-lighten-3));
  color: rgb(var(--v-theme-surface));
}

td{
  border: 1px solid rgb(var(--v-theme-primary));
}

th, td {
  text-align: start;
  min-width: 10em;
}
</style>