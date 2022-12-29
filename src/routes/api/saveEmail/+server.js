import { json } from "@sveltejs/kit";

import { User } from "$db/models/user.model";

export async function POST({ request }) {
	try {
		const { email } = await request.json();

		await new User({
			email,
			createdAt: new Date(),
		}).save();

		return json({
			error: null,
		});
	} catch (e) {
		console.log(e);
		return json({ error: e });
	}
}
