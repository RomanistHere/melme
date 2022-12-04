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

export const actions = {
	increaseUpvote: async event => {
		try {
			await Event.updateOne({
				slug: event.params.slug,
			}, {
				$inc: {
					upVotes: 1
				}
			});
			return { success: true };
		} catch (error) {
			console.log(error);
			return { success: false, error };
		}
	},
};