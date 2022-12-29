import mongoose from "mongoose";

import { MONGO_URL } from "$env/static/private";

export const startMongo = () => mongoose.connect(MONGO_URL);

const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db;
