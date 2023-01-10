import { json } from "@sveltejs/kit";

import { User } from "$db/models/user.model.js";
import { UserVerification } from "$db/models/userVerification.model.js";

import { logError } from "$lib/utils/index.js";

export async function POST({ request }) {
	const { token } = await request.json();

	try {
		const verification = await UserVerification.findOne({ token });

		if (!verification)
			return json({ error: "Couldn't verify, submit your email again please" });

		const user = await User.findByIdAndUpdate({
			_id: verification.user,
		}, {
			isVerified: true,
		});

		await UserVerification.deleteOne({ token });

		if (!user)
			return json({ error: "Couldn't verify, submit your email again please" });

		return json({
			error: null,
			data: {
				status: "success",
			},
		});
	} catch (error) {
		logError(error);
		return json({ error });
	}
}