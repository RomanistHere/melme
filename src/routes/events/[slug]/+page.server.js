import { error } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";

import { VAPID_PUBLIC_KEY } from "$env/static/private";

export const load = async function ({ params }) {
	const data = await Event.find(
		{
			slug: params.slug,
		},
		"-_id -createdAt -updatedAt -__v"
	).lean();

	if (data[0])
		return {
			...data[0],
			vapidPublicKey: VAPID_PUBLIC_KEY,
		};
	else throw error(404, "Not found");
};

export const actions = {
	comingToEvent: async event => {
		try {
			await Event.updateOne(
				{
					slug: event.params.slug,
				},
				{
					$inc: {
						upVotes: 1,
					},
				}
			);
			return { success: true };
		} catch (err) {
			return { success: false, error: err };
		}
	},
};
