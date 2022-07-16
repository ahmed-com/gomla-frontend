<script lang="ts">
	export default {
		name: 'Home',
	};
</script>

<template>
	<div>Home
		<router-link :to="{name: 'Search'}">go to search</router-link>
	</div>
</template>

<script setup lang="ts">
	//
</script>