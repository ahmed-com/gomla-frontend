<script lang="ts">
	export default {
		name: 'Deal',
	};
</script>

<template>
	<v-card min-height="100%" flat class="flex-grow-1 bg-texture">
		<div
			class="tabs-container w-100 tab-height bg-secondary d-flex flex-row"
		>
			<div
				class="position-absolute position-left-0 h-100 bg-primary active-identifier"
				:style="activeIdentifierStyle"
			></div>
			<div
				v-for="tab in tabs"
				:key="tab.text"
				ref="tabsElements"
				class="px-4 h-100 bg-transparent d-flex align-center"
			>
				<router-link
					:to="tab.route"
					class="text-decoration-none font-weight-bold"
					:class="{
						'text-secondary': currentRoute.name == tab.route.name,
						'text-primary': currentRoute.name != tab.route.name,
					}"
				>
					{{ t(tab.text) }}
				</router-link>
			</div>
		</div>

		<div class="container-wrapper margin-for-tabs">
			<router-view v-slot="{ Component, route }">
				<Transition :name="transitionName" mode="default">
					<div :key="route.path" class="route-wrapper">
						<component
							:is="Component"
							:key="route.path"
							:someProp="dealId"
							:dealId="dealId"
						></component>
					</div>
				</Transition>
			</router-view>
		</div>
	</v-card>
</template>

<script setup lang="ts">
	import { computed, ref } from '@vue/reactivity';
	import { findIndex, gt, lt } from 'ramda';
	import { CSSProperties, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import { useI18n } from 'vue-i18n';
	import { useRtl } from 'vuetify/lib/framework.mjs';
	import { NavigationTab } from '../../types/NavigationTab.type';
	import useLayoutManager from '../../composables/useLayoutManager';

	const { headerSize } = useLayoutManager();
	const tabsTopValue = computed(() => `${headerSize.value}px`);

	const { t } = useI18n();
	const { isRtl } = useRtl();

	const { dealId } = defineProps<{ dealId: string }>();
	const currentRoute = useRoute();

	const tabs = computed<NavigationTab[]>(() => [
		{ text: 'nested.msg1', route: { name: 'Deal', params: { dealId } } },
		{
			text: 'nested.msg2',
			route: { name: 'DealDiscussion', params: { dealId } },
		},
	]);
	const transitionName = ref<string>('');
	const tabsElements = ref<HTMLElement[]>([]);
	const activeIdentifierStyle = computed<CSSProperties>(() => {
		let activeWidth: number = 0;
		const activeTranslation: number = tabsElements.value.reduce(
			(acc: number, el: HTMLElement, index: number) => {
				const elementWidth: number = el.clientWidth;
				if (currentRoute.name == tabs.value[index].route.name)
					activeWidth = elementWidth;
				if (activeWidth) return acc;
				return acc + elementWidth;
			},
			0
		);

		return {
			width: `${activeWidth}px`,
			transform: `translateX(${activeTranslation}px)`,
		};
	});

	watch(
		() => currentRoute.name,
		(to, from) => {
			const toIndex = findIndex(
				(tab: NavigationTab) => tab.route.name == to,
				tabs.value
			);
			const fromIndex = findIndex(
				(tab: NavigationTab) => tab.route.name == from,
				tabs.value
			);
			const isLeft = isRtl.value
				? lt(toIndex, fromIndex)
				: gt(toIndex, fromIndex);
			transitionName.value = `slide-${isLeft ? 'left' : 'right'}`;
		}
	);
</script>

<style scoped lang="scss">
	@import '../../styles/variables';

	.active-identifier {
		z-index: -1;
		transition: all 100ms ease-in-out;
	}
	.tabs-container {
		position: fixed;
		top: v-bind('tabsTopValue');
		z-index: 1;
	}

	.tab-height {
		height: $tab-height;
	}

	.margin-for-tabs {
		margin-top: $tab-height;
	}
	.container-wrapper {
		width: 100%;
		min-height: 100%;
		position: relative;
	}

	.route-wrapper {
		width: 100%;
	}

	.slide-left-enter-active,
	.slide-left-leave-active,
	.slide-right-enter-active,
	.slide-right-leave-active {
		transition: all 300ms ease-out;
		position: absolute;
	}
	.slide-left-enter-to,
	.slide-right-leave-from {
		position: absolute;
		right: 0%;
	}
	.slide-left-enter-from,
	.slide-right-leave-to {
		position: absolute;
		right: -100%;
	}
	.slide-left-leave-to,
	.slide-right-enter-from {
		position: absolute;
		left: -100%;
	}
	.slide-left-leave-from,
	.slide-right-enter-to {
		position: absolute;
		left: 0%;
	}
</style>
