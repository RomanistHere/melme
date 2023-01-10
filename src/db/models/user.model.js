import { Schema, model } from "mongoose";

const schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	createdAt: Date,
}).index({
	createdAt: 1,
});

export const User = model("User", schema);
