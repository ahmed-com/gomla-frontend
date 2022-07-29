<script lang="ts">
	export default {
		name: 'NewMessagesDivider',
	};
</script>

<template>
    <div class="d-flex align-center" ref="divider">
    <v-divider></v-divider>
    <div class="bg-info rounded-pill pa-2 mx-2 flex-grow-0 flex-shrink-0 "> {{t('components.NewMessagesDivider.msg')}} </div>
    <v-divider></v-divider>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const divider = ref<HTMLElement | null>(null);

onMounted(()=>divider.value!.scrollIntoView());
</script>