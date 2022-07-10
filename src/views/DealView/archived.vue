<template>
	<div>
		<div>
			<router-link :to="{ name: 'Deal', params: { dealId } }">
				Info
			</router-link>
			<router-link :to="{ name: 'DealDiscussion', params: { dealId } }">
				Discussion
			</router-link>
		</div>
		<router-view v-slot="{ Component, route }">
			<Transition
				:name="route.name === 'Deal' ? 'fade-left' : 'fade-right'"
				mode="default"
			>
				<!-- <keep-alive>
					<suspense> -->
						<!-- <template #default> -->
							<component
								:is="Component"
								:key="route.path"
								:someProp="dealId"
							></component>
						<!-- </template> -->
						<!-- <template #fallback> Loading... </template> -->
					<!-- </suspense>
				</keep-alive> -->
			</Transition>
		</router-view>
	</div>
</template>

<script setup lang="ts">
	const { dealId } = defineProps<{ dealId: string }>();
</script>

<style scoped>
    .fade-right-enter-active,
    .fade-right-leave-active,
    .fade-left-enter-active,
    .fade-left-leave-active{
        transition: transform 300ms ease-out;
    }

    .fade-left-enter-active,
    .fade-right-enter-active{
        position: relative;
        top: -250px;
    }

    .fade-right-enter-from,
    .fade-left-leave-to{
        transform: translateX(100%);
    }

    .fade-left-enter-from,
    .fade-right-leave-to{
        transform: translateX(-100%);
    }

    .fade-right-enter-to,
    .fade-right-enter-to,
    .fade-left-leave-from,
    .fade-left-leave-from{
        transform: translateX(0px);
    }
</style>