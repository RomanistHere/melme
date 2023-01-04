<script>
	import Seo from "$lib/components/Seo.svelte";
	import Map from "$lib/components/Map/Map.svelte";
	import Header from "$lib/components/Header.svelte";
	import SuggestedEvents from "$lib/components/SuggestedEvents/SuggestedEvents.svelte";

	export let data;

	const prepareData = eventData => {
		const { events, attractions } = eventData;

		return [ ...events.map(item => ({
			...item,
			location: item.location.coordinates,
		})), ...attractions.map(item => ({
			...item,
			location: item.location.coordinates,
			isAttraction: true,
		})) ];
	};

	$: poisData = prepareData(data);
	$: activePoi = null;

	const handlePoiClick = ({ detail }) => {
		activePoi = detail.slug;
	};
</script>

<Seo title="melme | map view" />

<Header viewButton="list" />

<div class="h-[28rem] -m-4 mb-0">
	<Map
		{poisData}
		on:handlePoiClick={handlePoiClick}
	/>
</div>

<SuggestedEvents
	data={poisData}
	activeEvent={activePoi}
/>
