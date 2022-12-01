// import { events } from "$db/events.js";

// export const load = async function () {
// 	const data = await events.find(
// 		{ },
// 		{
// 			projection: {
// 				_id: 0
// 			}
// 		}
// 	).toArray();
//
// 	return {
// 		events: data,
// 	}
// }

// _____________
// mongoose

import { Event } from "$db/models/event.model";

export const load = async function () {
	const data = await Event.find({}, "-_id").lean();
	console.log(data);

	return {
		events: data,
	};
};
