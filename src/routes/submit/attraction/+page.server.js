import { fail } from "@sveltejs/kit";

import { Event } from "$db/models/event.model";
import { UserRateLimit } from "$db/models/userRateLimit.model";

import {
	generateRandomString,
	convertLocalDateToUTCIgnoringTimezone,
} from "$lib/utils/index.js";
import { rateLimitCheck } from "$lib/utils/server.js";

const isUserRateLimited = rateLimitCheck(10, UserRateLimit);

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

		const locationParsed = data.location ? JSON.parse(data.location) : null;

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

			if (!data[timeProp]) {
				delete data[prop];
				delete data[timeProp];
				return null;
			}

			const current = new Date(`${date}T${time}:00`);
			const dateStr = convertLocalDateToUTCIgnoringTimezone(current);

			delete data[prop];
			delete data[timeProp];

			return dateStr;
		})
		.filter(Boolean);

		const addressPropNames = Object.keys(data).filter(
			name => name.indexOf("address_") === 0
		);
		const addresses = addressPropNames
		.map(prop => {
			if (!data[prop]) {
				delete data[prop];
				return null;
			}

			const address = data[prop];
			delete data[prop];

			return address;
		})
		.filter(Boolean);

		if (data.title.length === 0) return fail(400, { missingTitle: true });
		else if (data.description.length < 20)
			return fail(400, { shortDescription: true });
		else if (data.linkToEvent.length === 0)
			return fail(400, { missingLink: true });
		else if (addresses.length === 0) return fail(400, { missingAddress: true });
		else if (times.length === 0) return fail(400, { missingDate: true });

		const slug = `${data.title
		.replace(/[^A-Za-z0-9-\s]/g, "")
		.split(" ")
		.join("-")}-${generateRandomString()}`;
		const eventDB = new Event({
			...data,
			slug,
			times,
			addresses,
			categories: JSON.parse(data.categories),
			isFree: data.isEventFree === "on",
			isRegistrationNeeded: data.isRegistrationNeeded === "on",
			...(locationParsed ? { location: { coordinates: locationParsed } } : {}),
		});

		try {
			await eventDB.save();
		} catch (error) {
			return { success: false, error };
		}

		return { success: true };
	},
};
