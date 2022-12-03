import { error } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";

export const load = async function ({ params }) {
	const data = await Event.find(
		{
			slug: params.slug,
		},
		"-_id -createdAt -updatedAt -__v"
	).lean();

	if (data[0]) return { ...data[0] };
	else throw error(404, "Not found");
};
