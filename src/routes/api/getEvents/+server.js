import { json } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";

const getCategoryFromParams = searchParams => {
	const arrayOfParams = searchParams
		.get("categories")
		.split("-");

	if (!arrayOfParams) return null;
	// when we leave empty category in url, it will return "", so we check for it
	return arrayOfParams.length === 1 &&
		arrayOfParams[0] === ""
		? null
		: arrayOfParams;
};

export async function POST({ url }) {
	const { searchParams, search } = url;
	const categories = search
		? getCategoryFromParams(searchParams)
		: null;

	const data = await Event.find(
		{
			isApproved: true,
			...(categories
				? { categories: { $in: [...categories] } }
				: {}),
		},
		"title description linkToEvent -_id"
	).lean();

	return json({
		events: data,
	});
}
