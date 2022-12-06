import { invalid } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";
import { UserRateLimit } from "$db/models/UserRateLimit.model.js";

import { generateRandomString } from "$lib/utils/index.js";

const rateLimitCheck = (usageTimesLimitation) => {
	return async (req) => {
		console.log('heh');
		try {
			// based on: https://stackoverflow.com/questions/52026610/get-client-ip-address-of-a-request-instead-of-cloudflares-ip-address/52026771#52026771
			const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress;
			console.log(ip)
			const userRateLimit = await UserRateLimit.findOne({ ip });
			console.log(userRateLimit);

			const isOverLimit = userRateLimit?.uses >= usageTimesLimitation;
			const uses = userRateLimit?.uses + 1 || 0;

			if (userRateLimit)
				UserRateLimit.findOne({ ip }).remove();

			await new UserRateLimit({ ip, uses }).save();

			return { isError: false, isOverLimit };
		} catch (error) {
			console.log(error);
			return { isError: true, message: error }
		}
	};
}

const isUserRateLimited = rateLimitCheck(3);

export const actions = {
	default: async event => {
		console.log(event.client);
		const { isError, isOverLimit } = await isUserRateLimited(event.request);
		console.log("isError: ", isError)
		console.log(isOverLimit);
		const formData = await event.request.formData();
		const data = Object.fromEntries(formData);

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
				data.isRegistrationNeeded === "on",
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
