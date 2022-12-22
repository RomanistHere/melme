import { json } from "@sveltejs/kit";
import webPush from "web-push";

import { PushNotification } from "$db/models/pushNotification.model";
import { Event } from "$db/models/event.model";

export async function GET({ request }) {
	try {
		const today = new Date().toISOString().split("T")[0];

		const notifications = await PushNotification.find({
			time: { $gte: today },
		}, "-_id");

		const { subscription, slug } = notifications[0];
		const sub = JSON.parse(subscription);

		const data = await Event.find(
			{
				slug,
			},
			"-_id title"
		);
		const { title } = data[0];

		await webPush.sendNotification(sub, `Don't miss ${title} in two hours!`);

		return json({
			error: null,
		});
	} catch (e) {
		console.log(e);
		return json({ error: e });
	}
}
