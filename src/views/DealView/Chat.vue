<script lang="ts">
	export default {
		name: 'DealDiscussion',
	};
</script>

<template>
    <div class="padding-for-footer">
        the deal chat
        <router-link :to="{name : 'Home'}">go to home</router-link>
        <div class="pa-4 ma-4 bg-blue">0</div>
        <div class="pa-4 ma-4 bg-blue">1</div>
        <div class="pa-4 ma-4 bg-blue">2</div>
        <div class="pa-4 ma-4 bg-blue">3</div>
        <chat-footer></chat-footer>
    </div>
</template>

<script setup lang="ts">
    import ChatFooter from '../../components/ChatFooter.vue';
</script>

<style scoped lang="scss">
@import '../../styles/variables';

.padding-for-footer{
    padding-bottom: $chat-footer-height;
}

</style>