import { Schema, model } from "mongoose";

const schema = new Schema({
	subscription: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	time: {
		type: Date,
		required: true,
	},
	createdAt: Date,
}).index({
	createdAt: 1,
});

export const PushNotification = model("PushNotification", schema);
