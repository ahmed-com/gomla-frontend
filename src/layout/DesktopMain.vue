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
    <!-- <div class="the-container">
        <div class="the-drawer">
            <slot name="drawer"></slot>
        </div>
        <div class="the-main">
            <slot></slot>
        </div>
    </div> -->
</template>

<script setup lang="ts">
    import { thunkify } from 'ramda';
    import { computed, onMounted, onUnmounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import useLayoutManager from '../composables/useLayoutManager';

    const { drawerLayoutName } = defineProps<{drawerLayoutName: string}>()

    const {hasLeftDrawer, leftDrawer, desktopDrawerStyle, calculateLeftDrawerSize, leftDrawerSize} = useLayoutManager()
    const calculate = thunkify(calculateLeftDrawerSize)(drawerLayoutName);
    onMounted(calculate)
	watch(() => useRoute()?.name, calculate);
    onUnmounted(calculate)

    const drawerSizeInverted = computed(()=>`-${leftDrawerSize.value}px`)
    const drawerSize = computed(()=>`${leftDrawerSize.value}px`)
    
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
		transform: translateX(v-bind('drawerSizeInverted'));
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
		flex-wrap: nowrap;
	}

	.v-layout {
		overflow: visible !important;
	}
</style>
