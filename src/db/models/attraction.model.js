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
		linkToWebsite: {
			type: String,
			required: true,
		},
		addresses: {
			type: [String],
			required: true,
		},
		times: {
			type: [
				{
					weekday: Number,
					startHour: Number,
					startMinute: Number,
					endHour: Number,
					endMinute: Number,
				},
			],
			required: true,
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

export const Attraction = model("Attraction", schema);
