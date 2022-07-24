<script lang="ts">
	export default {
		name: 'DealMeetup',
	};
</script>

<template>
    <v-sheet height="250" color="purple">
        the deal meetup
        dealId: {{dealId}}
        someProp: {{someProp}}
        <br>
        <router-link :to="{name:'Search'}"> go to search </router-link>
    </v-sheet>
</template>

<script setup lang="ts">
    const {dealId, someProp} = defineProps<{dealId: string, someProp: string}>()
</script>