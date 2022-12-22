import webPush from "web-push";

import { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } from "$env/static/private";

export const setWebPushDetails = () => {
	return webPush.setVapidDetails(
		"https://melme.io",
		VAPID_PUBLIC_KEY,
		VAPID_PRIVATE_KEY
	);
};