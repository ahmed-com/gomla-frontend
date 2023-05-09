<script lang="ts">
export default {
  name: 'DataChart',
}
</script>

<template>
  <div class="rounded-lg elevation-4 bg-surface max-width-75-vw">
    <div class="bg-secondary rounded-t-lg pa-4">
      <div class="d-flex justify-space-between">
        <h1>{{ props.title }}</h1>
      </div>
      <div class="d-flex justify-space-between">
        <div class="text-h6">
          {{ t('components.DataTable.search') }}:
          <input :disabled="!!loadingError" class="bg-surface rounded-lg px-2"
            :placeholder="t('components.DataTable.typeHere')" v-model="searchTerm" type="text">
        </div>
        <div>
          <v-btn class="d-inline bg-primary mx-2" :loading="props.isLoading" icon="mdi-refresh"
            @click="emit('refresh')"></v-btn>
          <export-x-l-s-x :page-table="pageGraph" :filename="props.title"
            :disabled="!!props.loadingError || props.isLoading"></export-x-l-s-x>
          <print-table :page-table="pageGraph" :disabled="!!props.loadingError || props.isLoading"></print-table>
          <table-filter :disabled="!!props.loadingError || props.isLoading" :is-loading="props.isLoading"
            :headers="props.headers" v-model:filter-by="filterBy"></table-filter>
        </div>
      </div>
    </div>
    <v-progress-linear v-if="showLoader" height="8" indeterminate color="primary"></v-progress-linear>
    <div class="rounded-b-lg py-4 mx-4 overflow-x-auto position-relative">
      <v-overlay v-model="showLoader" contained class="d-flex position-absolute w-100 justify-center align-center">
        <v-progress-circular indeterminate size="100" width="10" color="primary"></v-progress-circular>
      </v-overlay>
      <div v-if="props.loadingError" class="d-flex align-center flex-column">
        <h2 class="text-h1 text-error">{{ loadingError?.status }}</h2>
        <h2 class="text-h3 text-error">{{ loadingError?.message }}</h2>
      </div>

      <select v-model="selectedChartType">
        <option value="bar">Bar</option>
        <option value="line">Line</option>
      </select>

      <select v-model="selectedYVariable">
        <option v-for="variable in yVariables" :value="variable.key">{{ variable.text }}</option>
      </select>
      
      <svg ref="pageGraph"  width="100%" height="50vh" >
        <g >
            <g class="tick">
                <line :y2="innerHeight" />
            </g>
            <g
                v-for="tick in scaleX.ticks()"
                class="tick"
                :key="+tick"
                :transform="getBottomTickPosition(tick)"
            >
                <line :y2="innerHeight" />
                <text
                    textAnchor="middle"
                    dy=".71em"
                    :y="bottomLabelPosition"
                >
                    {{pageData[tick -1]?.name}}
                </text>
            </g>
            <text
                class="axis-label"
                textAnchor="middle"
                :transform="bottomTextPosition"
            >
                {{selectedYVariable}}
            </text>
            <g 
                v-for="tick in scaleY.ticks()"
                :key="+tick"
                class="tick"
                :transform="getLeftTickPosition(tick)"
            >
                <line :x2="innerWidth" />
                <text
                    textAnchor="end"
                    dy=".32em"
                    :x="leftLabelPosition"
                >
                    {{tick}}
                </text>
            </g>
            <g class="chart-plot">
              <TransitionGroup v-if="!!pageData.length" name="list">
                <template
                    v-if="selectedChartType === 'bar'"
                    v-for="(row, index) in pageData"
                    :key="row.id"
                >
                <rect
                    :x="scaleX(index + 1)"
                    :y="scaleY(row[selectedYVariable])"
                    :width="dampenBarWidth"
                    :height="innerHeight - scaleY(row[selectedYVariable])"
                />
                <text
                  :x="scaleX(index + 1) + dampenBarWidth / 2"
                  :y="scaleY(row[selectedYVariable]) - 5"
                  text-anchor="middle"
                  font-size="12"
                >
                  {{row[selectedYVariable]}}
              </text>
            </template>
                <path
                    v-if="selectedChartType === 'line'"
                    fill="none"
                    stroke="steelblue"
                    :d="linePath"
                    ></path>
            </TransitionGroup>
            </g>
        </g>
      </svg>

    </div>
    <div class="pa-4 d-flex justify-start">
      <label for="items-per-page" class="d-inline mt-4 text-primary-darken-1 font-weight-bold">
        {{ t('components.DataTable.itemsPerPage') }}
        <input class="width-50" type="number" :min="1" :max="props.dataLength" id="items-per-page" v-model="itemsPerPage">
      </label>
      <v-pagination rounded="circle" v-model="currentPage" :length="paginationLength"
        :total-visible="componentsConfig.paginationTotalVisible"></v-pagination>
      <h3 class="text-subtitle-1 d-inline mt-4 text-secondary-lighten-3 font-italic"> {{
        t('components.DataTable.paginationMessage', { from: startItem, to: endItem, total: dataLength }) }} </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
  // [TODO] [x] Copy the generic crud view and use deserts as an example
  // [TODO] [] Extract the table data container as a seperate component
  // [TODO] [] Make the export button of the container accepts the data instead of the table element
  // [TODO] [] Make the print component more generic
  // [TODO] [] Make the import component optional
  // [TODO] [] Make the container accepts a slot for either the table or chart
  // [TODO] [x] Define the props of the chart component
  // [TODO] [] Write the markaup of a bar chart component (bar, axis, labels, grid, etc.)
  // [TODO] [] Make the data in the chart component computed with d3.js
  // [TODO] [] Add transitions to the bars and the axis
  // [TODO] [] Add group transitions to the bars
  // [TODO] [] Add the ability to change the chart type
  // [TODO] [] Add a select input for the variable to be plotted
  // [TODO] [] Add a select input for sorting the data
  // [TODO] [] Add debounced loading state to the chart
  // [TODO] [] Add a button to copy the chart as an image
  // [TODO] [] Add a tooltip to the bars
  // [TODO] [] Somehow add a tooltip to the line chart
import { useI18n } from 'vue-i18n';
import { ref, computed, toRefs } from 'vue';
import { SortBy } from '../../types/SortBy.type';
import { FilterBy } from '../../types/FilterBy.type';
import { TableHeader, TableRow } from '../../types/TableData.type';
import componentsConfig from '../../config/components.config.json';
import PrintTable from './PrintTable.vue';
import ExportXLSX from './ExportXLSX.vue';
import { HttpError } from '../../types/HttpError.type';
import { watchDebounced } from '@vueuse/shared';
import TableFilter from './TableFilter.vue';
import { scaleLinear, extent, line } from 'd3';

const pageGraph = ref<HTMLElement | null>(null);
const { t } = useI18n();

type Props = {
  title: string;
  pageData: TableRow[];
  itemsPerPage: number;
  searchTerm: string;
  currentPage: number;
  isLoading: boolean;
  sortBy: SortBy[];
  filterBy: FilterBy[];
  dataLength: number;
  headers: TableHeader[];
  loadingError: HttpError | null;
};

const emit = defineEmits<{
  (event: 'update:searchTerm', value: string): void;
  (event: 'update:currentPage', value: number): void;
  (event: 'update:itemsPerPage', value: number): void;
  (event: 'update:sortBy', value: SortBy[]): void;
  (event: 'update:filterBy', value: FilterBy[]): void;
  (event: 'refresh', value: void): void;
  (event: 'view', value: TableRow): void;
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
  filterBy: () => [],
  pageData: () => [],
  headers: () => [],
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

const filterBy = computed({
  get: () => refProps.filterBy.value,
  set: (value: FilterBy[]) => emit('update:filterBy', value),
});

watchDebounced(refProps.isLoading, (value) => {
  showLoader.value = value;
}, { debounce: 500 });

const paginationLength = computed(() => Math.ceil(refProps.dataLength.value / refProps.itemsPerPage.value));

const startItem = computed(() => ((refProps.currentPage.value - 1) * refProps.itemsPerPage.value) + 1);
const endItem = computed(() => Math.min(refProps.currentPage.value * refProps.itemsPerPage.value, refProps.dataLength.value));

const sortByHeader = (key: string) => {
  const index = sortBy.value.findIndex((sort) => sort.field === key);
  if (index === -1) {
    sortBy.value.push({ field: key, direction: 'asc' });
  } else {
    if (sortBy.value[index].direction === 'asc') {
      sortBy.value[index].direction = 'desc';
    } else {
      sortBy.value.splice(index, 1);
    }
  }
};

const isSortedBy = (key: string) => {
  const index = sortBy.value.findIndex((sort) => sort.field === key);
  if (index === -1) {
    return '';
  } else {
    return sortBy.value[index].direction;
  }
};

const selectedChartType = ref<string>('bar');
const yVariables = computed<TableHeader[]>(() => refProps.headers.value.filter((header) => header.type === 'number'));
const selectedYVariable = ref<string>(yVariables.value[0].key);

const extractYValue = (row: TableRow) => {
  const header = refProps.headers.value.find((header) => header.key === selectedYVariable.value);
  if (header) {
    return +row[header.key];
  } else {
    return 0;
  }
};

const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const tickOffset = 10;

const innerWidth = computed(() => pageGraph.value ? pageGraph.value.clientWidth - margin.left - margin.right : 0);
const innerHeight = computed(() => pageGraph.value ? pageGraph.value.clientHeight - margin.top - margin.bottom : 0);

const barWidth = computed(() => innerWidth.value / refProps.pageData.value.length);
const dampenBarWidth = computed<number>(()=> Math.min(barWidth.value * 0.8, innerWidth.value / 2))

const scaleX = computed(() => scaleLinear()
  .domain([1, refProps.pageData.value.length + 1])
  .range([barWidth.value - dampenBarWidth.value, innerWidth.value])
  .nice());

const scaleY = computed(() => scaleLinear()
  .domain(extent(refProps.pageData.value, extractYValue) as [number, number])
  .range([innerHeight.value, 0])
  .nice());

const getBottomTickPosition = (tick: number) => `translate(${scaleX.value(tick)},0)`;
const getLeftTickPosition = (tick: number) => `translate(0,${scaleY.value(tick)})`;

const bottomLabelPosition = computed<number>(() => innerHeight.value + tickOffset);
const leftLabelPosition = computed<number>(() => -tickOffset);

const bottomTextPosition = computed<string>(()=> `translate(${-yAxisLabelOffset}, ${innerHeight.value}) rotate(-90)`);

const linePath = computed<string>(()=> line<TableRow>()
  .x((row, index) => scaleX.value(index + 1))
  .y(row => scaleY.value(extractYValue(row)))(refProps.pageData.value) as string);

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

.tick line {
  stroke: #C0C0BB;
}

.tick text {
  fill: #635F5D;
  font-size: 50%;
}

rect {
  transition: all 0.5s ease;
}

rect:hover {
  fill: #F2F2F2;
}

rect:hover + text {
  display: unset;
}

rect:not(:hover) + text {
  display: none;
}

path {
  transition: all 0.5s ease;
  stroke: steelblue;
  transition: all 0.5s ease;
  stroke-width: 1;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.chart-plot g{
  transition: all 0.5s ease;
}

.axis-label {
  font-size: 130%;
  fill: #635F5D;
}
</style>