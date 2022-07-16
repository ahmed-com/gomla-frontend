<script lang="ts">
	export default {
		name: 'Dashboard',
	};
</script>

<template>
    <h1>Dashboard welcome message "localized" <router-link :to="{name: 'Deal', params: {dealId: 'x'}}"> deal </router-link></h1>
</template>

<script setup lang="ts">
	//
</script>