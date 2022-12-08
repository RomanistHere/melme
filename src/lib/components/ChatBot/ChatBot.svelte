<script>
	import createConversation from "@nlxchat/core";
	import { NLX_BOT_URL, NLX_API_KEY } from "$env/static/private";

	const config = {
		botUrl: NLX_BOT_URL, // obtain from NLX deployments page
		headers: {
			"nlx-api-key": NLX_API_KEY, // obtain from NLX deployments page
		},
		userId: "abcd-1234", // optional property to identify the user
		conversationId: "", // start with a specific conversation ID - useful if you want to resume a previous conversation
		context: {}, // context that is shared with the bot
		triggerWelcomeIntent: true, // set whether the welcome intent should trigger when the conversation is initialized
		languageCode: "es-US", // optional language code for standard bots that do not run on US English
	};

	const convo = createConversation(config);

	$: console.log(convo);
	convo.subscribe((responses, newResponse) => {
		console.log(responses);
	});
	convo.sendText("I dunno what to do");
</script>
