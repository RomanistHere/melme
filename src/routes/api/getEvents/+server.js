import { json } from "@sveltejs/kit"

import { Event } from "$db/models/event.model";

export async function POST() {
	const data = await Event.find(
		{
			isApproved: true,
		},
		"-_id -createdAt -updatedAt -__v"
	).lean();

	return json({
		events: data,
	});
}
export async function GET() {
	const data = await Event.find(
		{
			isApproved: true,
		},
		"-_id -createdAt -updatedAt -__v"
	).lean();

	return json({
		events: data,
	});
}
