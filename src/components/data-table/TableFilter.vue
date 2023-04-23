<script lang="ts">
export default {
  name: "TableFilter"
}
</script>

<template>
  <v-tooltip location="bottom">
    <template #activator="{ props: tooltipProps }">
      <v-dialog v-model="dialog">
        <template #activator="{ props: dialogProps }">
          <v-btn :disabled="props.disabled" :loading="props.isLoading" class="d-inline bg-primary mx-2" icon="mdi-filter"
            v-bind="{ ...tooltipProps, ...dialogProps }"></v-btn>
        </template>
        <v-card min-width="750">
          <v-card-title>{{ t('components.DataTable.filter') }}</v-card-title>
          <v-card-text>
            <v-text-field v-for="header in props.headers.filter(h => h.filterable && (h.type === 'text' || h.type === 'markableText'))" :key="header.key" :label="header.text"
              outlined dense :model-value="filterBy.find(f => f.field === header.key)?.value"
              @update:model-value="x => addFilter({ field: header.key, value: x, operator: 'eq' })"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="dialog = false">{{ t('components.DataTable.cancelFilter') }}</v-btn>
            <v-btn @click="applyFilters">{{ t('components.DataTable.applyFilters') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <span>{{ t('components.DataTable.filter') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { toRefs } from '@vueuse/core'
import { ref, computed } from 'vue'
import { FilterBy } from '../../types/FilterBy.type'
import { TableHeader } from '../../types/TableData.type'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const dialog = ref(false)
type Props = {
  filterBy: FilterBy[],
  headers: TableHeader[],
  disabled: boolean,
  isLoading: boolean,
}

const props = defineProps<Props>()
const refProps = toRefs(props)

const emit = defineEmits<{
  (event: 'update:filterBy', value: FilterBy[]): void,
  (event: 'applyFilters'): void
}>()

const filterBy = computed({
  get: () => refProps.filterBy.value,
  set: (value: FilterBy[]) => emit('update:filterBy', value)
})

const addFilter = (filter: FilterBy) => {
  if (filterBy.value.find(f => f.field === filter.field)) {
    filterBy.value = filterBy.value.map(f => f.field === filter.field ? filter : f)
  } else {
    filterBy.value = [...filterBy.value, filter]
  }
}

const applyFilters = () => {
  dialog.value = false
  emit('applyFilters')
}

</script>