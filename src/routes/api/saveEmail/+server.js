import { json } from "@sveltejs/kit";

import { User } from "$db/models/user.model";
import { UserRateLimit } from "$db/models/userRateLimit.model.js";

import { rateLimitCheck } from "$lib/utils/server.js";
import { logError } from "$lib/utils/index.js";

const isUserRateLimited = rateLimitCheck(10, UserRateLimit);

export async function POST(event) {
	try {
		const { isError, isOverLimit, message } = await isUserRateLimited(
			event.getClientAddress()
		);

		if (isError) return json({ error: message });

		if (isOverLimit)
			return json({
				error:
					"Spam protection. Too much attempts. Wait 20 minutes and try again.",
			});

		const { email } = await event.request.json();

		const data = await User.findOne({ email });

		if (data) return json({ error: "Email address is already in database." });

		await new User({
			email,
			createdAt: new Date(),
		}).save();

		return json({
			error: null,
		});
	} catch (e) {
		logError(e);
		return json({ error: e });
	}
}
