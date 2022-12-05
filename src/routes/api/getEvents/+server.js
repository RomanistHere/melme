import { json } from "@sveltejs/kit";

// import { Event } from "$db/models/event.model";
//
// const getCategoryFromParams = searchParams => {
// 	const arrayOfParams = searchParams
// 		.get("categories")
// 		.split("-");
//
// 	if (!arrayOfParams) return null;
// 	// when we leave empty category in url, it will return "", so we check for it
// 	return arrayOfParams.length === 1 &&
// 		arrayOfParams[0] === ""
// 		? null
// 		: arrayOfParams;
// };

export async function POST({ request }) {
	const parsedRequest = await request.json();
	console.log(parsedRequest);
	return json(parsedRequest);
}

// export async function POST({ url }) {
// 	// const parsedRequest = await request.json();
//
// 	const { searchParams, search } = url;
// 	const categories = search
// 		? getCategoryFromParams(searchParams)
// 		: null;
//
// 	const data = await Event.find(
// 		{
// 			isApproved: true,
// 			...(categories
// 				? { categories: { $in: [...categories] } }
// 				: {}),
// 		},
// 		"title description slug linkToEvent -_id"
// 	).lean();
//
// 	const preparedResponse = data.map(
// 		({ title, description, slug, linkToEvent }) => ({
// 			choiceId: slug,
// 			choiceText: title,
// 			value: {
// 				title: title,
// 				description: description,
// 				linkToEvent: linkToEvent,
// 			},
// 		})
// 	);
//
// 	// return json({
// 	// 	events: data,
// 	// });
//
// 	return json({
// 		unresolvedVariables: [],
// 		resolvedVariables: [
// 			{
// 				variableId: "Activity",
// 				values: preparedResponse,
// 			},
// 		],
// 	});
// }
