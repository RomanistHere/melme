import { Event } from "$db/models/event.model";

import { appConfig } from "$lib/config.js";
import { getCategoryFromParams } from "$lib/utils/index.js";
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
		"-_id -createdAt -updatedAt -__v"
	)
		.sort({
			times: 1,
		})
		.limit(appConfig.firstResultsLimit)
		.lean();

	return {
		events: data,
	};
};
