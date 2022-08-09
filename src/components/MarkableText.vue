<script lang="ts">
	export default {
		name: 'MarkableText',
	};
</script>

<template>
	<span class="the-component">
		<span class="markable"
			>{{ part_1 }} <mark class="marked bg-mark">{{ marked }}</mark>
			{{ part_2 }}
		</span>
		<span class="shown">{{ text }}</span>
	</span>
</template>

<script lang="ts" setup>
	import { computed, toRefs } from 'vue';

	type Props = {
		text: string;
		start?: number;
		end?: number;
		match?: string;
	};

	const props: Props = defineProps<Props>();
	const { text, start, end, match } = toRefs<Props>(props);

	const startIndex = computed<number>(() => {
		if (start?.value !== undefined) return start?.value;
		if (match?.value === undefined) return 0;
		return text.value.indexOf(match?.value);
	});

	const endIndex = computed<number>(() => {
		if (end?.value !== undefined) return end?.value;
		if (match?.value === undefined) return text.value.length;
		return startIndex.value + match?.value.length;
	});

	const part_1 = computed<string>(() =>
		text.value.slice(0, startIndex.value)
	);
	const part_2 = computed<string>(() =>
		text.value.slice(endIndex.value, text.value.length)
	);
	const marked = computed<string>(() =>
		text.value.slice(startIndex.value, endIndex.value)
	);
</script>

<style scoped>
	.the-component {
		display: inline-grid;
	}

	.markable {
		color: transparent;
		pointer-events: none;
	}

	.markable,
	.shown {
		grid-row: 1;
		grid-column: 1;
	}

	.marked {
		margin-right: -0.2em;
		margin-left: -0.2em;
		color: transparent !important;
	}
</style>
