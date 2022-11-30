import db from "$db/mongo";

export const events = db.collection("events");