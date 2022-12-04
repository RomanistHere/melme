import { Event } from "$db/models/event.model";

export const load = async function () {
	const data = await Event.find(
		{
			isApproved: false,
		},
		"-_id -createdAt -updatedAt -__v"
	).lean();

	return {
		events: data,
	};
};
