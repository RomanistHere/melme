import { json } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";

export async function POST({ request }) {
	const parsedRequest = await request.json();

	const category =
		parsedRequest?.variables[0]?.payload.activityType;

	const data = await Event.find(
		{
			isApproved: true,
			...(category ? { categories: category } : {}),
		},
		"title description slug linkToEvent -_id"
	).lean();

	const preparedResponse = data.map(
		({ title, description, slug, linkToEvent }) => ({
			choiceId: slug,
			choiceText: title,
			value: {
				title,
				description,
				linkToEvent,
			},
		})
	);

	return json({
		unresolvedVariables: [],
		resolvedVariables: [
			{
				variableId: "Activity",
				values: preparedResponse,
			},
		],
	});
}
