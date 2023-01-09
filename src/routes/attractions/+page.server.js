import { Attraction } from "$db/models/attraction.model";

import { getCategoryFromParams } from "$lib/utils/index.js";

export const load = async function ({ url }) {
	const { searchParams, search } = url;
	const categories = search ? getCategoryFromParams(searchParams) : null;

	const data = await Attraction.find(
		{
			isApproved: true,
			...(categories ? { categories: { $in: [...categories] } } : {}),
		},
		"-_id -createdAt -updatedAt -__v -times._id"
	).lean();

	return {
		events: data,
	};
};
