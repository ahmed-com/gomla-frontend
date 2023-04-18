<script lang="ts">
export default {
  name: "ImportXLSX",
}
</script>

<template>
  <v-btn class="d-inline mx-2" color="primary">import</v-btn>
</template>

<script setup lang="ts">
const props = defineProps<{
  importTemplateHeaders: string[],
}>()
</script>