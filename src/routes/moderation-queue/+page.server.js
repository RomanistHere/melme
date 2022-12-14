import { Event } from "$db/models/event.model";

const getCategoryFromParams = searchParams => {
	const arrayOfParams = searchParams.get("categories").split("-");

	if (!arrayOfParams) return null;
	// when we leave empty category in url, it will return "", so we check for it
	return arrayOfParams.length === 1 && arrayOfParams[0] === ""
		? null
		: arrayOfParams;
};

export const load = async function ({ url }) {
	const { searchParams, search } = url;
	const today = new Date().toISOString().split("T")[0];
	const categories = search ? getCategoryFromParams(searchParams) : null;

	const data = await Event.find(
		{
			isApproved: false,
			times: { $gte: today },
			...(categories ? { categories: { $in: [...categories] } } : {}),
		},
		"-_id -createdAt -updatedAt -__v"
	)
		.sort({
			times: 1,
		})
		.lean();

	return {
		events: data,
	};
};
