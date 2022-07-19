<script lang="ts">
	export default {
		name: 'MapRightSidebar',
	};
</script>

<template>
<v-card height="100%" max-height="100%" color="secondary">
	<div id="map-id"></div>
</v-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useSearchMapStore } from '../stores/searchMapStore';
const { setMap, removeMap } = useSearchMapStore();

onMounted(()=> setMap('map-id'));
onUnmounted(removeMap);
</script>
