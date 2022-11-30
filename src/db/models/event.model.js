import { Schema, model } from "mongoose";

const schema = new Schema(
	{
		slug: {
			type: String,
			unique: true,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		imgSrc: [String],
		tags: [String],
		location: {
			type: {
				type: String,
				enum: ["Point"],
				default: "Point",
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},
		isApproved: {
			type: Boolean,
			default: false,
		},
		upVotes: {
			type: Number,
			default: 0,
		},
		downVotes: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
).index({ description: 1 });

export const Event = model("Event", schema);
