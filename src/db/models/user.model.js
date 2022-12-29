import { Schema, model } from "mongoose";

const schema = new Schema({
	email: {
		type: String,
		required: true,
	},
	createdAt: Date,
}).index({
	createdAt: 1,
});

export const User = model("User", schema);
