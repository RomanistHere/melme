import { invalid } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";
import { UserRateLimit } from "$db/models/UserRateLimit.model.js";

import { generateRandomString } from "$lib/utils/index.js";

const rateLimitCheck = usageTimesLimitation => {
	return async ip => {
		try {
			const userRateLimit = await UserRateLimit.findOne({
				ip,
			});

			const isOverLimit =
				userRateLimit?.uses >= usageTimesLimitation;
			const uses = userRateLimit?.uses + 1 || 0;

			if (userRateLimit)
				await UserRateLimit.findOne({ ip }).remove();

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
};

const isUserRateLimited = rateLimitCheck(10);

export const actions = {
	default: async event => {
		const { isError, isOverLimit, message } =
			await isUserRateLimited(event.getClientAddress());

		if (isError) return { success: false, error: message };

		if (isOverLimit)
			return {
				success: false,
				error:
					"Spam protection. Too much attempts. Wait 20 minutes and try again.",
			};

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
