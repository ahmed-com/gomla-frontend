<script lang="ts">
	export default {
		name: 'Deal',
	};
</script>

<template>
	<NavigationTabs :tabs="tabs" :someProp="dealId" :dealId="dealId"></NavigationTabs>
</template>

<script setup lang="ts">
	import { computed } from '@vue/reactivity';
	import { useI18n } from 'vue-i18n';
	import { NavigationTab } from '../../types/NavigationTab.type';
	import NavigationTabs from '../../components/NavigationTabs.vue';

	const { t } = useI18n();

	const { dealId } = defineProps<{ dealId: string }>();
	
	const tabs = computed<NavigationTab[]>(() => [
		{ text: t('nested.msg1'), route: { name: 'Deal', params: { dealId } } },
		{
			text: t('nested.msg2'),
			route: { name: 'DealDiscussion', params: { dealId } },
		},
		{
			text: t('nested.msg3'),
			route: { name: 'DealMeetup', params: { dealId } },
		},
	]);
</script>