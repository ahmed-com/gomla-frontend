<script lang="ts">
	export default {
		name: 'DealDiscussion',
	};
</script>

<template>
	<div ref="chatContainer" class="padding-for-footer max-screen overflow-y-auto scrollbar-hidden">
		the deal chat
		<router-link :to="{ name: 'Home' }">go to home</router-link>
			<div
				v-for="message in messages"
				:key="message.id"
				:id="`msg-${message.id}`"
				class="pa-4 ma-4 bg-blue"
			>
				{{ message.content }}
				<br v-if="message.attachment">
				<img v-if="message.attachment" :src="message.attachment">
			</div>
		<chat-footer></chat-footer>
	</div>
</template>

<script setup lang="ts">
	import { computed, onMounted, onUnmounted, ref } from 'vue';
    import ChatFooter from '../../components/ChatFooter.vue';
	import { useMessages } from '../../stores/useMessages';
    import useLayoutManager from '../../composables/useLayoutManager';

	const { messages } = useMessages();
    const { headerSize } = useLayoutManager()

    const computedHeaderSize = computed(()=> `${headerSize.value}px`)

    const mutationCallback: MutationCallback = (_: MutationRecord[]) => chatContainer.value!.scrollTo({
		top: chatContainer.value!.scrollHeight,
		behavior: 'smooth'
	});
    const mutationObserver = new MutationObserver(mutationCallback)

    const chatContainer = ref<HTMLElement | null>(null)

    onMounted(()=>{
        mutationObserver.observe(chatContainer.value!,{
            childList: true,
            subtree: true
        })
    });

	// onMounted(()=>{
	// 	document.getElementById('msg-8')?.scrollIntoView(); // move this into the new-messages-divider component
	// })

	onUnmounted(()=>mutationObserver.disconnect());
</script>

<style scoped lang="scss">
	@import '../../styles/variables';

	.padding-for-footer {
		padding-bottom: $chat-footer-height;
	}

	.max-screen {
		max-height: calc(100vh - $tab-height - v-bind('computedHeaderSize'));
	}
</style>
