import { json } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";

import { appConfig } from "$lib/config.js";

export async function POST({ request }) {
	try {
		const { page, categories, isApproved } =
			await request.json();

		const today = new Date().toISOString().split("T")[0];

		const data = await Event.find(
			{
				isApproved,
				date: { $gte: today },
				...(categories
					? {
							categories: {
								$in: [...categories.split("-")],
							},
					  }
					: {}),
			},
			"-_id -createdAt -updatedAt -__v"
		)
			.sort({
				date: 1,
				time: 1,
			})
			.skip(
				appConfig.firstResultsLimit +
					appConfig.moreResultsLimit * (page - 1)
			)
			.limit(appConfig.moreResultsLimit)
			.lean();

		return json({
			error: null,
			data,
		});
	} catch (e) {
		return json({ error: e });
	}
}
