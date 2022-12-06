import mongoose from "mongoose";

import { MONGO_URL } from "$env/static/private";

export const startMongo = () => {
	console.log("starting mongo");
	return mongoose.connect(MONGO_URL);
};

const db = mongoose.connection;
db.on(
	"error",
	console.error.bind(console, "MongoDB connection error:")
);

export default db;
