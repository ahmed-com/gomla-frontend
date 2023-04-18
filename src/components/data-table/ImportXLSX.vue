<script lang="ts">
export default {
  name: "ImportXLSX",
}
</script>

<template>
  <v-btn density="compact" class="d-inline mx-2" color="primary">
    <v-icon>mdi-upload</v-icon>
    {{ t('components.DataTable.import') }}
  </v-btn>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  importTemplateHeaders: string[],
}>()
</script>