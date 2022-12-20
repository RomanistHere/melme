import { invalid } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";
import { UserRateLimit } from "$db/models/userRateLimit.model.js";

import { generateRandomString } from "$lib/utils/index.js";

const rateLimitCheck = usageTimesLimitation => async ip => {
	try {
		const userRateLimit = await UserRateLimit.findOne({
			ip,
		});

		const isOverLimit = userRateLimit?.uses >= usageTimesLimitation;
		const uses = userRateLimit?.uses + 1 || 0;

		if (userRateLimit) await UserRateLimit.findOne({ ip }).remove();

		await new UserRateLimit({
			ip,
			uses,
			createdAt: new Date(),
		}).save();

		return {
			isError: false,
			isOverLimit,
			message: "updated",
		};
	} catch (error) {
		return { isError: true, message: error };
	}
};

const isUserRateLimited = rateLimitCheck(10);

export const actions = {
	default: async event => {
		const { isError, isOverLimit, message } = await isUserRateLimited(
			event.getClientAddress()
		);

		if (isError) return { success: false, error: message };

		if (isOverLimit)
			return {
				success: false,
				error:
					"Spam protection. Too much attempts. Wait 20 minutes and try again.",
			};

		const formData = await event.request.formData();
		const data = Object.fromEntries(formData);

		const datePropNames = Object.keys(data).filter(
			name => name.indexOf("date_") === 0
		);
		const times = datePropNames
			.map(prop => {
				const key = prop.substring(prop.indexOf("date_") + 5);
				const timeProp = `time_${key}`;

				if (!data[prop]) {
					delete data[prop];
					delete data[timeProp];
					return null;
				}

				const date = data[prop];
				const time = data[timeProp];

				delete data[prop];
				delete data[timeProp];

				if (!data[timeProp]) return null;

				return {
					date,
					time,
				};
			})
			.filter(Boolean);

		if (data.title.length === 0) return invalid(400, { missingTitle: true });
		else if (data.description.length < 20)
			return invalid(400, { shortDescription: true });
		else if (data.linkToEvent.length === 0)
			return invalid(400, { missingLink: true });
		else if (data.address.length === 0)
			return invalid(400, { missingAddress: true });
		else if (data.dates.length === 0 || data.times.length === 0)
			return invalid(400, { missingDate: true });

		const eventDB = new Event({
			...data,
			times,
			categories: JSON.parse(data.categories),
			isFree: data.isEventFree === "on",
			isRegistrationNeeded: data.isRegistrationNeeded === "on",
			slug: `${data.title
				.replace(/[^A-Za-z0-9-\s]/g, "")
				.split(" ")
				.join("-")}-${generateRandomString()}`,
		});

		try {
			await eventDB.save();
		} catch (error) {
			return { success: false, error };
		}

		return { success: true };
	},
};
