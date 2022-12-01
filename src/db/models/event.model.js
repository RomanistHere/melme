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
		address: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		time: {
			type: String,
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
		upVotes: {
			type: Number,
			default: 0,
		},
		downVotes: {
			type: Number,
			default: 0,
		},
		// location: {
		// 	type: {
		// 		type: String,
		// 		enum: ["Point"],
		// 		default: "Point",
		// 	},
		// 	coordinates: {
		// 		type: [Number],
		// 		required: true,
		// 	},
		// },
	},
	{
		timestamps: true,
	}
).index({ description: 1 });

export const Event = model("Event", schema);
