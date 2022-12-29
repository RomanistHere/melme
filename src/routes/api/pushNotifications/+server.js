import { json } from "@sveltejs/kit";
import webPush from "web-push";

import { PushNotification } from "$db/models/pushNotification.model";
import { Event } from "$db/models/event.model";
import { logError } from "$lib/utils/index.js";

export async function GET() {
	try {
		const today = new Date().toISOString().split("T")[0];
		const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

		const notifications = await PushNotification.find(
			{
				time: {
					$gte: today,
					$lte: tomorrow,
				},
			},
			"-_id"
		);

		if (notifications.length === 0) return json({ error: null });

		await Promise.all(
			notifications.map(async ({ subscription, slug, time }) => {
				const sub = JSON.parse(subscription);

				const timeTillEventInHours = (time - new Date()) / 1000 / 60 / 60;

				if (timeTillEventInHours < 2) {
					const data = await Event.find(
						{
							slug,
						},
						"-_id title"
					);
					const { title } = data[0];

					const { statusCode } = await webPush.sendNotification(
						sub,
						JSON.stringify({
							title: "Reminder",
							content: `Don't miss ${title} in less than two hours!`,
							openUrl: slug,
						})
					);

					if (statusCode === 201) {
						await PushNotification.findOneAndDelete({
							slug,
						});
					}
				}
			})
		);

		return json({ error: null });
	} catch (e) {
		logError(e);
		return json({ error: e });
	}
}
