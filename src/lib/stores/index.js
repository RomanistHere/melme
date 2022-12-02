import { writable } from "./localStorage";

export const userState = writable({
	likedEvents: [],
});
