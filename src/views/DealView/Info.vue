<template>
    <v-sheet height="250" color="blue">
        the deal info
        dealId: {{dealId}}
        someProp: {{someProp}}
    </v-sheet>
</template>

<script setup lang="ts">
    const {dealId, someProp} = defineProps<{dealId: string, someProp: string}>()
</script>