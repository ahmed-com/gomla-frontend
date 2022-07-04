<template>
	<v-app>
		<Layout>
			<HelloWorld></HelloWorld>
		</Layout>
	</v-app>
</template>

<script setup lang="ts">
	import Layout from './layout/Layout.vue';
import HelloWorld from './components/HelloWorld.vue';

</script>

<script lang="ts">
	export default {
		name: 'App',
	};
</script>