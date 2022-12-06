import { Schema, model } from "mongoose";

const schema = new Schema({
	ip: String,
	uses: {
		type: Number,
		default: 0,
	},
	createdAt: Date,
}).index(
	{
		createdAt: 1,
	},
	{
		expireAfterSeconds: 1200,
	}
);

export const UserRateLimit = model("UserRateLimit", schema);
