import { writable } from "svelte/store";

export const eventsState = writable([]);

export const loadedEvents = writable([]);

export const appState = writable({
	loadMorePressedTimes: 0,
	pwaInstallPrompt: null,
	showPwaInstall: false,
	isIos: false,
	previousPage: "/",
});

export const modalState = writable({
	shouldSetNotificationPopup: {
		active: false,
		payload: null,
	},
	subscriptionPopup: {
		active: false,
		payload: null,
	},
	iosPwaPopup: {
		active: false,
		payload: null,
	},
});
