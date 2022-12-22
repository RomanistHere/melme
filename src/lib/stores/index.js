import { writable } from "svelte/store";

export const eventsState = writable([]);

export const loadedEvents = writable([]);

export const appState = writable({
	loadMorePressedTimes: 0,
});

export const modalState = writable({
	shouldSetNotificationPopup: {
		active: false,
		payload: null,
	},
});