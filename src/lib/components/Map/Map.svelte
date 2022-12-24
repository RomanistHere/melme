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
	export let poisData = [];

	let map;
	let hoveredStateId = null;

	const imagesToLoad = {
		"event-marker": "../images/map/event-pin.png",
	};

	const dispatch = createEventDispatcher();

	const preparePOIsJson = markerData => ({
		"type": "FeatureCollection",
		"features": markerData.map(({ location, slug }) => ({
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": location,
			},
			"properties": {
				"image-name": "event-marker",
				"slug": slug,
			},
		})),
	});

	const displayPins = (map, data) => {
		if (!map || !data)
			return;

		map.loadImage(imagesToLoad["event-marker"], (error, image) => {
			if (error) throw error;

			map.addImage("event-marker", image, {
				"sdf": "true",
				"pixelRatio": 1.5,
			});

			const eventsJson = preparePOIsJson(data);

			map.addSource("events", {
				"type": "geojson",
				"data": eventsJson,
				"generateId": true,
			});

			map.addLayer({
				"id": "events",
				"type": "symbol",
				"source": "events",
				"layout": {
					"icon-image": "event-marker",
					"icon-allow-overlap": true,
				},
				"paint": {
					// "icon-color": "#9D9D9D", //3f3ec2
					"icon-color": [
						"case",
						["boolean", ["feature-state", "hover"], false],
						"#3f3ec2",
						"#9D9D9D",
					]
				}
			});

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
			});

			// map.on("mousemove", "stories-layer", e => {
			// 	e.originalEvent.preventDefault();
			// 	map.getCanvas().style.cursor = "pointer";
			// 	if (e.features.length > 0) {
			// 		if (hoveredStoryId) {
			// 			map.setFeatureState({
			// 				source: "POIs",
			// 				id: hoveredStoryId,
			// 			}, {
			// 				hover: false,
			// 			});
			// 		}
			// 		// console.log(e.features[0]);
			// 		hoveredStoryId = e.features[0].id;
			// 		map.setFeatureState({
			// 			source: "POIs",
			// 			id: hoveredStoryId,
			// 		}, {
			// 			hover: true,
			// 		});
			// 	}
			// });
			// map.on("mouseleave", "stories-layer", () => {
			// 	map.getCanvas().style.cursor = "";
			// 	if (hoveredStoryId !== null) {
			// 		map.setFeatureState({
			// 			source: "POIs",
			// 			id: hoveredStoryId,
			// 		}, {
			// 			hover: false,
			// 		});
			// 	}
			// 	hoveredStoryId = null;
			// });
		});
	};

	$: displayPins(map, poisData);

	const createMap = container => {
		const token = "pk.eyJ1Ijoicm9tYW5pc3RoZXJlIiwiYSI6ImNrc3E2cjYyMTA5eXkyeG5xZXpkcTI0dnUifQ.Bm8W-u4ylJZTzs3sNFu91w";
		const mapObj = new mapboxgl.Map({
			accessToken: token,
			container,
			center: [ 55.27, 25.23 ],
			style: "mapbox://styles/romanisthere/clc1u0ef2001d14lms41wjsh8", // style URL
			minZoom: 4,
			maxZoom: 18,
			zoom: 11,
			dragRotate: false,
			logoPosition: "bottom-left",
		});
		mapObj.addControl(new mapboxgl.NavigationControl(), "bottom-right");
		// mapObj.on("contextmenu", onMapClick);
		if (onMapClick)
			mapObj.on("click", onMapClick);

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

<div use:mapAction class="w-full h-full"></div>