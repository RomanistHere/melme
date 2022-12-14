import { Schema, model } from "mongoose";

const schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	token: {
		type: String,
		required: true,
		unique: true,
	},
	createdAt: Date,
}).index(
	{
		createdAt: 1,
	},
	{
		expireAfterSeconds: 3600000 * 24 * 3,
	}
);

export const UserVerification = model("UserVerification", schema);