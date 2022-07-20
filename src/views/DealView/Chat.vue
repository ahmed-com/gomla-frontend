<script lang="ts">
	export default {
		name: 'DealDiscussion',
	};
</script>

<template>
    <div class="bg-red">
        the deal chat
        <router-link :to="{name : 'Home'}">go to home</router-link>
        <chat-footer></chat-footer>
    </div>
</template>

<script setup lang="ts">
    import ChatFooter from '../../components/ChatFooter.vue';
</script>