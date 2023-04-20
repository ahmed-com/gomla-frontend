<script lang="ts">
export default {
  name: "ImportXLSX",
}
</script>

<template>
  <v-tooltip location="top">
    <template #activator="{ props: tooltipProps }">
      <v-dialog v-model="isDialogOpen">
        <template #activator="{ props: dialogProps }">
          <v-btn v-bind="{...dialogProps, ...tooltipProps}" icon="mdi-upload" class="d-inline mx-2" color="primary" :disabled="disabled">
          </v-btn>
        </template>
        <v-card class="">
          <v-card-title class="headline">{{ t('components.DataTable.importCardTitle') }}</v-card-title>
          <v-card-text>
            <div
              v-show="!isFileSelected"
              @dragenter.prevent="isDragOver = true"
              @dragleave.prevent="isDragOver = false"
              @dragover.prevent="isDragOver = true"
              @drop.prevent="importFile"
              class="d-flex flex-column align-center justify-center text-h5 text-primary-darken-1 rounded-lg pa-4"
              :class="{ 'active-dragover': isDragOver, 'inactive-dragover': !isDragOver }"
            >
              <v-icon color="#ccc" size="300" >mdi-file-excel-outline</v-icon>
              {{ t('components.DataTable.dragAndDrop') }}
            </div>
            <v-divider class="mt-2"></v-divider>
            <label
              for="import-file"
              class="cursor-pointer d-flex align-center justify-center elevation-4 bg-primary text-h5 text-white rounded-lg pa-2 my-2"
            >
              <input
                type="file"
                accept=".xlsx"
                id="import-file"
                @change="importFile"
                :disabled="disabled"
                class="d-none"
              />
              {{ t('components.DataTable.import') }}
            </label>
            <a href="#"> {{ t('components.DataTable.downloadTemplate') }} </a>
          </v-card-text>
          <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="isDialogOpen = false">
              {{ t('components.DataTable.cancelImport') }}
            </v-btn>
            <v-btn color="blue darken-1" text @click="importFile">
              {{ t('components.DataTable.import') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <span>{{ t('components.DataTable.import') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { defineProps, ref } from 'vue';
import XLSX from 'xlsx';

const isDialogOpen = ref(false);
const isFileSelected = ref(false);
const isDragOver = ref(false);


const importFile = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    isFileSelected.value = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach((sheetName) => {
        const rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        const headers = rowObject[0];
        const headersArray = Object.keys(headers);
        const isHeadersValid = importTemplateHeaders.every((header) =>
          headersArray.includes(header)
        );
        if (isHeadersValid) {
          const data = rowObject.map((row) => {
            const newRow = {};
            Object.keys(row).forEach((key) => {
              newRow[key] = row[key];
            });
            return newRow;
          });
          emit('import', data);
        } else {
          emit('error', {
            message: t('components.DataTable.importError')
          });
        }
      });
    };
    reader.readAsBinaryString(file);
  }
};

const { t } = useI18n();

const props = defineProps<{
  importTemplateHeaders: string[],
  disabled: boolean,
}>()
</script>

<style scoped>
.active-dragover {
  border: 2px dashed rgb(var(--v-theme-primary));
}
.inactive-dragover {
  border: 2px dashed rgb(var(--v-theme-secondary-lighten-3));
}
</style>