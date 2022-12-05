import { json } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";

export async function POST() {
	const data = await Event.find(
		{
			isApproved: true,
		},
		"title description linkToEvent -_id"
	).lean();

	return json({
		events: data,
	});
}
