import { startMongo } from "$db/mongo";

startMongo()
	.then(() => {
		console.log("mongo started");
	})
	.catch(e => {
		console.log(e);
	});
