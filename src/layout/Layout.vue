<template>
	<TestHeader></TestHeader>
	<template v-if="!isDesktop">
		<v-navigation-drawer name="left-drawer" app v-model="leftDrawer">
			<TestLeftDrawer></TestLeftDrawer>
		</v-navigation-drawer>
	</template>
	<v-main :style="contentStyle">
		<template v-if="isDesktop">
			<Transition name="slide">
				<div v-if="leftDrawer">
					<v-navigation-drawer
						name="left-drawer"
						absolute
						:style="desktopDrawerStyle"
					>
						<TestLeftDrawer></TestLeftDrawer>
					</v-navigation-drawer>
				</div>
			</Transition>
		</template>
		<slot></slot>
	</v-main>
	<v-footer name="footer" :order="footerOrder" app absolute class="pa-0">
		<TestFooter></TestFooter>
	</v-footer>
</template>

<script setup lang="ts">
	import TestHeader from './TestHeader.vue';
	import TestLeftDrawer from './TestLeftDrawer.vue';
	import useLayoutManager from '../composables/useLayoutManager';
	import TestFooter from './TestFooter.vue';
	import { onMounted } from 'vue';

	const {
		isDesktop,
		contentStyle,
		desktopDrawerStyle,
		leftDrawer,
		footerOrder,
		initLayout,
		calculateDrawerSize,
	} = useLayoutManager();

	initLayout();
	onMounted(calculateDrawerSize('left-drawer'));
</script>

<script lang="ts">
	export default {
		name: 'Layout',
	};
</script>

<style scoped>
	.slide-enter-active,
	.slide-leave-active {
		transition: all 300ms ease-out;
	}

	.slide-enter-from,
	.slide-leave-to {
		transform: translateX(-100%);
	}

	.slide-enter-to,
	.slide-leave-from {
		transform: translateX(0px);
	}
</style>

<style>
	.v-main__wrap {
		display: flex;
		height: 100%;
	}

	.v-layout {
		overflow: visible !important;
	}
</style>
