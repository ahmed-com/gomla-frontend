<script lang="ts">
export default {
    name: "ExportXLSX",
}
</script>

<template>
    <v-btn density="compact" :disabled="!pageTable" class="d-inline mx-2" color="primary" @click="exportXLSX">
        <v-icon>mdi-download</v-icon>
        {{ t('components.DataTable.export') }}
    </v-btn>
</template>

<script setup lang="ts">
import XLSX from "xlsx";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
    pageTable: HTMLElement | null,
    filename: string,
}>();

function exportXLSX(){
    if (!props.pageTable) return;
    const wb = XLSX.utils.table_to_book(props.pageTable, { sheet: props.filename });
    XLSX.writeFile(wb, `${props.filename}.xlsx`);
}
</script>