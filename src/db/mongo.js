// import { MongoClient } from "mongodb";
//
// import { MONGO_URL } from "$env/static/private";
//
// const client = new MongoClient(MONGO_URL);
//
// export function start_mongo() {
// 	console.log("starting mongo");
// 	return client.connect();
// }
//
// export default client.db();

// __________
// mongoose

import mongoose from "mongoose";

import { MONGO_URL } from "$env/static/private";

export function start_mongo() {
	console.log("starting mongo");
	return mongoose.connect(MONGO_URL);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;