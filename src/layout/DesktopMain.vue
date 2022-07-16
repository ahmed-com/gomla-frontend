<script lang="ts">
	export default {
		name: 'DesktopMain',
	};
</script>

<template>
	<v-main :style="{'padding-left': '0px','padding-right': '0px'}">
		<template v-if="hasLeftDrawer">
			<Transition name="slide">
				<div v-if="leftDrawer">
					<v-navigation-drawer
						:name="drawerLayoutName"
						absolute
						:style="desktopDrawerStyle"
					>
						<slot name="drawer"></slot>
					</v-navigation-drawer>
				</div>
			</Transition>
		</template>
		<div class="flex-grow-1 slide-sibling">
			<slot></slot>
		</div>
	</v-main>
</template>

<script setup lang="ts">
    import { thunkify } from 'ramda';
    import { computed, onMounted, onUnmounted, watch, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import useLayoutManager from '../composables/useLayoutManager';

	const route = useRoute();
	const hasLeftDrawer = ref(true);

    const { drawerLayoutName } = defineProps<{drawerLayoutName: string}>()

    const { leftDrawer, desktopDrawerStyle, calculateLeftDrawerSize, leftDrawerSize, minContentHeight} = useLayoutManager()
    const calculate = thunkify(calculateLeftDrawerSize)(drawerLayoutName);
    onMounted(calculate)
	watch(() => useRoute()?.name, calculate);
	watch(()=> route.name, ()=> hasLeftDrawer.value = !!route?.matched?.[0]?.components?.leftDrawer || false)
    onUnmounted(calculate)

    const drawerSizeInverted = computed(()=>`-${leftDrawerSize.value}px`)
    const drawerSize = computed(()=>`${leftDrawerSize.value}px`)
    
</script>

<style scoped>

	.slide-leave-active,
	.slide-leave-active + .slide-sibling{
		transition: transform 300ms ease-out;
	}

	.slide-enter-active,
	.slide-enter-active {
		transition: width 300ms ease-out;
	}

    .slide-enter-from{
        width: 0px;
    }

    .slide-enter-to{
        width: v-bind('drawerSize');
    }

	.slide-leave-to,
	.slide-leave-to + .slide-sibling {
		transform: translateX(v-bind('drawerSizeInverted'));
	}

	.slide-leave-from,
	.slide-leave-from + .slide-sibling{
		transform: translateX(0px);
	}
    
</style>

<style>
	.v-main__wrap {
		display: flex;
		height: 100%;
		min-height: v-bind('minContentHeight');
		width: 100%;
		flex-wrap: nowrap;
	}

	.v-layout {
		overflow: visible !important;
	}
</style>
