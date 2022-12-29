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

	// const data = await Event.aggregate([
	// 	{ $unwind: "$times" },
	// 	{
	// 		$match: {
	// 			times: { "$gte": today }
	// 		},
	// 	},
	// 	{
	// 		$sort: {
	// 			times: 1,
	// 		},
	// 	},
	// 	{
	// 		$group: {
	// 			_id: "$_id",
	// 			times: { $push: "$times" },
	// 			title: { $first: "$title" },
	// 			slug: { $first: "$slug" },
	// 			description: { $first: "$description" },
	// 			addresses: { $first: "$addresses" },
	// 			imgSrc: { $first: "$imgSrc" },
	// 			price: { $first: "$price" },
	// 			categories: { $first: "$categories" },
	// 			isFree: { $first: "$isFree" },
	// 			upVotes: { $first: "$upVotes" },
	// 			hostName: { $first: "$hostName" },
	// 			duration: { $first: "$duration" },
	// 			isRegistrationNeeded: { $first: "$isRegistrationNeeded" },
	// 		}
	// 	},
	// 	{ $unset: "_id" },
	// 	{ $limit: appConfig.firstResultsLimit }
	// ]);

	return {
		events: data,
	};
};
