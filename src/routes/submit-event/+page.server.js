import { Event } from "$db/models/event.model";

export const actions = {
	default: async event => {
		// console.log(event);
		const formData = await event.request.formData();
		const data = Object.fromEntries(formData);
		console.log(data);

		// todo: check required fields

		const eventDB = new Event({
			...data,
			categories: JSON.parse(data.categories),
			isFree: data.isEventFree === "on",
			isRegistrationNeeded:
				data.isRegistrationNeeded !== "on",
			slug: data.title.split(" ").join("-"),
		});

		console.log(eventDB);

		try {
			const savedEvent = await eventDB.save();
			console.log(savedEvent);
		} catch (e) {
			console.log(e);
		}
	},
};
