<template>
	<slot name="header"></slot>

	<template v-if="!isDesktop && hasLeftDrawer">
		<v-navigation-drawer name="left-drawer" app v-model="leftDrawer">
			<slot name="left-drawer"></slot>
		</v-navigation-drawer>
	</template>

	<template v-if="hasRightDrawer">
		<v-navigation-drawer order="-1" name="right-drawer" app v-model="rightDrawer" location="right">
			<slot name="right-drawer"></slot>
		</v-navigation-drawer>
	</template>

	<v-main :style="contentStyle">
		<template v-if="isDesktop && hasLeftDrawer">
			<Transition name="slide">
				<div v-if="leftDrawer">
					<v-navigation-drawer
						name="left-drawer"
						absolute
						:style="desktopDrawerStyle"
					>
						<slot name="left-drawer"></slot>
					</v-navigation-drawer>
				</div>
			</Transition>
		</template>
		<div class="flex-grow-1 slide-sibling">
			<slot></slot>
		</div>
	</v-main>

	<v-footer name="footer" :order="footerOrder" app absolute class="pa-0">
		<slot name="footer"></slot>
	</v-footer>
</template>

<script setup lang="ts">
	import useLayoutManager from '../composables/useLayoutManager';
	import { onMounted, watch } from 'vue';
	import { useRoute } from 'vue-router';
	
	const {
		isDesktop,
		contentStyle,
		desktopDrawerStyle,
		leftDrawer,
		rightDrawer,
		footerOrder,
		hasLeftDrawer,
		hasRightDrawer,
		initLayout,
		calculateDrawerSize,
		calculateHasLeftDrawer,
		calculateHasRightDrawer,
	} = useLayoutManager();

	initLayout();
	onMounted(calculateDrawerSize('left-drawer'));

	calculateHasLeftDrawer('left-drawer')();
	calculateHasRightDrawer('right-drawer')();

	watch(()=> useRoute()?.name, calculateHasLeftDrawer('left-drawer'))
	watch(()=> useRoute()?.name, calculateHasRightDrawer('right-drawer'))
</script>

<script lang="ts">
	export default {
		name: 'Layout',
	};
</script>

<style scoped>
	
	.slide-leave-active,
	.slide-leave-active + .slide-sibling{
		transition: transform 300ms ease-in;
	}

	.slide-enter-active,
	.slide-enter-active + .slide-sibling{
		transition: transform 300ms cubic-bezier(0,1,0,1);
	}

	.slide-enter-from,
	.slide-leave-to,
	.slide-enter-from + .slide-sibling,
	.slide-leave-to + .slide-sibling {
		transform: translateX(-200px);
	}

	.slide-enter-to,
	.slide-leave-from,
	.slide-enter-to + .slide-sibling,
	.slide-leave-from + .slide-sibling{
		transform: translateX(0px);
	}
</style>

<style>
	.v-main__wrap {
		display: flex;
		height: 100%;
		min-height: 70vh;
		width: 100%;
		flex-wrap: wrap;
	}

	.v-layout {
		overflow: visible !important;
	}
</style>
