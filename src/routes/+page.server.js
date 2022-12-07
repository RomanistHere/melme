import { Event } from "$db/models/event.model";

import { appConfig } from "$lib/config.js";

const getCategoryFromParams = searchParams => {
	try {
		const arrayOfParams = searchParams.get("categories").split("-");

		if (!arrayOfParams) return null;
		// when we leave empty category in url, it will return "", so we check for it
		return arrayOfParams.length === 1 && arrayOfParams[0] === ""
			? null
			: arrayOfParams;
	} catch (err) {
		return null;
	}
};

export const load = async function ({ url }) {
	const { searchParams, search } = url;
	const today = new Date().toISOString().split("T")[0];
	const categories = search ? getCategoryFromParams(searchParams) : null;

	const data = await Event.find(
		{
			isApproved: true,
			date: { $gte: today },
			...(categories ? { categories: { $in: [...categories] } } : {}),
		},
		"-_id -createdAt -updatedAt -__v"
	)
		.sort({
			date: 1,
			time: 1,
		})
		.limit(appConfig.firstResultsLimit)
		.lean();

	return {
		events: data,
	};
};
