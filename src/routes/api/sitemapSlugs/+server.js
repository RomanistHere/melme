import { json } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";
import { Attraction } from "$db/models/attraction.model.js";

export async function GET() {
	try {
		const events = await Event.find(
			{},
			"slug -_id"
		);
		const attractions = await Attraction.find(
			{},
			"slug -_id"
		);

		return json({
			error: null,
			events,
			attractions,
		});
	} catch (e) {
		return json({ error: e });
	}
}
