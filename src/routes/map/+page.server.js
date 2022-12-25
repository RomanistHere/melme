import { Event } from "$db/models/event.model";

import { appConfig } from "$lib/config.js";
import { getCategoryFromParams } from "$lib/utils/index.js";
// import { getGeoSuggestions } from "$lib/utils/map.js";

// const getLocations = async eventsData => {
// 	if (!eventsData)
// 		return;
//
// 	return await Promise.all(
// 		eventsData.map(async ({ addresses, slug }) => {
// 			const addr = addresses[0];
// 			const resp = await getGeoSuggestions(addr);
// 			const { features } = await resp.json();
// 			return {
// 				location: features[0].center,
// 				slug,
// 				addr,
// 			};
// 		})
// 	);
// };

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
		"slug location -_id"
	)
		.sort({
			times: 1,
		})
		.limit(appConfig.firstResultsLimit)
		.lean();

	const eventsWithLocation = data.filter(item => item.location?.coordinates);

	// const locations = await getLocations(data);

	return {
		events: JSON.stringify(eventsWithLocation),
	};
};
