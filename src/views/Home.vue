<script lang="ts">
	export default {
		name: 'Home',
	};
</script>

<template>
	<div class="bg-texture h-100 flex-grow-1">
		{{t('homeMsg')}}
		<br>
		<router-link :to="{ name: 'Search' }">go to search</router-link>
	</div>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	const {t}= useI18n();
</script>