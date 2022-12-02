import { invalid } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";

import { generateRandomString } from "$lib/utils/index.js";

export const actions = {
	default: async event => {
		// console.log(event);
		const formData = await event.request.formData();
		const data = Object.fromEntries(formData);
		console.log(data);

		if (data.title.length === 0)
			return invalid(400, { missingTitle: true });
		else if (data.description.length < 20)
			return invalid(400, { shortDescription: true });
		else if (data.linkToEvent.length === 0)
			return invalid(400, { missingLink: true });
		else if (data.address.length === 0)
			return invalid(400, { missingAddress: true });
		else if (data.date.length === 0)
			return invalid(400, { missingDate: true });
		else if (data.time.length === 0)
			return invalid(400, { missingTime: true });

		const eventDB = new Event({
			...data,
			categories: JSON.parse(data.categories),
			isFree: data.isEventFree === "on",
			isRegistrationNeeded:
				data.isRegistrationNeeded !== "on",
			slug: `${data.title
				.replace(/[^A-Za-z0-9-\s]/g, "")
				.split(" ")
				.join("-")}-${generateRandomString()}`,
		});

		try {
			await eventDB.save();
		} catch (error) {
			console.log(error);
			return { success: false, error };
		}

		return { success: true };
	},
};
