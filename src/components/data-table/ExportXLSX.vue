<script lang="ts">
export default {
    name: "ExportXLSX",
}
</script>

<template>
    <v-btn :disabled="!pageTable" class="d-inline mx-2" color="primary" @click="exportXLSX">export</v-btn>
</template>

<script setup lang="ts">
import XLSX from "xlsx";

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