<template>
	<v-app>
		<BaseLayout>
			<template  #header>
				<TestHeader v-if="true"></TestHeader>
			</template>

			<template #left-drawer>
				<TestLeftDrawer v-if="true"></TestLeftDrawer>
			</template>

			<template #right-drawer>
				<TestLeftDrawer v-if="true"></TestLeftDrawer>
			</template>

			<template #default>
				<HelloWorld></HelloWorld>
			</template>

			<template #footer>
				<TestFooter></TestFooter>
			</template>
		</BaseLayout>
	</v-app>
</template>

<script setup lang="ts">
	import BaseLayout from './layout/BaseLayout.vue';
	import TestHeader from './layout/TestHeader.vue';
	import TestFooter from './layout/TestFooter.vue';
	import TestLeftDrawer from './layout/TestLeftDrawer.vue';
	import HelloWorld from './components/HelloWorld.vue';
</script>

<script lang="ts">
	export default {
		name: 'App',
	};
</script>
