<script lang="ts">
export default {
    name: "ExportXLSX",
}
</script>

<template>
    <v-tooltip location="bottom">
        <template #activator="{ props }">
            <v-btn v-bind="props" :disabled="!pageTable || disabled" icon="mdi-download" class="d-inline mx-2" color="primary">
            </v-btn>
        </template>
        <span>{{ t('components.DataTable.export') }}</span>
    </v-tooltip>
</template>

<script setup lang="ts">
import XLSX from "xlsx";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
    pageTable: HTMLElement | null,
    filename: string,
    disabled: boolean,
}>();

function exportXLSX(){
    if (!props.pageTable) return;
    const wb = XLSX.utils.table_to_book(props.pageTable, { sheet: props.filename });
    XLSX.writeFile(wb, `${props.filename}.xlsx`);
}
</script>