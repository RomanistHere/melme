import { json } from "@sveltejs/kit";

import { PushNotification } from "$db/models/pushNotification.model";

export async function POST({ request }) {
	try {
		const { subscription, slug, time } = await request.json();

		await new PushNotification({
			subscription: JSON.stringify(subscription),
			slug,
			time,
			createdAt: new Date(),
		}).save();

		return json({
			error: null,
		});
	} catch (e) {
		console.log(e);
		return json({ error: e });
	}
}
