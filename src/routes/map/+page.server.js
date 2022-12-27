import { Event } from "$db/models/event.model";

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
		"slug location title imgSrc description -_id"
	)
		.sort({
			times: 1,
		})
		.limit(appConfig.firstResultsLimit)
		.lean();

	const eventsWithLocation = data.filter(item => item.location?.coordinates);
	const events = JSON.stringify(eventsWithLocation.map(item =>
		({ ...item, description: truncateString(item.description, 40) })));

	return {
		events,
	};
};
