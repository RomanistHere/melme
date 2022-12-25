<script>
	import { createEventDispatcher } from "svelte";
	import mapboxgl from "mapbox-gl";
	import "mapbox-gl/dist/mapbox-gl.css";

	export const resetPinHoverState = () => {
		if (hoveredStateId !== null) {
			map.setFeatureState(
				{ source: "events", id: hoveredStateId },
				{ hover: false }
			);
		}
		hoveredStateId = null;
	};

	export let onMapClick = null;
	export let poisData = null;
	export let highlightedPoisData = null;
	export let isPoisClickable = true;
	export let shouldCenterOnResults = false;

	let map;
	let hoveredStateId = null;
	let isMapLoaded = false;

	const imagesToLoad = {
		"event-marker": "../images/map/event-pin.png",
	};

	const dispatch = createEventDispatcher();

	const preparePOIsJson = markerData => ({
		type: "FeatureCollection",
		features: markerData
			.map(({ location, slug }) =>
				location.map(loc => ({
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: loc,
					},
					properties: {
						"image-name": "event-marker",
						...(slug && { slug }),
					},
				}))
			)
			.flat(),
	});

	const displayPins = (isLoaded, data, isHighlighted = false) => {
		if (!isLoaded || !data) return;

		map.loadImage(imagesToLoad["event-marker"], (error, image) => {
			if (error) throw error;

			map.addImage(
				isHighlighted ? "event-marker-highlighted" : "event-marker",
				image,
				{
					sdf: "true",
					pixelRatio: 1.5,
				}
			);

			const eventsJson = preparePOIsJson(data);

			map.addSource(isHighlighted ? "events-highlighted" : "events", {
				type: "geojson",
				data: eventsJson,
				generateId: true,
			});

			map.addLayer({
				id: isHighlighted ? "events-highlighted" : "events",
				type: "symbol",
				source: isHighlighted ? "events-highlighted" : "events",
				layout: {
					"icon-image": isHighlighted ? "event-marker-highlighted" : "event-marker",
					"icon-allow-overlap": true,
					"icon-anchor": "bottom",
				},
				paint: {
					// eslint-disable-next-line no-nested-ternary
					"icon-color": isPoisClickable
						? [
								"case",
								["boolean", ["feature-state", "hover"], false],
								"#3f3ec2",
								"#9D9D9D",
						  ]
						: isHighlighted
						? "#3f3ec2"
						: "#9D9D9D",
				},
			});

			if (shouldCenterOnResults) {
				const bounds = new mapboxgl.LngLatBounds();

				eventsJson.features.forEach(feature => {
					bounds.extend(feature.geometry.coordinates);
				});

				map.fitBounds(bounds, { maxZoom: 14 });
			}

			if (!isPoisClickable) return;

			map.on("movestart", resetPinHoverState);

			map.on("click", "events", e => {
				dispatch("handlePoiClick", {
					slug: e.features[0].properties.slug,
					lngLat: e.lngLat,
				});

				resetPinHoverState();

				if (e.features.length > 0) {
					if (hoveredStateId !== null) {
						map.setFeatureState(
							{ source: "events", id: hoveredStateId },
							{ hover: false }
						);
					}
					hoveredStateId = e.features[0].id;
					map.setFeatureState(
						{ source: "events", id: hoveredStateId },
						{ hover: true }
					);
				}

				map.flyTo({
					center: e.features[0].geometry.coordinates,
				});
			});
		});
	};

	$: displayPins(isMapLoaded, highlightedPoisData, true);
	$: displayPins(isMapLoaded, poisData);

	const createMap = container => {
		const token =
			"pk.eyJ1Ijoicm9tYW5pc3RoZXJlIiwiYSI6ImNrc3E2cjYyMTA5eXkyeG5xZXpkcTI0dnUifQ.Bm8W-u4ylJZTzs3sNFu91w";
		const mapObj = new mapboxgl.Map({
			accessToken: token,
			container,
			center: [55.21, 25.14],
			style: "mapbox://styles/romanisthere/clc1u0ef2001d14lms41wjsh8", // style URL
			minZoom: 2,
			maxZoom: 18,
			zoom: 9,
			dragRotate: false,
			logoPosition: "bottom-left",
		});

		mapObj.addControl(new mapboxgl.NavigationControl(), "bottom-right");
		mapObj.on("load", () => {
			isMapLoaded = true;
		});

		// mapObj.on("contextmenu", onMapClick);
		if (onMapClick) mapObj.on("click", onMapClick);

		return mapObj;
	};

	const mapAction = wrap => {
		map = createMap(wrap);
		return {
			destroy: () => {
				map.remove();
			},
		};
	};
</script>

<div
	use:mapAction
	class="w-full h-full"
/>
