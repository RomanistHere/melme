<script>
	import Map from "$lib/components/Map/Map.svelte";

	import { roundToSixthDecimal } from "$lib/utils/index.js";

	export let title;

	$: pickedPois = [];
	$: poisData = [];

	let inputData = null;

	const updateState = pois => {
		poisData = [
			{
				location: [...pois],
			},
		];
		inputData = JSON.stringify(pois);
	};

	const onMapClick = e => {
		const { lat, lng } = e.lngLat;
		pickedPois = [
			...pickedPois,
			[roundToSixthDecimal(lng), roundToSixthDecimal(lat)],
		];
		updateState(pickedPois);
	};

	const removeLastPoi = () => {
		pickedPois = pickedPois.slice(0, -1);
		updateState(pickedPois);
	};
</script>

<p class="lowercase text-sm mb-2">
	{title}
</p>

<div
	class="h-96 -mx-6 mt-2"
	class:mb-2={pickedPois.length > 0}
	class:mb-6={pickedPois.length === 0}
>
	<Map
		{onMapClick}
		{poisData}
	/>

	<input
		type="text"
		class="hidden"
		name="location"
		bind:value={inputData}
	/>
</div>

{#if pickedPois.length > 0}
	<button
		class="underline mb-6 text-sm text-red-500"
		on:click|preventDefault={removeLastPoi}
	>
		remove last pin
	</button>
{/if}
