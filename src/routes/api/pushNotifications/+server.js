import { json } from "@sveltejs/kit";
import webPush from "web-push";

import { PushNotification } from "$db/models/pushNotification.model";

export async function GET({ request }) {
	try {
		const today = new Date().toISOString().split("T")[0];
		console.log(today)

		const notifications = await PushNotification.find({
			time: { $gte: today },
		}, "-_id");

		const sub = JSON.parse(notifications[0].subscription);

		webPush.sendNotification(sub, notifications[0].slug);

		return json({
			error: null,
		});
	} catch (e) {
		console.log(e);
		return json({ error: e });
	}
}
