import { Schema, model } from "mongoose";

const schema = new Schema(
	{
		ip: String,
		uses: {
			type: Number,
			default: 0,
		},
	}
).index({
	ip: 1
}, {
	expireAfterSeconds: 60
});

export const UserRateLimit = model("UserRateLimit", schema);
