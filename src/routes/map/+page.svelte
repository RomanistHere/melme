<script>
	import { goto } from "$app/navigation";

	import Seo from "$lib/components/Seo.svelte";
	import Map from "$lib/components/Map/Map.svelte";
	import Header from "$lib/components/Header.svelte";
	import SuggestedEvents from "$lib/components/SuggestedEvents/SuggestedEvents.svelte";

	export let data;

	const prepareData = eventData => {
		const parsed = JSON.parse(eventData.events);

		return parsed.map(item => ({
			...item,
			location: item.location.coordinates,
		}));
	};

	$: poisData = prepareData(data);
	$: activePoi = null;

	const handlePoiClick = ({ detail }) => {
		// goto(`events/${detail.slug}`);
		activePoi = detail.slug;
	};
</script>

<Seo title="melme | map view" />

<Header class="relative z-10" />

<section class="fixed inset-0 w-screen h-screen">
	<Map
		{poisData}
		on:handlePoiClick={handlePoiClick}
	/>
</section>

<SuggestedEvents
	data={poisData}
	activeEvent={activePoi}
/>
