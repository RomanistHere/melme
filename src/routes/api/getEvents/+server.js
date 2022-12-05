import { Event } from "$db/models/event.model";

export async function POST() {
	const data = await Event.find(
		{
			isApproved: true,
		},
		"-_id -createdAt -updatedAt -__v"
	).lean();

	return {
		events: data,
	};
}
