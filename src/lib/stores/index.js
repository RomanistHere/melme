import { writable } from "svelte/store";
import createConversation from "@nlxchat/core";

export const eventsState = writable([]);

export const loadedEvents = writable([]);

export const appState = writable({
	loadMorePressedTimes: 0,
});

