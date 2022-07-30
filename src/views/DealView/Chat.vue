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
				v-for="(message, i) in messages"
				:key="message.id"
				:id="`msg-${message.id}`"
				class="pa-4 ma-4 bg-blue"
				v-intersect="onIntersect(i)"
			>
				{{ message.content }}
				<br v-if="message.attachment">
				<v-img :eager="true" v-if="message.attachment" :src="message.attachment"></v-img>
			</div>
			<new-messages-divider :showDivider="true"></new-messages-divider>
		<scroll-btn :showFAB="showFAB" @click="scrollToBottom('smooth')"></scroll-btn>
		<chat-footer></chat-footer>
	</div>
</template>

<script setup lang="ts">
	import { computed, onMounted, onUnmounted, ref } from 'vue';
    import ChatFooter from '../../components/ChatFooter.vue';
	import { useMessages } from '../../stores/useMessages';
    import useLayoutManager from '../../composables/useLayoutManager';
	import ScrollBtn from '../../components/ScrollBtn.vue';
	import NewMessagesDivider from '../../components/NewMessagesDivider.vue';

	const { messages } = useMessages();
    const { headerSize } = useLayoutManager()

	const showFAB = ref<boolean>(false);
    const computedHeaderSize = computed(()=> `${headerSize.value}px`);
	const scrollToBottom = (behavior: ScrollBehavior)=> chatContainer.value!.scrollTo({
		top: chatContainer.value!.scrollHeight,
		behavior
	});

    const mutationCallback: MutationCallback = (_: MutationRecord[]) => !showFAB.value && scrollToBottom('smooth');
    const mutationObserver = new MutationObserver(mutationCallback) 

    const chatContainer = ref<HTMLElement | null>(null)

    onMounted(()=>{
        mutationObserver.observe(chatContainer.value!,{
            childList: true,
            subtree: true
        })
    });

	onUnmounted(()=>mutationObserver.disconnect());

	const onIntersect = (index: number) => (isIntersecting: boolean) => (index === messages.length - 1) ? showFAB.value = !isIntersecting : undefined;
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
