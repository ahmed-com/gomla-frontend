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
          <v-btn class="d-inline bg-primary mx-2" icon="mdi-filter" v-bind="{ ...tooltipProps, ...dialogProps }"></v-btn>
        </template>
        <v-card>
          <v-card-title>Filter</v-card-title>
          <v-card-text>
            <v-text-field v-model="filterBy" label="Filter" outlined dense></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="dialog = false">Close</v-btn>
            <v-btn @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <span>Filter</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { toRefs } from '@vueuse/core'
import { ref } from 'vue'
import { FilterBy } from '../../types/FilterBy.type'
import { TableHeader } from '../../types/TableData.type'

const dialog = ref(false)
type Props = {
  filterBy: FilterBy[],
  headers: TableHeader[],
}

const props = defineProps<Props>()
const refProps = toRefs(props)

const emit = defineEmits<{
  (event: 'update:filterBy', value: FilterBy): void
}>()

</script>