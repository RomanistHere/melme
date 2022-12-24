<script>
	import Seo from "$lib/components/Seo.svelte";
	import Map from "$lib/components/Map/Map.svelte";

	const poisData = [
		{
			location: [55.27, 25.23],
			slug: "something",
			title: "something",
		},
		{
			location: [55.28, 25.18],
			slug: "something",
			title: "something",
		},
		{
			location: [55.28, 25.184],
			slug: "something",
			title: "something",
		},
	];

	const handlePoiClick = ({ detail }) => {
		console.log(detail);
	};
</script>

<Seo title="melme | map view" />

<section class="fixed inset-0 w-screen h-screen">
	<Map
		{poisData}
		on:handlePoiClick={handlePoiClick}
	/>
</section>
