<script>
	import mapboxgl from "mapbox-gl";
	import "mapbox-gl/dist/mapbox-gl.css";
	import Seo from "$lib/components/Seo.svelte";

	let map;
	let isMapLoaded = false;

	const onMapClick = e => {
		console.log('eh')
	};

	const createMap = container => {
		// const { zoom, center } = $appStateStore;
		const token = "pk.eyJ1Ijoicm9tYW5pc3RoZXJlIiwiYSI6ImNrc3E2cjYyMTA5eXkyeG5xZXpkcTI0dnUifQ.Bm8W-u4ylJZTzs3sNFu91w";
		const mapObj = new mapboxgl.Map({
			accessToken: token,
			container,
			center: [ 53.8, 27.5 ],
			style: "mapbox://styles/romanisthere/clc1u0ef2001d14lms41wjsh8", // style URL
			minZoom: 4,
			maxZoom: 18,
			zoom: 7,
			dragRotate: false,
			logoPosition: "bottom-right",
		});
		mapObj.addControl(new mapboxgl.FullscreenControl({ container }), "bottom-right");
		mapObj.addControl(new mapboxgl.NavigationControl(), "bottom-right");
		mapObj.on("load", () => {
			isMapLoaded = true;
		});
		mapObj.on("contextmenu", onMapClick);
		return mapObj;
	};

	const mapAction = wrap => {
		map = createMap(wrap);
		// mapReference.set(map);
		return {
			destroy: () => {
				map.remove();
			},
		};
	};
</script>

<Seo
	title="melme | map view"
/>

<section class="fixed inset-0 w-screen h-screen">
	<div use:mapAction class="w-full h-full"></div>
</section>
