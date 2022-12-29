import { startMongo } from "$db/mongo";
import { setWebPushDetails } from "./server/webPush.js";
import { logError } from "$lib/utils/index.js";

startMongo()
	.then(() => {
		logError("mongo started");
	})
	.catch(e => {
		logError(e);
	});

setWebPushDetails();
