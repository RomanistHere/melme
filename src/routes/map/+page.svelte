<script>
	import Seo from "$lib/components/Seo.svelte";
	import Map from "$lib/components/Map/Map.svelte";
	import Header from "$lib/components/Header.svelte";
	import SuggestedEvents from "$lib/components/SuggestedEvents/SuggestedEvents.svelte";
	import ListToggle from "$lib/components/icons/ListToggle.svelte";

	export let data;

	const prepareData = eventData => {
		const parsed = eventData.events;

		return parsed.map(item => ({
			...item,
			location: item.location.coordinates,
		}));
	};

	$: poisData = prepareData(data);
	$: activePoi = null;

	const handlePoiClick = ({ detail }) => {
		activePoi = detail.slug;
	};
</script>

<Seo title="melme | map view" />

<Header class="relative z-10" />

<a
	href="/"
	class="absolute right-4 bg-white w-12 h-12 flex justify-center items-center rounded-full top-18 z-20 border-gray-400 border-2"
>
	<ListToggle />
</a>

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
