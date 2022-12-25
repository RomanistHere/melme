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
		linkToEvent: {
			type: String,
			required: true,
		},
		addresses: {
			type: [String],
			required: true,
		},
		times: {
			type: [Date],
			required: true,
		},
		duration: {
			type: String,
			default: "",
		},
		price: String,
		registrationLink: String,
		requirements: String,
		hostName: String,
		imgSrc: [String],
		categories: [String],
		isFree: {
			type: Boolean,
			required: true,
		},
		isRegistrationNeeded: {
			type: Boolean,
			required: true,
		},
		isApproved: {
			type: Boolean,
			default: false,
		},
		isBlocked: {
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
		location: {
			bestWatchFrom: [[Number]],
			coordinates: [[Number]],
		},
	},
	{
		timestamps: true,
	}
).index({ description: 1 });

export const Event = model("Event", schema);
