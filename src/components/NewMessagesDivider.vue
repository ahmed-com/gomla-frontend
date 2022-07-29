<template>
    <div class="d-flex align-center" ref="divider">
    <v-divider></v-divider>
    <div class="bg-info rounded-pill pa-2 mx-2 flex-grow-0 flex-shrink-0 "> New Messages </div>
    <v-divider></v-divider>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const divider = ref<HTMLElement | null>(null);

onMounted(()=>divider.value!.scrollIntoView());
</script>