<script lang="ts">
	export default {
		name: 'Search',
	};
</script>

<template>
	<div class="flex-grow-1">
		{{view}} <v-btn @click="resetView"> reset </v-btn>
		<router-link :to="{ name: 'Dashboard' }"> go to Dashboard</router-link>
		<div v-for="deal in deals">
			<v-hover :key="deal.id" v-model="deal.isHighlighted" v-slot="{ props }">
				<v-alert
				v-bind="props"
					class="ma-2"
					type="info"
					:elevation="deal.isHighlighted ? '6' : '2'"
					>{{ deal.title }} </v-alert
				>
			</v-hover>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useSearchMapStore } from '../stores/searchMapStore';
	import { map, range } from 'ramda';
	import { ref, watchEffect } from 'vue';
	import { Deal } from '../types/Deal.type';
	import { GeoPoint } from '../types/GeoPoint.type';

	const { setView, setMarkers } = useSearchMapStore();

	const getRandomPoint = (p: GeoPoint): GeoPoint => ({
		lat: Math.random() - 0.5 + p.lat,
		lng: Math.random() - 0.5 + p.lng
	});

	const startingPoint: GeoPoint = {
		lat: 51.505,
		lng: -0.09
	}

	const deals = ref<(Deal & { isHighlighted: boolean })[]>([]);
	const view = ref<GeoPoint>(startingPoint);

	watchEffect(()=>setView(view.value));
	watchEffect(()=>deals.value = map((n: number)=>({
		id: `${n}`,
		title: `the title of the deal ${n}`,
		location: getRandomPoint(view.value),
		isHighlighted: false
	}))(range(1,21)))
	watchEffect(()=>{
		setMarkers(deals.value.map(d=>({
			position: d.location,
			description: d.title,
			isHighlighted: d.isHighlighted
		})))
	});

	const resetView = ()=>{ view.value = getRandomPoint(view.value)}

	
</script>
