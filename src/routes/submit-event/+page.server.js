import { invalid } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";

export const actions = {
	default: async event => {
		// console.log(event);
		const formData = await event.request.formData();
		const data = Object.fromEntries(formData);
		console.log(data);

		// todo: check required fields
		if (data.title.length === 0)
			return invalid(400, { missingTitle: true });
		else if (data.description.length < 20)
			return invalid(400, { shortDescription: true });
		else if (data.linkToEvent.length === 0)
			return invalid(400, { missingLink: true });

		const eventDB = new Event({
			...data,
			categories: JSON.parse(data.categories),
			isFree: data.isEventFree === "on",
			isRegistrationNeeded:
				data.isRegistrationNeeded !== "on",
			slug: data.title.split(" ").join("-"),
		});

		console.log(eventDB);

		// try {
		// 	const savedEvent = await eventDB.save();
		// 	console.log(savedEvent);
		// } catch (e) {
		// 	console.log(e);
		// }

		return { success: true };
	},
};
