<script lang="ts">
	export default {
		name: 'Home',
	};
</script>

<template>
	<div class="background-texture fill-height">
		{{t('homeMsg')}}
		<br>
		<router-link :to="{ name: 'Search' }">go to search</router-link>
		<v-btn @click="toggleLocales">Toggle</v-btn>
	</div>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import { useRtl } from 'vuetify/lib/framework.mjs';
	const x = useRtl();
	const z = useI18n();
	const { t } = z;
	
	const toggleLocales = ()=> z.locale.value = z.locale.value === "en" ? "ar" : "en"
</script>

<style>
	.background-texture{
		background-image: var(--v-texture);
	}
</style>