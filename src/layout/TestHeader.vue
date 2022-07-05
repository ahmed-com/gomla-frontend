<template>
    <v-app-bar order="-1" density="prominent" name="test-header" fixed color="primary" app>
        <v-app-bar-nav-icon @click="toggleLeftDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="toggleRightDrawer"></v-app-bar-nav-icon>

    </v-app-bar>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted } from "vue";
    import useLayoutManager from "../composables/useLayoutManager";
    const { toggleLeftDrawer, calculateHeaderSize, toggleRightDrawer } = useLayoutManager();
    onMounted(calculateHeaderSize('test-header'));
    onUnmounted(calculateHeaderSize('test-header'))
</script>