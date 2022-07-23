<script lang="ts">
	export default {
		name: 'DealDiscussion',
	};
</script>

<template>
    <div class="padding-for-footer max-screen">
        the deal chat
        <router-link :to="{name : 'Home'}">go to home</router-link>
        <div v-for="message in messages" :key="message.id" :id="`msg-${message.id}`" class="pa-4 ma-4 bg-blue">{{message.content}}</div>
        <chat-footer></chat-footer>
    </div>
</template>

<script setup lang="ts">
    import ChatFooter from '../../components/ChatFooter.vue';
    import { useMessages } from '../../stores/useMessages';
    const {messages} = useMessages()
</script>

<style scoped lang="scss">
@import '../../styles/variables';

.padding-for-footer{
    padding-bottom: $chat-footer-height;
}

.max-screen{
    max-height: 50vh;
}

</style>