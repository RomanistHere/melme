import { Event } from "$db/models/event.model";

export const load = async function () {
	const data = await Event.find(
		{
			isApproved: true,
		},
		"-_id -createdAt -updatedAt -__v"
	).lean();
	console.log(data);

	return {
		events: data,
	};
};
