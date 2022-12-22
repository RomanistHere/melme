import { startMongo } from "$db/mongo";
import { setWebPushDetails } from "./server/webPush.js";

startMongo()
	.then(() => {
		console.log("mongo started");
	})
	.catch(e => {
		console.log(e);
	});

setWebPushDetails();
