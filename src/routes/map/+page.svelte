<script>
	import { goto } from "$app/navigation";

	import Seo from "$lib/components/Seo.svelte";
	import Map from "$lib/components/Map/Map.svelte";

	export let data;

	const prepareData = eventData => {
		const parsed = JSON.parse(eventData.events);

		return parsed.map(item => ({
			...item,
			location: item.location.coordinates,
		}));
	};

	$: poisData = prepareData(data);

	const handlePoiClick = ({ detail }) => {
		goto(`events/${detail.slug}`);
	};
</script>

<Seo title="melme | map view" />

<section class="fixed inset-0 w-screen h-screen">
	<Map
		{poisData}
		on:handlePoiClick={handlePoiClick}
	/>
</section>
