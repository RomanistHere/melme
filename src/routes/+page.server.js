import { events } from "$db/events.js";

export const load = async function () {
	const data = await events.find(
		{ },
		{
			projection: {
				_id: 0
			}
		}
	).toArray();

	return {
		events: data,
	}
}