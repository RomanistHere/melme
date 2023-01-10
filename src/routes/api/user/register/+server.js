import sgMail from "@sendgrid/mail";
import { json } from "@sveltejs/kit";

import { User } from "$db/models/user.model.js";
import { UserVerification } from "$db/models/userVerification.model.js";
import { UserRateLimit } from "$db/models/userRateLimit.model.js";

import { SENDGRID_API_KEY, URL } from "$env/static/private";
import { generateRandomString, logError } from "$lib/utils/index.js";
import { rateLimitCheck } from "$lib/utils/server.js";

sgMail.setApiKey(SENDGRID_API_KEY);
const isUserRateLimited = rateLimitCheck(5, UserRateLimit);

const prepareEmailMessage = (type, email, url) => {
	const emailsByType = {
		verification: {
			subject: "Verify your email",
			html: `Here's your email verification link:
			<a href="${url}" target="_blank">${url}</a>
			- click or copy and paste into address bar.`,
		},
	};

	return {
		...emailsByType[type],
		to: email,
		from: "support@melme.io",
	};
};

export async function POST(event) {
	try {
		const { request } = event;

		const { isError, isOverLimit, message } = await isUserRateLimited(
			event.request.headers["cf-connecting-ip"] || event.getClientAddress()
		);

		if (isError) return json({ error: message });

		if (isOverLimit)
			return json({ error: "Too much attempts. Wait 20 minutes and try again." });

		const { email } = await request.json();

		const existUser = await User.findOne({ email });

		if (existUser?.isVerified)
			return json({ error: "This address is already in our database" });

		const token = generateRandomString();
		const url = `${URL}?token=${token}`;
		const msg = prepareEmailMessage("verification", email, url);
		const output = await sgMail.send(msg);

		if (!existUser) {
			const user = await new User({
				email,
				isVerified: false,
				createdAt: new Date(),
			}).save();

			await new UserVerification({
				user: user._id,
				token,
				createdAt: new Date(),
			}).save();
		} else {
			await UserVerification.updateOne({
				user: existUser._id,
			}, {
				user: existUser._id,
				token,
			}, {
				upsert: true,
			});
		}

		return json({
			error: null,
			body: {
				status: "success",
			},
		});
	} catch (error) {
		logError(error);
		return json({ error });
	}
}