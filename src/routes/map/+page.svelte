<script>
	import Seo from "$lib/components/Seo.svelte";
	import Map from "$lib/components/Map/Map.svelte";
	import Header from "$lib/components/Header.svelte";
	import SuggestedEvents from "$lib/components/SuggestedEvents/SuggestedEvents.svelte";

	import { showError } from "$lib/utils/index.js";

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
	$: userCoords = null;

	const handlePoiClick = ({ detail }) => {
		activePoi = detail.slug;
	};

	const startLocationDetection = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(location => {
				userCoords = {
					lat: location.coords.latitude,
					lng: location.coords.longitude,
				};
			}, error => {
				showError(error.message);
			});
		} else {
			showError("Geo location is not available in your browser.");
		}
	};
</script>

<Seo title="melme | map view" />

<Header viewButton="list" />

<div class="h-[28rem] -m-4 mb-0 relative">
	<Map
		{poisData}
		shouldCenterOnResults={true}
		on:handlePoiClick={handlePoiClick}
	/>

	<button
		class="absolute left-4 top-4 rounded-2xl bg-white px-3 py-1 text-indigo-700 shadow-md"
		on:click|preventDefault={startLocationDetection}
	>
		Show near me
	</button>
</div>

<SuggestedEvents
	data={poisData}
	activeEvent={activePoi}
/>
