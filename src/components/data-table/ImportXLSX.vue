<script lang="ts">
export default {
  name: "ImportXLSX",
}
</script>

<template>
  <v-tooltip location="top">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-upload" class="d-inline mx-2" color="primary" :disabled="disabled">
      </v-btn>
    </template>
    <span>{{ t('components.DataTable.import') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  importTemplateHeaders: string[],
  disabled: boolean,
}>()
</script>