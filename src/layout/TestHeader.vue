<template>
    <v-app-bar density="prominent" name="test-header" fixed color="primary" app>
        <v-app-bar-nav-icon @click="toggleLeftDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
</template>

<script setup lang="ts">
    import { onMounted } from "vue";
    import useLayoutManager from "../composables/useLayoutManager";
    const { toggleLeftDrawer, calculateHeaderSize } = useLayoutManager();
    onMounted(calculateHeaderSize('test-header'));
</script>