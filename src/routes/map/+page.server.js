import { Event } from "$db/models/event.model";
import { Attraction } from "$db/models/attraction.model.js";

import { appConfig } from "$lib/config.js";
import { getCategoryFromParams, truncateString } from "$lib/utils/index.js";

export const load = async function ({ url }) {
	const { searchParams, search } = url;
	const today = new Date().toISOString().split("T")[0];
	const categories = search ? getCategoryFromParams(searchParams) : null;

	const data = await Event.find(
		{
			isApproved: true,
			times: { $gte: today },
			...(categories ? { categories: { $in: [...categories] } } : {}),
		},
		"-_id"
	)
		.sort({
			times: 1,
		})
		.limit(appConfig.firstResultsLimit)
		.lean();

	const eventsWithLocation = data.filter(item => item.location?.coordinates);
	const events = eventsWithLocation.map(item => ({
		...item,
		description: truncateString(item.description, 40),
	}));

	const attractionsData = await Attraction.find(
		{
			isApproved: true,
			...(categories ? { categories: { $in: [...categories] } } : {}),
		},
		"-_id -createdAt -updatedAt -__v -times._id"
	).lean();

	const attractionsWithLocation = attractionsData.filter(item => item.location?.coordinates);
	const attractions = attractionsWithLocation.map(item => ({
		...item,
		description: truncateString(item.description, 40),
	}));

	return {
		events,
		attractions,
	};
};
