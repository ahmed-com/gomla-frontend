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
        <div class="pa-4 ma-4 bg-blue">4</div>
        <div class="pa-4 ma-4 bg-blue">5</div>
        <div class="pa-4 ma-4 bg-blue">6</div>
        <div class="pa-4 ma-4 bg-blue">7</div>
        <div class="pa-4 ma-4 bg-blue">8</div>
        <div class="pa-4 ma-4 bg-blue">9</div>
        <div class="pa-4 ma-4 bg-blue">10</div>
        <div class="pa-4 ma-4 bg-blue">11</div>
        <div class="pa-4 ma-4 bg-blue">12</div>
        <div class="pa-4 ma-4 bg-blue">13</div>
        <div class="pa-4 ma-4 bg-blue">14</div>
        <div class="pa-4 ma-4 bg-blue">15</div>
        <div class="pa-4 ma-4 bg-blue">16</div>
        <div class="pa-4 ma-4 bg-blue">17</div>
        <div class="pa-4 ma-4 bg-blue">18</div>
        <div class="pa-4 ma-4 bg-blue">19</div>
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