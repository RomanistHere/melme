import { fail } from "@sveltejs/kit";

import { Attraction } from "$db/models/attraction.model";
import { UserRateLimit } from "$db/models/userRateLimit.model";

import { generateRandomString } from "$lib/utils/index.js";
import { rateLimitCheck } from "$lib/utils/server.js";

const isUserRateLimited = rateLimitCheck(10, UserRateLimit);

const strToNumber = {
	"Sun": 0,
	"Mon": 1,
	"Tue": 2,
	"Wed": 3,
	"Thu": 4,
	"Fri": 5,
	"Sat": 6,
};
const stringToArr = {
	"Mon-Sun": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	"Mon-Thu": ["Mon", "Tue", "Wed", "Thu"],
	"Fri-Sun": ["Fri", "Sat", "Sun"],
};

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
			name => name.indexOf("time_from_") === 0
		);

		const times = datePropNames
			.map(prop => {
				const key = prop.substring(prop.indexOf("time_from_") + 10);
				const propTo = `time_to_${key}`;

				if (!data[prop]) {
					delete data[prop];
					delete data[propTo];
					return null;
				}

				const timeFrom = data[prop];
				const timeTo = data[propTo];

				if (!data[propTo]) {
					delete data[prop];
					delete data[propTo];
					return null;
				}

				const startHour = Number(timeFrom.split(":")[0]);
				const startMinute = Number(timeFrom.split(":")[1]);
				const endHour = Number(timeTo.split(":")[0]);
				const endMinute = Number(timeTo.split(":")[1]);

				if (stringToArr[key]) {
					return stringToArr[key].map(item => ({
						weekday: strToNumber[item],
						startHour,
						startMinute,
						endHour,
						endMinute,
					}));
				}

				return {
					weekday: strToNumber[key],
					startHour,
					startMinute,
					endHour,
					endMinute,
				};
			})
			.flat();

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
		else if (data.linkToWebsite.length === 0)
			return fail(400, { missingLink: true });
		else if (addresses.length === 0) return fail(400, { missingAddress: true });
		else if (times.length !== 7) return fail(400, { missingDate: true });

		const slug = `${data.title
			.replace(/[^A-Za-z0-9-\s]/g, "")
			.split(" ")
			.join("-")}-${generateRandomString()}`;

		try {
			await new Attraction({
				...data,
				slug,
				times,
				addresses,
				categories: JSON.parse(data.categories),
				isFree: data.isEventFree === "on",
				isRegistrationNeeded: data.isRegistrationNeeded === "on",
				...(locationParsed ? { location: { coordinates: locationParsed } } : {}),
			}).save();
		} catch (error) {
			return { success: false, error };
		}

		return { success: true };
	},
};
