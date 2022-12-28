<script>
	import { createEventDispatcher } from "svelte";
	import mapboxgl from "mapbox-gl";
	import "mapbox-gl/dist/mapbox-gl.css";

	import { showError } from "$lib/utils/index.js";

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
	export let userCoords = null;

	let map;
	let hoveredStateId = null;
	let isMapLoaded = false;

	const imagesToLoad = {
		"event-marker": "../icons/map/event-pin.png",
		"user-marker": "../icons/map/user-pin.png",
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

	const centerMap = json => {
		const bounds = new mapboxgl.LngLatBounds();

		json.features.forEach(feature => {
			bounds.extend(feature.geometry.coordinates);
		});

		map.fitBounds(bounds, { maxZoom: 14, padding: 50 });
	};

	const displayPins = (isLoaded, data, isHighlighted = false) => {
		if (!isLoaded || !data || !data[0] || !data[0].location.length) return;
		try {
			map.loadImage(imagesToLoad["event-marker"], (error, image) => {
				if (error) throw error;

				if (!map.hasImage("event-marker")) {
					map.addImage("event-marker", image, {
						sdf: "true",
						pixelRatio: 1.5,
					});
				}

				const eventsJson = preparePOIsJson(data);

				if (isHighlighted && map.getSource("events-highlighted")) {
					map.getSource("events-highlighted").setData(eventsJson);
					if (shouldCenterOnResults)
						centerMap(eventsJson);
					return;
				} else if (!isHighlighted && map.getSource("events")) {
					map.getSource("events").setData(eventsJson);
					if (shouldCenterOnResults)
						centerMap(eventsJson);
					return;
				}

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
						"icon-image": "event-marker",
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

				if (shouldCenterOnResults)
					centerMap(eventsJson);

				if (!isPoisClickable) return;

				map.on("touchstart", () => {
					dispatch("handlePoiClick", {
						slug: null,
					});
					resetPinHoverState();
				});

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
		} catch (e) {
			showError(e);
		}
	};

	$: displayPins(isMapLoaded, highlightedPoisData, true);
	$: displayPins(isMapLoaded, poisData);

	const updateUserPin = data => {
		if (!data) return;

		try {
			map.loadImage(imagesToLoad["user-marker"], (error, image) => {
				if (error) throw error;

				const { lat, lng } = data;

				if (!map.hasImage("user-marker")) {
					map.addImage("user-marker", image);
				}

				const feature = {
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [lng, lat],
					},
					properties: {
						"image-name": "user-marker",
					},
				};

				if (map.getSource("user")) {
					map.getSource("user").setData(feature);
					return;
				}

				map.addSource("user", {
					type: "geojson",
					data: feature,
					generateId: true,
				});

				map.addLayer({
					id: "user",
					type: "symbol",
					source: "user",
					layout: {
						"icon-image": "user-marker",
						"icon-allow-overlap": true,
						"icon-anchor": "center",
					},
				});
			});
		} catch (e) {
			showError(e);
		}
	};

	$: updateUserPin(userCoords);

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
